<template>
  <out-box class="CumulativeSpendingList" title="title_4.png">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div
        class="PresentGift_TopBox_AwardItem"
        v-for="(item, key) in consume_status"
        :key="key"
      >
        <div class="img-box" v-for="item1 in item.awards" :key="item1.tool_id">
          <div class="img-top flex-center">
            <img :src="IconPath(item1.icon)" alt="" />
          </div>
          <div class="img-bottom flex-center">+{{ item1.text }}</div>
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
          :class="ButtonStyle('1', item.has_right)"
        >
          {{ ButtonText('1', item.has_right) }}
        </div>
        <!-- 重置 -->
        <!--<div class="reset"></div>-->
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
  height: 1579px;
  margin-top: 134px;
  padding-top: 87px;

  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      display: flex;
      margin-bottom: 18px;
      width: 666px;
      height: 138px;
      background: linear-gradient(90deg, #a16014, #e98e35);
      border: 3px solid #ffc956;
      border-radius: 21px;
      padding: 14px 0 0 13px;

      .speical_color {
        color: #fffaa6 !important;
      }

      .img-box {
        display: flex;
        flex-direction: column;
        width: 104px;
        height: 104px;
        background: #d38232;
        padding: 4px;
        border-radius: 16px;
        margin: 0px 9px 0 0;

        .img-top {
          position: relative;
          width: 100%;
          height: 66px;
          text-align: center;
          border-radius: 12px 12px 0 0;
          background-color: #fff;

          img {
            position: relative;
            //top: -12px;
          }
        }

        .img-bottom {
          flex: 1;
          font-size: 24px;
          color: #ffffff;
          border-radius: 0 0 12px 12px;
          background-color: #824414;
        }

        &:nth-child(1) {
          img {
            width: 90%;
          }
        }

        &:nth-child(2) {
          img {
            width: 100%;
          }
        }
      }

      .text-box {
        margin-left: 4px;
        width: 360px;
        height: 100%;
        // 中间字体样式
        p:nth-child(1) {
          font-size: 30px;
          color: #ffffff;
          margin-top: 13px;
        }

        p:nth-child(2) {
          font-size: 24px;
          margin-top: 18px;
          margin-left: -12px;
        }
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
      //  background: url('../../../../../assets/mk2_1.png') no-repeat center
      //    top/100% auto;
      //}
    }
  }

  .rule-text {
    margin-left: 57px;
  }
}
</style>
