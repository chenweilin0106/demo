<template>
  <div class="compo">
    <PublicContainer class="sailingBox">
      <div class="swipeArea">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="drawArea">
        <div class="imgShow">
          <div class="rulesBtn" @click="rulesBtnCk"></div>
          <div class="masonryShow">
            <span>剩余钻石:{{masonry}}</span>
            <div class="rechargeBtn" @click="handleRecharge"></div>
          </div>
        </div>
        <div class="drawBtnArea">
          <div :class="['drawOne', has_free?'free':'nofree']" @click="drawOneCk"></div>
          <div class="drawTen" @click="drawTenCk"></div>
        </div>
      </div>
      <div class="rewardsShowArea">
        <div class="rewardsList">
          <div class="rewardItem" v-for="(item) in rewardsShowList" :key="item.id">
            <div class="iconDiv">
              <PublicImg :imgName="item.icon"></PublicImg>
            </div>
            <div class="markIcon" v-if="item.mark">
              <PublicImg :imgName="item.mark"></PublicImg>
            </div>
            <div class="numDescDiv">{{item.numDesc}}</div>
            <div class="nameDescDiv">{{item.nameDesc}}</div>
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>花费49钻石可使游轮航行1次，每天可免费航行1次</li>
          <li><span></span>每次航行会使游轮前进10~30km，并收获神秘奖励</li>
        </ul>
      </div>
    </PublicContainer>
    <PublicContainer class="psBox" :titleIcon="'title_5.png'">
      <div class="topTip">里程达到指定景点可领取对应奖励</div>
      <div class="userMileagesDiv">
        <span>我的里程</span>
        <img :src="IconPath('mk4_18.png')" />
        <span>:&ensp;{{user_mileages}}KM</span>
      </div>
      <StepProgress :user_mileages="user_mileages" :place_checkin_info="place_checkin_info" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
      <div class="tasksArea">
        <div class="taskItem" v-for="(item) in mileage_tasks" :key="item.task_id">
          <div class="taskNameDesc">
            <span v-html="item.name_desc"></span>
            <i v-if="item.is_show">&ensp;({{item.finish}}/{{item.max}})</i>
          </div>
          <div class="taskText" v-html="item.text"></div>
          <div :class="['taskBtn', item.has_right==0?'nofin':item.has_right==1?'fin':item.has_right==2?'fined':null]" @click="taskBtnCk(item)">{{item.has_right==0?item.task_id==2?'去完成':'未完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
        </div>
      </div>
    </PublicContainer>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <SailingComPopup v-if="isShowSailingComPopup" :config="configSailingComPopup" @drawApi="drawApi" @clickClose="clickClose"></SailingComPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
  </div>
</template>

<script>
import TextSwipe from './components/textSwipe.vue' // 文字轮播图
import StepProgress from './components/stepProgress.vue'
import { getPageData } from '@/pages/mayDay2024/api/index'
import { recharge, diamondRechargePart, toChatRoom } from '@/pages/mayDay2024/utils/toApp'
import RulesPopup from './components/rulesPopup.vue'
import SailingComPopup from './components/sailingComPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'

export default {
  name: 'archipelagicTour',
  props: [],
  components: {
    TextSwipe,
    StepProgress,
    RulesPopup,
    SailingComPopup,
    ReceiveAwardsPopup
  },
  data() {
    return {
      profile_image: undefined, // 用户头像
      swipeList: [], // 文字轮播数据列表
      masonry: 1000, // 用户钻石数
      room_id: undefined, // 聊天室id 用于H5跳转App聊天室用
      has_free: false, // 是否有免费航行次数
      rewardsShowList: [
        { id: 1, nameDesc: '礼物赠送权', icon: 'xyc_120_120.png', numDesc: '+5天', mark: 'tk_15.png' },
        { id: 2, nameDesc: '藏宝图', icon: 'cbt_120_120.png', numDesc: '+1' },
        { id: 3, nameDesc: '紫晶石', icon: 'zjs_120_120.png', numDesc: '+3' },
        { id: 4, nameDesc: '精粹', icon: 'fsjc_120_120.png', numDesc: '+10' },
        { id: 5, nameDesc: '金币', icon: 'jb_120_120.png', numDesc: '+2万' },
        { id: 6, nameDesc: '靓号券', icon: 'lhq_120_120.png', numDesc: '+1' },
        { id: 7, nameDesc: '随机元宝', icon: 'yb_120_120.png', numDesc: '2万-5万' }
      ], // 奖励展示列表
      user_mileages: 0, // 用户累计的里程数
      place_checkin_info: [
        { id: 1, name: '舟山东极岛', icon: 'mk4_10_djd.png', mile: 500, awards: [{ type: 'luck_key', id: 0, name: '钥匙', icon: 'xyys_120_120.png', nums: 1, text: '钥匙', label: '+1' }, { type: 'tool', id: 1, name: '藏宝图', icon: 'cbt_120_120.png', nums: 1, text: '藏宝图', label: '+1' }], has_right: 0 },
        { id: 2, name: '厦门鼓浪屿', icon: 'mk4_10_gly.png', mile: 1500, awards: [{ type: 'mic', id: 106, name: '头饰', icon: 'ts_gfsh_02.svga', nums: 5, text: '头饰', label: '+5天' }, { type: 'tool', id: 1, name: '藏宝图', icon: 'cbt_120_120.png', nums: 1, text: '藏宝图', label: '+1' }], has_right: 0 },
        { id: 3, name: '三亚蜈支洲岛', icon: 'mk4_10_wzd.png', mile: 4000, awards: [{ type: 'pst_privilege', id: 129, name: '礼物赠送权', icon: 'xcdh_120_120.png', nums: 7, text: '礼物赠送权', label: '+7天', mark: 'tk_14.png' }, { type: 'tool', id: 2, name: '黄金藏宝图', icon: 'hjcbt_120_120.png', nums: 1, text: '黄金藏宝图', label: '+1' }], has_right: 0 },
        { id: 4, name: '北海涠洲岛', icon: 'mk4_10_wzzd.png', mile: 6666, awards: [{ type: 'title', id: 5120, name: '永久铭牌', icon: 'mp_hhw', nums: false, text: '永久铭牌', label: '永久' }, { type: 'tool', id: 2, name: '黄金藏宝图', icon: 'hjcbt_120_120.png', nums: 1, text: '黄金藏宝图', label: '+1' }], has_right: 0 }
      ], // 里程数据列表
      mileage_tasks: [
        { task_id: 1, name: '每日登录活动页面', name_desc: '每日<i>登录</i>活动页面', icon: '', text: '<i>非会员</i>里程+5KM，<i>银卡会员</i>里程+10KM\n<i>金卡会员</i>里程+15KM，<i>黑卡会员</i>里程+20KM', nums: 5, finish: 1, max: 1, is_show: 0, has_right: 1 },
        { task_id: 2, name: '每日在聊天室累计在线10分钟', name_desc: '每日在聊天室累计在线<i>10分钟</i>', icon: '', text: '里程+5KM', nums: 5, finish: 0, max: 10, is_show: 1, has_right: 0 },
        { task_id: 3, name: '每日使用5次唇齿相依', name_desc: '每日使用<i>5次</i>唇齿相依', icon: '', text: '里程+5KM', nums: 5, finish: 0, max: 5, is_show: 1, has_right: 0 },
        { task_id: 4, name: '每日给5位玩家赠送礼物', name_desc: '每日给<i>5位</i>玩家赠送礼物', icon: '', text: '里程+5KM', nums: 5, finish: 0, max: 5, is_show: 1, has_right: 0 }
      ], // 任务列表
      isShowRulesPopup: false, // 规则弹窗
      isShowSailingComPopup: false, // 航行二次确认弹窗
      configSailingComPopup: {
        sailingType: 0,
        isTodayNoTip: false
      },
      isShowReceiveAwardsPopup: false, // 奖励获取弹窗
      configReceiveAwardsPopup: []
    }
  },
  created() {
    this.getPageData()
    this.writeLocalStorage()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.profile_image = res.data.profile_image
          this.swipeList = res.data.carouse
          this.masonry = res.data.masonry
          this.room_id = res.data.room_id
          this.has_free = res.data.has_free
          this.user_mileages = res.data.user_mileages
          this.place_checkin_info = res.data.place_checkin_info
          this.mileage_tasks = res.data.mileage_tasks
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 规则按钮
     */
    rulesBtnCk() {
      console.log('规则')
      this.isShowRulesPopup = true
    },
    /**
     * 跳转APP充值界面
     */
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    /**
     * 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
     */
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    /**
     * 埋入进入页面日期和是否今日提示
     */
    writeLocalStorage() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) != localStorage.getItem('sailDate')) {
        localStorage.setItem('isTodayNoTip', 0)
        localStorage.setItem('sailDate', JSON.stringify(formattedTime))
      }
    },
    /**
     * 判断是否是今日
     */
    judgeSecondDay() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) == localStorage.getItem('sailDate')) {
        return true
      }
      this.$toast('页面信息已变化，请刷新页面')
      setTimeout(() => {
        // 强制刷新
        window.location.reload()
      })
      return false
    },
    /**
     * 航行1次//免费航行
     */
    drawOneCk() {
      console.log('航行1次')
      if (this.judgeSecondDay()) {
        if (this.has_free) {
          this.drawApi('1')
        } else {
          if (this.masonry < 49) {
            diamondRechargePart(49)
          } else {
            this.configSailingComPopup = {
              sailingType: 2,
              isTodayNoTip: localStorage.getItem('isTodayNoTip') || 0
            }
            if (this.configSailingComPopup.isTodayNoTip == 1) {
              this.drawApi('2')
            } else {
              this.isShowSailingComPopup = true
            }
          }
        }
      }
    },
    /**
     * 航行10次
     */
    drawTenCk() {
      console.log('航行10次')
      if (this.masonry < 450) {
          diamondRechargePart(450)
        } else {
          this.configSailingComPopup = {
            sailingType: 3,
            isTodayNoTip: localStorage.getItem('isTodayNoTip') || 0
          }
          if (this.configSailingComPopup.isTodayNoTip == 1) {
            this.drawApi('3')
          } else {
            this.isShowSailingComPopup = true
          }
        }
    },
    /**
     * 航行抽奖
     */
    drawApi(type) {
      getPageData({ type: 'travel_forward', mark: type }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          let msg = res.data.awards
          msg.push({
            type: 'miles',
            icon: 'lc_120_120.png',
            text: `里程+${res.data.award_mileages}km`
          })
          this.openReceiveAwardsPopup(msg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 任务领取
     */
    taskBtnCk(item) {
      // console.log(item)
      if (item.has_right == 1) {
        getPageData({ type: 'travel_task_award', mark: item.task_id }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            // this.user_mileages = res.data.user_mileages
            this.getPageData()
            this.$toast(res.errmsg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (item.has_right == 0 && item.task_id == 2) {
        toChatRoom(this.room_id)
      }
    },
    /**
     * 打开奖励获取弹窗
     */
    openReceiveAwardsPopup(msg) {
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
      this.isShowRulesPopup = false
      this.isShowSailingComPopup = false
      this.isShowReceiveAwardsPopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .sailingBox{
    padding: 80px 0 20px 0;
    min-height: 500px;
    .swipeArea{
      width: 664px;
      height: 64px;
      background: url('@/pages/mayDay2024/assets/mk4_3.png') no-repeat left top/100% 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .drawArea{
      width: 660px;
      height: 680px;
      background: rgba(255,255,255,0.2);
      border-radius: 36px;
      border: 2px solid rgba(45,196,250,0.8);
      margin: 10px auto 0 auto;
      .imgShow{
        width: 624px;
        height: 484px;
        background: url('@/pages/mayDay2024/assets/mk4_4.png') no-repeat left top/100% 100%;
        margin: 20px auto 0 auto;
        position: relative;
        .rulesBtn{
          width: 58px;
          height: 58px;
          background: url('@/pages/mayDay2024/assets/mk4_2.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 0;
          top: 0;
        }
        .masonryShow{
          width: 300px;
          height: 48px;
          background: linear-gradient(0deg, #008AFF, #647AFF);
          box-shadow: 0px -2px 6px 0px #285BE6;
          border-radius: 24px;
          font-size: 28px;
          color: #FFFFFF;
          text-align: center;
          padding-right: 30px;
          line-height: 48px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          .rechargeBtn{
            width: 40px;
            height: 40px;
            background: url('@/pages/mayDay2024/assets/mk4_5.png') no-repeat left top/100% 100%;
            position: absolute;
            right: 2px;
            top: 2px;
          }
        }
      }
      .drawBtnArea{
        margin: 40px auto 0 auto;
        display: flex;
        justify-content: space-around;
        .drawOne{
          width: 256px;
          height: 100px;
          &.free{
            background: url('@/pages/mayDay2024/assets/btn_10.png') no-repeat left top/100% 100%;
          }
          &.nofree{
            background: url('@/pages/mayDay2024/assets/btn_12.png') no-repeat left top/100% 100%;
          }
        }
        .drawTen{
          width: 256px;
          height: 100px;
          background: url('@/pages/mayDay2024/assets/btn_11.png') no-repeat left top/100% 100%;
        }
      }
    }
    .rewardsShowArea{
      width: 660px;
      height: 292px;
      background: url('@/pages/mayDay2024/assets/mk4_6.png') no-repeat left top/100% 100%;
      margin: 20px auto 20px auto;
      padding: 80px 10px 0 10px;
      .rewardsList{
        width: 100%;
        overflow: scroll hidden;
        white-space: nowrap;
        .rewardItem{
          display: inline-block;
          width: 130px;
          height: 160px;
          background: linear-gradient(135deg, #CEFFFF, #A5FFFD);
          border-radius: 12px;
          border: 2px solid rgba(45,196,250,0.8);
          margin-left: 10px;
          position: relative;
          .iconDiv{
            width: 110px;
            height: 110px;
            background: linear-gradient(0deg, #008AFF, #647AFF);
            border-radius: 12px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
          }
          .markIcon{
            // width: 82px;
            height: 28px;
            position: absolute;
            right: 0;
            top: 0;
          }
          .numDescDiv{
            // width: 56px;
            height: 24px;
            padding: 0 5px;
            background: #00FDFC;
            border-radius: 12px 0px 12px 0px;
            font-size: 20px;
            color: #4A50D1;
            text-align: center;
            line-height: 24px;
            position: absolute;
            right: 7px;
            bottom: 35px;
          }
          .nameDescDiv{
            font-size: 24px;
            color: #4A50D1;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 4px;
          }
        }
      }
    }
  }
  .psBox{
    margin-top: 40px;
    padding: 80px 0 20px 0;
    min-height: 500px;
    .topTip{
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 36px;
      color: #4A50D1;
      margin: 20px auto 0 auto;
    }
    .userMileagesDiv{
      width: 320px;
      height: 48px;
      background: #6B7FFD;
      border-radius: 24px;
      font-size: 28px;
      color: #FFFFFF;
      line-height: 50px;
      text-align: center;
      margin: 20px auto 0 auto;
      img{
        width: 38px;
        height: 38px;
      }
    }
    .tasksArea{
      .taskItem{
        width: 684px;
        min-height: 142px;
        border-image-source: url('@/pages/mayDay2024/assets/mk4_16.png');
        border-image-slice: 50 0 50 0 fill;
        border-image-width: 50px 0px 50px 0px;
        margin: 0 auto 20px auto;
        position: relative;
        .taskNameDesc{
          font-size: 30px;
          color: #FFFFFF;
          padding: 20px 0 0 20px;
        }
        .taskText{
          border-image-source: url('@/pages/mayDay2024/assets/mk4_17.png');
          border-image-slice: 20 20 20 20 fill;
          border-image-width: 20px 20px 20px 20px;
          padding: 10px 15px;
          white-space: pre-wrap;
          font-size: 24px;
          color: #FFF;
          line-height: 30px;
          margin: 20px 0px 20px 20px;
          display: inline-block;
        }
        .taskBtn{
          width: 116px;
          height: 56px;
          font-size: 28px;
          text-align: center;
          line-height: 56px;
          position: absolute;
          right: 20px;
          bottom: 30px;
          &.nofin{
            background: url('@/pages/mayDay2024/assets/btn_2.png') no-repeat left top/100% 100%;
            color: #fff;
          }
          &.fin{
            background: url('@/pages/mayDay2024/assets/btn_3.png') no-repeat left top/100% 100%;
            color: #4A50D1;
          }
          &.fined{
            background: url('@/pages/mayDay2024/assets/btn_1.png') no-repeat left top/100% 100%;
            color: #464642;
          }
        }
      }
    }
  }
}
</style>
