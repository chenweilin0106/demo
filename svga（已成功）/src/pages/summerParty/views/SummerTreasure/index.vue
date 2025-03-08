<template>
  <div class="SummerTreasure">
    <!-- 五日签到 -->
    <div class="fiveDaySignIn">
      <div class="inner">
        <div class="pinkTitle"></div>
        <div class="signArea" ref="Xlist">
          <div class="signItem" v-for="(item, index) in sign_list" :key="index">
            <div class="award">
              <img src="../../assets/cjq_110_90.png" alt="" />
              <div class="num">x1</div>
              <div class="bottom">{{ item.date_text }}</div>
            </div>
            <div v-if="item.status == 2" class="btn">已签到</div>
            <div v-if="item.status == 1" class="btn notSign">即将开始</div>
            <div v-if="item.status == 0" class="btn">未签到</div>
          </div>
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间，每日签到即可领取抽奖券1张</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>每充值30元也可获得抽奖券1张，自动发放无需手动领取</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>获得爱心奖池中的限定头饰【真爱永恒】即可解锁七芒星阵奖池</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>抽奖获得的道具礼物魅力加成同钻石礼物</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bgimg">
      <div class="switchTabs">
        <div
          class="tabs"
          v-for="tab in tabList"
          :key="tab"
          @click="handlerChangeTab(tab)"
          :class="{ tab_active: tabActive == tab }"
        >
          <img
            :src="
              tab == '梦幻漂流瓶' && tabActive == tab
                ? IconPath('mk4_6.png')
                : tab == '水晶球' && tabActive == tab
                ? IconPath('mk4_7_1.png')
                : tab != '水晶球' && tabActive != tab
                ? IconPath('mk4_6_1.png')
                : IconPath('mk4_7.png')
            "
            alt=""
          />
        </div>
        <div class="tag_img">
          <img :src="IconPath('mk4_2.png')" alt="">
        </div>
      </div>
      <!-- 抽奖券数量展示 -->
      <div class="pLine flex_across">
        <p class="awardTicketP flex_across">
          拥有抽奖券
          <img src="../../assets/cjq_44_36.png" />
          :<span>{{ ticket_nums }}</span>
          <img
            src="../../assets/mk4_3.png"
            class="recharge"
            @click="recharge"
            alt=""
          />
        </p>
        <p class="awardTicketP2 flex_across">
          已充值：<span class="special">{{ recharge_nums }}</span>
        </p>
      </div>
      <!-- 奖励概率 -->
      <div class="reward_probability" @click="handlerOpenReward(tabActive)">
        <img src="../../assets/mk4_4.png" alt="" />
      </div>
      <!-- 梦幻漂流瓶 -->
      <div class="awardPowl flex_vertical" v-show="tabActive == '梦幻漂流瓶'">
        <div class="awards">
          <div
            class="awardItem"
            :class="'awardItem' + [index]"
            v-for="(item, index) in simple_lottery_list"
            :key="index"
          >
            <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
            <div v-if="item.number === 0" :class="{ Overlay: item.number === 0 }"></div>
            <div class="miclottie" v-if="item.type == 'mic'"></div>
            <div class="nums" v-if="item.number > 0">x{{ item.number }}</div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <div class="bottomPart flex_vertical">
          <div class="leftbtn bottom_btn" @click="throttlewish(1)">
            <img
              src="../../assets/mk4_20.png"
              class="congratulationTit"
              alt=""
            />
          </div>
          <div class="rightbtn grey bottom_btn" @click="throttlewish(2)">
            <img
              src="../../assets/mk4_21.png"
              class="congratulationTit"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 水晶球 -->
      <div class="ferrisWheel flex_vertical" v-show="tabActive == '水晶球'">
        <div class="ferrisWheelCenter">
          <div class="crystal_ball">
            <div
              class="awardItem"
              :class="[
                'awardItem' + index,
                { lightawardItem: index < lightFlag }
              ]"
              v-for="(item, index) in senior_lottery_list"
              :key="index"
            >
            <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
            <div v-if="item.number === 0" :class="{ Overlay: item.number === 0 }">1</div>
              <div class="miclottie" v-if="item.type == 'mic'"></div>
              <img
                v-if="item.type == 'mic'"
                :src="user_icon"
                class="avatar"
                alt=""
              />
              <div class="nums" v-if="item.number">x{{ item.number }}</div>
              <div class="text">{{ item.text }}</div>
            </div>
          </div>
        </div>
        <div class="bottomPart flex_vertical">
          <div class="lock">
            <div v-if="is_locker" class="lock_btn">
              <div class="gray_btn theme_botton_done">尚未结锁</div>
              <div class="lock_text">
                获得梦幻漂流瓶中的【烈焰神牛】座驾即可解锁
              </div>
            </div>
            <div v-else-if="!is_locker" class="bottom_lock">
              <div class="leftbtn bottom_btn" @click="throttlewish(1)">
                <img
                  src="../../assets/mk4_20.png"
                  class="congratulationTit"
                  alt=""
                />
              </div>
              <div class="rightbtn grey bottom_btn" @click="throttlewish(2)">
                <img
                  src="../../assets/mk4_28.png"
                  class="congratulationTit"
                  alt=""
                />
              </div>
            </div>
          </div>

          <!-- <div v-if="false" class="leftbtn bottom_btn" @click="throttlewish(1)">
            <img
              src="../../assets/mk4_20.png"
              class="congratulationTit"
              alt=""
            />
          </div>
          <div
            v-if="false"
            class="rightbtn grey bottom_btn"
            @click="throttlewish(2)"
          >
            <img
              src="../../assets/mk4_21.png"
              class="congratulationTit"
              alt=""
            />
          </div> -->
        </div>
      </div>
    </div>

    <!-- <van-overlay
      z-index="2023"
      class="commToast"
      :show="showFlag"
      @click="close"
    >
      <div class="inCommToast" @click.stop>
        <img src="" class="header" />
        <div
          class="awardContainer tk_award"
          :class="{ center: awards.length <= 4 }"
        >
          <div
            class="awardItem tk_award_item"
            v-for="(item, index) in awards"
            :key="index"
          >
            <div class="img">
               <img
                v-if="item.type == 'mic'"
                :src="user_icon"
                class="avatar"
                alt=""
              />
              <div class="lottie3" v-if="item.type == 'mic'"></div>
               <img v-else :src="require('../../assets/' + item.icon)" alt="" />
            </div>
            <p v-if="item.type == 'costume'" class="costume">{{ item.text }}</p>
            <p v-if="item.type != 'costume'">{{ item.text }}</p>
          </div>
          <div
            class="awardItem tk_award_item"
            v-for="(item, index) in awards.length > 4
              ? 4 - (awards.length % 4) == 4
                ? 0
                : 4 - (awards.length % 4)
              : 0"
            :key="index"
          ></div>
        </div>
        <div
          class="btn"
          @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'car'"
        >
          立即装备
        </div>
        <div
          class="btn"
          @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'mic'"
        >
          立即装扮
        </div>
        <div
          class="btn"
          @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'costume'"
        >
          立即装扮
        </div>
        <div class="btn" @click="iknow" v-if="awards.length > 1">我知道了</div>
        <div
          class="btn"
          @click="iknow"
          v-if="
            awards.length == 1 &&
            awards[0].type != 'car' &&
            awards[0].type != 'mic' &&
            awards[0].type != 'costume'
          "
        >
          我知道了
        </div>
      </div>
    </van-overlay> -->
    <!-- 充值 -->
    <ThemeDialog
      class="commToast2"
      duration="0"
      :is-show="showFlag2"
      :isSmall="false"
      @closeDialog="cancel"
    >
      <div class="inCommToast tk_inCommToast" @click.stop>
        <p>钻石余额不足，请充值</p>
        <div class="btns flex_across">
          <div class="btn1" @click="cancel">取消</div>
          <div class="btn2 theme_botton_did" @click="recharge">充值</div>
        </div>
      </div>
    </ThemeDialog>
    <!-- 奖励概率 -->
    <ThemeDialog
      z-index="2023"
      class="RewardDialog"
      :is-show="showRewardDialog"
      dialogMark="rewardDetails"
      :titleIconObj="{ rewardDetails: 'title_7.png' }"
      :isSmall="false"
      @closeDialog="closeRewardDialog"
    >
      <div class="reward_img">
        <img :src="tabActive==='梦幻漂流瓶' ? IconPath('tk_5.png') : IconPath('tk_1.png')" alt="" />
      </div>
    </ThemeDialog>
    <!-- 恭喜获得签到弹框 -->
    <ThemeDialog
      class="obtained"
      :is-show="showFlag3"
      dialogMark="obtained"
      :titleIconObj="{ obtained: 'title_5.png' }"
      :isSmall="false"
      @click="hangdlerObtained"
    >

      <div class="inCommToast inCommToast1" @click.stop>
        <div class="img">
          <img v-if="is_sign_in" :src="IconPath('cjq_110_90.png')" alt="" />
          <img v-if="this.awards[0]?.icon" :src="IconPath(this.awards[0]?.icon)" alt="" />
        </div>
        <div class="num">+1</div>
        <div class="btn theme_botton_did" @click="close1">我知道了</div>
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/toApp'

// 导入请求
import { getPageData } from '../../api/index'
// import { equipNow } from '../../api/equipNow'
// 弹窗
import ThemeDialog from '../../components/Dialog/ThemeDialog.vue'
import { summerTreasure } from '../../utils/pageData'
export default {
  // 奖励兑换
  name: 'SummerTreasure',
  props: {},
  components: { ThemeDialog },
  data () {
    return {
      wheelState: false, // 水晶球抽奖状态
      rotaryState: false, // 水晶球旋转状态
      showFlag: false, // 弹窗Flag 控制弹窗显示隐藏
      showFlag2: false, // 充值弹框
      showFlag3: false, // 恭喜获得弹窗
      showRewardDialog: false, // 奖励概率
      tabActive: '梦幻漂流瓶',
      tabList: ['梦幻漂流瓶', '水晶球'],
      dialogType: '',
      isSign: false,
      is_sign_in: true, // 是否当日首次签到(true-是，false-不是）,首次签到需要弹框
      ticket_nums: '0', // 抽奖券数量
      recharge_nums: 0, // 已充值数量
      is_locker: true, // 水晶球锁状态：true-锁状态，false-已解锁
      simple_count: 27, // 梦幻漂流瓶剩余可抽奖品数，如果小于10，则许愿10次按钮置灰
      sign_list: [], // 签到列表
      senior_lottery_list: [],
      simple_lottery_list: [],
      awards: [],
      toastlottieObj: null, // 收集奖励弹窗的动画对象
      previous: 0, // 时间戳记录
      timer11: null,
      lightFlag: 0,
      user_icon: this.$store.getters.user_icon
    }
  },
  computed: {
  },
  watch: {
    // 正常写法
    showFlag: {
      handler (newValue, oldValue) {
        if (!newValue) {
          setTimeout(() => {
            this.rotaryState = false
          }, 200)
        }
      }
    },
    showFlag3: {
      handler (newValue, oldValue) {
        if (!newValue) {
          setTimeout(() => {
            this.rotaryState = false
          }, 200)
        }
      }
    },
    rotaryState: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.timer11 = setInterval(() => {
            if (this.lightFlag < 8) {
              this.lightFlag++
            } else {
              this.lightFlag = 0
              this.rotaryState = false
              clearInterval(this.timer11)
            }
          }, 100)
        }
      }
    }
  },
  async mounted () {
    this.senior_lottery_list = summerTreasure.senior_lottery_list
    this.simple_lottery_list = summerTreasure.simple_lottery_list
    this.awards = summerTreasure.awards
    this.sign_list = summerTreasure.sign_list
    // 初始化数据
    const res = await this.init()
    // console.log('mounted', res)
    this.is_sign_in = res.data.is_sign_in
    this.ticket_nums = res.data.ticket_nums
    this.is_locker = res.data.is_locker
    this.simple_lottery_list = res.data.simple_lottery_list
    this.simple_count = res.data.simple_count
    this.senior_lottery_list = res.data.senior_lottery_list
    this.sign_list = res.data.sign_list
    this.recharge_nums = res.data.recharge_nums
    // 设置默认标签
    // if (this.is_locker) {

    // } else {

    // }
    // 设置签到弹窗滑到最右边
    // if (this.sign_list[this.sign_list.length - 1].status != 1) {
    //   this.$refs.Xlist.scrollLeft = this.$refs.Xlist.scrollWidth
    // }
    // 首次签到需要弹框
    if (this.is_sign_in) {
      this.showFlag3 = true
    }

    //   window.location.reload()
  },
  beforeDestroy () {
    // removeBrowserBackListener(() => {
    //   window.location.reload()
    // })
    clearInterval(this.timer11)
  },
  methods: {

    // 绑定监听页面呼出事件
    listenerHiddenStatus (fn) {
      document.addEventListener('visibilitychange', fn)
    },
    // 监听页面呼出回调函数
    hiddenFn () {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        // 页面刷新
        this.init().then((res) => {
          // 弹窗状态改变
          this.showFlag2 = false
          this.is_sign_in = res.data.is_sign_in
          this.ticket_nums = res.data.ticket_nums
          this.is_locker = res.data.is_locker
          this.simple_lottery_list = res.data.simple_lottery_list
          this.simple_count = res.data.simple_count
          this.senior_lottery_list = res.data.senior_lottery_list
          this.sign_list = res.data.sign_list
          this.recharge_nums = res.data.recharge_nums
        })
        // 移除监听
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 充值按钮
    recharge () {
      this.listenerHiddenStatus(this.hiddenFn)
      recharge()
      this.showFlag2 = false
    },
    // 初始化数据方法
    async init () {
      const res = await getPageData({
        mark: 'm4',
        type: 'tab'
      })
      if (res.errno != 0) {
        this.$toast(res.errmsg)
      } else if ((res.errno == 0)) {
        return res
      }
    },
      // 节流许愿
      throttlewish (mark) {
      if ((new Date() - this.previous) > 1000) {
        this.wish(mark)
        this.previous = new Date()
      } else {
        this.$toast('手速太快了')
      }
    },
    // 许愿
    wish (mark) {
      if (mark == 1 && this.ticket_nums < 1) {
        this.showFlag2 = true
        console.log('mark1', this.showFlag2)
        return
      }
      if (mark == 2 && this.ticket_nums < 5) {
        this.showFlag2 = true
        console.log('mark2', this.showFlag2)
        return
      }
      getPageData({
        mark,
        type: 'garden_party_comm_lottery'
      }).then((res) => {
        console.log(res, 'res')
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          this.ticket_nums = res.data.ticket_nums
          this.simple_count = res.data.simple_count
          this.awards = res.data.awards
          this.is_locker = res.data.is_locker
          const filterArr = this.awards

          if (this.awards.length > 2) {
            this.showFlag = true
            for (let i = 0; i < filterArr.length; i++) {
              // 如果类型为头像
              if (filterArr[i].type == 'mic') {
                console.log(11111)
              }
            }
          } else {
            this.showFlag3 = true
            for (let i = 0; i < filterArr.length; i++) {
              // 如果类型为头像
              if (filterArr[i].type == 'mic') {
                console.log(11111)
              }
            }
          }
          // 刷新页面
          this.init().then((res) => {
            this.simple_lottery_list = res.data.simple_lottery_list
            this.is_locker = res.data.is_locker
          })
        }
      })
    },
    // 转动摩天轮
    rotate (mark) {
      // 抽奖券不足
      if (mark == 1 && this.ticket_nums < 1) {
        this.showFlag2 = true
        return
      }
      // 抽奖券不足
      if (mark == 2 && this.ticket_nums < 10) {
        this.showFlag2 = true
        return
      }
      if (this.wheelState) {
        console.log('手速太快了，稍后再试')
        return
      }
      this.wheelState = true
      // getPageData({
      //   mark,
      //   type: 'garden_party_senior_lottery'
      // }).then((res) => {
      //   this.wheelState = false
      //   console.log(res)
      //   if (res.errno != 0) {
      //     return this.$toast(res.errmsg)
      //   }
      //   if (res.errno == 0) {
      //     // 摩天轮转动2.5秒
      //     this.rotaryState = true
      //     // setTimeout(() => {
      //     //   if (this.rotaryState) {
      //     //     this.rotaryState = false
      //     //   }
      //     // }, 2500);
      //     // 请求成功
      //     console.log(res)
      //     this.ticket_nums = res.data.ticket_nums
      //     this.awards = res.data.awards
      //     // this.temporaryList = res.data.awards
      //     const filterArr = this.awards
      //     // 延迟0.8秒展示奖励弹窗
      //     setTimeout(() => {
      //       if (this.awards.length > 2) {
      //         this.showFlag = true
      //         for (let i = 0; i < filterArr.length; i++) {
      //           // 如果类型为头像
      //           if (filterArr[i].type == 'mic') {
      //             console.log(11111)
      //             this.toastlottieObj = svgFun(0, zayh, 'zayh', '.lottie3')
      //           }
      //         }
      //       } else {
      //         this.showFlag3 = true
      //         for (let i = 0; i < filterArr.length; i++) {
      //           // 如果类型为头像
      //           if (filterArr[i].type == 'mic') {
      //             console.log(11111)
      //             this.toastlottieObj = svgFun(0, zayh, 'zayh', '.lottie4')
      //           }
      //         }
      //       }
      //     }, 1200)

      //     // 刷新页面
      //     this.init().then((res) => {
      //       console.log(res)
      //       // 奖池数据
      //       this.senior_lottery_list = res.data.senior_lottery_list
      //     })
      //   }
      // })
    },
    // 装备
    equip (id, type) {
      if (this.showFlag) {
        this.showFlag = false
      }
      if (this.showFlag3) {
        this.showFlag3 = false
      }
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300)
      }
      // equipNow({
      //   id,
      //   type
      // }).then((res) => {
      //   console.log(res)
      //   if (res.errno != 0) {
      //     return this.$toast(res.errmsg)
      //   }
      //   if (res.errno == 0) {
      //     // 请求成功
      //     console.log(res)
      //     Toast(res.errmsg)
      //   }
      // })
    },
    iknow () {
      this.showFlag = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300)
      }
    },
    // 开启详情弹框
    handlerOpenReward () {
      this.showRewardDialog = true
    },
    // 关闭弹窗
    close () {
      this.showFlag = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300)
      }
    },

    cancel () {
      this.showFlag2 = false
    },
    // 关闭恭喜获得弹窗
    close1 () {
      this.showFlag3 = false
    },
    // 恭喜获得
    hangdlerObtained () {
      this.showFlag3 = true
    },
    // 关闭奖励弹窗
    closeRewardDialog () {
      this.showRewardDialog = false
    },

    // 切换奖池
    handlerChangeTab (tab) {
      this.tabActive = tab
    }
  }
}
</script>

<style lang="scss">
.SummerTreasure {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  // 五日签到样式
  .fiveDaySignIn {
    width: 360px;
    height: 390px;
    background: linear-gradient(0deg, #e4fdea, #e2fcd9);
    border-radius: 50px 50px 0px 0px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    ::-webkit-scrollbar {
      width: 0 !important;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }

    ::-webkit-scrollbar {
      display: none;
      width: 0;
    }

    .inner {
      width: 100%;
      height: 100%;
      border-radius: 46px 46px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(0deg, #5193df, #83d5f3);

      .pinkTitle {
        width: 294px;
        height: 71px;
        margin-top: -38px;
        background: url('../../assets/mk4_5.png') no-repeat;
        background-size: 100%;
      }

      .signArea {
        width: max-content;
        width: 350px;
        height: 143px;
        background: #d0f1f7;
        margin-top: 8px;
        display: flex;
        align-items: center;
        overflow-x: scroll;
        overflow-y: auto;

        .signItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 4px;
          height: 100%;

          .award {
            width: 69px;
            height: 87px;
            background: linear-gradient(0deg, #ffffff, #fffdcf);
            border: 2px solid #6bc2a2;
            border-radius: 10px;
            margin-top: 9px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            img {
              width: 80%;
              margin-top: 12px;
            }

            .num {
              position: absolute;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #4c9c8f;
              top: 45px;
              right: 0;
            }

            .bottom {
              width: 100%;
              height: 21px;
              background: linear-gradient(90deg, #8bdc83, #57b8ae);
              border-radius: 0px 0px 10px 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              margin-top: auto;
              margin-bottom: 0;
            }

            .overlay11 {
              position: absolute;
              width: 69px;
              height: 87px;
              background: rgba($color: #000000, $alpha: 0.6);
              opacity: 1;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 64px;
                height: 63px;
                margin-top: 0;
                z-index: 99;
              }
            }
          }

          .btn {
            width: 60px;
            height: 30px;
            background: linear-gradient(0deg, #a3a3a3, #dddddd);
            border-radius: 15px;
            margin-top: 7px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }

          .notSign {
            background: none;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #8663c4;
          }
        }

        .signItem:first-child {
          margin-left: 7px;
        }

        .signItem:last-child {
          margin-right: 7px;
        }
      }

      .textcontainer {
        .ruleKText {
          display: flex;
          align-items: flex-start;
          margin-top: 11px;

          P {
            margin-right: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #fff;
          }

          .circle {
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 3px;
            margin-left: 10px;
            margin-right: 9px;
            background-color: #fffaa6;
          }
        }

        .ruleKText:first-child {
          margin-top: 18px;
        }

        .ruleKText:last-child {
          margin-bottom: 18px;
        }
      }
    }
  }

  .bgimg {
    position: relative;
    width: 375px;
    min-height: 711px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .switchTabs {
      position: relative;
      width: 300px;
      height: 53px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      margin: 20px 0;
      border-radius: 26.5px;
      background: url('../../assets/mk6_13.png') no-repeat;
      background-size: 100%;

      .tabs {
        background-size: cover;
        width: 150px;
        height: 53px;
        text-align: center;
        color: #fff;

        img {
          width: 80%;
        }
      }

      .tab_active {
        background: url('../../assets/mk6_14.png') no-repeat;
        background-size: 100% 100%;
      }
      .tag_img{
        position: absolute;
        top:-20px;
        right: -15px;
        width: 70.5px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .pLine {
      position: absolute;
      top: 120px;
      z-index: 22;

      .awardTicketP {
        height: 24px;
        background: #3e81cf;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 11px;
        margin-right: 42px;
        padding-left: 13px;

        img {
          width: 22px;
          height: 18px;
          margin: 0 5px;
        }

        .recharge {
          width: 25px;
          height: 25px;
          margin-left: 3px;
          margin-right: 0;
        }
      }

      .awardTicketP2 {
        min-width: 120px;
        height: 24px;
        background: #3e81cf;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 11px;

        .special {
          color: #fffaa6;
          line-height: 11px;
        }
      }
    }

    .reward_probability {
      position: absolute;
      top: 140px;
      right: 20px;
      z-index: 99;
      width: 24px;
      height: 24px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .awards,
    .ferrisWheelCenter {
      width: 100%;
      min-height: 510px;
      background: url('../../assets/mk4_bg_1.png') no-repeat;
      background-size: 100%;
      position: relative;
    }

    // 梦幻漂流瓶样式
    .awardPowl {
      position: relative;
      width: 360px;
      height: 520px;
      background: linear-gradient(0deg, #e4fdea, #e2fcd9);

      .awards {
        .awardItem {
          width: 90px;
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          background: url('../../assets/mk4_10.png') no-repeat;
          background-size: 100%;

          .miclottie {
            width: 77px;
            height: 80px;
            margin-top: 14px;
            z-index: 10;
          }

          img {
            margin-top: 10px;
            width: 60%;
          }
          .Overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            background: url("../../assets/mk4_18.png") no-repeat;
            background-size: 100%;
            opacity: 0.9;
          }
          .avatar {
            width: 61px;
            height: 61px;
            border-radius: 50%;
            position: absolute;
            top: 24px;
            transform: translateY(0);
          }

          .nums {
            position: absolute;
            top: 10px;
            right: 11px;
            width: 25px;
            height: 15px;
            background: #338d7b;
            border-radius: 8px 8px 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 11px;
          }

          .text {
            position: absolute;
            bottom: 15px;
            min-width: 40px;
            height: 14px;
            padding: 0 5px;
            background: #d0f4f5;
            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #327b6c;
            line-height: 11px;
          }

        }

        .awardItem0 {
          width: 184px;
          height: 201px;
          background: url('../../assets/mk4_17.png') no-repeat;
          background-size: 100%;
          top: 180px;
          left: 92px;

          img {
            width: 65%;
            margin-top: 65px;
          }
          .Overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            background: url("../../assets/mk4_19.png") no-repeat;
            background-size: 100%;
            opacity: 0.9;
          }
        }

        .awardItem1 {
          top: 310px;
          left: 15px;
        }

        .awardItem2 {
          top: 210px;
          left: 10px;
        }

        .awardItem3 {
          top: 110px;
          left: 25px;
        }

        .awardItem4 {
          top: 75px;
          left: 140px;
        }

        .awardItem5 {
          top: 110px;
          right: 25px;
        }

        .awardItem6 {
          top: 210px;
          right: 10px;
        }

        .awardItem7 {
          top: 310px;
          right: 10px;
        }
      }

      .bottomPart {
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;

        .bottom_btn {
          width: 150px;
          height: 55px;
          border-radius: 27.5px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    // 水晶球样式
    .ferrisWheel {
      position: relative;
      width: 360px;
      height: 520px;
      background: linear-gradient(0deg, #e4fdea, #e2fcd9);

      .ferrisWheelCenter {
        width: 100%;
        height: 100%;
        position: relative;

        .crystal_ball {
          position: absolute;
          top: 58px;
          left: 3px;
          width: 98%;
          height: 352px;
          background: url('../../assets/mk4_38.png') no-repeat;
          background-size: 100%;

          .awardItem {
            width: 84px;
            height: 84px;
            background: url('../../assets/mk4_23.png') no-repeat;
            background-size: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;

            .miclottie {
              position: absolute;
              z-index: 20;
              width: 61px;
              height: 61px;
              margin-top: 8px;
            }

            img {
              width: 80%;
            }

            .avatar {
              margin-top: 14px;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              position: absolute;
            }

            .nums {
              position: absolute;
              width: 25px;
              height: 15px;
              top: 9px;
              right: 11px;
              background: #338d7b;
              border-radius: 8px 8px 8px 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 11px;
            }

            .text {
              position: absolute;
              bottom: 8px;
              min-width: 40px;
              height: 14px;
              background: #ccfff3;
              border-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #5562c7;
              line-height: 11px;
              padding: 0 5px;
              padding-top: 2px;
            }

            .Overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            background: url("../../assets/mk4_23_2.png") no-repeat;
            background-size: 100%;
            opacity: 0.9;
          }
          }

          .awardItem:nth-child(2n) {
            width: 70px;
            height: 70px;

            img {
              width: 80%;
            }
          }

          .awardItem0 {
            width: 99.5px;
            height: 99.5px;
            top: 125px;
            left: 50%;
            transform: translateX(-50%);

            img {
              margin-top: 14px;
              width: 92px;
              height: 83px;
            }
          }

          .awardItem1 {
            top: 230px;
            left: 60px;
          }

          .awardItem2 {
            top: 140px;
            left: 30px;
          }

          .awardItem3 {
            top: 60px;
            left: 55px;
          }

          .awardItem4 {
            top: 30px;
            left: 130px;
          }

          .awardItem5 {
            top: 60px;
            right: 55px;
          }

          .awardItem6 {
            top: 140px;
            right: 30px;
          }

          .awardItem7 {
            top: 230px;
            right: 60px;
          }

          .awardItem8 {
            top: 235px;
            right: 135px;
          }
        }
      }

      .bottomPart {
        width: 300px;
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        .bottom_lock {
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .gray_btn,
        .bottom_btn {
          width: 150px;
          height: 55px;
          border-radius: 27.5px;
        }

        .lock {
          position: relative;
          width: 360px;
          font-size: 14px;
          text-align: center;
          .lock_btn {
            .gray_btn {
              position: absolute;
              top: -65px;
              left: 50%;
              transform: translateX(-50%);
            }
            .lock_text {
              height: 24px;
              line-height: 24px;
              margin-top: 10px;
              color: #fff;
            }
          }
        }

        .bottom_btn {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  // 弹窗样式
  .commToast {
    .inCommToast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 284px;
      background: linear-gradient(0deg, #91a7f9, #9e73e4);
      border: 4px solid #ffe9b9;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 275px;
        height: 63px;
        position: absolute;
        transform: translateY(-50%);
      }

      .awardContainer {
        width: 300px;
        height: 180px;
        margin-top: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 13px;

        .awardItem {
          min-width: 60px;
          min-height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          .img {
            width: 60px;
            height: 60px;
            // box-sizing: border-box;
            background: #fefaef;
            border: 2px solid #826dd7;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
              width: 50px;
              height: 50px;
            }

            .lottie3 {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 20;
              width: 56px;
              height: 56px;
              box-sizing: border-box;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .avatar {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 45px;
              height: 45px;
              border-radius: 50%;
              z-index: 10;
            }
          }

          p {
            position: absolute;
            height: 12px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            bottom: -20px;
            white-space: nowrap;
            line-height: 12px;
          }

          .costume {
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            white-space: nowrap;
          }
        }
      }

      .center {
        width: auto;
        height: 82px;
        padding: 0;
        margin-top: 84px;
        display: flex;
        align-items: flex-start;

        .awardItem {
          margin-left: 8px;
        }

        .awardItem:first-child {
          margin-left: 0;
        }
      }

      .btn {
        margin-top: auto;
        margin-bottom: 23px;
        width: 160px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #a9792c;
      }
    }
  }

  //  抽奖券不足
  .commToast2 {
    width: 210px;
    height: 120px;

    .inCommToast {
      text-align: center;

      p {
        height: 17px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin: 0 0 15px;
      }

      .btns {
        margin: 20px 0;

        .btn1 {
          width: 86px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #e7faff;
          border: 2px solid #ffffff;
          border-radius: 18px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #3270b9;
          margin-right: 14px;
        }

        .btn2 {
          width: 86px;
          height: 36px;
          border: 1px solid #ffffff;
          border-radius: 18px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #a9792c;
        }
      }
    }
  }

  // 奖励概率
  .RewardDialog {
    width: 300px;
    height: 370px;

    .ThemeDialog_bgc {
      display: flex;
      justify-content: center;
      align-content: center;
      height: 100%;

      .reward_img {
        margin-top: 20px;
        width: 280px;
        height: 300px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 恭喜获得
  .obtained {
    width: 240px;
    height: 230px;
    .ThemeDialog_bgc {
      width: 100%;
      height: 100%;
      .inCommToast {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .img {
          margin-top: 30px;
          width: 60px;
          height: 60px;
          background-color: #fefaef;
          border: 3px solid #c8fff8;
          border-radius: 6px;
          text-align: center;
          img {
            width: 100%;
            margin-top: 5px;
          }
        }
        .num {
          margin-top: 10px;
          color: #fff;
          font-size: 12px;
        }
        .btn {
          width: 150px;
          height: 36px;
          border-radius: 18px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
