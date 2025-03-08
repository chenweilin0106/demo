<template>
  <div class="layout">
    <img :src="IconPath('banner.png')" class="banner" />
    <img :src="IconPath('back.png')" class="back position-absolute" @click="quitView" />
    <!--<div class="tabs_box flex align-center flex-wrap position-relative justify-between">-->
    <!--  <div v-for="(tab, index) in tabsArray" :key="index" class="tab flex-shrink-0 position-relative">-->
    <!--    &lt;!&ndash;点击容器 防止图片过大导致点击范围冲突&ndash;&gt;-->
    <!--    <div class="click-content" @click.self="track(tab)"></div>-->
    <!--    &lt;!&ndash;用于埋点上报&ndash;&gt;-->
    <!--    <span class="position-absolute pointer-none position-center line-height-100 text-nowrap" :class="$route.path == tab.to && 'active'">{{ tab.tabName }}</span>-->
    <!--    <img v-if="$route.path == tab.to" class="tab_img" :src="IconPath(tab.actIcon)" />-->
    <!--    <img v-else class="tab_img" :src="IconPath(tab.icon)" />-->
    <!--  </div>-->
    <!--</div>-->
    <router-view></router-view>
    <!--底部文本-->
    <div class="BottomText"><span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { quitView } from '@/utils/toApp'
export default {
  name: 'LayOut',
  data() {
    return {
      tabsArray: Object.freeze([
        { tabName: '枫叶兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '消费有礼', to: '/presentGift', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '狂欢商人', to: '/carnivalTrader', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '金秋许愿', to: '/draw', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '技能礼包', to: '/WuLin', icon: 'tab_1_1.png', actIcon: 'tab_1.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'access_token', 'jump_type', 'statusHeight'])
  },
  mounted() {
    this.$store.commit('getAppData')
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
    document.querySelector('.layout>.back').style.top = this.statusHeight + 'px' // 适配状态栏
    // if (this.jump_type == 5) this.$router.replace('/summerRank')
  },
  methods: {
    quitView,
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {string} params.tabName 模块名称
     * @param {string} params.to 跳转路径
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
  $bannerHeight: 716px;
  .banner {
    width: 750px;
    height: $bannerHeight;
  }
  .back {
    top: 66px;
    left: 25px;
    width: 93px;
    height: 85px;
  }
  .BottomText {
    $lineHeight: 42px;
    $fontSize: 28px;
    $fontGap: ($lineHeight - $fontSize) / 2;
    $topGap: 162 - $fontGap;
    $bottomGap: 89 - $fontGap;
    z-index: -1;
    width: 750px; /*底部图片宽度*/
    height: 320px; /*底部图片高度*/
    background: url('@/pages/celebration/assets/back_1.png') no-repeat left top/100% 100%; /*底部图片*/
    display: flex;
    justify-content: center;
    align-items: flex-end;
    //margin-top: -419px; /*距离顶部距离*/
    //padding-top: $topGap;
    padding-bottom: $bottomGap;
    span {
      font-size: 28px;
      text-align: center;
      color: #fff;
      white-space: pre-wrap;
      line-height: $lineHeight;
    }
  }
}
</style>
