<template>
  <div class="peopleBargained position-relative">
    <div class="shop">
      <div class="swipeDiv flex align-center">
        <TextSwipe :swipeList="swipeList" />
      </div>
      <div class="goodsList flex align-center justify-center">
        <div v-for="item in 3" :key="item" class="goods flex-column align-center position-relative">
          <div class="typeLabel line-height-100 flex align-center position-absolute">魔法飘屏道具</div>
          <div class="goodsIcon"><PublicImg :imgName="'ljs_120_120.png'" /></div>
          <div class="goodsText line-height-100 flex align-center justify-center">+150</div>
        </div>
      </div>
    </div>
    <div class="bargained position-relative">
      <div class="over position-absolute flex align-center justify-center"><img :src="IconPath('mk7_8.png')" class="" /></div>
      <div class="bargainedMain margin-row-center">
        <div class="familyName margin-row-center">
          <div class="innerText w-100 h-100 flex align-center justify-center line-height-100">家族名称家族名称</div>
        </div>
        <div class="currentPrice position-relative flex-column align-center justify-between margin-row-center">
          <p class="line-height-100">当前价格</p>
          <div class="nowPrice flex align-center justify-center line-height-100">2299<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
          <div class="oldPrice line-height-100 position-relative">原价19999</div>
          <img :src="IconPath('mk7_4.png')" class="discountLabel position-absolute" />
        </div>
        <div :style="{ opacity: true ? 1 : '0.5' }" class="buttons flex align-center justify-center">
          <div class="buy line-height-100 flex align-center justify-center" :class="`has_right_2`">立即购买</div>
          <div class="cut line-height-100 justify-between flex-column align-center" :class="`has_right_2`">砍一刀<i class="line-height-100">剩余次数：3</i></div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>家族成员可参与砍价以降低礼包价格。每位玩家每</li>
          <li>日限购买一次。更多成员完成砍价后购买更划算</li>
          <li><span></span>砍价时间截止至每晚22:00，之后仍可按最终价购</li>
          <li>买礼包</li>
          <li><span></span>商店每日0点更新礼包，并重置购买次数、砍价券</li>
          <li>数量、任务</li>
        </ul>
      </div>
    </div>
    <OutBox class="task position-relative" title="mk2_title_1.png">
      <img :src="IconPath('mk7_9.png')" class="inviteBtn position-absolute" @click="isShowInviteBargainedPopup = true" />
      <div v-for="item in 4" :key="item" class="taskItem flex align-center justify-between">
        <div class="taskText h-100 flex-column justify-between">
          <p class="line-height-100">每日登录活动页面</p>
          <p class="line-height-100"><i>砍价次数+1</i></p>
        </div>
        <PublicButton class="taskBtn">去完成</PublicButton>
      </div>
      <div class="bargainedUsers flex-column overflow-hidden">
        <template v-if="false">
          <div class="currentBargainedUsers flex align-center justify-center line-height-100">本家族当前3/20人累计砍价 &nbsp;<i>999</i>&nbsp;<img :src="IconPath('zs_42_32.png')" class="" /></div>
          <div class="scrollHead flex align-center line-height-100"><div class="head1">玩家昵称</div><div class="head2">累计砍价金额</div>
          </div>
          <div class="scrollList overscroll-none overflow-x-hidden overflow-y-scroll flex-1">
            <div v-for="(listItem, index) in 20" :key="listItem" class="item line-height-100 flex align-center" :style="{ background: index % 2 == 0 ? 'rgba(102, 51, 219, 0.3)' : '' }">
              <div class="rank flex align-center justify-center">1</div>
              <div class="username ellipsis">昵称昵称昵称昵称昵称昵称</div>
              <div class="num flex align-center">已砍价<i class="block ellipsis">9</i><img :src="IconPath('zs_42_32.png')" class="" /></div>
              <img :src="IconPath('mk7_10.png')" class="mark" />
            </div>
          </div>
        </template>
        <div v-else class="noFamily flex align-center justify-center line-height-100 h-100">尚未加入家族</div>
      </div>
    </OutBox>
    <ConfirmPopup v-if="isShowConfirmPopup" class="confirmPopup" @clickClose="isShowConfirmPopup = false">
      <p class="flex align-center justify-center line-height-100">确认购买该礼包吗？</p>
      <p class="flex align-center justify-center line-height-100"><i>花费：25</i><img :src="IconPath('zs_42_32.png')" class="" /></p>
    </ConfirmPopup>
    <InviteBargainedPopup v-if="isShowInviteBargainedPopup" @clickClose="isShowInviteBargainedPopup = false" />
  </div>
</template>

<script>
import TextSwipe from './components/textSwipe.vue'
const ConfirmPopup = () => import('@/pages/celebration/components/confirmPopup.vue')
const InviteBargainedPopup = () => import('./popups/inviteBargainedPopup.vue')
export default {
  name: 'peopleBargained',
  props: [''],
  components: { TextSwipe, ConfirmPopup, InviteBargainedPopup },
  data() {
    return {
      isShowConfirmPopup: false,
      isShowInviteBargainedPopup: false,
      swipeList: []
    }
  },
  watch: {},
  mounted() {
    this.swipeList = [
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' },
      { username: '123123', content: '1231231', profile_image: 'https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg' }
    ]
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.confirmPopup {
  p:nth-child(1) {
    font-weight: 500;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 49px;
  }
  p:nth-child(2) {
    margin-bottom: 37px;
  }
  img {
    width: 38px;
  }
  i {
    font-weight: 400;
    font-size: 30px;
    color: #FFF663;
  }
}
.peopleBargained {
  z-index: 1;
  .shop {
    width: 750px;
    height: 652px;
    background: url('@/pages/celebration/assets/mk7_1.png') no-repeat left top/100% 100%;
    padding-top: 26px;
    .swipeDiv{
      width: 750px;
      height: 128px;
      background: url('@/pages/celebration/assets/mk8_4.png') no-repeat left top/100% 100%;
    }
    .goodsList {
      margin-top: 263px;
      height: 179px;
      .goods {
        padding-top: 23px;
        width: 175px;
        height: 179px;
        background: url('@/pages/celebration/assets/mk7_2.png') no-repeat left top/100% 100%;
        &:nth-child(2) {
          margin: 0 22px;
        }
        .typeLabel {
          top: 11px;
          right: -11px;
          height: 30px;
          padding: 0 7px;
          background: #D67FFF;
          border-radius: 99999999px;
          font-weight: 500;
          font-size: 18px;
          color: #FFFFFF;
        }
        .goodsIcon {
          width: 120px;
          height: 120px;
        }
        .goodsText {
          margin-top: -12px;
          width: 140px;
          height: 36px;
          background: #8966F0;
          border-radius: 999999px;
          font-size: 24px;
          color: #F5F5F8;
        }
      }
    }
  }
  .bargained {
    width: 750px;
    height: 783px;
    background: linear-gradient(0deg, #8B83F7, #765FCE);
    padding-top: 26px;
    .over {
      z-index: 1;
      left: 0;
      top: 225px;
      width: 750px;
      height: 90px;
      background: rgba(37, 27, 75, 0.75);
      >img {
        width: 647px;
      }
    }
    .bargainedMain {
      width: 712px;
      height: 448px;
      background: rgba(70,46,158,0.5);
      border-radius: 32px;
      border: 2px solid rgba(255,255,255,0.5);
      box-shadow: inset 0 0 20px 5px rgba(255,255,255,0.5);
      margin-bottom: 14px;
      .familyName {
        margin-top: -5px;
        width: 511px;
        height: 70px;
        background: url('@/pages/celebration/assets/mk7_3.png') no-repeat left top/100% 100%;
        .innerText {
          font-weight: 600;
          font-size: 30px;
          color: transparent;
          background: linear-gradient(-90deg, #C663FF, #9B5EFF);
          -webkit-background-clip: text;
        }
      }
      .currentPrice {
        padding: 17px 0;
        margin-top: 33px;
        width: 588px;
        height: 184px;
        background: url('@/pages/celebration/assets/mk7_7.png') no-repeat left top/100% 100%;
        margin-bottom: 24px;
        >p {
          font-size: 26px;
          color: #FFFFFF;
        }
        .nowPrice {
          font-weight: 500;
          font-size: 66px;
          color: #FFEE8F;
          >img {
            margin-left: 8px;
            width: 42px;
            height: 32px;
          }
        }
        .discountLabel {
          top: -46px;
          right: -44px;
          width: 168px;
          height: 167px;
        }
        .oldPrice {
          font-size: 26px;
          color: #FFFFFF;
          &::after {
            content: '';
            width: 120%;
            height: 3px;
            background: #8564FF;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .buttons {
        .buy {
          width: 304px;
          height: 93px;
          font-size: 30px;
          color: #FFFFFF;
          background: url('@/pages/celebration/assets/mk7_5.png') no-repeat left top/100% 100%;
          &.has_right_2 {
            background-image: url('@/pages/celebration/assets/mk7_5_1.png');
            pointer-events: none;
          }
        }
        .cut {
          width: 308px;
          height: 119px;
          background: url('@/pages/celebration/assets/mk7_6.png') no-repeat left top/100% 100%;
          margin-left: 21px;
          font-size: 32px;
          color: #FFFFFF;
          padding: 27px 0;
          &.has_right_2 {
            background-image: url('@/pages/celebration/assets/mk7_6_1.png');
            pointer-events: none;
          }
          i {
            font-size: 24px;
            color: #FDFF6B;
          }
        }
      }
    }
    .rules-text {
      li {
        color: #FFFFFF;
      }
    }
  }
  .task {
    margin-top: 104px;
    height: 298 + 338 + 804px;
    padding-left: 36px;
    .taskItem {
      width: 674px;
      height: 154px;
      margin-bottom: 6px;
      background: url('@/pages/celebration/assets/mk8_26.png') no-repeat left top/100% 100%;
      padding: 0 44px 0 60px;
      .taskBtn {
        margin-left: 29px;
        width: 126px;
        height: 66px;
      }
      .taskText {
        flex: 1;
        padding: 38px 0 41px;
      }
      p {
        font-size: 27px;
        color: #FFFFFF;
        i {
          font-size: 24px;
          color: #FFEF85;
        }
      }
    }
    .bargainedUsers {
      margin-left: 22px;
      margin-top: 24px;
      width: 635px;
      height: 546px;
      background: rgba(149, 137, 248, 0.7);
      border-radius: 30px;
      padding-top: 26px;
      .noFamily {
        font-size: 26px;
        color: #FFFFFF;
      }
      .currentBargainedUsers {
        width: 638px;
        height: 71px;
        font-size: 26px;
        color: #FFFFFF;
        background: url('@/pages/celebration/assets/mk7_11.png') no-repeat left top/100% 100%;
        i {
          color: #FFEC4A;
        }
        img {
          width: 34px;
        }
      }
      .scrollHead {
        height: 65px;
        font-weight: 500;
        font-size: 24px;
        color: #FFFFFF;
        .head1 {
          margin-left: 107px;
        }
        .head2 {
          margin-left: 96px;
        }
      }
      .scrollList {
        .item {
          height: 70px;
          font-size: 24px;
          color: #FFFFFF;
          .rank {
            width: 55px;
            margin-right: 31px;
          }
          .username {
            width: 220px;
            margin-right: 10px;
          }
          .num {
            i {
              max-width: 70px;
              color: #FFEC4A;
            }
            >img {
              width: 34px;
            }
          }
          .mark {
            width: 107px;
            height: 43px;
            margin-right: 18px;
            margin-left: auto;
          }
        }
      }
    }
    .inviteBtn {
      top: 427 + 298px;
      right: -8px;
      width: 51px;
      height: 166px;
    }
  }
}
</style>
