<template>
  <OutBox class="giftUpdate" title="mk1_title_4.png">
    <!--长条展示-->
    <div class="list flex-column">
      <div v-for="(item, index) in list" :key="index" class="gift flex position-relative">
        <div class="icon position-relative flex-column align-center">
          <img class="giftIcon block" :src="IconPath(item.icon)" />
          <div class="giftText">{{ item.text }}</div>
        </div>
        <div class="text">
          <div class="desc line-height-100">每日抽100个玩家赠送</div>
          <div class="tip line-height-100">今日充值金额满50元即可报名</div>
        </div>
        <PublicButton :hasRight="1" class="button" @click="register">报名</PublicButton>
        <div class="info position-absolute flex justify-between align-center line-height-100"><i>报名仅限当天有效</i><i>已有0人报名</i></div>
      </div>
    </div>
    <RechargePopup v-if="isShowRechargePopup" @clickClose="isShowRechargePopup = false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
const RechargePopup = () => ('./rechargePopup.vue')
export default {
  name: 'giftUpdate',
  props: [],
  components: { RechargePopup },
  data() {
    return {
      isShowRechargePopup: false,
      list: Object.freeze([{ icon: 'cbt_120_120.png', text: '+10' }])
    }
  },
  methods: {
    async register() {
      if (this.has_right != 1) return
      const res = await getPageData({ type: 'register' })
      if (res.errno == -3) return (this.isShowRechargePopup = true)
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update', res.data)
      // this.has_right = 1 // 更新按钮状态
      // this.num = 1111 // 更新报名人数
    }
  }
}
</script>

<style lang="scss" scoped>
.giftUpdate {
  width: 742px; /*todo 宽度 去看图片原始宽度，不要看蓝湖*/
  height: 402px; /*todo 高度*/
  border-image-slice: 0 0 0 0 fill;
  border-image-width: 0 0 0 0;
  border-image-source: url('@/pages/celebration/assets/mk2_13.png'); /*todo 连续充值有礼背景*/
  padding-top: 92px;
  padding-bottom: 0;
  // 长条展示 2024 celebration
  .tip {
    margin-bottom: 36px;
    font-weight: 500;
    font-size: 28px;
    color: #A94214;
  }
  .list {
    .gift {
      width: 585px;
      height: 141px;
      background: linear-gradient(90deg, #B76AFF, #937CF9, #93AAFF);
      box-shadow: inset 0 0 20px 6px #fff;
      border: 2px solid rgba(255,255,255,0.4);
      border-radius: 0 68px 68px 0;
      -webkit-background-clip: padding-box;
      margin-left: 127px;
      //overflow: hidden;
      .icon {
        margin-top: -17px;
        margin-left: -98px;
        position: relative;
        width: 173px;
        height: 169px;
        //background: linear-gradient(180deg, #FFF3BD, #FFFFFF);
        //border-radius: 50%;
        //border: 4px solid #FFC05C;
        background: url('@/pages/celebration/assets/mk2_12.png') no-repeat left top/100% 100%;
        //overflow: hidden;
        .giftIcon {
          margin: 10px 0 0 14px;
          width: auto;
          height: 120px;
          //height: 135px;
        }
        .giftText {
          margin-top: -7px;
          font-weight: 800;
          font-size: 22px;
          color: #FFFFFF;
        }
      }
      .text {
        //margin-left: 37px - 4;
        //.giftName {
        //  margin-top: 22px;
        //  margin-bottom: 18px - 4;
        //  font-weight: bold;
        //  font-size: 30px;
        //  color: #FFFFFF;
        //  .new {
        //    margin-left: 6px;
        //    width: 56px;
        //    height: 32px;
        //  }
        //}
        .desc {
          margin-top: 30px;
          font-weight: 500;
          font-size: 30px;
          color: #FFFFFF;
        }
        .tip {
          margin-top: 23px;
          font-weight: 500;
          font-size: 24px;
          color: #FFEF85;
        }
      }
      .button {
        margin: 43px 19px 0 auto;
        width: 156px;
        height: 52px;
        font-size: 26px;
      }
      .info {
        left: 36px;
        bottom: -11px;
        transform: translateY(100%);
        width: 522px;
        font-weight: bold;
        font-size: 22px;
        color: #937EFF;
      }
    }
  }
}
</style>
