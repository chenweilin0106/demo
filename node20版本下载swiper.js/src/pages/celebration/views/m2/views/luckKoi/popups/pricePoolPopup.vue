<template>
  <PopupBox title="mk2_title_12.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每张刮刮乐包含奖励份数的概率：</li>
      </ul>
    </div>
    <img :src="IconPath('tk_44.png')" class="awardTable table1 margin-row-center block" />
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每份奖励包含道具的概率：</li>
      </ul>
    </div>
    <img :src="IconPath('tk_45.png')" class="awardTable block" />
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {
      mark: 1
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 617 + 278 - 274;
}
.tab {
  width: 432px;
  height: 65px;
  background: url('@/pages/celebration/assets/tk_46.png') no-repeat left top/100% 100%;
  margin-bottom: 23px;
  &.active {
    background: url('@/pages/celebration/assets/tk_47.png') no-repeat left top/100% 100%;
  }
}
.rules-text-popup {
  li {
    line-height: 36px;
  }
  .empty {
    height: 36px;
  }
}
.awardTable {
  margin: 17px auto;
  width: 554px;
}
.table1 {
  width: 346px;
  height: 375px;
}
</style>
