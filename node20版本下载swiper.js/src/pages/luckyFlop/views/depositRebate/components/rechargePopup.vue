<template>
  <PopupBox @clickClose="clickClose">
    <div :class="['main']">
      <div class="tip1">开启次数不足，请前往充值</div>
      <div class="cancel" @click="clickClose">我再想想</div>
      <div class="confirm" @click="confirmCk">立即前往</div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      isShowPo: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 弹窗关闭
     */
    clickClose() {
      this.$emit('closePopups')
    },
    /**
     * 前往充值
     */
    confirmCk() {
      this.$emit('closePopups')
      this.$emit('handleRecharge')
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: calc(100% - 80px);
  // background-color: red;
  position: absolute;
  left: 0;
  top: 50px;
  text-align: center;
  text-align: -webkit-center;
  color: #fff;
  // overflow-y: scroll;
  .tip1{
    white-space: nowrap;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 60px;
  }
  .cancel {
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #F599FF, #8A6AF3);
    border-radius: 36px;
    border: 2px solid #F9C9FF;
    font-size: 32px;
    color: #fff;
    line-height: 72px;
    position: absolute;
    left: 27%;
    transform: translate(-50%);
    bottom: 30px;
  }
  .confirm {
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 36px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    font-size: 32px;
    color: #4A50D1;
    line-height: 72px;
    position: absolute;
    left: 73%;
    transform: translate(-50%);
    bottom: 30px;
  }
}
</style>
