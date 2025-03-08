<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_7.png')" />

      <!--列表-->
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="award">
          <!--边框-->
          <div class="icon">
            <div
              v-if="item.type == 'car' || item.type == 'costume'"
              class="label flex-center"
            >
              {{ item.type == 'car' ? '座驾' : '主页特效' }}
            </div>
            <!--图片背景色-->
            <div class="icon-main">
              <slot :data="item">
                <img v-if="item.icon" :src="IconPath(item.icon)" />
              </slot>
            </div>
          </div>

          <!--文本-->
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
      <!--按钮-->
      <div class="button" @click="clickConfirm">{{ buttonText }}</div>
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
import { nowEquip } from '../api/index'

export default {
  data() {
    return {
      list: [],
      showPopup: false,
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
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 616px;
  min-height: 496px;
  background: linear-gradient(0deg, #5e243a, #7e2725);
  border: 8px solid #f9c66c;
  border-radius: 26px;
  pointer-events: auto;
}

.title-image {
  width: 642px;
  height: 126px;
  position: absolute;
  z-index: 3;
  top: -82px;
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
      background-color: #ff9563;
      padding: 4px;

      .label {
        position: absolute;
        top: -12px;
        right: -10px;
        width: fit-content;
        height: 28px;
        padding: 0 13px;
        background: #f94e3c;
        border-radius: 14px;
        white-space: nowrap;
        font-size: 20px;
        font-weight: 600;
        color: #ffe2b6;
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

    .text {
      margin-top: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #ffffff;
      white-space: nowrap;
    }

    ///* 选择第2，5，8等元素 */
    //&:nth-child(3n + 2) {
    //  /* 样式规则 */
    //  margin-left: 16px;
    //}
    //
    ///* 选择第3，6，9等元素 */
    //&:nth-child(3n) {
    //  /* 样式规则 */
    //  margin-left: 16px;
    //}
    //
    //&:nth-child(1) {
    //  /* 样式规则 */
    //  margin-left: 0;
    //}

    /* 选择第1，5，9等元素 */
    &:nth-child(4n + 1) {
      /* 样式规则 */
      margin-left: 0px;
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 42px auto 49px;
  width: 256px;
  height: 98px;
  background: url('@/pages/lanternFestival/assets/btn_8.png') no-repeat left
    top/100% 100%;
  font-size: 32px;
  color: #e73d27;
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
