<template>
  <OutBox class="CumulativeSpendingList" title="title_3.png">
    <!-- 领取项 -->
    <transition-group class="PresentGift_TopBox_AwardList" :name="transitionClass" tag="ul">
      <div
        class="PresentGift_TopBox_AwardItem"
        v-for="consumeAward in totalList"
        :key="consumeAward.condition"
      >
        <!-- 累计充值 -->
        <p>
          <span>累计</span>消费满<span>{{ consumeAward.condition }}钻</span>
          <span>（{{ consumeAward.consume_nums }}/{{ consumeAward.condition }}）</span>
        </p>
        <!-- 奖励渲染 -->
        <p class="award_contain flex-center">
          <template v-for="(award, index) in consumeAward.awards">
            <span :key="index">
              <img :class="ButtonStyle(iconStyle, award.type)" :src="IconPath(award.icon)" />
            </span>
            {{ awardNumText(consumeAward.awards, award.text, index) }}
          </template>
        </p>
        <div
          :class="['item-button-toDid', ButtonStyle('1', consumeAward.has_right)]"
          @click="ClickCumulativeBtn(consumeAward.has_right, consumeAward.condition)"
        >
          {{ ButtonText('1', consumeAward.has_right) }}
        </div>
      </div>
    </transition-group>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('hjcbt_60_60.png')" />可进行30次符石寻宝</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  name: 'CumulativeSpendingList',
  props: ['transitionClass', 'consume_status'],
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
    consumeStatusArray() {
      return Object.values(this.consume_status) // 累积消费返利列表数据类型转换
    },
    unFinishList() {
      return this.consumeStatusArray.filter((item) => item.has_right == 0 || item.has_right == 1)
    },
    finishList() {
      return this.consumeStatusArray.filter((item) => item.has_right == 2)
    },
    totalList() {
      return this.unFinishList.concat(this.finishList)
    },
    // 奖励数量文本
    awardNumText() {
      return (arr, text, index) => {
        return `+${text}${index !== arr.length - 1 ? '，' : ''}`
      }
    }
  },
  methods: {
    ClickCumulativeBtn(flag, mark) {
      flag === 1 && this.$emit('ClickCumulativeBtn', mark)
    }
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  margin-top: 71px;
  margin-bottom: 102px;
  //height: 1560px;
  padding-top: 78px;

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin: 0 auto 16px;
      width: 664px;
      height: 140px;
      padding-left: 23px;
      padding-top: 20px;
      color: #ffffff;
      background: url('@/pages/sparParty/assets/mk1_1.png') no-repeat left
        top/100% 100%;

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
        margin-top: 15px;
        padding: 0 12px 0 10px;
        font-size: 24px;
        height: 52px;
        background: #103469;
        border-radius: 26px;

        span {
          height: 100%;
          display: flex;
          justify-content: space-evenly;
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
        right: 28px;
        top: 42px;
        width: 140px;
        height: 64px;
      }
    }
  }

  // 下方说明字体样式
  .rule-text {
    width: 444px;
    //height: 27px;
    margin-left: 60px;
    img {
      width: 49px;
      height: 41px;
    }

  }
}
</style>
