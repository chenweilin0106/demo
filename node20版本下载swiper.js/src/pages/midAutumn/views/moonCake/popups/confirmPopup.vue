<template>
  <PopupBox title="title_14.png" size="2" @clickClose="clickClose">
    <p class="text flex align-center line-height-100 text-nowrap justify-center">确认兑换<i class="name">{{ name }}</i>吗</p>
    <div class="tip flex align-center line-height-100 justify-center" @click="clickCheckBox"><img :src="IconPath(checked ? 'tk_16.png' : 'tk_17.png')" class="checkBox" />今日不再提示</div>
    <div class="buttons flex align-center justify-center">
      <PublicButton has-right="0" class="cancel" @click="clickClose">取消</PublicButton><PublicButton class="confirm" has-right="1" @click="confirm">确认</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
import { getNowFormatDate } from '@/utils/tool'
export default {
  props: ['name', 'goods_id', 'popupType', 'level', 'index'],
  data() {
    return {
      checked: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm', { level: this.level, index: this.index, goods_id: this.goods_id })
      this.clickClose()
    },
    clickCheckBox() {
      this.checked = !this.checked
      window.localStorage.setItem(`${this.$store.state.uid}_${getNowFormatDate()}_${this.popupType}`, this.checked)
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  padding-top: 85px;
  .main {
    min-height: 0;
  }
}
.text {
  font-weight: bold;
  font-size: 32px;
  color: #FFFFFF;
  margin-bottom: 42px;
  .name {
    margin: 0 10px;
    font-weight: 500;
    font-size: 32px;
    color: #FFF580;
  }
}
$width: 200px;
$height: 72px;
$radius: 36px;
$borderWidth: 3px;
.tip {
  font-size: 28px;
  color: #fff;
  margin-bottom: 37px - $borderWidth;
  .checkBox {
    margin-right: 10px;
    width: 42px;
    height: 42px;
  }
}
.commonButton {
  width: 200px;
  height: 72px;
  font-size: 32px;
  margin-bottom: 3px;
}
.cancel {
  @extend .commonButton;
}
.confirm {
  @extend .commonButton;
  margin-left: 46px;
}
</style>
