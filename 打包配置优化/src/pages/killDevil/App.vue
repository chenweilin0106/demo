<template>
  <div id="app">
    <!-- 顶部banner图 -->
    <div class="ThemeBanner"></div>
    <!-- tabs盒子 -->
    <div class="ThemeTab">
      <div
        v-for="tab in tabsArray"
        :key="tab"
        @click="track(tab)"
        class="theme_tab_item flex_across"
        :class="{ theme_tab_active: tabActive == tab }"
      >
        <span>{{ tab }}</span>
        <!-- 使用图片替换tab -->
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
      <RechargeRebate v-if="tabActive.includes('充值有礼')" />
      <PresentGift v-if="tabActive.includes('钻石送礼')" />
      <LuckyEnter v-if="tabActive.includes('幸运闯关')" />
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
// 充值有礼
import RechargeRebate from './views/RechargeRebate'
// 钻石送礼
import PresentGift from './views/PresentGift'
// 幸运闯关
import LuckyEnter from './views/LuckyEnter'
import { mapGetters } from 'vuex'
export default {
  components: {
    PointReward,
    RechargeRebate,
    PresentGift,
    LuckyEnter
  },
  data() {
    return {
      // 模块数组
      tabsArray: ['积分兑奖', '充值有礼', '钻石送礼', '幸运闯关'],
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
#app {
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
    justify-content: space-evenly;
    flex-wrap: wrap;
    .theme_tab_item {
      padding-top: 1px;
      font-size: 16px;
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
  }
  // 模块内容盒子
  .TabsContain {
    // margin-top: -36px;
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
