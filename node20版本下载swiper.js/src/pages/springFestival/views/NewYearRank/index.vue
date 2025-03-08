<template>
  <div class="NewYearRank">
    <div class="tabs">
      <div
        class="tab"
        :class="{ select_tab: tabflag == 1 }"
        @click="changetab(1)"
      >
        <img :src="IconPath('mk8_29.png')" alt="" />
      </div>
      <div
        class="tab"
        :class="{ select_tab: tabflag == 2 }"
        @click="changetab(2)"
      >
        <img :src="IconPath('mk8_30.png')" alt="" />
      </div>
    </div>
    <out-box class="rank">
      <div class="day_tabs">
        <div class="day_tab" @click="changedayTab(1)">
          日榜
          <div class="select_day" v-if="dayflag == 1">日榜</div>
        </div>
        <div class="all_tab" @click="changedayTab(2)">
          <div class="select_all" v-if="dayflag == 2">总榜</div>
          总榜
        </div>
      </div>
      <div class="award_detail_wrapper">
        <div class="zs_dec"></div>
        <awardList :dayflag="dayflag" :tabflag="tabflag" @preview="preview">
        </awardList>
        <div class="tit" @click="showDetail"></div>
      </div>
      <div class="date_tabs" v-if="dayflag == 1">
        <div
          @click="selectDate(key)"
          class="day_item"
          :class="{ select_item: key == show_selectdate }"
          v-for="(item, key, index) in showday_list"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <top3
        :data1="pageData"
        :data2="pageData2"
        :data3="pageData3"
        :dayflag="dayflag"
        :tabflag="tabflag"
      ></top3>
      <!-- 4-20 -->
      <after3
        :data1="pageData"
        :data2="pageData2"
        :data3="pageData3"
        :tabflag="tabflag"
        :dayflag="dayflag"
        :date="date"
      ></after3>
      <!-- 20名之后 -->
      <after20
        :data1="pageData"
        :data2="pageData2"
        :data3="pageData3"
        :tabflag="tabflag"
        :dayflag="dayflag"
        :date="date"
        :my_score="my_score"
      >
      </after20>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText" v-if="tabflag == 1">
        <ul>
          <li>
            <span></span
            >财神榜为活动期间<i>本服用户累计充值</i>排行榜，榜单分服统计。
          </li>
          <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
          <li>
            <span></span
            >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内
          </li>
        </ul>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText" v-if="tabflag == 2">
        <ul>
          <li>
            <span></span
            >名人榜为活动期间<i>本服获赠钻石礼物</i>排行榜，榜单分服统计。
          </li>
          <li>
            <span></span
            >收到新春限定礼物，1钻石=2名气值，其他钻石礼物1钻石=1名气值。
          </li>
          <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
          <li>
            <span></span
            >活动期间收到钻石礼物，可获得双倍经验值和双倍基础魅力值，魅力值上限提高50%
          </li>
        </ul>
      </div>
      <preView ref="preView" :chagBgFlag="chagBgFlag"></preView>
      <rewardDetails ref="rewardDetails"></rewardDetails>
      <rewardDetails2 ref="rewardDetails2"></rewardDetails2>
      <rewardDetails3 ref="rewardDetails3"></rewardDetails3>
    </out-box>
  </div>
</template>

<script>
import top3 from './components/top3.vue'
import after3 from './components/after3.vue'
import after20 from './components/after20.vue'
import awardList from './components/awardList.vue'

import preView from './components/dialog/preView.vue'
import rewardDetails from './components/dialog/rewardDetails.vue'
import rewardDetails2 from './components/dialog/rewardDetails2.vue'
import rewardDetails3 from './components/dialog/rewardDetails3.vue'

// 引入接口
import { getPageData } from '../../api/index'

import { defaultRank, defaultRank2, defaultRank3 } from '../../utils/pageData'
export default {
  name: 'NewYearRank',
  data() {
    return {
      dayflag: 1,
      tabflag: 1,
      my_score: 0,
      chagBgFlag: 1,
      pageData: {
        day_list: {}
      },
      pageData2: {
        day_list: {}
      },
      pageData3: {
        day_list: {}
      }
    }
  },
  components: {
    top3,
    after3,
    after20,
    awardList,
    preView,
    rewardDetails,
    rewardDetails2,
    rewardDetails3
  },
  computed: {
    date() {
      if (this.tabflag == 1) {
        return this.pageData.day_list[this.pageData.select_date]
      } else {
        return this.pageData2.day_list[this.pageData2.select_date]
      }
    },
    showday_list() {
      if (this.tabflag == 1) {
        return this.pageData.day_list
      } else {
        return this.pageData2.day_list
      }
    },
    show_selectdate() {
      if (this.tabflag == 1) {
        return this.pageData.select_date
      } else {
        return this.pageData2.select_date
      }
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = defaultRank
    this.pageData2 = defaultRank2
    this.pageData3 = defaultRank3
    await this.init()
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.my_profile_image)
  },
  methods: {
    // 刷新财神榜数据
    async init() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm8'
      })
      res.errno == 0 ? (this.pageData = res.data) : this.$toast(res.errmsg)
      return res
    },
    // 刷新名人榜日榜数据
    async init2() {
      const res = await getPageData({
        type: 'common_top_present_type_rank',
        'mark[type]': 1, // 1-日榜，2-总榜
        'mark[day]': ''
      })
      res.errno == 0 ? (this.pageData2 = res.data) : this.$toast(res.errmsg)
      return res
    },
    // 切换日榜，总榜
    async changedayTab(mark) {
      this.dayflag = mark
      // 切换名人榜日期数据
      if (this.tabflag == 2) {
        const res = await getPageData({
          type: 'common_top_present_type_rank',
          'mark[type]': this.dayflag, // 1-日榜，2-总榜
          'mark[day]': this.pageData2.select_date
        })
        if (res.errno == 0) {
          if (this.dayflag == 1) {
            this.pageData2.daily_rank = res.data.daily_rank
            this.pageData2.select_date = res.data.select_date
            this.pageData2.my_score = res.data.my_score
            this.pageData2.my_fans = res.data.my_fans
          } else {
            this.pageData3.total_rank = res.data.total_rank
            this.pageData3.my_score = res.data.my_score
            this.pageData3.my_fans = res.data.my_fans
          }
        } else {
          this.$toast(res.errmsg)
        }
      }
    },
    // 切换财神榜，名人榜
    async changetab(i) {
      if (this.tabflag == i) {
        return
      }
      this.tabflag = i
      // 切榜默认进入日榜
      this.dayflag = 1
      // 名人榜
      if (i == 2) {
        this.init2()
      }
      // 财神榜
      if (i == 1) {
        this.init()
      }
    },
    // 选择日榜日期
    async selectDate(mark) {
      // 切换财神榜日期数据
      if (this.tabflag == 1) {
        const res = await getPageData({
          type: 'common_top_recharge_daily_rank',
          mark
        })
        if (res.errno == 0) {
          this.pageData.daily_rank = res.data.daily_rank
          this.pageData.select_date = res.data.select_date
          this.pageData.my_daily_recharge = res.data.my_daily_recharge
        } else {
          this.$toast(res.errmsg)
        }
      }
      // 切换名人榜日期数据
      if (this.tabflag == 2) {
        const res = await getPageData({
          type: 'common_top_present_type_rank',
          'mark[type]': this.dayflag, // 1-日榜，2-总榜
          'mark[day]': mark
        })
        if (res.errno == 0) {
          this.pageData2.daily_rank = res.data.daily_rank
          this.pageData2.select_date = res.data.select_date
          this.pageData2.my_score = res.data.my_score
          this.pageData2.my_fans = res.data.my_fans
        } else {
          this.$toast(res.errmsg)
        }
      }
    },
    showDetail() {
      if (this.tabflag == 1) {
        this.$refs.rewardDetails.showPopup = true
      }
      if (this.tabflag == 2 && this.dayflag == 1) {
        this.$refs.rewardDetails2.showPopup = true
      }
      if (this.tabflag == 2 && this.dayflag == 2) {
        this.$refs.rewardDetails3.showPopup = true
      }
    },
    preview(i) {
      this.chagBgFlag = i
      this.$refs.preView.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.NewYearRank {
  position: relative;
  z-index: 9;
  margin-top: -139px;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    div {
      flex-shrink: 0;
    }
    .tab {
      width: 383px;
      height: 187px;
      background-image: url('../../assets/mk8_2.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 96px;
        height: 31px;
      }
    }
    .select_tab {
      background-image: url('../../assets/mk8_1.png');
    }
  }
  .rank {
    margin-top: 14px;
    width: 710px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      flex-shrink: 0;
    }
    .day_tabs {
      margin-top: 33px;
      width: 472px;
      height: 62px;
      background: #eeba7c;
      border-radius: 31px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
      position: relative;
      z-index: 9;
      .day_tab,
      .all_tab {
        width: 50%;
        height: 100%;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #c7722d;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .select_day {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(0deg, #f16a21, #ffcf5d);
          border: 3px solid #e97300;
          border-radius: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .all_tab {
        .select_all {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(0deg, #f16a21, #ffcf5d);
          border: 3px solid #e97300;
          border-radius: 31px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .award_detail_wrapper {
      width: 694px;
      height: 294px;
      background-image: url('../../assets/mk8_4.png');
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 39px;
      .zs_dec {
        width: 560px;
        height: 32px;
        background-image: url('../../assets/mk8_3.png');
        background-size: 100% 100%;
      }
      .award {
        margin-top: 56px;
        width: 150px;
        height: 120px;
        background: linear-gradient(180deg, #ffebbf, #ffffff);
        border: 4px solid #d25e2a;
        border-radius: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .preview {
          position: absolute;
          width: 150px;
          height: 26px;
          bottom: 18px;
          background-image: url('../../assets/mk8_5.png');
          background-size: 100% 100%;
        }
        .award_tit {
          position: absolute;
          bottom: -12px;
          width: 130px;
          height: 30px;
          background: #b55023;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        .value {
          width: 96px;
          height: 34px;
          background: #e14629;
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: -17px;
          right: -21px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          img {
            width: 27px;
            height: 20px;
          }
        }
      }
      .tit {
        width: 97px;
        height: 28px;
        margin-top: 18px;
        background-image: url('../../assets/mk8_6.png');
        background-size: 100% 100%;
      }
    }
    .date_tabs {
      display: flex;
      align-items: flex-start;
      margin-top: 15px;
      .day_item {
        width: 162px;
        height: 82px;
        background-image: url('../../assets/mk8_8.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #c17009;
        margin-left: -32px;
      }
      .select_item {
        background-image: url('../../assets/mk8_7.png');
        background-size: 100% 100%;
        color: #ffffff;
      }
      .day_item:first-child {
        margin-left: 0;
      }
      .day_item:nth-child(2n) {
        margin-top: 46px;
      }
    }
    .ThemeBox_BottomText {
      margin-left: 54px;
      margin-right: 40px;
      line-height: 50px;

      li {
        position: relative;
        list-style-type: none;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ab5e1a;
        i {
          color: #f52f0e;
        }

        img {
          position: relative;
          margin: 0 2px;
          width: 32px;
        }

        span {
          position: absolute;
          top: 18px;
          left: -23px;
          display: block;
          background: #e56c3e;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
    .ThemeBox_BottomText {
      margin-top: 23px;
      margin-bottom: 56px;
    }
  }
}
</style>
