<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="ThemeBanner"></div>
    <!-- tabs盒子 -->
    <div class="ThemeTab">
      <router-link
        class="theme_tab_item flex_across"
        replace
        :to="tab.to"
        v-for="tab in tabsArray"
        :key="tab.to"
        :class="{ theme_tab_active: $route.path == tab.to }"
      >
        <!-- <span class="flex_across">{{ tab.tabName }}</span> -->
        <!-- 使用图片替换tab -->
        <img :src="IconPath(tabBgi(tab))" />
        <div class="zhanwei" @click="track(tab.tabName)"></div>
      </router-link>
    </div>
    <!-- 模块内容盒子 -->
    <div class="TabsContain">
      <router-view></router-view>
    </div>
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
  name: 'layoutPage',
  data() {
    return {
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '红豆兑奖', to: '/pointReward', index: 1 },
        { tabName: '神奇扭蛋', to: '/MagicTwist', index: 4 },
        { tabName: '充值有礼', to: '/rechargeRebate', index: 2 },
        { tabName: '玩趣集市', to: '/FunFair', index: 5 },
        { tabName: '祈福上签', to: '/presentGift', index: 3 },
        { tabName: '榜上有名', to: '/NameInList', index: 6 }
      ]),
      // 当前模块
      tabActive: '红豆兑奖'
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'appVersion']),
    // tab为图片路径，用于动态渲染tab背景
    tabBgi() {
      return (tab) => {
        return `tab_${tab.index}${
          this.tabActive === tab.tabName ? '' : '_1'
        }.png`
      }
    }
  },
  created() {
    // 获取地址栏参数
    this.$store.commit('user/getAppData', window.location.search.substring(1))
    this.tabActive = this.tabsArray.find((item) => {
      return item.to == this.$route.path
    }).tabName
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
    track(module) {
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          module
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;
  width: 100vw;
  overflow-x: hidden;

  // 顶部banner图
  .ThemeBanner {
    width: 100%;
  }

  // tabs盒子
  .ThemeTab {
    position: relative;
    z-index: 100;
    overflow: visible;
    width: 742px;
    height: 234px;
    display: flex;
    // 平均分布
    // flex-wrap: wrap;
    // 上下交错时
    // padding-left: 3px;
    background: url('../assets/back.png') no-repeat center -10px/100% 110%;
    margin-top: -194px !important;
    margin-left: auto !important;
    margin-right: 0 !important;
    margin-bottom: 47px !important;
    .theme_tab_item {
      position: relative;
      // padding-top: 1px;
      .zhanwei {
        width: 66%;
        height: 66%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
      }

      // tab为图片时
      > img {
        position: absolute;
        width: 100%;
      }

      > span {
        position: relative;
        top: 1px;
        z-index: 100;
        width: 100%;
        height: 100%;
        font-size: 14px;
        // opacity: 0;
      }
      // 上下交错时
      &:nth-child(odd) {
        margin: 20px 0px 0px -59px !important;
      }

      // 上下交错时
      &:nth-child(even) {
        margin-left: -53px !important;
        margin-top: 96px !important;
        // margin: 0px -53px 0 !important;
      }
    }
    .theme_tab_item:first-child {
      margin: 20px 0px 0px 0 !important;
    }
  }

  // 模块内容盒子
  .TabsContain {
    padding: 0 8px;
  }
  // 底部文本
  .BottomText {
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
