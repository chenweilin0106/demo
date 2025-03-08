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
        <p>{{ tab.tabName_1 }}</p>
        <p>{{ tab.tabName_2 }}</p>
        <!--{{ tab.tabName }}-->
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
import { compareVersions } from '../utils/toApp'
import { mapState } from 'vuex'

export default {
  name: 'layoutPage',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        {
          tabName: '积分兑奖',
          to: '/pointReward',
          tabName_1: '积分',
          tabName_2: '兑奖'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          tabName_1: '充值',
          tabName_2: '有礼'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          tabName_1: '钻石',
          tabName_2: '送礼'
        },
        {
          tabName: '晶石回馈',
          to: '/sparBack',
          tabName_1: '晶石',
          tabName_2: '回馈'
        },
        {
          tabName: '缤彩元宵',
          to: '/sweetDumplings',
          tabName_1: '缤彩',
          tabName_2: '元宵'
        }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version'])
  },
  mounted() {
    // 低版本需手动携带account_id上报
    if (this.appVersion && compareVersions(this.app_version, '5.6.4') === -1) {
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
      if (this.$route.path === to) return
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
    height: 680px;
    background: url('@/pages/lanternFestival/assets/banner.png') no-repeat left
      top/100% 100%;
  }

  // tabs盒子
  .tabs-content {
    position: relative;
    z-index: 10;
    margin-top: -90px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: nowrap;

    .tab-content {
      flex-shrink: 0;
      position: relative;
      display: flex;
      //justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 118px;
      height: 175px;
      font-size: 28px;
      color: #fff;
      font-weight: 600;
      -webkit-text-stroke: 4px rgba(0, 0, 0, 0); // 描边粗细 兼容性良好
      background: #b54423; // 渐变背景色
      -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
      background-clip: text; // 将背景色切割成字体描边 兼容性良好
      padding-top: 48px;
      margin-left: 27px;

      p {
        width: fit-content;
        white-space: nowrap;
      }

      &:nth-of-type(1) {
        margin-left: 0;
      }

      &:nth-child(even) {
        margin-top: -20px;
      }
    }

    .tab-active {
      color: #b23624;
      background: #fffee2; // 渐变背景色
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
    margin-top: 60px;
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
