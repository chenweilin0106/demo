<template>
  <div class="svgaImage">
    <div class="svgaBox" :id="svgaId"></div>
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'
import { getSvgaVideoItem } from './svgaVideoItemIdb'

/**
 * @name svgaImage
 * @description SVGA 动画组件。
 *
 * @prop {String} imgName SVGA 文件名、相对路径或完整 URL。
 * @prop {Boolean} loop 是否循环播放。
 *
 * @event loaded 动画资源加载并开始渲染后触发。
 * @event animOnFinished 非循环播放完成后触发。
 * @event error SVGA 加载或解析失败时触发。
 *
 * @example
 * <svgaImage imgName="activity/example.svga" :loop="false" @loaded="onLoaded" @animOnFinished="onFinished" />
 */
export default {
  name: 'svgaImage',
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
    svgaId() {
      return `svga_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
  },
  watch: {
    imgName: {
      immediate: true,
      handler() {
        this.loadSvga()
      }
    }
  },
  activated() {
    console.log('svgaImage activated')
    if (this.isPlaying) return
    this.isPlaying = true
    if (!this.isLoaded) return console.log('svgaImage load回调还没回来')
    try {
      this.animationInstance?.stepToFrame(0, true)
    } catch (error) {
      this.handleError(error, this.loadToken)
    }
  },
  deactivated() {
    console.log('svgaImage deactivated')
    if (!this.isPlaying) return
    this.isPlaying = false
    if (!this.isLoaded) return console.log('svgaImage load回调还没回来')
    try {
      this.animationInstance?.pauseAnimation()
    } catch (error) {}
  },
  methods: {
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
     * 统一生成 SVGA URL（支持直接传完整 http(s) 地址）
     */
    getSvgaUrl(svgaName) {
      if (this.isHttpUrl(svgaName)) return svgaName
      const rawName = String(svgaName || '')
      const normalizedName = rawName.startsWith('/') ? rawName.slice(1) : rawName
      if (normalizedName.includes('/')) return this.joinOssPath(normalizedName)
      return this.joinOssPath(`activity/weekly/svga/${normalizedName}`)
    },
    /**
     * svga前置函数
     * @prop {Boolean} loop 是否循环播放
     */
    createAnimation(svgaName, id, loop = true, token) {
      const svgaPlayer = new SVGA.Player(`#${id}`)
      svgaPlayer.loops = loop ? 0 : 1
      svgaPlayer.clearsAfterStop = false // 播放完不清空画布
      svgaPlayer.fillMode = 'forwards' // 播放完停留在最后一帧
      svgaPlayer.onFinished(() => {
        if (token !== this.loadToken) return
        this.$emit('animOnFinished')
      })
      const url = this.getSvgaUrl(svgaName)
      getSvgaVideoItem(url)
        .then((videoItem) => {
          if (token !== this.loadToken) return
          svgaPlayer.setVideoItem(videoItem)
          if (this.isPlaying) svgaPlayer.startAnimation()
          const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 0))
          raf(() => {
            if (token !== this.loadToken) return
            this.isLoaded = true
            this.$emit('loaded')
          })
        })
        .catch((error) => {
          this.handleError(error, token)
        })
      return svgaPlayer
    },
    /**
     * 挂载svga
     */
    loadSvga() {
      const token = this.loadToken + 1
      this.loadToken = token
      this.$nextTick(() => {
        try {
          if (token !== this.loadToken) return
          this.destroyAnimation()
          this.imgPath = this.imgName || ''
          this.isLoaded = false
          if (!this.imgPath) return
          this.animationInstance = this.createAnimation(this.imgPath, this.svgaId, this.loop, token)
        } catch (error) {
          this.handleError(error, token)
        }
      })
    },
    /**
     * 处理加载错误。
     */
    handleError(error, token) {
      if (token !== this.loadToken) return
      console.error(`svgaImage load error: ${this.imgPath}`, error)
      this.$emit('error', error)
    },
    /**
     * 销毁svga
     */
    destroyAnimation() {
      if (this.animationInstance) {
        try {
          this.animationInstance.stopAnimation()
          this.animationInstance.clear()
          this.animationInstance.clearDynamicObjects()
        } catch (error) {}
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

<style lang="scss" scoped>
.svgaImage {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .svgaBox {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
