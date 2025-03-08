<template>
  <div class="layout position-relative">
    <img :src="IconPath('banner.png')" class="banner" data-html2canvas-ignore />
    <div class="tabs_box position-relative overflow-hidden" data-html2canvas-ignore>
      <div v-for="(tab, index) in tabsArray" :key="index" class="tab position-absolute">
        <!--点击容器 防止图片过大导致点击范围冲突-->
        <div class="click-content" @click.self="track(tab)"></div>
        <!--用于埋点上报-->
        <span>{{ tab.tabName }}</span>
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
        { tabName: '月桂兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '玉兔送礼', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '月饼工坊', to: '/moonCake', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '星河漫步', to: '/draw', icon: 'tab_5_1.png', actIcon: 'tab_5.png' },
        { tabName: '登月冲榜', to: '/rank', icon: 'tab_6_1.png', actIcon: 'tab_6.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'access_token', 'jump_type'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
    // if (this.jump_type == 5) this.$router.replace('/summerRank')
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
  $bannerHeight: 804px;
  .banner {
    width: 750px;
    height: $bannerHeight;
  }
  .tabs_box {
    margin-top: 605 - $bannerHeight; /*tab盒子距离banner的距离 蓝湖上是tab盒子距离页面顶部距离 - banner高度*/
    margin-bottom: -30px;
    width: 749px;
    height: 519px;
    margin-left: auto;
    background: url('@/pages/midAutumn/assets/back_1.png') no-repeat left top/100% 100%;
    .tab {
      .click-content {
        position: absolute;
        z-index: 2;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 120px;
        //background-color: #fff;
      }
      @mixin tab($width: 187px, $height: 188px, $top: auto, $right: auto, $bottom: auto, $left: auto) {
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
      $positions: ((64px, 1px), (83px, 343px), (57px, 544px), (219px, 37px), (200px, 212px), (210px, 470px));
      @for $i from 1 through length($positions) {
        &:nth-child(#{$i}) {
          $pos: nth($positions, $i);
          @include tab($top: nth($pos, 1), $left: nth($pos, 2));
        }
      }
    }
  }
  .BottomText {
    $lineHeight: 42px;
    $fontSize: 28px;
    $fontGap: ($lineHeight - $fontSize) / 2;
    $topGap: 49 - $fontGap;
    $bottomGap: 65 - $fontGap;
    margin-top: $topGap;
    z-index: -1;
    //width: 750px; /*底部图片宽度*/
    //height: 552px; /*底部图片高度*/
    //background: url('@/pages/midAutumn/assets/back_3.png') no-repeat left top/100% 100%; /*底部图片*/
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: $bottomGap;
    span {
      font-size: 28px;
      text-align: center;
      color: #F9A68A;
      white-space: pre-wrap;
      line-height: $lineHeight;
    }
  }
}
</style>
