<template>
  <div class="task">
    <!--礼包列表-->
    <OutBox title="title_2.png" bottom-icon="2">
      <div class="inner">
        <GoodsCard
        v-for="(gift, index) in gift_list"
        :key="index" :gift="gift" cardType="buyGift"
        @openConfirmPopup="(params) => openConfirmPopup({ ...params, index })"
        @buyGift="(id) => buyGift({ id, index, price: gift.price })"
      />
      </div>
    </OutBox>
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
  </div>
</template>

<script>
import { numberLimit } from '@/utils/tool'
import { clickOutside } from '@/directives/clickOutside'
import GoodsCard from '@/views/task/components/goodsCard.vue'
const CongratsGetPopup = () => import('@/popups/congratsGetPopup.vue')
export default {
  name: 'taskVue',
  components: { CongratsGetPopup, GoodsCard },
  directives: { 'click-outside': clickOutside },
  data() {
    return {
      gift_list: [
        {
          id: 1,
          price: 540,
          limit_num: 10,
          discount_icon: 'mk1_6.png',
          awards: [{ id: 2, type: 'tool', nums: 100, icon: 'ljs_120_120.png' }, { id: 1, type: 'tool', nums: 20, icon: 'zjs_120_120.png' }],
          has_right: 1,
          now_num: 0
        },
        {
          id: 2,
          price: 900,
          limit_num: 10,
          discount_icon: 'mk1_7.png',
          awards: [{ id: 158, type: 'tool', nums: 2, icon: 'cbt_120_120.png' }, { id: 142, type: 'tool', nums: 50, icon: 'fsjc_120_120.png' }],
          has_right: 1,
          now_num: 0
        },
        {
          id: 3,
          price: 2800,
          limit_num: 10,
          discount_icon: 'mk1_8.png',
          awards: [{ id: 158, type: 'tool', nums: 3, icon: 'cbt_120_120.png' }, { id: 2, type: 'tool', nums: 500, icon: 'ljs_120_120.png' }],
          has_right: 1,
          now_num: 0
        }
      ], // 礼包列表
      showCongratsGetPopup: false, // 恭喜获得弹窗
      congratsGetPopupData: [] // 恭喜获得数据
    }
  },
  created() {
  },
  methods: {
    async buyGift(params) {
      // const res = await buyGiftApi(params.id)
      // if (res.errno == 3) return diamondRechargePart(params.price)
      // if (res.errno) return this.$toast(res.errmsg)
      const updateGift = this.gift_list[params.index]
      updateGift.now_num = numberLimit(+updateGift.now_num + 1, updateGift.limit_num)
      if (updateGift.now_num == updateGift.limit_num) updateGift.has_right = 2
      requestAnimationFrame(() => {
        this.congratsGetPopupData = [{ icon: 'ljs_120_120.png', text: '+1' }, { icon: 'ljs_120_120.png', text: '+1' }]
        this.showCongratsGetPopup = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  .inner {
    width: 662px;
    margin: 0 auto;
    background: rgba(222, 208, 165, 0.5);
    border-radius: 10px;
    padding: 20px 10px 24px;
  }
  .skillUpdate {
    .skillBtn {
      margin-left: 10px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      width: 129px;
      height: 59px;
      pointer-events: none;
      &.has_right_0 {
        background: url('@/assets/mk1_19.png') no-repeat left top/100% 100%;
        &::after {
          content: '未完成';
        }
      }
      &.has_right_1 {
        pointer-events: auto;
        background: url('@/assets/mk1_18.png') no-repeat left top/100% 100%;
        &::after {
          content: '领取';
        }
      }
      &.has_right_2 {
        background: url('@/assets/mk1_20.png') no-repeat left top/100% 100%;
        &::after {
          content: '已领取';
        }
      }
    }
    .topTip {
      font-weight: 500;
      font-size: 26px;
      color: #3A1CA5;
      .deep {
        color: #D49211;
      }
    }
    .actUpStatus {
      margin: 5px auto;
      font-weight: 500;
      font-size: 22px;
      color: #0084FF;
    }
    .skillDes {
      width: 643px;
      //height: 163px;
      background: rgba(230,216,181,0.5);
      border-radius: 30px;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
      padding: 26px 25px 14px 31px;
      margin-bottom: 10px;
      .deep {
        font-weight: 800;
        font-size: 44px;
        color: #D49211;
      }
      .descTitle {
        font-weight: 500;
        font-size: 24px;
        color: #3A1CA5;
      }
      .tip {
        margin-top: -1px;
        margin-left: 8px;
        width: 26px;
        height: auto;
      }
      .num {
        margin-top: 24px;
        height: 76px;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: normal;
        flex-wrap: nowrap;
      }
      .bubbleText {
        font-weight: 500;
        font-size: 20px;
        color: #ffffff;
        line-height: 28px;
      }
      .serverLevel {
        .serverLevelNum {
          @extend .num;
          background: rgba(227, 199, 144, 0.5);
          border-radius: 38px;
          font-weight: 800;
          font-size: 44px;
          color: #734BDD;
          width: 152px;
        }
        .serverLevelBubble {
          $height: 120px;
          top: -($height + 4);
          left: 31px;
          width: 270px;
          height: $height;
          @extend .bubbleText;
          padding: 0 15px 15px;
          background: url('@/assets/mk1_4.png') no-repeat top left/100% 100%;
          white-space: normal;
        }
      }
      .mySkillLevel {
        .mySkillLevelNum {
          @extend .num;
        }
      }
      .actUpPercentage {
        width: 130px;
        .actUpPercentageNum {
          width: 100%;
          @extend .num;
          .upIcon {
            flex-shrink: 0;
            width: 33px;
            height: auto;
          }
        }
        .updateStatus {
          top: 30px;
          left: 16px;
          font-weight: 500;
          font-size: 22px;
          color: #0084FF;
        }
        .actUpPercentageBubble {
          $height: 145px;
          top: -($height + 4);
          right: -69px;
          width: 405px;
          height: $height;
          @extend .bubbleText;
          padding: 0 14px 15px 20px;
          background: url('@/assets/mk1_5.png') no-repeat top left/100% 100%;
          white-space: normal;
        }
      }
    }
  }
  .lottery {
    position: relative;
    margin-top: -58px;
    margin-bottom: 14px;
    width: 750px;
    height: 1193px;
    background: url('@/assets/mk1_10.png') no-repeat left top/100% 100%;
    .lotteryNum {
      top: 272px;
      right: 0;
      padding: 0 26px;
      height: 48px;
      background: #38216E;
      border-radius: 24px 0 0 24px;
      font-size: 24px;
      color: #FFFFFF;
      .materials {
        width: 51px;
        height: 37px;
      }
    }
    .ruleBtn {
      position: absolute;
      top: 141px;
      right: 30px;
      width: 92px;
      height: 71px;
    }
    .bottomIcon {
      position: absolute;
      z-index: -1;
      width: 750px;
      height: 400px;
      bottom: -244px;
    }
    .buttons {
      bottom: 145px;
      .clickBox {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 280px;
        height: 100px;
      }
      .lottery_1 {
        position: relative;
        width: 328px;
        height: 152px;
      }
      .lottery_2 {
        position: relative;
        margin-left: -7px;
        width: 327px;
        height: 152px;
      }
    }
  }
}
</style>
