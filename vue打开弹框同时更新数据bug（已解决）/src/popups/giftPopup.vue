<template>
  <PopupBox title="title_7.png" @clickClose="clickClose">
    <ul class="popup-rules-text">
      <li><span></span>最新版本5.9.4已上线，玩家们可前往应用程序商店下载更新即可体验。同时我们为大家准备了一份更新奖励</li>
    </ul>
    <div class="box flex align-center justify-center margin-row-center position-relative">
      <div class="main"><PublicImg :imgName="'yb_120_120.png'" :imgType="'tool'" /></div>
    </div>
    <div class="name line-height-100 text-nowrap text-center">+5万</div>
    <div class="button text-nowrap line-height-100 flex align-center justify-cente margin-row-center" :class="`has_right_${hasRight ? 1 : 2}`" @click="receive"></div>
  </PopupBox>
</template>

<script>
import { receiveUpdateApi } from '@/api/task'
import { compareVersions } from '@/utils/toApp'
import { _throttle } from '@/utils/tool'
export default {
  props: ['hasRight'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    receive: _throttle(async function () {
      const flag = compareVersions('5.9.4')
      if (flag < 0 ) return this.$toast('请先更新版本后领取')
      const res = await receiveUpdateApi()
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update')
    })
  }
}
</script>

<style scoped lang="scss">
.box {
  margin-top: 34px;
  width: 120px;
  height: 120px;
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 4px * 2);
    height: calc(100% + 4px * 2);
    background-color: #C4A4FF;
    border-radius: 20px + 4;
  }
  .main {
    z-index: 2;
    background: linear-gradient(0deg, #B891FE, #6547AF);
    border-radius: 20px;
  }
}
.name {
  margin: 25px 0;
  font-weight: 500;
  font-size: 28px;
  color: #3A1CA5;
}
.button {
  font-size: 32px;
  width: 328px;
  height: 80px;
  color: #FFFFFF;
  &.has_right_1 {
    background: url('@/assets/tk_3.png') no-repeat top left/100% 100%;
    &::after {
      content: '领取';
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 100%;
    }
  }
  &.has_right_2 {
    background: url('@/assets/tk_3_1.png') no-repeat top left/100% 100%;
    pointer-events: none;
    &::after {
      content: '已领取';
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 100%;
    }
  }
}
</style>
