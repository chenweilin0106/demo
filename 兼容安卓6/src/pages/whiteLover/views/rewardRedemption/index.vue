<template>
  <div class="rewardRedemption">
    <div class="theme-top-box">
      <!-- 领取项 -->
      <div
        class="top-item"
        v-for="(item, key) in dataList.task_list"
        :key="item.task_name"
      >
        <div class="img-box">
          <div class="img-top">
            <img src="../../assets/mk1_1.png" alt="" />
          </div>
          <div class="img-bottom">爱心+{{ item.award_nums }}</div>
        </div>
        <div class="text-box">
          <p>{{ item.task_name }}</p>
          <p>({{ item.finish_times }}/{{ item.max_times }})</p>
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
            <span>活动期间完成以上每日任务可领取爱心</span
            ><img
              src="../../assets/tk_9.png"
              alt=""
              style="width: 22px; height: 17px; position: relative; top: 3px"
            />
            ，爱心<img
              src="../../assets/tk_9.png"
              alt=""
              style="width: 22px; height: 17px; position: relative; top: 3px"
            />
            可在本活动中兑换超值好礼
          </li>
          <li>购买礼包、会员（含超值兑换中兑换会员）、活力 卡不计入充值</li>
        </ul>
      </div>
    </div>
    <div class="theme-top-box theme-bottom-box">
      <!-- 兑换好礼标题 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_1.png" alt="" />
      </div>
      <!-- 我的爱心 -->
      <div class="bottom-top">
        我的爱心<img
          src="../../assets/tk_9.png"
          alt=""
          style="width: 22px; height: 17px; position: relative; top: 4px"
        />：{{ dataList.my_goods }}
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
                v-if="item.goods_icon && item.goods_icon !== 'mk1_6.png'"
                :src="require(`../../assets/${item.goods_icon}`)"
                alt=""
              />
              <div v-if="!item.goods_icon" class="rewardRedemptionLottie"></div>
              <!-- <div v-if="item.goods_icon !== 'mk1_6.png'" class="lottie"></div> -->
            </div>
            <div class="text-bottom">{{ item.goods_num_text }}</div>
          </div>
          <div class="text-box">
            <p v-if="item.type === 'lucky_key'">
              消耗<span>{{ item.price }}个爱心</span>兑换 第二个<span
                >半价</span
              >
            </p>
            <p v-else>
              消耗<span>{{ item.price }}个爱心</span>兑换
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
              item.has_right == 1 ? '兑换' : item.has_right == 2 ? '已兑完' : ''
            }}
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="top-text">
        <ul>
          <li>
            幸运钥匙可在幸运轮盘中抽奖获得称号、头饰、限 时礼物赠送权等限定奖励
          </li>
        </ul>
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
        <img src="../../assets/tk_1.png" alt="" />
      </template>
      <p v-if="true">
        剩余爱心<img src="../../assets/mk1_1_1.png" alt="" /> ：{{ my_goods }}
      </p>
      <div class="img-box" v-if="true">
        <img
          v-if="goods_detail?.goods_icon_t"
          :src="require('../../assets/' + goods_detail?.goods_icon_t)"
          alt=""
        />
        <div v-else class="rewardRedemption_TK_Lottie"></div>
      </div>
      <p>{{ goods_detail?.goods_name }}</p>
      <p v-if="goods_detail.max_times === 1">
        消耗<img src="../../assets/mk1_1_1.png" alt="" /> ：600
      </p>
      <p v-if="goods_detail.type === 'lucky_key'">
        首个消耗50个<img src="../../assets/mk1_1_1.png" alt="" /> 兑换
        第二个半价
      </p>
      <!-- 计数器盒子 -->
      <div
        class="counter-box"
        v-if="goods_detail.max_times !== 1 && goods_detail.type !== 'lucky_key'"
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
          <p class="max" @click="changeNum('max', goods_detail.price)">最大</p>
        </div>
        <!-- 结算 -->
        <div class="billing">
          <p>
            共消耗<img src="../../assets/mk1_1_1.png" alt="" />：{{
              goods_detail?.price * inputNum
            }}
          </p>
          <!-- 兑换按钮 -->
          <div class="button" @click="onExcharge"></div>
        </div>
      </div>
      <!-- 底部两个按钮 -->
      <div
        class="buttons-box"
        v-if="goods_detail.max_times === 1 || goods_detail.type === 'lucky_key'"
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
              goods_detail.type === 'title'
                ? '兑换并佩戴'
                : goods_detail.type === 'mic_zswz'
                ? '兑换并装扮'
                : goods_detail.type === 'car_qbt'
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
    </van-dialog>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/recharge'
import { Dialog } from 'vant'
import zswz from '../../assets/lottie//zswz/data.json'
import wrym from '../../assets/lottie//wrym/data.json'
import { svgFun } from '../../utils/json'
// 导入请求
import { getRewardRedemptionData } from '../../api/rewardRedemption'
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
      dataList: {},
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
    this.$store.commit(
      'user/getUidAndAccess_token',
      window.location.search.substring(1)
    )
    await this.getRewardRedemptionData()
    this.$nextTick(() => {
      svgFun(0, wrym, 'wrym', '.rewardRedemptionLottie')
      svgFun(1, zswz, 'zswz', '.rewardRedemptionLottie')
    })
    // this.$store.commit('user/setTabPoint', '爱心兑换')
    // //  埋点
    // this.sensorsData()
  },
  mounted() {},
  methods: {
    // 充值按钮
    recharge() {
      recharge()
    },
    // 弹框内 点击兑换按钮
    async onExcharge(num) {
      if (this.goods_detail.max_times === 1) {
        this.settlement['mark[nums]'] = 1
        this.settlement.type = 'exchange_goods_new'
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
        if (this.goods_detail.max_times === 0) {
          return (this.inputNum = Math.floor(this.my_goods / price))
        }
        const re1 = Math.floor(this.my_goods / price)
        const re =
          this.goods_detail.max_times - this.goods_detail.exchange_times
        this.inputNum = re1 === 0 ? 1 : re1 > re ? re : re1
      }
    },
    // 计数器+或者-
    onCounter(type, price) {
      const re1 = Math.floor(this.my_goods / price)
      const re = this.goods_detail.max_times - this.goods_detail.exchange_times
      if (type === 'reduce' && this.inputNum > 1) {
        this.inputNum--
      } else if (type === 'add' && this.inputNum < re && this.inputNum < re1) {
        this.inputNum++
      }
    },
    // 获取页面数据
    async getRewardRedemptionData() {
      const { data } = await getRewardRedemptionData({
        type: 'init'
      })
      this.dataList = data
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
    async clickBottomButton(type) {
      const { data } = await getRewardRedemptionData({
        type: 'goods_detail',
        mark: type
      })
      this.my_goods = data.my_goods
      this.goods_detail = data.goods_detail
    },
    // top盒子按钮
    async onTopClick(flag, key, isRecharge) {
      if (isRecharge) {
        this.recharge()
        return
      }
      if (flag === '1') {
        const data = await this.clickTopButton({ mark: key })
        this.$toast(data.errmsg)
        this.getRewardRedemptionData()
      }
    },
    // 关闭弹窗触发的事件
    closeDialog() {
      this.tkLottie.destroy()
      this.inputNum = 1
      this.settlement = {}
    },
    // bottom盒子按钮
    async onButtomClick(flag, type) {
      if (flag === 1) {
        await this.clickBottomButton(type)
        this.showDialog = true
        this.$nextTick(() => {
          if (type === 'mic_zswz') {
            this.tkLottie = svgFun(
              0,
              zswz,
              'zswz',
              '.rewardRedemption_TK_Lottie'
            )
          }
          if (type === 'title') {
            this.tkLottie = svgFun(
              0,
              wrym,
              'wrym',
              '.rewardRedemption_TK_Lottie'
            )
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
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: relative;
      top: 25px;
      height: 45px;
      > img {
        width: 265px;
      }
    }
    .van-dialog__content {
      padding-top: 25px;
      margin: 0 auto;
      background: linear-gradient(180deg, #a7c4ff, #828be2);
      border: 8px solid #edf2ff;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .img-box {
        min-width: 60px;
        width: fit-content;
        margin: 5px auto;
        height: 66px;
        background: #fefaef;
        border: 3px solid #6e7bda;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 100%;
        }
        .lottie {
          height: 100%;
        }
      }
      p {
        margin: 5px 0;
        text-align: center;
        font-size: 16px;

        color: #ffffff;
        img {
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
            background: #5560c9;
            padding: 5px;
            height: 24px;
            line-height: 24px;
          }
          .reduce,
          .add {
            width: 24px;
            > img {
              width: 14px;
              height: 14px;
            }
          }
          .input {
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
          > .button {
            width: 64px;
            height: 34px;
            background: url('../../assets/button/tk1_1.png') no-repeat;
            background-size: 100%;
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
          width: 124px;
          padding: 0 10px;
          height: 44px;
          border: 2px solid #ffffff;
          border-radius: 44px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;

          p {
            margin: 0;
          }
          p:nth-child(2) {
            font-size: 12px;
          }
        }
        .left-button {
          p {
            color: #4d7ddd;
          }
          background: linear-gradient(0deg, #cae7ff, #ffffff);
        }
        .right-button {
          p {
            color: #a9792c !important;
          }
          background: linear-gradient(0deg, #fff9d1, #ffffff);
        }
      }
    }
  }
  // 奖励兑换 上方box
  .theme-top-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    padding: 14px 10px;
    box-sizing: border-box;
    margin-bottom: 38px;
    .top-item {
      position: relative;
      margin-bottom: 11px;
      width: 100%;
      height: 66px;
      // 奖励项背景色
      background: linear-gradient(-90deg, #a7c4ff, #828be2);
      // 阴影
      box-shadow: 0px 3px 0px 0px #ffffff;
      border-radius: 6px;
      display: flex;
      box-sizing: border-box;
      .img-box {
        width: 54px;
        height: 54px;
        // 奖励项左边边框背景图
        background: url('/src/pages/whiteLover/assets/mk4_9.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin: 6px 13px 0 14px;
        // 奖励项图片样式
        .img-top {
          position: relative;
          // top: 5px;
          width: 100%;
          height: 34px;
          text-align: center;
          img {
            height: 100%;
          }
        }
        .img-bottom {
          // 奖励项图片下方样式
          background-color: #6872cc;
          font-size: 12px;

          font-weight: 500;
          color: #ffffff;
          width: 50px;
          height: 16px;
          text-align: center;
          line-height: 16px;
          border-radius: 0 0 6px 6px;
        }
      }
      .text-box {
        width: 180px;
        height: 100%;
        // 中间字体样式
        p:nth-child(1) {
          font-size: 15px;

          color: #ffffff;
          margin-top: 15px;
        }
        p:nth-child(2) {
          font-size: 12px;

          color: #fffaa6;
          margin-top: 8px;
        }
      }
      // 右侧按钮
      // 去完成
      .item-button-toDid {
        position: absolute;
        right: 16px;
        top: 19px;
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
      margin-left: 18px;

      color: #595ec3;
      line-height: 25px;
    }
  }
  // 奖励兑换 下方box
  .theme-bottom-box {
    position: relative;
    // 兑换好礼图片标题
    > .img-box {
      position: absolute;
      width: 100%;
      top: -25px;
      left: -1px;
      img {
        width: 262px;
      }
    }
    // 顶部道具数量
    .bottom-top {
      margin: 16px auto 12px;
      width: 160px;
      height: 24px;
      background: #99b2f9;
      border-radius: 12px;

      font-weight: 500;
      color: #ffffff;
      text-align: center;
    }
    .bottom-body {
      width: 100%;
      // 每项样式
      .bottom-item {
        position: relative;
        box-shadow: 0px 3px 0px 0px #ffffff;
        border: 1px solid #ffffff;
        border-radius: 6px;
        display: flex;
        width: 100%;
        height: 100%;
        background: linear-gradient(-90deg, #a7c4ff, #828be2);
        margin-bottom: 10px;
        overflow: hidden;
        // 图片样式
        .img-box {
          width: 120px;
          height: 100%;
          background: #ffffff;
          border-radius: 5px 0px 0px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .img-top {
            width: 100%;
            height: 62px;
            background: #ffffff;
            border-radius: 5px 0px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            .lottie {
              width: 100%;
              height: 100%;
            }
            img {
              width: 100%;
              height: 100%;
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
            border-radius: 0px 0px 0px 5px;
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
            font-size: 12px;
            &:nth-child(1) {
              span {
                color: #fffaa6;
              }
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
