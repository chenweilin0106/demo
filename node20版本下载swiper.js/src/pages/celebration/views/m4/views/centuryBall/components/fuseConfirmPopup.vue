<template>
  <PopupBox :title="'mk9_title_2.png'" @clickClose="clickClose">
    <div class="tip1">当前剩余<i>{{leftJyzqNums}}个</i></div>
    <div class="tip1">是否消耗<i>30个</i><img :src="IconPath('jyzq_57_40.png')" />融合？</div>
    <div class="jyzqIconDiv">
        <PublicImg :imgName="'hjcbt_120_120.png'" :imgType="'tool'"></PublicImg>
      </div>
      <div class="jyzqIconTip">+1</div>
    <div class="buttons">
      <div class="cancel" @click="clickClose">取消</div>
      <div class="confirm" @click="onConfirm">确认</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index'

export default {
  props: ['leftJyzqNums'],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onConfirm() {
      getPageData({ type: 'ps_open' }).then((res) => {
        if (res.errno == 0) {
          // this.dealSort(res.data)
          this.$emit('openReceiveAwardsPopup', res.data)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.tip1{
  font-weight: 400;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 46px;
  text-align: center;
  i{
    color: #FFF663;
  }
  img{
    width: 57px;
    height: 40px;
  }
}
.jyzqIconDiv{
  width: 128px;
  height: 128px;
  background: #fff;
  border-radius: 12px;
  border: 4px solid #BDA2FA;
  margin: 20px auto 0 auto;
}
.jyzqIconTip{
  font-weight: 400;
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  .cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #4d7ddd;
    margin-right: 18px;
  }

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #a9792c;
  }
}
</style>
