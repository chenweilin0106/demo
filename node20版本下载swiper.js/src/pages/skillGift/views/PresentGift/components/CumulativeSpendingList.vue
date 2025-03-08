<template>
  <skill-gift-box class="CumulativeSpendingList" title="title_3.png" :rightSide="true">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <transition-group :name="transitionClass" tag="ul">
        <div class="PresentGift_TopBox_AwardItem" v-for="consumeAward in totalList" :key="consumeAward.condition">
          <!-- 累计充值 -->
          <p>
            <span>累计</span>消费满<span>{{ consumeAward.condition }}钻</span>
            <span>（{{ consumeAward.consume_nums }}/{{ consumeAward.condition }}）</span>
          </p>
          <!-- 奖励渲染 -->
          <p class="award_contain flex-center">
            <template v-for="(item1, index) in consumeAward.awards">
              <span :key="index" class="flex align-center flex-no-wrap">
                <img class="flex-shrink-0" :class="ButtonStyle(iconStyle, item1.tool_id || item1.id)" :src="IconPath(item1.icon)" />
                <i class="text-nowrap flex-shrink-0">{{ awardNumText(consumeAward.awards, item1.text, index) }}</i>
              </span>
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
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('hjcbt_60_60.png')" />可进行30次符石寻宝</li>
      </ul>
    </div>
  </skill-gift-box>
</template>

<script>
import SkillGiftBox from '@/pages/skillGift/components/skill-gift-box.vue'

export default {
  name: 'CumulativeSpendingList',
  components: { SkillGiftBox },
  props: ['consume_status', 'transitionClass'],
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        gamegold: 'gamegold',
        142: 'fsjc',
        4: 'hero_tools',
        159: 'hjcbt'
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
        return `+${text}${index !== arr.length - 1 ? ',' : ''}`
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
.hasTransition-move {
  transition: transform 0.7s;
}
.noTransition-move {
  transition: none;
}
.CumulativeSpendingList {
  margin-top: 69px;
  margin-bottom: 30px !important;
  height: 1600px;

  ::v-deep .right-side-icon {
    top: 283px;
  }

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    padding-top: 78px;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin: 0 auto 16px;
      width: 664px;
      height: 140px;
      padding-left: 10px;
      padding-top: 20px;
      color: #ffffff;
      background: url('@/pages/skillGift/assets/mk1_1.png') no-repeat left top/100% 100%;

      p:nth-child(1) {
        font-size: 28px;
        span {
          color: #fffaa6;
        }
      }

      .award_contain {
        width: fit-content;
        height: 48px;
        margin-top: 15px;
        clip-path: polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%);
        padding: 0 15px;
        font-size: 24px;
        background-color: #7044d3;

        span {
          height: 100%;
          //margin-right: -0.5em;

          img {
            width: auto;
            height: 100%;
          }
          .gamegold {
            height: 60px;
          }
          .hero_tools {
            margin: 0 -10px;
            height: 65px;
          }
          .fsjc {
            margin: 0 -7px;
            height: 55px;
          }
          .hjcbt {
          }
        }
      }

      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 151px;
        height: 84px;
      }
    }
  }

  // 下方说明字体样式
  .rule-text {
    width: 444px;
    height: 27px;
    margin-left: 60px;
    img {
      width: 49px;
      height: 41px;
    }
  }
}
</style>
