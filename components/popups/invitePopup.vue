<template>
  <PopupBox title="title_29.png" @clickClose="clickClose">
    <template v-if="list.length">
      <p class="flex justify-center text-center">30分钟内无法向同一人发出重复邀请<br>好友每天可为你完成助力1次</p>
      <div class="searchInput flex align-center justify-center">
        <input v-model="uid" class="text-center line-height-100 text-nowrap" placeholder="输入ID搜索好友" maxlength="8" @keydown="onKeyDown" @input="onInput" @blur="onBlur" />
        <PublicButton class="search" hasRight="0" @click="search">搜索</PublicButton>
      </div>
      <div class="list overscroll-none margin-row-center overflow-x-hidden overflow-y-scroll">
        <div v-for="item in list" :key="item.uid" class="item flex align-center justify-between margin-row-center">
          <img :src="IconPath(item.profile_image)" class="avatar fit-cover radius-50" @click="toUserMain(item.uid)" @error="imgAtError" />
          <div class="userInfo position-relative flex align-center">
            <div class="username ellipsis line-height-100">{{item.username}}</div>&nbsp;
            <div v-if="userLabel.includes(item.user_type)" class="label position-absolute" :class="`status_${item.user_type}`"></div>
          </div>
          <img :src="IconPath(checkedList.includes(item.uid)?'tk_23_1.png':'tk_23.png')" class="checkBtn" @click="check(item.uid)" />
        </div>
      </div>
      <div class="checkedNum flex justify-center line-height-100">已选择好友（{{checkedList.length}}/{{res_num}}）</div>
      <PublicButton class="inviteBtn margin-row-center" hasRight="1" @click="invite">邀请</PublicButton>
    </template>
    <div v-else class="noData flex-column line-height-100 align-center"><span>暂无好友</span><span>快去添加好友吧!</span>
    </div>
  </PopupBox>
</template>

<script>
import { toUserMain, isIOS } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  data() {
    return {
      userLabel: Object.freeze([1, 2, 3, 4]),
      uid: '',
      hasData: false,
      checkedList: [],
      res_num: 5, // 小队剩余人数
      list: [
        // { uid: 1, username: 'username', profile_image: 'profile_image', user_type: 1 }
      ] // 好友列表
    }
  },
  created() {
    this.getHomePage()
  },
  methods: {
    async invite() {
      if (!this.checkedList.length) return this.$toast('请选择邀请的好友')
      const res = await getPageData({ type: 'magic_closet_invite', mark: this.checkedList })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('clickClose')
    },
    async search() {
      if (!this.uid?.length) return this.getHomePage()
      const res = await getPageData({ type: 'magic_closet_invite_search', mark: this.uid })
      if (res.errno) return this.$toast(res.errmsg)
      this.list = [res.data]
    },
    check(uid) {
      const flag = this.checkedList.includes(uid)
      if (flag) {
        this.checkedList = this.checkedList.filter(item => item != uid)
      } else {
        if (this.checkedList.length >= this.res_num) return this.$toast(`最多选择${this.res_num}位好友`)
        this.checkedList.push(uid)
      }
    },
    onInput() {
      this.uid = this.uid.replace(/\s+/g, '') // 删除空格
      this.uid = this.uid.replace(/[\r\n]/g, '') // 删除回车换行符
      this.uid = this.uid.replace(/[^0-9]/g, '') // 只能输入数字
    },
    onBlur() {
      if (isIOS()) return window.scrollTo(0, 0)
    },
    onKeyDown(e) {
      if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
    },
    clickClose() {
      this.$emit('clickClose')
    },
    async getHomePage() {
      const res = await getPageData({ type: 'magic_closet_invite_list' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
p {
  font-size: 28px;
  color: #FFFFFF;
}
.searchInput {
  margin: 36px 0 26px;
  input {
    width: 434px;
    height: 82px;
    background: #FEFAEF;
    border-radius: 999999px;
    border: 4px solid #FBE0A7;
    font-weight: 500;
    font-size: 30px;
    color: #F1684D;
    &::placeholder {
      font-weight: 500;
      font-size: 30px;
      color: #C4C2CE;
    }
  }
  .search {
    margin-left: 8px;
    width: 124px;
    height: 70px;
    font-size: 30px !important;
  }
}
.list {
  height: 515px;
  .item {
    width: 565px; // todo
    height: 110px;
    padding: 0 23px;
    &:nth-child(odd) {
      background: rgba(214, 94, 62, 0.3);
    }
    .avatar {
      width: 80px;
      height: 80px;
      background: #FBE0A7;
      padding: 4px;
    }
    .userInfo{
      margin-left: 11px;
      .username{
        max-width: 270px;
        font-size: 26px;
        color: #FFFFFF;
      }
      .label{
        right: 0;
        top: 50%;
        transform: translate(100%, -50%);
        width: 72px;
        height: 34px;
        &.status_1{
          background: url('@/pages/520/assets/userType1.png') no-repeat left top/100% 100%;
        }
        &.status_2{
          background: url('@/pages/520/assets/userType2.png') no-repeat left top/100% 100%;
        }
        &.status_3{
          background: url('@/pages/520/assets/userType3.png') no-repeat left top/100% 100%;
        }
        &.status_4{
          background: url('@/pages/520/assets/userType4.png') no-repeat left top/100% 100%;
        }
      }
    }
    .checkBtn {
      width: 48px;
      margin-left: auto;
    }
  }
}
.checkedNum {
  margin-top: 19px;
  margin-bottom: 11px;
  font-size: 24px;
  color: #F4441E;
}
.inviteBtn {
  width: 324px;
  height: 76px;
  font-size: 32px !important;
}
.noData {
  font-size: 28px;
  color: #FFFFFF;
  height: 855px;
  padding-top: 350px;
  span:nth-child(2) {
    margin-top: 20px;
  }
}
</style>
