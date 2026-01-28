<template>
  <div class="rankCom">
    <div class="rankArea margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea position-relative flex-column align-center">
        <div v-for="(item, index) in rankListShow.slice(0, 3)" :key="`${item.family_id}+${index}`" class="topItem flex-shrink-0 line-height-1 position-relative" :class="`topItem_${item.rank}`">
          <div class="topItemAvatarBorder position-absolute">
            <img class="radius-50 fit-cover block position-absolute position-row-center topItemAvatar" v-lazy="IconPath(item.icon || avatarDefault)"  alt="" @error="imgAtError" @click="toFamilyHome(item.family_id)" />
          </div>
          <div class="topItemUsername ellipsis position-absolute">{{ item.family_name }}</div>
          <div class="topItemFamilyUsersList position-absolute position-row-center overflow-hidden">
            <div v-for="(user, userIndex) in item.family_users" :key="`${item.family_id}+${user.user_id}+${userIndex}`" class="topItemFamilyUsersItem position-relative w-100">
              <div class="topItemFamilyUsersItemRankIcon flex align-center justify-center position-absolute position-column-center">{{ userIndex + 1 }}</div>
              <img class="topItemFamilyUsersItemAvatar fit-cover radius-50 position-absolute position-column-center" v-lazy="IconPath(user.user_profile_image || avatarDefault)"  alt="" @error="imgAtError" @click="toUserMain(user.user_id)" />
              <div class="topItemFamilyUsersItemName ellipsis position-absolute position-column-center">{{ user.user_name }}</div>
              <div class="topItemFamilyUsersItemNum position-absolute position-column-center">{{ user.time }}</div>
            </div>
          </div>
          <div class="topItemNum ellipsis position-absolute">{{ valueName }}：{{ item.score }}</div>
        </div>
      </div>
      <div class="remainArea">
        <div class="remainItem position-relative line-height-1" v-for="(item, index) in rankListShow.slice(3)" :key="`${item.family_id}+${index}`">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{ item.rank }}</div>
          <img class="totalRankItemAvatar fit-cover radius-50 position-absolute position-column-center" v-lazy="IconPath(item.icon || avatarDefault)"  alt="" @error="imgAtError" @click="toFamilyHome(item.family_id)" />
          <div class="totalRankItemName position-absolute position-column-center ellipsis">{{ item.family_name }}</div>
          <!-- <div class="position-absolute userPrettyCode totalRankItemUid"> -->
            <!-- <lazy-component class="havenBg" v-if="item.pretty_type != 0">
              <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
            </lazy-component>
            <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]">{{ item.code }}</span> -->
            <!-- <span class="noPrettyCode">ID:{{ item.code || '&#45;&#45;' }}</span> -->
          <!-- </div> -->
          <div class="totalRankItemTime position-absolute position-column-center">
            <p>{{ valueName }}</p>
            <span>{{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="userRankArea position-relative line-height-1">
      <template v-if="Number(userRankShow.family_id)">
        <div class="totalRankIcon position-absolute position-column-center flex align-center justify-center">{{ userRankShow.rank ? userRankShow.rank : `${rankListShow.length}+` }}</div>
        <img class="totalRankAvatar position-absolute position-column-center" v-lazy="IconPath(userRankShow.icon || avatarDefault)" alt="" @error="imgAtError" @click="toFamilyHome(userRankShow.family_id)" />
        <div class="totalRankName ellipsis position-absolute position-column-center">{{ userRankShow.family_name }}</div>
        <!-- <div class="position-absolute userPrettyCode totalRankCode"> -->
          <!-- <lazy-component class="havenBg" v-if="userRankShow.pretty_type != 0"> -->
            <!-- <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]" /> -->
          <!-- </lazy-component> -->
          <!-- <span v-if="userRankShow.pretty_type != 0" :class="['prettyCode', `color${userRankShow.pretty_type}`]">{{ userRankShow.code }}</span> -->
          <!-- <span class="noPrettyCode">ID:{{ userRankShow.code || '&#45;&#45;' }}</span> -->
        <!-- </div> -->
        <div class="totalRankTime position-absolute line-height-1 position-column-center">
          <p>{{ valueName }}</p>
          <span>{{ userRankShow.score }}</span>
        </div>
      </template>
      <div v-else class="noUserRank w-100 h-100 flex align-center justify-center line-height-1">尚未加入家族</div>
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toFamilyHome, toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom3', // 家族榜 无虚拟形象 无宠物 无昵称显隐 示例：2026春节
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('彩花'),
      avatarDefault: Object.freeze('avatarDefault.png')
    }
  },
  methods: {
    toUserMain,
    scrollRank() {
      if (this.$refs.rankRef && this.$refs.rankRef.scrollTop > 0) this.$refs.rankRef.scrollTo({ top: 0, behavior: 'instant' })
    },
    toFamilyHome,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.rankArea {
  z-index: 1;
  height: 1306px;
  padding-bottom: 43px;
  .topArea {
    .topItem {
      width: 675px;
      height: 465px;
      background: no-repeat left top/100% 100%;
      .topItemAvatarBorder {
        background: no-repeat left top/100% 100%;
        &::before {
          content: '';
          pointer-events: none;
        }
      }
      .topItemUsername {
        top: 69px;
        right: 113px;
        width: 205px;
        font-size: 26px;
        color: #ffffff;
        text-align: center;
      }
      .topItemNum {
        top: 114px;
        right: 113px;
        width: 205px;
        font-size: 22px;
        text-align: center;
      }
      .topItemFamilyUsersList {
        top: 175px;
        width: 581px;
        min-height: 241px;
        border-radius: 40px;
        .topItemFamilyUsersItem {
          height: 80px;
          &:nth-child(even) {
            background-color: #fff;
          }
          .topItemFamilyUsersItemRankIcon {
            left: 7px;
            width: 50px;
            height: 50px;
            font-weight: 500;
            font-size: 22px;
            color: #FFF088;
          }
          .topItemFamilyUsersItemAvatar {
            left: 63px;
            width: 68px;
            height: 68px;
            border: 4px solid transparent;
          }
          .topItemFamilyUsersItemName {
            left: 141px;
            width: 174px;
            font-size: 22px;
          }
          .topItemFamilyUsersItemNum {
            right: 38px;
            font-size: 22px;
          }
        }
      }
      &.topItem_1 {
        margin-top: 23px;
        background-image: url('@/pages/springFestival/assets/mk6_29.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -19px;
          left: -2px;
          width: 357px;
          height: 186px;
          .topItemAvatar {
            z-index: 1;
            top: 55px;
            width: 114px;
            height: 114px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/pages/springFestival/assets/mk6_36.png') no-repeat left top/100% 100%;
          }
        }
        .topItemNum {
          color: #A96D28;
        }
        .topItemFamilyUsersList {
          background: #FFF5D1;
          .topItemFamilyUsersItem {
            .topItemFamilyUsersItemRankIcon {
              background: url('@/pages/springFestival/assets/mk6_30.png') no-repeat left top/100% 100%;
            }
            .topItemFamilyUsersItemAvatar {
              background-color: #F6D68E;
            }
            .topItemFamilyUsersItemName {
              color: #A96D28;
            }
            .topItemFamilyUsersItemNum {
              color: #A96D28;
            }
          }
        }
      }
      &.topItem_2 {
        margin-top: -7px;
        background-image: url('@/pages/springFestival/assets/mk6_31.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -2px;
          left: 76px;
          width: 203px;
          height: 161px;
          .topItemAvatar {
            z-index: 1;
            top: 39px;
            width: 114px;
            height: 114px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/pages/springFestival/assets/mk6_37.png') no-repeat left top/100% 100%;
          }
        }
        .topItemNum {
          color: #FFEF85;
        }
        .topItemFamilyUsersList {
          background: #E3EFFF;
          .topItemFamilyUsersItem {
            .topItemFamilyUsersItemRankIcon {
              background: url('@/pages/springFestival/assets/mk6_32.png') no-repeat left top/100% 100%;
            }
            .topItemFamilyUsersItemAvatar {
              background-color: #B5C2F7;
            }
            .topItemFamilyUsersItemName {
              color: #576BC5;
            }
            .topItemFamilyUsersItemNum {
              color: #576BC5;
            }
          }
        }
      }
      &.topItem_3 {
        margin-top: -7px;
        margin-bottom: 8px;
        background-image: url('@/pages/springFestival/assets/mk6_33.png');
        .topItemAvatarBorder {
          z-index: 1;
          top: -2px;
          left: 76px;
          width: 203px;
          height: 161px;
          .topItemAvatar {
            z-index: 1;
            top: 39px;
            width: 114px;
            height: 114px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('@/pages/springFestival/assets/mk6_38.png') no-repeat left top/100% 100%;
          }
        }
        .topItemNum {
          color: #FFEF85;
        }
        .topItemFamilyUsersList {
          background: #FDEEE7;
          .topItemFamilyUsersItem {
            .topItemFamilyUsersItemRankIcon {
              background: url('@/pages/springFestival/assets/mk6_34.png') no-repeat left top/100% 100%;
            }
            .topItemFamilyUsersItemAvatar {
              background-color: #EEBBAD;
            }
            .topItemFamilyUsersItemName {
              color: #BA5C3B;
            }
            .topItemFamilyUsersItemNum {
              color: #BA5C3B;
            }
          }
        }
      }
    }
  }
  .remainArea {
    .remainItem {
      width: 668px;
      height: 137px;
      background: url('@/pages/springFestival/assets/mk6_21.png') no-repeat left top/100% 100%;
      margin: 0 auto 13px;
      .totalRankItemIcon{
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #FFE683;
        left: 22px;
        background: url('@/pages/springFestival/assets/mk6_23.png') no-repeat left top/100% 100%;
      }
      .totalRankItemAvatar{
        width: 86px;
        height: 86px;
        border: 3px solid transparent;
        background-color: #E15C1A;
        left: 93px;
      }
      .totalRankItemName{
        width: 220px;
        font-size: 26px;
        left: 188px;
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
        right: 48px;
        p {
          font-size: 22px;
          color: #ad601c;
          margin-bottom: 13px;
        }
      }
    }
  }
}
.userRankArea {
  z-index: 2;
  width: 739px;
  height: 137px;
  background: url('@/pages/springFestival/assets/mk6_22.png') no-repeat left top/100% 100%;
  margin: -43px 0 10px -13px;
  .totalRankIcon{
    width: 66px;
    height: 65px;
    font-weight: 500;
    font-size: 26px;
    color: #FFF2A9;
    left: 31px;
    background: url('@/pages/springFestival/assets/mk6_24.png') no-repeat left top/100% 100%;
  }
  .totalRankAvatar{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 3px solid transparent;
    background-color: #F38751;
    object-fit: cover;
    left: 102px;
  }
  .totalRankName{
    width: 220px;
    font-size: 26px;
    left: 198px;
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
    color: #FFFFFF;
    text-align: right;
    right: 61px;
    p {
      font-size: 22px;
      color: #FFEE7F;
      margin-bottom: 13px;
    }
  }
  .noUserRank {
    font-size: 26px;
    color: #ffffff;
  }
}
</style>
