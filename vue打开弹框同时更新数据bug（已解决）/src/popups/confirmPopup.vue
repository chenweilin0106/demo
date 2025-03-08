<template>
  <PopupBox size="2" @clickClose="clickClose">
    <p class="text flex align-center line-height-100 justify-center">确认花费<i class="name">{{ price }}钻石</i></p>
    <p class="text flex align-center line-height-100 justify-center">购买该礼包吗</p>
    <div class="buttons flex align-center justify-center"><div class="cancel" @click="clickClose"></div><div class="confirm" @click="confirm"></div></div>
    <div class="tip flex align-center line-height-100 justify-center" @click="clickCheckBox"><img :src="IconPath(checked ? 'tk_8.png' : 'tk_9.png')" class="checkBox" />今日不再提示</div>
  </PopupBox>
</template>

<script>
import { setStorage } from '@/utils/tool'
export default {
  props: ['price', 'id', 'popupType', 'index'],
  inject: ['getLocalKey'],
  data() {
    return {
      checked: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', { id: this.id, index: this.index, price: this.price })
      this.clickClose()
    },
    clickCheckBox() {
      this.checked = !this.checked
      setStorage(this.getLocalKey(), this.checked)
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.text {
  font-weight: bold;
  font-size: 30px;
  color: #3A1CA5;
  margin-bottom: 39px;
  .name {
    font-weight: 500;
    font-size: 32px;
    color: #B07708;
  }
  &:first-child {
    margin-bottom: 18px;
  }
}
.tip {
  margin-top: 13px;
  font-size: 26px;
  color: #3A1CA5;
  .checkBox {
    margin-top: -5px;
    margin-right: 10px;
    width: 50px;
    height: 48px;
  }
}
.cancel {
  width: 180px;
  height: 80px;
  background: url('@/assets/tk_5.png') no-repeat left top/100% 100%;
  &::after {
    content: '取消';
    width: 100%;
    height: 100%;
    font-size: 32px;
    color: #3C6CD8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.confirm {
  width: 180px;
  height: 80px;
  margin-left: 20px;
  background: url('@/assets/tk_4.png') no-repeat left top/100% 100%;
  &::after {
    content: '确认';
    width: 100%;
    height: 100%;
    font-size: 32px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
