<template>
  <QiXiBox class="CumulativeSpendingList" themeTitleImg="title_4.png">
    <!-- 领取项 -->
    <div class="PresentGift_TopBox_AwardList">
      <div
        class="PresentGift_TopBox_AwardItem bgc_horizontal"
        v-for="(item, key) in consume_status"
        :key="key"
      >
        <div class="lin_bgc">
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
        <!-- 重置 -->
        <div class="reset" v-if="item.is_daily"></div>
      </div>
    </div>
    <!-- 说明文字 -->
    <!-- <div class="ThemeBox_BottomText">
      <ul>
        <li><span></span>求婚时选择规模和信物的消费不计算在内</li>
      </ul>
    </div> -->
  </QiXiBox>
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
  ::v-deep .main {
    margin-top: -10px;
    padding: 0 0 10px !important;
    background-size: 100% 96% !important;
  }
  // 累积消费返利列表
  .PresentGift_TopBox_AwardList {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // 累积消费返利列表项
    .PresentGift_TopBox_AwardItem {
      position: relative;
      margin-bottom: 11px;
      width: 330px;
      height: 66px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      box-shadow: 0px 1px 2px 0px #ded3f3;
      padding: 3px;
      .lin_bgc {
        display: flex;
        align-items: center;
        padding-left: 4px;
        border-radius: 4px;
      }
      .img-box {
        width: 52px;
        height: 52px;
        border-radius: 8px;
        border: none !important;
        background: #d6beff;
        padding: 2px;
        margin: 0px 4px 0 0;
        .img-top {
          position: relative;
          width: 100%;
          height: 34px;
          text-align: center;
          border-radius: 6px 6px 0 0;
          img {
            position: relative;
            top: -6px;
          }
        }
        .img-bottom {
          height: 12px;
          font-size: 12px;
          border-radius: 0px 0px 6px 6px;
        }
        &:nth-child(1) {
          img {
            width: 95%;
            top: -6px;
          }
        }
        &:nth-child(2) {
          img {
            width: 110%;
            top: -8px;
            left: -1px;
          }
        }
      }
      .text-box {
        margin-left: 2px;
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
      // 重置图标
      .reset {
        position: absolute;
        width: 60px;
        height: 33px;
        top: 0;
        right: 0;
        background: url('../../../assets/mk2_1.png') no-repeat top center/100%
          auto;
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
    width: 100%;
    margin-left: 20px !important;
  }
  ::v-deep .foot {
    margin-top: -30px;
    margin-bottom: 36px;
  }
}
</style>
