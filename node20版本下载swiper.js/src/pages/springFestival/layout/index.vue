<template>
  <div
    :class="[
      'layout',
      { 'full-screen': isFullScreen },
      {
        'padding-bottom-class':
          !isFullScreen && (isHome || $route.path == '/newYearCall')
      }
    ]"
  >
    <div
      class="back_btn"
      @click="backFn"
      :style="{ top: statusHeight + 'px' }"
    ></div>

    <!--banner-->
    <div class="banner">
      <div :class="['banner-label', bannerLabelClass]"></div>
    </div>
    <template v-if="isHome">
      <div class="line-1">
        <img :src="IconPath('mk0_8.png')" class="line-icon" />
        <div
          v-for="(tab, index) in tabsArray.slice(0, 3)"
          :key="index"
          class="tab flex-center"
        >
          <!--点击容器-->
          <div class="click-content" @click="track(tab)"></div>
          <span class="flex-center">{{ tab.tabName }}</span>
          <!-- 使用图片替换tab -->
          <img class="tab_img" :src="IconPath(tab.icon)" />
        </div>
      </div>
      <div class="line-2" ref="line-2">
        <img :src="IconPath('mk0_9.png')" class="line-icon" />
        <div
          v-for="(tab, index) in tabsArray.slice(3)"
          :key="index"
          class="tab flex-center"
        >
          <!--点击容器-->
          <div class="click-content" @click="track(tab)"></div>
          <span class="flex-center">{{ tab.tabName }}</span>
          <!-- 使用图片替换tab -->
          <img class="tab_img" :src="IconPath(tab.icon)" />
        </div>
      </div>
    </template>

    <router-view></router-view>
    <template v-if="!isHome">
      <div :class="['bgi-1', `bgi-1_${$route.path}`]"></div>
      <div :class="['bgi-2', `bgi-2_${$route.path}`]"></div>
    </template>
    <div class="bottom-bgi"></div>
    <!-- 底部文本 -->
    <div v-if="!isHome && $route.path != '/newYearCall'" class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { quitView, compareVersions } from '../utils/toApp'

export default {
  name: 'LayOut',
  data() {
    return {
      bannerLabel: Object.freeze({
        '/collectHappiness': 'banner-label-2',
        '/newYearCall': 'banner-label-3',
        '/titleBack': 'banner-label-4',
        '/giftShopWindow': 'banner-label-5',
        '/newYearRank': 'banner-label-6'
      }),
      // 模块数组
      tabsArray: Object.freeze([
        { tabName: '新春回馈', to: '/newYearGift', icon: 'mk0_2.png' },
        { tabName: '集福迎新', to: '/collectHappiness', icon: 'mk0_3.png' },
        { tabName: '拜年送福', to: '/newYearCall', icon: 'mk0_4.png' },
        { tabName: '返场称号', to: '/titleBack', icon: 'mk0_5.png' },
        { tabName: '礼物橱窗', to: '/giftShopWindow', icon: 'mk0_6.png' },
        { tabName: '新春冲榜', to: '/newYearRank', icon: 'mk0_7.png' }
      ])
    }
  },
  computed: {
    ...mapState([
      'uid',
      'referal_source',
      'app_version',
      'access_token',
      'jump_type',
      'statusHeight',
      'isFullScreen'
    ]),
    /**
     * 判断是不是首页
     * 用于banner样式 tab栏 弹幕 背景图的显示隐藏
     */
    isHome() {
      return this.$route.path === '/'
    },
    // banner中的label图标类名
    bannerLabelClass() {
      return this.$route.path.includes('/newYearGift') ||
        this.$route.path === '/'
        ? 'banner-label-1'
        : this.bannerLabel[this.$route.path]
    }
  },
  mounted() {
    // 低版本需手动携带account_id上报
    if (this.app_version && compareVersions(this.app_version, '5.6.4') == -1) {
      this.$thinking.login(this.uid)
    }
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', {
      referal_source: this.referal_source
    })
    if (this.jump_type == 5) this.$router.replace('/newYearCall')
  },
  methods: {
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {String} params.tabName 模块名称
     * @param {String} params.to 跳转路径
     */
    track(params) {
      const { tabName, to } = params
      this.tabActive = tabName
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          module: tabName
        }
      )
      if (to != this.$route.path) this.$router.replace(to)
    },
    // 返回按钮
    async backFn() {
      if (this.isHome) {
        quitView(this.uid, this.access_token)
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.padding-bottom-class {
  padding-bottom: 67px;
}

.layout {
  position: relative;
  overflow: hidden;

  .back_btn {
    position: absolute;
    z-index: 2;
    top: 64px;
    left: 30px;
    width: 84px;
    height: 76px;
    background: url('../assets/mk0_1.png') no-repeat left top/100% 100%;
  }

  .banner {
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 733px;
    background: url('../assets/banner.png') no-repeat left top/100% 100%;

    .banner-label {
      position: absolute;
    }

    .banner-label-1 {
      top: 71px;
      right: 40px;
      width: 273px;
      height: 552px;
      background: url('@/pages/springFestival/assets/banner_2.png') no-repeat
        left top/100% 100%;
    }

    .banner-label-2 {
      top: 121px;
      right: 60px;
      width: 312px;
      height: 435px;
      background: url('@/pages/springFestival/assets/banner_3.png') no-repeat
        left top/100% 100%;
    }

    .banner-label-3 {
      top: 78px;
      right: 60px;
      width: 309px;
      height: 425px;
      background: url('@/pages/springFestival/assets/banner_4.png') no-repeat
        left top/100% 100%;
    }

    .banner-label-4 {
      top: 131px;
      right: 60px;
      width: 317px;
      height: 421px;
      background: url('@/pages/springFestival/assets/banner_5.png') no-repeat
        left top/100% 100%;
    }

    .banner-label-5 {
      top: 130px;
      right: 60px;
      width: 313px;
      height: 420px;
      background: url('@/pages/springFestival/assets/banner_6.png') no-repeat
        left top/100% 100%;
    }

    .banner-label-6 {
      top: 131px;
      right: 60px;
      width: 313px;
      height: 421px;
      background: url('@/pages/springFestival/assets/banner_7.png') no-repeat
        left top/100% 100%;
    }
  }

  .line-1 {
    margin-top: -190px;
    position: relative;
    z-index: 2;
    //top: 543px;
    //top: 35.1vh;
    //left: 0;
    width: 100%;
    //width: 100vw;
    height: 401px;
    //height: 8.4vh;
    //background: url('@/pages/springFestival/assets/mk0_8.png') no-repeat left
    //  top/100% 100%;
    pointer-events: none;
    .line-icon {
      width: 100%;
      height: auto;
      pointer-events: none;
    }

    .tab:nth-of-type(1) {
      top: 0px;
      //top: 34.97vh;
      left: 1px;
      //left: 0.21vw;
    }

    .tab:nth-of-type(2) {
      top: 42px;
      //top: 37.82vh;
      left: 243px;
    }

    .tab:nth-of-type(3) {
      top: 26px;
      //top: 36.78vh;
      right: 9px;
    }
  }

  .line-2 {
    margin-top: -57px;
    position: relative;
    z-index: 2;
    //top: 887px;
    //top: 57.34vh;
    //left: 0;
    width: 100%;
    height: 380px;
    //height: 6.92vh;
    //background: url('@/pages/springFestival/assets/mk0_9.png') no-repeat left
    //  top/100% 100%;
    pointer-events: none;
    .line-icon {
      width: 100%;
      height: 107px;
      pointer-events: none;
    }

    .tab:nth-of-type(1) {
      top: -7px;
      //top: 56.88vh;
      left: 0px;
    }

    .tab:nth-of-type(2) {
      top: 21px;
      //top: 58.69vh;
      left: 241px;
    }

    .tab:nth-of-type(3) {
      top: -9px;
      //top: 56.76vh;
      right: 4px;
    }
  }

  .tab {
    position: absolute;
    display: flex;
    width: 262px;
    //width: 34.93vw;
    height: 359px;
    pointer-events: none;
    //height: 23.21vh;

    .click-content {
      position: absolute;
      z-index: 5;
      top: 90px;
      //top: 6.5vh;
      left: 50%;
      transform: translateX(-50%);
      //width: 180px;
      width: 180px;
      height: 250px;
      pointer-events: auto;
      //height: 15.3vh;
      //background-color: rgba(255, 255, 255, 0.5);
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

  // 底部文本
  .BottomText {
    position: relative;
    z-index: 3;
    width: fit-content;
    margin: 32px auto 70px;
    font-size: 28px;

    p {
      text-align: center;
      //margin-bottom: 20px;
      color: #c97f1f;
      line-height: 42px;
      //line-height: 2.71vh;
    }
  }
}

// 全屏
.full-screen {
  width: 100vw;
  height: 100vh;
  padding-bottom: 0;
}

.bgi-1 {
  position: absolute;
  z-index: 3;
  left: 0;
  width: 750px;
  height: 556px;
  background: url('@/pages/springFestival/assets/back_1.png') no-repeat left
    top/100% 100%;
}

.bgi-2 {
  position: absolute;
  z-index: 3;
  left: 0;
  width: 750px;
  height: 556px;
  background: url('@/pages/springFestival/assets/back_2.png') no-repeat left
    top/100% 100%;
}

.bottom-bgi {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  //width: 100%;
  width: 100vw;
  height: 491px;
  //height: 31.74vh;
  background: url('@/pages/springFestival/assets/back_3.png') no-repeat left
    top/100% 100%;
}

.bgi-1_\/newYearGift\/pointReward {
  top: 492px;
}

.bgi-2_\/newYearGift\/pointReward {
  top: 1656px;
}

.bgi-1_\/newYearGift\/rechargeRebate {
  top: 492px;
}

.bgi-2_\/newYearGift\/rechargeRebate {
  top: 1601px;
}

.bgi-1_\/newYearGift\/consumeGift {
  top: 492px;
}

.bgi-2_\/newYearGift\/consumeGift {
  display: none;
}

.bgi-1_\/collectHappiness {
  top: 1013px;
}

.bgi-2_\/collectHappiness {
  top: 1535px;
}

.bgi-1_\/newYearCall {
  display: none;
}

.bgi-2_\/newYearCall {
  display: none;
}

.bgi-1_\/titleBack {
  top: 1632px;
}

.bgi-2_\/titleBack {
  top: 2692px;
}

.bgi-1_\/giftShopWindow {
  display: none;
}

.bgi-2_\/giftShopWindow {
  top: 1226px;
}

.bgi-1_\/newYearRank {
  top: 492px;
}

.bgi-2_\/newYearRank {
  display: none;
}
</style>
