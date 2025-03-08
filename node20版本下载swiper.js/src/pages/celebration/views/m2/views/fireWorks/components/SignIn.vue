<template>
  <OutBox class="signIn position-relative" title="mk2_title_13.png">
    <van-popover
      v-model="showPopover"
      theme="dark"
      trigger="click"
      placement="top-end"
      :offset="[13, 10]"
    >
      <p class="popoverMain">购买礼包、会员（含超值兑换中<br>兑换会员）、活力卡不计算在内</p>
      <template #reference>
        <img :src="IconPath('mk2_2.png')" class="ruleBtn w-100" />
      </template>
    </van-popover>
    <div class="labels flex">
      <img :src="IconPath('mk5_2.png')" />
      <img :src="IconPath('mk5_3.png')" />
    </div>
    <div class="scrollBox overflow-x-hidden overflow-y-scroll">
      <div class="list">
        <div v-for="item in 7" :key="item" class="listItem position-relative flex">
          <img :src="IconPath('mk5_4.png')" class="dateText position-absolute" />
          <div class="awards flex">
            <div v-for="item in 3" :key="item" class="award flex-column align-center position-relative">
              <div class="awardIcon position-relative">
                <PublicImg :imgName="'ljs_120_120.png'" :imgType="''" />
                <div class="awardText position-absolute" data-text="20"><div class="inner">20</div></div>
                <img v-if="false" :src="IconPath('mk5_1.png')" class="lockIcon position-absolute" />
                <img v-if="false" :src="IconPath('mk5_14.png')" class="overly position-absolute position-center" />
                <img v-if="false" :src="IconPath('mk5_13.png')" class="light position-absolute pointer-none position-center" />
              </div>
              <div class="awardName line-height-100">绿晶石</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons flex align-center">
      <div class="allReceive flex align-center justify-center line-height-100">一键领取</div>
      <div class="unLock has_right_2 flex-column align-center justify-between position-relative">
        <template v-if="false">
          <div class="line-height-100">解锁进阶奖励</div>
          <span class="line-height-100">¥6</span>
        </template>
        <div v-else class="line-height-100">已解锁</div>
        <div class="tip line-height-100 position-absolute">许愿奖池参与资格</div>
      </div>
    </div>
  </OutBox>
</template>

<script>
export default {
  name: 'signIn',
  props: [''],
  components: {},
  data() {
    return {
      showPopover: false
    }
  },
  watch: {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
.van-popover {
  .van-popover__content {
    background-color: rgba(36, 23, 6, 0.7);
  }
  .van-popover__arrow {
    color: rgba(36, 23, 6, 0.7);
  }
}
</style>
<style lang="scss" scoped>
.popoverMain {
  font-size: 20px;
  color: #FFFFFF;
  line-height: 29px;
  padding: 10px;
}
.signIn {
  .van-popover__wrapper {
    position: absolute;
    top: -12px;
    right: 83px;
    width: 56px;
    height: 56px;
  }
  .labels {
    padding-left: 149px;
    >img {
      width: 193px;
      height: 58px;
      &:nth-child(2) {
        margin-left: 95px;
      }
    }
  }
  .scrollBox {
    margin-top: 12px;
    margin-bottom: 47px;
    height: 695px;
    .list {
      margin-left: 152px;
      width: 554px;
      background: rgba(147,130,245,0.5);
      border-radius: 20px;
      padding-top: 14px;
      padding-bottom: 21px;
      .listItem {
        margin-bottom: 21px;
        &:last-child {
          margin-bottom: 0;
        }
        .dateText {
          left: -11px;
          top: 52px;
          transform: translateX(-100%);
          width: auto;
          height: 35px;
        }
        .awards {
          .award {
            width: 147px;
            margin-right: 11px;
            &:nth-child(1) {
              margin-left: 20px;
              margin-right: 63px;
              .awardIcon {
                background: url('@/pages/celebration/assets/mk5_11.png') no-repeat left top/100% 100%;
              }
            }
            &:nth-child(2),&:nth-child(3) {
              .awardIcon {
                background: url('@/pages/celebration/assets/mk5_12.png') no-repeat left top/100% 100%;
                .awardText {
                  &::before {
                    background-image: -webkit-linear-gradient(0deg, #D69302, #D69302); /* 渐变背景 */
                  }
                }
              }
            }
            .awardIcon {
              width: 147px;
              height: 142px;
              .awardText {
                right: 10px;
                bottom: 9px;
                $stroke: 3px; /* 描边宽度 建议不要看蓝湖 因为text-stroke会向字体内部延申 所以宽度不准确 和效果图类似即可 */
                z-index: 1;
                font-weight: bold;
                font-size: 24px;
                white-space: nowrap; /* 防止换行 */
                .inner {
                  position: relative;
                  z-index: 2;
                  color: transparent; /* 字体颜色透明 只保留描边 */
                  background: -webkit-linear-gradient(0deg, white, white); /* 渐变背景 */
                  padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
                  -webkit-background-clip: text; /* 背景裁剪成字体 */
                  line-height: 100%; /* 保持行高一致 */
                }
                &::before {
                  content: attr(data-text); /* 继承文本 */
                  position: absolute;
                  z-index: 1;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  line-height: 100%; /* 保持行高一致 */
                  padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
                  color: transparent; /* 字体颜色透明 只保留描边 */
                  -webkit-text-stroke: $stroke transparent; /* 字体描边 为渐变背景占位 背景会覆盖在描边上 */
                  background: -webkit-linear-gradient(0deg, #805DCF, #805DCF); /* 渐变背景 */
                  -webkit-background-clip: text; /* 背景裁剪成字体 */
                  background-size: 100% 100%; /* 出现缝隙请调整 */
                  background-position: 0% 1px; /* 出现缝隙请调整 */
                }
              }
              .lockIcon {
                top: -6px;
                left: -7px;
                width: 44px;
              }
              .overly {
                width: 147px;
                height: 142px;
              }
              .light {
                width: 171px;
                height: 171px;
              }
            }
            .awardName {
              margin-top: 12px;
              font-weight: 500;
              font-size: 26px;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
  .buttons {
    margin-bottom: 50px;
    padding-left: 60px;
    .allReceive {
      width: 304px;
      height: 93px;
      font-size: 30px;
      color: #FFFFFF;
      padding: 32px 0;
      background: url('@/pages/celebration/assets/mk7_5.png') no-repeat left top/100% 100%;
    }
    .unLock {
      width: 308px;
      height: 119px;
      margin-left: 21px;
      font-size: 30px;
      color: #FFFFFF;
      background: url('@/pages/celebration/assets/mk7_6.png') no-repeat left top/100% 100%;
      padding: 29px 0 27px;
      &.has_right_2 {
        justify-content: center;
        background: url('@/pages/celebration/assets/mk7_6_1.png') no-repeat left top/100% 100%;
      }
      >span {
        font-weight: 500;
        font-size: 28px;
        color: #FDFF6B;
      }
      .tip {
        bottom: -3px;
        transform: translateY(100%);
        font-size: 28px;
        color: #6E56E7;
      }
    }
  }
}
</style>
