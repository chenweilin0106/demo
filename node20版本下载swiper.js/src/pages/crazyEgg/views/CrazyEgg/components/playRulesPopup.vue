<template>
  <PopupBox title="title_4.png" @clickClose="clickClose">
    <div ref="scrollEl" class="gamePlay-desc-inner">
      <!--说明文本1-->
      <div class="ThemeBox_BottomText text-1">
        <ul>
          <li><span></span>玩家每消费300钻石自动获得1个<img :src="IconPath('cz_26_34.png')" />，可</li>
          <li>选择手动砸蛋或一键砸蛋。</li>
          <li><span></span>每次砸蛋会获得随机奖励，奖励如下。</li>
          <li><span></span>玩家累计砸破蛋壳达到进度可领取对应奖</li>
          <li>励。</li>
        </ul>
      </div>
      <!--普通砸蛋奖励-->
      <div class="normal-rewards-title"></div>
      <div class="form1"></div>
      <!--说明文本2-->
      <div class="ThemeBox_BottomText text-2">
        <ul>
          <li><span></span>砸破后蛋壳会自动刷新，有机会刷新到超</li>
          <li>级蛋。</li>
          <li><span></span>玩家砸破普通超级蛋可直接获得普通奖</li>
          <li>励，砸破贪婪超级蛋可选择普通奖励或贪</li>
          <li>婪奖励其一。</li>
        </ul>
      </div>
      <div ref="form2" class="form2"></div>
      <!--奖励列表-->
      <div class="reward-list">
        <div v-for="(item, index) in list" :key="index" class="reward-content">
          <div class="reward-box">
            <div v-if="item.label" class="label position-absolute flex align-center justify-center line-height-100 flex-no-wrap">
              <span>价值{{ item.label }}</span
              ><img :src="IconPath('mk4_15.png')" />
            </div>
            <div class="reward-box-inner">
              <img :src="IconPath(item.icon)" />
            </div>
          </div>
          <div class="reward-text">{{ item.text }}</div>
        </div>
      </div>
      <!--蛋壳刷新概率-->
      <div class="egg-refresh-title"></div>
      <div class="form3"></div>
      <!--说明文本3-->
      <div class="ThemeBox_BottomText text-3">
        <ul>
          <li>全服奖池：</li>
          <li><span></span>全服每完成10次砸蛋，系统将为奖池注入</li>
          <li>1万元宝。玩家砸破炫彩蛋即可获得【瓜</li>
          <li>分实时奖池10%】的元宝大奖。</li>
        </ul>
      </div>
    </div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'

export default {
  props: ['isScroll', 'list'],
  components: { PopupBox },
  mounted() {
    this.scrollFn()
  },
  methods: {
    scrollFn() {
      if (!this.isScroll) return
      const top = this.$refs.form2.offsetTop
      this.$refs.scrollEl.scrollTo({
        top,
        behavior: 'smooth'
      })
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  padding: 120px 0 50px;
}
.gamePlay-desc-inner {
  position: relative;
  width: 100%;
  height: 820px;
  padding-top: 3px;
  overflow-y: scroll;
  overflow-x: hidden;

  .ThemeBox_BottomText {
    color: #ffe397;
    margin-left: 80px;
    width: 518px;
    height: 187px;
    white-space: nowrap;
    letter-spacing: 0px;

    span {
      top: 12px;
      left: -25px;
    }

    img {
      position: relative;
      top: -3px;
      width: auto;
      height: 40px;
      margin: 0 14px;
    }
  }

  .normal-rewards-title {
    margin: 15px auto 20px;
    width: 527px;
    height: 58px;
    background: url('@/pages/crazyEgg/assets/rule_5.png') no-repeat left top/100% auto;
  }

  .form1 {
    margin: 0 auto 31px;
    width: 564px;
    height: 444px;
    background: url('@/pages/crazyEgg/assets/rule_1.png') no-repeat left top/100% auto;
  }

  .form2 {
    margin: 25px auto;
    width: 564px;
    height: 424px;
    background: url('@/pages/crazyEgg/assets/rule_2.png') no-repeat left top/100% auto;
  }

  .reward-list {
    display: flex;
    align-items: center;
    justify-content: center;

    .reward-content {
      width: 148px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 19px;

      .reward-box {
        position: relative;
        width: 148px;
        height: 148px;
        background: #c86325;
        border-radius: 16px;
        padding: 4px;

        .label {
          top: 0;
          right: 0;
          width: 126px;
          height: 35px;
          background: #c86325;
          border-radius: 18px 12px 0px 18px;

          span {
            margin-left: -7px;
            font-size: 24px;
            font-weight: 500;
            color: #ffffff;
            transform: scale(0.83);
            white-space: nowrap;
          }

          > img {
            margin-left: -7px;
            width: 27px;
            height: 20px;
          }
        }

        .reward-box-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #fffbdd;
          border-radius: 12px;

          > img {
            width: 78%;
          }
        }
      }

      .reward-text {
        margin-top: 18px;
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
      }
    }
  }

  .egg-refresh-title {
    margin: 20px auto 13px;
    width: 527px;
    height: 58px;
    background: url('@/pages/crazyEgg/assets/rule_4.png') no-repeat left top/100% auto;
  }

  .form3 {
    margin: 0 auto 26px;
    width: 564px;
    height: 724px;
    background: url('@/pages/crazyEgg/assets/rule_3.png') no-repeat left top/100% auto;
  }
  .text-3 {
    height: 147px;
  }
}
</style>
