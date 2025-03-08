<template>
  <PopupBox title="title_9.png" @clickClose="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative">
          <div v-if="typeToNameMap[item.goods_type]" class="typeLabel">{{ typeToNameMap[item.goods_type] }}</div>
          <div class="icon-main">
            <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
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
import { nowEquip } from '../api/index'
export default {
  props: ['list'],
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      typeToNameMap: Object.freeze({
        pst_privilege: '赠送权',
        costume: '主页特效',
        chat_bubble_pub: '公屏气泡',
        chat_bubble: '私聊气泡'
      }),
      // largeIconArray: Object.freeze(['title']),
      typeToButtonTextMap: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮',
        chat_bubble_pub: '立即装扮'
      }),
      needAvatar: Object.freeze(['voice', 'mic'])
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
      this.$emit('clickClose')
    }
    // isLargeIcon(type) {
    //   return this.largeIconArray.includes(type)
    // }
  }
}
</script>

<style scoped lang="scss">
.list {
  margin-top: 40px;
  width: 100%;
  .award {
    width: 160px;
    margin-bottom: 20px;

    .icon {
      height: 160px;
      .icon-main {
        width: 100%;
        height: 100%;
        background: #103469;
        box-shadow: inset 0 0 5px 3px #fff;
        overflow: hidden;
      }
    }
    .text {
      margin-top: 20px;
      font-size: 28px;
      color: #ffffff;
      line-height: 100%;
    }
    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 30px;
    }
    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 30px;
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
  margin: 30px auto;
  width: 240px;
  height: 76px;
  font-size: 32px;
  color: #FFFFFF;
  background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left top/100% 100%;
}
</style>
