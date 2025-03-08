<template>
  <div class="meeting-gift">
    <div class="box-icon" @click="showBubble = !showBubble"></div>
    <div v-show="showBubble" class="rewards-bubble">
      <div
        v-for="(reward, index) in rewardsList"
        :key="index"
        class="reward-item"
      >
        <div class="icon flex-center">
          <img :src="IconPath(reward.icon)" />
        </div>
        <div class="text">
          <span>{{ reward.text }}</span>
        </div>
      </div>
    </div>
    <div class="text">
      <p>欢迎来到蛋蛋世界，我们为您准备</p>
      <p>了一份见面礼，赶快领取吧~</p>
    </div>
    <div class="button"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBubble: false,
      rewardsList: Object.freeze([
        {
          icon: 'yb_120_120.png',
          text: '+8.8万'
        },
        {
          icon: 'ljs_120_120.png',
          text: '+88'
        },
        {
          icon: 'jb_120_120.png',
          text: '+18万'
        }
      ])
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.meeting-gift {
  position: relative;
  height: 567px;
  background: url('@/assets/mk1_5.png') no-repeat left top/100% 100%;
  overflow: hidden;
  margin-bottom: 46px;

  .rewards-bubble {
    position: absolute;
    top: 191px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 398px;
    height: 132px;
    background: rgba(79, 33, 0, 0.6);
    border-radius: 20px;

    .reward-item {
      display: flex;
      flex-direction: column;
      width: 106px;
      height: 106px;
      padding: 4px;
      background-color: #d38232;
      border-radius: 16px;

      .icon {
        width: 100%;
        height: 71px;
        background-color: #fff;
        border-radius: 12px 12px 0 0;

        > img {
          height: 100%;
        }
      }

      .text {
        position: relative;
        width: 100%;
        flex: 1;
        background-color: #824414;
        border-radius: 0 0 12px 12px;

        > span {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 24px;
          transform: translate(-50%, -50%) scale(0.83);
          color: #ffffff;
        }
      }
    }
  }

  .box-icon {
    margin: 77px auto 92px;
    width: 190px;
    height: 172px;
    background: url('@/assets/mk1_4.png') no-repeat left top/100% 100%;
  }

  .text {
    margin: 0 auto;
    width: 419px;
    height: 68px;
    font-size: 28px;
    color: #a94214;
    line-height: 40px;
    white-space: nowrap;
    text-align: center;
  }

  .button {
    margin: 15px auto 0;
    width: 317px;
    height: 116px;
    background: url('@/assets/mk1_6.png') no-repeat left top/100% 100%;
  }
}
</style>
