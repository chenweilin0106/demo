<template>
  <div class="content">
    <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
      <div class="popup-content">
        <img class="title-image" :src="IconPath('title_13.png')" />
        <div :class="['main']">
          <div class="tip1">是否消耗2套卡牌兑换声波自选券？</div>
          <div class="cancel" @click="clickClose">我再想想</div>
          <div class="confirm" @click="confirmCk">确认兑换</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/qingMing/api/index.js'

export default {
  props: [],
  components: {},
  data() {
    return {
      isShowPo: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 弹窗关闭
     */
    clickClose() {
      this.$emit('closePopups')
    },
    /**
     * 确认兑换
     */
    confirmCk() {
      getPageData({ type: 'love_card_exchange', mark: { id: 2, num: 1 } }).then((res) => {
        if (res.errno == 0) {
          this.$toast(res.errmsg)
          this.$emit('getUserInformation')
          this.$emit('closePopups')
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
    height: 409px;
    background: url('@/pages/qingMing/assets/tk_bg_3.png') no-repeat;
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
      .tip1 {
        white-space: nowrap;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 60px;
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
        bottom: 30px;
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
        bottom: 30px;
      }
    }
  }
}
</style>
