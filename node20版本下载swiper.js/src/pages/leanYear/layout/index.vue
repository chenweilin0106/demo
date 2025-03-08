<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="banner-content"></div>
    <!-- tabs盒子 -->
    <div class="tabs-content">
      <div
        v-for="(tab, index) in tabsArray"
        :key="index"
        :class="['tab-content', { 'tab-active': $route.path == tab.to }]"
        @click="track(tab)"
      >
        {{ tab.tabName }}
        <img
          class="tab-icon"
          :src="IconPath($route.path == tab.to ? 'tab_1.png' : 'tab_1_1.png')"
        />
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
    // 低版本需手动携带account_id上报
    if (this.appVersion && this.appVersion < 564) {
      this.$thinking.login(this.uid)
    }
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', {
      referal_source: this.referal_source
    })
  },
  methods: {
    // 切换模块
    track(params) {
      const { tabName: module, to } = params
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          module
        }
      )
      this.$router.replace(to)
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
    height: 557px;
    background: url('@/pages/leanYear/assets/banner.png') no-repeat left
      top/100% 100%;
  }

  // tabs盒子
  .tabs-content {
    position: relative;
    z-index: 10;
    margin-top: -17px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: nowrap;

    .tab-content {
      flex-shrink: 0;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 174px;
      height: 83px;
      font-size: 28px;
      color: #fffaa6;
      -webkit-text-stroke: 2px rgba(0, 0, 0, 0); // 描边粗细 兼容性良好
      background: #cf3421; // 渐变背景色
      -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
      background-clip: text; // 将背景色切割成字体描边 兼容性良好
      padding-top: 6px;
      margin-left: 12px;
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }

    .tab-active {
      font-weight: 500;
      color: #e73d27;
      background: #ffe6b2; // 渐变背景色
      -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
      background-clip: text; // 将背景色切割成字体描边 兼容性良好
    }

    .tab-icon {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
