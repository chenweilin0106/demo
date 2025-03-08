<template>
  <PopupBox :title="'title_22.png'" @clickClose="clickClose">
    <div class="tip1">30分钟内无法向同一人发出重复邀请</div>
    <div class="tip1">好友每天可为你完成助力1次</div>
    <template v-if="isData">
      <div class="searchArea">
        <van-field :class="['callCode_input']" v-model="callCode" @input="onInput" placeholder="输入ID搜索好友" maxlength="9" center/>
        <div class="searchBtn" @click="searchBtnCk">搜索</div>
      </div>
      <div class="friendsArea">
        <div class="friendsShowItem" v-for="(item) in friendsShowList" :key="item.uid">
          <img class="userAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
          <div class="userName">{{item.username}}</div>
          <div :class="['userBtn', friendsChosenList.includes(item.uid)?'yesChoose':'noChoose']" @click="userBtnCk(item)"></div>
        </div>
      </div>
      <div class="tip2">已选择好友（{{friendsChosenList.length}}/5）</div>
      <div class="btn1" @click="sendInviteCk">邀请</div>
    </template>
    <template v-else>
      <div class="noDataArea">
        <span>暂时还没有好友</span>
        <span>&emsp;快去添加好友吧！</span>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { getPageData } from '@/api/index'

export default {
  name: 'sendInvitePopup',
  props: ['config'],
  components: {},
  data() {
    return {
      avatarDefault: 'mk6_23.png',
      isData: false, // 是否有数据
      callCode: undefined,
      friendsShowList: [
        // { uid: 1, username: 'jadajdjd', profile_image: '' },
        // { uid: 2, username: 'jadajdjd', profile_image: '' },
        // { uid: 3, username: 'jadajdjd', profile_image: '' },
        // { uid: 4, username: 'jadajdjd', profile_image: '' },
        // { uid: 5, username: 'jadajdjd', profile_image: '' },
        // { uid: 6, username: 'jadajdjd', profile_image: '' },
        // { uid: 7, username: 'jadajdjd', profile_image: '' }
      ],
      friendsChosenList: []
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
      getPageData({ type: 'with_pray_invite_list' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.friendsShowList = res.data.list
          if (this.friendsShowList.length > 0) {
            this.isData = true
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 召唤码输入回调
     */
    onInput(value) {
      // 使用正则表达式限制只能输入英文和数字
      this.callCode = value.replace(/[^0-9]/g, '')
      // console.log(value)
    },
    /**
     * 搜索
     */
    searchBtnCk() {
      // console.log(this.callCode.length)
      if (this.callCode && this.callCode.length && this.callCode.length > 0) {
        console.log('search')
        getPageData({ type: 'with_pray_search', mark: this.callCode }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.friendsShowList = []
            this.friendsShowList.push(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        console.log('init')
        this.getPageData()
      }
    },
    /**
     * 选择好友
     */
    userBtnCk(item) {
      if (this.friendsChosenList.includes(item.uid)) {
        let temIndex = this.friendsChosenList.indexOf(item.uid)
        if (temIndex > -1) {
            this.friendsChosenList.splice(temIndex, 1)
        }
      } else {
        if (this.friendsChosenList.length < 5) {
          this.friendsChosenList.push(item.uid)
        } else {
          this.$toast('每次最多可选5名好友')
        }
      }
    },
    /**
     * 邀请好友
     */
    sendInviteCk() {
      if (this.friendsChosenList.length > 0) {
        getPageData({ type: 'with_pray_invite', mark: this.friendsChosenList }).then((res) => {
          if (res.errno == 0) {
            this.$toast('邀请成功')
            this.clickClose()
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('请选择邀请的好友')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tip1{
  font-weight: 400;
  font-size: 28px;
  color: #FFFFFF;
  text-align: center;
  line-height: 40px;
}
.searchArea{
  display: flex;
  justify-content: center;
  margin: 10px auto;
  .callCode_input{
    width: 425px;
    height: 74px;
    background: #FEFAEF;
    border-radius: 37px;
    border: 4px solid #A1CFFF;
    ::v-deep .van-field__control {
      color: #7B6AE3;
    }
    ::v-deep .van-field__control::-webkit-input-placeholder {
      // color: red;
    }
  }
  .searchBtn{
    width: 120px;
    height: 66px;
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 33px;
    border: 3px solid #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 30px;
    color: #4D7DDD;
    margin-left: 10px;
  }
}
.friendsArea{
  height: 600px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 20px;
  .friendsShowItem{
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
    .userName{
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
      width: 57px;
      height: 55px;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      &.yesChoose{
        background: url('@/pages/qiXi/assets/tk_39.png') no-repeat left top/100% 100%;
      }
      &.noChoose{
        background: url('@/pages/qiXi/assets/tk_40.png') no-repeat left top/100% 100%;
      }
    }
  }
}
.tip2{
  font-size: 24px;
  color: #FFF587;
  text-align: center;
  line-height: 40px;
}
.btn1{
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  font-weight: 400;
  font-size: 32px;
  color: #A9792C;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.noDataArea{
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span{
    line-height: 40px;
  }
}
</style>
