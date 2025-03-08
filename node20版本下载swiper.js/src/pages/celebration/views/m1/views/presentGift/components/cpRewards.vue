<template>
  <OutBox class="cpRewards position-relative" title="mk1_title_5.png">
    <img :src="IconPath('mk2_3.png')" class="celebrationLabel position-absolute" />
    <div class="list flex align-center justify-center">
      <div class="award flex-column" v-for="(item, index) in cpRewardsData.awards" :key="index">
        <div class="icon flex align-center justify-center"><PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" /></div>
        <div class="text flex-1 flex align-center justify-center line-height-100">{{ item.text }}</div>
      </div>
    </div>
    <PublicButton class="button margin-row-center" :hasRight="cpRewardsData.has_right" @click="receiveRobRewards" />
    <img :src="IconPath('mk3_6.png')" class="line block" />
    <div class="rules-text">
      <ul>
        <li><span></span>活动期间求婚并登记成功的，夫妻双方可领取【结</li>
        <li>婚贺礼】</li>
        <li><span></span>每人只能领取一次</li>
      </ul>
    </div>
    <CongratsGetPopup v-if="isShowCongratsGetPopup" :list="congratsGetPopupData" @clickClose="isShowCongratsGetPopup = false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
import CongratsGetPopup from '@/pages/celebration/components/congratsGetPopup.vue'
export default {
  name: 'cpRewards', // CP贺礼
  props: ['cpRewardsData'],
  components: { CongratsGetPopup },
  data() {
    return {
      congratsGetPopupData: [],
      isShowCongratsGetPopup: false
    }
  },
  methods: {
    receiveRobRewards: _throttle(async function() {
      if (this.award_list[0].has_right != 1) return
      const res = await getPageData({ type: 'white_gift_receive', mark: this.award_list[0].key })
      if (res.errno) return this.$toast(res.errmsg)
      this.congratsGetPopupData = [res.data.awards]
      this.isShowCongratsGetPopup = true
      this.$emit('update')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.cpRewards {
  position: relative;
  .celebrationLabel {
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
      background-color: #BDA2FA; /*todo 边框颜色*/
      border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      padding: $borderWidth;
      .icon {
        width: 100%;
        height: 112px;
        background: linear-gradient(0deg, #FFFFFF, #EECEFF);
        border-radius: $radius $radius 0 0;
        .mic {
          width: 102px;
          height: 105px;
        }
      }
      .text {
        width: 100%;
        font-size: 28px;
        background-color: #7954E4; /*todo 文字背景色*/
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
    &.button-noFinish {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/celebration/assets/mk2_20.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-receive {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/celebration/assets/mk2_21.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
    &.button-finish {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: url('@/pages/celebration/assets/mk2_22.png') no-repeat left top/100% 100%; /*todo 未完成状态按钮背景色*/
    }
  }
}
</style>
