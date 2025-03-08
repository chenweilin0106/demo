<template>
  <div class="layout">
    <div class="banner"></div>

    <!--tab盒子-->
    <div class="tabs_box flex overflow-x-hidden overflow-y-hidden">
      <div
        v-for="(tab, index) in tabsArray"
        class="tab-item flex-center"
        :key="index"
      >
        <span class="flex-center">{{ tab.tabName }}</span>
        <div
          class="click-content radius-50"
          @click="track(tab.tabName, tab.to)"
        ></div>
        <!-- 使用图片替换tab -->
        <img
          class="tab_img"
          :src="IconPath(isCurrent(tab.to) ? tab.activeIcon : tab.icon)"
        />
      </div>
    </div>

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
import { compareVersions } from '@/pages/whiteValentine/utils/toApp'

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
          icon: 'tab_2_2.png',
          activeIcon: 'tab_2.png'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          icon: 'tab_3_3.png',
          activeIcon: 'tab_3.png'
        },
        {
          tabName: '亲密挑战',
          to: '/intimateChallenge',
          icon: 'tab_4_4.png',
          activeIcon: 'tab_4.png'
        },
        {
          tabName: '爱的祈愿',
          to: '/lovePray',
          icon: 'tab_5_5.png',
          activeIcon: 'tab_5.png'
        },
        {
          tabName: '恋爱翻牌',
          to: '/loveFlop',
          icon: 'tab_6_6.png',
          activeIcon: 'tab_6.png'
        }
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
      if (path) this.$router.replace(path)
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
    height: 605px;
    background: url('@/pages/whiteValentine/assets/banner.png') no-repeat left
      top/100% 100%;
  }

  .tabs_box {
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 225px;
    margin-top: -117px;

    .tab-item {
      position: relative;
      flex-shrink: 0;
      width: 157px;
      height: 134px;
      margin-right: -40px;

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
        position: absolute;
        z-index: 2;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 90px;
      }

      &:nth-child(even) {
        margin-top: 91px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
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
      color: #fff;
      white-space: nowrap;
      line-height: 42px;
    }
  }
}
</style>
