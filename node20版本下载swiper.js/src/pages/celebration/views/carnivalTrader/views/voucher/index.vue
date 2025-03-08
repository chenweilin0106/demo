<template>
  <OutBox class="voucherCompo">
    <div class="signInArea">
      <div class="signItem" v-for="(item) in sign_list" :key="item.id">
        <div class="signItemPirice"><span>{{item.price}}</span><img :src="IconPath(propertyIcon[item.type])" /></div>
        <div class="signItemText">{{item.text}}</div>
        <div class="signItemEndTime">{{item.end_time}}到期</div>
        <div :class="['signItemReceive']" v-if="item.has_right==2"></div>
        <div :class="['signItemStatus',`status${item.has_right}`]">
          <div class="signItemNum">累计签到{{item.sign_num}}天</div>
        </div>
      </div>
      <div class="stepPress">
        <div class="pressShow" :style="`width: ${sign_day>0?(sign_day-1)/4*100:0}%;`"></div>
      </div>
    </div>
    <div :class="['signBtn', sign_status?'status1':sign_day==0?'status2':'status3']" @click="signNowCk">
      <div class="signHavenText" v-if="sign_day!=0">已签到{{sign_day}}天</div>
    </div>
    <div class="rebateArea">
      <div class="rebateItem" v-for="(item) in rebate_list" :key="item.id">
        <div class="rebateItemPirice"><span>{{item.price}}</span><i>%</i><p>钻石返利</p></div>
        <div class="rebateItemText" v-html="highlightKeywords(item.text)"></div>
        <div class="rebateItemEndTime">{{item.end_time}}到期</div>
        <div :class="['rebateBtn',`status${item.has_right}`]" @click="rebateBtnCk(item)"></div>
        <div class="rebateItemMark"></div>
      </div>
    </div>
    <div class="rules-text-border">
      <ul>
        <li><span></span>返利券用于购买【专属折扣】指定商品时返还一定</li>
        <li>数量的钻石，根据实付钻石和返利券额度计算，钻</li>
        <li>石自动返还至账户</li>
        <li><span></span>每张券只能使用一次，不可与代金券同时使用</li>
        <li>每类券可领5张，活动结束后失效，请及时使用</li>
      </ul>
    </div>
    <div class="dailyArea">
      <div class="dailyItem" v-for="(item) in day_list" :key="item.id">
        <div class="dailyItemPirice"><span>{{item.price}}</span><img :src="IconPath(propertyIcon[item.type])" /></div>
        <div class="dailyItemText">{{item.text}}</div>
        <div class="dailyItemEndTime">{{item.end_time}}到期</div>
        <div :class="['dailyBtn',`status${item.has_right}`]" @click="dailyBtnCk(item)"><span v-if="item.has_right==3">{{item.start_time}}可领</span></div>
        <div class="dailyItemReceiveEndTime">截止{{item.receive_end_time}}前可领</div>
      </div>
    </div>
    <div class="rules-text-border">
      <ul>
        <li><span></span>代金券用于购买【专属折扣】活动玩法的钻石礼包</li>
        <li>时抵扣一定数量的钻石</li>
        <li><span></span>每张代金券均有使用门槛和时限，使用时限结束后</li>
        <li>代金券将会失效，请及时使用</li>
      </ul>
    </div>
    <div class="myVoucherArea">
      <div class="myVoucherItem" v-for="(item) in voucher_list" :key="item.id">
        <template v-if="item.ticket_type == 1">
          <div class="myVoucherItemPirice"><span>{{item.price}}</span><img :src="IconPath(propertyIcon[item.type])" /></div>
          <div class="myVoucherItemText">{{item.text}}</div>
          <div class="myVoucherItemEndTime">{{item.end_time}}到期</div>
        </template>
        <template v-else-if="item.ticket_type == 2">
          <div class="myRebateItemPirice"><span>{{item.price}}</span><i>%</i><p>钻石返利</p></div>
          <div class="myRebateItemText" v-html="highlightKeywords(item.text)"></div>
          <div class="myRebateItemEndTime">{{item.end_time}}到期</div>
          <div class="myRebateItemMark"></div>
        </template>
        <div class="myVoucherItemLock" v-if="item.has_right==2||item.has_right==3"></div>
        <div :class="['myVoucherItemChapter', `status${item.has_right}`]"></div>
      </div>
      <div class="noMyVoucher" v-if="voucher_list.length==0">暂无代金券</div>
    </div>
    <ReceiveVoucherPopup v-if="isShowReceiveVoucherPopup" :config="configReceiveVoucherPopup" @viewExBtnCk="viewExBtnCk" @clickClose="clickClose"></ReceiveVoucherPopup>
  </OutBox>
</template>

<script>
import { getPageData } from '@/api/index.js'
import ReceiveVoucherPopup from './components/receiveVoucherPopup.vue'

export default {
  name: 'voucherV',
  props: [],
  components: {
    ReceiveVoucherPopup
  },
  data() {
    return {
      propertyIcon: {
        // points: 'mk5_6.png',
        gamegold: 'mk4_7.png',
        masonry: 'mk4_8.png'
      }, // 货币图标
      sign_list: [
        { id: 1, type: 'masonry', price: 300, need_price: 1500, text: '满1500钻可用', end_time: '06.18 23:59', has_right: 1, sign_num: 1 },
        { id: 2, type: 'masonry', price: 180, need_price: 800, text: '满800钻可用', end_time: '06.18 23:59', has_right: 1, sign_num: 3 },
        { id: 3, type: 'masonry', price: 50, need_price: 100, text: '满100钻可用', end_time: '06.18 23:59', has_right: 1, sign_num: 5 }
      ], // 每日签到奖励列表
      sign_day: 0, // 已签到天数
      sign_status: false, // 今天是否签到
      rebate_list: [
        { id: 1, type: 1, limit_num: 5, nums: 1, price: 10, need_price: 0, text: '仅钻石购买戒指时可用', end_time: '10.27 23:59', has_right: 1 },
        { id: 2, type: 1, limit_num: 5, nums: 1, price: 10, need_price: 0, text: '钻石购买藏宝图类型商品可用', end_time: '10.27 23:59', has_right: 1 }
      ], // 返利券列表
      day_list: [
        { id: 1, type: 'masonry', price: 30, need_price: 30, text: '满30钻可用', end_time: '10.27 12:59', receive_end_time: '13:00', start_time: '0:00', has_right: 1 }, // 0 已过期 1 可领取 2 已领取 3 未可领
        { id: 2, type: 'masonry', price: 90, need_price: 500, text: '满500钻可用', end_time: '10.27 23:59', receive_end_time: '23:59', start_time: '13:00', has_right: 1 }
      ], // 每日领取代金券列表
      voucher_list: [], // 我的代金券列表
      isShowReceiveVoucherPopup: false, // 恭喜获得代金券弹窗
      configReceiveVoucherPopup: []
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    viewExBtnCk(it) {
      this.$emit('viewExBtnCk', it)
    },
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'carnival_trader_voucher_home' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.sign_list = res.data.sign_list
          this.sign_day = Number(res.data.sign_day)
          this.sign_status = res.data.sign_status
          this.rebate_list = res.data.rebate_list
          this.day_list = res.data.day_list
          this.voucher_list = res.data.voucher_list
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveVoucherPopup = false
    },
    /**
     * 立即签到
     */
    signNowCk() {
      console.log('立即签到')
      if (!this.sign_status) {
        getPageData({ type: 'carnival_trader_voucher_sign' }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.getPageData()
            if (res.data.length > 0) {
              this.configReceiveVoucherPopup = { ...res, ticket_type: 1 }
              this.isShowReceiveVoucherPopup = true
            }
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 富文本文案替换
     */
    highlightKeywords(text) {
      // console.log(text)
      let charMap = {
        戒指: '<span style="color: #D76000;">戒指</span>',
        藏宝图: '<span style="color: #D76000;">藏宝图</span>'
      }
      let regex = new RegExp(Object.keys(charMap).join('|'), 'g')
      return text.replace(regex, match => charMap[match])
    },
    /**
     * 返利券领取
     */
    rebateBtnCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'carnival_trader_rev_rebate', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.getPageData()
            this.configReceiveVoucherPopup = { ...res, ticket_type: 2 }
            this.isShowReceiveVoucherPopup = true
          } else {
            this.$toast(res.errmsg)
            this.getPageData()
          }
        })
      }
    },
    /**
     * 领取每日时段代金券
     */
    dailyBtnCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'carnival_trader_voucher_receive', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.getPageData()
            this.configReceiveVoucherPopup = { ...res, ticket_type: 1 }
            this.isShowReceiveVoucherPopup = true
          } else {
            this.$toast(res.errmsg)
            this.getPageData()
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.voucherCompo{
  width: 718px;
  height: 2831px;
  background-image: none;
  border: none;
  border-radius: 0;
  background: url('@/pages/celebration/assets/mk4_14_1.png') no-repeat left top/100% 100%;
  // margin: 0 auto 0px auto;
  // padding: 110px 0 0 0;
  position: relative;
  .signInArea{
    height: 400px;
    margin: 0px auto 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
    .signItem{
      width: 177px;
      height: 253px;
      background: url('@/pages/celebration/assets/mk4_5_18.png') no-repeat left top/100% 100%;
      margin: 0 20px;
      position: relative;
      z-index: 2;
      .signItemPirice{
        font-weight: 800;
        font-size: 48px;
        color: #DB6200;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        top: 70px;
        span{
          vertical-align: middle;
        }
        img{
          width: 46px;
          height: 46px;
        }
      }
      .signItemText{
        font-weight: bold;
        font-size: 24px;
        color: #6F3C00;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 170px;
      }
      .signItemEndTime{
        background: #E19E18;
        border-radius: 15px;
        padding: 4px 10px;
        font-weight: bold;
        font-size: 18px;
        color: #FFF6BD;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 200px;
      }
      .signItemReceive{
        width: 175px;
        height: 250px;
        background: url('@/pages/celebration/assets/mk4_5_18_1.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 1px;
        top: 1px;
      }
      .signItemStatus{
        width: 43px;
        height: 43px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -80px;
        &.status1{
          background: url('@/pages/celebration/assets/mk4_5_22.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk4_5_21.png') no-repeat left top/100% 100%;
        }
        .signItemNum{
          font-weight: 500;
          font-size: 24px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -40px;
        }
      }
    }
    .stepPress{
      width: 450px;
      height: 16px;
      background: #512D03;
      border-radius: 8px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 303px;
      z-index: 1;
      .pressShow{
        width: 450px;
        height: 16px;
        background: #FFBF2D;
        border-radius: 8px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .signBtn{
    width: 345px;
    height: 139px;
    margin: 0 auto 130px auto;
    position: relative;
    &.status1{
      background: url('@/pages/celebration/assets/mk4_5_25.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/celebration/assets/mk4_5_23.png') no-repeat left top/100% 100%;
    }
    &.status3{
      background: url('@/pages/celebration/assets/mk4_5_24.png') no-repeat left top/100% 100%;
    }
    .signHavenText{
      font-weight: bold;
      font-size: 22px;
      color: #FFF191;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 35px;
    }
  }
  .rebateArea{
    height: 400px;
    margin: 0px auto 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .rebateItem{
      width: 475px;
      height: 168px;
      background: url('@/pages/celebration/assets/mk4_5_19.png') no-repeat left top/100% 100%;
      margin: 0 0 30px 40px;
      position: relative;
      .rebateItemPirice{
        font-weight: 800;
        font-size: 52px;
        color: #DB6200;
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translate(-50%,-50%);
        i{
          font-size: 40px;
          font-weight: 600;
          color: #DB6200;
        }
        p{
          font-weight: bold;
          font-size: 26px;
          color: #DB6200;
        }
      }
      .rebateItemText{
        max-width: 220px;
        white-space: pre-wrap;
        font-weight: bold;
        font-size: 27px;
        color: #6F3C00;
        position: absolute;
        left: 220px;
        top: 70px;
        transform: translateY(-50%);
      }
      .rebateItemEndTime{
        background: #E19E18;
        border-radius: 15px;
        padding: 4px 15px;
        font-weight: bold;
        font-size: 22px;
        color: #FFF6BD;
        position: absolute;
        left: 220px;
        bottom: 20px;
      }
      .rebateBtn{
        width: 140px;
        height: 60px;
        border-radius: 30px;
        border: 3px solid #FFFFFF;
        font-weight: bold;
        font-size: 26px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        right: -170px;
        top: 50%;
        transform: translateY(-50%);
        &.status0{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          &::after{
            content: '已过期';
          }
        }
        &.status1{
          color: #A9792C;
          background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          &::after{
            content: '领取';
          }
        }
        &.status2{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          &::after{
            content: '已领取';
          }
        }
      }
      .rebateItemMark{
        width: 94px;
        height: 38px;
        background: url('@/pages/celebration/assets/mk4_16.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-20%,-50%);
      }
    }
  }
  .dailyArea{
    height: 400px;
    margin: 130px auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .dailyItem{
      width: 475px;
      height: 168px;
      background: url('@/pages/celebration/assets/mk4_5_19.png') no-repeat left top/100% 100%;
      margin: 0 0 30px 40px;
      position: relative;
      .dailyItemPirice{
        font-weight: 800;
        font-size: 55px;
        color: #DB6200;
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translate(-50%,-50%);
        span{
          vertical-align: middle;
        }
        img{
          width: 46px;
          height: 46px;
        }
      }
      .dailyItemText{
        font-weight: bold;
        font-size: 26px;
        color: #6F3C00;
        position: absolute;
        left: 220px;
        top: 50px;
      }
      .dailyItemEndTime{
        background: #E19E18;
        border-radius: 15px;
        padding: 4px 15px;
        font-weight: bold;
        font-size: 22px;
        color: #FFF6BD;
        position: absolute;
        left: 220px;
        bottom: 40px;
      }
      .dailyBtn{
        width: 140px;
        height: 60px;
        border-radius: 30px;
        border: 3px solid #FFFFFF;
        font-weight: bold;
        font-size: 26px;
        text-align: center;
        line-height: 60px;
        position: absolute;
        right: -170px;
        top: 50%;
        transform: translateY(-50%);
        &.status0{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          &::after{
            content: '已过期';
          }
        }
        &.status1{
          color: #A9792C;
          background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          &::after{
            content: '领取';
          }
        }
        &.status2{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          &::after{
            content: '已领取';
          }
        }
        &.status3{
          color: #A9792C;
          background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          opacity: 0.7;
        }
      }
      .dailyItemReceiveEndTime{
        font-weight: 400;
        font-size: 22px;
        color: #FFE761;
        position: absolute;
        right: -180px;
        bottom: 20px;
      }
    }
  }
  .myVoucherArea{
    height: 600px;
    margin: 120px auto 0 auto;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    .myVoucherItem{
      width: 617px;
      height: 149px;
      background: url('@/pages/celebration/assets/mk4_5_20.png') no-repeat left top/100% 100%;
      margin: 20px auto 30px auto;
      position: relative;
      .myVoucherItemPirice{
        font-weight: 800;
        font-size: 55px;
        color: #DB6200;
        position: absolute;
        left: 110px;
        top: 50%;
        transform: translate(-50%,-50%);
        span{
          vertical-align: middle;
        }
        img{
          width: 46px;
          height: 46px;
        }
      }
      .myVoucherItemText{
        font-weight: bold;
        font-size: 32px;
        color: #6F3C00;
        position: absolute;
        left: 260px;
        top: 30px;
      }
      .myVoucherItemEndTime{
        background: #E19E18;
        border-radius: 20px;
        padding: 5px 20px;
        font-weight: bold;
        font-size: 23px;
        color: #FFF6BD;
        position: absolute;
        left: 260px;
        bottom: 30px;
      }
      .myRebateItemPirice{
        font-weight: 800;
        font-size: 52px;
        color: #DB6200;
        position: absolute;
        left: 110px;
        top: 50%;
        transform: translate(-50%,-50%);
        i{
          font-size: 40px;
          font-weight: 600;
          color: #DB6200;
        }
        p{
          font-weight: bold;
          font-size: 26px;
          color: #DB6200;
        }
      }
      .myRebateItemText{
        // max-width: 220px;
        // white-space: pre-wrap;
        font-weight: bold;
        font-size: 30px;
        color: #6F3C00;
        position: absolute;
        left: 260px;
        top: 30px;
        // transform: translateY(-50%);
      }
      .myRebateItemEndTime{
        background: #E19E18;
        border-radius: 15px;
        padding: 4px 15px;
        font-weight: bold;
        font-size: 22px;
        color: #FFF6BD;
        position: absolute;
        left: 260px;
        bottom: 30px;
      }
      .myRebateItemMark{
        width: 94px;
        height: 38px;
        background: url('@/pages/celebration/assets/mk4_16.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-20%,-50%);
        z-index: 2;
      }
      .myVoucherItemLock{
        width: 617px;
        height: 149px;
        background: url('@/pages/celebration/assets/mk4_5_20_1.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .myVoucherItemChapter{
        width: 142px;
        height: 141px;
        position: absolute;
        right: -35px;
        top: 50%;
        transform: translateY(-50%);
        &.status2{
          background: url('@/pages/celebration/assets/mk4_5_33.png') no-repeat left top/100% 100%;
        }
        &.status3{
          background: url('@/pages/celebration/assets/mk4_5_32.png') no-repeat left top/100% 100%;
        }
      }
    }
    .noMyVoucher{
      width: 100%;
      height: 600px;
      font-weight: bold;
      font-size: 26px;
      color: #FFE270;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
