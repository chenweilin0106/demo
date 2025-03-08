<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_7.png')" />

      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--额外装饰-->
        <img :src="IconPath('tk_1.png')" class="popup-star-1 position-absolute pointer-none" />
        <img :src="IconPath('tk_2.png')" class="popup-star-2 pointer-none position-absolute" />

        <!--列表-->
        <div class="list">
          <div v-for="(item, index) in list" :key="index" class="award">
            <!--边框-->
            <div class="icon position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
              <!--<div-->
              <!--  v-if="item.type == 'car' || item.type == 'costume'"-->
              <!--  class="label position-absolute flex align-center justify-center line-height-100 text-nowrap"-->
              <!--&gt;-->
              <!--  {{ labelObject[item.type] }}-->
              <!--</div>-->
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
        <div class="button flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { nowEquip } from '../../api/index'
import { _throttle } from '../../utils/tool'

export default {
  data() {
    return {
      list: [
        // { icon: 'ljs_120_120.png', text: '+10' }
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' }
      ],
      showPopup: false,
      // labelObject: Object.freeze({
      //   title: '称号',
      //   mic: '头饰',
      //   voice: '声波',
      //   car: '座驾',
      //   costume: '主页特效',
      //   chat_bubble: '气泡'
      // }),
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
    clickConfirm: _throttle(async function () {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.list[0]
        this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg)
      }
      this.showPopup = false
    }, 1000),
    clickClose() {
      this.$emit('close')
    },
    isLargeIcon(type) {
      return this.largeIconArray.includes(type)
    },
    // 打开弹框
    openPrompt(params) {
      if (params?.length) {
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
  width: 548px;
  height: 480px;
  border: 10px solid rgba(255, 215, 152, 0.3);
  background: #fffbe6 padding-box;
  padding: 4px;
  pointer-events: auto;
  border-radius: 68px;

  .inner {
    border-radius: 54px;
    background: linear-gradient(0deg, #70b1bb, #a86280, #af315a);

    .popup-star-1 {
      z-index: 1;
      top: 33px;
      left: -44px;
      width: 109px;
      height: 341px;
    }
    .popup-star-2 {
      z-index: 1;
      top: 160px;
      right: -34px;
      width: 89px;
      height: 166px;
    }
  }
}

.title-image {
  width: 627px;
  height: 172px;
  position: absolute;
  z-index: 3;
  top: -110px;
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
  padding: 69px 0 0;

  .award {
    margin: 0 0 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      position: relative;
      width: 182px;
      height: 182px;
      background: linear-gradient(180deg, #490f2d, #7a2e52);
      border-radius: 24px;
      border: 4px solid #e896b3;

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
        //background-color: #ffffff;
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
  margin: 38px auto 51px;
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
