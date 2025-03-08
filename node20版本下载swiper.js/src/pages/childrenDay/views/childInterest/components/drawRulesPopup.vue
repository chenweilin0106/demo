<template>
  <div class="compo">
    <PopupBox :title="'title_11.png'" @clickClose="clickClose">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>每消费200钻石即可打开童趣宝箱1次并随机</li>
          <li>获得奖励</li>
          <li><span></span>开出的彩虹币可用于兑换限定奖励</li>
        </ul>
      </div>
      <div class="img1"></div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'pickRulesPopup',
  props: [],
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
  .img1 {
    width: 551px;
    height: 640px;
    background: url('@/pages/childrenDay/assets/tk_5.png') no-repeat left top/100% 100%;
    margin: 10px auto 0 auto;
  }
}
</style>
