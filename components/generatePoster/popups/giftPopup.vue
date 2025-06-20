<template>
  <PopupBox title="title_13.png" :isSon="config.isSon" @clickClose="clickClose">
    <div class="users flex justify-center">
      <div v-for="(user,index) in config.pair_info" :key="index" class="user flex justify-center align-center position-relative">
        <img class="radius-50 fit-cover block avatar" :src="user.profile_image" @error="imgAtError" @click="toUserMain(item.id)" />
        <div class="username text-center line-height-1 ellipsis position-absolute position-row-center">{{user.username}}</div>
      </div>
    </div>
    <p class="desc text-center">恭喜你们成为<i class="blue">【{{friendTypeMap[config.special_info.type]}}】</i><i class="yellow">{{config.special_info.day}}天</i><br>蛋蛋为你们送上了专属祝福礼<br>请点击领取查收~</p>
    <div class="award flex-column align-center height-fit margin-row-center">
      <div class="icon position-relative" >
        <PublicImg imgName="lmz_120_120.png" />
      </div>
      <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">浪漫值+999</div>
    </div>
    <p class="tip flex justify-center line-height-1 text-indent-right">*可增加【浪漫榜单】的榜单值，助力冲榜！</p>
    <PublicButton class="button margin-row-center" hasRight="1" @click="receive">立即领取</PublicButton>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  props: ['config'],
  data() {
    return {
      friendTypeMap: Object.freeze({ 1: 'CP', 2: '密友' })
    }
  },
  methods: {
    toUserMain,
    imgAtError,
    async receive() {
      const res = await getPageData({ type: 'lovename_rev_special' })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update')
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.users{
  width: 100%;
  height: 200px;
  .user{
    width: 215px;
    height: 177px;
    background: url('@/pages/valentineDay/assets/tk_13.png') no-repeat left top/100% 100%;
    &:first-child{
      margin-right: 13px;
    }
    .avatar{
      width: 128px;
      height: 128px;
      background: #FFFFFF;
      border: 4px solid #fff;
    }
    .username{
      padding: 27px 20px 0;
      bottom: -52px;
      width: 212px;
      height: 74px;
      font-weight: 500;
      font-size: 25px;
      color: #E8599D;
      background: url('@/pages/valentineDay/assets/tk_14.png') no-repeat left top/100% 100%;
    }
  }
}
.desc{
  margin-top: 66px;
  margin-bottom: 23px;
  font-size: 28px;
  color: #FFFFFF;
  line-height: 38px;
  .blue{
    color: #64FBFD;
  }
  .yellow{
    color: #FFF089;
  }
}
.award{
  $borderWidth: 4px; /*边框粗细*/
  $size: 120px; /*尺寸*/
  $radius: 12px; /*圆角*/
  $borderColor: #FFBCDC; /*边框颜色*/
  $bgc: #FEFAEF; /*图标背景色*/
  $fontSize: 28px; /*文本字体大小*/
  $color: #fff; /*文本字体颜色*/
  $textHeight: 14 * 2 + $fontSize; /*文本高度:2 * 文本距离奖励的高度 + 文本高度*/
  .icon{
    width: $size + 2 * $borderWidth;
    height: $size + 2 * $borderWidth;
    border-radius: $radius + $borderWidth;
    border: $borderWidth solid $borderColor;
    background:$bgc;
  }
  .text{
    width: $size + 2 * $borderWidth;
    height: $textHeight;
    font-size: $fontSize;
    color: $color;
  }
}
.tip{
  font-size: 26px;
  color: #E93F87;
  margin-bottom: 22px;
}
.button{
  width: 324px;
  height: 76px;
  font-size: 32px;
}
</style>
