<template>
  <div class="congrats-get" @click.self="clickClose" @touchmove.prevent.stop>
    <div class="prompt-main congrats-get-main" @touchmove.prevent.stop>
      <img
        :src="IconPath('tk_4.png')"
        class="tk-petal position-absolute pointer-none"
      />

      <img
        :src="IconPath('tk_3.png')"
        class="necklace pointer-none position-absolute"
      />

      <div class="congrats-get-head pointer-none">
        <!--标题图片-->
        <img class="congrats-get-title" :src="IconPath('title_6.png')" />
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
          <p>{{ topTextObj[this.list[0].egg_type].p1 }}大奖</p>
          <p>{{ topTextObj[this.list[0].egg_type].p2 }}</p>
        </div>
        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <!--边框-->
            <div class="icon" :class="item.type == 'title' && 'title-icon'">
              <div
                v-if="item.type == 'car' || item.type == 'costume'"
                class="label flex align-center justify-center text-nowrap line-height-100"
              >
                {{ labelObject[item.type] }}
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
        <div class="button button-receive" @click="clickConfirm">
          {{ buttonText }}
        </div>
      </div>
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
import { nowEquip } from '../api/index'

export default {
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
      labelObject: Object.freeze({
        title: '称号',
        mic: '头饰',
        voice: '声波',
        car: '座驾',
        costume: '主页特效',
        chat_bubble: '气泡'
      }),
      equipArray: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮'
      }),
      topTextObj: Object.freeze({
        6: {
          p1: '炫彩蛋',
          p2: '瓜分奖池10%元宝已发放！'
        },
        7: {
          p1: '贪婪炫彩蛋',
          p2: '奖池10%的双倍元宝已发放！'
        },
        8: {
          p1: '光明蛋',
          p2: '奖励已发放！'
        },
        9: {
          p1: '贪婪光明蛋',
          p2: '奖励已发放！'
        },
        10: {
          p1: '星遇蛋',
          p2: '奖励已发放！'
        },
        11: {
          p1: '贪婪星遇蛋',
          p2: '奖励已发放！'
        }
      })
    }
  },
  computed: {
    // 是否有超级蛋（type未完成，仅占位）
    hasSuperEgg() {
      return this.list.length == 1 && this.list[0].egg_type >= 6
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
  created() {},
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
    padding: 22px 18px 20px;
    width: 560px;
    height: fit-content;
    position: relative;
    //padding: 8px;
    border-image-source: url('@/pages/womenDay/assets/tk_5.png');
    border-image-slice: 92 0 109 0 fill;
    border-image-width: 92px 0 109px 0;

    .tk-petal {
      top: 20%;
      right: -13px;
      width: 78px;
      height: 154px;
    }

    .necklace {
      z-index: 3;
      width: 404px;
      height: 282px;
      left: -1px;
      top: -7px;
    }

    .congrats-get-head {
      .congrats-get-title {
        position: absolute;
        z-index: 3;
        width: 593px;
        height: 176px;
        top: -126px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .congrats-get-content {
      position: relative;
      z-index: 2;
      width: 100%;
      min-height: 470px;
      margin: 0 auto;
      font-size: 30px;
      padding-top: 99px;
      border-radius: 40px;
      overflow: hidden;

      .egg-rewards-tips {
        //position: absolute;
        //top: -40px;
        //left: 50%;
        margin: 0 auto 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        //transform: translateX(-50%);
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
          margin-right: -18px;
        }
      }

      .list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 520px;

        .award {
          margin: 0 0 30px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            width: 128px;
            height: 128px;
            border-radius: 16px;
            background-color: #e3c08c;
            padding: 4px;

            .label {
              position: absolute;
              top: -12px;
              right: -10px;
              width: fit-content;
              height: 28px;
              padding: 0 13px;
              background: #a0323f;
              border-radius: 14px;
              white-space: nowrap;
              font-size: 20px;
              font-weight: 600;
              color: #ffe2b6;
            }

            .icon-main {
              width: 100%;
              height: 100%;
              background-color: #ffffff;
              border-radius: 12px;

              img {
                width: 100%;
              }

              .PublicJson {
                ::v-deep .micAvatar_img {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 70%;
                  height: 70%;
                }
              }
            }
          }

          .title-icon {
            width: 188px;
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
        }
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px auto;
        width: 326px;
        height: 78px;
        border-radius: 39px;
        font-size: 32px;
      }
    }

    .egg-rewards-content {
      padding-top: 73px;
    }
  }
}
</style>
