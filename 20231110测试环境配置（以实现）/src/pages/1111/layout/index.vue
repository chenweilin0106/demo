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
        @click.native="track(tab.tabName)"
      >
        <span class="flex_across">{{ tab.tabName }}</span>
        <!-- 使用图片替换tab -->
        <img v-if="$route.path == tab.to" :src="IconPath(tab.icon)" />
        <img v-else :src="IconPath(tab.active_icon)" />
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
        {
          tabName: '积分兑奖',
          to: '/pointReward',
          index: 1,
          icon: 'tab_1.png',
          active_icon: 'tab_1_1.png'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          index: 2,
          icon: 'tab_2.png',
          active_icon: 'tab_2_1.png'
        },
        {
          tabName: '钻石送礼',
          to: '/presentGift',
          index: 3,
          icon: 'tab_3.png',
          active_icon: 'tab_3_1.png'
        },
        {
          tabName: '幸运闯关',
          to: '/luckyEnter',
          index: 4,
          icon: 'tab_4.png',
          active_icon: 'tab_4_1.png'
        },
        {
          tabName: '最佳买手',
          to: '/bestBuyer',
          index: 5,
          icon: 'tab_5.png',
          active_icon: 'tab_5_1.png'
        }
      ]),
      // 当前模块
      tabActive: '积分兑奖'
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'appVersion'])
    // tab为图片路径，用于动态渲染tab背景
    // tabBgi() {
    //   return (tab) => {
    //     return `tab_${tab.index}${
    //       this.tabActive === tab.tabName ? '' : '_1'
    //     }.png`
    //   }
    // }
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
    justify-content: space-evenly;
    // flex-wrap: wrap;
    // 上下交错时
    // padding-left: 3px;
    // background: url('../assets/back_1.png') no-repeat center -10px/100% 110%;

    .theme_tab_item {
      position: relative;
      // padding-top: 1px;

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
        opacity: 0;
      }

      //// 上下交错时
      //&:nth-child(even) {
      //  margin: -42px 0px 0 !important;
      //}
      //
      //// 上下交错时
      &:nth-child(odd) {
        margin-top: 10px;
      }
    }
  }

  // 模块内容盒子
  .TabsContain {
    padding: 0 8px;
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
