<template>
  <PopupBox title="title_27.png" @clickClose="clickClose">
    <van-swipe class="my-swipe" :autoplay="2000" lazy-render>
      <van-swipe-item v-for="(item,index) in config" :key="index" class="flex-column align-center">
        <div class="icon">
          <img v-lazy="IconPath(item.icon)" class="w-100 h-100" />
          <div class="label position-absolute" :class="`status${item.quality}`"></div>
        </div>
        <div class="text line-height-1 flex justify-center align-center">
          <div class="clothTextLabel" :class="`status${item.quality}`"></div>
          {{item.text}}
        </div>
      </van-swipe-item>
    </van-swipe>
  </PopupBox>
</template>

<script>
export default {
  name: 'previewPopup',
  props: ['config'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.my-swipe{
  width: 585px;
  margin: 10px auto 0;
  height: 615px + 75px;
}
.icon{
  position: relative;
  width: 484px;
  height: 615px;
  .label{
    width: 158px;
    height: 94px;
    left: 10px;
    top: 18px;
    &.status3{
      background: url('@/pages/qixi/assets/clothLabel_3.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/qixi/assets/clothLabel_2.png') no-repeat left top/100% 100%;
    }
  }
}
.text{
  margin-top: 11px;
  font-size: 28px;
  color: #FFFFFF; // todo
  .clothTextLabel{
    width: 66px;
    height: 34px;
    margin-right: 5px;
    &.status1{
      background: url('@/pages/qixi/assets/clothTextLabel_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/qixi/assets/clothTextLabel_2.png') no-repeat left top/100% 100%;
    }
    &.status3{
      background: url('@/pages/qixi/assets/clothTextLabel_3.png') no-repeat left top/100% 100%;
    }
    &.status4{
      background: url('@/pages/qixi/assets/clothTextLabel_4.png') no-repeat left top/100% 100%;
    }
    &.status5{
      background: url('@/pages/qixi/assets/clothTextLabel_5.png') no-repeat left top/100% 100%;
    }
  }
}
::v-deep .van-swipe__indicators{
  bottom: 0;
  .van-swipe__indicator{
    width: 12px;
    height: 12px;
    background: #4896B6; // todo
    opacity: 1;
    &:not(:last-child){
      margin-right: 24px;
    }
  }
  .van-swipe__indicator--active{
    background: #fff;
  }
}
</style>
