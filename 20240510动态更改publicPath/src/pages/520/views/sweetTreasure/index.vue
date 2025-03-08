<template>
  <div class="compo">
    <OutBox class="starFeedbackBox" :title="'title_7.png'">
      <div class="srtarRulesBtn" @click="srtarRulesBtnCk"></div>
      <div class="starIcon"></div>
      <div :class="['receiveBtn',is_free?'yes':'no']" @click="receiveBtnCk"></div>
      <div class="rules-text">
        <ul>
          <li><span></span>每日可免费领取1颗星星，获得随机奖励</li>
          <li><span></span>领取后可在摘星星模块中增加1点【星语心愿】必出</li>
          <li>进度值</li>
        </ul>
      </div>
    </OutBox>
    <div class="pickStarBox">
      <template>
        <img :src="IconPath('title_8.png')" class="titleIcon" />
        <img :src="IconPath('back_4.png')" class="bottomLeftIcon" />
        <img :src="IconPath('back_5.png')" class="bottomRightIcon" />
      </template>
      <div class="pickRulesBtn" @click="pickRulesBtnCk"></div>
      <div class="leftPickTimeDiv">剩余摘星次数:&ensp;{{res_pick_num}}</div>
      <div class="giftSendTimeDiv">已赠送<img :src="IconPath('gift_txs.png')"/>:&ensp;{{send_num}}</div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="rewardsListArea">
        <div class="rewardItem" v-for="(item,index) in rewardsShowList" :key="index">
          <PublicImg :imgName="item.icon" :userAvatar="item.type=='mic'?$store.state.user_icon:''"></PublicImg>
        </div>
      </div>
      <div class="giftPreview" @click="giftPreviewCk"></div>
      <div class="recordDiv" @click="recordDivCk">我的记录</div>
      <div class="leftFinallyTimeDiv">再摘<i>{{pre_num}}</i>次必出【星语心愿】礼物赠送权+1天</div>
      <div class="pickOne" @click="pickOneCk"></div>
      <div class="pickTen" @click="pickTenCk"></div>
      <div class="rules-text">
        <ul>
          <li><span></span>摘星有机会获得限定头饰、气泡、戒指和<i>首款双人</i></li>
          <li><i>特效礼物【星语心愿】赠送权</i></li>
          <li><span></span>向自己赠送钻石礼物计算在内</li>
        </ul>
      </div>
    </div>
    <OutBox class="progressBox" :title="'title_9.png'" :right="false" :bottom="false">
      <div class="pickedStarTimeDiv">已摘星:&ensp;{{tot_pick_num}}次</div>
      <div class="pickStarTip">累计摘星达到门槛即可领取相应奖励</div>
      <StepProgress :tot_pick_num="tot_pick_num" :tot_pick_list="tot_pick_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>
    <SrtarRulesPopup v-if="isShowSrtarRulesPopup" @clickClose="clickClose"></SrtarRulesPopup>
    <PickRulesPopup v-if="isShowPickRulesPopup" @clickClose="clickClose"></PickRulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
  </div>
</template>

<script>
import TextSwipe from './components/textSwipe.vue'
import StepProgress from './components/stepProgress.vue'
import SrtarRulesPopup from './components/srtarRulesPopup.vue'
import PickRulesPopup from './components/pickRulesPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import PreviewPopup from './components/previewPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import { getPageData } from '@/pages/520/api/index'

export default {
  name: 'SweetTreasure',
  props: [],
  components: {
    TextSwipe,
    StepProgress,
    SrtarRulesPopup,
    PickRulesPopup,
    RecordsPopup,
    PreviewPopup,
    ReceiveAwardsPopup
  },
  data() {
    return {
      is_free: true, // 星星回馈是否可领
      res_pick_num: 0, // 剩余摘星次数
      send_num: 0, // 礼物赠送次数
      swipeList: [], // 文字轮播
      rewardsShowList: [
        { id: 1, type: 'mic', icon: 'ts_laxh.svga', name: '恋爱循环' },
        { id: 2, type: 'ring', icon: 'jz_bysf.svga', name: '比翼双飞' },
        { id: 3, type: 'chat_bubble', icon: 'qb_xdsk', name: '心动时刻' }
      ], // 奖品
      pre_num: 300, // 终奖剩余次数
      tot_pick_num: 0, // 已摘星次数
      tot_pick_list: [
        { id: 1, need_num: 30, award: { type: 'chat_bubble', id: 0, name: '钥匙', icon: 'qb_xdsk', nums: 1, text: '+3天', label: '+3天' }, has_right: 0 },
        { id: 2, need_num: 66, award: { type: 'tool', id: 106, name: '共赴山海', icon: 'cbt_120_120.png', nums: 5, text: '+1', label: '+1' }, has_right: 0 },
        { id: 3, need_num: 88, award: { type: 'tool_key', id: 129, name: '星辰大海', icon: 'xyys_120_120.png', nums: 7, text: '+1', label: '+1', mark: 'tk_14.png' }, has_right: 0 },
        { id: 4, need_num: 188, award: { type: 'pst_privilege', id: 5120, name: '航海王', icon: 'jtlppq_120_120.png', nums: false, text: '+7天', label: '+7天' }, has_right: 0 },
        { id: 5, need_num: 288, award: { type: 'tool', id: 5120, name: '航海王', icon: 'cbt_120_120.png', nums: false, text: '+3', label: '+3' }, has_right: 0 },
        { id: 6, need_num: 388, award: { type: 'car', id: 5120, name: '航海王', icon: 'lgxyc_120_120.png', nums: false, text: '+15天', label: '+15天' }, has_right: 0 }
      ], // 进度条列表
      isShowSrtarRulesPopup: false, // 星星回馈规则弹窗
      isShowPickRulesPopup: false, // 摘星星规则弹窗
      isShowRecordsPopup: false, // 我的记录弹窗
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: { type: '', img: '', tip1: '', tip2: '' },
      isShowReceiveAwardsPopup: false, // 奖励获取弹窗
      configReceiveAwardsPopup: []
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
          // console.log(res)
          this.is_free = res.data.is_free
          this.res_pick_num = res.data.res_pick_num
          this.send_num = res.data.send_num
          this.pre_num = res.data.pre_num
          this.tot_pick_num = Number(res.data.tot_pick_num)
          this.swipeList = res.data.award_list
          this.tot_pick_list = res.data.tot_pick_list
          console.log(this.tot_pick_list)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowSrtarRulesPopup = false
      this.isShowPickRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowPreviewPopup = false
      this.isShowReceiveAwardsPopup = false
    },
    /**
     * 星星回馈规则按钮
     */
    srtarRulesBtnCk() {
      console.log('星星回馈规则')
      this.isShowSrtarRulesPopup = true
    },
    /**
     * 星星回馈领取按钮
     */
    receiveBtnCk() {
      console.log('星星回馈领取')
      if (this.is_free) {
        getPageData({ type: 'pick_star_receive_free_gift' }).then((res) => {
          if (res.errno == 0) {
            this.openReceiveAwardsPopup(res.data.award_list)
            this.is_free = false
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 摘星星规则按钮
     */
    pickRulesBtnCk() {
      console.log('摘星星规则')
      this.isShowPickRulesPopup = true
    },
    /**
     * 礼物点击预览
     */
    giftPreviewCk() {
      console.log('预览')
      this.configPreviewPopup = {
        type: 'pst_privilege',
        img: 'gift_xyxy.svga',
        tip1: '星语心愿·礼物赠送权',
        tip2: '双人特效需升至5.8.8版本及以上'
      }
      this.isShowPreviewPopup = true
    },
    /**
     * 我的记录
     */
    recordDivCk() {
      console.log('我的记录')
      this.isShowRecordsPopup = true
    },
    /**
     * 摘星一次
     */
    pickOneCk() {
      console.log('摘星一次')
      getPageData({ type: 'pick_star', mark: '1' }).then((res) => {
        if (res.errno == 0) {
          this.openReceiveAwardsPopup(res.data.award_list)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 摘星十次
     */
    pickTenCk() {
      console.log('摘星十次')
      getPageData({ type: 'pick_star', mark: '2' }).then((res) => {
        if (res.errno == 0) {
          this.openReceiveAwardsPopup(res.data.award_list)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 打开获奖弹窗
     */
    openReceiveAwardsPopup(msg) {
      console.log('获奖弹窗')
      this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        this.getPageData()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .starFeedbackBox{
    // height: 600px;
    margin: 100px auto 0 auto;
    padding: 90px 0 60px 0;
    position: relative;
    .srtarRulesBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/520/assets/mk2_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 50px;
      top: 50px;
    }
    .starIcon{
      width: 255px;
      height: 257px;
      background: url('@/pages/520/assets/mk5_1.png') no-repeat left top/100% 100%;
      margin: 0 auto 0 auto;
    }
    .receiveBtn{
      width: 280px;
      height: 72px;
      border-radius: 36px;
      border: 3px solid #FFFFFF;
      margin: 0 auto 20px auto;
      font-size: 32px;
      text-align: center;
      line-height: 70px;
      &.yes{
        background: linear-gradient(0deg, #EB6C99, #FFBCD8);
        &::after{
          content: '领取';
          color: #FFFFFF;
        }
      }
      &.no{
        background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
        &::after{
          content: '已领取';
        }
      }
    }
  }
  .pickStarBox{
    width: 750px;
    height: 1507px;
    background: url('@/pages/520/assets/mk5_7.png') no-repeat left top/100% 100%;
    margin: 100px auto 0 auto;
    // padding: 90px 0 60px 0;
    position: relative;
    .titleIcon {
      width: 480px;
      height: 179px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -88px;
    }
    .bottomLeftIcon {
      width: 86px;
      height: 86px;
      position: absolute;
      left: 33px;
      bottom: -88px;
    }
    .bottomRightIcon {
      width: 122px;
      height: 181px;
      position: absolute;
      right: 63px;
      bottom: -95px;
    }
    .pickRulesBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/520/assets/mk5_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 50px;
      top: 50px;
    }
    .leftPickTimeDiv{
      padding: 10px 20px;
      background: rgb(70, 31, 129, 0.8);
      border-radius: 0px 24px 24px 0px;
      font-size: 24px;
      text-align: center;
      position: absolute;
      left: 35px;
      top: 230px;
    }
    .giftSendTimeDiv{
      padding: 0px 20px;
      background: rgb(70, 31, 129, 0.8);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 35px;
      top: 230px;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .swipeDiv{
      width: 680px;
      height: 71px;
      background: url('@/pages/520/assets/mk5_4.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 300px;
      padding: 10px 30px;
    }
    .rewardsListArea{
      width: 100%;
      height: 700px;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 400px;
      .rewardItem{
        width: 120px;
        height: 120px;
        &:nth-of-type(1) {
          position: absolute;
          left: 100px;
          top: 80px;
        }
        &:nth-of-type(2) {
          position: absolute;
          left: 540px;
          top: 350px;
        }
        &:nth-of-type(3) {
          position: absolute;
          left: 100px;
          top: 486px;
        }
      }
    }
    .giftPreview{
      width: 200px;
      height: 200px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 640px;
    }
    .recordDiv{
      width: 170px;
      height: 52px;
      background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
      border-radius: 26px;
      border: 3px solid #FFFFFF;
      font-size: 28px;
      color: #A9792C;
      text-align: center;
      line-height: 52px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1000px;
    }
    .leftFinallyTimeDiv{
      width: 680px;
      height: 91px;
      background: url('@/pages/520/assets/mk5_5.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1080px;
      font-size: 26px;
      color: #FD5DA1;
      line-height: 90px;
      text-align: center;
      i{
        color: #5E8BFF;
      }
    }
    .pickOne{
      width: 312px;
      height: 142px;
      background: url('@/pages/520/assets/mk5_8.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50px;
      top: 1160px;
    }
    .pickTen{
      width: 312px;
      height: 142px;
      background: url('@/pages/520/assets/mk5_9.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 50px;
      top: 1160px;
    }
    .rules-text{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1300px;
    }
  }
  .progressBox{
    margin: 100px auto 0 auto;
    padding: 90px 0 60px 0;
    position: relative;
    .pickedStarTimeDiv{
      width: 253px;
      height: 48px;
      background: #EB9EB7;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #96526F;
      margin: 10px auto 20px auto;
      text-align: center;
    }
  }
}
</style>
