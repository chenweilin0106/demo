<template>
  <PopupBox title="mk8_title_8.png" @clickClose="clickClose">
    <p class="flex justify-center line-height-100">选择好友加入队伍</p>
    <template v-if="hasData">
      <div class="searchInput flex align-center justify-center">
        <input v-model="uid" class="text-center line-height-100 text-nowrap" placeholder="输入ID搜索好友" maxlength="8" @keydown="handleKeyDown" @input="inputUid" />
        <PublicButton class="search" hasRight="0" @click="search">搜索</PublicButton>
      </div>
      <div class="list overscroll-none margin-row-center overflow-x-hidden overflow-y-scroll">
        <div v-for="item in 20" :key="item" class="item flex align-center justify-between">
          <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar fit-cover radius-50" @click="toUserMain(item.uid)" @error="imgAtError" />
          <div class="username ellipsis line-height-100 flex-1">昵称昵称昵称八字</div>
          <img :src="IconPath(checkedList.includes(item) ? 'tk_41.png' : 'tk_42.png')" class="checkBtn" @click="check(item)" />
        </div>
      </div>
      <div class="checkedNum flex justify-center line-height-100">已选择好友（{{ checkedList.length }}/{{ maxChecked }}）</div>
      <PublicButton class="inviteBtn margin-row-center" hasRight="1" @click="invite">邀请</PublicButton>
    </template>
    <div v-else class="noData flex-column line-height-100 justify-center align-center"><span>暂无好友</span><span>快去添加好友吧！</span>
    </div>
  </PopupBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
export default {
  data() {
    return {
      uid: '',
      hasData: false,
      maxChecked: 4,
      checkedList: [],
      list: []
    }
  },
  methods: {
    async invite() {
      // if (!this.checkedList.length) return this.$toast('请选择邀请的好友')
      // const res = await inviteFriends(this.checkedList)
      // this.$toast(res.errmsg)
      // if (res.errno) return
      // this.$emit('clickClose')
    },
    async search() {
      // if (!(this.uid?.length)) return
      // const res = await getFriendsList(this.uid)
      // if (res.errno) return this.$toast(res.errmsg)
      // this.list = res.data.list
    },
    check(uid) {
      const flag = this.checkedList.includes(uid)
      if (flag) {
        this.checkedList = this.checkedList.filter(item => item != uid)
      } else {
        if (this.checkedList.length >= this.maxChecked) return this.$toast(`最多选择${this.maxChecked}位好友`)
        this.checkedList.push(uid)
      }
    },
    inputUid(e) {
      this.uid = this.uid.replace(/[^0-9]/g, '') // 只能输入数字
      this.uid = this.uid.replace(/\s+/g, '') // 删除空格
      this.uid = this.uid.replace(/[\r\n]/g, '') // 删除回车换行符
    },
    handleKeyDown(e) {
      if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
    },
    clickClose() {
      this.$emit('clickClose')
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 583 + 278 - 274;
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
      border: 4px solid #DBC1FF;
      font-weight: 500;
      font-size: 30px;
      color: #7B6AE3;
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
    }
  }
  .list {
    width: 597px;
    height: 330px + 220 - 15;
    .item {
      width: 597px;
      height: 110px;
      padding: 0 40px;
      &:nth-child(odd) {
        background: rgba(102, 51, 219, 0.3);
      }
      .avatar {
        width: 80px;
        height: 80px;
        background: #FEFAEF;
        border: 4px solid #DBC1FF;
      }
      .username {
        margin-left: 11px;
        font-size: 26px;
        color: #FFFFFF;
      }
      .checkBtn {
        width: 48px;
        margin-left: 11px;
      }
    }
  }
  .checkedNum {
    margin-top: 19px;
    margin-bottom: 11px;
    font-size: 24px;
    color: #FFF587;
  }
  .inviteBtn {
    width: 324px;
    height: 76px;
  }
  .noData {
    margin-top: 309px;
    font-size: 28px;
    color: #FFFFFF;
    span:nth-child(2) {
      margin-top: 20px;
    }
  }
}
</style>
