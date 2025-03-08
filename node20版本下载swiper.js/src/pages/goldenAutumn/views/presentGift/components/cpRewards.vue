<template>
  <OutBox class="cpRewards position-relative" title="title_4.png" has-costume>
    <img :src="IconPath('mk3_2.png')" class="left position-absolute pointer-none" />
    <img :src="IconPath('mk3_3.png')" class="right position-absolute pointer-none" />
    <div class="list flex align-center justify-center">
      <div class="award flex-column" v-for="(item, index) in cpRewardsData.awards" :key="index">
        <div class="icon flex align-center justify-center"><PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" /></div>
        <div class="text flex-1 flex align-center justify-center line-height-100">{{ item.text }}</div>
      </div>
    </div>
    <PublicButton class="button margin-row-center" :hasRight="cpRewardsData.has_right" @click="$emit('cpRewardsClick')" />
    <div class="rules-text-border">
      <ul>
        <li><span></span>活动期间求婚并登记成功的，夫妻双方可领取【七</li>
        <li>夕结婚贺礼】</li>
        <li><span></span>每人只能领取一次</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: ['cpRewardsData'],
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.cpRewards {
  position: relative;
  .left {
    z-index: 1;
    top: 11px;
    left: -11px;
    width: 167px;
    height: 579px;
  }
  .right {
    z-index: 1;
    top: -4px;
    right: -6px;
    width: 164px;
    height: 572px;
  }
  .list {
    .award {
      $radius: 12px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框宽度*/
      width: 160px + $borderWidth * 2; /*todo 宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
      height: 160px + $borderWidth * 2; /*todo 高度 蓝湖上选区不包括边框 所以加上边框宽度*/
      background-color: #99C1FD; /*todo 边框颜色*/
      border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      padding: $borderWidth;
      .icon {
        width: 100%;
        height: 112px;
        background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
        border-radius: $radius $radius 0 0;
        .mic {
          width: 102px;
          height: 105px;
        }
      }
      .text {
        width: 100%;
        font-size: 28px;
        background-color: #4F72D5;
        border-radius: 0 0 $radius $radius;
      }
      &:nth-child(2) {
        margin-left: 56px - $borderWidth * 2; /*todo 中间间距 蓝湖上选区不包括边框 所以加上边框宽度*/
      }
    }
  }
  .button {
    margin-top: 13px; /*todo 按钮距离奖励列表的间距*/
    margin-bottom: 6px; /*todo 按钮距下方文本的间距*/
    width: 316px; /*todo*/
    height: 109px; /*todo*/
    font-size: 32px;
    box-shadow: none; /*todo 去除publicButton自带阴影*/
    &.button-noFinish {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/goldenAutumn/assets/mk2_19.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-receive {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/goldenAutumn/assets/mk2_20.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-finish {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/goldenAutumn/assets/mk2_21.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
  }
}
</style>
