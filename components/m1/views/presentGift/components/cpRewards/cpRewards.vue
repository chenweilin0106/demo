<template>
  <OutBox class="cpRewards position-relative" title="mk1_title_5.png">
    <!--<img :src="IconPath('mk2_3.png')" class="springFestivalLabel position-absolute" />-->
    <div class="list flex align-center justify-center">
      <div class="award flex-column" v-for="(item, index) in config.marriage_gift.awards" :key="index">
        <div class="icon flex align-center justify-center position-relative">
          <!--<img :src="IconPath('mk2_23.png')" class="bottomLabel position-absolute" />-->
          <PublicImg :class="item.type" :imgName="item.type=='mic'?config.user_gender==0?'ts_adgb_blue.svga':'ts_adgb_pink.svga':item.icon" :imgType="item.type" />
        </div>
        <div class="text flex-1 flex align-center justify-center line-height-1">{{ item.show_text }}</div>
      </div>
    </div>
    <PublicButton class="button margin-row-center" :hasRight="config.marriage_gift.has_right" @click="receiveRobRewards" />
    <img :src="IconPath('mk3_1.png')" class="line block" />
    <div class="rules-text">
      <ul>
        <li><span></span>活动期间求婚并登记成功的，夫妻双方可领取【结</li>
        <li>婚贺礼】</li>
        <li><span></span>每人只能领取一次</li>
      </ul>
    </div>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import ReceivePopup from '@/pages/springFestival/components/receivePopup.vue'

export default {
  name: 'cpRewards', // CP贺礼
  props: ['config'],
  components: { ReceivePopup },
  data() {
    return {
      configReceivePopup: [],
      isShowReceivePopup: false
    }
  },
  methods: {
    async receiveRobRewards() {
      const res = await getPageData({ type: 'marriage_gift_receive' })
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = this.config.marriage_gift.awards
      this.isShowReceivePopup = true
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
.cpRewards {
  position: relative;
  .springFestivalLabel {
    width: 167px;
    height: 159px;
    top: -68px;
    right: 88px;
  }
  .list {
    .award {
      $radius: 12px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框宽度*/
      width: 160px + $borderWidth * 2; /*todo 宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
      height: 160px + $borderWidth * 2; /*todo 高度 蓝湖上选区不包括边框 所以加上边框宽度*/
      background-color: #53AFDF; /*todo 边框颜色*/
      border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      padding: $borderWidth;
      .icon {
        width: 100%;
        height: 112px;
        background: linear-gradient(180deg, #FFF3CE, #FFFFFF);
        border-radius: $radius $radius 0 0;
        .bottomLabel {
          z-index: 2;
          bottom: -4px;
          right: -13px;
          width: 77px;
          height: 36px;
        }
        .mic {
          width: 108px;
          height: 108px;
        }
      }
      .text {
        width: 100%;
        font-size: 28px;
        background-color: #397DC3; /*todo 文字背景色*/
        border-radius: 0 0 $radius $radius;
      }
      &:nth-child(2) {
        margin-left: 56px - $borderWidth * 2; /*todo 中间间距 蓝湖上选区不包括边框 所以加上边框宽度*/
      }
    }
  }
  .line {
    margin: 5px 0 12px 23px;
    width: 704px;
    height: 31px;
  }
  .button {
    margin-top: 13px; /*todo 按钮距离奖励列表的间距*/
    margin-bottom: 6px; /*todo 按钮距下方文本的间距*/
    width: 304px; /*todo*/
    height: 93px; /*todo*/
    font-size: 32px;
    border: none; /*todo 去除publicButton自带阴影*/
    pointer-events: none;
    color: #fff;
    &.button-noFinish {
      background: url('@/pages/springFestival/assets/mk2_32.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-receive {
      pointer-events: auto;
      background: url('@/pages/springFestival/assets/mk2_33.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-finish {
      background: url('@/pages/springFestival/assets/mk2_34.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
  }
}
</style>
