<template>
  <div>
    <div class="content">
      <div class="soundCoupon">声波自选券<img class="coinIcon" :src="IconPath('sbzxq_120_120.png')" />：{{soundsConfig.soundCouponNum}}</div>
      <div class="bg">
        <div class="soundsListDiv">
          <div class="soundItem" v-for="(item) in soundsConfig.soundsList.slice(0, 7)" :key="item.id">
            <PublicImg :imgName="item.icon"></PublicImg>
            <img class="avatar" :src="IconPath($store.state.user_icon||'mk7_22.png')"/>
            <div :class="['isExchanged', item.is_own?'yes':'no']">&emsp;{{item.name}}</div>
            <div class="exchangedBtn" v-if="!item.is_own" @click="exchangedBtnCk(item)"></div>
          </div>
          <div class="finalSound">
            <PublicImg :imgName="soundsConfig.soundsList[7].icon"></PublicImg>
            <img class="avatar" :src="IconPath($store.state.user_icon||'mk7_22.png')"/>
            <div class="soundName">{{soundsConfig.soundsList[7].name}}</div>
            <div class="tip1">集齐七彩声波可合成</div>
            <div class="tip2">永久声波</div>
          </div>
        </div>
        <div class="craftBtn" v-if="!soundsConfig.isCraft" @click="craftBtnCk"><p>立即合成</p>(已收集七彩声波{{soundsConfig.soundsHavenNum}}/7)</div>
      </div>
      <div class="soundsTips"><span></span>集齐七彩系列永久声波可兑换永久声波神秘星空</div>
    </div>
    <!-- 弹窗 -->
    <PopupBox v-if="isShowPo" :title="typePo === 1?'title_15.png':typePo === 2?'title_12.png':null" @clickClose="clickClose">
      <!-- 兑换二次确认 -->
      <div :class="['main']">
        <div class="popupSound">
          <PublicImg :imgName="configPopup.icon"></PublicImg>
          <img class="avatar" :src="IconPath($store.state.user_icon||'mk7_22.png')"/>
          <div class="soundName">{{configPopup.name}}</div>
        </div>
        <div class="cancel" v-if="typePo === 1" @click="clickClose">取消</div>
        <div class="confirm" v-if="typePo === 1" @click="confirmCk">确认兑换</div>
        <div class="dressUp" v-else-if="typePo === 2" @click="dressUpCk">立即装扮</div>
      </div>
    </PopupBox>
  </div>
</template>

<script>
import { getPageData, nowEquip } from '@/pages/luckyFlop/api/index.js'

export default {
  props: ['soundsConfig'],
  components: {},
  data() {
    return {
      isShowPo: false, // 兑换弹窗
      typePo: 1, // 1:兑换二次确认 2:恭喜获得
      configPopup: {}
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 兑换
     */
    exchangedBtnCk(item) {
      console.log(item)
      if (this.soundsConfig.soundCouponNum == 0) {
        this.$toast('当前没有声波自选券')
      } else {
        this.configPopup = item
        this.isShowPo = true
      }
    },
    /**
     * 立即合成
     */
    craftBtnCk() {
      console.log('立即合成')
      getPageData({ type: 'love_card_wave_merge' }).then((res) => {
        if (res.errno == 0) {
          this.configPopup = this.soundsConfig.soundsList[7]
          this.isShowPo = true
          this.typePo = 2
          this.$emit('getUserInformation')
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 弹窗关闭
     */
    clickClose() {
      this.isShowPo = false
      setTimeout(() => {
        this.typePo = 1
      }, 1000)
    },
    /**
     * 确认兑换
     */
    confirmCk() {
      getPageData({ type: 'love_card_exchange_wave', mark: this.configPopup.id }).then((res) => {
        if (res.errno == 0) {
          this.typePo = 2
          this.$emit('getUserInformation')
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 立即装扮
     */
    dressUpCk() {
      nowEquip({ type: 'voice', id: this.configPopup.id }).then((res) => {
        if (res.errno == 0) {
          console.log('已装扮')
          this.$toast(res.errmsg)
          this.clickClose()
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  position: relative;
  .soundCoupon{
    width: 320px;
    height: 54px;
    background: #6B7FFD;
    border-radius: 24px;
    margin: 0 auto 0 auto;
    font-size: 30px;
    text-align: center;
    // line-height: 48px;
    img{
      vertical-align: middle;
      width: 60px;
      height: 60px;
    }
  }
  .bg{
    width: 680px;
    min-height: 400px;
    // height: 2000px;
    border-image-source: url('@/pages/luckyFlop/assets/mk4_18.png');
    border-image-slice: 300 0 200 0 fill;
    border-image-width: 300px 0 200px 0;
    margin: 30px auto 0 auto;
    padding: 60px 0 20px 0;
  }
  .soundsListDiv{
    width: 670px;
    height: 670px;
    background: url('@/pages/luckyFlop/assets/mk4_18_1.png') no-repeat left top/100% 100%;
    margin: 0 auto 20px auto;
    position: relative;
    .soundItem{
      width: 150px;
      height: 150px;
      position: absolute;
      &:nth-child(1) {
        left: 50%;
        transform: translateX(-50%);
      }
      &:nth-child(2) {
        left: 60px;
        top: 100px;
      }
      &:nth-child(3) {
        right: 60px;
        top: 100px;
      }
      &:nth-child(4) {
        left: 20px;
        top: 300px;
      }
      &:nth-child(5) {
        right: 20px;
        top: 300px;
      }
      &:nth-child(6) {
        left: 130px;
        top: 500px;
      }
      &:nth-child(7) {
        right: 130px;
        top: 500px;
      }
      .avatar{
        width: 120px * 0.8;
        height: 120px * 0.8;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 27px;
      }
      .isExchanged{
        width: 120px;
        height: 32px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 120px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
        &.yes{
          background: url('@/pages/luckyFlop/assets/mk4_19.png') no-repeat left top/100% 100%;
        }
        &.no{
          background: url('@/pages/luckyFlop/assets/mk4_20.png') no-repeat left top/100% 100%;
        }
      }
      .exchangedBtn{
        width: 120px;
        height: 40px;
        background: linear-gradient(180deg, #FFFFFF, #B8F5F9);
        border-radius: 25px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #3D53D6, #BB91FF) 0 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 160px;
        text-align: center;
        &::after{
          content: '兑换';
          font-size: 28px;
          color: #16474A;
          line-height: 40px;
        }
      }
    }
    .finalSound{
      width: 200px;
      height: 200px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 200px;
      .avatar{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 40px;
      }
      .soundName{
        width: 120px;
        height: 32px;
        background: linear-gradient(90deg, #02917E, #82D895);
        border-radius: 16px;
        border: 2px solid #02917E;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 170px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
      }
      .tip1{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 210px;
        font-size: 28px;
        white-space: nowrap;
      }
      .tip2{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 250px;
        font-size: 24px;
        white-space: nowrap;
      }
    }
  }
  .craftBtn{
    width: 402px;
    height: 120px;
    background: url('@/pages/luckyFlop/assets/btn_9.png') no-repeat left top/100% 100%;
    margin: 40px auto 0 auto;
    padding-top: 20px;
    font-size: 24px;
    color: #6359E4;
    text-align: center;
    line-height: 40px;
    p{
      font-weight: 600;
      font-size: 36px;
      color: #6359E4;
    }
  }
  .soundsTips{
    width: 660px;
    height: 60px;
    margin: 30px auto 0 auto;
    font-size: 29px;
    white-space: nowrap;
    line-height: 60px;
    padding-left: 30px;
    position: relative;
    color: #6359E4;
    span {
      position: absolute;
      top: 24px;
      left: 10px;
      width: 12px;
      height: 12px;
      background: #FF78D0;
      border-radius: 50%;
    }
  }
}
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 100%;
  height: 400px;
  // background-color: red;
  text-align: center;
  text-align: -webkit-center;
  color: #fff;
  // overflow-y: scroll;
  .popupSound{
    width: 240px;
    height: 240px;
    position: relative;
    .soundName{
      width: 180px;
      height: 40px;
      background: linear-gradient(90deg, #02917E, #82D895);
      border-radius: 16px;
      border: 2px solid #02917E;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -20px;
      font-size: 32px;
      line-height: 40px;
      text-align: center;
    }
    .avatar{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 60px;
    }
  }
  .cancel {
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #F599FF, #8A6AF3);
    border-radius: 36px;
    border: 2px solid #F9C9FF;
    font-size: 32px;
    color: #fff;
    line-height: 72px;
    position: absolute;
    left: 27%;
    transform: translate(-50%);
    top: 380px;
  }
  .confirm {
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 36px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    font-size: 32px;
    color: #4A50D1;
    line-height: 72px;
    position: absolute;
    left: 73%;
    transform: translate(-50%);
    top: 380px;
  }
  .dressUp{
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 36px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    font-size: 32px;
    color: #4A50D1;
    line-height: 72px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 380px;
  }
}
</style>
