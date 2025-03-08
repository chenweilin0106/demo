<template>
  <div class="archery-lottery">
    <img class="title" :src="IconPath('title_1.png')" />
    <div class="rule-button" @click="openPrompt('archeryLotteryRules')"></div>
    <div class="rewards-list">
      <div v-for="item in rewardsList" :key="item" class="reward flex-center">
        <img :src="IconPath(item)" />
      </div>
    </div>
    <div class="bow-icon"></div>
    <div class="bow-arrow-num flex-center">
      剩余弓箭<img :src="IconPath('gj_63_61.png')" />：0
    </div>
    <div class="lottery-buttons">
      <div class="once-button"></div>
      <div class="ten-button"></div>
    </div>
    <!--累计奖励-->
    <div class="cumulative-reward">
      <div class="reward-box">
        <div class="right-icon"></div>
        <div class="reward-box-main">
          <div class="icon-content">
            <div class="icon">
              <public-json jsonName="ch_bfxg" />
            </div>
            <div class="text flex-center">永久称号</div>
          </div>
          <div class="text-content">
            <p>累计射箭400次</p>
            <p>（0/400）</p>
          </div>
          <div class="reward-box-button button-receive">领取</div>
        </div>
      </div>
    </div>
    <archery-rules-prompt ref="archeryLotteryRules" />
  </div>
</template>

<script>
import ArcheryRulesPrompt from './archery-rules-prompt.vue'
import PublicJson from '@/components/PublicJson.vue'
export default {
  data() {
    return {
      rewardsList: Object.freeze([
        'ljs_120_120.png',
        'zhs_120_120.png',
        'zjs_120_120.png',
        'bfsj_120_120.png',
        'xhyl_120_120.png',
        'yb_120_120.png'
      ])
    }
  },
  components: {
    PublicJson,
    ArcheryRulesPrompt
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.archery-lottery {
  position: relative;
  //margin-bottom: 160px;
  background: url('@/assets/mk1_11.png') no-repeat left top/100% 1244px;
  padding-top: 93px;

  .title {
    position: absolute;
    top: -77px;
    left: 50%;
    transform: translateX(-50%);
    width: 487px;
    height: 170px;
  }

  .rule-button {
    position: absolute;
    top: 39px;
    right: 47px;
    width: 56px;
    height: 56px;
    background: url('@/assets/mk1_10.png') no-repeat left top/100% 100%;
  }

  .rewards-list {
    position: relative;
    width: 100%;
    height: 601px;

    .reward {
      position: absolute;
      width: 232px;
      height: 231px;
      background: url('@/assets/mk1_12.png') no-repeat left top/100% 100%;
      > img {
        width: 120px;
        height: 120px;
      }

      &:nth-of-type(1) {
        top: 72px;
        left: 26px;
        > img {
          width: 120px;
          height: 120px;
        }
      }
      &:nth-of-type(2) {
        top: 0px;
        left: 261px;
      }
      &:nth-of-type(3) {
        top: 70px;
        right: 22px;
      }
      &:nth-of-type(4) {
        width: 299px;
        height: 299px;
        bottom: 0px;
        left: 6px;
      }
      &:nth-of-type(5) {
        width: 299px;
        height: 299px;
        bottom: 86px;
        left: 257px;
        > img {
          width: 140px;
          height: 140px;
        }
      }
      &:nth-of-type(6) {
        bottom: 14px;
        right: 0px;
      }
    }
  }

  .bow-icon {
    margin: -97px auto -139px;
    width: 683px;
    height: 509px;
    background: url('@/assets/mk1_13.png') no-repeat left top/100% 100%;
  }
  .bow-arrow-num {
    margin: 0 auto 14px;
    min-width: 320px;
    width: fit-content;
    padding: 0 10px;
    height: 48px;
    background: #7f4121;
    border-radius: 24px;
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;

    > img {
      width: 44px;
      height: 40px;
    }
  }

  .lottery-buttons {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 44px;
    //padding: 0 36px 0 44px;
    .once-button {
      //margin-right: 30px;
      width: 317px;
      height: 116px;
      background: url('@/assets/mk1_14.png') no-repeat left top/100% 100%;
    }
    .ten-button {
      width: 316px;
      height: 116px;
      background: url('@/assets/mk1_15.png') no-repeat left top/100% 100%;
    }
  }

  .cumulative-reward {
    position: relative;
    margin: 0 auto;
    width: 711px;
    height: 247px;
    background: url('@/assets/mk1_1.png') no-repeat left top/100% 100%;
    overflow: hidden;
    .reward-box {
      margin: 39px auto 0;
      position: relative;
      width: 666px;
      height: 166px;
      background-color: #ffc956;
      padding: 3px;
      border-radius: 21px;
      .right-icon {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: 0;
        background: url('@/assets/mk1_9.png') no-repeat left top/100% 100%;
        width: 260px;
        height: 87px;
      }
      .reward-box-main {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        .icon-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 240px;
          height: 100%;
          border-radius: 18px 0 0 18px;
          .icon {
            width: 240px;
            height: 124px;
            background: linear-gradient(0deg, #a96228, #6f3322);
            border-radius: 18px 0px 0px 0px;
          }
          .text {
            flex: 1;
            width: 240px;
            background: #824414;
            border-radius: 0px 0px 0px 18px;
            font-size: 24px;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .text-content {
          flex: 1;
          height: 100%;
          background: linear-gradient(90deg, #a16014, #e98e35);
          border-radius: 0 18px 18px 0;
          padding-left: 25px;
          p {
            &:nth-of-type(1) {
              margin-top: 30px;
              font-size: 30px;
              font-weight: 500;
              color: #ffffff;
            }
            &:nth-of-type(2) {
              margin-top: 40px;
              margin-left: -20px;
              font-size: 24px;
              color: #fffaa6;
            }
          }
        }
        .reward-box-button {
          position: absolute;
          z-index: 2;
          bottom: 27px;
          right: 33px;
          width: 124px;
          height: 64px;
          border-radius: 32px;
        }
      }
    }
  }
}
</style>
