<template>
  <PopupBox :title="'mk8_title_9.png'" @clickClose="clickClose">
    <div class="title"  v-if="list.length !== 0">
      <div>好友</div>
      <div></div>
      <div>状态</div>
    </div>
    <div class="main" ref="scrollDiv" @scroll="handleScroll">
      <div class="listItem" v-for="(item, index) in list" :key="`${item.inviter}+${index}`">
        <img class="userAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.inviter)" />
        <div class="userNameDiv">{{item.username}}</div>
        <div :class="['userBtn', `status${item.status}`]" @click="userBtnCk(item)">{{item.status==1?'助力':item.status==2?'已助力':null}}</div>
      </div>
      <div class="noData" v-if="list.length === 0">暂无好友邀请</div>
      <!-- <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div> -->
    </div>
  </PopupBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { getPageData } from '@/api/index'

export default {
  name: 'receiveInvitePopup',
  props: ['config'],
  components: {},
  data() {
    return {
      avatarDefault: 'avatarDefault.png',
      lastPage: 0, // 最后一次请求时的页数
      page: 1, // 页数
      isNextPage: true, // 是否有下一页
      list: [
        // { inviter: 1, username: '112ahsdj', profile_image: '', status: 1 },
        // { inviter: 2, username: '112ahsdj', profile_image: '', status: 2 },
        // { inviter: 3, username: '112ahsdj', profile_image: '', status: 2 },
        // { inviter: 4, username: '112ahsdj', profile_image: '', status: 2 },
        // { inviter: 5, username: '112ahsdj', profile_image: '', status: 2 },
        // { inviter: 6, username: '112ahsdj', profile_image: '', status: 1 },
        // { inviter: 7, username: '112ahsdj', profile_image: '', status: 1 },
        // { inviter: 8, username: '112ahsdj', profile_image: '', status: 1 }
      ]
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    toUserMain,
    getPageData() {
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getPageData({ type: 'ps_receive_invite', mark: this.page }).then((res) => {
          if (res.errno == 0) {
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
      const content = this.$refs.scrollDiv // 获取到包含内容的元素
      if (
        content.clientHeight + content.scrollTop >=
        content.scrollHeight - 100
      ) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getPageData()
        }
      }
    },
    /**
     * 助力
     */
    userBtnCk(item) {
      if (item.status == 1) {
        getPageData({ type: 'ps_invite_help', mark: item.inviter }).then((res) => {
          if (res.errno == 0) {
            item.status = 2
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.title{
  width: 560px;
  height: 40px;
  display: flex;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  :nth-child(1){
    width: 40%;
  }
  :nth-child(2){
    width: 30%;
  }
  :nth-child(3){
    width: 30%;
  }
}
.main {
  width: 100%;
  height: 760px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 592px;
    height: 110px;
    margin: 0 auto;
    position: relative;
    &:nth-child(odd) {
      background: rgba(102, 51, 219, 0.3);
    }
    .userAvatar{
      width: 72px;
      height: 72px;
      background: #FEFAEF;
      border-radius: 50%;
      border: 4px solid #826CF7;
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
    .userNameDiv{
      max-width: 300px;
      white-space: nowrap; /*超出的空白区域不换行*/
      overflow: hidden; /*超出隐藏*/
      text-overflow: ellipsis; /*文本超出显示省略号*/
      font-weight: 400;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      left: 130px;
      top: 50%;
      transform: translateY(-50%);
    }
    .userBtn{
      width: 120px;
      height: 60px;
      border-radius: 30px;
      border: 2px solid #FFFFFF;
      font-weight: 400;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      &.status1{
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        color: #A9792C;
      }
      &.status2{
        background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
        color: #FFFFFF;
      }
    }
  }
  .noData {
    font-size: 28px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .noMoreData {
    width: 600px;
    height: 60px;
    font-size: 22px;
    color: #fff;
    margin-top: 50px;
  }
}
</style>
