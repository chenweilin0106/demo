<template>
  <div
    class="SweetDumplings"
    :style="{ pointerEvents: isAnimating ? 'none' : 'auto' }"
  >
    <!--捞元宵-->
    <out-box title="title_4.png" class="box1">
      <div class="inner">
        <div class="my_info">
          <div class="fish_time flex-center">
            剩余捞取次数：<span>{{ pageData.user_tickets }}</span>
          </div>
          <div class="recharge_num flex-center">
            充值金额：<span>{{ pageData.total_recharge }}</span>
          </div>
          <div
            class="question"
            @click="openPrompt('ProbabilityDeclaration')"
          ></div>
        </div>
        <div class="btns">
          <div class="left_btn" @click="lottery(1)">捞1次</div>
          <div class="right_btn" @click="lottery(2)">捞10次</div>
        </div>
      </div>
      <div class="rule-text-box">
        <div class="rule-text">
          <ul>
            <li><span></span>活动期间，每充值20元自动获得一次捞元宵机会</li>
            <li><span></span>每次捞元宵将获得随机种类的元宵并获得额外奖励</li>
            <li><span></span>元宵可用于元宵合成，有机会获得更高级奖励</li>
            <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
            <li>卡不计算在内</li>
          </ul>
        </div>
      </div>
    </out-box>

    <!--合成-->
    <out-box title="title_13.png" class="box2">
      <div class="first_line">
        <van-notice-bar class="notice" scrollable loop>
          <div
            v-for="(item, index) in pageData.carousel"
            :key="index"
            class="text-item"
          >
            恭喜<img class="avatar" :src="item.profile_image" />
            <span class="user-name">{{ item.username }}</span
            ><span class="text">获得{{ item.remark }}</span>
          </div>
        </van-notice-bar>
        <div
          class="question2"
          @click="$refs.GameplayDescription.showPopup = true"
        ></div>
      </div>
      <div class="my_dumplings">
        <div class="left_arrow">
          <img class="tit" :src="IconPath('mk5_15.png')" />
          <img class="arrow" :src="IconPath('mk5_3.png')" />
        </div>
        <div class="right_goods">
          <div
            class="award_item"
            v-for="(item, index) in pageData.dumpling_list"
            :key="index"
          >
            <div class="award_item_inner">
              <div class="hat flex-center">{{ item.name }}</div>
              <img :src="IconPath(item.icon)" />
            </div>
            <div class="nums">
              <div class="num-inner flex-center">{{ item.nums }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="compound">
        <div class="compound-animation">
          <public-json
            ref="lanternFestival_compound_json"
            jsonName="lanternFestival_compound_json"
            :loop="false"
            :need-pause="true"
            :autoplay="false"
            @showReward="showReward"
            @DOMLoaded="DOMLoaded"
            @complete="complete"
          />
          <div
            v-if="showRewardIcon"
            class="reward-icon"
            @animationend="animationend"
          >
            <img
              v-if="dialogData[0].icon"
              :src="IconPath(dialogData[0].icon)"
              class="icon"
            />
            <public-json
              v-else-if="dialogData[0].type == 'voice'"
              jsonName="sb_klsg"
              :userAvatar="$store.state.user_icon"
            />
            <public-svga
              v-else-if="dialogData[0].type == 'mic'"
              svgaName="ts_yhcl"
              :userAvatar="$store.state.user_icon"
            />
            <public-json
              v-else-if="type == 'chat_bubble'"
              jsonName="qp_mzdm_sc"
            />
          </div>
          <transition name="fade">
            <img
              v-if="!showRewardIcon"
              :src="IconPath('mk5_6.png')"
              class="question-mark"
            />
          </transition>
        </div>
        <div
          v-for="(item, index) in selectList"
          :key="index"
          class="add"
          :class="'add' + index"
          @click="
            openPrompt('selectDumplings', {
              list: localDumplings,
              current: item,
              index
            })
          "
        >
          <img
            v-if="item.icon"
            class="dumpling"
            :src="IconPath(item.icon)"
            alt=""
          />
          <img v-else src="../../assets/mk5_4.png" />
        </div>
        <div class="center_circle">
          <div class="question3"></div>
          <div class="my_record" @click="openPrompt('myRecord')">我的记录</div>
        </div>
        <div class="btns">
          <div class="left_btn" @click="randomPut">随机放入</div>
          <div class="right_btn" @click="handleCompound">立即合成</div>
        </div>
      </div>
      <div class="skip_container flex-center">
        <img
          class="check-button"
          :src="IconPath(isSkip ? 'mk5_10_1.png' : 'mk5_10.png')"
          @click="handleSkip"
        />
        跳过动画
      </div>
      <div class="preview_award">
        <div class="preview_tit flex-center">
          <div class="left_dec"></div>
          奖励预览
          <div class="right_dec"></div>
        </div>
        <div class="award_list">
          <Marquee />
        </div>
      </div>
    </out-box>

    <!--抽奖规则-->
    <probability-declaration ref="ProbabilityDeclaration" />

    <!--合并规则-->
    <gameplay-description ref="GameplayDescription" />

    <!--选择元宵-->
    <select-dumplings ref="selectDumplings" @confirm="confirmSelect" />

    <!--我的记录-->
    <my-record ref="myRecord" />

    <!--恭喜获得-->
    <congrats-get-prompt ref="congratsGet">
      <template v-slot="{ data: { type } }">
        <public-json
          v-if="type == 'voice'"
          jsonName="sb_klsg"
          :userAvatar="$store.state.user_icon"
        />
        <public-json v-else-if="type == 'chat_bubble'" jsonName="qp_mzdm_sc" />
        <public-svga
          v-else-if="type == 'mic'"
          svgaName="ts_yhcl"
          :userAvatar="$store.state.user_icon"
        />
      </template>
    </congrats-get-prompt>

    <!--次数不足-->
    <ticket-tip-prompt
      ref="ticketTip"
      @update="getPageData({ type: 'tab', mark: 'm5' })"
    />

    <!--符石背包已满-->
    <backpack-full-prompt ref="backpackFull" />
  </div>
</template>

<script>
import { getPageData } from '../../api/index'
import { sweetDumplings } from '../../utils/pageData'
import PublicSvga from '@/pages/lanternFestival/components/PublicSvga.vue'
import PublicJson from '@/pages/lanternFestival/components/PublicJson.vue'
import Marquee from '@/pages/lanternFestival/components/MarQuee.vue'
import ProbabilityDeclaration from './components/ProbabilityDeclaration.vue'
import GameplayDescription from './components/GameplayDescription.vue'
import selectDumplings from './components/selectDumplings.vue'
import myRecord from './components/myRecord.vue'
import congratsGetPrompt from '@/pages/lanternFestival/components/congrats-get-prompt.vue'
import ticketTipPrompt from './components/ticket-tip-prompt.vue'
import BackpackFullPrompt from './components/backpack-full-prompt.vue'
import { compareVersions } from '@/pages/lanternFestival/utils/toApp'

export default {
  name: 'SweetDumplings',
  data() {
    return {
      isSkip: JSON.parse(window.localStorage.getItem('isSkip')),
      showRewardIcon: false,
      isAnimating: false,
      selectList: [],
      localDumplings: [],
      dialogData: []
    }
  },
  components: {
    BackpackFullPrompt,
    ticketTipPrompt,
    PublicSvga,
    PublicJson,
    Marquee,
    ProbabilityDeclaration,
    GameplayDescription,
    selectDumplings,
    myRecord,
    congratsGetPrompt
  },
  async created() {
    this.pageData = sweetDumplings
    await this.getPageData({ type: 'tab', mark: 'm5' })
    this.initLocalList()
    this.$store.commit('getUserIcon', this.pageData.user_icon)
  },
  methods: {
    // 跳过动画 本地缓存
    handleSkip() {
      this.isSkip = !this.isSkip
      window.localStorage.setItem('isSkip', this.isSkip)
    },
    // 初始化本地 选择元宵列表 选择元宵弹框数据
    initLocalList() {
      this.selectList = [
        {
          id: '',
          name: '',
          icon: '',
          nums: 0
        },
        {
          id: '',
          name: '',
          icon: '',
          nums: 0
        },
        {
          id: '',
          name: '',
          icon: '',
          nums: 0
        },
        {
          id: '',
          name: '',
          icon: '',
          nums: 0
        }
      ]
      this.localDumplings = JSON.parse(
        JSON.stringify(this.pageData.dumpling_list)
      )
    },
    // 选择元宵弹框 确认放入元宵
    confirmSelect(params) {
      this.selectList[params.index] = params
      this.updateSelectList()
      this.$forceUpdate()
    },
    // 更新选择列表
    updateSelectList() {
      this.localDumplings = JSON.parse(
        JSON.stringify(this.pageData.dumpling_list)
      )
      this.selectList.forEach((item) => {
        if (item.id) {
          this.localDumplings.find((el) => el.id == item.id).nums--
        }
      })
    },
    // 随机放入
    randomPut() {
      this.initLocalList()
      // Create a new array that contains the dumplings repeated according to their nums property
      const extendedArr = []
      // max count is only 4
      let count = 4
      this.localDumplings.forEach((item) => {
        for (let i = 0; i < item.nums; i++) {
          extendedArr.push(item)
        }
      })
      if (!extendedArr.length) return this.$toast('元宵数量不足')
      // If the count is greater than the number of dumplings, adjust it
      if (count > extendedArr.length) {
        count = extendedArr.length
      }
      // Randomly select 'count' dumplings from the extended array
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * extendedArr.length)
        this.selectList[i] = extendedArr[randomIndex]
        // Remove the selected dumpling from the extended array
        extendedArr.splice(randomIndex, 1)
      }
      this.updateSelectList()
    },
    // 捞元宵
    async lottery(mark) {
      const num = mark == 1 ? 1 : 10
      if (this.pageData.user_tickets < num) return this.openPrompt('ticketTip')
      const res = await getPageData({ type: 'lantern_day_lottery', mark })
      if (res.errno == 3) return this.openPrompt('ticketTip')
      if (res.errno) return this.$toast(res.errmsg)
      const { user_tickets, dumpling_list, award1, award2 } = res.data
      this.pageData = { ...this.pageData, user_tickets, dumpling_list }
      // 初始化本地数据
      this.initLocalList()
      const params = [...award1, ...award2]
      this.openPrompt('congratsGet', params)
    },
    // 合成
    async handleCompound() {
      if (this.isAnimating) return
      const params = this.selectList.filter((item) => item.id)
      if (params.length < 2) return this.$toast('至少要2个元宵才可合成')
      const array = params.map((item) => item.id)
      const res = await getPageData({
        type: 'lantern_day_merge',
        mark: JSON.stringify({ ids: array })
      })
      if (res.errno == -5 || res.errno == -6) {
        return this.backpackFull(res.errno)
      }
      if (res.errno) return this.$toast(res.errmsg)
      this.pageData.dumpling_list = res.data.dumpling_list
      this.dialogData = [res.data.award]
      if (this.isSkip) {
        this.initLocalList()
        this.openPrompt('congratsGet', this.dialogData)
      } else {
        this.isAnimating = true
        this.$refs.lanternFestival_compound_json.playJson()
      }
    },
    // 符石背包不足处理
    backpackFull(errno) {
      const app_version = this.$store.state.app_version
      const flag = compareVersions(app_version, '5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      const fullBagType = errno == -5 ? 1 : 2
      this.openPrompt('backpackFull', fullBagType)
    },
    // json动画结束
    complete() {
      console.log('动画结束')
      this.$refs.lanternFestival_compound_json.goToAndStop()
    },
    // 奖励图标消失
    animationend() {
      this.showRewardIcon = false
      this.isAnimating = false
      this.openPrompt('congratsGet', this.dialogData)
    },
    // 开始奖励图标动画
    showReward() {
      this.initLocalList()
      this.showRewardIcon = true
      console.log('48到了，展示奖励')
    },
    // json动画加载完成跳转到第一帧
    DOMLoaded() {
      // this.$refs.lanternFestival_compound_json.goToAndStop()
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.SweetDumplings {
  margin-top: 60px;

  .box1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1410px;

    .inner {
      width: 696px;
      height: 1100px;
      background-image: url('../../assets/mk5_2.png');
      background-size: 100% 100%;
      margin-top: 44px;
      position: relative;

      .my_info {
        display: flex;
        align-items: center;
        margin-top: 14px;

        .fish_time {
          width: fit-content;
          height: 42px;
          background: linear-gradient(90deg, #5f253a, #7c1022);
          box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
          border-radius: 0px 21px 21px 0px;
          display: flex;
          align-items: center;
          padding-left: 17px;
          padding-right: 19px;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;

          span {
            color: #fffaa6;
          }
        }

        .recharge_num {
          margin-left: 20px;
          width: fit-content;
          height: 42px;
          background: linear-gradient(90deg, #5f253a, #7c1022);
          box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
          border-radius: 21px;
          display: flex;
          align-items: center;
          padding-left: 18px;
          padding-right: 26px;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;

          span {
            color: #fffaa6;
          }
        }

        .question {
          width: 42px;
          height: 42px;
          background-image: url('../../assets/mk5_1.png');
          background-size: 100% 100%;
          margin-right: 24px;
          margin-left: auto;
        }
      }

      .btns {
        width: 100%;
        position: absolute;
        bottom: 64px;
        display: flex;
        align-items: center;
        justify-content: center;

        .left_btn,
        .right_btn {
          width: 256px;
          height: 84px;
          background-image: url('../../assets/btn_4.png');
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
        }

        .right_btn {
          margin-left: 64px;
          background-image: url('../../assets/btn_5.png');
          color: #de392a;
        }
      }
    }

    .rule-text-box {
      margin-top: -24px;
      width: 670px;
      height: 240px;
      background: linear-gradient(0deg, #4f1b10, #7d2725);
      border-radius: 12px;
      overflow: hidden;
    }

    .rule-text {
      width: 614px;
      margin-top: 24px;
      margin-left: 38px;

      li {
        line-height: 40px;

        span {
          top: 12px;
        }
      }
    }
  }

  .box2 {
    margin-top: 117px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    .first_line {
      display: flex;
      align-items: center;
      margin-top: 59px;
      margin-left: 26px;

      .notice {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        width: 600px;
        height: 48px;
        background: linear-gradient(90deg, #5f253a, #7c1022);
        box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
        border-radius: 24px;
        font-size: 28px;
        color: #ffffff;
        overflow: hidden;
        padding: 0;

        ::v-deep .van-notice-bar__content {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: center;
          padding-left: 20px;
        }

        .text-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          height: 100%;
          margin-right: 40px;

          .avatar {
            display: block;
            margin: 0 10px;
            width: 36px;
            height: 36px;
            background: #7e2725;
            border-radius: 50%;
          }

          .user-name {
            margin-right: 10px;
            font-size: 28px;
            font-weight: 600;
            color: #fffaa6;
          }

          .text {
            font-size: 28px;
            color: #ffffff;
          }
        }
      }

      .question2 {
        margin-left: 14px;
        width: 42px;
        height: 42px;
        background-image: url('../../assets/mk5_1.png');
        background-size: 100% 100%;
      }
    }

    .my_dumplings {
      margin: 17px auto 0;
      //margin-top: 17px;
      width: 670px;
      height: 210px;
      background: linear-gradient(90deg, #5f253a, #7c1022);
      box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      display: flex;
      align-items: center;

      .left_arrow {
        width: 60px;
        height: 210px;
        background: linear-gradient(90deg, #5f253a, #7c1022);
        box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
        border-radius: 12px 0px 0px 12px;
        display: flex;
        align-items: center;
        padding-left: 9px;

        .tit {
          display: block;
          margin-right: 9px;
          width: 27px;
          height: 113px;
        }

        .arrow {
          width: 10px;
          height: 20px;
        }
      }

      .right_goods {
        flex-grow: 1;
        display: flex;
        align-items: center;
        padding: 0 12px;
        justify-content: space-between;
        align-self: flex-start;
        margin-top: 28px;

        .award_item {
          position: relative;
          width: 140px;
          height: 140px;
          background: linear-gradient(0deg, #f94e3c, #ffc677);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;

          .award_item_inner {
            width: 132px;
            height: 132px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            background: #ffe5bd;
            border-radius: 12px;
            overflow: hidden;
            padding-top: 10px;

            .hat {
              position: absolute;
              top: -4px;
              left: 50%;
              transform: translateX(-50%);
              width: 120px;
              height: 28px;
              background: url('@/pages/lanternFestival/assets/mk5_14.png')
                no-repeat left top/100% 100%;
              font-size: 18px;
              font-weight: 600;
              color: #ffe2b6;
              padding-top: 4px;
            }

            img {
              height: 110%;
              //margin-top: 1px;
            }
          }

          .nums {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 50%);
            width: 100px;
            height: 32px;
            border-radius: 18px;
            padding: 2px;
            background: linear-gradient(0deg, #f94e3c, #ffc677);

            .num-inner {
              background: #f94e3c;
              width: 100%;
              height: 100%;
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              border-radius: 16px;
              line-height: 100%;
            }
          }
        }
      }
    }

    .compound {
      position: relative;
      margin: -76px auto 0;
      width: 690px;
      height: 690px;

      .compound-animation {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .question-mark {
          position: absolute;
          top: 301px;
          left: 50%;
          transform: translateX(-50%);
          width: 59px;
          height: 85px;
        }

        .reward-icon {
          position: absolute;
          z-index: 3;
          top: 250px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 160px;
          pointer-events: none;
          animation: show linear 1.5s forwards;

          .icon {
            width: 100%;
            height: 100%;
          }

          .PublicSvga {
            ::v-deep .micAvatar_img {
              width: 80%;
              height: 80%;
            }

            ::v-deep .svga_box {
              width: 100%;
            }
          }

          .PublicJson {
            ::v-deep .micAvatar_img {
              //top: 50%;
              //left: 50%;
              //transform: translate(-50%, -50%);
              width: 70%;
              height: 70%;
            }

            ::v-deep .json_box {
              width: 100%;
            }
          }
        }

        @keyframes show {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(100%);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%);
          }
        }
      }

      .add {
        width: 112px;
        height: 112px;
        background-image: url('../../assets/mk5_5.png');
        background-size: 100% 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 60px;
          height: 60px;
        }

        .dumpling {
          width: 100%;
          height: auto;
        }
      }

      .add0 {
        top: 133px;
        left: 28px;
      }

      .add1 {
        top: 133px;
        right: 28px;
      }

      .add2 {
        bottom: 136px;
        left: 28px;
      }

      .add3 {
        bottom: 136px;
        right: 28px;
      }

      .center_circle {
        width: 220px;
        height: 220px;
        //background-image: url('../../assets/mk5_7.png');
        //background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        z-index: 10;
        top: 234px;
        left: 235px;

        //.question3 {
        //  width: 59px;
        //  height: 85px;
        //  background-image: url('../../assets/mk5_6.png');
        //  background-size: 100% 100%;
        //  margin-top: 67px;
        //}

        .my_record {
          width: 188px;
          height: 48px;
          background-image: url('../../assets/mk5_8.png');
          background-size: 100% 100%;
          margin-bottom: -3px;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          position: relative;
        }
      }

      .btns {
        width: 100%;
        position: absolute;
        bottom: -3px;
        display: flex;
        align-items: center;
        justify-content: center;

        .left_btn,
        .right_btn {
          width: 256px;
          height: 84px;
          background-image: url('../../assets/btn_4.png');
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
        }

        .right_btn {
          margin-left: 64px;
          background-image: url('../../assets/btn_5.png');
          color: #de392a;
        }
      }
    }

    .skip_container {
      font-size: 32px;
      font-weight: 600;
      color: #dcc0b9;
      margin-top: 37px;

      .check-button {
        width: 40px;
        height: 40px;
        margin-right: 14px;
      }
    }

    .preview_award {
      margin: 18px auto 70px;
      width: 668px;
      height: 280px;
      background-image: url('../../assets/mk5_11.png');
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .preview_tit {
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
        margin-top: 32px;
        line-height: 32px;

        .left_dec {
          width: 131px;
          height: 24px;
          background-image: url('../../assets/mk4_9.png');
          background-size: 100% 100%;
          margin-right: 34px;
        }

        .right_dec {
          width: 131px;
          height: 24px;
          background-image: url('../../assets/mk4_9.png');
          background-size: 100% 100%;
          transform: rotate(180deg);
          margin-left: 34px;
        }
      }

      .award_list {
        display: flex;
        align-items: center;
        margin-top: 28px;
        padding: 0 5px;
        width: 100%;
        overflow: hidden;

        .award_item {
          width: 140px;
          height: 140px;
          background: linear-gradient(0deg, #f94e3c, #ffc677);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;

          .award_item_inner {
            width: 132px;
            height: 132px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            background: #ffe5bd;
            border-radius: 12px;

            .hat {
              width: 120px;
              height: 28px;
              border-radius: 12px;
              background-image: url('../../assets/mk5_14.png');
              background-size: 100% 100%;
              margin-top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              font-weight: 600;
              color: #ffe2b6;
            }

            img {
              width: 97px;
              height: 97px;
              margin-top: 1px;
            }
          }
        }
      }
    }
  }
}
</style>
