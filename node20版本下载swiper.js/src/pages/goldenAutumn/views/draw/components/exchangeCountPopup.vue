<template>
  <PopupBox :title="'title_12.png'" @clickClose="clickClose">
    <div :class="['main']">
      <div class="coinsArea">
        <div v-for="(item, index) in config.price_type" :key="index">
          <img :src="IconPath(`${item.id==1?'tysc':item.id==2?'lsqs':item.id==3?'yyfq':null}jnb_60_60.png`)" />
          <span>{{coinsList[item.id]}} / {{item.price * exchangeNum}}</span>
        </div>
      </div>
      <div :class="['rewardIconDiv', config.award.type=='title'?'special':'other']">
        <PublicImg :imgName="config.award.icon" :imgType="config.award.type"></PublicImg>
      </div>
      <div class="rewardDescDiv">{{config.award.text}}</div>
      <div class="computeDiv">
        <div class="min" @click="minCk">最小</div>
        <div class="minus" @click="minusCk">
          <img :src="IconPath('pop_1.png')" />
        </div>
        <div class="exchangeNumDiv">{{ exchangeNum }}</div>
        <div class="plus" @click="plusCk">
          <img :src="IconPath('pop_2.png')" />
        </div>
        <div class="max" @click="maxCk">最大</div>
      </div>
      <div class="btns">
        <div class="cancel" @click="clickClose">取消</div>
        <div class="confirm" @click="exchangeBtnCk">兑换</div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/index'

export default {
  props: ['config', 'coinsList'],
  components: {},
  data() {
    return {
      isShowPo: true,
      exchangeNum: 1 // 兑换的数量
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    // type1
    minCk() {
      this.exchangeNum = 1
    },
    minusCk() {
      this.exchangeNum = this.exchangeNum > 1 ? this.exchangeNum - 1 : 1
    },
    plusCk() {
      if (this.exchangeNum < (this.config.limit == -1 ? 10000 : this.config.limit - this.config.now_num)) {
        // this.exchangeNum = this.exchangeNum < Math.floor(this.config.ownedNum / this.config.needNum) ? this.exchangeNum + 1 : this.exchangeNum
        for (let item of this.config.price_type) {
          if (this.coinsList[item.id] < item.price * (this.exchangeNum + 1)) {
            return 0
          }
        }
        ++this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      let temNum = 10000
      for (let item of this.config.price_type) {
        if (Math.floor(this.coinsList[item.id] / item.price) < temNum) {
          temNum = Math.floor(this.coinsList[item.id] / item.price)
        }
      }
      if (temNum > (this.config.limit == -1 ? 10000 : this.config.limit - this.config.now_num)) {
        this.exchangeNum = this.config.limit == -1 ? 10000 : this.config.limit - this.config.now_num
      } else {
        this.exchangeNum = temNum
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      console.log('兑换')
      getPageData({ type: 'travel_rl_exchange', mark: { id: this.config.id, num: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('openReceiveAwardsPopup', res.data)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  text-align: center;
  text-align: -webkit-center;
  color: #fff;
  position: relative;
  // overflow-y: scroll;
  height: 450px;
  .coinsArea{
    width: 100%;
    font-weight: 400;
    font-size: 28px;
    color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span{
      vertical-align: middle;
      margin: 0 10px 0 5px;
    }
    img{
      width: 50px;
      height: 50px;
    }
  }
  .rewardIconDiv {
    background: #fefaef;
    border-radius: 12px;
    border: 4px solid #D14514;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 90px;
    &.special{
      height: 104px;
      img {
        width: 210px;
        height: 96px;
      }
    }
    &.other{
      height: 128px;
      width: 128px;
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
  .rewardDescDiv {
    font-size: 28px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 230px;
  }
  .computeDiv {
    width: 440px;
    height: 48px;
    // background: #A9792C;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 280px;
    font-size: 28px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .min {
      width: 72px;
      height: 48px;
      background: #CF5808;
    }
    .minus {
      width: 48px;
      height: 48px;
      background: #CF5808;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .exchangeNumDiv {
      width: 120px;
      height: 48px;
      background: #CF5808;
      font-size: 36px;
      color: #fffaa6;
    }
    .plus {
      width: 48px;
      height: 48px;
      background: #CF5808;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .max {
      width: 72px;
      height: 48px;
      background: #CF5808;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    .cancel{
      width: 240px;
      height: 72px;
      background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
      border-radius: 36px;
      border: 3px solid #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 32px;
      color: #4D7DDD;
      margin: 0 10px;
    }
    .confirm{
      width: 240px;
      height: 72px;
      background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
      border-radius: 36px;
      border: 3px solid #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 32px;
      color: #A9792C;
      margin: 0 10px;
    }
  }
}
</style>
