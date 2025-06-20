<template>
  <OutBox title="title_9.png" class="wheelDisc">
    <div class="ruleBtn position-absolute" @click="isShowRulesPopup=true"></div>
    <div class="taskBtn position-absolute" @click="isShowTaskPopup=true">
      <div v-if="config.task_point_st" class="redDot radius-999 position-absolute pointer-none"></div>
    </div>
    <div class="emailBtn position-absolute" @click="isShowEmailPopup=true">
      <div v-if="config.invite_red_point" class="redDot radius-999 position-absolute pointer-none"></div>
    </div>
    <div class="inviteBtn position-absolute" @click="isShowInvitePopup=true"></div>
    <div class="recordBtn position-absolute" @click="isShowRecordPopup=true"></div>
    <div class="lotteryNum flex align-center justify-center line-height-1 radius-999 position-absolute"><div class="nums ellipsis">剩余冒险次数：{{config.ticket_nums}}</div><div class="add" @click="isShowTaskPopup=true"></div></div>
    <div class="skipAnArea position-absolute" :class="isSkipAn?'skipSp':'noSkipSp'" @click="skipAnAreaCk"></div>
    <div class="lotteryBox position-absolute position-row-center">
      <!-- 轮盘 -->
      <div class="wheelDiscArea position-absolute">
        <div class="container position-relative line-height-1">
          <div :class="['rewardItem flex-shrink-0']" v-for="(item, index) in rewardsList" :key="item.id">
            <template v-if="index<9">
              <PublicImg :imgName="item.icon" :imgType="item.type" class="rewardIcon position-absolute position-row-center" />
              <div v-if="item.label" class="label1 flex align-center justify-center position-absolute">新</div>
              <div v-if="item.price" class="diamondLabel flex justify-center align-center position-absolute radius-999 pointer-none line-height-1">{{item.price}}<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
            </template>
            <Marquee v-else :list="marqueeList" />
            <div class="active" v-show="item.active"></div>
            <div :data-text="item.text" class="desc position-absolute position-row-center"><div class="inner">{{item.text}}</div></div>
          </div>
        </div>
        <div class="previewBtn position-absolute" @click="isShowPreviewPopup=true"></div>
      </div>
    </div>
    <div class="buttons flex position-row-center position-absolute">
      <div :class="config.is_free?'free':''" @click="lotteryBtnCk(1)"></div>
      <div :class="config.half_card?'half':''" @click="lotteryBtnCk(10)"></div>
      <div @click="lotteryBtnCk(50)"></div>
    </div>
    <div class="rules-text">
      <!-- <ul>
        <li><span></span>玩家<i>每消费300钻石</i>可获得1次冒险次数，每次冒险</li>
        <li>可获得随机奖励</li>
        <li><span></span>完成每日任务可获得更多冒险次数</li>
      </ul> -->
      <ul>
        <li><span></span>玩家<i>每消费300钻石</i>可获得1次冒险次数，完成每日</li>
        <li>任务可获得更多冒险次数</li>
        <li><span></span>每次冒险可获得随机奖励，同时获得魔力值<img :src="IconPath('mk5_47.png')" class="" />+</li>
        <li>（5~10）</li>
      </ul>
    </div>
    <EmailPopup v-if="isShowEmailPopup" @clickClose="isShowEmailPopup=false" @update="$emit('update')" />
    <InvitePopup v-if="isShowInvitePopup" @clickClose="isShowInvitePopup=false" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
    <TaskPopup v-if="isShowTaskPopup" @clickClose="isShowTaskPopup=false" @update="$emit('update')" />
    <RecordPopup v-if="isShowRecordPopup" @clickClose="isShowRecordPopup=false" />
    <RulesPopup v-if="isShowRulesPopup" @clickClose="isShowRulesPopup=false" />
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="isShowPreviewPopup=false" />
    <div class="text" :data-text="textLengthLimit(1234567890,8)"><div class="inner">textLengthLimit(1234567890,8)</div></div>
    
    .text{
      $stroke: 2px;
      position: relative;
      z-index: 1;
      font-size: 30px;
      color: transparent;
      width: fit-content;
      overflow: hidden;
      text-align: center;
      // 字体
      .inner{
        position: relative;
        z-index: 2;
        padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
        background-image: -webkit-linear-gradient(0deg, white, black); /* 渐变背景 */
        -webkit-background-clip: text; /* 背景裁剪成字体 */
        background-repeat: no-repeat;
        border: 1px solid transparent;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset($stroke)
      }
      // 描边
      &::before{
        content: attr(data-text); /* 继承文本 */
        position: absolute;
        z-index: 1;
        top: -$stroke;
        left: -$stroke;
        right: -$stroke;
        bottom: -$stroke;
        padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
        -webkit-text-stroke: $stroke transparent; /* 字体描边 为渐变背景占位 背景会覆盖在描边上 */
        background-image: -webkit-linear-gradient(0deg, pink, skyblue);
        -webkit-background-clip: text; /* 背景裁剪成字体 */
        background-repeat: no-repeat;
        border: 1px solid transparent;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset($stroke);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  </OutBox>
</template>

<script>
import Marquee from './marquee.vue'
import EmailPopup from '../components/emailPopup.vue'
import InvitePopup from '../components/invitePopup.vue'
import ReceivePopup from '../components/receivePopup.vue'
import RecordPopup from '../components/recordPopup.vue'
import TaskPopup from '../components/taskPopup.vue'
import RulesPopup from '../components/rulesPopup.vue'
import PreviewPopup from '../components/previewPopup.vue'
import { getPageData } from '@/api'
import { getStorage, getUrlData, setStorage } from '@/utils/tool'

export default {
  name: 'wheelDisc',
  props: ['config', 'configPreviewPopup'],
  components: { RulesPopup, TaskPopup, ReceivePopup, Marquee, EmailPopup, InvitePopup, RecordPopup, PreviewPopup },
  data() {
    return {
      markMap: Object.freeze({ 0: 1, 1: 2, 10: 3, 50: 4 }),
      isShowPreviewPopup: false, // 预览弹框
      isShowRulesPopup: false, // 规则弹框
      isShowTaskPopup: false, // 任务弹框
      isShowRecordPopup: false, // 记录弹框
      isShowEmailPopup: false, // 收到邀请弹框
      isShowInvitePopup: false, // 邀请弹框
      isShowReceivePopup: false, // 恭喜获得弹窗
      configReceivePopup: [
        // { id: 1, icon: 'ljs_120_120.png', name: '绿晶石', nums: '1', type: 'tool', unit: '', has_right: 0 }
      ], // 恭喜获得弹窗数据
      marqueeList: Object.freeze([
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/face/mrscnv_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/face/mrscnv_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/face/mrscnan_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/face/mrscnan_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnv_s_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnv_t_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnv_x_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnan_s_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnan_t_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/clothes/fzscnan_x_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/shoes/xwscnv_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/shoes/xwscnv_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/shoes/xwscnan_008_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/shoes/xwscnan_009_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/scene/cjsc_8thsl_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/scene/cjsc_9mqly_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/ornament/pssc_015_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/ornament/pssc_016_120_120.png' },
        { icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/ornament/pssc_018_120_120.png' }
      ]), // 轮播图数据
      rewardsList: [
        { id: 1, icon: 'cazy_120_120.png', type: 'chat_bubble_pub', text: '公屏气泡+1天', label: true, active: true },
        { id: 2, icon: 'sb_thsk', type: 'voice', text: '声波+1天', label: false, active: false },
        { id: 3, icon: 'zpsc_120_120.png', type: 'costume', text: '随机SSR素材+1', label: false, active: false },
        { id: 4, icon: 'sjlwzsq_120_120.png', type: '', text: '随机礼物赠送权+1天', label: false, active: false },
        { id: 5, icon: 'qsmx_120_120.png', type: 'ring', text: '戒指+1', label: true, price: 520, active: false },
        { id: 6, icon: 'ljs_120_120.png', type: '', text: '绿晶石+15', label: false, active: false },
        { id: 7, icon: 'sjmg_120_120.png', type: '', text: '水晶玫瑰+1', label: false, active: false },
        { id: 8, icon: 'cbt_120_120.png', type: '', text: '藏宝图+1', label: false, active: false },
        { id: 9, icon: 'fsjc_120_120.png', type: '', text: '符石精粹+100', label: false, active: false },
        { id: 10, icon: '', type: '', text: '随机SR素材+1', label: true, active: false }
      ], // 轮盘数据
      rollTime: undefined, // 轮盘计时器
      nowRewardIndex: 0, // 当前第几
      isWheeling: false, // 轮盘是否在转动中
      isSkipAn: getStorage(`${getUrlData().uid}_wardrobe_isSkipAn`) || false // 是否跳过动画
    }
  },
  methods: {
    /**
     * 是否跳过动画
     */
    skipAnAreaCk() {
      this.isSkipAn = !this.isSkipAn
      setStorage(`${this.$store.state.uid}_wardrobe_isSkipAn`, this.isSkipAn)
    },
    /**
     * 点击抽奖
     */
    lotteryBtnCk(param) {
      if (this.isWheeling) return
      const need = param == 1 && this.config.is_free ? 0 : param == 10 && this.config.half_card ? 5 : param
      const mark = param == 1 && this.config.is_free ? 0 : param
      if (+this.config.ticket_nums < need) {
        this.$toast('冒险次数不足，可完成每日任务获得')
        return (this.isShowTaskPopup = true)
      }
      getPageData({ type: 'magic_closet_lottery', mark: this.markMap[mark] }).then((res) => {
        if (!res.errno) {
          let times = Number(res.data.awards[0].position) - this.nowRewardIndex + this.rewardsList.length * 2
          this.configReceivePopup = res.data.awards
          if (this.isSkipAn) {
            this.isShowReceivePopup = true
            return this.$emit('update')
          }
          this.wheelDisc(times, this.nowRewardIndex, 0)
        } else {
          this.$toast(res.errmsg)
          if (res.errno == -4) return (this.isShowTaskPopup = true)
          if (res.errno == 5) return this.$emit('update')
        }
      })
    },
    /**
     * 转动轮盘
     * @times 总转动次数
     * @nowTime 从第几个开始转动/当前第几
     * @sum 计算切换总次数(控制轮盘动画渐慢效果) 默认0
     * @speed 转动时间间隔 默认7ms
     */
    wheelDisc(times, nowTime, sum, speed = 5) {
      this.isWheeling = true
      nowTime++ // 转动次数加1
      sum++ // 已转动次数加1
      // 判断time是否大于rewardsList.length
      nowTime = nowTime > this.rewardsList.length ? 1 : nowTime
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
        this.rollTime = null
        this.nowRewardIndex = nowTime // 定位当前位置
        setTimeout(() => {
          this.isWheeling = false
          this.isShowReceivePopup = true
          this.$emit('update')
        }, 200) // 延迟一秒后再可抽奖(节流),展示奖励弹窗
        console.log('恭喜你抽中了', nowTime)
        return 0
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wheelDisc{
  height: 1202px;
  .redDot{
    width: 14px;
    height: 14px;
    background: #FB3C3C;
    left: 3px;
    top: 3px;
  }
  .ruleBtn{
    z-index: 2;
    top: -24px;
    left: -12px;
    width: 162px;
    height: 68px;
    background: url('@/pages/520/assets/mk6_49.png') no-repeat left top/100% 100%;
  }
  .taskBtn{
    z-index: 2;
    top: 40px;
    left: -12px;
    width: 162px;
    height: 68px;
    background: url('@/pages/520/assets/mk6_50.png') no-repeat left top/100% 100%;
    .redDot{
      right: 10px;
      left: auto;
      top: 10px;
    }
  }
  .emailBtn{
    z-index: 2;
    width: 157px;
    height: 56px;
    background: url('@/pages/520/assets/mk6_1.png') no-repeat left top/100% 100%;
    right: -12px;
    top: -23px;
  }
  .inviteBtn{
    z-index: 2;
    width: 157px;
    height: 96px;
    background: url('@/pages/520/assets/mk6_2.png') no-repeat left top/100% 100%;
    right: -12px;
    top: 46px;
  }
  .recordBtn{
    z-index: 2;
    right: 4px;
    top: 789px;
    width: 178px;
    height: 68px;
    background: url('@/pages/520/assets/mk6_48.png') no-repeat left top/100% 100%;
  }
  .previewBtn{
    z-index: 2;
    right: -9px;
    bottom: -7px;
    width: 170px;
    height: 60px;
    background: url('@/pages/520/assets/mk6_32.png') no-repeat left top/100% 100%;
  }
  .skipAnArea{
    z-index: 2;
    left: 32px;
    top: 790px;
    width: 87px;
    height: 70px;
    &.skipSp{
      background: url('@/pages/520/assets/mk6_51_1.png') no-repeat left top/100% 100%;
    }
    &.noSkipSp{
      background: url('@/pages/520/assets/mk6_51.png') no-repeat left top/100% 100%;
    }
  }
  .lotteryBox{
    z-index: 1;
    width: 671px;
    height: 768px;
    background: url('@/pages/520/assets/mk6_3.png') no-repeat left top/100% 100%;
    top: 49px;
    .wheelDiscArea {
      top: 75px;
      right: 14px;
      width: 642px;
      height: 612px;
      .container {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        align-items: center;
        .lotteryBtn{
          //top: 99px;
          //left: 137px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 132px;
          height: 96px;
          //background: url('@/pages/christmas/assets/btn_4.png') no-repeat left top/100% 100%;
          .lotteryPrice {
            font-size: 20px;
            color: #FFF8E1;
            top: 35px;
            left: 50%;
            transform: translateX(-50%);
            >img{
              height: 30px;
            }
          }
          .consume {
            font-size: 20px;
            color: #FFFFFF;
            bottom: 11px;
            left: 50%;
            transform: translateX(-50%);
          }
          p {
            font-weight: 600;
            font-size: 24px;
            color: #FFFFFF;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .rewardItem {
          width: 206px;
          height: 144px;
          background: url('@/pages/520/assets/mk6_4.png') no-repeat left top/100% 100%;
          position: relative;
          .label1{
            z-index: 3;
            top: 3px;
            left: 3px;
            width: 46px;
            height: 38px;
            background: linear-gradient(-90deg, #FF7FA6, #FD5AB6);
            border-radius: 19px 19px 0 19px;
            font-weight: 500;
            font-size: 22px;
            color: #FFFFFF;
          }
          .diamondLabel{
            z-index: 3;
            top: 3px;
            right: 3px;
            transform: none;
          }
          &:last-child {
            width: 642px;
            background: url('@/pages/520/assets/mk6_5.png') no-repeat left top/100% 100%;
            padding: 3px;
          }
          .rewardIcon {
            z-index: 1;
            width: 130px;
            height: 130px;
            top: 2px;
          }
          .desc {
            z-index: 2;
            bottom: 11px;
            $stroke: 3px; /*描边宽度 建议不要看蓝湖 因为text-stroke会向字体内部延申 所以宽度不准确 和效果图类似即可*/
            font-size: 20px; /*蓝湖字体大小+描边大小*/
            font-weight: bold;
            line-height: 1;
            color: transparent;
            width: fit-content;
            overflow: hidden;
            text-align: center;
            .inner{
              position: relative;
              z-index: 2;
              padding: $stroke; /* 为描边预留位置 加上描边大小*/
              background-image: linear-gradient(white, white); /*字体颜色*/
              -webkit-background-clip: text; /*背景裁剪成字体*/
              background-repeat: no-repeat;
              border: 1px solid transparent;
              margin: -1px;
              overflow: hidden;
              white-space: nowrap;
              clip-path: inset($stroke);
            }
            &::before{
              content: attr(data-text);
              position: absolute;
              z-index: 1;
              top: -$stroke;
              left: -$stroke;
              bottom: -$stroke;
              right: -$stroke;
              padding: $stroke; /*保持与inner大小相同 方便定位*/
              -webkit-text-stroke: $stroke transparent; /*字体描边 为渐变背景占位 背景会覆盖在描边上*/
              background-image: -webkit-linear-gradient(0deg, #E66C47, #E66C47); /*描边颜色*/
              -webkit-background-clip: text;
              background-repeat: no-repeat;
              box-sizing: border-box;
              border: 1px solid transparent;
              margin: -1px;
              overflow: hidden;
              white-space: nowrap;
              clip-path: inset($stroke);
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .active::after {
            content: '';
            position: absolute;
            z-index: 4;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 266px;
            height: 194px;
            background: url('@/pages/520/assets/mk6_6.png') no-repeat left top/100% 100%;
          }
          &:last-child{
            .active::after {
              content: '';
              position: absolute;
              z-index: 4;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 710px;
              height: 194px;
              background: url('@/pages/520/assets/mk6_7.png') no-repeat left top/100% 100%;
            }
          }
        }
      }
    }
  }
  .lotteryNum{
    z-index: 2;
    bottom: 353px;
    // right: 236px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: #FFFFFF;
    min-width: 256px;
    height: 48px;
    background: #D7655F;
    padding: 0 7px 0 23px;
    .nums{
      max-width: 300px;
    }
    .add{
      margin-left: 13px;
      width: 32px;
      height: 32px;
      background: url('@/pages/520/assets/mk6_52.png') no-repeat left top/100% 100%;
    }
  }
  .buttons{
    bottom: 201px;
    &>div{
      width: 242px;
      height: 128px;
      &:nth-of-type(1){
        background: url('@/pages/520/assets/mk6_8_1.png') no-repeat left top/100% 100%;
        &.free{
          background: url('@/pages/520/assets/mk6_8.png') no-repeat left top/100% 100%;
        }
      }
      &:nth-of-type(2){
        margin: 0 -19px;
        background: url('@/pages/520/assets/mk6_9.png') no-repeat left top/100% 100%;
        &.half{
          background: url('@/pages/520/assets/mk6_9_1.png') no-repeat left top/100% 100%;
        }
      }
      &:nth-of-type(3){
        background: url('@/pages/520/assets/mk6_10.png') no-repeat left top/100% 100%;
      }
    }
  }
  .rules-text{
    position: absolute;
    top: 1000px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
