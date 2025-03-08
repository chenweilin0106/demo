<template>
  <PopupBox title="title_10.png" @clickClose="clickClose">
    <div class="awardsList flex align-center justify-between flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="awardItem flex-shrink-0 flex-column align-center">
        <div class="awardIcon position-relative">
          <PublicImg :imgName="item.icon" :imgType="item.type" />
          <div v-if="item.price" class="priceLabel position-absolute line-height-100 flex align-center justify-center">
            价格{{ item.price }}<img :src="IconPath('zs_27_20.png')" class="diamond" />
          </div>
        </div>
        <div class="awardType line-height-100 flex align-center justify-center">{{ item.typeText }}</div>
        <div class="awardName line-height-100 flex align-center justify-center">{{ item.text }}</div>
      </div>
    </div>
    <ul class="rules-text">
      <li><span></span>【财神到】礼物仅钻石可赠送</li>
    </ul>
    <img :src="IconPath('tk_14.png')" class="tableImg1 block margin-row-center" />
    <img :src="IconPath('tk_15.png')" class="tableImg2 block margin-row-center" />
    <img :src="IconPath('tk_16.png')" class="tableImg3 block margin-row-center" />
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        { price: '3888', icon: 'csd_120_120.png', type: 'gift', typeText: '礼物', text: '财神到' },
        { price: '', icon: 'frxl_120_120.png', type: 'car', typeText: '座驾', text: '福瑞祥龙' },
        { price: '38', icon: 'axpp_120_120.png', type: 'gift', typeText: '礼物', text: '爱心泡泡' },
        { price: '', icon: 'qp_yybf_sc', type: 'chat_bubble', typeText: '气泡', text: '一夜豹富' },
        { price: '', icon: 'ts_cs.svga', type: 'mic', typeText: '头饰', text: '财神' },
        { price: '', icon: 'ts_ndzx.svga', type: 'mic', typeText: '头饰', text: '年度之星' }
      ])
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.rules-text {
  width: fit-content;
  margin-left: 57px;
  margin-top: -10px;
  margin-bottom: 15px;
  span {
    background-color: #ffec95;
  }
  li {
    font-size: 24px;
    color: #ffef84;
  }
}
::v-deep .main {
  height: 940px;
}
$width: 554px;
.tableImg1 {
  width: $width;
}
.tableImg2 {
  width: $width;
  margin: 20px auto;
}
.tableImg3 {
  width: $width;
}
.awardsList {
  width: 100%;
  padding: 17px 50px 0;
  .awardItem {
    width: 128px;
    margin-bottom: 30px;
    .awardIcon {
      width: 100%;
      height: 128px;
      background: #ffffff;
      border-radius: 12px;
      border: 4px solid #fbe590;
      .priceLabel {
        top: 0;
        right: -16px;
        transform: translateY(-50%);
        padding: 0 10px;
        height: 34px;
        background: linear-gradient(-90deg, #75b9ff, #ff84f8);
        border-radius: 17px;
        font-weight: 500;
        font-size: 20px;
        .diamond {
          width: 27px;
          height: 20px;
        }
      }
    }
    .awardType {
      margin: 7px 0;
      width: 100%;
      font-size: 22px;
      color: #ffec70;
    }
    .awardName {
      width: 100%;
      font-size: 26px;
    }
  }
}
</style>
