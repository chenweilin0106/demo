<template>
  <div class="compo">
    <PopupBox :title="'title_11.png'" @clickClose="clickClose">
      <div class="img1"></div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'srtarRulesPopup',
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
    width: 555px;
    height: 439px;
    background: url('@/pages/520/assets/tk_18.png') no-repeat left top/100% 100%;
    margin: 10px auto 0 auto;
  }
}
</style>
