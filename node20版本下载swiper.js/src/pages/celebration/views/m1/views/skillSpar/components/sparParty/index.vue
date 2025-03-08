<template>
  <OutBox class="SparBack" title="mk1_title_10.png">
    <img :src="IconPath(statusIconMap[0])" class="openStatus position-absolute" />
    <div class="openDate position-absolute text-center flex align-center justify-center">11.18-11.24<br>开启</div>
    <p class="line-height-100">消耗晶石可获得晶石积分</p>
    <div class="get_point flex align-center justify-center"><div class="left">累计获得晶石积分：</div><div class="right">{{ point_accumulated }}</div></div>
    <PublicCard class="point_show flex-column align-center justify-center">
      <div class="item flex align-center justify-center line-height-100" v-for="item in spend_list" :key="item.id">
        <span class="flex align-center justify-center">每消耗{{ item.target }}个<img :src="IconPath(item.icon_s)" />：<i>晶石积分+1</i></span>
        <span class="flex align-center justify-center">已消耗：{{ numberLimit(item.current, 6) }}</span>
      </div>
    </PublicCard>
    <div class="use_point flex align-center justify-center"><div class="left">可用晶石积分：</div><div class="right">{{ spar_point }}</div></div>
    <div class="point_reward flex align-center justify-center">
      <PublicCard class="point_award_item flex-column align-center" v-for="item in exchange_list" :key="item.id">
        <p>消耗<span>{{ item.price }}个晶石积分</span>兑换</p>
        <div class="icon-content">
          <div class="icon"><img :src="IconPath(item.icon)" /></div>
          <div class="text flex align-center justify-center">{{ item.name }}+{{ item.nums }}</div>
          <img :src="IconPath('mk4_7.png')" class="update position-absolute" />
        </div>
        <p>每日限兑：{{ item.current }}/{{ item.max }}</p>
        <PublicButton :hasRight="item.current == 50 ? 2 : 1" class="excharge_btn" @click="openPopup(item)">{{ item.current == 50 ? '已兑完' : '兑换' }}</PublicButton>
      </PublicCard>
    </div>
    <ExchangeSparPopup v-if="isShowExchangeSparPopup" v-bind="exchangeSparPopupData" @update="(param) => $emit('update', param)" @clickClose="isShowExchangeSparPopup = false" />
  </OutBox>
</template>

<script>
import { numberLimit } from '@/utils/tool'
const ExchangeSparPopup = () => import('./exchangeSparPopup.vue')
export default {
  name: 'SparBack',
  components: { ExchangeSparPopup },
  props: ['point_accumulated', 'spend_list', 'spar_point', 'exchange_list'],
  data() {
    return {
      statusIconMap: Object.freeze(['mk4_4.png', 'mk4_3.png', 'mk4_5.png']),
      exchangeSparPopupData: { pointName: '晶石积分', id: '' }, // 兑换好礼弹框数据
      isShowExchangeSparPopup: false
    }
  },
  methods: {
    numberLimit,
    openPopup(param) {
      if (param.current >= 50) return
      if (param.price > this.spar_point) return this.$toast('积分不足')
      this.exchangeSparPopupData.id = param.id
      this.isShowExchangeSparPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.SparBack {
  padding-left: 8px;
  .openStatus {
    top: -59px;
    left: 150px;
    width: 120px;
    height: 99px;
  }
  .openDate {
    top: -20px;
    right: 11px;
    width: 215px;
    height: 107px;
    background: url('@/pages/celebration/assets/mk2_8.png') no-repeat left top/100% 100%;
    font-weight: 800;
    font-size: 24px;
    color: #F552AE;
    line-height: 24px;
  }
  >p {
    padding-left: 221px;
    margin-bottom: 24px;
    font-weight: 500;
    font-size: 28px;
    color: #6E56E7;
  }
  .get_point,
  .use_point {
    margin: 0 auto;
    padding: 0 22px;
    justify-content: space-between;
    color: #ffffff;
    font-size: 24px;
    width: 660px;
    height: 60px;
    background: #7155D7;
    border-radius: 8px 8px 0 0;
    > .left {
      font-size: 24px !important;
    }
    > .right {
      font-size: 24px !important;
      color: #fff883;
    }
  }
  .point_show {
    margin: 18px auto 23px;
    width: 664px;
    height: 184px;
    .item {
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: rgba(102, 72, 201, 0.6);
      border-radius: 8px;
      > span {
        // width: 100%;
        // height: 100%;
        // line-height: 30px;
        &:nth-child(1) {
          justify-content: flex-start;
          padding-left: 20px;
          i {
            color: #fff883;
          }
        }
        &:nth-child(2) {
          min-width: 154px;
          height: 60px;
          padding-left: 44px;
          padding-right: 8px;
          font-size: 24px;
          color: #5638C3;
          background: url('@/pages/celebration/assets/mk4_8.png') no-repeat left top/100% 100%;
        }
      }
      img {
        height: 50px;
        margin: 0 2px;
      }
    }
    .item:nth-of-type(1) {
      margin-bottom: 12px;
    }
  }
  .use_point {
    margin: 0 auto 10px;
  }
  .point_reward {
    margin: 0 auto 39px;
    width: 660px;
    justify-content: space-between;
    .point_award_item {
      width: 324px;
      height: 364px;
      font-size: 28px;
      color: #fff;
      padding-top: 22px;
      background: linear-gradient(180deg, #B76AFF, #937CF9, #93AAFF);
      -webkit-background-clip: padding-box;
      p {
        span {
          color: #fffaa6;
        }
        &:nth-child(3) {
          font-size: 24px;
        }
      }
      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 188px;
        height: 128px;
        padding: 4px;
        margin: 32px 0 18px; /*todo 道具左边距*/
        border-radius: 16px;
        background-color: #DBC1FF; /*todo 任务列表中道具边框颜色*/
        .update {
          top: -20px;
          right: -35px;
          width: 128px;
          height: 41px;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 84px;
          border-radius: 12px 12px 0 0;
          background-color: #FFFFFF; /*todo 任务列表中道具图标背景颜色*/
          // 图片大小
          > img {
            width: auto;
            height: 100%;
          }
        }
        .text {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 0 12px 12px;
          font-size: 24px;
          white-space: nowrap;
          line-height: 100%;
          background-color: #7954E4; /*todo 背景色*/
          color: #fff; /*todo 字体颜色*/
        }
      }
      .excharge_btn {
        font-size: 28px;
        margin-top: 14px;
        width: 164px;
        height: 64px;
      }
    }
  }
  .rule-text {
    margin-left: 64px;

    i {
      color: #6fffff;
    }
  }
}
</style>
