<template>
  <div class="sparBack">
    <OutBox class="sparBackBox">
      <div class="card1 flex-column align-center justify-center line-height-1 margin-row-center">
        <div class="div1 flex align-center justify-between">
          <div class="left">累计获得积分：</div>
          <div class="right">{{ point_accumulated }}</div>
        </div>
        <div class="consumeListDiv">
          <div class="consumeDiv flex align-center" v-for="(item, index) in spend_list" :key="index">
            <span class="flex align-center">
              每消耗{{ item.target }}个<img :src="IconPath(item.icon_s)" alt="" />：
              <i class="light">积分+1</i>
            </span>
            <span class="flex align-center justify-end">已消耗：{{ textLengthLimit(item.current, 8) }}</span>
          </div>
        </div>
      </div>
      <!-- 可用积分 -->
      <div class="div2 flex align-center justify-between line-height-1 margin-row-center">
        <div class="left">可用积分：</div>
        <div class="right">{{ spar_point }}</div>
      </div>
      <!-- 兑换 -->
      <div class="div3 flex margin-row-center align-center justify-between">
        <div class="exchangeItem" v-for="(item,index) in exchange_list" :key="index" >
          <p class="p1">消耗<span>{{ item.price }}个积分</span>兑换</p>
          <div class="award flex-column">
            <div class="icon flex align-center justify-center position-relative">
              <div class="label position-absolute pointer-none"></div>
              <img :src="IconPath(item.icon)" alt="" />
            </div>
            <div class="text">{{ item.name }}+{{ item.nums }}</div>
          </div>
          <p class="p2">每日限兑：{{ item.current }}/{{ item.max }}</p>
          <div class="exchangeBtn" :class="`status${item.current == 50 ? 2 : 1}`" @click="openPopup(item)">{{ item.current == 50 ? '已兑完' : '兑换' }}</div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="rules-text">
        <ul>
          <li><span></span>消耗晶石获得的积分可用于<i>兑换绿晶石和紫晶石</i></li>
          <li><span></span>活动期间绿晶石和紫晶石<i>每日各限兑50次</i></li>
          <li><span></span>积分由系统<i>自动派发</i>，无需手动领取</li>
        </ul>
      </div>
    </OutBox>
    <ExchangePopup v-if="isShowExchangePopup" :config="configExchangePopup" :coinsNum="spar_point" @update="updateData" @clickClose="isShowExchangePopup = false" />
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { textLengthLimit } from '@/utils/tool'
import ExchangePopup from './popups/exchangePopup'

export default {
  name: 'sparBack',
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
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    openPopup(param) {
      if (param.current == 50) return console.log('已兑完')
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
      Object.assign(this, param)
    },
    textLengthLimit
  }
}
</script>

<style scoped lang="scss">
.sparBack {
  .outBox.sparBackBox {
    padding-top: 47px !important;
    .card1{
      .div1{
        width: 660px;
        height: 60px;
        background: #EA7967;
        border-radius: 30px;
        padding: 0 22px;
        margin-bottom: 19px;
        .left {
          font-size: 24px;
          color: #FFFFFF;
        }
        .right {
          font-size: 24px;
          color: #FEFAB0;
        }
      }
      .consumeListDiv {
        width: 656px;
        height: 186px;
        background: url('@/pages/mayDay/assets/mk5_1.png') no-repeat left top/100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .consumeDiv{
          margin: 6px 0;
          font-size: 24px;
          justify-content: space-between;
          color: #fff;
          overflow: hidden;
          width: 600px;
          height: 60px;
          background: #E5715D;
          border-radius: 8px;
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
              border-image-source: url('@/pages/mayDay/assets/mk5_2.png');
              border-image-slice: 0 20 0 35 fill;
              border-image-width: 0 20px 0 35px;
            }
          }
          img{
            width: 50px;
            height: 50px;
          }
          .light{
            color: #FEFAB0;
          }
        }
      }
    }
    .div2{
      padding: 0 20px;
      margin-top: 24px;
      width: 660px;
      height: 60px;
      background: #EA7967;
      border-radius: 8px 8px 0 0;
      .left {
        font-size: 24px;
        color: #FFFFFF;
      }
      .right {
        font-size: 24px;
        color: #FEFAB0;
      }
    }
    .div3{
      margin-top: 14px;
      margin-bottom: 18px;
      width: 100%;
      height: 354px;
      //background: url('@/pages/motherDay/assets/mk5_3.png') no-repeat left top/100% 100%;
      padding: 0 50px;
      .exchangeItem{
        display: flex;
        align-items: center;
        width: 300px;
        height: 354px;
        font-size: 28px;
        color: #fff;
        flex-direction: column;
        background: url('@/pages/mayDay/assets/mk5_3.png') no-repeat left top/100% 100%;
        padding-top: 30px;
        line-height: 1;
        .p1 {
          color: #FFFFFF;
          font-size: 28px;
          span{
            color: #FEFAB0;
          }
          &:nth-child(3){
            font-size: 24px;
          }
        }
        .p2 {
          font-size: 24px;
          color: #FFFFFF;
        }
        .award{
          $borderWidth: 0px; /*边框粗细*/
          $width: 184px; /*尺寸*/
          $height: 145px; /*尺寸*/
          $radius: 0px; /*圆角*/
          $borderColor: #FFC7BB; /*边框颜色*/
          $iconBgc: #FFEDE8; /*图标背景色*/
          //$textBgc: linear-gradient(90deg, #F88F8E, #FFC05A); /*文本背景色*/
          $iconHeight: 77px; /*图标高度*/
          $fontSize: 24px; /*文本字体大小*/
          $color: #ffffff; /*文本字体颜色*/
          width: $width + $borderWidth * 2; /*宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
          height: $height + $borderWidth * 2; /*高度 蓝湖上选区不包括边框 所以加上边框宽度*/
          //background-color: $borderColor; /*边框颜色*/
          background: url('@/pages/mayDay/assets/mk5_4.png') no-repeat left top/100% 100%;
          //border-radius: $radius + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
          padding: 16px;
          margin: 23px 0 11px;
          .icon{
            height: $iconHeight;
            //background: $iconBgc;
            //border-radius: $radius $radius 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
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
              //background: url('@/pages/motherDay/assets/mk5_4.png') no-repeat left top/100% 100%;
            }
          }
          .text{
            color: $color;
            font-size: $fontSize;
            //background: $textBgc;
            //border-radius: 0 0 $radius $radius;
            width: 154px;
            height: 36px;
            background: linear-gradient(90deg, #FA7667, #FFC17A);
            margin: 0 auto;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .exchangeBtn{
          margin-top: 14px;
          width: 146px;
          height: 54px;
          font-size: 28px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          white-space: nowrap;
          border: 3px solid transparent;
          border-radius: 99999px;
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          &.status1{
            color: #ED7030;
            background-image: linear-gradient(0deg, #FDF2C1, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
          }
          &.status2{
            background-image: linear-gradient(0deg, #9D9D9D, #E7E7E7), -webkit-linear-gradient(#fff, #fff);
          }
        }
      }
    }
  }
}
</style>
