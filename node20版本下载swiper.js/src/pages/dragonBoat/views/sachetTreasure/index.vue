<template>
  <div class="compo">
    <OutBox class="dailyAtBox" :title="'title_5.png'" :bottom="true">
      <div class="dailyAtArea">
        <div class="dailyAtItem" v-for="(item) in sign_list" :key="item.id">
          <div class="dailyAtIcon">
            <PublicImg :imgName="'xn_120_120.png'"></PublicImg>
          </div>
          <div class="dailyAtLabel">x1</div>
          <div class="dailyAtText">{{item.date_text}}</div>
          <div :class="['dailyAtStatus', `status${item.status}`]">{{item.status==0?'未签到':item.status==1?'即将开始':item.status==2?'已签到':null}}</div>
        </div>
      </div>
    </OutBox>
    <div class="treasureBox">
      <div class="treasureBoxTitle"></div>
      <div class="treasureCoinArea">
        <div class="coinNumDiv">拥有的香囊<img class="coinIconImg" :src="IconPath(coinIcon)" />:&ensp;{{ticket_nums}}</div>
        <div class="coinNumDiv">已消费的钻石:&ensp;{{consume}}</div>
      </div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="poolLevelDiv">
        <div>当前奖池等级:&ensp;LV.{{pool_level}}</div>
        <div class="poolBtn" @click="poolBtnCk"></div>
      </div>
      <WheelDisc :wheelLevel="pool_level" :leftDrawsNum="ticket_nums" @ticketNumsUpdate="ticketNumsUpdate" @openXcxnPopup="openXcxnPopup" @openPreviewPopup="openPreviewPopup" @openBackpackFullPopup="openBackpackFullPopup" @openReceiveAwardsPopup="openReceiveAwardsPopup"></WheelDisc>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间每消费300钻石可获得1个<img class="coinIconImg" :src="IconPath(coinIcon)" />，用于开奖</li>
          <li><span></span>奖池共5个等级，开到炫彩香囊达到指定次数将自</li>
          <li>动解锁下一级，等级越高获得稀有奖励的概率越大</li>
          <li><span></span>开到锦鲤可获得当前奖池全部奖励并直接解锁下一</li>
          <li>等级</li>
        </ul>
      </div>
    </div>
    <OutBox class="progressBox" :title="'title_7.png'" :right="false" :bottom="false">
      <div class="pickedStarTimeDiv">累计消耗<img class="coinIconImg" :src="IconPath(coinIcon)" />:&ensp;{{tot_spend_tickets}}次</div>
      <div class="pickStarTip">累计消耗香囊达到门槛即可领取相应奖励</div>
      <StepProgress :tot_spend_tickets="tot_spend_tickets" :tot_awards="tot_awards" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" :topTip="TipReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <PoolPopup v-if="isShowPoolPopup" :pool_level="pool_level" @clickClose="clickClose"></PoolPopup>
    <XcxnPopup v-if="isShowXcxnPopup" :pool_level="pool_level" @clickClose="clickClose"></XcxnPopup>
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="clickClose"></BackpackFull>
  </div>
</template>

<script>
import { getPageData } from '@/pages/dragonBoat/api/index'
import TextSwipe from './components/textSwipe.vue'
import WheelDisc from './components/wheelDisc.vue'
import StepProgress from './components/stepProgress.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import PreviewPopup from './components/previewPopup.vue'
import PoolPopup from './components/poolPopup.vue'
import XcxnPopup from './components/xcxnPopup.vue'
import BackpackFull from './components/backpackFull.vue'

export default {
  name: 'sachetTreasure',
  components: {
    TextSwipe,
    WheelDisc,
    StepProgress,
    ReceiveAwardsPopup,
    PreviewPopup,
    PoolPopup,
    XcxnPopup,
    BackpackFull
  },
  data() {
    return {
      is_sign_in: false, // 是否当日是首次签到
      sign_list: [
        { date: '20240411', date_text: '04月11日', status: 0 },
        { date: '20240412', date_text: '04月12日', status: 0 },
        { date: '20240413', date_text: '04月13日', status: 0 },
        { date: '20240414', date_text: '04月14日', status: 0 }
      ],
      coinIcon: 'xn_35_40.png', // 货币图标
      ticket_nums: 0, // 可抽奖次数
      consume: 0, // 已消费的钻石
      swipeList: [], // 文字轮播
      pool_level: 1, // 当前奖池等级
      tot_spend_tickets: 0, // 累计消耗香囊数
      tot_awards: [
        { id: 20, need_num: 20, award: { id: 0, type: 'luck_key', nums: 1, name: '钥匙', text: '+1', icon: 'xyys_120_120.png' }, has_right: 0 },
        { id: 40, need_num: 40, award: { id: 0, type: 'voice', nums: 3, name: '声波', text: '+3天', icon: 'sb_mxcj_show' }, has_right: 0 },
        { id: 65, need_num: 65, award: { id: 158, type: 'tool', nums: 3, name: '藏宝图', text: '+3', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 100, need_num: 100, award: { id: 57, type: 'pst_privilege', nums: 3, name: '礼物赠送权', text: '+3天', icon: 'hshs_120_120.png', mark: '328' }, has_right: 0 },
        { id: 150, need_num: 150, award: { id: 0, type: 'pretty_card', nums: 5, name: '靓号券', text: '+5', icon: 'lhq_120_120.png' }, has_right: 0 },
        { id: 200, need_num: 200, award: { id: 158, type: 'tool', nums: 10, name: '藏宝图', text: '+10', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 300, need_num: 300, award: { id: 65, type: 'car', nums: 7, name: '座驾', text: '+7天', icon: 'yfly_120_120.png' }, has_right: 0 }
      ], // 累计消耗香囊奖励列表
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      TipReceiveAwardsPopup: undefined,
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: { type: '', img: '', tip1: '', tip2: '' },
      isShowPoolPopup: false, // 奖池说明弹窗
      isShowXcxnPopup: false, // 炫彩香囊奖励预览
      isShowBackpackFull: false, // 背包已满弹窗
      typeBackpackFull: 1
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
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.is_sign_in = res.data.is_sign_in
          if (this.is_sign_in) {
            console.log('签到')
            let msg = [{
              type: 'tool',
              icon: 'xn_120_120.png',
              text: '香囊+1'
            }]
            this.openReceiveAwardsPopup(msg)
          }
          this.sign_list = res.data.sign_list
          this.consume = res.data.consume
          this.ticket_nums = res.data.ticket_nums
          this.pool_level = res.data.pool_level
          this.tot_spend_tickets = res.data.tot_spend_tickets
          this.swipeList = res.data.marquee
          this.tot_awards = res.data.tot_awards
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 更新ticket_nums
     */
    ticketNumsUpdate(num) {
      this.ticket_nums = num
    },
    /**
     * 奖池说明
     */
    poolBtnCk() {
      console.log('奖池说明')
      this.isShowPoolPopup = true
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg, tip) {
      console.log('获奖弹窗')
      this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.TipReceiveAwardsPopup = tip
        this.isShowReceiveAwardsPopup = true
        this.getPageData()
      })
    },
    /**
     * 打开背包已满弹窗
     */
    openBackpackFullPopup(type) {
      console.log('背包已满弹窗')
      this.clickClose()
      setTimeout(() => {
        this.typeBackpackFull = type
        this.isShowBackpackFull = true
        this.getPageData()
      })
    },
    /**
     * 打开预览弹窗
     */
    openPreviewPopup(msg) {
      console.log(msg)
      this.configPreviewPopup = {
        type: msg.type,
        img: msg.is_preview,
        tip1: `${msg.name}·${msg.type_name}`
        // tip2: ''
      }
      this.isShowPreviewPopup = true
    },
    /**
     * 打开炫彩香囊奖励预览弹窗
     */
    openXcxnPopup() {
      this.isShowXcxnPopup = true
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
      this.isShowPreviewPopup = false
      this.isShowPoolPopup = false
      this.isShowXcxnPopup = false
      this.isShowBackpackFull = false
    }
  }
}
</script>

<style scoped lang="scss">
.coinIconImg{
  width: 35px;
  height: 40px;
  vertical-align: middle;
  margin: 0 5px;
}
.compo{
  color: #FFFFFF;
  .dailyAtBox{
    margin: 0 auto 0 auto;
    padding: 60px 12px 40px 12px;
    .dailyAtArea{
      background: #DEECDB;
      display: flex;
      justify-content: center;
      .dailyAtItem{
        width: 140px;
        height: 180px;
        background: linear-gradient(180deg, #FCF2C3, #FFFFFF);
        border-radius: 20px;
        border: 4px solid #72C4C0;
        margin: 20px 10px 80px 10px;
        position: relative;
        .dailyAtIcon{
          width: 120px;
          height: 120px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }
        .dailyAtLabel{
          font-weight: 500;
          font-size: 28px;
          color: #4AACB3;
          position: absolute;
          right: 5px;
          bottom: 40px;
        }
        .dailyAtText{
          width: 133px;
          height: 40px;
          background: #358E94;
          border-radius: 0px 0px 15px 15px;
          font-weight: 400;
          text-align: center;
          line-height: 40px;
          font-size: 26px;
          position: absolute;
          bottom: 0;
        }
        .dailyAtStatus{
          width: 120px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          font-weight: 400;
          font-size: 28px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -70px;
          &.status0{
            background: linear-gradient(0deg, #bbc0b9, #DDDDDD);
            border-radius: 30px;
            border: 2px solid #FFFFFF;
          }
          &.status1{
            color: #146A72;
          }
          &.status2{
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            border-radius: 30px;
            border: 2px solid #FFFFFF;
          }
        }
      }
    }
  }
  .treasureBox{
    width: 750px;
    height: 1433px;
    background: url('@/pages/dragonBoat/assets/mk4_1.png') no-repeat left top/100% 100%;
    margin: 80px auto 0 auto;
    padding: 110px 0 20px 0;
    position: relative;
    .treasureBoxTitle{
      width: 462px;
      height: 140px;
      background: url('@/pages/dragonBoat/assets/title_6.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -40px;
    }
    .treasureCoinArea{
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      .coinNumDiv{
        padding: 6px 20px;
        background: #146A72;
        border-radius: 22px 24px 24px 22px;
        font-weight: 400;
        font-size: 24px;
        line-height: 40px;
      }
    }
    .swipeDiv{
      width: 750px;
      height: 71px;
      background: url('@/pages/dragonBoat/assets/mk4_20.png') no-repeat left top/100% 100%;
      margin: 20px auto 0 auto;
      padding: 10px 20px;
    }
    .poolLevelDiv{
      padding: 6px 30px;
      font-size: 25px;
      line-height: 30px;
      background: #146A72;
      border-radius: 22px 24px 24px 22px;
      width: fit-content;
      margin: 30px auto -70px auto;
      position: relative;
      z-index: 2;
      .poolBtn{
        width: 34px;
        height: 34px;
        background: url('@/pages/dragonBoat/assets/mk4_6.png') no-repeat left top/100% 100%;
        position: absolute;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .progressBox{
    margin: 100px auto 0 auto;
    padding: 60px 12px 40px 12px;
    position: relative;
    .pickedStarTimeDiv{
      width: fit-content;
      padding: 5px 20px;
      background: #358E94;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 30px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #146A72;
      margin: 10px auto 20px auto;
      text-align: center;
    }
  }
}
</style>
