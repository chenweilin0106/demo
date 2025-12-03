<template>
  <PopupBox :title="popupTitleIcon" @clickClose="clickClose">
    <div class="list">
      <div v-for="(item,index) in config" :key="index" class="award flex-column align-center">
        <div class="icon position-relative">
          <div v-if="item.type == 'car'" class="firstLabel">首赠</div>
          <img v-else-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel" />
          <PublicImg :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{item.text}}</div>
      </div>
    </div>
    <div class="button" @click="clickClose">开心收下</div>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {}
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.config.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_9.png' : 'title_8.png'
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.list {
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
    .icon{
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
    }
  }
}
.multipleLabel {
  position: absolute;
  z-index: 2;
  top: 1px;
  right: 1px;
  width: auto;
  height: 34px;
}
.firstLabel {
  position: absolute;
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
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.button {
  margin: 25px auto 0;
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
