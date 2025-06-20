<template>
  <div class="m1Vue">
    <div class="tabs_box flex position-relative justify-center" :class="`status${tabsArray.find(tab=>tab.path==$route.path).id}`">
      <div v-for="(tab, index) in tabsArray" :key="index" class="tabDiv position-relative h-100">
        <!--点击容器 防止图片过大导致点击范围冲突-->
        <div class="click-content h-100" @click.self="track(tab)"></div>
        <!--用于埋点上报-->
        <span class="position-absolute pointer-none position-center">{{tab.tabName}}</span>
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
        { id: 1, tabName: '玫瑰兑奖', path: '/m1/pointReward' },
        { id: 2, tabName: '充值有礼', path: '/m1/rechargeRebate' },
        { id: 3, tabName: '消费有礼', path: '/m1/presentGift' }
      ])
    }
  },
  methods: {
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {string} params.tabName 模块名称
     * @param {string} params.path 跳转路径
     */
    track(param) {
      if (param.path == this.$route.path) return
      this.$thinking.track('WebClick', { element: param.tabName, module: '爱神回馈' }) // 数数点击埋点
      this.$router.replace(param.path)
    }
  }
}
</script>

<style scoped lang="scss">
.m1Vue {
  .tabs_box {
    z-index: 1;
    padding-top: 25px;
    width: 745px;
    height: 123px;
    transition: background-image 0.1s ease-in-out;
    &.status1{
      background: url('@/pages/valentineDay/assets/mk1_tab1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/valentineDay/assets/mk1_tab2.png') no-repeat left top/100% 100%;
    }
    &.status3{
      background: url('@/pages/valentineDay/assets/mk1_tab3.png') no-repeat left top/100% 100%;
    }
    .tabDiv{
      width: 225px;
      height: 75px;
      //.click-content{}
      >span{
        color: transparent;
      }
    }
  }
}
</style>
