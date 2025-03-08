<template>
  <div class="layout">
    <!--banner-->
    <img :src="IconPath('banner.png')" class="banner" />
    <!--tab盒子-->
    <div class="tabs_box position-relative overflow-hidden">
      <div v-for="(tab, index) in tabsArray" :key="index" class="tab position-absolute">
        <!--点击容器-->
        <div class="click-content" @click.self="track(tab)"></div>
        <span>{{ tab.tabName }}</span>
        <!-- 使用图片替换tab -->
        <img v-if="$route.path == tab.to" class="tab_img" :src="IconPath(tab.actIcon)" />
        <img v-else class="tab_img" :src="IconPath(tab.icon)" />
      </div>
    </div>
    <router-view></router-view>
    <!-- 底部文本 -->
    <div class="BottomText">
      <span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayOut',
  data() {
    return {
      tabsArray: Object.freeze([
        { tabName: '西瓜兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '消费有礼', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '乐享一夏', to: '/summerDraw', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '夏日冲榜', to: '/summerRank', icon: 'tab_5_1.png', actIcon: 'tab_5.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'access_token', 'jump_type'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
    if (this.jump_type == 5) this.$router.replace('/summerRank')
  },
  methods: {
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {String} params.tabName 模块名称
     * @param {String} params.to 跳转路径
     */
    track(params) {
      if (params.to == this.$route.path) return
      const { tabName, to } = params
      this.$thinking.track('WebClick', { element: '模块选择', module: tabName }) // 数数点击埋点
      this.$router.replace(to)
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  .banner {
    margin-bottom: -127px;
    width: 750px;
    height: 632px;
  }
  .tabs_box {
    z-index: 1;
    width: 750px;
    height: 444px;
    margin-left: auto;
    //margin-bottom: -3px;
    background: url('@/pages/summerParty2024/assets/back_1.png') no-repeat left top/100% auto;
    .tab {
      .click-content {
        position: absolute;
        z-index: 2;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 120px;
        pointer-events: auto;
        //background-color: #fff;
      }
      @mixin tab($width, $height, $top, $right, $bottom, $left) {
        width: $width;
        height: $height;
        top: $top;
        right: $right;
        bottom: $bottom;
        left: $left;
      }
      .tab_img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
      > span {
        position: absolute;
        z-index: 1;
        opacity: 0;
      }
      &:nth-child(1) {
        @include tab(174px, 176px, 50px, auto, auto, 19px);
      }
      &:nth-child(2) {
        @include tab(164px, 164px, 56px, 294px, auto, auto);
      }
      &:nth-child(3) {
        @include tab(191px, 195px, 41px, 16px, auto, auto);
      }
      &:nth-child(4) {
        @include tab(179px, 181px, auto, auto, 86px, 153px);
      }
      &:nth-child(5) {
        @include tab(164px, 166px, auto, 154px, 90px, auto);
      }
    }
  }
  .BottomText {
    margin-top: 43px;
    width: 100%;
    height: 158px;
    display: flex;
    justify-content: center;
    span {
      font-size: 28px;
      text-align: center;
      color: #81E6FF;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
