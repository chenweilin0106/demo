<template>
  <div class="layout">
    <div class="banner"></div>

    <!--tab盒子-->
    <div class="tabs_box w-100 align-center justify-center flex overflow-x-hidden overflow-y-hidden">
      <div v-for="(tab, index) in tabsArray" class="tab-item flex align-center justify-center position-relative" :key="index">
        <span class="position-absolute position-row-center line-height-100 text-nowrap" :class="isCurrent(tab.to)?'active-tab':'unactive-tab'">
          {{ tab.tabName }}
        </span>
        <div class="click-content position-absolute" @click="track(tab.tabName, tab.to)"></div>
        <!--使用图片替换tab-->
        <img class="tab_img" :src="IconPath(isCurrent(tab.to) ? tab.activeIcon : tab.icon)" />
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
import { compareVersions } from '@/pages/luckyFlop/utils/toApp'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '积分兑奖', to: '/pointReward', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/depositRebate', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '钻石送礼', to: '/diamondGift', icon: 'tab_2.png', activeIcon: 'tab_1.png' },
        { tabName: '幸运翻牌', to: '/luckyFlop', icon: 'tab_2.png', activeIcon: 'tab_1.png' }
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
    height: 620px;
    background: url('@/pages/luckyFlop/assets/banner.png') no-repeat left top/100% 100%;
  }

  .tabs_box {
    height: 115px;
    margin-top: -70px;

    .tab-item {
      width: 178px;
      height: 105px;
      .tab_img {
        width: 100%;
        height: 100%;
      }

      > span {
        z-index: 3;
        pointer-events: none;
        font-weight: bold;
        font-size: 28px;
        line-height: 105px;
      }

      .click-content {
        z-index: 2;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 50px;
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
