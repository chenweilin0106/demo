<template>
  <!-- 概率说明 -->
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_6.png')" />
      <div class="rule-text">
        <ul>
          <li><span></span>每次捞元宵将获得随机种类的元宵并获得额</li>
          <li>外奖励</li>
        </ul>
      </div>
      <img class="img1" src="../../../assets/tk_2.png" alt="" />
      <img class="img2" src="../../../assets/tk_1.png" alt="" />
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false
    }
  },
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(params) {
      this.showPopup = true
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

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 616px;
    height: 976px;
    background: linear-gradient(0deg, #5e243a, #7e2725);
    border: 8px solid #f9c66c;
    border-radius: 26px;
    pointer-events: auto;
    padding-top: 26px;

    .title-image {
      width: 642px;
      height: 126px;
      position: absolute;
      z-index: 3;
      top: -82px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
  }

  .rule-text {
    width: 531px;
    margin-left: 41px;
  }

  .img1 {
    display: block;
    margin: 12px auto 20px;
    width: 560px;
    height: 300px;
  }

  .img2 {
    display: block;
    margin: 0 auto;
    width: 560px;
    height: 480px;
  }
}
</style>
