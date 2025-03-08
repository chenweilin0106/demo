<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_19.png')" />
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <div class="rule-text">
            <ul>
              <li><span></span>蛋蛋每日为玩家们发放新春礼包，开启新春礼包可</li>
              <li>获得以下奖励：</li>
            </ul>
          </div>
          <img :src="IconPath('tk_14.png')" class="form-1" />
          <div class="rule-text">
            <ul>
              <li><span></span>玩家也可通过获得发送次数向全服玩家发送拜年礼</li>
              <li>包，每充值2000元可获得1次！发送成功后所有玩</li>
              <li>家可领取的有效时间为5小时</li>
              <li>
                <span></span>注：奖励由官方赞助发放，<i class="red"
                  >不消耗玩家资源</i
                >。玩家
              </li>
              <li>每天首次发放拜年礼包，系统自动发放一条全服通</li>
              <li>知</li>
            </ul>
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
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
.red {
  color: #fb3913;
}
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
  width: 624px;
  height: 840px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    height: 100%;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;

    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      padding-top: 54px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      pointer-events: none;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .title-image {
    width: 598px;
    height: 188px;
    position: absolute;
    top: -139px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.rule-text {
  margin-left: 43px;

  span {
    top: 11px;
    background-color: #ffe467;
  }

  li {
    font-size: 24px;
    color: #ffffff;
    line-height: 36px;
  }
}

.form-1 {
  display: block;
  margin: 12px auto;
  width: 554px;
  height: 438px;
}
</style>
