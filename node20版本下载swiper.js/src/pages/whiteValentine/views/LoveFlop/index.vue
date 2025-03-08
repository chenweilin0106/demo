<template>
  <div class="LoveFlop">
    <div class="flipCard">
      <div class="title"></div>
      <div class="residualLove">
        剩余爱心<img class="loveIcon" :src="IconPath('mk1_1_1.png')" />:&ensp;{{loveNum}}
        <div class="acquireBtn" @click="acquireBtnCk"></div>
      </div>
      <div class="PrizePool" @click="prizePoolCk"></div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="cardDiv">
        <TurnCard :cardsTurnList="cardsTurnList" :isFirstFree="isFirstFree" :turnOneNeed="turnOneNeed" :turnAllNeed="turnAllNeed" @getUserInformation="getUserInformation" @recordsBtnCk="recordsBtnCk" @startTimeTask="startTimeTask" @thinkings="thinkings"></TurnCard>
        <div class="rule-text">
          <ul>
            <li><span></span>玩家每消费100钻石<i>自动获得1个爱心</i><img class="loveIcon" :src="IconPath('mk1_1_1.png')" /></li>
            <li><span></span>第一层翻牌每次消耗1个爱心，第二层翻牌每次消</li>
            <li>耗2个爱心，第三层翻牌每次消耗3个爱心</li>
            <li><span></span>每次翻牌将获得随机奖励，层数越高奖励越丰厚，</li>
            <li>有机会获得卡牌“L”、“O”、“V”、“E”</li>
            <li><span></span>每次翻牌还有几率出现<i>限时任务</i>，完成任务也可获</li>
            <li>得卡牌</li>
            <li><span></span>集齐卡牌可兑换<i>永久铭牌、橙色符石、靓号券、自</i></li>
            <li><i>选奖励</i></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="claimPrize">
      <div class="title"></div>
      <div class="interactionCard">
        <div class="sendCard" @click="sendCardCk"></div>
        <div class="receiveCard" @click="receiveCardCk">
          <div class="cornerMark" v-if="receiveNum != 0">{{Number(receiveNum)>99?'99+':receiveNum}}</div>
        </div>
      </div>
      <div class="cardsNumDiv">
        <div :class="['cardNum', item.num==0?null:'active']" v-for="(item) in cardsHavenNumList" :key="item.card_id">
          <div class="numDesignator" v-if="item.num!=0">{{item.num}}</div>
        </div>
      </div>
      <div class="claimPrizeDiv">
        <div class="prizeItem" v-for="(item) in claimPrizeList" :key="item.id">
          <div class="prizeIcon" @click="exchangeImgCk(item)">
            <img :class="[item.award.type=='title'?'titleImg':'otherImg']" :src="IconPath(item.award.icon)" />
            <div class="specialDes" v-if="item.id == 4 && item.award.icon!='btn_zx.png'">{{item.award.tip}}</div>
          </div>
          <div class="prizeDes" v-if="item.id == 4 && item.award.icon!='btn_zx.png'">点击更换</div>
          <div class="prizeDes" v-else>{{item.award.name}}<span v-if="item.award.nums">+{{item.award.nums}}</span></div>
          <div class="needDesDiv">消耗<em v-if="item.is_all">全套</em><em v-else>任意</em>卡牌<em v-if="item.is_all">{{item.need_num}}套</em><em v-else>{{item.need_num}}张</em></div>
          <div class="exchangeLimitDiv"><span v-if="item.limit!=-1">限兑：{{item.exchange_num}}/{{item.limit}}</span><span v-else>不限兑换次数</span></div>
          <div :class="['exchangeBtn',item.exchange_num==item.limit?'limited':null]" @click="exchangeBtnCk(item)"></div>
        </div>
      </div>
    </div>
    <div class="bottomDiv"></div>
    <PrizePoolPopup :isShow="isShowPrizePoolPopup" @closePopups="closePopups"></PrizePoolPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @closePopups="closePopups"></RecordsPopup>
    <AcquirePopup :isShow="isShowAcquirePopup" :config="configAcquirePopup" @replaceImg="replaceImg" @closePopups="closePopups"></AcquirePopup>
    <TimeTask v-if="isShowTimeTask" :config="configTimeTask" @endTimeTask="endTimeTask" @getUserInformation="getUserInformation"></TimeTask>
    <SendCard v-if="isShowSendCard" :isShow="isShowSendCard" :cardsHavenNumList="cardsHavenNumList" :sendNum="sendNum" @closePopups="closePopups" @getUserInformation="getUserInformation"></SendCard>
    <ReceiveCard v-if="isShowReceiveCard" :isShow="isShowReceiveCard" @closePopups="closePopups" @getUserInformation="getUserInformation"></ReceiveCard>
  </div>
</template>

<script>
import TextSwipe from './components/textSwipe.vue' // 文字轮播图
import TurnCard from './components/turnCard.vue' // 翻卡
import PrizePoolPopup from './components/prizePoolPopup.vue' // 奖池
import RecordsPopup from './components/recordsPopup.vue' // 记录
import AcquirePopup from './components/acquirePopup.vue' // 获取（奖励）弹窗
import TimeTask from './components/timeTask.vue' // 限时任务组件
import { getPageData } from '@/pages/whiteValentine/api/index.js'
import SendCard from './components/sendCard.vue' // 送卡
import ReceiveCard from './components/receiveCard.vue' // 收卡

export default {
  name: 'LoveFlop',
  components: {
    TextSwipe,
    TurnCard,
    PrizePoolPopup,
    RecordsPopup,
    AcquirePopup,
    TimeTask,
    SendCard,
    ReceiveCard
  },
  data() {
    return {
      loveNum: 0, // 剩余爱心数
      diamondUsedNum: 0, // 已消费钻石数
      swipeList: [], // 文字轮播图数组
      cardsTurnList: [{ id: 1, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 2, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 3, storey_num: 1, use_num: 1, is_lock: true, is_flip: false, award: [] }, { id: 4, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 5, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 6, storey_num: 2, use_num: 2, is_lock: false, is_flip: false, award: [] }, { id: 7, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }, { id: 8, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }, { id: 9, storey_num: 3, use_num: 3, is_lock: false, is_flip: false, award: [] }], // 翻卡数组
      isFirstFree: false, // 首次免费次数是否还在
      turnOneNeed: 1, // 一次翻1张所需
      turnAllNeed: 18, // 一次翻全部所需
      cardsHavenNumList: [{ card_id: 1, num: 0, name: 'L' }, { card_id: 2, num: 0, name: 'O' }, { card_id: 3, num: 0, name: 'V' }, { card_id: 4, num: 0, name: 'E' }], // 拥有的卡牌数组
      cardsHavenSuit: 0, // 拥有的一套卡牌的数量
      claimPrizeList: [{ id: 1, limit: 1, need_num: 5, is_all: true, award: { id: 5110, type: 'title', nums: false, name: '永久铭牌', icon: 'mp_tglr.gif' }, exchange_num: 0 }, { id: 2, limit: 20, need_num: 2, is_all: true, award: { id: 0, type: 'rune', nums: 1, name: '随机橙色符石', icon: 'sjcsfs_120_120.png' }, exchange_num: 0 }, { id: 3, limit: 30, need_num: 1, is_all: true, award: { id: 0, type: 'pretty_card', nums: 50, name: '靓号券', icon: 'lhq_120_120.png' }, exchange_num: 0 }, { id: 4, limit: -1, need_num: 1, is_all: false, award: { id: 0, type: '', nums: 0, name: '自选奖励', icon: 'btn_zx.png' }, exchange_num: 0 }], // 兑换列表
      isShowPrizePoolPopup: false, // 奖池说明弹窗
      isShowRecordsPopup: false, // 奖品记录弹窗
      isShowAcquirePopup: false, // 获取（奖励）弹窗
      configAcquirePopup: {}, // 获取（奖励）弹窗配置数据
      chooseOneHaven: {}, // 多选一已选奖励
      isShowTimeTask: false, // 是否存在限时任务
      configTimeTask: {}, // 限时任务参
      isShowSendCard: false, // 送卡弹窗
      sendNum: 0, // 今日已送卡数
      isShowReceiveCard: false, // 收卡弹窗
      receiveNum: 0 // 收卡角标
    }
  },
  computed: {},
  created() {
    this.getUserInformation()
  },
  mounted() {
  },
  methods: {
    /**
     * 埋点
     */
    thinkings(module) {
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: module,
          module: '恋爱翻牌'
        }
      )
    },
    /**
     * 获取用户信息
     */
    getUserInformation() {
      console.log('获取用户信息')
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno === 0) {
          this.loveNum = res.data.love_num
          this.diamondUsedNum = res.data.tot_consume_masonry
          this.swipeList = res.data.award_list
          this.cardsTurnList = res.data.flip_card_list
          this.isFirstFree = res.data.is_free
          this.turnOneNeed = res.data.flip_one_num
          this.turnAllNeed = res.data.flip_all_num
          this.cardsHavenNumList = res.data.love_card_list
          let minArry = []
          for (let it of this.cardsHavenNumList) {
            minArry.push(it.num)
          }
          this.cardsHavenSuit = Math.min(...minArry)
          this.claimPrizeList = res.data.exchange_list
          if (res.data.task_info.id) {
            this.startTimeTask(res.data.task_info)
          }
          // console.log('this.isShowTimeTask:', this.isShowTimeTask)
          this.receiveNum = res.data.receive_num
          this.sendNum = res.data.send_num
          if (this.chooseOneHaven.id) {
            this.claimPrizeList[3].award.icon = this.chooseOneHaven.icon
            this.$set(this.claimPrizeList[3].award, 'tip', this.chooseOneHaven.tip)
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    acquireBtnCk() {
      console.log('获取')
      this.thinkings('获取')
      this.configAcquirePopup = {
        type: 1,
        titleImage: 'tk_6_03.png',
        params: {
          diamondNum: this.diamondUsedNum
        }
      }
      this.isShowAcquirePopup = true
    },
    prizePoolCk() {
      console.log('奖池')
      this.thinkings('奖池')
      this.isShowPrizePoolPopup = true
    },
    // 翻卡组件所需方法
    recordsBtnCk() {
      console.log('记录')
      this.thinkings('记录')
      this.isShowRecordsPopup = true
    },
    // ·················
    sendCardCk() {
      console.log('送卡')
      this.isShowSendCard = true
    },
    receiveCardCk() {
      console.log('收卡')
      this.isShowReceiveCard = true
    },
    /**
     * 判断是否可以兑换
     */
    judegExchange(item) {
      let judge = true
      // 判断兑换是否已达上限
      if (item.exchange_num == item.limit) {
        judge = false
        return judge
      }
      // 判断已有卡牌套数是否满足所需卡牌套数
      if (this.cardsHavenSuit < item.need_num) {
        judge = false
        this.$toast('卡牌不足')
        return judge
      }
      return judge
    },
    replaceImg(item) {
      // console.log(this.claimPrizeList)
      this.chooseOneHaven = { id: item.id, icon: item.icon, tip: item.tip }
      this.claimPrizeList[3].award.icon = this.chooseOneHaven.icon
      this.$set(this.claimPrizeList[3].award, 'tip', this.chooseOneHaven.tip)
    },
    /**
     * 兑换
     */
    exchangeImgCk(item) {
      if (item.id == 4) {
        this.exchangeBtnCk(item, 1)
      }
    },
    exchangeBtnCk(item, type4ImgCk) {
      if (item.id == 1 && this.judegExchange(item)) {
        // console.log(1)
        getPageData({ type: 'love_card_exchange', mark: { id: 1, num: 1 } }).then((res) => {
          this.open2(res.data)
        })
      } else if ((item.id == 2 || item.id == 3) && this.judegExchange(item)) {
        // console.log(item)
        this.configAcquirePopup = {
          type: 3,
          titleImage: 'tk_6_11.png',
          params: {
            isSuit: true,
            id: item.id,
            ownedNum: this.cardsHavenSuit,
            needNum: item.need_num,
            aPart: item.award.nums,
            exchangeLimite: item.limit - item.exchange_num,
            icon: item.award.icon,
            open2: this.open2,
            open6: this.open6
          }
        }
        this.isShowAcquirePopup = true
      } else if (item.id == 4) {
        // 判断是否还有卡牌
        let judge4 = false
        for (let it of this.cardsHavenNumList) {
          if (it.num > 0) {
            judge4 = true
            break
          }
        }
        console.log('judge4', judge4)
        // if (judge4) {
        // console.log(4)
        if (type4ImgCk || !this.chooseOneHaven.id) {
          this.configAcquirePopup = {
            type: 5,
            titleImage: 'tk_6_13.png',
            params: {
              list: [{ id: 4, icon: 'ljs_120_120.png', tip: '+80' }, { id: 5, icon: 'jb_120_120.png', tip: '+15万' }, { id: 6, icon: 'fsjc_120_120.png', tip: '+80' }],
              isJudge4: judge4,
              isType4ImgCk: type4ImgCk,
              open3: this.open3
            }
          }
          this.isShowAcquirePopup = true
        } else {
          let msg = {
            id: this.chooseOneHaven.id,
            needNum: 1,
            aPart: this.chooseOneHaven.tip,
            icon: this.chooseOneHaven.icon
          }
          this.open3(msg, judge4, type4ImgCk)
        }
        // } else {
        //   this.$toast('卡牌不足')
        // }
      }
    },
    /**
     * 打开type2弹窗
     */
    open2(item) {
      // console.log('open2')
      this.isShowAcquirePopup = false
      this.configAcquirePopup = {
        type: 2,
        titleImage: 'tk_6_12.png',
        params: {
          list: item
        }
      }
      this.isShowAcquirePopup = true
      this.getUserInformation()
    },
    /**
     * 打开type6弹窗
     */
    open6(type) {
      this.isShowAcquirePopup = false
      this.configAcquirePopup = {
        type: 6,
        titleImage: 'tk_6_18.png',
        params: {
          showType: type
        }
      }
      this.isShowAcquirePopup = true
      this.getUserInformation()
    },
    /**
     * 打开type3弹窗
     */
    open3(item, judge4, type4ImgCk) {
      // console.log('judge4', judge4)
      // console.log('type4ImgCk', type4ImgCk)
      if (!judge4) {
        if (type4ImgCk) {
          this.closePopups()
        } else {
          this.$toast('卡牌不足')
        }
      } else {
        this.isShowAcquirePopup = false
        let sum = 0
        for (let it of this.cardsHavenNumList) {
          sum = sum + Number(it.num)
        }
        this.configAcquirePopup = {
          type: 3,
          titleImage: 'tk_6_11.png',
          params: {
            isSuit: false,
            id: item.id,
            ownedNum: sum,
            needNum: item.needNum,
            aPart: item.aPart,
            exchangeLimite: 1000,
            icon: item.icon,
            isOpen4: this.isOpen4
          }
        }
        this.isShowAcquirePopup = true
      }
    },
    /**
     * 打开type4弹窗
     */
    isOpen4(id, num) {
      console.log(id, num)
      // 判断是否弹出二次提示框
      let tipGo = this.judgeTipGo(num)
      console.log('tipGo:', tipGo)
      // 执行
      if (tipGo == 0) {
        // console.log(1111)
        getPageData({ type: 'love_card_exchange', mark: { id, num } }).then((res) => {
          this.open2(res.data)
        })
      } else {
        this.configAcquirePopup = {
          type: 4,
          titleImage: 'tk_6_18.png',
          params: {
            tip1: tipGo == 1 ? '当前选择将会' : '当前选择将会消耗',
            tip2: tipGo == 1 ? '拆除成套卡牌' : '稀有卡牌E',
            id4: id,
            num4: num,
            open2: this.open2
          }
        }
        this.isShowAcquirePopup = true
      }
    },
    /**
     * 判断是否二次提示
     */
    judgeTipGo(num) {
      // console.log('num:', num)
      let tipGo = 0
      let cardsCanUse = 0 // 可用卡数量
      for (let it of this.cardsHavenNumList) {
        cardsCanUse = cardsCanUse + (Number(it.num) - this.cardsHavenSuit)
      }
      // console.log('cardsCanUse:', cardsCanUse)
      if (cardsCanUse < num) {
        tipGo = 1
        return tipGo
      } else {
        let list = JSON.parse(JSON.stringify(this.cardsHavenNumList))
        for (let i = 1; i <= num; i++) {
          // console.log(i)
          let maxCard = 0
          let maxCardId = 1
          for (let item of list) {
            if (maxCard < Number(item.num)) {
              maxCard = Number(item.num)
              maxCardId = item.card_id
            }
          }
          // console.log('消耗的卡id为', maxCardId)
          if (maxCardId == 4) {
            tipGo = 2
            return tipGo
          }
          list[maxCardId - 1].num--
          // console.log('消耗的卡牌的剩余数量', list[maxCardId - 1].num)
        }
      }
      return tipGo
    },
    /**
     * 关闭所有弹窗
     */
    closePopups() {
      this.isShowPrizePoolPopup = false
      this.isShowRecordsPopup = false
      this.isShowAcquirePopup = false
      this.isShowSendCard = false
      this.isShowReceiveCard = false
    },
    /**
     * 限时任务(firstCome:首次触发)
     */
    startTimeTask(task, firstCome) {
      // console.log(task)
      this.configTimeTask = task
      if (firstCome) {
        this.$set(this.configTimeTask, 'firstCome', true)
      }
      // this.configTimeTask.end_time = -1
      // this.configTimeTask.num = 1
      // this.configTimeTask.need_num = 1
      this.isShowTimeTask = true
    },
    endTimeTask() {
      this.isShowTimeTask = false
      this.configTimeTask = {}
      // this.getUserInformation()
    }
  }
}
</script>

<style scoped lang="scss">
.LoveFlop {
  position: relative;
  width: 750px;
  color: #ffffff;
  .flipCard{
    position: relative;
    width: 100%;
    min-height: 766px;
    border-image-source: url('@/pages/whiteValentine/assets/mian_bg.png');
    border-image-slice: 610 0 75 0 fill;
    border-image-width: 610px 0 75px 0;
    .title{
      position: absolute;
      width: 441px;
      height: 92px;
      background: url('@/pages/whiteValentine/assets/tt_08.png') no-repeat;
      background-size: 100% 100%;
      left: 50%;
      top: 70px;
      transform: translate(-50%);
    }
    .residualLove{
      position: absolute;
      width: 362px;
      height: 48px;
      background: linear-gradient(90deg, #DF7472, #F19C92);
      border-radius: 24px;
      top: 190px;
      left: 40px;
      padding-left: 20px;
      font-size: 28px;
      line-height: 48px;
      .loveIcon{
        width: 42px;
        height: 34px;
        margin: 0 5px;
      }
      .acquireBtn{
        position: absolute;
        width: 116px;
        height: 52px;
        background: url('@/pages/whiteValentine/assets/btn_hq.png') no-repeat;
        background-size: 100% 100%;
        left: 290px;
        top: 0px;
      }
    }
    .PrizePool{
      position: absolute;
      width: 132px;
      height: 58px;
      background: url('@/pages/whiteValentine/assets/btn_jc.png') no-repeat;
      background-size: 100% 100%;
      left: 580px;
      top: 188px;
    }
    .swipeDiv{
      position: absolute;
      width: 650px;
      height: 68px;
      background: url('@/pages/whiteValentine/assets/bg_gd.png') no-repeat;
      background-size: 100% 100%;
      left: 50%;
      transform: translate(-50%);
      top: 270px;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
    .cardDiv{
      width: 680px;
      height: 2000px; // 该行控制整个恋爱翻牌区高度
      margin: 0 auto;
      padding-top: 360px;
      // background-color: #F19C92;
      .rule-text{
        width: 605px;
        margin-left: 40px;
        i{
          color: #8994D9;
        }
        .loveIcon{
          width: 42px;
          height: 34px;
          margin: 0 5px;
        }
      }
    }
  }
  .claimPrize{
    position: relative;
    width: 100%;
    min-height: 766px;
    border-image-source: url('@/pages/whiteValentine/assets/mian_bg.png');
    border-image-slice: 610 0 75 0 fill;
    border-image-width: 610px 0 75px 0;
    .title{
      position: absolute;
      width: 441px;
      height: 92px;
      background: url('@/pages/whiteValentine/assets/tt_09.png') no-repeat;
      background-size: 100% 100%;
      left: 50%;
      top: 70px;
      transform: translate(-50%);
    }
    .interactionCard{
      width: 100%;
      height: 300px;
      padding: 200px 40px 0 40px;
      display: flex;
      justify-content: space-between;
      .sendCard{
        width: 156px;
        height: 88px;
        background: url('@/pages/whiteValentine/assets/btn_sk_02.png') no-repeat;
        background-size: 100% 100%;
      }
      .receiveCard{
        width: 156px;
        height: 88px;
        background: url('@/pages/whiteValentine/assets/btn_sk_01.png') no-repeat;
        background-size: 100% 100%;
        .cornerMark{
          width: 40px;
          height: 40px;
          background: linear-gradient(90deg, #DF7472, #F19C92);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          float: right;
        }
      }
    }
    .cardsNumDiv{
      width: 100%;
      height: 250px;
      padding: 0 30px 0 30px;
      // background-color: #F19C92;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cardNum{
        width: 174px;
        height: 234px;
        &:nth-child(1) {
          background: url('@/pages/whiteValentine/assets/card_l_an.png') no-repeat;
          background-size: 100% 100%;
          &.active{
            background: url('@/pages/whiteValentine/assets/card_l.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(2) {
          background: url('@/pages/whiteValentine/assets/card_o_an.png') no-repeat;
          background-size: 100% 100%;
          &.active{
            background: url('@/pages/whiteValentine/assets/card_o.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(3) {
          background: url('@/pages/whiteValentine/assets/card_v_an.png') no-repeat;
          background-size: 100% 100%;
          &.active{
            background: url('@/pages/whiteValentine/assets/card_v.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(4) {
          background: url('@/pages/whiteValentine/assets/card_e_an.png') no-repeat;
          background-size: 100% 100%;
          &.active{
            background: url('@/pages/whiteValentine/assets/card_e.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        .numDesignator{
          width: 34px;
          height: 34px;
          background: linear-gradient(90deg, #DF7472, #F19C92);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 21px;
          float: right;
        }
      }
    }
    .claimPrizeDiv{
      width: 100%;
      height: 740px;
      padding: 10px 30px 50px 30px;
      // background-color: #F19C92;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .prizeItem{
        width: 660px;
        height: 160px;
        background: linear-gradient(-90deg, #F6CED1, #F696A8);
        border-radius: 12px;
        border: 2px solid #D97683;
        position: relative;
        .prizeIcon{
          width: 240px;
          height: 124px;
          background: linear-gradient(180deg, #FFEFF3, #FFE4E1);
          border-radius: 10px 0px 0px 0px;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .titleImg{
            width: 210px;
            height: 96px;
          }
          .otherImg{
            width: 120px;
            height: 120px;
          }
          .specialDes{
            font-size: 24px;
            color: #B35553;
            position: absolute;
            top: 90px;
            right: 10px;
          }
        }
        .prizeDes{
          width: 240px;
          height: 36px;
          background: #C16D6F;
          border-radius: 0px 0px 0px 10px;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          color: #FFF1E5;
        }
        .needDesDiv{
          font-size: 28px;
          color: #FFFFFF;
          position: absolute;
          top: 30px;
          left: 270px;
          :deep em{
            color: #FFF79A;
          }
        }
        .exchangeLimitDiv{
          color: #FFF79A;
          font-size: 24px;
          position: absolute;
          top: 100px;
          left: 270px;
        }
        .exchangeBtn{
          width: 120px;
          height: 56px;
          position: absolute;
          top: 50px;
          left: 520px;
          background: linear-gradient(0deg, #F4BA6E, #ED9944);
          border-radius: 28px;
          border: 2px solid #FFFFFF;
          font-size: 28px;
          line-height: 50px;
          text-align: center;
          &::after{
            content: '兑换';
          }
          &.limited{
            background: #c9c9c9;
            &::after{
              content: '已兑完';
            }
          }
        }

      }
    }

  }
  .bottomDiv{
    height: 170px;
  }
}
</style>
