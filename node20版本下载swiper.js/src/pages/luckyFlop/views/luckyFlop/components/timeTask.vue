<template>
  <div class="content">
    <div :class="['taskIcon',config.num == config.need_num?'completed':null]" @click="taskIconCk">
      <div class="taskIconTime" v-if="config.num != config.need_num">{{timeLefting}}</div>
    </div>
    <PopupBox v-if="isShowPo" :title="'title_8.png'" @clickClose="clickClose">
      <div class="main">
        <!-- 倒计时 -->
        <div class="timeLeft">
          <span v-if="config.num == config.need_num">已完成</span>
          <span v-else>
            <span v-if="config.end_time == -1">永久</span>
            <span v-else>{{timeLefting}}</span>
          </span>
        </div>
        <!--  -->
        <div class="rewardIcon">
          <img :src="IconPath(config.award.icon)" />
        </div>
        <div class="textDesc">{{config.text}}&ensp;<i>({{config.num}}/{{config.need_num}})</i></div>
        <div class="awardDesc">可获得：“{{config.award.name}}”{{config.award.text}}</div>
        <div class="closeBtn" v-if="config.num == config.need_num" @click="getAward">领取奖励</div>
        <div class="closeBtn" v-else @click="clickClose">我知道了</div>
      </div>
    </PopupBox>
  </div>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index.js'

export default {
  props: ['config'],
  components: {},
  data() {
    return {
      isShowPo: false,
      timeLefting: undefined, // 倒计时
      timeDown: undefined
    }
  },
  created() {},
  mounted() {
    if (this.config.end_time > 0) {
      this.startCountdown(this.config.end_time)
      // 首次进入弹出弹窗
      if (this.config.firstCome) {
        this.isShowPo = true
      }
    } else if (this.config.end_time == -1) {
      this.timeLefting = '已完成'
    }
  },
  computed: {},
  watch: {
    config: {
      // 执行方法
      handler(newV, oldV) {
        // console.log('newV:', newV)
        if (newV.id && newV.end_time > 0) {
          this.startCountdown(this.config.end_time)
        }
      },
      deep: true
    }
  },
  methods: {
    taskIconCk() {
      console.log('限时任务')
      this.isShowPo = true
    },
    /**
     * 领取奖励
     */
    getAward() {
      getPageData({ type: 'love_card_receive_task', mark: this.config.id }).then((res) => {
        if (res.errno === 0) {
          this.$toast(res.errmsg)
          this.isShowPo = false
          this.$emit('getUserInformation')
          this.$emit('endTimeTask')
        }
      })
    },
    /**
     * 关闭详情弹窗
     */
    clickClose() {
      this.isShowPo = false
    },
    /**
     * 倒计时(传入单位:秒)
     */
    startCountdown(seconds) {
      // 将传入的秒数转换为分钟和秒数
      let hours = Math.floor(seconds / 60 / 60)
      let minutes = Math.floor((seconds - hours * 60 * 60) / 60)
      let remainingSeconds = seconds % 60
      // 自动补0
      const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
      // 更新倒计时元素的内容
      if (hours > 0) {
        this.timeLefting = leadingDigit(hours) + ':' + leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
      } else {
        this.timeLefting = leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
      }
      if (seconds > 0) {
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.timeDown)
        this.timeDown = setTimeout(this.startCountdown, 1000, --seconds)
      } else {
        // 倒计时完成后清空倒计时元素的内容
        this.timeLefting = ''
        console.log('timeTaskEnd')
        this.$emit('endTimeTask')
      }
      // console.log(this.timeLefting)
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  .taskIcon{
    z-index: 20;
    width: 134px;
    height: 140px;
    // background: red;
    position: fixed;
    right: 0;
    top: 450px;
    background: url('@/pages/luckyFlop/assets/mk4_22.png') no-repeat;
    background-size: 100% 100%;
    &.completed{
      background: url('@/pages/luckyFlop/assets/mk4_21.png') no-repeat;
      background-size: 100% 100%;
    }
    .taskIconTime{
      font-size: 22px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 8px;
      white-space: nowrap;
    }
  }
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main{
    width: 100%;
    height: 660px;
    // background-color: red;
    position: relative;
    .timeLeft{
      width: 493px;
      height: 68px;
      background: url('@/pages/luckyFlop/assets/tk_1.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 30px;
      text-align: center;
      font-size: 34px;
      line-height: 68px;
    }
    .rewardIcon{
      width: 240px;
      height: 240px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 140px;
      // background: #f6a1b0;
      img{
        width: 240px;
        height: 240px;
      }
    }
    .textDesc{
      width: 600px;
      text-align: center;
      font-size: 32px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 420px;
      // white-space: nowrap;
      i{
        color: #FFFAA6;
      }
    }
    .awardDesc{
      font-size: 32px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 470px;
    }
    .closeBtn{
      width: 320px;
      height: 72px;
      background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 540px;
      font-size: 32px;
      color: #4A50D1;
      text-align: center;
      line-height: 70px;
    }
  }
}
</style>
