<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_16.png')" />
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <div class="rule-text">
            <ul>
              <li class="subtitle">
                <span></span><i>福卡介绍</i>：福卡分为五种，分别为【祥】、【运】
              </li>
              <li>、【安】、【康】、【财】五种。代表蛋蛋对玩家</li>
              <li>的新春祝福，祝愿玩家们龙年幸福安康，早日暴富！</li>
              <li class="subtitle">
                <span></span><i>福卡来源</i>：玩家可做任务获得福卡，也可领取好友
              </li>
              <li>赠送的福卡。活动期间福卡数量不重置</li>
              <li class="subtitle">
                <span></span><i>福卡合成</i>：每天集齐五张不同类型的福卡，即可合
              </li>
              <li>成一个开奖资格，合成的用户将参与瓜分次日00:00</li>
              <li>的奖励！需手动合成</li>
              <li class="subtitle">
                <span></span><i>赠送福卡</i>：每个玩家单日赠送和领取次数上限分别
              </li>
              <li>为3次。赠送方在赠送成功立即消耗对应福卡，赠</li>
              <li>送行为不可撤销。获赠方需手动领取好友赠送的福</li>
              <li>卡</li>
              <li class="subtitle">
                <span></span><i>瓜分规则</i>：玩家在前一日合成福卡，次日0点开奖
              </li>
              <li>必得元宝（10,000~100,000），有概率获得现金</li>
              <li>红包（188、88、10、6、1.88、0.88元）、超级</li>
              <li>玩家声波+1天、福运天降头饰+1天</li>
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
  width: 627px;
  height: 820px;
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
      padding-top: 31px;
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
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.rule-text {
  margin-left: 42px;
  line-height: 36px;
  li {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
  }

  span {
    top: 11px;
    background-color: #ffe467;
  }
  i {
    color: #ffed76;
  }
  .subtitle {
    margin-top: 35px;
  }
}
</style>
