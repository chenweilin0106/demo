<template>
  <PopupBox title="title_13.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每次制作必得月饼，有概率获得随机奖励</li>
      </ul>
    </div>
    <img :src="IconPath('tk_14.png')" class="tableImg1 block margin-row-center" />
    <img :src="IconPath('tk_15.png')" class="tableImg2 block margin-row-center" />
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.rules-text-popup {
  //margin-left: 60px;
}
.tableImg1 {
  margin-top: 10px;
  width: 554px;
}
.tableImg2 {
  margin-top: 20px;
  width: 554px;
}
</style>
