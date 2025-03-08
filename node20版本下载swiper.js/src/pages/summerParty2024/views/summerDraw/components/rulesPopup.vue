<template>
  <div class="compo">
    <PopupBox :title="'title_10.png'" :size="'big'" @clickClose="clickClose">
      <div class="img1"></div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'rulesPopup',
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
  .img1{
    width: 555px;
    height: 694px;
    background: url('@/pages/summerParty2024/assets/tk_14.png') no-repeat left top/100% 100%;
    margin: 0 auto;
  }
}
</style>
