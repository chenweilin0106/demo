<template>
  <div class="imgCompo">
    <template v-if="imgPattern === 1">
      <img class="picImg" :src="imgPath" @error="imgError" />
    </template>
    <template v-else-if="imgPattern === 2 || imgPattern === 3">
      <div class="jsonBox" :id="animationId" />
    </template>
  </div>
</template>

<script>
import JSZip from 'jszip'
import lottie from 'lottie-web'
import { getTitleZipData } from '@/views/m4/titleZipIdb'

export default {
  name: 'TitleImg',
  props: {
    imgName: { type: String, default: '' },
    loop: { type: Boolean, default: true }
  },
  data() {
    return {
      imgPattern: 0, // 1: 静态图 2: json 3: zip
      imgPath: '',
      animationId: `title_img_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      loadVersion: 0
    }
  },
  watch: {
    imgName: {
      immediate: true,
      handler() {
        this.resetRenderState()
        this.imgPath = this.imgName
        this.judegPattern()
      }
    }
  },
  methods: {
    /**
     * 判断资源类型
     */
    judegPattern() {
      if (!this.imgName) {
        this.imgPattern = 0
        return
      }
      const picPatternEnum = /\.(jpg|jpeg|png|gif|bmp|webp)(?:[?#].*)?$/i
      const zipPatternEnum = /\.(zip)(?:[?#].*)?$/i
      if (picPatternEnum.test(this.imgName)) {
        this.imgPattern = 1
        this.imgPath = this.picPathFn(this.imgName)
        return
      }
      if (zipPatternEnum.test(this.imgName)) {
        this.imgPattern = 3
        this.loadZip()
        return
      }
      this.imgPattern = 2
      this.loadJson()
    },
    /**
     * 是否为线上资源
     */
    isHttpUrl(url) {
      return /^https?:\/\//i.test(url)
    },
    /**
     * 拼接 OSS 路径
     */
    joinOssPath(path) {
      const base = process.env.VUE_APP_OSS_PATH || ''
      if (!base) return path
      const normalizedBase = base.endsWith('/') ? base : `${base}/`
      const normalizedPath = String(path || '').startsWith('/') ? String(path).slice(1) : String(path || '')
      return `${normalizedBase}${normalizedPath}`
    },
    /**
     * 规范化 lottie json 地址
     */
    normalizeJsonUrl(urlOrDir) {
      const raw = String(urlOrDir || '')
      const clean = raw.split(/[?#]/)[0]
      if (/\.json$/i.test(clean)) {
        const lastSlash = clean.lastIndexOf('/')
        const dir = lastSlash >= 0 ? clean.slice(0, lastSlash + 1) : ''
        return {
          path: raw,
          assetsPath: `${dir}images/`
        }
      }
      const dir = clean.endsWith('/') ? clean : `${clean}/`
      return {
        path: `${dir}data.json`,
        assetsPath: `${dir}images/`
      }
    },
    /**
     * 普通图片路径
     */
    picPathFn(name) {
      if (this.isHttpUrl(name)) return name
      if (String(name).includes('/')) return this.joinOssPath(name)
      return require(`@/assets/${name}`)
    },
    /**
     * 远程动画资源路径
     */
    remotePathFn(name) {
      if (this.isHttpUrl(name)) return name
      return this.joinOssPath(name)
    },
    /**
     * 图片加载失败兜底
     */
    imgError(event) {
      event.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
      return true
    },
    /**
     * 执行普通 json 动画
     */
    loadJson() {
      this.$nextTick(() => {
        const res = this.normalizeJsonUrl(this.remotePathFn(this.imgPath))
        this.createAnimation({
          path: res.path,
          assetsPath: res.assetsPath
        })
      })
    },
    /**
     * 执行 zip 动画
     */
    loadZip() {
      const currentVersion = this.loadVersion
      this.$nextTick(async () => {
        try {
          const zipUrl = this.remotePathFn(this.imgPath)
          const data = await getTitleZipData(zipUrl)
          if (!data) return
          if (currentVersion !== this.loadVersion) return
          const zip = await JSZip.loadAsync(data)
          const animationData = await this.getZipAnimationData(zip)
          if (currentVersion !== this.loadVersion) return
          this.createAnimation({
            animationData
          })
        } catch (error) {
          console.error(`TitleImg zip load error: ${this.imgPath}`, error)
        }
      })
    },
    /**
     * 创建 lottie 实例
     */
    createAnimation(options) {
      this.destroyAnimation()
      const container = document.querySelector(`#${this.animationId}`)
      if (!container) return
      this.lottieInstance = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: this.loop,
        autoplay: true,
        ...options
      })
      this.lottieInstance.addEventListener('DOMLoaded', () => {
        this.$emit('DOMLoaded')
      })
      if (!this.loop) {
        this.lottieInstance.addEventListener('complete', () => {
          this.$emit('complete')
        })
      }
    },
    /**
     * 读取 zip 内 data.json 并替换图片资源
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
      for (const asset of animationData.assets) {
        if (!asset || asset.e === 1 || !asset.p) continue
        const zipFile = this.getZipAssetFile(zip, asset)
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
     * 获取 data.json 文件
     */
    getDataJsonFile(zip) {
      const directFile = zip.file('data.json')
      if (directFile) return directFile
      const matchName = Object.keys(zip.files).find((name) => /(^|\/)data\.json$/i.test(name))
      return matchName ? zip.file(matchName) : null
    },
    /**
     * 获取 zip 中的图片资源
     */
    getZipAssetFile(zip, asset) {
      const normalizedU = String(asset.u || '').replace(/\\/g, '/')
      const normalizedP = String(asset.p || '').replace(/\\/g, '/')
      const candidates = [
        `${normalizedU}${normalizedP}`,
        normalizedP,
        normalizedP.replace(/^images\//i, '')
      ]
      for (const candidate of candidates) {
        const normalizedCandidate = candidate.replace(/^\.?\//, '').replace(/^\/+/, '')
        if (!normalizedCandidate) continue
        const file = zip.file(normalizedCandidate)
        if (file) return file
      }
      return null
    },
    /**
     * 通过扩展名推断 mime 类型
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
     * 销毁动画实例
     */
    destroyAnimation() {
      if (this.lottieInstance) {
        this.lottieInstance.destroy()
        this.lottieInstance = null
      }
    },
    resetRenderState() {
      this.loadVersion += 1
      this.destroyAnimation()
    }
  },
  beforeDestroy() {
    this.resetRenderState()
  }
}
</script>

<style scoped lang="scss">
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
    object-fit: cover;
  }
  .jsonBox {
    width: 100%;
    height: 100%;
  }
}
</style>
