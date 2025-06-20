<template>
  <transition name="moveTopFade" appear>
    <div class="popupOverly position-fixed flex align-end justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popupContent" @touchmove.prevent.stop>
        <div class="paymentWay flex align-center justify-center">
          <div class="wxPayWay flex align-center justify-center line-height-100" :class="{currentPayment:checkedPayment==='wx'}" @click="checkedPayment='wx'"><img :src="IconPath('wechatpay_01.png')" />微信支付</div>
          <div class="aliPayWay flex align-center justify-center line-height-100" :class="{currentPayment:checkedPayment==='alipay'}" @click="checkedPayment='alipay'"><img :src="IconPath('alipay_01.png')" />支付宝支付</div>
        </div>
        <div class="confirmPaymentButton flex align-center justify-center line-height-100" @click="confirmPay">确认支付 ￥{{config.goods_info.price}}</div>
        <div class="rechargeAgreement">
          <p class="flex align-center justify-center line-height-100">
            <img :src="IconPath(isAgreement?'select_01.png':'unselected__01.png')" @click="isAgreement=!isAgreement" />同意&nbsp;<span>充值服务协议</span>
          </p>
          <p class="flex align-center justify-center line-height-100">温馨提示：未成年人请在监护人的陪同或许可</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { isIOS } from '@/utils/toApp'
import { getStorage, setStorage } from '@/utils/tool'

export default {
  name: 'ChoosePayment',
  props: ['config'],
  data() {
    return {
      pageScroll: undefined,
      checkedPayment: 'wx',
      isAgreement: false
    }
  },
  created() {
    this.storageKey = `${this.$store.state.uid}_${process.env.VUE_APP_TITLE}_isAgreement`
    this.isAgreement = Boolean(getStorage(this.storageKey))
  },
  mounted() {
    document.body.appendChild(this.$el)
    if (!this.isIOS()) {
      this.stopScroll()
    }
  },
  beforeDestroy() {
    if (!this.isIOS()) {
      this.autoScroll()
    }
  },
  watch: {
    isAgreement(val) {
      setStorage(this.storageKey, val)
    }
  },
  methods: {
    confirmPay() {
      if (!this.isAgreement) return this.$toast('请同意充值服务协议')
      this.$emit('confirm', this.checkedPayment, this.config)
      this.clickClose()
    },
    isIOS,
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      let scrollTop = window.scrollY
      this.pageScroll = scrollTop
      document.body.style.width = '100%'
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + scrollTop + 'px'
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      document.body.style.position = 'static'
      window.scrollTo(0, this.pageScroll)
    }
  }
}
</script>

<style scoped lang="scss">
.moveTopFade-enter-active,
.moveTopFade-leave-active {
  transition: all 0.3s;
  .popupContent {
    transition: all 0.3s;
  }
}
.moveTopFade-enter,
.moveTopFade-leave-to {
  opacity: 0;
  .popupContent {
    transform: translateY(100%);
  }
}
.popupOverly {
  z-index: 1999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .popupContent {
    width: 100%;
    height: 524px;
    background: #ffffff;
    border-radius: 32px 32px 0 0;
  }
}
.paymentWay {
  padding-top: 64px;
  .wxPayWay,
  .aliPayWay {
    color: #000;
    font-size: 28px;
    width: 328px;
    height: 100px;
    border-radius: 20px;
    border: 2px solid #f0eff6;
    transition: all 0.3s;
    > img {
      margin-right: 16px;
      width: 60px;
    }
  }
  .aliPayWay {
    margin-left: 30px;
  }
  .currentPayment {
    border: 2px solid #876aff;
    background: rgba(135, 106, 255, 0.2);
  }
}
.confirmPaymentButton {
  margin: 72px auto 0;
  width: 686px;
  height: 100px;
  background: rgba(135, 106, 255, 1);
  border-radius: 52px;
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
  transition: all 0.3s;
  &:active {
    opacity: 0.7;
    background: rgb(51, 0, 253);
  }
}
.rechargeAgreement {
  margin-top: 32px;
  font-size: 24px;
  color: #bbb6cc;
  img {
    width: 24px;
    height: auto;
    margin-right: 8px;
  }
  span {
    margin-left: 8px;
    color: #876aff;
  }
  p:nth-child(2) {
    margin-top: 16px;
  }
}
</style>
