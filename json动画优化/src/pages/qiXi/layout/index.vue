<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="ThemeBanner" data-html2canvas-ignore></div>
    <!-- tabs盒子 -->
    <div class="ThemeTab" data-html2canvas-ignore>
      <router-link
        class="theme_tab_item flex_across"
        replace
        :to="tab.to"
        v-for="tab in tabsArray"
        :key="tab.to"
        :class="{ theme_tab_active: tabActive == tab.tabName }"
        @click.native="track(tab.tabName)"
      >
        <span>{{ tab.tabName }}</span>
        <!-- 使用图片替换tab -->
        <img :src="IconPath(tabBgi(tab))" />
      </router-link>
    </div>
    <!-- 模块内容盒子 -->
    <div class="TabsContain">
      <router-view></router-view>
    </div>
    <!-- 特殊需求:中间背景图 -->
    <div
      class="middle_back"
      :class="tabBack[tabActive]"
      data-html2canvas-ignore
    ></div>
    <!-- 底部文本 -->
    <div class="BottomText" data-html2canvas-ignore>
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
        { tabName: '情蝶兑奖', to: '/pointReward', index: 1 },
        { tabName: '充值有礼', to: '/rechargeRebate', index: 2 },
        { tabName: '消费有礼', to: '/spendingGift', index: 3 },
        { tabName: '以纸传情', to: '/loveName', index: 4 },
        { tabName: '每日运势', to: '/dailyFortune', index: 5 },
        { tabName: '七夕冲榜', to: '/qiXiRank', index: 6 }
      ]),
      // 当前模块
      tabActive: '情蝶兑奖',
      // 模块对应的背景图
      tabBack: Object.freeze({
        情蝶兑奖: 'lantern_1',
        充值有礼: 'lantern_2',
        消费有礼: 'lantern_3',
        以纸传情: 'lantern_4',
        每日运势: 'lantern_5',
        七夕冲榜: 'lantern_6'
      })
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

  // 顶部banner图
  .ThemeBanner {
    width: 100%;
  }

  // tabs盒子
  .ThemeTab {
    position: relative;
    overflow: visible;
    width: 100%;
    display: flex;
    // 平均分布
    // justify-content: space-between;
    // flex-wrap: wrap;
    // 上下交错时
    padding-left: 3px;
    background: url('../assets/back_1.png') no-repeat center -10px/100% 110%;

    .theme_tab_item {
      position: relative;
      padding-top: 1px;
      font-size: 16px;

      // tab为图片时
      > img {
        position: absolute;
        width: 100%;
      }

      > span {
        position: relative;
        z-index: 100;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      // 上下交错时
      &:nth-child(odd) {
        margin: -42px 0px 0 !important;
      }

      // 上下交错时
      &:nth-child(even) {
        margin: 0px -15px 0 !important;
      }
    }
  }

  // 模块内容盒子
  // .TabsContain {
  //   // margin-top: -36px;
  //   padding: 0 8px;
  // }
  // 中间背景图
  .middle_back {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 391.5px;
    background: url('../assets/back_2.png') no-repeat center top/100% auto;
  }

  .lantern_1 {
    top: 930px;
  }

  .lantern_2 {
    top: 861px;
  }

  .lantern_3 {
    top: 736px;
  }

  .lantern_4 {
    top: 1259px;
  }

  .lantern_5 {
    top: 435px;
  }

  .lantern_6 {
    top: 489px;
  }

  // 底部文本
  .BottomText {
    font-size: 14px;

    p {
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
    }
  }
}
</style>
