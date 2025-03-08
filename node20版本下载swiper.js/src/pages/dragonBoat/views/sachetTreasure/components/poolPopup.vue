<template>
  <div class="compo">
    <PopupBox :title="'title_10.png'" @clickClose="clickClose">
      <div class="img1" v-if="pool_level == 1"></div>
      <div class="img11" v-else-if="pool_level == 2"></div>
      <div class="img2" v-else></div>
      <div class="rulesBg">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>【锦鲤】说明：获得当前奖池全部奖励并自动解锁</li>
            <li>下一等级</li>
          </ul>
        </div>
      </div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'poolPopup',
  props: ['pool_level'],
  components: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .img1{
    width: 555px;
    height: 628px;
    background: url('@/pages/dragonBoat/assets/tk_25.png') no-repeat left top/100% 100%;
    margin: 0 20px;
  }
  .img11{
    width: 555px;
    height: 628px;
    background: url('@/pages/dragonBoat/assets/tk_25_1.png') no-repeat left top/100% 100%;
    margin: 0 20px;
  }
  .img2{
    width: 555px;
    height: 628px;
    background: url('@/pages/dragonBoat/assets/tk_26.png') no-repeat left top/100% 100%;
    margin: 0 20px;
  }
  .rulesBg{
    background: #CEB560;
    border-radius: 20px;
    margin: 20px 5px 0 5px;
  }
}
</style>
