<template>
  <PopupBox title="title_11.png" :size="3" @clickClose="clickClose">
    <div class="iconImgDiv">
      <PublicImg :imgName="configBuyPopup.gift_list.award.icon" :imgType="configBuyPopup.gift_list.award.type"></PublicImg>
    </div>
    <div class="iconText">{{configBuyPopup.gift_list.award.text}}</div>
    <div class="voucherArea">
      <div>代金券：</div>
      <div class="voucherTitle">
        <div @click="voucherTitleCk">{{configBuyPopup.voucher_list[activeVoucher].text}}</div>
        <div :class="['dropDpwnMark', isDropDown?'downStatus':'upStatus']"></div>
        <div class="voucherListArea" v-if="isDropDown">
          <div :class="['voucherListItem', activeVoucher==index?'active':null]" v-for="(item, index) in configBuyPopup.voucher_list" :key="item.id" @click="voucherChoose(index)">
            <div>{{item.text}}</div>
            <div class="activeMark" v-if="activeVoucher==index"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="priceArea">
      <div>花费：</div>
      <template v-if="configBuyPopup.voucher_list[activeVoucher].before_price != configBuyPopup.voucher_list[activeVoucher].price">
        <div class="beforePrice" v-if="configBuyPopup.voucher_list[activeVoucher].id!=0">{{configBuyPopup.voucher_list[activeVoucher].before_price}}</div>
        <div>{{configBuyPopup.voucher_list[activeVoucher].price}}</div>
      </template>
      <template v-else>
        <div>{{configBuyPopup.voucher_list[activeVoucher].price}}</div>
      </template>
      <img :src="IconPath(propertyIcon[configBuyPopup.gift_list.price_type])" />
    </div>
    <div class="btnArea">
      <div class="cancelBtn" @click="clickClose">取消</div>
      <div class="confirmBtn" @click="confirmBtnCk">确认</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index.js'
import { diamondRechargePart } from '@/utils/toApp'

export default {
  name: 'rulesPopup',
  props: ['configBuyPopup'],
  components: {},
  data() {
    return {
      activeVoucher: 0, // 激活的代金卷下标
      isDropDown: false,
      propertyIcon: {
        // points: 'mk4_6.png',
        gamegold: 'mk4_7.png',
        masonry: 'mk4_8.png'
      }
    }
  },
  created() {
    // eslint-disable-next-line vue/no-mutating-props
    // this.configBuyPopup = {
    //   gift_list: {
    //     award: {
    //       id: 1,
    //       type: 'mic',
    //       nums: 1,
    //       name: '黑桃红心',
    //       icon: 'ts_hthx.svga',
    //       text: '头饰+1'
    //     },
    //     gift_id: 11,
    //     price_type: 'masonry'
    //   },
    //   voucher_list: [
    //     { id: 0, text: '不使用', before_price: 500, price: '500' },
    //     { id: 1, text: '满300减30', before_price: 500, price: 470 },
    //     { id: 2, text: '满500减50', before_price: 500, price: 450 }
    //   ]
    // }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 下拉框状态切换
     */
    voucherTitleCk() {
      this.isDropDown = !this.isDropDown
    },
    /**
     * 代金卷选择
     */
    voucherChoose(index) {
      this.activeVoucher = index
      this.voucherTitleCk()
    },
    /**
     * 执行购买
     */
    confirmBtnCk() {
      getPageData({ type: 'carnival_trader_buy_gift', mark: { card_id: this.configBuyPopup.gift_list.gift_id, voucher_id: this.configBuyPopup.voucher_list[this.activeVoucher].id } }).then((res) => {
        if (res.errno == 0) {
          console.log('打开恭喜获得弹窗')
          this.$emit('openReceiveAwardsPopup', res.data)
        } else if (res.errno == -3) {
          this.$toast(res.errmsg)
          this.clickClose()
          console.log('跳转充值半屏')
          diamondRechargePart(this.configBuyPopup.voucher_list[0].before_price)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.iconImgDiv{
  width: 128px;
  height: 128px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 4px solid #FBE590;
  margin: 20px auto 0 auto;
}
.iconText{
  font-weight: 400;
  font-size: 28px;
  color: #FFFFFF;
  text-align: center;
  margin: 10px auto 0 auto;
}
.voucherArea{
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .voucherTitle{
    width: 335px;
    height: 54px;
    background: #FFFFFF;
    border-radius: 27px;
    font-weight: bold;
    font-size: 26px;
    color: #935115;
    line-height: 54px;
    padding-left: 20px;
    position: relative;
    .dropDpwnMark{
      width: 22px;
      height: 14px;
      position: absolute;
      right: 20px;
      bottom: 20px;
      pointer-events: none;
      &.upStatus{
        background: url('@/pages/celebration/assets/tk_19.png') no-repeat left top/100% 100%;
      }
      &.downStatus{
        background: url('@/pages/celebration/assets/tk_20.png') no-repeat left top/100% 100%;
      }
    }
    .voucherListArea{
      width: 335px;
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 5px 5px;
      background: #A56830;
      border-radius: 30px;
      position: absolute;
      left: 0;
      top: 54px;
      .voucherListItem{
        height: 54px;
        font-weight: bold;
        font-size: 26px;
        color: #FFFFFF;
        padding-left: 20px;
        position: relative;
        &.active{
          background: #BE7F45;
          border-radius: 27px;
        }
        .activeMark{
          width: 45px;
          height: 36px;
          background: url('@/pages/celebration/assets/tk_21.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 20px;
          bottom: 10px;
        }
      }
    }
  }
}
.priceArea{
  font-weight: 400;
  font-size: 30px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
  .beforePrice{
    color: #935115;
    text-decoration: line-through;
    text-decoration-color: #C94911;
    margin-right: 10px;
  }
  img{
    width: 46px*0.8;
    height: 46px*0.8;
  }
}
.btnArea{
  display: flex;
  justify-content: center;
  margin: 40px 0;
  .cancelBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 36px;
    border: 3px solid #FFFFFF;
    font-weight: 400;
    font-size: 32px;
    color: #4D7DDD;
    text-align: center;
    line-height: 72px;
    margin: 0 20px;
  }
  .confirmBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
    border-radius: 36px;
    border: 3px solid #FFFFFF;
    font-weight: 400;
    font-size: 32px;
    color: #A9792C;
    text-align: center;
    line-height: 72px;
    margin: 0 20px;
  }
}
</style>
