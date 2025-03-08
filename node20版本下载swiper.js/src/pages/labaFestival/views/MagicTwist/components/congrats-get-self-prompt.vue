<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_10.png')" />

      <div class="inner-bgc">
        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <div v-if="item.type === 'costume'" class="label">主页特效</div>
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
            <div class="text flex-center">{{ item.text }}</div>
          </div>
        </div>
        <!--按钮-->
        <div class="button flex-center" @click="clickConfirm">我知道了</div>
      </div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="bottom-icon"></div>
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
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    async clickConfirm() {
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
  width: 618px;
  height: 578px;
  background-color: #eee1ff;
  border: 8px solid #c59ce8;
  padding: 4px;
  border-radius: 32px;
  pointer-events: auto;
}

.title-image {
  width: 755px;
  height: auto;
  position: absolute;
  top: -200px;
  left: -110px;
  pointer-events: none;
}

.left-icon {
  position: absolute;
  top: 67px;
  left: -58px;
  width: 99px;
  height: 252px;
  background: url('@/pages/labaFestival/assets/tk_1.png') no-repeat left
    top/100% 100%;
}

.right-icon {
  position: absolute;
  top: 85px;
  right: -50px;
  width: 87px;
  height: 251px;
  background: url('@/pages/labaFestival/assets/tk_2.png') no-repeat left
    top/100% 100%;
}

.bottom-icon {
  position: absolute;
  right: -18px;
  bottom: -23px;
  width: 224px;
  height: 50px;
  background: url('@/pages/labaFestival/assets/tk_3.png') no-repeat left
    top/100% 100%;
}

.inner-bgc {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #8360c3, #b75059);
  //overflow: hidden;
  border-radius: 20px;
  padding-bottom: 48px;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 101px 0 0;

  .award {
    position: relative;
    margin: 0 0 13px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .label {
      position: absolute;
      z-index: 10;
      top: -9px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 84px;
      width: fit-content;
      height: 26px;
      padding: 0 7px;
      background: #ce5266;
      border-radius: 13px;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
    }

    .icon {
      width: 96px;
      height: 96px;
      border-radius: 16px;
      background-color: #7446d1;
      padding: 4px;

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 12px;

        ::v-deep .PublicSvga {
          .micAvatar_img {
            width: 80%;
            height: 80%;
          }
        }

        img {
          width: 100%;
        }
      }
    }

    .text {
      margin-top: 14px;
      font-size: 25px;
      color: #ffffff;
      white-space: nowrap;
    }

    &:nth-of-type(1),
    &:nth-of-type(6) {
      margin-left: 0;
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px auto 0;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
