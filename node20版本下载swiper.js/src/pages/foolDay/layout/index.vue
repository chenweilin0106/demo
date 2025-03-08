<template>
  <div class="layout">
    <div class="banner"></div>

    <!--tab盒子-->
    <div class="tabs_box w-100 flex align-center justify-center flex-no-wrap">
      <div v-for="(tab, index) in tabsArray" class="tab-item flex align-center justify-center flex-shrink-0" :key="index">
        <span class="flex align-center justify-center">{{ tab.tabName }}</span>
        <div class="click-content position-absolute position-row-center" @click="track(tab.tabName, tab.to)"></div>
        <!-- 使用图片替换tab -->
        <img class="tab_img" :src="IconPath(isCurrent(tab.to) ? tab.activeIcon : tab.icon)" />
      </div>
    </div>

    <div :class="['bgi-1 position-row-center', `bgi-1_${$route.path}`]"></div>
    <img :src="IconPath('back_1.png')" class="bgi-0 position-absolute pointer-none" />
    <div :class="['bgi-2 position-row-center', `bgi-2_${$route.path}`]"></div>
    <div :class="['bgi-3 position-row-center', `bgi-3_${$route.path}`]"></div>

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
import { compareVersions } from '@/pages/foolDay/utils/toApp'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        {
          tabName: '积分兑奖',
          to: '/pointReward',
          icon: 'tab_1_1.png',
          activeIcon: 'tab_1.png'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          icon: 'tab_2_1.png',
          activeIcon: 'tab_2.png'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          icon: 'tab_3_1.png',
          activeIcon: 'tab_3.png'
        },
        {
          tabName: '晶石回馈',
          to: '/sparBack',
          icon: 'tab_4_1.png',
          activeIcon: 'tab_4.png'
        },
        {
          tabName: '全民愚乐',
          to: '/allFool',
          icon: 'tab_5_1.png',
          activeIcon: 'tab_5.png'
        }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
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
    isCurrent(path) {
      return this.$route.fullPath === path
    },
    // 切换模块
    track(module, path) {
      if (this.isCurrent(path)) return
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: module,
          module
        }
      )
      if (path) {
        this.$router.replace(path)
      }
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
    height: 699px;
    background: url('@/pages/foolDay/assets/banner.png') no-repeat left top/100% 100%;
  }

  .tabs_box {
    margin-top: -193px;
    height: 274px;

    .tab-item {
      position: relative;
      width: 158px;
      height: 274px;
      margin-right: -19px;

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
        top: 10px;
        z-index: 2;
        width: 135px;
        height: 170px;
      }

      &:nth-child(even) {
        margin-top: 170px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .bgi-0 {
    top: 566px;
    right: 15px;
    width: 663px;
    height: 294px;
  }
  .bgi-1 {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    top: 580px;
    width: 748px;
    height: 425px;
    background: url('@/pages/foolDay/assets/back_4.png') no-repeat left top/100% 100%;
  }

  .bgi-2 {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    width: 748px;
    height: 425px;
    background: url('@/pages/foolDay/assets/back_4.png') no-repeat left top/100% 100%;
  }

  .bgi-3 {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    bottom: 0;
    width: 748px;
    height: 421px;
    background: url('@/pages/foolDay/assets/back_4.png') no-repeat left top/100% 100%;
  }

  .bgi-2_\/pointReward {
    top: 1766px;
  }

  .bgi-2_\/rechargeRebate {
    top: 1582px;
  }

  .bgi-2_\/presentGift {
    top: 2219px;
  }

  .bgi-2_\/sparBack {
    display: none;
  }

  .bgi-2_\/allFool {
    top: 1634px;
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
      color: #eac27c;
      white-space: nowrap;
      line-height: 42px;
    }
  }
}
</style>
