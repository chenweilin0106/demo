<template>
  <PopupBox title="title_7.png" @clickClose="clickClose">
    <div class="ownedNumText">剩余{{pointName}}<img :src="IconPath(pointIcon)" />：{{my_goods}}</div>
    <PublicImg :class="['goodsIcon', config.goods_type=='title'?'titleIcon':null]" :imgName="config.goods_icon" :userAvatar="config.goods_type == 'mic'?$store.state.user_icon:null"></PublicImg>
    <div class="goodsDesc">{{config.goods_name}}<span v-if="config.type.includes('mic')">+{{config.goods_num}}天</span></div>
    <div class="computeDiv" v-if="typePo==1">
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
    <div class="type1" v-if="typePo==1">
      <div class="partingLine"></div>
      <div class="needNumDiv">共消耗<img :src="IconPath(pointIcon)" />：{{needPointNum}}</div>
      <div class="exchangeBtn" @click="exchangeBtnCk">兑换</div>
    </div>
    <div class="keyDesc" v-if="typePo==2">首次消耗{{config.price}}<img :src="IconPath(pointIcon)" />&ensp;第二个半价</div>
    <div class="type2" v-if="typePo==2">
      <div class="exchangeBtn1" @click="exKey1">兑1个<p>（消耗:<img :src="IconPath(pointIcon)" />{{config.exchange_times==0?config.price:config.price/2}}）</p></div>
      <div class="exchangeBtn2" v-if="config.exchange_times==0" @click="exKey2">兑2个<p>（消耗:<img :src="IconPath(pointIcon)" />{{config.price+config.price/2}}）</p></div>
    </div>
    <div class="needNumType3" v-if="typePo==3">共消耗<img :src="IconPath(pointIcon)" />：{{needPointNum}}</div>
    <div class="type2" v-if="typePo==3">
      <div class="exchangeBtn1" @click="exType3">兑换</div>
      <div class="exchangeBtn2" @click="exType3Wear">兑换并{{$store.state.nowEquipText[config.goods_type]}}</div>
    </div>
  </PopupBox>
</template>

<script>
import { _throttle } from '@/pages/luckyFlop/utils/tool.js'
import { getPageData } from '@/pages/luckyFlop/api/index'

export default {
  name: 'exchangePopup',
  props: ['pointIcon', 'pointName', 'my_goods', 'config'],
  components: {},
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
  mounted() {},
  computed: {
    needPointNum() {
      return Number(this.exchangeNum) * Number(this.config.price)
    }
  },
  watch: {},
  methods: {
    /**
     * 判断兑换类型
     */
    judegTypePo() {
      this.typePo = 1
      if (this.config.type == 'lucky_key') {
        this.typePo = 2
      } else if (this.config.goods_type == 'title' || this.config.goods_type == 'car' || this.config.goods_type == 'mic') {
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
        this.exchangeNum = this.exchangeNum < Math.floor(this.my_goods / this.config.price) ? this.exchangeNum + 1 : this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      this.exchangeNum = Math.floor(this.my_goods / this.config.price) > 0 ? Math.floor(this.my_goods / this.config.price) : 1
      if (this.exchangeNum < (Number(this.config.max_times) - Number(this.config.exchange_times))) {
        return 0
      } else {
        this.exchangeNum = (Number(this.config.max_times) - Number(this.config.exchange_times))
      }
      if (this.config.max_times == 0) {
        this.exchangeNum = Math.floor(this.my_goods / this.config.price)
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      getPageData({ type: 'exchange_goods_new', mark: { id: this.config.type, nums: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getPageData')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000),
    /**
     * 兑换钥匙
     */
    exKey1: _throttle(function () {
      getPageData({ type: 'exchange_lucky_key', mark: 1 }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getPageData')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000),
    exKey2: _throttle(function () {
      getPageData({ type: 'exchange_lucky_key', mark: 2 }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getPageData')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000),
    /**
     * 兑换称号/座驾/头饰
     */
    exType3: _throttle(function () {
      getPageData({ type: 'exchange_goods_new', mark: { id: this.config.type, nums: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getPageData')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000),
    exType3Wear: _throttle(function () {
      getPageData({ type: 'exchange_and_equip_goods', mark: this.config.type }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getPageData')
          this.clickClose()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.ownedNumText {
  font-size: 32px;
  text-align: center;
  img{
    width: 34px;
    height: 36px;
  }
}
.goodsIcon{
  width: 120px !important;
  height: 120px !important;
  border-radius: 12px;
  border: 4px solid #FFBDFD;
  background: #FEFAEF;
  text-align: center;
  margin: 10px auto 0 auto;
  &.titleIcon{
    width: 210px !important;
    height: 96px !important;
  }
}
.goodsDesc{
  text-align: center;
  font-size: 26px;
  margin: 10px auto 0 auto;
}
.computeDiv {
  width: 440px;
  height: 48px;
  text-align: center;
  margin: 20px auto 0 auto;
  font-size: 28px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  .min {
    width: 72px;
    height: 48px;
    background: #6359E4;
  }
  .minus {
    width: 48px;
    height: 48px;
    background: #6359E4;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .exchangeNumDiv {
    width: 120px;
    height: 48px;
    background: #6359E4;
    font-size: 36px;
    color: #fffaa6;
  }
  .plus {
    width: 48px;
    height: 48px;
    background: #6359E4;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .max {
    width: 72px;
    height: 48px;
    background: #6359E4;
  }
}
.type1{
  margin: 20px 0 0 0;
  position: relative;
  .partingLine {
    width: 600px;
    height: 2px;
    background: #ffffff;
  }
  .needNumDiv {
    left: 50px;
    top: 40px;
    font-size: 32px;
    margin: 50px 0 20px 40px;
    text-align: left;
    img{
      width: 34px;
      height: 36px;
    }
  }
  .exchangeBtn {
    width: 120px;
    height: 60px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 30px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 32px;
    color: #4A50D1;
    line-height: 60px;
    text-align: center;
  }
}
.keyDesc{
  text-align: center;
  font-size: 26px;
  margin: 20px auto 0 auto;
  img{
    width: 34px;
    height: 36px;
  }
}
.type2{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 32px;
  p{
    font-size: 24px;
  }
  img{
    width: 34px;
    height: 36px;
  }
  .exchangeBtn1{
    width: 240px;
    height: 84px;
    background: linear-gradient(180deg, #F599FF, #8A6AF3);
    border-radius: 36px;
    border: 2px solid #F9C9FF;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
  .exchangeBtn2{
    width: 240px;
    height: 84px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 36px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    color: #4A50D1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
}
.needNumType3{
  text-align: center;
  font-size: 26px;
  margin: 10px auto 0 auto;
  img{
    width: 34px;
    height: 36px;
  }
}
</style>
