<template>
  <div class="FilpGame">
    <!-- 翻牌模块 -->
    <themeBox class="Flip">
      <!-- 购买礼包 -->
      <div class="FlipGift">
        <!-- 白色边框夹层 -->
        <div class="FlipGift_white_border">
          <!-- 礼包奖励列表渲染 -->
          <div class="FlipGift_main">
            <div
              class="Gift_item"
              v-for="(gift, index) in FlipGiftList"
              :key="index"
            >
              <!-- 图标 -->
              <div class="Gift_item_icon flex_across">
                <img :src="IconPath(gift.icon)" alt="" />
              </div>
              <!-- 名字 -->
              <div class="Gift_item_name flex_across">{{ gift.name }}</div>
            </div>
            <!-- 购买礼包按钮 -->
            <div class="buyGiftBtn" @click="buyGift">
              <img
                :src="
                  IconPath(pageData.free_used ? 'mk5_4_1.png' : 'mk5_4.png')
                "
              />
            </div>
            <!-- 每日首次免费icon -->
            <div class="freeIcon" v-if="!pageData.free_used">
              <img :src="IconPath('mk5_3.png')" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 拥有翻牌币和已消费钻石数量 -->
      <div class="UserInfo flex_across">
        <!-- 拥有翻牌币 -->
        <div class="has_flip_ticket flex_across">
          翻牌币<img :src="IconPath('mk5_5.png')" />：
          <span class="speical_color text_overHiddem">
            {{ pageData.flip_ticket }}</span
          >
        </div>
        <!-- 已消费 -->
        <div class="customeNum flex_across">
          已消费<img :src="IconPath('mk5_9.png')" />：
          <span class="speical_color">{{ pageData.masonry_consume }}</span>
        </div>
      </div>
      <!-- 概率弹框按钮 -->
      <div class="LotteryOddsIcon flex_across" @click="openLotteryOdds">
        <img :src="IconPath('mk6_2.png')" alt="" />
      </div>
      <!-- 翻牌列表 -->
      <div class="FlipMain">
        <!-- 翻牌列表 -->
        <div class="FlipList">
          <FlipItem
            :ref="`FlipItem_${flip.index}`"
            v-for="flip in flip_list"
            :key="flip.index"
            :flip_data="flip"
            @handleFlip="handleFlip(flip.index)"
            @flipEnd="flipThrottle = false"
          />
        </div>
        <!-- 本轮还能翻几张-->
        <div
          class="FlipNum flex_across"
          v-if="pageData.has_ticket && flip_button.flip_status === 1"
        >
          本轮还能翻<span class="speical_color">{{
            flip_button.flip_left_times
          }}</span
          >张
        </div>
        <!-- 一键按钮、领取积分 -->
        <div
          class="FlipBtn"
          :class="{ getPoint: flip_button.flip_status === 2 }"
          @click="allFlip"
        >
          <p class="flex_across" v-if="flip_button.flip_status === 1">
            消耗：<img :src="IconPath('mk5_5.png')" alt="" />x{{
              flip_button.flip_need_tickets
            }}
          </p>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>
            玩家购买礼包可获得10个绿晶石和一张翻牌门票，<i class="speical_color"
              >翻牌门票用于轮次开启</i
            >
          </li>
          <li>
            <span></span>
            <i class="speical_color">每天首次购买礼包免费</i
            >，非首次需花费99钻石购买
          </li>
          <li>
            <span></span>
            每次翻牌消耗1翻牌币，可翻出不同倍数的积分，<i class="speical_color"
              >6次翻牌后</i
            >可领取本轮次获得的积分
          </li>
          <li><span></span>消费300钻石自动发放1个翻牌币</li>
          <li><span></span>求婚时选择规模和信物的消费不计算在内</li>
        </ul>
      </div>
    </themeBox>
    <!-- 兑换奖励模块 -->
    <themeBox class="ExchargeGift" :themeTitleImg="'title_4.png'">
      <div class="normalList">
        <!-- 我的积分 -->
        <div class="ExchargeGift_my_present flex_across">
          我的积分
          <img :src="IconPath('mk5_10.png')" alt="" />
          ：
          <span class="ExchargeGift_my_present_num">
            {{ pageData.flip_credit }}
          </span>
        </div>
        <!-- 奖励兑换 -->
        <div class="ExchargeGift_list">
          <!-- 每一项 -->
          <ExchargeGiftItem
            :isOutBtn="true"
            v-for="gift in normalGift"
            :key="gift.id"
            :giftData="gift"
            @openExchargeGiftDialog="openExchargeGiftDialog"
          />
        </div>
        <!-- 消耗300积分解锁 标题 -->
        <div class="Consum300_Title flex_across">
          <img :src="IconPath('mk5_17.png')" alt="" />消耗300积分解锁
          <span class="speical_color">
            （{{
              pageData.credit_spend > 300 ? 300 : pageData.credit_spend
            }}/300）
          </span>
          <img :src="IconPath('mk5_17_1.png')" alt="" />
        </div>
      </div>
      <!-- 消耗300积分奖励列表 -->
      <div class="Consum300_GiftList">
        <!-- 每一项 -->
        <ExchargeGiftItem
          :isOutBtn="false"
          :giftData="gift"
          :credit_spend="pageData.credit_spend"
          v-for="gift in specialGift"
          :key="gift.id"
          @openExchargeGiftDialog="openExchargeGiftDialog"
        />
      </div>
      <!-- 说明文本 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>玩家获得的积分可用于兑换道具、装扮、礼物赠送 权等奖励
          </li>
          <li><span></span>积分将在活动结束后清零，请及时使用</li>
        </ul>
      </div>
    </themeBox>
    <!-- 弹框 -->
    <ThemeDialog
      :isShow="showDialog"
      :dialogMark="dialogType"
      :titleIconObj="titleIconObj"
      :isSmall="dialogType.includes('congratsGet')"
      @closeDialog="showDialog = false"
    >
      <!-- 恭喜获得弹框 -->
      <div class="CongratulateBox" v-if="dialogType.includes('congratsGet')">
        <DialogCongrats
          :isMultiple="dialogType === 'congratsGet_buyGift'"
          :awardData="dialogData"
          :btnText="ButtonText(dialogCongrats_btnTexts, dialogData.type)"
          :awardName="congratsGet_goodsName"
          @onCongratsBtn="onCongratsBtn"
        >
          <PublicJson
            :lottieJson_name="'sb_tsqs'"
            :lottieJson="sb_tsqs"
            :userAvatar="$store.getters.user_icon"
          />
        </DialogCongrats>
      </div>
      <!-- 兑换奖励 -->
      <div class="ExchargeGift_Box" v-if="dialogType === 'exchargeGift'">
        <p class="my_present flex_across">
          剩余积分
          <img
            class="my_present_nums_box"
            :src="IconPath('mk5_10.png')"
            alt=""
          />
          ：{{ pageData.flip_credit }}
        </p>
        <div class="theme_item img-box">
          <img v-if="dialogData.icon" :src="IconPath(dialogData.icon)" alt="" />
          <div v-else class="ExchargeGift_Dialog_Lottie">
            <PublicJson
              :lottieJson_name="'sb_tsqs'"
              :lottieJson="sb_tsqs"
              :userAvatar="$store.getters.user_icon"
            />
          </div>
        </div>
        <p class="goods_name flex_across">
          {{ exchargeGift_goodsName }}
        </p>
        <!-- 计数器盒子 -->
        <dialogCounter
          :goods_detail="dialogData"
          :my_goods="+pageData.flip_credit"
          :showCounter="dialogData.type !== 'pretty_card'"
          :showSpecialBilling="dialogData.type === 'pretty_card'"
          :showSpecialBillingButton="dialogData.type === 'pretty_card'"
          :showBilling="dialogData.type !== 'pretty_card'"
          CounterIcon="mk5_10.png"
          @dialogExcharge="onExchargeGiftBtn"
          :inputNum.sync="inputNum"
        />
      </div>
      <!-- 翻牌概率 -->
      <div class="LotteryOdds_Box" v-if="dialogType === 'lotteryOdds'">
        <img :src="IconPath('tk_2.png')" alt="" />
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
// 节流函数
import { throttle } from '../../utils/tool'
// 计数器组件
import DialogCounter from '../../components/Dialog/DialogCounter'
// 恭喜获得组件
import DialogCongrats from '../../components/Dialog/DialogCongrats'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 翻牌子组件
import FlipItem from './components/FlipItem'
// 兑换奖励子组件
import ExchargeGiftItem from './components/ExchargeGiftItem'
// 默认数据
import { filpGame } from '../../utils/pageData'
// 立即装扮请求
import { nowEquip, getPageData } from '../../api/index'
// 钻石不足底部弹框
import { rechargeDialog } from '../../utils/toApp'
// json组件
import PublicJson from '../../components/PublicJson'
// 碳酸汽水声波
import sb_tsqs from '../../assets/lottie/sb_tsqs/data.json'
export default {
  name: 'FilpGame',
  components: {
    FlipItem,
    ThemeDialog,
    DialogCounter,
    DialogCongrats,
    ExchargeGiftItem,
    PublicJson
  },
  data() {
    return {
      sb_tsqs,
      // 门票礼包奖励列表
      FlipGiftList: [
        {
          icon: 'ljs_120_120.png',
          name: '绿晶石+10'
        },
        {
          icon: 'mp_120_120.png',
          name: '翻牌门票+1'
        }
      ],
      // 恭喜获得按钮文本对象
      dialogCongrats_btnTexts: {
        costume: '立即装扮',
        voice: '立即装扮'
      },
      // 弹框标题图片对象
      titleIconObj: {
        exchargeGift: 'title_4.png',
        congratsGet_buyGift: 'title_5.png',
        congratsGet_exchargeGift: 'title_6.png',
        lotteryOdds: 'title_8.png'
      },
      // 弹框标识
      dialogType: '',
      // 弹框数据
      dialogData: {},
      // 弹框显示标识
      showDialog: false,
      // 弹框计数器
      inputNum: 1,
      // 翻牌节流
      flipThrottle: false
    }
  },
  computed: {
    // 恭喜获得弹框奖励名称
    congratsGet_goodsName() {
      const { type, text, nums } = this.dialogData
      return type == 'pretty_card'
        ? `靓号券+${nums}`
        : type === 'pst_privilege'
        ? `礼物赠送权+${nums}天`
        : text
    },
    // 兑换好礼弹框内奖励名称
    exchargeGift_goodsName() {
      const { type, name, text } = this.dialogData
      return type === 'pretty_card'
        ? '3-7张靓号券'
        : type === 'pst_privilege'
        ? '礼物赠送权' + text
        : name + text
    },
    // 直接开启的奖励列表
    normalGift() {
      return this.pageData.exchange_list.slice(0, 4)
    },
    // 需要300解锁的奖励列表
    specialGift() {
      return this.pageData.exchange_list.slice(4)
    },
    // 一键翻牌按钮状态
    flip_button() {
      return this.pageData.flip_button
    },
    // 翻牌列表
    flip_list() {
      return this.pageData.flip_list
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = filpGame
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm5' })
  },
  methods: {
    // 打开积分概率弹框
    openLotteryOdds() {
      this.dialogType = 'lotteryOdds'
      this.showDialog = true
    },
    // 打开兑换好礼弹框（节流）
    openExchargeGiftDialog: throttle(function (giftData) {
      // 如果是300积分解锁的奖励，判断是否解锁
      if (giftData.locker && this.pageData.credit_spend < giftData.locker) {
        return
      }
      // 至少能兑换一次
      if (+this.pageData.flip_credit >= +giftData.price) {
        this.dialogData = giftData
        this.dialogType = 'exchargeGift'
        this.showDialog = true
      } else {
        this.$toast('积分不足')
      }
    }, 1000),
    // 兑换好礼弹框按钮
    async onExchargeGiftBtn() {
      const { id, max_times } = this.dialogData
      // 兑换请求
      const res = await this.exchargeGiftApi({
        'mark[id]': id,
        'mark[nums]': this.inputNum
      })
      // 请求错误 toast提示
      if (res.errno) return this.$toast(res.errmsg)
      // 更新积分
      this.pageData.flip_credit = res.data.flip_credit
      // 如果次数有限制，更新次数
      if (max_times) {
        // 根据Id找到对应的奖励信息
        const awardInfo = this.pageData.exchange_list.find(
          (item) => item.id == id
        )
        // 更新兑换次数
        awardInfo.exchange_times = res.data.exchange_times
        // 更新按钮状态
        awardInfo.has_right =
          awardInfo.exchange_times == awardInfo.max_times ? 2 : 1
      }
      this.pageData.credit_spend = res.data.credit_spend
      // 更新弹框数据
      this.dialogData = res.data.award
      // 兑换好礼-恭喜获得弹框
      this.dialogType = 'congratsGet_exchargeGift'
    },
    // 恭喜获得弹框按钮
    async onCongratsBtn() {
      // 如果是头饰和主页特效就发送装扮请求
      const { type, tool_id } = this.dialogData
      const EquipArr = ['voice', 'costume']
      if (EquipArr.includes(type)) {
        this.$toast(
          (
            await this.nowEquipApi({
              type,
              id: tool_id
            })
          ).errmsg
        )
      }
      this.showDialog = false
    },
    // 购买礼包（节流）
    buyGift: throttle(async function () {
      // 判断是每日首次免费还是消耗钻石
      const lotteryMark = this.pageData.free_used ? 2 : 1
      const res = await this.buyGiftApi(lotteryMark)
      // 钻石不足
      if (res.errno == 3) return rechargeDialog(99)
      // 购买失败
      if (res.errno) return this.$toast(res.errmsg)
      // 购买成功
      if (lotteryMark === 1) {
        // 如果是每日首次免费就更新礼包每日免费状态
        this.pageData.free_used = true
      } else {
        // 如果是消耗钻石购买，就重新拉取数据更新钻石数量和翻牌币数量
        await this.getPageData({ type: 'tab', mark: 'm5' })
      }
      this.dialogData = res.data.award
      this.dialogType = 'congratsGet_buyGift'
      this.showDialog = true
    }, 1000),
    // 用于更新翻牌数据
    async updateFlipData(data) {
      const { award } = data
      await this.getPageData({ type: 'tab', mark: 'm5' })
      for (const key in award) {
        // 调用翻牌组件的翻牌方法
        this.$refs[`FlipItem_${key}`][0].onFlip()
      }
    },
    // 手动翻牌（节流）
    handleFlip: throttle(async function (mark) {
      if (this.flipThrottle) return
      this.flipThrottle = true
      // 发送手动翻牌请求
      const res = await this.FlipApi(mark)
      if (res.errno) {
        this.flipThrottle = false
        return this.$toast(res.errmsg)
      }
      // 更新数据
      this.updateFlipData(res.data)
    }, 1000),
    // 一键翻牌按钮和领取积分按钮（节流）
    allFlip: throttle(async function () {
      // 根据按钮状态判断是翻牌还是领取积分
      if (this.flip_button.flip_status == 1) {
        if (this.flipThrottle) return
        this.flipThrottle = true
        const res = await this.FlipApi(99)
        // 翻牌请求失败
        if (res.errno) {
          this.flipThrottle = false
          return this.$toast(res.errmsg)
        }
        // 更新数据
        this.updateFlipData(res.data)
      } else {
        await this.getPoint()
        this.flipThrottle = false
      }
    }, 1000),
    // 领取积分
    async getPoint() {
      const res = await this.getPointApi()
      this.$toast(res.errmsg)
      if (res.errno) return
      // 更新数据
      await this.getPageData({ type: 'tab', mark: 'm5' })
      this.flip_list.forEach((item) => {
        // 重置翻牌状态，调用翻牌组件的移除翻牌样式
        this.$refs[`FlipItem_${item.index}`][0].offFlip()
      })
    },
    // 退出弹框后执行的事件
    closeDialog() {
      this.dialogType = ''
      this.inputNum = 1
      this.dialogData = {}
    },
    // 领取积分请求
    async getPointApi() {
      return await getPageData({
        type: 'flip_game_rev_credit'
      })
    },
    // 翻牌请求
    async FlipApi(mark) {
      return await getPageData({
        type: 'flip_game_flip',
        mark
      })
    },
    // 购买礼包请求
    async buyGiftApi(mark) {
      return await getPageData({
        type: 'flip_game_buy_ticke',
        mark
      })
    },
    // 恭喜获得弹框内兑换请求
    async exchargeGiftApi(data) {
      return await getPageData({
        type: 'flip_game_exchange',
        ...data
      })
    },
    // 领取并装扮请求
    async nowEquipApi(data) {
      return await nowEquip(data)
    }
  }
}
</script>

<style scoped lang="scss">
.FilpGame {
  // 弹框样式
  .van-dialog {
    .van-dialog__content {
      .PublicJson {
        ::v-deep .micAvatar_img {
          top: 7px;
          left: 9px;
          width: 47px;
          height: 47px;
        }
      }
      .DialogCongrats {
        .PublicJson {
          ::v-deep .micAvatar_img {
            top: 9px;
            width: 43px;
            height: 43px;
          }
        }
      }
      .ExchargeGift_Box {
        margin-top: 14px;
        > .img-box {
          width: 70px;
          height: 66px;
          margin: 10px auto 5px;
          border-radius: 6px;
          overflow: hidden;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: #fefaef;
            border-radius: 5px;
          }
        }
        .ExchargeGift_Dialog_Lottie {
          width: 100%;
          height: 100%;
          background: #fefaef;
        }
        .goods_name {
          color: #ffffff;
          font-size: 14px;
        }
        > .my_present {
          margin: 8px 0;
          font-size: 16px;
          color: #ffffff;
          > img {
            margin: 0 2px;
            height: 20px;
          }
        }
        .dialogCounter {
          ::v-deep .billing {
            .button {
              color: #a9792c;
              background: linear-gradient(0deg, #fff9d1, #ffffff);
            }
          }
        }
        // 弹框下方按钮
        .buttons-box {
          display: flex;
          justify-content: space-evenly;
          margin: 15px 10px 20px;
          .left-button,
          .right-button {
            width: 122px;
            padding: 0 10px;
            height: 44px;
            border: 1px solid #ffffff;
            border-radius: 21px;

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
                width: 15px;
                margin: 0 2px;
              }
            }
            p:nth-child(2) {
              font-size: 12px;
            }
          }
          .left-button {
            p {
              color: #a22709;
            }
            background: #fefaef;
          }
        }
      }
      .LotteryOdds_Box {
        margin: 16px auto 25px;
        // width: 100%;
        width: 280px;
        height: 210px;
        > img {
          width: 100%;
          // height: 100%;
        }
      }
    }
  }
  // 翻牌模块
  .Flip {
    ::v-deep .white_border {
      background: linear-gradient(0deg, #5193df, #b3e9f7, #eaf6ff);
    }
    // 购买礼包
    .FlipGift {
      margin: 10px auto 0;
      width: 341px;
      height: 136px;
      background: #fff;
      border-radius: 12px;
      padding: 2px;
      background: linear-gradient(90deg, #16b09e, #5ca0ec);
      .FlipGift_white_border {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #fff, #5ca0ec);
        padding: 1px;
        border-radius: 10px;
        .FlipGift_main {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #16b09e, #5ca0ec);
          border-radius: 9px;
          display: flex;
          padding: 17px 0 0 15px;
          .Gift_item {
            width: 81px;
            height: 96px;
            background: #5cc177;
            border: 3px solid #91d6d6;
            padding: 1px;
            border-radius: 12px;
            margin-right: 12px;
            display: flex;
            flex-direction: column;
            .Gift_item_icon {
              flex: 1;
              border-radius: 8px 8px 0 0;
              background: #d6fffe;
              > img {
                width: 90%;
              }
            }
            .Gift_item_name {
              height: 18px;
              font-size: 12px;
              color: #fff;
            }
          }
          .buyGiftBtn {
            margin-top: 20px;
            width: 137px;
            height: 72px;
            > img {
              width: 100%;
            }
          }
          .freeIcon {
            position: absolute;
            right: 13px;
            top: 8px;
            width: 120px;
            > img {
              width: 100%;
            }
          }
        }
      }
    }
    // 用拥有翻牌币和已消费
    .UserInfo {
      // width: 100%;
      justify-content: space-between;
      font-size: 14px;
      color: #fff;
      margin: 17px 11px 0;
      .has_flip_ticket,
      .customeNum {
        height: 24px;
        border-radius: 12px;
        background: #3e81cf;
        padding: 0 10px;
      }
      // 拥有翻牌币
      .has_flip_ticket {
        max-width: 135px;
        > img {
          margin: 1px 2px 0;
          height: 19px;
        }
        > span {
          max-width: 33px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      // 已消费
      .customeNum {
        margin-right: 40px;
        max-width: 140px;
        > img {
          margin: 1px 2px 0;
          height: 13px;
        }
        > span {
          max-width: 41px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    // 概率弹框
    .LotteryOddsIcon {
      position: absolute;
      top: 169px;
      right: 18px;
      > img {
        width: 24px;
      }
    }
    // 翻牌列表
    .FlipMain {
      margin-top: 20px;
      // margin-bottom: 15px;
      width: 100%;
      // height: 475px;
      .FlipList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .FlipItem {
          margin-bottom: 5px;
        }
      }
      // 本轮还能翻几张
      .FlipNum {
        margin: 5px 0 5px;
        color: #fff;
        font-size: 14px;
      }
      // 一键按钮、领取积分
      .FlipBtn {
        margin: 0px auto 0;
        width: 187px;
        height: 72px;
        overflow: hidden;
        background: url('../../assets/mk5_8.png') no-repeat top center/100% auto;
        > p {
          font-size: 12px;
          color: #fff;
          margin-top: 38px;
          > img {
            width: 19px;
          }
        }
      }
      .getPoint {
        background: url('../../assets/mk5_8_1.png') no-repeat top center/100%
          auto;
      }
    }
    .ThemeBox_BottomText {
      margin-bottom: 10px;
    }
  }
  // 兑换奖励模块
  .ExchargeGift {
    .normalList {
      height: 265px;
      background: linear-gradient(0deg, #64abe6, #83d5f3);
      .ExchargeGift_my_present {
        width: 150px;
        height: 24px;
        background: #3e81cf;
        border-radius: 12px;
        font-size: 14px;
        color: #ffffff;
        margin: 30px auto 0;
        > img {
          margin: 0 2px;
          height: 16px;
        }
        span {
          max-width: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .ExchargeGift_list {
        display: flex;
        justify-content: space-evenly;
        .ExchargeGiftItem {
          ::v-deep .award_info {
            height: 115px;
            padding-top: 5px;
          }
        }
      }
      .Consum300_Title {
        margin: 15px auto 0;
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;
        > .speical_color {
          font-size: 14px;
        }
        > img {
          width: 33px;
          &:first-child {
            margin-right: 5px;
          }
          &:last-child {
            margin-left: -2px;
          }
        }
      }
      .speical_color {
        margin-left: -5px;
      }
    }
    .Consum300_GiftList {
      width: 348px;
      height: 185px;
      background: #d0f1f7;
      display: flex;
      justify-content: space-evenly;
      .ExchargeGiftItem {
        ::v-deep .award_info {
          padding-top: 15px;
          width: 105px;
          height: 165px;
          background: #d6fffe;
          border-radius: 12px;
          margin-top: 10px;
        }
        ::v-deep .bottom_btn {
          margin-top: 2px !important;
        }
        ::v-deep .award_badge {
          min-width: 24px;
          top: 5px;
          right: 3.5px;
        }
      }
    }
  }
  .ThemeBox_BottomText {
    margin: 8px 0 5px;
  }
}
</style>
