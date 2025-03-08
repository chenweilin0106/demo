<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <div class="ownedNumText">剩余{{pointName}}:&ensp;{{my_goods}}</div>
    <PublicImg :class="['goodsIcon', config.goods_type=='title'?'titleIcon':null]" :imgName="config.icon" :imgType="config.type"></PublicImg>
    <div class="goodsDesc" v-if="typePo==1">{{config.text}}+{{exchangeNum*config.nums}}<span v-if="$store.state.needNowEquipList.includes(config.type)||config.type.includes('pst_privilege')">天</span></div>
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
      <div class="needNumDiv">共消耗{{pointName}}：{{needPointNum}}</div>
      <div class="exchangeBtn" @click="exchangeBtnCk">兑换</div>
    </div>
    <div class="type2" v-if="typePo==2">
      <div class="keyDesc">{{config.label}}靓号券</div>
      <div class="keyDesc">消耗<img :src="IconPath(pointIcon)" />：{{needPointNum}}</div>
      <div class="exchangeBtn1" @click="exKey1">兑换</div>
    </div>
    <div class="needNumType3" v-if="typePo==3">共消耗<img :src="IconPath(pointIcon)" />：{{needPointNum}}</div>
    <div class="type2" v-if="typePo==3">
      <div class="exchangeBtn1" @click="exType3">兑换</div>
      <div class="exchangeBtn2" @click="exType3Wear">兑换并{{$store.state.nowEquipText[config.goods_type]}}</div>
    </div>
  </PopupBox>
</template>

<script>
import { _throttle } from '@/pages/dragonBoat/utils/tool.js'
import { getPageData } from '@/pages/dragonBoat/api/index'

export default {
  name: 'exchangePopup',
  props: ['pointIcon', 'pointName', 'my_goods', 'config'],
  components: {},
  data() {
    return {
      isShowPo: true,
      exchangeNum: 1, // 兑换个数
      typePo: 1 // 兑换类型 1:普通类型 2:兑换靓号券包 3:称号/座驾/头饰
    }
  },
  created() {
    this.judegTypePo()
  },
  mounted() {
    console.log(this.config)
  },
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
      // if (this.config.goods_id == 4) {
      //   this.typePo = 2
      // }
      // if (this.config.type == 'lucky_key') {
      //   this.typePo = 2
      // } else if (this.config.goods_type == 'title' || this.config.goods_type == 'car' || this.config.goods_type == 'mic') {
      //   this.typePo = 3
      // }
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
      if (this.exchangeNum < (Number(this.config.max) - Number(this.config.current)) || this.config.max == -1) {
        this.exchangeNum = this.exchangeNum < Math.floor(this.my_goods / this.config.price) ? this.exchangeNum + 1 : this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      this.exchangeNum = Math.floor(this.my_goods / this.config.price) > 0 ? Math.floor(this.my_goods / this.config.price) : 1
      if (this.exchangeNum < (Number(this.config.max) - Number(this.config.current))) {
        return 0
      } else {
        console.log(1)
        this.exchangeNum = (Number(this.config.max) - Number(this.config.current))
      }
      if (this.config.max == -1) {
        this.exchangeNum = Math.floor(this.my_goods / this.config.price)
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      getPageData({ type: 'spar_exchange', mark: { id: this.config.id, nums: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.clickClose()
          this.$emit('getPageData')
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
      getPageData({ type: 'naughty_convert', mark: { id: this.config.goods_id, nums: 1 } }).then((res) => {
        if (res.errno == 0) {
          this.clickClose()
          this.$emit('openReceiveAwardsPopup', res.data.awards)
          // this.$toast(res.errmsg)
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
    width: 40px;
    height: 40px;
    margin: 0 5px;
    vertical-align: middle;
  }
}
.goodsIcon{
  width: 120px !important;
  height: 120px !important;
  border-radius: 12px;
  border: 4px solid #C3F6FF;
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
    background: #52A4AA;
  }
  .minus {
    width: 48px;
    height: 48px;
    background: #52A4AA;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .exchangeNumDiv {
    width: 120px;
    height: 48px;
    background: #52A4AA;
    font-size: 36px;
    color: #fffaa6;
  }
  .plus {
    width: 48px;
    height: 48px;
    background: #52A4AA;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .max {
    width: 72px;
    height: 48px;
    background: #52A4AA;
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
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 30px;
    border: 3px solid #FFFFFF;
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 32px;
    color: #4D7DDD;
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
    width: 320px;
    height: 72px;
    background: linear-gradient(180deg, #FFD695, #EB63A1);
    border-radius: 36px;
    border: 2px solid linear-gradient(0deg, #A42E76, #CF7F8B);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px auto 0 auto;
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
