<template>
  <div class="SparBack_out">
    <!--惊喜福利-->
    <surprise-benefit
      :surpriseData="surpriseData"
      @update="pageData.receive_ljs_num = true"
    />
    <!--晶石回馈-->
    <out-box class="SparBack" title="title_12.png">
      <!-- 累计获得积分 -->
      <div class="get_point flex-center">
        <div class="left">累积获得积分：</div>
        <div class="right">{{ pageData.point_accumulated }}</div>
      </div>
      <!-- 已消耗积分 -->
      <div class="point_show flex-center">
        <div
          class="item flex-center"
          v-for="item in pageData.spend_list"
          :key="item.id"
        >
          <span class="flex-center">
            每消耗{{ item.target }}个
            <img :src="IconPath(item.icon_s)" />
            ：<i>积分+1</i>
          </span>
          <span class="flex-center"
            >已消耗：{{ character_omission(item.current, 6) }}</span
          >
        </div>
      </div>
      <!-- 可用积分 -->
      <div class="use_point flex-center">
        <div class="left">可用积分：</div>
        <div class="right">{{ pageData.spar_point }}</div>
      </div>
      <!-- 兑换 -->
      <div class="point_reward flex-center">
        <div
          class="point_award_item"
          v-for="item in pageData.exchange_list"
          :key="item.id"
        >
          <p>
            消耗<span>{{ item.price }}个积分</span>兑换
          </p>
          <div class="img-box">
            <div class="img-top flex-center">
              <img :src="IconPath(item.icon)" />
            </div>
            <div class="img-bottom flex-center">
              {{ item.name }}+{{ item.nums }}
            </div>
          </div>
          <p>每日限兑：{{ item.current }}/{{ item.max }}</p>
          <div
            class="excharge_btn"
            :class="ButtonStyle('2', item.current == 50 ? 2 : 1)"
            @click="openPrompt('exchangeSpar', item)"
          >
            {{ item.current == 50 ? '已兑完' : '兑换' }}
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="rule-text">
        <ul>
          <li>
            <span></span>消耗晶石获得的积分可用于<i>兑换绿晶石和紫晶石</i>
          </li>
          <li><span></span>活动期间绿晶石和紫晶石<i>每日各限兑50次</i></li>
          <li><span></span>积分由系统<i>自动派发</i>，无需手动领取</li>
        </ul>
      </div>
    </out-box>
    <!--兑换晶石-->
    <exchange-spar-prompt ref="exchangeSpar" @update="updateData" />
  </div>
</template>

<script>
// 兑换晶石弹框
import ExchangeSparPrompt from './components/exchange-spar-prompt.vue'
// 导入默认数据
import { sparBack } from '../../utils/pageData'
import SurpriseBenefit from './components/SurpriseBenefit.vue'

export default {
  name: 'SparBack',
  components: {
    ExchangeSparPrompt,
    SurpriseBenefit
  },
  async created() {
    // 导入默认数据
    this.pageData = sparBack
    // 获取页面数据
    await this.getPageData({ type: 'tab', mark: 'm4' })
  },
  computed: {
    surpriseData() {
      return {
        receive_ljs_num: this.pageData.receive_ljs_num,
        use_ljs_num: this.pageData.use_ljs_num,
        need_ljs_num: this.pageData.need_ljs_num
      }
    }
  },
  methods: {
    updateData(params) {
      this.pageData = { ...this.pageData, ...params }
    }
  }
}
</script>

<style scoped lang="scss">
.SparBack {
  margin-top: 89px;
  padding-top: 34px;
  height: 978px;

  .get_point,
  .use_point {
    margin: 0 auto;
    padding: 0 22px;
    justify-content: space-between;
    color: #ffffff;
    font-size: 24px;
    width: 660px;
    height: 60px;
    background: #c74e2f;
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
    margin: 15px auto 12px;
    width: 664px;
    height: 202px;
    justify-content: center;
    flex-direction: column;
    background: url('@/pages/lanternFestival/assets/mk4_1.png') no-repeat left
      top/100% 100%;

    .item {
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: #5f0a15;
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
          background-color: #7a324d;
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
    margin: 0 auto 32px;
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
      background: url('@/pages/lanternFestival/assets/mk4_2.png') no-repeat left
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
        background: url('@/pages/lanternFestival/assets/mk4_4.png') no-repeat
          left top/100% 100%;

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
      color: #fffaa6;
    }
  }
}
</style>
