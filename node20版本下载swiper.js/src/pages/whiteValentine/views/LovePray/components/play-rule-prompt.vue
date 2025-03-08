<template>
  <van-popup
    v-model="showPopup"
    @closed="clickClose"
    class="flex align-center justify-center"
    @touchmove.prevent.stop
  >
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('tk_6_43.png')" />

      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <img :src="IconPath(type == 1 ? 'tk_6_47.png' : 'tk_6_48.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      type: 1
    }
  },
  computed: {},
  created() {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(params) {
      this.type = params
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: relative;
  width: 620px;
  //min-height: 480px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;

  .inner {
    border-radius: 24px;
    background: linear-gradient(180deg, #fff3f4, #f9c4c7);
    padding-top: 70px;

    > img {
      display: block;
      margin: 0 auto 48px;
      width: 551px;
      height: auto;
    }
  }
}

.title-image {
  width: 644px;
  height: 230px;
  position: absolute;
  z-index: 3;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
</style>
