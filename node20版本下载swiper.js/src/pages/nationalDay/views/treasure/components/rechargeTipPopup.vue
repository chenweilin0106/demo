<template>
  <PopupBox @clickClose="clickClose" :isBottom="false">
    <div class="tip">寻宝币不足，请进行充值</div>
    <div class="btn" @click="toRecharge">立即前往</div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rechargeTipPopup',
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
    },
    toRecharge() {
      this.$emit('addDrawTimesBtnCk')
      this.clickClose()
    }
  }
}
</script>

<style scoped lang="scss">
.tip{
  font-weight: 400;
  font-size: 32px;
  color: #FFFFFF;
  text-align: center;
}
.btn{
  width: 240px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  margin: 40px auto 0 auto;
  font-weight: 400;
  font-size: 32px;
  color: #A9792C;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
