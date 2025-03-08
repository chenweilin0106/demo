<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('tk_6_12.png')" />

      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <!--边框-->
            <div class="icon" :class="isLargeIcon(item.type) && 'large-icon'">
              <div v-if="item.type == 'car' || item.type == 'costume'" class="label flex-center">
                {{ labelObject[item.type] }}
              </div>
              <!--图片背景色-->
              <div class="icon-main">
                <slot :data="item"><img v-if="item.icon" :src="IconPath(item.icon)" /></slot>
              </div>
            </div>

            <!--文本-->
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <!--按钮-->
        <div class="button flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
/*
<congrats-get-prompt
    ref="congratsGet"
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
 */
import { nowEquip } from '../api/index'

export default {
  data() {
    return {
      list: [],
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
}

.popup-content {
  position: relative;
  width: 620px;
  //min-height: 480px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;

  .inner {
    border-radius: 24px;
    background: linear-gradient(180deg, #fff3f4, #f9c4c7);
  }
}

.title-image {
  width: 644px;
  height: 230px;
  position: absolute;
  z-index: 3;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 91px 0 0;

  .award {
    margin: 0 0 13px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      position: relative;
      width: 128px;
      height: 128px;
      border-radius: 16px;
      background-color: #f6a1b0;
      padding: 4px;

      .label {
        position: absolute;
        top: -12px;
        right: -10px;
        width: fit-content;
        height: 28px;
        padding: 0 13px;
        background: #c16d6f;
        border-radius: 14px;
        white-space: nowrap;
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
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #b35553;
      white-space: nowrap;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 57px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 57px;
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
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border-radius: 36px;
  border: 2px solid #ffffff;
  font-size: 34px;
  color: #a9792c;
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
