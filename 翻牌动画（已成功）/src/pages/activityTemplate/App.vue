<template>
  <div id="app">
    <!-- 顶部banner图 -->
    <div class="ThemeBanner"></div>
    <!-- tabs盒子 -->
    <div class="ThemeTab">
      <div
        v-for="tab in tabsArray"
        :key="tab"
        @click="track($event, tab)"
        class="theme_tab_item flex_across"
        :class="{ theme_tab_active: tabActive == tab }"
      >
        <span>{{ tab }}</span>
        <!-- <img
          :src="
            require(`./assets/tab_${
              1 + index + (!tabActive.includes(tab) ? '_1' : '')
            }.png`)
          "
          alt=""
        /> -->
      </div>
    </div>
    <!-- 模块内容盒子 -->
    <div class="TabsContain">
      <PointReward v-if="tabActive.includes('积分兑奖')" />
      <RechargeRebate v-if="tabActive.includes('充值返利')" />
      <PresentGift v-if="tabActive.includes('钻石送礼')" />
      <WuLin v-if="tabActive.includes('技能礼包')" />
    </div>
    <!-- 底部文本 -->
    <div class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
// 积分兑换
import PointReward from './views/PointReward'
// 充值返利
import RechargeRebate from './views/RechargeRebate'
// 钻石送礼
import PresentGift from './views/PresentGift'
// 技能礼包
import WuLin from './views/WuLin'
import { mapGetters } from 'vuex'
export default {
  components: {
    PointReward,
    RechargeRebate,
    PresentGift,
    WuLin
  },
  data() {
    return {
      // 模块数组
      tabsArray: ['积分兑奖', '充值返利', '钻石送礼', '技能礼包'],
      // 当前模块
      tabActive: '积分兑奖'
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'appVersion'])
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
    // 神策模块切换点击埋点
    track(e, module) {
      // 切换模块
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track(
        'click', // 追踪事件的名称
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
#app {
  // 顶部banner图
  .ThemeBanner {
    width: 100%;
    height: 200px;
    background: url('./assets/banner.png') no-repeat top center/100%;
  }
  // tabs盒子
  .ThemeTab {
    position: relative;
    margin: 5px 0 20px;
    overflow: visible;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .theme_tab_item {
      width: 87px;
      height: 38px;
      color: #fff;
      background: url('./assets/tab_1_1.png') no-repeat top center/100%;
      // tab为图片时
      // > img {
      //   position: absolute;
      //   width: 115%;
      // }
      // > span {
      //   position: relative;
      //   z-index: 100;
      //   width: 100%;
      //   height: 100%;
      //   opacity: 0;
      // }
    }
    // 当前页面tab背景
    .theme_tab_active {
      color: #fff !important;
      background: url('./assets/tab_1.png') no-repeat top center/100% !important;
    }
    // 布局不在同一行时
    // .theme_tab_item:nth-child(2) {
    //   margin-top: 47px;
    // }
    // .theme_tab_item:nth-child(4) {
    //   margin-top: 47px;
    // }
  }
  // 模块内容盒子
  .TabsContain {
    // margin-top: -36px;
    padding: 0 8px;
  }
  // 底部文本
  .BottomText {
    p {
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
    }
  }
}
</style>
