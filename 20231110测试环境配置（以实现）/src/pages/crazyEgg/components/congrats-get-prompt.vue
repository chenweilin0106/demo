<template>
  <div class="congrats-get" @click.self="clickClose">
    <div class="propmt-main congrats-get-main">
      <div class="congrats-get-head">
        <!--标题图片-->
        <img class="congrats-get-title" :src="IconPath('title_5.png')" />
      </div>

      <div
        class="congrats-get-content"
        :class="{
          'congrats-get-content-3': rowNum == 3,
          'egg-rewards-content': hasSuperEgg
        }"
      >
        <!--超级蛋奖励提示文本-->
        <div v-if="hasSuperEgg" class="egg-rewards-tips">
          <p>炫彩蛋大奖</p>
          <p>瓜分奖池10%元宝已发放！</p>
        </div>
        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <!--边框-->
            <div class="icon">
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

      <div class="gamePlay-desc-foot"></div>
    </div>
  </div>
</template>

<script>
/*
 * congrats-get-prompt
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
   <congrats-get-prompt
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
   </congrats-get-prompt>
 </transition>
 */
import { promptFixed } from '../mixins/prompt'
import { nowEquip } from '../api/index'
export default {
  mixins: [promptFixed],
  props: {
    list: {
      type: Array,
      default: () => []
    },
    rowNum: {
      type: [String, Number],
      default: 4
    }
  },
  data() {
    return {
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
    // 是否有超级蛋（type未完成，仅占位）
    hasSuperEgg() {
      return this.list.some((item) => item.type == 'super_egg')
    },
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
  created() {
    this.afterOpen()
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
      this.beforeClose()
    }
  }
}
</script>

<style scoped lang="scss">
.congrats-get {
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

  .congrats-get-main {
    width: fit-content;
    //min-width: 506px;
    //max-width: 626px;
    height: fit-content;
    //min-height: 466px;
    border-radius: 38px;
    //background: linear-gradient(to bottom, #8cbbf1, #ae8cf8);
    //border: 1px solid #fff;
    //background-color: rgba(255, 255, 255, 0.4);
    position: relative;
    padding: 8px;

    .congrats-get-head {
      position: relative;
      width: 100%;
      height: 137px;
      background: url('@/pages/crazyEgg/assets/tk_bg_1.png') no-repeat left
        top/100% 100%;
      .congrats-get-title {
        width: 537px;
        height: 124px;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .congrats-get-content {
      //padding-top: 73px;
      position: relative;
      z-index: 2;
      width: fit-content;
      min-width: 506px;
      max-width: 626px;
      height: fit-content;
      //width: 100%;
      //height: 100%;
      border-radius: 21px;
      background: url('@/pages/crazyEgg/assets/tk_bg_2.png') no-repeat left
        top/100% 100%;
      font-size: 30px;
      //padding-top: 87px;
      //overflow: hidden;

      .egg-rewards-tips {
        position: absolute;
        top: -40px;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
        width: fit-content;
        p {
          width: fit-content;
          height: fit-content;
          font-weight: 500;
          color: #ffe397;
          white-space: nowrap;
        }
        p:nth-of-type(1) {
          font-size: 32px;
          margin-bottom: 13px;
        }
        p:nth-of-type(2) {
          font-size: 28px;
        }
      }

      .list {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        padding: 0 30px;

        .award {
          margin: 0 0 30px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            width: 128px;
            height: 128px;
            border-radius: 16px;
            background-color: #c86325;
            padding: 4px;
            .icon-main {
              width: 100%;
              height: 100%;
              background-color: #fffbdd;
              border-radius: 12px;

              img {
                width: 100%;
              }
            }
          }

          .text {
            margin-top: 10px;
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
        margin: 20px auto 0;
        width: 324px;
        height: 76px;
        background: linear-gradient(0deg, #34a38f, #9adbb9);
        border: 2px solid #ffffff;
        border-radius: 38px;
        font-size: 32px;
        color: #fff;
      }
    }

    .egg-rewards-content {
      padding-top: 73px;
    }

    .congrats-get-content-3 {
      min-width: 653px !important;
      max-width: 653px !important;
    }

    .gamePlay-desc-foot {
      //margin-top: -18px;
      width: 100%;
      height: 66px;
      background: url('@/pages/crazyEgg/assets/tk_bg_3.png') no-repeat left
        top/100% 100%;
    }
  }
}
</style>
