<template>
  <div>
    <div class="content">
      <div class="soundCoupon">声波自选券<img class="coinIcon" :src="IconPath('sbzxq_120_120.png')" />：{{ soundsConfig.soundCouponNum }}</div>
      <div class="soundsListDiv">
        <div class="soundItem" v-for="item in soundsConfig.soundsList.slice(0, 7)" :key="item.id">
          <PublicJsonSp :jsonName="item.icon" :userAvatar="$store.state.user_icon"></PublicJsonSp>
          <div :class="['isExchanged', item.is_own ? 'yes' : 'no']">&emsp;{{ item.name }}</div>
          <div class="exchangedBtn" v-if="!item.is_own" @click="exchangedBtnCk(item)"></div>
        </div>
        <div class="finalSound">
          <PublicJsonSp :jsonName="soundsConfig.soundsList[7].icon" :userAvatar="$store.state.user_icon"></PublicJsonSp>
          <div class="soundName">{{ soundsConfig.soundsList[7].name }}</div>
          <div class="tip1">集齐七彩声波可合成</div>
          <div class="tip2">永久声波</div>
        </div>
      </div>
      <div class="craftBtn" v-if="!soundsConfig.isCraft" @click="craftBtnCk">
        <p>立即合成</p>
        (已收集七彩声波{{ soundsConfig.soundsHavenNum }}/7)
      </div>
      <div class="soundsTips"><span></span>集齐七彩系列永久声波可兑换永久声波神秘星空</div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
      <div class="popup-content">
        <img class="title-image" v-if="typePo === 1" :src="IconPath('title_16.png')" />
        <img class="title-image" v-else-if="typePo === 2" :src="IconPath('title_12.png')" />
        <!-- 兑换二次确认 -->
        <div :class="['main']">
          <div class="popupSound">
            <PublicJsonSp :jsonName="configPopup.icon" :userAvatar="$store.state.user_icon"></PublicJsonSp>
            <div class="soundName">{{ configPopup.name }}</div>
          </div>
          <div class="cancel" v-if="typePo === 1" @click="clickClose">取消</div>
          <div class="confirm" v-if="typePo === 1" @click="confirmCk">确认兑换</div>
          <div class="dressUp" v-else-if="typePo === 2" @click="dressUpCk">立即装扮</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import PublicJsonSp from '@/pages/qingMing/components/PublicJsonSp.vue'
import { getPageData, nowEquip } from '@/pages/qingMing/api/index.js'

export default {
  props: ['soundsConfig'],
  components: {
    PublicJsonSp
  },
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
.content {
  width: 728px;
  // height: 1120px;
  padding: 60px 0 40px 0;
  position: relative;
  .soundCoupon {
    width: 320px;
    height: 54px;
    background: #02484a;
    border-radius: 24px;
    margin: 0 auto 0 auto;
    font-size: 30px;
    text-align: center;
    // line-height: 48px;
    img {
      vertical-align: middle;
      width: 60px;
      height: 60px;
    }
  }
  .soundsListDiv {
    width: 680px;
    height: 680px;
    background: url('@/pages/qingMing/assets/mk4_18.png') no-repeat;
    background-size: 100% 100%;
    margin: 30px auto 0 auto;
    position: relative;
    .soundItem {
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
      .avatar {
        width: 120px * 0.8;
        height: 120px * 0.8;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 27px;
      }
      .isExchanged {
        width: 120px;
        height: 32px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 120px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
        &.yes {
          background: url('@/pages/qingMing/assets/mk4_19.png') no-repeat;
          background-size: 100% 100%;
        }
        &.no {
          background: url('@/pages/qingMing/assets/mk4_20.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .exchangedBtn {
        width: 120px;
        height: 40px;
        background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
        border-radius: 25px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 160px;
        text-align: center;
        &::after {
          content: '兑换';
          font-size: 28px;
          color: #16474a;
          line-height: 40px;
        }
      }
    }
    .finalSound {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 200px;
      .soundName {
        width: 120px;
        height: 32px;
        background: linear-gradient(90deg, #02917e, #82d895);
        border-radius: 16px;
        border: 2px solid #02917e;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 170px;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
      }
      .tip1 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 210px;
        font-size: 28px;
        white-space: nowrap;
      }
      .tip2 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 250px;
        font-size: 24px;
        white-space: nowrap;
      }
    }
  }
  .craftBtn {
    width: 436px;
    height: 118px;
    background: url('@/pages/qingMing/assets/btn_9.png') no-repeat;
    background-size: 100% 100%;
    margin: 40px auto 0 auto;
    padding-top: 20px;
    font-size: 24px;
    color: #26767b;
    text-align: center;
    line-height: 40px;
    p {
      font-weight: 600;
      font-size: 36px;
      color: #16474a;
    }
  }
  .soundsTips {
    width: 660px;
    height: 60px;
    background: #02484a;
    margin: 30px auto 0 auto;
    font-size: 29px;
    white-space: nowrap;
    line-height: 60px;
    padding-left: 30px;
    position: relative;
    span {
      position: absolute;
      top: 24px;
      left: 10px;
      width: 12px;
      height: 12px;
      background: #fffaa6;
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
.popup-content {
  position: relative;
  width: 628px;
  height: 559px;
  background: url('@/pages/qingMing/assets/tk_bg_1.png') no-repeat;
  background-size: 100% 100%;
  padding: 5px;
  pointer-events: auto;
  .title-image {
    width: 642px;
    height: 130px;
    position: absolute;
    z-index: 3;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main {
    width: 100%;
    height: calc(100% - 80px);
    // background-color: red;
    position: absolute;
    left: 0;
    top: 50px;
    text-align: center;
    text-align: -webkit-center;
    color: #fff;
    // overflow-y: scroll;
    .popupSound {
      width: 240px;
      height: 240px;
      margin-top: 50px;
      position: relative;
      .soundName {
        width: 180px;
        height: 40px;
        background: linear-gradient(90deg, #02917e, #82d895);
        border-radius: 16px;
        border: 2px solid #02917e;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -20px;
        font-size: 32px;
        line-height: 40px;
        text-align: center;
      }
    }
    .cancel {
      width: 240px;
      height: 72px;
      background: linear-gradient(180deg, #0daa92, #13494c);
      border-radius: 36px;
      border: 2px solid #deffb2;
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
      background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
      font-size: 32px;
      color: #16474a;
      line-height: 72px;
      position: absolute;
      left: 73%;
      transform: translate(-50%);
      top: 380px;
    }
    .dressUp {
      width: 240px;
      height: 72px;
      background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
      font-size: 32px;
      color: #16474a;
      line-height: 72px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 380px;
    }
  }
}
</style>
