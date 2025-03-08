<template>
  <out-box class="CumulativeSpendingList" title="tt_03.png">
    <img :src="IconPath('icon_cz.png')" class="resetIcon position-absolute" />
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div class="PresentGift_TopBox_AwardItem" v-for="(item, key) in consume_status" :key="key">
        <div class="award-item-content">
          <div class="award-item" v-for="(item1, index) in item.awards" :key="index">
            <div class="award-icon flex-center">
              <img :src="IconPath(item1.icon)" alt="" />
            </div>
            <div class="award-text flex-center">+{{ item1.text }}</div>
          </div>
          <div class="text-box">
            <p>
              累计消费<span class="focus-color">{{ item.condition }}钻</span>
            </p>
            <p class="focus-color">（{{ item.consume_nums }}/{{ item.condition }}）</p>
          </div>
          <div @click="ClickCumulativeBtn(item.has_right, key)" class="item-button-toDid" :class="ButtonStyle('1', item.has_right)">
            {{ ButtonText('1', item.has_right) }}
          </div>
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
    }
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  padding-top: 188px;
  margin-bottom: 170px;
  height: 1719px;
  .resetIcon {
    z-index: 2;
    top: 57px;
    right: 112px;
    width: 121px;
    height: 45px;
  }

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin-bottom: 21px;
      width: 684px;
      height: 136px;
      border-radius: 14px;
      padding: 2px;
      background-color: #d97683;

      .focus-color {
        color: #fff79a !important;
      }

      .award-item-content {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: linear-gradient(-90deg, #f6ced1, #f696a8);

        .award-item {
          display: flex;
          flex-direction: column;
          width: 88px;
          height: 88px;
          background-color: #f6cacf;
          padding: 4px;
          border-radius: 16px;
          margin-left: 5px;

          .award-icon {
            width: 100%;
            height: 54px;
            background: #ffeff3;
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
            background-color: #c16d6f;
            border-radius: 0 0 12px 12px;
          }
        }
      }

      .text-box {
        margin-left: 8px;
        width: 360px;
        height: 100%;
        // 中间字体样式
        p:nth-child(1) {
          font-size: 28px;
          color: #ffffff;
          margin-top: 25px;
        }

        p:nth-child(2) {
          font-size: 24px;
          margin-top: 22px;
          margin-left: -14px;
        }
      }

      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 10px;
        bottom: 15px;
        width: 126px;
        height: 66px;
        border-radius: 33px;
        font-size: 28px;
      }
    }
  }

  // 下方说明字体样式
  .rule-text {
    margin-top: 10px;
    width: 444px;
    height: 27px;
    margin-left: 80px;
  }
}
</style>
