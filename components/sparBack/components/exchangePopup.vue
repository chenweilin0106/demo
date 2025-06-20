<template>
  <OutBox class="SparBack" size="5_1">
    <PublicCard size="4" class="card1 flex-column align-center justify-center line-height-1 margin-row-center">
      <div class="div1 flex align-center justify-between">
        <div class="left">累计获得积分：</div>
        <div class="right">{{point_accumulated}}</div>
      </div>
      <div class="consumeDiv flex align-center" v-for="(item,index) in spend_list" :key="index" >
        <span class="flex align-center">
          每消耗{{item.target}}个<img :src="IconPath(item.icon_s)" />：
          <i class="light">积分+1</i>
        </span>
        <span class="flex align-center justify-end">已消耗：{{textLengthLimit(item.current,8)}}</span>
      </div>
    </PublicCard>
    <!-- 可用积分 -->
    <div class="div2 flex align-center justify-between line-height-1 margin-row-center">
      <div class="left">可用积分：</div>
      <div class="right">{{spar_point}}</div>
    </div>
    <!-- 兑换 -->
    <div class="div3 flex margin-row-center align-center justify-between">
      <div class="exchangeItem" v-for="(item,index) in exchange_list" :key="index" >
        <p>消耗<span>{{item.price}}个积分</span>兑换</p>
        <div class="award flex-column">
          <div class="icon flex align-center justify-center position-relative">
            <div class="label position-absolute pointer-none"></div>
            <img :src="IconPath(item.icon)" />
          </div>
          <div class="text flex-1 flex align-center justify-center line-height-1">{{item.name}}+{{item.nums}}</div>
        </div>
        <p>每日限兑：{{item.current}}/{{item.max}}</p>
        <PublicButton class="exchangeBtn" :disabled="[2]" :hasRight="item.current==50?2:0" @click="openPopup(item)">{{item.current==50?'已兑完':'兑换'}}</PublicButton>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="rules-text">
      <ul>
        <li><span></span>消耗晶石获得的积分可用于兑换绿晶石和紫晶石</li>
        <li><span></span>活动期间绿晶石和紫晶石每日各限兑50次</li>
        <li><span></span>积分由系统自动派发，无需手动领取</li>
      </ul>
    </div>
    <ExchangePopup v-if="isShowExchangePopup" :config="configExchangePopup" :coinsNum="spar_point" @update="updateData" @clickClose="isShowExchangePopup = false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import { textLengthLimit } from '@/utils/tool'
import ExchangePopup from './components/exchangePopup'

export default {
  name: 'SparBack',
  components: { ExchangePopup },
  data() {
    return {
      spend_list: [
        { id: 2, name: '绿晶石', icon_s: 'ljs_60_60.png', current: 0, target: 100 },
        { id: 1, name: '紫晶石', icon_s: 'zjs_60_60.png', current: 0, target: 25 }
      ], // 消费列表
      point_accumulated: 0, // 累计获得积分
      spar_point: 0, // 可用积分
      exchange_list: [
        { id: 2, name: '绿晶石', price: 10, current: 0, max: 50, icon: 'ljs_120_120.png', nums: 110 },
        { id: 1, name: '紫晶石', price: 10, current: 0, max: 50, icon: 'zjs_120_120.png', nums: 11 }
      ], // 兑换列表
      configExchangePopup: { pointName: '积分', id: '' }, // 兑换好礼弹框数据
      isShowExchangePopup: false
    }
  },
  created() {
    this.getHomePage()
  },
  methods: {
    async getHomePage() {
      const res = await getPageData({ type: 'tab', mark: 'm5' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    openPopup(param) {
      if (param.price > this.spar_point) return this.$toast('积分不足')
      this.configExchangePopup = {
        exchange_times: param.current,
        max_times: param.max,
        price: param.price,
        icon: param.icon,
        text: `+${param.nums}`,
        id: param.id
      }
      this.isShowExchangePopup = true
    },
    updateData(param) {
      this.spar_point = param.spar_point
      this.exchange_list = param.exchange_list
    },
    textLengthLimit
  }
}
</script>

<style scoped lang="scss">
.SparBack {
  .card1{
    .div1{
      width: 600px;
      font-size: 24px;
      color: #986408;
    }
    .consumeDiv{
      margin-top: 12px;
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: #F88F8E;
      border-radius: 8px;
      // font-size: 24px;
      span{
        height: 100%;
        &:nth-child(1){
          padding-left: 20px;
        }
        &:nth-child(2){
          padding-right: 20px;
          padding-left: 40px;
          min-width: 200px;
          width: fit-content;
          height: 60px;
          border-image-source: url('@/pages/motherDay/assets/mk5_1.png');
          border-image-slice: 0 20 0 35 fill;
          border-image-width: 0 20px 0 35px;
        }
      }
      img{
        width: 50px;
        height: 50px;
      }
      .light{
        color: #FFFAA6;
      }
    }
  }
  .div2{
    width: 660px;
    height: 60px;
    background: #FFE09D;
    border-radius: 30px;
    font-size: 24px;
    color: #986408;
    padding: 0 20px;
    margin-top: 21px;
  }
  .div3{
    margin-top: 23px;
    margin-bottom: 40px;
    width: 750px;
    height: 408px;
    background: url('@/pages/motherDay/assets/mk5_3.png') no-repeat left top/100% 100%;
    padding: 0 60px;
    .exchangeItem{
      display: flex;
      align-items: center;
      width: 320px;
      height: 360px;
      font-size: 28px;
      color: #fff;
      flex-direction: column;
      // background: url('@/pages/sparParty/assets/mk4_2.png') no-repeat left
        // top/100% 100%;
      padding-top: 22px;
      p{
        color: #986408;
        font-size: 28px;
        span{
          color: #FF6642;
        }
        &:nth-child(3){
          font-size: 24px;
        }
      }
      .award{
        $borderWidth: 4px; /*边框粗细*/
        $width: 180px; /*尺寸*/
        $height: 120px; /*尺寸*/
        $radius: 12px; /*圆角*/
        $borderColor: #FFC7BB; /*边框颜色*/
        $iconBgc: #FFEDE8; /*图标背景色*/
        $textBgc: linear-gradient(90deg, #F88F8E, #FFC05A); /*文本背景色*/
        $iconHeight: 84px; /*图标高度*/
        $fontSize: 24px; /*文本字体大小*/
        $color: #ffffff; /*文本字体颜色*/
        width: $width + $borderWidth * 2; /*宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
        height: $height + $borderWidth * 2; /*高度 蓝湖上选区不包括边框 所以加上边框宽度*/
        background-color: $borderColor; /*边框颜色*/
        border-radius: $radius + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
        padding: $borderWidth;
        margin: 31px 0 18px;
        .icon{
          height: $iconHeight;
          background: $iconBgc;
          border-radius: $radius $radius 0 0;
          img{
            width: auto;
            height: 100%;
          }
          .label{
            top: 0;
            right: -23px;
            transform: translateY(-50%);
            z-index: 2;
            width: 110px;
            height: 33px;
            background: url('@/pages/motherDay/assets/mk5_4.png') no-repeat left top/100% 100%;
          }
        }
        .text{
          color: $color;
          font-size: $fontSize;
          background: $textBgc;
          border-radius: 0 0 $radius $radius;
        }
      }
      .exchangeBtn{
        margin-top: 14px;
      }
    }
  }
}
</style>
