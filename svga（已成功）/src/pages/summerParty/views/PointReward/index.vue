<template>
  <div class="PointReward">
    <ThemeBox class="PointReward_TaskListContent">
      <TaskListItem
        v-for="(taskItem, key) in pageData.task_list"
        :key="taskItem.task_name"
        :taskItem="taskItem"
        :taskItemKey="key"
        :pointName="pointName"
        :pointIcon="pointIcon"
        @onTaskItemClick="onTaskItemClick"
      />
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>活动期间完成以上每日任务可领取{{ pointName
            }}<img :src="IconPath(pointIcon)" alt="" />， {{ pointName
            }}<img :src="IconPath(pointIcon)" alt="" />可在本活动中兑换超值好礼
          </li>
          <li>
            <span></span
            >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值
          </li>
        </ul>
      </div>
    </ThemeBox>
    <ThemeBox class="PointReward_BottomBox" themeTitleImg="title_1.png">
      <!-- 我的道具 -->
      <div class="theme_present PointReward_BottomBox_Present flex_across">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />：<span
          class="PointReward_BottomBox_present_nums text_overHidden"
          >{{ pageData.my_goods }}
        </span>
      </div>
      <!-- 兑换好礼列表 -->
      <div class="PointReward_BottomBox_GoodsList">
        <ExchargeListItem
          v-for="goods in pageData.goods_list"
          :key="goods.goods_name"
          :exchargeItem="goods"
          @onExchargeClick="onExchargeClick"
          :pointName="pointName"
          :spend_point="pageData.spend_point"
        />
      </div>
      <!-- 规则说明 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>
            幸运钥匙可在幸运轮盘中抽奖获得称号、头饰、限时礼物赠送权等限定奖励
          </li>
        </ul>
      </div>
    </ThemeBox>
    <!-- 兑换好礼弹框 -->
    <ThemeDialog
      :isShow="showDialog"
      dialogMark="exchargeGift"
      :titleIconObj="{ exchargeGift: 'title_1.png' }"
      :dialogData="dialogData"
      @closeDialog="closeDialog"
    >
      <!-- 剩余道具 -->
      <p class="remainingPoint flex_across">
        剩余{{ pointName
        }}<img class="my_present_nums_box" :src="IconPath(pointIcon)" alt="" />
        ：{{ pageData.my_goods }}
      </p>
      <!-- 道具图标展示 -->
      <div
        class="theme_item img-box"
        :class="{ tk_title_img_box: dialogData.type === 'title' }"
      >
        <div class="iconBox flex_across" v-if="dialogData.goods_icon_t">
          <img
            :src="require('../../assets/' + dialogData.goods_icon_t)"
            alt=""
          />
        </div>
        <div v-else class="pointReward_tk_lottie">
          <PublicJson
            :lottieJson_name="
              dialogData.goods_type == 'mic'
                ? '_PointReward_Dialog_mic'
                : '_PointReward_Dialog_ch'
            "
            :lottieJson="dialogData.goods_type == 'mic' ? ts_qctd : ch_xyhh"
            :userAvatar="
              dialogData.goods_type == 'mic' ? $store.getters.user_icon : ''
            "
          ></PublicJson>
        </div>
      </div>
      <!-- 道具名称 -->
      <p class="goods_name flex_across">
        {{ dialogGoodsName }}
      </p>
      <!-- 预计消耗数量 -->
      <p v-if="dialogData.max_times == 1" class="Price_max_times flex_across">
        消耗<img :src="IconPath(pointIcon)" alt="" /> ：{{ dialogData.price }}
      </p>
      <!-- 幸运钥匙特殊说明 -->
      <p
        v-if="dialogData.type == 'lucky_key'"
        class="Price_lucky_key flex_across"
      >
        首个消耗50个<img
          class="my_present_nums_box"
          :src="IconPath(pointIcon)"
          alt=""
        />
        第二个半价
      </p>
      <!-- 计数器组件 -->
      <DialogCounter
        v-if="dialogData.max_times !== 1 && dialogData.type !== 'lucky_key'"
        :goods_detail="dialogData"
        :my_goods="+pageData.my_goods"
        :inputNum.sync="inputNum"
        :showSpecialBilling="dialogData.type === 'hero_tools_zhs'"
        :showBilling="dialogData.type !== 'hero_tools_zhs'"
        CounterIcon="bk_60_60.png"
        @dialogExcharge="onExcharge"
      />
      <!-- 底部两个按钮 -->
      <div class="Dialog_Buttons" v-if="showDialogButtons">
        <div class="left-button flex_across" @click="onExcharge(1)">
          <p>
            {{ dialogData.goods_type === 'keys' ? '兑1个' : '兑换' }}
          </p>
          <p v-if="dialogData.goods_type === 'keys'">
            (消耗:<img
              class="my_present_nums_box"
              :src="IconPath(pointIcon)"
              alt=""
            />
            {{ dialogLeftButtonText }})
          </p>
        </div>
        <div
          class="theme_botton_did right-button"
          @click="onExcharge(2)"
          v-if="showDialogRightButton"
        >
          <p>
            {{ ButtonText('dialogRbtn', dialogData.goods_type) }}
          </p>
          <p v-if="dialogData.goods_type === 'keys'">
            (消耗:<img :src="IconPath(pointIcon)" alt="" />
            {{ dialogData.price / 2 + dialogData.price }})
          </p>
        </div>
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 默认数据
import { pointReward } from '../../utils/pageData'
// 跳转蛋蛋部落APP方法
import { toHomeGame } from '../../utils/toApp'
// 数据请求
import { getPageData } from '../../api/index'
// json动画组件
import PublicJson from '../../components/PublicJson'
// 弹框计数器组件
import DialogCounter from '../../components/Dialog/DialogCounter'
// 夏夜花火
import ch_xyhh from '../../assets/lottie/ch_xyhh/data.json'
// 七彩天地头饰
import ts_qctd from '../../assets/lottie/ts_qctd/data.json'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'
export default {
  name: 'PointReward',
  components: {
    PublicJson,
    DialogCounter,
    TaskListItem,
    ExchargeListItem,
    ThemeDialog
  },
  data() {
    return {
      // json数据
      ts_qctd,
      ch_xyhh,
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'bk_60_60.png',
      // 道具名称
      pointName: '冰块',
      // 弹框样式标识
      dialogType: '',
      // 弹框显示隐藏
      showDialog: false,
      // 弹框数据
      dialogData: {}
    }
  },
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (
          (has_right == 0 && is_recharge && '去完成') ||
          this.ButtonText('GoodsTask', has_right)
        )
      }
    },
    // 弹框内道具名称
    dialogGoodsName() {
      return this.dialogData.goods_type == 'mic' ||
        this.dialogData.goods_type == 'keys'
        ? this.dialogData.goods_type == 'mic'
          ? `${this.dialogData.goods_name}+${this.dialogData.goods_num}天`
          : this.dialogData.goods_num_text
        : this.dialogData.goods_name
    },
    // 弹框内按钮显隐
    showDialogButtons() {
      return (
        this.dialogData.max_times == 1 ||
        this.dialogData.goods_type == 'keys' ||
        this.dialogData.goods_type == 'hero_tools'
      )
    },
    // 弹框内幸运钥匙左按钮文字
    dialogLeftButtonText() {
      return this.dialogData.is_second_half
        ? this.dialogData.price / 2
        : this.dialogData.price
    },
    // 弹框内右边按钮显隐
    showDialogRightButton() {
      return (
        (this.dialogData.goods_type == 'keys' &&
          this.dialogData.exchange_times != '1') ||
        this.dialogData.max_times == 1 ||
        this.dialogData.goods_type == 'hero_tools'
      )
    }
  },
  async created() {
    // 获取地址栏参数
    this.$store.commit('user/getAppData', window.location.search.substring(1))
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'init' })
    // 保存用户头像
    this.$store.commit('user/getUserIcon', this.pageData.user_icon)
  },
  methods: {
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExcharge(num) {
      const goodsType = this.dialogData.goods_type
      if (this.dialogData.max_times == 1) {
        // 兑换次数一次 目前就头饰和称号
        await this.onExchargeOnce(goodsType, num)
      } else if (goodsType == 'keys') {
        // 幸运钥匙兑换
        await this.onExchargeKeys(num)
      } else if (goodsType == 'hero_tools') {
        // 召唤石兑换
        await this.onExchargeHeroTools(num)
      } else {
        // 绿晶石，科举，等等普通道具兑换
        this.settlement.type = 'exchange_goods_new'
        this.settlement['mark[nums]'] = this.inputNum
        const res = await this.handleExcharge()
        this.updataGoodsList(res)
      }
    },
    // 弹框内兑换道具事件：只允许兑换一次(目前就头饰和称号)
    async onExchargeOnce(goodsType, num) {
      let res = {}
      if (num == 2) {
        // 点击右边按钮，判断如果是头饰或者称号，发兑换并装扮请求
        if (goodsType == 'mic' || goodsType == 'title') {
          res = await this.exchargeAndEquip(this.dialogData.type)
        }
      } else {
        // 只兑换，不装扮
        this.settlement['mark[nums]'] = 1
        this.settlement.type = 'exchange_goods_new'
        res = await this.handleExcharge()
      }
      this.updataGoodsList(res)
    },
    // 弹框内兑换道具事件：幸运钥匙兑换
    async onExchargeKeys(num) {
      this.settlement.type = 'exchange_lucky_key'
      this.settlement.mark = num
      // 兑换请求
      const res = await this.handleExcharge()
      this.updataGoodsList(res)
    },
    // 弹框内兑换道具事件：召唤石兑换
    async onExchargeHeroTools(num) {
      this.settlement.type = 'exchange_goods_new'
      this.settlement['mark[nums]'] = this.inputNum
      if (num == 2) {
        // 点击右边按钮，需判断版本号并跳转蛋蛋部落
        const res = await this.handleExcharge()
        // 获取版本号比较结果：高版本，跳转；低版本，提醒更新
        const canToHomeGame = +this.$store.getters.appVersion >= 560
        canToHomeGame
          ? (() => {
              this.$toast(res.errmsg)
              // 如果版本符合，跳转游戏模块
              if (!res.errno) {
                this.pageData.my_goods = res.data.goods
                this.pageData.goods_list = res.data.goods_list
                toHomeGame()
              }
            })()
          : (() => {
              if (!res.errno) {
                this.$toast('兑换成功，请更新客户端，体验最新玩法')
                this.pageData.my_goods = res.data.goods
                this.pageData.goods_list = res.data.goods_list
              } else {
                this.$toast(res.errmsg)
              }
            })()
        // 关闭弹框
        this.showDialog = false
      } else {
        const res = await this.handleExcharge()
        this.updataGoodsList(res)
      }
    },
    // 兑换好礼列表更新事件
    updataGoodsList(res) {
      this.$toast(res.errmsg)
      // 兑换成功 更新数据
      if (res.errno == 0) {
        this.pageData.my_goods = res.data.goods
        this.pageData.goods_list = res.data.goods_list
      }
      this.showDialog = false
    },
    // 任务列表领取按钮点击事件(flag标识是否可领取，key标识点击的是哪个任务，isRecharge标识是否跳转充值)
    async onTaskItemClick(key) {
      // 若为领取状态，则领取
      const res = await this.clickTopButton({ mark: key })
      if (res.errno == 0) {
        this.$toast(res.errmsg)
        this.pageData.my_goods = res.data.goods
        this.pageData.task_list[key].has_right = res.data.has_right
      }
    },
    // 关闭弹框后执行
    closeDialog() {
      this.showDialog = false
      // 兑换数据表单清空
      this.settlement = {}
      // 计数器重置
      this.inputNum = 1
      // 清空弹框数据
      this.dialogData = {}
      // 充值弹框类型
      this.dialogType = ''
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchargeClick(type) {
      await this.clickBottomButton(type)
      this.showDialog = true
      this.settlement['mark[id]'] = this.dialogData.type
    },
    // 任务列表领取接口
    async clickTopButton(obj) {
      return await getPageData({
        ...obj,
        type: 'task_award_new'
      })
    },
    // 兑换好礼兑换接口
    async clickBottomButton(mark) {
      const { data } = await getPageData({
        type: 'goods_detail',
        mark
      })
      this.pageData.my_goods = data.my_goods
      this.dialogData = data.goods_detail
    },
    // 兑换好礼弹框内，头饰称号领取并装扮按钮接口
    async exchargeAndEquip(mark) {
      return await getPageData({
        type: 'exchange_and_equip_goods',
        mark
      })
    },
    // 恭喜获得弹框兑换按钮接口
    async handleExcharge() {
      return await getPageData({ ...this.settlement })
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 弹框样式
  .van-dialog {
    .van-dialog__content {
      .remainingPoint,
      .goods_name,
      .Price_lucky_key,
      .Price_max_times {
        margin: 5px 0;
        font-size: 16px;
        color: #ffffff;
      }
      .remainingPoint {
        margin-top: 15px;
        margin-bottom: 16px;
        > img {
          height: 18px;
          margin: 0 3px;
        }
      }
      .img-box {
        width: 70px;
        height: 66px;
        margin: 10px auto 5px;
        border-radius: 6px;
        .iconBox {
          width: 100%;
          height: 100%;
          background: #fefaef;
          border-radius: 4px;
          > img {
            height: 100%;
          }
        }
        .pointReward_tk_lottie {
          // width: 90%;
          width: 100%;
          height: 100%;
          background: #fefaef;
          border-radius: 4px;
          ::v-deep .PublicJson {
            .micAvatar_img {
              width: 73%;
              height: 73%;
              // > img {
              // }
            }
            blicJsonLottie_PointReward_Dialog_mic {
              width: 60px !important;
            }
            .PublicJsonLottie_PointReward_Dialog_ch {
              width: 95% !important;
            }
          }
        }
      }
      .tk_title_img_box {
        width: 96px !important;
      }
      .goods_name {
        margin: 10px 0 12px;
        font-size: 14px !important;
      }
      .Price_lucky_key {
        margin: 5px 0;
        // font-size: 16px;
        // color: #ffffff;
      }
      .Price_max_times {
        margin: 5px 0;
        // font-size: 16px;
        // color: #ffffff;
        img {
          height: 18px;
          margin: 0 3px;
        }
      }
      // 弹框下方按钮
      .Dialog_Buttons {
        display: flex;
        justify-content: space-evenly;
        margin: 15px 10px 20px;
        .left-button,
        .right-button {
          width: 122px;
          padding: 0 10px;
          height: 38px;
          border-radius: 38px;
          text-align: center;
          flex-direction: column;
          font-size: 16px;
          p {
            width: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 15px;
              height: auto;
              margin: 0 2px;
            }
          }
          p:nth-child(2) {
            font-size: 12px;
          }
        }
        .left-button {
          color: #3270b9;
          background: #e7faff;
          border: 1px solid #ffffff;
        }
      }
    }
  }
  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    ::v-deep .white_border {
      padding: 14px 0;
      align-items: center;
    }
  }
  // 奖励兑换 下方box
  .PointReward_BottomBox {
    margin-top: 45px;
    ::v-deep .white_border {
      padding: 14px 0;
      align-items: center;
    }
    // 顶部道具数量
    .PointReward_BottomBox_Present {
      margin: 12px auto 12px;
      width: 160px;
      height: 24px;
      font-size: 14px;
      border-radius: 12px;
      > img {
        height: 18px;
        margin: 0 3px;
      }
      .PointReward_BottomBox_present_nums {
        height: 100%;
        text-align: left;
        line-height: 24px;
      }
    }
  }
}
</style>
