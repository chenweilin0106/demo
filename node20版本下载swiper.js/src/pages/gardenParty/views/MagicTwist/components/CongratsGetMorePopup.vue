<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content flex-column justify-center align-center" @touchmove.prevent.stop>
        <!--标题图片-->
        <img class="title-image position-absolute position-row-center" :src="IconPath('title_7.png')" />
        <!--列表-->
        <div class="list flex align-center justify-center flex-wrap">
          <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
            <!--边框-->
            <div class="icon w-100 position-relative">
              <div v-if="typeToNameMap[item.type]" class="label position-absolute flex align-center justify-center line-height-100 text-nowrap">
                {{ typeToNameMap[item.type] }}
              </div>
              <!--图片背景色-->
              <div class="icon-main">
                <slot :data="item"><img v-if="item.icon" :src="IconPath(item.icon)" /></slot>
              </div>
            </div>

            <!--文本-->
            <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
          </div>
        </div>
        <!--按钮-->
        <div class="button position-relative flex align-center justify-center" @click="clickClose">我知道了</div>
      </div>
    </div>
  </transition>
</template>

<script>
/*
<CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @close="showCongratsGetPopup = false">
   <!--奖励需要使用json或者svga动画-->
   <--使用作用域插槽，根据type判断奖励图标是json或者svga-->
   <--（data是当前道具的信息，可以解构出type，id，icon等等）-->
   <template v-slot="{ data: { type } }">
     <public-json v-if="type == 'title'" jsonName="" :userAvatar="$store.getters.user_icon" />
     <public-svga v-else-if="type == 'mic'" svgaName="" :userAvatar="$store.getters.user_icon" />
   </template>
 </CongratsGetPopup>
 */
export default {
  props: ['list'],
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      typeToNameMap: Object.freeze({
        title: '称号',
        mic: '头饰',
        voice: '声波',
        car: '座驾',
        costume: '主页特效',
        chat_bubble: '气泡',
        pst_privilege: '赠送权'
      })
    }
  },
  methods: {
    async clickConfirm() {
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .popup-content {
    position: relative;
    width: 643px;
    height: fit-content;
    min-height: 450px;
    padding-top: 98px;
    padding-bottom: 75px;
    border-image-source: url('@/pages/gardenParty/assets/tk_16.png');
    border-image-slice: 84 0 82 0 fill;
    border-image-width: 84px 0 82px 0;
    .title-image {
      width: 410px;
      height: 130px;
      z-index: 3;
      top: -65px;
    }
  }
}
.list {
  .award {
    width: 96px;
    margin: 0 0 13px 18px;

    .icon {
      height: 96px;
      border-radius: 16px;
      background-color: #ffd0e7;
      padding: 4px;

      .label {
        top: -12px;
        right: -10px;
        height: 28px;
        padding: 0 13px;
        background: #af71d3;
        border-radius: 14px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 12px;

        img {
          width: 100%;
        }
      }
    }

    .large-icon {
      width: 188px;
      height: 128px;
    }

    .text {
      margin-top: 14px;
      font-size: 28px;
      color: #ffffff;
    }

    &:nth-of-type(1),
    &:nth-of-type(6) {
      margin-left: 0;
    }
  }
}

.button {
  margin: 30px auto 0px;
  width: 324px;
  height: 76px;
  border-radius: 36px;
  border: 2px solid #ffffff;
  font-size: 34px;
  z-index: 0;
  color: #a9792c;
  background: linear-gradient(0deg, #fff9d1, #ffffff);

  //&::before {
  //  content: '';
  //  position: absolute;
  //  z-index: -1;
  //  width: 320px;
  //  height: 72px;
  //  top: 50%;
  //  left: 50%;
  //  transform: translate(-50%, -50%);
  //  border-radius: 34px;
  //  background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
  //}
}

::v-deep .PublicSvga {
  .micAvatar_img {
    width: 80%;
    height: 80%;
  }

  ::v-deep .svga_box {
    width: 100%;
  }
}

::v-deep .PublicJson {
  .micAvatar_img {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
  }

  ::v-deep .json_box {
    width: 100%;
  }
}
</style>
