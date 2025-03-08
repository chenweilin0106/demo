<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <div class="inner_box">
        <!--标题图片-->
        <img class="title-image" :src="IconPath('title_7.png')" />

        <!--底部装饰图片-->
        <div class="foot-image"></div>
        <div class="congra_tit">恭喜解锁下一层！奖励更加丰厚!</div>
        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <!--边框-->
            <div class="icon" :id="item.tool_id == 5054 && 'ch_dbyf'">
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
import { nowEquip } from '../../../api/index'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
    openPrompt() {
      this.showPopup = true
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
  width: 528px;
  border: 10px solid rgba(236, 211, 255, 0.5);
  border-radius: 40px;
  pointer-events: auto;
  .inner_box {
    background: linear-gradient(0deg, #ed96fd, #866ae0);
    border: 4px solid #ffffff;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .foot-image {
      position: absolute;
      z-index: -1;
      bottom: -12px;
      right: -8px;
      width: 363px;
      height: 110px;
      //background: url('@/pages/valentineDay/assets/title_11_1.png') no-repeat left
      //  top/100% 100%;
    }

    .title-image {
      width: 515px;
      height: 199px;
      position: absolute;
      top: -125px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .congra_tit {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 70px;
    }

    .list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      padding: 36px 28px 0;

      .award {
        margin: 0 8px 13px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
          width: 128px;
          height: 128px;
          border-radius: 16px;
          background-color: #d5a8ff;
          padding: 4px;

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
      }
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 42px auto 52px;
      width: 324px;
      height: 76px;
      background: linear-gradient(0deg, #fff9d1, #ffffff);
      border: 2px solid #ffffff;
      border-radius: 38px;
      font-size: 32px;
      color: #a9792c;
    }
  }
}
</style>
