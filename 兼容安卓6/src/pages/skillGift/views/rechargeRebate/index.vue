<template>
  <div class="depositRebate">
    <div class="theme_box depositRebate-top">
      <!-- 充值领礼包 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_2.png" alt="" />
      </div>
      <div class="border_box">
        <!-- 白色边框 -->
        <div class="white_border">
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
            <div class="article-title">
              <span></span> 首充重置 <span></span>
            </div>
            <p>1.活动开始后重置<span>安卓、IOS和代充三端</span>所有额度首充</p>
            <p>2.活动期间<span>500以下额度</span>首充每日重置</p>
            <button class="article-button" @click="recharge">立即充值</button>
          </div>
        </div>
      </div>
    </div>
    <div class="theme_box depositRebate-bottom">
      <div class="border_box">
        <!-- 白色边框 -->
        <div class="white_border">
          <!-- tab切换 -->
          <div class="depositRebate-bottom-tab">
            <router-link
              replace
              :to="{
                path: '/rechargeRebate/returnCourteous'
              }"
              :class="{
                'a-active': $route.path === '/rechargeRebate/returnCourteous'
              }"
            >
              累计充值返利</router-link
            >
            <router-link
              replace
              :to="{
                path: '/rechargeRebate/getCourteous'
              }"
              :class="{
                'a-active': $route.path === '/rechargeRebate/getCourteous'
              }"
            >
              连续充值有礼</router-link
            >
          </div>
          <!-- 三级路由 -->
          <router-view
            :recharge_status="recharge_status"
            :accruing_days_list="accruing_days_list"
            @getData="getRechargeRebateData"
            @toRecharge="recharge"
          ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/toApp'
import { getPageData } from '../../api/index'
export default {
  name: 'rechargeRebate',
  components: {},
  props: {},
  data() {
    return {
      // 连续充值
      accruing_days_list: {
        10: {
          amount_cond: 10,
          awards: [
            {
              icon: 'mk2_5.png',
              id: 'gamegold',
              name: '元宝',
              nums: 45000,
              text: '4.5万',
              type: 'property'
            },
            {
              icon: 'mk2_13.png',
              id: 0,
              name: '靓号券',
              nums: 1,
              text: '1',
              type: 'pretty_card'
            }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        30: {
          amount_cond: 30,
          awards: [
            {
              icon: 'mk2_5.png',
              id: 'gamegold',
              name: '元宝',
              nums: 90000,
              text: '9万',
              type: 'property'
            },
            {
              icon: 'mk2_13.png',
              id: 0,
              name: '靓号券',
              nums: 1,
              text: '1',
              type: 'pretty_card'
            }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        50: {
          amount_cond: 50,
          awards: [
            {
              icon: 'mk2_5.png',
              id: 'gamegold',
              name: '元宝',
              nums: 120000,
              text: '12万',
              type: 'property'
            },
            {
              icon: 'mk2_13.png',
              id: 0,
              name: '靓号券',
              nums: 1,
              text: '1',
              type: 'pretty_card'
            }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        100: {
          amount_cond: 100,
          awards: [
            {
              icon: 'mk2_5.png',
              id: 'gamegold',
              name: '元宝',
              nums: 180000,
              text: '18万',
              type: 'property'
            },
            {
              icon: 'mk2_13.png',
              id: 0,
              name: '靓号券',
              nums: 1,
              text: '1',
              type: 'pretty_card'
            }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        300: {
          amount_cond: 300,
          awards: [
            {
              icon: 'mk2_5.png',
              id: 'gamegold',
              name: '元宝',
              nums: 300000,
              text: '30万',
              type: 'property'
            },
            {
              icon: 'mk2_13.png',
              id: 0,
              name: '靓号券',
              nums: 1,
              text: '1',
              type: 'pretty_card'
            }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        }
      },
      // 累计充值
      recharge_status: {
        30: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 160000,
              text: '16万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 16,
              text: '16',
              type: 'tool'
            }
          ],
          condition: 30,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        50: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 220000,
              text: '22万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 22,
              text: '22',
              type: 'tool'
            }
          ],
          condition: 50,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        100: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 450000,
              text: '45万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 45,
              text: '45',
              type: 'tool'
            }
          ],
          condition: 100,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        200: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 880000,
              text: '88万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 88,
              text: '88',
              type: 'tool'
            }
          ],
          condition: 200,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        300: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 1300000,
              text: '130万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 130,
              text: '130',
              type: 'tool'
            }
          ],
          condition: 300,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        500: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 2000000,
              text: '200万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 200,
              text: '200',
              type: 'tool'
            }
          ],
          condition: 500,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        1000: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 3400000,
              text: '340万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 340,
              text: '340',
              type: 'tool'
            }
          ],
          condition: 1000,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        2000: {
          awards: [
            {
              icon: 'mk2_5.png',
              name: '元宝',
              nums: 6000000,
              text: '600万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_6.png',
              id: 2,
              name: '绿晶石',
              nums: 600,
              text: '600',
              type: 'tool'
            }
          ],
          condition: 2000,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        },
        5000: {
          awards: [
            {
              icon: 'mk2_7.png',
              name: '元宝',
              nums: 12000000,
              text: '1200万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'mk2_8.png',
              id: 2,
              name: '绿晶石',
              nums: 1200,
              text: '1200',
              type: 'tool'
            },
            {
              icon: 'ch_rsyj.gif',
              id: 4676,
              name: '称号',
              nums: 7,
              text: '7天',
              type: 'title'
            },
            {
              id: 0,
              name: '威望值',
              nums: 0.05,
              text: '称号属性：每次获得+基础威望值的5%，时效可叠加',
              type: 'prestige'
            }
          ],
          condition: 5000,
          has_right: 0,
          is_daily: false,
          recharge_nums: 0
        }
      },
      // 首次充值
      single_recharge_status: {
        awards: [
          {
            nums: 30000,
            show_text: '3万',
            tool_id: 'gamegold',
            type: 'property'
          },
          {
            id: 2,
            nums: 10,
            show_text: '10',
            type: 'tool'
          },
          {
            id: 47,
            nums: 1,
            show_text: '1天',
            type: 'car'
          }
        ],
        condition: 1,
        has_right: 0
      },
      timer: ''
    }
  },
  computed: {},
  watch: {},
  async created() {
    await this.getRechargeRebateData()
  },
  methods: {
    // 监听页面呼出回调函数
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getRechargeRebateData()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 充值按钮
    recharge() {
      recharge(this.hiddenFn)
    },
    // 封装充值礼包接口
    async rechargeGift() {
      const res = await getPageData({
        type: 'recharge_single_reward'
      })
      return res
    },
    // 充值礼包按钮
    async getczGift(flag) {
      if (flag == 0) {
        this.recharge()
      } else if (flag == 1) {
        const res = await this.rechargeGift()
        this.$toast(res.errmsg)
        await this.getRechargeRebateData()
      }
    },
    // 获取页面数据
    async getRechargeRebateData() {
      const res = await getPageData({ type: 'tab', mark: 'm2' })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.accruing_days_list = res.data.accruing_days_list
      this.recharge_status = res.data.recharge_status
      this.single_recharge_status = res.data.single_recharge_status
    }
  }
}
</script>

<style scoped lang="scss">
.depositRebate {
  // 弹框样式
  ::v-deep .van-dialog {
    width: 300px;
    overflow: visible;
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: absolute;
      top: -60px;
      left: 30px;
      height: 65px;
      > img {
        width: 265px;
      }
    }
    .van-dialog__content {
      width: 100%;
      margin: 0 auto;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border: 8px solid #ffbaf4;
      border-radius: 20px;
      box-sizing: border-box;
      .white_border {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-top: 25px;
        box-sizing: border-box;
        padding-top: 25px;
      }
      .tk_body {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .tk_body_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .img-box {
            width: 60px;
            height: 60px;
            margin: 5px auto;
            background: #fefaef;
            border: 3px solid #ffbffb;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
          }
          p {
            margin: 5px 0;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
      .tk_button {
        margin: 10px auto;
        width: 180px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        border-radius: 18px;
        color: #a9792c;
        text-align: center;
        line-height: 36px;
      }
    }
  }
  .depositRebate-top {
    margin-top: 40px;
    margin-bottom: 10px;
    .white_border {
      padding: 14px 10px;
    }
    .depositRebate-top-title {
      color: #fff;
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
        color: #f7f26a;
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
        border: 2px solid #98bffb;
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        .img-box {
          width: 100%;
          height: 58px;
          box-sizing: 5px;
          background-color: #fff;
          img {
            width: 100%;
          }
        }
        .text-box {
          position: relative;
          width: 100%;
          height: 25px;
          background-color: #1647af;
          color: #f5f5f8;
          text-align: center;
          line-height: 25px;
        }
      }
    }
    // 去完成按钮
    .depositRebate-top-button {
      margin: 0 auto;
      width: 142px;
      height: 38px;
      background: linear-gradient(0deg, #bfddff, #ffffff);
      border: 1px solid #ffffff;
      border-radius: 38px;
      font-size: 16px;
      color: #0a3394;
      text-align: center;
      line-height: 35px;
      box-sizing: border-box;
    }
    // 领取按钮样式
    .depositRebate-top-button-did {
      background: linear-gradient(0deg, #b93124, #ff8c1a) !important;
      border: 1px solid #9eb4e4 !important;
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
      padding: 0 12px;
      margin: 15px auto 0;
      width: 100%;
      background: linear-gradient(180deg, #3c76f5, #3d76f4);
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
        background: linear-gradient(0deg, #b93124, #ff8c1a);
        border: 1px solid #9eb4e4;
        box-sizing: border-box;
        border-radius: 40px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 35px;
        transition: 0.3s;
      }
    }
  }
  .depositRebate-bottom {
    margin-top: 18px;
    .depositRebate-bottom-tab {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      height: 50px;
      a {
        flex: 1;
        height: 39px;
        font-size: 16px;
        color: #fff;
        background: #0a3394;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
      }
      // 底部tab栏活动
      .a-active {
        color: #0a3394;
        font-weight: 500;
        font-size: 20px !important;
        font-weight: 500 !important;
        background: url('../../assets/mk2_4.png') no-repeat !important;
        background-size: 100% 100% !important;
        height: 50px !important;
      }
    }
  }
}
</style>
