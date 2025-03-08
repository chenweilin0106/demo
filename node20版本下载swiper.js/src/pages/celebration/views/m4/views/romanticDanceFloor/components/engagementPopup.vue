<template>
  <PopupBox :title="'mk9_title_5.png'" @clickClose="clickClose">
    <!-- <div class="tip1">仅11.15-11.17可参与</div> -->
    <div class="area1">
      <div class="img1"></div>
      <div class="img2">
        <div class="iconDiv">
          <PublicImg :imgName="'hjcbt_120_120.png'" :imgType="'tool'"></PublicImg>
        </div>
      </div>
      <div class="text1">
        <p>舞会正式开幕时提交入场券，折算双倍</p>
        <p>永恒值</p>
        <p>每人仅可购买一张，组队双人均购买累</p>
        <p>计折算2080永恒值</p>
      </div>
      <div :class="['btn', `status${buyStatus}`]" @click="buyBtnCk">
        <template v-if="buyStatus == 1">提交</template>
        <template v-else-if="buyStatus == 2">已提交</template>
        <template v-else-if="buyStatus == 3">未开始</template>
      </div>
    </div>
    <div class="area2">
      <div class="img3"></div>
      <div class="text2">
        <p>舞会正式开幕时，若玩家舞伴与预组队舞伴一致则</p>
        <p>额外获得520永恒值（其中一方玩家领取即可）</p>
      </div>
    </div>
    <div class="area3">
      <div :class="['headDiv', 'leftHead']">
        <img :src="IconPath(pair_info[0].profile_image)" />
        <div class="userNameDiv"><span>{{pair_info[0].username}}</span></div>
      </div>
      <div class="img5"></div>
      <div :class="['headDiv', 'rightHead']">
        <img :class="[pair_status?null:'smallSp']" :src="IconPath(pair_status?pair_info[1].profile_image:'tk_56.png')" />
        <div class="userNameDiv"><span>{{pair_status?pair_info[1].username:'未绑定'}}</span></div>
      </div>
    </div>
    <div :class="['btn2', `status${receiveStatus}`]" @click="receiveBtnCk">
      <template v-if="receiveStatus == 1">领取520永恒值</template>
      <template v-else-if="receiveStatus == 2">已领取</template>
      <template v-else-if="receiveStatus == 3">对方已领取</template>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index'

export default {
  name: 'engagementPopup',
  props: [],
  components: {},
  data() {
    return {
      buyStatus: 1, // 1:提交 2:已提交 3:未开始
      pair_status: false, // 是否已结对
      pair_info: [
        {
          id: '20011',
          username: '我是积13112222111极',
          profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg'
        },
        {
          id: '20013',
          username: '20013',
          profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png'
        }
      ],
      receiveStatus: 1 // 1:未领取 2:已领取 3:对方已领取
    }
  },
  created() {
    // this.getPopupPage()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 获取页面数据
     */
    getPopupPage() {
      getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.buyStatus = res.data.buyStatus
          this.pair_status = res.data.pair_status
          this.receiveStatus = res.data.receiveStatus
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 提交
     */
    buyBtnCk() {
      if (this.buyStatus == 1) {
        console.log('提交')
        getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.getPopupPage()
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 领取永恒值
     */
    receiveBtnCk() {
      if (this.receiveStatus == 1) {
        console.log('领取永恒值')
        getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.getPopupPage()
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    }
    // /**
    //  * 邀请好友
    //  */
    // clickInvite() {
    //   if (!this.pair_status) {
    //     console.log('邀请好友')
    //     this.$emit('openBindFriendPopup')
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
.tip1{
  font-weight: 400;
  font-size: 28px;
  color: #FFFFFF;
  text-align: center;
}
.area1{
  width: 589px;
  height: 312px;
  background: rgba(102, 51, 219, 0.3);
  border-radius: 20px;
  margin: 20px auto 0 auto;
  padding-top: 10px;
  position: relative;
  .img1{
    width: 487px;
    height: 33px;
    background: url('@/pages/celebration/assets/tk_58.png') no-repeat left top/100% 100%;
    margin: 0px auto 10px auto;
  }
  .img2{
    width: 162px;
    height: 158px;
    background: url('@/pages/celebration/assets/tk_54.png') no-repeat left top/100% 100%;
    position: absolute;
    left: 4px;
    top: 60px;
    padding: 21px 16px 21px 22px;
    .iconDiv{
      width: 120px;
      height: 120px;
    }
  }
  .text1{
    position: absolute;
    left: 170px;
    top: 60px;
    p{
      font-weight: 400;
      font-size: 24px;
      color: #FFFFFF;
      line-height: 36px;
    }
  }
  .btn{
    width: 240px;
    height: 60px;
    font-weight: 400;
    font-size: 30px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
    border-radius: 30px;
    border: 2px solid #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    img{
      width: 42px;
      height: 32px;
    }
    &.status1{
      color: #A9792C;
      background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
    }
  }
}
.area2{
  width: 589px;
  height: 153px;
  background: rgba(102, 51, 219, 0.3);
  border-radius: 20px;
  margin: 20px auto 0 auto;
  padding-top: 10px;
  position: relative;
  .img3{
    width: 547px;
    height: 33px;
    background: url('@/pages/celebration/assets/tk_59.png') no-repeat left top/100% 100%;
    margin: 0px auto 20px auto;
  }
  .text2{
    width: 540px;
    font-weight: 400;
    font-size: 24px;
    color: #FFFFFF;
    line-height: 36px;
    margin: 0 auto;
  }
}
.area3{
  width: 100%;
  height: 200px;
  position: relative;
  .headDiv{
    width: 128px;
    height: 128px;
    background: #786CD2;
    border-radius: 50%;
    border: 4px solid #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      &.smallSp{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .userNameDiv{
      width: 212px;
      height: 74px;
      background: url('@/pages/celebration/assets/tk_60.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -80px;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        max-width: 180px;
        font-weight: 500;
        font-size: 25px;
        color: #6E56E7;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .leftHead{
    position: absolute;
    left: 120px;
    top: 20px;
  }
  .rightHead{
    position: absolute;
    right: 120px;
    top: 20px;
  }
  .img5{
    width: 78px;
    height: 69px;
    background: url('@/pages/celebration/assets/tk_55.png') no-repeat left top/100% 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
  }
}
.btn2{
  width: 240px;
  height: 60px;
  font-weight: 400;
  font-size: 30px;
  color: #FFFFFF;
  background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
  border-radius: 30px;
  border: 2px solid #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0 auto;
  img{
    width: 42px;
    height: 32px;
  }
  &.status1{
    color: #A9792C;
    background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  }
}
</style>
