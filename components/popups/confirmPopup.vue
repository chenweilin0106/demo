<template>
  <PopupBox title="tk_title_2.png" @clickClose="clickClose">
    <div class="desc text-center margin-row-center">将投入<i>{{config.price}}</i>钻石，<br>有机会获得更多钻石或等量圣诞币</div>
    <p class="line-height-100 width-fit margin-row-center">注：仅有投入后获得【圣诞币】的钻石消费计入<br>年度活动消费统计</p>
    <div class="buttons flex align-center justify-center">
      <PublicButton has-right="5" class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton has-right="4" class="confirm" @click="confirm">确认</PublicButton>
    </div>
    <div class="tip flex align-center line-height-100 justify-center" @click="check">
      <img :src="IconPath(checked?'tk_6.png':'tk_5.png')" class="checkBox" />今日不再提醒
    </div>
  </PopupBox>
</template>

<script>
import { setStorage } from '@/utils/tool'

export default {
  props: ['config'],
  data() {
    return {
      checked: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirmLottery')
      this.clickClose()
    },
    check() {
      this.checked = !this.checked
      setStorage(`${this.$store.state.uid}_christmas_confirmLotteryPopup_${this.config.type}_check`, this.checked)
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.desc{
  width: 524px;
  height: 164px;
  font-weight: 500;
  font-size: 32px;
  color: #874124;
  background: #fff;
  padding-top: 45px;
  >i{
    color: #D9412C;
  }
}
p{
  font-size: 24px;
  color: #874124;
  margin-top: 20px;
  margin-bottom: 60px;
}
.buttons{
  font-size: 28px;
  color: #FFFFFF;
  >div{
    width: 244px;
    height: 64px;
  }
  .confirm{
    margin-left: 20px;
    background: linear-gradient(0deg, #899D4B, #799351);
    border-radius: 999999999px;
    border: 2px solid #E7EDBA;
  }
}
.tip {
  margin-top: 18px;
  font-size: 24px;
  color: #874124;
  .checkBox {
    margin-right: 10px;
    width: 38px;
  }
}
</style>
