<template>
  <PopupBox title="title_9.png" size="small" @clickClose="clickClose">
    <div class="listMain flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative" :class="isLargeIcon(item.type) && 'large-icon'">
          <!--<div v-if="typeToNameMap[item.type]" class="label position-absolute flex align-center justify-center line-height-100 text-nowrap">-->
          <!--  {{ typeToNameMap[item.type] }}-->
          <!--</div>-->
          <div class="iconMain">
            <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" :userAvatar="$store.state.user_icon" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <PublicButton class="button" hasRight="1" @click="clickConfirm">{{ buttonText }}</PublicButton>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/pages/summerParty2024/api/index'
export default {
  props: ['list'],
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
      //   chat_bubble: '气泡',
      //   pst_privilege: '赠送权'
      // }),
      largeIconArray: Object.freeze(['title']),
      typeToButtonTextMap: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮'
      }),
      needAvatar: Object.freeze(['voice', 'mic'])
    }
  },
  computed: {
    // 是否装扮
    isEquip() {
      return this.list.length == 1 && this.typeToButtonTextMap[this.list[0].type]
    },
    // 按钮文案
    buttonText() {
      return this.isEquip ? this.typeToButtonTextMap[this.list[0].type] : '我知道了'
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
.listMain {
  width: 100%;
  padding: 0 74px; /*todo 74px是左右两边的间距*/
  .award {
    $awardSize: 128px; /*todo 奖励容器大小*/
    width: $awardSize;
    margin-bottom: 13px; /*todo 奖励容器底部间距*/
    .icon {
      height: $awardSize;
      $radius: 16px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框粗细*/
      border-radius: $radius;
      background-color: #fbe590; /*todo 边框颜色*/
      padding: 4px;
      .label {
        z-index: 1;
        top: -13px;
        right: -12px;
        padding: 0 7px;
        height: 26px;
        background: #9c65e1;
        border-radius: 13px;
        font-weight: 500;
        font-size: 18px;
        color: #ffffff;
      }
      .iconMain {
        width: 100%;
        height: 100%;
        background-color: #fff; /*todo 图标背景色*/
        border-radius: $radius - $borderWidth;
        overflow: hidden;
      }
    }
    .large-icon {
      width: 188px;
      height: 128px;
    }
    .text {
      margin-top: 14px;
      font-size: 24px;
      color: #ffffff;
    }
    $marginLeft: 16px; /*todo 奖励容器左侧边距*/
    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      margin-left: $marginLeft;
    }
    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      margin-left: $marginLeft;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
.button {
  margin: 30px auto 3px;
  width: 320px;
  height: 72px;
  font-size: 32px;
  border-radius: 36px;
}
</style>
