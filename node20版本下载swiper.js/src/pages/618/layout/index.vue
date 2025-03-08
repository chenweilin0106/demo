<template>
  <div class="layout">
    <!--banner-->
    <img :src="IconPath('banner.png')" class="banner" />
    <!--tab盒子-->
    <div class="tabs_box">
      <div v-for="(tab, index) in tabsArray" :key="index" :class="`tab_${index + 1}`" class="tab">
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
        { tabName: '贝壳兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '消费有礼', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '摩天大楼', to: '/buildHouse', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '狂欢商人', to: '/carnivalTrader', icon: 'tab_5_1.png', actIcon: 'tab_5.png' },
        { tabName: '阵营对决', to: '/campRank', icon: 'tab_6_1.png', actIcon: 'tab_6.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'access_token', 'jump_type'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
    if (this.jump_type == 5) this.$router.replace('/carnivalTrader')
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
    margin-bottom: -145px;
    width: 100%;
    height: 632px;
  }
  .tabs_box {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 318px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .tab {
      position: relative;
      width: 230px;
      height: 180px;
      flex-shrink: 0;
      pointer-events: none;
      .click-content {
        position: absolute;
        z-index: 2;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        height: 100px;
        pointer-events: auto;
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
      &:nth-child(2),
      &:nth-child(5) {
        margin: 0 17px;
      }
      &:nth-last-child(-n + 3) {
        margin-top: -42px;
      }
    }
  }
  .BottomText {
    margin-top: 25px;
    width: 100%;
    height: 158px;
    display: flex;
    justify-content: center;
    padding-top: 28px;
    background: url('@/pages/618/assets/back_1.png') no-repeat left top/100% 100%;
    span {
      font-size: 28px;
      text-align: center;
      color: #d7b37a;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
