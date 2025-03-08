<template>
  <div class='pageComp'>
    <OutBox class="knockIceBox" :title="'title_5.png'">
      <div class="ki_ruleBtn" @click="ruleBtnCk"></div>
      <div class="ki_leftNum">拥有的<img :src="IconPath('cz_37_36.png')"/>:&ensp;{{hammer_num}}</div>
      <div class="ki_rightnum">已消费钻石:&ensp;{{consume_num}}</div>
      <div class="ki_swipeDiv">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="ki_spGift" v-if="gift_info&&gift_info.id" @click="spGiftCk"></div>
      <div class="ki_reward1">
        <PublicImg :imgName="'ts_zxzy.svga'" :imgType="'mic'"></PublicImg>
      </div>
      <div class="ki_reward1_mark">+1天</div>
      <div class="ki_reward2" @click="reward2Preview"></div>
      <div class="ki_reward3" @click="giftPreviewCk"></div>
      <div class="ki_recordBtn" @click="recordBtnCk">我的记录</div>
      <div class="ki_leftFinallyTime">再敲<i>{{pre_num}}</i>次必出【返场称号礼包】+1</div>
      <div :class="['ki_pickOne',free_status?'free':null]" @click="pickBtnCk(1)"></div>
      <div class="ki_pickTen" @click="pickBtnCk(2)"></div>
      <div class="ki_text">
        <div class="rules-text">
          <ul>
            <li><span></span>活动期间每消费200钻石自动获得<img :src="IconPath('cz_37_36.png')"/>x1</li>
            <li><span></span>敲冰块有机会获得限定奖励和返场称号礼包，若返</li>
            <li>场称号已全部拥有则自动转化为500绿晶石</li>
            <li><span></span>求婚时购买求婚物品的消费计算在内</li>
          </ul>
        </div>
      </div>
      <div class="ki_otherTitle"></div>
      <div class="ki_otherDiv">
        <div class="ki_otherDiv_text1">收到1个【西瓜棒冰】自动获得<img :src="IconPath('cz_37_36.png')"/>x1</div>
        <div class="ki_otherDiv_text2">每日限完成3次（{{challenge_num}}/3）</div>
        <div class="ki_otherDiv_text3">向自己赠送钻石礼物不计算在内</div>
      </div>
    </OutBox>
    <OutBox class="progressBox" :title="'title_6.png'" :hasCostume="true">
      <div class="pickedStarTimeDiv">已敲冰块:&ensp;{{tot_hammer_num}}次</div>
      <div class="pickStarTip">累计敲冰块达到门槛即可领取相应奖励</div>
      <StepProgress :tot_hammer_num="tot_hammer_num" :tot_list="tot_list" @openReceiveAwardsPopup="openReceiveAwardsPopup" @backpackFull="backpackFull"></StepProgress>
    </OutBox>
    <OutBox class="titlesCollectBox" :title="'title_7.png'" :hasCostume="true">
      <div class="tc_reward">
        <div class="tc_rewardIcon">
          <PublicImg :imgName="spspReward.icon" :imgType="spspReward.type"></PublicImg>
        </div>
        <div class="tc_rewardText">{{spspReward.text}}</div>
        <div class="tc_rewardDesc">{{spspReward.desc}}</div>
        <div class="tc_rewardNum">({{spspReward.num}}/{{spspReward.need_num}})</div>
        <div :class="['tc_rewardBtn', `status${spspReward.has_right}`]" @click="spspRewardCk">{{spspReward.has_right==0?'未完成':spspReward.has_right==1?'领取':spspReward.has_right==2?'已领取':null}}</div>
        <div class="tc_rewardTip" @click="spRewardTipCk"></div>
      </div>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <GiftPopup v-if="isShowGiftPopup" :config="gift_info" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></GiftPopup>
    <SpRewardTipPopup v-if="isShowSpRewardTipPopup" @clickClose="clickClose"></SpRewardTipPopup>
    <TitlesPreviewPopup v-if="isShowTitlesPreviewPopup" :config="title_list" @clickClose="clickClose"></TitlesPreviewPopup>
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="clickClose"></BackpackFull>
  </div>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api'
import { compareVersions } from '@/pages/summerParty2024/utils/toApp'
import TextSwipe from './components/textSwipe.vue'
import PreviewPopup from './components/previewPopup.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import GiftPopup from './components/giftPopup.vue'
import SpRewardTipPopup from './components/spRewardTipPopup.vue'
import TitlesPreviewPopup from './components/titlesPreviewPopup.vue'
import BackpackFull from './components/backpackFull.vue'

export default {
  name: 'summerDraw',
  components: {
    TextSwipe,
    PreviewPopup,
    StepProgress,
    RulesPopup,
    RecordsPopup,
    ReceiveAwardsPopup,
    GiftPopup,
    SpRewardTipPopup,
    TitlesPreviewPopup,
    BackpackFull
  },
    data() {
      return {
        hammer_num: 0, // 可抽奖次数
        consume_num: 0, // 已消费钻石
        swipeList: [], // 文字轮播
        gift_info: {
          id: 1,
          awards: [
            { id: 1, type: 'mic', text: '头饰+1天', icon: 'ts_zlzx.svga' },
            { id: 2, type: 'tool', text: '+1', icon: 'cz_120_120.png', left_mark: '赠' }
          ],
          price: 99
        }, // 特惠礼包信息
        title_list: [], // 称号预览弹窗的称号信息
        pre_num: 200, // 终奖所需剩余次数
        free_status: true, // 是否首次免费
        challenge_num: 0, // 每日挑战完成次数
        tot_hammer_num: 0, // 已敲次数
        tot_list: [
          { id: 1, need_num: 12, award: { id: 0, type: 'luck_key', nums: 1, name: '钥匙', text: '+1', icon: 'xyys_120_120.png' }, has_right: 0 },
          { id: 2, need_num: 30, award: { id: 171, type: 'tool', nums: 3, name: '世界喇叭', text: '+3', icon: 'sjlb_120_120.png' }, has_right: 0 },
          { id: 3, need_num: 66, award: { id: 158, type: 'tool', nums: 3, name: '藏宝图', text: '+2', icon: 'cbt_120_120.png' }, has_right: 0 },
          { id: 4, need_num: 126, award: { id: 0, type: 'rune', nums: 1, name: '', text: '+1', icon: 'sjfs_120_120.png' }, has_right: 0 },
          { id: 5, need_num: 226, award: { id: 159, type: 'tool', nums: 1, name: '黄金藏宝图', text: '+1', icon: 'hjcbt_120_120.png' }, has_right: 0 },
          { id: 6, need_num: 326, award: { id: 6, type: 'world_msg_skins', nums: 7, name: '夏日派对', text: '+7天', icon: 'xrpd_120_120.png' }, has_right: 0 }
        ], // 进度条列表
        spspReward: {
          type: 'voice',
          icon: 'sb_tsqs',
          text: '声波+7天',
          desc: '收集称号套系【夏日时光】',
          need_num: 8,
          num: 0,
          has_right: 0
        },

        isShowPreviewPopup: false, // 预览弹窗
        configPreviewPopup: { type: '', img: '', tip1: '', tip2: '' },
        isShowRulesPopup: false, // 规则说明弹窗
        isShowRecordsPopup: false, // 我的记录弹窗
        isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
        configReceiveAwardsPopup: [],
        isShowGiftPopup: false, // 特惠礼包弹窗
        isShowSpRewardTipPopup: false, // 称号收集奖励tip弹窗
        isShowTitlesPreviewPopup: false, // 称号预览弹窗
        isShowBackpackFull: false, // 背包已满弹窗
        typeBackpackFull: 1
      }
    },
  computed: {},
  watch: {},
  created() {
    this.getHomePage()
  },
  mounted() {},
  methods: {
    /**
     * 获取首页
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.hammer_num = res.data.hammer_num
          this.consume_num = res.data.consume_num
          this.swipeList = res.data.rate_list
          this.gift_info = res.data.gift_info
          this.title_list = res.data.title_list
          this.pre_num = res.data.pre_num
          this.free_status = res.data.free_status
          this.challenge_num = res.data.challenge_num
          this.tot_hammer_num = res.data.tot_hammer_num
          this.tot_list = res.data.tot_list
          this.spspReward.num = res.data.title_num
          this.spspReward.has_right = res.data.title_status
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPreviewPopup = false
      this.isShowRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowReceiveAwardsPopup = false
      this.isShowGiftPopup = false
      this.isShowSpRewardTipPopup = false
      this.isShowTitlesPreviewPopup = false
      this.isShowBackpackFull = false
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
        this.getHomePage()
      })
    },
    /**
     * 符石背包已满弹框
     * @param {Number} errno -5: 符石背包已满 -6: 符石背包已满，请升级到最新版本分解符石
     */
    backpackFull(errno) {
      const app_version = this.$store.state.app_version
      const flag = compareVersions(app_version, '5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      this.openBackpackFullPopup(errno == -5 ? 1 : 2)
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
        this.getHomePage()
      })
    },
    /**
     * 敲冰块规则说明弹窗
     */
    ruleBtnCk() {
      console.log('敲冰块规则说明')
      this.isShowRulesPopup = true
    },
    /**
     * 每日特惠礼包
     */
    spGiftCk() {
      console.log('每日特惠礼包')
      this.isShowGiftPopup = true
    },
    /**
     * 称号点击预览
     */
    reward2Preview() {
      console.log('称号点击预览')
      this.isShowTitlesPreviewPopup = true
    },
    /**
     * 礼物点击预览
     */
    giftPreviewCk() {
      console.log('预览')
      this.configPreviewPopup = {
        type: 'car',
        img: 'car_xgc.svga',
        tip1: '雪糕车·座驾'
      }
      this.isShowPreviewPopup = true
    },
    /**
     * 我的记录
     */
    recordBtnCk() {
      console.log('我的记录')
      this.isShowRecordsPopup = true
    },
    /**
     * 敲冰块
     */
    pickBtnCk(type) {
      console.log(10 ** (type - 1))
      if ((type == 1 && this.free_status) || this.hammer_num >= 10 ** (type - 1)) {
        getPageData({ type: 'summer_knock_ice', mark: type }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            this.openReceiveAwardsPopup(res.data.award_list)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('锤子数量不足')
      }
    },
    /**
     * 收集奖励领取
     */
    spspRewardCk() {
      console.log(this.spspReward.has_right)
      if (this.spspReward.has_right == 1) {
        getPageData({ type: 'summer_rev_title_award' }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            this.openReceiveAwardsPopup(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 称号收集奖励tip
     */
    spRewardTipCk() {
      console.log('称号收集奖励tip')
      this.isShowSpRewardTipPopup = true
    }
  }
}
</script>
<style lang='scss' scoped>
.pageComp{
  .knockIceBox{
    padding-top: 70px;
    width: 730px;
    height: 1551px;
    background: url('@/pages/summerParty2024/assets/mk4_7.png') no-repeat left top/100% 100%;
    border-image-source: none;
    .ki_ruleBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/summerParty2024/assets/mk2_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 30px;
      top: 10px;
    }
    .ki_leftNum{
      padding: 10px 20px;
      background: #466BD5;
      border-radius: 24px 24px 24px 0px;
      font-size: 24px;
      position: absolute;
      left: 5px;
      top: 80px;
      img{
        width: 37px;
        height: 36px;
        margin: 0 5px;
      }
    }
    .ki_rightnum{
      padding: 10px 20px;
      background: #466BD5;
      border-radius: 24px 24px 0px 24px;
      font-size: 24px;
      line-height: 36px;
      position: absolute;
      right: 5px;
      top: 80px;
    }
    .ki_swipeDiv{
      width: 680px;
      height: 71px;
      background: url('@/pages/summerParty2024/assets/mk4_1.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 140px;
      padding: 10px 10px;
    }
    .ki_spGift{
      width: 178px;
      height: 163px;
      background: url('@/pages/summerParty2024/assets/mk4_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 0px;
      top: 190px;
    }
    .ki_reward1{
      width: 120px;
      height: 120px;
      position: absolute;
      right: 80px;
      top: 520px;
    }
    .ki_reward1_mark{
      width: 79px;
      height: 35px;
      background: url('@/pages/summerParty2024/assets/mk4_8.png') no-repeat left top/100% 100%;
      font-size: 20px;
      color: #158FFF;
      text-align: center;
      line-height: 35px;
      position: absolute;
      right: 50px;
      top: 510px;
    }
    .ki_reward2{
      width: 130px;
      height: 130px;
      position: absolute;
      left: 100px;
      top: 400px;
    }
    .ki_reward3{
      width: 200px;
      height: 180px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 490px;
    }
    .ki_recordBtn{
      width: 170px;
      height: 52px;
      background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
      border-radius: 26px;
      border: 3px solid #FFFFFF;
      font-weight: 400;
      font-size: 28px;
      color: #A9792C;
      text-align: center;
      line-height: 52px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 740px;
    }
    .ki_leftFinallyTime{
      width: 680px;
      height: 91px;
      background: url('@/pages/summerParty2024/assets/mk4_3.png') no-repeat left top/100% 100%;
      text-align: center;
      font-size: 26px;
      line-height: 91px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 820px;
    }
    .ki_pickOne{
      width: 293px;
      height: 151px;
      background: url('@/pages/summerParty2024/assets/mk4_5.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50px;
      top: 900px;
      &.free{
        background: url('@/pages/summerParty2024/assets/mk4_4.png') no-repeat left top/100% 100%;
      }
    }
    .ki_pickTen{
      width: 293px;
      height: 151px;
      background: url('@/pages/summerParty2024/assets/mk4_6.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 50px;
      top: 900px;
    }
    .ki_text{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1050px;
    }
    .ki_otherTitle{
      width: 570px;
      height: 31px;
      background: url('@/pages/summerParty2024/assets/mk4_11.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1250px;
    }
    .ki_otherDiv{
      width: 684px;
      height: 247px;
      background: url('@/pages/summerParty2024/assets/mk4_12.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1270px;
      .ki_otherDiv_text1{
        font-size: 28px;
        color: #FFFFFF;
        position: absolute;
        left: 170px;
        top: 70px;
        img{
          width: 37px;
          height: 36px;
        }
      }
      .ki_otherDiv_text2{
        font-weight: 400;
        font-size: 24px;
        color: #FFEF85;
        position: absolute;
        left: 170px;
        top: 120px;
      }
      .ki_otherDiv_text3{
        font-weight: 400;
        font-size: 22px;
        color: #8FFFEF;
        position: absolute;
        left: 240px;
        top: 156px;
      }
    }
  }
  .progressBox{
    margin-top: 140px;
    padding-top: 90px;
    width: 726px;
    height: 511px;
    background: url('@/pages/summerParty2024/assets/mk4_20.png') no-repeat left top/100% 100%;
    border-image-source: none;
    .pickedStarTimeDiv{
      width: 253px;
      height: 48px;
      background: #466BD5;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #fff;
      margin: 10px auto 20px auto;
      text-align: center;
    }
  }
  .titlesCollectBox{
    margin-top: 140px;
    padding-top: 120px;
    width: 726px;
    height: 333px;
    background: url('@/pages/summerParty2024/assets/mk4_21.png') no-repeat left top/100% 100%;
    border-image-source: none;
    .tc_reward{
      width: 627px;
      height: 160px;
      background: linear-gradient(-90deg, #FDE180, #65CBFB, #5792FF);
      border-radius: 20px;
      border: 4px solid #C2F9FF;
      margin: 0 auto;
      position: relative;
      .tc_rewardIcon{
        width: 218px;
        height: 124px;
        padding: 0 45px;
        background: linear-gradient(180deg, #FFFACD, #FFFFFF);
        border-radius: 18px 0px 0px 0px;
        position: absolute;
        left: 0;
        top: 0;
      }
      .tc_rewardText{
        width: 218px;
        height: 36px;
        background: #466BD5;
        border-radius: 0px 0px 0px 18px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 36px;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .tc_rewardDesc{
        font-weight: 500;
        font-size: 28px;
        color: #FFFFFF;
        position: absolute;
        left: 240px;
        top: 30px;
      }
      .tc_rewardNum{
        font-weight: 400;
        font-size: 28px;
        color: #FFEA88;
        position: absolute;
        left: 240px;
        top: 80px;
      }
      .tc_rewardBtn{
        width: 120px;
        height: 48px;
        border-radius: 24px;
        border: 3px solid #FFFFFF;
        font-size: 28px;
        line-height: 48px;
        text-align: center;
        position: absolute;
        right: 20px;
        bottom: 15px;
        &.status0{
          background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
          color: #4D7DDD;
        }
        &.status2{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          color: #fff;
        }
        &.status1{
          background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          color: #A9792C;
        }
      }
      .tc_rewardTip{
        width: 32px;
        height: 32px;
        background: url('@/pages/summerParty2024/assets/mk4_22.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
  }
}
</style>
