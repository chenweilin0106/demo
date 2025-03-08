<template>
  <div class="m1Vue">
    <!--<img :src="IconPath('banner.png')" class="banner" />-->
    <div class="tabs_box flex align-center flex-no-wrap position-relative justify-center">
      <div v-for="(tab, index) in tabsArray" :key="index" class="tab flex-shrink-0 position-relative">
        <!--点击容器 防止图片过大导致点击范围冲突-->
        <div class="click-content" @click.self="track(tab)"></div>
        <!--用于埋点上报-->
        <span class="position-absolute pointer-none position-center line-height-100 text-nowrap" :class="$route.path == tab.to && 'active'">{{ tab.tabName }}</span>
        <img v-if="$route.path == tab.to" class="tab_img" :src="IconPath(tab.actIcon)" />
        <img v-else class="tab_img" :src="IconPath(tab.icon)" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'm1Vue',
  data() {
    return {
      tabsArray: Object.freeze([
        { tabName: '礼花兑奖', to: '/m1/pointReward', icon: 'mk1_tab1_1.png', actIcon: 'mk1_tab1.png' },
        { tabName: '充值有礼', to: '/m1/rechargeRebate', icon: 'mk1_tab2_1.png', actIcon: 'mk1_tab2.png' },
        { tabName: '消费有礼', to: '/m1/presentGift', icon: 'mk1_tab3_1.png', actIcon: 'mk1_tab3.png' },
        { tabName: '狂欢回馈', to: '/m1/skillSpar', icon: 'mk1_tab4_1.png', actIcon: 'mk1_tab4.png' }
      ])
    }
  },
  methods: {
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {string} params.tabName 模块名称
     * @param {string} params.to 跳转路径
     */
    track(params) {
      if (params.to == this.$route.path) return
      const { tabName, to } = params
      this.$thinking.track('WebClick', { element: '好礼回馈', module: tabName }) // 数数点击埋点
      this.$router.replace(to)
    }
  }
}
</script>

<style scoped lang="scss">
.m1Vue {
  $bannerHeight: 643px;

  .banner {
    width: 750px;
    height: $bannerHeight;
  }

  .tabs_box {
    margin-top: -271px; /*tab盒子距离banner的距离 蓝湖上是tab盒子距离页面顶部距离 - banner高度*/
    width: 750px;
    //height: 82px * 2 + 10;
    //align-content: space-between;
    //padding: 0 22px;

    .tab {
      .click-content {
        position: absolute;
        z-index: 2;
        //top: 30px;
        //left: 50%;
        //transform: translateX(-50%);
        width: 100%;
        height: 100%;
      }

      @mixin tab($width: 180px, $height: 218px, $top: auto, $right: auto, $bottom: auto, $left: auto) {
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
        z-index: 2;
        font-size: 32px;
        color: transparent;

        &.active {
          //color: #EF6500;
          font-weight: 500;
        }
      }

      $positions: ((208px, 2px), (310px, 122px), (181px, 232px), (286px, 345px), (200px, 466px), (306px, 577px));
      @for $i from 1 through length($positions) {
        &:nth-child(#{$i}) {
          //$pos: nth($positions, $i);
          @include tab();
        }
      }
    }
  }
}
</style>
