<template>
  <OutBox class="cpRewards" title="新婚贺礼" left right>
    <div class="list flex align-center">
      <div class="award flex-column position-relative" v-for="(item, index) in config.marriage_gift.awards" :key="index">
        <div v-if="item.type === 'CP_card'" class="typeLabel flex align-center justify-center pointer-none position-absolute line-height-1">CP资料卡</div>
        <div class="icon flex align-center justify-center position-relative">
          <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text flex-1 flex align-center justify-center line-height-1">{{ item.id === 'gamegold' ? `元宝${item.show_text}` : item.show_text }}</div>
      </div>
    </div>
    <p class="desc position-absolute text-center">
      活动期间求婚<van-popover v-model="showPopover" trigger="click" placement="top" :get-container="''" :close-on-click-outside="true" class="tipBubble">
        <div class="popoverMain" @click.stop>夫妻双方可领，<br>每人只能领取1次</div>
        <template #reference>
          <div class="tipBubbleBtn"></div>
        </template>
      </van-popover><br>并登记成功
    </p>
    <div class="button" :class="`status${config.marriage_gift.has_right}`" @click="receive">
      {{ config.marriage_gift.has_right == 1 ? '领取' : config.marriage_gift.has_right == 2 ? '已领取' : '未完成' }}
    </div>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import ReceivePopup from './popups/receivePopup.vue'

export default {
  name: 'cpRewards', // CP贺礼
  props: ['config'],
  components: { ReceivePopup },
  data() {
    return {
      showPopover: false,
      configReceivePopup: [],
      isShowReceivePopup: false
    }
  },
  methods: {
    /**
     * 领取新婚贺礼
     */
    async receive() {
      console.log('领取新婚贺礼')
      if (this.config.marriage_gift.has_right != 1) return
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
.outBox.cpRewards {
  position: relative;
  //height: 143px + 149px + 145px;
  .tipBubble {
    position: absolute;
    z-index: 2;
    right: -36px;
    top: 3px;
    display: block;
    //vertical-align: middle;
    //display: inline-flex;
    width: 32px;
    height: 32px;
    background: url('@/pages/520/assets/mk1_17.png') no-repeat left top/100% 100%; // 气泡按钮
  }
  ::v-deep .van-popover {
    top: -93px !important; // 气泡相对于按钮的顶部位置
    max-height: none !important;
    .van-popover__content {
      width: fit-content;
      height: fit-content;
      background: none;
      box-shadow: none;
      overflow: visible;
      .popoverMain {
        margin-left: -88px; // 气泡相对于按钮的左侧位置
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 29px;
        width: 174px;
        height: 93px;
        background: url('@/pages/520/assets/mk1_18.png') no-repeat left top/100% 100%; // 气泡文本背景
        padding: 0 10px 13px;
        white-space: nowrap;
      }
    }
    .van-popover__arrow {
      display: none;
    }
  }
  .list {
    position: absolute;
    top: 125px;
    left: 80px;
    .award {
      $radius: 12px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框宽度*/
      width: 160px + $borderWidth * 2; /*todo 宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
      height: 160px + $borderWidth * 2; /*todo 高度 蓝湖上选区不包括边框 所以加上边框宽度*/
      background-color: #FFAE77; /*todo 边框颜色*/
      border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      padding: $borderWidth;
      .typeLabel {
        font-weight: 500;
        font-size: 18px;
        color: #FFFFFF;
        background: #BC80F5;
        z-index: 2;
        top: 0;
        transform: translateY(-50%);
        right: -1px;
        border-radius: 999999999px;
        height: 28px;
        padding: 0 8px;
      }
      .icon {
        width: 100%;
        height: 112px;
        background: linear-gradient(180deg, #FFF4C5, #FFFFFF);
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
        font-size: 26px;
        background: linear-gradient(90deg, #FF6C60, #FFBE6D);
        border-radius: 0 0 $radius $radius;
      }
      &:nth-child(2) {
        margin-left: 14px; /*todo 中间间距 蓝湖上选区不包括边框 所以加上边框宽度*/
      }
    }
  }
  .desc{
    top: 141px;
    right: 91px;
    font-size: 28px;
    color: #732424;
    line-height: 40px;
  }
  .button {
    $width: 227px;
    $height: 87px;
    $border: 0px;
    position: absolute;
    top: 225px;
    right: 56px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    font-size: 30px;
    font-weight: normal;
    width: $width + $border * 2;
    height: $height + $border * 2;
    // 背景图
    background: no-repeat left top/100% 100%;
    &.status0 {
     color: #ffffff;
     background-image: url('@/pages/520/assets/btn_4.png');
    }
    &.status1 {
     color: #ffffff;
     background-image: url('@/pages/520/assets/btn_5.png');
    }
    &.status2 {
     color: #ffffff;
     background-image: url('@/pages/520/assets/btn_6.png');
    }
  }
}
</style>
