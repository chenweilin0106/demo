<template>
  <crazy-egg-box class="CumulativeSpendingList" title-icon="title_3.png">
    <div class="cumulative_spending_main">
      <!-- 领取项 -->
      <div class="PresentGift_TopBox_AwardList">
        <div
          class="PresentGift_TopBox_AwardItem"
          v-for="(item, key) in consume_status"
          :key="key"
        >
          <div class="text-box">
            <p>
              累计消费<span class="">{{ item.condition }}钻</span>
            </p>
            <p class="speical_color">
              （{{ item.consume_nums }}/{{ item.condition }}）
            </p>
          </div>
          <div class="award-list">
            <div
              v-for="(item1, index) in item.awards"
              :key="index"
              class="award-line"
            >
              <span>
                <img :src="IconPath(item1.icon)" />
              </span>
              +{{ item1.text }}
            </div>
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
      <!-- 规则说明 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        </ul>
      </div>
    </div>
  </crazy-egg-box>
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
  width: 732px;
  margin-top: 68px;
  margin-bottom: 32px;

  .cumulative_spending_main {
    position: absolute;
    z-index: 3;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    // 累积消费返利列表
    .PresentGift_TopBox_AwardList {
      display: flex;
      flex-direction: column;
      align-items: center;
      // 累积消费返利列表项
      .PresentGift_TopBox_AwardItem {
        position: relative;
        margin-bottom: 21px;
        width: 664px;
        height: 136px;
        padding: 3px;
        background: url('@/pages/crazyEgg/assets/bg_1.png') no-repeat left
          top/100% auto;

        .speical_color {
          position: relative;
          top: 3px;
          color: #c35716 !important;
        }

        .award-line {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 102px;
          width: fit-content;
          height: 37px;
          margin-right: 10px;
          border-radius: 10px;
          font-size: 24px;
          font-weight: 500;
          color: #c35716;
          background: linear-gradient(
            90deg,
            rgba(255, 184, 152, 0),
            rgba(255, 184, 152, 0.76)
          );
          padding-right: 13px;

          span {
            //width: fit-content;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            img {
              vertical-align: middle;
              margin-right: 4px;
              width: auto;
              height: 62px;
            }
          }
        }

        .text-box {
          margin-top: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
          width: fit-content;
          //height: 100%;
          // 中间字体样式
          p:nth-child(1) {
            font-size: 30px;
            color: #692e19;
          }

          p:nth-child(2) {
            font-size: 24px;
            margin-left: 20px;
          }
        }

        .award-list {
          margin-top: 20px;
          display: flex;
          align-items: center;
          width: fit-content;
          padding-left: 20px;
        }

        // 右侧按钮
        // 去完成
        .item-button-toDid {
          position: absolute;
          right: 20px;
          top: 46px;
          width: 128px;
          height: 68px;
          border-radius: 32px;
        }

        //.reset {
        //  position: absolute;
        //  top: 0px;
        //  right: 0px;
        //  width: 121px;
        //  height: 67px;
        //  background: url('@/pages/crazyEgg/assets/mk2_1.png') no-repeat center
        //    top/100% auto;
        //}
      }
    }

    // 下方说明字体样式
  }

  ::v-deep .ThemeBox_BottomText {
    margin-top: -6px;
    margin-left: 70px !important;

    li {
      span {
        top: 13px !important;
      }
    }
  }

  ::v-deep .main {
    height: 1389px;
  }
}
</style>
