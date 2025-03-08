<template>
  <PopupBox title="title_13.png" @clickClose="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
          <!--<div v-if="typeToNameMap[item.type]" class="label position-absolute flex align-center justify-center line-height-100 text-nowrap">-->
          <!--  {{ typeToNameMap[item.type] }}-->
          <!--</div>-->
          <div class="icon-main">
            <PublicImg :imgName="item.icon" :imgType="item.type" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="button position-relative flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
  </PopupBox>
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
import PublicImg from './publicImg.vue'
import PopupBox from '@/pages/childrenDay/components/popupBox.vue'
import { nowEquip } from '../api/index'

export default {
  props: ['list'],
  components: { PopupBox, PublicImg },
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      // typeToNameMap: Object.freeze({
      //   title: '称号',
      //   mic: '头饰',
      //   voice: '声波',
      //   car: '座驾',
      //   costume: '主页特效',
      //   chat_bubble: '气泡'
      // }),
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
      this.$emit('clickClose')
    },
    isLargeIcon(type) {
      return this.largeIconArray.includes(type)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  .main {
    max-height: none;
  }
}

.list {
  padding-top: 69px;
  //padding-bottom: 65px;
  .award {
    width: 168px;
    margin: 0 0 13px 0;

    .icon {
      height: 168px;
      border-radius: 16px;
      background-color: #c3f6ff;
      padding: 4px;

      //.label {
      //  z-index: 1;
      //  top: 0;
      //  right: 0;
      //  padding: 0 5px;
      //  height: 32px;
      //  background: linear-gradient(90deg, #f487ca, #ffe983);
      //  border-radius: 0 12px 0 12px;
      //  font-size: 22px;
      //  color: #ffffff;
      //}

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fefaef;
        border-radius: 12px;
        overflow: hidden;
      }
    }

    .large-icon {
      width: 188px;
      height: 128px;
    }

    .text {
      width: 168px;
      margin-top: 14px;
      font-size: 28px;
      color: #ffffff;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 24px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 24px;
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
  margin: 30px auto 65px;
  width: 324px;
  height: 76px;
  color: #4a50d1;
  background: linear-gradient(0deg, #7cd5ff, #dbfcfd);
  font-size: 32px;
  border-radius: 38px;
  z-index: 1;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    inset: 2px;
    background-image: linear-gradient(180deg, #ebfeff, #baf1f9);
    border-radius: inherit;
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
