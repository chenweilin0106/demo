<template>
  <OutBox size="3_2" title="title_6.png" class="robRewards">
    <div class="titleBox margin-row-center position-relative flex justify-center align-center">
      <img :src="IconPath('mk3_4.png')" class="bubble position-absolute" />
      <div class="label position-absolute flex justify-center align-center line-height-1">永久称号</div>
      <PublicImg :imgName="config.award_list[0].icon" :imgType="config.award_list[0].type" />
    </div>
    <p class="tip flex justify-center line-height-1">属性：收到【{{showInfo[userInfo.gender].giftName}}】礼物魅力值上限提高5%</p>
    <div class="tip2 flex justify-center align-center line-height-1 margin-row-center">{{showInfo[userInfo.gender].gender}}性玩家完成以下任务可领取称号奖励</div>
    <PublicCard class="card flex align-center margin-row-center" size="5">
      <div class="award flex-column flex-shrink-0">
        <div class="icon flex align-center justify-center position-relative">
          <img :src="IconPath(showInfo[userInfo.gender].icon)" />
        </div>
      </div>
      <div class="desc flex-column justify-center h-100 overflow-hidden">
        <p class="flex align-center"><i class="flex align-center justify-center line-height-1">首发福利</i>累计充值达到{{config.recharge_max}}元<span class="text-indent-left ">（{{numberLimit(config.recharge_nums,config.recharge_max) }}/{{config.recharge_max}}）</span></p>
        <p class="text-wrap">且累计收到{{config.masonry_max}}个钻石礼物【{{showInfo[userInfo.gender].giftName}}】<span class="text-indent-left">（{{numberLimit(config.masonry_nums,config.masonry_max)}}/{{config.masonry_max}}）</span></p>
      </div>
    </PublicCard>
    <PublicButton class="cardBtn margin-row-center" :hasRight="config.award_list[0].has_right+3" :disabled="[0,2]" @click="receive">{{config.award_list[0].has_right==1?'领取':config.award_list[0].has_right==2?'已领取':'未完成'}}</PublicButton>
    <!--<div class="taskStatus margin-row-center flex-column justify-between">-->
    <!--  <p class="giftStatus">-->
    <!--    <img :src="IconPath('mk3_1.png')" />-->
    <!--    <span>活动期间累计收到{{ masonry_max }}钻石礼物<i class="speical_color">（{{ numberLimit(masonry_nums, masonry_max) }}/{{ masonry_max }}）</i></span>-->
    <!--  </p>-->
    <!--  <p class="rechargeStatus">-->
    <!--    <img :src="IconPath('mk3_1.png')" />-->
    <!--    <span>且累计充值满{{ recharge_max }}元<i class="speical_color">（{{ numberLimit(recharge_nums,recharge_max) }}/{{ recharge_max }}）</i></span>-->
    <!--  </p>-->
    <!--</div>-->
    <!--<div class="getTitle">-->
    <!--  <div class="title"><PublicImg :imgName="award_list[0].icon" :imgType="award_list[0].type" /></div>-->
    <!--  <img :src="IconPath(btnIconMap[award_list[0].has_right])" class="btn" @click="$emit('receiveRobRewards')" />-->
    <!--</div>-->
    <div class="rules-text">
      <ul>
        <li><span></span>自己赠送自己的钻石礼物不计算在内</li>
        <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
        <li>基础魅力值，魅力值上限提高50%</li>
      </ul>
    </div>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
  </OutBox>
</template>

<script>
import { mapState } from 'vuex'
import { numberLimit } from '@/utils/tool'
import { getPageData } from '@/api'
import ReceivePopup from './receivePopup.vue'

export default {
  name: 'robRewards',
  components: { ReceivePopup },
  props: ['config', 'masonry_nums', 'masonry_max', 'recharge_nums', 'recharge_max', 'award_list'],
  data() {
    return {
      showInfo: Object.freeze({
        0: { gender: '男', giftName: '大金链', icon: 'djl_120_120.png' },
        1: { gender: '女', giftName: '王冠', icon: 'wg_120_120.png' }
      }),
      isShowReceivePopup: false,
      configReceivePopup: [],
      btnIconMap: Object.freeze({ 0: 'mk3_5.png', 1: 'mk3_3.png', 2: 'mk3_4.png' })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 领取打劫有礼奖励
    async receive() {
      const res = await getPageData({ type: 'white_gift_receive', mark: this.award_list[0].key })
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = [res.data]
      this.isShowReceivePopup = true
      this.$emit('update')
    },
    numberLimit
  }
}
</script>

<style scoped lang="scss">
.robRewards {
  .titleBox{
    width: 404px;
    height: 165px;
    background: url('@/pages/womenDay/assets/mk3_5.png') no-repeat left top/100% 100%;
    .bubble {
      z-index: 1;
      width: 227px;
      height: 154px;
      top: -18px;
      left: -119px;
    }
    .imgCompo{
      width: 250px;
    }
    .label {
      z-index: 1;
      bottom: 2px;
      right: 2px;
      width: 130px;
      height: 36px;
      background: linear-gradient(-90deg, #A64F0F, #EC896A);
      border-radius: 18px 0px 16px 0px;
      font-size: 28px;
      color: #FFFFFF;
    }
  }
  .tip{
    margin: 31px 0;
    font-size: 28px;
    color: #FFFFFF;
  }
  .tip2{
    width: 660px;
    height: 40px;
    background: url('@/pages/womenDay/assets/mk3_23.png') no-repeat left top/100% 100%;
    font-size: 28px;
    color: #FFFFFF;
    margin-bottom: 19px;
  }
  .card{
    padding: 0 23px;
    .award{
      $borderWidth: 0px; /*边框粗细*/
      $radius: 6px; /*圆角*/
      $borderColor: #E9CE93; /*边框颜色*/
      $iconBgc: #fff; /*图标背景色*/
      $textBgc: #397DC3; /*文本背景色*/
      $iconHeight: 124px; /*图标高度*/
      $fontSize: 22px; /*文本字体大小*/
      $color: #ffffff; /*文本字体颜色*/
      width: 124px + $borderWidth * 2; /*宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
      height: 124px + $borderWidth * 2; /*高度 蓝湖上选区不包括边框 所以加上边框宽度*/
      //background-color: $borderColor; /*边框颜色*/
      //border-radius: $radius + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      //padding: $borderWidth;
      background: url('@/pages/womenDay/assets/mk3_7.png') no-repeat left top/100% 100%;
      .icon{
        height: $iconHeight;
        //background: $iconBgc;
        //border-radius: $radius $radius 0 0;
        >img{
          width: auto;
          height: 100%;
        }
      }
    }
    .desc{
      margin-left: 15px;
      flex: 1 1 auto;
      font-size: 28px;
      color: #692E19;
      line-height: 40px;
      i{
        width: 130px;
        height: 32px;
        font-size: 24px;
        color: #FEEB89;
        background: url('@/pages/womenDay/assets/mk3_24.png') no-repeat left top/100% 100%;
      }
      span{
        color: #F14B35;
      }
    }
  }
  .cardBtn{
    margin: 20px auto;
  }
  //.taskStatus {
  //  width: 660px;
  //  height: 120px;
  //  background: linear-gradient(90deg, #D65C32, #FFAF45); /*todo 任务背景色*/
  //  border-radius: 20px;
  //  padding: 25px 0 25px 22px;
  //  .giftStatus,
  //  .rechargeStatus {
  //    display: flex;
  //    align-items: center;
  //    justify-content: flex-start;
  //    font-size: 26px;
  //    font-weight: 500;
  //    color: #ffffff;
  //    white-space: nowrap;
  //    line-height: 100%;
  //    > img {
  //      margin-right: 12px;
  //      width: 25px;
  //      height: 25px;
  //    }
  //    i {
  //      font-size: 24px;
  //      color: #FFFAA6;
  //      line-height: 100%;
  //    }
  //  }
  //}
  //.getTitle {
  //  display: flex;
  //  margin-top: -5px;
  //  margin-left: 23px;
  //  margin-bottom: 9px;
  //  overflow: hidden;
  //  .title {
  //    width: 485px;
  //    height: 215px;
  //    //background: url('@/pages/midAutumn/assets/mk3_2.png') no-repeat center top/100% 100%;
  //    .imgCompo {
  //      margin-left: 166px;
  //      margin-top: 65px;
  //      width: 210px;
  //      height: 94px;
  //    }
  //  }
  //  .btn {
  //    margin-top: 41px;
  //    margin-left: 11px;
  //    width: 156px;
  //    height: 156px;
  //  }
  //}
}
</style>
