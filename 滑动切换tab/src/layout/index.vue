<template>
  <div class="layoutPage position-relative">
    <div class="banner w-100"></div>
    <div class="tab flex justify-center position-relative margin-row-center">
      <img :src="IconPath(currentTabIcon)" class="tabImg w-100 h-100 position-absolute" />
      <div class="openVip position-relative" @click="switchTab('开卡有礼', 0)">开卡有礼</div>
      <div class="enjoyBenefits position-relative" @click="switchTab('尊享权益', 1)">尊享权益</div>
      <div class="limitExchange position-relative" @click="switchTab('限定兑换', 2)">限定兑换</div>
    </div>
    <van-swipe
      ref="layoutSwipe"
      class="layoutSwipe"
      :show-indicators="false"
      :lazy-render="true"
      :loop="false"
      :touchable="false"
      @change="changeSwipe"
    >
      <van-swipe-item><OpenVip ref="openVip" :class="active == 0 ? 'swipeActive' : 'noActive'"></OpenVip></van-swipe-item>
      <van-swipe-item><EnjoyBenefits ref="enjoyBenefits" :class="active == 1 ? 'swipeActive' : 'noActive'"></EnjoyBenefits></van-swipe-item>
      <van-swipe-item><LimitExchange ref="limitExchange" :class="active == 2 ? 'swipeActive' : 'noActive'"></LimitExchange></van-swipe-item>
    </van-swipe>
    <!-- 底部文本 -->
    <div class="bottomText position-absolute position-row-center">
      <p class="row1 line-height-100 text-nowrap text-center">
        <img :src="IconPath('mk1_18.png')" class="leftIcon position-absolute" />活动由本公司组织并提供奖品<img
          :src="IconPath('mk1_19.png')"
          class="rightIcon position-absolute"
        />
      </p>
      <p class="row2 line-height-100 text-nowrap text-center">活动最终解释权归蛋蛋所有</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { compareVersions } from '@/utils/toApp'
const OpenVip = () => import('@/views/OpenVip/index.vue')
const EnjoyBenefits = () => import('@/views/EnjoyBenefits/index.vue')
const LimitExchange = () => import('@/views/LimitExchange/index.vue')

export default {
  name: 'layoutPage',
  components: { OpenVip, EnjoyBenefits, LimitExchange },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version']),
    currentTabIcon() {
      return this.active === 0 ? 'tab_1.png' : this.active === 1 ? 'tab_2.png' : 'tab_3.png'
    }
  },
  data() {
    return {
      active: 0,
      tabRefMap: {
        0: 'openVip',
        1: 'enjoyBenefits',
        2: 'limitExchange'
      }
    }
  },
  async created() {
    this.$store.commit('getAppData', window.location.search.substring(1)) // 获取地址栏参数
    if (compareVersions('5.6.4') == -1) this.$thinking.login(this.uid) // 低版本需手动携带account_id上报
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
  },
  methods: {
    changeSwipe(index) {
      this.active = index
      console.log(this.tabRefMap[index])
      // this.$refs[this.tabRefMap[index]].getPageData() // 发送数据请求
    },
    /**
     * 切换tab
     * @param {String} module 模块名
     */
    switchTab(module, index) {
      this.track(module)
      this.$refs.layoutSwipe.swipeTo(index)
    },
    /**
     * 数数点击埋点
     * @param {String} module 模块名
     */
    track(module) {
      this.$thinking.track('WebClick', { element: '模块选择', module })
    }
  }
}
</script>

<style scoped lang="scss">
.swipeActive {
  height: fit-content !important; // 激活状态下高度自适应
}
.noActive {
  height: 1px !important; // 为了让底部文本紧靠当前激活的轮播 而不是靠高度最大的轮播
}
.layoutSwipe {
  padding-bottom: 20px; // 底部留出多余空间，防止额外样式被溢出隐藏
}
.layoutPage {
  background-image: url('@/assets/back.png');
  background-size: 100% 100%;
  padding-bottom: 140px;
  .banner {
    height: 631px;
    background: url('@/assets/banner.png') no-repeat left top/100% 100%;
  }
  .tab {
    margin-top: -98px;
    margin-bottom: 30px;
    width: 713px;
    height: 102px;
    padding: 0 13px;
  }
  .openVip,
  .enjoyBenefits,
  .limitExchange {
    z-index: 1;
    flex: 1;
    height: 90px;
    //background-color: #fff;
    border-radius: 84px;
    color: transparent;
  }
  .bottomText {
    bottom: 53px;
    .row1 {
      padding: 0 2px;
      margin-bottom: 11px;
      font-weight: 500;
      font-size: 32px;
      background: linear-gradient(0deg, #e68220 0%, #fbaa3d 100%) no-repeat;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      .leftIcon,
      .rightIcon {
        top: -2px;
        width: 66px;
        height: 55px;
      }
      .leftIcon {
        left: -73px;
      }
      .rightIcon {
        right: -73px;
      }
    }
    .row2 {
      font-weight: 500;
      font-size: 22px;
      color: #f09a36;
    }
  }
}
</style>
