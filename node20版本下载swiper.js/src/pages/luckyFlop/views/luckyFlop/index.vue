<template>
  <div class="LoveFlop">
    <!-- 幸运翻牌 -->
    <OutBox :title="'title_4.png'">
      <div class="topArea">
        <div class="residualCoin">
          剩余星星<img class="coinIcon" :src="IconPath('mk4_1.png')" />:&ensp;{{coinNum}}
          <div class="acquireBtn" @click="acquireBtnCk"></div>
        </div>
        <div class="PrizePool" @click="prizePoolCk"></div>
      </div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="cardDiv">
        <TurnCard
          :cardsTurnList="cardsTurnList"
          :isFirstFree="isFirstFree"
          :turnOneNeed="turnOneNeed"
          :turnAllNeed="turnAllNeed"
          @getUserInformation="getUserInformation"
          @recordsBtnCk="recordsBtnCk"
          @startTimeTask="startTimeTask"
          @thinkings="thinkings"
        ></TurnCard>
        <div class="rulesText">
          <ul>
            <li><span></span>玩家每消费100钻石<i>自动获得1个星星</i><img :src="IconPath('mk4_1.png')" /></li>
            <li><span></span>第一层翻牌每次消耗1个星星，第二层翻牌每次消</li>
            <li>耗2个星星，第三层翻牌每次消耗3个星星</li>
            <li><span></span>每次翻牌将获得随机奖励，层数越高奖励越丰厚，</li>
            <li>有机会获得卡牌“L”、“U”、“C”、“K”</li>
            <li>
              <span></span>每次翻牌还有几率出现<i>限时任务</i>，完成任务也可获
            </li>
            <li>得卡牌</li>
            <li>
              <span></span>收集卡牌可兑换不同豪华奖励，<i>卡牌将在活动结束</i>
            </li>
            <li><i>后清零</i>，请及时兑换</li>
          </ul>
        </div>
      </div>
    </OutBox>
    <!-- 集牌兑奖 -->
    <OutBox :title="'title_5.png'">
      <div class="cardsNumDiv">
        <div
          :class="['cardNum', item.num == 0 ? null : 'active']"
          v-for="item in cardsHavenNumList"
          :key="item.card_id"
        >
          <div class="numDesignator" v-if="item.num != 0">{{ item.num }}</div>
        </div>
      </div>
      <div class="claimPrizeDiv">
        <div class="prizeItem" v-for="item in claimPrizeList" :key="item.id">
          <div class="prizeIcon">
            <div :class="['iconImg',item.award.type == 'title' ? 'titleImg' : 'otherImg']">
              <PublicImg class="svgaIcon" :imgName="item.award.icon" :userAvatar="item.award.type=='mic'?$store.state.user_icon:''"></PublicImg>
            </div>
          </div>
          <div class="prizeDes">
            {{ item.award.type=='mic'?'头饰':item.award.type=='car'?'座驾':item.award.type=='chat_bubble'?'气泡':item.award.type=='costume'?'主页特效':item.award.name }}<span v-if="item.award.nums">+{{ item.award.nums }}</span><span v-if="item.award.type=='mic'||item.award.type=='car'||item.award.type=='chat_bubble'||item.award.type=='costume'">天</span>
          </div>
          <div class="needDesDiv">
            消耗<em v-if="item.is_all">全套</em><em v-else>{{item.need_num}}张</em>卡牌<em v-if="item.is_all">{{ item.need_num }}套</em><em v-else>{{cardsHavenNumList[item.card_id - 1].name}}</em>
          </div>
          <div class="exchangeLimitDiv">
            <span v-if="item.limit != -1">限兑：{{ item.exchange_num }}/{{ item.limit }}</span>
            <span v-else>不限兑换次数</span>
          </div>
          <div :class="['exchangeBtn', item.exchange_num == item.limit ? 'limited' : null]" @click="exchangeBtnCk(item)"></div>
        </div>
      </div>
    </OutBox>
    <!-- 合成神秘声波 -->
    <OutBox :title="'title_6.png'">
      <MysterSound :soundsConfig="soundsConfig" @getUserInformation="getUserInformation"></MysterSound>
    </OutBox>
    <CoinPopup v-if="isShowCoinPopup" :diamondUsedNum="diamondUsedNum" @closePopups="closePopups"></CoinPopup>
    <PrizePoolPopup v-if="isShowPrizePoolPopup" @closePopups="closePopups"></PrizePoolPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @closePopups="closePopups"></RecordsPopup>
    <TimeTask v-if="isShowTimeTask" :config="configTimeTask" @endTimeTask="endTimeTask" @getUserInformation="getUserInformation"></TimeTask>
    <ExchangePopup v-if="isShowExchangePopup" :config="configExchange" @closePopups="closePopups" @getUserInformation="getUserInformation"></ExchangePopup>
    <ConfirmPopup v-if="isShowConfirmPopup" :config="configExchange" @closePopups="closePopups" @openReceivePopup="openReceivePopup" @getUserInformation="getUserInformation"></ConfirmPopup>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceive" @closePopups="closePopups"></ReceivePopup>
  </div>
</template>

<script>
import TextSwipe from './components/textSwipe.vue' // 文字轮播图
import TurnCard from './components/turnCard.vue' // 翻卡
import CoinPopup from './components/coinPopup.vue' // 货币
import PrizePoolPopup from './components/prizePoolPopup.vue' // 奖池
import RecordsPopup from './components/recordsPopup.vue' // 记录
import TimeTask from './components/timeTask.vue' // 限时任务组件
import ExchangePopup from './components/exchangePopup.vue' // 兑换奖励
import ConfirmPopup from './components/confirmPopup.vue' // 二次确认
import MysterSound from './components/mysterSound.vue' // 神秘声波
import { getPageData } from '@/pages/luckyFlop/api/index.js'
import ReceivePopup from './components/receivePopup.vue'

export default {
  name: 'LuckyFlop',
  components: {
    TextSwipe,
    TurnCard,
    CoinPopup,
    PrizePoolPopup,
    RecordsPopup,
    TimeTask,
    ExchangePopup,
    ConfirmPopup,
    MysterSound,
    ReceivePopup
  },
  data() {
    return {
      coinNum: 0, // 剩余货币
      diamondUsedNum: 0, // 已消费钻石数
      swipeList: [], // 文字轮播图数组
      cardsTurnList: [{ id: 1, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 2, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 3, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 4, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 5, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 6, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 7, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }, { id: 8, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }, { id: 9, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }], // 翻卡数组
      isFirstFree: false, // 首次免费次数是否还在
      turnOneNeed: 1, // 一次翻1张所需
      turnAllNeed: 18, // 一次翻全部所需
      cardsHavenNumList: [
        { card_id: 1, num: 0, name: 'L' },
        { card_id: 2, num: 0, name: 'U' },
        { card_id: 3, num: 0, name: 'C' },
        { card_id: 4, num: 0, name: 'K' }
      ], // 拥有的卡牌数组
      cardsHavenSuit: 0, // 拥有的整套卡牌的数量
      claimPrizeList: [
        { id: 1, limit: 10, need_num: 3, card_id: 0, is_all: true, award: { id: 159, type: 'tool', nums: 2, name: '黄金藏宝图', icon: 'hjcbt_120_120.png' }, exchange_num: 0 },
        { id: 2, limit: 1, need_num: 2, card_id: 0, is_all: true, award: { id: 0, type: 'wave_ticket', nums: 1, name: '声波自选券', icon: 'sbzxq_120_120.png' }, exchange_num: 0 },
        { id: 3, limit: 1, need_num: 1, card_id: 0, is_all: true, award: { id: 61, type: 'car', nums: 15, name: '雪域白龙', icon: 'xybl_120_120.png' }, exchange_num: 0 },
        { id: 4, limit: -1, need_num: 1, card_id: 1, is_all: false, award: { id: 142, type: 'tool', nums: 80, name: '符石精粹', icon: 'fsjc_120_120.png' }, exchange_num: 0 },
        { id: 5, limit: -1, need_num: 1, card_id: 2, is_all: false, award: { id: 158, type: 'tool', nums: 1, name: '藏宝图', icon: 'cbt_120_120.png' }, exchange_num: 0 },
        { id: 6, limit: -1, need_num: 1, card_id: 3, is_all: false, award: { id: 9, type: 'costume', nums: 7, name: '夏夜星辰', icon: 'xyxc_120_120.png' }, exchange_num: 0 },
        { id: 7, limit: -1, need_num: 1, card_id: 4, is_all: false, award: { id: 158, type: 'tool', nums: 5, name: '藏宝图', icon: 'cbt_120_120.png' }, exchange_num: 0 }
      ], // 兑换列表
      soundsConfig: {
        soundCouponNum: 0, // 声波自选卷
        soundsList: [{ id: 60, name: '紫之声', icon: 'sb_purple', is_own: false }, { id: 61, name: '橙之声', icon: 'sb_orange', is_own: false }, { id: 64, name: '赤之声', icon: 'sb_red', is_own: false }, { id: 66, name: '青之声', icon: 'sb_syan', is_own: false }, { id: 69, name: '粉之声', icon: 'sb_pink', is_own: false }, { id: 71, name: '金之声', icon: 'sb_gold', is_own: false }, { id: 70, name: '蓝之声', icon: 'sb_blue', is_own: false }, { id: 75, name: '神秘星空', icon: 'sb_smxk', is_own: false }], // 声波列表
        soundsHavenNum: 0, // 已收集的声波数量
        isCraft: false // 是否已合成
      },
      isShowCoinPopup: false, // 货币获取方式弹窗
      isShowPrizePoolPopup: false, // 奖池说明弹窗
      isShowRecordsPopup: false, // 奖品记录弹窗
      isShowTimeTask: false, // 是否存在限时任务
      configTimeTask: {}, // 限时任务参
      isShowExchangePopup: false, // 兑换奖励弹窗
      configExchange: {}, // 兑换奖励参
      isShowConfirmPopup: false, // 二次确认弹窗
      isShowReceivePopup: false, // 恭喜获得弹窗
      configReceive: []
    }
  },
  created() {
    this.getUserInformation()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 埋点
     */
    thinkings(module) {
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: module,
          module: '幸运翻牌'
        }
      )
    },
    /**
     * 获取用户信息
     */
    getUserInformation() {
      console.log('获取用户信息')
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        console.log(res)
        if (res.errno == 0) {
          this.coinNum = res.data.love_num
          this.diamondUsedNum = res.data.tot_consume_masonry
          this.swipeList = res.data.award_list
          this.cardsTurnList = res.data.flip_card_list
          this.isFirstFree = res.data.is_free
          this.turnOneNeed = res.data.flip_one_num
          this.turnAllNeed = res.data.flip_all_num
          this.cardsHavenNumList = res.data.love_card_list
          const minArry = []
          for (const it of this.cardsHavenNumList) {
            minArry.push(it.num)
          }
          this.cardsHavenSuit = Math.min(...minArry)
          this.claimPrizeList = res.data.exchange_list
          this.soundsConfig = {
            soundCouponNum: res.data.wave_num,
            soundsList: res.data.color_sonic,
            soundsHavenNum: 0,
            isCraft: res.data.is_merge
          }
          for (let item of this.soundsConfig.soundsList) {
            if (item.is_own) {
              this.soundsConfig.soundsHavenNum++
            }
          }
          if (res.data.task_info.id) {
            this.startTimeTask(res.data.task_info)
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 货币弹窗
     */
    acquireBtnCk() {
      console.log('获取')
      this.thinkings('获取')
      this.isShowCoinPopup = true
    },
    /**
     * 奖池弹窗
     */
    prizePoolCk() {
      console.log('奖池')
      this.thinkings('奖池')
      this.isShowPrizePoolPopup = true
    },
    /**
     * 记录弹窗
     */
    recordsBtnCk() {
      console.log('记录')
      this.thinkings('记录')
      this.isShowRecordsPopup = true
    },
    /**
     * 限时任务触发(firstCome:首次触发)
     */
    startTimeTask(task, firstCome) {
      // console.log(task)
      this.configTimeTask = task
      if (firstCome) {
        this.$set(this.configTimeTask, 'firstCome', true)
      }
      this.isShowTimeTask = true
    },
    /**
     * 限时任务结束
     */
    endTimeTask() {
      this.isShowTimeTask = false
      this.configTimeTask = {}
    },
    /**
     * 点击兑换
     */
    exchangeBtnCk(item) {
      console.log('兑换:', item)
      this.configExchange = {
        exchangeId: item.id,
        rewardIcon: item.award.icon,
        rewardType: item.award.type,
        rewardName: item.award.name,
        is_all: item.is_all,
        card_id: item.is_all ? null : item.card_id,
        cardName: item.is_all ? null : this.cardsHavenNumList[item.card_id - 1].name,
        needNum: item.need_num,
        ownedNum: item.is_all ? this.cardsHavenSuit : this.cardsHavenNumList[item.card_id - 1].num,
        exchangeLimite: Number(item.limit) > 0 ? Number(item.limit) - Number(item.exchange_num) : 1000,
        rewardDesc: item.award.nums == false ? '永久' : `+${item.award.nums}`
      }
      if (this.configExchange.exchangeLimite > 0) {
        if (this.configExchange.ownedNum >= this.configExchange.needNum) {
          if (item.limit == 1) {
            this.isShowConfirmPopup = true
          } else {
            this.isShowExchangePopup = true
          }
        } else {
          this.$toast('卡牌不足')
        }
      }
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceivePopup(msg) {
      this.closePopups()
      setTimeout(() => {
        this.configReceive = msg
        this.isShowReceivePopup = true
      })
    },
    /**
     * 关闭所有弹窗
     */
    closePopups() {
      this.isShowCoinPopup = false
      this.isShowPrizePoolPopup = false
      this.isShowRecordsPopup = false
      this.isShowExchangePopup = false
      this.isShowConfirmPopup = false
      this.isShowReceivePopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.topArea{
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .residualCoin {
    width: 362px;
    height: 48px;
    background: linear-gradient(90deg, #97B2FA, #E7B1FD);
    border-radius: 24px;
    padding-left: 20px;
    font-size: 28px;
    line-height: 48px;
    position: relative;
    .coinIcon {
      width: 27px;
      height: 26px;
      margin: 0 5px;
    }
    .acquireBtn {
      position: absolute;
      width: 112px;
      height: 48px;
      background: url('@/pages/luckyFlop/assets/mk4_2.png') no-repeat left top/100% 100%;
      left: 290px;
      top: 0px;
    }
  }
  .PrizePool {
    width: 132px;
    height: 60px;
    background: url('@/pages/luckyFlop/assets/mk4_3.png') no-repeat left top/100% 100%;
  }
}
.swipeDiv {
  margin: 20px auto 0 auto;
  width: 650px;
  height: 68px;
  background: url('@/pages/luckyFlop/assets/mk4_4.png') no-repeat left top/100% 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
}
.cardDiv {
  width: 670px;
  // height: 1600px;
  margin: 0 auto;
  margin: 20px auto 0 auto;
  // background-color: #F19C92;
  .rulesText{
    line-height: 45px;
    color: #4A50D1;
    font-weight: 500;
    white-space: nowrap;
    width: 605px;
    margin-left: 40px;
    li {
      position: relative;
      list-style-type: none;
      font-size: 28px;
      display: flex;
      align-items: center;
      span {
        position: absolute;
        top: 16px;
        left: -28px;
        width: 12px;
        height: 12px;
        background: #FF78D0;
        border-radius: 50%;
      }
      i {
        color: #FF78D0;
      }
      img{
        width: 27px;
        height: 26px;
        margin: 0 5px;
      }
    }
  }
}

.cardsNumDiv {
  width: 100%;
  height: 250px;
  padding: 0px 40px 0 40px;
  // background-color: #F19C92;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cardNum {
    width: 154px;
    height: 194px;
    position: relative;
    &:nth-child(1) {
      background: url('@/pages/luckyFlop/assets/mk4_13_1.png') no-repeat left top/100% 100%;
      &.active {
        background: url('@/pages/luckyFlop/assets/mk4_13.png') no-repeat left top/100% 100%;
      }
    }
    &:nth-child(2) {
      background: url('@/pages/luckyFlop/assets/mk4_14_1.png') no-repeat left top/100% 100%;
      &.active {
        background: url('@/pages/luckyFlop/assets/mk4_14.png') no-repeat left top/100% 100%;
      }
    }
    &:nth-child(3) {
      background: url('@/pages/luckyFlop/assets/mk4_15_1.png') no-repeat left top/100% 100%;
      &.active {
        background: url('@/pages/luckyFlop/assets/mk4_15.png') no-repeat left top/100% 100%;
      }
    }
    &:nth-child(4) {
      background: url('@/pages/luckyFlop/assets/mk4_16_1.png') no-repeat left top/100% 100%;
      &.active {
        background: url('@/pages/luckyFlop/assets/mk4_16.png') no-repeat left top/100% 100%;
      }
    }
    .numDesignator {
      width: 40px;
      height: 40px;
      background: linear-gradient(0deg, #E76B35, #F5BD74);
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 21px;
      color: #fff;
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
}
.claimPrizeDiv {
  width: 100%;
  // height: 740px;
  padding: 10px 0 20px 0;
  .prizeItem {
    width: 660px;
    height: 170px;
    margin: 0 auto 20px auto;
    background: url('@/pages/luckyFlop/assets/mk4_17.png') no-repeat left top/100% 100%;
    position: relative;
    .prizeIcon {
      width: 220px;
      height: 160px;
      position: absolute;
      top: 5px;
      left: 0;
      .iconImg{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        &.titleImg{
          width: 210px;
          height: 96px;
        }
        &.otherImg{
          width: 120px;
          height: 120px;
        }
      }
      .specialDes {
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        top: 90px;
        right: 10px;
      }
    }
    .prizeDes {
      width: 240px;
      height: 36px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 10px;
      font-size: 24px;
      color: #fff1e5;
    }
    .needDesDiv {
      font-size: 28px;
      color: #ffffff;
      position: absolute;
      top: 30px;
      left: 240px;
      :deep em {
        color: #fff79a;
      }
    }
    .exchangeLimitDiv {
      color: #fff;
      font-size: 24px;
      position: absolute;
      top: 100px;
      left: 240px;
    }
    .exchangeBtn {
      width: 136px;
      height: 56px;
      background: url('@/pages/luckyFlop/assets/btn_3.png') no-repeat left top/100% 100%;
      position: absolute;
      top: 80px;
      left: 500px;
      font-size: 28px;
      line-height: 60px;
      text-align: center;
      color: #4A50D1;
      &::after {
        content: '兑换';
      }
      &.limited {
        background: url('@/pages/luckyFlop/assets/btn_1.png') no-repeat left top/100% 100%;
        &::after {
          content: '已兑完';
        }
      }
    }
  }
}
</style>
