<template>
  <PopupBox title="title_15.png" size="3" @clickClose="clickClose">
    <img :src="IconPath('tk_16.png')" class="table margin-row-center block" />
    <ul class="rules-text-popup">
      <li><span></span>随机技能道具：口香糖、神功丸、OK绷、聚宝盆、</li>
      <li>魔术帽、手铐</li>
      <li><span></span>金秋返场礼物：</li>
    </ul>
    <div class="rewardsShowDiv flex align-center justify-center">
      <div class="reward position-relative" v-for="(it,i) in rewards" :key="i">
        <PublicImg :imgName="it.icon" :imgType="it.type" />
        <div class="rewardText line-height-100 position-absolute" v-html="it.text"></div>
        <div class="rewardPrice position-absolute" v-if="it.price">{{it.price}}<img :src="IconPath('zs_27_20.png')" /></div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  data() {
    return {
      rewards: [
        { id: 1, type: 'tool', icon: 'qtww_120_120.png', text: '晴天娃娃', price: '99' },
        { id: 2, type: 'tool', icon: 'dlh_120_120.png', text: '蝶恋花', price: '328' },
        { id: 3, type: 'tool', icon: 'xyc_120_120.png', text: '许愿池', price: '520' }
      ]
    }
  },
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
.table{
  width: 555px;
  height: 629px;
  margin-bottom: 10px;
}
.rewardsShowDiv{
  margin-top: 31px - 13px;
  .reward{
    width: 128px;
    height: 128px;
    background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
    border-radius: 16px;
    border: 4px solid #E06224;
    margin: 0 20px;
    .rewardText{
      font-size: 20px;
      color: #FFFFFF;
      left: 50%;
      transform: translate(-50%, 100%);
      bottom: -17px;
    }
    .rewardPrice{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 17px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
      padding: 5px 0 5px 10px;
      right: -4px;
      top: 0;
      transform: translateY(-50%);
      img{
        width: 27px;
        height: 20px;
        margin: 0 5px;
      }
    }
  }
}
</style>
