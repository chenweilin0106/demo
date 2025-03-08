<template>
  <OutBox class="CumulativeSpendingList position-relative" title="title_4.png" :bottom="true">
    <!-- 领取项 -->
    <transition-group class="PresentGift_TopBox_AwardList" tag="ul" :name="transitionClass">
      <PublicCard class="PresentGift_TopBox_AwardItem flex align-center" v-for="item in totalList" :key="item.condition">
        <div class="award-item" v-for="(item1, index) in item.awards" :key="index">
          <div class="award-icon flex align-center justify-center">
            <img :src="IconPath(item1.icon)" alt="" />
          </div>
          <div class="award-text flex align-center justify-center">+{{ item1.text }}</div>
        </div>
        <div class="text-box flex-column justify-between">
          <p>
            累计消费<span class="focus-color">{{ item.condition }}钻</span>
          </p>
          <p class="focus-color">（{{ item.consume_nums }}/{{ item.condition }}）</p>
        </div>
        <PublicButton @click="ClickCumulativeBtn(item.has_right, item.condition)" class="item-button-toDid" :hasRight="item.has_right">
          {{ ButtonText('1', item.has_right) }}
        </PublicButton>
      </PublicCard>
    </transition-group>
    <!-- 说明文字 -->
    <div class="rules-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('hjcbt_60_60.png')" />可进行30次符石寻宝</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
import buttonMixin from '@/pages/dragonBoat/mixins/buttonMixin'
import { _throttle } from '../../../utils/tool'
export default {
  name: 'CumulativeSpendingList',
  mixins: [buttonMixin],
  props: ['consume_status', 'transitionClass'],
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        property: 'property',
        pretty_card: 'pretty_card',
        hero_tools: 'hero_tools'
      }
    }
  },
  computed: {
    // 奖励数量文本
    awardNumText() {
      return (arr, text, index) => {
        return `+${text}${index !== arr.length - 1 ? '，' : ''}`
      }
    },
    consumeStatusArray() {
      return Object.values(this.consume_status) // 累积消费返利列表数据类型转换
    },
    unFinishList() {
      return this.consumeStatusArray.filter((consumeAward) => consumeAward.has_right == 0 || consumeAward.has_right == 1)
    },
    finishList() {
      return this.consumeStatusArray.filter((consumeAward) => consumeAward.has_right == 2)
    },
    totalList() {
      return this.unFinishList.concat(this.finishList)
    }
  },
  methods: {
    ClickCumulativeBtn: _throttle(function (flag, mark) {
      flag === 1 && this.$emit('ClickCumulativeBtn', mark)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  padding-top: 66px;
  margin-bottom: 37px;
  height: 1600px;

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 22px;
      width: 660px;
      height: 134px;
      border-radius: 12px;

      .focus-color {
        color: #fffaa6 !important;
      }
      .award-item {
        display: flex;
        flex-direction: column;
        width: 88px;
        height: 88px;
        background-color: #fbe590;
        padding: 4px;
        border-radius: 16px;
        margin-left: 5px;

        .award-icon {
          width: 100%;
          height: 54px;
          background: #fff;
          border-radius: 12px 12px 0 0;

          > img {
            width: 85%;
          }
        }

        .award-text {
          flex: 1;
          font-size: 20px;
          color: #fff;
          width: 100%;
          background-color: #358e94;
          border-radius: 0 0 12px 12px;
        }
      }
    }

    .text-box {
      margin-left: 8px;
      width: 360px;
      height: 100%;
      font-size: 24px;
      padding: 30px 0;
      line-height: 100%;
      // 中间字体样式
      p:nth-child(1) {
        font-size: 29px;
        color: #ffffff;
      }

      p:nth-child(2) {
        font-size: 24px;
        margin-left: -0.5em;
      }
    }

    // 右侧按钮
    // 去完成
    .item-button-toDid {
      position: absolute;
      right: 11px;
      bottom: 15px;
      width: 120px;
      height: 60px;
      border-radius: 30px;
      font-size: 28px;
    }
  }

  // 下方说明字体样式
  .rules-text {
    img {
      width: 50px;
      height: auto;
    }
  }
}
</style>
