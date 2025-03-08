<template>
  <div class="NameInList">
    <!-- 财神宝座 -->
    <div class="throne">
      <div class="title">
        <div class="titleText">
          <div class="topText">
            <img src="../../assets/mk6_1.png" alt="" />
          </div>
          <div @click="handleClickDetails" class="showDetailsDialog">
            <img src="../../assets/mk6_2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="throne-box">
        <!-- 财神奖励 -->
        <div
          v-for="(item, index) in rewardsList"
          :key="index"
          class="throne_rewards_item throne_rewards_item"
        >
          <div v-if="item.rank === 1" class="balloon">
            <public-json
              :lottieJson_name="'ts_csll'"
              :lottieJson="jsonlottie.csll"
              :userAvatar="$store.getters.user_icon"
            ></public-json>
            <img src="../../assets/mk6_19.png" alt="" />
            <div class="topOneName">
              {{ count_down == -1 ? '虚位以待' : preHour_user?.my_username }}
            </div>
          </div>
          <div v-if="item.rank === 7" class="balloon">
            <public-json
              :lottieJson_name="'ts_ndjl'"
              :lottieJson="jsonlottie.ndjl"
              :userAvatar="$store.getters.user_icon"
            ></public-json>
          </div>
          <div class="balloon">
            <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
          </div>
          <div v-if="item.rank !== 1" class="rewards_bottom">
            {{ item?.text }}
          </div>
        </div>
      </div>
      <div class="limitedText">限量前1000名可获得</div>
      <button
        :disabled="disableBtn"
        class="throne-btn"
        :class="{
          theme_botton_did:btnState === 1,
          theme_botton_did:btnState === 2,
          theme_botton_done:btnState === 3
        }"
        @click="handleGetRewards()"
      >
        {{ btnState === 2 ? '已领取' : btnState === 1 ? '沾财气' : '已领完' }}
      </button>
    </div>
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
            tab == '日榜' && tabActive == tab
              ? IconPath('mk6_11_1.png')
              : tab == '小时榜' && tabActive == tab
              ? IconPath('mk6_10.png')
              : tab != '小时榜' && tabActive != tab
              ? IconPath('mk6_11.png')
              : IconPath('mk6_10_1.png')
          "
          alt=""
        />
      </div>
    </div>
    <div class="outComm">
      <div class="rewardList">
        <div class="rewards_img">
          <img src="../../assets/mk6_17.png" alt="" />
        </div>
        <div class="prize">
          <div class="prize_gift">
            <div class="prize_gift_item">
              <div class="prize_item">
                <img
                  v-if="tabActive == '日榜'"
                  :src="IconPath('ljs_120_120.png')"
                  alt=""
                />
                <public-json
                  v-else
                  :lottieJson_name="'ts_csll'"
                  :lottieJson="jsonlottie.csll"
                  :userAvatar="$store.getters.user_icon"
                ></public-json>
              </div>
              <div v-if="tabActive !== '日榜'" class="prize_text">
                头饰+1小时
              </div>
            </div>
            <div class="prize_gift_item">
              <div class="prize_item">
                <img
                  v-if="tabActive == '日榜'"
                  :src="IconPath('lhq_120_120.png')"
                  alt=""
                />
                <img v-else :src="IconPath('jb2_120_120.png')" alt="" />
              </div>
              <div v-if="tabActive !== '日榜'" class="prize_text">
                金币+50万
              </div>
            </div>
          </div>
          <div
            v-if="tabActive === '日榜'"
            class="details"
            @click="showRewardsDetailsDialog"
          >
            奖励详情
          </div>
        </div>
        <div class="switchRank">
          <hourlyList
            :count_down="formatTime"
            :hour_rank="hour_rank"
            v-if="tabActive === '小时榜'"
          ></hourlyList>
          <dailyList v-if="tabActive === '日榜'"></dailyList>
        </div>
      </div>
      <div class="activity_explain">
        <div class="explain_text">
          <div class="circle"></div>
          <div class="text">活动分为小时榜和日榜，均为分服统计。</div>
        </div>
        <div class="explain_text">
          <div class="circle"></div>
          <div class="text">
            小时榜统计每日19:00-22:00
            <span class="special">每小时内赠送钻石礼物礼物</span>
            价值最高的玩家，结算时榜一玩家将成为下个小时的财神
          </div>
        </div>
        <div class="explain_text">
          <div class="circle"></div>
          <div class="text">
            日榜的赠送榜和获赠榜以钻石价值排名。前10名可获得奖励，每个ID只能获得一个榜单得排名奖励，按最大名次派发
          </div>
        </div>
        <div class="explain_text">
          <div class="circle"></div>
          <div class="text">
            活动期间收到钻石礼物，可获得双倍经验值和双倍基础魅力值，魅力值上限提高50%
          </div>
        </div>
      </div>
    </div>
    <!-- 财神玩法详情 -->
    <ThemeDialog
      class="PlayDialog"
      dialogMark="rewardDetails"
      :titleIconObj="{ rewardDetails: 'title_9.png' }"
      :isShow="showPlayDialog"
      :isSmall="false"
      @closeDialog="closeDialog"
    >
      <div class="godOfWealth_gameplay">
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">
            小时榜在每天19：00-20：00整点开启，统计本小时内送出钻石礼物价值最高的玩家。
          </div>
        </div>
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">
            榜单在20、21、22、23点结算上个小时的小时榜，结算后榜一玩家将登上财神宝座，自动获得【财神】头饰+1小时及50万金币奖励
          </div>
        </div>
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">
            其他玩家可通过【沾财气】获得一次财气奖励，仅限前1000名。
          </div>
        </div>
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">有机会开出奖励如下：</div>
        </div>
        <div class="playDetils_img">
          <img src="../../assets/tk_3.png" alt="" />
        </div>
      </div>
    </ThemeDialog>

    <!-- 奖励详情 -->
    <ThemeDialog
      class="showRewardsDetails"
      dialogMark="rewardDetails"
      :titleIconObj="{ rewardDetails: 'title_10.png' }"
      :isShow="showRewardsDetails"
      :isSmall="false"
      @closeDialog="closeDialog"
    >
      <div class="godOfWealth_gameplay">
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">
            每日赠送和获赠钻石礼物价值最高的前10名可获得奖励，榜单每日重置，奖励会在次日发放
          </div>
        </div>
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">
            每个ID只能获得一个榜单的排名奖励，按最大名次派发
          </div>
        </div>
        <div class="detils_item">
          <div class="circle"></div>
          <div class="detils_item_text">奖励如下</div>
        </div>

        <div class="playDetils_img">
          <img src="../../assets/tk_4.png" alt="" />
        </div>
      </div>
    </ThemeDialog>
    <!-- 恭喜获得弹框 -->
    <ThemeDialog
      :isShow="showDialog"
      :dialogMark="dialogType"
      :titleIconObj="titleIconObj"
      :isSmall="false"
      @closeDialog="closeDialog"
    >
      <DialogCongrats
          :isMultiple="true"
          :awardData="award[0]"
          :btnText="ButtonText(dialogCongrats_btnTexts, '')"
          :awardName="award[0]?.text"
          @onCongratsBtn="onCongratsBtn"
        >
          <PublicJson
            :lottieJson_name="'ts_ndjl'"
            :lottieJson="jsonlottie.ndjl"
            :userAvatar="$store.getters.user_icon"
          />
        </DialogCongrats>
    </ThemeDialog>
  </div>
</template>

<script>
// 导入请求
import { getPageData } from '../../api/index'
// 组件
import dailyList from './views/dailyList.vue'
import hourlyList from './views/hourlyList.vue'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog.vue'
// json组件
import PublicJson from '../../components/PublicJson.vue'
// json动画
import ndjl from '../../assets/lottie/ts_ndjl/data.json'
import csll from '../../assets/lottie/ts_csll/data.json'
export default {
  // 盲盒之星
  name: 'NameInList',
  components: { dailyList, hourlyList, ThemeDialog, PublicJson },
  data () {
    return {
      tabActive: '小时榜',
      tabList: ['小时榜', '日榜'],
      btnState: 0, // 沾财气状态
      count_down: -1, // 小时榜结算倒计时，-1则表示非榜单时间。单位秒
      hour_rank_st: false, // 小时榜单状态
      my_hour: 0, // 我在小时榜单钻石消费数
      timer: null, // 定时器
      showPlayDialog: false, // 财神玩法弹框
      showDialog: false, // 恭喜获得弹框
      showRewardsDetails: false, // 奖励详情弹框
      titleIconObj: {}, // 弹框
      dialogCongrats_btnTexts: {
        type: '立即装扮'
      },
      rewardsList: [ // 财神奖励
        { icon: '', rank: 1 },
        { icon: 'dq_120_120.png', rank: 2, text: '+8888' },
        { icon: 'yb_120_120.png', rank: 3, text: '+6666' },
        { icon: 'ljs_120_120.png', rank: 4, text: '+1' },
        { icon: 'ljs_120_120.png', rank: 5, text: '+5' },
        { icon: 'zjs_120_120.png', rank: 6, text: '+1' },
        { icon: '', rank: 7, text: '1小时' },
        { icon: 'jb_120_120.png', rank: 8, text: '+5555' }
      ],
      jsonlottie: { ndjl, csll },
      my_present: 0,
      my_send_present: 0,
      my_username: '20013',
      my_profile_image:
        'http://cdn-image.dandan818.com/app/head/head_block_1.png',
      uid: '20013',
      preHour_user: {}, // 榜一对象
      hour_award_max: 1, // 沾财气奖励最多可领取人数
      dialogType: '', // 弹框类型
      hour_rank: [], // 小时榜
      award: [] // 奖励
    }
  },
  computed: {
    formatTime() {
      let seconds = Math.floor(this.count_down % 60)
      let minutes = Math.floor((this.count_down / 60) % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds
      minutes = minutes < 10 ? '0' + minutes : minutes
      return minutes + ':' + seconds + ''
    },
    disableBtn() {
      return this.btnState == 2 ? 'true' : this.btnState == 3 ? 'true' : 'false'
    }
  },
  watch: {
    count_down: {
      handler (val) {
        this.count_down = val
      },
      immediate: true
    }
  },
  async created () {
    // 初始化数据
    const res = await this.init()
    // console.log('res', res)
    this.my_present = res.data.my_present
    this.my_send_present = res.data.my_send_present
    this.my_username = res.data.my_username
    this.preHour_user = res.data.preHour_user
    this.count_down = res.data.count_down
    this.uid = res.data.uid
    this.hour_award_max = res.data.hour_award_max
    this.btnState = res.data.hour_award_btn
    this.uid = res.data.uid
    this.hour_rank = res.data.send_present_top
    // 倒计时
    this.countdown()
  },
  mounted () {
    if (this.count_down == -1) {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 财神玩法详情
    handleClickDetails () {
      this.showPlayDialog = true
    },
    // 奖励详情
    showRewardsDetailsDialog () {
      this.showRewardsDetails = true
    },
    // 沾财气
   async handleGetRewards (count_down) {
      // 在小时榜开启时间内
      if (count_down != -1) {
       const res = await this.handlerClickGodOfWealth()
       console.log('res', res.data)
       this.award = res.data.award
        this.init()
      }
    },
    // 切换榜单
    handlerChangeTab (tab) {
      this.tabActive = tab
    },
    // 倒计时
    countdown () {
      if (this.count_down != -1) {
        this.timer = setInterval(async () => {
          this.count_down--
        }, 1000)
      }
    },
    // 初始化数据方法
    async init () {
      const res = await getPageData({
        type: 'tab',
        mark: 'm6'
      })
      if (res.errno != 0) {
        this.$toast(res.errmsg)
      } else if (res.errno == 0) {
        this.count_down = res.data.count_down
        this.btnState = res.data.hour_award_btn
        return res
      }
    },
    // 沾财气api
    async handlerClickGodOfWealth () {
      const res = await getPageData({
        type: 'present_top_oq_award'
      })
      if (res.errno != 0) {
        this.$toast(res.errmsg)
      } else if (res.errno == 0) {
        console.log('res财神', res)
      }
    },
    // 关闭弹出触发方法
    closeDialog () {
      this.showPlayDialog = false
      this.showRewardsDetails = false
    },
    onCongratsBtn() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
.NameInList {
  // 圆点
  .circle {
    float: left;
    width: 6px;
    height: 6px;
    background-color: #fffaa6;
    border-radius: 50%;
  }
  .throne {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 360px;
    height: 390px;
    background: linear-gradient(0deg, #cdf8f3, #e1f6fe);
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    .title {
      text-align: center;
      margin: 5px 0;
      color: #169bd5;
      .titleText {
        position: relative;
        margin: 5px 0;
        .topText {
          width: 320px;
          font-size: 16px;
          img {
            width: 60%;
          }
        }
        .showDetailsDialog {
          position: absolute;
          right: 10px;
          top: 0px;
          width: 24px;
          height: 24px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      span {
        color: orange;
      }
    }
    .throne-box {
      width: 340px;
      height: 225px;
      position: relative;
      border-radius: 12px;
      background: linear-gradient(0deg, #65a6f2, #45aaa1);
      background: url('../../assets/mk6_bg.png') no-repeat;
      background-size: cover;
      box-sizing: border-box;
      .throne_rewards_item {
        position: absolute;
        width: 60px;
        height: 60px;
        background: url('../../assets/mk6_29.png') no-repeat;
        background-size: contain;
        text-align: center;
        .balloon {
          width: 100%;
          height: auto;
          img {
            width: 85%;
            margin-top: 2px;
          }
        }
        .rewards_bottom {
          position: absolute;
          bottom: 0;
          left: 10px;
          width: 42px;
          height: 14px;
          line-height: 14px;
          background: linear-gradient(90deg, #b3f7ed, #eaf4ff);
          color: #589ce2;
          border-radius: 7px;
          font-size: 12px;
        }
        .rewards_bottom_top1 {
          background: none;
          img {
            width: 90%;
            // height: 19px;
          }
        }
      }
      .throne_rewards_item:nth-child(1) {
        width: 88.5px;
        height: 86.5px;
        background: none;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -30px;
        img {
          position: absolute;
          bottom: -2px;
          left: 8px;
        }
        ::v-deep .micAvatar_img {
          width: 80%;
        }
      }
      .throne_rewards_item:nth-child(2) {
        top: 160px;
        left: 50px;
      }
      .throne_rewards_item:nth-child(3) {
        top: 85px;
        left: 15px;
      }
      .throne_rewards_item:nth-child(4) {
        top: 20px;
        left: 50px;
      }
      .throne_rewards_item:nth-child(5) {
        top: 5px;
        left: 130px;
      }
      .throne_rewards_item:nth-child(6) {
        top: 20px;
        left: 210px;
      }
      .throne_rewards_item:nth-child(7) {
        top: 85px;
        left: 260px;
        ::v-deep .micAvatar_img {
          width: 70%;
        }
      }
      .throne_rewards_item:nth-child(8) {
        top: 160px;
        left: 230px;
      }
    }
    .limitedText {
      padding-top: 5px;
      font-size: 12px;
      color: #5490d5;
    }
    .throne-btn {
      width: 180px;
      height: 55px;
      line-height: 30px;
      text-align: center;
      border-radius: 30px;
      margin: 10px 0 20px;
    }
  }
  .switchTabs {
    width: 300px;
    height: 53px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;
    transform: translateX(30px);
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
        width: 100%;
      }
    }
    .tab_active {
      background: url('../../assets/mk6_14.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .outComm {
    border: 5px solid #e2fcd9;
    box-sizing: border-box;
    width: 350px;
    min-height: 590px;
    max-height: 1000px;
    border-radius: 12px 12px 0px 0px;
    margin-bottom: 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(180deg, #eaf6ff, #b3e9f7, #5193df);
    .rewardList {
      width: 334px !important;
      min-height: 360px;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: #3270b9;
      background-color: #ccf0ff;
      border-radius: 6px;
      .rewards_img {
        img {
          margin-top: 20px;
          width: 50%;
        }
      }
      .prize {
        width: 310px;
        height: 100px;
        border: 3px solid #66adef;
        border-radius: 10px;
        margin-top: 20px;
        background: linear-gradient(90deg, #16b09e, #5ca0ec);
        .prize_gift {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-radius: 10px;
          border-top: 1px solid #eeffc9;
          padding-top: 5px;
          .prize_gift_item {
            .prize_item {
              width: 90px;
              height: 60px;
              line-height: 50px;
              border: 2px solid #fff;
              border-radius: 6px;
              background: linear-gradient(0deg, #fff, #cdfffc);
              font-size: 12px;
              margin-top: 5px;
              img {
                width: 70%;
              }
              ::v-deep .PublicJsonLottie {
                width: 100%;
                height: 100%;
              }
              ::v-deep .micAvatar_img {
                width: 50%;
              }
            }
            .prize_text {
              font-size: 12px;
              margin-top: 5px;
              color: #fff;
            }
            .details {
              color: aqua;
            }
          }
        }
        .details {
          margin-top: 5px;
          color: #fff;
          font-size: 12px;
          text-decoration: underline;
        }
      }

      .switchRank {
        margin-top: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 334px;
        min-height: 180px;
        font-size: 16px;
      }
    }

    .activity_explain {
      margin-top: 5px;
      color: #fff;
      .explain_text {
        padding-left: 10px;
        margin-top: 5px;
        .circle {
          width: 6px;
          height: 6px;
          margin-top: 5px;
          margin-right: 5px;
        }
        .text {
          line-height: 18px;
          padding-left: 15px;
          font-size: 14px;
          line-height: 20px;
          > .special {
            color: #d8e6b2;
          }
        }
      }
    }
  }
  // 财神玩法详情弹窗
  .PlayDialog,
  .showRewardsDetails {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    ::v-deep .ThemeDialog_bgc {
      padding: 25px 6px 0;
    }
    .godOfWealth_gameplay {
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      .detils_item {
        margin: 5px 0;
        .circle {
          margin: 5px 5px 0 0;
        }
        .detils_item_text {
          padding-left: 14px;
        }
      }
      .playDetils_img {
        width: 280px;
        img {
          width: 100%;
        }
        margin: 10px 0 20px;
      }
    }
  }
  // 奖励玩法详情
  .showRewardsDetails {
    width: 300px;
    height: 350px;
  }
}
</style>
