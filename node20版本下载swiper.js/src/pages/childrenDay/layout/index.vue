<template>
  <div class="layout">
    <div class="banner"></div>
    <div class="tabsList w-100 align-center justify-between flex flex-no-wrap position-absolute">
      <div
        v-for="(tab, index) in tabsArray"
        class="tabItem flex-shrink-0 flex-column align-center position-relative"
        :key="index"
        :class="isCurrent(tab.to) && 'activeTab'"
      >
        <span class="line-height-100 pointer-none">{{ tab.tabName.slice(0, 2) }}</span>
        <span class="line-height-100 pointer-none">{{ tab.tabName.slice(2) }}</span>
        <div class="click-content position-center position-absolute" @click="track(tab.tabName, tab.to)">{{ tab.tabName }}</div>
      </div>
    </div>
    <div class="bg">
      <router-view></router-view>
      <div class="BottomText">
        <span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '糖果兑奖', to: '/pointReward', icon: 'tab_1.png', activeIcon: 'tab_2.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_1.png', activeIcon: 'tab_2.png' },
        { tabName: '钻石送礼', to: '/presentGift', icon: 'tab_1.png', activeIcon: 'tab_2.png' },
        { tabName: '童趣六一', to: '/childInterest', icon: 'tab_1.png', activeIcon: 'tab_2.png' },
        { tabName: '技能礼包', to: '/wuLin', icon: 'tab_1.png', activeIcon: 'tab_2.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
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
.bg {
  background: #cebef8 url('@/pages/childrenDay/assets/bg_1.png') no-repeat left top/100% 100%;
}
.layout {
  z-index: 2;
  position: relative;
  overflow: hidden;

  .banner {
    position: relative;
    width: 100%;
    height: 780px;
    background: url('@/pages/childrenDay/assets/banner.png') no-repeat left top/100% 100%;
    margin: 0 auto -138px auto;
  }

  .tabsList {
    z-index: 1;
    width: 100%;
    height: 123px;
    padding: 0 18px 0 31px;
    top: 498px;
    left: 0;
    .tabItem {
      width: 144px;
      height: 123px;
      padding-top: 26px;
      background: url('@/pages/childrenDay/assets/tab_1.png') no-repeat left top/100% 100%;
      > span {
        font-weight: 600;
        font-size: 28px;
        color: #4cb9f1;
        text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
        &:first-child {
          margin-bottom: 4px;
        }
      }
      .click-content {
        z-index: 2;
        width: 100px;
        height: 100px;
        //background-color: #fff;
        color: transparent;
      }
      // 前4个
      &:nth-child(-n + 4) {
        margin-right: -5px;
      }
      &:nth-child(even) {
        margin-top: -60px;
      }
    }
    .activeTab {
      background: url('@/pages/childrenDay/assets/tab_2.png') no-repeat left top/100% 100%;
      > span {
        color: #d57ca6;
        text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
      }
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
