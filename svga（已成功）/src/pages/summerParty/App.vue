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
    <!-- <div class="TabsContain">
      <PointReward v-if="tabActive.includes('冰块兑奖')" />
      <RechargeRebate v-if="tabActive.includes('充值返利')" />
      <PresentContact v-if="tabActive.includes('礼尚往来')" />
      <SummerTreasure v-if="tabActive.includes('海底宝藏')" />
      <FilpGame v-if="tabActive.includes('积分翻倍')" />
      <NameInList v-if="tabActive.includes('榜上有名')" />
    </div> -->
    <div class="ribbon-svga" v-if="show">
      <PublicSvga svgaName="12xz_baiyang" />
    </div>
    <button @click="onClick">点击关闭</button>
    <!-- 底部文本 -->
    <div class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import PublicSvga from './components/PublicSvga'
import { mapGetters } from 'vuex'
export default {
  components: {
    PublicSvga
  },
  data() {
    return {
      show: true,
      my_svga_play: null,
      // 模块数组
      tabsArray: [
        '冰块兑奖',
        '充值返利',
        '礼尚往来',
        '海底宝藏',
        '积分翻倍',
        '榜上有名'
      ],
      // 当前模块
      tabActive: '冰块兑奖'
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'appVersion'])
  },
  mounted() {
    // svgaFn('12xz_baiyang', 'svga_12xz_baiyang')
    // this.playRibbonSvga()
  },
  methods: {
    onClick() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  .ribbon-svga {
    width: 50px;
    height: 50px;
    // background: red;
  }
  // 顶部banner图
  .ThemeBanner {
    width: 100%;
    // height: 225px;
    // background: url('./assets/banner.png') no-repeat top center/100%;
  }
  // tabs盒子
  .ThemeTab {
    position: relative;
    // margin: 0px 0 8px;
    overflow: visible;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .theme_tab_item {
      // width: 115px;
      // height: 41px;
      // color: #b28d2b;
      // background: url('./assets/tab_1_1.png') no-repeat top center/100% auto;
      padding-top: 1px;
      font-size: 16px;
      // margin-bottom: 6px;
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
    // .theme_tab_active {
    //   color: #fff !important;
    //   background: url('./assets/tab_1.png') no-repeat top center/100% !important;
    // }
    // 布局不在同一行时（一般tab是图片时）
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
    font-size: 14px;
    p {
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
    }
  }
}
</style>
