<template>
  <div class="LovePray">
    <!-- 五日签到 -->
    <out-box class="fiveDaySignIn" title="tt_07.png">
      <div class="content-1 margin-row-center">
        <div class="position-relative signArea flex w-100 h-100 overflow-y-hidden overflow-x-scroll" ref="Xlist">
          <div class="signItem" v-for="(item, index) in sign_list" :key="index">
            <div class="award position-relative flex-column align-center">
              <img :src="IconPath('yhb_l.png')" />
              <div class="num position-absolute text-nowrap">x1</div>
              <div class="bottom flex align-center justify-center position-absolute text-nowrap">{{ item.date_text }}</div>

              <div class="btn position-absolute position-row-center" :class="{ nosign: item.status == 0, notSign: item.status == 1 }">
                {{ item.status == 2 ? '已签到' : item.status == 1 ? '即将开始' : '未签到' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-text">
        <ul>
          <li><span></span>活动期间，每充值30元自动获得祈愿币1个，每日</li>
          <li>签到也可领取祈愿币1个</li>
          <li><span></span>获得樱花池中的【一箭钟情】礼物赠送权即可解锁</li>
          <li>摩天轮奖池</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
        </ul>
      </div>
    </out-box>

    <out-box class="bgimg overflow-x-hidden overflow-y-hidden" :class="isAnimating && 'pointer-none'">
      <div class="switchTabs flex w-100 position-relative" :class="{ 'switchTabs-active': isSeniorPool }">
        <div class="tabs flex-1 h-100" v-for="tab in tabList" :key="tab" @click="tabActive = tab"></div>
        <img :src="IconPath('mk4_4.png')" class="tag_img position-absolute pointer-none" />
      </div>

      <!-- 抽奖券数量展示 -->
      <div class="pLine flex align-center justify-between flex-no-wrap position-relative">
        <p class="awardTicketP position-relative flex-shrink-0 ellipsis flex align-center">
          拥有{{ lotteryIconName }}<img :src="IconPath(lotteryIcon)" />：<span>
            {{ ticket_nums }}
          </span>
          <img :src="IconPath('add.png')" class="recharge position-absolute position-column-center" @click="recharge" />
        </p>
        <p class="awardTicketP2 flex align-center flex-shrink-0 ellipsis">
          已充值：<span>{{ recharge_nums }}</span>
        </p>
      </div>

      <!-- 奖励概率 -->
      <img :src="IconPath('detal.png')" class="reward_probability position-absolute" @click="openPrompt('playRule', isNormalPool ? 1 : 2)" />

      <!-- 普通奖池 -->
      <div class="awardPowl" v-show="isNormalPool">
        <div class="awards">
          <div class="awardItem" :class="'awardItem' + [index]" v-for="(item, index) in simple_lottery_list" :key="index">
            <img v-if="index == 0" :src="IconPath('99.png')" class="price-label position-absolute" />
            <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
            <div v-if="item.number === 0" :class="{ Overlay: item.number === 0 }"></div>

            <div class="nums line-height-100" v-if="item.number > 1 && index != 0">x{{ item.number }}</div>
            <div class="text line-height-100">{{ item.text }}</div>
          </div>
        </div>
      </div>

      <!-- 高级奖池 -->
      <div class="ferrisWheel" v-show="isSeniorPool">
        <!--架子-->
        <div class="hanger position-absolute" :class="isAnimating && 'hangerRotate-animation'" @animationend.self="animationEnd">
          <div
            v-for="(item, index) in senior_lottery_list"
            :key="index"
            class="award-item position-absolute pointer-none flex justify-center"
            :class="['award-item-' + (index + 1), item.id == 8 && 'special-award', isAnimating && 'rewardRotate-animation']"
          >
            <!--价值label-->
            <img v-if="item.id == 8" :src="IconPath('328.png')" class="price-label position-absolute" />

            <!--数量label-->
            <div v-if="item.number > 1 && item.id == 5" class="num-label position-absolute flex justify-center text-nowrap">
              限量{{ item.number }}份
            </div>

            <!--遮盖层-->
            <img
              v-if="item.number == 0 && item.type == 'luck_key'"
              :src="IconPath('mk4_28.png')"
              class="overly position-absolute position-row-center"
            />

            <!--奖励图标-->
            <img :src="IconPath(item.icon)" class="award_icon" />

            <!--数量-->
            <div class="text-box flex justify-center position-absolute text-nowrap position-row-center">
              {{ item.text }}
            </div>
          </div>
        </div>

        <!--星星-->
        <img :src="IconPath('mtl_03.png')" class="star position-absolute position-row-center" />
      </div>

      <!--抽奖按钮-->
      <div
        v-show="!(isNormalPool && isSimpleLotteryListEmpty)"
        class="pool-button flex align-center justify-center position-absolute position-row-center"
        :class="lotteryButtonsClass"
      >
        <!--抽1次-->
        <img
          v-show="isNormalPool || !is_locker"
          class="left-button"
          :src="IconPath(isNormalPool ? 'btn_1.png' : 'btn_qd_01.png')"
          @click="throttlewish(1)"
        />

        <!--抽5次-->
        <img
          v-show="isNormalPool || !is_locker"
          :class="['right-button', isNormalPool && simple_count <= 4 && 'pointer-none']"
          :src="IconPath(rightButtonIcon)"
          @click="throttlewish(2)"
        />

        <!--未解锁-->
        <img v-show="is_locker && isSeniorPool" :src="IconPath('btn_an.png')" class="lock-button" />
      </div>

      <!--底部提示-->
      <img
        v-show="bottomTipIcon"
        :src="IconPath(bottomTipIcon)"
        class="pointer-none"
        :class="`bottom-tip-${isNormalPool ? (isSimpleLotteryListEmpty ? '3' : '1') : '2'}`"
      />
    </out-box>

    <!--恭喜获得-->
    <congrats-get-prompt ref="congratsGet" />

    <!--玩法说明-->
    <play-rule-prompt ref="playRule" />

    <!--许愿币不足-->
    <DiamondLessPopup ref="diamondLess" @recharge="recharge" />
  </div>
</template>

<script>
import DiamondLessPopup from './components/DiamondLessPopup.vue'
import PlayRulePrompt from '@/pages/whiteValentine/views/LovePray/components/play-rule-prompt.vue'
import CongratsGetPrompt from '@/pages/whiteValentine/components/congrats-get-prompt.vue'
// 充值方法导入
import { recharge } from '../../utils/toApp'
// 导入请求
import { getPageData } from '../../api/index'
import { lovePray } from '../../utils/pageData'
import { _throttle } from '../../utils/tool.js'

export default {
  // 奖励兑换
  name: 'LovePray',
  components: { CongratsGetPrompt, PlayRulePrompt, DiamondLessPopup },
  data() {
    return {
      lotteryResult: {},
      isAnimating: false,
      lotteryIcon: 'yhb_3.png',
      lotteryIconName: '祈愿币',
      tabActive: '普通奖池',
      tabList: ['普通奖池', '高级奖池'],
      is_sign_in: true, // 是否当日首次签到(true-是，false-不是）,首次签到需要弹框
      ticket_nums: '0', // 抽奖券数量
      recharge_nums: 0, // 已充值数量
      is_locker: true, // 高级奖池锁状态：true-锁状态，false-已解锁
      simple_count: 0, // 普通奖池剩余可抽奖品数，如果小于10，则许愿10次按钮置灰
      sign_list: [], // 签到列表
      senior_lottery_list: [],
      senior_lottery_list_length: 0,
      simple_lottery_list: []
    }
  },
  computed: {
    // 判断普通奖池是否抽完，抽完隐藏抽奖按钮
    isSimpleLotteryListEmpty() {
      return this.simple_lottery_list.every((item) => item.number == 0)
    },
    // 普通奖池
    isNormalPool() {
      return this.tabActive == '普通奖池'
    },
    // 高级奖池
    isSeniorPool() {
      return this.tabActive == '高级奖池'
    },
    // 底部抽奖按钮类名
    lotteryButtonsClass() {
      return this.isNormalPool ? (this.is_locker ? 'pool-button-1' : 'pool-button-2') : 'pool-button-3'
    },
    // 底部提示图标
    bottomTipIcon() {
      return this.is_locker ? (this.isSeniorPool ? 'text_02.png' : '') : this.isNormalPool ? 'text_01.png' : ''
    },
    // 右侧抽奖按钮图标
    rightButtonIcon() {
      return this.isNormalPool ? (this.simple_count > 4 ? 'btn_5.png' : 'btn_5_an.png') : 'btn_qd_10.png'
    }
  },
  async mounted() {
    this.senior_lottery_list = lovePray.senior_lottery_list
    this.simple_lottery_list = lovePray.simple_lottery_list
    this.sign_list = lovePray.sign_list

    // 初始化数据
    const res = await this.init()
    if (res.errno) return this.$toast(res.errmsg)
    this.is_sign_in = res.data.is_sign_in
    this.ticket_nums = res.data.ticket_nums
    this.is_locker = res.data.is_locker
    this.simple_lottery_list = res.data.simple_lottery_list
    this.simple_count = res.data.simple_count
    this.senior_lottery_list = res.data.senior_lottery_list
    this.sign_list = res.data.sign_list
    this.recharge_nums = res.data.recharge_nums

    // 判断高级奖池解锁状态
    if (!this.is_locker) {
      this.tabActive = '高级奖池'
    }
    // 设置签到弹窗滑到最右边
    if (this.sign_list[this.sign_list.length - 1].status != 1) {
      this.$nextTick(() => {
        this.$refs.Xlist.scrollTo({
          left: this.$refs.Xlist.scrollWidth,
          behavior: 'smooth'
        })
      })
    }
    // 首次签到需要弹框
    if (this.is_sign_in) {
      this.openPrompt('congratsGet', [{ icon: 'yhb_l.png', text: '+1' }])
    }
  },
  methods: {
    // 绑定监听页面呼出事件
    listenerHiddenStatus(fn) {
      document.addEventListener('visibilitychange', fn)
    },
    // 监听页面呼出回调函数
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        // 页面刷新
        this.init().then((res) => {
          // 弹窗状态改变
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
    recharge() {
      this.listenerHiddenStatus(this.hiddenFn)
      recharge()
    },
    // 初始化数据方法
    init() {
      return getPageData({
        mark: 'm5',
        type: 'tab'
      })
    },
    // 节流许愿
    throttlewish: _throttle(function (mark, type) {
      if (this.isAnimating) return
      // 不足一个
      if (this.ticket_nums < 1) {
        return this.openPrompt('diamondLess')
      }
      // 普通奖池 不足5个
      if (this.isNormalPool && mark == 2 && this.ticket_nums < 5) {
        return this.openPrompt('diamondLess')
      }
      // 高级奖池 不足10个
      if (this.isSeniorPool && mark == 2 && this.ticket_nums < 10) {
        return this.openPrompt('diamondLess')
      }
      const lotteryType = `garden_party_${this.isSeniorPool ? 'senior' : 'comm'}_lottery`
      this.wish(mark, lotteryType)
    }, 2000),
    // 许愿
    wish: _throttle(function (mark, type) {
      getPageData({
        mark,
        type
      }).then((res) => {
        // 抽奖失败
        if (res.errno == -1) {
          this.$toast(res.errmsg)
        }
        // 奖卷不足充值
        if (res.errno == 3) {
          this.openPrompt('diamondLess')
        }
        // 成功
        if (res.errno == 0) {
          // 高级奖池奖池
          if (type == 'garden_party_senior_lottery') {
            this.lotteryResult = res
            this.isAnimating = true
          } else {
            this.updateData(res)
          }
        }
      })
    }, 2000),
    animationEnd(event) {
      // console.log(event)
      this.updateData(this.lotteryResult)
      this.isAnimating = false
    },
    updateData(res) {
      this.ticket_nums = res.data.ticket_nums
      this.openPrompt('congratsGet', res.data.awards)
      // 刷新页面
      this.init().then((res) => {
        this.simple_lottery_list = res.data.simple_lottery_list
        this.senior_lottery_list = res.data.senior_lottery_list
        this.is_locker = res.data.is_locker
        this.simple_count = res.data.simple_count
      })
    },
    // 切换奖池
    handlerChangeTab(tab) {
      this.tabActive = tab
    }
  }
}
</script>

<style lang="scss">
// 定义转动动画
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.LovePray {
  overflow: hidden;
  // 五日签到样式
  .fiveDaySignIn {
    margin-top: -25px;
    margin-bottom: 20px;
    padding-top: 178px;
    height: 806px;

    .content-1 {
      width: 696px;
      height: 300px;
      background: rgba(252, 172, 181, 0.3);
      padding-right: 10px;
    }

    .signArea {
      padding-top: 19px;

      .signItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 11px;

        .award {
          width: 148px;
          height: 184px;
          background: url('@/pages/whiteValentine/assets/qd_bg.png') no-repeat left top/100% 100%;
          padding-top: 23px;

          > img {
            width: 81px;
            height: 80px;
          }

          .num {
            right: 15px;
            bottom: 58px;
            font-weight: 500;
            font-size: 24px;
            color: #c16d6f;
          }

          .bottom {
            bottom: 13px;
            font-weight: 500;
            font-size: 24px;
            color: #ffffff;
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
          bottom: -77px;
          width: 124px;
          height: 64px;
          background: linear-gradient(0deg, #a3a3a3, #dddddd);
          border-radius: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #ffffff;
        }

        .nosign {
          background: linear-gradient(0deg, #a3a3a3, #dddddd);
          opacity: 0.6;
        }

        .notSign {
          background: none;
          font-weight: 500;
          font-size: 24px;
          color: #c16d6f;
        }
      }

      .signItem:first-child {
        margin-left: 8px;
      }

      .signItem:last-child {
        margin-right: 8px;
      }
    }

    .rule-text {
      margin-top: 30px;
      margin-left: 82px;
      width: 605px;
      line-height: 40px;

      span {
        top: 12px;
      }
    }
  }

  .bgimg {
    margin-bottom: 170px;
    padding-top: 136px;
    position: relative;
    min-height: 1392px;
    max-height: 1498px;

    .switchTabs {
      width: 687px;
      height: 98px;
      margin: 0 auto;
      background: url('@/pages/whiteValentine/assets/tab_yhc.png') no-repeat left top/100% 100%;
      z-index: 11;

      .tag_img {
        top: -33px;
        right: 8px;
        width: 142px;
        height: 61px;
      }
    }

    .switchTabs-active {
      background-image: url('@/pages/whiteValentine/assets/tab_mtl.png');
    }

    .pLine {
      z-index: 2;
      margin-top: 26px;
      padding: 0 31px;

      .awardTicketP {
        max-width: 370px;
        padding: 0 100px 0 21px;
        height: 48px;
        background: linear-gradient(90deg, #df7472, #f19c92);
        border-radius: 24px;
        font-weight: 500;
        font-size: 28px;
        color: #ffffff;

        > img {
          width: 37px;
          height: 36px;
          margin: 0 5px;
        }

        .recharge {
          right: -9px;
          width: 52px;
          height: 52px;
        }
      }

      .awardTicketP2 {
        padding: 0 29px 0 23px;
        max-width: 262px;
        height: 48px;
        background: linear-gradient(90deg, #df7472, #f19c92);
        border-radius: 24px;
        font-weight: 500;
        font-size: 28px;
        color: #ffffff;

        .special {
          color: #fffaa6;
          line-height: 11px;
        }
      }
    }

    .reward_probability {
      z-index: 2;
      top: 326px;
      right: 31px;
      width: 92px;
      height: 94px;
    }

    .awards,
    .ferrisWheel {
      //margin-top: -45px;
      width: 100%;
      min-height: 593px;
      //background: url('../../assets/mk4_15.png') no-repeat;
      background-size: 100%;
      position: relative;
      z-index: 0;
    }

    // 普通奖池
    .awardPowl {
      margin-top: 43px;
      position: relative;
      width: 100%;
      height: 751px;
      background: url('@/pages/whiteValentine/assets/yhc_bg.png') no-repeat left top/100% 100%;

      .awards {
        width: 100%;
        height: 100%;

        .awardItem {
          width: 193px;
          height: 211px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          background: url('@/pages/whiteValentine/assets/mk4_10.png') no-repeat left top/100% 100%;

          .price-label {
            margin-top: 0;
            z-index: 5;
            top: 24px;
            left: -11px;
            width: 125px;
            height: 35px;
          }

          img {
            margin-top: 20px;
            width: 50%;
          }

          .Overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 194px;
            height: 194px;
            z-index: 3;
            background: url('@/pages/whiteValentine/assets/mk4_11.png') no-repeat left top/100% 100%;
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
            top: 20px;
            right: 20px;
            min-width: 50px;
            height: 30px;
            background: #df7472;
            border-radius: 0px 16px 0px 12px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #ffffff;
            padding: 0 10px;
          }

          .text {
            min-width: 80px;
            height: 28px;
            background: #fff4a7;
            border-radius: 14px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 24px;
            color: #df5619;
          }
        }

        .awardItem0 {
          width: 249px;
          height: 277px;
          background: url('@/pages/whiteValentine/assets/mk4_9.png') no-repeat left top/100% 100%;
          top: 240px;
          left: 50%;
          transform: translateX(-50%);

          img {
            width: 60%;
            margin-top: 43px;
          }

          .Overlay {
            width: 251px;
            height: 251px;
            background: url('@/pages/whiteValentine/assets/mk4_12.png') no-repeat left top/100% 100%;
          }

          .nums {
            right: 27px;
            top: 4px;
          }

          .text {
            margin-top: -10px;
            color: #ffffff;
            background-color: #df7472;
          }
        }

        .awardItem1 {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .awardItem2 {
          top: 70px;
          right: 76px;
        }

        .awardItem3 {
          top: 277px;
          right: 19px;
        }

        .awardItem4 {
          bottom: 76px;
          right: 71px;
        }

        .awardItem5 {
          bottom: 13px;
          left: 50%;
          transform: translateX(-50%);
        }

        .awardItem6 {
          bottom: 76px;
          left: 64px;
        }

        .awardItem7 {
          top: 277px;
          left: 19px;
        }

        .awardItem8 {
          top: 70px;
          left: 74px;
        }
      }
    }

    // 高级奖池
    .ferrisWheel {
      position: relative;
      z-index: 1;
      margin-top: -158px;
      width: 750px;
      height: 1336px;
      margin-bottom: 12px;
      //overflow: hidden;
      background: url('@/pages/whiteValentine/assets/mtl_01.png') no-repeat left top/100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .star {
        z-index: 3;
        left: 50%;
        top: 547px;
        width: 150px;
        height: 145px;
      }

      .hanger {
        z-index: 2;
        top: 302px;
        left: 55px;
        width: 642px;
        height: 642px;
        background: url('@/pages/whiteValentine/assets/mtl_04.png') no-repeat left top/100% 100%;

        .award-item {
          position: absolute;
          width: 242px;
          height: 221px;
          background: url('@/pages/whiteValentine/assets/mtl_07.png') no-repeat left top/100% 100%;

          .num-label {
            z-index: 3;
            top: 32px;
            right: 10px;
            width: 122px;
            height: 51px;
            background: url('@/pages/whiteValentine/assets/mk4_27.png') no-repeat left top/100% 100%;
            font-weight: 500;
            font-size: 22px;
            color: #ffffff;
            padding-top: 8px;
          }

          .price-label {
            left: -15px;
            top: 3px;
            width: 135px;
            height: 35px;
          }

          .overly {
            z-index: 2;
            top: 69px;
            width: 161px;
            height: 113px;
          }

          .award_icon {
            margin-top: 70px;
            width: 107px;
            height: 107px;
          }

          .text-box {
            bottom: -21px;
            width: 178px;
            height: 64px;
            padding-top: 16px;
            font-weight: 500;
            font-size: 23px;
            color: #fefeff;
            background: url('@/pages/whiteValentine/assets/mtl_08.png') no-repeat left top/100% 100%;
          }
        }

        .special-award {
          background: url('@/pages/whiteValentine/assets/mtl_05.png') no-repeat left top/100% 100%;

          .text-box {
            width: 198px;
            background: url('@/pages/whiteValentine/assets/mtl_06.png') no-repeat left top/100% 100%;
          }
        }

        .award-item-1 {
          top: -55px;
          left: 200px;
        }

        .award-item-2 {
          top: 20px;
          right: 12px;
        }

        .award-item-3 {
          top: 195px;
          right: -70px;
        }

        .award-item-4 {
          bottom: 34px;
          right: 10px;
        }

        .award-item-5 {
          bottom: -55px;
          left: 200px;
        }

        .award-item-6 {
          bottom: 34px;
          left: 10px;
        }

        .award-item-7 {
          top: 195px;
          left: -70px;
        }

        .award-item-8 {
          top: 20px;
          left: 12px;
        }
      }

      .hangerRotate-animation {
        animation: rotate 2.5s linear;
      }

      .rewardRotate-animation {
        animation: rotate 2.5s linear reverse;
      }

      //.reward-content {
      //  top: 302px;
      //  left: 55px;
      //  z-index: 4;
      //  width: 642px;
      //  height: 642px;
      //}
    }

    .pool-button {
      z-index: 3;

      .left-button,
      .right-button,
      .lock-button {
        width: 334px;
        height: 144px;
      }

      .right-button {
        margin-left: 28px;
      }

      .lock-button {
      }
    }

    .pool-button-1 {
      bottom: 96px;
    }

    .pool-button-2 {
      bottom: 202px;
    }

    .pool-button-3 {
      bottom: 130px;
    }
    // 普通奖池 底部提示 奖励未抽完
    .bottom-tip-1 {
      display: block;
      margin: 195px auto 45px;
      width: 470px;
      height: 146px;
    }
    // 普通奖池 底部提示 奖励抽完
    .bottom-tip-3 {
      display: block;
      margin: 45px auto;
      width: 470px;
      height: 146px;
    }
    // 高级奖池 底部提示
    .bottom-tip-2 {
      position: absolute;
      z-index: 3;
      bottom: 70px;
      left: 23px;
      width: 727px;
      height: 62px;
    }
  }
}
</style>
