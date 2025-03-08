<template>
  <PopupBox title="title_13.png" size="2" @clickClose="clickClose">
    <div class="listMain flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative">
          <!--有些道具无法使用type判断 所以单独写死-->
          <div v-if="typeToNameMap[item.type] || item.id == 226" class="typeLabel">{{ item.id == 226 ? '超级道具礼物' : typeToNameMap[item.type] }}</div>
          <div class="iconMain">
            <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <PublicButton class="button" hasRight="1" @click="clickConfirm">{{ buttonText }}</PublicButton>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { nowEquip } from '@/api'
export default {
  props: ['list'],
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
    }
  },
  computed: {
    ...mapState(['typeToNameMap', 'nowEquipText', 'needNowEquipList']),
    // 是否装扮
    isEquip() {
      return this.list.length == 1 && this.needNowEquipList.includes(this.list[0].type)
    },
    // 按钮文案
    buttonText() {
      return this.isEquip ? `立即${this.nowEquipText[this.list[0].type]}` : '我知道了'
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
  }
}
</script>

<style scoped lang="scss">
.listMain {
  width: 100%;
  padding: 14px 0 40px; /*todo 上左右的间距 上间距是角标高度的一半*/
  .award {
    $awardSize: 128px; /*todo 奖励容器大小*/
    width: $awardSize;
    margin-bottom: 13px; /*todo 奖励容器底部间距*/
    .icon {
      height: $awardSize;
      $radius: 16px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框粗细*/
      border-radius: $radius;
      background-color: #A7DFFF; /*todo 边框颜色*/
      padding: 4px;
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
  margin: 0 auto 3px;
  width: 320px;
  height: 72px;
  font-size: 32px;
  border-radius: 36px;
}
</style>
