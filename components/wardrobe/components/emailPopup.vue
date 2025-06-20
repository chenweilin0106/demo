<template>
  <PopupBox title="title_30.png" @clickClose="clickClose">
    <template v-if="list.length">
      <div class="head flex line-height-1 margin-row-center"><div class="head1">好友</div><div class="head2 line-height-100">状态</div></div>
      <div ref="scrollDiv" class="list overscroll-none margin-row-center overflow-x-hidden overflow-y-scroll" @scroll="handleScroll">
        <div v-for="(item, index) in list" :key="`${item.inviter}_${item.username}_${index}`" class="item margin-row-center flex align-center justify-between">
          <img :src="IconPath(item.profile_image)" class="avatar fit-cover radius-50" @click="toUserMain(item.inviter)" @error="imgAtError" />
          <div class="userInfo position-relative flex align-center">
            <div class="username ellipsis line-height-100">{{item.username}}</div>&nbsp;
            <div class="label position-absolute" :class="`status_${item.user_type}`"></div>
          </div>
          <PublicButton :hasRight="item.status == 1 ? 1 : 2" :disabled="[2]" class="join" @click="confirmJoin(item.inviter,index)">{{ item.status == 1 ? '助力' : '已助力' }}</PublicButton>
        </div>
        <div class="noMoreData flex justify-center line-height-1 text-nowrap">没有更多邀请了</div>
      </div>
    </template>
    <div v-else class="noData flex justify-center">暂无邀请</div>
  </PopupBox>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'
import { getPageData } from '@/api/index'

export default {
  name: 'recordsVue',
  data() {
    return {
      configPreJoinPopup: '', // 准备加入的队伍id
      // isShowPreJoinPopup: false,
      list: [
        // { inviter: 1, username: 'usernameusernameusernameusernameusernameusername', profile_image: 'profile_image', status: 1, user_type: 1 }
      ], // 奖品记录数组
      lastPage: 0, // 最后一次请求时的页数
      page: 1, // 页数
      isNextPage: true // 是否有下一页
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async confirmJoin(uid, index) {
      const res = await getPageData({ type: 'magic_closet_invite_help', mark: uid })
      this.$toast(res.errmsg)
      if (res.errno == -2) {
        Object.assign(this, { list: [], lastPage: 0, page: 1, isNextPage: true })
        this.getData()
      }
      // this.isShowPreJoinPopup = false
      if (res.errno) return
      this.$set(this.list[index], 'status', 2)
      this.$nextTick(() => {
        this.$emit('update')
        // this.clickClose()
      })
    },
    getData() {
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getPageData({ type: 'magic_closet_receive_invite', mark: this.page }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            if (res.data.has_mord === false) {
              this.isNextPage = false
            } else {
              this.page++
            }
            this.list = this.list.concat(res.data.list)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    handleScroll() {
      console.log('handleScroll')
      const content = this.$refs.scrollDiv // 获取到包含内容的元素
      if (
        content.clientHeight + content.scrollTop >=
        content.scrollHeight - 100
      ) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getData()
        }
      }
    },
    clickClose() {
      this.$emit('clickClose')
    },
    imgAtError,
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.head {
  width: 571px; // todo
  margin-bottom: 10px;
  font-size: 24px;
  color: #FFFFFF;
  .head1 {
    margin-left: 144px;
  }
  .head2 {
    margin-left: 280px;
  }
}
.list {
  height: 800px;
 .item {
   width: 571px; // todo
   height: 110px;
   padding: 0 9px 0 18px;
   &:nth-child(odd) {
     background: rgba(107, 63, 190, 0.3); // todo
   }
   .avatar {
     width: 80px;
     height: 80px;
     padding: 4px;
     background: #FBE0A7;
   }
    .userInfo{
      margin-left: 11px;
      .username{
        max-width: 230px;
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
   .join {
     margin-left: auto;
     width: 124px;
     height: 64px;
     &.button-finish {
       pointer-events: none;
     }
   }
 }
}
.noMoreData{
  margin-top: 15px;
  font-size: 22px;
  color: #fff;
}
.noData {
  font-size: 28px;
  color: #FFFFFF;
  height: 834px;
  padding-top: 350px;
}
</style>
