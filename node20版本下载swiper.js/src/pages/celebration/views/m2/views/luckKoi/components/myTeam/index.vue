<template>
  <OutBox title="mk2_title_4.png" class="myTeam" :class="!teamId &&  'noTeam'">
    <p>组队共享锦鲤奖励，每日清空组队状态</p>
    <div v-if="false" class="buttons flex align-center">
      <div class="emailBtn flex align-center justify-center line-height-100">收到的邀请</div>
      <div class="createBtn flex align-center justify-center line-height-100">创建队伍</div>
    </div>
    <template v-else>
      <div class="numBox flex align-center">拥有号码数量：99&nbsp;&nbsp;<PublicButton hasRight="0" class="lookBtn">查看</PublicButton></div>
      <div class="teamMembers flex justify-between">
        <div v-for="item in 5" :key="item" class="member">
          <div class="avatarBox w-100 radius-50 flex align-center justify-center">
            <img v-if="false" :src="IconPath('.png')" class="avatar radius-50 fit-cover w-100 h-100" @error="imgAtError" @click="toUserMain(item)" />
            <img v-else :src="IconPath('mk6_18.png')" class="add" />
          </div>
          <div class="username line-height-100 ellipsis w-100 text-center">昵称昵称123123</div>
          <div class="num line-height-100 w-100 text-center ellipsis">贡献:12222222222</div>
        </div>
      </div>
    </template>
    <InviteFriendsPopup v-if="isShowInviteFriendsPopup" @clickClose="isShowInviteFriendsPopup = false" />
    <LuckNumPopup v-if="isShowLuckNumPopup" @clickClose="isShowLuckNumPopup = false" />
    <EmailPopup v-if="isShowEmailPopup" @clickClose="isShowEmailPopup = false" />
    <ConfirmPopup v-if="isShowPreCreatePopup" :text="'创建队伍后，今日不可加入其他队伍，<br>是否要创建？'" @clickClose="isShowPreCreatePopup = false"  />
    <ConfirmPopup v-if="isShowPreJoinPopup" :text="'加入此队伍后，今日不可退出，<br>是否要加入？'" @clickClose="isShowPreJoinPopup = false"  />
  </OutBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
const ConfirmPopup = () => import('@/pages/celebration/components/confirmPopup.vue')
const EmailPopup = () => import('./popups/emailPopup.vue')
const LuckNumPopup = () => import('./popups/luckNumPopup.vue')
const InviteFriendsPopup = () => import('./popups/inviteFriendsPopup.vue')
export default {
  name: 'myTeam',
  props: [''],
  components: { InviteFriendsPopup, LuckNumPopup, EmailPopup, ConfirmPopup },
  data() {
    return {
      teamId: '1',
      isShowInviteFriendsPopup: false,
      isShowLuckNumPopup: false,
      isShowEmailPopup: false,
      isShowPreCreatePopup: false,
      isShowPreJoinPopup: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    toUserMain,
    imgAtError
  }
}
</script>

<style lang="scss" scoped>
.myTeam {
  >p {
    font-weight: bold;
    font-size: 30px;
    color: #6E56E7;
    margin-bottom: 38px;
    padding-left: 121px;
  }
  .buttons {
    >div {
      width: 304px;
      height: 93px;
      padding-bottom: 2px;
      font-size: 32px;
      color: #FFFFFF;
      background: no-repeat left top/100% 100%;
    }
    .emailBtn {
      margin-left: 60px;
      margin-right: 22px;
      right: 22px;
      background-image: url('@/pages/celebration/assets/mk2_20.png');
    }
    .createBtn {
      background-image: url('@/pages/celebration/assets/mk2_21.png');
    }
  }
  .numBox {
    padding-left: 215px;
    margin-top: 15px;
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 26px;
    color: #6E56E7;
    .lookBtn {
      width: 126px;
      height: 54px;
    }
  }
  .teamMembers {
    margin-left: 42px;
    width: 666px;
    height: 253px;
    background: rgba(152, 134, 255, 0.3);
    border-radius: 20px;
    padding: 31px 12px 0;
    .member {
      width: 114px;
      .avatarBox {
        height: 114px;
        background: #786CD2;
        border: 4px solid #FFFFFF;
        .add {
          width: 52px;
          height: 52px;
        }
      }
      .username {
        margin: 12px 0 17px;
        font-weight: 500;
        font-size: 25px;
        color: #6E56E7;
      }
      .num {
        font-size: 22px;
        color: #F750B6;
      }
    }
  }
  &.noTeam {
    width: 742px;
    height: 402px;
    border-image-source: none;
    border-image-slice: 0;
    background: url('@/pages/celebration/assets/mk6_19.png') no-repeat left top/100% 100%;
  }
}
</style>
