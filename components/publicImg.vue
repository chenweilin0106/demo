<template>
  <div class="imgCompo">
    <!-- pic -->
    <template v-if="imgPattern === 1">
      <img class="picImg" :src="imgPath" @error="imgError" />
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
import { imgAtError } from '@/utils/tool'
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
  props: ['imgName', 'imgType', 'userAvatar', 'loop', 'needPause'],
  components: {},
  data() {
    return {
      onlinePatternEnum: Object.freeze(/^https?:\/\//i),
      imgPattern: 0, // 格式 1:pic 2:svga 3:json
      imgPath: '', // 图像地址
      isLoop: false // json: 是否循环
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
     * 判断传入参imgName的格式
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
      const onlinePatternEnum = /^https?:\/\//i // 验证参前缀是否http、https
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
    imgAtError,
    /**
     * svga前置函数
     * @prop {Number} loop 循环次数,0为无限循环
     */
    svgaFn(svgaName, id, loop = 0) {
      // console.log('loop', loop)
      const svga_play = new SVGA.Player(`#${id}`)
      const svga_parser = new SVGA.Parser(`#${id}`)
      svga_play.loops = loop
      svga_play.clearsAfterStop = false // 播放完不清空画布
      svga_play.fillMode = 'forwards' // 播放完停留在最后一帧
      svga_parser.load(this.onlinePatternEnum.test(svgaName) ? svgaName : `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/${svgaName}`, (videoItem) => {
        svga_play.setVideoItem(videoItem)
        svga_play.startAnimation()
        svga_play.onFinished(() => {
          this.$emit('animOnFinished')
        })
      }, (error) => {
        console.log(`svgaFn ERROR  svgaName: ${svgaName} error: ${error}`)
      })
      return svga_play
    },
    /**
     * 挂载svga
     */
    loadSvga() {
      this.$nextTick(() => {
        this.clearSvga()
        this.svga_data = this.svgaFn(this.imgPath, this.svgaId, this.loop)
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
    },
    /**
     * json前置函数
     * @prop {Number} loop 循环,默认true
     */
    jsonFn(jsonName, className, loop = true) {
      let path = this.onlinePatternEnum.test(jsonName) ? jsonName : `${process.env.VUE_APP_OSS_PATH}activity/weekly/json/${jsonName}`
      const params = {
        container: document.querySelector(className),
        renderer: 'svg',
        loop,
        path: `${path}/data.json`,
        autoplay: true,
        assetsPath: `${path}/images/`
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
              this.goToAndStop(this.needPause)
              console.log(`暂停在第${this.needPause}帧`)
              // this.$emit('showReward') // 暂停后回调,自配置
            }
          })
        }
        if (!this.isLoop) {
          this.PublicJsonObj.addEventListener('complete', () => {
            this.$emit('complete') // 结束后回调,自配置
          })
        } else {
          this.isLoop = true
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
    }
  },
  beforeDestroy() {
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
        width: 100% * 0.8;
        height: 100% * 0.8;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    &.voiceA {
      img {
        width: 100% * 0.7;
        height: 100% * 0.7;
        object-fit: cover;
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
