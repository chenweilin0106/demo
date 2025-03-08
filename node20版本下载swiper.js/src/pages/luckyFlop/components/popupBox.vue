<template>
  <van-popup
      v-model="isShowPo"
      :close-on-click-overlay="false"
      @click-overlay="clickClose"
    >
    <div :class="['popupContent', title?'haveTitle':null]">
      <!-- 标题图片 -->
      <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined
    }
  },
  created() {
    this.stopScroll()
  },
  beforeDestroy() {
    this.autoScroll()
  },
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      console.log('stop')
      let scrollTop = window.scrollY
      this.pageScroll = scrollTop
      document.body.style.width = '100%'
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + scrollTop + 'px'
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      console.log('auto')
      document.body.style.position = 'static'
      window.scrollTo(0, this.pageScroll)
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 盒子主题
.popupContent {
  pointer-events: auto;
  position: relative;
  margin: 0 auto;
  width: 610px;
  min-height: 400px;
  // height: 2000px;
  background: linear-gradient(0deg, #C8F9FF, #FAEBFF);
  border-radius: 24px;
  padding: 70px 0 30px 0;
  z-index: 1;
  &::before{
    content: '';
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: 4px;
    background: linear-gradient(0deg, #6A7FFD, #E9AFFD);
    border-radius: inherit;
    z-index: -1;
  }
  &.haveTitle{
    margin-top: 40px;
    padding: 90px 0 30px 0;
  }
  // 标题图片
  .title {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: -70px;
    transform: translateX(-50%);
    width: 620px;
    height: 150px;
  }
  .main {
    width: 100%;
    max-height: 800px;
    text-align: center;
    text-align: -webkit-center;
    overflow: hidden scroll;
  }
}
</style>
