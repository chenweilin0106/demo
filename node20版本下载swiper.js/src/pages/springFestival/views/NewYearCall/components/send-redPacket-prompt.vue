<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_18.png')" />
      <div class="inner-content">
        <div class="main-content">
          <div class="tip-bubble" @click="openBubble">
            <!-- 需要一个气泡背景图 5秒后自动关闭 -->
            <div v-if="showBubble" class="bubble-main flex-center" @click.stop>
              <p>每充值2000元可获得</p>
              <p>1次发送礼包机会</p>
            </div>
          </div>
          <div class="send-time">剩余发送次数：{{ sendNum }}</div>
          <div class="tip-text-1">
            派发你的新春礼包，在全服玩家面前展示自己!
          </div>
          <div class="redPacked-history-list">
            <div v-if="list.length" ref="redPackedHistory" class="list">
              <div
                v-for="(item, index) in list"
                :key="item.id"
                class="history"
                :style="{
                  backgroundColor: index % 2 == 0 ? '#CB5623' : '#DB722D'
                }"
              >
                <p>
                  你在<span class="yellow">{{ item.start_time }}</span
                  >发送的礼包
                </p>
                <p>
                  已获得<span class="green">{{ item.receive_num }}</span
                  >个玩家的新春祝福！
                </p>
              </div>
            </div>
            <div v-else class="no-data flex-center">暂无发送记录</div>
          </div>
          <!-- 这里发送成功后的toast时间为3秒 -->
          <div class="button button-receive" @click="sendRedPacket">
            立即发送礼包
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/springFestival/api'

export default {
  data() {
    return {
      bubbleTimer: null,
      showBubble: false,
      showPopup: false,
      sendNum: 0,
      list: []
    }
  },
  methods: {
    async sendRedPacket() {
      if (+this.sendNum === 0) return this.$emit('sendFail')
      const res = await getPageData({ type: 'new_year_red_pack_send' })
      if (res.errno == -2) return this.$emit('sendFail')
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.$toast({
          message: '发送成功！已将您的新春祝福发送给全服玩家',
          duration: 3000
        })
        this.$emit('update')
        this.showPopup = false
      }
    },
    // 打开气泡 5秒后自动关闭
    openBubble() {
      if (!this.showBubble) {
        this.bubbleTimer = setTimeout(() => {
          this.showBubble = false
        }, 5000)
      } else {
        clearTimeout(this.bubbleTimer)
        this.bubbleTimer = null
      }
      this.showBubble = !this.showBubble
    },
    // 打开弹框
    openPrompt() {
      this.redPacketHistoryApi()
    },
    // 请求成功 弹框关闭情况下：打开弹框，锁定背景，弹框内滚动列表回滚到顶部
    requestSuccess() {
      this.showPopup = true
      this.openBubble()
      document.querySelector('html').style.overflow = 'hidden'
      this.$nextTick(() => {
        if (this.$refs.redPackedHistory) {
          this.$refs.redPackedHistory.scrollTop = 0
        }
      })
    },
    clickClose() {
      this.$emit('close')
      this.resetData()
      document.querySelector('html').style.overflow = 'auto'
    },
    // 重置参数
    resetData() {
      this.showBubble = false
      clearTimeout(this.bubbleTimer)
      this.bubbleTimer = null
    },
    async redPacketHistoryApi() {
      const res = await getPageData({ type: 'new_year_red_pack_send_list' })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list = res.data.list
        this.sendNum = res.data.num
        if (!this.showPopup) this.requestSuccess()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 624px;
  height: 765px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    height: 100%;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;

    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      padding-top: 78px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -45px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      pointer-events: none;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .title-image {
    width: 598px;
    height: 188px;
    position: absolute;
    top: -139px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.tip-bubble {
  position: absolute;
  right: 19px;
  top: -11px;
  width: 56px;
  height: 56px;
  background: url('@/pages/springFestival/assets/tk_13.png') no-repeat left
    top/100% 100%;

  .bubble-main {
    position: absolute;
    top: -108px;
    left: -141px;
    width: 260px;
    height: 102px;
    background: url('@/pages/springFestival/assets/tk_27.png') no-repeat left
      top/100% 100%;
    //opacity: 0.6;
    flex-direction: column;
    font-size: 24px;
    color: #ffffff;
    line-height: 34px;
    white-space: nowrap;

    p {
      width: 220px;
    }
  }
}

.send-time {
  width: fit-content;
  margin: 0 auto;
  font-size: 32px;
  color: #ffffff;
  white-space: nowrap;
}

.tip-text-1 {
  margin: 26px auto 16px;
  width: fit-content;
  font-size: 26px;
  color: #ffe683;
  white-space: nowrap;
}

.redPacked-history-list {
  margin: 0 auto 36px;
  width: 548px;
  height: 425px;
  background: rgba(201, 77, 23, 0.8);
  border: 3px solid #ffdc7a;
  border-radius: 23px;
  overflow: hidden;

  .no-data {
    height: 100%;
    font-size: 28px;
    color: #ffe683;
  }

  .list {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    .history {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 114px;
      padding-left: 25px;

      p {
        font-size: 28px;
        color: #ffffff;
        white-space: nowrap;

        &:nth-of-type(1) {
          margin-bottom: 14px;
        }
      }

      .yellow {
        color: #ffe683;
      }

      .green {
        color: #2ee7be;
      }
    }
  }
}

.button {
  margin: 0 auto;
  width: 324px;
  height: 76px;
  font-size: 32px;
  border-radius: 38px;
}
</style>
