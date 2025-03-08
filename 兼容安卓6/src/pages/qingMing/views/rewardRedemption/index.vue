<template>
  <div class="rewardRedemption">
    <div class="theme_box theme-top-box">
      <!-- 白色边框 -->
      <div class="white_border">
        <!-- 领取项 -->
        <div
          class="top-item theme_item_bgc_horizontal"
          v-for="(item, key) in dataList.task_list"
          :key="item.task_name"
        >
          <div class="top_item_left">
            <div class="img-box">
              <div class="img-top">
                <img src="../../assets/mk1_1_1.png" alt="" />
              </div>
              <div class="img-bottom">青团+{{ item.award_nums }}</div>
            </div>
            <div class="text-box">
              <p>{{ item.task_name }}</p>
              <p>
                <span v-if="item.task_name == '每充值10元'"
                  >系统自动派发，无需手动领取</span
                >
                <span v-else
                  >({{ item.finish_times }}/{{ item.max_times }})</span
                >
              </p>
            </div>
          </div>
          <div
            class="item-button-toDid theme_botton_undid"
            @click="onTopClick(item.has_right, key, item.is_recharge)"
            v-if="item.need_rev"
            :class="{
              theme_botton_did: item.has_right == 1,
              theme_botton_done: item.has_right == 2
            }"
          >
            {{
              item.has_right == 0
                ? item.is_recharge
                  ? '去完成'
                  : '未完成'
                : item.has_right == '1'
                ? '领取'
                : item.has_right == '2'
                ? '已领取'
                : ''
            }}
          </div>
        </div>
        <!-- 说明文字 -->
        <div class="top-text">
          <ul>
            <li>
              <span></span>活动期间完成以上每日任务可领取青团<img
                src="../../assets/mk1_1_1.png"
                alt=""
              />，青团<img
                src="../../assets/mk1_1_1.png"
                alt=""
              />可在本活动中兑换超值好礼
            </li>
            <li>
              <span></span
              >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="theme_box theme-bottom-box">
      <!-- 兑换好礼标题 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_1.png" alt="" />
      </div>
      <div class="white_border">
        <!-- 我的道具 -->
        <div class="bottom-top">
          我的青团<img src="../../assets/mk1_1_1.png" alt="" />：{{
            dataList.my_goods
          }}
        </div>
        <!-- 兑换项-->
        <div class="bottom-body">
          <div
            class="bottom-item theme_item_bgc_horizontal"
            v-for="item in dataList.goods_list"
            :key="item.goods_id"
          >
            <div class="img-box">
              <div class="img-top">
                <img
                  v-if="item.goods_icon"
                  :src="require(`../../assets/${item.goods_icon}`)"
                  alt=""
                />
                <div
                  v-if="!item.goods_icon"
                  class="rewardRedemptionLottie"
                ></div>
              </div>
              <div class="text-bottom">{{ item.goods_num_text }}</div>
            </div>
            <div class="text-box">
              <p v-if="item.type === 'lucky_key'">
                消耗<span>{{ item.price }}个青团</span>兑换 第二个<span
                  >半价</span
                >
              </p>
              <p v-else>
                消耗<span>{{ item.price }}个青团</span>兑换
              </p>
              <p v-if="item.max_times === 0">不限兑换次数</p>
              <p v-else>限兑：{{ item.exchange_times }}/{{ item.max_times }}</p>
            </div>
            <div
              class="button-box"
              :class="{
                theme_botton_undid: item.has_right == 1,
                theme_botton_done: item.has_right == 2
              }"
              @click="onButtomClick(item.has_right, item.type)"
            >
              {{
                item.has_right == 1
                  ? '兑换'
                  : item.has_right == 2
                  ? '已兑换'
                  : ''
              }}
            </div>
          </div>
        </div>
        <!-- 说明文字 -->
        <div class="top-text">
          <ul>
            <li>
              <span></span>
              幸运钥匙可在幸运轮盘中抽奖获得称号、头饰、限时礼物赠送权等限定奖励
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog
      class="theme_tk"
      v-model="showDialog"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      @closed="closeDialog"
    >
      <!-- 标题 -->
      <template #title v-if="true">
        <img src="../../assets/title_1.png" alt="" />
      </template>
      <div class="white_border">
        <p v-if="true">
          剩余青团<img src="../../assets/mk1_1_1.png" alt="" /> ：{{ my_goods }}
        </p>
        <div
          class="img-box"
          v-if="true"
          :class="{ tk_title_img_box: goods_detail.type === 'title' }"
        >
          <img
            v-if="goods_detail?.goods_icon_t"
            :src="require('../../assets/' + goods_detail?.goods_icon_t)"
            alt=""
          />
          <div v-else class="rewardRedemption_tk_lottie"></div>
        </div>
        <p class="goods_name">
          {{
            goods_detail.goods_type == 'mic'
              ? `${goods_detail?.goods_name}+${goods_detail?.goods_num}天`
              : goods_detail?.goods_name
          }}
        </p>
        <p v-if="goods_detail.max_times === 1">
          消耗<img src="../../assets/mk1_1_1.png" alt="" /> ：{{
            goods_detail.price
          }}
        </p>
        <p v-if="goods_detail.type === 'lucky_key'">
          首个消耗50个<img src="../../assets/mk1_1_1.png" alt="" /> 兑换
          第二个半价
        </p>
        <!-- 计数器盒子 -->
        <div
          class="counter-box"
          v-if="
            goods_detail.max_times !== 1 && goods_detail.type !== 'lucky_key'
          "
        >
          <!-- 计数器 -->
          <div class="counter">
            <p class="min" @click="changeNum('min')">最小</p>
            <p class="reduce" @click="onCounter('reduce')">
              <img src="../../assets/pop_reduce.png" alt="" />
            </p>
            <p class="input">{{ inputNum }}</p>
            <p class="add" @click="onCounter('add', goods_detail.price)">
              <img src="../../assets/pop_add.png" alt="" />
            </p>
            <p class="max" @click="changeNum('max', goods_detail.price)">
              最大
            </p>
          </div>
          <!-- 结算 -->
          <div class="billing">
            <p>
              共消耗<img src="../../assets/mk1_1_1.png" alt="" />：{{
                goods_detail?.price * inputNum
              }}
            </p>
            <!-- 兑换按钮 -->
            <div class="button" @click="onExcharge">兑换</div>
          </div>
        </div>
        <!-- 底部两个按钮 -->
        <div
          class="buttons-box"
          v-if="
            goods_detail.max_times === 1 || goods_detail.type === 'lucky_key'
          "
        >
          <div class="left-button" @click="onExcharge(1)">
            <p>{{ goods_detail.type === 'lucky_key' ? '兑1个' : '兑换' }}</p>
            <p v-if="goods_detail.type === 'lucky_key'">
              (消耗：<img src="../../assets/mk1_1_1.png" alt="" />
              {{
                goods_detail.is_second_half
                  ? goods_detail.price / 2
                  : goods_detail.price
              }})
            </p>
          </div>
          <div
            class="right-button"
            @click="onExcharge(2)"
            v-if="
              (goods_detail.type === 'lucky_key' &&
                goods_detail.exchange_times != '1') ||
              goods_detail.max_times == 1
            "
          >
            <p>
              {{
                goods_detail.goods_type === 'title'
                  ? '兑换并佩戴'
                  : goods_detail.goods_type === 'mic'
                  ? '兑换并装扮'
                  : goods_detail.type === 'car'
                  ? '兑换并装备'
                  : goods_detail.type === 'lucky_key'
                  ? '兑2个'
                  : ''
              }}
            </p>
            <p v-if="goods_detail.type === 'lucky_key'">
              (消耗：<img src="../../assets/mk1_1_1.png" alt="" />
              {{ goods_detail.price / 2 + goods_detail.price }})
            </p>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/toApp'
import { Dialog } from 'vant'
// 导入请求
import { getRewardRedemptionData } from '../../api/rewardRedemption'
// 导入json动画
import { svgFun } from '../../utils/json'
import zswz from '../../assets/lottie/zswz/data.json'
import cszdrw from '../../assets/lottie/cszdrw/data.json'
export default {
  // 奖励兑换
  name: 'rewardRedemption',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
      url: 'http://localhost:8888//rewardRedemption?uid=20011&access_token=123#/rewardRedemption',
      // 页面渲染数据
      dataList: {
        goods_list: [
          {
            desc: '用于提升技能等级，可增加成功率',
            exchange_times: 0,
            goods_icon: 'mk1_2.png',
            goods_icon_t: 'tk_dj_1.png',
            goods_id: 2,
            goods_name: '绿晶石',
            goods_num: 1,
            goods_num_text: '绿晶石+1',
            goods_type: 'tool',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            max_times: 0,
            price: 1,
            price_text: '1',
            type: 'tools_ljs2'
          },
          {
            exchange_times: 0,
            goods_icon: 'mk1_3.png',
            goods_icon_t: 'tk_dj_2.png',
            goods_id: 0,
            goods_name: '幸运钥匙',
            goods_num: 1,
            goods_num_text: '幸运钥匙+1',
            goods_type: 'keys',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            is_second_half: false,
            max_times: 2,
            price: 50,
            price_text: '50',
            type: 'lucky_key'
          },
          {
            desc: '可在科举中使获得的元宝变为双倍',
            exchange_times: 0,
            goods_icon: 'mk1_4.png',
            goods_icon_t: 'tk_dj_3.png',
            goods_id: 1,
            goods_name: '科举双倍卡',
            goods_num: 1,
            goods_num_text: '科举双倍卡+1',
            goods_type: 'keju',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            max_times: 5,
            price: 8,
            price_text: '8',
            type: 'keju'
          },
          {
            exchange_times: 0,
            goods_icon: '',
            goods_icon_t: '',
            goods_id: 4923,
            goods_name: '永久称号',
            goods_num: 0,
            goods_num_text: '永久称号+1',
            goods_type: 'title',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            max_times: 1,
            price: 600,
            price_text: '600',
            type: 'title'
          },
          {
            exchange_times: 0,
            goods_icon: '',
            goods_icon_t: '',
            goods_id: 27,
            goods_name: '制胜王者',
            goods_num: 7,
            goods_num_text: '头饰+7天',
            goods_type: 'mic',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            max_times: 1,
            price: 100,
            price_text: '100',
            type: 'mic_zswz'
          }
        ],
        my_goods: '0',
        spend_point: '0',
        task_list: {
          login: {
            award_nums: 5,
            finish_times: 0,
            has_right: '0',
            is_recharge: false,
            max_times: 1,
            need_rev: true,
            show_text: '5',
            task_name: '每日登录'
          },
          keju: {
            award_nums: 5,
            finish_times: 0,
            has_right: 0,
            is_recharge: false,
            max_times: 1,
            need_rev: true,
            show_text: '5',
            task_name: '完成一次科举'
          },
          recharge_once: {
            award_nums: 5,
            finish_times: 0,
            has_right: 0,
            is_recharge: true,
            max_times: 1,
            need_rev: true,
            show_text: '5',
            task_name: '完成一笔充值'
          },
          masonry_consume: {
            award_nums: 10,
            finish_times: 0,
            has_right: 0,
            is_recharge: false,
            max_times: 1000,
            need_rev: true,
            piece: 4,
            show_text: '10',
            task_name: '消费1000钻'
          },
          recharge: {
            award_nums: 6,
            finish_times: 0,
            has_right: 0,
            is_recharge: false,
            max_times: 10,
            need_rev: false,
            show_text: '6',
            task_name: '每充值10元'
          }
        }
      },
      topItemButton: 2,
      // 弹框显示隐藏
      showDialog: false,
      // 商品兑换详情
      goods_detail: {},
      // 商品数量
      inputNum: 1,
      my_goods: '',
      settlement: {},
      tkLottie: {}
    }
  },
  computed: {},
  watch: {},
  async created() {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = this.url
    }
    this.$store.commit(
      'user/getUidAndAccess_token',
      window.location.search.substring(1)
    )
    await this.getRewardRedemptionData()
    this.$nextTick(() => {
      svgFun(0, cszdrw, 'cszdrw', '.rewardRedemptionLottie')
      svgFun(1, zswz, 'zswz', '.rewardRedemptionLottie')
    })
  },
  mounted() {},
  methods: {
    // 充值按钮
    recharge() {
      recharge()
    },
    // 弹框内 点击兑换按钮
    async onExcharge(num) {
      const type = this.goods_detail.type
      const goodsType = this.goods_detail.goods_type
      if (this.goods_detail.max_times === 1) {
        if (num === 2) {
          if (goodsType === 'mic' || goodsType === 'title') {
            const res = await this.exchargeAndEquip(type)
            this.$toast(res.errmsg)
            await this.getRewardRedemptionData()
            this.showDialog = false
            return
          }
        } else {
          this.settlement['mark[nums]'] = 1
          this.settlement.type = 'exchange_goods_new'
        }
      } else if (this.goods_detail.type === 'lucky_key') {
        this.settlement.type = 'exchange_lucky_key'
        this.settlement.mark = num
      } else {
        this.settlement.type = 'exchange_goods_new'
        this.settlement['mark[nums]'] = this.inputNum
      }
      const data = await this.handleExcharge(this.settlement)
      await this.getRewardRedemptionData()
      this.$toast(data.errmsg)
      this.showDialog = false
    },
    // 兑换并装扮接口
    async exchargeAndEquip(mark) {
      const res = await getRewardRedemptionData({
        type: 'exchange_and_equip_goods',
        mark
      })
      return res
    },
    // 弹框内 兑换请求
    async handleExcharge() {
      const data = await getRewardRedemptionData({
        ...this.settlement
      })
      return data
    },
    // 最大或者最小
    changeNum(type, price) {
      if (type === 'min') {
        this.inputNum = 1
      } else {
        const re1 = Math.floor(this.my_goods / price)
        const re =
          this.goods_detail.max_times - this.goods_detail.exchange_times
        if (this.goods_detail.max_times === 0) {
          if (re1 == 0) {
            return (this.inputNum = 1)
          } else {
            return (this.inputNum = re1)
          }
        }
        this.inputNum = re1 === 0 ? 1 : re1 > re ? re : re1
      }
    },
    // 计数器+或者-
    onCounter(type, price) {
      const re1 = Math.floor(this.my_goods / price)
      let re = re1
      if (this.goods_detail.max_times !== 0) {
        re = this.goods_detail.max_times - this.goods_detail.exchange_times
      }
      if (type === 'reduce' && this.inputNum > 1) {
        this.inputNum--
      } else if (type === 'add' && this.inputNum < re && this.inputNum < re1) {
        this.inputNum++
      }
    },
    // 获取页面数据
    async getRewardRedemptionData() {
      const res = await getRewardRedemptionData({
        type: 'init'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.dataList = res.data
    },
    // 上方点击领取按钮
    async clickTopButton(obj) {
      const res = await getRewardRedemptionData({
        ...obj,
        type: 'task_award_new'
      })
      return res
    },
    // 兑换好礼 商品详情请求
    async clickBottomButton(mark) {
      const { data } = await getRewardRedemptionData({
        type: 'goods_detail',
        mark
      })
      this.my_goods = data.my_goods
      this.goods_detail = data.goods_detail
    },
    // top盒子按钮
    async onTopClick(flag, key, isRecharge) {
      if (flag == 1) {
        const data = await this.clickTopButton({ mark: key })
        this.$toast(data.errmsg)
        this.getRewardRedemptionData()
      } else if (flag == 0) {
        if (isRecharge) {
          this.recharge()
        }
      }
    },
    // 关闭弹窗触发的事件
    closeDialog() {
      if (this.tkLottie.animationID) {
        this.tkLottie.destroy()
      }
      this.settlement = {}
      this.inputNum = 1
    },
    // bottom盒子按钮
    async onButtomClick(flag, type) {
      if (flag == 1) {
        await this.clickBottomButton(type)
        const goodsType = this.goods_detail.goods_type
        this.showDialog = true
        this.$nextTick(() => {
          if (goodsType === 'mic') {
            this.tkLottie = svgFun(
              0,
              zswz,
              'zswz',
              '.rewardRedemption_tk_lottie'
            )
          }
          if (goodsType === 'title') {
            this.tkLottie = svgFun(
              0,
              cszdrw,
              'cszdrw',
              '.rewardRedemption_tk_lottie'
            )
          }
        })
        this.settlement['mark[id]'] = this.goods_detail.type
      }
    }
  }
}
</script>

<style lang="scss">
.rewardRedemption {
  // 弹框样式
  .van-dialog {
    .van-dialog__content {
      .white_border {
        > .img-box {
          width: 70px;
          height: 66px;
          margin: 10px auto 5px;
          background: #fefaef;
          border: 3px solid #85d9d6;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            height: 100%;
          }
          .rewardRedemption_tk_lottie {
            width: 90%;
            height: 100%;
          }
        }
        .tk_title_img_box {
          width: 96px !important;
        }
        .goods_name {
          font-size: 14px !important;
        }
        > p {
          margin: 5px 0;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          // display: flex;
          // align-items: center;
          > img {
            width: 21px;
            margin: 0 3px;
          }
        }
        // 弹框计数器部分
        .counter-box {
          // 弹框计数器
          .counter {
            padding: 0 22px;
            display: flex;
            justify-content: space-evenly;
            > p {
              color: #ffffff;
              background: #5560c9;
              padding: 5px;
              height: 24px;
              line-height: 24px;
            }
            .reduce,
            .add {
              width: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              > img {
                width: 14px;
              }
            }
            .input {
              text-align: center;
              width: 60px;
              font-size: 18px;
              color: #fffaa6;
            }
          }
          // 结算部分
          .billing {
            margin-top: 10px;
            border-top: 2px solid #fff;
            box-sizing: border-box;
            padding: 15px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            color: #ffffff;
            > p {
              display: flex;
              justify-content: center;
              align-items: center;
              > img {
                width: 25px;
                margin: 0 5px;
              }
            }
            > .button {
              width: 62px;
              height: 32px;
              background: linear-gradient(0deg, #e99b13, #f9e16e);
              border: 1px solid #ffffff;
              border-radius: 15px;
              font-size: 16px;
              color: #fff;
              text-align: center;
              line-height: 32px;
              box-sizing: border-box;
            }
          }
        }
        // 弹框下方按钮
        .buttons-box {
          display: flex;
          justify-content: space-evenly;
          margin: 20px 0 10px;
          .left-button,
          .right-button {
            width: 122px;
            padding: 0 10px;
            height: 38px;
            border: 1px solid #ffffff;
            border-radius: 18px;
            box-sizing: border-box;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            p {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 19px;
                margin: 0 2px;
              }
            }
            p:nth-child(2) {
              font-size: 12px;
            }
          }
          .left-button {
            p {
              color: #b28d2b;
            }
            background: linear-gradient(0deg, #fff6c1, #ffffff);
          }
          .right-button {
            p {
              color: #fff !important;
            }
            background: linear-gradient(0deg, #e99b13, #f9e16e);
          }
        }
      }
    }
  }
  // 奖励兑换 上方box
  .theme-top-box {
    .white_border {
      padding: 14px 0;
    }
    .top-item {
      position: relative;
      margin-bottom: 11px;
      width: 330px;
      height: 66px;
      display: flex;
      box-sizing: border-box;
      padding: 6px 0;
      .top_item_left {
        display: flex;
        padding-left: 15px;
        width: 100%;
        .img-box {
          width: 54px;
          height: 54px;
          background-color: #fff;
          // 奖励项左边边框背景图
          border: 2px solid #7cd2d7;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          margin-right: 13px;
          border-radius: 6px;
          // 奖励项图片样式
          .img-top {
            position: relative;
            width: 54px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 30px;
            }
          }
          .img-bottom {
            // 奖励项图片下方样式
            background-color: #27707f;
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
            width: 52px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            border-radius: 0 0 6px 6px;
          }
        }
        .text-box {
          width: 100%;
          // 中间字体样式
          p {
            margin-top: 8px;
            font-size: 15px;
            color: #ffffff;
            span {
              font-size: 12px;
              color: #fffaa6;
            }
          }
        }
      }
      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 16px;
        top: 18px;
        width: 64px;
        height: 34px;
        border-radius: 34px;
        box-sizing: border-box;
        text-align: center;
        line-height: 32px;
      }
    }
  }
  // 奖励兑换 下方box
  .theme-bottom-box {
    .white_border {
      padding: 14px 0;
    }
    // 顶部道具数量
    .bottom-top {
      margin: 16px auto 12px;
      width: 160px;
      height: 24px;
      background: #76a5d3;
      border-radius: 12px;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 24px;
      img {
        width: 22px;
        height: 17px;
        position: relative;
        // top: 4px;
        margin: 0 3px;
      }
    }
    .bottom-body {
      width: 330px;
      // 每项样式
      .bottom-item {
        position: relative;
        border: 1px solid #6da6d7;
        display: flex;
        width: 330px;
        height: 100%;
        margin-bottom: 10px;
        overflow: hidden;
        box-sizing: border-box;
        // 图片样式
        .img-box {
          width: 120px;
          height: 100%;
          border-radius: 5px 0px 0px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .img-top {
            width: 100%;
            height: 62px;
            background: #ffffff;
            border-radius: 3px 0px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(180deg, #ffefcf, #fffef5);
            .rewardRedemptionLottie {
              width: 90%;
              height: 90%;
            }
            img {
              width: 100%;
            }
          }
          // 图片下方字体样式
          .text-bottom {
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
            width: 100%;
            height: 18px;
            line-height: 18px;
            background: #27707f;
            border-radius: 0px 0px 0px 3px;
          }
        }
        // 中间字体样式
        .text-box {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 13px;
          font-weight: 500;
          p {
            color: #ffffff;
            span {
              color: #fffaa6;
            }
            &:nth-child(2) {
              font-size: 12px;
            }
          }
        }
        // 按钮样式
        // 兑换
        .button-box {
          position: absolute;
          bottom: 8px;
          right: 12px;
          width: 64px;
          height: 28px;
          box-sizing: border-box;
          border-radius: 26px;
          line-height: 26px;
          text-align: center;
        }
      }
    }
  }
}
</style>
