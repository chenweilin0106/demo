<template>
  <van-popup
    v-model="showPopup"
    @closed="clickClose"
    :lock-scroll="true"
    close-on-click-overlay
    @click="showPopup = false"
    @touchmove.prevent.stop
  >
    <div class="popup-content" @click.stop>
      <!--标题图片-->
      <img
        @click="showPopup = false"
        class="title-image"
        :src="IconPath('tk_25.png')"
      />

      <div class="inner-content">
        <div class="main-content">
          <div class="chatBg">
            <img src="../../../../assets/tk_26.png" alt="" />
            <PublicSvga
              v-if="chagBgFlag == 1"
              class="lottie"
              svgaName="gift_csd"
            />
            <PublicSvga
              class="lottie"
              v-if="chagBgFlag == 2"
              svgaName="car_frxl"
            />
          </div>
          <div v-show="chagBgFlag == 1" class="tit">财神到·音效礼物赠送权</div>
          <div v-show="chagBgFlag == 2" class="tit">福瑞祥龙·座驾</div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
/*
     * congrats-get-prompt
     * @description: 恭喜获得弹框
     * @prop {Boolean} showPopup 是否显示弹框
     * @prop {Array} list 奖励数据
     * @event {Function} clickConfirm 确认按钮
     * @event {Function} nowEquip 立即装扮接口
     * @event {Function} isEquip 是否可以装扮
     * @event {Function} buttonText 按钮文案
     * @event {Function} clickClose 弹出层关闭后回调函数
     * 示例：
       <congrats-get-prompt
          ref="congratsGet"
         :list="dialogData"
         @close=""
       >
         <!--奖励需要使用json或者svga动画-->
         <--使用作用域插槽，根据type判断奖励图标是json或者svga-->
         <--（data是当前道具的信息，可以解构出type，id，icon等等）-->
         <template v-slot="{ data: { type } }">
           <public-json v-if="type == 'title'" jsonName="" :userAvatar="$store.getters.user_icon" />
           <public-svga v-else-if="type == 'mic'" svgaName="" :userAvatar="$store.getters.user_icon" />
         </template>
       </congrats-get-prompt>
       使用this.$refs.congratsGet.openPrompt()打开弹框
     */
import PublicSvga from '../../../../components/PublicSvga.vue'
export default {
  props: ['chagBgFlag'],
  components: { PublicSvga },
  data() {
    return {
      showPopup: false
    }
  },
  watch: {
    showPopup: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          document.querySelector('html').style.overflow = 'hidden'
        } else {
          document.querySelector('html').style.overflow = 'auto'
        }
      }
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.showPopup = false
    },
    clickConfirm() {}
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;

  pointer-events: none;
}

.popup-content {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 609px;
  min-height: 418px;
  height: fit-content;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  border-radius: 60px;
  background-color: transparent;
  .inner-content {
    width: 100%;
    min-height: 418px;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;
    .main-content {
      height: 893px;
      position: relative;
      z-index: 4;
      width: 100%;
      min-height: 418px;
      padding-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .chatBg {
        width: 427px;
        height: 740px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 59px;
        position: relative;
        > img {
          width: 100%;
          height: 100%;
        }
        .lottie {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
      .tit {
        margin-top: 26px;
        height: 27px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      //opacity: 0.5;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.title-image {
  width: 306px;
  height: 105px;
  position: absolute;
  z-index: 999;
  top: -36px;
  right: -23px;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 26px;
  height: 450px;
  overflow-y: scroll;

  .award {
    margin: 0 0px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 180px;
      height: 120px;
      background: #ffffff;
      border: 4px solid #d14514;
      border-radius: 12px;
      padding: 4px;
      position: relative;

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 12px;

        img {
          width: 100%;
        }
      }
      .check_box {
        width: 53px;
        height: 53px;
        position: absolute;
        bottom: -6px;
        right: -23px;
        background-image: url('../../../../assets/tk_16.png');
        background-size: 100% 100%;
      }
    }
    #ch_dbyf {
      width: 180px;
      height: 128px;
    }

    .text {
      margin-top: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #ffffff;
      white-space: nowrap;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(2n) {
      /* 样式规则 */
      margin-left: 69px;
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 42px auto 0;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
