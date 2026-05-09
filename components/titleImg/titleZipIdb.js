import axios from 'axios'

/**
 * 说明：
 * - 这里只缓存 m4 称号 zip 原包，不缓存解压后的 animationData。
 * - 同一个 url 的并发请求会被合并，避免重复下载/重复读库。
 * - IndexedDB 不可用或写入失败时自动降级，不影响动画加载。
 */

const DB_NAME = '2026_inherit_m4_title_zip_db'
const DB_VERSION = 1
const STORE_NAME = 'title_zip_list'

let dbPromise = null
const inflight = new Map()

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
 * 获取称号 zip 原包（带 IndexedDB 缓存 + 同 url inflight 去重）。
 * @param {string} url 完整资源地址
 * @returns {Promise<ArrayBuffer|null>}
 */
export function getTitleZipData(url) {
  if (!url) return Promise.resolve(null)
  if (inflight.has(url)) return inflight.get(url)

  const task = (async () => {
    const db = await openDb()
    try {
      const cached = await idbGet(db, url)
      if (cached && cached.zipBuffer) return cached.zipBuffer
    } catch (e) {}

    const zipBuffer = await fetchZipBuffer(url)
    saveZipBuffer(db, url, zipBuffer)
    return zipBuffer
  })()

  inflight.set(url, task)
  const clear = () => inflight.delete(url)
  task.then(clear, clear)
  return task
}
