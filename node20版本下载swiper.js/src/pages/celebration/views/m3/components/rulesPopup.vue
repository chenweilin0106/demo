<template>
  <PopupBox :title="'mk8_title_7.png'" @clickClose="clickClose">
    <template v-if="config == 1">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>闪耀宝箱奖励如下：</li>
        </ul>
      </div>
      <div class="img1"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>周年返场礼物：</li>
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
    </template>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['config'],
  components: {},
  data() {
    return {
      awardsList: [
        { id: 1, icon: 'sldq_120_120.png', name: '闪亮灯球', price_mark: 99 },
        { id: 2, icon: 'dlh_120_120.png', name: '蝶恋花', price_mark: 328 },
        { id: 3, icon: 'xhxy_120_120.png', name: '星河相遇', price_mark: 2888 }
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
