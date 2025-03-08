<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="banner-content"></div>
    <div class="back-box"></div>
    <!-- tabs盒子 -->
    <div class="swiper-container tabs-content">
      <div class="swiper-wrapper">
        <div
          v-for="(tab, index) in tabsArray"
          :key="index"
          class="swiper-slide"
          :class="tab.to"
          :tab="JSON.stringify(tab)"
        >
          {{ tab.tabName }}
        </div>
      </div>
    </div>
    <!-- 模块内容容器的Swiper容器 -->
    <!-- <div class="swiper-container swiper-container-content">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(tab, index) in tabsArray"
          :key="index"
        >
          <NewBegin v-show="tab.tabName == '新服启程'"></NewBegin>
          <RechargeRebate v-show="tab.tabName == '充值有礼'"></RechargeRebate>
          <GiftBack v-show="tab.tabName == '礼尚往来'"></GiftBack>
          <GiveNumber v-show="tab.tabName == '首发靓号'"></GiveNumber>
          <OpeningRank v-show="tab.tabName == '开服冲榜'"></OpeningRank>
        </div>
      </div>
    </div> -->
    <router-view></router-view>
    <!-- 底部文本 -->
    <div class="bottom-text">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
// import NewBegin from '../views/NewBegin'
// import RechargeRebate from '../views/RechargeRebate'
// import GiftBack from '../views/GiftBack'
// import GiveNumber from '../views/GiveNumber'
// import OpeningRank from '../views/OpeningRank'
import Swiper from 'swiper' // 注意引入的是Swiper
import 'swiper/css/swiper.min.css' // 注意这里的引入
import { mapState } from 'vuex'
export default {
  name: 'layoutPage',
  components: {
    // NewBegin,
    // RechargeRebate,
    // GiftBack,
    // GiveNumber,
    // OpeningRank
  },
  data() {
    return {
      clickIndex: 0,
      swiper: null,
      // 模块数组
      tabsArray: Object.freeze([
        {
          tabName: '新服启程',
          to: '/newBegin',
          icon: 'tab_1_1.png',
          activeIcon: 'tab_1.png'
        },
        {
          tabName: '充值有礼',
          to: '/rechargeRebate',
          icon: 'tab_2_1.png',
          activeIcon: 'tab_2.png'
        },
        {
          tabName: '礼尚往来',
          to: '/giftBack',
          icon: 'tab_3_1.png',
          activeIcon: 'tab_3.png'
        },
        {
          tabName: '首发靓号',
          to: '/giveNumber',
          icon: 'tab_4_1.png',
          activeIcon: 'tab_4.png'
        },
        {
          tabName: '开服冲榜',
          to: '/openingRank',
          icon: 'tab_5_1.png',
          activeIcon: 'tab_5.png'
        }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'appVersion'])
  },
  mounted() {
    const vm = this
    // 低版本需手动携带account_id上报
    // if (this.appVersion && this.appVersion < 564) {
    //   this.$thinking.login(this.uid)
    // }
    // // 数数页面浏览埋点
    // this.$thinking.quick('autoTrack', {
    //   referal_source: this.referal_source
    // })
    this.swiper = new Swiper('.tabs-content', {
      speed: 300,
      slidesPerView: 'auto',
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: true,
      loopAdditionalSlides: 5,
      on: {
        transitionEnd: function () {
          console.log('transitionEnd', this.activeIndex)
          this.params.slideToClickedSlide = true
          this.params.loop = true
          if (vm.swiper && vm.swiper.update) {
            vm.swiper.update()
          }
        },
        slideChange: function () {
          const current = this.slides[this.previousIndex]
          current.style.backgroundImage = ''
        },
        transitionStart: function () {
          this.params.slideToClickedSlide = false
          if (vm.clickIndex == 12 || vm.clickIndex == 3) {
            this.params.loop = false
            if (vm.swiper && vm.swiper.update) {
              vm.swiper.update()
            }
          }
          vm.clickIndex = this.activeIndex
          const current = this.slides[this.activeIndex]
          const data = current.getAttribute('tab')
          const params1 = JSON.parse(data)
          const img = require('@/assets/' + params1.activeIcon)
          current.style.backgroundImage = 'url(' + img + ')'
          vm.track(params1)
        }
      }
    })
    // 创建模块内容容器的Swiper实例
    // const swiperContent = new Swiper('.swiper-container-content', {
    //   allowTouchMove: false,
    //   spaceBetween: 0,
    //   slidesPerView: 'auto',
    //   loop: true
    //   loopAdditionalSlides: 5
    //   watchSlidesProgress: true,
    //   watchSlidesVisibility: true,
    //   observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    //   observeParents: true // 修改swiper的父元素时，自动初始化swiper
    // })
    // 使用controller控制器将两个Swiper实例链接起来
    // this.swiper.controller.control = swiperContent
    // swiperContent.controller.control = mySwiper
  },
  methods: {
    // 切换模块
    track(params) {
      const { tabName, to } = params
      // const { tabName } = params
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          tabName
        }
      )
      if (this.$route.path == to) return
      this.$router.replace(to)
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-container-content {
  width: 100%;
  height: fit-content !important;
}
.layoutPage {
  position: relative;

  // 顶部banner图
  .banner-content {
    width: 100%;
    height: 804px;
    background: url('@/assets/banner.png') no-repeat left top/100% 100%;
  }
  .tabs-content {
    position: relative;
    z-index: 2;
    margin-top: -110px;
    height: 337px;
    .swiper-slide-active {
      margin-top: 60px;
      margin-left: 9px;
      margin-right: 9px;
      // transition: all 0.3s;
    }
    .swiper-slide-next,
    .swiper-slide-prev {
      margin-top: 36px;
      // transition: all 0.3s;
    }

    .swiper-slide {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 191px;
      font-size: 28px;
      color: transparent;
      background: no-repeat left top/100% 100%;
      // transition: all 0.3s;

      .click-box {
        position: absolute;
        z-index: 2;
        top: 50px;
        left: 15px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }

      // > img {
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      // }
    }
    .\/newBegin {
      background-image: url('@/assets/tab_1_1.png');
    }
    .\/rechargeRebate {
      background-image: url('@/assets/tab_2_1.png');
    }
    .\/giftBack {
      background-image: url('@/assets/tab_3_1.png');
    }
    .\/giveNumber {
      background-image: url('@/assets/tab_4_1.png');
    }
    .\/openingRank {
      background-image: url('@/assets/tab_5_1.png');
    }
  }
  .back-box {
    position: absolute;
    left: 0;
    top: 735px;
    width: 100%;
    height: 277px;
    background: url('@/assets/back.png') no-repeat left top/100% 100%;
  }
  .swiper-container-content {
    .swiper-slide-active {
      height: fit-content;
    }
    .swiper-wrapper {
      height: fit-content;
    }
  }
  // 底部文本
  .bottom-text {
    margin-top: 50px;
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
