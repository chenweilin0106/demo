<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_9.png')" />

      <div class="inner-bgc">
        <div class="rule-text text-1">
          <ul>
            <li><span></span>玩家完成每日任务和限定任务可获得弓箭</li>
            <li><span></span>消耗1弓箭参与射箭1次，可获得随机奖励，具体如</li>
            <li>下：</li>
          </ul>
        </div>
        <div class="form-1"></div>
        <div class="rule-text text-2">
          <ul>
            <li><span></span>累计参与射箭400次可领取永久称号：天下无双</li>
          </ul>
        </div>
      </div>
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
  computed: {},
  created() {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt() {
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
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 612px;
  height: 880px;
  background-color: #fff;
  border: 6px solid #ffce4a;
  padding: 4px;
  border-radius: 30px;
  pointer-events: auto;
}

.title-image {
  width: 439px;
  height: 214px;
  position: absolute;
  top: -118px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.inner-bgc {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #955913, #d7812d);
  overflow: hidden;
  border-radius: 20px;
  padding-top: 78px;
}
.rule-text {
  color: #fff;
  line-height: 40px;
  li {
    font-size: 24px;
  }
  span {
    background-color: #f1b449;
  }
}
.text-1 {
  width: 521px;
  //height: 91px;
  margin-left: 44px;
}

.form-1 {
  margin: 14px auto 15px;
  width: 554px;
  height: 565px;
  background: url('@/assets/tk_1.png') no-repeat left top/100% 100%;
}

.text-2 {
  width: 497px;
  height: 24px;
  margin-left: 44px;
}
</style>
