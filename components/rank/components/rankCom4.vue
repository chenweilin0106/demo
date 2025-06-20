<template>
  <div class="rankCom">
    <div class="rankArea1 overflow-x-hidden overflow-y-scroll position-relative margin-row-center" ref="rankRef" >
      <div class="topArea">
        <!--最外层 限制范围-->
        <lazy-component v-for="(item, index) in rankListShow.slice(0, 10)" :key="`${item.uid}+${index}`" class="topItem margin-row-center position-relative flex align-center justify-center" >
          <!--左侧-->
          <div class="leftBox h-100 position-relative">
            <div class="leftScene position-absolute">
              <div class="leftWings position-absolute pointer-none"></div>
              <img :src="IconPath(getScene(item.virtual_info) || defaultBg)" class="leftSceneIcon position-relative w-100 h-100" />
              <div v-if="!item.virtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[item.gender]" ></div>
            </div>
            <lazy-component v-if="item.virtual_info.length" class="leftPerson flex-1 h-100 position-relative overflow-hidden" >
              <Person class="leftPersonCom" :config="item.virtual_info" :class="personClassMap[item.gender]" />
            </lazy-component>
          </div>
          <!--右侧-->
          <div class="rightBox h-100 position-relative">
            <div class="rightScene position-absolute">
              <div class="rightWings position-absolute pointer-none"></div>
              <img :src="IconPath(getScene(item.tvirtual_info) || defaultBg)" class="rightSceneIcon position-relative w-100 h-100" />
              <div v-if="!item.tvirtual_info.length" class="defaultPerson position-absolute position-row-center" :class="personClassMap[item.tgender]" ></div>
            </div>
            <lazy-component v-if="item.tvirtual_info.length" class="rightPerson flex-1 h-100 position-relative overflow-hidden" >
              <Person class="rightPersonCom" :config="item.tvirtual_info" :class="personClassMap[item.tgender]" />
            </lazy-component>
          </div>
          <!--双人榜单信息-->
          <div class="rankInfo all position-absolute">
            <div class="rankIconCommon" :class="`status${item.rank >= 4 ? 4 : item.rank}`" > {{ item.rank }} </div>
            <div class="rankUserInfoCommon left">
              <img :src="IconPath(item.profile_image || avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.uid)" />
              <div class="usernameCommon" :class="`status${6}`"> {{ item.username }} </div>
              <div class="userCode userPrettyCode">
                <div :class="['havenBg', `pretty_type_${item.pretty_type}`]" v-if="item.pretty_type != 0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
                </div>
                <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]" >{{ item.code }}</span >
                <span v-else class="noPrettyCode">ID:{{ item.code }}</span>
              </div>
            </div>
            <div class="rankUserInfoCommon right">
              <img :src="IconPath(item.tprofile_image || avatarDefault)" class="avatarCommon" @error="imgAtError" @click="toUserMain(item.tuid)" />
              <div class="usernameCommon"> {{ item.tusername }} </div>
              <div class="userCode userPrettyCode">
                <div :class="['havenBg', `pretty_type_${item.tuid_pretty_type}`]" v-if="item.tuid_pretty_type != 0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.tuid_pretty_type]" />
                </div>
                <span v-if="item.tuid_pretty_type != 0" :class="['prettyCode', `color${item.tuid_pretty_type}`]" >{{ item.tuid_code }}</span >
                <span v-else class="noPrettyCode">ID:{{ item.tuid_code }}</span>
              </div>
            </div>
            <div class="rankValueCommon">
              <div class="rankValueCommonText"></div>
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
              <div :class="['havenBg', `pretty_type_${item.pretty_type}`]" v-if="item.pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
              </div>
              <span v-if="item.pretty_type != 0" :class="['prettyCode', `color${item.pretty_type}`]" >{{ item.code }}</span >
              <span v-else class="noPrettyCode">ID:{{ item.code }}</span>
            </div>
          </div>
          <div class="userRight userDiv">
            <img class="userAvatar" :src="IconPath(item.tprofile_image || avatarDefault)" @click="toUserMain(item.tuid)" @error="imgAtError" />
            <span class="userNameDiv">{{ item.tusername }}</span>
            <div :class="['userCode', 'userPrettyCode']">
              <div :class="['havenBg', `pretty_type_${item.tuid_pretty_type}`]" v-if="item.tuid_pretty_type != 0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.tuid_pretty_type]" />
              </div>
              <span v-if="item.tuid_pretty_type != 0" :class="['prettyCode', `color${item.tuid_pretty_type}`]" >{{ item.tuid_code }}</span >
              <span v-else class="noPrettyCode">ID:{{ item.tuid_code }}</span>
            </div>
          </div>
          <div class="rankValue1 h-100 position-absolute position-row-center text-center flex-column align-center" >
            <div class="rankValueIcon margin-row-center flex-shrink-0"></div>
            <p class="flex-shrink-0">{{ item.num }}</p>
          </div>
        </lazy-component>
      </div>
    </div>
    <lazy-component class="userRankArea1 position-relative position-row-center">
      <div v-if="!userRankShow.tuid" class="noBindTip flex align-center justify-center line-height-1 w-100 h-100">
        你还没有绑定活动CP，快去绑定吧！<img :src="IconPath('mk7_50.png')" class="icon2" @click="$emit('routerJump','/manual')" />
      </div>
      <template v-else>
        <div class="rankBorder text-center position-absolute position-column-center" > {{ userRankShow.rank ? userRankShow.rank : `${rankListShow.length}+` }} </div>
        <div class="userLeft userDiv">
          <img class="userAvatar" :src="IconPath(userRankShow.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(userRankShow.uid)" />
          <span class="userNameDiv">{{ userRankShow.username }}</span>
          <div :class="['userCode', 'userPrettyCode']">
            <div :class="['havenBg', `pretty_type_${userRankShow.pretty_type}`]" v-if="userRankShow.pretty_type != 0">
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
            <div :class="['havenBg', `pretty_type_${userRankShow.tuid_pretty_type}`]" v-if="userRankShow.tuid_pretty_type != 0">
              <PublicImg :imgName=" $store.state.prettyTypeBg[userRankShow.tuid_pretty_type] " />
            </div>
            <span v-if="userRankShow.tuid_pretty_type != 0" :class="['prettyCode', `color${userRankShow.tuid_pretty_type}`]" >{{ userRankShow.tuid_code }}</span >
            <span v-else class="noPrettyCode" >ID:{{ userRankShow.tuid_code }}</span >
          </div>
        </div>
        <div class="rankValue1 h-100 position-absolute position-row-center text-center flex-column align-center" >
          <div class="rankValueIcon margin-row-center flex-shrink-0"></div>
          <p class="flex-shrink-0">{{ textLengthLimit(userRankShow.num, 10) }}</p>
          <div v-if="userRankShow.tuid" class="friendTypeCommon flex-shrink-0" :class="`status${userRankShow.relation}`" ></div>
        </div>
      </template>
    </lazy-component>
  </div>
</template>

<script>
import Person from '../../wardrobe/components/person.vue'
import { textLengthLimit, imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'rankCom4', // 送礼榜 示例：20250520 520活动
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
.rankValue1{
  top: 0;
  width: 150px;
  color: #fff;
  padding-top: 45px;
  .rankValueIcon{
    width: 91px;
    height: 27px;
    background: url('@/pages/520/assets/mk7_44.png') no-repeat left top/100% 100%;
  }
  p{
    margin-top: 10px;
    font-size: 22px;
    color: #FFEF85;
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
            background: url('@/pages/520/assets/mk7_22.png') no-repeat left top/100% 100%;
          }
          .rightWings{
            left: auto;
            right: -86px;
            background: url('@/pages/520/assets/mk7_23.png') no-repeat left top/100% 100%;
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
      .rankInfo{
        z-index: 3;
        &.all{
          width: 479px;
          height: 189px;
          bottom: -15px;
          background: url('@/pages/520/assets/mk7_40.png') no-repeat left top/100% 100%;
          .userCode{
            color: #F2925E !important;
          }
          .rankIconCommon{
            &.status1,&.status2,&.status3{
              top: -39px;
            }
            &.status4{
              top: -32px;
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
            top: 42px;
          }
        }
      }
    }
  }
  .remainArea{
    .remainItem{
      width: 672px;
      height: 180px;
      background: url('@/pages/520/assets/mk7_34.png') no-repeat left top/100% 100%;
      margin: 0 auto 8px;
      .rankBorder{
        width: 68px;
        height: 68px;
        background: url('@/pages/520/assets/mk7_35.png') no-repeat left top/100% 100%;
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
  background: url('@/pages/520/assets/mk7_19.png') no-repeat left top/100% 100%;
  margin-bottom: 10px;
  .rankBorder{
    width: 68px;
    height: 68px;
    background: url('@/pages/520/assets/mk7_20.png') no-repeat left top/100% 100%;
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
      background: #FBE0A7;
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
      background: #FBE0A7;
    }
    .userNameDiv{
      top: 92px;
    }
    .userCode{
      top: 115px;
    }
  }
  .noBindTip{
    font-size: 26px;
    color: #FFFFFF;
    .icon2{
      width: 150px;
      height: 52px;
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
    background: #FBE0A7;
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
      background-color: #FBE0A7;
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
      background: #F2925E;
      border-radius: 99999px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
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
      margin: 0 auto;
      width: 91px;
      height: 27px;
      background: url('@/pages/520/assets/mk7_44.png') no-repeat left top/100% 100%;
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
        background-image: linear-gradient(#FF806D, #FF806D); /*字体颜色*/
        -webkit-background-clip: text; /*背景裁剪成字体*/
        background-repeat: no-repeat;
        border: 1px solid transparent;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        clip-path: inset($stroke)
      }
      &::before{
        content: attr(data-text);
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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
        clip-path: inset($stroke)
      }
    }
  }
}
.defaultPerson{
  &.boy{
    background: url('@/pages/520/assets/nan_mr.png') no-repeat left top/100% 100%;
  }
  &.girl{
    background: url('@/pages/520/assets/nv_mr.png') no-repeat left top/100% 100%;
  }
}
</style>
