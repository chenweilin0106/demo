<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_13.png')" />
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <!-- 图片根据用户选择赠送的卡片显示 不是写死 -->
          <div class="send-text-1 flex-center">
            <p>
              您的福卡
              <img :src="IconPath(cardInfo.icon)" class="send-text-1-icon" />
              已送至好友收件箱
            </p>
            <p>收件人：</p>
          </div>
          <div class="info flex-center">
            <!-- 点击头像进入用户主页 -->
            <img
              :src="IconPath(userInfo.profile_image)"
              class="avatar"
              @click="toUserMain(userInfo.uid)"
            />
            <div class="info-text">
              <div class="nick-name text-hidden">{{ userInfo.username }}</div>
              <!--<div class="uid flex-center">-->
              <!--  <img-->
              <!--    v-if="true"-->
              <!--    :src="IconPath('mk8_14.png')"-->
              <!--    class="uid-icon"-->
              <!--  />ID：12345678-->
              <!--</div>-->
            </div>
          </div>
          <div class="button button-receive" @click="showPopup = false">
            我知道了
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { toUserMain } from '@/pages/springFestival/utils/toApp'
export default {
  props: {},
  data() {
    return {
      cardInfo: {},
      userInfo: {},
      showPopup: false
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    /**
     * 赠送成功弹框
     * params：{cardInfo: {icon, card_id, num}, userInfo: {uid, server_id, username, profile_image, gender, created_at}}
     * 保存数据
     * 打开弹框
     */
    openPrompt({ cardInfo, userInfo }) {
      this.cardInfo = cardInfo
      this.userInfo = userInfo
      this.showPopup = true
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
  height: 455px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: fit-content;
  font-size: 28px;
  color: #ffffff;
  white-space: nowrap;
  flex-wrap: nowrap;
  .send-text-1-icon {
    margin: 0 -5px;
    width: 92px;
    height: 91px;
  }
}

.info {
  margin: 12px auto 25px;
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

.button {
  margin: 0 auto;
  width: 324px;
  height: 76px;
  border-radius: 38px;
  font-size: 32px;
}
</style>
