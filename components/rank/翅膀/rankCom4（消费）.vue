<template>
  <div class="rankCom">
    <div class="rankArea margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea position-relative">
        <div v-for="(item,index) in rankListShow.slice(0,3)" :key="`${item.uid}+${index}`" class="topItem flex-shrink-0 position-absolute line-height-1" :class="`topItem_${item.rank}`">
          <div class="topItemAvatarBorder position-row-center position-absolute">
            <img class="radius-50 fit-cover block position-absolute position-row-center topItemAvatar" v-lazy="IconPath(item.profile_image || avatarDefault)" alt="" @error="imgAtError" @click="toUserMain(item.uid)" />
          </div>
          <div class="topItemUsername ellipsis position-absolute">{{ item.username }}</div>
          <div class="position-absolute userPrettyCode topItemUid">
            <lazy-component class="havenBg" v-if="item.pretty_type!=0">
              <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
            </lazy-component>
            <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
            <span v-else class="noPrettyCode">ID:{{item.code || '--'}}</span>
          </div>
          <div class="topItemNumText position-absolute">{{ valueName }}</div>
          <div class="topItemNum ellipsis position-absolute">{{ item.score || 0 }}</div>
        </div>
      </div>
      <div class="remainArea">
        <div class="remainItem position-relative line-height-1" v-for="(item,index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{item.rank}}</div>
          <img class="totalRankItemAvatar fit-cover radius-50 position-absolute position-column-center" v-lazy="IconPath(item.profile_image || avatarDefault)" alt="" @error="imgAtError" @click="toUserMain(item.uid)" />
          <div class="totalRankItemName position-absolute ellipsis">{{item.username}}</div>
          <div class="position-absolute userPrettyCode totalRankItemUid">
            <lazy-component class="havenBg" v-if="item.pretty_type!=0">
              <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
            </lazy-component>
            <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
            <span v-else class="noPrettyCode">ID:{{item.code || '--'}}</span>
          </div>
          <div class="totalRankItemTime position-absolute position-column-center">
            {{ item.score || 0 }}{{ valueName }}
            <!-- <p>{{ valueName }}</p> -->
            <!-- <span>{{item.score}}</span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="userRankArea position-relative line-height-1">
      <div class="totalRankIcon position-absolute position-column-center flex align-center justify-center">{{userRankShow.rank?userRankShow.rank:`${rankListShow.length}+`}}</div>
      <img class="totalRankAvatar position-absolute position-column-center" v-lazy="IconPath(userRankShow.profile_image||avatarDefault)" alt="" @error="imgAtError" @click="toUserMain(userRankShow.uid)" />
      <div :class="['totalRankName ellipsis position-absolute','status1']">{{userRankShow.username}}</div>
      <div class="position-absolute userPrettyCode totalRankCode">
        <lazy-component class="havenBg" v-if="userRankShow.pretty_type!=0">
          <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]" />
        </lazy-component>
        <span v-if="userRankShow.pretty_type!=0" :class="['prettyCode', `color${userRankShow.pretty_type}`]">{{userRankShow.code}}</span>
        <span v-else class="noPrettyCode">ID:{{userRankShow.code || '--'}}</span>
      </div>
      <div class="totalRankTime position-absolute line-height-1 position-column-center">
        {{ userRankShow.score || 0 }}{{ valueName }}
        <!-- <p>{{ valueName }}</p> -->
        <!-- <span>{{userRankShow.score}}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom1', // 消费榜 无宠物头像 无昵称显隐 示例：20260311白色情人节活动
  components: {},
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('心动值'),
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
.rankArea{
  z-index: 1;
  height: 1285px;
  padding-bottom: 67px;
  .topArea {
    height: 541px;
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
      .topItemUid {
        left: 55px;
        font-size: 22px;
        color: #FFEF85;
        width: 160px;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .topItemNumText {
        font-size: 20px;
        color: #2F5BA3;
      }
      .topItemNum {
        text-align: center;
        font-size: 22px;
        color: #2F5BA3;
      }
      &.topItem_1{
        top: 115px;
        left: 50%;
        transform: translateX(-50%);
        width: 266px;
        height: 482px;
        background-image: url('@/pages/whiteValentine/assets/mk7_23_1.png');
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
            background: url('@/pages/whiteValentine/assets/mk7_22.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 129px;
          left: 44px;
          width: 181px;
        }
        .topItemUid{
          top: 160px;
          color: #A96D28;
        }
        .topItemNumText{
          top: 206px;
          left: 105px;
        }
        .topItemNum{
          top: 234px;
          left: 44px;
          width: 181px;
        }
      }
      &.topItem_2{
        top: 245px;
        left: 0;
        width: 266px;
        height: 482px;
        background-image: url('@/pages/whiteValentine/assets/mk7_25_1.png');
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
            background: url('@/pages/whiteValentine/assets/mk7_24.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 110px;
          left: 56px;
          width: 159px;
        }
        .topItemUid{
          top: 140px;
        }
        .topItemNumText{
          top: 185px;
          left: 105px;
        }
        .topItemNum{
          top: 213px;
          left: 56px;
          width: 159px;
        }
      }
      &.topItem_3{
        top: 245px;
        right: 0;
        width: 266px;
        height: 482px;
        background-image: url('@/pages/whiteValentine/assets/mk7_27_1.png');
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
            background: url('@/pages/whiteValentine/assets/mk7_26.png') no-repeat left top/100% 100%;
          }
        }
        .topItemUsername{
          top: 110px;
          left: 56px;
          width: 159px;
        }
        .topItemUid{
          top: 140px;
        }
        .topItemNumText{
          top: 185px;
          left: 105px;
        }
        .topItemNum{
          top: 213px;
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
      background: url('@/pages/whiteValentine/assets/mk7_36.png') no-repeat left top/100% 100%;
      margin: 0 auto 7px;
      .totalRankItemIcon{
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #FFE683;
        left: 19px;
        background: url('@/pages/whiteValentine/assets/mk7_37.png') no-repeat left top/100% 100%;
      }
      .totalRankItemAvatar{
        width: 88px;
        height: 88px;
        border: 4px solid transparent;
        background-color: #BCC1FF;
        left: 90px;
      }
      .totalRankItemName{
        width: 220px;
        font-size: 26px;
        left: 186px;
        top: 40px;
      }
      .totalRankItemUid{
        left: 186px;
        top: 76px;
        color: #FFEF85;
        font-size: 22px;
        width: 160px;
        height: 37px;
        display: flex;
        align-items: center;
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
  background: url('@/pages/whiteValentine/assets/mk7_38.png') no-repeat left top/100% 100%;
  margin: -67px auto 10px;
  .totalRankIcon{
    width: 68px;
    height: 67px;
    font-weight: 500;
    font-size: 26px;
    color: #FFF2A9;
    left: 22px;
    background: url('@/pages/whiteValentine/assets/mk7_39.png') no-repeat left top/100% 100%;
  }
  .totalRankAvatar{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 4px solid transparent;
    background-color: #BCC1FF;
    object-fit: cover;
    left: 95px;
  }
  .totalRankName{
    width: 220px;
    font-size: 26px;
    left: 192px;
    top: 38px;
  }
  .totalRankCode{
    font-size: 22px;
    color: #FFEF85;
    left: 192px;
    top: 82px;
    width: 160px;
    height: 37px;
    display: flex;
    align-items: center;
  }
  .totalRankTime{
    font-size: 24px;
    color: #FFFFFF;
    text-align: right;
    right: 49px;
    p{
      font-size: 22px;
      color: #884425;
      margin-bottom: 18px;
    }
  }
}
</style>
