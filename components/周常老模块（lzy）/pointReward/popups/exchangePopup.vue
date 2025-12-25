<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <div class="ownedNumText">剩余{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />：{{ my_goods }}</div>
    <PublicImg class="goodsIcon" :class="`${config.goods_type}Icon`" :imgName="config.goods_icon_t" :imgType="config.goods_type" />
    <div class="goodsDesc">{{ config.goods_num_text }}</div>
    <div v-if="typePo == 1" class="computeDiv">
      <div class="min" @click="minCk">最小</div>
      <div class="minus" @click="minusCk">
        <img :src="IconPath(exchangeNum == 1 ? 'pop_1_1.png' : 'pop_1.png')" alt="" />
      </div>
      <div class="exchangeNumDiv">{{ exchangeNum }}</div>
      <div class="plus" @click="plusCk">
        <img :src="IconPath(addIcon)" alt="" />
      </div>
      <div class="max" @click="maxCk">最大</div>
    </div>
    <div v-if="typePo == 1" class="type1">
      <div class="needNumDiv">共消耗<img :src="IconPath(pointIcon)" alt="" />：<i>{{ needPointNum }}</i></div>
      <div class="exchangeBtn" @click="exchangeBtnCk">兑换</div>
    </div>
    <div v-if="typePo == 2" class="keyDesc">首次消耗{{ Number(config.price) }}个<img :src="IconPath(pointIcon)" alt="" />&ensp;第二个半价</div>
    <div v-if="typePo == 2" class="type2">
      <div class="exchangeBtn1" @click="exKey1">兑1个<p>（消耗:<img :src="IconPath(pointIcon)" alt="" />{{ config.exchange_times == 0 ? Number(config.price) : Number(config.price) / 2 }}）</p></div>
      <div class="exchangeBtn2" v-if="config.exchange_times == 0" @click="exKey2">兑2个<p>（消耗:<img :src="IconPath(pointIcon)" alt="" />{{ Number(config.price) + Number(config.price) / 2 }}）</p></div>
    </div>
    <div v-if="typePo == 3" class="needNumType3">消耗<img :src="IconPath(pointIcon)" alt="" />：{{ needPointNum }}</div>
    <div v-if="typePo == 3" class="type2">
      <div class="exchangeBtn1" @click="exType3">兑换</div>
      <div class="exchangeBtn2" @click="exType3Wear">兑换并{{$store.state.nowEquipText[config.goods_type]}}</div>
    </div>
  </PopupBox>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  name: 'exchangePopup',
  props: ['pointIcon', 'pointName', 'my_goods', 'config'],
  data() {
    return {
      isShowPo: true,
      exchangeNum: 1, // 兑换个数
      typePo: 1 // 兑换类型 1:普通类型 2:兑换钥匙 3:称号/座驾/头饰
    }
  },
  created() {
    this.judegTypePo()
  },
  computed: {
    needPointNum() {
      return Number(this.exchangeNum) * Number(Number(this.config.price))
    },
    addIcon() {
      if (!+this.config.max_times) {
        return this.exchangeNum < Math.floor(this.my_goods / Number(this.config.price)) ? 'pop_2.png' : 'pop_2_1.png'
      } else {
        const num1 = Number(this.config.max_times) - Number((this.config.exchange_times))
        const num2 = Math.floor(this.my_goods / Number(this.config.price))
        const num3 = Math.min(num1, num2)
        return this.exchangeNum < num3 ? 'pop_2.png' : 'pop_2_1.png'
      }
    }
  },
  methods: {
    /**
     * 判断兑换类型
     */
    judegTypePo() {
      this.typePo = 1
      if (this.config.goods_type == 'keys') {
        this.typePo = 2
      } else if ((this.config.goods_type == 'title' || this.config.goods_type == 'car' || this.config.goods_type == 'mic' || this.config.goods_type == 'chat_bubble_pub' || this.config.goods_type == 'chat_bubble' || this.config.goods_type == 'costume') && this.config.max_times == 1) {
        this.typePo = 3
      }
    },
    clickClose() {
      this.$emit('clickClose')
    },
    minCk() {
      this.exchangeNum = 1
    },
    minusCk() {
      this.exchangeNum = this.exchangeNum > 1 ? this.exchangeNum - 1 : 1
    },
    plusCk() {
      if (this.exchangeNum < (Number(this.config.max_times) - Number(this.config.exchange_times)) || this.config.max_times == 0) {
        this.exchangeNum = this.exchangeNum < Math.floor(this.my_goods / Number(this.config.price)) ? this.exchangeNum + 1 : this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      this.exchangeNum = Math.floor(this.my_goods / Number(this.config.price)) > 0 ? Math.floor(this.my_goods / Number(this.config.price)) : 1
      if (this.exchangeNum < (Number(this.config.max_times) - Number(this.config.exchange_times))) {
        return 0
      } else {
        this.exchangeNum = (Number(this.config.max_times) - Number(this.config.exchange_times))
      }
      if (this.config.max_times == 0) {
        this.exchangeNum = Math.floor(this.my_goods / Number(this.config.price))
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      // console.log('this.config', this.config)
      getPageData({ type: 'exchange_goods_new', mark: { id: this.config.type, nums: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getHomePage')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }),
    /**
     * 兑换钥匙
     */
    exKey1: _throttle(function () {
      getPageData({ type: 'exchange_lucky_key', mark: 1 }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getHomePage')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }),
    exKey2: _throttle(function () {
      getPageData({ type: 'exchange_lucky_key', mark: 2 }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getHomePage')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }),
    /**
     * 兑换称号/座驾/头饰
     */
    exType3: _throttle(function () {
      getPageData({ type: 'exchange_goods_new', mark: { id: this.config.type, nums: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getHomePage')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }),
    exType3Wear: _throttle(function () {
      // moduleOneApi({ type: 'exchange_and_equip_goods', mark: { id: this.config.type, nums: this.exchangeNum } }).then((res) => {
      //   if (res.errno == 0) {
      //     this.$emit('getHomePage')
      //     this.clickClose()
      //     // this.$toast(res.errmsg)
      //     nowEquip({ type: this.config.goods_type, id: this.config.goods_id }).then((r) => {
      //       this.$toast(r.errmsg)
      //     })
      //   } else {
      //     this.$toast(res.errmsg)
      //   }
      // })
      getPageData({ type: 'exchange_and_equip_goods', mark: this.config.type }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getHomePage')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.ownedNumText {
  font-size: 32px;
  color: #FFFFFF;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
    height: 47px;
    margin-left: 5px;
  }
}
.goodsIcon {
  width: 128px;
  height: 128px;
  background: #FFFFFF;
  border-radius: 16px;
  border: 4px solid #FFD782;
  margin: 28px auto 20px auto;
  &.titleIcon {
    width: 194px;
  }
}
.goodsDesc {
  text-align: center;
  font-size: 28px;
  margin: 0 auto;
  color: #FFFFFF;
  line-height: 1;
}
.computeDiv {
  line-height: 1;
  width: 440px;
  height: 48px;
  text-align: center;
  margin: 34px auto 0 auto;
  font-size: 28px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  color: #FFFFFF;
  .min {
    width: 72px;
    height: 48px;
    background: #C8593F;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .minus {
    width: 48px;
    height: 48px;
    background: #C8593F;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .exchangeNumDiv {
    width: 120px;
    height: 48px;
    background: #C8593F;
    font-size: 36px;
    color: #FFFAA6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .plus {
    width: 48px;
    height: 48px;
    background: #C8593F;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .max {
    width: 72px;
    height: 48px;
    background: #C8593F;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.type1 {
  margin: 23px auto 0;
  position: relative;
  width: 585px;
  border-top: 2px solid #FEE7B3;
  padding: 33px 24px 0 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .needNumDiv {
    font-size: 32px;
    color: #D83A1B;
    display: flex;
    align-items: center;
    justify-content: left;
    img {
      margin-left: 5px;
      width: 40px;
      height: auto;
    }
    i {
      font-weight: 500;
    }
  }
  .exchangeBtn {
    width: 126px;
    height: 66px;
    font-size: 32px;
    font-weight: 400;
    color: #4D7DDD;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    border: 3px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
  }
}
.keyDesc {
  line-height: 1;
  font-size: 26px;
  margin: 21px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  img {
    width: auto;
    height: 47px;
  }
}
.type2 {
  line-height: 1;
  margin-top: 27px;
  display: flex;
  justify-content: center;
  text-align: center;
  p{
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: auto;
      height: 37px;
    }
  }
  .exchangeBtn1{
    width: 246px;
    height: 90px;
    font-size: 32px;
    font-weight: 400;
    color: #4D7DDD;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    border: 3px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
  }
  .exchangeBtn2{
    margin-left: 19px;
    width: 246px;
    height: 90px;
    font-size: 32px;
    font-weight: 400;
    color: #A9792C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    border: 3px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    background-image: linear-gradient(0deg, #FFF9D1, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
  }
}
.needNumType3{
  line-height: 1;
  font-size: 32px;
  margin: 10px auto 0 auto;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: auto;
    height: 47px;
    margin-left: 5px;
  }
}
</style>
