<template>
  <PopupBox title="tk_title_1.png" size="2" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span><i>【玩法】</i>投入指定数量的钻石至招财猫，有</li>
        <li>机会获得更多钻石或者等量<img :src="IconPath('mk1_10.png')" class="pointIcon" />【圣诞币】</li>
        <li class="empty"></li>
        <li><span></span><i>【圣诞币】</i><img :src="IconPath('mk1_10.png')" class="pointIcon" />圣诞币用于兑换活动奖励</li>
        <li class="empty"></li>
        <li><span></span><i>【招财喵喵】</i>每天首次启动免费，随后每次</li>
        <li>启动需消耗1次启动次数，每次需投入200钻</li>
        <li>石，有机会获得1.2-2倍钻石或200圣诞币</li>
        <li class="empty"></li>
        <li><span></span><i>【暴富喵喵】</i>每次启动需消耗4次启动次数，</li>
        <li>每次需投入1000钻石，有机会获得1.5-2.5</li>
        <li>倍钻石或1000圣诞币</li>
      </ul>
    </div>
    <img :src="IconPath('tk_1.png')" class="table" />
    <img :src="IconPath('tk_2.png')" class="table" />
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  data() {
    return {
    }
  },
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
.table{
  display: block;
  margin: 20px auto 0;
  width: 544px;
}
</style>
