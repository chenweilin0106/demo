<template>
  <div class="PointReward">
    <irregularityBox class="PointReward_TaskListContent">
      <TaskListItem v-for="(taskItem, index) in pageData.task_list" :key="taskItem.task_name" :taskItem="taskItem"
        :taskItemStatic="task_list_static[index]" :pointName="pointName" :pointIcon="pointIcon"
        @onTaskItemClick="onTaskItemClick" />
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>
            <!-- <div> -->
            活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />，{{ pointName }}<img
              :src="IconPath(pointIcon)" alt="" />可在本活动中兑换超值好礼
            <!-- </div> -->
          </li>
          <li>
            <span></span>购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值
          </li>
          <li>
            <span></span>戒指兑换后将发放至背包，可随时使用，当前无时效限制
          </li>
        </ul>
      </div>
    </irregularityBox>
    <div class="decorate"></div>
    <irregularityBox class="PointReward_BottomBox" themeTitleImg="title_1.png">
      <!-- 我的道具 -->
      <div class="theme_present PointReward_BottomBox_Present flex_across">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />：<span
          class="PointReward_BottomBox_present_nums text_overHidden">{{ pageData.credit_nums }}
        </span>
      </div>
      <!-- 兑换好礼列表 -->
      <div class="PointReward_BottomBox_GoodsList">
        <ExchargeListItem v-for="(goods, index) in pageData.exchange_list" :key="goods.goods_name" :exchargeItem="goods"
          :exchargeItemStatic="goods_list_static[index]" @onExchargeClick="onExchargeClick" @preview="preview"
          :pointName="pointName" :index="index" :spend_point="pageData.spend_point" />
      </div>
      <!-- 规则说明 -->
      <!-- <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>
            幸运钥匙可在幸运轮盘中抽奖获得称号、头饰、限时礼物赠送权等限定奖励
          </li>
        </ul>
      </div> -->
    </irregularityBox>
    <!-- 兑换好礼弹框 -->
    <ThemeDialog :isShow="showDialog" dialogMark="exchargeGift" :titleIconObj="{ exchargeGift: 'title_1.png' }"
      @closeDialog="
        showDialog = false
      closeDialog()
        ">
      <!-- 剩余道具 -->
      <p class="remainingPoint flex_across">
        剩余{{ pointName
        }}<img class="my_present_nums_box" :src="IconPath(pointIcon)" alt="" />
        ：{{ pageData.credit_nums }}
      </p>
      <!-- 道具图标展示 -->
      <div class="theme_item img-box">
        <div class="iconBox flex_across" v-if="goods_list_static[selectIndex].goods_icon_t">
          <img :src="require('../../assets/' + goods_list_static[selectIndex].goods_icon_t)" alt="" />
        </div>
        <div v-else class="pointReward_tk_lottie">
          <PublicJson v-if="goods_list_static[selectIndex].goods_type == 'voice'" :lottieJson_name="'sb_tmbb'"
            :lottieJson="sb_tmbb" :userAvatar="$store.getters.user_icon"></PublicJson>
          <PublicSvga v-if="goods_list_static[selectIndex].goods_type == 'ring'" :svgaName="'jz_llzh'">
          </PublicSvga>
        </div>
      </div>
      <!-- 道具名称 -->
      <p class="goods_name flex_across">
        {{ goods_list_static[selectIndex].goods_name }}
      </p>
      <!-- 预计消耗数量 -->
      <p v-if="goods_list_static[selectIndex].predict" class="Price_max_times flex_across">
        消耗<img :src="IconPath(pointIcon)" alt="" /> ：{{ goods_list_static[selectIndex].price }}
      </p>
      <!-- 计数器组件 -->
      <DialogCounter v-if="goods_list_static[selectIndex].iscount" :goods_detail="pageData.exchange_list[selectIndex]"
        :goods_detail_static="goods_list_static[selectIndex]" :credit_nums="pageData.credit_nums"
        :inputNum.sync="inputNum" :showSpecialBilling="goods_list_static[selectIndex].goods_type === 'hero_tools'"
        :showBilling="goods_list_static[selectIndex].goods_type !== 'hero_tools'" CounterIcon="qbt_70_70.png"
        @dialogExcharge="onExcharge(1)" />
      <!-- 底部两个按钮 -->
      <div class="Dialog_Buttons" v-if="goods_list_static[selectIndex].hasTwoBtn">
        <div class="left-button flex_across" @click="onExcharge(1)">
          <p>
            {{
              goods_list_static[selectIndex].goods_type === 'keys' ||
              goods_list_static[selectIndex].goods_type === 'pretty_card'
              ? '兑1个'
              : '兑换'
            }}
          </p>
          <p v-if="goods_list_static[selectIndex].goods_type === 'keys' ||
              goods_list_static[selectIndex].goods_type === 'pretty_card'
              ">
            (消耗:<img class="my_present_nums_box" :src="IconPath(pointIcon)" alt="" />
            {{ dialogLeftButtonText }})
          </p>
        </div>
        <div class="theme_botton_did right-button" @click="onExcharge(2)" v-if="showDialogRightButton">
          <p>
            {{ ButtonText('dialogRbtn', goods_list_static[selectIndex].goods_type) }}
          </p>
          <p v-if="goods_list_static[selectIndex].goods_type === 'keys' ||
            goods_list_static[selectIndex].goods_type === 'pretty_card'
            ">
            (消耗:<img :src="IconPath(pointIcon)" alt="" />
            {{ goods_list_static[selectIndex].price / 2 + goods_list_static[selectIndex].price }})
          </p>
        </div>
      </div>
    </ThemeDialog>
    <!-- 提示弹窗 预览头饰称号弹窗-->
    <van-overlay :show="showFlag" z-index="30">
      <div class="wrapper" @click="showFlag = false">
        <div class="color_border" @click.stop>
          <div class="block">
            <div class="mic" v-if="type == 'voice'">
              <div class="lottie">
                <PublicJson class="PublicJson" :lottieJson_name="'sb_tmbb'" :lottieJson="sb_tmbb"
                  :userAvatar="pageData.user_icon" />
              </div>
              <div class="name">甜蜜啵啵·声波</div>
            </div>
            <div class="title" v-if="type == 'ring'">
              <div class="lottie">
                <PublicSvga :svgaName="'jz_llzh'">
                </PublicSvga>
              </div>
              <div class="name">恋恋之环·戒指 </div>
              <div class="tit">价值21999
                <img src="../../assets/zs_60_60.png" alt="">
              </div>
            </div>
            <div class="close" @click="closePreview"></div>
          </div>
        </div>

      </div>
    </van-overlay>

    <!-- 兑换好礼弹框 -->
    <ThemeDialog :isShow="showDialog1" :dialogMark="dialogMark" :titleIconObj="{ congrats_get: 'title_8.png' }"
      :isSmall="true" @closeDialog="
        showDialog1 = false

        ">
      <!-- 恭喜获得弹框 -->
      <div class="dialog_congrats">
        <DialogCongrats class="dialog" :isMultiple="false" :awardName="'丘比特+' + qbtnum" :awardData="getlist[0]"
          btnText="我知道了" @onCongratsBtn="showDialog1 = false">
          <!-- <PublicSvga svgaName="jz_cczj" /> -->
        </DialogCongrats>
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
import ThemeDialog from '../../components/Dialog/ThemeDialog'
import irregularityBox from '../../components/irregularityBox.vue'
// 恭喜获得弹框组件
import DialogCongrats from '../../components/Dialog/DialogCongrats'
// 默认数据
import { pointReward } from '../../utils/pageData'
// 跳转蛋蛋部落APP方法
import { toHomeGame } from '../../utils/toApp'
// 数据请求
import { getPageData, revTaskReward, exchange } from '../../api/index'
// json动画组件
import PublicJson from '../../components/PublicJson'
// svga动画组件
import PublicSvga from '../../components/PublicSvga'
// 弹框计数器组件
import DialogCounter from '../../components/Dialog/DialogCounter'
// 甜蜜波波声波
import sb_tmbb from '../../assets/lottie/sb_tmbb/data.json'
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
    ThemeDialog,
    irregularityBox,
    PublicSvga,
    DialogCongrats,

  },
  data() {
    return {
      qbtnum: 3,
      showDialog1: false,
      dialogMark: 'congrats_get',
      showFlag: false,
      // json数据
      sb_tmbb,
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'qbt_70_70.png',
      // 道具名称
      pointName: '丘比特',
      // 弹框样式标识
      dialogType: '',
      // 弹框显示隐藏
      showDialog: false,
      // 弹框数据
      dialogData: {},
      task_list_static: [
        {
          award_nums: 1,
          task_name: '签到',
          reset: true,
          blueTips: false,
          need_rev: true,
          is_recharge: false,
          islimit: false
        },
        {
          award_nums: 5,
          task_name: '收到5次祝福',
          reset: true,
          blueTips: false,
          need_rev: true,
          is_recharge: false,
          islimit: false
        },
        {
          award_nums: 10,
          task_name: '赠送/收到一枚戒指',
          reset: true,
          blueTips: false,
          is_recharge: false,
          need_rev: true,
          islimit: false
        },
        {
          award_nums: 2,
          task_name: '发出1次表白',
          reset: true,
          blueTips: false,
          is_recharge: false,
          need_rev: true,
          islimit: false
        },
        {
          award_nums: 2,
          task_name: '赠送10个礼物【比心】',
          reset: true,
          blueTips: true,
          is_recharge: false,
          need_rev: true,
          islimit: false
        },
        {
          award_nums: 6,
          task_name: '每充值10元',
          reset: false,
          blueTips: false,
          is_recharge: false,
          need_rev: false,
          islimit: false
        },
        {
          award_nums: 99,
          task_name: '爱情小屋每提升等级1次',
          reset: false,
          blueTips: false,
          is_recharge: false,
          need_rev: true,
          islimit: true
        }
      ],
      goods_list_static: [
        {
          goods_icon: 'ljs_120_120.png',
          goods_icon_t: 'ljs_120_120.png',
          goods_num_text: '绿晶石+5',
          goods_name: '绿晶石',
          price: 5,
          goods_type: 'tool',
          iscount: true
        },
        {
          goods_icon: 'tmtg_120_120.png',
          goods_icon_t: 'tmtg_120_120.png',
          goods_num_text: '亲密糖果+5',
          goods_name: '亲密糖果',
          price: 5,
          goods_type: 'tool',
          iscount: true

        },
        {
          goods_icon: 'zhs_120_120.png',
          goods_icon_t: 'zhs_120_120.png',
          goods_num_text: '召唤石+1',
          goods_name: '召唤石',
          price: 30,
          goods_type: 'hero_tools',
          iscount: true,
          hasTwoBtn: true
        },
        {
          goods_icon: 'lhq_120_120.png',
          goods_icon_t: 'lhq_120_120.png',
          goods_num_text: '靓号券+1',
          goods_name: '靓号券',
          price: 30,
          goods_type: 'pretty_card',
          iscount: true
        },
        {
          goods_icon: '',
          goods_icon_t: '',
          goods_num_text: '声波+7天',
          goods_name: '声波+7天',
          price: 80,
          goods_type: 'voice',
          predict: true,
          hasTwoBtn: true
        },
        {
          goods_icon: '',
          goods_icon_t: '',
          goods_num_text: '戒指【恋恋之环】',
          goods_name: '戒指【恋恋之环】',
          price: 400,
          goods_type: 'ring',
          islast: true,
          predict: true,
          hasTwoBtn: true
        }
      ],
      selectIndex: 0,
      type: 'ring',
      getlist: [{
        id: 1,
        icon: 'qbt_70_70.png',
        name: '丘比特',
        text: '+1',
        price: 99,
        type: 'jz'
      }]
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
        this.goods_list_static[this.selectIndex].goods_type == 'voice' ||
        this.goods_list_static[this.selectIndex].goods_type == 'hero_tools'
      )
    }
  },
  async created() {
    // 获取地址栏参数
    this.$store.commit('user/getAppData', window.location.search.substring(1))
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ mark: 1 })
    console.log(this.pageData)
    // 保存用户头像
    this.$store.commit('user/getUserIcon', this.pageData.user_icon)
  },
  methods: {
    // 预览
    preview(i) {
      this.showFlag = true
      if (i == 1) {
        this.type = 'voice'
      }
      if (i == 2) {
        this.type = 'ring'
      }
    },
    // 关闭预览
    closePreview() {
      this.type = null
      this.showFlag = false
    },
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExcharge(argtype) {
      console.log(this.selectIndex, argtype);
      let type = argtype
      if (this.selectIndex == 2) {
        type = 1
      }
      exchange({
        goods_id: this.pageData.exchange_list[this.selectIndex].goods_id,
        nums: this.inputNum,
        type
      }).then(res => {
        this.showDialog = false
        // if (res.errno == 0) {
        this.getPageData({ mark: 1 })
        // }
        // 召唤石跳转
        if (this.selectIndex == 2 && argtype == 2) {
          // 获取版本号比较结果：高版本，跳转；低版本，提醒更新
          const canToHomeGame = +this.$store.getters.appVersion >= 560
          canToHomeGame
            ? (() => {
              this.$toast(res.errmsg)
              // 如果版本符合，跳转游戏模块
              if (!res.errno) {
                // this.pageData.credit_nums = res.data.goods
                // this.pageData.exchange_list = res.data.exchange_list
                toHomeGame()
              }
            })()
            : (() => {
              if (!res.errno) {
                this.$toast('兑换成功，请更新客户端，体验最新玩法')
                this.pageData.credit_nums = res.data.goods
                this.pageData.exchange_list = res.data.exchange_list
              } else {
                this.$toast(res.errmsg)
              }
            })()
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    // 任务列表领取按钮点击事件(flag标识是否可领取，key标识点击的是哪个任务，isRecharge标识是否跳转充值)
    onTaskItemClick(task_id, num) {
      // 若为领取状态，则领取
      revTaskReward({
        task_id
      }).then(res => {
        if (res.errno == 0) {
          console.log(res)
          // getPageData({ mark: 1 })
          this.getPageData({ mark: 1 })
          this.showDialog1 = true
          this.qbtnum = res.data.credit_nums 
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    // 关闭弹框后执行
    closeDialog() {
      this.showDialog = false
      // 兑换数据表单清空
      this.settlement = {}
      // 计数器重置
      this.inputNum = 1
      // 充值弹框类型
      this.dialogType = ''
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchargeClick(index) {
      console.log(index)
      this.selectIndex = index
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  ::v-deep .OnlyAward_Name {
    margin-top: 9px;
    margin-bottom: 0;
  }

  ::v-deep .OnlyAward_Icon {
    margin-top: 19px;
  }
}

.wrapper {
  width: 100%;
  height: 100%;

  ::v-deep .dialog_congrats {
    .AwardItem_Box {
      margin-bottom: 5px;

      .Award_Icon {
        img {
          background: #fff;
        }

        .PublicSvga {
          width: 46px;
          height: 46px;
        }
      }
    }

    .DialogCongrats_Btn {
      margin: 18px auto 18px;
    }
  }

  .color_border {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3px;
    background: linear-gradient(180deg, #FFC4E8, #BFD9FF);
    border-radius: 12px;


    .block {
      width: 300px;
      height: 156px;
      background: linear-gradient(0deg, #8FAFFF, #FFA1DB);
      border: 3px solid #fff;
      border-radius: 10px;
      flex: 1 1 auto;
      // box-sizing: content-box;

      .mic {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .lottie {
          width: 93px;
          height: 93px;
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;

          ::v-deep .PublicJson {
            .micAvatar_img {
              width: 73%;
              height: 73%;
            }
          }
        }

        .name {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 3px;
        }
      }

      .title {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .lottie {
          width: 93px;
          height: 93px;
          margin-top: 14px;
          position: relative;

        }

        .name {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 5px;
          height: 13px;
          line-height: 13px;
          // border: 1px solid red;
        }

        .tit {
          margin-top: 4px;
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFAA6;
          display: flex;
          align-items: center;

          img {
            margin-top: -2px;
            width: 15px;
            height: 15px;
          }
        }
      }

      .close {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 36px;
        height: 36px;
        background-image: url('../../assets/tk_1.png');
        background-size: 100% 100%;
        // border: 1px solid red;

      }
    }
  }

}

.PointReward {
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 10px solid red;

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

        >img {
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

          >img {
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

        .left-button {
          color: #3270b9;
          background: #e7faff;
          border: 1px solid #ffffff;
        }
      }
    }
  }

  .ThemeBox_BottomText {
    li {
      width: 316px;
    }

    img {
      width: 23px;
      height: 23px;
    }
  }

  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    ::v-deep .white_border {
      padding: 14px 0;
      align-items: center;
    }
  }

  .decorate {
    width: 375px;
    height: 96px;
    background-image: url('../../assets/back.png');
    background-size: 100% 100%;
    margin-top: -46px;
  }

  // 奖励兑换 下方box
  .PointReward_BottomBox {
    margin-top: 15px;
    margin-bottom: 31px;

    ::v-deep .white_border {
      padding: 14px 0;
      align-items: center;
      padding-bottom: 0px;
    }

    // 顶部道具数量
    .PointReward_BottomBox_Present {
      margin: 12px auto 12px;
      width: 160px;
      height: 24px;
      font-size: 14px;
      border-radius: 12px;

      >img {
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
../../src/pages/utils/pageData../../src/pages/utils/toApp
