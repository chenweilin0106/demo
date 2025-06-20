<template>
  <PopupBox title="mk1_title_11.png" size="1" @clickClose="clickClose">
    <div class="listMain flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in config" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative" >
          <div v-if="popupTypeName[item.type] || popupTypeName[item.id]" class="typeLabel">
            {{ popupTypeName[item.type] || popupTypeName[item.id] }}
          </div>
          <div class="iconMain"><PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" /></div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="button flex align-center justify-center line-height-100" @click="clickConfirm">{{ buttonText }}</div>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { nowEquip } from '@/api'
export default {
  props: ['config'],
  data() {
    return {
      // config: [
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
      return this.config.length == 1 && this.needNowEquipList.includes(this.config[0].type)
    },
    // 按钮文案
    buttonText() {
      return this.isEquip ? `立即${this.nowEquipText[this.config[0].type]}` : '我知道了'
    },
    // 一些活动单独定制角标
    popupTypeName() {
      return { ...this.typeToNameMap, magic: '魔法飘屏道具', 226: '超级道具礼物' }
    }
  },
  methods: {
    async clickConfirm() {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.config[0]
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
::v-deep .main {
  max-height: 600px !important;
}
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
      background-color: #DBC1FF; /*todo 边框颜色*/
      padding: 4px;
      /*右上角私聊气泡，公屏气泡角标*/
      .typeLabel {
        position: absolute;
        z-index: 1;
        transform: translateY(-50%);
        top: 0;
        right: -8px; /*todo 角标距离右边距离*/
        padding: 0 8px;
        height: 28px;
        background: #D67FFF; /*todo 角标背景色*/
        border-radius: 14px;
        font-size: 18px; /*todo 角标字体大小*/
        color: #FFFFFF; /*todo 角标字体颜色*/
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 100%;
      }
      .iconMain {
        width: 100%;
        height: 100%;
        background-color: #fff; /*todo 图标背景色*/
        border-radius: $radius - $borderWidth;
        overflow: hidden;
      }
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
    &.large {
      width: 188px;
      .icon {
        height: 128px;
      }
    }
  }
}
.button {
  margin: 0 auto 3px;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 38px;
  border: 2px solid #FFFFFF;
  font-size: 32px;
  color: #A9792C;
}
</style>
