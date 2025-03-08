<template>
  <out-box class="NewYearCall">
    <div class="tip-content">
      <!-- 昵称为后端按数据 -->
      <template v-if="pageData.red_pack.username">
        <span class="name text-hidden">{{ pageData.red_pack.username }}</span
        >给您送福利啦!
      </template>
    </div>

    <!-- 查看全部 -->
    <div class="show-all">
      <div class="click-content" @click="openPrompt('redPacketHistory')"></div>
    </div>

    <!-- 礼包 -->
    <div class="red-packet">
      <!-- 已过期 已领取 透明度0.6 -->
      <img
        :src="IconPath('mk5_3.png')"
        class="red-packet-icon"
        :style="{ opacity: redPacketOpacity }"
      />
      <!-- 点击头像进入用户主页 官方头像无需进入 uid为0 需要和后端协商 -->
      <img
        v-if="+pageData.red_pack.uid"
        :src="IconPath(pageData.red_pack.head)"
        class="red-packet-avatar"
        @click="toUserMain(pageData.red_pack.uid)"
      />
      <img
        v-else-if="pageData.red_pack.uid == 0"
        :src="IconPath('mk5_8.png')"
        class="red-packet-avatar"
      />
      <div class="red-packet-nick-name text-hidden">
        {{ pageData.red_pack.username }}
      </div>
    </div>

    <!-- 倒计时 -->
    <van-count-down
      v-if="pageData.red_pack.status == 1"
      ref="countDown"
      class="flex-center"
      :time="pageData.red_pack.reset_time * 1000"
      format="HH：mm：ss"
      @finish="countDownFinish"
    />

    <div v-if="toastsList.length" class="toast-list">
      <p
        v-for="toast in toastsList"
        :key="toast.guid"
        class="flex-center"
        @animationend="animationEnd"
      >
        <img :src="IconPath(toast.icon)" />{{ toast.text }}
      </p>
    </div>

    <!-- 按钮 -->
    <div class="control-content">
      <!-- 发送拜年礼包 -->
      <img
        :src="IconPath('mk5_5.png')"
        class="send-red-packet"
        @click="openPrompt('sendRedPacket')"
      />

      <!-- 点击拜年 -->
      <div class="new-year-call">
        <img :src="IconPath(newYearCallButton)" @click="clickNewYearCall" />
      </div>

      <!-- 查看玩法攻略 -->
      <img
        :src="IconPath('mk5_6.png')"
        class="play-rule"
        @click="openPrompt('playRule')"
      />
    </div>

    <!-- 发送礼包弹框 -->
    <send-red-packet-prompt
      ref="sendRedPacket"
      @sendFail="openPrompt('sendFail')"
      @update="getPageData({ type: 'tab', mark: 'm5' })"
    />

    <!-- 发送失败弹框 -->
    <send-fail-prompt
      ref="sendFail"
      @update="$refs.sendRedPacket.redPacketHistoryApi()"
    />

    <!-- 玩法攻略弹框 -->
    <play-rule-prompt ref="playRule" />

    <!-- 礼包历史弹框 -->
    <red-packet-history-prompt
      ref="redPacketHistory"
      @chooseRedPacket="(params) => (pageData = params)"
    />
  </out-box>
</template>

<script>
import { newYearCall } from '@/pages/springFestival/utils/pageData'
import { toUserMain } from '@/pages/springFestival/utils/toApp'
import { getPageData } from '@/pages/springFestival/api'

const SendFailPrompt = () => import('./components/send-fail-prompt')
// import SendFailPrompt from './components/send-fail-prompt'

const PlayRulePrompt = () => import('./components/play-rule-prompt')
// import PlayRulePrompt from './components/play-rule-prompt'

const SendRedPacketPrompt = () => import('./components/send-redPacket-prompt')
// import SendRedPacketPrompt from './components/send-redPacket-prompt'

const RedPacketHistoryPrompt = () =>
  import('./components/redPacket-history-prompt')
// import RedPacketHistoryPrompt from './components/redPacket-history-prompt'

export default {
  name: 'NewYearCall',
  components: {
    RedPacketHistoryPrompt,
    PlayRulePrompt,
    SendFailPrompt,
    SendRedPacketPrompt
  },
  data() {
    return {
      toastsList: []
    }
  },
  computed: {
    redPacketOpacity() {
      return this.pageData.red_pack.status == ''
        ? 1
        : this.pageData.red_pack.status == 1
        ? 1
        : 0.6
    },
    // 按钮icon 可领取 mk5_4.png 已开启 mk5_4_1.png 已过期 mk5_4_2.png
    newYearCallButton() {
      return this.pageData.red_pack.status == 1
        ? 'mk5_4.png'
        : this.pageData.red_pack.status == 0
        ? 'mk5_4_2.png'
        : 'mk5_4_1.png'
    }
  },
  created() {
    this.pageData = newYearCall
    this.getPageData({ type: 'tab', mark: 'm5' })
  },
  mounted() {
    // this.toastsList.push({
    //   icon: 'jb_120_120.png',
    //   text: '+1'
    // })
  },
  methods: {
    // 自定义id
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const string = (Math.random() * 16) | 0
          const v = c == 'x' ? string : (string & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    /**
     * 点击拜年
     * if (如果不是领取奖励状态) return
     * 发送请求
     * 请求异常 return this.$toast(res.errmsg)
     * 请求正常
     * this.toastsList.push(res.data)
     * 添加唯一标识
     * 数据更新
     * 顶部用户昵称 礼包信息 按钮状态
     */
    async clickNewYearCall() {
      if (this.pageData.red_pack.status != 1) return
      const res = await getPageData({
        type: 'new_year_red_pack_receive',
        mark: this.pageData.red_pack.id
      })
      if (res.errno) return this.$toast(res.errmsg)
      res.data.guid = this.guid()
      this.toastsList.push(res.data)
      this.getPageData({ type: 'tab', mark: 'm5' })
    },
    animationEnd() {
      this.toastsList.shift()
    },
    countDownFinish() {
      this.getPageData({ type: 'tab', mark: 'm5' })
    },
    NewYearCallApi() {},
    toUserMain
  }
}
</script>

<style scoped lang="scss">
@keyframes move {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}

.NewYearCall {
  position: relative;
  z-index: 5;
  margin: -176px auto 0;
  height: 724px;
  padding-top: 62px;

  .tip-content {
    position: absolute;
    top: -56px;
    left: 50%;
    transform: translateX(-50%);
    width: 621px;
    height: 114px;
    background: url('@/pages/springFestival/assets/mk5_1.png') no-repeat left
      top/100% 100%;
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    padding-top: 47px;
    white-space: nowrap;
    display: flex;
    justify-content: center;

    .name {
      max-width: 230px;
      color: #ffeb90;
    }
  }

  .show-all {
    position: absolute;
    right: 4px;
    top: 37px;
    width: 160px;
    height: 251px;
    background: url('@/pages/springFestival/assets/mk5_2.png') no-repeat left
      top/100% 100%;

    .click-content {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 140px;
      height: 135px;
      background-color: transparent;
    }
  }

  .red-packet {
    width: fit-content;
    position: relative;
    margin: 0 auto;

    .red-packet-icon {
      width: 499px;
      height: 458px;
    }

    .red-packet-avatar {
      position: absolute;
      top: 144px;
      left: 50%;
      transform: translateX(-50%);
      width: 142px;
      height: 142px;
      background: #ffffff;
      border: 6px solid #ffe176;
      border-radius: 50%;
      object-fit: cover;
    }

    .red-packet-nick-name {
      position: absolute;
      bottom: 125px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 30px;
      font-weight: 500;
      color: #ffffff;
      max-width: 300px;
    }
  }

  .van-count-down {
    position: relative;
    top: -6px;
    z-index: 1;
    margin: 0 auto;
    font-size: 32px;
    font-weight: 600;
    color: #f03516;
    white-space: nowrap;
  }

  .toast-list {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 173px;
    transform: translateX(-50%);
    width: 466px;
    height: 54px;

    p {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
      background: url('@/pages/springFestival/assets/mk5_7.png') no-repeat left
        top/100% 100%;
      white-space: nowrap;
      animation: move 1.5s 1s linear;

      > img {
        //margin-right: -8px;
        width: 75px;
        height: auto;
      }
    }
  }

  .control-content {
    position: absolute;
    z-index: 2;
    bottom: 51px;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 148px;

    .send-red-packet {
      position: absolute;
      top: 0;
      left: 13px;
      width: 148px;
      height: 148px;
    }

    .new-year-call {
      position: absolute;
      bottom: -16px;
      right: 50%;
      transform: translateX(50%);
      width: 357px;
      height: 142px;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .play-rule {
      position: absolute;
      top: 0;
      right: 13px;
      width: 148px;
      height: 148px;
    }
  }
}
</style>
