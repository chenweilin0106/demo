<template>
  <div class="m1Vue">
    <div class="tabsDiv flex position-relative justify-center" :class="`status${activeTab}`">
      <div v-for="(tab, index) in tabsArray" :key="index" class="tabDiv" :class="activeTab === tab.id ? 'activeTabDiv' : ''">
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
        { id: 1, tabName: '罐头兑奖', path: '/m1/pointReward' },
        { id: 2, tabName: '充值有礼', path: '/m1/rechargeRebate' },
        { id: 3, tabName: '消费有礼', path: '/m1/presentGift' }
      ])
    }
  },
  computed: {
    activeTab() {
      for (let item of this.tabsArray) {
        if (this.$route.path.includes(item.path)) return item.id
      }
      return 0
    }
  },
  methods: {
    /**
     * 切换模块
     */
    track(param) {
      console.log('宠爱献礼切换模块', param)
      if (this.$route.path.includes(param.path)) return console.log(`已处于${param.tabName}模块`)
      this.$thinking.track('WebClick', { element: param.tabName, module: '宠爱献礼' }) // 数数点击埋点
      this.$router.replace(param.path)
    }
  }
}
</script>

<style scoped lang="scss">
.m1Vue {
  .tabsDiv {
    margin-top: -306px;
    margin-bottom: 294px;
    z-index: 1;
    //padding-top: 25px;
    width: 750px;
    height: 97px;
    //background-color: #fff;
    transition: background-image 0.3s ease-in-out;
    &.status1{
      //background: url('@/assets/mk1_tab1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      //background: url('@/assets/mk1_tab2.png') no-repeat left top/100% 100%;
    }
    &.status3{
      //background: url('@/assets/mk1_tab3.png') no-repeat left top/100% 100%;
    }
    .tabDiv{
      top: 0;
      width: 244px;
      height: 97px;
      background: no-repeat left top/100% 100%;
      transition: background-image 0.3s ease-in-out;
      //.click-content{}
      &:nth-child(1){
        left: 10px;
        background-image: url('@/assets/mk1_tab1_1.png');
        &.activeTabDiv {
          background-image: url('@/assets/mk1_tab1.png');
        }
      }
      &:nth-child(2){
        left: 253px;
        background-image: url('@/assets/mk1_tab2_1.png');
        &.activeTabDiv {
          background-image: url('@/assets/mk1_tab2.png');
        }
      }
      &:nth-child(3){
        left: 497px;
        background-image: url('@/assets/mk1_tab3_1.png');
        &.activeTabDiv {
          background-image: url('@/assets/mk1_tab3.png');
        }
      }
      >span{
        color: transparent;
      }
    }
  }
}
</style>
