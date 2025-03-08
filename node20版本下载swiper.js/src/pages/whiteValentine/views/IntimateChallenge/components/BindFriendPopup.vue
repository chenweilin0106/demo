<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('tk_6_41.png')" />

      <div class="inner position-relative w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--顶部提示-->
        <template v-if="step == 1 || step == 2">
          <div class="topTip flex align-center text-nowrap margin-row-center">绑定规则：用户两人互相输入对方ID，即可</div>
          <div class="topTip row-2 flex align-center text-nowrap margin-row-center">绑定参与活动</div>
        </template>
        <div v-else-if="step == 3" class="topTip flex justify-center align-center text-nowrap margin-row-center">
          绑定已提交，请提醒对方前往活动页面提交
        </div>
        <div v-else class="topTip row-2 flex justify-center align-center text-nowrap margin-row-center">绑定失效，对方已被绑定</div>

        <!--输入框-->
        <input
          v-if="step == 1 || step == 2"
          v-model="uid"
          :readonly="step == 2"
          type="text"
          class="bindInput margin-row-center text-center line-height-100 text-nowrap"
          placeholder="点击输入对方ID"
          maxlength="8"
          @input="inputUid"
        />
        <div v-if="step == 1" class="errorTip position-absolute position-row-center text-nowrap">{{ errTip }}</div>
        <div v-if="step == 1" class="searchBtn flex align-center justify-center line-height-100 margin-row-center" @click="searchUserInfo">查找</div>

        <!--查找成功 展示用户-->
        <div v-if="step == 2" class="userInfo flex align-center justify-center flex-no-wrap margin-row-center">
          <div class="avatarAndNickName flex-column align-center justify-center">
            <div class="avatar-box position-relative">
              <img class="position-absolute fit-cover radius-50" :src="IconPath(searchResult.profile_image)" />
            </div>
            <div class="nickName ellipsis line-height-100 text-center">{{ searchResult.username }}</div>
          </div>
          <div class="userInfoBtn flex-column align-center justify-center flex-no-wrap">
            <div class="userInfoBind flex align-center justify-center line-height-100" @click="bind">绑定</div>
            <div class="userInfoSearch flex align-center justify-center line-height-100" @click="resetSearch">重新查找</div>
          </div>
        </div>

        <!--绑定已提交-->
        <div v-if="step == 3" class="submitSuccess">
          <div class="submitAvatarAndNickName flex-column align-center justify-center margin-row-center">
            <div class="avatar-box position-relative">
              <img class="position-absolute fit-cover radius-50" :src="IconPath(searchResult.profile_image)" />
            </div>
            <div class="nickName text-nowrap line-height-100 flex align-center justify-center">{{ searchResult.username }}</div>
          </div>
          <div class="submitSuccessBtn flex align-center justify-center flex-no-wrap">
            <div class="backAwaitBtn flex align-center justify-center line-height-100" @click="backAwait">返回等待</div>
            <div class="cancelBindBtn flex align-center justify-center line-height-100" @click="cancelBind">取消绑定</div>
          </div>
        </div>

        <!--绑定失败-->
        <div v-if="step == 4" class="bindFail">
          <div class="failAvatarAndNickName flex-column align-center justify-center margin-row-center">
            <div class="avatar-box position-relative">
              <img class="position-absolute fit-cover radius-50" :src="IconPath(searchResult.profile_image)" />
            </div>
            <div class="nickName text-nowrap line-height-100 flex align-center justify-center">{{ searchResult.username }}</div>
          </div>
          <div class="resetBindBtn flex align-center justify-center line-height-100 margin-row-center" @click="resetBind">重新绑定</div>
        </div>

        <!--底部提示-->
        <div v-if="step == 1 || step == 2" class="bottomTip margin-row-center text-nowrap">注：两人成功绑定后不可解绑</div>
        <div v-else class="bottomTip margin-row-center text-nowrap">注：需双方输入对方的ID进行绑定</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { _throttle } from '@/pages/whiteValentine/utils/tool'
import { getPageData } from '@/pages/whiteValentine/api'

export default {
  data() {
    return {
      step: 1, // 1: 输入uid 2: 查找结果 3: 提交成功，等待对方提交 4: 绑定失败，对方已绑定
      showPopup: false,
      uid: '', // 输入的uid
      errTip: '', // 错误提示
      searchResult: {} // 用户信息
    }
  },
  methods: {
    // 重新绑定
    resetBind: _throttle(async function () {
      const res = await getPageData({ type: 'pairgame_pair_opt', mark: 4 })
      if (res.errno) return this.$toast(res.errmsg)
      this.step = 1
      this.searchResult = {}
    }, 1000),
    // 取消绑定
    cancelBind: _throttle(async function () {
      const res = await getPageData({ type: 'pairgame_pair_opt', mark: 3 })
      this.$toast(res.errmsg)
      this.showPopup = false
    }, 1000),
    // 返回等待
    backAwait() {
      this.showPopup = false
    },
    // 绑定
    bind: _throttle(async function () {
      const res = await getPageData({ type: 'pairgame_pair_opt', mark: 2, tuid: this.uid })
      this.$toast(res.errmsg)
      if (res.errno == 0) this.showPopup = false
    }, 1000),
    // 重新查找
    resetSearch() {
      this.step--
      this.uid = ''
      this.searchResult = {}
    },
    // 查找用户按钮
    searchUserInfo: _throttle(async function () {
      if (!this.uid.length) return (this.errTip = '请输入uid')
      this.errTip = ''
      const res = await getPageData({ type: 'pairgame_pair_opt', mark: 1, tuid: this.uid })
      if (res.errno) return (this.errTip = res.errmsg)
      this.searchResult = res.data
      this.step++
    }, 1000),
    // 输入uid
    inputUid(e) {
      // 删除非数字
      if (!/^[0-9]*$/.test(e.target.value)) {
        this.uid = e.target.value.replace(/[^0-9]/g, '')
      }
      // 删除空格
      if (e.target.value.indexOf(' ') >= 0) {
        this.uid = e.target.value.replace(/\s+/g, '')
      }
      // 清除错误提示
      this.errTip && (this.errTip = '')
    },
    clickClose() {
      if (this.step == 2) this.$emit('update')
      this.clearData()
      this.$emit('close')
    },
    // 打开弹框
    openPrompt: _throttle(async function () {
      const { data, errno, errmsg } = await getPageData({ type: 'pairgame_pair_info' })
      if (errno) return this.$toast(errmsg)
      if (data.status == 2) return this.$emit('update')
      this.step = data.status
      if (data.status == 3 || data.status == 4) {
        this.searchResult = data.pair_user_info
      }
      this.showPopup = true
    }, 1000),
    clearData() {
      this.step = 1
      this.uid = ''
      this.errTip = ''
      this.searchResult = {}
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}
.popup-content {
  position: relative;
  width: 620px;

  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;
  .inner {
    min-height: 530px;
    padding-top: 73px;
    border-radius: 24px;
    background: linear-gradient(180deg, #fff3f4, #f9c4c7);
  }
}
.title-image {
  width: 644px;
  height: 230px;
  position: absolute;
  z-index: 3;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
.topTip {
  width: 528px;
  font-weight: 500;
  font-size: 28px;
  color: #b35553;
  margin-bottom: 20px;
}
.row-2 {
  margin-bottom: 44px !important;
}
.bindInput {
  display: block;
  width: 502px;
  height: 82px;
  background: #fefaef;
  border-radius: 41px;
  border: 4px solid #f6a1b0;
  font-weight: bold;
  font-size: 34px;
  color: #b35553;
  &::placeholder {
    font-weight: bold;
    font-size: 34px;
    color: #f9c4c7;
  }
}
.errorTip {
  top: 300px;
  font-size: 26px;
  color: #7588f3;
}
.searchBtn {
  margin-top: 58px;
  margin-bottom: 40px;
  width: 178px;
  height: 78px;
  background: linear-gradient(0deg, #bcc4f1, #ffffff);
  border-radius: 38px;
  border: 3px solid #ffffff;
  font-weight: 500;
  font-size: 32px;
  color: #707ccb;
}
.userInfo {
  margin-top: 19px;
  margin-bottom: 21px;
  width: 544px;
  height: 252px;
  background: #e99a9a;
  border-radius: 20px;
  .avatarAndNickName {
    width: 177px;
    height: 100%;
    .avatar-box {
      width: 153px;
      height: 151px;
      background: url('@/pages/whiteValentine/assets/tk_6_46.png') no-repeat left top/100% 100%;
      > img {
        top: 17px;
        left: 19px;
        width: 120px;
        height: 120px;
      }
    }
    .nickName {
      margin-top: 18px;
      width: 177px;
      font-size: 30px;
      color: #ffffff;
    }
  }
  .userInfoBtn {
    margin-left: 78px;
    height: 100%;
    .userInfoBind,
    .userInfoSearch {
      width: 178px;
      height: 72px;
      border-radius: 36px;
      border: 3px solid #ffffff;
      font-size: 32px;
    }
    .userInfoBind {
      color: #a9792c;
      background: linear-gradient(0deg, #fff9d1, #ffffff);
    }
    .userInfoSearch {
      margin-top: 31px;
      color: #707ccb;
      background: linear-gradient(0deg, #bcc4f1, #ffffff);
    }
  }
}
.submitSuccess {
  .submitAvatarAndNickName {
    width: 177px;
    height: 100%;
    .avatar-box {
      width: 153px;
      height: 151px;
      background: url('@/pages/whiteValentine/assets/tk_6_46.png') no-repeat left top/100% 100%;
      > img {
        top: 17px;
        left: 19px;
        width: 120px;
        height: 120px;
      }
    }
    .nickName {
      margin-top: 18px;
      width: 177px;
      font-size: 30px;
      color: #b35553;
    }
  }
  .submitSuccessBtn {
    margin-top: 33px;
    margin-bottom: 26px;
    .backAwaitBtn,
    .cancelBindBtn {
      width: 246px;
      height: 78px;
      border-radius: 39px;
      border: 3px solid #ffffff;
      font-size: 32px;
    }
    .backAwaitBtn {
      color: #707ccb;
      background: linear-gradient(0deg, #bcc4f1, #ffffff);
    }
    .cancelBindBtn {
      margin-left: 18px;
      color: #a9792c;
      background: linear-gradient(0deg, #fff9d1, #ffffff);
    }
  }
}

.bindFail {
  .failAvatarAndNickName {
    width: 177px;
    height: 100%;
    .avatar-box {
      width: 153px;
      height: 151px;
      background: url('@/pages/whiteValentine/assets/tk_6_46.png') no-repeat left top/100% 100%;
      > img {
        top: 17px;
        left: 19px;
        width: 120px;
        height: 120px;
      }
    }
    .nickName {
      margin-top: 18px;
      width: 177px;
      font-size: 30px;
      color: #b35553;
    }
  }
  .resetBindBtn {
    margin-top: 33px;
    margin-bottom: 26px;
    width: 246px;
    height: 78px;
    border-radius: 39px;
    border: 3px solid #ffffff;
    font-size: 32px;
    color: #a9792c;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
  }
}

.bottomTip {
  margin-bottom: 40px;
  width: fit-content;
  font-weight: 500;
  font-size: 26px;
  color: #b35553;
}
</style>
