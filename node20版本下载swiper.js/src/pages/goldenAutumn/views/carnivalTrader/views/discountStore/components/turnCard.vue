<template>
  <div class="turnCard">
    <div class="card" v-for="item in gift_list" :key="item.id">
      <!-- 未翻的卡 -->
      <div :class="['flipItem', item.isFilp ? 'flip' : null]" v-if="item.is_flip === false" @click="turnCardCk(item)" @animationend="FlipEnd(item)">
        <!-- 卡背 -->
        <div class="cardBack" v-if="!item.flipEnd"></div>
        <!-- 卡面 -->
        <div :class="['cardFace',item.flipEnd ? 'flipEnd' : null,item.discount ? 'rare' : 'null']" v-if="item.isFilp">
          <div class="awardIcon">
            <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
          </div>
          <div class="numText">{{ item.award.text }}</div>
          <div :class="['buyBtn', item.buy_status?'buyed':'canBuy']">
            <template v-if="!item.buy_status">
              <div>{{item.price}}</div>
              <div :class="['coinIcon', `icon${item.price_type}`]"></div>
              <div class="oldPrice" v-if="item.is_show_price">原价：{{item.show_price}}</div>
            </template>
          </div>
          <div v-if="item.discount" class="rareIcon"></div>
        </div>
      </div>
      <!-- 已翻的卡 -->
      <div :class="['cardTurned', item.discount ? 'rare' : 'null']" v-else>
        <div class="awardIcon">
          <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
        </div>
        <div class="numText">{{ item.award.text }}</div>
        <div :class="['buyBtn', item.buy_status?'buyed':'canBuy']" @click="buyBtnCk(item)">
          <template v-if="!item.buy_status">
            <div>{{item.price}}</div>
            <div :class="['coinIcon', `icon${item.price_type}`]"></div>
            <div class="oldPrice" v-if="item.is_show_price">原价：{{item.show_price}}</div>
          </template>
        </div>
        <div v-if="item.discount" class="rareIcon"></div>
      </div>
    </div>
    <div class="filpAllBtn" @click="filpAllBtnCk"></div>
  </div>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/index.js'

export default {
  name: 'turnCardVue',
  props: ['gift_list'],
  data() {
    return {
      isShowreRresh: false,
      isFlipingF: false // 是否在翻牌中
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // console.log('gift_list:', this.gift_list)
  },
  methods: {
    /**
     * 翻卡
     */
    turnCardCk(item) {
      // if (item.is_flip === false && this.isFlipingF == false) {
      if (item.is_flip === false) {
        console.log('翻卡id:', item.id)
        getPageData({ type: 'carnival_trader_flip_card', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            setTimeout(() => {
            console.log(res)
            this.$set(item, 'award', res.data.gift_list.award)
            this.$set(item, 'buy_status', res.data.gift_list.buy_status)
            this.$set(item, 'is_show_price', res.data.gift_list.is_show_price)
            this.$set(item, 'show_price', res.data.gift_list.show_price)
            this.$set(item, 'price', res.data.gift_list.price)
            this.$set(item, 'price_type', res.data.gift_list.price_type)
            this.$set(item, 'discount', res.data.gift_list.discount)
              // this.$set(item, 'isFliping', true)
              this.$set(item, 'isFilp', true) // isFilp是否播放翻卡动画，true即开始播放
              // this.isFlipingF = true
              // this.$emit('mascotStatusUpdate', res.data.mascot_status)
            }, 200)
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          }
        })
      }
      // } else {
      //   this.$toast('手速太快了')
      // }
    },
    /**
     * 一键翻牌
     */
    filpAllBtnCk() {
      console.log('一键翻牌')
    },
    FlipEnd(item) {
      console.log('卡牌翻完')
      this.$set(item, 'flipEnd', true) // flipEnd是否翻完，true即不再显示卡背
      // this.getUserInformationSon()
      // this.isFlipingF = false
      this.$set(item, 'is_flip', true)
    },
    getUserInformationSon: _throttle(function (item) {
      this.$emit('getHomePage')
    }, 1000),
    /**
     * 购买
     */
    buyBtnCk(item) {
      console.log(item)
      if (item.buy_status == false) {
        this.$emit('buyFn', item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.turnCard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  position: relative;
  .card {
    width: 204px;
    height: 267px;
    position: relative;
    @keyframes CardRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .flip {
      animation: CardRotate 2s;
      // transform: rotateY(180deg); // 点击容器，翻转图片
    }
    .flipItem {
      width: 204px;
      height: 267px;
      transform-style: preserve-3d; // 开启3D透视
      backface-visibility: hidden; // 该行在电脑与手机的适配有问题
      .cardBack {
        width: 204px;
        height: 267px;
        background: url('@/pages/goldenAutumn/assets/mk4_10.png') no-repeat left top/100% 100%;
      }
      .cardFace {
        width: 204px;
        height: 267px;
        position: absolute;
        left: 0;
        top: 0;
        background: url('@/pages/goldenAutumn/assets/mk4_11.png') no-repeat left top/100% 100%;
        backface-visibility: hidden;
        transform: rotateY(180deg); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
        &.flipEnd {
          // background: red;
          transform: rotateY(0deg);
          backface-visibility: visible;
        }
        &.rare {
          background: url('@/pages/goldenAutumn/assets/mk4_12.png') no-repeat left top/100% 100%;
        }
        .awardIcon {
          width: 120px;
          height: 120px;
          background: #FFFFFF;
          border-radius: 20px;
          border: 4px solid #EBC95B;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translate(-50%);
        }
        .numText {
          font-size: 24px;
          color: #895731;
          position: absolute;
          top: 160px;
          left: 50%;
          transform: translate(-50%);
        }
        .buyBtn {
          width: 164px;
          height: 57px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          bottom: 10px;
          &.buyed{
            background: url('@/pages/goldenAutumn/assets/mk4_35.png') no-repeat left top/100% 100%;
          }
          &.canBuy{
            background: url('@/pages/goldenAutumn/assets/mk4_34.png') no-repeat left top/100% 100%;
          }
          .coinIcon{
            width: 46px*0.8;
            height: 46px*0.8;
            margin: 0 -10px 0 2px;
            vertical-align: middle;
            &.icongamegold{
              background: url('@/pages/goldenAutumn/assets/mk4_7.png') no-repeat left top/100% 100%;
            }
            &.iconmasonry{
              background: url('@/pages/goldenAutumn/assets/mk4_8.png') no-repeat left top/100% 100%;
            }
          }
          .oldPrice{
            font-size: 18px;
            color: #DD7200;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
            text-decoration: line-through;
            text-decoration-color: #EF5619;
          }
        }
      }
    }
    .cardTurned {
      width: 204px;
      height: 267px;
      background: url('@/pages/goldenAutumn/assets/mk4_11.png') no-repeat left top/100% 100%;
      position: relative;
      &.rare {
        background: url('@/pages/goldenAutumn/assets/mk4_12.png') no-repeat left top/100% 100%;
      }
      .awardIcon {
        width: 120px;
        height: 120px;
        background: #FFFFFF;
        border-radius: 20px;
        border: 4px solid #EBC95B;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translate(-50%);
      }
      .numText {
        font-size: 24px;
        color: #895731;
        position: absolute;
        top: 160px;
        left: 50%;
        transform: translate(-50%);
      }
      .buyBtn {
        width: 164px;
        height: 57px;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 10px;
        &.buyed{
          background: url('@/pages/goldenAutumn/assets/mk4_35.png') no-repeat left top/100% 100%;
        }
        &.canBuy{
          background: url('@/pages/goldenAutumn/assets/mk4_34.png') no-repeat left top/100% 100%;
        }
        .coinIcon{
          width: 46px*0.8;
          height: 46px*0.8;
          margin: 0 -10px 0 2px;
          vertical-align: middle;
          &.icongamegold{
            background: url('@/pages/goldenAutumn/assets/mk4_7.png') no-repeat left top/100% 100%;
          }
          &.iconmasonry{
            background: url('@/pages/goldenAutumn/assets/mk4_8.png') no-repeat left top/100% 100%;
          }
        }
        .oldPrice{
          font-size: 18px;
          color: #DD7200;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
          text-decoration: line-through;
          text-decoration-color: #EF5619;
        }
      }
      .rareIcon {
        width: 112px;
        height: 131px;
        background: url('@/pages/goldenAutumn/assets/mk4_17.png') no-repeat left top/100% 100%;
        position: absolute;
        left: -30px;
        top: -50px;
      }
    }
    @keyframes CardRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .flip {
      animation: CardRotate 2s;
      // transform: rotateY(180deg); // 点击容器，翻转图片
    }
  }
  .filpAllBtn{
    width: 317px;
    height: 116px;
    background: url('@/pages/goldenAutumn/assets/mk4_15.png') no-repeat left top/100% 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 610px;
  }
}
</style>
