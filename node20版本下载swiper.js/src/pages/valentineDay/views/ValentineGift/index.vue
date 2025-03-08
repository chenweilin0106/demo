<template>
  <div class="FreeGift">
    <!--tab-->
    <div class="tab_box">
      <div
        class="valentineGift_pointReward_tab flex-center"
        @click="track('云朵兑奖', '/valentineGift/pointReward')"
      >
        <span
          :class="{
            'active-font': $route.path == '/valentineGift/pointReward'
          }"
          >云朵兑奖</span
        >
        <img
          v-show="$route.path == '/valentineGift/pointReward'"
          :src="IconPath('tab_6.png')"
        />
      </div>
      <div
        class="valentineGift_rechargeRebate_tab flex-center"
        @click="track('充值有礼', '/valentineGift/rechargeRebate')"
      >
        <span
          :class="{
            'active-font': $route.path == '/valentineGift/rechargeRebate'
          }"
          >充值有礼</span
        >
        <img
          v-show="$route.path == '/valentineGift/rechargeRebate'"
          :src="IconPath('tab_6.png')"
        />
      </div>
      <div
        class="valentineGift_consumeGift_tab flex-center"
        @click="track('消费有礼', '/valentineGift/consumeGift')"
      >
        <span
          :class="{
            'active-font': $route.path == '/valentineGift/consumeGift'
          }"
          >礼尚往来</span
        >
        <img
          v-show="$route.path == '/valentineGift/consumeGift'"
          :src="IconPath('tab_6.png')"
        />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'FreeGift',
  data() {
    return {
      classObj: Object.freeze({
        '/yearGift/pointReward': 'tab_1.png',
        '/yearGift/rechargeRebate': 'tab_2.png',
        '/yearGift/consumeGift': 'tab_3.png'
      })
    }
  },
  methods: {
    // 切换模块
    track(element, path) {
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element,
          module: '浪漫回馈'
        }
      )
      if (path !== this.$route.path) {
        this.$router.replace(path)
      }
    }
  },
  computed: {
    currentIcon() {
      return this.classObj[this.$route.path]
    }
  }
}
</script>

<style scoped lang="scss">
.FreeGift {
  position: relative;
  z-index: 5;

  .tab_box {
    margin: -3px auto 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 688px;
    height: 85px;
    background: url('../../assets/tab_7.png') no-repeat left top/100% 100%;
    overflow: hidden;
    font-size: 31px;
    font-weight: 800;
    color: #d5c3ff;

    .valentineGift_pointReward_tab,
    .valentineGift_rechargeRebate_tab,
    .valentineGift_consumeGift_tab {
      position: relative;
      flex: 1;
      height: 100%;
      pointer-events: auto;

      > span {
        position: relative;
        z-index: 2;
      }
      > img {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 269px;
        height: 123px;
        pointer-events: none;
      }
    }

    .active-font {
      font-size: 31px;
      color: #a070ff;
      -webkit-text-stroke: 4px rgba(0, 0, 0, 0); // 描边粗细 兼容性良好
      background: #fff; // 渐变背景色
      -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
      background-clip: text; // 将背景色切割成字体描边 兼容性良好
    }
  }
}
</style>
