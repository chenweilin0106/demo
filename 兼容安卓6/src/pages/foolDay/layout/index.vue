<template>
  <div class="layout-page">
    <div class="theme-banner"></div>
    <div class="layout-tab theme-tab">
      <router-link
        @click.native="track($event, '气球兑换')"
        replace
        to="/rewardRedemption"
        :class="{ 'theme-tab-active-1': $route.path === '/rewardRedemption' }"
      ></router-link>
      <router-link
        @click.native="track($event, '充值返利')"
        replace
        to="/depositRebate"
        :class="{
          'theme-tab-active-2':
            $route.path === '/depositRebate/returnCourteous' ||
            $route.path === '/depositRebate/getCourteous'
        }"
      ></router-link>
      <router-link
        @click.native="track($event, '钻石送礼')"
        replace
        to="/diamondGifts"
        :class="{
          'theme-tab-active-3':
            $route.path === '/diamondGifts/giveRank' ||
            $route.path === '/diamondGifts/awardRank'
        }"
      ></router-link>
      <router-link
        @click.native="track($event, '幸运闯关')"
        replace
        to="/luckyEnter"
        :class="{ 'theme-tab-active-4': $route.path === '/luckyEnter' }"
      ></router-link>
      <router-link
        @click.native="track($event, '全民愚乐')"
        replace
        to="/allFool"
        :class="{ 'theme-tab-active-5': $route.path === '/allFool' }"
      ></router-link>
    </div>
    <router-view class="router-box"></router-view>
    <div class="end-text-box">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import '@/pages/foolDay/utils/sensors'
export default {
  name: 'layoutPage',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    track(e, module) {
      this.$sensors.quick('trackAllHeatMap', e.target, {
        module
      })
    }
  }
}
</script>

<style scoped lang="scss">
.layout-page {
  // tab栏样式
  .layout-tab {
    margin: -35px 0 9px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 12px;
    justify-content: space-between;
  }
  .theme-banner {
    width: 100%;
    height: 200px;
    background: url('/src/pages/foolDay/assets/banner.png') no-repeat;
    background-size: 100% 100%;
  }
  .theme-tab {
    margin-bottom: 36px;
    overflow: visible;
    a {
      width: 70px;
      height: 90px;
      margin-bottom: 7px;
    }
    a:nth-child(1) {
      background: url('../assets/tab_1_1.png') no-repeat;
      background-size: 100%;
    }
    a:nth-child(2) {
      background: url('../assets/tab_2_2.png') no-repeat;
      background-size: 100%;
      position: relative;
      top: 20px;
    }
    a:nth-child(3) {
      background: url('../assets/tab_3_3.png') no-repeat;
      background-size: 100%;
    }
    a:nth-child(4) {
      background: url('../assets/tab_4_4.png') no-repeat;
      background-size: 100%;
      position: relative;
      top: 20px;
    }
    a:nth-child(5) {
      background: url('../assets/tab_5_5.png') no-repeat;
      background-size: 100%;
    }
    // 当前页面tab背景
    .theme-tab-active-1 {
      background: url('../assets/tab_1.png') no-repeat !important;
      background-size: 100% !important;
    }
    .theme-tab-active-2 {
      background: url('../assets/tab_2.png') no-repeat !important;
      background-size: 100% !important;
    }
    .theme-tab-active-3 {
      background: url('../assets/tab_3.png') no-repeat !important;
      background-size: 100% !important;
    }
    .theme-tab-active-4 {
      background: url('../assets/tab_4.png') no-repeat !important;
      background-size: 100% !important;
    }
    .theme-tab-active-5 {
      background: url('../assets/tab_5.png') no-repeat !important;
      background-size: 100% !important;
    }
  }
  .router-box {
    padding: 0 8px;
  }
  .end-text-box {
    p {
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
    }
  }
}
</style>
