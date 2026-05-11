import axios from 'axios'

/**
 * 说明：
 * - 这里只缓存 lottie zip 原包 ArrayBuffer，不缓存解压后的 animationData。
 * - 同一个 url 的并发请求会被合并，避免重复下载/重复读库。
 * - IndexedDB 不可用或写入失败时自动降级，不影响动画加载。
 */

const DB_NAME = 'json_image_zip_db'
const DB_VERSION = 1
const STORE_NAME = 'json_zip_list'

let dbPromise = null
const inflight = new Map()

function getInflightKey(url, skipCache) {
  return `${skipCache ? 'source' : 'cache'}:${url}`
}

/**
 * 当前环境是否支持 IndexedDB。
 * @returns {boolean}
 */
function canUseIndexedDB() {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined'
}

/**
 * 打开/创建 IndexedDB 数据库（单例）。
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
 * 从 IndexedDB 读取 zip 原包。
 * @param {IDBDatabase|null} db
 * @param {string} url
 * @returns {Promise<{url: string, zipBuffer: ArrayBuffer, updatedAt: number} | null>}
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
 * 写入/覆盖一条 zip 原包记录。
 * @param {IDBDatabase|null} db
 * @param {{url: string, zipBuffer: ArrayBuffer, updatedAt: number}} record
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
 * 删除一条 zip 原包记录。
 * @param {IDBDatabase|null} db
 * @param {string} url
 * @returns {Promise<boolean>}
 */
function idbDelete(db, url) {
  if (!db || !url) return Promise.resolve(false)
  return new Promise((resolve) => {
    try {
      const tx = db.transaction([STORE_NAME], 'readwrite')
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => resolve(false)
      tx.onabort = () => resolve(false)
      tx.objectStore(STORE_NAME).delete(url)
    } catch (e) {
      resolve(false)
    }
  })
}

/**
 * 从网络拉取 zip 原包。
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchZipBuffer(url) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' })
  return data
}

/**
 * 异步写入缓存；失败时自动降级。
 * @param {IDBDatabase|null} db
 * @param {string} url
 * @param {ArrayBuffer} zipBuffer
 * @returns {Promise<void>}
 */
async function saveZipBuffer(db, url, zipBuffer) {
  if (!db || !url || !zipBuffer) return
  const record = {
    url,
    zipBuffer,
    updatedAt: Date.now()
  }

  try {
    await idbPut(db, record)
  } catch (err) {
    // 空间不足或其它写入失败时直接降级，不影响正常加载
  }
}

/**
 * 获取 lottie zip 原包（带 IndexedDB 缓存 + 同 url inflight 去重）。
 * @param {string} url 完整资源地址
 * @param {{skipCache?: boolean, withCacheInfo?: boolean}} [options]
 * @returns {Promise<ArrayBuffer|null>}
 */
export function getJsonZipData(url, options = {}) {
  const { skipCache = false, withCacheInfo = false } = options
  if (!url) {
    const emptyResult = { zipBuffer: null, fromCache: false }
    return Promise.resolve(withCacheInfo ? emptyResult : emptyResult.zipBuffer)
  }

  const inflightKey = getInflightKey(url, skipCache)
  if (inflight.has(inflightKey)) {
    const pending = inflight.get(inflightKey)
    return withCacheInfo ? pending : pending.then((result) => result.zipBuffer)
  }

  const task = (async () => {
    const db = await openDb()
    if (!skipCache) {
      try {
        const cached = await idbGet(db, url)
        if (cached && cached.zipBuffer) {
          return { zipBuffer: cached.zipBuffer, fromCache: true }
        }
      } catch (e) {}
    }

    const zipBuffer = await fetchZipBuffer(url)
    saveZipBuffer(db, url, zipBuffer)
    return { zipBuffer, fromCache: false }
  })()

  inflight.set(inflightKey, task)
  const clear = () => inflight.delete(inflightKey)
  task.then(clear, clear)
  return withCacheInfo ? task : task.then((result) => result.zipBuffer)
}

/**
 * 删除当前 URL 对应的 lottie zip 缓存。
 * @param {string} url 完整资源地址
 * @returns {Promise<boolean>}
 */
export async function deleteJsonZipData(url) {
  if (!url) return false
  if (!canUseIndexedDB()) return false
  inflight.delete(getInflightKey(url, false))

  const db = await openDb()
  if (!db) return false
  return idbDelete(db, url)
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
export async function deleteIndexedDb(dbName) {
  if (!dbName) return false
  if (!canUseIndexedDB()) return false

  // 删除本模块使用的库时，先关掉当前连接，避免自阻塞
  if (dbName === DB_NAME && dbPromise) {
    try {
      const db = await dbPromise
      try {
        db && db.close && db.close()
      } catch (e) {}
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
