<template>
  <div class="layout-page">
    <div class="theme-banner"></div>
    <div class="layout-tab theme-tab">
      <router-link
        @click.native="$store.commit('user/setTabPoint', '爱心兑换')"
        replace
        to="/rewardRedemption"
        :class="{ 'theme-tab-active': $route.path === '/rewardRedemption' }"
        >爱心兑换</router-link
      >
      <router-link
        @click.native="$store.commit('user/setTabPoint', '充值返利')"
        replace
        to="/depositRebate"
        :class="{
          'theme-tab-active': $route.path === '/depositRebate/returnCourteous',
          'theme-tab-active-2': $route.path === '/depositRebate/getCourteous'
        }"
        >充值返利</router-link
      >
      <router-link
        @click.native="$store.commit('user/setTabPoint', '双人成行')"
        replace
        to="/travelsTwo"
        :class="{ 'theme-tab-active': $route.path === '/travelsTwo' }"
        >双人成行</router-link
      >
      <router-link
        @click.native="$store.commit('user/setTabPoint', '全民爬塔')"
        replace
        to="/climbTower"
        :class="{ 'theme-tab-active': $route.path === '/climbTower' }"
        >全民爬塔</router-link
      >
      <router-link
        @click.native="$store.commit('user/setTabPoint', '神奇扭蛋')"
        replace
        to="/fantasticGacha"
        :class="{ 'theme-tab-active': $route.path === '/fantasticGacha' }"
        >神奇扭蛋</router-link
      >
      <router-link
        @click.native="$store.commit('user/setTabPoint', '技能礼包')"
        replace
        to="/skillPack"
        :class="{ 'theme-tab-active': $route.path === '/skillPack' }"
        >技能礼包</router-link
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
  name: 'layoutPage',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.layout-page {
  // tab栏样式
  .layout-tab {
    margin: 5px 0 9px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 12px;
    justify-content: space-between;
  }
  .theme-banner {
    width: 100%;
    height: 200px;
    background: url('/src/pages/whiteLover/assets/banner.png') no-repeat;
    background-size: 100% 100%;
  }
  .theme-tab {
    a {
      text-decoration: none;
      width: 110px;
      height: 38px;
      font-size: 18px;
      text-align: center;
      font-size: 16px;

      font-weight: 500;
      color: #fff;
      line-height: 38px;
      background: url('/src/pages/whiteLover/assets/tab_2.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 7px;
    }
    // 当前页面tab背景
    .theme-tab-active {
      font-size: 16px !important;
      font-family: PingFang SC !important;
      font-weight: 700 !important;
      color: #7a8aff !important;
      background: url('/src/pages/whiteLover/assets/tab_1.png') no-repeat !important;
      background-size: 100% 100% !important;
    }
    .theme-tab-active-2 {
      font-size: 16px !important;
      font-family: PingFang SC !important;
      font-weight: 500 !important;
      color: #7a8aff !important;
      background: url('/src/pages/whiteLover/assets/tab_1.png') no-repeat !important;
      background-size: 100% 100% !important;
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
