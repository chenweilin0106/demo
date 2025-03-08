<template>
  <div class="layout">
    <div class="banner"></div>
    <div class="tabsList w-100 align-center justify-between flex flex-wrap">
      <div
        v-for="(tab, index) in tabsArray"
        class="tabItem flex-shrink-0 flex align-center justify-center position-relative"
        :key="index"
        :class="isCurrent(tab.to) && 'activeTab'"
        @click="track(tab.tabName, tab.to)"
      >
        {{ tab.tabName }}
      </div>
    </div>
    <router-view></router-view>
    <!-- 底部文本 -->
    <div class="BottomText">
      <span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { compareVersions } from '@/pages/mayDay2024/utils/toApp'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '印章兑奖', to: '/pointReward', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '钻石送礼', to: '/presentGift', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '群岛环游', to: '/archipelagicTour', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '轮渡竞赛', to: '/ferryRace', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '晶石回馈', to: '/sparBack', icon: 'tab_2.png', activeIcon: 'tab_1.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
    // 低版本需手动携带account_id上报
    if (this.appVersion && compareVersions(this.app_version, '5.6.4') === -1) {
      this.$thinking.login(this.uid)
    }
    this.$store.commit('getAppData', window.location.search.substring(1))
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source })
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
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  z-index: 2;
  position: relative;
  overflow: hidden;

  .banner {
    position: relative;
    width: 100%;
    height: 740px;
    background: url('@/pages/mayDay2024/assets/banner.png') no-repeat left top/100% 100%;
  }

  .tabsList {
    z-index: 1;
    padding: 0 22px;
    margin-top: -86px;
    .tabItem {
      width: 228px;
      height: 88px;
      background: url('@/pages/mayDay2024/assets/tab_2.png') no-repeat left top/100% 100%;
      font-weight: 600;
      font-size: 32px;
      color: #ffffff;
      text-shadow: 1px 0 #0592e8, -1px 0 #0592e8, 0 1px #0592e8, 0 -1px #0592e8, 1px 1px #0592e8, -1px -1px #0592e8, 1px -1px #0592e8,
        -1px 1px #0592e8;
      .click-content {
        z-index: 2;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 50px;
      }
      // 前三个
      &:nth-child(-n + 3) {
        margin-bottom: 14px;
      }
    }
    .activeTab {
      color: #4277ff;
      text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
      background: url('@/pages/mayDay2024/assets/tab_1.png') no-repeat left top/100% 100%;
    }
  }

  // 底部文本
  .BottomText {
    width: 100%;
    height: 170px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 28px;
      text-align: center;
      color: #fff;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
