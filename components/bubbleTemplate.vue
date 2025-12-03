<template>
  <div class="bubbleTemplate">
    <!-- <van-popover v-model="showPopover1" trigger="click" placement="top" get-container="content3 .titleIcon" class="tem1Bubble">
      <div class="popoverMain">
        <div class="bubbleRulesText">
          <ul>
            <li><span></span>进行共鸣必定获得时装</li>
            <li><span></span>集齐整套时装可获得收集奖励</li>
            <li><span></span>活动结束后共鸣水晶不保留，</li>
            <li>请及时使用</li>
          </ul>
        </div>
      </div>
    </van-popover>
    .tem1Bubble {
      position: absolute;
      z-index: 2;
      right: 96px;
      top: 29px;
      display: block;
      width: 32px;
      height: 32px;
      background: url('@/assets/mk1_12.png') no-repeat left top/100% 100%;
      ::v-deep .van-popover {
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: 100%;
        .van-popover__content {
          width: fit-content;
          height: fit-content;
          background: none;
          box-shadow: none;
          overflow: visible;
          .popoverMain {
            position: absolute;
            top: -5px;
            left: -115px;
            transform: translate(0, -100%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 298px;
            height: 143px;
            background: url('@/assets/mk1_13.png') no-repeat left top/100% 100%; // 气泡文本背景
            padding: 0 0 8px 10px;
            .bubbleRulesText {
              line-height: 28px;
              color: #fff;
              white-space: nowrap;
              width: 258px;
              li {
                position: relative;
                list-style-type: none;
                font-size: 20px;
                display: flex;
                align-items: center;
                span {
                  position: absolute;
                  top: 50%;
                  left: -17px;
                  transform: translateY(-50%);
                  width: 9px;
                  height: 9px;
                  background: #fff4ab;
                  border-radius: 50%;
                }
              }
            }
          }
        }
        .van-popover__arrow {
          display: none;
        }
      }
    } -->
    <!-- -------------------------------------- -->
    <!-- <van-popover v-model="showPopover2" trigger="click" placement="top" get-container="content4 .titleIcon" class="tem2Bubble">
      <div class="popoverMain">身价统计存在一点延<br />迟，请耐心等待哦</div>
    </van-popover>
    .tem2Bubble {
      position: absolute;
      z-index: 2;
      right: 96px;
      top: 29px;
      display: block;
      width: 32px;
      height: 32px;
      background: url('@/assets/mk1_12.png') no-repeat left top/100% 100%;
      ::v-deep .van-popover {
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: 100%;
        .van-popover__content {
          width: fit-content;
          height: fit-content;
          background: none;
          box-shadow: none;
          overflow: visible;
          .popoverMain {
            position: absolute;
            top: -5px;
            left: -103px;
            transform: translate(0, -100%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 210px;
            height: 91px;
            background: url('@/assets/mk1_22.png') no-repeat left top/100% 100%; // 气泡文本背景
            padding: 0 0 9px;
            font-size: 20px;
            color: #ffffff;
            line-height: 28px;
          }
        }
        .van-popover__arrow {
          display: none;
        }
      }
    } -->
    <!-- -------------------------------------- -->
    <!-- <van-popover v-model="virtualItem.showPopover" trigger="click" placement="top" :get-container="`.lotteryItem${virtualIndex} .suitAwardIcon`" class="tem3Bubble" :close-on-click-outside="false">
      <div class="popoverMain">
        <div v-for="(awardItem, awardIndex) in virtualItem.awards" :key="awardIndex" class="suitAwardItem flex-column align-center height-fit">
          <lazy-component class="icon position-relative">
            <PublicImg :imgName="awardItem.icon" :imgType="awardItem.type" />
          </lazy-component>
          <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">{{ awardItem.text }}</div>
        </div>
      </div>
    </van-popover>
    .tem3Bubble {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      pointer-events: none;
      ::v-deep .van-popover {
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: 100%;
        .van-popover__content {
          width: fit-content;
          height: fit-content;
          background: none;
          box-shadow: none;
          overflow: visible;
          .popoverMain {
            position: absolute;
            top: 27px;
            left: -25px;
            transform: translate(0, -100%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 189px;
            height: 132px;
            background: url('@/assets/mk1_21.png') no-repeat left top/100% 100%; // 气泡文本背景
            padding: 0 0 9px;
            .suitAwardItem {
              $borderWidth: 3px; /*边框粗细*/
              $size: 72px; /*尺寸*/
              $radius: 12px; /*圆角*/
              $borderColor: #9d7ee4; /*边框颜色*/
              $bgc: linear-gradient(0deg, #5e489f, #5e489f); /*图标背景色*/
              $fontSize: 20px; /*文本字体大小*/
              $color: #ffffff; /*文本字体颜色*/
              $textHeight: 5 * 2 + 16px; /*文本高度:2 * 文本距离奖励的高度 + 文本高度*/
              margin: 0 4px;
              .icon {
                width: $size + 2 * $borderWidth;
                height: $size + 2 * $borderWidth;
                border-radius: $radius + $borderWidth;
                border: $borderWidth solid $borderColor;
                background: $bgc;
              }
              .text {
                margin-top: 5px;
                width: $size + 2 * $borderWidth;
                // height: $textHeight;
                font-size: $fontSize;
                color: $color;
              }
            }
          }
        }
        .van-popover__arrow {
          display: none;
        }
      }
    } -->
  </div>
</template>

<script>
export default {
  name: "BubbleTemplate",
  props: ["config"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.bubbleTemplate {
}
</style>
