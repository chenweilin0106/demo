<template>
  <PopupBox title="title_39.png" @clickClose="clickClose">
    <van-swipe class="my-swipe" :autoplay="2000" lazy-render>
      <van-swipe-item v-for="(item,index) in config" :key="index" class="flex-column align-center">
        <div class="icon">
          <img v-lazy="IconPath(item.icon)" class="w-100 h-100" />
          <img v-if="item.qualityIcon" :src="IconPath(item.qualityIcon)" class="label position-absolute" />
        </div>
        <div class="text line-height-1 flex justify-center">{{item.text}}</div>
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
  width: 565px;
  margin-left: 24px;
  padding-bottom: 35px;
}
.icon{
  position: relative;
  width: 484px;
  height: 615px;
  .label{
    width: auto;
    height: 84px;
    left: 9px;
    top: 12px;
  }
}
.text{
  margin-top: 13px;
  font-size: 28px;
  color: #FFFFFF;
}
::v-deep .van-swipe__indicators{
  bottom: 0;
  .van-swipe__indicator{
    width: 12px;
    height: 12px;
    background: #F49A6E;
  }
  .van-swipe__indicator--active{
    background: #fff;
  }
}
</style>
