<template>
  <div class="rankCom">
    <div class="rankArea margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea position-relative">
        <div v-for="(item, index) in rankListShow.slice(0, 3)" :key="`${item.uid}+${index}`" class="topItem flex-shrink-0 position-absolute line-height-1" :class="`topItem_${item.rank}`">
          <div class="topItemAvatarBorder position-row-center position-absolute">
            <img class="radius-50 fit-cover block position-absolute position-row-center topItemAvatar" v-lazy="IconPath(item.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(item.uid)" />
          </div>
          <div class="topItemUsername ellipsis position-absolute position-row-center">{{ item.username }}</div>
          <div class="position-absolute position-row-center userPrettyCode topItemUid">
            <lazy-component class="havenBg" v-if="item.pretty_type != 0">
              <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
            </lazy-component>
            <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]">{{ item.code }}</span>
            <span v-else class="noPrettyCode">ID:{{ item.code || '--' }}</span>
          </div>
          <div class="topItemNumText position-absolute position-row-center">{{ valueName }}</div>
          <div class="topItemNum ellipsis position-absolute position-row-center">{{ item.score }}</div>
        </div>
      </div>
      <div class="remainArea">
        <div class="remainItem position-relative line-height-1" v-for="(item, index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{ item.rank }}</div>
          <img class="totalRankItemAvatar fit-cover radius-50 position-absolute position-column-center" v-lazy="IconPath(item.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(item.uid)" />
          <div class="totalRankItemName position-absolute ellipsis">{{ item.username }}</div>
          <div class="position-absolute userPrettyCode totalRankItemUid">
            <lazy-component class="havenBg" v-if="item.pretty_type != 0">
              <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
            </lazy-component>
            <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]">{{ item.code }}</span>
            <span v-else class="noPrettyCode">ID:{{ item.code || '--' }}</span>
          </div>
          <div class="totalRankItemTime position-absolute position-column-center">
            <p>{{ valueName }}</p>
            <span>{{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="userRankArea position-relative line-height-1">
      <div class="totalRankIcon position-absolute position-column-center flex align-center justify-center">{{ userRankShow.rank ? userRankShow.rank : `${rankListShow.length}+` }}</div>
      <img class="totalRankAvatar position-absolute position-column-center" v-lazy="IconPath(userRankShow.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(userRankShow.uid)" />
      <div :class="['totalRankName ellipsis position-absolute', 'status1']">{{ userRankShow.username }}</div>
      <div class="position-absolute userPrettyCode totalRankCode">
        <lazy-component class="havenBg" v-if="userRankShow.pretty_type != 0">
          <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]" />
        </lazy-component>
        <span v-if="userRankShow.pretty_type != 0" :class="['prettyCode', `color${userRankShow.pretty_type}`]">{{ userRankShow.code }}</span>
        <span v-else class="noPrettyCode">ID:{{ userRankShow.code || '--' }}</span>
      </div>
      <div :class="['totalRankTime position-absolute line-height-1 position-column-center']">
        {{ userRankShow.score }}<span>{{ valueName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom1', // 人气榜 无虚拟形象 无昵称显隐 示例：2025开服活动
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('人气值'),
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
  height: 1410px;
  padding-bottom: 43px;
  .topArea {
    height: 580px;
    .topItem {
      background: no-repeat left top/100% 100%;
      .topItemAvatarBorder {
        background: no-repeat left top/100% 100%;
        &::before {
          content: '';
          pointer-events: none;
        }
      }
      .topItemUsername {
        width: 153px;
        font-size: 26px;
        color: #ffffff;
        text-align: center;
      }
      .topItemUid {
        font-size: 22px;
        color: #ffef85;
        width: 160px;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .topItemNumText {
        font-size: 20px;
        color: #d9c9ae;
      }
      .topItemNum {
        text-align: center;
        width: 75%;
        font-size: 22px;
        color: #ffef85;
      }
      &.topItem_1 {
        top: 65px;
        left: 50%;
        transform: translateX(-50%);
        width: 223px;
        height: 394px;
        background-image: url('@/assets/mk8_13.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -27px;
          width: 401px;
          height: 237px;
          .topItemAvatar {
            z-index: 1;
            top: 61px;
            width: 120px;
            height: 120px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/assets/mk8_12.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername {
          top: 215px;
        }
        .topItemUid {
          top: 245px;
        }
        .topItemNumText {
          top: 293px;
        }
        .topItemNum {
          top: 319px;
        }
      }
      &.topItem_2 {
        top: 220px;
        left: 39px;
        width: 199px;
        height: 355px;
        background-image: url('@/assets/mk8_15.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -20px;
          width: 214px;
          height: 211px;
          .topItemAvatar {
            top: 55px;
            z-index: 1;
            width: 106px;
            height: 106px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/assets/mk8_14.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername {
          top: 194px;
        }
        .topItemUid {
          top: 222px;
        }
        .topItemNumText {
          top: 265px;
        }
        .topItemNum {
          top: 291px;
        }
      }
      &.topItem_3 {
        top: 220px;
        right: 39px;
        width: 199px;
        height: 355px;
        background-image: url('@/assets/mk8_17.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -20px;
          width: 214px;
          height: 211px;
          .topItemAvatar {
            top: 55px;
            z-index: 1;
            width: 106px;
            height: 106px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/assets/mk8_16.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername {
          top: 194px;
        }
        .topItemUid {
          top: 222px;
        }
        .topItemNumText {
          top: 265px;
        }
        .topItemNum {
          top: 291px;
        }
      }
    }
  }
  .remainArea {
    .remainItem {
      width: 664px;
      height: 143px;
      background: url('@/assets/mk8_19.png') no-repeat left top/100% 100%;
      margin: 0 auto 7px;
      .totalRankItemIcon {
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #ffe683;
        left: 20px;
        background: url('@/assets/mk8_18.png') no-repeat left top/100% 100%;
      }
      .totalRankItemAvatar {
        width: 86px;
        height: 86px;
        border: 3px solid transparent;
        background-color: #e8be6a;
        left: 91px;
      }
      .totalRankItemName {
        width: 220px;
        font-size: 26px;
        left: 186px;
        top: 40px;
      }
      .totalRankItemUid {
        left: 186px;
        top: 76px;
        color: #ffef85;
        font-size: 22px;
        width: 160px;
        height: 37px;
        display: flex;
        align-items: center;
      }
      .totalRankItemTime {
        font-size: 24px;
        color: #ffffff;
        text-align: right;
        right: 46px;
        p {
          font-size: 22px;
          color: #ad601c;
          margin-bottom: 16px;
        }
      }
    }
  }
}
.userRankArea {
  z-index: 2;
  width: 715px;
  height: 147px;
  background: url('@/assets/mk8_21.png') no-repeat left top/100% 100%;
  margin: -43px auto 10px;
  .totalRankIcon {
    width: 68px;
    height: 67px;
    font-weight: 500;
    font-size: 22px;
    color: #fff2a9;
    left: 42px;
    background: url('@/assets/mk8_20.png') no-repeat left top/100% 100%;
  }
  .totalRankAvatar {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 4px solid transparent;
    background-color: #e8be6a;
    object-fit: cover;
    left: 115px;
  }
  .totalRankName {
    width: 220px;
    font-size: 26px;
    left: 212px;
    top: 38px;
  }
  .totalRankCode {
    font-size: 22px;
    color: #ffef85;
    left: 212px;
    top: 82px;
    width: 160px;
    height: 37px;
    display: flex;
    align-items: center;
  }
  .totalRankTime {
    font-size: 24px;
    color: #ffffff;
    text-align: right;
    right: 57px;
  }
}
</style>
