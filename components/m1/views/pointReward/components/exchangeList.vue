<template>
  <OutBox class="exchangeList" title="title_1.png">
    <div class="pointNum radius-999 width-fit flex align-center justify-center">我的{{config.pointName}}<img :src="IconPath(config.pointIcon)" />：{{config.my_goods}}</div>
    <PublicCard v-for="(goods,index) in config.goods_list" size="2" :key="index" class="exchangeCard flex position-relative">
      <div class="award flex flex-column">
        <lazy-component class="icon flex align-center justify-center position-relative">
          <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
          <div v-if="isLock(goods.spend_cond)" class="lockStatus flex align-center justify-center"><img :src="IconPath('mk1_5.png')" /></div>
          <!--<div v-if="goods.mark" class="priceLabel flex align-center justify-center line-height-1 position-absolute">{{goods.mark}}</div>-->
        </lazy-component>
        <div class="text flex-1 flex justify-center align-center text-nowrap line-height-1">{{goods.goods_num_text}}</div>
      </div>
      <div class="desc flex-column justify-between line-height-1 position-relative h-100 width-fit">
        <p v-if="goods.type==='lucky_key'">消耗<span>{{goods.price}}个{{config.pointName}}</span>兑换&nbsp;第二个<span>半价</span></p>
        <p v-else>消耗<i v-if="goods.mark" class="oldPrice">{{goods.mark}}</i><span>{{goods.price}}个{{config.pointName}}</span>兑换</p>
        <p v-if="goods.max_times==0" :class="{Middle_Text:isLock(goods.spend_cond)}">不限兑换次数</p>
        <p v-else :class="{Middle_Text:isLock(goods.spend_cond)}">限兑：{{goods.exchange_times}}/{{goods.max_times}}</p>
        <p class="lockStatus_Text" v-if="isLock(goods.spend_cond)">累计消耗{{goods.spend_cond}}个{{config.pointName}}解锁</p>
      </div>
      <PublicButton :disabled="[2]" v-if="!goods.spend_cond||goods.spend_cond<=config.spend_point" class="exchangeBtn" :hasRight="goods.has_right" @click="$emit('clickExchangeBtn',goods)">{{goods.has_right==1?'兑换':'已兑换'}}</PublicButton>
      <img v-if="discounts.includes(goods.type)" :src="IconPath('mk1_4.png')" class="discountLabel pointer-none position-absolute" />
    </PublicCard>
    <div class="rules-text">
      <ul>
        <li><span></span>钥匙可在钥匙收藏家中获取限定奖励</li>
        <li ><span></span>消耗<img :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      discounts: Object.freeze(['tools_cbt', 'title'])
    }
  },
  methods: {
    // 是否锁定
    isLock(spend_cond) {
      return spend_cond && spend_cond > this.config.spend_point
    }
  }
}
</script>

<style lang="scss" scoped>
/*todo 奖励名称， 我的道具文本背景色*/
.textCommon {
  background-color: #D67BAC; // 背景色
  color: #fff; // 字体颜色
}
$cardBorderRadius: 10px; /*todo 卡片圆角,卡片奖励左上和左下圆角,锁定阴影左上角圆角*/
$cardBorderWidth: 4px; /*todo 卡片边框宽度*/
.exchangeList {
  // 顶部道具数量
  .pointNum {
    margin: 0 auto 20px;
    padding: 0 10px;
    min-width: 320px;
    height: 48px;
    font-size: 28px;
    @extend .textCommon;
    > img {
      width: 44px;
      height: auto;
    }
  }
  .exchangeCard {
    margin: 0 auto 17px;
    width: 668px;
    height: 168px;
    .discountLabel {
      top: $cardBorderWidth;
      right: $cardBorderWidth;
      width: 77px;
    }
    .award {
      height: 100%;
      width: 240px;
      .icon {
        width: 100%;
        height: 124px;
        background: linear-gradient(180deg, #FFD1E9, #FFFFFF);
        border-radius: $cardBorderRadius 0 0 0;
        //.priceLabel {
        //  background: linear-gradient(90deg, #ff699e, #9a69ff);
        //  border: 2px solid #ffffff;
        //  font-weight: 500;
        //  font-size: 24px;
        //  color: #ffffff;
        //}
        .chat_bubble, .chat_bubble_pub {
          width: 180px;
          height: 180px;
        }
        .title {
          width: 210px;
          height: 96px;
        }
        .mic,.voice {
          width: 120px;
          height: 120px;
        }
        // 锁定样式
        .lockStatus {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.3);
          border-radius: $cardBorderRadius 0 0 0;
          > img {
            width: 30px;
            height: auto;
          }
        }
      }
      // 图片下方字体样式
      .text {
        border-radius: 0 0 0 $cardBorderRadius;
        font-size: 24px;
        font-weight: 500;
        @extend .textCommon;
      }
    }
    // 中间字体样式
    .desc {
      z-index: 1;
      padding: 31px 0 33px 24px;
      span {
        color: #fffaa6;
      }
      p {
        .oldPrice {
          position: relative;
          color: #D0269E; /*老价格颜色*/
          margin: 0 5px;
          font-weight: bold;
          &::before {
            content: '';
            position: absolute;
            width: 115%;
            height: 2px;
            background: #FFBFE3; /*todo 删除线颜色*/
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg); /*todo 删除线倾斜*/
          }
        }
        &:nth-child(1) {
          font-size: 30px;
          //font-weight: 500;
          color: #692E19;
        }
        &:nth-child(2) {
          font-size: 24px;
          color: #F14B35;
        }
      }
      .Middle_Text {
        font-size: 24px;
      }
      .lockStatus_Text {
        font-size: 26px;
      }
    }
    // 兑换按钮
    .exchangeBtn {
      position: absolute;
      z-index: 2;
      bottom: 17px;
      right: 21px;
      width: 126px;
      height: 54px;
    }
  }
}
</style>
