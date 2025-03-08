<template>
  <div class="childInterest">
    <OutBox class="dailyBox">
      <div class="dailyDesc">
        <div class="dailyTip1">免费领取六一礼物</div>
        <div class="dailyTip2">活动期间<i>每日限领1次</i></div>
      </div>
      <div :class="['dailyBtn', daily_gift_st==true?'haven':null]" @click="dailyBtnCk"></div>
    </OutBox>
    <OutBox class="treasureBox" :title="'title_5.png'">
      <div class="treasureTopTip">剩余开启次数:&ensp;{{lottery_nums}}</div>
      <div class="drawRulesBtn" @click="drawRulesBtnCk"></div>
      <div class="drawArea">
        <div class="openOneBtn" @click="drawBtnCk(1)">开1次</div>
        <div class="openTenBtn" @click="drawBtnCk(2)">开10次</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>每消费200钻石即可打开童趣宝箱1次并随机获得</li>
          <li>奖励</li>
          <li><span></span>开出的彩虹币可用于兑换限定奖励</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="exchangeBox" :title="'title_6.png'">
      <div class="exchangeTopTip">我的彩虹币<img :src="IconPath(pointIcon)" />:&ensp;{{bead_nums}}</div>
      <div class="exchangeArea1">
        <div class="item1Bg" v-for="(item) in convert_one" :key="item.goods_id">
          <div class="itemIcon">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div class="itemText">{{item.text}}</div>
          <div class="itemLimited">{{item.max_times==-1?'不限次数':`(${item.exchange_times}/${item.max_times})`}}</div>
          <div class="itemMark1">{{item.label}}</div>
          <div class="itemMark2" v-if="item.mark">{{item.mark}}</div>
          <div :class="['exBtn', item.exchange_times==item.max_times?'noEx':null]" @click="exBtnCk(item, 1)">
            <template v-if="item.exchange_times==item.max_times">
              <div>已兑完</div>
            </template>
            <template v-else>
              <div><img :src="IconPath(pointIcon)" />{{item.price}}</div>
              <div>兑换</div>
            </template>
          </div>
        </div>
      </div>
      <div class="exchangeArea2">
        <div class="exchangeArea2Tip">累计消耗{{unlockNeed}}个彩虹币解锁&ensp;<span>({{use_nums>=20?20:use_nums}}/{{unlockNeed}})</span></div>
        <div class="item2Bg" v-for="(item) in convert_two" :key="item.goods_id">
          <div class="itemIcon">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div class="itemText">{{item.text}}</div>
          <div class="itemLimited">{{item.max_times==-1?'不限次数':`(${item.exchange_times}/${item.max_times})`}}</div>
          <div class="itemMark1">{{item.label}}</div>
          <div class="itemMark2" v-if="item.mark">{{item.mark}}</div>
          <div :class="['exBtn', item.exchange_times==item.max_times?'noEx':null]" @click="exBtnCk(item, 2)">
            <template v-if="item.exchange_times==item.max_times">
              <div>已兑完</div>
            </template>
            <template v-else>
              <div><img :src="IconPath(pointIcon)" />{{item.price}}</div>
              <div>兑换</div>
            </template>
          </div>
          <div class="lockBtnBg" v-if="use_nums<unlockNeed"></div>
        </div>
      </div>
    </OutBox>
    <DrawRulesPopup v-if="isShowDrawRulesPopup" @clickClose="clickClose"></DrawRulesPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <ExchangePopup v-if="isShowExchangePopup" :pointIcon="pointIcon" :pointName="'彩虹币'" :my_goods="bead_nums" :config="configExchangePopup" @getPageData="getPageData" @clickClose="clickClose" @openReceiveAwardsPopup="openReceiveAwardsPopup"></ExchangePopup>
  </div>
</template>

<script>
import { getPageData } from '../../api/index'
import DrawRulesPopup from './components/drawRulesPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import ExchangePopup from './components/exchangePopup.vue'

export default {
  name: 'childInterest',
  components: {
    DrawRulesPopup,
    ReceiveAwardsPopup,
    ExchangePopup
  },
  data() {
    return {
      daily_gift_st: false, // 每日礼物领取
      lottery_nums: 0, // 剩余开启次数
      bead_nums: 0, // 我的彩虹币
      pointIcon: 'mk4_8.png', // 彩虹币icon地址
      convert_one: [
        { goods_id: 1, type: 'mic', id: 47, icon: 'ts_mhjd.svga', nums: 3, text: '头饰', name: '萌虎驾到', price: 7, max_times: -1, before_price: 0, unit: '天', mark: '', label: '+3天', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 2, type: 'pst_privilege', id: 0, icon: 'bxzd_120_120.png', nums: 3, text: '礼物赠送权', name: '不想长大', price: 10, max_times: -1, before_price: 0, unit: '天', mark: '610钻石', label: '+3天', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 3, type: 'chat_bubble', id: 7, icon: 'tmjh_120_120.png', nums: 3, text: '聊天气泡', name: '甜梦聚会', price: 10, max_times: -1, before_price: 0, unit: '天', mark: '', label: '+3天', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 4, type: 'pretty_card', id: 0, icon: 'lhqb_120_120.png', nums: 0, text: '靓号券包', name: '靓号券', price: 15, max_times: 20, before_price: 0, unit: '', mark: '', label: '5-10个', exchange_times: 0, has_right: 1, lock: true }
      ],
      unlockNeed: 20, // 解锁需要数量
      use_nums: 0, // 已使用数量
      convert_two: [
        { goods_id: 5, type: 'tool', id: 158, icon: 'cbt_120_120.png', nums: 1, text: '藏宝图', name: '藏宝图', price: 3, max_times: 60, before_price: 20, unit: '', mark: '', label: '+1', exchange_times: 0, has_right: 1, lock: false },
        { goods_id: 6, type: 'car', id: 63, icon: 'xyc_120_120.png', nums: 3, text: '座驾', name: '星月船', price: 20, max_times: 5, before_price: 20, unit: '天', mark: '', label: '+3天', exchange_times: 0, has_right: 1, lock: false },
        { goods_id: 7, type: 'ring', id: 14, icon: 'wqyz_120_120.png', nums: 1, text: '戒指+1', name: '无穷宇宙戒指', price: 70, max_times: 2, before_price: 20, unit: '', mark: '9999钻石', label: '+1', exchange_times: 0, has_right: 1, lock: false }
      ],
      isShowDrawRulesPopup: false, // 宝箱规则弹窗
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      isShowExchangePopup: false, // 兑换弹窗
      configExchangePopup: {}
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.daily_gift_st = res.data.daily_gift_st
          this.lottery_nums = res.data.lottery_nums
          this.bead_nums = res.data.bead_nums
          this.use_nums = res.data.use_nums
          this.convert_one = res.data.convert_one
          this.convert_two = res.data.convert_two
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 每日礼物领取
     */
    dailyBtnCk() {
      console.log('每日礼物领取')
      if (this.daily_gift_st == false) {
        getPageData({ type: 'naughty_receive' }).then((res) => {
          if (res.errno == 0) {
            this.openReceiveAwardsPopup(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 童趣宝箱规则按钮
     */
    drawRulesBtnCk() {
      console.log('童趣宝箱规则按钮')
      this.isShowDrawRulesPopup = true
    },
    /**
     * 宝箱抽奖
     */
    drawBtnCk(type) {
      console.log(10 ** (type - 1))
      if (this.lottery_nums >= 10 ** (type - 1)) {
        getPageData({ type: 'naughty_lottery', mark: type }).then((res) => {
          if (res.errno == 0) {
            this.openReceiveAwardsPopup(res.data.awards)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('开启次数不足')
      }
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg) {
      console.log('获奖弹窗')
      this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        this.getPageData()
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowDrawRulesPopup = false
      this.isShowReceiveAwardsPopup = false
      this.isShowExchangePopup = false
    },
    /**
     * 能否兑换
     */
    isCanEx(item, type) {
      let judge = true
      if (type == 2) {
        if (this.use_nums < this.unlockNeed) {
          judge = false
          return judge
        }
      }
      if (item.exchange_times == item.max_times) {
        judge = false
        return judge
      }
      if (this.bead_nums < item.price) {
        this.$toast('彩虹币不足')
        judge = false
        return judge
      }
      return judge
    },
    /**
     * 点击兑换
     */
    exBtnCk(item, type) {
      if (this.isCanEx(item, type)) {
        console.log('打开兑换')
        this.configExchangePopup = item
        this.isShowExchangePopup = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.childInterest {
  .dailyBox{
    padding: 20px 0 20px 0;
    position: relative;
    .dailyDesc{
      width: 504px;
      height: 172px;
      background: url('@/pages/childrenDay/assets/mk4_1.png') no-repeat left top/100% 100%;
      margin: 0 0 0 20px;
      position: relative;
      .dailyTip1{
        font-weight: 600;
        font-size: 32px;
        color: #FFFFFF;
        position: absolute;
        right: 40px;
        top: 40px;
      }
      .dailyTip2{
        font-weight: 400;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        right: 50px;
        bottom: 40px;
        i{
          color: #FEFAB0;
        }
      }
    }
    .dailyBtn{
      width: 140px;
      height: 144px;
      background: url('@/pages/childrenDay/assets/mk4_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      &.haven{
        background: url('@/pages/childrenDay/assets/mk4_2_1.png') no-repeat left top/100% 100%;
      }
    }
  }
  .treasureBox{
    margin: 140px auto 0 auto;
    padding: 60px 0 20px 0;
    position: relative;
    .treasureTopTip{
      margin: 0 auto 20px auto;
      text-align: center;
      width: fit-content;
      padding: 5px 40px;
      background: #5F96EA;
      border-radius: 24px;
    }
    .drawRulesBtn{
      width: 58px;
      height: 58px;
      background: url('@/pages/childrenDay/assets/mk4_3.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 20px;
      top: 50px;
    }
    .drawArea{
      width: 664px;
      height: 688px;
      background: url('@/pages/childrenDay/assets/mk4_4.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      .openOneBtn{
        width: 244px;
        height: 76px;
        background: url('@/pages/childrenDay/assets/btn_4.png') no-repeat left top/100% 100%;
        font-size: 32px;
        color: #FFFFFF;
        text-align: center;
        line-height: 76px;
        position: absolute;
        left: 60px;
        bottom: 30px;
        font-weight: 600;
        text-shadow: 1px 0 #2D77C3,-1px 0 #2D77C3,0 1px #2D77C3,0 -1px #2D77C3,1px 1px #2D77C3,-1px -1px #2D77C3,1px -1px #2D77C3,-1px 1px #2D77C3;
      }
      .openTenBtn{
        width: 244px;
        height: 76px;
        background: url('@/pages/childrenDay/assets/btn_6.png') no-repeat left top/100% 100%;
        font-size: 32px;
        color: #FFFFFF;
        text-align: center;
        line-height: 76px;
        position: absolute;
        right: 60px;
        bottom: 30px;
        font-weight: 600;
        text-shadow: 1px 0 #DA6093,-1px 0 #DA6093,0 1px #DA6093,0 -1px #DA6093,1px 1px #DA6093,-1px -1px #DA6093,1px -1px #DA6093,-1px 1px #DA6093;
      }
    }
  }
  .exchangeBox{
    margin: 140px auto 0 auto;
    padding: 60px 0 30px 0;
    position: relative;
    .exchangeTopTip{
      margin: 0 auto 20px auto;
      text-align: center;
      width: fit-content;
      padding: 5px 40px;
      background: #5F96EA;
      border-radius: 24px;
      img{
        width: 40px;
        height: 40px;
        margin: 0 5px;
        vertical-align: middle;
      }
    }
    .exchangeArea1{
      margin: 40px auto 100px auto;
      display: flex;
      justify-content: center;
      .item1Bg{
        width: 160px;
        height: 232px;
        background: url('@/pages/childrenDay/assets/mk4_5.png') no-repeat left top/100% 100%;
        margin: 0 5px;
        position: relative;
      }
    }
    .exchangeArea2{
      width: 682px;
      height: 460px;
      background: url('@/pages/childrenDay/assets/mk4_10.png') no-repeat left top/100% 100%;
      margin: 0 auto 0 auto;
      padding: 100px 0 0 0;
      display: flex;
      justify-content: center;
      position: relative;
      .exchangeArea2Tip{
        font-size: 28px;
        color: #4786E6;
        font-weight: 500;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 26px;
        span{
          color: #FF5FAB;
        }
      }
      .item2Bg{
        width: 200px;
        height: 258px;
        background: url('@/pages/childrenDay/assets/mk4_7.png') no-repeat left top/100% 100%;
        margin: 0 10px;
        position: relative;
        .itemIcon{
          width: 150px;
          height: 150px;
        }
        .itemMark2{
          right: 25px;
        }
        .exBtn{
          width: 185px;
          height: 65px;
          background: url('@/pages/childrenDay/assets/btn_9.png') no-repeat left top/100% 100%;
          &.noEx{
            background: url('@/pages/childrenDay/assets/btn_9_2.png') no-repeat left top/100% 100%;
          }
        }
        .lockBtnBg{
          width: 185px;
          height: 65px;
          background: url('@/pages/childrenDay/assets/btn_9_1.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -80px;
        }
      }
    }
    .itemIcon{
      width: 120px;
      height: 120px;
      background: linear-gradient(-90deg, #9DC4FF, #6BB8FF);
      border-radius: 12px;
      padding: 5px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
    }
    .itemText{
      font-size: 24px;
      color: #4786E6;
      font-weight: 600;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 50px;
    }
    .itemLimited{
      font-weight: 400;
      font-size: 24px;
      color: #FF5FAB;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
    }
    .itemMark1{
      background: linear-gradient(90deg, #FBCCAE, #F396AF);
      border-radius: 16px 16px 16px 0px;
      padding: 5px 10px;
      font-weight: 400;
      font-size: 20px;
      color: #FFFFFF;
      text-shadow: 1px 0 #DC7D85,-1px 0 #DC7D85,0 1px #DC7D85,0 -1px #DC7D85,1px 1px #DC7D85,-1px -1px #DC7D85,1px -1px #DC7D85,-1px 1px #DC7D85;
      position: absolute;
      right: -5px;
      top: -24px;
    }
    .itemMark2{
      background: linear-gradient(90deg, #B8F4FD, #88D6F8);
      border-radius: 0px 12px 0px 12px;
      padding: 5px 10px;
      font-weight: 400;
      font-size: 20px;
      color: #FFFFFF;
      text-shadow: 1px 0 #5595F7,-1px 0 #5595F7,0 1px #5595F7,0 -1px #5595F7,1px 1px #5595F7,-1px -1px #5595F7,1px -1px #5595F7,-1px 1px #5595F7;
      position: absolute;
      right: 20px;
      top: 18px;
    }
    .exBtn{
      width: 155px;
      height: 65px;
      background: url('@/pages/childrenDay/assets/btn_7.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -80px;
      font-weight: 400;
      font-size: 24px;
      color: #FFFFFF;
      text-shadow: 1px 0 #5595F7,-1px 0 #5595F7,0 1px #5595F7,0 -1px #5595F7,1px 1px #5595F7,-1px -1px #5595F7,1px -1px #5595F7,-1px 1px #5595F7;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 10px;
      &.noEx{
        background: url('@/pages/childrenDay/assets/btn_8.png') no-repeat left top/100% 100%;
        text-shadow: 1px 0 #97A1B1,-1px 0 #97A1B1,0 1px #97A1B1,0 -1px #97A1B1,1px 1px #97A1B1,-1px -1px #97A1B1,1px -1px #97A1B1,-1px 1px #97A1B1;
      }
      img{
        width: 30px;
        height: 30px;
        margin: 0 5px 0 0;
        vertical-align: middle;
      }
    }
  }
}
</style>
