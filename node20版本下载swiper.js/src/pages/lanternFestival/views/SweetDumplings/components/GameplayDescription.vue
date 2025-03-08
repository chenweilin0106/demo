<template>
  <!-- 概率说明 -->
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_9.png')" />
      <div class="rule-text">
        <ul>
          <li><span></span>玩家可通过[捞元宵]获取不同种类的元宵</li>
          <li><span></span>每次放入2~4个元宵，可合成奖励</li>
          <li><span></span>不同数量、不同种类的元宵，可合成的奖励</li>
          <li>也不同</li>
          <li><span></span>元宵仅在本活动使用，活动结束后将清零</li>
        </ul>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  components: {},
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
    height: 336px;
    background: linear-gradient(0deg, #5e243a, #7e2725);
    border: 8px solid #f9c66c;
    border-radius: 26px;
    pointer-events: auto;
    padding-top: 34px;

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

  .tit {
    font-size: 28px;
    color: #ffffff;
    width: 531px;
    line-height: 46px;
    align-self: flex-start;
    margin-left: 38px;
    margin-right: 26px;
    position: relative;

    span {
      position: absolute;
      top: 14px;
      left: -23px;
      width: 12px;
      height: 12px;
      background: #fffaa6;
      border-radius: 50%;
    }
  }
}

.rule-text {
  width: 529px;
  margin-left: 45px;

  li {
    line-height: 50px;

    span {
      top: 18px;
    }
  }
}
</style>
