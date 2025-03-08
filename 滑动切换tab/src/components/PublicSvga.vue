<template>
  <div class="svgaContainer w-100 h-100 position-relative flex align-center justify-center overflow-hidden">
    <!-- 用户头像 -->
    <div class="avatarContainer position-absolute flex align-center justify-center w-100 h-100" v-if="userAvatar">
      <img :src="userAvatar" class="w-100 h-100 radius-50 fit-cover" />
    </div>
    <!-- svga容器 -->
    <div v-if="svgaName" class="animateContainer w-100 h-100" :class="'PublicSvga_' + svgaName" :id="svgaId" />
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
 * <div class="pointReward_tk_lottie">
 *  <PublicSvga svgaName="svagName" />
 * </div>
 *
 * @description
 * 核心是通过watch监听传入的svgaName，当发生变化时，重新加载svgaName
 * 因为加了immediate，所以会实现created的效果
 * loadSvga内部挂载使用了this.$nextTick，所以会实现mounted的效果
 * 使用svgaName拼接时间戳当作挂载标识，防止id重复
 */
import svgaFn from '../utils/svgaFn'
export default {
  name: 'PublicSvga',
  props: ['userAvatar', 'svgaName'],
  computed: {
    svgaId() {
      return `svga_${this.svgaName}_${Date.now()}_${Math.floor(Math.random() * 10000)}`
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
    // 播放svga
    playSvga() {
      if (this.svga_data) {
        this.svga_data.startAnimation()
      }
    },
    // 暂停svga
    pauseSvga() {
      if (this.svga_data) {
        this.svga_data.stopAnimation()
      }
    },
    // 挂载svga
    loadSvga() {
      this.$nextTick(() => {
        this.clearSvga()
        this.svga_data = svgaFn(this.svgaName, this.svgaId)
        // this.svga_data.onFinished((res) => {
        //   this.$emit('onFinished')
        // })
      })
    },
    // 销毁svga
    clearSvga() {
      if (this.svgaName && this.svga_data) {
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

<style scoped lang="scss"></style>
