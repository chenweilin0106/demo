<template>
  <out-box class="CumulativeSpendingList position-relative" title="title_3.png" leftBalloon="true" rightBalloon="true">
    <img :src="IconPath('mk2_1.png')" class="reset-icon" />
    <transition-group class="PresentGift_TopBox_AwardList" :name="transitionClass" tag="ul">
      <div class="PresentGift_TopBox_AwardItem" v-for="consumeAward in totalList" :key="consumeAward.condition">
        <div class="award-item-content">
          <div class="award-item" v-for="(award, index) in consumeAward.awards" :key="index">
            <div class="award-icon flex align-center justify-center">
              <img :src="IconPath(award.icon)" />
            </div>
            <div class="award-text flex align-center justify-center">+{{ award.text }}</div>
          </div>
          <div class="text-box">
            <p>
              累计消费<span class="focus-color">{{ consumeAward.condition }}钻</span>
            </p>
            <p class="focus-color">（{{ consumeAward.consume_nums }}/{{ consumeAward.condition }}）</p>
          </div>
          <div
            @click="ClickCumulativeBtn(consumeAward.has_right, consumeAward.condition)"
            class="item-button-toDid"
            :class="ButtonStyle('1', consumeAward.has_right)"
          >
            {{ ButtonText('1', consumeAward.has_right) }}
          </div>
        </div>
      </div>
    </transition-group>
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
  props: ['consume_status', 'transitionClass'],
  data() {
    return {}
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
    }
  },
  methods: {
    ClickCumulativeBtn(flag, mark) {
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
  margin-bottom: 170px;
  height: 1616px;
  padding-top: 73px;
  ::v-deep .rightBalloon {
    z-index: 1;
    top: -246px;
  }
  ::v-deep .leftBalloon {
    top: -189px;
    z-index: 1;
  }

  .reset-icon {
    position: absolute;
    z-index: 2;
    top: -56px;
    right: 178px;
    width: 124px;
    height: 42px;
  }

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin-bottom: 14px;
      width: 668px;
      height: 142px;
      border-radius: 16px;
      padding: 4px;
      background-color: #ffcfea;

      .focus-color {
        color: #fffaa6 !important;
      }

      .award-item-content {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background-image: linear-gradient(90deg, #8ab3ff, #cfbced, #ffbed6);

        .award-item {
          display: flex;
          flex-direction: column;
          width: 88px;
          height: 88px;
          background-color: #ffd0e7;
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
            background-color: #cb6d95;
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
          margin-top: 15px;
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
        font-size: 28px;
      }
    }
  }

  // 下方说明字体样式
  .rule-text {
    width: 444px;
    height: 26px;
    margin-left: 67px;
  }
}
</style>
