<template>
  <div class="layoutPage">
    <!-- 顶部banner图 -->
    <div class="banner-content"></div>
    <div class="back-box"></div>
    <!-- tabs盒子 -->
    <van-tabs
      v-model="active"
      swipe-threshold="3"
      :animated="animated"
      class="tabs-content"
    >
      <van-tab
        v-for="tab in tabsArray"
        :key="tab.tabName"
        title-class="tab-content"
        :name="tab.tabName"
      >
        <template #title>
          <div class="click-box" @click.self="track(tab)"></div>
          <img
            :src="IconPath(tab.tabName == active ? tab.activeIcon : tab.icon)"
          />
          {{ tab.tabName }}
        </template>
        <NewBegin v-if="tab.tabName == '新服启程'" />
        <GiftBack v-else-if="tab.tabName == '礼尚往来'" />
        <GiveNumber v-else-if="tab.tabName == '首发靓号'" />
        <RechargeRebate v-else-if="tab.tabName == '充值有礼'" />
        <OpeningRank v-else />
        <!--        <router-view></router-view>-->
        <!-- 底部文本 -->
        <div class="bottom-text">
          <p>活动由本公司组织并提供奖品</p>
          <p>与苹果公司无关</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NewBegin from '@/views/NewBegin/index.vue'
import GiftBack from '@/views/GiftBack/index.vue'
import GiveNumber from '@/views/GiveNumber/index.vue'
import RechargeRebate from '@/views/RechargeRebate/index.vue'
import OpeningRank from '@/views/OpeningRank/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'layoutPage',
  data() {
    return {
      animated: false,
      active: '新服启程',
      // 模块数组
      tabsArray: Object.freeze([
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
        },
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
        }
      ])
    }
  },
  components: {
    NewBegin,
    GiftBack,
    GiveNumber,
    RechargeRebate,
    OpeningRank
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'appVersion'])
  },
  mounted() {
    // 低版本需手动携带account_id上报
    if (this.appVersion && this.appVersion < 564) {
      this.$thinking.login(this.uid)
    }
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', {
      referal_source: this.referal_source
    })
    this.animated = true
  },
  methods: {
    // 切换模块
    track(params) {
      // const { tabName, to } = params
      const { tabName } = params
      this.tabActive = module
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          tabName
        }
      )
      // this.$router.replace(to)
    }
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;
  ::v-deep .van-tabs__line {
    display: none;
  }
  ::v-deep .van-tabs__content {
    overflow: visible !important;
  }
  // 顶部banner图
  .banner-content {
    width: 100%;
    height: 804px;
    background: url('@/assets/banner.png') no-repeat left top/100% 100%;
  }
  ::v-deep .van-tab--active {
    margin-top: 60px;
    //margin-left: 9px;
    //margin-right: 14px;
    transition: all 0.3s;
  }
  // tabs盒子
  .tabs-content {
    position: relative;
    z-index: 2;
    margin-top: -125px;
    width: 100%;
    height: 337px;
    //display: flex;
    //align-items: center;
    ::v-deep .van-tabs__wrap {
      height: 100%;
    }

    ::v-deep .van-tabs__nav {
      background-color: transparent;
    }

    ::v-deep .tab-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 191px;
      font-size: 28px;
      color: transparent;
      flex-shrink: 0;

      .click-box {
        position: absolute;
        z-index: 2;
        top: 50px;
        left: 15px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    //.tab-content:nth-of-type(1) {
    //  margin-left: 32px;
    //}
    //
    //.tab-content:nth-of-type(2) {
    //  margin-left: 85px;
    //}
    //
    //.tab-content:nth-of-type(3) {
    //  margin-left: 76px;
    //}
    //
    //.tab-content:nth-of-type(4) {
    //  margin-left: 156px;
    //  margin-top: -44px;
    //}
    //
    //.tab-content:nth-of-type(5) {
    //  margin-left: 85px;
    //  margin-top: -44px;
    //}

    .tab-active {
      font-weight: 500;
      color: #ffffff;
      background: url('@/assets/tab_1.png') no-repeat left top/100% 100%;
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
