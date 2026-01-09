<template>
  <div class="rankCom">
    <div class="rankArea1 overflow-x-hidden overflow-y-scroll position-relative margin-row-center" ref="rankRef" >
      <div class="topArea">
        <!--最外层 限制范围-->
        <lazy-component v-for="(item, index) in rankListShow.slice(0, 10)" :key="`${item.uid}+${index}`" class="topItem margin-row-center position-relative flex align-center justify-center" >
          <!--无人展位图片-->
          <div v-if="item.uid == 0" class="emptyBox"></div>
          <!--单人 双人-->
          <template v-else>
            <!--左侧-->
            <div class="leftBox h-100 position-relative" :class="item.tuid == 0 ? 'only' : ''" >
              <div class="leftScene position-absolute">
                <div class="leftWings position-absolute pointer-none"></div>
                <div v-if="item.tuid == 0" class="rightWings position-absolute pointer-none" ></div>
                <img :src="IconPath(getScene(item.virtual_info) || defaultBg)" class="leftSceneIcon position-relative w-100 h-100" />
                <div v-if="!item.virtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[item.gender]" ></div>
              </div>
              <lazy-component v-if="item.virtual_info.length" class="leftPerson flex-1 h-100 position-relative overflow-hidden" >
                <Person class="leftPersonCom" :config="item.virtual_info" :class="personClassMap[item.gender]" />
              </lazy-component>
            </div>
            <!--右侧-->
            <div v-if="item.tuid" class="rightBox h-100 position-relative">
              <div class="rightScene position-absolute">
                <div class="rightWings position-absolute pointer-none"></div>
                <img :src="IconPath(getScene(item.tvirtual_info) || defaultBg)" class="rightSceneIcon position-relative w-100 h-100" />
                <div v-if="!item.tvirtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[item.tgender]" ></div>
              </div>
              <lazy-component v-if="item.tvirtual_info.length" class="rightPerson flex-1 h-100 position-relative overflow-hidden" >
                <Person class="rightPersonCom" :config="item.tvirtual_info" :class="personClassMap[item.tgender]" />
              </lazy-component>
            </div>
          </template>
          <!--单人/无人榜单信息-->
          <div v-if="item.tuid == 0" class="rankInfo position-absolute" :class="item.uid != 0 ? 'only' : 'empty'" >
            <div class="rankIconCommon" :class="`status${item.rank >= 4 ? 4 : item.rank}`" > {{ item.rank }} </div>
            <div class="rankUserInfoCommon">
              <img :src="IconPath(item.profile_image || avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.uid)" />
              <div class="usernameCommon">{{ item.username }}</div>
              <div class="userCode userPrettyCode">
                <div class="havenBg" v-if="item.pretty_type != 0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
                </div>
                <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]" >{{ item.code }}</span >
                <span v-else class="noPrettyCode">ID:{{ item.code }}</span>
              </div>
            </div>
            <div class="rankValueCommon">
              <div class="rankValueCommonText" :class="tagChosen == 2 ? 'status1' : ''" ></div>
              <div class="rankValueCommonNum" :data-text="textLengthLimit(item.num, 8)" >
                <div class="inner">{{ textLengthLimit(item.num, 8) }}</div>
              </div>
            </div>
          </div>
          <!--双人榜单信息-->
          <div v-else class="rankInfo all position-absolute" :class="`status${item.relation}`" >
            <div class="rankIconCommon" :class="`status${item.rank >= 4 ? 4 : item.rank}`" > {{ item.rank }} </div>
            <div class="rankUserInfoCommon left">
              <img :src="IconPath(item.profile_image || avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.uid)" />
              <div class="usernameCommon" :class="`status${item.relation}`"> {{ item.username }} </div>
              <div class="userCode userPrettyCode">
                <div class="havenBg" v-if="item.pretty_type != 0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
                </div>
                <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]" >{{ item.code }}</span >
                <span v-else class="noPrettyCode">ID:{{ item.code }}</span>
              </div>
            </div>
            <div class="rankUserInfoCommon right">
              <img :src="IconPath(item.tprofile_image || avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.tuid)" />
              <div class="usernameCommon" :class="`status${item.relation}`"> {{ item.tusername }} </div>
              <div class="userCode userPrettyCode">
                <div class="havenBg" v-if="item.tuid_pretty_type != 0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.tuid_pretty_type]" />
                </div>
                <span v-if="item.tuid_pretty_type != 0" :class="['prettyCode', `color${item.tuid_pretty_type}`]" >{{ item.tuid_code }}</span >
                <span v-else class="noPrettyCode">ID:{{ item.tuid_code }}</span>
              </div>
            </div>
            <div class="rankValueCommon">
              <div class="rankValueCommonText" :class="tagChosen == 2 ? 'status1' : ''" ></div>
              <div class="rankValueCommonNum" :data-text="item.num">
                <div class="inner">{{ item.num }}</div>
              </div>
            </div>
          </div>
        </lazy-component>
      </div>
      <div class="remainArea">
        <lazy-component class="remainItem position-relative" v-for="(item, index) in rankListShow.slice(10)" :key="`${item.uid}+${index}`" >
          <div class="rankBorder position-absolute position-column-center text-center" > {{ item.rank }} </div>
          <div class="userLeft userDiv">
            <img class="userAvatar" :src="IconPath(item.profile_image || avatarDefault)" @click="toUserMain(item.uid)" @error="imgAtError" />
            <span class="userNameDiv">{{ item.username }}</span>
            <div :class="['userCode', 'userPrettyCode']">
              <div class="havenBg" v-if="item.pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
              </div>
              <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]" >{{ item.code }}</span >
              <span v-else class="noPrettyCode">ID:{{ item.code }}</span>
            </div>
          </div>
          <div v-if="item.tuid" class="userRight userDiv">
            <img class="userAvatar" :src="IconPath(item.tprofile_image || avatarDefault)" @click="toUserMain(item.tuid)" @error="imgAtError" />
            <span class="userNameDiv">{{ item.tusername }}</span>
            <div :class="['userCode', 'userPrettyCode']">
              <div class="havenBg" v-if="item.tuid_pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.tuid_pretty_type]" />
              </div>
              <span v-if="item.tuid_pretty_type != 0" :class="['prettyCode', `color${item.tuid_pretty_type}`]" >{{ item.tuid_code }}</span >
              <span v-else class="noPrettyCode">ID:{{ item.tuid_code }}</span>
            </div>
          </div>
          <div class="rankValue1 h-100 position-absolute position-row-center text-center flex-column align-center justify-center" >
            <div class="rankValueIcon margin-row-center flex-shrink-0" :class="tagChosen == 2 ? 'status1' : ''" ></div>
            <p class="flex-shrink-0">{{ item.num }}</p>
            <div v-if="item.tuid" class="friendTypeCommon flex-shrink-0" :class="`status${item.relation}`" ></div>
          </div>
        </lazy-component>
      </div>
    </div>
    <lazy-component class="userRankArea1 position-relative position-row-center">
      <div class="rankBorder text-center position-absolute position-column-center" > {{ userRankShow.rank ? userRankShow.rank : `${rankListShow.length}+` }} </div>
      <div class="userLeft userDiv">
        <img class="userAvatar" :src="IconPath(userRankShow.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(userRankShow.uid)" />
        <span class="userNameDiv">{{ userRankShow.username }}</span>
        <div :class="['userCode', 'userPrettyCode']">
          <div class="havenBg" v-if="userRankShow.pretty_type != 0">
            <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]" />
          </div>
          <span v-if="userRankShow.pretty_type != 0" :class="['prettyCode', `color${userRankShow.pretty_type}`]" >{{ userRankShow.code }}</span >
          <span v-else class="noPrettyCode">ID:{{ userRankShow.code }}</span>
        </div>
      </div>
      <div v-if="userRankShow.tuid" class="userRight userDiv">
        <img class="userAvatar" :src="IconPath(userRankShow.tprofile_image || avatarDefault)" @click="toUserMain(userRankShow.tuid)" @error="imgAtError" />
        <span class="userNameDiv">{{ userRankShow.tusername }}</span>
        <div :class="['userCode', 'userPrettyCode']">
          <div class="havenBg" v-if="userRankShow.tuid_pretty_type != 0">
            <PublicImg :imgName=" $store.state.prettyTypeBg[userRankShow.tuid_pretty_type] " />
          </div>
          <span v-if="userRankShow.tuid_pretty_type != 0" :class="['prettyCode', `color${userRankShow.tuid_pretty_type}`]" >{{ userRankShow.tuid_code }}</span >
          <span v-else class="noPrettyCode" >ID:{{ userRankShow.tuid_code }}</span >
        </div>
      </div>
      <div class="rankValue1 h-100 position-absolute position-row-center text-center flex-column align-center justify-center" >
        <div class="rankValueIcon margin-row-center flex-shrink-0" :class="tagChosen == 2 ? 'status1' : ''" ></div>
        <p class="flex-shrink-0">{{ textLengthLimit(userRankShow.num, 10) }}</p>
        <div v-if="userRankShow.tuid" class="friendTypeCommon flex-shrink-0" :class="`status${userRankShow.relation}`" ></div>
      </div>
    </lazy-component>
  </div>
</template>

<script>
import Person from '../../wardrobe/components/person.vue'
import { textLengthLimit, imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom1', // 魔力榜 示例：20250416春日游园活动
  components: { Person },
  props: {
    rankListShow: { type: Array, default: () => [] },
    userRankShow: { type: Object, default: () => {} },
    tagChosen: { type: Number, default: 1 },
    rankChosen: { type: Number, default: 1 }
  },
  data() {
    return {
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
.rankValueIcon{
  width: 150px;
  height: 27px;
  background: url('@/pages/618/assets/mk6_44.png') no-repeat left top/100% 100%;
  &.status1{
    width: 92px;
    background: url('@/pages/618/assets/mk6_47.png') no-repeat left top/100% 100%;
  }
}
.rankValue1{
  top: 0;
  width: 150px;
  color: #fff;
  padding-top: 20px;
  .rankValueIcon{
    width: 150px;
    height: 27px;
    background: url('@/pages/gardenParty/assets/mk6_44.png') no-repeat left top/100% 100%;
    &.status1{
      width: 92px;
      background: url('@/pages/gardenParty/assets/mk6_44_1.png') no-repeat left top/100% 100%;
    }
  }
  p{
    margin-top: 10px;
    font-size: 22px;
    color: #FFEF85;
  }
  .friendTypeCommon{
    width: 86px;
    height: 86px;
    &.status1{
      background: url('@/pages/gardenParty/assets/mk6_29.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/gardenParty/assets/mk6_31.png') no-repeat left top/100% 100%;
    }
    &.status3{
      background: url('@/pages/gardenParty/assets/mk6_32.png') no-repeat left top/100% 100%;
    }
    &.status4{
      background: url('@/pages/gardenParty/assets/mk6_30.png') no-repeat left top/100% 100%;
    }
    &.status5{
      background: url('@/pages/gardenParty/assets/mk6_33.png') no-repeat left top/100% 100%;
    }
  }
}
.rankArea1{
  z-index: 1;
  height: 1400px;
  .topArea{
    .topItem{
      width: 683px;
      height: 420px;
      margin-bottom: 15px;
      &.topItem{
        margin-bottom: 23px;
      }
      .emptyBox{
        width: 530px;
        height: 413px;
        background: url('@/pages/gardenParty/assets/sr_mr.png') no-repeat left top/100% 100%;
      }
      .leftBox,.rightBox{
        width: 50%;
        .leftScene,.rightScene{
          z-index: 1;
          top: 93px;
          width: 258px;
          height: 331px;
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
        .leftScene{
          right: -1px;
        }
        .rightScene{
          left: -1px;
        }
        .leftPerson,.rightPerson{
          z-index: 2;
          .girl{
            top: -93px;
          }
          .boy{
            top: -63px;
          }
        }
        .leftPerson{
          .leftPersonCom{
            right: -218px;
            position: absolute;
          }
        }
        .rightPerson{
          .rightPersonCom{
            left: -208px;
            position: absolute;
          }
        }
      }
      .leftBox{
        &.only{
          width: 100%;
          .leftScene,.leftPersonCom{
            right: 50%;
            transform: translateX(50%);
          }
        }
      }
      .rankInfo{
        z-index: 3;
        &.only,&.empty{
          bottom: -15px;
          .rankIconCommon{
            &.status1,&.status2,&.status3{
              top: -54px;
            }
            &.status4{
              top: -50px;
            }
          }
        }
        &.empty{
          bottom: 30px;
        }
        &.all{
          width: 479px;
          height: 189px;
          bottom: -15px;
          &.status1{
            background: url('@/pages/gardenParty/assets/mk5_14.png') no-repeat left top/100% 100%;
            .userCode{
              color: #D32B82 !important;
            }
          }
          &.status2{
            background: url('@/pages/gardenParty/assets/mk5_18.png') no-repeat left top/100% 100%;
            .userCode{
              color: #BA29BF !important;
            }
          }
          &.status3{
            background: url('@/pages/gardenParty/assets/mk5_20.png') no-repeat left top/100% 100%;
            .userCode{
              color: #8A5817 !important;
            }
          }
          &.status4{
            background: url('@/pages/gardenParty/assets/mk5_16.png') no-repeat left top/100% 100%;
            .userCode{
              color: #186AD4 !important;
            }
          }
          &.status5{
            background: url('@/pages/gardenParty/assets/mk5_22.png') no-repeat left top/100% 100%;
            .userCode{
              color: #6436C2 !important;
            }
          }
          .rankIconCommon{
            &.status1,&.status2,&.status3{
              top: -82px;
            }
            &.status4{
              top: -79px;
            }
          }
          .rankUserInfoCommon{
            top: 19px;
            &.left,&.right{
              position: absolute;
            }
            &.left{
              left: 30px;
            }
            &.right{
              right: 30px;
            }
          }
          .rankValueCommon{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -4px;
          }
        }
      }
    }
  }
  .remainArea{
    .remainItem{
      width: 672px;
      height: 180px;
      background: url('@/pages/gardenParty/assets/mk6_34.png') no-repeat left top/100% 100%;
      margin: 0 auto 8px;
      .rankBorder{
        width: 68px;
        height: 68px;
        background: url('@/pages/gardenParty/assets/mk6_37.png') no-repeat left top/100% 100%;
        line-height: 68px;
        font-size: 26px;
        color: #FFFFFF;
        left: 20px;
      }
      .userLeft{
        position: absolute;
        left: 50%;
        transform: translateX(-220%);
        top: 19px;
      }
      .userRight{
        position: absolute;
        right: 50%;
        transform: translateX(220%);
        top: 19px;
      }
    }
  }
}
.userRankArea1{
  width: 732px;
  height: 191px;
  background: url('@/pages/gardenParty/assets/mk6_19.png') no-repeat left top/100% 100%;
  margin-bottom: 10px;
  .rankBorder{
    width: 68px;
    height: 68px;
    background: url('@/pages/gardenParty/assets/mk6_20.png') no-repeat left top/100% 100%;
    line-height: 68px;
    font-size: 26px;
    color: #FFFFFF;
    left: 40px;
  }
  .userLeft{
    position: absolute;
    left: 50%;
    transform: translateX(-220%);
    top: 22px;
    .userAvatar{
      background: #FFC4DA;
    }
    .userNameDiv{
      top: 92px;
    }
    .userCode{
      top: 115px;
    }
  }
  .userRight{
    position: absolute;
    right: 50%;
    transform: translateX(220%);
    top: 22px;
    .userAvatar{
      background: #FFC4DA;
    }
    .userNameDiv{
      top: 92px;
    }
    .userCode{
      top: 115px;
    }
  }
}
.userDiv{
  width: 88px;
  height: 88px;
  position: relative;
  .userAvatar{
    width: 88px;
    height: 88px;
    border: 4px solid transparent;
    background: #ADC7FF;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
  }
  .userNameDiv{
    color: #FFFFFF;
    font-size: 22px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 90px;
    display: inline-block;
    max-width: 140px;
    white-space: nowrap;//不支持换行
    overflow: hidden;//隐藏多出部分文字
    text-overflow: ellipsis;//用省略号代替多出部分文字
  }
  .userCode{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110px;
    color: #FFF36D;
  }
}
.rankInfo{
  z-index: 1;
  .rankIconCommon{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 70px;
    pointer-events: none;
    &.status1{
      color: transparent;
      background: url('@/pages/gardenParty/assets/mk6_16.png') no-repeat left top/100% 100%;
    }
    &.status2{
      color: transparent;
      background: url('@/pages/gardenParty/assets/mk6_17.png') no-repeat left top/100% 100%;
    }
    &.status3{
      color: transparent;
      background: url('@/pages/gardenParty/assets/mk6_18.png') no-repeat left top/100% 100%;
    }
    &.status4{
      width: 68px;
      height: 68px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 1;
      background: url('@/pages/gardenParty/assets/mk6_35.png') no-repeat left top/100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .rankUserInfoCommon{
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatarCommon{
      width: 88px;
      height: 88px;
      border-radius: 50%;
      border: 4px solid transparent;
      background-color: #BCC1FF;
      object-fit: cover;
    }
    .usernameCommon{
      margin: 5px 0 0;
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
  .rankValueCommon{
    .rankValueCommonText{
      @extend .rankValueIcon;
      margin: 0 auto;
      // width: 150px;
      // height: 27px;
      // background: url('@/pages/618/assets/mk6_44.png') no-repeat left top/100% 100%;
      // &.status1{
      //   width: 92px;
      //   background: url('@/pages/618/assets/mk6_47.png') no-repeat left top/100% 100%;
      // }
    }
    .rankValueCommonNum{
      $stroke: 2px; /* 描边宽度 建议不要看蓝湖 因为text-stroke会向字体内部延申 所以宽度不准确 和效果图类似即可 */
      position: relative;
      z-index: 1;
      font-size: 24px;
      font-weight: bold;
      white-space: nowrap;
      line-height: 1;
      color: transparent; /* 字体颜色透明 只保留描边 */
      width: fit-content;
      overflow: hidden;
      text-align: center;
      margin: 5px auto 0;
      .inner{
        position: relative;
        z-index: 2;
        padding: $stroke; /* 为描边预留位置 加上描边大小*/
        background-image: linear-gradient(90deg, #FF87C1 0%, #9376FF 53%, #65C1FC 95%); /*字体颜色*/
        -webkit-background-clip: text; /*背景裁剪成字体*/
        background-repeat: no-repeat;
        border: 1px solid transparent;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset($stroke);
      }
      &::before{
        content: attr(data-text);
        position: absolute;
        z-index: 1;
        top: -$stroke;
        left: -$stroke;
        right: -$stroke;
        bottom: -$stroke;
        padding: $stroke; /*保持与inner大小相同 方便定位*/
        -webkit-text-stroke: $stroke transparent; /*字体描边 为渐变背景占位 背景会覆盖在描边上*/
        background-image: linear-gradient(white, white); /*描边颜色*/
        -webkit-background-clip: text;
        background-repeat: no-repeat;
        box-sizing: border-box;
        border: 1px solid transparent;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset($stroke);
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
