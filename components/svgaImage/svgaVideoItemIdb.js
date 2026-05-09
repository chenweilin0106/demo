import SVGA from 'svgaplayerweb'

/**
 * 说明：
 * - 缓存命中后会跳过 Parser.load 的解压/解码流程（下次进入更快）。
 *
 * 重要约束：
 * - 本模块不做 TTL/淘汰；是否清理由业务侧显式调用 deleteIndexedDb / clearObjectStore 决定。
 * - 当存储空间不足时，本模块会自动降级：不影响播放，只是缓存写入会失败。
 */

const DB_NAME = '2025_520_db'
const DB_VERSION = 1
const STORE_NAME = 'svga_list'

let dbPromise = null
const inflight = new Map()

/**
 * 当前环境是否可用 IndexedDB。
 * @returns {boolean}
 */
function canUseIndexedDB() {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined'
}

/**
 * 打开/创建 IndexedDB 数据库（单例）。
 * - 不可用或失败时返回 null（自动降级，不影响播放）。
 * @returns {Promise<IDBDatabase|null>}
 */
function openDb() {
  if (!canUseIndexedDB()) return Promise.resolve(null)
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'url' })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => resolve(null)
    } catch (e) {
      resolve(null)
    }
  })

  return dbPromise
}

/**
 * 从 objectStore 读取一条记录。
 * @param {IDBDatabase|null} db
 * @param {string} url
 * @returns {Promise<{url: string, videoItem: any} | null>}
 */
function idbGet(db, url) {
  if (!db) return Promise.resolve(null)
  return new Promise((resolve) => {
    try {
      const tx = db.transaction([STORE_NAME], 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.get(url)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => resolve(null)
    } catch (e) {
      resolve(null)
    }
  })
}

/**
 * 写入/覆盖一条记录（keyPath 为 url）。
 * @param {IDBDatabase|null} db
 * @param {{url: string, videoItem: any}} record
 * @returns {Promise<boolean>}
 */
function idbPut(db, record) {
  if (!db) return Promise.resolve(false)
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([STORE_NAME], 'readwrite')
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
      tx.objectStore(STORE_NAME).put(record)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * 通过 SVGA.Parser 解析 url，得到 videoItem。
 * @param {string} url
 * @returns {Promise<any>}
 */
function parseViaSvgaParser(url) {
  return new Promise((resolve, reject) => {
    try {
      const parser = new SVGA.Parser()
      parser.load(url, (videoItem) => resolve(videoItem), (err) => reject(err))
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * 将 videoItem 写入 IndexedDB（失败自动降级）。
 * @param {IDBDatabase|null} db
 * @param {string} url
 * @param {any} videoItem
 * @returns {Promise<void>}
 */
async function saveVideoItem(db, url, videoItem) {
  if (!db || !url || !videoItem) return
  const record = { url, videoItem }

  try {
    await idbPut(db, record)
  } catch (err) {
    // 空间不足或其它写入失败：直接降级（不影响播放，不做“主观淘汰”）
  }
}

/**
 * 获取/加载 SVGA 的 videoItem（带 IndexedDB 缓存 + 同 url in-flight 去重）
 * @param {string} url 完整资源地址
 * @returns {Promise<any>} videoItem
 */
export function getSvgaVideoItem(url) {
  if (!url) return Promise.resolve(null)
  if (inflight.has(url)) return inflight.get(url)

  const task = (async () => {
    const db = await openDb()
    try {
      const cached = await idbGet(db, url)
      if (cached && cached.videoItem) return cached.videoItem
    } catch (e) {}

    const videoItem = await parseViaSvgaParser(url)
    // 异步写缓存，不阻塞首帧显示
    saveVideoItem(db, url, videoItem)
    return videoItem
  })()

  inflight.set(url, task)
  const clear = () => inflight.delete(url)
  task.then(clear, clear)
  return task
}

/**
 * 清空指定 objectStore 的数据（保留表结构，不触发版本升级）。
 * @param {string} storeName
 * @returns {Promise<boolean>}
 */
export async function clearObjectStore(storeName) {
  if (!storeName) return false
  if (!canUseIndexedDB()) return false

  const db = await openDb()
  if (!db) return false
  if (!db.objectStoreNames || !db.objectStoreNames.contains(storeName)) return false

  return new Promise((resolve) => {
    try {
      const tx = db.transaction([storeName], 'readwrite')
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => resolve(false)
      tx.onabort = () => resolve(false)
      tx.objectStore(storeName).clear()
    } catch (e) {
      resolve(false)
    }
  })
}

/**
 * 删除指定 IndexedDB 库（通用方法：传库名即可）。
 * - 仅同源下可删除；不同域/协议/端口的库无法操作。
 * - 可能遇到 onblocked（其它页面/Tab 仍占用连接），此时删除会被延后或失败。
 * @param {string} dbName
 * @returns {Promise<boolean>} 是否触发成功（blocked/异常返回 false）
 */
export function deleteIndexedDb(dbName) {
  if (!dbName) return Promise.resolve(false)
  if (!canUseIndexedDB()) return Promise.resolve(false)

  // 删除本模块使用的库时，先关掉当前连接，避免自阻塞
  if (dbName === DB_NAME && dbPromise) {
    try {
      dbPromise.then((db) => {
        try {
          db && db.close && db.close()
        } catch (e) {}
      })
    } catch (e) {}
    dbPromise = null
  }

  return new Promise((resolve) => {
    let settled = false
    const done = (ok) => {
      if (settled) return
      settled = true
      resolve(Boolean(ok))
    }
    try {
      const req = window.indexedDB.deleteDatabase(dbName)
      req.onsuccess = () => done(true)
      req.onerror = () => done(false)
      req.onblocked = () => done(false)
    } catch (e) {
      done(false)
    }
  })
}
