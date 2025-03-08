<template>
  <PopupBox :title="'mk9_title_9.png'" :size="2" @clickClose="clickClose">
    <div :class="['main']">
      <div class="coinsArea">
        <span>剩余</span>
        <img :src="IconPath(sqngIcon)" />
        <span>：{{coinsNum}}</span>
        <!-- <span>{{coinsNum}} / {{item.price * exchangeNum}}</span> -->
      </div>
      <div :class="['rewardIconDiv', config.type=='title'?'other':'other']">
        <PublicImg :imgName="config.icon" :imgType="config.type"></PublicImg>
      </div>
      <div class="rewardDescDiv">{{config.text}}</div>
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
      <!-- <div class="useCoinsDiv">
        <span>共消耗:</span>
        <img :src="IconPath(sqngIcon)" />
        <span>{{exchangeNum * config.price}}</span>
      </div> -->
      <div class="btns">
        <div class="cancel" @click="clickClose">取消</div>
        <div class="confirm" @click="exchangeBtnCk">确认</div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/index'

export default {
  props: ['config', 'coinsNum'],
  components: {},
  data() {
    return {
      sqngIcon: 'jyzq_120_120.png', // 图标
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
      if (this.exchangeNum < (this.config.max_times == 0 ? 10000 : this.config.max_times - this.config.exchange_times)) {
        // this.exchangeNum = this.exchangeNum < Math.floor(this.config.ownedNum / this.config.needNum) ? this.exchangeNum + 1 : this.exchangeNum
        if (this.coinsNum < this.config.price * (this.exchangeNum + 1)) {
          return 0
        }
        ++this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      let temNum = 10000
      if (Math.floor(this.coinsNum / this.config.price) < temNum) {
        temNum = Math.floor(this.coinsNum / this.config.price)
      }
      if (temNum > (this.config.max_times == 0 ? 10000 : this.config.max_times - this.config.exchange_times)) {
        this.exchangeNum = this.config.max_times == 0 ? 10000 : this.config.max_times - this.config.exchange_times
      } else {
        this.exchangeNum = temNum
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      console.log('兑换')
      getPageData({ type: 'halloween_ng_exchange', mark: this.exchangeNum }).then((res) => {
        if (res.errno == 0) {
          this.$emit('openReceiveAwardsPopup', res.data.awards)
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
      width: 47px;
      height: 40px;
    }
  }
  .rewardIconDiv {
    background: #fefaef;
    border-radius: 12px;
    border: 4px solid #8273CB;
    margin: 10px auto 0 auto;
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
    margin: 10px auto 0 auto;
  }
  .computeDiv {
    width: 440px;
    height: 48px;
    // background: #A9792C;
    margin: 20px auto 0 auto;
    font-size: 28px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .min {
      width: 72px;
      height: 48px;
      background: #6447C3;
    }
    .minus {
      width: 48px;
      height: 48px;
      background: #6447C3;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .exchangeNumDiv {
      width: 120px;
      height: 48px;
      background: #6447C3;
      font-size: 36px;
      color: #fffaa6;
    }
    .plus {
      width: 48px;
      height: 48px;
      background: #6447C3;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .max {
      width: 72px;
      height: 48px;
      background: #6447C3;
    }
  }
  .useCoinsDiv{
    width: 100%;
    font-weight: 400;
    font-size: 28px;
    margin: 20px auto 0 auto;
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
      width: 47px;
      height: 40px;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px auto 0 auto;
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
