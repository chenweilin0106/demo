<template>
  <PopupBox title="title_17.png" @clickClose="clickClose">
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
    <PublicButton has-right="1" class="button" @click="confirm">立即兑换</PublicButton>
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
.list {
  $listWidth: 100%; /*列表宽度*/
  $itemIconSize: 128px; /*图标大小*/
  $colNum: 3; /*列数*/
  $gapNum: calc($colNum * 2 + 2); /*间隔数*/
  $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
  $textHeight: 2 * 14 + 21px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
  $itemWidth: calc($itemIconSize + 2 * $gap); /*每个item的宽度*/
  //$listPadding: 15px $gap calc(15px - ($textHeight - 25px - 15px)) $gap; /*顶部：距离顶部的距离 底部间距：顶部间距-(顶部间距-文字高度-文字距离图标距离)*/
  $listPadding: 70px $gap 0; // 距离顶部的距离确保label展示完整
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
    $radius: 20px; /*圆角*/
    $borderColor: #CEC3FF;
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
  color: #FFFA76;
}
.p2{
  margin-top: 26px;
  font-size: 28px;
  color: #3A74DF;
  text-decoration: underline;
}
.button {
  margin: 7px auto 0;
  width: 326px;
  height: 78px;
  font-size: 32px !important;
}
</style>
