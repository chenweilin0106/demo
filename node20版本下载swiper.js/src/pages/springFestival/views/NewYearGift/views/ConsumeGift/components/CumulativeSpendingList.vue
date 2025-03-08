<template>
  <out-box class="CumulativeSpendingList" title="title_3.png">
    <img :src="IconPath('mk2_1.png')" class="reset-icon" />
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div
        class="PresentGift_TopBox_AwardItem"
        v-for="(item, key) in consume_status"
        :key="key"
      >
        <div class="award-item-content">
          <div
            class="award-item"
            v-for="(item1, index) in item.awards"
            :key="index"
          >
            <div class="award-icon flex-center">
              <img :src="IconPath(item1.icon)" alt="" />
            </div>
            <div class="award-text flex-center">+{{ item1.text }}</div>
          </div>
          <div class="text-box">
            <p>
              累计消费<span class="focus-color">{{ item.condition }}钻</span>
            </p>
            <p class="focus-color">
              （{{ item.consume_nums }}/{{ item.condition }}）
            </p>
          </div>
          <div
            @click="ClickCumulativeBtn(item.has_right, key)"
            class="item-button-toDid button-noFinish"
            :class="ButtonStyle('1', item.has_right)"
          >
            {{ ButtonText('1', item.has_right) }}
          </div>
          <!-- 重置 -->
          <!--<div class="reset"></div>-->
        </div>
      </div>
    </div>
    <!-- 规则说明 -->
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
  methods: {
    ClickCumulativeBtn(flag, mark) {
      flag === 1 && this.$emit('ClickCumulativeBtn', mark)
    }
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  position: relative;
  height: 1544px;
  margin-top: 140px;
  padding-top: 61px;

  .reset-icon {
    position: absolute;
    top: -84px;
    right: 172px;
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
      background-color: #ffe6a3;

      .focus-color {
        color: #fffaa6 !important;
      }

      .award-item-content {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: linear-gradient(90deg, #e55d3e, #f5b93a);

        .award-item {
          display: flex;
          flex-direction: column;
          width: 88px;
          height: 88px;
          background-color: #ffbb5b;
          padding: 4px;
          border-radius: 16px;
          margin-left: 5px;
          .award-icon {
            width: 100%;
            height: 54px;
            background: #fefaef;
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
            background-color: #c7341b;
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
      }

      .reset {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 121px;
        height: 67px;
        background: url('../../../../../assets/mk2_1.png') no-repeat center
          top/100% auto;
      }
    }
  }
  // 下方说明字体样式
  .rule-text {
    width: 444px;
    height: 26px;
    margin-left: 55px;
  }
}
</style>
