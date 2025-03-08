<template>
  <div class="layout">
    <!--banner-->
    <img :src="IconPath('banner.png')" class="banner" />
    <!--tab盒子-->
    <div class="tabs_box">
      <div v-for="(tab, index) in tabsArray" :key="index" :class="`tab_${index + 1}`" class="tab position-absolute">
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
        { tabName: '粽子兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '钻石送礼', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '香囊秘宝', to: '/sachetTreasure', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '晶石回馈', to: '/sparBack', icon: 'tab_5_1.png', actIcon: 'tab_5.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
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
  position: relative;
  .banner {
    position: relative;
    margin-bottom: -108px;
    width: 100%;
    height: 574px;
  }
  .tabs_box {
    position: relative;
    z-index: 3;
    width: 750px;
    height: 432px;
    background: url('@/pages/dragonBoat/assets/back_1.png') no-repeat left top/100% 100%;
    margin-bottom: 8px;
    .tab {
      width: 199px;
      height: 190px;
      .click-content {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        width: 130px;
        height: 130px;
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
    }
    .tab_1 {
      top: 38px;
      left: 0;
    }
    .tab_2 {
      top: 38px;
      left: 272px;
    }
    .tab_3 {
      top: 38px;
      right: 20px;
    }
    .tab_4 {
      left: 137px;
      bottom: 68px;
    }
    .tab_5 {
      bottom: 68px;
      right: 150px;
    }
  }
  .BottomText {
    width: 100%;
    height: 170px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 28px;
      text-align: center;
      color: #389790;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
