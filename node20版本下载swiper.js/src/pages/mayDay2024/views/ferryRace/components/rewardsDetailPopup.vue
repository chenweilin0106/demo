<template>
  <PopupBox :title="'title_13.png'" @clickClose="clickClose">
    <template v-if="config.type==1">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>榜单规则</li>
          <li>个人日榜为玩家每日新增里程排行榜，分服</li>
          <li>统计。</li>
          <li><span></span>个人日榜奖励如下</li>
        </ul>
      </div>
      <div class="img1"></div>
    </template>
    <template v-else-if="config.type==2">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>榜单规则</li>
          <li>家族日榜为<i>全服家族</i>每日<i>新增里程</i>排行榜，</li>
          <li>根据家族等级分为3组</li>
        </ul>
      </div>
      <div class="img2"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>家族日榜奖励如下</li>
        </ul>
      </div>
      <div :class="['img3', `img${config.group}`]"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>注意事项</li>
          <li>&emsp;<em></em>中途退出家族不会扣除对原家族的贡献，</li>
          <li>&emsp;加入新家族后<i>重新累计</i>新获得的里程</li>
          <li>&emsp;<em></em><i>仅有结算时家族获奖且留在家族</i>的玩家才</li>
          <li>&emsp;能获得奖励</li>
          <li>&emsp;<em></em><i>族长/副族奖励规则同上</i>，仅有结算时家族</li>
          <li>&emsp;获奖且为族长/副族身份才能获得奖励</li>
        </ul>
      </div>
    </template>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      isShowPo: true
    }
  },
  computed: {},
  mounted() {},
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
.img1 {
  width: 551px;
  height: 462px;
  background: url('@/pages/mayDay2024/assets/tk_6.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
.img2 {
  width: 551px;
  height: 273px;
  background: url('@/pages/mayDay2024/assets/tk_7.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
.img3{
  width: 551px;
  height: 432px;
  margin: 10px auto;
  &.imgA{
    background: url('@/pages/mayDay2024/assets/tk_8.png') no-repeat left top/100% 100%;
  }
  &.imgB{
    background: url('@/pages/mayDay2024/assets/tk_9.png') no-repeat left top/100% 100%;
  }
  &.imgC{
    background: url('@/pages/mayDay2024/assets/tk_10.png') no-repeat left top/100% 100%;
  }
  &.imgD{
    background: url('@/pages/mayDay2024/assets/tk_11.png') no-repeat left top/100% 100%;
  }
}
</style>
