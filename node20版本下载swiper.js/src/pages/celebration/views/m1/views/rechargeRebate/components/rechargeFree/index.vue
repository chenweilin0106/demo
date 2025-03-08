<template>
  <OutBox class="rechargeFree" title="mk1_title_3.png">
    <div class="countDown flex-column  align-center position-absolute">
      <van-count-down :time="24 * 60 * 60 * 1000" format="mm:ss" @finish="countDownFinish" />
      本轮抽奖倒计时
    </div>
    <div class="tip1 line-height-100 flex align-center">每轮随机抽取7笔订单赠送等额充值钻石&nbsp;<img :src="IconPath('mk2_2.png')" class="rule" @click="isShowRulePopup = true" /></div>
    <div class="tip2 line-height-100">首轮360分钟，随后每轮480分钟，当前第<i>1</i>轮</div>
    <div class="list margin-row-center position-relative">
      <img :src="IconPath('mk2_10.png')" class="freeUser position-absolute" @click="isShowWinningPopup = true" />
      <div class="users flex flex-wrap align-center justify-center">
        <div v-for="item in 7" :key="item" class="userInfo flex-shrink-0 flex-column align-center">
          <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar" @error="imgAtError" @click="toUserMain(item)" />
          <div class="numBox flex align-center justify-center line-height-100"><i class="num ellipsis">123</i><img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
        </div>
      </div>
    </div>
    <RulePopup v-if="isShowRulePopup" @clickClose="isShowRulePopup = false" />
    <WinningPopup v-if="isShowWinningPopup" @clickClose="isShowWinningPopup = false" />
  </OutBox>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'
const RulePopup = () => import('./popups/rulePopup.vue')
const WinningPopup = () => import('./popups/winningPopup.vue')
export default {
  name: 'rechargeFree',
  props: [''],
  components: { RulePopup, WinningPopup },
  data() {
    return {
      isShowWinningPopup: false,
      isShowRulePopup: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    countDownFinish() {
      this.$emit('update')
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style lang="scss" scoped>
.rechargeFree {
  .countDown {
    padding-top: 29px;
    top: -30px;
    right: 5px;
    width: 215px;
    height: 120px;
    background: url('@/pages/celebration/assets/mk2_8.png') no-repeat left top/100% 100%;
    font-weight: bold;
    font-size: 22px;
    color: #9360FC;
    line-height: 100%;
    ::v-deep .van-count-down {
      font-weight: bold;
      font-size: 26px;
      color: #F552AE;
      line-height: 100%;
    }
  }
  .tip1 {
    padding-left: 75px;
    font-weight: bold;
    font-size: 28px;
    color: #6E56E7;
    .rule {
      width: 39px;
      height: 39px;
    }
  }
  .tip2 {
    margin-top: 11px;
    margin-bottom: 22px;
    padding-left: 75px;
    font-weight: 500;
    font-size: 26px;
    color: #6E56E7;
    i {
      color: #F552AE;
    }
  }
  .list {
    margin-left: 51px;
    width: 644px;
    height: 445px;
    background: url('@/pages/celebration/assets/mk2_11.png') no-repeat left top/100% 100%;
    .freeUser {
      width: 158px;
      height: 48px;
      top: 396px;
      right: 1px;
    }
    .users {
      height: 100%;
      padding-top: 73px;
      align-content: start;
      .userInfo {
        margin: 0 13px 14px;
        .avatar {
          width: 108px;
          height: 108px;
          background: #FFFFFF;
          border-radius: 50%;
          border: 4px solid #B09EFF;
        }
        .numBox {
          width: 128px;
          height: 34px;
          font-weight: bold;
          font-size: 22px;
          color: #7B53FF;
          padding: 0 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 17px;
          margin-top: 6px;
          .num {
            max-width: 78px;
          }
          .diamond {
            width: 29px;
            height: auto;
          }
        }
      }
    }
  }
}
</style>
