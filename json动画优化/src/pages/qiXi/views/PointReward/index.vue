<template>
  <div class="PointReward">
    <QiXiBox class="PointReward_TaskListContent">
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
            }}<img :src="IconPath(pointIcon)" />，{{ pointName
            }}<img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼
          </li>
          <li>
            <span></span
            >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值
          </li>
        </ul>
      </div>
    </QiXiBox>
    <QiXiBox class="PointReward_BottomBox" themeTitleImg="title_1.png">
      <!-- 我的道具 -->
      <div class="theme_present PointReward_BottomBox_Present flex_across">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" />：<span
          class="PointReward_BottomBox_present_nums"
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
            钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物赠送权等限定奖励
          </li>
        </ul>
      </div>
    </QiXiBox>
    <!-- 兑换好礼弹框（称号返厂弹框为小弹框） -->
    <ThemeDialog
      :isShow="showDialog"
      dialogMark="exchargeGift"
      :titleIconObj="{ exchargeGift: 'title_1.png' }"
      :dialogData="dialogData"
      :class="{ title_return_width: isTitleBack }"
      @closeDialog="
        showDialog = false
        closeDialog()
      "
    >
      <!-- 剩余道具 -->
      <p class="remainingPoint flex_across">
        剩余{{ pointName }}
        <img class="my_present_nums_box" :src="IconPath(pointIcon)" /> ：{{
          pageData.my_goods
        }}
      </p>
      <!-- 道具图标展示 -->
      <div
        class="theme_item img-box"
        :class="{ tk_title_img_box: dialogData.type === 'title' }"
        v-if="!isTitleBack"
      >
        <div class="iconBox flex_across" v-if="dialogData.goods_icon_t">
          <img :src="IconPath(dialogData.goods_icon_t)" />
        </div>
        <div v-else class="pointReward_tk_lottie">
          <PublicJson
            :lottieJson_name="
              dialogData.goods_type == 'mic'
                ? '_PointReward_Dialog_mic'
                : '_PointReward_Dialog_title'
            "
            :lottieJson="dialogData.goods_type == 'mic' ? ts_hsyh : ch_smxf"
            :userAvatar="
              dialogData.goods_type == 'mic' ? $store.getters.user_icon : ''
            "
          ></PublicJson>
        </div>
      </div>
      <!-- 道具名称 -->
      <p class="goods_name flex_across" v-if="!isTitleBack">
        {{ dialogGoodsName }}
      </p>
      <!-- 预计消耗数量 -->
      <p v-if="dialogData.max_times == 1" class="Price_max_times flex_across">
        消耗<img :src="IconPath(pointIcon)" /> ：{{ dialogData.price }}
      </p>
      <!-- 幸运钥匙特殊说明 -->
      <p v-if="SpecialFlag" class="Price_lucky_key flex_across">
        首个消耗50个<img
          class="my_present_nums_box"
          :src="IconPath(pointIcon)"
        />
        第二个半价
      </p>
      <!-- 称号返厂组件（会将选中称号的数量传递上来，赋值给input，共消耗就会改变） -->
      <TitleReturn
        ref="titleReturn"
        v-if="isTitleBack"
        :titleData="dialogData.list"
        @checkedTitle="checkedTitle"
      />
      <!-- 计数器组件（称号返程是用特殊结算和特殊结算按钮） -->
      <DialogCounter
        v-if="showCounter"
        :goods_detail="dialogData"
        :my_goods="+pageData.my_goods"
        :inputNum.sync="inputNum"
        :showSpecialBilling="isHeroStone || isTitleBack"
        :showBilling="!isHeroStone && !isTitleBack"
        :CounterIcon="pointIcon"
        :showCounter="!isTitleBack"
        :showSpecialBillingButton="isTitleBack"
        @clickSettlement="onExcharge"
      />
      <!-- 底部两个按钮 -->
      <div
        class="Dialog_Buttons"
        v-if="showDialogButtons"
        :class="isHeroStone && 'hero_stone_btn'"
      >
        <div
          class="left-button theme_botton_undid flex_across"
          @click="onExcharge(1)"
        >
          <p>
            {{ SpecialFlag ? '兑1个' : '兑换' }}
          </p>
          <p v-if="SpecialFlag">
            (消耗:<img class="my_present_nums_box" :src="IconPath(pointIcon)" />
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
          <p v-if="SpecialFlag">
            (消耗:<img :src="IconPath(pointIcon)" />
            {{ dialogData.price / 2 + dialogData.price }})
          </p>
        </div>
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
// 称号返厂弹框组件
import TitleReturn from './components/TitleReturn'
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 默认数据
import { pointReward } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// json动画组件
import PublicJson from '../../components/PublicJson'
// 弹框计数器组件
import DialogCounter from '../../components/Dialog/DialogCounter'
// 宿命相逢称号
import ch_smxf from '../../assets/lottie/ch_smxf/data.json'
// 火树银花头饰
import ts_hsyh from '../../assets/lottie/ts_hsyh/data.json'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'
export default {
  name: 'PointReward',
  components: {
    TitleReturn,
    PublicJson,
    DialogCounter,
    TaskListItem,
    ExchargeListItem,
    ThemeDialog
  },
  data() {
    return {
      // json数据
      ts_hsyh,
      ch_smxf,
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'qd_76_76.png',
      // 道具名称
      pointName: '情蝶',
      // 弹框显示隐藏
      showDialog: false,
      // 弹框数据
      dialogData: {}
    }
  },
  computed: {
    // 内容过长时，显示省略号
    character_omission() {
      return (text, length) => {
        const Text = text.toString()
        return Text.length > length ? Text.substring(0, length) + '...' : Text
      }
    },
    // 是否为召唤石弹框
    isHeroStone() {
      return this.dialogData.type === 'hero_tools_zhs'
    },
    // 是否为称号返厂弹框
    isTitleBack() {
      return this.dialogData.type === 'title_return'
    },
    // 幸运钥匙和靓号券特殊条件判断
    SpecialFlag() {
      return (
        this.dialogData.goods_type === 'keys' ||
        this.dialogData.goods_type === 'pretty_card'
      )
    },
    // 计数器显示逻辑
    showCounter() {
      return (
        (this.dialogData.max_times !== 1 &&
          this.dialogData.type !== 'lucky_key' &&
          this.dialogData.type !== 'pretty_card') ||
        this.isTitleBack
      )
    },
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
        this.dialogData.goods_type == 'keys' ||
        this.dialogData.goods_type == 'pretty_card'
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
        this.dialogData.goods_type == 'pretty_card' ||
        this.dialogData.goods_type == 'hero_tools'
      )
    },
    // 弹框内幸运钥匙左按钮文字
    // 弹框内靓号券左按钮文字
    dialogLeftButtonText() {
      return this.dialogData.is_second_half
        ? this.dialogData.price / 2
        : this.dialogData.price
    },
    // 弹框内右边按钮显隐
    showDialogRightButton() {
      return (
        ((this.dialogData.goods_type == 'keys' ||
          this.dialogData.goods_type == 'pretty_card') &&
          this.dialogData.exchange_times != '1') ||
        this.dialogData.max_times == 1
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
    // 勾选称号，根据数组长度更新计数器
    checkedTitle(arr) {
      // 更新消耗道具数量
      this.inputNum = arr.length
      this.dialogData.price = 480
    },
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExcharge(num) {
      const goodsType = this.dialogData.goods_type
      if (this.dialogData.max_times == 1) {
        // 兑换次数一次 目前就头饰和称号
        await this.onExchargeOnce(goodsType, num)
      } else if (goodsType == 'keys' || goodsType == 'pretty_card') {
        // 幸运钥匙兑换 靓号券兑换
        this.settlement.type =
          goodsType == 'keys' ? 'exchange_lucky_key' : 'exchange_pretty_card'
        await this.onExchargeSpecial(num)
      } else if (goodsType == 'hero_tools') {
        // 召唤石兑换
        await this.onExchargeHeroTools()
      } else if (goodsType == 'title_return') {
        // 返厂称号兑换
        console.log('返厂称号兑换')
        await this.onExchargeTitleReturn()
      } else {
        // 绿晶石，科举，等等普通道具兑换
        this.settlement.type = 'exchange_goods_new'
        this.settlement['mark[nums]'] = this.inputNum
        const res = await this.handleExcharge()
        this.updataGoodsList(res)
      }
    },
    // 弹框内兑换道具事件：返厂称号（占位）
    async onExchargeTitleReturn() {
      // this.$refs.titleReturn.checkedTitle 为选中称号数据
      if (this.$refs.titleReturn.checkedTitle.length == 0) {
        this.$toast('当前未勾选称号')
        return (this.showDialog = false)
      }
      const res = await this.exchargeTitleReturnApi(
        this.$refs.titleReturn.checkedTitle
      )
      this.updataGoodsList(res)
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
    // 弹框内兑换道具事件：幸运钥匙和靓号券兑换
    async onExchargeSpecial(num) {
      this.settlement.mark = num
      // 兑换请求
      const res = await this.handleExcharge()
      this.updataGoodsList(res)
    },
    // 弹框内兑换道具事件：召唤石兑换
    async onExchargeHeroTools() {
      this.settlement.type = 'exchange_goods_new'
      this.settlement['mark[nums]'] = this.inputNum
      const res = await this.handleExcharge()
      this.updataGoodsList(res)
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
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchargeClick(type) {
      // 如果是称号返厂弹框，就将input数设置成0（当前占位，判断字段未确定）
      if (type == 'title_return') {
        this.inputNum = 0
        // 称号返厂列表数据请求
        const res = await this.titleBackListApi()
        if (res.errno) return this.$toast(res.errmsg)
        this.dialogData = res.data
        this.dialogData.price = 480
        this.dialogData.goods_type = 'title_return'
        return (this.showDialog = true)
      }
      await this.clickBottomButton(type)
      this.showDialog = true
      this.settlement['mark[id]'] = this.dialogData.type
    },
    // 兑换返厂称号接口
    async exchargeTitleReturnApi(data) {
      return await getPageData({
        type: 'point_reward_exchange_titles',
        mark: JSON.stringify({ ids: data })
      })
    },
    // 返厂称号列表接口
    async titleBackListApi() {
      return await getPageData({
        type: 'point_reward_return_titles'
      })
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
  .title_return_width {
    width: 274px !important;
    // height: 402px !important;

    .remainingPoint {
      margin: 3px auto 12px !important;
    }
    ::v-deep .special_billing_btn {
      margin: 7px auto 18px;
    }
  }
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
          height: 22px;
          // margin: 0 3px;
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
          background: #fff;
          border-radius: 4px;
          > img {
            height: 100%;
          }
        }
        .pointReward_tk_lottie {
          // width: 90%;
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          ::v-deep .PublicJson {
            .micAvatar_img {
              width: 73%;
              height: 73%;
              // > img {
              // }
            }
            .PublicJsonLottie_PointReward_Dialog_mic {
              width: 60px !important;
            }
            .PublicJsonLottie_PointReward_Dialog_title {
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
        img {
          height: 18px;
          margin: 0 3px;
        }
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
      }
      .hero_stone_btn {
        margin: 7px 10px 15px !important;
        .left-button {
          width: 124px !important;
          height: 40px !important;
          border: 2px solid #ffffff !important;
          border-radius: 20px !important;
        }
      }
    }
  }
  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    ::v-deep .main {
      .TaskListItem:nth-child(1) {
        margin: -15px 0 11px;
      }
      background-size: 100% 97%;
      .ThemeBox_BottomText {
        margin-top: 3px;
        line-height: 20px;
        li {
          img {
            position: relative;
            top: -2px;
            margin: 0px;
            width: auto;
            height: 26px;
          }
          margin-left: 7px;
          > span {
            left: -8px;
          }
        }
      }
    }
    ::v-deep .foot {
      margin-top: -20px;
    }
  }
  // 奖励兑换 下方box
  .PointReward_BottomBox {
    margin-top: 75px;
    ::v-deep .main {
      margin-top: -5px;
      background-size: 100% 97.5%;
    }
    .PointReward_BottomBox_Present {
      min-width: 160px;
      height: 24px;
      font-size: 14px;
      background: #8d64da;
      border-radius: 12px;
      font-weight: 500;
      margin-top: -4px;
      margin-bottom: 10px;
      padding: 0 10px;
      > img {
        margin: 0 3px 2px;
        height: 24px;
      }
    }
    ::v-deep .foot {
      margin-top: -24px;
      margin-bottom: 36px;
    }
  }
}
</style>
