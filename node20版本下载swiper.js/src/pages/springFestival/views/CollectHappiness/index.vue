<template>
  <div class="CollectHappiness">
    <!-- 收集卡片 -->
    <out-box class="collect-cards">
      <div class="tip-content">
        <p class="text-1">每晚00：00</p>
        <p class="text-2">
          瓜分<span class="focus-color">1亿元宝、千元现金奖池</span>
        </p>
      </div>
      <div class="control-content-1">
        <!-- 大奖名单 -->
        <div
          class="reward-history flex-center"
          @click="openPrompt('winningList')"
        >
          大奖名单
        </div>
        <!-- 玩法说明 -->
        <div class="play-rule flex-center" @click="openPrompt('playRule')">
          玩法说明
        </div>
      </div>
      <!-- 卡片 -->
      <div class="cards-content">
        <!-- 中间文本切换 -->
        <img
          v-if="!pageData.is_conflate"
          :src="IconPath('mk4_7.png')"
          class="center-text-1"
        />
        <img v-else :src="IconPath('mk4_9.png')" class="center-text-2" />

        <div
          v-for="item in pageData.user_card_list"
          :key="item.card_id"
          class="card"
        >
          <img
            :src="
              IconPath(
                +item.num > 0
                  ? cardIcon[item.card_id].icon_1
                  : cardIcon[item.card_id].icon_2
              )
            "
            class="card-icon"
          />
          <!-- 小于1 red 大于1 green -->
          <div :class="['card-num', +item.num > 0 ? 'green' : 'red']">
            {{ item.num }}/1
          </div>
        </div>
      </div>
      <div class="control-content-2">
        <!-- 线条背景 -->
        <img :src="IconPath('mk4_13.png')" class="control-content-2-bg" />

        <!-- 送卡 -->
        <img
          :src="IconPath('mk4_11.png')"
          class="send-card"
          @click="openPrompt('chooseCard')"
        />

        <!-- 立即合成 高亮状态效果UI未提供 -->
        <div class="immediate-synthesis">
          <!-- 数量不够，足够都显示mk_4_10，点击事件只需要绑定在mk_4_10 -->
          <img
            v-if="!pageData.is_conflate"
            :src="IconPath('mk4_10.png')"
            @click="handleSynthesis"
          />
          <img v-else :src="IconPath('mk4_10_1.png')" />
        </div>

        <!-- 领卡 -->
        <div class="get-card" @click="openPrompt('receiveCard')">
          <!-- 超过999 显示999+ -->
          <div
            v-if="+pageData.receive_num > 0"
            class="get-card-label flex-center"
          >
            <span class="flex-center">{{
              +pageData.receive_num > 999 ? '999+' : pageData.receive_num
            }}</span>
          </div>
          <img :src="IconPath('mk4_12.png')" />
        </div>
      </div>
    </out-box>

    <!-- 今日任务 -->
    <out-box class="daily-tasks" title="title_4.png">
      <daily-task
        v-for="(taskItem, index) in pageData.task_list"
        :key="index"
        :taskItem="taskItem"
        @onTaskItemClick="onTaskBtn"
        @update="getPageData({ type: 'tab', mark: 'm4' })"
      />
    </out-box>

    <!-- 恭喜获得卡片弹框 -->
    <get-card-prompt ref="getCard" />

    <!-- 合成动画弹框 -->
    <synthetic-animation-prompt
      ref="syntheticAnimation"
      @animationEnd="syntheticAnimationEnd"
    />

    <!-- 选择福卡弹框 -->
    <choose-card-prompt
      ref="chooseCard"
      @sendHistory="openPrompt('sendHistory')"
      @sendFriend="(params) => openPrompt('chooseSend', params)"
    />

    <!-- 选择赠送好友弹框 -->
    <choose-send-prompt
      ref="chooseSend"
      @confirmSend="(params) => openPrompt('confirmSend', params)"
    />

    <!-- 确认赠送弹框 -->
    <confirm-send-prompt ref="confirmSend" @sendSuccess="sendSuccess" />

    <!-- 赠送成功弹框 -->
    <send-success-prompt ref="sendSuccess" />

    <!-- 赠卡记录弹框 -->
    <send-history-prompt ref="sendHistory" />

    <!-- 领取福卡 -->
    <receive-card-prompt
      ref="receiveCard"
      @update="getPageData({ type: 'tab', mark: 'm4' })"
    />

    <!-- 玩法说明 -->
    <play-rule-prompt ref="playRule" />

    <!-- 获奖名单 -->
    <winning-list-prompt ref="winningList" />
  </div>
</template>

<script>
import { getPageData } from '@/pages/springFestival/api'
import { collectHappiness } from '@/pages/springFestival/utils/pageData'
import DailyTask from './components/daily-task.vue'
import axios from 'axios'

// const WinningListPrompt = () => import('./components/winning-list-prompt.vue')
import WinningListPrompt from './components/winning-list-prompt.vue'
// const PlayRulePrompt = () => import('./components/play-rule-prompt.vue')
import PlayRulePrompt from './components/play-rule-prompt.vue'

// const GetCardPrompt = () => import('./components/get-card-prompt.vue')
import GetCardPrompt from './components/get-card-prompt.vue'

// const ReceiveCardPrompt = () => import('./components/receive-card-prompt.vue')
import ReceiveCardPrompt from './components/receive-card-prompt.vue'

// const SendHistoryPrompt = () => import('./components/send-history-prompt.vue')
import SendHistoryPrompt from './components/send-history-prompt.vue'

// const SendSuccessPrompt = () => import('./components/send-success-prompt.vue')
import SendSuccessPrompt from './components/send-success-prompt.vue'

// const ConfirmSendPrompt = () => import('./components/confirm-send-prompt.vue')
import ConfirmSendPrompt from './components/confirm-send-prompt.vue'

// const ChooseSendPrompt = () => import('./components/choose-send-prompt.vue')
import ChooseSendPrompt from './components/choose-send-prompt.vue'

// const ChooseCardPrompt = () => import('./components/choose-card-prompt.vue')
import ChooseCardPrompt from './components/choose-card-prompt.vue'

// const SyntheticAnimationPrompt = () =>
//   import('./components/synthetic-animation-prompt.vue')
import SyntheticAnimationPrompt from './components/synthetic-animation-prompt.vue'

export default {
  name: 'CollectHappiness',
  components: {
    WinningListPrompt,
    PlayRulePrompt,
    ReceiveCardPrompt,
    SendHistoryPrompt,
    SendSuccessPrompt,
    ConfirmSendPrompt,
    GetCardPrompt,
    SyntheticAnimationPrompt,
    ChooseCardPrompt,
    ChooseSendPrompt,
    DailyTask
  },
  data() {
    return {
      cardIcon: Object.freeze({
        1: {
          icon_1: 'mk4_2.png',
          icon_2: 'mk4_2_1.png'
        },
        2: {
          icon_1: 'mk4_3.png',
          icon_2: 'mk4_3_1.png'
        },
        3: {
          icon_1: 'mk4_4.png',
          icon_2: 'mk4_4_1.png'
        },
        4: {
          icon_1: 'mk4_5.png',
          icon_2: 'mk4_5_1.png'
        },
        5: {
          icon_1: 'mk4_6.png',
          icon_2: 'mk4_6_1.png'
        }
      }),
      isPlaying: false,
      dialogData: {}
    }
  },
  computed: {},
  created() {
    this.pageData = collectHappiness
    this.getPageData({ type: 'tab', mark: 'm4' })
  },
  mounted() {
    // 预加载合成动画
    axios({
      url: 'https://imagevo.dandanvoice.com/activity/weekly/svga/springFestival_synthetic.svga',
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((response) => {
        console.log('加载完成')
        // 在这里可以将文件内容缓存起来或执行后续操作
      })
      .catch((error) => {
        // 处理请求错误
        console.error('SVGA文件加载失败:', error)
      })
  },
  methods: {
    /**
     * 打开成功送达弹框
     * params：{cardInfo: {icon, card_id, num}, userInfo: {uid, server_id, username, profile_image, gender, created_at}}
     * 更新数据
     * 卡片数量 卡片图标 合成按钮状态
     */
    sendSuccess(params) {
      this.$refs.chooseSend.closePrompt()
      this.openPrompt('sendSuccess', params)
      this.getPageData({ type: 'tab', mark: 'm4' })
    },
    /**
     * 立即合成
     * 动画播放中或者请求进行中 if (this.isPlaying) return
     * 福卡数量不足 return
     * this.isPlaying = true
     * 发送请求 const res = await synthesisCardApi()
     * 请求错误 toast this.isPlaying = false
     * 请求正常 保存数据 播放动画 this.openPrompt('syntheticAnimation')
     */
    async handleSynthesis() {
      if (this.isPlaying) return
      if (this.pageData.user_card_list.every((item) => +item.num > 0)) {
        this.isPlaying = true
        const res = await getPageData({ type: 'new_year_card_conflate' })
        if (res.errno) {
          this.$toast(res.errmsg)
          this.isPlaying = false
        } else {
          this.dialogData = res.data
          this.openPrompt('syntheticAnimation')
        }
      } else {
        this.$toast('福卡不足')
      }
    },
    /**
     * 合成福卡动画结束
     * this.isPlaying = false
     * 数据更新
     * 所有福卡数量-1（如果数量<0 换成透明图标） 中心文本切换,按钮状态切换成已合成（一般后端按会给一个标识）
     */
    syntheticAnimationEnd() {
      this.isPlaying = false
      this.getPageData({ type: 'tab', mark: 'm4' })
    },
    /**
     * 领取今日任务奖励
     * @param {Number} mark 任务id
     * 发送请求
     * 请求错误 toast
     * 请求正常 res.data：[{icon,num,id}] 打开弹框 this.openPrompt('getCard', res.data)
     * 数据更新：当前任务状态 福卡数量 福卡图标 合成按钮状态
     */
    async onTaskBtn(mark) {
      const res = await getPageData({
        type: 'new_year_card_receive_task',
        mark
      })
      if (res.errno) return this.$toast(res.errmsg)
      this.openPrompt('getCard', res.data)
      this.getPageData({ type: 'tab', mark: 'm4' })
    },
    /**
     * 合成福卡接口
     */
    synthesisCardApi() {},
    /**
     * 领取今日任务奖励接口
     */
    receiveTaskApi() {}
  }
}
</script>

<style scoped lang="scss">
.CollectHappiness {
  position: relative;
  z-index: 5;

  .collect-cards {
    position: relative;
    margin: -36px auto 150px;
    height: 993px;
    padding-top: 88px;

    .tip-content {
      position: absolute;
      top: -63px;
      left: 50%;
      transform: translateX(-50%);
      width: 690px;
      height: 127px;
      background: url('@/pages/springFestival/assets/mk4_1.png') no-repeat left
        top/100% 100%;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      padding-top: 32px;

      .text-1 {
        margin-bottom: 10px;
      }

      .text-2 {
        .focus-color {
          color: #ffeb90;
        }
      }
    }

    .control-content-1 {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;

      .reward-history,
      .play-rule {
        width: 144px;
        height: 48px;
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
        border: 2px solid #e0b25b;
      }

      .reward-history {
        background: linear-gradient(-90deg, #5da595, #f57957);

        border-radius: 0 24px 24px 0;
      }

      .play-rule {
        background: linear-gradient(-90deg, #ffb82f, #5da595);

        border-radius: 24px 0 0 24px;
      }
    }

    .cards-content {
      position: absolute;
      top: 69px;
      left: 50%;
      transform: translateX(-50%);
      width: 726px;
      height: 694px;
      background: url('@/pages/springFestival/assets/mk4_8.png') no-repeat left
        top/100% 100%;

      .center-text-1,
      .center-text-2 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .center-text-1 {
        top: 259px;
        width: 197px;
        height: 196px;
      }

      .center-text-2 {
        top: 251px;
        width: 514px;
        height: 200px;
      }

      .card {
        position: absolute;

        .card-icon {
          width: 256px;
          height: 254px;
        }

        .card-num {
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 28px;
          font-weight: 500;
        }

        .green {
          color: #277966;
        }

        .red {
          color: #e93b1c;
        }

        &:nth-of-type(1) {
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
        }

        &:nth-of-type(2) {
          top: 166px;
          right: -12px;
        }

        &:nth-of-type(3) {
          bottom: 12px;
          right: 84px;
        }

        &:nth-of-type(4) {
          bottom: 12px;
          left: 89px;
        }

        &:nth-of-type(5) {
          top: 166px;
          left: -8px;
        }
      }
    }

    .control-content-2 {
      position: absolute;
      bottom: 59px;
      left: 0;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 130px;

      .control-content-2-bg {
        position: absolute;
        top: -13px;
        left: 85px;
        width: 596px;
        height: 142px;
      }

      .send-card {
        position: absolute;
        top: 0;
        left: 15px;
        width: 121px;
        height: 130px;
      }

      .immediate-synthesis {
        position: absolute;
        top: -8px;
        right: 50%;
        transform: translateX(50%);
        width: 353px;
        height: 134px;

        > img {
          width: 100%;
          height: 100%;
        }
      }

      .get-card {
        position: absolute;
        top: 0;
        right: 16px;
        width: 121px;
        height: 130px;

        > img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .get-card-label {
          position: absolute;
          z-index: 2;
          top: -11px;
          left: 75px;
          min-width: 36px;
          pointer-events: none;

          span {
            position: absolute;
            top: 0;
            width: fit-content;
            min-width: 36px;
            height: 36px;
            padding: 0 10px;
            background: #e53b23;
            border-radius: 36px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .daily-tasks {
    height: 1059px;
    padding-top: 67px;
  }
}
</style>
