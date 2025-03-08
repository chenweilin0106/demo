<template>
  <div class="please-select" @click.self="clickClose">
    <div class="propmt-main please-select-main">
      <div class="please-select-head">
        <!--标题图片-->
        <img class="please-select-title" :src="IconPath('title_6.png')" />
      </div>

      <div class="please-select-content">
        <div class="please-select-inner">
          <div class="select-title">炫彩蛋大奖</div>
          <div class="select-list">
            <div v-for="item in 2" :key="item" class="select-item">
              <div v-if="true" class="light-box"></div>
              <div class="label">
                <span>价值1314</span><img :src="IconPath('mk4_15.png')" />
              </div>
              <img class="select-icon" :src="IconPath('yb_120_120.png')" />
              <div class="reward-text-1">
                <p>10%元宝奖池</p>
                <p v-if="false">+50万元宝</p>
              </div>
              <div class="reward-type">
                <img v-if="true" :src="IconPath('text_1.png')" />
                <img v-else :src="IconPath('text_2.png')" />
              </div>
              <div class="reward-text-2">
                80%获得奖池中10%元宝+50万元宝,20%一无所获
              </div>
              <div v-if="true" class="confirm-button"></div>
            </div>
          </div>
          <div v-if="true" class="please-select-foot-text">
            注：瓜分奖励的数量以系统实时数据为准
          </div>
        </div>
      </div>

      <div class="please-select-foot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.please-select {
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

  .please-select-main {
    width: 653px;
    height: fit-content;
    position: relative;
    .please-select-head {
      position: relative;
      width: 100%;
      height: 137px;
      background: url('@/pages/crazyEgg/assets/tk_bg_1.png') no-repeat left
        top/100% 100%;
      .please-select-title {
        width: 537px;
        height: 124px;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .please-select-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 515px;
      background: url('@/pages/crazyEgg/assets/tk_bg_2.png') no-repeat left
        top/100% 100%;
      font-size: 30px;
      //overflow: hidden;
    }

    .please-select-foot {
      width: 100%;
      height: 66px;
      background: url('@/pages/crazyEgg/assets/tk_bg_3.png') no-repeat left
        top/100% 100%;
    }
  }

  .please-select-inner {
    position: absolute;
    top: -35px;
    left: 0;
    width: 100%;

    .select-title {
      margin: 0 auto 30px;
      font-size: 32px;
      width: fit-content;
      font-weight: 500;
      color: #ffe397;
    }

    .select-list {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      //margin-left: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #f2d58d;
      padding: 0 30px;

      .select-item {
        position: relative;
        width: 250px;
        height: 430px;
        background: url('@/pages/crazyEgg/assets/bg_11.png') no-repeat left
          top/100% 100%;
        .label {
          position: absolute;
          top: 12px;
          right: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 126px;
          height: 35px;
          background: #46ac96;
          border-radius: 18px;
          white-space: nowrap;
          span {
            margin-left: -7px;
            font-size: 24px;
            font-weight: 500;
            color: #ffffff;
            transform: scale(0.83);
            white-space: nowrap;
          }
          > img {
            margin-left: -7px;
            width: 27px;
            height: 20px;
          }
        }
        .light-box {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 284px;
          height: 464px;
          background: url('@/pages/crazyEgg/assets/bg_4.png') no-repeat left
            top/100% 100%;
        }
        .select-icon {
          display: block;
          margin: 30px auto 25px;
          width: 134px;
          height: auto;
        }
        .reward-text-1 {
          margin: 0 auto 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          width: fit-content;
          height: 65px;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          p:nth-of-type(2) {
            color: #66ffcc;
          }
        }
        .reward-type {
          margin: 0 auto;
          width: 116px;
          height: 29px;
          > img {
            width: 100%;
          }
        }
        .reward-text-2 {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px auto 0;
          text-align: center;
          line-height: 30px;
          width: 238px;
          height: 100px;
          //background-color: #fff;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
        }
        .confirm-button {
          position: absolute;
          bottom: -27px;
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          height: 54px;
          background: url('@/pages/crazyEgg/assets/btn_sure.png') no-repeat left
            top/100% auto;
        }
      }
    }
    .please-select-foot-text {
      width: fit-content;
      margin-top: 50px;
      margin-left: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #f2d58d;
    }
  }
}
</style>
