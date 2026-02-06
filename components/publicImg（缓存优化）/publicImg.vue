<template>
  <div class="imgCompo">
    <!-- pic -->
    <template v-if="imgPattern === 1">
      <div :class="['micAvatar', imgType == 'mic' ? 'micA' : imgType == 'voice' ? 'voiceA' : null]" v-if="imgType == 'mic' || imgType == 'voice'">
        <img :src="userAvatar || $store.state.userInfo.profile_image || $store.state.user_icon" @error="imgAtError" />
      </div>
      <img class="picImg" :class="[imgType == 'mic' ? 'micImg' : imgType == 'voice' ? 'voiceImg' : '']" :src="imgPath" @error="imgError" />
    </template>
    <!-- svga -->
    <template v-else-if="imgPattern === 2">
      <!-- 用户头像 -->
      <div :class="['micAvatar', imgType == 'mic' ? 'micA' : imgType == 'voice' ? 'voiceA' : null]" v-if="imgType == 'mic' || imgType == 'voice'">
        <img :src="userAvatar || $store.state.userInfo.profile_image || $store.state.user_icon" @error="imgAtError" />
      </div>
      <!-- svga容器 -->
      <div class="svgaBox" :id="svgaId"></div>
    </template>
    <!-- json -->
    <template v-else-if="imgPattern === 3">
      <div :class="['micAvatar', imgType == 'mic' ? 'micA' : imgType == 'voice' ? 'voiceA' : null]" v-if="imgType == 'mic' || imgType == 'voice'">
        <img :src="userAvatar || $store.state.userInfo.profile_image || $store.state.user_icon" @error="imgAtError" />
      </div>
      <!-- json容器 -->
      <div class="jsonBox" :id="jsonId" />
    </template>
  </div>
</template>

<script>
/**
 * @prop {String} imgName 图像名,该组件暂只判断了三种情况：pic、svga、json(pic需判断路径,svga、json暂只会是线上地址)
 */
/**
 * @name PublicIcon
 * @description img图片显示
 */
import SVGA from 'svgaplayerweb'
/**
 * @name PublicSvga
 * @description svga动画组件
 *
 * @prop {String} imgName svga文件名称（oss目录名称一致，用作访问图片）
 * @prop {String} userAvatar 用户头像
 * @prop {Number} loop 循环播放次数 0-无限循环
 * @prop {Function} onComplete 播放完成回调
 * @prop {Boolean} isLocal 是否使用本地文件
 * @prop {Boolean} isIndexDB 是否indexDB缓存
 *
 * @param {String} svgaId 生成唯一svga动画挂载id
 * @param {Object} svga_data 存放svga动画实例（不需要响应式，所以没有在data中定义）
 * @function loadSvga 加载svga动画
 * @function clearSvga 销毁svga动画
 *
 * 使用方法：
 * 传入svga名称，如果是头饰，需要额外传入用户头像
 * 使用组件时，给组件包一个div用于控制svga动画大小，组件内部会自动居中
 * 如果需求控制头像大小，可以使用深度选择器，v-deep
 *
 * @example
 * <div>
 *  <PublicSvga imgName="ffcr.svga" :userAvatar="$store.state.user_icon"/>
 * </div>
 *
 * @description
 * 核心是通过watch监听传入的imgName，当发生变化时，重新加载imgName
 * 因为加了immediate，所以会实现created的效果
 * loadSvga内部挂载使用了this.$nextTick，所以会实现mounted的效果
 * 使用时间戳拼接随机数当作挂载标识，防止id重复
 */
import lottie from 'lottie-web'

const SVGA_PERF_QUERY_KEY = 'svgaPerf'
const SVGA_PERF_STORAGE_KEY = 'svgaPerf'
const SVGA_VIDEOITEM_IDB_QUERY_KEY = 'svgaVideoItemIdb'
const SVGA_VIDEOITEM_IDB_STORAGE_KEY = 'svgaVideoItemIdb'
const SVGA_IDB_DB_VERSION = 3

function getSvgaPerfEnabled() {
  try {
    if (typeof window === 'undefined') return false
    const search = window.location && window.location.search ? window.location.search : ''
    const params = new URLSearchParams(search)
    return params.get(SVGA_PERF_QUERY_KEY) === '1' || window.localStorage.getItem(SVGA_PERF_STORAGE_KEY) === '1'
  } catch (e) {
    return false
  }
}

function getSvgaVideoItemIdbEnabled() {
  try {
    if (typeof window === 'undefined') return false
    const search = window.location && window.location.search ? window.location.search : ''
    const params = new URLSearchParams(search)
    return params.get(SVGA_VIDEOITEM_IDB_QUERY_KEY) === '1' || window.localStorage.getItem(SVGA_VIDEOITEM_IDB_STORAGE_KEY) === '1'
  } catch (e) {
    return false
  }
}

let svgaLongTaskObserverStarted = false

// NOTE: 内存 Map 缓存 videoItem 逻辑先保留，但本轮只启用 IndexedDB(videoItem) 缓存。
// const SVGA_VIDEOITEM_CACHE_MAX = 2
// const svgaVideoItemCache = new Map()
//
// function svgaVideoItemCacheHas(key) {
//   if (!key) return false
//   return svgaVideoItemCache.has(key)
// }
//
// function svgaVideoItemCacheGet(key) {
//   if (!key) return null
//   if (!svgaVideoItemCache.has(key)) return null
//   const value = svgaVideoItemCache.get(key)
//   svgaVideoItemCache.delete(key)
//   svgaVideoItemCache.set(key, value)
//   return value || null
// }
//
// function svgaVideoItemCacheSet(key, videoItem) {
//   if (!key || !videoItem) return
//   if (svgaVideoItemCache.has(key)) svgaVideoItemCache.delete(key)
//   svgaVideoItemCache.set(key, videoItem)
//   while (svgaVideoItemCache.size > SVGA_VIDEOITEM_CACHE_MAX) {
//     const firstKey = svgaVideoItemCache.keys().next().value
//     if (firstKey === undefined) break
//     svgaVideoItemCache.delete(firstKey)
//   }
// }
function ensureSvgaLongTaskObserver() {
  if (typeof window === 'undefined') return
  if (window.__SVGA_LONGTASK_OBSERVER_STARTED__) return
  if (svgaLongTaskObserverStarted) return
  if (typeof window.PerformanceObserver === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      for (const entry of entries) {
        console.log('[SVGA-LONGTASK]', {
          name: entry.name,
          startTime: Math.round(entry.startTime),
          duration: Math.round(entry.duration)
        })
      }
    })
    observer.observe({ entryTypes: ['longtask'] })
    svgaLongTaskObserverStarted = true
    window.__SVGA_LONGTASK_OBSERVER_STARTED__ = true
  } catch (e) {
    // 某些 WebView / Safari 不支持 longtask，忽略即可
  }
}
/**
 * @name PublicJson
 * @description json动画组件
 *
 * @prop {String} imgName json名称（oss目录名称一致，用作访问图片）
 * @prop {String} userAvatar 用户头像
 * @prop {Boolean} loop 是否循环播放
 * @prop {Number} needPause 是否需要暂停,需要则传入数字,则会在n帧后暂停
 *
 * @param {String} jsonId 生成唯一json动画挂载id
 * @param {Object} PublicJsonObj 存放json动画实例（不需要响应式，所以没有在data中定义）
 * @function loadJson 加载json动画
 * @function destroyJson 销毁json动画
 *
 * 使用方法：
 * 传入json名称，如果是头饰，需要额外传入用户头像
 *
 * @example
 * <div>
 *  <PublicJson :imgName="'mfxz'" :userAvatar="$store.state.user_icon"></PublicJson>
 * </div>
 */

export default {
  name: 'PublicImg',
  props: ['imgName', 'imgType', 'userAvatar', 'loop', 'needPause', 'isLocal', 'isIndexDB'],
  components: {},
  data() {
    return {
      svgaObjectUrl: null,
      imgPattern: 0, // 格式 1:pic 2:svga 3:json
      imgPath: '' // 图像地址
    }
  },
  created() {},
  mounted() {},
  computed: {
    svgaId() {
      return `svga_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    },
    jsonId() {
      return `json_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
  },
  watch: {
    imgName: {
      immediate: true,
      handler(newV, oldV) {
        // console.log('newV:', newV, 'oldV:', oldV)
        try {
          this.imgPath = this.imgName
          this.judegPattern()
        } catch (error) {
          console.log('Error in watcher callback:', 'imgName! undefined')
        }
      }
    }
  },
  methods: {
    /**
     * 将任务加入“空闲执行”队列，并返回可取消的句柄。
     *
     * 主要用于把 SVGA 的非关键工作放到浏览器空闲期执行，避免阻塞首帧/交互。
     * - 优先使用 `requestIdleCallback`（支持超时兜底）。
     * - 不支持时降级为 `setTimeout`。
     *
     * @param {Function} task - 需要在空闲时执行的任务函数。
     * @param {Object} [options]
     * @param {number} [options.timeoutMs=1500] - `requestIdleCallback` 的超时兜底（毫秒）。
     * @param {number} [options.fallbackDelayMs=300] - 降级到 `setTimeout` 时的延迟（毫秒）。
     * @returns {Function} cancel - 取消函数（幂等），会从内部列表移除。
     */
    enqueueSvgaIdleTask(task, options = {}) {
      const idleTimeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 1500
      const fallbackDelayMs = typeof options.fallbackDelayMs === 'number' ? options.fallbackDelayMs : 300
      if (!this.svgaIdleCancels) this.svgaIdleCancels = []

      let cancelled = false
      let cancel = null

      const removeCancel = () => {
        const list = this.svgaIdleCancels
        if (!list) return
        const idx = list.indexOf(cancel)
        if (idx >= 0) list.splice(idx, 1)
      }

      const run = () => {
        removeCancel()
        if (cancelled) return
        // 组件销毁中/已销毁时，避免执行异步任务（防止 DOM/状态操作报错）
        if (this._isDestroyed || this._isBeingDestroyed) return
        try {
          task()
        } catch (e) {
          console.warn('svga idle task failed', e)
        }
      }

      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        // 有空闲回调时：尽量让浏览器调度；超时保证不会一直不执行
        const id = window.requestIdleCallback(run, { timeout: idleTimeoutMs })
        cancel = () => {
          if (cancelled) return
          cancelled = true
          try {
            if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id)
          } catch (e) {}
          removeCancel()
        }
      } else {
        // 兼容：没有 requestIdleCallback 的环境，用 setTimeout 轻量降级
        const id = setTimeout(run, fallbackDelayMs)
        cancel = () => {
          if (cancelled) return
          cancelled = true
          clearTimeout(id)
          removeCancel()
        }
      }

      this.svgaIdleCancels.push(cancel)
      return cancel
    },
    /**
     * 取消并清空所有通过 `enqueueSvgaIdleTask` 注册的空闲任务。
     * 一般在组件销毁（`beforeDestroy`）时调用，避免残留异步回调。
     *
     * @returns {void}
     */
    cancelSvgaIdleTasks() {
      const list = this.svgaIdleCancels
      if (!Array.isArray(list) || !list.length) return
      for (const cancel of list.slice()) {
        try {
          if (typeof cancel === 'function') cancel()
        } catch (e) {}
      }
      this.svgaIdleCancels = []
    },
    /**
     * 回收 SVGA 相关的 ObjectURL，避免内存泄漏。
     *
     * @returns {void}
     */
    revokeSvgaObjectUrl() {
      if (this.svgaObjectUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
        try {
          URL.revokeObjectURL(this.svgaObjectUrl)
        } catch (e) {}
      }
      this.svgaObjectUrl = null
    },
    /**
     * 将 Blob 转成 base64 DataURL（通过 FileReader）。
     * 当开启 SVGA 性能统计时，会把转换耗时写入 `trace.durations.dataUrlMs`。
     *
     * @param {Blob} blob - 需要转换的二进制数据。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @returns {Promise<string>} DataURL 字符串（`data:<mime-type>;base64,...`）。
     */
    blobToBase64DataUrl(blob, trace) {
      return new Promise((resolve, reject) => {
        try {
          const startAt = trace ? this.svgaPerfNow() : 0
          const reader = new FileReader()
          reader.onload = () => {
            if (trace) trace.durations.dataUrlMs = this.svgaPerfNow() - startAt
            resolve(reader.result)
          }
          reader.onerror = (e) => {
            reject(e)
          }
          reader.readAsDataURL(blob)
        } catch (e) {
          reject(e)
        }
      })
    },
    /**
     * 从 Blob 形式的 SVGA 数据启动播放。
     * - 优先把 Blob 转成 `data:svga/2.0;base64,...`（避免额外网络请求）。
     * - 如果转换失败，则回退到 URL 加载（`remoteUrl` 或按 `svgaName` 组装）。
     *
     * @param {Blob} blob - SVGA 二进制数据。
     * @param {string} svgaName - SVGA 文件名（用于兜底组装 URL/日志标识）。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @param {string} [remoteUrl] - 兜底的远端 URL（可选）。
     * @param {Object} [hooks] - 生命周期回调（透传给 `svgaStart`）。
     * @returns {Promise<void>}
     */
    async loadSvgaFromBlob(blob, svgaName, trace, remoteUrl, hooks) {
      try {
        const dataUrl = await this.blobToBase64DataUrl(blob, trace)
        const commaIndex = typeof dataUrl === 'string' ? dataUrl.indexOf(',') : -1
        const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : ''
        const svgaDataUrl = `data:svga/2.0;base64,${base64}`
        if (trace) {
          trace.meta.loadSourceType = 'dataSvga'
          trace.meta.objectUrl = false
        }
        this.svgaStart(svgaDataUrl, svgaName, trace, hooks)
      } catch (e) {
        if (trace) {
          trace.meta.blobToDataUrlError = true
          trace.meta.blobToDataUrlErrorMsg = e ? String(e) : 'unknown'
        }
        const fallbackUrl = remoteUrl || this.getSvgaName(undefined, svgaName)
        this.svgaStart(fallbackUrl, svgaName, trace, hooks)
      }
    },
    /**
     * 是否开启 SVGA 性能统计（带缓存）。
     *
     * 开关来源：querystring / localStorage（详见 `getSvgaPerfEnabled`）。
     * 开启后会启动 long task observer（用于定位卡顿）。
     *
     * @returns {boolean}
     */
    svgaPerfEnabled() {
      if (this._svgaPerfEnabledCached === undefined) {
        this._svgaPerfEnabledCached = getSvgaPerfEnabled()
        if (this._svgaPerfEnabledCached) ensureSvgaLongTaskObserver()
      }
      return this._svgaPerfEnabledCached
    },
    /**
     * 是否启用 videoItem 的 IndexedDB 缓存（带缓存）。
     *
     * @returns {boolean}
     */
    svgaVideoItemIdbEnabled() {
      if (this._svgaVideoItemIdbEnabledCached === undefined) {
        this._svgaVideoItemIdbEnabledCached = getSvgaVideoItemIdbEnabled()
      }
      return this._svgaVideoItemIdbEnabledCached
    },
    /**
     * 获取“相对稳定”的高精度时间戳（用于耗时统计）。
     * 优先使用 `performance.now()`，不可用则回退 `Date.now()`。
     *
     * @returns {number}
     */
    svgaPerfNow() {
      try {
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') return performance.now()
      } catch (e) {}
      return Date.now()
    },
    /**
     * 创建一次 SVGA 加载/播放链路的性能追踪对象。
     *
     * `durations` 和 `meta` 会在后续流程中逐步补充。
     *
     * @param {string} svgaName - 业务侧传入的 SVGA 名称/URL。
     * @returns {{id: string, svgaName: string, createdAt: number, durations: Object, meta: Object}}
     */
    createSvgaPerfTrace(svgaName) {
      return {
        id: `${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        svgaName,
        createdAt: Date.now(),
        durations: {},
        meta: {}
      }
    },
    /**
     * 输出一次 SVGA 链路性能统计结果到控制台（仅在开启开关时生效）。
     *
     * @param {Object|null} trace - 由 `createSvgaPerfTrace` 创建并在链路中持续补全。
     * @returns {void}
     */
    reportSvgaPerf(trace) {
      if (!trace || !this.svgaPerfEnabled()) return

      const toMs = (v) => (typeof v === 'number' ? Math.round(v * 10) / 10 : undefined)
      const rows = []
      const add = (stage, ms) => {
        const val = toMs(ms)
        if (typeof val === 'number') rows.push({ stage, ms: val })
      }

      add('idb.open', trace.durations.idbOpenMs)
      add('idb.get', trace.durations.idbGetMs)
      add('idb.getVideoItem', trace.durations.idbGetVideoItemMs)
      add('fetch.headers', trace.durations.fetchHeadersMs)
      add('fetch.blob', trace.durations.blobMs)
      add('blob.dataUrl', trace.durations.dataUrlMs)
      add('fetch.arrayBuffer', trace.durations.arrayBufferMs)
      add('base64.encode', trace.durations.base64EncodeMs)
      add('idb.put', trace.durations.idbPutMs)
      add('idb.putVideoItem', trace.durations.idbPutVideoItemMs)
      add('svga.parser.load', trace.durations.parserLoadMs)
      add('svga.setVideoItem', trace.durations.setVideoItemMs)
      add('svga.startAnimation', trace.durations.startAnimationMs)

      const title = `[SVGA-PERF] ${trace.svgaName} idb=${trace.meta.idbHit === true ? 'hit' : trace.meta.idbHit === false ? 'miss' : 'n/a'} id=${trace.id}`
      if (console.groupCollapsed) console.groupCollapsed(title)
      else console.log(title)
      if (console.table) console.table(rows)
      else console.log(rows)
      console.log('meta:', trace.meta)
      if (console.groupEnd) console.groupEnd()
    },
    /**
     * 判断传入的 `imgName` 类型，并触发对应加载逻辑：
     * - 图片：`imgPattern = 1`，并生成 `imgPath`
     * - SVGA：`imgPattern = 2`，并调用 `loadSvga`
     * - 其他：默认按 JSON 动画处理（`imgPattern = 3`）
     *
     * @returns {boolean|void} 未传入 `imgName` 时返回 `false`。
     */
    judegPattern() {
      // console.log('imgName:', this.imgName)
      if (!this.imgName) return false
      const picPatternEnum = /\.(jpg|jpeg|png|gif|bmp)$/i // 图片格式枚举,验证参后缀格式,i忽略大小写
      let isPic = picPatternEnum.test(this.imgName)
      const svgaPatternEnum = /\.(svga)$/i // svga格式枚举
      let isSvga = svgaPatternEnum.test(this.imgName)
      if (isPic) {
        this.imgPattern = 1
        this.imgPath = this.picPathFn(this.imgName)
      } else if (isSvga) {
        this.imgPattern = 2
        this.loadSvga()
      } else {
        this.imgPattern = 3
        this.loadJson()
      }
      // console.log('imgPattern:', this.imgPattern)
      // console.log('imgPath:', this.imgPath)
    },
    /**
     * pic路径
     */
    picPathFn(name) {
      let onlinePatternEnum = /^https?:\/\//i // 验证参前缀是否http、https
      let isOnline = onlinePatternEnum.test(this.name)
      if (isOnline) {
        return name
      } else {
        // env提供目录名
        return require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${name}`)
      }
    },
    /**
     * pic裂开执行
     */
    imgError(event) {
      event.currentTarget.src =
        'data:image/png;base64,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'
      event.currentTarget.style.width = 'auto'
      return true
    },
    /**
     * 头像图片裂开执行
     */
    imgAtError(event) {
      event.currentTarget.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
    },
    /**
     * 获取svgaUrl
     * @prop {boolean} isIndexDB svga是否走indexDB缓存
     * @prop {string} isLocal svga走本地文件
     */
    svgaFn(svgaName) {
      let svgaUrl
      const trace = this.svgaPerfEnabled() ? this.createSvgaPerfTrace(svgaName) : null
      if (trace) trace.meta.isIndexDB = Boolean(this.isIndexDB)
      try {
        // NOTE: 内存 Map 缓存 videoItem 逻辑先保留，但本轮只启用 IndexedDB(videoItem) 缓存。
        // if (svgaVideoItemCacheHas(svgaName)) {
        //   if (trace) {
        //     trace.meta.memVideoItemPrecheck = true
        //     trace.meta.idbHit = null
        //   }
        //   this.svgaStart(undefined, svgaName, trace)
        //   return
        // }
        if (this.isIndexDB) {
          const shouldUseVideoItemIdb = this.svgaVideoItemIdbEnabled()
          if (trace) trace.meta.videoItemIdbEnabled = Boolean(shouldUseVideoItemIdb)
          let now = new Date()
          let currentDbName = `h5_svgas_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
          // console.log('indexedDB currentDbName', currentDbName)
          try {
            let prevDb = localStorage.getItem('h5_svgas_active_db')
            if (prevDb && prevDb !== currentDbName) {
              // 过月则删除上一个月的数据库
              indexedDB.deleteDatabase(prevDb)
              console.log('deleted previous indexedDB:', prevDb)
            }
            // 记录当前正在使用的数据库名
            localStorage.setItem('h5_svgas_active_db', currentDbName)
          } catch (e) {
            console.warn('clear previous indexedDB failed', e)
          }
          const idbOpenStartAt = trace ? this.svgaPerfNow() : 0
          let request = indexedDB.open(currentDbName, SVGA_IDB_DB_VERSION)
          // console.log(request)
          // 数据库升级时触发(通常非首次不触发)
          request.onupgradeneeded = (event) => {
            console.log('indexDB onupgradeneeded')
            let db = event.target.result
            if (!db.objectStoreNames.contains('svga_list')) {
              db.createObjectStore('svga_list', { keyPath: 'svga_name' })
              console.log('created objectStore svga_list')
            } else {
              console.log('objectStore svga_list already exists')
            }
            try {
              const tx = event.target.transaction
              if (!db.objectStoreNames.contains('svga_videoitem')) {
                db.createObjectStore('svga_videoitem', { keyPath: 'svga_name' })
                console.log('created objectStore svga_videoitem')
              }

              let metaStore
              if (!db.objectStoreNames.contains('svga_videoitem_meta')) {
                metaStore = db.createObjectStore('svga_videoitem_meta', { keyPath: 'svga_name' })
                console.log('created objectStore svga_videoitem_meta')
              } else if (tx) {
                metaStore = tx.objectStore('svga_videoitem_meta')
              }

              if (metaStore && metaStore.indexNames && !metaStore.indexNames.contains('lastAccessed')) {
                metaStore.createIndex('lastAccessed', 'lastAccessed', { unique: false })
              }
            } catch (e) {
              console.warn('create svga_videoitem stores/index failed', e)
            }
          }
          request.onerror = (event) => {
            // let deleteDbRequest = indexedDB.deleteDatabase('h5_svgas')
            // deleteDbRequest.onsuccess = function (event) {
            //   console.log('onerror detete')
            // }
            if (trace) {
              trace.meta.idbError = true
              trace.meta.idbErrorMsg = event && event.target && event.target.error ? String(event.target.error) : 'unknown'
            }
            this.svgaStart(svgaUrl, svgaName, trace)
            console.error('Database error:', event.target.error)
          }
          request.onsuccess = (event) => {
            // console.log('onsuccess')
            let db = event.target.result
            if (trace) {
              trace.durations.idbOpenMs = this.svgaPerfNow() - idbOpenStartAt
              trace.meta.dbName = currentDbName
            }

            const isQuotaError = (err) => {
              if (!err) return false
              const name = err && err.name ? String(err.name) : ''
              const msg = err ? String(err) : ''
              return name === 'QuotaExceededError' || msg.includes('QuotaExceededError') || msg.includes('QUOTA') || msg.includes('quota')
            }

            const evictOldVideoItems = (maxToDelete = 2) => {
              return new Promise((resolve) => {
                let deleted = 0
                let done = false
                const finish = () => {
                  if (done) return
                  done = true
                  resolve(deleted)
                }

                try {
                  const tx = db.transaction(['svga_videoitem_meta', 'svga_videoitem', 'svga_list'], 'readwrite')
                  const metaStore = tx.objectStore('svga_videoitem_meta')
                  const videoStore = tx.objectStore('svga_videoitem')
                  const blobStore = tx.objectStore('svga_list')

                  let cursorReq
                  try {
                    cursorReq = metaStore.index('lastAccessed').openCursor()
                  } catch (e) {
                    cursorReq = null
                  }

                  const fallbackEvictFromVideoStore = () => {
                    try {
                      const req = videoStore.openCursor()
                      req.onsuccess = (e) => {
                        const cursor = e && e.target ? e.target.result : null
                        if (!cursor) return
                        const key = cursor.primaryKey
                        if (key === svgaName) {
                          cursor.continue()
                          return
                        }
                        try {
                          videoStore.delete(key)
                          blobStore.delete(key)
                          metaStore.delete(key)
                          deleted += 1
                        } catch (e2) {}
                        if (deleted >= maxToDelete) return
                        cursor.continue()
                      }
                    } catch (e) {}
                  }

                  if (cursorReq) {
                    cursorReq.onsuccess = (e) => {
                      const cursor = e && e.target ? e.target.result : null
                      if (!cursor) {
                        if (deleted === 0) fallbackEvictFromVideoStore()
                        return
                      }
                      const key = cursor.primaryKey
                      if (key === svgaName) {
                        cursor.continue()
                        return
                      }
                      try {
                        metaStore.delete(key)
                        videoStore.delete(key)
                        blobStore.delete(key)
                        deleted += 1
                      } catch (e2) {}
                      if (deleted >= maxToDelete) return
                      cursor.continue()
                    }
                    cursorReq.onerror = () => {
                      fallbackEvictFromVideoStore()
                    }
                  } else {
                    fallbackEvictFromVideoStore()
                  }

                  tx.oncomplete = finish
                  tx.onerror = finish
                  tx.onabort = finish
                } catch (e) {
                  finish()
                }
              })
            }

            const putVideoItemAndDeleteBlobOnce = (videoItem, attempt = 1) => {
              return new Promise((resolve, reject) => {
                const nowTs = Date.now()
                try {
                  const tx = db.transaction(['svga_videoitem', 'svga_videoitem_meta', 'svga_list'], 'readwrite')
                  const videoStore = tx.objectStore('svga_videoitem')
                  const metaStore = tx.objectStore('svga_videoitem_meta')
                  const blobStore = tx.objectStore('svga_list')

                  videoStore.put({ svga_name: svgaName, svga_videoitem: videoItem, savedAt: nowTs, schema: 1 })
                  metaStore.put({ svga_name: svgaName, savedAt: nowTs, lastAccessed: nowTs, schema: 1 })
                  blobStore.delete(svgaName)

                  tx.oncomplete = () => {
                    resolve()
                  }
                  tx.onerror = () => {
                    reject(tx.error || new Error('idb.putVideoItem tx error'))
                  }
                  tx.onabort = () => {
                    reject(tx.error || new Error('idb.putVideoItem tx abort'))
                  }
                } catch (e) {
                  reject(e)
                }
              }).catch(async (err) => {
                if (!isQuotaError(err) || attempt >= 2) throw err
                const evicted = await evictOldVideoItems(2)
                if (trace) {
                  trace.meta.idbVideoItemEvictedCount = evicted
                  trace.meta.idbPutVideoItemRetried = true
                }
                return putVideoItemAndDeleteBlobOnce(videoItem, attempt + 1)
              })
            }

            const scheduleVideoItemPut = (videoItem) => {
              if (!shouldUseVideoItemIdb || !videoItem) return
              if (trace) trace.meta.idbPutVideoItemDeferred = true
              this.enqueueSvgaIdleTask(() => {
                const putStartAt = trace ? this.svgaPerfNow() : 0
                putVideoItemAndDeleteBlobOnce(videoItem).then(() => {
                  if (trace) {
                    trace.durations.idbPutVideoItemMs = this.svgaPerfNow() - putStartAt
                    trace.meta.blobDeletedAfterVideoItem = true
                  }
                }).catch((e) => {
                  if (trace) {
                    trace.durations.idbPutVideoItemMs = this.svgaPerfNow() - putStartAt
                    trace.meta.idbPutVideoItemError = true
                    trace.meta.idbPutVideoItemErrorMsg = e ? String(e) : 'unknown'
                  }
                })
              })
            }

            const scheduleVideoItemMetaTouch = (savedAtHint) => {
              if (!shouldUseVideoItemIdb) return
              this.enqueueSvgaIdleTask(() => {
                try {
                  const nowTs = Date.now()
                  const tx = db.transaction(['svga_videoitem_meta', 'svga_list'], 'readwrite')
                  tx.objectStore('svga_videoitem_meta').put({ svga_name: svgaName, savedAt: typeof savedAtHint === 'number' ? savedAtHint : nowTs, lastAccessed: nowTs, schema: 1 })
                  tx.objectStore('svga_list').delete(svgaName)
                } catch (e) {}
              })
            }

            const loadFromSvgaList = () => {
              let queryObjectStore = db.transaction(['svga_list'], 'readwrite').objectStore('svga_list')
              const idbGetStartAt = trace ? this.svgaPerfNow() : 0
              queryObjectStore.get(svgaName).onsuccess = (event) => {
                let result = event.target.result
                if (trace) {
                  trace.durations.idbGetMs = this.svgaPerfNow() - idbGetStartAt
                  trace.meta.idbHit = Boolean(result)
                }
                // console.log('查询结果:', result)
                if (result) {
                  const cachedValue = result.svga_value
                  if (trace) trace.meta.cacheReadType = result.svga_value_type || typeof cachedValue
                  const hooks = shouldUseVideoItemIdb ? { onLoaded: ({ videoItem }) => scheduleVideoItemPut(videoItem) } : undefined
                  if (cachedValue && typeof cachedValue === 'object' && typeof Blob !== 'undefined' && cachedValue instanceof Blob) {
                    if (trace) trace.meta.cacheReadType = 'blob'
                    this.loadSvgaFromBlob(cachedValue, svgaName, trace, undefined, hooks)
                  } else {
                    svgaUrl = cachedValue
                    this.svgaStart(svgaUrl, svgaName, trace, hooks)
                  }
                } else {
                  svgaUrl = this.getSvgaName(svgaUrl, svgaName)
                  const remoteUrl = svgaUrl
                  this.fetchResourceAsBlob(remoteUrl, trace).then(blob => {
                    if (trace) trace.meta.cacheWriteType = 'blob'
                    const scheduleIdbPut = shouldUseVideoItemIdb
                      ? null
                      : () => {
                        if (trace) trace.meta.idbPutDeferred = true
                        this.enqueueSvgaIdleTask(() => {
                          const putStartAt = trace ? this.svgaPerfNow() : 0
                          try {
                            const tx = db.transaction(['svga_list'], 'readwrite')
                            const store = tx.objectStore('svga_list')
                            store.put({ svga_name: svgaName, svga_value: blob, svga_value_type: 'blob' })
                            if (trace) {
                              tx.oncomplete = () => {
                                trace.durations.idbPutMs = this.svgaPerfNow() - putStartAt
                              }
                              tx.onerror = () => {
                                trace.meta.idbPutError = true
                              }
                            }
                          } catch (e) {
                            if (trace) {
                              trace.meta.idbPutError = true
                              trace.meta.idbPutErrorMsg = e ? String(e) : 'unknown'
                            }
                          }
                        })
                      }
                    const hooks = shouldUseVideoItemIdb
                      ? { onLoaded: ({ videoItem }) => scheduleVideoItemPut(videoItem) }
                      : { onLoaded: scheduleIdbPut }
                    this.loadSvgaFromBlob(blob, svgaName, trace, remoteUrl, hooks)
                  }).catch((e) => {
                    if (trace) {
                      trace.meta.missFallbackToRemote = true
                      trace.meta.missFallbackError = e ? String(e) : 'unknown'
                    }
                    this.svgaStart(remoteUrl, svgaName, trace)
                  })
                }
              }
            }

            if (shouldUseVideoItemIdb) {
              try {
                const idbGetVideoItemStartAt = trace ? this.svgaPerfNow() : 0
                const tx = db.transaction(['svga_videoitem'], 'readonly')
                const store = tx.objectStore('svga_videoitem')
                const req = store.get(svgaName)
                req.onsuccess = (event) => {
                  const result = event && event.target ? event.target.result : null
                  if (trace) {
                    trace.durations.idbGetVideoItemMs = this.svgaPerfNow() - idbGetVideoItemStartAt
                    trace.meta.idbVideoItemHit = Boolean(result && result.svga_videoitem)
                  }
                  const videoItem = result && result.svga_videoitem ? result.svga_videoitem : null
                  if (videoItem) {
                    if (trace) trace.meta.loadSourceType = 'idbVideoItem'
                    const played = this.svgaStartVideoItem(videoItem, svgaName, trace)
                    if (played) {
                      scheduleVideoItemMetaTouch(result && typeof result.savedAt === 'number' ? result.savedAt : undefined)
                      return
                    }
                    if (trace) trace.meta.idbVideoItemFallback = true
                    try {
                      const txDel = db.transaction(['svga_videoitem', 'svga_videoitem_meta', 'svga_list'], 'readwrite')
                      txDel.objectStore('svga_videoitem').delete(svgaName)
                      txDel.objectStore('svga_videoitem_meta').delete(svgaName)
                      txDel.objectStore('svga_list').delete(svgaName)
                    } catch (e) {
                      if (trace) {
                        trace.meta.idbVideoItemDeleteError = true
                        trace.meta.idbVideoItemDeleteErrorMsg = e ? String(e) : 'unknown'
                      }
                    }
                    loadFromSvgaList()
                    return
                  }
                  loadFromSvgaList()
                }
                req.onerror = () => {
                  if (trace) trace.meta.idbGetVideoItemError = true
                  loadFromSvgaList()
                }
              } catch (e) {
                if (trace) {
                  trace.meta.idbGetVideoItemError = true
                  trace.meta.idbGetVideoItemErrorMsg = e ? String(e) : 'unknown'
                }
                loadFromSvgaList()
              }
            } else {
              loadFromSvgaList()
            }
          }
          // console.log(request)
        } else {
          if (trace) trace.meta.idbHit = null
          this.svgaStart(svgaUrl, svgaName, trace)
        }
      } catch (error) {
        if (trace) {
          trace.meta.exception = true
          trace.meta.exceptionMsg = error ? String(error) : 'unknown'
        }
        this.svgaStart(undefined, svgaName, trace)
      }
      // console.log('svgaUrl1', svgaUrl)
      // this.svgaStart(svgaUrl, svgaName)
    },
    /**
     * 根据入参生成最终 SVGA URL。
     * - `svgaUrl` 优先（传了就用）。
     * - 未传时：本地走 `require`；线上走 `VUE_APP_OSS_PATH` 拼接或直传 URL。
     *
     * @param {string|undefined|null} svgaUrl - 直接可用的 URL（可为空）。
     * @param {string} svgaName - SVGA 文件名或 URL。
     * @returns {string}
     */
    getSvgaName(svgaUrl, svgaName) {
      let temUrl = svgaUrl
      if (!svgaUrl) {
        if (this.isLocal) {
          temUrl = require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${svgaName}`)
        } else {
          let onlinePatternEnum = /^https?:\/\//i // 验证参前缀是否http、https
          let isOnline = onlinePatternEnum.test(svgaName)
          temUrl = isOnline ? svgaName : `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/${svgaName}`
        }
      }
      return temUrl
    },
    /**
     * 使用已解析好的 `videoItem` 直接启动播放（跳过 Parser.load）。
     * 主要用于 IndexedDB 读取命中时的快速路径。
     *
     * @param {Object} videoItem - SVGA Parser 的解析结果。
     * @param {string} svgaName - 名称/标识。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @param {Object} [hooks] - 可选回调：`onLoaded` / `onError`。
     * @returns {Object|undefined} svga_play - SVGA.Player 实例。
     */
    svgaStartVideoItem(videoItem, svgaName, trace, hooks) {
      try {
        if (!videoItem) return
        const url = this.getSvgaName(undefined, svgaName)
        // NOTE: 内存 Map 缓存 videoItem 逻辑先保留，但本轮只启用 IndexedDB(videoItem) 缓存。
        // svgaVideoItemCacheSet(svgaName || url, videoItem)
        const svga_play = new SVGA.Player(`#${this.svgaId}`)
        this.svga_data = svga_play
        svga_play.loops = this.loop || 0
        svga_play.clearsAfterStop = false
        svga_play.fillMode = 'forwards'

        if (trace) {
          trace.meta.memVideoItemHit = false
          trace.meta.loadSourceType = trace.meta.loadSourceType || 'videoItem'
          trace.durations.parserLoadMs = 0
        }

        const setVideoItemStartAt = trace ? this.svgaPerfNow() : 0
        svga_play.setVideoItem(videoItem)
        if (trace) trace.durations.setVideoItemMs = this.svgaPerfNow() - setVideoItemStartAt
        const startAnimationStartAt = trace ? this.svgaPerfNow() : 0
        svga_play.startAnimation()
        if (trace) trace.durations.startAnimationMs = this.svgaPerfNow() - startAnimationStartAt
        try {
          if (hooks && typeof hooks.onLoaded === 'function') hooks.onLoaded({ url, videoItem, fromCache: false })
        } catch (e) {}
        svga_play.onFinished(() => {
          this.$emit('animOnFinished')
        })
        this.reportSvgaPerf(trace)
        return svga_play
      } catch (e) {
        if (trace) {
          trace.meta.videoItemStartError = true
          trace.meta.videoItemStartErrorMsg = e ? String(e) : 'unknown'
          this.reportSvgaPerf(trace)
        }
      }
    },
    /**
     * 播放 SVGA。
     * - `svgaUrl` 会经 `getSvgaName` 统一处理为最终可加载 URL。
     * - 若 URL 来自 `URL.createObjectURL`，播放结束或失败后会回收（`revokeSvgaObjectUrl`）。
     *
     * @param {string|undefined|null} svgaUrl - 可选的直接 URL（可为空）。
     * @param {string} svgaName - SVGA 名称/标识（用于拼接兜底 URL）。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @param {Object} [hooks] - 可选回调：`onLoaded` / `onError`。
     * @returns {Object} svga_play - SVGA.Player 实例。
     */
    svgaStart(svgaUrl, svgaName, trace, hooks) {
      let url = this.getSvgaName(svgaUrl, svgaName)
      // 只有当本次播放使用的是组件内部创建的 ObjectURL 时，才需要在结束后回收
      const shouldRevokeObjectUrl = Boolean(this.svgaObjectUrl && typeof url === 'string' && url === this.svgaObjectUrl)
      const svga_play = new SVGA.Player(`#${this.svgaId}`)
      this.svga_data = svga_play
      svga_play.loops = this.loop || 0
      svga_play.clearsAfterStop = false // 播放完不清空画布
      svga_play.fillMode = 'forwards' // 播放完停留在最后一帧
      // NOTE: 内存 Map 缓存 videoItem 逻辑先保留，但本轮只启用 IndexedDB(videoItem) 缓存。
      // const cacheKey = svgaName || url
      // const cachedVideoItem = svgaVideoItemCacheGet(cacheKey)
      // if (cachedVideoItem) {
      //   if (trace) {
      //     trace.meta.memVideoItemHit = true
      //     trace.meta.loadSourceType = 'memVideoItem'
      //     trace.durations.parserLoadMs = 0
      //   }
      //   const setVideoItemStartAt = trace ? this.svgaPerfNow() : 0
      //   svga_play.setVideoItem(cachedVideoItem)
      //   if (trace) trace.durations.setVideoItemMs = this.svgaPerfNow() - setVideoItemStartAt
      //   const startAnimationStartAt = trace ? this.svgaPerfNow() : 0
      //   svga_play.startAnimation()
      //   if (trace) trace.durations.startAnimationMs = this.svgaPerfNow() - startAnimationStartAt
      //   try {
      //     if (hooks && typeof hooks.onLoaded === 'function') hooks.onLoaded({ url, videoItem: cachedVideoItem, fromCache: true })
      //   } catch (e) {}
      //   svga_play.onFinished(() => {
      //     this.$emit('animOnFinished')
      //   })
      //   if (shouldRevokeObjectUrl) this.revokeSvgaObjectUrl()
      //   this.reportSvgaPerf(trace)
      //   return svga_play
      // }

      const svga_parser = new SVGA.Parser(`#${this.svgaId}`)
      const parserLoadStartAt = trace ? this.svgaPerfNow() : 0
      svga_parser.load(url, (videoItem) => {
        if (trace) trace.durations.parserLoadMs = this.svgaPerfNow() - parserLoadStartAt
        // NOTE: 内存 Map 缓存 videoItem 逻辑先保留，但本轮只启用 IndexedDB(videoItem) 缓存。
        // svgaVideoItemCacheSet(cacheKey, videoItem)
        const setVideoItemStartAt = trace ? this.svgaPerfNow() : 0
        svga_play.setVideoItem(videoItem)
        if (trace) trace.durations.setVideoItemMs = this.svgaPerfNow() - setVideoItemStartAt
        const startAnimationStartAt = trace ? this.svgaPerfNow() : 0
        svga_play.startAnimation()
        if (trace) trace.durations.startAnimationMs = this.svgaPerfNow() - startAnimationStartAt
        try {
          if (hooks && typeof hooks.onLoaded === 'function') hooks.onLoaded({ url, videoItem })
        } catch (e) {}
        svga_play.onFinished(() => {
          this.$emit('animOnFinished')
        })
        if (shouldRevokeObjectUrl) this.revokeSvgaObjectUrl()
        this.reportSvgaPerf(trace)
      }, (error) => {
        if (trace) {
          trace.durations.parserLoadMs = this.svgaPerfNow() - parserLoadStartAt
          trace.meta.parserLoadError = true
          trace.meta.parserLoadErrorMsg = error ? String(error) : 'unknown'
          this.reportSvgaPerf(trace)
        }
        try {
          if (hooks && typeof hooks.onError === 'function') hooks.onError({ url, error })
        } catch (e) {}
        if (shouldRevokeObjectUrl) this.revokeSvgaObjectUrl()
        console.log(`svgaStart ERROR  svgaName: ${this.imgPath} error: ${error}`)
      })
      return svga_play
    },
    /**
     * 挂载svga
     */
    loadSvga() {
      this.$nextTick(() => {
        this.clearSvga()
        this.svga_data = this.svgaFn(this.imgPath)
      })
    },
    /**
     * 销毁svga
     */
    clearSvga() {
      if (this.imgPath && this.svga_data) {
        this.svga_data.stopAnimation()
        this.svga_data.clear()
        this.svga_data.clearDynamicObjects()
        this.svga_data = null
      }
      this.revokeSvgaObjectUrl()
    },
    /**
     * json前置函数
     * @prop {Number} loop 循环,默认true
     */
    jsonFn(jsonName, className, loop = true) {
      const params = {
        container: document.querySelector(className),
        renderer: 'svg',
        loop,
        path: `${process.env.VUE_APP_OSS_PATH}activity/weekly/json/${jsonName}/data.json`,
        autoplay: true,
        assetsPath: `${process.env.VUE_APP_OSS_PATH}activity/weekly/json/${jsonName}/images/`
      }
      return lottie.loadAnimation(params)
    },
    /**
     * 跳转到第n帧并暂停
     */
    goToAndStop(n) {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.goToAndStop(n - 1)
      }
    },
    /**
     * 暂停json
     */
    pauseJson() {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.pause()
      }
    },
    /**
     * 播放json
     */
    playJson() {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.play()
      }
    },
    /**
     * 执行json动画
     */
    loadJson() {
      this.$nextTick(() => {
        this.destroyJson()
        this.PublicJsonObj = this.jsonFn(this.imgPath, `#${this.jsonId}`, this.loop)
        this.PublicJsonObj.addEventListener('DOMLoaded', () => {
          // console.log('json挂载完成')
          this.$emit('DOMLoaded')
        })
        if (this.needPause) {
          this.PublicJsonObj.addEventListener('enterFrame', (e) => {
            // console.log(e.currentTime)
            if (e.currentTime >= this.needPause) {
              // this.goToAndStop(this.needPause)
              console.log(`暂停在第${this.needPause}帧`)
              // this.$emit('showReward') // 暂停后回调,自配置
            }
          })
        }
        if (!this.loop) {
          this.PublicJsonObj.addEventListener('complete', () => {
            this.$emit('complete') // 结束后回调,自配置
          })
        }
      })
    },
    /**
     * 销毁json
     */
    destroyJson() {
      if (this.imgPath && this.PublicJsonObj) {
        this.PublicJsonObj.destroy()
        this.PublicJsonObj = null
      }
    },
    /**
     * 将ArrayBuffer转换为base64字符串
     * @param {ArrayBuffer} buffer - 要转换的ArrayBuffer
     * @return {string} base64编码的字符串
     */
    arrayBufferToBase64(buffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return btoa(binary)
    },
    /**
     * 从 URL 拉取资源并返回 Blob。
     * 当开启 SVGA 性能统计时，会记录 fetch/读取 Blob 的耗时与 blob 元信息。
     *
     * @param {string} url - 资源 URL。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @returns {Promise<Blob>}
     */
    async fetchResourceAsBlob(url, trace) {
      try {
        const fetchStartAt = trace ? this.svgaPerfNow() : 0
        const response = await fetch(url)
        if (trace) trace.durations.fetchHeadersMs = this.svgaPerfNow() - fetchStartAt
        if (!response.ok) {
          throw new Error(`资源请求失败: ${response.status} ${response.statusText}`)
        }
        const blobStartAt = trace ? this.svgaPerfNow() : 0
        const blob = await response.blob()
        if (trace) {
          trace.durations.blobMs = this.svgaPerfNow() - blobStartAt
          trace.meta.blobSize = blob && typeof blob.size === 'number' ? blob.size : undefined
          trace.meta.blobType = blob && typeof blob.type === 'string' ? blob.type : undefined
        }
        return blob
      } catch (error) {
        console.error('资源获取 Blob 失败:', error)
        if (trace) {
          trace.meta.fetchError = true
          trace.meta.fetchErrorMsg = error ? String(error) : 'unknown'
          this.reportSvgaPerf(trace)
        }
        throw error
      }
    },
    /**
     * 从 URL 拉取资源并返回 base64 DataURL（`data:application/octet-stream;base64,...`）。
     * 当开启 SVGA 性能统计时，会记录 fetch/读取 ArrayBuffer/base64 编码的耗时。
     *
     * @param {string} url - 资源 URL。
     * @param {Object|null} trace - 性能追踪对象（可为空）。
     * @returns {Promise<string>}
     */
    async fetchResourceAsBase64(url, trace) {
      try {
        // 使用浏览器原生 fetch API 获取资源
        const fetchStartAt = trace ? this.svgaPerfNow() : 0
        let response = await fetch(url)
        if (trace) trace.durations.fetchHeadersMs = this.svgaPerfNow() - fetchStartAt
        // 检查响应状态
        if (!response.ok) {
          throw new Error(`资源请求失败: ${response.status} ${response.statusText}`)
        }
        // 将响应转换为ArrayBuffer
        const arrayBufferStartAt = trace ? this.svgaPerfNow() : 0
        let arrayBuffer = await response.arrayBuffer()
        if (trace) trace.durations.arrayBufferMs = this.svgaPerfNow() - arrayBufferStartAt
        // 使用已有的arrayBufferToBase64函数转换
        const base64StartAt = trace ? this.svgaPerfNow() : 0
        let base64String = this.arrayBufferToBase64(arrayBuffer)
        if (trace) trace.durations.base64EncodeMs = this.svgaPerfNow() - base64StartAt
        // console.log('base64String', base64String)
        // 返回标准的data URL格式
        return `data:application/octet-stream;base64,${base64String}`
      } catch (error) {
        console.error('资源转换失败:', error)
        if (trace) {
          trace.meta.fetchError = true
          trace.meta.fetchErrorMsg = error ? String(error) : 'unknown'
          this.reportSvgaPerf(trace)
        }
        throw error
      }
    }
  },
  beforeDestroy() {
    this.cancelSvgaIdleTasks()
    if (this.imgPattern === 3) {
      this.PublicJsonObj.removeEventListener('enterFrame')
      this.destroyJson()
    } else if (this.imgPattern === 2) {
      this.clearSvga()
    }
  }
}
</script>

<style scoped lang="scss">
/**
  * 暂图像大小默认宽高最大100%,保持尺寸比例,需父组件赋值,位置暂默认垂直水平居中
  */
.imgCompo {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .picImg {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; // cover保持原有尺寸比例，内容可被剪裁
    &.micImg {
      position: relative;
    }
    &.voiceImg {
      position: relative;
    }
  }
  .micAvatar {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &.micA {
      img {
        // width: 100% * 0.8;
        height: 100% * 0.8;
        object-fit: contain;
        border-radius: 50%;
      }
    }
    &.voiceA {
      img {
        // width: 100% * 0.6;
        height: 100% * 0.6;
        object-fit: contain;
        border-radius: 50%;
        z-index: 10;
      }
    }
  }
  .svgaBox {
    width: 100%;
    height: 100%;
  }
  .jsonBox {
    width: 100%;
    height: 100%;
  }
}
</style>
