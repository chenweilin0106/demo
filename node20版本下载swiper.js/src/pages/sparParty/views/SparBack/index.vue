<template>
  <OutBox class="SparBack">
    <!-- 累计获得积分 -->
    <div class="get_point flex-center"><div class="left">累积获得积分：</div><div class="right">{{ point_accumulated }}</div></div>
    <!-- 已消耗积分 -->
    <div class="point_show flex-center">
      <div
        class="item flex-center"
        v-for="item in spend_list"
        :key="item.id"
      >
        <span class="flex-center">每消耗{{ item.target }}个<img :src="IconPath(item.icon_s)" />：<i>积分+1</i></span>
        <span class="flex-center">已消耗：{{ character_omission(item.current, 6) }}</span>
      </div>
    </div>
    <!-- 可用积分 -->
    <div class="use_point flex-center"><div class="left">可用积分：</div><div class="right">{{ spar_point }}</div></div>
    <!-- 兑换 -->
    <div class="point_reward flex-center">
      <div
        class="point_award_item"
        v-for="item in exchange_list"
        :key="item.id"
      >
        <p>消耗<span>{{ item.price }}个积分</span>兑换</p>
        <div class="img-box"><div class="img-top flex-center"><img :src="IconPath(item.icon)" /></div><div class="img-bottom flex-center">{{ item.name }}+{{ item.nums }}</div></div>
        <p>每日限兑：{{ item.current }}/{{ item.max }}</p>
        <div class="excharge_btn" :class="ButtonStyle('2', item.current == 50 ? 2 : 1)" @click="openPopup(item)">{{ item.current == 50 ? '已兑完' : '兑换' }}</div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>消耗晶石获得的积分可用于<i>兑换绿晶石和紫晶石</i></li>
        <li><span></span>活动期间绿晶石和紫晶石<i>每日各限兑50次</i></li>
        <li><span></span>积分由系统<i>自动派发</i>，无需手动领取</li>
      </ul>
    </div>
    <ExchangeSparPopup v-if="showExchangeSparPopup" v-bind="exchangeSparPopupData" @update="updateData" @clickClose="showExchangeSparPopup = false" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/pages/sparParty/api'
import ExchangeSparPopup from '@/pages/sparParty/popups/exchangeSparPopup.vue'
export default {
  name: 'SparBack',
  components: { ExchangeSparPopup },
  data() {
    return {
      spend_list: [
        { id: 2, name: '绿晶石', icon_s: 'ljs_60_60.png', current: 0, target: 100 },
        { id: 1, name: '紫晶石', icon_s: 'zjs_60_60.png', current: 0, target: 25 }
      ], // 消费列表
      point_accumulated: 0, // 累计获得积分
      spar_point: 0, // 可用积分
      exchange_list: [
        { id: 2, name: '绿晶石', price: 10, current: 0, max: 50, icon: 'ljs_120_120.png', nums: 100 },
        { id: 1, name: '紫晶石', price: 10, current: 0, max: 50, icon: 'zjs_120_120.png', nums: 10 }
      ], // 兑换列表
      exchangeSparPopupData: { pointName: '积分', id: '' }, // 兑换好礼弹框数据
      showExchangeSparPopup: false
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    openPopup(param) {
      if (param.current >= 50) return
      if (param.price > this.spar_point) return this.$toast('积分不足')
      this.exchangeSparPopupData.id = param.id
      this.showExchangeSparPopup = true
    },
    updateData(param) {
      Object.assign(this, param)
    }
  }
}
</script>

<style scoped lang="scss">
.SparBack {
  margin-top: 37px;

  .get_point,
  .use_point {
    margin: 0 auto;
    padding: 0 22px;
    justify-content: space-between;
    color: #ffffff;
    font-size: 24px;
    width: 660px;
    height: 60px;
    background: #103469;
    border-radius: 8px 8px 0px 0px;

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
    width: 668px;
    height: 188px;
    justify-content: center;
    flex-direction: column;
    background: url('@/pages/sparParty/assets/mk4_1.png') no-repeat left
      top/100% 100%;

    .item {
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: #103469;
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
          min-width: 190px;
          height: 100%;
          padding-left: 44px;
          padding-right: 8px;
          background-color: #523c98;
          clip-path: polygon(16% 0%, 100% 0%, 100% 100%, 25% 100%, 0 100%);
        }
      }

      img {
        height: 50px;
        margin: 0 2px;
      }
    }

    .item:nth-of-type(1) {
      margin-bottom: 24px;
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
      display: flex;
      align-items: center;
      width: 320px;
      height: 360px;
      font-size: 28px;
      color: #fff;
      flex-direction: column;
      background: url('@/pages/sparParty/assets/mk4_2.png') no-repeat left
        top/100% 100%;
      padding-top: 22px;

      p {
        span {
          color: #fffaa6;
        }

        &:nth-child(3) {
          font-size: 24px;
        }
      }

      .img-box {
        display: flex;
        flex-direction: column;
        margin: 35px 0 20px;
        width: 180px;
        height: 120px;
        background: linear-gradient(to bottom, #103469 70%, #1b4e8b 30%);
        box-shadow: inset 0 0 5px 3px #fff;

        .img-top {
          width: 100%;
          height: 84px;

          img {
            position: relative;
            top: 4px;
            height: 100%;
          }
        }

        .img-bottom {
          flex: 1;
          font-weight: 500;
          font-size: 24px;
        }
      }

      .excharge_btn {
        font-size: 28px;
        margin-top: 14px;
        width: 140px;
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
