<template>
  <div class="layout-page">
    <div class="theme-banner"></div>
    <div class="layout-tab theme-tab">
      <router-link
        @click.native="track($event, '桃花兑奖')"
        replace
        to="/rewardRedemption"
        :class="{ 'theme-tab-active-1': $route.path === '/rewardRedemption' }"
        >桃花兑奖</router-link
      >
      <router-link
        @click.native="track($event, '充值返利')"
        replace
        to="/depositRebate"
        :class="{
          'theme-tab-active-2':
            $route.path === '/depositRebate/returnCourteous' ||
            $route.path === '/depositRebate/getCourteous',
        }"
        >充值返利</router-link
      >
      <router-link
        @click.native="track($event, '礼尚往来')"
        replace
        to="/giftgoBack"
        :class="{
          'theme-tab-active-3': $route.path === '/giftgoBack',
        }"
        >礼尚往来</router-link
      >
      <router-link
        @click.native="track($event, '春日游园')"
        replace
        to="/springGargen"
        :class="{ 'theme-tab-active-4': $route.path === '/springGargen' }"
        >春日游园</router-link
      >
      <router-link
        @click.native="track($event, '称号返场')"
        replace
        to="/titleBack"
        :class="{ 'theme-tab-active-5': $route.path === '/titleBack' }"
        >称号返场</router-link
      >
      <router-link
        @click.native="track($event, '榜上有名')"
        replace
        to="/nameInList"
        :class="{ 'theme-tab-active-6': $route.path === '/nameInList' }"
        >榜上有名</router-link
      >
    </div>
    <router-view class="router-box"></router-view>
    <div class="end-text-box">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutPage",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    track(e, module) {
      this.$sensors.quick("trackAllHeatMap", e.target, {
        module,
        activity_date: "20230412",
        element: "模块选择",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.layout-page {
  .theme-banner {
    width: 100%;
    height: 225px;
    background: url("/src/pages/gardenParty/assets/banner.png") no-repeat;
    background-size: 100% 100%;
  }

  // tab栏样式
  .layout-tab {
    margin: -35px 0 9px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 11px;
    justify-content: space-between;
  }

  .theme-tab {
    margin-bottom: 15px;
    overflow: visible;

    a {
      width: 113px;
      height: 41px;
      margin-bottom: 5px;
      background: url("../assets/tab_2.png") no-repeat;
      background-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #b28d2b;
    }
    // 当前页面tab背景
    .theme-tab-active-1,
    .theme-tab-active-2,
    .theme-tab-active-3,
    .theme-tab-active-4,
    .theme-tab-active-5,
    .theme-tab-active-6 {
      background: url("../assets/tab_1.png") no-repeat !important;
      background-size: 100% !important;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
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
