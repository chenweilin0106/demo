<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_12.png')" />
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <!-- 图片根据用户选择赠送的卡片显示 不是写死 -->
          <div class="send-text-1 flex-center">
            将赠送1张
            <img :src="IconPath(cardInfo.icon)" class="send-text-1-icon" />
            给好友：
          </div>
          <div class="info flex-center">
            <!-- 点击头像进入主页 -->
            <img
              :src="IconPath(userInfo.profile_image)"
              class="avatar"
              @click="toUserMain(userInfo.uid)"
            />
            <div class="info-text">
              <div class="nick-name text-hidden">{{ userInfo.username }}</div>
              <div class="uid flex-center">
                <img
                  v-if="userInfo.is_pretty"
                  :src="IconPath('mk8_14.png')"
                  class="uid-icon"
                />ID：{{ userInfo.is_pretty ? userInfo.code : userInfo.uid }}
              </div>
            </div>
          </div>
          <div class="buttons flex-center">
            <div class="cancel button-noFinish" @click="showPopup = false">
              取消
            </div>
            <div class="confirm button-receive" @click="confirm">确认</div>
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
import { toUserMain } from '@/pages/springFestival/utils/toApp'
export default {
  props: {},
  data() {
    return {
      showPopup: false,
      cardInfo: {},
      userInfo: {}
    }
  },
  computed: {},
  methods: {
    /**
     * 确认按钮
     * 发送请求
     * 请求异常 return this.$toast(res.errmsg)
     * 请求正常 关闭弹框确认赠送弹框 打开成功送达弹框 传输数据：卡片图标，卡片id 用户昵称，uid，头像
     * this.showPopup = false this.$emit('sendSuccess', params)
     */
    async confirm() {
      const res = await getPageData({
        type: 'new_year_card_send',
        'mark[tuid]': this.userInfo.uid,
        'mark[card_id]': this.cardInfo.card_id
      })
      if (res.errno) {
        this.$toast(res.errmsg)
        this.showPopup = false
      } else {
        const params = {
          cardInfo: this.cardInfo,
          userInfo: this.userInfo
        }
        this.showPopup = false
        this.$emit('sendSuccess', params)
      }
    },
    sendCardApi() {},
    /**
     * 确认赠送弹框
     * params：{cardInfo: {icon, card_id, num}, userInfo: {uid, server_id, username, profile_image, gender, created_at}}
     * 保存数据 打开弹框 this.showPopup = true
     */
    openPrompt({ cardInfo, userInfo }) {
      this.cardInfo = cardInfo
      this.userInfo = userInfo
      this.showPopup = true
    },
    clickClose() {
      this.$emit('close')
    },
    toUserMain
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
  width: 531px;
  height: 445px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
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
      padding-top: 60px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 598px;
      height: 261px;
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
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.send-text-1 {
  margin: 0 auto;
  width: fit-content;
  font-size: 28px;
  color: #ffffff;
  white-space: nowrap;
  flex-wrap: nowrap;
  .send-text-1-icon {
    width: 92px;
    height: 91px;
  }
}

.info {
  margin: 12px auto 45px;
  width: 414px;
  height: 110px;
  background: rgba(206, 82, 27, 0.8);
  border-radius: 55px;

  .avatar {
    margin-right: 14px;
    width: 74px;
    height: 74px;
    border-radius: 50%;
    object-fit: cover;
  }

  .info-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    .nick-name {
      font-size: 28px;
      color: #ffffff;
      width: 240px;
      margin-bottom: 3px;
    }
    .uid {
      .uid-icon {
        margin-right: 7px;
        width: 47px;
        height: 39px;
      }
      font-size: 24px;
      color: #ffea80;
      white-space: nowrap;
    }
  }
}

.buttons {
  .cancel,
  .confirm {
    width: 176px;
    height: 76px;
    border-radius: 38px;
    font-size: 32px;
  }

  .confirm {
    margin-left: 24px;
  }
}
</style>
