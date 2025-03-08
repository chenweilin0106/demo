<template>
  <div class="PresentGift">
    <!-- 每日上上签-->
    <div class="SignItEveryDay">
      <div class="title"></div>
      <!--元宝概率提升浮窗-->
      <div
        v-if="+pageData.consume_add_rate"
        class="buff"
        @click="tips_bubble_flag = !tips_bubble_flag"
      >
        <!-- 如果有元宝提升概率 -->
        <div class="bubble" v-if="tips_bubble_flag" @click.prevent.stop>
          <p>累计摇签、完成好运buff任务</p>
          <p>可提升<i>【累计消费有礼】</i>元宝奖励，</p>
          <p>最高可至30%</p>
        </div>
        <div class="addition_value">
          <div class="icon"></div>
          <div class="nums">{{ pageData.consume_add_rate }}%</div>
        </div>
        <div class="schedule_list">
          <div
            class="schedule_item"
            :class="{ yellow_bgc: +pageData.consume_add_rate >= 10 }"
          ></div>
          <div
            class="schedule_item"
            :class="{ yellow_bgc: +pageData.consume_add_rate >= 20 }"
          ></div>
          <div
            class="schedule_item"
            :class="{ yellow_bgc: +pageData.consume_add_rate >= 30 }"
          ></div>
        </div>
      </div>
      <!--未抽签-->
      <div class="sign_container" v-if="signFlag == 1">
        <div class="prod">
          <public-json
            ref="hd_lb_cq_json"
            jsonName="hd_lb_cq_json"
            :loop="false"
            :need-pause="true"
            @jsonComplete="jsonComplete"
            @DOMLoaded="DOMLoaded"
          />
        </div>
        <div class="sign_btn" @click="pray"></div>
      </div>
      <!-- 抽签明细 -->
      <div class="fortune" :class="currentFortuneClass" v-else>
        <div class="des">
          {{
            `${pageData.task_info.text}（${pageData.task_info.num}/${pageData.task_info.max}次）`
          }}
        </div>
        <van-count-down
          v-if="showCountDown && pageData.task_info.res_time"
          ref="countDown"
          :time="pageData.task_info.res_time * 1000"
          format="本轮结束时间 mm:ss"
          @finish="countDownFinish"
        />
      </div>
    </div>
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <ThemeBox class="PresentGift_BottonBox">
      <div class="theme_children_tab PresentGift_BottonBox-tab">
        <div
          v-for="item in rankText"
          :key="item"
          class="theme_tabs_item"
          @click="rankMark = item"
          :class="{
            theme_tabs_item_active: rankMark == item,
            theme_tabs_item_active_right:
              rankMark == item && rankMark == '获赠榜'
          }"
        >
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">
          我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻
        </div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
    </ThemeBox>
    <draw-lots-prompt
      ref="drawLots"
      :dialog-count-down="pageData.task_info?.res_time"
    />
  </div>
</template>

<script>
import DrawLotsPrompt from '@/pages/labaFestival/views/PresentGift/components/draw-lots-prompt.vue'
import PublicJson from '@/pages/labaFestival/components/PublicJson.vue'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
import PresentGiftRank from './components/PresentGiftRank'
// 导入默认数据
import { presentGift } from '../../utils/pageData'
// 接口导入
import { getPageData } from '../../api/index'
export default {
  name: 'PresentGift',
  components: {
    PresentGiftRank,
    CumulativeSpendingList,
    PublicJson,
    DrawLotsPrompt
  },
  data() {
    return {
      isFirst: true, // 是否为首次摇签
      dialogData: {},
      rankText: Object.freeze(['赠送榜', '获赠榜']),
      rankMark: '赠送榜',
      tips_bubble_flag: true, // 说明气泡显隐标识
      isPlaying: false, // 是否正在播放动画
      // ---------------------------------------
      showCountDown: true, // 展示倒计时组件
      timer: null, // 倒计时组件结束后开启的轮询定时器
      maxCount: 30 // 最大轮询次数
    }
  },
  computed: {
    // 抽签界面和已抽签界面状态标识
    signFlag() {
      return this.pageData.sign_type == 0 ? 1 : 2
    },
    currentFortuneClass() {
      return this.pageData.sign_type == 1
        ? 'fortune_dj'
        : this.pageData.sign_type == 2
        ? 'fortune_zj'
        : 'fortune_xj'
    },
    consume_status() {
      // 累积消费返利列表数据
      return this.pageData.consume_status
    },
    // 排行榜数据
    RankData() {
      const obj = {}
      const mark1 =
        this.rankMark === '赠送榜' ? 'send_present_top' : 'present_top'
      const mark2 =
        this.rankMark === '赠送榜' ? 'my_send_present' : 'my_present'
      obj.rankList = this.pageData[mark1]
      obj.userPresent = this.pageData[mark2]
      return obj
    }
  },
  async created() {
    // 载入默认数据
    this.pageData = presentGift
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm3' })
    this.isFirst = !+this.pageData.consume_add_rate
    this.tips_bubble_flag = this.isFirst
  },
  methods: {
    // 清除轮询定时器
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    // 倒计时结束处理
    async countDownFinish() {
      const res = await this.getHome()
      if (res.errno) return this.requestErr(res)
      if (Array.isArray(res.data.task_info)) {
        this.$refs.drawLots.offPrompt()
        this.pageData = res.data
        return
      }
      if (res.data.task_info.res_time == 0) {
        let num = 1
        this.showCountDown = false
        this.timer = setInterval(async () => {
          const res = await this.getHome()
          // if (num >= this.maxCount || this.pageData.task_info.res_time != 0) {
          //   if (this.pageData.task_info.res_time != 0) this.showCountDown = true
          //   return this.clearTimer()
          // }
          num++
          console.log('发送请求', num)
          if (res.errno) return this.requestErr(res)
          this.pageData = res.data
          this.countDownFinishUpdateDialog(res)
          if (num >= this.maxCount || this.pageData.task_info.res_time != 0) {
            if (this.pageData.task_info.res_time != 0) this.showCountDown = true
            return this.clearTimer()
          }
        }, 1000)
      } else {
        this.pageData = res.data
        this.countDownFinishUpdateDialog(res)
        this.$refs.countDown.reset()
        this.$refs.drawLots.resetDialogCountDown()
      }
    },
    // json动画加载完成跳转到第一帧
    DOMLoaded() {
      this.$refs.hd_lb_cq_json.goToAndStop()
    },
    // 立即摇签
    async pray() {
      if (this.isPlaying) return
      const res = await this.getSignApi()
      if (res.errno) return this.$toast(res.errmsg)
      this.dialogData = res.data
      this.isPlaying = true
      this.$refs.hd_lb_cq_json.playJson()
    },
    // 摇签动画结束
    async jsonComplete() {
      // console.log('动画结束')
      this.isPlaying = false
      this.dialogData.date = this.pageData.date
      this.openPrompt('drawLots', this.dialogData)
      this.tips_bubble_flag = this.isFirst
      await this.getPageData({ type: 'tab', mark: 'm3' })
    },
    // 抽签接口
    getSignApi() {
      return getPageData({
        type: 'shake_sign'
      })
    },
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.getAward(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
    // 累积消费返利列表领取接口
    async getAward(mark) {
      return await getPageData({
        type: 'consume_reward',
        mark
      })
    },
    getHome() {
      return getPageData({ type: 'tab', mark: 'm3' })
    },
    // 倒计时结束更新弹框数据
    countDownFinishUpdateDialog(res) {
      const { sign_type, consume_add_rate, task_info, date } = res.data
      this.$refs.drawLots.updatePromptData({
        sign_type,
        consume_add_rate,
        task_info,
        date
      })
    },
    // 倒计时结束请求失败
    requestErr(res) {
      this.$toast(res.errmsg)
      this.$refs.drawLots.offPrompt()
      this.clearTimer()
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  display: flex;
  flex-direction: column;
  align-items: center;
  .SignItEveryDay {
    width: 750px;
    height: 732px;
    background-image: url('../../assets/mk3_1.png');
    background-size: 100% 100%;
    margin-bottom: 116px;
    position: relative;
    .title {
      width: 613px;
      height: 227px;
      background-image: url('../../assets/title_3.png');
      background-size: 100% 100%;
      margin-bottom: 116px;
      position: absolute;
      left: 24px;
      top: -120px;
    }
    .buff {
      width: 141px;
      height: 142px;
      background-image: url('../../assets/mk3_8.png');
      background-size: 100% 100%;
      position: absolute;
      top: 212px;
      right: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .bubble {
        position: absolute;
        top: -100px;
        left: -172px;
        width: 334px;
        height: 121px;
        background-image: url('../../assets/mk3_10.png');
        background-size: 100% 100%;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        z-index: 10;
        padding-top: 15px;
        padding-left: 14px;
        white-space: nowrap;
        i {
          color: #ffeb66;
        }
      }
      /**
      <div class="bubble">
          累计摇签、完成好运buff任务<br />可提升<i>[累计消费有礼]</i>元宝奖励，<br />最高可至30%
        </div>
      */
      .addition_value {
        display: flex;
        align-items: center;
        position: absolute;
        top: 89px;
        margin-left: 1px;
        .icon {
          width: 24px;
          height: 29px;
          background-image: url('../../assets/mk3_9.png');
          background-size: 100% 100%;
        }
        .nums {
          width: 43px;
          height: 29px;
          line-height: 29px;
          font-size: 22px;
          font-weight: 800;
          color: #d73939;
          margin-left: 1px;
        }
      }

      .schedule_list {
        position: absolute;
        bottom: -4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 108px;
        border-radius: 5px;
        overflow: hidden;
        .schedule_item {
          width: 34px;
          height: 10px;
          background: #b5b5b5;
        }
        .yellow_bgc {
          background-color: #ffde45;
        }
      }
    }
    .sign_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
      .prod {
        width: 740px;
        height: 750px;
        background-size: 100% 100%;
        position: absolute;
        top: -147px;
        left: 10px;
        overflow: hidden;
        .PublicJson {
          width: 100%;
          height: 100%;
        }
      }
      .sign_btn {
        width: 376px;
        height: 127px;
        background-image: url('../../assets/mk3_3.png');
        background-size: 100% 100%;
        position: absolute;
        z-index: 100;
        top: 563px;
      }
    }
    .fortune {
      width: 509px;
      height: 530px;
      background-image: url('../../assets/mk3_5.png');
      background-size: 100% 100%;
      position: absolute;
      top: 97px;
      left: 104px;
      .des {
        position: absolute;
        top: 309px;
        left: 114px;
        width: 310px;
        font-size: 20px;
        font-weight: 500;
        color: #910b0b;
        line-height: 26px;
      }
      .van-count-down {
        font-size: 20px;
        font-weight: bold;
        color: #f01c1c;
        position: absolute;
        top: 357px;
        left: 178px;
        white-space: nowrap;
      }
    }
    .fortune_dj {
      background-image: url('../../assets/mk3_5.png');
      background-size: 100% 100%;
    }
    .fortune_zj {
      background-image: url('../../assets/mk3_6.png');
      background-size: 100% 100%;
    }
    .fortune_xj {
      background-image: url('../../assets/mk3_7.png');
      background-size: 100% 100%;
    }
  }

  // 获赠榜单-赠送榜单
  .PresentGift_BottonBox {
    width: 720px;
    height: 972px;
    border-radius: 0px 0px 26px 26px;
    margin-bottom: 63px;
    .PresentGift_BottonBox-tab {
      margin-bottom: 20px;
      height: 100px;
      .theme_tabs_item {
        height: 71px;
        font-size: 32px;
        line-height: 71px;
      }
      // 底部tab栏活动
      .theme_tabs_item_active {
        font-size: 40px !important;
        font-weight: 500 !important;
        line-height: 90px;
        height: 110px !important;
      }
    }
    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 20px;
      overflow: hidden;
      // 我的道具数量
      .top_my_goods {
        width: 100%;
        font-size: 28px;
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
