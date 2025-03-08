<template>
  <ThemeBox class="CumulativeSpendingList" themeTitleImg="title_3.png">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div
        class="PresentGift_TopBox_AwardItem bgc_horizontal"
        v-for="(item, key) in consume_status"
        :key="key"
      >
        <div
          class="theme_item img-box"
          v-for="item1 in item.awards"
          :key="item1.tool_id"
        >
          <div class="img-top">
            <img :src="IconPath(item1.icon)" alt="" />
          </div>
          <div class="img-bottom">+{{ item1.text }}</div>
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
    <!-- 说明文字 -->
    <div class="ThemeBox_BottomText">
      <ul>
        <li><span></span>求婚时选择规模和信物的消费不计算在内</li>
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
  methods: {
    ClickCumulativeBtn(flag, mark) {
      flag === 1 && this.$emit('ClickCumulativeBtn', mark)
    }
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  margin-top: 35px;
  margin-bottom: 15px !important;
  ::v-deep .ThemeBox_main {
    padding: 30px 10px 10px;
  }
  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    width: 100%;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin-bottom: 11px;
      width: 100%;
      height: 66px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      border-radius: 6px;
      .img-box {
        width: 52px;
        height: 52px;
        border-radius: 6px;
        margin: 0px 8px 0 0;
        .img-top {
          position: relative;
          width: 100%;
          height: 34px;
          text-align: center;
          img {
            position: relative;
            top: -6px;
          }
        }
        .img-bottom {
          height: 12px;
          font-size: 12px;
        }
        &:nth-child(1) {
          img {
            width: 95%;
            top: -4px;
          }
        }
        &:nth-child(2) {
          img {
            width: 118%;
            top: -9px;
            left: -3px;
          }
        }
      }
      .text-box {
        // margin-left: 4px;
        width: 180px;
        height: 100%;
        // 中间字体样式
        p:nth-child(1) {
          font-size: 15px;
          color: #ffffff;
          margin-top: 15px;
        }
        p:nth-child(2) {
          font-size: 12px;
          margin-top: 8px;
          margin-left: -6px;
        }
      }
      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 10px;
        top: 23px;
        width: 64px;
        height: 34px;
        border-radius: 34px;
      }
    }
  }
  // 下方说明字体样式
  .ThemeBox_BottomText {
    margin-left: 0px !important;
  }
}
</style>
