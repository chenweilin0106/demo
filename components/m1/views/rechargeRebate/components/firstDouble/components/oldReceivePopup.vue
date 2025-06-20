<template>
  <PopupBox :title="popupTitleIcon" @clickClose="clickClose">
    <slot name="listTop"></slot>
    <div class="list">
      <div v-for="(item,index) in config" :key="index" class="award flex-column align-center">
        <div class="icon position-relative">
          <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel position-absolute" :class="item.type == 'car' && 'firstLabel'" />
          <PublicImg :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{item.text}}</div>
      </div>
    </div>
    <slot name="listBottom"></slot>
    <PublicButton has-right="1" class="button" @click="clickClose">我知道了</PublicButton>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      // config: [
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 10, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'X10.png' },
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20' },
        // { type: 'car', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'tk_13.png' }
      // ],
    }
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.config.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_15.png' : 'title_14.png'
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
  $itemIconSize: 128px; /*图标大小*/
  $colNum: 3; /*列数*/
  $gapNum: calc($colNum * 2 + 2); /*间隔数*/
  $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
  $textHeight: 2 * 20 + 28px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
  $itemWidth: calc($itemIconSize + 2 * $gap); /*每个item的宽度*/
   //$listPadding: 15px $gap calc(15px - ($textHeight - 25px - 15px)) $gap; /*顶部：距离顶部的距离 底部间距：顶部间距-(顶部间距-文字高度-文字距离图标距离)*/
  $listPadding: 15px $gap 0; // 距离顶部的距离确保label展示完整
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
    $borderWidth: 2px; /*边框粗细*/
    $radius: 12px; /*圆角*/
    $borderColor: #AC6636;
    $bgc: linear-gradient(0deg, #FEFAEF, #FEFAEF);
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
.multipleLabel {
  z-index: 1;
  top: 0;
  right: 0;
  width: auto;
  height: 34px;
}
.firstLabel {
  top: -2px;
  right: -2px;
}
.button {
  margin: 25px auto 0;
  width: 320px;
  height: 72px;
  font-size: 32px;
}
</style>
