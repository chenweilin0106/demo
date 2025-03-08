<template>
  <PopupBox title="title_15.png" @clickClose="clickClose">
    <div class="tip text-center">随机开出以下未拥有称号<br>若全部已拥有则自动转化为500绿晶石</div>
    <div class="listMain flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative">
          <div class="iconMain">
            <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
          </div>
          <div v-if="item.owned" class="hasLabel position-absolute line-height-100 flex align-center justify-center text-nowrap">已拥有</div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.tip {
  font-size: 28px;
  color: #FFFFFF;
  line-height: 36px;
}
.listMain {
  width: 100%;
  padding: 32px 0 0;
  .award {
    $awardSize: 188px;
    width: $awardSize;
    margin-bottom: 13px;
    .icon {
      height: 128px;
      $radius: 16px;
      $borderWidth: 4px;
      border-radius: $radius;
      background-color: #E06224;
      padding: 4px;
      .hasLabel {
        top: 0;
        left: 0;
        width: 78px;
        height: 34px;
        background: #1E9DA1;
        border-radius: $radius 0 12px 0;
        font-weight: 500;
        font-size: 22px;
        color: #FFFFFF;
      }
      .iconMain {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: $radius - $borderWidth;
        overflow: hidden;
      }
    }
    .text {
      margin-top: 14px;
      font-size: 24px;
      color: #ffffff;
    }
    &:nth-child(even) {
      margin-left: 60px;
    }
  }
}
</style>
