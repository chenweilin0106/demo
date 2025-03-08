<template>
  <out-box class="CumulativeSpendingList" title="title_3.png">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div class="PresentGift_TopBox_AwardItem" v-for="(item, key) in consume_status" :key="key">
        <!-- 累计充值 -->
        <p>
          累计消费满<span>{{ item.condition }}钻</span>
          <span>（{{ item.consume_nums }}/{{ item.condition }}）</span>
        </p>
        <!-- 奖励渲染 -->
        <p class="award_contain flex align-center justify-center">
          <template v-for="(item1, index) in item.awards">
            <span :key="item1.type"> <img :class="ButtonStyle(iconStyle, item1.type)" :src="IconPath(item1.icon)" /></span>
            {{ awardNumText(item.awards, item1.text, index) }}
          </template>
        </p>
        <div :class="['item-button-toDid', ButtonStyle('1', item.has_right)]" @click="ClickCumulativeBtn(item.has_right, key)">
          {{ ButtonText('1', item.has_right) }}
        </div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
      </ul>
    </div>
  </out-box>
</template>

<script>
import { _throttle } from '../../../utils/tool'
export default {
  name: 'CumulativeSpendingList',
  props: {
    consume_status: {
      type: Object,
      required: true
    }
  },
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
  margin-top: 70px;
  margin-bottom: 83px;
  height: 1580px;

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    padding-top: 70px;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin: 0 auto 22px;
      width: 664px;
      height: 138px;
      padding-left: 22px;
      padding-top: 22px;
      color: #ffffff;
      background: url('@/pages/qingMing/assets/mk1_1.png') no-repeat left top/100% 100%;

      p:nth-child(1) {
        font-size: 28px;
        span {
          color: #fffaa6;
          &:nth-of-type(3) {
            margin-left: -15px;
          }
        }
      }

      .award_contain {
        width: fit-content;
        height: 48px;
        margin-top: 15px;
        border-image-source: url('@/pages/qingMing/assets/mk2_7.png');
        border-image-slice: 0 22 0 22 fill;
        border-image-width: 0 22px 0 22px;
        padding: 0 12px;
        font-size: 24px;

        span {
          height: 100%;
          display: flex;
          align-items: center;

          img {
            vertical-align: middle;
            margin-right: 4px;
            width: auto;
            height: 50px;
          }

          &:nth-of-type(2),
          &:nth-of-type(3) {
            margin-left: -16px !important;

            > img {
              //margin-left: -5px;
              margin-right: -6px;
            }
          }

          .property {
            width: auto !important;
            height: 46px !important;
          }

          .pretty_card {
            width: auto !important;
            height: 70px;
          }

          .hero_tools {
            width: auto !important;
            height: 60px !important;
            margin-right: -8px !important;
            margin-left: -4px !important;
          }
        }

        .goldCard {
          > img {
            width: auto !important;
            height: 56px !important;
          }
        }
      }

      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-22%);
        width: 136px;
        height: 64px;
      }
    }
  }

  // 下方说明字体样式
  .rule-text {
    margin-top: -8px;
    width: 444px;
    height: 27px;
    margin-left: 60px;
  }
}
</style>
