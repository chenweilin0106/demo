<template>
  <div class="layout-page">
    <div class="theme-banner"></div>
    <div class="layout-tab theme-tab">
      <router-link
        @click.native="track($event, '青团兑换')"
        replace
        to="/rewardRedemption"
        :class="{ 'theme-tab-active': $route.path === '/rewardRedemption' }"
        ><span>青团兑奖</span></router-link
      >
      <router-link
        @click.native="track($event, '充值返利')"
        replace
        to="/depositRebate"
        :class="{
          'theme-tab-active':
            $route.path === '/depositRebate/returnCourteous' ||
            $route.path === '/depositRebate/getCourteous'
        }"
        ><span>充值返利</span></router-link
      >
      <router-link
        @click.native="track($event, '钻石送礼')"
        replace
        to="/diamondGifts"
        :class="{
          'theme-tab-active':
            $route.path === '/diamondGifts/giveRank' ||
            $route.path === '/diamondGifts/awardRank'
        }"
        ><span>钻石送礼</span></router-link
      >
      <router-link
        @click.native="track($event, '砸金蛋')"
        replace
        to="/goldenEggs"
        :class="{ 'theme-tab-active': $route.path === '/goldenEggs' }"
        ><span>砸金蛋</span></router-link
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
        activity_date: '20230405',
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
    margin-bottom: 16px;
    overflow: visible;
    a {
      width: 87px;
      height: 38px;
      border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-weight: 500;
      padding: 2px;
      background-color: transparent;
      box-sizing: border-box;
      span {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #7299db, #95c5f3);
        border: 1px solid #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
    }
    // 当前页面tab背景
    .theme-tab-active {
      color: #2483af !important;
      border: 2px solid #fff !important;
      padding: 1px !important;
      span {
        border: none !important;
        background: linear-gradient(0deg, #fff9d1, #ffffff) !important;
      }
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
