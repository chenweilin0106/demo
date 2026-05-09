<template>
  <PopupBox title="合约赠送解锁" @clickClose="clickClose">
    <!-- <p class="flex justify-center text-center">30分钟内无法向同一人发出重复邀请<br>好友每天可为你完成助力1次</p> -->
    <div class="searchInput flex align-center justify-center">
      <input v-model="uid" placeholder="输入ID搜索" maxlength="8" @blur="onBlur" @keydown="handleKeyDown" @input="inputUid" />
      <div class="searchButton" @click="search"></div>
    </div>
    <template v-if="list.length">
      <div class="list overscroll-none margin-row-center overflow-x-hidden overflow-y-scroll">
        <div v-for="item in list" :key="item.uid" class="item flex align-center justify-between margin-row-center">
          <img v-lazy="IconPath(item.profile_image || avatarDefault)" class="avatar fit-cover radius-50" alt="" @click="toUserMain(item.uid)" @error="imgAtError" />
          <div class="userInfo position-relative flex-column justify-center">
            <div class="usernameDiv">
              <div class="usernameText ellipsis">{{item.username}}</div>
              <div class="label position-absolute" :class="`status_${item.user_type}`"></div>
            </div>
            <div class="userPrettyCode">
              <lazy-component class="havenBg" v-if="item.pretty_type!=0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]" />
              </lazy-component>
              <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
              <span v-else class="noPrettyCode">ID:{{item.code || '--'}}</span>
            </div>
          </div>
          <div class="checkButton" :class="`status${checkedList.includes(item) ? 1 : 0}`" @click="check(item)"></div>
        </div>
      </div>
    </template>
    <div v-else class="noData flex-column line-height-100 align-center">暂无好友，可输入ID搜索</div>
    <!-- <div class="checkedNum flex justify-center line-height-100">已选择好友（{{ checkedList.length }}/{{ res_num }}）</div> -->
    <div class="sendButton margin-row-center status1" @click="send">赠送</div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>合约奖励一旦赠送解锁，无法索回，请谨慎操作。</li>
      </ul>
    </div>
    <SelectPopup v-if="isShowSelectPopup" :config="configSelectPopup" @sendSuccess="sendSuccess" @clickClose="isShowSelectPopup = false" />
  </PopupBox>
</template>

<script>
import { isIOS, toUserMain } from '@/utils/toApp'
import { imgAtError, _throttle } from '@/utils/tool'
import { friendList, searchFriend } from '@/api'
import SelectPopup from './selectPopup.vue'

export default {
  name: 'sendPopup',
  components: { SelectPopup },
  props: ['cake_list'],
  data() {
    return {
      avatarDefault: Object.freeze('avatarDefault.png'), // 默认头像
      uid: '', // 输入的ID
      checkedList: [], // 选中的好友列表
      res_num: 1, // 小队剩余人数
      list: [
        // { uid: 1, username: 'username', profile_image: 'profile_image', user_type: 1, pretty_type: 1, code: 1 },
        // { uid: 2, username: 'username', profile_image: 'profile_image', user_type: 2, pretty_type: 2, code: 2 },
        // { uid: 3, username: 'username', profile_image: 'profile_image', user_type: 3, pretty_type: 3, code: 3 },
        // { uid: 4, username: 'username', profile_image: 'profile_image', user_type: 4, pretty_type: 4, code: 4 },
        // { uid: 5, username: 'username', profile_image: 'profile_image', user_type: 5, pretty_type: 5, code: 5 }
      ], // 好友列表
      isShowSelectPopup: false, // 选择弹窗
      configSelectPopup: {
        popupType: 2,
        list: [],
        user: { uid: 0, username: '', profile_image: '', user_type: 0, pretty_type: 0, code: 0 }
      }
    }
  },
  created() {
    this.getHomePage()
  },
  methods: {
    toUserMain,
    imgAtError,
    send() {
      if (!this.checkedList.length) return this.$toast('请选择赠送的好友')
      console.log(this.checkedList[0])
      this.configSelectPopup = { ...this.configSelectPopup, user: this.checkedList[0] }
      this.isShowSelectPopup = true
    },
    /**
     * 搜索好友
     */
    search: _throttle(async function () {
      if (!this.uid?.length) {
        this.checkedList = []
        return this.getHomePage()
      }
      const res = await searchFriend(this.uid)
      if (res.errno) return this.$toast(res.errmsg)
      this.list = [res.data]
      this.checkedList = []
    }),
    /**
     * 选择好友
     * @param {Object} item - 好友信息
     * @param {number} item.uid - 好友ID
     * @param {string} item.username - 好友昵称
     * @param {string} item.profile_image - 好友头像
     * @param {number} item.user_type - 好友类型
     * @param {number} item.pretty_type - 好友装扮类型
     * @param {string} item.code - 好友码
     */
    check(item) {
      const flag = this.checkedList.includes(item)
      if (flag) {
        this.checkedList = this.checkedList.filter(c => c.uid != item.uid)
      } else {
        if (this.checkedList.length >= this.res_num) return this.$toast(`最多选择${this.res_num}位好友`)
        this.checkedList.push(item)
      }
    },
    /**
     * 处理输入框输入事件
     */
    inputUid() {
      this.uid = this.uid.replace(/[^0-9]/g, '') // 只能输入数字
      this.uid = this.uid.replace(/\s+/g, '') // 删除空格
      this.uid = this.uid.replace(/[\r\n]/g, '') // 删除回车换行符
    },
    /**
     * 处理输入框按键事件
     * @param {Event} e - 按键事件对象
     */
    handleKeyDown(e) {
      if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
    },
    /**
     * 处理输入框失焦事件
     */
    onBlur() {
      if (isIOS()) return window.scrollTo(0, 0)
    },
    /**
     * 赠送成功
     */
    sendSuccess() {
      this.$emit('getHomePage')
      this.isShowSelectPopup = false
      this.$nextTick(() => {
        this.clickClose()
      })
    },
    /**
     * 获取首页数据
     */
    async getHomePage() {
      const res = await friendList()
      if (res.errno) return this.$toast(res.errmsg)
      this.list = res.data
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.button {
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
  border: $border solid transparent;
  border-radius: 99999px;
  -webkit-background-clip: padding-box, border-box;
  -webkit-background-origin: padding-box, border-box;
  &.status0 {
    color: #4d7ddd;
    background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
  }
  &.status1 {
    color: #a9792c;
    background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
  }
}
p {
  font-size: 28px;
  color: #FFFFFF;
}
.searchInput {
  margin: 0 auto 21px auto;
  position: relative;
  width: fit-content;
  input {
    width: 509px;
    height: 59px;
    background: #D65E3E;
    border-radius: 999999px;
    font-size: 28px;
    color: #FFC3B7;
    padding: 0 43px;
    &::placeholder {
      font-size: 28px;
      color: #FFC3B7;
    }
  }
  .searchButton {
    position: absolute;
    right: 19px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    background: url('@/pages/520/assets/tk_31.png') no-repeat left top/100% 100%;
  }
}
.list {
  height: 550px;
  .item {
    width: 600px;
    height: 110px;
    padding: 0 35px 0 33px;
    &:nth-child(odd) {
      background: rgba(214, 94, 62, 0.3);
    }
    .avatar {
      width: 82px;
      height: 82px;
      background: #FFDC92;
      padding: 4px;
    }
    .userInfo {
      margin-left: 11px;
      height: 100%;
      .usernameDiv {
        position: relative;
        width: fit-content;
        margin-bottom: 4px;
        .usernameText {
          max-width: 270px;
          font-size: 28px;
          color: #FFFFFF;
        }
        .label {
          right: -15px;
          top: 50%;
          transform: translate(100%, -50%);
          width: 72px;
          height: 34px;
          &.status_1 {
            background: url('@/pages/520/assets/userType1.png') no-repeat left top/100% 100%;
          }
          &.status_2 {
            background: url('@/pages/520/assets/userType2.png') no-repeat left top/100% 100%;
          }
          &.status_3 {
            background: url('@/pages/520/assets/userType3.png') no-repeat left top/100% 100%;
          }
          &.status_4 {
            background: url('@/pages/520/assets/userType4.png') no-repeat left top/100% 100%;
          }
        }
      }
      .userPrettyCode {
        font-size: 24px;
        color: #FFFB8C;
        width: 160px;
        height: 37px;
        display: flex;
        align-items: center;
      }
    }
    .checkButton {
      width: 39px;
      height: 39px;
      margin-left: auto;
      &.status0 {
        background: url('@/pages/520/assets/tk_33.png') no-repeat left top/100% 100%;
      }
      &.status1 {
        background: url('@/pages/520/assets/tk_32.png') no-repeat left top/100% 100%;
      }
      &.status2 {
        background: url('@/pages/520/assets/tk_34.png') no-repeat left top/100% 100%;
      }
    }
  }
}
//.checkedNum {
//  margin-top: 19px;
//  margin-bottom: 11px;
//  font-size: 24px;
//  color: #F62F4B;
//}
.sendButton {
  @extend .button;
  width: 324px;
  height: 76px;
  margin-top: 27px;
  margin-bottom: 13px;
}
.rules-text-popup {
  li {
    font-size: 24px;
  }
}
.noData {
  width: 100%;
  height: 550px;
  font-size: 28px;
  color: #FFFFFF;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
