<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image position-absolute position-row-center" :src="IconPath('title_12.png')" />

      <div class="inner flex-column justify-center align-center w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--列表-->
        <div class="list flex align-center justify-center">
          <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
            <!--边框-->
            <div class="icon position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
              <div
                v-if="item.type == 'car' || item.type == 'costume'"
                class="label position-absolute flex align-center justify-center line-height-100 text-nowrap"
              >
                {{ labelObject[item.type] }}
              </div>
              <!--图片背景色-->
              <div class="icon-main">
                <slot :data="item"><img v-if="item.icon" :src="IconPath(item.icon)" /></slot>
              </div>
            </div>

            <!--文本-->
            <div class="text flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
          </div>
        </div>
        <!--按钮-->
        <div class="button position-relative flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
/*
<CongratsGetPopup
    ref="CongratsGetPopup"
   @close=""
 >
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
  data() {
    return {
      list: [
        // { icon: 'ljs_120_120.png', text: '+10', type: 'costume' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' }
      ],
      showPopup: false,
      labelObject: Object.freeze({
        title: '称号',
        mic: '头饰',
        voice: '声波',
        car: '座驾',
        costume: '主页特效',
        chat_bubble: '气泡'
      }),
      largeIconArray: Object.freeze(['title']),
      equipArray: Object.freeze({
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
      return this.list.length == 1 && this.equipArray[this.list[0].type]
    },
    // 按钮文案
    buttonText() {
      if (this.list.length >= 2) {
        return '我知道了'
      } else if (this.isEquip) {
        return this.equipArray[this.list[0].type]
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
      this.showPopup = false
    },
    clickClose() {
      this.$emit('close')
    },
    isLargeIcon(type) {
      return this.largeIconArray.includes(type)
    },
    // 打开弹框
    openPrompt(params) {
      if (params && params.length) {
        this.list = params
        this.showPopup = true
      } else {
        console.log('数据错误')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  .popup-content {
    position: relative;
    width: 626px;
    padding: 13px; // 不规则边框当背景图 实际内容区域
    pointer-events: auto;
    border-image-source: url('@/pages/qingMing/assets/mk1_bg_1.png');
    border-image-slice: 70 0 70 0 fill;
    border-image-width: 70px 0 70px 0;
    .inner {
      min-height: 559px;
      padding-top: 60px;
    }
    .title-image {
      width: 642px;
      height: 130px;
      z-index: 3;
      top: -69px;
      pointer-events: none;
    }
  }
}
.list {
  width: 100%;
  //padding: 20px 0 0;

  .award {
    margin: 0 0 13px 16px;

    .icon {
      width: 128px;
      height: 128px;
      border-radius: 16px;
      background-color: #75d093;
      padding: 4px;

      .label {
        top: -12px;
        right: -10px;
        height: 28px;
        padding: 0 13px;
        background: #56a39b;
        border-radius: 14px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fefaef;
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
      margin-left: 52px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 52px;
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
  margin: 40px auto 51px;
  width: 324px;
  height: 76px;
  border-radius: 36px;
  border: 2px solid #ffffff;
  font-size: 34px;
  z-index: 0;
  color: #16474a;
  background: linear-gradient(0deg, #00aaa3, #8ecf73);

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 320px;
    height: 72px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 34px;
    background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
  }
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
