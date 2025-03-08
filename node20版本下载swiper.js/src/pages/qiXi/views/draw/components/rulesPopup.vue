<template>
  <div class="compo">
    <PopupBox :title="'title_20.png'" @clickClose="clickClose">
      <template v-if="config == 1">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>浮生星阵奖励如下：</li>
          </ul>
        </div>
        <div class="img1"></div>
        <div class="rules-text-popup">
          <ul>
            <li><span></span>随机技能道具：口香糖、神功丸、OK绷、聚宝</li>
            <li>盆、魔术帽</li>
            <li><span></span>七夕返场礼物：</li>
          </ul>
        </div>
        <div class="rewardsListDiv">
          <div :class="['rewardItem']" v-for="(item) in awardsList" :key="item.id">
            <div class="itemIcon">
              <PublicImg :imgName="item.icon"></PublicImg>
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="priceMarkIcon" v-if="item.price_mark&&item.price_mark>0">
              {{item.price_mark}}<img :src="IconPath('zs_27_20.png')" />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="config == 2">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>祈愿池奖励如下：</li>
          </ul>
        </div>
        <div class="img2"></div>
        <div class="rules-text-popup">
          <ul>
            <li><span></span>【爱之守护】礼物，价格3344钻，仅钻石可赠</li>
            <li>送</li>
          </ul>
        </div>
      </template>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['config'],
  components: {},
  data() {
    return {
      awardsList: [
        { id: 1, icon: 'larj_120_120.png', name: '恋爱日记', price_mark: 328 },
        { id: 2, icon: 'yjzq_120_120.png', name: '一箭钟情', price_mark: 99 },
        { id: 3, icon: 'tezw_120_120.png', name: '天鹅之吻', price_mark: 520 }
      ]
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
.compo{
  .img1{
    width: 555px;
    height: 629px;
    background: url('@/pages/qiXi/assets/tk_36.png') no-repeat left top/100% 100%;
    margin: 0 auto;
  }
  .img2{
    width: 555px;
    height: 565px;
    background: url('@/pages/qiXi/assets/tk_38.png') no-repeat left top/100% 100%;
    margin: 0 auto;
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
        background: #fefaef;
        border-radius: 12px;
        border: 4px solid #A7DFFF;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name {
        color: #fff;
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
}
</style>
