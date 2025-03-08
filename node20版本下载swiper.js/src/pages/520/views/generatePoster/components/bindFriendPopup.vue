<template>
  <PopupBox title="title_14.png" :left="false" :right="false" @clickClose="clickClose">
    <!--顶部提示-->
    <template v-if="step == 1 || step == 2">
      <div class="topTip flex align-center text-nowrap margin-row-center line-height-100">绑定规则：用户两人互相输入对方ID，即可</div>
      <div class="topTip row-2 flex align-center text-nowrap margin-row-center line-height-100">绑定参与活动</div>
    </template>
    <div v-else-if="step == 3" class="topTip flex justify-center align-center text-nowrap margin-row-center line-height-100">
      绑定已提交，请提醒对方前往活动页面提交
    </div>
    <div v-else-if="step == 4" class="topTip row-2 flex justify-center align-center text-nowrap margin-row-center line-height-100">
      绑定失效，对方已被绑定
    </div>
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
    <template v-if="step == 1">
      <div class="errorTip position-absolute position-row-center text-nowrap line-height-100">{{ errTip }}</div>
      <div class="searchBtn buttonStyle-2 flex align-center justify-center line-height-100 margin-row-center" @click="searchUserInfo">查找</div>
    </template>
    <!--查找成功 展示用户-->
    <div v-else-if="step == 2" class="userInfo flex align-center justify-center flex-no-wrap margin-row-center">
      <div class="avatarAndNickName flex-column align-center justify-center">
        <div class="avatarBox position-relative">
          <img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error.once="imgAtError" />
        </div>
        <div class="nickName ellipsis line-height-100 text-center">{{ searchResult.username }}</div>
      </div>
      <div class="userInfoBtn flex-column align-center justify-center flex-no-wrap">
        <div class="userInfoBind buttonStyle-1 flex align-center justify-center line-height-100" @click="bind">绑定</div>
        <div class="userInfoSearch buttonStyle-2 flex align-center justify-center line-height-100" @click="resetSearch">重新查找</div>
      </div>
    </div>
    <!--绑定已提交-->
    <div v-else-if="step == 3" class="submitSuccess">
      <div class="submitAvatarAndNickName flex-column align-center justify-center margin-row-center">
        <div class="avatarBox position-relative">
          <img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error.once="imgAtError" />
        </div>
        <div class="nickName ellipsis line-height-100 text-center">{{ searchResult.username }}</div>
      </div>
      <div class="submitSuccessBtn flex align-center justify-center flex-no-wrap">
        <div class="backAwaitBtn buttonStyle-2 flex align-center justify-center line-height-100" @click="backAwait">返回等待</div>
        <div class="cancelBindBtn buttonStyle-1 flex align-center justify-center line-height-100" @click="cancelBind">取消绑定</div>
      </div>
    </div>
    <!--绑定失败-->
    <div v-else-if="step == 4" class="bindFail">
      <div class="failAvatarAndNickName flex-column align-center justify-center margin-row-center">
        <div class="avatarBox position-relative">
          <img class="position-absolute w-100 h-100 fit-cover radius-50" :src="IconPath(searchResult.profile_image)" @error.once="imgAtError" />
        </div>
        <div class="nickName ellipsis line-height-100 text-center">{{ searchResult.username }}</div>
      </div>
      <div class="resetBindBtn buttonStyle-1 flex align-center justify-center line-height-100 margin-row-center" @click="resetBind">重新绑定</div>
    </div>
    <!--底部提示-->
    <div v-if="step == 1 || step == 2" class="bottomTip margin-row-center text-nowrap line-height-100">注：成功绑定后不可解绑</div>
    <div v-else class="bottomTip margin-row-center text-nowrap line-height-100">注：需双方输入对方的ID进行绑定</div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/520/components/popupBox.vue'
import { _throttle } from '@/pages/520/utils/tool'
import { getPageData } from '@/pages/520/api'

export default {
  components: { PopupBox },
  data() {
    return {
      step: '', // 1: 输入uid 2: 查找结果 3: 提交成功，等待对方提交 4: 绑定失败，对方已绑定
      uid: '', // 输入的uid
      errTip: '', // 错误提示
      searchResult: {
        // profile_image: 'https://imagevo.dandanvoice.com/test/ufile/head/20200408/8016666/30121545889115.jpeg',
        // username: '昵称昵称昵称'
      } // 用户信息
    }
  },
  async created() {
    const { data, errno, errmsg } = await getPageData({ type: 'lovename_pair_info' })
    if (errno) return this.$toast(errmsg)
    if (data.status == 2) return this.$emit('update')
    this.step = data.status
    if (data.status == 3 || data.status == 4) {
      this.searchResult = data.pair_user_info
    }
  },
  methods: {
    // 重新绑定
    resetBind: _throttle(async function () {
      const res = await this.bindApi(4)
      if (res.errno) return this.$toast(res.errmsg)
      this.step = 1
      this.searchResult = {}
    }, 1000),
    // 取消绑定
    cancelBind: _throttle(async function () {
      const res = await this.bindApi(3)
      this.$toast(res.errmsg)
      this.clickClose()
    }, 1000),
    // 返回等待
    backAwait() {
      this.clickClose()
    },
    // 绑定
    bind: _throttle(async function () {
      const res = await this.bindApi(2, this.uid)
      this.$toast(res.errmsg)
      if (res.errno == 0) this.clickClose()
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
      const res = await this.bindApi(1, this.uid)
      if (res.errno) return (this.errTip = res.errmsg)
      this.searchResult = res.data
      this.step++
    }, 1000),
    // 输入uid
    inputUid(e) {
      if (!/^[0-9]*$/.test(e.target.value)) this.uid = e.target.value.replace(/[^0-9]/g, '') // 删除非数字
      if (e.target.value.indexOf(' ') >= 0) this.uid = e.target.value.replace(/\s+/g, '') // 删除空格
      if (this.errTip) this.errTip = '' // 清除错误提示
    },
    clickClose() {
      if (this.step == 2) this.$emit('update')
      this.$emit('clickClose')
    },
    /**
     * 绑定好友
     * @param {number} mark
     * @param {number} tuid
     * @returns {Promise}
     */
    bindApi(mark, tuid) {
      return getPageData({ type: 'lovename_pair_opt', mark, tuid })
    },
    /**
     * 头像图片裂开执行
     */
    imgAtError(event) {
      event.currentTarget.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 608px;
  padding: 0;
  background: linear-gradient(0deg, #f9c984, #f378a6);
  border-radius: 144px 144px 84px 84px;
  border: 4px solid #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
}
::v-deep .main {
  min-height: 530px;
  padding-top: 85px;
}
::v-deep .titleIcon {
  top: -99px !important;
}
.avatarBox {
  width: 126px;
  height: 126px;
  background: #ffffff;
  border-radius: 50%;
  border: 4px solid #ffd0e7;
}
.nickName {
  margin-top: 18px;
  width: 177px;
  font-size: 30px;
  color: #ffffff;
}
.buttonStyle-1 {
  border-radius: 36px;
  border: 3px solid #ffffff;
  font-size: 32px;
  color: #a9792c;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
}
.buttonStyle-2 {
  border-radius: 36px;
  border: 3px solid #ffffff;
  font-size: 32px;
  color: #4d7ddd;
  background: linear-gradient(0deg, #cae7ff, #ffffff);
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
  border: 4px solid #f6a1b0;
  font-weight: bold;
  font-size: 34px;
  color: #b35553;
  &::placeholder {
    font-weight: bold;
    font-size: 34px;
    color: #c2c4d6;
  }
}
.errorTip {
  top: 285px;
  font-size: 26px;
  color: #ea1c60;
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
  background: rgba(237, 103, 141, 0.5);
  border-radius: 20px;
  .avatarAndNickName {
    width: 177px;
    height: 100%;
    .avatarBox {
    }
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
    .userInfoBind {
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
    .avatarBox {
    }
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
    .backAwaitBtn {
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
    .avatarBox {
    }
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
  margin-bottom: 40px;
  width: fit-content;
  font-weight: 500;
  font-size: 26px;
  color: #fff;
}
</style>
