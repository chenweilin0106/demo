<template>
  <PopupBox :title="'mk2_title_2.png'" @clickClose="clickClose">
    <div class="tip1">确认购买该道具吗？</div>
    <div class="tip2" v-html="`舞会正式开幕时提交入场券，折算\n双倍永恒值`"></div>
    <div class="tip3">
      <span>花费：520<img :src="IconPath('zs_42_32.png')" /></span>
    </div>
    <div class="buttons">
      <div class="cancel" @click="clickClose">取消</div>
      <div class="confirm" @click="onConfirm">确认</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index'

export default {
  props: [],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onConfirm() {
      getPageData({ type: 'ps_open' }).then((res) => {
        if (res.errno == 0) {
          // this.dealSort(res.data)
          this.$emit('clickClose', res.data)
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
  font-weight: 500;
  font-size: 34px;
  color: #FFFFFF;
  text-align: center;
  i{
    color: #FFF663;
  }
  img{
    width: 57px;
    height: 40px;
  }
}
.tip2{
  font-weight: 400;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 40px;
  white-space: pre-wrap;
  text-align: left;
  width: 500px;
  margin: 40px auto 0 auto;
}
.tip3{
  text-align: center;
  margin: 40px auto 30px auto;
  span{
    font-weight: 400;
    font-size: 30px;
    color: #FFF663;
    vertical-align: middle;
  }
  img{
    width: 42px;
    height: 32px;
  }
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
