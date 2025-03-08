<template>
  <div class="PublicSvga">
    <!-- 用户头像 -->
    <div class="micAvatar_img flex_across" v-if="userAvatar">
      <img :src="userAvatar" alt="" />
    </div>
    <!-- svga容器 -->
    <div
      class="PublicSvga_main"
      :class="'PublicSvga' + svgaName"
      :id="svgaId"
    ></div>
  </div>
</template>

<script>
/**
 * @name PublicSvga
 * @description svga动画组件
 *
 * @prop {String} userAvatar 用户头像
 * @prop {String} svgaName svga文件名称（oss目录名称一致，用作访问图片）
 *
 * 使用方法：
 * 传入svga名称，如果是头饰，需要额外传入用户头像
 * 使用组件时，给组件包一个div用于控制svga动画大小，组件内部会自动居中
 * 如果需求控制头像大小，可以使用深度选择器，v-deep
 *
 * @example
 * <div class="pointReward_tk_lottie">
 *  <PublicSvga svgaName="svagName" />
 * </div>
 *
 * 说明：
 * 核心是通过watch监听传入的svgaName，当发生变化时，重新加载svgaName
 * 因为加了immediate，所以会实现created的效果
 * loadSvga内部挂载使用了this.$nextTick，所以会实现mounted的效果
 * 使用svgaName拼接时间戳当作挂载标识，防止id重复
 *
 */
import svgaFn from '../utils/svgaFn'
export default {
  name: 'PublicSvga',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    svgaName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      svga_data: null
    }
  },
  computed: {
    svgaId() {
      return `svga_${this.svgaName}_${Date.now()}`
    }
  },
  watch: {
    svgaName: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadSvga()
        } else {
          this.clearSvga()
        }
      }
    }
  },
  methods: {
    // 挂载svga
    loadSvga() {
      this.$nextTick(() => {
        this.clearSvga()
        this.svga_data = svgaFn(this.svgaName, this.svgaId)
      })
    },
    // 销毁svga
    clearSvga() {
      if (this.svgaName && this.svga_data) {
        this.svga_data.stopAnimation()
        this.svga_data = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.PublicSvga {
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
  .PublicSvga_main {
    width: 100%;
    height: 100%;
  }
}
</style>
