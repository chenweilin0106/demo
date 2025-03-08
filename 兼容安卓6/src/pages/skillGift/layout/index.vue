<template>
  <div class="layout-page">
    <div class="theme-banner"></div>
    <div class="layout-tab theme-tab">
      <router-link
        @click.native="track($event, '积分兑换')"
        replace
        to="/pointReward"
        :class="{ 'theme-tab-active': $route.path === '/pointReward' }"
        ><span>积分兑奖</span></router-link
      >
      <router-link
        @click.native="track($event, '充值返利')"
        replace
        to="/rechargeRebate"
        :class="{
          'theme-tab-active':
            $route.path === '/rechargeRebate/returnCourteous' ||
            $route.path === '/rechargeRebate/getCourteous'
        }"
        ><span>充值返利</span></router-link
      >
      <router-link
        @click.native="track($event, '钻石送礼')"
        replace
        to="/presentGift"
        :class="{
          'theme-tab-active':
            $route.path === '/presentGift/giveRank' ||
            $route.path === '/presentGift/awardRank'
        }"
        ><span>钻石送礼</span></router-link
      >
      <router-link
        @click.native="track($event, '技能礼包')"
        replace
        to="/wulin"
        :class="{ 'theme-tab-active': $route.path === '/wulin' }"
        ><span>技能礼包</span></router-link
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
  methods: {
    // 点击埋点
    track(e, module) {
      this.$sensors.quick('trackAllHeatMap', e.target, {
        module,
        activity_date: '20230421',
        element: '模块选择'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.layout-page {
  // tab栏样式
  .layout-tab {
    width: 100%;
    margin: -35px 0 9px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    box-sizing: border-box;
  }
  .theme-banner {
    width: 100%;
    height: 200px;
    background: url('../assets/banner.png') no-repeat;
    background-size: 100% 100%;
  }
  .theme-tab {
    margin-top: 2px;
    overflow: visible;
    a {
      width: 87px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-weight: 500;
      padding: 2px;
      background: url('../assets/tab_1_1.png') no-repeat;
      background-size: 100%;
      background-position: center center;
      box-sizing: border-box;
      span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
    }
    // 当前页面tab背景
    .theme-tab-active {
      background: url('../assets//tab_1.png') no-repeat;
      background-size: 100%;
      background-position: center center;
    }
  }
  .router-box {
    margin-top: 16px;
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
