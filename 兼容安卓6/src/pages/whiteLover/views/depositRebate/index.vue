<template>
  <div class="depositRebate">
    <div class="theme-top-box depositRebate-top">
      <!-- 白色边框 -->
      <div
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 14px 10px;
          box-sizing: border-box;
        "
      >
        <!-- 充值领礼包 -->
        <div class="img-box" style="text-align: center">
          <img src="../../assets/title_2.png" alt="" />
        </div>
        <div class="depositRebate-top-title">
          <p>充值<span>任意金额</span>即可领取超值礼包</p>
          <p>每个ID仅限领取一次</p>
        </div>
        <div class="depositRebate-top-body">
          <div
            class="depositRebate-top-item"
            v-for="item in single_recharge_status.awards"
            :key="item.show_text"
          >
            <div class="img-box">
              <img
                v-if="item.type === 'property'"
                src="../../assets/mk2_1.png"
                alt=""
              />
              <img
                v-if="item.type === 'tool'"
                src="../../assets/mk2_2.png"
                alt=""
              />
              <img
                v-if="item.type === 'car'"
                src="../../assets/mk2_3.png"
                alt=""
              />
            </div>
            <div class="text-box">
              {{
                item.type === 'property'
                  ? '元宝'
                  : item.type === 'tool'
                  ? '绿晶石'
                  : item.type === 'car'
                  ? '座驾'
                  : ''
              }}+{{ item.show_text }}
            </div>
          </div>
        </div>
        <div
          class="depositRebate-top-button"
          @click="getczGift(single_recharge_status.has_right)"
          :class="{
            'depositRebate-top-button-did':
              single_recharge_status.has_right === 1,
            'depositRebate-top-button-get':
              single_recharge_status.has_right === 2
          }"
        >
          {{
            single_recharge_status.has_right === 0
              ? '去完成'
              : single_recharge_status.has_right === 1
              ? '领取'
              : single_recharge_status.has_right === 2
              ? '已领取'
              : ''
          }}
        </div>
        <div class="depositRebate-top-article">
          <div class="article-title"><span></span> 充值重置 <span></span></div>
          <p>1.活动开始后重置<span>安卓、IOS、代充</span>所有额度首充</p>
          <p>2.活动期间<span>所有额度</span>首充双倍福利每日重置</p>
          <button class="article-button" @click="recharge">立即充值</button>
        </div>
      </div>
    </div>
    <div class="depositRebate-bottom">
      <!-- 白色边框 -->
      <div
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        "
      >
        <!-- tab切换 -->
        <div class="depositRebate-bottom-tab">
          <router-link
            :to="{
              path: '/depositRebate/returnCourteous'
            }"
            :class="{
              'a-active': $route.path === '/depositRebate/returnCourteous'
            }"
          >
            累计充值返利</router-link
          >
          <router-link
            :to="{
              path: '/depositRebate/getCourteous'
            }"
            :class="{
              'a-active': $route.path === '/depositRebate/getCourteous'
            }"
          >
            连续充值有礼</router-link
          >
        </div>
        <!-- 三级路由 -->
        <router-view
          :recharge_status="recharge_status"
          :accruing_days_list="accruing_days_list"
          @getData="getDepositRebateData"
          @toRecharge="recharge"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/recharge'
import { getDepositRebateData } from '../../api/depositRebate'
export default {
  name: 'depositRebate',
  components: {},
  props: {},
  data() {
    return {
      // 连续充值
      accruing_days_list: {},
      // 累计充值
      recharge_status: {},
      // 首次充值
      single_recharge_status: {}
    }
  },
  computed: {},
  watch: {},
  async created() {
    await this.getDepositRebateData()
    //  埋点
    this.sensorsData()
  },
  methods: {
    // 充值按钮
    recharge() {
      recharge()
    },
    // 封装充值礼包接口
    async rechargeGift() {
      const res = await getDepositRebateData({
        type: 'recharge_single_reward'
      })
      return res
    },
    // 充值礼包按钮
    async getczGift(flag) {
      if (flag === 0) {
        this.recharge()
      } else if (flag === 1) {
        const res = await this.rechargeGift()
        this.$toast(res.errmsg)
        await this.getDepositRebateData()
      }
    },
    // 获取页面数据
    async getDepositRebateData() {
      const { data } = await getDepositRebateData({ type: 'tab', mark: 'm2' })
      this.accruing_days_list = data.accruing_days_list
      this.recharge_status = data.recharge_status
      this.single_recharge_status = data.single_recharge_status
    }
  }
}
</script>

<style scoped lang="scss">
.depositRebate {
  .theme-top-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    // padding: 14px 10px;
    box-sizing: border-box;
    margin-bottom: 38px;
    position: relative;
    // 兑换好礼图片标题
    > div {
      > .img-box {
        position: absolute;
        width: 100%;
        top: -25px;
        left: -1px;
        img {
          width: 262px;
        }
      }
    }
  }
  .depositRebate-top {
    margin-top: 30px;
    .depositRebate-top-title {
      color: #595ec3;
      margin-top: 13px;
      p {
        text-align: center;
      }
      p:nth-child(1) {
        margin-bottom: 10px;
      }
      p:nth-child(2) {
        margin-bottom: 18px;
      }
      span {
        color: #f67baf;
      }
    }
    .depositRebate-top-body {
      width: 100%;
      height: 105px;
      display: flex;
      justify-content: space-evenly;
      .depositRebate-top-item {
        width: 84px;
        height: 84px;
        background: url('../../assets/mk4_11.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .img-box {
          width: 100%;
          height: 56px;
          box-sizing: 5px;
          img {
            width: 100%;
          }
        }
        .text-box {
          position: relative;
          width: 95%;
          height: 24px;
          background: #6b77e1;
          border-radius: 0 0 10px 10px;

          color: #f5f5f8;
          text-align: center;
          line-height: 24px;
        }
      }
    }
    // 去完成按钮
    .depositRebate-top-button {
      margin: 0 auto;
      width: 142px;
      height: 38px;
      background: linear-gradient(0deg, #7d8ff8, #b5eeff);
      border: 1px solid #ffffff;
      border-radius: 38px;
      font-size: 16px;

      color: #ffffff;
      text-align: center;
      line-height: 35px;
      box-sizing: border-box;
      transition: 0.3s;
    }
    // 领取按钮样式
    .depositRebate-top-button-did {
      background: linear-gradient(0deg, #9575ee, #ebd0fb) !important;
      color: #ffffff !important;
    }
    // 已领取按钮样式
    .depositRebate-top-button-get {
      background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
      color: #ffffff !important;
    }
    // 首充重置说明
    .depositRebate-top-article {
      box-sizing: border-box;
      padding: 0 14px;
      margin: 15px auto 0;
      width: 330px;
      background: linear-gradient(180deg, #a7c4ff, #828be2);
      border-radius: 6px;
      overflow: hidden;
      .article-title {
        text-align: center;
        margin: 14px 0 16px;
        font-size: 16px;

        font-weight: 500;
        color: #ffffff;
        span {
          display: inline-block;
          width: 30px;
          height: 2px;
          background: #ffffff;
          border-radius: 1px;
          position: relative;
          top: -5px;
        }
      }
      p {
        color: #fff;

        line-height: 25px;
        span {
          color: #fffaa6;
        }
      }
      // 充值礼包立即充值按钮
      .article-button {
        display: block;
        margin: 15px auto 18px;
        width: 144px;
        height: 40px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 2px solid #ffffff;
        box-sizing: border-box;
        border-radius: 40px;
        font-size: 16px;

        color: #a9792c;
        text-align: center;
        line-height: 35px;
        transition: 0.3s;
      }
    }
  }
  .depositRebate-bottom {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    box-sizing: border-box;
    margin-bottom: 38px;
    .depositRebate-bottom-tab {
      margin-bottom: 10px;
      display: flex;
      height: 50px;
      a {
        flex: 1;
        height: 39px;
        font-size: 16px;

        color: #f1f8ff;
        background: #6771cb;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
      }
      // 底部tab栏活动
      .a-active {
        background: url('../../assets/mk2_11.png') no-repeat !important;
        background-size: 100% 100% !important;
        height: 50px !important;
      }
    }
  }
}
</style>
