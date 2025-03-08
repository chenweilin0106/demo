<template>
  <div class="component">
    <!-- 轮盘 -->
    <div :class="['wheelDiscArea', `level${wheelLevel}`]">
      <div :class="['rewardItem']" v-for="(item,index) in rewardsList.slice(0,8)" :key="`${index}+${item.id}`" @click="previewCk(item)">
        <div class="rewardIcon">
          <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        </div>
        <div class="isPreview" v-if="item.is_preview"></div>
        <div class="rewardDesc">{{item.type_name}}<span v-if="item.type!='treasure_award_xcxn'">{{ item.text }}</span></div>
        <div class="markNew" v-if="item.is_new"></div>
        <div class="markValue" v-if="item.mark">{{item.mark}}<img :src="IconPath('zs_27_20.png')" /></div>
        <div class="active" v-show="item.active"></div>
        <div class="xcxnTip" v-if="item.need_times">再抽到<i>{{item.need_times}}</i>次可开启下级</div>
      </div>
      <div class="rewardItem" v-for="(item,index) in rewardsList.slice(8,9)" :key="`${index}+${item.id}`">
        <div class="active" v-show="item.active"></div>
      </div>
    </div>
    <!-- 抽奖 -->
    <div class="lotteryArea">
      <div class="isAnimationDiv">
        <div :class="['isNoAnimationDiv',isNoAnimation==true?'jump':'noJump']" @click="isNoAnimationCk"></div>
        <span>&ensp;跳过动画</span>
      </div>
      <div class="lotteryBtnDiv">
        <div class="lotteryOne" @click="lotteryBtnCk(1)"></div>
        <div class="lotteryTen" @click="lotteryBtnCk(2)"></div>
      </div>
    </div>
    <div class="koiSvgaDiv" v-if="isKoiAnimStart">
      <PublicImg :imgName="'hd_dwj_jl.svga'" :loop="1" @animOnFinished="koiSvgaOnFinished"></PublicImg>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/pages/dragonBoat/api/index.js'
import { compareVersions } from '@/pages/dragonBoat/utils/toApp'
import axios from 'axios'
import { _throttle } from '@/pages/dragonBoat/utils/tool'

export default {
  name: 'wheelDisc',
  props: ['wheelLevel', 'leftDrawsNum'],
  components: {},
  data() {
    return {
      rewardsList: [
        { id: 2, type: 'tool', nums: 10, type_name: '绿晶石', name: '绿晶石', text: '+10', icon: 'ljs_120_120.png' },
        { id: 'gamegold', type: 'property', nums: 10000, name: '元宝', type_name: '元宝', text: '+1万', icon: 'yb_120_120.png' },
        { id: 6, type: 'tool', nums: 1, name: '口香糖', type_name: '口香糖', text: '+1', icon: 'kxt_120_120.png' },
        { id: 0, type: 'pst_privilege', nums: 1, name: '【水晶粽】', type_name: '赠送权', text: '+1天', icon: 'sjz_120_120.png', is_new: true, mark: '520', is_preview: 'gift_sjz.svga' },
        { id: 0, type: 'voice', nums: 1, name: '【萌熊出击】', type_name: '声波', text: '+1天', icon: 'sb_mxcj', is_new: true, is_preview: 'sb_mxcj' },
        { id: 142, type: 'tool', nums: 20, name: '符石精粹', type_name: '符石精粹', text: '+20', icon: 'fsjc_120_120.png' },
        { id: 1, type: 'tool', nums: 5, name: '紫晶石', type_name: '紫晶石', text: '+5', icon: 'zjs_120_120.png' },
        { id: 0, type: 'treasure_award_xcxn', nums: 1, name: '炫彩香囊', type_name: '炫彩香囊', text: '+1', icon: 'xcxn_120_120.png', need_times: 1, is_preview: '1' },
        { id: 10, type: 'treasure_award_koi', nums: 1, name: '锦鲤', type_name: '锦鲤', text: '+1', icon: 'jl_120_120.png' }
      ], // 轮盘数据
      rollTime: undefined, // 轮盘计时器
      nowRewardIndex: 0, // 当前第几
      isWheeling: false, // 轮盘是否在转动中
      poList: [], // 弹窗奖励数据
      isNoAnimation: false, // 是否跳过动画
      isKoi: false, // 是否是大奖
      isKoiAnimStart: false, // 是否锦鲤动画开始执行
      topTip: undefined // 恭喜获得弹窗的顶端文案
    }
  },
  created() {
    // console.log(localStorage.getItem('isNoAnimation') ? localStorage.getItem('isNoAnimation') !== 'false' : false)
    this.isNoAnimation = localStorage.getItem('isNoAnimation') ? localStorage.getItem('isNoAnimation') !== 'false' : false
    this.getRewardsList()
    axios({
      url: `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/hd_dwj_jl.svga`,
      method: 'get',
      responseType: 'arraybuffer'
    })
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取轮盘数据
     */
    getRewardsList(isUpdate) {
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          if (isUpdate) {
            this.rewardsList[7].need_times = res.data.lottery_pool[7].need_times ? res.data.lottery_pool[7].need_times : null
          } else {
            this.rewardsList = res.data.lottery_pool
            this.rewardsList.forEach((e) => {
              this.$set(e, 'active', false)
            })
            this.rewardsList[0].active = true
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 点击预览
     */
    previewCk(item) {
      if (item.is_preview) {
        if (item.type == 'treasure_award_xcxn') {
          console.log('xcxn')
          this.$emit('openXcxnPopup')
        } else {
          this.$emit('openPreviewPopup', item)
        }
      }
    },
    /**
     * 更改是否跳过动画
     */
    isNoAnimationCk() {
      this.isNoAnimation = !this.isNoAnimation
      localStorage.setItem('isNoAnimation', this.isNoAnimation)
    },
    /**
     * 点击抽奖
     */
    lotteryBtnCk: _throttle(function(lotteryType) {
      console.log(10 ** (lotteryType - 1))
      if (!this.isWheeling) {
        if (Number(this.leftDrawsNum) >= 10 ** (lotteryType - 1)) {
          console.log('抽奖')
          getPageData({ type: 'treasure_open', mark: lotteryType }).then((res) => {
            if (res.errno == 0) {
              // console.log(res.data.awards[0].awards.name)
              // let times = Number(res.data.awards[0].sort) - this.nowRewardIndex + 8 * 3 // 8*3转三圈
              // this.wheelDisc(times, this.nowRewardIndex, 0)
              // this.poList = res.data.awards
              this.$emit('ticketNumsUpdate', res.data.ticket_nums)
              this.topTip = res.data.unlock_info ? res.data.unlock_info : undefined
              this.dealSort(res.data)
            } else if (res.errno == -5 || res.errno == -6) {
              this.backpackFull(res.errno)
            } else {
              this.$toast(res.errmsg)
            }
          })
        } else {
          this.$toast('香囊不足，请先去消费')
        }
      }
    }, 1000),
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
      this.$emit('openBackpackFullPopup', errno == -5 ? 1 : 2)
    },
    /**
     * 处理抽奖结果
     */
    dealSort(dealData) {
      let times
      if (dealData.index == 9) {
        this.isKoi = true
        times = 8 * 3
      } else {
        times = dealData.index - this.nowRewardIndex + 8 * 3 // 8*3转三圈
      }
      let arr = []
      for (let it of dealData.award_list['koi']) {
        arr.push({ ...it, borderLevel: 'koi' })
      }
      for (let it of dealData.award_list['color']) {
        arr.push({ ...it, borderLevel: 'color' })
      }
      for (let it of dealData.award_list['common']) {
        arr.push({ ...it, borderLevel: 'common' })
      }
      this.poList = arr
      // console.log(this.poList)
      // 是否跳过动画
      if (this.isNoAnimation) {
        this.$emit('openReceiveAwardsPopup', this.poList, this.topTip)
        this.getRewardsList(true)
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
          setTimeout(() => {
            this.isKoiAnimStart = true
          }, 500)
        } else {
          setTimeout(() => {
            this.isWheeling = false
            this.$emit('openReceiveAwardsPopup', this.poList, this.topTip)
            this.getRewardsList(true)
          }, 1000) // 延迟一秒后再可抽奖(节流),展示奖励弹窗
        }
        // console.log('恭喜你抽中了', nowTime)
        return 0
      }
    },
    /**
     * 锦鲤动画结束后执行
     */
    koiSvgaOnFinished() {
      setTimeout(() => {
        this.isKoiAnimStart = false
        this.isWheeling = false
        this.$emit('openReceiveAwardsPopup', this.poList, this.topTip)
        this.getRewardsList(true)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  width: 100%;
  .wheelDiscArea {
    width: 748px;
    height: 725px;
    background: url('@/pages/dragonBoat/assets/mk4_12.png') no-repeat left top/100% 100%;
    margin: 0 auto -30px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 70px 80px;
    &.level1{
      background: url('@/pages/dragonBoat/assets/mk4_10.png') no-repeat left top/100% 100%;
    }
    &.level2{
      background: url('@/pages/dragonBoat/assets/mk4_11.png') no-repeat left top/100% 100%;
    }
    .rewardItem {
      width: 157px;
      height: 157px;
      background: url('@/pages/dragonBoat/assets/mk4_3.png') no-repeat left top/100% 100%;
      position: relative;
      &:nth-of-type(1) {
        order: 2;
      }
      &:nth-of-type(2) {
        order: 3;
      }
      &:nth-of-type(3) {
        order: 6;
      }
      &:nth-of-type(4) {
        order: 9;
      }
      &:nth-of-type(5) {
        order: 8;
      }
      &:nth-of-type(6) {
        order: 7;
      }
      &:nth-of-type(7) {
        order: 4;
      }
      &:nth-of-type(8) {
        order: 1;
      }
      &:nth-of-type(9) {
        order: 5;
        background: url('@/pages/dragonBoat/assets/mk4_4.png') no-repeat left top/100% 100%;
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
        top: 0px;
      }
      .isPreview{
        width: 151px;
        height: 28px;
        background: url('@/pages/dragonBoat/assets/mk4_5.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 80px;
      }
      .rewardDesc {
        white-space: nowrap;
        font-weight: 500;
        font-size: 20px;
        color: #9EF7F2;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 15px;
      }
      .markNew{
        width: 46px;
        height: 42px;
        background: url('@/pages/dragonBoat/assets/mk4_7.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .markValue{
        background: #C68BFF;
        border-radius: 17px 17px 17px 17px;
        padding: 3px 10px;
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 0;
        img{
          width: 27px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .xcxnTip{
        width: 166px;
        height: 83px;
        background: url('@/pages/dragonBoat/assets/mk4_2.png') no-repeat left top/100% 100%;
        font-size: 20px;
        color: #0E8E9A;
        white-space: pre-wrap;
        padding: 8px 30px;
        position: absolute;
        left: -60px;
        top: -50px;
        i{
          color: #FF641F;
        }
      }
      .active::after {
        content: '';
        position: absolute;
        left: -22px;
        top: -22px;
        width: 200px;
        height: 201px;
        background: url('@/pages/dragonBoat/assets/mk4_15.png') no-repeat left top/100% 100%;
      }
    }
  }
  .lotteryArea {
    .isAnimationDiv{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      color: #146A72;
      .isNoAnimationDiv{
        width: 42px;
        height: 42px;
        &.jump{
          background: url('@/pages/dragonBoat/assets/mk4_9.png') no-repeat left top/100% 100%;
        }
        &.noJump{
          background: url('@/pages/dragonBoat/assets/mk4_8.png') no-repeat left top/100% 100%;
        }
      }
    }
    .lotteryBtnDiv{
      padding: 0 120px;
      display: flex;
      justify-content: space-between;
      .lotteryOne{
        width: 186px;
        height: 179px;
        background: url('@/pages/dragonBoat/assets/mk4_13.png') no-repeat left top/100% 100%;
      }
      .lotteryTen{
        width: 186px;
        height: 179px;
        background: url('@/pages/dragonBoat/assets/mk4_14.png') no-repeat left top/100% 100%;
      }
    }
  }
  .koiSvgaDiv{
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30;
  }
}
</style>
