<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="banner-content"></div>
    <!-- tabs盒子 -->
    <div class="tabs-content">
      <div v-for="(tab, index) in tabsArray" :key="index" :class="['tab-content', { 'tab-active': $route.path == tab.to }]" @click="track(tab)">
        {{ tab.tabName }}
      </div>
    </div>
    <router-view></router-view>
    <!-- 底部文本 -->
    <div class="bottom-text">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layoutPage',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '积分兑奖', to: '/pointReward' },
        { tabName: '充值有礼', to: '/rechargeRebate' },
        { tabName: '钻石送礼', to: '/presentGift' },
        { tabName: '技能礼包', to: '/wuLin' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'appVersion'])
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
    track({ tabName: module, to: path }) {
      if (this.isCurrent(path)) return
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track('WebClick', { element: '模块选择', module })
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;

  // 顶部banner图
  .banner-content {
    width: 100%;
    height: 556px;
    background: url('@/pages/skillGift/assets/banner.png') no-repeat left top/100% 100%;
  }

  // tabs盒子
  .tabs-content {
    position: relative;
    margin-top: -11px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-content: center;

    .tab-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 170px;
      height: 88px;
      background: url('@/pages/skillGift/assets/tab_1_1.png') no-repeat left top/100% 100%;
      font-size: 28px;
      color: #bbfffd;
    }

    .tab-active {
      font-weight: 500;
      color: #ffffff;
      background: url('@/pages/skillGift/assets/tab_1.png') no-repeat left top/100% 100%;
    }
  }

  // 底部文本
  .bottom-text {
    margin-top: 50px;
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
