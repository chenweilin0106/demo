<template>
  <div class="missed-reward" @click.self="clickClose" @touchmove.prevent.stop>
    <div class="prompt-main missed-reward-main" @touchmove.prevent.stop>
      <img
        :src="IconPath('tk_4.png')"
        class="tk-petal position-absolute pointer-none"
      />

      <img
        :src="IconPath('tk_3.png')"
        class="necklace pointer-none position-absolute"
      />

      <div class="missed-reward-head">
        <!--标题图片-->
        <img class="missed-reward-title" :src="IconPath('title_8.png')" />
      </div>

      <div class="missed-reward-content">
        <div class="missed-reward-text">
          <p>这次没砸中奖励</p>
          <p>不要灰心，再来一次~</p>
        </div>
        <div class="broken-egg">
          <img v-if="eggIcon" :src="IconPath(eggIcon)" />
        </div>
        <div class="button button-receive" @click="clickClose">我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['egg-type'],
  computed: {
    /**
     * 图片判断
     * @param {String} egg-type 贪婪类型 根据类型判断图片
     */
    eggIcon() {
      const obj = {
        7: 'dk_3.png',
        9: 'dk_2.png',
        11: 'dk_1.png'
      }
      return obj[this.eggType]
    }
  },
  created() {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.missed-reward {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .missed-reward-main {
    padding: 19px 20px;
    width: 560px;
    height: 519px;
    position: relative;
    border-image-source: url('@/pages/womenDay/assets/tk_5.png');
    border-image-slice: 92 0 109 0 fill;
    border-image-width: 92px 0 109px 0;

    .tk-petal {
      top: 20%;
      right: -13px;
      width: 78px;
      height: 154px;
    }

    .necklace {
      z-index: 3;
      width: 404px;
      height: 282px;
      left: -1px;
      top: -7px;
    }

    .missed-reward-head {
      .missed-reward-title {
        position: absolute;
        z-index: 3;
        width: 593px;
        height: 176px;
        top: -126px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .missed-reward-content {
      padding-top: 46px;
      height: 100%;
      font-size: 30px;

      .missed-reward-text {
        margin: 0 auto;
        width: 246px;
        font-weight: 500;
        font-size: 26px;
        color: #ffe397;
        white-space: nowrap;
        text-align: center;

        p:nth-child(1) {
          margin-bottom: 10px;
          font-size: 30px;
          color: #ffffff;
        }
      }

      .broken-egg {
        margin: 40px auto 17px;
        width: 172px;
        height: 170px;

        > img {
          width: 100%;
          height: 100%;
        }
      }

      .button {
        margin: 0 auto;
        width: 326px;
        height: 78px;
        border-radius: 39px;
      }
    }
  }
}
</style>
