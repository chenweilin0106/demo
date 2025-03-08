<template>
  <div class="FreeGift">
    <!--tab-->
    <div class="tab_box">
      <div
        class="newYear_pointReward_tab flex-center"
        :class="{ current_tab: $route.path === '/newYearGift/pointReward' }"
        @click="track('鞭炮兑奖', '/newYearGift/pointReward')"
      >
        <div class="tab-icon"></div>
        <span>鞭炮兑奖</span>
      </div>
      <div
        class="newYear_rechargeRebate_tab flex-center"
        :class="{ current_tab: $route.path === '/newYearGift/rechargeRebate' }"
        @click="track('充值有礼', '/newYearGift/rechargeRebate')"
      >
        <div class="tab-icon"></div>
        <span>充值有礼</span>
      </div>
      <div
        class="newYear_consumeGift_tab flex-center"
        :class="{ current_tab: $route.path === '/newYearGift/consumeGift' }"
        @click="track('消费有礼', '/newYearGift/consumeGift')"
      >
        <div class="tab-icon"></div>
        <span>消费有礼</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'FreeGift',
  data() {
    return {}
  },
  methods: {
    // 切换模块
    track(element, path) {
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element,
          module: '年度有礼'
        }
      )
      if (this.$route.path != path) this.$router.replace(path)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.FreeGift {
  position: relative;
  z-index: 4;

  .tab_box {
    margin: -140px auto 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 710px;
    //padding: 11px 9px 11px 10px;
    padding: 0 27px;
    .newYear_pointReward_tab,
    .newYear_rechargeRebate_tab,
    .newYear_consumeGift_tab {
      width: 181px;
      height: 187px;
      background: url('../../assets/tab_1_1.png') no-repeat left top/100% 100%;

      > span {
        position: absolute;
        opacity: 0;
      }
    }

    .current_tab {
      //margin-left: 18px;
      font-weight: 500 !important;
      color: #ffffff !important;
      background: url('../../assets/tab_1.png') no-repeat left top/100% auto !important;
    }

    .newYear_pointReward_tab {
      .tab-icon {
        width: 63px;
        height: 67px;
        background: url('@/pages/springFestival/assets/tab_2.png') no-repeat
          left top/100% 100%;
      }
    }

    .newYear_rechargeRebate_tab {
      .tab-icon {
        width: 65px;
        height: 67px;
        background: url('@/pages/springFestival/assets/tab_3.png') no-repeat
          left top/100% 100%;
      }
    }

    .newYear_consumeGift_tab {
      .tab-icon {
        width: 64px;
        height: 67px;
        background: url('@/pages/springFestival/assets/tab_4.png') no-repeat
          left top/100% 100%;
      }
    }
  }
}
</style>
