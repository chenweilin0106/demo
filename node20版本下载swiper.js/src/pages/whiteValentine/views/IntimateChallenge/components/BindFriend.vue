<template>
  <out-box class="bindFriend">
    <div class="bindFriend-content margin-row-center flex align-center justify-center position-relative">
      <!--标题-->
      <img :src="IconPath('tt_04.png')" class="bindFriend-content-title position-absolute position-row-center" />

      <!--我的信息-->
      <div class="my-info">
        <div class="avatar-box position-relative">
          <img
            v-if="userInfo"
            :src="IconPath(userInfo.profile_image)"
            class="avatar radius-50 fit-cover position-absolute"
            @click="toUserMain(userInfo.id)"
          />
          <img v-else :src="IconPath('mk7_22.png')" class="avatar radius-50 fit-cover position-absolute" />
        </div>
        <div class="nick-name ellipsis text-center">{{ userInfo.username || '虚位以待' }}</div>
      </div>

      <!--甜蜜度信息-->
      <div class="intimate-info position-absolute position-row-center">
        <div class="intimate-num position-absolute position-row-center text-nowrap flex align-center justify-center line-height-100">
          {{ bindFriendData.intimacy }}
        </div>
      </div>

      <!--朋友信息-->
      <div class="friend-info">
        <div class="avatar-box position-relative" @click="bind">
          <img
            v-if="friendInfo"
            :src="IconPath(friendInfo.profile_image)"
            class="avatar radius-50 fit-cover position-absolute"
            @click="toUserMain(friendInfo.id)"
          />
        </div>
        <div class="nick-name ellipsis text-center">{{ friendInfo.username || '虚位以待' }}</div>
      </div>
    </div>

    <div class="rule-text">
      <ul>
        <li><span></span>此绑定只生效于本次活动。绑定成功后，不可解除</li>
        <li><span></span>从双方均成功绑定后开始统计新增亲密度</li>
      </ul>
    </div>

    <BindFriendPopup ref="BindFriend" @update="$emit('update')" />
  </out-box>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'
import BindFriendPopup from './BindFriendPopup.vue'

export default {
  name: 'bindFriend',
  props: ['bindFriendData'],
  components: { BindFriendPopup },
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.bindFriendData.pair_info[0] || ''
    },
    friendInfo() {
      return this.bindFriendData.pair_info[1] || ''
    }
  },
  created() {},
  methods: {
    bind() {
      if (this.bindFriendData.pair_status) return
      this.openPrompt('BindFriend')
    },
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.bindFriend {
  padding-top: 233px;
  margin-top: -25px;
  margin-bottom: 20px;
  height: 766px;

  .bindFriend-content {
    margin-bottom: 34px;
    width: 675px;
    height: 339px;
    background: url('@/pages/whiteValentine/assets/ch_bg_01.png') no-repeat left top/100% 100%;

    .bindFriend-content-title {
      top: -78px;
      width: 534px;
      height: 126px;
    }

    .my-info,
    .friend-info {
      width: 209px;

      .avatar-box {
        margin-left: 20px;
        margin-bottom: 10px;
        width: 176px;
        height: 174px;

        .avatar {
          top: 18px;
          width: 140px;
          height: 140px;
        }
      }

      .nick-name {
        width: 209px;
        height: 64px;
        background: url('@/pages/whiteValentine/assets/name_bg.png') no-repeat left top/100% 100%;
        font-weight: 500;
        font-size: 24px;
        color: #ffffff;
        line-height: 64px;
      }
    }

    .my-info {
      .avatar-box {
        background: url('@/pages/whiteValentine/assets/av_bg.png') no-repeat left top/100% 100%;

        .avatar {
          right: 17px;
        }
      }
    }

    .friend-info {
      margin-left: 191px;

      .avatar-box {
        background: url('@/pages/whiteValentine/assets/bg_zx.png') no-repeat left top/100% 100%;

        .avatar {
          left: 17px;
        }
      }
    }

    .intimate-info {
      top: 85px;
      width: 261px;
      height: 127px;
      background: url('@/pages/whiteValentine/assets/mk4_5.png') no-repeat left top/100% 100%;

      .intimate-num {
        bottom: -2px;
        padding: 0 25px;
        min-width: 151px;
        height: 30px;
        font-weight: 500;
        font-size: 24px;
        color: #ee669e;
        background: url('@/pages/whiteValentine/assets/mk4_6.png') no-repeat left top/100% 100%;
      }
    }
  }

  .rule-text {
    margin-left: 82px;
    width: 615px;

    li:nth-child(2) {
      margin-top: 5px;

      span {
        top: 14px;
      }
    }
  }
}
</style>
