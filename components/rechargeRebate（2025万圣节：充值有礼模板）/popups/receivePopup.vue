<template>
  <PopupBox title="title_2.png" @clickClose="clickClose">
    <slot name="listTop"></slot>
    <div class="list">
      <div v-for="(item,index) in config" :key="index" class="award">
        <div class="icon" :class="item.type == 'title' && config.length == 1 ? 'titleClass' : ''">
          <div v-if="item.label == '首赠'" class="firstLabel">首赠</div>
          <div v-else-if="popupTypeName[item.type] || popupTypeName[item.id]" class="typeLabel">{{ popupTypeName[item.type] || popupTypeName[item.id] }}</div>
          <PublicImg :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text">{{formatName(item)}}</div>
      </div>
    </div>
    <slot name="listBottom"></slot>
    <div class="button" @click="clickConfirm">{{buttonText}}</div>
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
      return { ...this.typeToNameMap }
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
::v-deep {
  .popupContent {
    .main {
      margin-bottom: 80px;
    }
  }
}
.list{
  $listWidth: 100%; /*列表宽度*/
  $itemIconSize: 134px; /*图标大小*/
  $colNum: 3; /*列数*/
  $gapNum: calc($colNum * 2 + 2); /*间隔数*/
  $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
  $textHeight: 2 * 17px + 27px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
  $itemWidth: calc($itemIconSize + 2 * 21px); /*每个item的宽度*/
  $listTopPadding: 53px; /*列表顶部距离*/
  width: $listWidth;
  height: fit-content;
  min-height: calc($itemIconSize + $textHeight); /*最小展示一行： 图标高度 + 文字高度*/
  max-height: calc(($itemIconSize + $textHeight) * 3 + (($itemIconSize + $textHeight) / 9) + $listTopPadding); /*最多展示三行： 图标高度 + 文字高度 +  1/6（图标高度 + 文字高度）*/
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: start;
  padding: $listTopPadding 0 0;
  margin: 0 auto;
  .award{
    $borderWidth: 4px; /*边框粗细*/
    $radius: 20px; /*圆角*/
    $fontSize: 28px; /*文本字体大小*/
    $color: #fff;
    width: $itemWidth;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon{
      position: relative;
      width: $itemIconSize;
      height: 143px;
      // border-radius: $radius + $borderWidth;
      // border: $borderWidth solid $borderColor;
      // background:$bgc;
      background: #6D67BF;
      border-radius: 16px;
      border: 4px solid #BCC9FE;
      padding: 10px;
      &.titleClass{
        width: 244px;
      }
    }
    .text{
      width: $itemIconSize;
      height: $textHeight;
      font-size: $fontSize;
      font-weight: 500;
      color: $color;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
    }
    .firstLabel {
      position: absolute;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      top: -8px;
      right: -4px;
      width: 57px;
      height: 30px;
      background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
      border-radius: 15px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
    }
  }
}
.typeLabel{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: 28px;
  z-index: 1;
  top: -8px;
  right: -4px;
  padding: 0 6px;
  height: 28px;
  background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
  border-radius: 15px;
  font-weight: 500;
  font-size: 20px;
  color: #FFFFFF;
}
.button{
  margin: 58px auto 0;
  width: 324px;
  height: 76px;
  font-size: 32px;
  background: linear-gradient(0deg, #F38237, #F8DD90);
  border-radius: 38px;
  border: 2px solid #FFFFFF;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>
