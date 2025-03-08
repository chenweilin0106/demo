<template>
  <out-box class="SparBack">
    <!-- 累计获得积分 -->
    <div class="get_point flex align-center justify-center">
      <div class="left">累积获得积分：</div>
      <div class="right">{{ pageData.point_accumulated }}</div>
    </div>
    <!-- 已消耗积分 -->
    <div class="point_show flex-column align-center justify-center">
      <div class="item flex align-center justify-center" v-for="item in pageData.spend_list" :key="item.id">
        <span class="flex align-center justify-center">
          每消耗{{ item.target }}个
          <img :src="IconPath(item.icon_s)" />
          ：<i>积分+1</i>
        </span>
        <span class="flex align-center justify-center">已消耗：{{ character_omission(item.current, 6) }}</span>
      </div>
    </div>
    <!-- 可用积分 -->
    <div class="use_point flex align-center justify-center">
      <div class="left">可用积分：</div>
      <div class="right">{{ pageData.spar_point }}</div>
    </div>
    <!-- 兑换 -->
    <div class="point_reward flex align-center justify-center">
      <div class="point_award_item" v-for="item in pageData.exchange_list" :key="item.id">
        <p>
          消耗<span>{{ item.price }}个积分</span>兑换
        </p>
        <div class="img-box">
          <div class="inner w-100 h-100 flex-column">
            <div class="img-top flex align-center justify-center">
              <img :src="IconPath(item.icon)" />
            </div>
            <div class="flex-1 img-bottom line-height-100 flex align-center justify-center">{{ item.name }}+{{ item.nums }}</div>
          </div>
        </div>
        <p>每日限兑：{{ item.current }}/{{ item.max }}</p>
        <div class="excharge_btn" :class="ButtonStyle('1', item.current == 50 ? 2 : 1)" @click="openPrompt('exchangeSpar', item)">
          {{ item.current == 50 ? '已兑完' : '兑换' }}
        </div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>消耗晶石获得的积分可用于<i class="focus-color">兑换绿晶石和紫晶石</i></li>
        <li><span></span>活动期间绿晶石和紫晶石<i class="focus-color">每日各限兑50次</i></li>
        <li><span></span>积分由系统<i class="focus-color">自动派发</i>，无需手动领取</li>
      </ul>
    </div>
    <exchange-spar-prompt ref="exchangeSpar" pointName="积分" @update="getPageData({ type: 'tab', mark: 'm4' })" />
  </out-box>
</template>

<script>
// 兑换晶石弹框
import ExchangeSparPrompt from './components/exchange-spar-prompt.vue'
// 导入默认数据
import { sparBack } from '../../utils/pageData'

export default {
  name: 'SparBack',
  components: {
    ExchangeSparPrompt
  },
  async created() {
    // 导入默认数据
    this.pageData = sparBack
    // 获取页面数据
    await this.getPageData({ type: 'tab', mark: 'm4' })
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.SparBack {
  margin-top: 40px;
  margin-bottom: 170px;
  margin-block-end: 172px;
  padding-top: 107px;
  height: 1102px;

  .get_point,
  .use_point {
    margin: 0 auto;
    padding: 0 22px;
    justify-content: space-between;
    color: #ffffff;
    font-size: 24px;
    width: 660px;
    height: 60px;
    background: #883760;
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
    background: linear-gradient(-90deg, #70b1bb, #a86280, #af315a);
    border-radius: 12px;
    border: 4px solid #e8d39a;

    .item {
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: #883760;
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
          background-color: #3575a1;
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
    margin: 0 auto 30px;
    width: 660px;
    justify-content: space-between;

    .point_award_item {
      display: flex;
      align-items: center;
      width: 328px;
      height: 368px;
      background: linear-gradient(0deg, #70b1bb, #a86280, #af315a);
      border-radius: 16px;
      border: 4px solid #e8d39a;
      font-size: 28px;
      color: #fff;
      flex-direction: column;
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
        background: #d989a5;
        padding: 4px;
        border-radius: 16px;

        .img-top {
          width: 100%;
          height: 84px;
          border-radius: 12px 12px 0 0;
          background-color: #fffdeb;

          img {
            position: relative;
            top: 4px;
            height: 100%;
          }
        }

        .img-bottom {
          background-color: #883760;
          font-weight: 500;
          font-size: 24px;
          border-radius: 0 0 12px 12px;
        }
      }

      .excharge_btn {
        font-size: 28px;
        margin-top: 14px;
        width: 164px;
        height: 64px;
        border-radius: 32px;
      }
    }
  }

  .rule-text {
    width: 586px;
    margin-left: 71px;
  }
}
</style>
