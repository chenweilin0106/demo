<template>
  <div class="FunFair">
    <!-- 暖冬商店 -->
    <ThemeBox
      class="warmWinterStore_box"
      themeTitleImg="mk1_1.png"
      themeTitleImg2="title_6.png"
    >
      <div class="rightOfGift">
        <div class="icon">
          <img
            v-if="pageData.lamp_status.has_right == 0"
            src="../../assets/mk5_1.png"
            alt=""
          />
          <img
            v-if="pageData.lamp_status.has_right == 1"
            src="../../assets/mk5_2.png"
            alt=""
          />
        </div>
        <div class="bubble">
          每日购买任意礼盒可领取【花灯】<br />礼物赠送权+1天<i
            >（{{ pageData.lamp_status.finish_nums }}/{{
              pageData.lamp_status.max
            }}）</i
          >
        </div>
      </div>
      <div
        class="gift_box"
        v-for="(item, index) in pageData.gifts_list"
        :key="index"
      >
        <div class="gift_box_name">
          <img v-show="index == 0" src="../../assets/mk5_5.png" alt="" />
          <img v-show="index == 1" src="../../assets/mk5_6.png" alt="" />
          <img v-show="index == 2" src="../../assets/mk5_7.png" alt="" />
        </div>
        <div class="goods_list">
          <div
            class="goods_item"
            v-for="(item1, index1) in item.list"
            :key="index1"
          >
            <div class="awards">
              <div class="discount" v-if="item1.discount != '腊八特典'">
                <span>{{ item1.discount }}折</span>
              </div>
              <div class="discount dis_spec" v-else><span>腊八特典</span></div>
              <div class="award_item" v-for="(it, i) in item1.awards" :key="i">
                <div class="award">
                  <div class="price" v-if="it.id == 2">
                    99<img src="../../assets/zs_38_28.png" alt="" />
                  </div>
                  <div class="price" v-if="it.id == 13">
                    1314<img src="../../assets/zs_38_28.png" alt="" />
                  </div>
                  <PublicSvga
                    v-if="!it.icon"
                    class="lottie lottiets"
                    svgaName="ts_txxm"
                    :userAvatar="$store.getters.user_icon"
                  />
                  <img v-else :src="IconPath(it.icon)" alt="" />
                </div>
                <div class="nums">{{ it.text }}</div>
              </div>
            </div>
            <div class="original_price">
              <div class="line"></div>
              原价：{{ item1.org_price }}钻
            </div>
            <div
              class="buy_btn"
              v-if="item1.has_right == 1"
              @click="buygift(item1, item.name)"
            >
              {{ item1.price
              }}<img src="../../assets/zs_38_28.png" alt="" />购买
            </div>
            <div class="btn_none" v-if="item1.has_right == 2">今日已售空</div>
            <div class="buy_limit">
              每日限购：{{ item1.exchange_times }}/{{ item1.max_times }}
            </div>
          </div>
        </div>
      </div>
    </ThemeBox>
    <!-- 雪人馈赠 -->
    <ThemeBox
      class="snowman_gift_box"
      themeTitleImg="mk1_1.png"
      themeTitleImg2="title_7.png"
      :isresst="true"
    >
      <div class="tit">累计购买暖冬礼盒可获取雪人的馈赠</div>
      <div class="accumulate_list">
        <div class="icon_list">
          <div
            class="icon_item"
            v-for="(item, index) in pageData.snow_awards"
            :key="index"
          >
            <img :src="IconPath(item.icon)" alt="" />
            <div class="nums">{{ item.text }}</div>
            <div class="light" v-if="item.has_right == 1"></div>
            <div class="red_point" v-if="item.has_right == 1"></div>
            <div class="has_get" v-if="item.has_right == 2"></div>
          </div>
        </div>
        <div class="schedule_line">
          <div class="has_arrive"></div>
          <div class="dot_list">
            <div
              class="dot"
              :class="{ white_dot: item.has_right != 0 }"
              v-for="(item, index) in pageData.snow_awards"
              :key="index"
            >
              <div class="tit">购买{{ item.need }}个</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span
            >玩家购买任意暖冬礼盒达到指定次数可领取不同数量的小雪人<img
              src="../../assets/xxr_76_83.png"
              alt=""
            />、晶石、元宝等奖励，小雪人<img
              src="../../assets/xxr_76_83.png"
              alt=""
            />可用于兑换奖励
          </li>
        </ul>
      </div>
    </ThemeBox>
    <!-- 兑换道具 -->
    <ThemeBox
      class="exchange_gift_box"
      themeTitleImg="mk1_1.png"
      themeTitleImg2="title_8.png"
    >
      <div class="my_info">
        我的小雪人<img src="../../assets/xxr_76_83.png" alt="" />：{{
          pageData.snow_nums
        }}
      </div>
      <div class="prop_list">
        <div
          class="prop_item"
          v-for="(item, index) in pageData.exchange_list"
          :key="index"
          :class="{
            blue_bg: index == 2 || index == 3,
            syan_bg: index == 4,
            red_bg: index == 5
          }"
        >
          <div class="icon">
            <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
            <PublicSvga
              v-if="item.type == 'mic'"
              class="lottie lottiets"
              svgaName="ts_txxm"
              :userAvatar="$store.getters.user_icon"
            />
            <public-json v-if="item.type == 'voice'" jsonName="ch_zfz1" />
          </div>
          <div class="prop_name">{{ item.text }}</div>
          <div class="limit" v-if="!item.max">不限次数</div>
          <div class="limit" v-else>
            ({{ item.finish_times }}/{{ item.max }})
          </div>
          <div
            class="prop_btn"
            v-if="item.has_right == 1"
            @click="exchangeGoods(item)"
          >
            <img src="../../assets/xxr_76_83.png" alt="" /><i>{{ item.need }}</i
            >&nbsp;&nbsp;兑换
          </div>
          <div class="prop_btn gray" v-else>已兑完</div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>玩家获得的小雪人<img
              src="../../assets/xxr_76_83.png"
              alt=""
            />可用于兑换道具、装扮等奖励
          </li>
          <li>
            <span></span>小雪人<img
              src="../../assets/xxr_76_83.png"
              alt=""
            />在活动结束后清零，请及时使用
          </li>
        </ul>
      </div>
    </ThemeBox>
    <!-- 确认花费弹窗 -->
    <recognizedExpense
      class="dialog"
      :isShow="isshow"
      :currentPrice="currentPrice"
      :currentBoxName="currentBoxName"
      @onClose="isshow = false"
      @sureBuy="sureBuy"
    ></recognizedExpense>
    <!-- 兑换好礼弹框 -->
    <ThemeDialog
      :isShow="showDialog"
      dialogMark="exchargeGift"
      :titleIconObj="{ exchargeGift: 'title_14.png' }"
      :dialogData="dialogData"
      @closeDialog="
        showDialog = false
        closeDialog()
      "
    >
      <!-- 剩余道具 -->
      <p class="remainingPoint flex_across">
        剩余{{ pointName
        }}<img class="my_present_nums_box" :src="IconPath(pointIcon)" /> ：{{
          pageData.my_goods
        }}
      </p>
      <!-- 道具图标展示 -->
      <div
        class="theme_item img-box"
        :class="{ tk_title_img_box: dialogData.type === 'title' }"
      >
        <!-- <div class="iconBox flex_across" v-if="dialogData.goods_icon_t">
          <img :src="require('../../assets/' + dialogData.goods_icon_t)" />
        </div> -->
        <div class="iconBox flex_across">
          <!-- <img :src="require('../../assets/' + dialogData.goods_icon_t)" /> -->
          <img src="../../assets/ljs_120_120.png" alt="" />
        </div>
        <!-- <div v-else class="pointReward_tk_lottie">
          <PublicJson
            v-if="dialogData.goods_type === 'title'"
            class="title_animation"
            jsonName="ch_lmcd"
          />
          <PublicSvga
            v-else
            class="mic_animation"
            svgaName="ts_hql"
            :userAvatar="$store.getters.user_icon"
          />
        </div> -->
      </div>
      <!-- 道具名称 -->
      <p class="goods_name flex_across">
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
    <!-- 满背包 -->
    <bagFull :isShow="isfull" @onClose="isfull = false">
      <!-- 符石背包已达上线 -->
      <DialogBag
        v-if="title == '符石背包已达上限'"
        :type="fullbagType"
        @cancel="isfull = false"
        @skiptostone="skiptostone"
        @skiptoskill="skiptoskill"
      >
      </DialogBag>
    </bagFull>
    <congratsGetPrompt :list="list" ref="congrat">
      <template #default="{ data }">
        <PublicSvga
          v-if="!data.icon"
          class="lottie"
          svgaName="ts_txxm"
          :userAvatar="$store.getters.user_icon"
        />
      </template>
    </congratsGetPrompt>
  </div>
</template>

<script>
import PublicSvga from '../../components/PublicSvga.vue'
import PublicJson from '../../components/PublicJson.vue'
import recognizedExpense from './components/recognizedExpense.vue'
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 弹框计数器组件
import DialogCounter from '../../components/Dialog/DialogCounter'
// 数据请求
import { getPageData } from '../../api/index'
import bagFull from './components/bagFull.vue'
import DialogBag from '../../components/Dialog/DialogBag.vue'
import qs from 'qs'
import congratsGetPrompt from '../../components/congrats-get-prompt.vue'
import { funfair } from '../../utils/pageData'
export default {
  name: 'FunFair',
  components: {
    PublicSvga,
    PublicJson,
    recognizedExpense,
    ThemeDialog,
    DialogCounter,
    bagFull,
    DialogBag,
    congratsGetPrompt
  },
  data() {
    return {
      isshow: false,
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'xxr_76_83.png',
      // 道具名称
      pointName: '小雪人',
      // 弹框样式标识
      dialogType: '',
      // 弹框显示隐藏
      showDialog: false,
      // 弹框数据
      dialogData: {},
      fullbagType: 1,
      title: '符石背包已达上限',
      isfull: false,
      list: [
        {
          icon: '',
          text: '绿晶石',
          type: 'title'
        }
      ],
      pageData: {},
      currentPrice: 288,
      currentBoxName: '晶石礼盒'
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = funfair
    this.init()
    console.log(this.pageData, 111)
    this.$store.commit('user/getUserIcon', this.pageData.user_icon)
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
  methods: {
    exchangeGoods(item) {
      console.log(item)
      this.dialogData = item
      this.settlement['mark[id]'] = this.dialogData.type
      this.showDialog = true
    },
    buygift(item, name) {
      this.currentPrice = item.price
      this.currentBoxName = name
      // 弹出确认弹窗
      if (window.localStorage.getItem(new Date().toLocaleDateString()) != 1) {
        this.isshow = true
      }
    },
    async init() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm5'
      })
      res.errno == 0 ? (this.pageData = res.data) : this.$toast(res.errmsg)
      return res
    },
    disposalBackpack(i) {
      const parmas = qs.parse(window.location.search.substring(1))
      const { appVersion, app_version } = parmas
      if (appVersion && appVersion.split('.').join('').slice(0, 3) < 578) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      if (app_version && app_version.split('.').join('').slice(0, 3) < 578) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      if (i == 1) {
        this.fullbagType = 1
        this.title = '符石背包已达上限'
        this.isfull = true
      }
      if (i == 2) {
        this.fullbagType = 2
        this.title = '符石背包已达上限'
        this.isfull = true
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
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchargeClick(type) {
      await this.clickBottomButton(type)
      this.showDialog = true
      this.settlement['mark[id]'] = this.dialogData.type
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
    },

    getwidth(value) {
      let width = 0
      if (value <= 1000) {
        width = 0
      } else if (value > 1000 && value < 3000) {
        width = 0 + ((value - 1000) / 2000) * 50
      } else if (value >= 3000 && value < 10000) {
        width = 50 + ((value - 3000) / 7000) * 50
      } else if (value >= 10000) {
        width = 100
      }
      return width + '%'
    },
    sureBuy() {
      console.log('购买')
      // 发购买请求，弹出恭喜获得弹窗
      this.$refs.congrat.showPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.FunFair {
  margin-top: 94px;

  .warmWinterStore_box {
    .rightOfGift {
      display: flex;
      align-items: center;
      margin-top: 37px;
      .icon {
        width: 166px;
        height: 166px;
        margin-left: 26px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .bubble {
        width: 488px;
        height: 99px;
        background-image: url('../../assets/mk5_3.png');
        background-size: 100% 100%;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
        padding-top: 13px;
        padding-left: 56px;
        i {
          color: #f7f26a;
        }
      }
    }
    .gift_box {
      width: 708px;
      height: 464px;
      background-image: url('../../assets/mk5_4.png');
      background-size: 100% 100%;
      margin-bottom: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .gift_box_name {
        margin-top: 70px;
        width: 156px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods_list {
        margin-top: 37px;
        display: flex;
        justify-content: space-between;
        width: 629px;
        .goods_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .awards {
            width: 305px;
            height: 157px;
            flex-shrink: 0;
            background-image: url('../../assets/mk5_8.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            padding: 0 7px;
            position: relative;
            .discount {
              position: absolute;
              width: 94px;
              height: 64px;
              background-image: url('../../assets/mk5_9.png');
              background-size: 100% 100%;
              z-index: 99;
              top: 0;
              right: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #af2a06;
                transform: rotate(33deg);
                margin-top: -16px;
                margin-left: 26px;
                white-space: nowrap;
              }
            }
            .dis_spec {
              span {
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #af2a06;
                transform: rotate(33deg);
                margin-top: -10px;
                margin-left: 24px;
                white-space: nowrap;
              }
            }
            .award_item {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 91px;
              .award {
                width: 91px;
                height: 91px;
                background: rgba($color: #501938, $alpha: 0.8);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .price {
                  position: absolute;
                  top: -12px;
                  right: -8px;
                  height: 30px;
                  background: #f06579;
                  border-radius: 15px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 20px;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: #ffffff;
                  padding-left: 10px;
                  padding-right: 6px;
                  z-index: 99;
                  > img {
                    width: 27px;
                    height: 20px;
                  }
                }
                > img {
                  width: 100%;
                  height: 100%;
                }
                .lottie {
                  width: 90%;
                  height: 90%;
                }
                .lottiets {
                  overflow: hidden;
                  width: 90%;
                  height: 90%;

                  ::v-deep .micAvatar_img {
                    width: 82%;
                    height: 82%;
                  }
                }
              }
              .nums {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ffffff;
                line-height: 26px;
                white-space: nowrap;
                margin-top: 10px;
              }
            }
          }
          .original_price {
            margin-top: 15px;
            width: 148px;
            height: 23px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 26px;
            white-space: nowrap;
            position: relative;
            .line {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 196px;
              height: 2px;
              background: #ffe467;
            }
          }
          .buy_btn {
            margin-top: 10px;
            width: 180px;
            height: 52px;
            background: linear-gradient(0deg, #fff2bb, #ffffff);
            border: 3px solid #ffffff;
            border-radius: 26px;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ae5e17;
            display: flex;
            align-items: center;
            justify-content: center;
            > img {
              width: 38px;
              height: 28px;
            }
          }
          .btn_none {
            margin-top: 8px;
            width: 180px;
            height: 52px;
            background: linear-gradient(0deg, #9d9d9d, #d4d4d4);
            border: 2px solid #ffffff;
            border-radius: 26px;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          }
          .buy_limit {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #d1c4ff;
            line-height: 26px;
            margin-top: 8px;
          }
        }
      }
    }
    .gift_box:last-child {
      margin-bottom: 79px;
    }
  }
  .snowman_gift_box {
    ::v-deep .ThemeBox_main {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 9;
    }

    .tit {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fefefe;
      margin-top: 76px;
      white-space: nowrap;
    }
    .accumulate_list {
      margin-top: 22px;
      width: 100%;
      height: 281px;
      background: #8a6dd7;
      margin-bottom: 22px;
      overflow: visible;
      overflow-x: scroll;
      .icon_list {
        margin-top: 22px;
        width: fit-content;
        display: flex;
        align-items: center;
        padding: 0 34px;
        justify-content: space-between;

        position: relative;
        .icon_item {
          width: 128px;
          height: 143px;
          background-image: url('../../assets/mk5_12.png');
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
          margin-left: 40px;
          > img {
            height: 67%;
            margin-top: -36px;
          }
          .nums {
            position: absolute;
            bottom: 24px;
            height: 17px;
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #4b2a8c;
          }
          .light {
            position: absolute;
            width: 144px;
            height: 157px;
            background-image: url('../../assets/mk5_11.png');
            background-size: 100% 100%;
            flex-shrink: 0;
          }
          .red_point {
            width: 16px;
            height: 16px;
            background: #e22a2a;
            border-radius: 50%;
            position: absolute;
            top: 14px;
            right: 19px;
          }
          .has_get {
            width: 120px;
            height: 121px;
            background-image: url('../../assets/mk5_10.png');
            background-size: 100% 100%;
            position: absolute;
            top: 3px;
          }
        }
        .icon_item:first-child {
          margin-left: 0;
        }
      }
      .schedule_line {
        width: fit-content;
        height: 14px;
        background: #3e266e;
        border: 4px solid #713fbb;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-left: 93px;
        margin-right: 99px;
        margin-top: 23px;
        box-sizing: content-box;

        .has_arrive {
          position: absolute;
          width: 0%;
          height: 14px;
          background: #dddbff;
        }
        .dot_list {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          .dot {
            flex-shrink: 0;
            margin-left: 128px;
            width: 40px;
            height: 40px;
            background: #8754d3;
            border: 4px solid #713fbb;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            .tit {
              position: absolute;
              bottom: -44px;
              white-space: nowrap;
            }
          }
          .dot:first-child {
            margin-left: -20px;
          }
          .dot:last-child {
            margin-left: 104px;
            transform: translateX(24px);
          }
          .white_dot {
            width: 40px;
            height: 40px;
            background: #dddbff;
            border-radius: 50%;
            border: none;
          }
        }
      }
    }
    .ThemeBox_BottomText {
      margin-bottom: 37px;
    }
  }
  .exchange_gift_box {
    ::v-deep .ThemeBox_main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .my_info {
      margin-top: 69px;
      height: 48px;
      background: #673c9b;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      padding-left: 45px;
      padding-right: 46px;
      > img {
        width: 43px;
        height: 47px;
      }
    }
    .prop_list {
      margin-top: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .prop_item {
        width: 200px;
        height: 315px;
        background: linear-gradient(0deg, #9f91eb, #c4a1e4);
        border: 3px solid #d9bfff;
        border-radius: 20px;
        margin-left: 20px;
        margin-bottom: 18px;
        align-content: flex-start;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          margin-top: 20px;
          width: 130px;
          height: 130px;
          background: #ffffff;
          border: 4px solid #997fe5;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
            height: 100%;
          }
          .lottiets {
            overflow: hidden;
            width: 90%;
            height: 90%;

            ::v-deep .micAvatar_img {
              width: 78%;
              height: 78%;
            }
          }
        }
        .prop_name {
          margin-top: 20px;
          height: 24px;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          white-space: nowrap;
        }
        .limit {
          margin-top: 13px;
          height: 21px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #fff68f;
          white-space: nowrap;
        }
        .prop_btn {
          margin-top: 17px;
          width: 150px;
          height: 48px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #a9792c;
          i {
            color: #e57700;
          }
          img {
            width: 36px;
            height: 39px;
          }
        }
        .gray {
          width: 150px;
          height: 48px;
          background: linear-gradient(0deg, #9d9d9d, #e7e7e7);
          border: 2px solid #ffffff;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .blue_bg {
        background: linear-gradient(0deg, #8475f7, #7db2fb);
        .icon {
          border: 4px solid #6383eb;
        }
      }
      .syan_bg {
        background: linear-gradient(0deg, #785fe1, #cf77f3);
        .icon {
          border: 4px solid #a24fdc;
        }
      }
      .red_bg {
        background: linear-gradient(0deg, #6a51d4, #ce515d);
        .icon {
          border: 4px solid #e78ead;
        }
      }
      .prop_item:nth-child(3n + 1) {
        margin-left: 0;
      }
    }
    .ThemeBox_BottomText {
      margin-bottom: 37px;
      margin-right: 18px;
    }
  }
  // 弹框样式
  .van-dialog {
    .van-dialog__content {
      .remainingPoint,
      .goods_name,
      .Price_lucky_key,
      .Price_max_times {
        margin: 10px 0;
        font-size: 32px;
        color: #ffffff;
      }
      .remainingPoint {
        margin-top: 30px;
        margin-bottom: 40px;
        > img {
          height: 37px;
          margin: 0 6px;
        }
      }
      .img-box {
        width: 128px;
        height: 128px;
        margin: 40px auto 24px;
        border-radius: 12px;
        .iconBox {
          width: 100%;
          height: 100%;
          background: #fefaef;
          border-radius: 12px;
          > img {
            height: 100%;
          }
        }
        .pointReward_tk_lottie {
          // width: 90%;
          width: 100%;
          height: 100%;
          background: #fefaef;
          border-radius: 8px;
          .title_animation {
            ::v-deep .micAvatar_img {
              width: 86px;
              height: 86px;
            }
            ::v-deep .json_box {
              width: 95% !important;
            }
          }
          .mic_animation {
            ::v-deep .micAvatar_img {
              width: 86px;
              height: 86px;
            }
            ::v-deep .svga_box {
              width: 120px !important;
            }
          }
        }
      }
      .tk_title_img_box {
        width: 192px !important;
      }
      .goods_name {
        margin: 20px 0 24px;
        font-size: 28px !important;
      }
      .Price_lucky_key {
        margin: 10px 0;
        // font-size: 16px;
        // color: #ffffff;
        img {
          height: 36px;
          margin: 0 6px;
        }
      }
      .Price_max_times {
        margin: 10px 0;
        // font-size: 16px;
        // color: #ffffff;
        img {
          height: 40px;
          margin: 0 6px;
        }
      }
      // 弹框下方按钮
      .Dialog_Buttons {
        display: flex;
        justify-content: space-evenly;
        margin: 30px 20px 20px;
        .left-button,
        .right-button {
          width: 244px;
          padding: 0 20px;
          height: 76px;
          border-radius: 76px;
          text-align: center;
          flex-direction: column;
          font-size: 32px;
          p {
            width: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 30px;
              height: auto;
              margin: 0 4px;
            }
          }
          p:nth-child(2) {
            font-size: 24px;
          }
        }
      }
      .hero_stone_btn {
        margin: 14px 20px 30px !important;
        .left-button {
          width: 244px !important;
          height: 76px !important;
          border: 2px solid #ffffff !important;
          border-radius: 38px !important;
        }
      }
    }
  }
}
</style>
