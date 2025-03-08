<template>
  <PopupBox title="title_7.png" @clickClose="clickClose">
    <div class="voucherArea">
      <div class="voucherItem" v-for="(item) in config" :key="item.id">
        <div class="voucherItemPirice">{{item.price}}<img :src="IconPath(propertyIcon[item.type])" /></div>
        <div class="voucherItemText">{{item.text}}</div>
        <div class="voucherItemEndTime">{{item.end_time}}到期</div>
      </div>
    </div>
    <div class="useBtn" @click="useBtnCk">立即使用</div>
  </PopupBox>
</template>

<script>
export default {
  name: 'receiveVoucherPopup',
  props: ['config'],
  components: {},
  data() {
    return {
      propertyIcon: {
        points: 'mk5_6.png',
        gamegold: 'mk5_7.png',
        masonry: 'mk5_8.png'
      } // 货币图标
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    useBtnCk() {
      this.clickClose()
      this.$emit('viewExBtnCk', 1)
    }
  }
}
</script>

<style scoped lang="scss">
.voucherArea{
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  .voucherItem{
    width: 475px;
    height: 168px;
    background: url('@/pages/618/assets/mk5_19.png') no-repeat left top/100% 100%;
    margin: 0 auto;
    position: relative;
    .voucherItemPirice{
      font-weight: 800;
      font-size: 55px;
      color: #DB6200;
      position: absolute;
      left: 100px;
      top: 50%;
      transform: translate(-50%,-50%);
      img{
        width: 46px;
        height: 46px;
      }
    }
    .voucherItemText{
      font-weight: bold;
      font-size: 26px;
      color: #6F3C00;
      position: absolute;
      left: 220px;
      top: 50px;
    }
    .voucherItemEndTime{
      background: #E19E18;
      border-radius: 15px;
      padding: 4px 15px;
      font-weight: bold;
      font-size: 22px;
      color: #FFF6BD;
      position: absolute;
      left: 220px;
      bottom: 40px;
    }
  }
}
.useBtn{
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  font-weight: 400;
  font-size: 32px;
  color: #A9792C;
  text-align: center;
  line-height: 72px;
  margin: 60px auto 20px auto;
}
</style>
