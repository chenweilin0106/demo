<template>
  <div class="rankCom">
    <div class="rankArea margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea position-relative">
        <div v-for="(item,index) in rankListShow.slice(0,3)" :key="`${item.uid}+${index}`" class="topItem flex-shrink-0 position-absolute line-height-1" :class="`topItem_${item.rank}`">
          <div class="topItemAvatarBorder position-row-center position-absolute">
            <img class="radius-50 fit-cover block position-absolute position-row-center topItemAvatar" v-lazy="IconPath(item.profile_image || avatarDefault)" @error="imgAtError" />
          </div>
          <div class="topItemUsername ellipsis position-absolute">{{ item.username }}</div>
          <template v-if="item.rank != 1">
            <div class="topItemNumText position-absolute">距离上一名</div>
            <div class="topItemNum position-absolute">{{ item.diff || 0 }}{{ valueName }}</div>
          </template>
        </div>
      </div>
      <div class="remainArea">
        <div class="remainItem position-relative" v-for="(item,index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{item.rank}}</div>
          <img class="totalRankItemAvatar fit-cover radius-50 position-absolute position-column-center" v-lazy="IconPath(item.profile_image || avatarDefault)" @error="imgAtError" />
          <div class="totalRankItemName position-absolute position-column-center ellipsis">{{item.username}}</div>
          <div class="totalRankItemTime position-absolute position-column-center">
            <p>距离上一名</p>
            <span>{{ item.diff || 0 }}{{ valueName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="userRankArea position-relative line-height-1">
      <div class="totalRankIcon position-absolute position-column-center flex align-center justify-center">{{userRankShow.rank?userRankShow.rank:`${rankListShow.length}+`}}</div>
      <img class="totalRankAvatar position-absolute position-column-center" v-lazy="IconPath(userRankShow.profile_image||avatarDefault)" @error="imgAtError" />
      <div :class="['totalRankName ellipsis position-absolute position-column-center']">{{userRankShow.username}}</div>
      <div class="isShowNameDiv position-absolute flex align-center">
        <span>公开昵称&nbsp;</span>
        <div :class="['isShowBtn', userRankShow.is_show_name == 1?null:'statusShow']" @click="$emit('isShowBtnCk')"></div>
      </div>
      <div :class="['totalRankTime position-absolute line-height-1']">{{userRankShow.score || 0}}<span>{{valueName}}</span></div>
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'

export default {
  name: 'rankCom2', // 神豪榜 无虚拟形象 无宠物头像 昵称显隐 示例：20260212情人节活动
  components: { },
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('神豪值'),
      avatarDefault: Object.freeze('avatarDefault.png')
    }
  },
  methods: {
    scrollRank() {
      if (this.$refs.rankRef && this.$refs.rankRef.scrollTop > 0) this.$refs.rankRef.scrollTo({ top: 0, behavior: 'instant' })
    },
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.rankArea{
  z-index: 1;
  height: 1258px;
  padding-bottom: 67px;
  .topArea {
    height: 514px;
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
        font-size: 26px;
        color: #FFFFFF;
        text-align: center;
      }
      .topItemNumText {
        font-size: 20px;
        color: #A96D28;
      }
      .topItemNum {
        text-align: center;
        font-size: 22px;
        color: #A96D28;
      }
      &.topItem_1{
        top: 115px;
        left: 50%;
        transform: translateX(-50%);
        width: 266px;
        height: 482px;
        background-image: url('@/assets/mk6_23.png');
        .topItemAvatarBorder{
          z-index: 1;
          top: -94px;
          width: 408px;
          height: 212px;
          .topItemAvatar{
            z-index: 1;
            top: 63px;
            width: 130px;
            height: 130px;
          }
          &::before {
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 408px;
            height: 212px;
            background: url('@/assets/mk6_22.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 130px;
          left: 44px;
          width: 181px;
        }
      }
      &.topItem_2{
        top: 245px;
        left: 0;
        width: 266px;
        height: 482px;
        background-image: url('@/assets/mk6_25.png');
        .topItemAvatarBorder{
          z-index: 1;
          top: -94px;
          width: 408px;
          height: 212px;
          .topItemAvatar{
            top: 72px;
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
            width: 408px;
            height: 212px;
            background: url('@/assets/mk6_24.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 105px;
          left: 56px;
          width: 159px;
        }
        .topItemNumText{
          top: 142px;
          left: 85px;
        }
        .topItemNum{
          top: 170px;
          left: 56px;
          width: 159px;
        }
      }
      &.topItem_3{
        top: 245px;
        right: 0;
        width: 266px;
        height: 482px;
        background-image: url('@/assets/mk6_27.png');
        .topItemAvatarBorder{
          z-index: 1;
          top: -94px;
          width: 408px;
          height: 212px;
          .topItemAvatar{
            top: 72px;
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
            width: 408px;
            height: 212px;
            background: url('@/assets/mk6_26.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 105px;
          left: 56px;
          width: 159px;
        }
        .topItemNumText{
          top: 142px;
          left: 85px;
        }
        .topItemNum{
          top: 170px;
          left: 56px;
          width: 159px;
        }
      }
    }
  }
  .remainArea{
    .remainItem{
      width: 664px;
      height: 143px;
      background: url('@/assets/mk6_36.png') no-repeat left top/100% 100%;
      margin: 0 auto 7px;
      .totalRankItemIcon{
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #FFE683;
        left: 20px;
        background: url('@/assets/mk6_37.png') no-repeat left top/100% 100%;
      }
      .totalRankItemAvatar{
        width: 86px;
        height: 86px;
        border: 3px solid transparent;
        background-color: #E4B65C;
        left: 91px;
      }
      .totalRankItemName{
        width: 220px;
        font-size: 26px;
        left: 186px;
      }
      .totalRankItemTime{
        font-size: 24px;
        color: #FFFFFF;
        text-align: right;
        right: 46px;
        p{
          font-size: 22px;
          color: #884425;
          margin-bottom: 18px;
        }
      }
    }
  }
}
.userRankArea{
  z-index: 2;
  width: 715px;
  height: 147px;
  background: url('@/assets/mk6_38.png') no-repeat left top/100% 100%;
  margin: -67px auto 10px;
  .totalRankIcon{
    width: 68px;
    height: 67px;
    font-weight: 500;
    font-size: 22px;
    color: #FFF2A9;
    left: 22px;
    background: url('@/assets/mk6_39.png') no-repeat left top/100% 100%;
  }
  .totalRankAvatar{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 4px solid transparent;
    background-color: #E89161;
    object-fit: cover;
    left: 95px;
  }
  .totalRankName{
    width: 220px;
    font-size: 26px;
    left: 197px;
  }
  .isShowNameDiv{
    font-size: 22px;
    color: #FFEF85;
    right: 47px;
    top: 40px;
    .isShowBtn{
      width: 58px;
      height: 29px;
      background: url('@/assets/mk6_40.png') no-repeat left top/100% 100%;
      &.statusShow{
        background: url('@/assets/mk6_41.png') no-repeat left top/100% 100%;
      }
    }
  }
  .totalRankTime{
    font-size: 24px;
    color: #FFFFFF;
    text-align: right;
    right: 49px;
    bottom: 44px;
  }
}
</style>
