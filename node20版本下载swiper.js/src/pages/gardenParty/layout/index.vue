<template>
  <div class="layout">
    <div class="banner"></div>
    <!--tab盒子-->
    <div class="tabs_box position-relative w-100 flex flex-no-wrap">
      <div v-for="(tab, index) in tabsArray" class="tab-item flex align-center justify-center flex-shrink-0" :key="index">
        <span class="flex align-center justify-center">{{ tab.tabName }}</span>
        <div class="click-content position-absolute position-row-center radius-50" @click="track(tab.tabName, tab.to)"></div>
        <!--使用图片替换tab-->
        <img class="tab_img" :src="IconPath(isCurrent(tab.to) ? tab.activeIcon : tab.icon)" />
      </div>
    </div>
    <img :src="IconPath('back_5.png')" class="bgi-0 position-absolute pointer-none" />
    <router-view></router-view>
    <!-- 底部文本 -->
    <div class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { compareVersions } from '@/pages/gardenParty/utils/toApp'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '积分兑奖', to: '/pointReward', icon: 'tab_1_1.png', activeIcon: 'tab_1.png' },
        { tabName: '春日扭蛋', to: '/magicTwist', icon: 'tab_4_1.png', activeIcon: 'tab_4.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', activeIcon: 'tab_2.png' },
        { tabName: '称号返场', to: '/titleBack', icon: 'tab_5_1.png', activeIcon: 'tab_5.png' },
        { tabName: '礼尚往来', to: '/presentGift', icon: 'tab_3_1.png', activeIcon: 'tab_3.png' },
        { tabName: '榜上有名', to: '/rank', icon: 'tab_6_1.png', activeIcon: 'tab_6.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    if (this.appVersion && compareVersions(this.app_version, '5.6.4') === -1) this.$thinking.login(this.uid) // 低版本需手动携带account_id上报
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
  },
  methods: {
    isCurrent(path) {
      return this.$route.fullPath === path
    },
    // 切换模块
    track(module, path) {
      if (this.isCurrent(path)) return
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track('WebClick', { element: module, module })
      if (path) this.$router.replace(path)
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  overflow: hidden;

  .banner {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 603px;
    background: url('@/pages/gardenParty/assets/banner.png') no-repeat left top/100% 100%;
  }

  .tabs_box {
    z-index: 2;
    margin-top: -100px;
    height: 303px;

    .tab-item {
      position: relative;
      width: 189px;
      height: 193px;

      .tab_img {
        width: 100%;
        height: 100%;
      }

      > span {
        position: absolute;
        z-index: 3;
        opacity: 0;
        pointer-events: none;
      }

      .click-content {
        top: 35px;
        z-index: 2;
        width: 120px;
        height: 120px;
      }
      &:nth-child(2) {
        margin-top: 110px;
        margin-left: -65px;
      }
      &:nth-child(3) {
        margin-top: -23px;
        margin-left: -91px;
      }
      &:nth-child(4) {
        margin-top: 123px;
        margin-left: -87px;
      }
      &:nth-child(5) {
        margin-top: -22px;
        margin-left: -102px;
      }
      &:nth-child(6) {
        margin-top: 90px;
        margin-left: -77px;
      }
    }
  }
  .bgi-0 {
    z-index: 1;
    top: 472px;
    right: 0px;
    width: 639px;
    height: 385px;
  }

  // 底部文本
  .BottomText {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 361px;
    height: 68px;

    p {
      font-size: 28px;
      text-align: center;
      color: #ffffff;
      white-space: nowrap;
      line-height: 42px;
    }
  }
}
</style>
