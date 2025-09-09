<template>
  <PopupBox title="title_25.png" @clickClose="clickClose">
    <div class="list">
      <div v-for="(item,index) in config.list" :key="index" class="award flex-column align-center">
        <div class="icon position-relative">
          <!--<div v-if="popupTypeName[item.type]||popupTypeName[item.id]" class="typeLabel line-height-1 flex align-center justify-center radius-999 position-absolute">{{popupTypeName[item.type]||popupTypeName[item.id]}}</div>-->
          <PublicImg :imgName="item.icon" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">{{item.text}}</div>
      </div>
    </div>
    <p class="p1 flex align-center justify-center line-height-1 text-indent-right">花费现金：{{config.price}}元</p>
    <div class="button" @click="confirm">立即兑换</div>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {}
  },
  methods: {
    confirm() {
      this.$nextTick(() => this.$emit('confirm'))
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  .main {
    margin-top: 108px;
    margin-bottom: 57px;
  }
}
.list {
  $listWidth: 100%; /*列表宽度*/
  $itemIconSize: 128px; /*图标大小*/
  $colNum: 2; /*列数*/
  $gapNum: calc($colNum * 2 + 2); /*间隔数*/
  $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
  $textHeight: 2 * 21 + 21px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
  $itemWidth: calc($itemIconSize + 2 * $gap); /*每个item的宽度*/
  //$listPadding: 15px $gap calc(15px - ($textHeight - 25px - 15px)) $gap; /*顶部：距离顶部的距离 底部间距：顶部间距-(顶部间距-文字高度-文字距离图标距离)*/
  $listPadding: 60px $gap 0; // 距离顶部的距离确保label展示完整
  width: $listWidth;
  height: fit-content;
  min-height: calc($itemIconSize + $textHeight); /*最小展示一行： 图标高度 + 文字高度*/
  max-height: calc(($itemIconSize + $textHeight) * 3 + (($itemIconSize + $textHeight) / 6)); /*最多展示三行： 图标高度 + 文字高度 +  1/6（图标高度 + 文字高度）*/
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: start;
  padding: $listPadding;
  margin: 0 auto;
  .award {
    $borderWidth: 4px; /*边框粗细*/
    $radius: 12px; /*圆角*/
    $borderColor: #FBE0A7;
    $bgc: linear-gradient(0deg, #fff, #fff);
    $fontSize: 28px; /*文本字体大小*/
    $color: #fff;
    width: $itemWidth;
    .icon {
      width: $itemIconSize;
      height: $itemIconSize;
      border-radius: $radius + $borderWidth;
      border: $borderWidth solid $borderColor;
      background:$bgc;
    }
    .text {
      width: $itemIconSize;
      height: $textHeight;
      font-size: $fontSize;
      color: $color;
    }
  }
}
.typeLabel {
  z-index: 1;
  transform: translateY(-50%);
  top: 0;
  right: -8px; /*角标距离右边距离*/
  padding: 0 8px;
  height: 28px;
  background: #A27EFF; /*角标背景色*/
  font-weight: 500;
  font-size: 18px; /*角标字体大小*/
  color: #FFFFFF; /*角标字体颜色*/
}
.p1{
  margin-top: 30px;
  font-size: 26px;
  color: #279ADB; // todo
}
.button {
  margin: 7px auto 0;
  $width: 320px;
  $height: 72px;
  $border: 3px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  font-size: 32px;
  font-weight: normal;
  width: $width + $border;
  height: $height + $border;
  // 渐变
  border: $border solid transparent;
  border-radius: 99999px;
  -webkit-background-clip: padding-box, border-box;
  -webkit-background-origin: padding-box, border-box;
  color: #a9792c;
  background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
}
</style>
