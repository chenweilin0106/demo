<template>
  <PopupBox title="title_28.png" @clickClose="clickClose">
    <!--顶部提示-->
    <template v-if="step==1||step==2">
      <div class="topTip flex align-center text-nowrap margin-row-center line-height-100">绑定规则：用户两人互相输入对方ID，即可</div>
      <div class="topTip row-2 flex align-center text-nowrap margin-row-center line-height-100">绑定参与活动</div>
    </template>
    <div v-else-if="step==3" class="topTip flex justify-center align-center text-nowrap margin-row-center line-height-100">绑定已提交，请提醒对方前往活动页面提交</div>
    <div v-else-if="step==4" class="topTip row-2 flex justify-center align-center text-nowrap margin-row-center line-height-100">绑定失效，对方已被绑定</div>
    <!--输入框-->
    <input v-if="step==1" v-model="uid" :readonly="step==2" class="bindInput margin-row-center text-center line-height-100 text-nowrap" placeholder="点击输入对方ID" maxlength="8" @input="inputUid" />
    <template v-if="step==1">
      <div class="errorTip position-absolute position-row-center text-nowrap line-height-100">{{errTip}}</div>
      <div class="searchBtn status0 margin-row-center" @click="searchUserInfo">查找</div>
    </template>
    <!--查找成功 展示用户-->
    <template v-else-if="step==2">
      <div class="userInfo flex align-center justify-center flex-no-wrap margin-row-center searchSuccess">
        <div class="avatarAndNickName flex-column align-center justify-center">
          <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error="imgAtError" /></div>
          <div class="nickName ellipsis line-height-100 text-center">{{searchResult.username}}</div>
        </div>
        <div class="userInfoBtn flex-column align-center justify-center flex-no-wrap">
          <input v-model="uid" readonly class="bindInput text-center line-height-100 text-nowrap"/>
          <!--<PublicButton hasRight="1" class="userInfoBind flex align-center justify-center line-height-100" @click="bind">绑定</PublicButton>-->
          <div class="userInfoSearch status0" @click="resetSearch">重新查找</div>
        </div>
      </div>
      <div class="friendType">
        <p class="p1 line-height-1 flex justify-center">双方亲密关系：</p>
        <div class="typeList flex justify-center flex-wrap">
          <div v-for="(value,key) in relationMap" :key="key" :class="checkRelation==key?'active':''" class="typeItem flex-shrink-0 flex align-center justify-center line-height-1" @click="checkRelation=key">
            {{value}}</div>
        </div>
        <p class="p2 line-height-1 flex justify-center">双方需选择一致的亲密关系才能绑定成功哦</p>
        <div class="userInfoBindNew status1 margin-row-center" @click="bind">绑定</div>
      </div>
    </template>
    <!--绑定已提交-->
    <div v-else-if="step==3" class="submitSuccess">
      <div class="submitSuccessUserInfo flex align-center justify-center flex-no-wrap margin-row-center">
        <div class="avatarAndNickName flex-column align-center justify-center">
          <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(config.pair_user_info?.profile_image)" @error="imgAtError" /></div>
          <div class="nickName ellipsis line-height-100 text-center">{{config.pair_user_info?.username}}</div>
        </div>
        <div class="userInfoBtn flex-column align-center justify-center flex-no-wrap">
          <div class="p1">双方亲密关系：</div>
          <div class="friendType flex align-center justify-center line-height-1">{{relationMap[config.intimate_type]}}</div>
          <!--<PublicButton hasRight="1" class="userInfoBind flex align-center justify-center line-height-100" @click="bind">绑定</PublicButton>-->
          <!--<PublicButton hasRight="0" class="userInfoSearch flex align-center justify-center line-height-100" @click="resetSearch">重新查找</PublicButton>-->
        </div>
      </div>
      <!--<div class="submitAvatarAndNickName flex-column align-center justify-center margin-row-center">-->
      <!--  <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error="imgAtError" /></div>-->
      <!--  <div class="nickName ellipsis line-height-100 text-center">{{searchResult.username}}</div>-->
      <!--</div>-->
      <div class="submitSuccessBtn flex align-center justify-center flex-no-wrap">
        <div class="backAwaitBtn status0" @click="backAwait">返回等待</div>
        <div class="cancelBindBtn status1" @click="cancelBind">取消绑定</div>
      </div>
    </div>
    <!--绑定失败-->
    <div v-else-if="step==4" class="bindFail">
      <div class="failAvatarAndNickName flex-column align-center justify-center margin-row-center">
        <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(config.pair_user_info.profile_image)" @error="imgAtError" /></div>
        <div class="nickName ellipsis line-height-100 text-center">{{config.pair_user_info.username}}</div>
      </div>
      <div class="resetBindBtn status1 margin-row-center" @click="resetBind">重新绑定</div>
    </div>
    <!--底部提示-->
    <div v-if="step==1||step==2" class="bottomTip margin-row-center text-nowrap line-height-100">注：成功绑定后不可解绑</div>
    <div v-else class="bottomTip margin-row-center text-nowrap line-height-100">注：需双方输入对方的ID进行绑定</div>
  </PopupBox>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  props: ['config'],
  data() {
    return {
      relationMap: Object.freeze({ 1: '挚爱CP', 2: '贴心闺蜜', 3: '硬核兄弟', 4: '游戏搭子', 5: '灵魂知己' }),
      checkRelation: 1, // 1=>"挚爱CP",2=>"贴心闺蜜",3=>"硬核兄弟",4=>"游戏搭子",5=>"灵魂知己"
      step: 1, // 1: 输入uid 2: 查找结果 3: 提交成功，等待对方提交 4: 绑定失败，对方已绑定
      uid: '', // 输入的uid
      errTip: '', // 错误提示
      searchResult: {
        // profile_image: 'https://imagevo.dandanvoice.com/test/ufile/head/20200408/8016666/30121545889115.jpeg',
        // username: '昵称昵称昵称'
      } // 用户信息
    }
  },
  created() {
    this.step = this.config.status
  },
  methods: {
    // 重新绑定
    async resetBind () {
      const res = await this.bindApi(4)
      if (res.errno) return this.$toast(res.errmsg)
      this.step = 1
      this.searchResult = {}
    },
    // 取消绑定
    async cancelBind () {
      const res = await this.bindApi(3)
      this.$toast(res.errmsg)
      this.clickClose()
    },
    // 返回等待
    backAwait() {
      this.clickClose()
    },
    // 绑定
    async bind () {
      const res = await this.bindApi(2, this.uid, this.checkRelation)
      this.$toast(res.errmsg)
      if (res.errno == 0) this.clickClose()
    },
    // 重新查找
    resetSearch() {
      this.step--
      this.uid = ''
      this.searchResult = {}
    },
    // 查找用户按钮
    async searchUserInfo () {
      if (!this.uid) return (this.errTip = '请输入uid')
      this.errTip = ''
      const res = await this.bindApi(1, this.uid)
      if (res.errno) return (this.errTip = res.errmsg)
      this.searchResult = res.data
      this.step++
    },
    // 输入uid
    inputUid() {
      this.uid = this.uid.replace(/\D/g, '').slice(0, 8) // 只能输入8位数字
      this.errTip = '' // 清除错误提示
    },
    clickClose() {
      if (this.step == 2) this.$emit('update')
      this.$emit('clickClose')
    },
    /**
     * 绑定好友
     * @param {1|2|3|4} mark 1: 查找用户 2: 绑定 3: 取消绑定 4: 重新绑定
     * @param {number} tuid
     * @param {string} intimate_type
     * @returns {Promise}
     */
    bindApi(mark, tuid, intimate_type) {
      return getPageData({ type: 'magic_closet_pair_operation', mark: { type: mark, tuid, intimate_type } })
    },
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.button{
  $border: 3px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  font-size: 32px;
  font-weight: normal;
  // 渐变
  border: $border solid transparent;
  border-radius: 99999px;
  -webkit-background-clip: padding-box, border-box;
  -webkit-background-origin: padding-box, border-box;
  &.status0{
    color: #4d7ddd;
    background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
  }
  &.status1{
    color: #a9792c;
    background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
  }
  &.status2{
    color: #ffffff;
    background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7), linear-gradient(#fff, #fff);
  }
}
.avatarBox {
  width: 126px;
  height: 126px;
  background: #FBE0A7; /*todo 边框色*/
  border-radius: 50%;
  border: 4px solid transparent;
}
.nickName {
  margin-top: 18px;
  width: 177px;
  font-size: 30px;
  color: #ffffff;
}
.topTip {
  width: 528px;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
}
.row-2 {
  margin-bottom: 25px !important;
}
.bindInput {
  display: block;
  width: 502px;
  height: 82px;
  background: #FEFAEF;
  border-radius: 41px;
  border: 4px solid #FBE0A7; /*todo 输入框边框*/
  font-weight: bold;
  font-size: 34px;
  color: #3A91B9; /*todo 输入内容颜色*/
  &::placeholder {
    font-weight: bold;
    font-size: 34px;
    color: #C2C4D6;
  }
}
.errorTip {
  top: 200px;
  font-size: 26px;
  color: #ED1F1F; /* todo */
}
.searchBtn {
  @extend .button;
  margin-top: 58px;
  margin-bottom: 40px;
  width: 326px;
  height: 78px;
}
.userInfo {
  margin-top: 19px;
  margin-bottom: 21px;
  width: 544px;
  height: 252px;
  background: rgba(40, 131, 172, 0.3); /*todo 搜索结果背景色*/
  border-radius: 40px;
  .avatarAndNickName {
    width: 177px;
    height: 100%;
    .nickName {
      width: 250px;
    }
  }
  .userInfoBtn {
    //margin-left: 78px;
    height: 100%;
    .userInfoBind,
    .userInfoSearch {
      @extend .button;
      width: 178px;
      height: 72px;
    }
    .userInfoSearch {
      margin-top: 31px;
    }
    .bindInput{
      width: 316px;
      height: 82px;
    }
  }
}
.friendType{
 .p1{
    font-size: 28px;
    color: #FFFFFF;
  }
  .typeList{
    margin-top: 23px;
    .typeItem{
      width: 160px;
      height: 56px;
      background: #DF82AA; /* todo */
      border-radius: 28px;
      font-size: 28px;
      color: #FFE6EF; /* todo */
      margin-bottom: 10px;
      margin-left: 19px;
      &:first-child{
        margin-left: 0;
      }
      &.active{
        background: url('@/pages/summerParty/assets/tk_54.png') no-repeat left top/100% 100%;
        font-size: 28px;
        color: #FFFFFF;
      }
    }
  }
  .p2{
    margin-bottom: 30px;
    font-size: 24px;
    color: #ED1F1F; /* todo */
  }
  .userInfoBindNew{
    @extend .button;
    //margin-top: 58px;
    margin-bottom: 23px;
    width: 326px;
    height: 78px;
  }
}
.searchSuccess{
  .nickName{
    width: 220px !important;
  }
}
.submitSuccess {
  .submitSuccessUserInfo{
    width: 540px;
    height: 213px;
    border-radius: 40px;
    background: rgba(40, 131, 172, 0.3); /*todo 搜索结果背景色*/
    .avatarAndNickName{
      margin-right: 50px;
      width: 177px;
      height: 100%;
      .nickName {
        width: 250px;
      }
    }
    .p1{
      font-size: 28px;
      color: #FFFFFF;
      margin-bottom: 20px;
    }
    .friendType{
      width: 166px;
      height: 62px;
      background: url('@/pages/summerParty/assets/tk_54.png') no-repeat left top/100% 100%;
      font-size: 28px;
      color: #FFFFFF;
    }
  }
  .submitAvatarAndNickName {
    width: 177px;
    height: 100%;
    .nickName {
      width: 500px;
    }
  }
  .submitSuccessBtn {
    margin-top: 33px;
    margin-bottom: 26px;
    .backAwaitBtn,
    .cancelBindBtn {
      @extend .button;
      width: 246px;
      height: 78px;
    }
    .cancelBindBtn {
      margin-left: 18px;
    }
  }
}

.bindFail {
  .failAvatarAndNickName {
    width: 177px;
    height: 100%;
    .nickName {
      width: 500px;
    }
  }
  .resetBindBtn {
    @extend .button;
    margin-top: 33px;
    margin-bottom: 26px;
    width: 246px;
    height: 78px;
  }
}

.bottomTip {
  width: fit-content;
  font-size: 26px;
  color: #E95A7C; /* todo */
}
</style>
