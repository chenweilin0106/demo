<template>
  <PopupBox title="title_14.png" @clickClose="clickClose">
    <template v-if="viewShowType == 1">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>奖励分为排名奖励和获胜阵营奖励</li>
          <li><span></span>排名奖励：获胜阵营前50名和失败阵营前10名</li>
          <li><span></span>获胜阵营奖励：<i>前11-200名中排名尾数为1和6的玩</i></li>
          <li><i>家，每人发放【霓虹旧梦】头饰+1天</i></li>
          <li>&ensp;</li>
          <li>排名奖励如下：</li>
        </ul>
      </div>
      <div class="img1"></div>
      <div class="img2"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>【繁花一梦】礼物价值1888钻石，仅钻石可赠送</li>
        </ul>
      </div>
    </template>
    <template v-else-if="viewShowType == 2">
      <div class="img3"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>若用户当前拥有【天际领主】时限称号，获得永久</li>
          <li>奖励后将自动升级为永久称号</li>
        </ul>
      </div>
    </template>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['viewShowType'],
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
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.img1{
  width: 554px;
  height: 671px;
  background: url('@/pages/618/assets/tk_38.png') no-repeat left top/100% 100%;
  margin: 0 auto 10px auto;
}
.img2{
  width: 554px;
  height: 456px;
  background: url('@/pages/618/assets/tk_41.png') no-repeat left top/100% 100%;
  margin: 0 auto 10px auto;
}
.img3{
  width: 554px;
  height: 481px;
  background: url('@/pages/618/assets/tk_40.png') no-repeat left top/100% 100%;
  margin: 0 auto 10px auto;
}
</style>
