<template>
  <OutBox class="exchangeList" title="title_1.png" :hasCostume="true">
    <!-- 我的道具 -->
    <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ my_goods }}</div>
    <PublicCard v-for="goods in goods_list" :key="goods.goods_name" class="exchange-item">
      <div class="left-content flex flex-column">
        <!-- 道具图标 -->
        <div class="icon-content">
          <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
          <!-- 锁定状态 -->
          <div v-if="isLock(goods.spend_cond)" class="lockStatus flex align-center justify-center"><img :src="IconPath('mk1_2.png')" /></div>
          <!--<div v-if="goods.mark" class="priceLabel flex align-center justify-center line-height-100 position-absolute">-->
          <!--  {{ goods.mark }}-->
          <!--</div>-->
        </div>
        <!-- 道具名称 -->
        <div class="text-content flex-1 flex justify-center align-center text-nowrap line-height-100">{{ goods.goods_num_text }}</div>
      </div>
      <!-- 道具描述 -->
      <div class="text-content">
        <p v-if="goods.type === 'lucky_key' || goods.type === 'pretty_card'">
          消耗<span>{{ goods.price }}个{{ pointName }}</span
          >兑换 第二个<span>半价</span>
        </p>
        <!--折扣价-->
        <p v-else>
          消耗<i v-if="goods.mark" class="oldPrice">{{ goods.mark }}</i
          ><span>{{ goods.price }}个{{ pointName }}</span
          >兑换
        </p>
        <p v-if="goods.max_times == 0" :class="{ Middle_Text: isLock(goods.spend_cond) }">不限兑换次数</p>
        <!-- 判断是否是锁定状态样式 -->
        <p v-else :class="{ Middle_Text: isLock(goods.spend_cond) }">限兑：{{ goods.exchange_times }}/{{ goods.max_times }}</p>
        <!-- 锁定状态 -->
        <p class="lockStatus_Text" v-if="isLock(goods.spend_cond)">累计消耗{{ goods.spend_cond }}个{{ pointName }}解锁</p>
      </div>
      <!-- 兑换按钮 -->
      <PublicButton
        v-if="!goods.spend_cond || goods.spend_cond <= pageData.spend_point"
        class="exchange-item-button"
        :hasRight="goods.has_right"
        textType="3"
        :buttonStyle="{ 1: 'button-noFinish', 2: 'button-finish' }"
        @click="$emit('clickExchangeBtn', goods)"
      />
    </PublicCard>
    <!-- 规则说明 -->
    <div class="rules-text">
      <ul>
        <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
        <li>赠送权等限定奖励</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: ['my_goods', 'goods_list', 'pointIcon', 'pointName'],
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    // 需要自测 是否锁定
    isLock(spend_cond) {
      return spend_cond && spend_cond > this.pageData.spend_point
    }
  }
}
</script>

<style lang="scss" scoped>
@import './pointRewardMixin';
$exchangeListTopPadding: 168px; // 兑换列表上方padding
$exchangeListTopMargin: 56px; // 兑换列表上方margin
// 我的道具数量（道具名由活动决定）
@mixin myPointNum() {
  @include textMixin;
  > img {
    @include pointIconSize(41px, 38px);
  }
}
// 兑换卡片大小
@mixin exchangeCard() {
  @include publicCardSize(660px, 160px, 25px, 12px);
}
// 兑换好礼左侧
@mixin exchangeLeft() {
  width: 240px;
  //background: url('@/pages/618/assets/') no-repeat left top/100% 100%; // 背景
  .icon-content {
    height: 124px;
    background: linear-gradient(180deg, #fcf1bd, #ffffff); // 兑换列表中道具图标背景色
    border-radius: 12px 0 0 0;
    .priceLabel {
      background: linear-gradient(90deg, #ff699e, #9a69ff);
      border: 2px solid #ffffff;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
    }
  }
  // 图片下方字体样式
  .text-content {
    font-size: 24px;
    font-weight: 600;
    border-radius: 0 0 0 12px;
    @include textMixin;
  }
}
$exchangeMiddleTxtFontColor: #fff; // 兑换列表中中间文本字体颜色
$exchangeMiddlePriceFontColor: #fffaa6; // 兑换列表中中间文本背景颜色
.exchangeList {
  margin-top: $exchangeListTopMargin;
  padding-top: $exchangeListTopPadding;
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
    @include myPointNum;
  }
  .exchange-item {
    position: relative;
    display: flex;
    @include exchangeCard;
    // 图片样式
    .left-content {
      height: 100%;
      @include exchangeLeft;
      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .priceLabel {
          top: -13px;
          right: -29px;
          height: 44px;
          padding: 0 17px;
        }
        .title {
          ::v-deep .jsonBox {
            width: 90%;
          }
        }
        @mixin micAndVoice($width: 117px, $height: 116px) {
          width: $width;
          height: $height;
        }
        .mic {
          @include micAndVoice;
        }
        .voice {
          @include micAndVoice;
        }
        // 图片icon
        img {
          height: 100%;
        }
        // 锁定样式
        .lockStatus {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px 0 0 0;
          > img {
            width: 30px;
            height: auto;
          }
        }
      }
      // 图片下方字体样式
      .text-content {
        font-size: 24px;
        font-weight: 600;
        border-radius: 0 0 0 12px;
      }
    }

    // 中间字体样式
    > .text-content {
      position: relative;
      z-index: 1;
      width: fit-content;
      height: 100%;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      padding-left: 14px;
      span {
        color: $exchangeMiddlePriceFontColor;
      }
      p {
        color: $exchangeMiddleTxtFontColor;
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
          margin-top: 33px;
          font-size: 28px;
          font-weight: 500;
        }
        &:nth-child(2) {
          margin-top: 36px;
          font-size: 24px;
        }
      }
      .Middle_Text {
        margin: 10px 0 !important;
      }
      .lockStatus_Text {
        font-size: 26px !important;
      }
    }
    // 按钮样式
    .exchange-item-button {
      position: absolute;
      z-index: 2;
      bottom: 18px;
      right: 21px;
      width: 120px;
      height: 48px;
      border-radius: 24px;
    }
  }
}
</style>
