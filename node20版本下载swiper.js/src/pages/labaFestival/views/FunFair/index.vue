<template>
  <div class="FunFair">
    <!-- 暖冬商店 -->
    <ThemeBox
      class="warmWinterStore_box"
      themeTitleImg="mk1_1.png"
      themeTitleImg2="title_6.png"
    >
      <div
        class="rightOfGift"
        :class="{ nogift: pageData.lamp_status.has_right == 2 }"
      >
        <div class="icon" v-if="pageData.lamp_status.has_right != 2">
          <img
            v-if="pageData.lamp_status.has_right != 1"
            src="../../assets/mk5_1.png"
            alt=""
          />
          <img
            @click="buy_light"
            v-if="pageData.lamp_status.has_right == 1"
            src="../../assets/mk5_2.png"
            alt=""
          />
        </div>
        <div class="bubble" v-if="pageData.lamp_status.has_right != 2">
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
                  <div class="price" v-if="it.id == 2 && it.type == 'ring'">
                    99<img src="../../assets/zs_38_28.png" alt="" />
                  </div>
                  <div class="price" v-if="it.id == 13">
                    1314<img src="../../assets/zs_38_28.png" alt="" />
                  </div>
                  <!-- <PublicSvga
                    v-if="!it.icon"
                    class="lottie lottiets"
                    svgaName="ts_txxm"
                    :userAvatar="$store.getters.user_icon"
                  /> -->
                  <PublicJson
                    v-if="!it.icon"
                    class="lottie lottiets"
                    :jsonName="
                      pageData.gender == 1 ? 'ts_520female' : 'ts_520male'
                    "
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
              每日限购：{{
                item1.exchange_times > item1.max_times
                  ? item1.max_times
                  : item1.exchange_times
              }}/{{ item1.max_times }}
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
      <div class="accumulate_list" ref="icon_list">
        <div class="icon_list">
          <div
            @click="receiveSendAward(item.award_id, item.has_right)"
            class="icon_item"
            v-for="(item, index) in pageData.snow_awards"
            :key="index"
            ref="icon_item"
          >
            <img :src="IconPath(item.icon)" alt="" />
            <div class="nums">{{ item.text }}</div>
            <div class="light" v-if="item.has_right == 1"></div>
            <div class="red_point" v-if="item.has_right == 1"></div>
            <div class="has_get" v-if="item.has_right == 2"></div>
          </div>
        </div>
        <div class="schedule_line">
          <div
            class="has_arrive"
            :style="{ width: getwidth(pageData.gift_buy_nums) }"
          ></div>
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
          <li>
            <span></span>雪人馈赠的奖励每日刷新，未领取的奖励将清零，请及时领取
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
            <!-- <public-json v-if="item.type == 'voice'" jsonName="ch_zfz1" /> -->
            <public-json
              v-if="item.type == 'voice'"
              jsonName="sb_yywg"
              class="lottie lottiesb"
              :userAvatar="$store.getters.user_icon"
            />
          </div>
          <div class="prop_name">{{ item.text }}</div>
          <div class="limit" v-if="!item.max">不限次数</div>
          <div class="limit" v-else>
            ({{
              item.finish_times > item.max ? item.max : item.finish_times
            }}/{{ item.max }})
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
    <!-- 钻石不足弹窗 -->
    <DiamondShortage ref="lowDiamond" @recharge="recharge"></DiamondShortage>
    <!-- 确认花费弹窗 -->
    <recognizedExpense
      class="dialog"
      ref="recognizedExpense"
      :currentPrice="currentPrice"
      :currentBoxName="currentBoxName"
      @sureBuy="sureBuy"
    ></recognizedExpense>
    <!-- 恭喜获得弹框 -->
    <congratsGetPrompt :list="list" ref="congrat">
      <template #default="{ data }">
        <div v-if="!data.icon" class="lottieContainer">
          <PublicSvga
            v-if="!data.icon && data.type == 'mic' && data.id == 137"
            class="lottie"
            svgaName="ts_txxm"
            :userAvatar="$store.getters.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'mic' && data.id == 17"
            jsonName="ts_520male"
            class="lottie lottiesb"
            :userAvatar="$store.getters.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'mic' && data.id == 18"
            jsonName="ts_520female"
            class="lottie lottiesb"
            :userAvatar="$store.getters.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'voice'"
            jsonName="sb_yywg"
            class="lottie lottiesb"
            :userAvatar="$store.getters.user_icon"
          />
        </div>
      </template>
    </congratsGetPrompt>
    <!-- 满背包弹框 -->
    <bagFull ref="bagFull" :type="fullbagType"></bagFull>
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
          pageData.snow_nums
        }}
      </p>
      <!-- 道具图标展示 -->
      <div
        class="theme_item img-box"
        :class="{ tk_title_img_box: dialogData.type === 'title' }"
      >
        <div class="iconBox flex_across" v-if="dialogData.icon">
          <img :src="IconPath(dialogData.icon)" alt="" />
        </div>
        <div v-else class="pointReward_tk_lottie">
          <PublicJson
            v-if="dialogData.type === 'voice'"
            class="voice_animation"
            jsonName="sb_yywg"
            :userAvatar="$store.getters.user_icon"
          />
          <PublicSvga
            v-else
            class="mic_animation"
            svgaName="ts_txxm"
            :userAvatar="$store.getters.user_icon"
          />
        </div>
      </div>
      <!-- 道具名称 -->
      <p class="goods_name flex_across">
        {{ dialogGoodsName }}
      </p>
      <!-- 预计消耗数量 -->
      <p v-if="dialogData.max == 1" class="Price_max_times flex_across">
        消耗<img :src="IconPath(pointIcon)" /> ：{{ dialogData.price }}
      </p>
      <!-- 计数器组件 -->
      <DialogCounter
        :goods_detail="dialogData"
        :my_goods="+pageData.snow_nums"
        :inputNum.sync="inputNum"
        :showSpecialBilling="true"
        :showBilling="false"
        :CounterIcon="pointIcon"
      />
      <!-- 兑换按钮 -->
      <div class="Dialog_Buttons">
        <div
          class="left-button theme_botton_undid flex_across"
          @click="onExcharge()"
        >
          <p>兑换</p>
        </div>
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
import qs from 'qs'
import PublicSvga from '../../components/PublicSvga.vue'
import PublicJson from '../../components/PublicJson.vue'
import recognizedExpense from './components/recognizedExpense.vue'
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 弹框计数器组件
import DialogCounter from './components/DialogCounter'
import bagFull from './components/bagFull.vue'
// 恭喜获得弹框
import congratsGetPrompt from '../../components/congrats-get-prompt.vue'
import DiamondShortage from './components/DiamondShortage.vue'
// 默认数据
import { funfair } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// 充值方法
import { recharge } from '../../utils/toApp'

export default {
  name: 'FunFair',
  components: {
    PublicSvga,
    PublicJson,
    recognizedExpense,
    ThemeDialog,
    DialogCounter,
    bagFull,
    congratsGetPrompt,
    DiamondShortage
  },
  data() {
    return {
      // 弹框兑换数据
      settlement: {},
      // 弹框计数器数据
      inputNum: 1,
      // 道具图标
      pointIcon: 'xxr_76_83.png',
      // 道具名称
      pointName: '小雪人',
      // 弹框显示隐藏
      showDialog: false,
      // 弹框数据
      dialogData: {},
      fullbagType: 1,
      list: [],
      pageData: {},
      currentPrice: 288,
      currentBoxName: '晶石礼盒',
      current_gift_id: 1
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = funfair
    await this.init()
    this.$store.commit('user/getUserIcon', this.pageData.user_icon)
    // 查询第一个可领取的下标
    let index = this.pageData.snow_awards.findIndex(
      (item) => item.has_right == 1
    )
    // 查询第一个未领取的下标
    const index1 = this.pageData.snow_awards.findIndex(
      (item) => item.has_right == 0
    )
    if (index == -1) {
      if (index1 != -1) {
        index = index1
      } else {
        index = 8
      }
    }
    this.handlerScroll(index)
  },
  computed: {
    // 弹框内道具名称
    dialogGoodsName() {
      let type = ''
      this.dialogData.type == 'mic'
        ? (type = '头饰')
        : this.dialogData.type == 'voice'
        ? (type = '声波')
        : this.dialogData.type == 'car'
        ? (type = '座驾')
        : (type = '')
      return this.dialogData.type == 'mic' ||
        this.dialogData.type == 'car' ||
        this.dialogData.type == 'voice'
        ? `${type}+${this.dialogData.nums}天`
        : this.dialogData.name
    }
  },
  methods: {
    handlerScroll(i) {
      const w = this.$refs.icon_list.getBoundingClientRect().width
      const w2 = this.$refs.icon_item[i].getBoundingClientRect().width
      const l = this.$refs.icon_item[i].offsetLeft
      console.log(w, w2, l)
      if (l + w2 / 2 > w / 2) {
        this.$refs.icon_list.scrollLeft = l + w2 / 2 - w / 2
      }
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.init()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 跳转APP充值界面
    recharge() {
      recharge(this.hiddenFn)
    },
    async init() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm5'
      })
      res.errno == 0 ? (this.pageData = res.data) : this.$toast(res.errmsg)
      return res
    },
    exchangeGoods(item) {
      if (this.pageData.snow_nums < item.need) {
        return this.$toast('小雪人不足')
      }
      this.dialogData = item
      this.settlement['mark[id]'] = this.dialogData.goods_id
      this.showDialog = true
    },
    // 处理背包
    disposalBackpack(i) {
      const { appVersion, app_version } = qs.parse(
        window.location.search.substring(1)
      )
      if (
        this.judgmentVersion(appVersion, 578) ||
        this.judgmentVersion(app_version, 578)
      ) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      this.fullbagType = i == 1 ? 1 : 2
      this.$refs.bagFull.showDialog = true
    },
    judgmentVersion(arg, requireVersion) {
      return arg && arg.split('.').join('').slice(0, 3) < requireVersion
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
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExcharge() {
      // 绿晶石，科举，等等普通道具兑换
      this.showDialog = false
      this.settlement.type = 'fun_market_exchange'
      this.settlement['mark[nums]'] = this.inputNum
      const res = await this.handleExcharge()
      if (res.errno == 0) {
        this.list = res.data.awards
        this.init()
        this.$refs.congrat.showPopup = true
      } else if (res.errno == -5) {
        this.disposalBackpack(1)
      } else if (res.errno == -6) {
        this.disposalBackpack(2)
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 恭喜获得弹框兑换按钮接口
    async handleExcharge() {
      return await getPageData({ ...this.settlement })
    },
    getwidth(value) {
      let width = 0
      if (value <= 5) {
        width = 0
      } else if (value > 5 && value < 10) {
        width = 0 + (((value - 5) / 5) * 100) / 8
      } else if (value >= 10 && value < 15) {
        width = 100 / 8 + (((value - 10) / 5) * 100) / 8
      } else if (value >= 15 && value < 20) {
        width = (2 * 100) / 8 + (((value - 15) / 5) * 100) / 8
      } else if (value >= 20 && value < 30) {
        width = (3 * 100) / 8 + (((value - 20) / 10) * 100) / 8
      } else if (value >= 30 && value < 40) {
        width = (4 * 100) / 8 + (((value - 30) / 10) * 100) / 8
      } else if (value >= 40 && value < 50) {
        width = (5 * 100) / 8 + (((value - 40) / 10) * 100) / 8
      } else if (value >= 50 && value < 60) {
        width = (6 * 100) / 8 + (((value - 50) / 10) * 100) / 8
      } else if (value >= 60 && value < 70) {
        width = (7 * 100) / 8 + (((value - 60) / 10) * 100) / 8
      } else if (value >= 70) {
        width = 100
      }
      return width + '%'
    },
    buygift(item, name) {
      this.currentPrice = item.price
      this.currentBoxName = name
      this.current_gift_id = item.gift_id
      // 弹出确认弹窗
      if (window.localStorage.getItem(new Date().toLocaleDateString()) != 1) {
        this.$refs.recognizedExpense.showDialog = true
      } else {
        this.sureBuy()
      }
    },
    async sureBuy() {
      // 发购买请求，弹出恭喜获得弹窗
      const res = await getPageData({
        type: 'fun_market_buy',
        mark: this.current_gift_id
      })
      if (res.errno == 0) {
        this.list = res.data.awards
        this.init()
        this.$refs.congrat.showPopup = true
      } else if (res.errno == 3) {
        this.$refs.lowDiamond.showDialog = true
      } else if (res.errno == -5) {
        this.disposalBackpack(1)
      } else if (res.errno == -6) {
        this.disposalBackpack(2)
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 领取花灯奖励
    async buy_light() {
      const res = await getPageData({
        type: 'fun_market_lamp_award'
      })
      console.log(res)
      if (res.errno == 0) {
        const arr = []
        arr.push(res.data)
        this.list = arr
        this.init()
        this.$refs.congrat.showPopup = true
      } else {
        this.$toast(res.errmsg)
      }
    },
    // -领取雪人馈赠奖励
    async receiveSendAward(mark, has_right) {
      if (has_right != 1) {
        return
      }
      const res = await getPageData({
        type: 'fun_market_snow_award',
        mark
      })
      console.log(res)
      if (res.errno == 0) {
        const arr = []
        arr.push(res.data.award)
        this.list = arr
        this.init()
        this.$refs.congrat.showPopup = true
      } else {
        this.$toast(res.errmsg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lottieContainer {
  width: 100%;
  height: 100%;
}

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
    .nogift {
      margin-top: 60px;
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
            justify-content: center;
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

                  ::v-deep .micAvatar_img {
                    width: 82%;
                    height: 82%;
                  }
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
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ffffff;
                line-height: 26px;
                white-space: nowrap;
                margin-top: 10px;
              }

              &:nth-of-type(2) {
                margin-right: 30px;
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

          &:nth-of-type(2) {
            .awards {
              .award_item {
                margin-right: 0;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }

    .gift_box:last-child {
      margin-bottom: 79px;
      .award_item:nth-of-type(2) {
        margin-right: 30px !important;
        margin-left: 0;
      }
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
            margin-left: -17px;
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
    margin-bottom: 63px;

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

          .lottiesb {
            overflow: hidden;
            width: 100%;
            height: 100%;

            ::v-deep .micAvatar_img {
              width: 68%;
              height: 68%;
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

          .voice_animation {
            ::v-deep .micAvatar_img {
              width: 66%;
              height: 66%;
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
        justify-content: center;
        margin: 23px 20px 45px;

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

  .lottiesb {
    overflow: hidden;
    width: 100%;
    height: 100%;

    ::v-deep .micAvatar_img {
      width: 68%;
      height: 68%;
    }
  }
}
</style>
