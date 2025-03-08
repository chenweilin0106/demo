<template>
  <div class="layout">
    <div class="banner"></div>
    <!--tab盒子-->
    <div class="tabs_box">
      <div
        v-for="(tab, index) in tabsArray"
        class="theme_tab_item flex_across"
        :key="index"
        @click="track(tab.tabName, tab.to)"
      >
        <span class="flex_across">{{ tab.tabName }}</span>
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
import { mapGetters } from 'vuex'

export default {
  name: 'LayOut',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        {
          tabName: '积分兑奖',
          to: '/pointReward',
          icon: 'tab_1.png',
          activeIcon: 'tab_1_1.png'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          icon: 'tab_2.png',
          activeIcon: 'tab_2_2.png'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          icon: 'tab_3.png',
          activeIcon: 'tab_3_3.png'
        },
        {
          tabName: '疯狂砸蛋',
          to: '/crazyEgg',
          icon: 'tab_4.png',
          activeIcon: 'tab_4_4.png'
        }
      ])
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'app_version', 'access_token'])
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
    isCurrent(path) {
      return this.$route.fullPath === path
    },
    // 切换模块
    track(module, path) {
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
  //padding-bottom: 1000px;

  .banner {
    position: relative;
    width: 100%;
    height: 430px;
    background: url('../assets/banner.png') no-repeat left top/100% 100%;
  }

  .tabs_box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 18px;
    width: 100%;

    .theme_tab_item {
      width: 184px;
      height: 79px;
      .tab_img {
        width: 100%;
        height: 100%;
      }

      > span {
        position: absolute;
        opacity: 0;
      }
    }
  }

  // 底部文本
  .BottomText {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
