<template>
  <PopupBox title="title_2.png" @clickClose="clickClose">
    <!--超级蛋奖励提示文本-->
    <div v-if="hasSuperEgg" class="eggTips margin-row-center">
      <p class="line-height-100 text-nowrap">{{ topTextObj[this.list[0].egg_type].p1 }}大奖</p>
      <p class="line-height-100 text-nowrap">{{ topTextObj[this.list[0].egg_type].p2 }}</p>
    </div>

    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
          <div v-if="typeToNameMap[item.type]" class="typeLabel flex align-center justify-center position-absolute line-height-100 text-nowrap">{{ typeToNameMap[item.type] }}</div>
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
import { mapState } from 'vuex'
import PublicImg from './publicImg.vue'
import PopupBox from '@/pages/crazyEgg/components/popupBox'
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
      largeIconArray: Object.freeze(['title']),
      typeToButtonTextMap: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮'
      }),
      topTextObj: Object.freeze({
        6: { p1: '炫彩蛋', p2: '瓜分奖池10%元宝已发放！' },
        7: { p1: '贪婪炫彩蛋', p2: '奖池10%的双倍元宝已发放！' },
        8: { p1: '光明蛋', p2: '奖励已发放！' },
        9: { p1: '贪婪光明蛋', p2: '奖励已发放！' },
        10: { p1: '星遇蛋', p2: '奖励已发放！' },
        11: { p1: '贪婪星遇蛋', p2: '奖励已发放！' }
      })
    }
  },
  computed: {
    ...mapState(['typeToNameMap']),
    // 是否有超级蛋
    hasSuperEgg() {
      return this.list.length == 1 && this.list[0].egg_type >= 6
    },
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
  padding: 137px 17px 66px;
}
.eggTips {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
  p {
    width: fit-content;
    height: fit-content;
    font-weight: 500;
    color: #ffe397;
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
  width: 100%;
  //padding-top: 30px;
  .award {
    width: 134px;
    margin-bottom: 13px;

    .icon {
      height: 134px;
      border-radius: 16px;
      background-color: #c86325;
      padding: 4px;

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fffbdd;
        border-radius: 12px;
        overflow: hidden;
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
      margin-left: 48px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 48px;
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
  margin: 40px auto 0;
  width: 324px;
  height: 76px;
  color: #ffffff;
  background: linear-gradient(0deg, #34a38f, #9adbb9);
  font-size: 32px;
  border-radius: 38px;
  border: 2px solid #ffffff;
}
</style>
