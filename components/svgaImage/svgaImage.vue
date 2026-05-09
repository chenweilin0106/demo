<template>
  <div class="svgaImage">
    <div class="svgaBox" :id="svgaId"></div>
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'
import { getSvgaVideoItem } from '../svgaVideoItemIdb'

/**
 * @name svgaImage
 * @description SVGA 动画组件。
 *
 * @prop {String} imgName SVGA 文件名、相对路径或完整 URL。
 * @prop {Boolean} loop 是否循环播放。
 *
 * @event loaded 动画资源加载并开始渲染后触发。
 * @event animOnFinished 非循环播放完成后触发。
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
        try {
          this.loadSvga()
        } catch (error) {
          console.log('Error in watcher callback:', error)
        }
      }
    }
  },
  activated() {
    console.log('activated')
    if (this.isPlaying) return console.log('已经处于播放状态')
    this.isPlaying = true
    if (!this.isLoaded) return console.log('load回调还没回来')
    try {
      this?.svga_data?.stepToFrame(0, true)
    } catch (error) {
      console.log(error)
    }
    console.log('播放动画')
  },
  deactivated() {
    console.log('deactivated')
    if (!this.isPlaying) return console.log('已经处于停止状态')
    this.isPlaying = false
    if (!this.isLoaded) return console.log('load回调还没回来')
    try {
      this.svga_data?.pauseAnimation()
    } catch (error) {}
    console.log('暂停动画')
  },
  methods: {
    /**
     * 统一生成 SVGA URL（支持直接传完整 http(s) 地址）
     */
    getSvgaUrl(svgaName) {
      const isOnline = /^https?:\/\//i.test(svgaName)
      if (isOnline) return svgaName
      const base = process.env.VUE_APP_OSS_PATH || ''
      const normalizedBase = base.endsWith('/') ? base : `${base}/`
      const rawName = String(svgaName || '')
      const normalizedName = rawName.startsWith('/') ? rawName.slice(1) : rawName
      return normalizedName.includes('/')
        ? `${normalizedBase}${normalizedName}`
        : `${normalizedBase}activity/weekly/svga/${normalizedName}`
    },
    /**
     * svga前置函数
     * @prop {Boolean} loop 是否循环播放
     */
    svgaFn(svgaName, id, loop = true) {
      const token = this.loadToken
      const svga_play = new SVGA.Player(`#${id}`)
      svga_play.loops = loop ? 0 : 1
      svga_play.clearsAfterStop = false // 播放完不清空画布
      svga_play.fillMode = 'forwards' // 播放完停留在最后一帧
      svga_play.onFinished(() => {
        if (token !== this.loadToken) return
        this.$emit('animOnFinished')
      })
      const url = this.getSvgaUrl(svgaName)
      getSvgaVideoItem(url)
        .then((videoItem) => {
          if (token !== this.loadToken) return
          svga_play.setVideoItem(videoItem)
          if (this.isPlaying) svga_play.startAnimation()
          const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 0))
          raf(() => {
            if (token !== this.loadToken) return
            this.isLoaded = true
            this.$emit('loaded')
          })
        })
        .catch((error) => {
          console.log('svga load error:', error)
        })
      return svga_play
    },
    /**
     * 挂载svga
     */
    loadSvga() {
      this.$nextTick(() => {
        this.clearSvga()
        this.imgPath = this.imgName
        this.isLoaded = false
        this.loadToken++
        if (!this.imgPath) return
        this.svga_data = this.svgaFn(this.imgPath, this.svgaId, this.loop)
      })
    },
    /**
     * 销毁svga
     */
    clearSvga() {
      if (this.imgPath && this.svga_data) {
        this.loadToken++
        this.svga_data.stopAnimation()
        this.svga_data.clear()
        this.svga_data.clearDynamicObjects()
        this.svga_data = null
      }
    }
  },
  beforeDestroy() {
    this.clearSvga()
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
