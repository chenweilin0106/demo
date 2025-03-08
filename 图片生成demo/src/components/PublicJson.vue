<template>
  <div class="PublicJson">
    <!-- 用户头像 -->
    <div class="micAvatar_img flex_across" v-if="userAvatar">
      <img :src="userAvatar" alt="" />
    </div>
    <!-- json容器 -->
    <div
      class="PublicJsonLottie"
      :class="'PublicJsonLottie' + lottieJson_name"
      :id="JsonId"
    ></div>
  </div>
</template>

<script>
/**
 * @name PublicJson
 * @description json动画组件
 *
 * @prop {String} userAvatar 用户头像
 * @prop {Object} lottieJson 头饰json
 * @prop {String} lottieJson_name json名称（oss目录名称一致，用作访问图片）
 *
 * @computed {String} JsonId 生成唯一json动画挂载id
 * @event {Function} loadLottie 加载json动画
 * @event {Function} destroyLottie 销毁json动画
 * @data {Object} PublicJsonLottie 存放json动画实例
 * @watch {Function} lottieJson 监听json文件变化，加载json动画
 *
 * 使用方法：
 * 传入json文件和json名称，如果是头饰，需要额外传入用户头像
 * 使用组件时，给组件包一个div用于控制json动画大小，组件内部会自动居中
 * 如果需求控制头像大小，可以使用深度选择器，v-deep
 *
 * @example
 * <div class="pointReward_tk_lottie">
 *  <PublicJson
 *    :lottieJson_name="'mfxz'"
 *    :lottieJson="mfxz"
 *    :userAvatar="$store.getters.user_icon"
 *  ></PublicJson>
 * </div>
 *
 * 说明：
 * 核心是通过watch监听传入的json文件，当json文件发生变化时，重新加载json动画
 * 因为加了immediate，所以会实现created的效果
 * loadLottie内部挂载使用了this.$nextTick，所以会实现mounted的效果
 * 使用json动画名称，时间戳和随机函数当作挂载标识，防止id重复
 *
 */
import { svgFun } from '../utils/json'
export default {
  name: 'PublicJson',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    lottieJson: {
      type: Object,
      default: () => {}
    },
    lottieJson_name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      PublicJsonLottie: null
    }
  },
  computed: {
    JsonId() {
      return `${this.lottieJson_name}_${Date.now()}_${Math.floor(
        Math.random() * 10000
      )}`
    }
  },
  watch: {
    lottieJson: {
      immediate: true,
      handler(newValue) {
        if (newValue?.assets) {
          this.loadLottie()
        } else {
          this.destroyLottie()
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    loadLottie() {
      this.destroyLottie()
      this.$nextTick(() => {
        this.PublicJsonLottie = svgFun(
          0,
          this.lottieJson,
          this.lottieJson_name,
          `#${this.JsonId}`
        )
      })
    },
    destroyLottie() {
      if (this.PublicJsonLottie) {
        this.PublicJsonLottie.destroy()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.PublicJson {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .micAvatar_img {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    > img {
      width: 100%;
    }
  }
  .PublicJsonLottie {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
