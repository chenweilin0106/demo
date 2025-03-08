<template>
  <div class="PublicJson flex align-center justify-center">
    <!-- 用户头像 -->
    <div class="micAvatar_img flex align-center justify-center">
      <img :src="userAvatar" @error.once="loadAvatarError" />
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
    /**
     * 头像图片裂开执行
     */
    loadAvatarError(event) {
      event.currentTarget.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
      event.currentTarget.style.width = 'auto'
      return true
    },
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
