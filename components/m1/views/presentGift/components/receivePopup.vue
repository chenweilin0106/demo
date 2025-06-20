<template>
  <PopupBox title="mk1_title_10.png" size="1" @clickClose="clickClose">
    <slot name="listTop"></slot>
    <div class="list">
      <div v-for="(item,index) in config" :key="index" class="award flex-column align-center">
        <div class="icon position-relative" :class="item.type=='title'&&config.length==1?'titleClass':''">
          <div v-if="popupTypeName[item.type]||popupTypeName[item.id]" class="typeLabel line-height-1 flex align-center justify-center radius-999 position-absolute">{{popupTypeName[item.type]||popupTypeName[item.id]}}</div>
          <PublicImg :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">{{formatName(item)}}</div>
      </div>
    </div>
    <slot name="listBottom"></slot>
    <PublicButton has-right="4" class="button" @click="clickConfirm">{{buttonText}}</PublicButton>
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
      return { ...this.typeToNameMap, 226: '超级道具礼物' }
    }
  },
  methods: {
    formatName(info) {
      if (info.type == 'vip') return `加赠天数+${info.nums}天`
      return this.$toShowText(info)
    },
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
.list{
  $listWidth: 100%; /*列表宽度*/
  $itemIconSize: 128px; /*图标大小*/
  $colNum: 3; /*列数*/
  $gapNum: calc($colNum * 2 + 2); /*间隔数*/
  $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
  $textHeight: 2 * 18 + 28px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
  $itemWidth: calc($itemIconSize + 2 * $gap); /*每个item的宽度*/
  $listTopPadding: 30px; /*列表顶部距离*/
  width: $listWidth;
  height: fit-content;
  min-height: calc($itemIconSize + $textHeight); /*最小展示一行： 图标高度 + 文字高度*/
  max-height: calc(($itemIconSize + $textHeight) * 3 + (($itemIconSize + $textHeight) / 6) + $listTopPadding); /*最多展示三行： 图标高度 + 文字高度 +  1/6（图标高度 + 文字高度）*/
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: start;
  padding: $listTopPadding $gap 0;
  margin: 0 auto;
  .award{
    $borderWidth: 4px; /*边框粗细*/
    $radius: 20px; /*圆角*/
    $borderColor: #81D1F6;
    $bgc: linear-gradient(0deg, #fff, #fff);
    $fontSize: 28px; /*文本字体大小*/
    $color: #fff;
    width: $itemWidth;
    .icon{
      width: $itemIconSize;
      height: $itemIconSize;
      border-radius: $radius + $borderWidth;
      border: $borderWidth solid $borderColor;
      background:$bgc;
      &.titleClass{
        width: 244px;
      }
    }
    .text{
      width: $itemIconSize;
      height: $textHeight;
      font-size: $fontSize;
      color: $color;
    }
  }
}
.typeLabel{
  z-index: 1;
  transform: translateY(-50%);
  top: 0;
  right: -8px; /*角标距离右边距离*/
  padding: 0 8px;
  height: 28px;
  background: #C25E94; /*角标背景色*/
  font-weight: 500;
  font-size: 18px; /*角标字体大小*/
  color: #FFFFFF; /*角标字体颜色*/
}
::v-deep .button{
  margin: 25px auto 0;
  width: 320px;
  height: 72px;
  font-size: 32px;
}
</style>
