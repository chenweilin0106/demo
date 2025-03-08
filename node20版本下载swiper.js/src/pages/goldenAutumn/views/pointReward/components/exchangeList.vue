<template>
  <OutBox class="exchangeList" title="title_1.png">
    <!-- 我的道具 -->
    <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ my_goods }}</div>
    <PublicCard v-for="goods in goods_list" :key="goods.goods_name" class="exchange-item">
      <div class="left-content flex flex-column">
        <!-- 道具图标 -->
        <div class="icon-content">
          <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
          <!-- 锁定状态 -->
          <div v-if="isLock(goods.spend_cond)" class="lockStatus flex align-center justify-center"><img :src="IconPath('mk1_2.png')" /></div>
          <div v-if="goods.mark" class="priceLabel flex align-center justify-center line-height-100 position-absolute">{{ goods.mark }}</div>
        </div>
        <!-- 道具名称 -->
        <div class="goodsName flex-1 flex justify-center align-center text-nowrap line-height-100">{{ goods.goods_num_text }}</div>
      </div>
      <!-- 道具描述 -->
      <div class="goodsText">
        <p v-if="goods.type === 'lucky_key'">
          消耗<span>{{ goods.price }}个{{ pointName }}</span>兑换 第二个<span>半价</span>
        </p>
        <!--折扣价-->
        <p v-else>
          消耗<i v-if="goods.mark" class="oldPrice">{{ goods.mark }}</i><span>{{ goods.price }}个{{ pointName }}</span>兑换
        </p>
        <p v-if="goods.max_times == 0" :class="{ Middle_Text: isLock(goods.spend_cond) }">不限兑换次数</p>
        <!-- 判断是否是锁定状态样式 -->
        <p v-else :class="{ Middle_Text: isLock(goods.spend_cond) }">限兑：{{ goods.exchange_times }}/{{ goods.max_times }}</p>
        <!-- 锁定状态 -->
        <p class="lockStatus_Text" v-if="isLock(goods.spend_cond)">累计消耗{{ goods.spend_cond }}个{{ pointName }}解锁</p>
      </div>
      <!-- 兑换按钮 -->
      <PublicButton
        v-if="!goods.spend_cond || goods.spend_cond <= spend_point"
        class="exchange-item-button"
        :hasRight="goods.has_right"
        textType="3"
        :buttonStyle="{ 1: 'button-noFinish', 2: 'button-finish' }"
        @click="$emit('clickExchangeBtn', goods)"
      />
      <!--右上角特惠角标 2024七夕-->
      <img v-if="goods.goods_name == '藏宝图'" :src="IconPath('mk1_4.png')" class="discountLabel position-absolute" />
    </PublicCard>
    <!-- 规则说明 -->
    <div class="rules-text">
      <ul>
        <li><span></span>钥匙可在钥匙收藏家中获取限定奖励</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: ['my_goods', 'goods_list', 'pointIcon', 'pointName', 'spend_point'],
  methods: {
    // 是否锁定
    isLock(spend_cond) {
      return spend_cond && spend_cond > this.spend_point
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/pointReward";
@mixin textMixin() { /*todo 奖励名称， 我的道具文本背景色*/
  background-color: #B55023; // 背景色
  color: #fff; // 字体颜色
}
$cardBorderRadius: 12px; /*todo 卡片圆角,卡片奖励左上和左下圆角,锁定阴影左上角圆角*/
.exchangeList {
  // 顶部道具数量
  .my-goods {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    padding: 0 10px;
    min-width: 320px;
    width: fit-content;
    height: 48px;
    border-radius: 24px;
    font-size: 28px;
    @include textMixin;
    > img {
      width: 44px; /*todo 我的道具图标宽度*/
      height: 39px; /*todo 我的道具图标高度*/
    }
  }
  .exchange-item {
    position: relative;
    display: flex;
    margin: 0 auto 23px; /*todo 卡片下方间距*/
    width: 660px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
    height: 160px; /*todo 卡片高度 不需要加上外圈描边宽度*/
    border-radius: $cardBorderRadius;
    /*右上角特惠角标 2024七夕*/
    .discountLabel {
      top: -4px;
      right: -4px;
      width: 77px;
      height: 77px;
    }
    // 图片样式
    .left-content {
      height: 100%;
      width: 240px;
      //background: url('@/pages/goldenAutumn/assets/') no-repeat left top/100% 100%; // 背景
      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 124px;
        background: linear-gradient(180deg, #FFECA9, #FFFFFF); /*todo 兑换列表中道具图标背景色*/
        border-radius: $cardBorderRadius 0 0 0;
        .priceLabel {
          background: linear-gradient(90deg, #ff699e, #9a69ff);
          border: 2px solid #ffffff;
          font-weight: 500;
          font-size: 24px;
          color: #ffffff;
        }
        .chat_bubble, .chat_bubble_pub {
          @extend .chat_bubble_container;
        }
        .title {
          @extend .title_container
        }
        .mic,.voice {
          @extend .mic_container;
        }
        // 锁定样式
        .lockStatus {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: $cardBorderRadius 0 0 0;
          > img {
            width: 30px;
            height: auto;
          }
        }
      }
      // 图片下方字体样式
      .goodsName {
        border-radius: 0 0 0 $cardBorderRadius;
        font-size: 24px;
        font-weight: 600;
        @include textMixin;
      }
    }
    // 中间字体样式
    > .goodsText {
      position: relative;
      z-index: 1;
      width: fit-content;
      height: 100%;
      padding: 28px 0 28px 25px;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: 100%;
      span {
        color: #fffaa6; /*todo 价格字体颜色*/
      }
      p {
        color: #fff; /*todo 兑换列表中间文本字体颜色*/
        .oldPrice {
          position: relative;
          color: #a86312;
          //text-decoration: line-through;
          margin: 0 5px;
          &::before {
            content: '';
            position: absolute;
            width: 110%;
            height: 2px;
            background: #dc4a23;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(10deg);
          }
        }
        &:nth-child(1) {
          //margin-top: 33px;
          font-size: 28px;
          font-weight: 500;
        }
        &:nth-child(2) {
          //margin-top: 36px;
          font-size: 24px;
        }
      }
      .Middle_Text {
        //margin: 10px 0 !important;
      }
      .lockStatus_Text {
        font-size: 26px !important;
      }
    }
    // 兑换按钮
    .exchange-item-button {
      position: absolute;
      z-index: 2;
      bottom: 18px; // 需要更新
      right: 21px; // 需要更新
      width: 120px; // 需要更新
      height: 48px; // 需要更新
    }
  }
}
</style>
