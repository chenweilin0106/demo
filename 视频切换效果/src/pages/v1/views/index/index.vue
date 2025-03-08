<template>
  <div class="index_page">
    <!-- banner图 -->
    <div class="banner"></div>
    <!-- tab栏 -->
    <div
      class="tab"
      :class="{ tab_bgc: $route.path === '/index/priorityExperience' }"
    >
      <router-link
        replace
        to="inforShow"
        class="left"
        @click.native="track($event, '情报公开')"
      ></router-link>
      <router-link
        replace
        to="priorityExperience"
        class="right"
        @click.native="track($event, '抢先体验')"
      ></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  destroyed() {},
  computed: {},
  watch: {},
  async created() {},
  methods: {
    // 点击埋点
    track(e, module) {
      this.$sensors.quick('trackAllHeatMap', e.target, {
        module,
        activity_date: '20230420',
        element: '模块选择'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.index_page {
  // 顶部banner图
  .banner {
    width: 100%;
    height: 423px;
    background: url('../../assets/banner.png') no-repeat;
    background-size: 100%;
  }
  // tab栏背景切换
  .tab_bgc {
    background: url('../../assets/tab2.png') no-repeat !important;
    background-size: 100% !important;
    background-position: center center !important;
  }
  // tab栏
  .tab {
    position: relative;
    margin: -40px auto 0;
    z-index: 99;
    width: 320px;
    height: 80px;
    background: url('../../assets/tab1.png') no-repeat;
    background-size: 100%;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    .right,
    .left {
      width: 140px;
      height: 44px;
    }
    .left {
      clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%);
    }
    .right {
      clip-path: polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%);
    }
  }
}
</style>
