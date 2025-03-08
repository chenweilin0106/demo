<template>
  <div class="layout position-relative">
    <!--banner-->
    <img :src="IconPath('banner.png')" class="banner" data-html2canvas-ignore />
    <!--tab盒子-->
    <div class="tabs_box position-relative overflow-hidden" data-html2canvas-ignore>
      <div v-for="(tab, index) in tabsArray" :key="index" class="tab position-absolute">
        <!--点击容器 防止图片过大导致点击范围冲突-->
        <div class="click-content" @click.self="track(tab)"></div>
        <!--用于埋点上报-->
        <span>{{ tab.tabName }}</span>
        <!--使用图片替换tab-->
        <img v-if="$route.path == tab.to" class="tab_img" :src="IconPath(tab.actIcon)" />
        <img v-else class="tab_img" :src="IconPath(tab.icon)" />
      </div>
    </div>
    <router-view></router-view>
    <!--底部文本-->
    <div class="BottomText" data-html2canvas-ignore><span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayOut',
  data() {
    return {
      tabsArray: Object.freeze([
        { tabName: '烟花兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '消费有礼', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '浪漫约定', to: '/generatePoster', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '同心祈愿', to: '/draw', icon: 'tab_5_1.png', actIcon: 'tab_5.png' },
        { tabName: '七夕冲榜', to: '/rank', icon: 'tab_6_1.png', actIcon: 'tab_6.png' }
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
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .banner {
    width: 750px;
    height: 632px;
  }
  .tabs_box {
    $bannerHeight: 458px;
    margin-top: 276 - $bannerHeight;
    margin-bottom: -30px;
    //z-index: 1;
    width: 750px;
    height: $bannerHeight;
    background: url('@/pages/qiXi/assets/back_1.png') no-repeat left top/100% auto;
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
      @mixin tab($width: 180px, $height: 176px, $top: auto, $right: auto, $bottom: auto, $left: auto) {
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
        @include tab($top: 38px, $left: 3px);
      }
      &:nth-child(2) {
        @include tab($top: 166px, $left: 90px);
      }
      &:nth-child(3) {
        @include tab($top: 27px, $left: 173px);
      }
      &:nth-child(4) {
        @include tab($top: 138px, $left: 275px);
      }
      &:nth-child(5) {
        @include tab($top: 195px, $right: 154px);
      }
      &:nth-child(6) {
        @include tab($top: 145px, $right: 1px);
      }
    }
  }
  .BottomText {
    margin-top: 153px - 552;
    z-index: -1;
    width: 750px;
    height: 552px;
    background: url('@/pages/qiXi/assets/back_3.png') no-repeat left top/100% 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 63px;
    span {
      font-size: 28px;
      text-align: center;
      color: #7C80EB;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
