<template>
  <div class="jsonImage">
    <div class="jsonBox" :id="jsonId" />
  </div>
</template>

<script>
import JSZip from 'jszip'
import lottie from 'lottie-web'
import { deleteJsonZipData, getJsonZipData } from './jsonZipIdb'

/**
 * @name jsonImage
 * @description lottie 目录/zip 动画组件，只处理 lottie 动画资源。
 *
 * @prop {String} imgName zip 文件、目录路径或完整 URL；非 zip 一律按目录处理。
 * @prop {Boolean} loop 是否循环播放。
 *
 * @event complete 非循环播放完成后触发。
 * @event loaded 动画完成首轮可渲染准备后触发。
 * @event error 目录/zip 加载、解压或解析失败时触发。
 *
 * @example
 * <jsonImage imgName="activity/example" :loop="true" @loaded="onLoaded" @error="onError" />
 *
 * @example
 * <jsonImage imgName="activity/example.zip" :loop="false" @complete="onComplete" />
 */
export default {
  name: 'jsonImage',
  props: {
    imgName: { type: String, default: '' },
    loop: { type: Boolean, default: true }
  },
  data() {
    return {
      animationInstance: null, // 动画实例
      isPlaying: true, // 是否处在播放状态
      imgPath: '', // 图像地址
      isLoaded: false, // 是否已开始渲染
      loadToken: 0 // 防止load异步加载，旧请求回调乱入
    }
  },
  computed: {
    jsonId() {
      return `json_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
  },
  watch: {
    imgName: {
      immediate: true,
      handler() {
        this.loadAnimation()
      }
    }
  },
  activated() {
    console.log('jsonImage activated')
    if (this.isPlaying) return
    this.isPlaying = true
    if (!this.isLoaded) return console.log('jsonImage load回调还没回来')
    try {
      this.animationInstance?.goToAndPlay(0, true)
    } catch (error) {
      this.handleError(error, this.loadToken)
    }
  },
  deactivated() {
    console.log('jsonImage deactivated')
    if (!this.isPlaying) return
    this.isPlaying = false
    if (!this.isLoaded) return console.log('jsonImage load回调还没回来')
    try {
      this.animationInstance?.pause()
    } catch (error) {}
  },
  methods: {
    /**
     * 挂载动画。
     */
    loadAnimation() {
      const token = this.loadToken + 1
      this.loadToken = token
      this.$nextTick(async () => {
        try {
          if (token !== this.loadToken) return
          this.destroyAnimation()
          this.imgPath = this.imgName || ''
          this.isLoaded = false
          if (!this.imgPath) return
          if (this.isZipResource(this.imgPath)) {
            await this.loadZip(this.imgPath, token)
            return
          }
          this.loadJson(this.imgPath, token)
        } catch (error) {
          this.handleError(error, token)
        }
      })
    },
    /**
     * 是否为完整 http(s) 地址。
     */
    isHttpUrl(url) {
      return /^https?:\/\//i.test(url)
    },
    /**
     * 拼接 OSS 地址。
     */
    joinOssPath(path) {
      const base = process.env.VUE_APP_OSS_PATH || ''
      if (!base) return path
      const normalizedBase = base.endsWith('/') ? base : `${base}/`
      const normalizedPath = String(path || '').startsWith('/') ? String(path).slice(1) : String(path || '')
      return `${normalizedBase}${normalizedPath}`
    },
    /**
     * 远程动画资源路径。
     */
    getJsonUrl(name) {
      if (this.isHttpUrl(name)) return name
      const rawName = String(name || '')
      const normalizedName = rawName.startsWith('/') ? rawName.slice(1) : rawName
      if (normalizedName.includes('/')) return this.joinOssPath(normalizedName)
      return this.joinOssPath(`activity/weekly/json/${normalizedName}`)
    },
    /**
     * 去掉 query/hash 后判断资源后缀。
     */
    getCleanPath(path) {
      return String(path || '').split(/[?#]/)[0]
    },
    /**
     * 判断是否为 zip 包。
     */
    isZipResource(path) {
      return /\.zip$/i.test(this.getCleanPath(path))
    },
    /**
     * 规范化 lottie json 地址。
     */
    normalizeJsonUrl(urlOrDir) {
      const raw = String(urlOrDir || '')
      const clean = this.getCleanPath(raw)
      const dir = clean.endsWith('/') ? clean : `${clean}/`
      return {
        path: `${dir}data.json`,
        assetsPath: `${dir}images/`
      }
    },
    /**
     * 执行普通 json 动画。
     */
    loadJson(imgName, token) {
      if (token !== this.loadToken) return
      const res = this.normalizeJsonUrl(this.getJsonUrl(imgName))
      this.createAnimation(
        {
          path: res.path,
          assetsPath: res.assetsPath
        },
        token,
        this.jsonId
      )
    },
    /**
     * 执行 zip 动画。
     */
    loadZip(imgName, token) {
      if (token !== this.loadToken) return
      const zipUrl = this.getJsonUrl(imgName)
      return this.loadZipWithFallback(zipUrl, token)
    },
    /**
     * 加载并解析 zip；缓存数据解析或播放失败时重新下载自愈一次。
     */
    async loadZipWithFallback(zipUrl, token, hasRetried = false) {
      let fromCache = false
      try {
        const result = await getJsonZipData(zipUrl, {
          skipCache: hasRetried,
          withCacheInfo: true
        })
        if (!result.zipBuffer || token !== this.loadToken) return
        fromCache = result.fromCache
        const zip = await JSZip.loadAsync(result.zipBuffer)
        if (token !== this.loadToken) return
        const animationData = await this.getZipAnimationData(zip)
        if (token !== this.loadToken) return
        this.createAnimation({ animationData }, token, this.jsonId, {
          zipUrl,
          fromCache,
          hasRetried
        })
      } catch (error) {
        if (token !== this.loadToken) return
        if (fromCache && !hasRetried) {
          await this.deleteBadJsonZipCache(zipUrl, token)
          if (token !== this.loadToken) return
          return this.loadZipWithFallback(zipUrl, token, true)
        }
        this.handleError(error, token)
      }
    },
    /**
     * 删除坏缓存；删除失败不阻塞本次重新下载。
     */
    async deleteBadJsonZipCache(zipUrl, token) {
      if (token !== this.loadToken) return
      try {
        await deleteJsonZipData(zipUrl)
      } catch (error) {}
    },
    /**
     * 创建 lottie 实例。
     */
    createAnimation(options, token, id, zipFallback = null) {
      const container = document.querySelector(`#${id}`)
      if (!container) {
        throw new Error('jsonImage 容器不存在')
      }

      this.animationInstance = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.isPlaying,
        ...options
      })

      this.animationInstance.addEventListener('DOMLoaded', (event) => {
        if (token !== this.loadToken) return
        this.emitLoaded(token)
      })
      if (!this.loop) {
        this.animationInstance.addEventListener('complete', (event) => {
          if (token !== this.loadToken) return
          this.$emit('complete', event)
        })
      }
      let isHandlingDataFailed = false
      this.animationInstance.addEventListener('data_failed', async (event) => {
        if (token !== this.loadToken) return
        const error = event || new Error('lottie data_failed')
        if (zipFallback?.fromCache && !zipFallback.hasRetried && zipFallback.zipUrl && !isHandlingDataFailed) {
          isHandlingDataFailed = true
          await this.deleteBadJsonZipCache(zipFallback.zipUrl, token)
          if (token !== this.loadToken) return
          return this.loadZipWithFallback(zipFallback.zipUrl, token, true)
        }
        this.handleError(error, token)
      })
    },
    /**
     * DOM 完成后再等一帧，避免 loaded 早于首轮渲染。
     */
    emitLoaded(token) {
      const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 0))
      raf(() => {
        if (token !== this.loadToken) return
        if (this.isLoaded) return
        this.isLoaded = true
        this.$emit('loaded')
      })
    },
    /**
     * 读取 zip 内 data.json 并替换图片资源。
     */
    async getZipAnimationData(zip) {
      const jsonFile = this.getDataJsonFile(zip)
      if (!jsonFile) {
        throw new Error('zip 中缺少 data.json')
      }
      const animationData = JSON.parse(await jsonFile.async('string'))
      if (!Array.isArray(animationData.assets) || animationData.assets.length === 0) {
        return animationData
      }

      const jsonDir = this.getZipFileDir(jsonFile.name)
      for (const asset of animationData.assets) {
        if (!asset || asset.e === 1 || !asset.p) continue
        const zipFile = this.getZipAssetFile(zip, asset, jsonDir)
        if (!zipFile) continue
        const mimeType = this.getMimeType(zipFile.name)
        const base64Data = await zipFile.async('base64')
        asset.u = ''
        asset.p = `data:${mimeType};base64,${base64Data}`
        asset.e = 1
      }
      return animationData
    },
    /**
     * 获取 data.json 文件。
     */
    getDataJsonFile(zip) {
      const directFile = zip.file('data.json')
      if (directFile) return directFile
      const matchName = Object.keys(zip.files).find((name) => /(^|\/)data\.json$/i.test(name))
      return matchName ? zip.file(matchName) : null
    },
    /**
     * 获取 zip 中的图片资源。
     */
    getZipAssetFile(zip, asset, jsonDir = '') {
      const normalizedU = String(asset.u || '').replace(/\\/g, '/')
      const normalizedP = String(asset.p || '').replace(/\\/g, '/')
      const assetPath = this.joinZipAssetPath(normalizedU, normalizedP)
      const withoutImagesPath = normalizedP.replace(/^images\//i, '')
      const candidates = [
        assetPath,
        normalizedP,
        withoutImagesPath,
        this.joinZipAssetPath(jsonDir, assetPath),
        this.joinZipAssetPath(jsonDir, normalizedP),
        this.joinZipAssetPath(jsonDir, withoutImagesPath)
      ]

      for (const candidate of candidates) {
        const normalizedCandidate = this.normalizeZipPath(candidate)
        if (!normalizedCandidate) continue
        const file = zip.file(normalizedCandidate)
        if (file) return file
      }
      return null
    },
    /**
     * 拼接 zip 内资源路径。
     */
    joinZipAssetPath(basePath, filePath) {
      const base = String(basePath || '').replace(/\\/g, '/').replace(/\/+$/, '')
      const file = String(filePath || '').replace(/\\/g, '/').replace(/^\/+/, '')
      if (!base) return file
      if (!file) return base
      return `${base}/${file}`
    },
    /**
     * 规范化 zip 内路径，兼容 ./、../、query/hash 与反斜杠。
     */
    normalizeZipPath(filePath) {
      const pathOnly = String(filePath || '').split(/[?#]/)[0].replace(/\\/g, '/')
      const parts = []
      pathOnly.split('/').forEach((part) => {
        if (!part || part === '.') return
        if (part === '..') {
          parts.pop()
          return
        }
        parts.push(part)
      })
      return parts.join('/')
    },
    /**
     * 获取 zip 文件所在目录。
     */
    getZipFileDir(fileName) {
      const normalizedName = this.normalizeZipPath(fileName)
      const lastSlash = normalizedName.lastIndexOf('/')
      return lastSlash >= 0 ? normalizedName.slice(0, lastSlash) : ''
    },
    /**
     * 通过扩展名推断 mime 类型。
     */
    getMimeType(fileName) {
      const ext = String(fileName || '').split('.').pop().toLowerCase()
      const mimeTypeMap = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml'
      }
      return mimeTypeMap[ext] || 'application/octet-stream'
    },
    /**
     * 处理加载错误。
     */
    handleError(error, token) {
      if (token !== this.loadToken) return
      console.error(`jsonImage load error: ${this.imgPath}`, error)
      this.$emit('error', error)
    },
    /**
     * 销毁动画实例。
     */
    destroyAnimation() {
      if (this.animationInstance) {
        this.animationInstance.destroy()
        this.animationInstance = null
      }
    }
  },
  beforeDestroy() {
    this.loadToken += 1
    this.destroyAnimation()
  }
}
</script>

<style scoped lang="scss">
.jsonImage {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .jsonBox {
    width: 100%;
    height: 100%;
  }
}
</style>
