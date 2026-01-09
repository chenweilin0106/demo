<template>
  <div class="rankCom">
    <div class="rankArea3 margin-row-center position-relative overflow-y-scroll overflow-x-hidden" ref="rankRef">
      <div class="topArea">
        <lazy-component class="champion margin-row-center position-relative flex align-center justify-center">
          <div v-if="rankListShow[0].uid==0" class="emptyBox position-relative"></div>
          <template v-else>
            <div class="leftBox h-100 position-relative">
              <div class="leftScene position-absolute">
                <div class="leftWings position-absolute pointer-none"></div>
                <div class="rightWings position-absolute pointer-none"></div>
                <img :src="IconPath(getScene(rankListShow[0].virtual_info)||defaultBg)" class="leftSceneIcon position-relative w-100 h-100" />
                <div v-if="!rankListShow[0].virtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[rankListShow[0].gender]"></div>
              </div>
              <div v-if="rankListShow[0].virtual_info.length" class="leftPerson flex-1 h-100 position-relative overflow-hidden">
                <Person class="leftPersonCom" :config="rankListShow[0].virtual_info" :class="personClassMap[rankListShow[0].gender]" />
              </div>
            </div>
          </template>
          <div class="rankInfo position-row-center position-absolute">
            <div class="rankIconCommon status1"></div>
            <div class="rankUserInfoCommon">
              <img :src="IconPath(rankListShow[0].profile_image||avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(rankListShow[0].uid)" />
              <div class="usernameCommon" @click="toUserMain(rankListShow[0].uid)">{{rankListShow[0].username}}</div>
              <div class="rankValue position-absolute line-height-1 position-row-center">
                <div class="p1 text-center position-absolute position-column-center ellipsis">{{rankListShow[0].time}}</div>
                <div class="diamond position-absolute position-column-center"></div>
              </div>
            </div>
          </div>
        </lazy-component>
        <div class="topAreaRemain margin-row-center flex flex-wrap justify-between">
          <lazy-component v-for="(item,index) in rankListShow.slice(1,10)" :key="`${item.uid}+${index}`" class="topItem flex-shrink-0 position-relative">
            <div v-if="item.uid==0" class="emptyBox position-absolute position-row-center"></div>
            <template v-else>
              <div class="topItemScene position-row-center position-absolute">
                <div class="leftWings position-absolute pointer-none"></div>
                <div class="rightWings position-absolute pointer-none"></div>
                <img :src="IconPath(getScene(item.virtual_info)||defaultBg)" class="topItemSceneIcon position-relative w-100 h-100" />
                <div v-if="!item.virtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[item.gender]"></div>
              </div>
              <div v-if="item.virtual_info.length" class="topItemPerson position-absolute overflow-hidden">
                <Person class="topItemPersonCom" :config="item.virtual_info" :class="personClassMap[item.gender]" />
              </div>
            </template>
            <div class="rankInfo position-row-center position-absolute">
              <div class="rankIconCommon" :class="`status${item.rank>=4?4:item.rank}`">{{item.rank}}</div>
              <div class="rankUserInfoCommon">
                <img :src="IconPath(item.profile_image||avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.uid)" />
                <div class="usernameCommon" @click="toUserMain(item.uid)">{{item.username}}</div>
                <div class="rankValue position-absolute line-height-1 position-row-center">
                  <div class="p1 text-center position-absolute position-column-center ellipsis">{{item.time}}</div>
                  <div class="diamond position-absolute position-column-center"></div>
                </div>
              </div>
            </div>
          </lazy-component>
        </div>
      </div>
      <div class="remainArea">
        <lazy-component v-for="(item,index) in rankListShow.slice(10)" :key="`${item.uid}+${index}`" class="remainItem position-relative">
          <div class="totalRankItemIcon flex align-center justify-center position-absolute position-column-center">{{item.rank}}</div>
          <img :src="IconPath(item.profile_image||avatarDefault)" class="totalRankItemAvatar fit-cover radius-50 position-absolute position-column-center" @error="imgAtError" @click="toUserMain(item.uid)" />
          <div class="totalRankItemName status1 position-absolute ellipsis" @click="toUserMain(item.uid)">{{item.username}}</div>
          <div class="totalRankItemTime flex align-center position-absolute position-column-center line-height-1">{{item.time}}<div class="diamond"></div></div>
        </lazy-component>
      </div>
    </div>
    <lazy-component class="userRankArea3 position-relative position-row-center line-height-1">
      <div class="totalRankIcon position-absolute position-column-center flex align-center justify-center">{{userRankShow.rank?userRankShow.rank:`${rankListShow.length}+`}}</div>
      <img :src="IconPath(userRankShow.profile_image||avatarDefault)" class="totalRankAvatar position-absolute position-column-center" @error="imgAtError" @click="toUserMain(userRankShow.uid)" />
      <div class="totalRankName ellipsis position-absolute status1" @click="toUserMain(userRankShow.uid)">{{userRankShow.username}}</div>
      <div class="totalRankTime flex align-center position-column-center position-absolute line-height-1">{{userRankShow.time}}<div class="diamond"></div></div>
    </lazy-component>
  </div>
</template>

<script>
import Person from '../../wardrobe/components/person.vue'
import { textLengthLimit, imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom3', // 风云榜 示例：20250416春日游园活动
  components: { Person },
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
      valueName: Object.freeze('神豪值'),
      defaultBg: Object.freeze('https://cdn-image.dandan818.com/activity/normal/virtual/scene/phbbj_001.png'),
      personClassMap: Object.freeze({ 0: 'boy', 1: 'girl' }),
      avatarDefault: Object.freeze('avatarDefault.png')
    }
  },
  methods: {
    getScene(arr) {
      return arr.find(item => item.component_id == 4)?.small_icon
    },
    scrollRank() {
      if (this.$refs.rankRef && this.$refs.rankRef.scrollTop > 0) this.$refs.rankRef.scrollTo({ top: 0, behavior: 'instant' })
    },
    textLengthLimit,
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.rankInfo{
  z-index: 2;
  .rankIconCommon{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 70px;
    pointer-events: none;
    &.status1{
      color: transparent;
      background: url('@/pages/618/assets/mk6_16.png') no-repeat left top/100% 100%;
    }
    &.status2{
      width: 54px;
      height: 63px;
      color: transparent;
      background: url('@/pages/618/assets/mk6_17.png') no-repeat left top/100% 100%;
    }
    &.status3{
      width: 54px;
      height: 63px;
      color: transparent;
      background: url('@/pages/618/assets/mk6_18.png') no-repeat left top/100% 100%;
    }
    &.status4{
      width: 54px;
      height: 54px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 1;
      background: url('@/pages/618/assets/mk6_20.png') no-repeat left top/100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .rankUserInfoCommon{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 3px;
    .avatarCommon{
      width: 88px;
      height: 88px;
      border-radius: 50%;
      border: 4px solid transparent;
      background-color: #BCC1FF;
      object-fit: cover;
    }
    .usernameCommon{
      margin: 1px 0 0;
      width: 155px;
      height: 35px;
      font-weight: 500;
      font-size: 22px;
      color: #FFFFFF;
      line-height: 35px;
      text-align: center;
      background: url('@/pages/gardenParty/assets/mk5_13.png') no-repeat left top/100% 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
      &.status1{
        background: url('@/pages/gardenParty/assets/mk5_15.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/gardenParty/assets/mk5_19.png') no-repeat left top/100% 100%;
      }
      &.status3{
        background: url('@/pages/gardenParty/assets/mk5_21.png') no-repeat left top/100% 100%;
      }
      &.status4{
        background: url('@/pages/gardenParty/assets/mk5_17.png') no-repeat left top/100% 100%;
      }
      &.status5{
        background: url('@/pages/gardenParty/assets/mk5_23.png') no-repeat left top/100% 100%;
      }
    }
    .userCode{
      font-size: 20px;
      color: #FFF36E;
      .noPrettyCode{
        display: block;
        margin-top: 5px;
      }
    }
  }
  .rankValue{
    bottom: 2px;
    transform: translateX(-50%) translateY(100%);
    width: 212px;
    height: 43px;
    background: rgba(255,255,255,0.95);
    border-radius: 22px;
    .p1{
      right: 51px;
      max-width: 155px;
      min-width: 110px;
      font-weight: 500;
      font-size: 20px;
      color: #EB8FE6;
    }
    .diamond{
      right: 17px;
      width: 34px;
      height: 25px;
      background: url('@/pages/gardenParty/assets/zs_42_32.png') no-repeat left top/100% 100%;
    }
  }
}
.rankArea3{
  z-index: 1;
  height: 1400px;
  .champion{
    width: 683px;
    height: 420px;
    z-index: 1;
    .emptyBox{
      width: 259px;
      height: 380px;
      background: url('@/pages/gardenParty/assets/dr_mr.png') no-repeat left top/100% 100%;
      &::after{
        content: '';
        position: absolute;
        z-index: -1;
        left: 50%;
        transform: translateX(-50%);
        bottom: -9px;
        width: 448px;
        height: 369px;
        background: url('@/pages/gardenParty/assets/mk6_43.png') no-repeat left top/100% 100%;
      }
    }
    .leftBox{
      width: 100%;
      .leftScene{
        z-index: 1;
        top: 93px;
        width: 258px;
        height: 331px;
        right: 50%;
        transform: translateX(50%);
        .leftWings,.rightWings{
          top: -28px;
          left: -86px;
          width: 218px;
          height: 369px;
          background: url('@/pages/gardenParty/assets/mk6_22.png') no-repeat left top/100% 100%;
        }
        .rightWings{
          left: auto;
          right: -86px;
          background: url('@/pages/gardenParty/assets/mk6_23.png') no-repeat left top/100% 100%;
        }
        .defaultPerson{
          bottom: 4px;
          &.boy{
            width: 209px;
            height: 386px;
          }
          &.girl{
            width: 201px;
            height: 356px;
          }
        }
      }
      .leftPerson{
        z-index: 2;
        .leftPersonCom{
          position: absolute;
          right: 50%;
          transform: translateX(50%);
        }
        .girl{
          top: -93px;
        }
        .boy{
          top: -63px;
        }
      }
    }
    .rankInfo{
      bottom: 43px;
      .rankIconCommon{
        &.status1{
          top: 17px;
          left: -42px;
          transform: none;
        }
      }
    }
  }
  .topAreaRemain{
    width: 690px;
    padding: 0 6px;
    margin-bottom: 22px;
    .topItem{
      width: 214px;
      height: 348px;
      margin-bottom: 18px;
      .emptyBox{
        bottom: 4px;
        width: 221px;
        height: 324px;
        background: url('@/pages/gardenParty/assets/dr_mr.png') no-repeat left top/100% 100%;
      }
      .topItemScene{
        z-index: 1;
        bottom: 0;
        width: 221px;
        height: 283px;
        .defaultPerson{
          bottom: 4px;
          &.boy{
            width: 178px;
            height: 329px;
          }
          &.girl{
            width: 171px;
            height: 304px;
          }
        }
      }
      .topItemPerson{
        width: 214px;
        height: 348px;
        bottom: 4px;
        z-index: 2;
        .topItemPersonCom{
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scale(85%);
          &.girl{
            top: -150px;
          }
          &.boy{
            top: -135px;
          }
        }
      }
      .rankInfo{
        bottom: 49px;
        .rankIconCommon{
          &.status2, &.status3{
            top: 26px;
            left: -26px;
            transform: none;
          }
          &.status4{
            top: 37px;
            left: -28px;
            font-weight: 500;
            font-size: 24px;
            color: #FFF2A9;
            transform: none;
          }
        }
      }
    }
  }
  .remainArea{
    .remainItem{
      width: 664px;
      height: 143px;
      background: url('@/pages/gardenParty/assets/mk6_36.png') no-repeat left top/100% 100%;
      margin: 0 auto 6px;
      .totalRankItemIcon{
        width: 68px;
        height: 68px;
        font-weight: 500;
        font-size: 26px;
        color: #FFE683;
        left: 20px;
        background: url('@/pages/gardenParty/assets/mk6_37.png') no-repeat left top/100% 100%;
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
        left: 188px;
        top: 32px;
        &.status1{
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .totalRankItemTime{
        text-align: right;
        right: 44px;
        font-size: 24px;
        color: #FFEF85;
        .diamond{
          margin-left: 5px;
          width: 38px;
          height: 29px;
          background: url('@/pages/gardenParty/assets/zs_42_32.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
}
.userRankArea3{
  width: 715px;
  height: 147px;
  background: url('@/pages/gardenParty/assets/mk6_38.png') no-repeat left top/100% 100%;
  margin-bottom: 10px;
  .totalRankIcon{
    width: 68px;
    height: 67px;
    font-weight: 500;
    font-size: 22px;
    color: #FFF2A9;
    left: 42px;
    background: url('@/pages/gardenParty/assets/mk6_39.png') no-repeat left top/100% 100%;
  }
  .totalRankAvatar{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 4px solid transparent;
    background-color: #BCC1FF;
    object-fit: cover;
    left: 115px;
  }
  .totalRankName{
    width: 220px;
    font-size: 26px;
    left: 212px;
    top: 35px;
    &.status1{
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .totalRankCode{
    font-size: 22px;
    color: #FFEF85;
    line-height: 30px;
    position: absolute;
    left: 210px;
    bottom: 30px;
    img{
      width: 37px*.8;
      height: 31px*0.8;
      vertical-align: middle;
      margin: 0 5px 0 0;
    }
  }
  .totalRankTime{
    text-align: right;
    right: 71px;
    font-size: 24px;
    color: #FFEF85;
    .diamond{
      margin-left: 5px;
      width: 38px;
      height: 29px;
      background: url('@/pages/gardenParty/assets/zs_42_32.png') no-repeat left top/100% 100%;
    }
  }
}
.defaultPerson{
  &.boy{
    background: url('@/pages/gardenParty/assets/nan_mr.png') no-repeat left top/100% 100%;
  }
  &.girl{
    background: url('@/pages/gardenParty/assets/nv_mr.png') no-repeat left top/100% 100%;
  }
}
</style>
