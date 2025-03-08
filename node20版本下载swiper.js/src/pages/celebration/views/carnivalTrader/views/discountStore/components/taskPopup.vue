<template>
  <PopupBox title="title_13.png" :size="2" @clickClose="clickClose">
    <div class="text1">
      <div class="textDiv">
        <p>{{text}}</p>
        <span>({{now_num}}/{{num}})</span>
      </div>
    </div>
    <div class="text2">
      <p>注：翻牌时<i>翻到此商品后</i>完成悬赏任务才</p>
      <p>算有效</p>
      <p>购买礼包、会员（含超值兑换中兑换会员）</p>
      <p>、活力卡不计算在内</p>
    </div>
    <div class="btn" @click="btnCk">去完成</div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index.js'

export default {
  name: 'taskPopup',
  props: ['config'],
  components: {},
  data() {
    return {
      text: undefined,
      num: 0,
      now_num: 0
    }
  },
  created() {
    getPageData({ type: 'carnival_trader_task_details', mark: this.config }).then((res) => {
      if (res.errno == 0) {
        console.log(res.data)
        this.text = res.data.text
        this.num = res.data.num
        this.now_num = res.data.now_num
      } else {
        this.$toast(res.errmsg)
      }
    })
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    btnCk() {
      this.$emit('clickClose')
      this.$emit('toRechargeCk')
    }
  }
}
</script>

<style scoped lang="scss">
.text1{
  width: 476px;
  height: 108px;
  background: rgba(185, 78, 0, 0.4);
  border-radius: 54px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .textDiv{
    width: fit-content;
    p{
      font-weight: 400;
      font-size: 28px;
      color: #FFFFFF;
    }
    span{
      font-weight: 400;
      font-size: 26px;
      color: #FFE671;
    }
  }
}
.text2{
  margin: 20px auto;
  width: fit-content;
  font-weight: 400;
  font-size: 24px;
  color: #FFFFFF;
  line-height: 36px;
  i{
    color: #FFF089;
  }
}
.btn{
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  margin: 0 auto;
  font-weight: 400;
  font-size: 32px;
  color: #A9792C;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
