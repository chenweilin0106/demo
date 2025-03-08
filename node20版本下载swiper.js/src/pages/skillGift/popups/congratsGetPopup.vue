<template>
  <PublicPopup title="title_7.png" @close="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
          <div v-if="typeToNameMap[item.type]" class="typeLabel">{{ typeToNameMap[item.type] }}</div>
          <div class="icon-main">
            <img :src="IconPath(item.icon)" class="h-100 width-auto" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="button position-relative flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
  </PublicPopup>
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
import PublicPopup from '@/pages/skillGift/components/publicPopup.vue'
import { nowEquip } from '../api'
import { mapState } from 'vuex'
export default {
  props: ['list'],
  components: { PublicPopup },
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      typeToNameMap: Object.freeze({
        title: '称号',
        mic: '头饰',
        voice: '声波',
        car: '座驾',
        costume: '主页特效',
        chat_bubble: '气泡'
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
    ...mapState(['typeToNameMap']),
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
::v-deep .popupContent {
  width: 642px;
  min-height: 562px;
}
.list {
  padding-top: 119px;
  .award {
    width: 141px;
    margin-bottom: 21px;

    .icon {
      height: 143px;
      background: url('@/pages/skillGift/assets/tk_4.png') no-repeat left top/100% 100%;
      padding: 4px;

      .label {
        z-index: 1;
        top: -10px;
        right: -10px;
        padding: 0 7px;
        height: 26px;
        background: #9c65e1;
        border-radius: 13px;
        font-weight: 500;
        font-size: 18px;
        color: #ffffff;
      }

      .icon-main {
        width: 100%;
        height: 100%;
        //background-color: #fff;
        //border-radius: 12px;
        overflow: hidden;
      }
    }

    .large-icon {
      width: 188px;
      height: 128px;
    }

    .text {
      width: 141px;
      margin-top: 21px;
      font-size: 28px;
      color: #ffffff;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 60px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 60px;
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
  margin: 40px auto 50px;
  width: 263px;
  height: 98px;
  font-size: 32px;
  color: #1069ff;
  background: url('@/pages/skillGift/assets/tk_7.png') no-repeat left top/100% 100%;
}
::v-deep .PublicJson {
  .micAvatar_img {
    width: 70%;
    height: 70%;
  }
}
</style>
