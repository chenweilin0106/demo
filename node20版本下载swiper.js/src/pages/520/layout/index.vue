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
import { compareVersions } from '../utils/toApp'
import { mapState } from 'vuex'

export default {
  name: 'LayOut',
  data() {
    return {
      tabsArray: Object.freeze([
        { tabName: '情书兑奖', to: '/pointReward', icon: 'tab_1_1.png', actIcon: 'tab_1.png' },
        { tabName: '充值有礼', to: '/rechargeRebate', icon: 'tab_2_1.png', actIcon: 'tab_2.png' },
        { tabName: '消费有利', to: '/presentGift', icon: 'tab_3_1.png', actIcon: 'tab_3.png' },
        { tabName: '独家记忆', to: '/generatePoster', icon: 'tab_4_1.png', actIcon: 'tab_4.png' },
        { tabName: '为你摘星', to: '/sweetTreasure', icon: 'tab_5_1.png', actIcon: 'tab_5.png' },
        { tabName: '热恋榜单', to: '/loveRank', icon: 'tab_6_1.png', actIcon: 'tab_6.png' }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token'])
  },
  mounted() {
    this.$store.commit('getAppData', window.location.search.substring(1))
    if (this.appVersion && compareVersions(this.app_version, '5.6.4') === -1) this.$thinking.login(this.uid) // 低版本需手动携带account_id上报
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
    margin-bottom: -153px;
    width: 100%;
    height: 657px;
  }

  .tabs_box {
    position: relative;
    z-index: 3;
    margin-left: 18px;
    width: 732px;
    height: 370px;
    background: url('@/pages/520/assets/back_2.png') no-repeat left top/100% 100%;

    .tab {
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
      top: 36px;
      left: 6px;
      width: 173px;
      height: 187px;
    }
    .tab_2 {
      top: 62px;
      left: 225px;
      width: 168px;
      height: 182px;
    }
    .tab_3 {
      top: 45px;
      right: 136px;
      width: 181px;
      height: 191px;
    }
    .tab_4 {
      left: 91px;
      bottom: -18px;
      width: 172px;
      height: 184px;
    }
    .tab_5 {
      bottom: -26px;
      right: 258px;
      width: 163px;
      height: 176px;
    }
    .tab_6 {
      bottom: -6px;
      right: 35px;
      width: 181px;
      height: 197px;
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
      color: #fff;
      white-space: pre-wrap;
      line-height: 42px;
    }
  }
}
</style>
