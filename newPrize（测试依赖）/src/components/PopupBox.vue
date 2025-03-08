<template>
  <van-popup
    v-model="isShowPo"
    :close-on-click-overlay="false"
    @click-overlay="clickClose"
  >
    <div class="popupContent">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
  },
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined,
    };
  },
  created() {
    this.stopScroll();
  },
  beforeDestroy() {
    this.autoScroll();
  },
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit("clickClose");
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      let scrollTop = window.scrollY;
      this.pageScroll = scrollTop;
      document.body.style.width = "100%";
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollTop + "px";
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      document.body.style.position = "static";
      window.scrollTo(0, this.pageScroll);
    },
  },
};
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
.popupContent {
  position: relative;
  border-radius: 20px;
  pointer-events: auto;
  padding: 3px;
  background-image: linear-gradient(
    180deg,
    rgba(189, 178, 255, 1),
    rgba(129, 123, 255, 1)
  );
  .titleIcon {
    width: 260px;
    height: 42px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -21px;
  }
  .main {
    width: 100%;
    height: 100%;
    background-color: #7362b7;
    border-radius: 17px;
  }
}
</style>
