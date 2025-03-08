<template>
  <div class="exchange-gifts" @click.self="clickClose">
    <div class="propmt-main exchange-gifts-main">
      <div class="exchange-gifts-head">
        <!--标题图片-->
        <img class="exchange-gifts-title" :src="IconPath('title_4.png')" />
      </div>

      <div class="exchange-gifts-content">
        <slot></slot>
      </div>

      <div class="exchange-gifts-foot"></div>
    </div>
  </div>
</template>

<script>
/*
 * exchange-gifts-prompt
 * @description: 恭喜获得弹框
 * 在组件上设置v-if="showCongratsGet"用于控制弹框显示隐藏
 * @close="showCongratsGet = false"
 * 如果需要过渡动画，需要在外层包裹transition标签，name="fade"，过渡动画样式（styles/globe.scss）
 * @prop {Array} list 奖励数据
 * @prop {String, Number} rowNum 奖励一排数量（预置3，4；默认4个）
 * @event {Function} close 关闭弹框
 * @event {Function} clickConfirm 确认按钮
 * @event {Function} nowEquip 立即装扮接口
 * @event {Function} isEquip 是否可以装扮
 * @event {Function} buttonText 按钮文案
 * @event {Function} clickClose 关闭弹框
 * @event {Function} promptFixed 弹框固定混入（utils/mixins.js）
 * @event {Function} afterOpen 打开弹框后（utils/mixins.js）
 * @event {Function} beforeClose 关闭弹框前（utils/mixins.js）
 * 示例：
 <transition name="fade">
   <exchange-gifts-prompt
     v-if="showCongratsGet"
     :list="dialogData"
     row-num="4"
     @close="showCongratsGet = false"
   >
     <!--使用作用域插槽，根据type判断奖励图标是json或者svga（data是当前道具的信息，可以解构出type，id，icon等等）-->
     <template v-slot="{ data: { type } }">
       <public-json v-if="type == 'title'" jsonName="" :userAvatar="$store.getters.user_icon" />
       <public-svga v-else-if="type == 'mic'" svgaName="" :userAvatar="$store.getters.user_icon" />
     </template>
   </exchange-gifts-prompt>
 </transition>
 */
import { promptFixed } from '../mixins/prompt'
export default {
  mixins: [promptFixed],
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    this.afterOpen()
  },
  methods: {
    clickClose() {
      this.$emit('close')
      this.beforeClose()
    }
  }
}
</script>

<style scoped lang="scss">
.exchange-gifts {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .exchange-gifts-main {
    width: 653px;
    height: fit-content;
    position: relative;
    //padding: 8px;
    .exchange-gifts-head {
      position: relative;
      width: 100%;
      height: 137px;
      background: url('@/pages/crazyEgg/assets/tk_bg_1.png') no-repeat left
        top/100% 100%;
      .exchange-gifts-title {
        width: 537px;
        height: 124px;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .exchange-gifts-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 395px;
      background: url('@/pages/crazyEgg/assets/tk_bg_2.png') no-repeat left
        top/100% 100%;
      font-size: 30px;
      padding-top: 87px;
      //overflow: hidden;
    }

    .exchange-gifts-foot {
      margin-top: -18px;
      width: 100%;
      height: 66px;
      background: url('@/pages/crazyEgg/assets/tk_bg_3.png') no-repeat left
        top/100% 100%;
    }
  }

  .exchargeGift_main {
    position: absolute;
    top: -110px;
    width: 100%;
    height: 100%;
    .remainingPoint,
    .goods_name,
    .Price_lucky_key,
    .Price_max_times {
      margin: 10px 0;
      font-size: 32px;
      color: #ffffff;
    }

    .remainingPoint {
      margin-top: 70px;
      //margin-bottom: 32px;

      > img {
        height: 47px;
        margin: 0 6px;
      }
    }

    .img-box {
      width: 128px;
      height: 128px;
      margin: 25px auto 10px;
      border-radius: 16px;
      background-color: #c86325;
      padding: 4px;

      .iconBox {
        width: 100%;
        height: 100%;
        background: #fffbdd;
        border-radius: 12px;

        > img {
          height: 100%;
        }
      }

      .pointReward_tk_lottie {
        // width: 90%;
        width: 100%;
        height: 100%;
        background: #fefaef;
        border-radius: 14px;

        .title_animation {
          .micAvatar_img {
            width: 73%;
            height: 73%;
          }

          .PublicJson_ts_tslm_1 {
            width: 120px !important;
          }

          .json_box {
            width: 95% !important;
          }
        }

        .mic_animation {
          ::v-deep .micAvatar_img {
            width: 86px;
            height: 86px;
          }

          ::v-deep .json_box {
            width: 120px !important;
          }
        }
      }
    }

    .tk_title_img_box,
    .car_rhty_img_box {
      width: 188px !important;
      height: 128px !important;
      img {
        width: 90% !important;
        height: auto !important;
      }
    }

    .goods_name {
      margin: 20px 0 24px;
      font-size: 28px !important;
    }

    .Price_lucky_key {
      margin: 10px 0;
      // font-size: 16px;
      // color: #ffffff;
      img {
        height: 36px;
        margin: 0 6px;
      }
    }

    .Price_max_times {
      margin: 10px 0;
      // font-size: 16px;
      // color: #ffffff;
      img {
        height: 40px;
        margin: 0 6px;
      }
    }

    // 弹框下方按钮
    .Dialog_Buttons {
      display: flex;
      justify-content: space-evenly;
      margin: 30px 20px;

      .left-button,
      .right-button {
        width: 244px;
        padding: 0 20px;
        height: 76px;
        border-radius: 76px;
        text-align: center;
        flex-direction: column;
        font-size: 32px;

        p {
          width: 100%;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 30px;
            height: auto;
            margin: 0 4px;
          }
        }

        p:nth-child(2) {
          font-size: 24px;
        }
      }
    }

    .hero_stone_btn {
      margin: 14px 20px 30px !important;

      .left-button {
        width: 244px !important;
        height: 76px !important;
        border: 2px solid #ffffff !important;
        border-radius: 38px !important;
      }
    }
  }
}

.hero-stone-prompt {
  .exchange-gifts-content {
    height: 440px !important;
  }
}
</style>
