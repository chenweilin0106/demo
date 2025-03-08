<template>
  <div class="PublicJson flex align-center justify-center">
    <!-- 用户头像 -->
    <div class="micAvatar_img flex align-center justify-center" v-if="userAvatar">
      <img :src="userAvatar" />
    </div>
    <!-- json容器 -->
    <div v-if="jsonName" class="json_box flex align-center justify-center" :class="'PublicJson_' + jsonName" :id="JsonId" />
  </div>
</template>

<script>
/**
 * @name PublicJson
 * @description json动画组件
 *
 * @prop {String} userAvatar 用户头像
 * @prop {String} jsonName json名称（oss目录名称一致，用作访问图片）
 * @prop {Boolean} loop 是否循环播放
 *
 * @param {String} JsonId 生成唯一json动画挂载id
 * @param {Object} PublicJsonObj 存放json动画实例（不需要响应式，所以没有在data中定义）
 * @function loadJson 加载json动画
 * @function destroyJson 销毁json动画
 *
 * 使用方法：
 * 传入json名称，如果是头饰，需要额外传入用户头像
 * 使用组件时，给组件包一个div用于控制json动画大小，组件内部会自动居中
 * 如果需求控制头像大小，可以使用深度选择器，v-deep
 *
 * @example
 * <div class="pointReward_tk_lottie">
 *  <PublicJson
 *    :jsonName="'mfxz'"
 *    :userAvatar="$store.getters.user_icon"
 *  ></PublicJson>
 * </div>
 *
 * @description
 * 核心是通过watch监听传入的json名称，当名称发生变化时，重新加载json动画
 * 因为加了immediate，所以会实现created的效果
 * loadJson内部挂载使用了this.$nextTick，所以会实现mounted的效果
 * 使用json动画名称，时间戳和随机函数当作挂载标识，防止id重复
 */
import jsonFn from '../utils/jsonFn'

export default {
  name: 'PublicJson',
  props: ['userAvatar', 'jsonName', 'loop', 'needPause', 'autoplay'],
  data() {
    return {
      isLoop: false
    }
  },
  computed: {
    JsonId() {
      return `${this.jsonName}_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
  },
  watch: {
    jsonName: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.loadJson()
        } else {
          this.destroyJson()
        }
      }
    }
  },
  methods: {
    // 跳转到第1帧并暂停
    goToAndStop() {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.goToAndStop(0)
      }
    },
    // 暂停json
    pauseJson() {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.pause()
      }
    },
    // 播放json
    playJson() {
      if (this.PublicJsonObj) {
        this.PublicJsonObj.play()
      }
    },
    loadJson() {
      this.$nextTick(() => {
        this.destroyJson()
        this.PublicJsonObj = jsonFn(this.jsonName, `#${this.JsonId}`, this.loop, this.autoplay)
        this.PublicJsonObj.addEventListener('DOMLoaded', () => {
          // console.log('json挂载完成')
          this.$emit('DOMLoaded')
        })
        if (this.needPause) {
          this.PublicJsonObj.addEventListener('enterFrame', (e) => {
            // console.log(e.currentTime)
            if (e.currentTime >= 48) {
              this.$emit('showReward')
              // this.pauseJson()
            }
          })
        }
        if (!this.isLoop) {
          this.PublicJsonObj.addEventListener('complete', () => {
            this.$emit('complete')
          })
        } else {
          this.isLoop = true
        }
      })
    },
    destroyJson() {
      if (this.jsonName && this.PublicJsonObj) {
        this.PublicJsonObj.destroy()
        this.PublicJsonObj = null
      }
    }
  },
  beforeDestroy() {
    this.PublicJsonObj.removeEventListener('enterFrame')
    this.destroyJson()
  }
}
</script>

<style scoped lang="scss">
.PublicJson {
  position: relative;
  width: 100%;
  height: 100%;

  .micAvatar_img {
    position: absolute;
    width: 100%;
    height: 100%;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .json_box {
    width: 100%;
    height: 100%;
  }
}
</style>
