<template>
  <div class="component">
    <!-- 轮盘 -->
    <div :class="['wheelDiscArea']">
      <div :class="['rewardItem', `rare${item.rare}`]" v-for="(item,index) in rewardsList" :key="`${index}+${item.id}`">
        <div :class="['rewardIcon',item.type=='title'?'titleSp':null]">
          <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        </div>
        <div :class="['rewardDesc', `rare${item.rare}`]" v-if="!(item.id==9&&title_num==51)">{{ item.text }}</div>
        <div class="markValue" v-if="item.mark">{{item.mark}}<img :src="IconPath('zs_27_20.png')" /></div>
        <div class="spMark" v-if="item.id==9&&title_num!=51">获得{{title_num}}/51</div>
        <div class="rewardNone" v-show="item.id==9&&title_num==51"></div>
        <div class="rewardActive" v-show="item.active"></div>
      </div>
    </div>
    <!-- 抽奖 -->
    <div class="lotteryArea">
      <div class="lotteryBtnDiv">
        <div class="lotteryOne" @click="lotteryBtnCk(1)"></div>
        <div :class="['lotteryTen',is_discount?'tenSp':null]" @click="lotteryBtnCk(10)"></div>
        <div class="lotteryFifty" @click="lotteryBtnCk(50)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/api/index.js'
import { _throttle } from '@/utils/tool'

export default {
  name: 'wheelDisc',
  props: ['title_num', 'leftDrawsNum', 'is_discount'],
  components: {},
  data() {
    return {
      rewardsList: [
        { id: 1, rare: 2, type: 'ring', text: '+1', icon: 'xsjz_120_120.png', mark: '99' },
        { id: 2, rare: 2, type: 'pst_privilege', text: '随机赠送权+1天', icon: 'qxfclw_120_120.png' },
        { id: 3, rare: 1, type: 'tool', text: '+1', icon: 'zjs_120_120.png' },
        { id: 4, rare: 1, type: 'tool', text: '+1', icon: 'qyb_120_120.png' },
        { id: 5, rare: 1, type: 'tool', text: '随机技能道具+1', icon: 'sjjndj_120_120.png' },
        { id: 6, rare: 1, type: 'tool', text: '+50', icon: 'fsjc_120_120.png' },
        { id: 7, rare: 1, type: 'tool', text: '随机1~30', icon: 'ljs_120_120.png' },
        { id: 8, rare: 2, type: 'voice', text: '声波+1天', icon: 'sb_laxh' },
        { id: 9, rare: 2, type: 'title', text: '属性称号+7天', icon: 'mp_tmsp' }
      ], // 轮盘数据
      rollTime: undefined, // 轮盘计时器
      nowRewardIndex: 0, // 当前第几
      isWheeling: false, // 轮盘是否在转动中
      isKoi: false, // 是否是大奖
      poList: [] // 弹窗奖励数据
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 点击抽奖
     */
    lotteryBtnCk: _throttle(function(lotteryType) {
      console.log(lotteryType)
      if (!this.isWheeling) {
        if (lotteryType == 10) {
          if (this.is_discount) {
            if (Number(this.leftDrawsNum) >= 5) {
              getPageData({ type: 'with_pray_lottery', mark: lotteryType }).then((res) => {
                if (res.errno == 0) {
                  // this.dealSort(res.data)
                  this.$emit('openReceiveAwardsPopup', res.data)
                } else {
                  this.$toast(res.errmsg)
                }
              })
            } else {
              this.$toast('剩余开启次数不足，请先去消费')
            }
          } else {
            if (Number(this.leftDrawsNum) >= 10) {
              getPageData({ type: 'with_pray_lottery', mark: lotteryType }).then((res) => {
                if (res.errno == 0) {
                  // this.dealSort(res.data)
                  this.$emit('openReceiveAwardsPopup', res.data)
                } else {
                  this.$toast(res.errmsg)
                }
              })
            } else {
              this.$toast('剩余开启次数不足，请先去消费')
            }
          }
        } else if (Number(this.leftDrawsNum) >= lotteryType) {
          getPageData({ type: 'with_pray_lottery', mark: lotteryType }).then((res) => {
            if (res.errno == 0) {
              // this.dealSort(res.data)
              this.$emit('openReceiveAwardsPopup', res.data)
            } else {
              this.$toast(res.errmsg)
            }
          })
        } else {
          this.$toast('剩余开启次数不足，请先去消费')
        }
      }
    }, 1000),
    /**
     * 处理抽奖结果
     */
    dealSort(dealData) {
      let times
      if (dealData.index == 9) {
        this.isKoi = true
        times = 8 * 2
      } else {
        times = dealData.index - this.nowRewardIndex + 8 * 2 // 8*3转三圈
      }
      this.poList = dealData.award_list
      // console.log(this.poList)
      // 是否跳过动画
      if (this.isNoAnimation) {
        this.$emit('openReceiveAwardsPopup', this.poList, this.topTip)
      } else {
        this.wheelDisc(times, this.nowRewardIndex)
      }
    },
    /**
     * 转动轮盘
     * @times 总转动次数
     * @nowTime 从第几个开始转动/当前第几
     * @sum 计算切换总次数(控制轮盘动画渐慢效果) 默认0
     * @speed 转动时间间隔 默认7ms
     */
    wheelDisc(times, nowTime, sum = 0, speed = 7) {
      this.isWheeling = true
      nowTime++ // 转动次数加1
      sum++ // 已转动次数加1
      // 判断time是否大于8
      nowTime = nowTime > 8 ? 1 : nowTime
      this.rewardsList.forEach((e) => {
        e.active = false
      })
      clearTimeout(this.rollTime)
      // 控制当前闪烁的奖励
      this.rewardsList[nowTime - 1].active = true
      this.rollTime = setTimeout(() => {
        window.requestAnimationFrame(() => {
          this.wheelDisc(times, nowTime, sum, speed)
        }) // 进行递归动画 这段代码的作用是启动一个动画帧，以便在浏览器中渲染动画效果。动画帧是通过调用requestAnimationFrame()方法实现的，它允许你在动画帧中执行代码，而不是直接设置元素的样式。这样可以确保在渲染过程中不会出现跳帧的情况，从而实现毫秒级的渲染效果。
      }, speed * sum)
      if (sum === times) {
        clearTimeout(this.rollTime) // 清除定时器
        this.nowRewardIndex = nowTime // 定位当前位置
        // 判断是否是锦鲤大奖
        if (this.isKoi) {
          this.isKoi = false
          this.rewardsList[nowTime - 1].active = false
          this.rewardsList[8].active = true
          this.isWheeling = false
          this.$emit('openReceiveAwardsPopup', this.poList)
        } else {
          setTimeout(() => {
            this.isWheeling = false
            this.$emit('openReceiveAwardsPopup', this.poList)
          }, 1000) // 延迟一秒后再可抽奖(节流),展示奖励弹窗
        }
        // console.log('恭喜你抽中了', nowTime)
        return 0
      }
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  width: 100%;
  .wheelDiscArea {
    width: 100%;
    height: 700px;
    margin: 80px auto 0 auto;
    position: relative;
    .rewardItem {
      width: 243px*0.7;
      height: 242px*0.7;
      position: absolute;
      &.rare1{
        background: url('@/pages/goldenAutumn/assets/mk5_8.png') no-repeat left top/100% 100%;
      }
      &.rare2{
        background: url('@/pages/goldenAutumn/assets/mk5_7.png') no-repeat left top/100% 100%;
      }
      &:nth-of-type(1) {
        right: 190px;
        top: 10px;
      }
      &:nth-of-type(2) {
        right: 30px;
        top: 150px;
      }
      &:nth-of-type(3) {
        right: 40px;
        top: 330px;
      }
      &:nth-of-type(4) {
        right: 180px;
        top: 450px;
      }
      &:nth-of-type(5) {
        left: 180px;
        top: 450px;
      }
      &:nth-of-type(6) {
        left: 40px;
        top: 330px;
      }
      &:nth-of-type(7) {
        left: 30px;
        top: 150px;
      }
      &:nth-of-type(8) {
        left: 190px;
        top: 10px;
      }
      &:nth-of-type(9) {
        width: 243px*0.9;
        height: 242px*0.9;
        left: 50%;
        transform: translateX(-50%);
        top: 190px;
      }
      .rewardJson {
        position: absolute;
        top: -10px;
      }
      .rewardIcon {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
        &.titleSp{
          width: 190px;
          height: 96px;
          top: 60px;
        }
      }
      .rewardDesc {
        min-width: 100px;
        text-align: center;
        white-space: nowrap;
        font-weight: 500;
        font-size: 21px;
        color: #fff;
        border-radius: 18px;
        padding: 5px 15px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 5px;
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
        &.rare1{
          background: rgba(59, 135, 239, 0.77);
        }
        &.rare2{
          background: rgba(154, 87, 255, 0.77);
        }
      }
      .markValue{
        background: linear-gradient(-90deg, #75B9FF, #FF84F8);
        border-radius: 17px 17px 17px 17px;
        padding: 3px 10px;
        font-size: 20px;
        position: absolute;
        right: 10px;
        top: 5px;
        img{
          width: 27px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .spMark{
        background: linear-gradient(-90deg, #FF7FA6, #FD5AB6);
        border-radius: 17px;
        font-weight: 500;
        font-size: 20px;
        color: #FFFFFF;
        padding: 5px 15px;
        position: absolute;
        right: 0px;
        top: 10px;
      }
      .rewardNone{
        content: '';
        position: absolute;
        left: -0px;
        top: -0px;
        width: 100%;
        height: 100%;
        background: url('@/pages/goldenAutumn/assets/mk5_16.png') no-repeat left top/100% 100%;
      }
      .rewardActive::after {
        content: '';
        position: absolute;
        left: -0px;
        top: -0px;
        width: 100%;
        height: 100%;
        background: url('@/pages/goldenAutumn/assets/mk5_9.png') no-repeat left top/100% 100%;
      }
    }
  }
  .lotteryArea {
    margin-top: 20px;
    .lotteryBtnDiv{
      // padding: 0 120px;
      display: flex;
      justify-content: space-between;
      .lotteryOne{
        width: 242px;
        height: 128px;
        background: url('@/pages/goldenAutumn/assets/mk5_11.png') no-repeat left top/100% 100%;
      }
      .lotteryTen{
        width: 242px;
        height: 128px;
        background: url('@/pages/goldenAutumn/assets/mk5_12.png') no-repeat left top/100% 100%;
        &.tenSp{
          background: url('@/pages/goldenAutumn/assets/mk5_12_1.png') no-repeat left top/100% 100%;
        }
      }
      .lotteryFifty{
        width: 242px;
        height: 128px;
        background: url('@/pages/goldenAutumn/assets/mk5_13.png') no-repeat left top/100% 100%;
      }
    }
  }
}
</style>
