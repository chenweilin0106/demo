<template>
  <ThemeBox
    class="CumulativeSpendingList"
    themeTitleImg="mk1_1.png"
    themeTitleImg2="title_4.png"
    :isresst="true"
  >
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div
        class="PresentGift_TopBox_AwardItem"
        v-for="(item, key) in consume_status"
        :key="key"
      >
        <!-- 加赠元宝 -->
        <div v-if="addGold(item).is_add" class="add-send-gold">
          <div class="arrow"></div>
          {{ addGold(item).text }}
          <img class="gold" :src="IconPath('yb_60_60.png')" />
        </div>
        <div class="award-item-content">
          <div
            class="award-item"
            v-for="(item1, index) in item.awards.slice(0, 3)"
            :key="index"
          >
            <div class="award-icon">
              <img :src="IconPath(item1.icon)" alt="" />
            </div>
            <div class="award-text">
              <span>+{{ item1.text }}</span>
            </div>
          </div>
          <div class="text-box">
            <p>
              累计消费<span class="speical_color">{{ item.condition }}钻</span>
            </p>
            <p class="speical_color">
              （{{ item.consume_nums }}/{{ item.condition }}）
            </p>
          </div>
          <div
            @click="ClickCumulativeBtn(item.has_right, key)"
            class="item-button-toDid theme_botton_undid"
            :class="ButtonStyle('GoodsTask', item.has_right)"
          >
            {{ ButtonText('GoodsTask', item.has_right) }}
          </div>
        </div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="ThemeBox_BottomText">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>已领取的奖励若解锁了更多元宝则不可重复领取</li>
      </ul>
    </div>
  </ThemeBox>
</template>

<script>
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
    ClickCumulativeBtn(flag, mark) {
      flag === 1 && this.$emit('ClickCumulativeBtn', mark)
    },
    addGold(params) {
      const res = params.awards.find((item) => item.is_add)
      return res || {}
    }
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  width: 720px;
  height: 1611px;
  margin-bottom: 37px !important;
  ::v-deep .ThemeBox_head {
    top: -51px;
    .reset_tip {
      top: -55px;
      right: 205px;
    }
  }

  ::v-deep .ThemeBox_main {
    padding: 67px 0px 0px !important;
  }
  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    width: 100%;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin: 0 auto 18px;
      //margin-bottom: 18px;
      width: 664px;
      height: 138px;
      background: linear-gradient(90deg, #533cc5, #c4535e);
      border: 2px solid #fbe9ff;
      border-radius: 14px;

      .speical_color {
        color: #fffaa6 !important;
      }

      .add-send-gold {
        position: absolute;
        top: -13px;
        left: 4px;
        width: fit-content;
        height: 31px;
        background: #a31a19;
        border: 2px solid #f14941;
        border-radius: 15px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6px 0 20px;
        font-size: 20px;
        font-weight: 500;
        color: #ffea8a;
        .arrow {
          position: absolute;
          top: -15px;
          left: -23px;
          width: 47px;
          height: 55px;
          background: url('@/pages/labaFestival/assets/mk3_12.png') no-repeat
            left top/100% 100%;
        }
        .gold {
          width: 40px;
          height: 40px;
        }
      }

      .award-item-content {
        display: flex;
        //align-items: center;
        width: 100%;
        height: 100%;
        padding-left: 7px;
        border-radius: 12px;

        .award-item {
          display: flex;
          flex-direction: column;
          //align-items: center;
          margin-right: 7px;
          margin-top: 24px;
          width: 86px;
          height: 86px;
          background: #8a8afe;
          padding: 3px;
          border-radius: 15px;

          .award-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 54px;
            border-radius: 12px 12px 0 0;
            background-color: #fff;

            > img {
              //width: 100%;
              height: 125%;
            }
          }

          .award-text {
            position: relative;
            flex: 1;
            width: 100%;
            font-size: 24px;
            color: #fff;
            background-color: #513eb5;
            border-radius: 0 0 12px 12px;
            white-space: nowrap;

            > span {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(0.83);
            }
          }
        }
      }

      .text-box {
        width: 360px;
        height: 100%;
        white-space: nowrap;
        // 中间字体样式
        p:nth-child(1) {
          font-size: 28px;
          color: #ffffff;
          margin-top: 26px;
        }

        p:nth-child(2) {
          font-size: 24px;
          margin-top: 20px;
          margin-left: -14px;
        }
      }

      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 9px;
        top: 53px;
        width: 124px;
        height: 64px;
        border-radius: 32px;
      }
    }
  }

  // 下方说明字体样式
  .ThemeBox_BottomText {
    width: 586px;
    height: 67px;
    margin-left: 50px;
    margin-bottom: 20px;
    white-space: nowrap;
    li {
      line-height: 45px;
    }
  }
}
</style>
