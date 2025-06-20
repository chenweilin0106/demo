<template>
  <OutBox class="cpRewards" title="title_4.png">
    <div class="list flex align-center">
      <div class="award flex-column" v-for="(item, index) in config.marriage_gift.awards" :key="index">
        <div class="icon flex align-center justify-center position-relative">
          <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text flex-1 flex align-center justify-center line-height-1">{{item.show_text}}</div>
      </div>
    </div>
    <p class="desc position-absolute text-center">
      活动期间求婚<van-popover v-model="showPopover" trigger="click" placement="top" get-container=".cpRewards">
      <div class="popoverMain">夫妻双方可领，<br>每人只能领取1次</div>
      <template #reference>
        <img :src="IconPath('mk1_9.png')" class="bubble" />
      </template>
    </van-popover><br>并登记成功</p>
    <PublicButton class="button position-absolute" :disabled="[6,8]" text-type="4" :hasRight="+config.marriage_gift.has_right+6" @click="receive" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import ReceivePopup from './receivePopup.vue'

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
    async receive() {
      const res = await getPageData({ type: 'marriage_gift_receive' })
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = this.config.marriage_gift.awards.map(item => { return { ...item, unit: item.type == 'mic' ? '天' : '' } })
      this.isShowReceivePopup = true
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-popover {
  .van-popover__content {
    width: fit-content;
    height: fit-content;
    background: none;
    box-shadow: none;
    overflow: visible;
    .popoverMain {
      position: relative;
      top: 15px;
      left: -42px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #FFFFFF;
      line-height: 29px;
      width: 174px;
      height: 92px;
      background: url('@/pages/valentineDay/assets/mk3_5.png') no-repeat left top/100% 100%;
      padding: 0 10px 12px;
    }
  }
  .van-popover__arrow {
    display: none;
  }
}
.cpRewards {
  position: relative;
  .springFestivalLabel {
    width: 167px;
    height: 159px;
    top: -68px;
    right: 88px;
  }
  .list {
    padding-left: 65px;
    .award {
      $radius: 12px; /*todo 圆角*/
      $borderWidth: 4px; /*todo 边框宽度*/
      width: 160px + $borderWidth * 2; /*todo 宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
      height: 160px + $borderWidth * 2; /*todo 高度 蓝湖上选区不包括边框 所以加上边框宽度*/
      background-color: #F7AAD7; /*todo 边框颜色*/
      border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
      padding: $borderWidth;
      .icon {
        width: 100%;
        height: 112px;
        background: linear-gradient(180deg, #FFD5EB, #FFFFFF);
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
        background-color: #C25E94; /*todo 文字背景色*/
        border-radius: 0 0 $radius $radius;
      }
      &:nth-child(2) {
        margin-left: 14px; /*todo 中间间距 蓝湖上选区不包括边框 所以加上边框宽度*/
      }
    }
  }
  .desc{
    top: 128px;
    right: 50px;
    font-size: 28px;
    color: #BC4B91;
    line-height: 40px;
    .bubble{
      margin-top: -5px;
      width: 32px;
      vertical-align: middle;
    }
  }
  .button {
    bottom: 90px;
    right: 40px;
  }
}
</style>
