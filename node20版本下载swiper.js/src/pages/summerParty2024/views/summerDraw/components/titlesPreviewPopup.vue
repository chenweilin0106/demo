<template>
  <PopupBox :title="'title_17.png'" :size="'big'" @clickClose="clickClose">
    <div class="tip1">随机开出以下未拥有称号<br/>若全部已拥有则自动转化为500绿晶石~</div>
    <div class="rewardsListDiv">
      <div :class="['rewardItem', item.type == 'title' ? 'title' : 'other']" v-for="(item, index) in config" :key="index">
        <div :class="['itemIcon', item.has_right==1?'havend':null]">
          <PublicImg class="aaaa" :imgName="item.icon" :imgType="item.type"></PublicImg>
          <div class="price" v-if="item.has_right==1">已拥有</div>
        </div>
        <div class="name">{{ item.text }}</div>
      </div>
    </div>
  </PopupBox>
</template>

<script>

export default {
  name: 'TitlesPreviewPopup',
  props: ['config'],
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
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.topTipDiv{
  font-size: 26px;
  color: #FFFFFF;
  text-align: center;
  margin: 0px auto 10px auto;
}
.tip1{
  font-weight: 400;
  font-size: 28px;
  color: #FFFFFF;
  line-height: 36px;
  text-align: center;
  margin-bottom: 10px;
}
.rewardsListDiv {
  width: 100%;
  margin: 0px auto 0 auto;
  min-height: 200px;
  max-height: 800px;
  overflow: hidden scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  .rewardItem {
    height: 180px;
    padding: 15px 0 0 0;
    position: relative;
    display: flex;
    justify-content: center;
    &.title {
      width: 240px;
      .itemIcon {
        width: 218px;
        height: 128px;
      }
    }
    &.other {
      width: 160px;
      .itemIcon {
        width: 128px;
        height: 128px;
      }
    }
    .itemIcon{
      width: 218px;
      height: 128px;
      border: 2px solid #FBE590;
      border-radius: 12px;
      padding: 4px;
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: #fefaef;
      border-radius: 12px;
      pointer-events: none;
      &.havend::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.4); /* 白色半透明蒙版 */
        border-radius: 12px;
        z-index: 2;
      }
      .aaaa{
        z-index: 1;
      }
    }
    .name {
      color: #fff;
      white-space: nowrap;
      height: 25px;
      font-size: 26px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 0px;
    }
    .markIcon{
      background: linear-gradient(90deg, #FE6C45, #FFA442);
      border-radius: 19px;
      padding: 5px 15px;
      font-size: 22px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      right: 0px;
      top: -5px;
    }
    .price{
      background: #0D83E8;
      border-radius: 12px 0px 12px 0px;
      padding: 5px 15px;
      font-size: 22px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      left: -1px;
      top: -1px;
      z-index: 100;
      img{
        width: 27px;
        height: 20px;
      }
    }
  }
}
.btn {
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  margin: 20px auto 20px auto;
  font-size: 32px;
  color: #A9792C;
  line-height: 70px;
  text-align: center;
}
</style>
