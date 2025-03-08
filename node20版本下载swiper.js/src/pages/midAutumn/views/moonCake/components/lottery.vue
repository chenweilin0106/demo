<template>
  <OutBox title="title_6.png" class="lottery">
    <img :src="IconPath('mk2_2.png')" class="rule position-absolute" @click="showRulePopup = true" />
    <div class="info flex align-center justify-between">
      <div class="count">剩余次数：{{ user_tickets }}</div>
      <div class="consume">消费钻石：{{ total_consume }}</div>
    </div>
    <div class="list flex align-center justify-center flex-wrap overflow-hidden">
      <div v-for="(cakeItem, index) in cake_list" :key="index" :class="cakeItem.nums == 0 && 'grey'" class="cake flex-shrink-0 flex-column align-center position-relative">
        <img :src="IconPath(cakeItem.icon)" class="cakeIcon" />
        <div v-if="+cakeItem.nums" class="numLabel position-absolute flex align-center justify-center text-nowrap line-height-100">x{{ cakeItem.nums }}</div>
        <div class="cakeName line-height-100 text-nowrap">{{ cakeItem.name }}</div>
      </div>
    </div>
    <div class="lotteryBtn flex align-center justify-center">
      <img :src="IconPath('mk4_6.png')" class="lotteryOne" @click="$emit('lottery', 1)" />
      <img :src="IconPath('mk4_7.png')" class="lotteryTen" @click="$emit('lottery', 2)" />
    </div>
    <div class="awardsList margin-row-center">
      <img :src="IconPath('mk4_8.png')" class="tip block margin-row-center" />
      <div class="marquee"><Marquee :list="marqueeData" /></div>
    </div>
    <div class="rules-text">
      <ul>
        <li><span></span>每消费200钻自动获得一次制作机会，每次制作必</li>
        <li>得月饼，有概率获得随机奖励</li>
        <li><span></span>月饼可用于兑换限定戒指、中秋返场称号礼包和其</li>
        <li>他稀有奖励</li>
        <li><span></span>求婚时购买求婚物品的消费计算在内，【星河漫步】</li>
        <li>每日前10笔有效消费计算在内</li>
      </ul>
    </div>
    <RulePopup v-if="showRulePopup" @clickClose="showRulePopup = false" />
  </OutBox>
</template>

<script>
import Marquee from '@/pages/midAutumn/components/marquee.vue'
const RulePopup = () => import('@/pages/midAutumn/views/moonCake/popups/rulePopup.vue')
export default {
  name: 'lotteryVue',
  props: ['user_tickets', 'total_consume', 'cake_list'],
  components: { RulePopup, Marquee },
  data() {
    return {
      marqueeData: Object.freeze([
        { icon: 'ljs_120_120.png', text: '+10', name: '绿晶石', type: 'tool' },
        { icon: 'zjs_120_120.png', text: '+2', name: '紫晶石', type: 'tool' },
        { icon: 'yb_120_120.png', text: '+1万', name: '元宝', type: 'tool' },
        { icon: 'fsjc_120_120.png', text: '+10', name: '符石精粹', type: 'tool' },
        { icon: 'cbt_120_120.png', text: '+1', name: '藏宝图', type: 'tool' },
        { icon: 'sjyb_120_120.png', text: '+1', name: '随机月饼', type: 'tool' }
      ]),
      showRulePopup: false
    }
  }
}
</script>

<style lang="scss" scoped>
.lottery {
  .rule {
    top: 35px;
    right: 49px;
    width: 56px;
    height: 56px;
  }
  .info {
    padding: 0 14px;
    .infoCommon {
      padding: 0 17px;
      height: 48px;
      background: #B55023;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-weight: 500;
      font-size: 24px;
      color: #FFFFFF;
    }
    .count, .consume {
      @extend .infoCommon;
    }
    .count {
      border-radius: 0 24px 24px 0;
    }
    .consume {
      border-radius: 24px 0 0 24px;
    }
  }
  .list {
    padding: 0 35px;
    .cake {
      margin: 32px 0 0;
      &.grey {
        .cakeIcon {
          filter: grayscale(100%);
        }
        .numLabel {
          color: #828282;
          border-color: #818181;
        }
        .cakeName {
          color: #8B8B8B;
        }
      }
      $gap: 37px;
      &:nth-child(2) {
        margin-left: $gap;
        margin-right: $gap;
      }
      &:last-child {
        margin-left: $gap;
      }
      .numLabel {
        top: 10px;
        right: -4px;
        min-width: 84px;
        height: 38px;
        background: #FFFFFF;
        border-radius: 19px;
        border: 3px solid #E03F08;
        font-weight: 500;
        font-size: 26px;
        color: #E03F08;
      }
      .cakeIcon {
        width: 187px;
        height: 188px;
      }
      .cakeName {
        margin-top: 8px;
        font-weight: bold;
        font-size: 30px;
        color: #972A04;
      }
    }
  }
  .lotteryBtn {
    margin-top: 32px;
    .lotteryOne, .lotteryTen {
      width: 297px;
      height: 103px;
    }
    .lotteryTen {
      margin-left: 38px;
    }
  }
  .awardsList {
    padding-top: 19px;
    margin-top: 41px;
    margin-bottom: 13px;
    width: 686px;
    height: 262px;
    background: #FFEABD;
    .tip {
      width: 560px;
      height: 33px;
    }
    .marquee {
      height: 210px;
    }
  }
}
</style>
