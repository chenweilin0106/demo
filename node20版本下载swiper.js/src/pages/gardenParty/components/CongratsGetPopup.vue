<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content flex-column justify-center align-center" @touchmove.prevent.stop>
        <img :src="IconPath('tk_1.png')" class="leftBalloon position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightBalloon position-absolute" />
        <img class="title-image position-absolute position-row-center" :src="IconPath('title_7.png')" />
        <div class="list flex align-center justify-center flex-wrap">
          <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
            <div class="icon w-100 position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
              <div v-if="typeToNameMap[item.type]" class="label position-absolute flex align-center justify-center line-height-100 text-nowrap">
                {{ typeToNameMap[item.type] }}
              </div>
              <div class="icon-main">
                <slot :data="item"><img v-if="item.icon" :src="IconPath(item.icon)" /></slot>
              </div>
            </div>
            <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
          </div>
        </div>
        <div class="button position-relative flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
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
import { nowEquip } from '../api/index'

export default {
  props: ['list'],
  data() {
    return {
      // list: [
      //   // { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' }
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' },
      //   // { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      typeToNameMap: Object.freeze({
        title: '称号',
        mic: '头饰',
        voice: '声波',
        car: '座驾',
        costume: '主页特效',
        chat_bubble: '气泡',
        pst_privilege: '赠送权'
      }),
      largeIconArray: Object.freeze(['title']),
      typeToButtonTextMap: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮'
      })
    }
  },
  computed: {
    // 是否装扮
    isEquip() {
      return this.list.length == 1 && this.typeToButtonTextMap[this.list[0].type]
    },
    // 按钮文案
    buttonText() {
      if (this.list.length >= 2) {
        return '我知道了'
      } else if (this.isEquip) {
        return this.typeToButtonTextMap[this.list[0].type]
      } else {
        return '我知道了'
      }
    }
  },
  methods: {
    async clickConfirm() {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.list[0]
        this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg)
      }
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    },
    isLargeIcon(type) {
      return this.largeIconArray.includes(type)
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
    width: 555px;
    height: fit-content;
    min-height: 476px;
    padding-top: 102px;
    padding-bottom: 65px;
    border-image-source: url('@/pages/gardenParty/assets/tk_17.png');
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
.leftBalloon {
  top: -29px;
  left: -98px;
  width: 182px;
  height: 577px;
}
.rightBalloon {
  top: -5px;
  right: -97px;
  width: 163px;
  height: 354px;
}
.list {
  .award {
    width: 128px;
    margin: 0 0 13px 16px;

    .icon {
      height: 128px;
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

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 16px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 16px;
    }

    &:nth-child(1) {
      /* 样式规则 */
      margin-left: 0;
    }

    /* 选择第1，5，9等元素 */
    //&:nth-child(4n + 1) {
    //  /* 样式规则 */
    //  margin-left: 0px;
    //}
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
