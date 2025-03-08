<template>
  <OutBox class="CumulativeSpendingList" title="title_12.png">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <transition-group :name="transitionClass" tag="ul">
        <div class="PresentGift_TopBox_AwardItem" v-for="consumeAward in totalList" :key="consumeAward.condition">
          <div class="text-box">
            <p>
              累计消费<span class="">{{ consumeAward.condition }}钻</span>
            </p>
            <p class="speical_color">（{{ consumeAward.consume_nums }}/{{ consumeAward.condition }}）</p>
          </div>
          <div class="award-list">
            <div v-for="(item1, index) in consumeAward.awards" :key="index" class="award-line">
              <span>
                <img :src="IconPath(item1.icon)" />
              </span>
              +{{ item1.text }}
            </div>
          </div>
          <div
            @click="ClickCumulativeBtn(consumeAward.has_right, consumeAward.condition)"
            class="item-button-toDid theme_botton_undid"
            :class="ButtonStyle('GoodsTask', consumeAward.has_right)"
          >
            {{ ButtonText('GoodsTask', consumeAward.has_right) }}
          </div>
        </div>
      </transition-group>
    </div>
    <!-- 规则说明 -->
    <div class="rules-text">
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
  props: ['consume_status', 'transitionClass'],
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
  height: 1640px;
  margin-top: 54px;
  margin-bottom: 32px;
  padding-top: 94px;

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
      background: url('@/pages/crazyEgg/assets/bg_1.png') no-repeat left top/100% auto;

      .speical_color {
        position: relative;
        top: 3px;
        color: #c35716 !important;
      }

      .award-line {
        position: relative;
        display: flex;
        align-items: center;
        //justify-content: flex-end;
        min-width: 102px;
        width: fit-content;
        height: 37px;
        //margin-right: 10px;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 500;
        color: #c35716;
        background: linear-gradient(90deg, rgba(255, 184, 152, 0), rgba(255, 184, 152, 0.76));
        padding-right: 10px;

        span {
          position: absolute;
          top: 50%;
          //left: -8px;
          transform: translateY(-50%);
          height: 100%;
          display: flex;
          align-items: center;

          img {
            width: auto;
            height: 62px;
          }
        }

        &:nth-of-type(1) {
          width: fit-content !important;
          min-width: 132px !important;
          padding-left: 65px;
          margin-right: 20px;
          margin-left: 10px;
          span {
            left: -8px;
            img {
              position: relative;
              top: -1px;
              height: 68px;
            }
          }
        }
        &:nth-of-type(2) {
          width: fit-content !important;
          min-width: 102px !important;
          padding-left: 62px;
          margin-right: 18px;
          span {
            left: -2px;
            img {
              position: relative;
              top: 1px;
              height: 65px;
            }
          }
        }
        &:nth-of-type(3) {
          width: fit-content !important;
          min-width: 112px !important;
          padding-left: 54px;
          span {
            left: 0;
            img {
              position: relative;
              top: 0;
              height: 54px;
            }
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
          font-weight: bold;
          color: #692e19;
        }

        p:nth-child(2) {
          position: relative;
          top: 0;
          font-size: 24px;
          font-weight: 500;
          color: #c35716;
          margin-left: 10px;
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
      //  top: 0;
      //  right: 0;
      //  width: 121px;
      //  height: 67px;
      //  background: url('@/pages/crazyEgg/assets/mk2_1.png') no-repeat center
      //    top/100% auto;
      //}
    }
  }
  .rules-text {
    margin-left: 75px;
  }
}
</style>
