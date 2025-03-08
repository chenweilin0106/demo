<template>
  <div class="compo">
    <OutBox class="sparBackBox">
      <div class="pointsDiv">
        <div>累计获得积分:</div>
        <div class="pointsText">{{point_accumulated}}</div>
      </div>
      <div class="instructionDiv">
        <div class="instructionItem" v-for="(item) in spend_list" :key="item.id">
          <div>每消耗{{item.target}}个<img :src="IconPath(item.icon_s)" />:&ensp;<i>积分+1</i></div>
          <div class="rightUseDiv">已消耗:&ensp;{{item.current}}</div>
        </div>
      </div>
      <div class="pointsDiv">
        <div>可用积分:</div>
        <div class="pointsText">{{spar_point}}</div>
      </div>
      <div class="exchangeDiv">
        <div class="exchangeItem" v-for="(item) in exchange_list" :key="item.id">
          <div class="exPrice">消耗<i>{{item.price}}个积分</i>兑换</div>
          <div class="exIcon">
            <div class="eIcon">
              <PublicImg :imgName="item.icon"></PublicImg>
            </div>
            <div class="eText">{{item.name}}+{{item.nums}}</div>
          </div>
          <div class="exLimited">每日限兑:{{item.current}}/{{item.max}}</div>
          <div :class="['exBtn', item.current<item.max?null: 'noLeft']" @click="exBtnCk(item)">{{item.current < item.max?'兑换': '已兑完'}}</div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>消耗晶石获得的积分可用于<i>兑换绿晶石和紫晶石</i></li>
          <li><span></span>活动期间绿晶石和紫晶石<i>每日各限兑50次</i></li>
          <li><span></span>积分由系统<i>自动派发</i>，无需手动领取</li>
        </ul>
      </div>
    </OutBox>
    <ExchangePopup v-if="isShowExchangePopup" :pointIcon="''" :pointName="'积分'" :my_goods="spar_point" :config="configExchangePopup" @getPageData="getPageData" @clickClose="clickClose"></ExchangePopup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/dragonBoat/api/index'
import ExchangePopup from './components/exchangePopup.vue'

export default {
  name: 'sparBack',
  components: {
    ExchangePopup
  },
  data() {
    return {
      point_accumulated: 0, // 累计积分
      spar_point: 0, // 可用积分
      spend_list: [
        { id: 1, name: '绿晶石', icon_s: 'ljs_120_120.png', target: 100, current: 0 },
        { id: 2, name: '紫晶石', icon_s: 'zjs_120_120.png', target: 25, current: 0 }
      ], // 消耗列表
      exchange_list: [
        { id: 1, name: '绿晶石', icon: 'ljs_120_120.png', nums: 100, price: 10, max: 50, current: 0 },
        { id: 2, name: '紫晶石', icon: 'zjs_120_120.png', nums: 10, price: 10, max: 50, current: 0 }
      ], // 兑换列表
      isShowExchangePopup: false, // 兑换弹窗
      configExchangePopup: {}
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.point_accumulated = res.data.point_accumulated
          this.spar_point = res.data.spar_point
          this.spend_list = res.data.spend_list
          this.exchange_list = res.data.exchange_list
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 兑换
     */
    exBtnCk(item) {
      console.log(item)
      if (this.spar_point < item.price && item.current < item.max) {
        this.$toast('积分不足')
      } else if (item.current < item.max) {
        let msg = {
          type: 'tool',
          ...item
        }
        this.configExchangePopup = msg
        this.isShowExchangePopup = true
      }
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowExchangePopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  color: #FFFFFF;
  .sparBackBox{
    margin: -80px auto 0 auto;
    padding: 60px 12px 40px 12px;
    .pointsDiv{
      width: 660px;
      height: 60px;
      background: #358E94;
      border-radius: 8px 8px 0px 0px;
      margin: 0 auto 10px auto;
      padding: 0 0 0 20px;
      font-weight: 400;
      font-size: 24px;
      line-height: 60px;
      position: relative;
      .pointsText{
        color: #FFF77B;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .instructionDiv{
      width: 660px;
      background: linear-gradient(-90deg, #F8DC7C, #5DB8BE);
      border-radius: 8px;
      border: 4px solid #F3DE8A;
      margin: 0 auto 30px auto;
      padding: 30px 0 20px 0;
      .instructionItem{
        width: 600px;
        height: 60px;
        background: #358E94;
        border-radius: 8px;
        font-weight: 400;
        font-size: 24px;
        line-height: 60px;
        margin: 0 auto 10px auto;
        padding: 0 0 0 20px;
        position: relative;
        img{
          width: 50px;
          height: 50px;
          vertical-align: middle;
        }
        i{
          color: #FFF77B;
        }
        .rightUseDiv{
          width: 200px;
          height: 60px;
          background: url('@/pages/dragonBoat/assets/mk5_1.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 0;
          top: 0;
          padding: 0 20px 0 0;
          text-align: right;
        }
      }
    }
    .exchangeDiv{
      width: 660px;
      margin: 0 auto 30px auto;
      display: flex;
      justify-content: space-between;
      .exchangeItem{
        width: 320px;
        height: 360px;
        background: linear-gradient(0deg, #F8DC7C, #5DB8BE);
        border-radius: 12px;
        border: 4px solid #F3DE8A;
        text-align: center;
        .exPrice{
          font-weight: 400;
          font-size: 28px;
          margin: 20px 0 0 0;
          i{
            color: #FFF77B;
          }
        }
        .exIcon{
          width: 180px;
          height: 120px;
          background: #FFFFFF;
          border-radius: 12px;
          border: 4px solid #FBE590;
          margin: 20px auto 0 auto;
          position: relative;
          .eIcon{
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
          }
          .eText{
            width: 172px;
            height: 36px;
            background: #358E94;
            border-radius: 0 0 10px 10px;
            font-weight: 400;
            font-size: 24px;
            line-height: 36px;
            position: absolute;
            bottom: 0;
          }
        }
        .exLimited{
          font-size: 24px;
          margin: 20px auto 0 auto;
        }
        .exBtn{
          width: 160px;
          height: 60px;
          background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
          border-radius: 30px;
          border: 2px solid #FFFFFF;
          font-weight: 400;
          font-size: 28px;
          color: #A9792C;
          line-height: 60px;
          margin: 20px auto 0 auto;
          &.noLeft{
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            color: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>
