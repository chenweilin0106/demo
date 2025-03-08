<template>
  <div class="PointReward">
    <crazy-egg-box class="PointReward_TaskListContent">
      <div class="task_list_main">
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
      </div>
    </crazy-egg-box>
    <crazy-egg-box class="PointReward_BottomBox" title-icon="title_2.png">
      <div class="redeem_goodies_main">
        <!-- 我的道具 -->
        <div class="theme_present PointReward_BottomBox_Present flex_across">
          我的{{ pointName }}<img :src="IconPath(pointIcon)" />：<span
            class="PointReward_BottomBox_present_nums flex_across"
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
              <span></span
              >钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物赠送权等限定奖励
            </li>
          </ul>
        </div>
      </div>
    </crazy-egg-box>
    <transition name="fade">
      <exchange-gifts-prompt
        :class="isHeroStone && 'hero-stone-prompt'"
        v-if="showExchangeGifts"
        @close="showExchangeGifts = false"
      >
        <div class="exchargeGift_main">
          <!-- 剩余道具 -->
          <p class="remainingPoint flex_across">
            剩余{{ pointName
            }}<img class="my_present_nums_box" :src="IconPath(pointIcon)" />
            ：{{ pageData.my_goods }}
          </p>
          <!-- 道具图标展示 -->
          <div
            class="theme_item img-box"
            :class="{
              tk_title_img_box: dialogData.type === 'title',
              car_rhty_img_box: dialogData.type === 'car_rhty'
            }"
          >
            <div class="iconBox flex_across" v-if="dialogData.goods_icon_t">
              <img :src="IconPath(dialogData.goods_icon_t)" />
            </div>
            <div v-else class="pointReward_tk_lottie">
              <!-- json容器 -->
              <PublicJson
                class="title_animation"
                v-if="dialogData.goods_type === 'title'"
                jsonName="ch_mdjh"
              />
              <public-svga
                class="mic_animation"
                svgaName="ts_tlzy"
                :userAvatar="$store.getters.user_icon"
              />
            </div>
          </div>
          <!-- 道具名称 -->
          <p class="goods_name flex_across">
            {{ dialogGoodsName }}
          </p>
          <!-- 预计消耗数量 -->
          <p
            v-if="dialogData.max_times == 1"
            class="Price_max_times flex_across"
          >
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
          <!-- 计数器组件 -->
          <DialogCounter
            v-if="showCounter"
            :goods_detail="dialogData"
            :my_goods="+pageData.my_goods"
            :inputNum.sync="inputNum"
            :showSpecialBilling="isHeroStone"
            :showBilling="!isHeroStone"
            :CounterIcon="pointIcon"
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
                (消耗:<img
                  class="my_present_nums_box"
                  :src="IconPath(pointIcon)"
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
              <p v-if="SpecialFlag">
                (消耗:<img :src="IconPath(pointIcon)" />
                {{ dialogData.price / 2 + dialogData.price }})
              </p>
            </div>
          </div>
        </div>
      </exchange-gifts-prompt>
    </transition>
  </div>
</template>

<script>
import ExchangeGiftsPrompt from '@/pages/crazyEgg/components/exchange-gifts-prompt.vue'
// 默认数据
import { pointReward } from '@/pages/crazyEgg/utils/pageData'
// 数据请求
import { getPageData } from '@/pages/crazyEgg/api/index'
import PublicJson from '@/pages/crazyEgg/components/PublicJson.vue'
import PublicSvga from '@/pages/crazyEgg/components/PublicSvga.vue'
// 弹框计数器组件
import DialogCounter from '@/pages/crazyEgg/components/DialogCounter.vue'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'

export default {
  name: 'PointReward',
  components: {
    ExchangeGiftsPrompt,
    PublicJson,
    PublicSvga,
    DialogCounter,
    TaskListItem,
    ExchargeListItem
  },
  data() {
    return {
      showExchangeGifts: false,
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'jf_60_60.png',
      // 道具名称
      pointName: '积分',
      // 弹框数据
      dialogData: {}
    }
  },
  computed: {
    // 是否为召唤石弹框
    isHeroStone() {
      return this.dialogData.type === 'hero_tools_zhs'
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
        this.dialogData.max_times !== 1 &&
        this.dialogData.type !== 'lucky_key' &&
        this.dialogData.type !== 'pretty_card'
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
      const { goods_type, goods_name, goods_num, goods_num_text } =
        this.dialogData
      return ['mic', 'keys', 'pretty_card', 'car'].includes(goods_type)
        ? ['mic', 'car'].includes(goods_type)
          ? `${goods_name}+${goods_num}天`
          : goods_num_text
        : goods_name
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
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
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
      } else if (goodsType == 'keys' || goodsType == 'pretty_card') {
        // 幸运钥匙兑换 靓号券兑换
        this.settlement.type =
          goodsType == 'keys' ? 'exchange_lucky_key' : 'exchange_pretty_card'
        await this.onExchargeSpecial(num)
      } else if (goodsType == 'hero_tools') {
        // 召唤石兑换
        await this.onExchargeHeroTools()
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
        if (goodsType == 'mic' || goodsType == 'title' || goodsType == 'car') {
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
      this.showExchangeGifts = false
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
      this.showExchangeGifts = false
      // 兑换数据表单清空
      this.settlement = {}
      // 计数器重置
      this.inputNum = 1
      // 清空弹框数据
      this.dialogData = {}
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchargeClick(type) {
      await this.clickBottomButton(type)
      this.showExchangeGifts = true
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
  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    position: relative;
    width: 100%;

    .task_list_main {
      position: absolute;
      z-index: 3;
      top: -68px;
      left: 50%;
      transform: translateX(-50%);
      height: fit-content;
    }

    ::v-deep .ThemeBox_BottomText {
      //margin-top: 30px !important;
      // letter-spacing: -0.2px;
      margin-right: 3px !important;

      ul {
        li {
          margin-left: 22px;

          span {
            top: 12px;
            left: -20px;
          }

          &:nth-of-type(1) {
            line-height: 50px;
            margin-bottom: 12px;
          }
        }
      }
    }

    ::v-deep .main {
      height: 863px;
    }
  }

  // 奖励兑换 下方box
  .PointReward_BottomBox {
    //width: 357px;
    position: relative;
    margin-top: 70px;
    margin-bottom: 180px;

    .redeem_goodies_main {
      position: absolute;
      z-index: 3;
      top: -47px;
      left: 50%;
      transform: translateX(-50%);
      //padding-left: 2px;
      // width: 100%;
      height: 100%;
      // 顶部道具数量
      .PointReward_BottomBox_Present {
        min-width: 320px;
        width: fit-content;
        height: 48px;
        margin: 24px auto 30px;
        font-size: 28px;
        border-radius: 24px;
        padding: 0 20px;

        > img {
          height: 47px;
          margin: 0 6px;
        }

        .PointReward_BottomBox_present_nums {
          height: 100%;
        }
      }
    }

    ::v-deep .ThemeBox_BottomText {
      //margin-top: 20px;
      // letter-spacing: -0.2px;
      // margin-right: 3px !important;
      ul {
        li {
          margin-left: 24px;
          line-height: 45px;

          span {
            //top: 8px;
          }
        }
      }
    }
    ::v-deep .main {
      height: 1398px;

      .ThemeBox_BottomText {
        margin-left: 10px;
      }
    }
  }
}
</style>
