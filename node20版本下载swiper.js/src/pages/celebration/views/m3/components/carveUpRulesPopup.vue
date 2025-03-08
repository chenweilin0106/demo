<template>
  <PopupBox :title="'mk8_title_5.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>闪耀宝箱奖励如下：</li>
        <li>【奖池】每轮开始时系统将向奖池内注入</li>
        <li>10,000,000元宝，全服每进行10次祈愿池祈愿，系</li>
        <li>统将注入10,000元宝，奖池上限1亿元宝</li>
        <li>&ensp;</li>
        <li><span></span>【瓜分】玩家参与祈愿池玩法有机会获得瓜分积分，</li>
        <li>每轮结束时将根据玩家在本轮获得的瓜分积分形成</li>
        <li>排名</li>
        <li>第一档：第1、2、3、4、5名分别瓜分奖池的8%、</li>
        <li>6%、3%、2%、1%</li>
        <li>第二档：前50名，瓜分奖池16%</li>
        <li>第三档：前150名，瓜分奖池17%</li>
        <li>第四档：前25%，瓜分奖池25%</li>
        <li>第五档：前60%，瓜分奖池20%</li>
        <li>&ensp;</li>
        <li><span></span>【奖励规则】除1-5名外，其他玩家平分本档位对</li>
        <li>应奖励元宝数量，获得高档位玩家奖励将不再重复</li>
        <li>获取低档位奖励。若同一档位有多人瓜分积分数量</li>
        <li>相等，则优先较早到达此数量的用户获得奖励</li>
      </ul>
    </div>
    <div class="div1"></div>
  </PopupBox>
</template>

<script>
export default {
  name: 'carveUpRulesPopup',
  props: [],
  components: {},
  data() {
    return {
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.div1{
  height: 50px;
}
.img1{
  width: 555px;
  height: 566px;
  background: url('@/pages/celebration/assets/tk_39.png') no-repeat left top/100% 100%;
  margin: 10px auto 10px auto;
}
.img2{
  width: 555px;
  height: 565px;
  background: url('@/pages/celebration/assets/tk_40.png') no-repeat left top/100% 100%;
  margin: 10px auto 10px auto;
}
.rewardsListDiv {
  margin: 20px auto 60px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .rewardItem {
    width: 120px;
    height: 120px;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0 20px;
    .itemIcon{
      background: linear-gradient(0deg, #FFFFFF, #EECEFF);
      border-radius: 12px;
      border: 4px solid #BDA2FA;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name {
      color: #6E56E7;
      white-space: nowrap;
      height: 25px;
      font-size: 26px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 140px;
    }
    .priceMarkIcon{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 15px;
      font-weight: bold;
      font-size: 20px;
      color: #FFFFFF;
      padding: 2px 12px;
      position: absolute;
      right: 0;
      top: -10px;
      img{
        width: 27px;
        height: 20px;
      }
    }
  }
}
</style>
