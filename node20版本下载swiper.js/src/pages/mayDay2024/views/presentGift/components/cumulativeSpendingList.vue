<template>
  <PublicContainer class="CumulativeSpendingList position-relative" titleIcon="title_4.png">
    <transition-group class="PresentGift_TopBox_AwardList" tag="ul" :name="transitionClass">
      <PublicCard class="PresentGift_TopBox_AwardItem" v-for="consumeAward in totalList" :key="consumeAward.condition">
        <p>
          <span>累计</span>消费满<span>{{ consumeAward.condition }}钻</span>
          <span>（{{ consumeAward.consume_nums }}/{{ consumeAward.condition }}）</span>
        </p>
        <p class="award_contain flex align-center justify-center">
          <template v-for="(item1, index) in consumeAward.awards">
            <span :key="item1.type">
              <img :class="iconStyle[item1.tool_id]" :src="IconPath(item1.icon)" />{{ awardNumText(consumeAward.awards, item1.text, index) }}</span
            >
          </template>
        </p>
        <PublicButton
          class="consumeAwardButton position-absolute position-column-center"
          :hasRight="consumeAward.has_right"
          @click="ClickCumulativeBtn(consumeAward.has_right, consumeAward.condition)"
        >
          {{ ButtonText('1', consumeAward.has_right) }}
        </PublicButton>
      </PublicCard>
    </transition-group>
    <div class="rules-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
      </ul>
    </div>
  </PublicContainer>
</template>

<script>
import PublicButton from '@/pages/mayDay2024/components/publicButton.vue'
import buttonMixin from '@/pages/mayDay2024/mixins/buttonMixin'
import PublicCard from '@/pages/mayDay2024/components/publicCard.vue'
export default {
  name: 'CumulativeSpendingList',
  components: { PublicCard, PublicButton },
  props: ['consume_status', 'transitionClass'],
  mixins: [buttonMixin],
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        142: 'fsjc',
        4: 'hero_tools'
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
    ClickCumulativeBtn(flag, mark) {
      console.log(mark)
      if (flag == 1) this.$emit('ClickCumulativeBtn', mark)
    }
  }
}
</script>

<style scoped lang="scss">
.hasTransition-move {
  transition: transform 0.7s;
}
.noTransition-move {
  transition: none;
}
.CumulativeSpendingList {
  margin-top: 29px;
  margin-bottom: 41px;
  height: 1610px;
  padding-top: 112px;
  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin: 0 auto 12px;
      width: 684px;
      height: 142px;
      color: #ffffff;
      padding-left: 22px;

      p:nth-child(1) {
        font-size: 28px;
        span {
          color: #fffaa6;
        }
      }

      .award_contain {
        width: fit-content;
        height: 48px;
        margin-top: 12px;
        background: #77151d;
        border-radius: 25px;
        padding: 0 20px 0 8px;
        font-size: 24px;
        border-image-source: url('@/pages/mayDay2024/assets/mk2_6.png');
        border-image-slice: 0 24 0 24 fill;
        border-image-width: 0 24px 0 24px;
        span {
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: -0.5em;
          line-height: 100%;
          img {
            vertical-align: middle;
            //margin-right: 4px;
            width: auto;
            height: 50px;
          }
          .hero_tools {
            height: 60px;
            margin: 0 -5px;
          }
          .fsjc {
            margin: 0 -5px;
          }
        }
      }

      // 右侧按钮
      // 去完成
      .consumeAwardButton {
        right: 20px;
        width: 116px;
        height: 56px;
      }
    }
  }

  // 下方说明字体样式
  .rules-text {
    width: 444px;
    height: 26px;
    margin-left: 67px;
    img {
      width: 50px;
      height: auto;
    }
  }
}
</style>
