<template>
  <div class="rankCom">
    <div class="rankArea margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea position-relative">
        <div class="topItem flex-shrink-0 position-absolute line-height-1" v-for="(item, index) in rankListShow.slice(0, 3)" :key="`${item.uid}+${index}`" :class="`topItem_${item.rank}`">
          <div v-if="item.rank != 1" class="topItemRankBorder position-absolute"></div>
          <div class="topItemUserDiv topItemLeftUser position-absolute flex-column align-center">
            <img class="topItemAvatar" v-lazy="IconPath(item.cp_info[0].profile_image || avatarDefault)" @click="toUserMain(item.cp_info[0].uid)" @error="imgAtError" />
            <span class="topItemNameDiv text-center ellipsis">{{ item.cp_info[0].username }}</span>
            <div :class="['topItemUid', 'userPrettyCode']">
              <lazy-component class="havenBg" v-if="item.cp_info[0].pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.cp_info[0].pretty_type]"></PublicImg>
              </lazy-component>
              <span v-if="item.cp_info[0].pretty_type != 0" :class="['prettyCode', `color${item.cp_info[0].pretty_type}`]">{{ item.cp_info[0].code }}</span>
              <span v-else class="noPrettyCode">ID:{{ item.cp_info[0].code || '--' }}</span>
            </div>
          </div>
          <div class="topItemUserDiv topItemRightUser position-absolute flex-column align-center">
            <img class="topItemAvatar" v-lazy="IconPath(item.cp_info[1].profile_image || avatarDefault)" @click="toUserMain(item.cp_info[1].uid)" @error="imgAtError" />
            <span class="topItemNameDiv text-center ellipsis">{{ item.cp_info[1].username }}</span>
            <div :class="['topItemUid', 'userPrettyCode']">
              <lazy-component class="havenBg" v-if="item.cp_info[1].pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.cp_info[1].pretty_type]"></PublicImg>
              </lazy-component>
              <span v-if="item.cp_info[1].pretty_type != 0" :class="['prettyCode', `color${item.cp_info[1].pretty_type}`]">{{ item.cp_info[1].code }}</span>
              <span v-else class="noPrettyCode">ID:{{ item.cp_info[1].code || '--' }}</span>
            </div>
          </div>
          <div class="topItemNumDiv flex-column align-center justify-between position-absolute text-center">
            <p class="topItemNumTextP">{{ valueName }}</p>
            <p class="topItemNumP">{{ item.score }}</p>
          </div>
        </div>
      </div>
      <div class="remianArea">
        <div class="reaminItem position-relative line-height-1" v-for="(item, index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{ item.rank }}</div>
          <div class="totalRankItemUserDiv totalRankItemLeftUser position-absolute flex-column align-center">
            <img class="totalRankItemAvatar" v-lazy="IconPath(item.cp_info[0].profile_image || avatarDefault)" @click="toUserMain(item.cp_info[0].uid)" @error="imgAtError" />
            <span class="totalRankItemNameDiv text-center ellipsis">{{ item.cp_info[0].username }}</span>
            <div :class="['totalRankItemUid', 'userPrettyCode']">
              <lazy-component class="havenBg" v-if="item.cp_info[0].pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.cp_info[0].pretty_type]"></PublicImg>
              </lazy-component>
              <span v-if="item.cp_info[0].pretty_type != 0" :class="['prettyCode', `color${item.cp_info[0].pretty_type}`]">{{ item.cp_info[0].code }}</span>
              <span v-else class="noPrettyCode">ID:{{ item.cp_info[0].code || '--' }}</span>
            </div>
          </div>
          <div class="totalRankItemUserDiv totalRankItemRightUser position-absolute flex-column align-center">
            <img class="totalRankItemAvatar" v-lazy="IconPath(item.cp_info[1].profile_image || avatarDefault)" @click="toUserMain(item.cp_info[1].uid)" @error="imgAtError" />
            <span class="totalRankItemNameDiv text-center ellipsis">{{ item.cp_info[1].username }}</span>
            <div :class="['totalRankItemUid', 'userPrettyCode']">
              <lazy-component class="havenBg" v-if="item.cp_info[1].pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.cp_info[1].pretty_type]"></PublicImg>
              </lazy-component>
              <span v-if="item.cp_info[1].pretty_type != 0" :class="['prettyCode', `color${item.cp_info[1].pretty_type}`]">{{ item.cp_info[1].code }}</span>
              <span v-else class="noPrettyCode">ID:{{ item.cp_info[1].code || '--' }}</span>
            </div>
          </div>
          <div class="totalRankItemNumDiv position-absolute position-row-center flex-column align-center justify-between">
            <div class="totalRankItemNumIcon"></div>
            <p class="totalRankItemNumTextP">{{ valueName }}</p>
            <p class="totalRankItemNumP">{{ item.score }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="userRankArea position-relative line-height-1">
      <!-- <template v-if="userRankShow.tuid && userRankShow.tuid > 0"> -->
      <div class="userRankBorder position-absolute position-column-center flex align-center justify-center">{{ userRankShow.rank ? userRankShow.rank : `${rankListShow.length}+` }}</div>
      <div class="userRankUserDiv userRankLeftUser position-absolute flex-column align-center">
        <img class="userRankAvatar" v-lazy="IconPath(userRankShow.cp_info[0].profile_image || avatarDefault)" @click="toUserMain(userRankShow.cp_info[0].uid)" @error="imgAtError" />
        <span class="userRankNameDiv ellipsis text-center">{{ userRankShow.cp_info[0].username }}</span>
        <div :class="['userRankUid', 'userPrettyCode']">
          <lazy-component class="havenBg" v-if="userRankShow.cp_info[0].pretty_type != 0">
            <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.cp_info[0].pretty_type]"></PublicImg>
          </lazy-component>
          <span v-if="userRankShow.cp_info[0].pretty_type != 0" :class="['prettyCode', `color${userRankShow.cp_info[0].pretty_type}`]">{{ userRankShow.cp_info[0].code }}</span>
          <span v-else class="noPrettyCode">ID:{{ userRankShow.cp_info[0].code || '--' }}</span>
        </div>
      </div>
      <div class="userRankUserDiv userRankRightUser position-absolute flex-column align-center">
        <img class="userRankAvatar" v-lazy="IconPath(userRankShow.cp_info[1].profile_image || avatarDefault)" @click="toUserMain(userRankShow.cp_info[1].uid)" @error="imgAtError" />
        <span class="userRankNameDiv ellipsis text-center">{{ userRankShow.cp_info[1].username }}</span>
        <div :class="['userRankUid', 'userPrettyCode']">
          <lazy-component class="havenBg" v-if="userRankShow.cp_info[1].pretty_type != 0">
            <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.cp_info[1].pretty_type]"></PublicImg>
          </lazy-component>
          <span v-if="userRankShow.cp_info[1].pretty_type != 0" :class="['prettyCode', `color${userRankShow.cp_info[1].pretty_type}`]">{{ userRankShow.cp_info[1].code }}</span>
          <span v-else class="noPrettyCode">ID:{{ userRankShow.cp_info[1].code || '--' }}</span>
        </div>
      </div>
      <div class="userRankNumDiv position-absolute position-row-center flex-column align-center justify-between">
        <div class="userRankNumIcon"></div>
        <p class="userRankNumTextP">{{ valueName }}</p>
        <p class="userRankNumP">{{ userRankShow.score }}</p>
      </div>
      <!-- </template> -->
      <!-- <template v-else>
        <div class="userRankShowTip1">你还没有绑定活动CP，快去绑定吧！</div>
        <div class="jumpCpDiv" @click="jumpCpCk"></div>
      </template> -->
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom3', // 甜蜜榜（双人榜） 无虚拟形象 无昵称显隐 示例：2025开服活动
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('甜蜜值'),
      avatarDefault: Object.freeze('avatarDefault.png')
    }
  },
  methods: {
    scrollRank() {
      if (this.$refs.rankRef && this.$refs.rankRef.scrollTop > 0) this.$refs.rankRef.scrollTo({ top: 0, behavior: 'instant' })
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.rankArea {
  z-index: 1;
  height: 1441px;
  padding-bottom: 105px;
  .topArea {
    height: 711px;
    .topItem {
      background: no-repeat left top/100% 100%;
      .topItemRankBorder {
        width: 62px;
        height: 54px;
        top: 17px;
        left: 160px;
        background: no-repeat left top/100% 100%;
      }
      .topItemUserDiv {
        .topItemAvatar {
          border: 4px solid transparent;
          background: #ffe993;
          border-radius: 50%;
        }
        .topItemNameDiv {
          color: #ffffff;
        }
        .topItemUid {
          width: 160px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff36d;
        }
      }
      .topItemNumDiv {
        width: 239px;
        height: 63px;
        background: url('@/assets/mk8_29.png') no-repeat left top/100% 100%;
        top: 220px;
        padding: 9px 0;
        .topItemNumTextP {
          font-size: 20px;
          color: #ffffff;
        }
        .topItemNumP {
          font-weight: 500;
          font-size: 22px;
          color: #ffef85;
        }
      }
      &.topItem_1 {
        width: 526px;
        height: 399px;
        background-image: url('@/assets/mk8_25.png');
        left: 112px;
        top: 28px;
        .topItemUserDiv {
          top: 93px;
          .topItemAvatar {
            width: 98px;
            height: 98px;
            margin-bottom: 10px;
          }
          .topItemNameDiv {
            width: 168px;
            font-size: 26px;
          }
          .topItemUid {
            font-size: 20px;
          }
          &.topItemLeftUser {
            left: 50%;
            transform: translateX(-104%);
          }
          &.topItemRightUser {
            right: 50%;
            transform: translateX(104%);
          }
        }
        .topItemNumDiv {
          top: 279px;
          left: 138px;
        }
      }
      &.topItem_2,
      &.topItem_3 {
        width: 362px;
        height: 304px;
        background-image: url('@/assets/mk8_26.png');
        left: 13px;
        top: 390px;
        .topItemRankBorder {
          background-image: url('@/assets/mk8_27.png');
        }
        .topItemUserDiv {
          top: 57px;
          .topItemAvatar {
            width: 88px;
            height: 88px;
            margin-bottom: 8px;
          }
          .topItemNameDiv {
            width: 130px;
            font-size: 22px;
          }
          .topItemUid {
            font-size: 18px;
          }
          &.topItemLeftUser {
            left: 50%;
            transform: translateX(-90%);
          }
          &.topItemRightUser {
            right: 50%;
            transform: translateX(100%);
          }
        }
        .topItemNumDiv {
          top: 220px;
          left: 67px;
        }
      }
      &.topItem_3 {
        left: 354px;
        .topItemRankBorder {
          background-image: url('@/assets/mk8_28.png');
        }
        .topItemLeftUser {
          left: 50%;
          transform: translateX(-89%) !important;
        }
        .topItemRightUser {
          right: 50%;
          transform: translateX(102%) !important;
        }
      }
    }
  }
  .remianArea {
    .reaminItem {
      width: 668px;
      height: 176px;
      background: url('@/assets/mk8_31.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px;
      .totalRankItemIcon {
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #ffffff;
        left: 18px;
        background: url('@/assets/mk8_30.png') no-repeat left top/100% 100%;
      }
      .totalRankItemUserDiv {
        top: 15px;
        .totalRankItemAvatar {
          width: 88px;
          height: 88px;
          border: 4px solid transparent;
          background: #ffe993;
          border-radius: 50%;
          margin-bottom: 6px;
        }
        .totalRankItemNameDiv {
          width: 160px;
          font-size: 24px;
          color: #ffffff;
        }
        .totalRankItemUid {
          width: 160px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #ffe467;
        }
      }
      .totalRankItemLeftUser {
        left: 50%;
        transform: translateX(-133%);
      }
      .totalRankItemRightUser {
        right: 50%;
        transform: translateX(133%);
      }
      .totalRankItemNumDiv {
        top: 23px;
        .totalRankItemNumIcon {
          width: 44px;
          height: 39px;
          background: url('@/assets/mk8_34.png') no-repeat left top/100% 100%;
        }
        .totalRankItemNumTextP {
          margin-top: -2px;
          margin-bottom: 10px;
          font-size: 18px;
          color: #ffffff;
        }
        .totalRankItemNumP {
          font-weight: 500;
          font-size: 22px;
          color: #ffef85;
        }
      }
    }
  }
}
.userRankArea {
  z-index: 2;
  width: 732px;
  height: 176px;
  background: url('@/assets/mk8_33.png') no-repeat left top/100% 100%;
  margin: -100px auto 0;
  .userRankBorder {
    left: 56px;
    width: 68px;
    height: 68px;
    background: url('@/assets/mk8_32.png') no-repeat left top/100% 100%;
    font-weight: 500;
    font-size: 26px;
    color: #ffffff;
  }
  .userRankUserDiv {
    top: 15px;
    .userRankAvatar {
      width: 88px;
      height: 88px;
      border: 4px solid transparent;
      background: #ffe993;
      border-radius: 50%;
      margin-bottom: 6px;
    }
    .userRankNameDiv {
      font-size: 24px;
      color: #ffffff;
      width: 160px;
    }
    .userRankUid {
      width: 160px;
      height: 37px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #ffe467;
    }
  }
  .userRankLeftUser {
    left: 50%;
    transform: translateX(-133%);
  }
  .userRankRightUser {
    right: 50%;
    transform: translateX(133%);
  }
  .userRankNumDiv {
    top: 23px;
    .userRankNumIcon {
      width: 44px;
      height: 39px;
      background: url('@/assets/mk8_34.png') no-repeat left top/100% 100%;
    }
    .userRankNumTextP {
      margin-top: -2px;
      margin-bottom: 10px;
      font-size: 18px;
      color: #ffffff;
    }
    .userRankNumP {
      font-weight: 500;
      font-size: 22px;
      color: #ffef85;
    }
  }
  // .userRankShowTip1 {
  //   font-weight: 500;
  //   font-size: 26px;
  //   color: #ffffff;
  //   position: absolute;
  //   left: 80px;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
  // .jumpCpDiv {
  //   width: 149px;
  //   height: 52px;
  //   // background: url('@/pages/valentineDay/assets/mk7_24.png') no-repeat left top/100% 100%;
  //   position: absolute;
  //   right: 80px;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
}
</style>
