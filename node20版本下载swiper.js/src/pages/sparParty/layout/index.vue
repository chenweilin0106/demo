<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="banner-content"></div>
    <!-- tabs盒子 -->
    <div class="tabs-content">
      <div
        v-for="(tab, index) in tabsArray"
        :key="index"
        :class="['tab-content']"
        @click="track(tab)"
      >
        <img :src="IconPath($route.path == tab.to ? tab.iconAct : tab.icon)" />
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
        {
          tabName: '积分兑奖',
          to: '/pointReward',
          icon: 'tab_1.png',
          iconAct: 'tab_1_1.png'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          icon: 'tab_2.png',
          iconAct: 'tab_2_1.png'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          icon: 'tab_3.png',
          iconAct: 'tab_3_1.png'
        },
        {
          tabName: '晶石回馈',
          to: '/sparBack',
          icon: 'tab_4.png',
          iconAct: 'tab_4_1.png'
        }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'appVersion'])
  },
  mounted() {
    // 获取地址栏参数
    this.$store.commit('getAppData', window.location.search.substring(1))
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source })
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
    height: 726px;
    background: url('@/pages/sparParty/assets/banner.png') no-repeat left
      top/100% 100%;
  }

  // tabs盒子
  .tabs-content {
    position: relative;
    margin-top: -101px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-content: center;

    .tab-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 178px;
      height: 81px;
      background: url('@/pages/sparParty/assets/tab_1_1.png') no-repeat left
        top/100% 100%;
      font-size: 28px;
      color: transparent;

      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .tab-active {
      font-weight: 500;
      background: url('@/pages/sparParty/assets/tab_1.png') no-repeat left
        top/100% 100%;
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
