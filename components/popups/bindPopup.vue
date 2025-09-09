<template>
  <PopupBox title="title_15.png" @clickClose="clickClose">
    <!--顶部提示-->
    <template v-if="step==1||step==2">
      <div class="topTip flex align-center text-nowrap margin-row-center line-height-100">绑定规则：用户两人互相输入对方ID，即可</div>
      <div class="topTip row-2 flex align-center text-nowrap margin-row-center line-height-100">绑定参与活动</div>
    </template>
    <div v-else-if="step==3" class="topTip flex justify-center align-center text-nowrap margin-row-center line-height-100">绑定已提交，请提醒对方前往活动页面提交</div>
    <div v-else-if="step==4" class="topTip row-2 flex justify-center align-center text-nowrap margin-row-center line-height-100">绑定失效，对方已被绑定</div>
    <!--输入框-->
    <input v-if="step==1||step==2" v-model="uid" :readonly="step==2" class="bindInput margin-row-center text-center line-height-100 text-nowrap" placeholder="点击输入对方ID" maxlength="8" @input="inputUid" @blur="handleBlur" />
    <template v-if="step==1">
      <div class="errorTip position-absolute position-row-center text-nowrap line-height-100">{{errTip}}</div>
      <PublicButton hasRight="0" class="searchBtn flex align-center justify-center line-height-100 margin-row-center" @click="searchUserInfo">查找</PublicButton>
    </template>
    <!--查找成功 展示用户-->
    <div v-else-if="step==2" class="userInfo flex align-center justify-center flex-no-wrap margin-row-center">
      <div class="avatarAndNickName flex-column align-center justify-center">
        <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error="imgAtError" /></div>
        <div class="nickName ellipsis line-height-100 text-center">{{searchResult.username}}</div>
      </div>
      <div class="userInfoBtn flex-column align-center justify-center flex-no-wrap">
        <PublicButton hasRight="1" class="userInfoBind flex align-center justify-center line-height-100" @click="bind">绑定</PublicButton>
        <PublicButton hasRight="0" class="userInfoSearch flex align-center justify-center line-height-100" @click="resetSearch">重新查找</PublicButton>
      </div>
    </div>
    <!--绑定已提交-->
    <div v-else-if="step==3" class="submitSuccess">
      <div class="submitAvatarAndNickName flex-column align-center justify-center margin-row-center">
        <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(config.pair_user_info.profile_image)" @error="imgAtError" /></div>
        <div class="nickName ellipsis line-height-100 text-center">{{config.pair_user_info.username}}</div>
      </div>
      <div class="submitSuccessBtn flex align-center justify-center flex-no-wrap">
        <PublicButton has-right="0" class="backAwaitBtn flex align-center justify-center line-height-100" @click="backAwait">返回等待</PublicButton>
        <PublicButton hasRight="1" class="cancelBindBtn flex align-center justify-center line-height-100" @click="cancelBind">取消绑定</PublicButton>
      </div>
    </div>
    <!--绑定失败-->
    <div v-else-if="step==4" class="bindFail">
      <div class="failAvatarAndNickName flex-column align-center justify-center margin-row-center">
        <div class="avatarBox position-relative"><img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(config.pair_user_info.profile_image)" @error="imgAtError" /></div>
        <div class="nickName ellipsis line-height-100 text-center">{{config.pair_user_info.username}}</div>
      </div>
      <PublicButton hasRight="1" class="resetBindBtn flex align-center justify-center line-height-100 margin-row-center" @click="resetBind">重新绑定</PublicButton>
    </div>
    <!--底部提示-->
    <div v-if="step==1||step==2" class="bottomTip margin-row-center text-nowrap line-height-100">注：成功绑定后不可解绑</div>
    <div v-else class="bottomTip margin-row-center text-nowrap line-height-100">注：需双方输入对方的ID进行绑定</div>
  </PopupBox>
</template>

<script>
import { isIOS } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  props: ['config'],
  data() {
    return {
      step: 0, // 1: 输入uid 2: 查找结果 3: 提交成功，等待对方提交 4: 绑定失败，对方已绑定
      uid: '', // 输入的uid
      errTip: '', // 错误提示
      searchResult: {
        // profile_image: 'https://imagevo.dandanvoice.com/test/ufile/head/20200408/8016666/30121545889115.jpeg',
        // username: '昵称昵称昵称'
      } // 用户信息
    }
  },
  async created() {
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
      const res = await this.bindApi(2, this.uid)
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
    handleBlur() {
      if (isIOS()) return window.scrollTo(0, 0)
    },
    clickClose() {
      if (this.step == 2) this.$emit('update')
      this.$emit('clickClose')
    },
    /**
     * 绑定好友
     * @param {1|2|3|4} mark 1: 查找用户 2: 绑定 3: 取消绑定 4: 重新绑定
     * @param {number} tuid
     * @returns {Promise}
     */
    bindApi(mark, tuid) {
      return getPageData({ type: 'lovename_pair_opt', mark, tuid })
    },
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.publicButton{
  font-size: 32px !important;
}
.avatarBox {
  width: 126px;
  height: 126px;
  background: #FFBCDC; /*todo 边框色*/
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
  background: #fefaef;
  border-radius: 41px;
  border: 4px solid #FFBCDC; /*todo 输入框边框*/
  font-weight: bold;
  font-size: 34px;
  color: #E8599D; /*todo 输入内容颜色*/
  &::placeholder {
    font-weight: bold;
    font-size: 34px;
    color: #C2C4D6;
  }
}
.errorTip {
  top: 200px;
  font-size: 26px;
  color: #EA1C60;
}
.searchBtn {
  margin-top: 58px;
  margin-bottom: 40px;
  width: 178px;
  height: 78px;
}
.userInfo {
  margin-top: 19px;
  margin-bottom: 21px;
  width: 544px;
  height: 252px;
  background: rgba(202, 85, 134, 0.3); /*todo 搜索结果背景色*/
  border-radius: 20px;
  .avatarAndNickName {
    width: 177px;
    height: 100%;
    .nickName {
      width: 250px;
    }
  }
  .userInfoBtn {
    margin-left: 78px;
    height: 100%;
    .userInfoBind,
    .userInfoSearch {
      width: 178px;
      height: 72px;
    }
    .userInfoSearch {
      margin-top: 31px;
    }
  }
}
.submitSuccess {
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
    margin-top: 33px;
    margin-bottom: 26px;
    width: 246px;
    height: 78px;
  }
}

.bottomTip {
  width: fit-content;
  font-weight: 500;
  font-size: 26px;
  color: #fff;
}
</style>
