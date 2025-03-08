<template>
  <div class="rewardRedemption">
    <div class="theme-top-box">
      <!-- 白色边框 -->
      <div class="white_boder">
        <!-- 领取项 -->
        <div
          class="top-item"
          v-for="(item, key) in dataList.task_list"
          :key="item.task_name"
        >
          <div class="top_item_left">
            <div class="text-box">
              <p>
                {{ item.task_name
                }}<span v-if="item.task_name !== '每充值10元'"
                  >({{ item.finish_times }}/{{ item.max_times }})</span
                ><span v-else>系统自动派发，无需手动领取</span>
              </p>
            </div>
            <div class="top_img_box">
              <div class="img-box">
                <div class="img-top">
                  <img src="../../assets/mk1_1.png" alt="" />
                </div>
                <div class="img-bottom">气球+{{ item.award_nums }}</div>
              </div>
              <div class="img-box" v-if="item.task_name !== '每充值10元'">
                <div class="img-top">
                  <img src="../../assets/mk1_6.png" alt="" />
                </div>
                <div class="img-bottom">闯关币+{{ item.piece }}</div>
              </div>
            </div>
          </div>
          <div
            class="item-button-toDid"
            @click="onTopClick(item.has_right, key, item.is_recharge)"
            v-if="item.need_rev"
            :class="{
              'item-button-did': item.has_right == '1',
              'item-button-get': item.has_right == '2'
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
              <span></span>活动期间完成以上每日任务可领取气球<img
                src="../../assets/mk1_1_1.png"
                alt=""
                style="width: 21px; height: 18px; position: relative; top: 3px"
              />和闯关币<img
                src="../../assets/mk1_6_1.png"
                alt=""
                style="width: 17px; height: 17px; position: relative; top: 3px"
              />，气球<img
                src="../../assets/mk1_1_1.png"
                alt=""
                style="width: 21px; height: 18px; position: relative; top: 3px"
              />可在本活动中兑换超值好礼，闯关币<img
                src="../../assets/mk1_6_1.png"
                alt=""
                style="width: 17px; height: 17px; position: relative; top: 3px"
              />可在幸运闯关活动中翻卡赢奖
            </li>
            <li>
              <span></span
              >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="theme-top-box theme-bottom-box">
      <!-- 兑换好礼标题 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_1.png" alt="" />
      </div>
      <div class="white_boder">
        <!-- 我的气球 -->
        <div class="bottom-top">
          我的气球<img src="../../assets/mk1_1_1.png" alt="" />：{{
            dataList.my_goods
          }}
        </div>
        <!-- 兑换项-->
        <div class="bottom-body">
          <div
            class="bottom-item"
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
                <div v-if="!item.goods_icon" class="lottie"></div>
              </div>
              <div class="text-bottom">{{ item.goods_num_text }}</div>
            </div>
            <div class="text-box">
              <p v-if="item.type === 'lucky_key'">
                消耗<span>{{ item.price }}个气球</span>兑换 第二个<span
                  >半价</span
                >
              </p>
              <p v-else>
                消耗<span>{{ item.price }}个气球</span>兑换
              </p>
              <p v-if="item.max_times === 0">不限兑换次数</p>
              <p v-else>限兑：{{ item.exchange_times }}/{{ item.max_times }}</p>
            </div>
            <div
              class="button-box"
              :class="{ 'button-box-did': item.has_right == 2 }"
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
          剩余气球<img src="../../assets/mk1_1_1.png" alt="" /> ：{{ my_goods }}
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
          <div v-else class="lottie"></div>
        </div>
        <p class="goods_name">
          {{
            goods_detail.goods_type == 'mic'
              ? goods_detail?.goods_num_text
              : goods_detail.goods_name
          }}
        </p>
        <p v-if="goods_detail.max_times === 1">
          消耗<img src="../../assets/mk1_1_1.png" alt="" /> ：{{
            goods_detail.price
          }}
        </p>
        <p v-if="goods_detail.type === 'lucky_key'">
          首个消耗50个<img src="../../assets/mk1_1_1.png" alt="" />
          兑换第二个半价
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
            @click="onExcharge(2, goods_detail.type)"
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
import dhmh from '../../assets/lottie/dhmh/data.json'
import yntl from '../../assets/lottie/yntl/data.json'
export default {
  // 奖励兑换
  name: 'rewardRedemption',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
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
            goods_id: 86,
            goods_name: '蝶海梦花',
            goods_num: 7,
            goods_num_text: '头饰+7天',
            goods_type: 'mic',
            has_right: 1,
            is_lock: false,
            is_owned: false,
            max_times: 1,
            price: 100,
            price_text: '100',
            type: 'mic_dhmh'
          }
        ],
        my_goods: '0',
        spend_point: '0',
        task_list: {
          login: {
            award_nums: 5,
            finish_times: 1,
            has_right: '0',
            is_recharge: false,
            max_times: 1,
            need_rev: true,
            piece: 2,
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
            piece: 2,
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
            piece: 2,
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
            piece: 2,
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
      yntlTitle: {},
      dhmhMic: {},
      tk_lottie: {}
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.$store.commit(
      'user/getUidAndAccess_token',
      window.location.search.substring(1)
    )
    await this.getRewardRedemptionData()
    this.$nextTick(() => {
      this.yntlTitle = svgFun(0, yntl, 'yntl')
      this.dhmhMic = svgFun(1, dhmh, 'dhmh')
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
      if (this.tk_lottie.animationID) {
        this.tk_lottie.destroy()
      }
      this.settlement = {}
      this.inputNum = 1
    },
    // bottom盒子兑换按钮
    async onButtomClick(flag, type) {
      if (flag == 1) {
        await this.clickBottomButton(type)
        const goodsType = this.goods_detail.goods_type
        this.showDialog = true
        this.$nextTick(() => {
          if (goodsType === 'mic') {
            this.tk_lottie = svgFun(2, dhmh, 'dhmh')
          }
          if (goodsType === 'title') {
            this.tk_lottie = svgFun(2, yntl, 'yntl')
          }
        })
        this.settlement['mark[id]'] = this.goods_detail.type
      }
    }
  }
}
</script>

<style scoped lang="scss">
.rewardRedemption {
  // 弹框样式
  ::v-deep .van-dialog {
    overflow: visible;
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: absolute;
      top: -63px;
      left: 11px;
      height: 65px;
      > img {
        width: 300px;
      }
    }
    .van-dialog__content {
      margin: 0 auto;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border: 4px solid #ffbaf4;
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
        > .img-box {
          width: 70px;
          height: 66px;
          margin: 5px auto;
          background: #fefaef;
          border: 3px solid #ffbffb;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          > img {
            height: 100%;
          }
          .lottie {
            height: 100%;
          }
        }
        .tk_title_img_box {
          width: 96px !important;
        }
        .goods_name {
          font-size: 12px !important;
        }
        > p {
          margin: 5px 0;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          > img {
            width: 21px;
            position: relative;
            top: 3px;
            margin: 0 2px;
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
              background: #6243cc;
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
              width: 64px;
              height: 34px;
              background: linear-gradient(0deg, #cae7ff, #ffffff);
              border: 2px solid #ffffff;
              border-radius: 34px;
              font-size: 16px;
              color: #4d7ddd;
              text-align: center;
              line-height: 34px;
            }
          }
        }
        // 弹框下方按钮
        .buttons-box {
          display: flex;
          justify-content: space-evenly;
          margin: 15px 0 25px;
          .left-button,
          .right-button {
            width: 122px;
            height: 38px;
            padding: 0 10px;
            border: 1px solid #ffffff;
            border-radius: 36px;
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
              color: #4d7ddd;
              font-size: 16px;
            }
            background: linear-gradient(0deg, #cae7ff, #ffffff);
          }
          .right-button {
            p {
              color: #a9792c !important;
              font-size: 16px;
            }
            background: linear-gradient(0deg, #fff9d1, #ffffff);
          }
        }
      }
    }
  }
  // 奖励兑换 上方box
  .theme-top-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #937bef;
    // 背景色
    background: linear-gradient(180deg, #fff5fa, #f8eeff);
    box-sizing: border-box;
    margin-bottom: 38px;
    .white_boder {
      width: 100%;
      padding: 14px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
    .top-item {
      position: relative;
      margin-bottom: 11px;
      width: 330px;
      background: linear-gradient(-90deg, #caa7ff, #8d8ff9);
      box-shadow: 0px 3px 0px 0px #ffffff;
      border-radius: 6px;
      display: flex;
      box-sizing: border-box;
      padding-top: 12px;
      padding-bottom: 8px;
      .top_item_left {
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        .top_img_box {
          display: flex;
          .img-box {
            width: 60px;
            height: 60px;
            // 奖励项左边边框背景图
            border: 2px solid #d5c2ff;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            background-color: #fff;
            margin-right: 10px;
            // 奖励项图片样式
            .img-top {
              position: relative;
              width: 100%;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                height: 28px;
              }
            }
            .img-bottom {
              // 奖励项图片下方样式
              background-color: #6872cc;
              font-size: 12px;
              font-weight: 500;
              color: #ffffff;
              width: 56px;
              height: 18px;
              text-align: center;
              line-height: 18px;
              border-radius: 0 0 4px 4px;
            }
          }
        }
        .text-box {
          margin-bottom: 8px;
          // 中间字体样式
          p {
            font-size: 15px;
            color: #ffffff;
            span {
              padding-left: 5px;
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
        top: 50px;
        width: 64px;
        height: 34px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 2px solid #ffffff;
        border-radius: 34px;
        box-sizing: border-box;
        color: #4d7ddd;
        text-align: center;
        line-height: 32px;
      }
      // 领取
      .item-button-did {
        background: linear-gradient(0deg, #fff9d1, #ffffff) !important;
        color: #a9792c !important;
      }
      // 已领取
      .item-button-get {
        background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
        color: #fff !important;
      }
    }
    // 下方说明字体样式
    .top-text {
      margin-left: 15px;
      // margin-right: 1px;
      color: #595ec3;
      line-height: 25px;
      li {
        padding-right: 10px;
        position: relative;
        img:nth-child(2) {
          margin: 0 5px;
        }
        img {
          margin: 0 2px;
        }
        span {
          position: absolute;
          top: 10px;
          left: -10px;
          display: block;
          width: 6px;
          height: 6px;
          background: #fb8fcc;
          border-radius: 50%;
        }
        list-style-type: none;
        margin-left: 10px;
      }
    }
  }
  // 奖励兑换 下方box
  .theme-bottom-box {
    position: relative;
    // 兑换好礼图片标题
    > .img-box {
      position: absolute;
      width: 100%;
      top: -42px;
      left: -1px;
      > img {
        width: 300px;
      }
    }
    // 顶部道具数量
    .bottom-top {
      margin: 20px auto 12px;
      width: 160px;
      height: 24px;
      background: #947cef;
      border-radius: 12px;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 18px;
        height: 16px;
        margin: 0 5px;
      }
    }
    .bottom-body {
      width: 330px;
      // 每项样式
      .bottom-item {
        position: relative;
        background: linear-gradient(-90deg, #caa7ff, #8e8ff9);
        border: 2px solid #caa7ff;
        box-shadow: 0px 3px 0px 0px #ffffff;
        border-radius: 6px;
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
            .lottie {
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
            background: #6771cb;
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
            &:nth-child(1) {
              span {
                color: #fffaa6;
              }
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
          background: linear-gradient(0deg, #cae7ff, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 28px;
          color: #4d7ddd;
          line-height: 26px;
          text-align: center;
        }
        // 兑换完样式
        .button-box-did {
          background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
