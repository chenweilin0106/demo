<template>
  <div class="NameInList">
    <!-- 榜上有名 -->
    <ThemeBox
      class="NameInList_box"
      :themeTitleImg="tabflag == 1 ? 'mk6_1.png' : 'mk6_2.png'"
    >
      <div class="left_tab" @click="changetab(1)"></div>
      <div class="right_tab" @click="changetab(2)"></div>
      <div class="left_dec"></div>
      <div class="right_dec"></div>
      <div
        class="tabs"
        :class="{ daytab: dayflag == 1, alltab: dayflag == 2 }"
        v-show="tabflag == 1"
      >
        <div class="left" @click="dayflag = 1"></div>
        <div class="right" @click="dayflag = 2"></div>
      </div>
      <div class="giftTab" v-show="tabflag == 2">
        <div
          class="gift_tab_item"
          v-for="(item, key, index) in present_list"
          :key="index"
          @click="changeGiftTab(index)"
        >
          <img :src="IconPath(gift_tab_pic(gift_tab_flag, index))" alt="" />
        </div>
      </div>
      <!-- 奖励预览 -->
      <div class="preview_tit"></div>
      <!-- 查看详情 -->
      <div class="look_detail">
        <awardList
          :gift_tab_flag="gift_tab_flag"
          :dayflag="dayflag"
          :tabflag="tabflag"
          @preview="preview"
        ></awardList>
        <div class="tit" @click="showDetail"></div>
      </div>
      <!-- 日期选择 -->
      <div
        class="day_choose"
        @click="foldFlag = !foldFlag"
        v-if="dayflag == 1 && tabflag == 1"
      >
        {{ date }}
        <img v-if="foldFlag" src="../../assets/mk6_8.png" alt="" />
        <img v-else src="../../assets/mk6_9.png" alt="" />
        <div class="day_list" v-if="!foldFlag">
          <div class="day_inner_list">
            <div
              class="day_item"
              v-for="(item, key) in pageData.day_list"
              :key="key"
              @click.stop="chooseday(key)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <!-- 前三 -->
      <top3 :pageData1="pageData" :dayflag="dayflag" :tabflag="tabflag"></top3>
      <!-- 4-20 -->
      <after3
        :pageData1="pageData"
        :tabflag="tabflag"
        :dayflag="dayflag"
        :date="date"
      ></after3>
      <!-- 20名之后 -->
      <after20
        v-if="pageData.tot_score >= 0 || pageData.my_total_recharge >= 0"
        :pageData1="pageData"
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
            >活动期间本服用户累计充值可获得豪气值，根据豪气值进行排名，榜单分服统计
          </li>
          <li>
            <span></span
            >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内
          </li>
          <li><span></span>若豪气值相同则按照最早充值时间优先排序</li>
        </ul>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText" v-if="tabflag == 2">
        <ul>
          <li>
            <span></span
            >活动期间本服用户累计收到指定礼物，根据收到个数计分进行排名，榜单分服统计
          </li>
          <li><span></span>若收到个数相同则按照最早收到时间优先排序</li>
          <li>
            <span></span
            >活动期间收到钻石礼物，可获得双倍经验值和双倍基础魅力值，魅力值上限提高50%
          </li>
        </ul>
      </div>
      <!-- 超级神豪榜奖励详情 -->
      <rewardDetails
        :tabflag="tabflag"
        :show="showrewardDetails"
        @onClose="showrewardDetails = false"
      ></rewardDetails>
      <!-- 礼物代言人奖励详情 -->
      <rewardDetails2
        :show="showrewardDetails2"
        @onClose="showrewardDetails2 = false"
      ></rewardDetails2>
      <preView
        :show="previewFlag"
        :chagBgFlag="chagBgFlag"
        @onClose="previewFlag = false"
      ></preView>
    </ThemeBox>
  </div>
</template>

<script>
import top3 from './components/top3.vue'
import after3 from './components/after3.vue'
import after20 from './components/after20.vue'
import { defaultRank } from '../../utils/pageData'
import rewardDetails from './components/rewardDetails.vue'
import rewardDetails2 from './components/rewardDetails2.vue'
import preView from './components/preView.vue'
import awardList from './components/awardList.vue'
// 数据请求
import { getPageData } from '../../api/index'
export default {
  name: 'NameInList',
  components: {
    top3,
    after3,
    after20,
    rewardDetails,
    rewardDetails2,
    preView,
    awardList
  },
  data() {
    return {
      dayflag: 1,
      pageData: {
        day_list: {}
      },
      tabflag: 1,
      // date: null,
      foldFlag: true,
      gift_tab_flag: 1,
      showrewardDetails: false,
      showrewardDetails2: false,
      previewFlag: false,
      chagBgFlag: 1,
      current_present: '94',
      present_list: {
        94: '亲密糖果',
        34: '一帆风顺',
        32: '浪漫木马'
      },
      my_score: 0
    }
  },
  computed: {
    date() {
      return this.pageData.day_list[this.pageData.select_date]
    }
  },
  watch: {
    showrewardDetails(newValue) {
      if (newValue) {
        document.querySelector('html').style.overflow = 'hidden'
      } else {
        document.querySelector('html').style.overflow = 'auto'
      }
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = defaultRank
    this.init()
    this.$store.commit('user/getUserIcon', this.pageData.my_profile_image)
  },
  methods: {
    changeGiftTab(index) {
      this.gift_tab_flag = index + 1
    },
    async changetab(i) {
      if (this.tabflag == i) {
        return
      }
      this.tabflag = i
      // 礼物榜
      if (i == 2) {
        const res = await getPageData({
          type: 'common_top_present_tot_rank',
          mark: this.current_present
        })
        this.current_present = res.data.current_present
        this.present_list = res.data.present_list
        this.my_score = res.data.my_score
        console.log(res)
      }
      // 神豪榜
      if (i == 1) {
        this.init()
      }
    },
    async init() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm6'
      })
      res.errno == 0 ? (this.pageData = res.data) : this.$toast(res.errmsg)
      return res
    },
    preview(i) {
      this.chagBgFlag = i
      this.previewFlag = true
    },
    showDetail() {
      this.tabflag == 1
        ? (this.showrewardDetails = true)
        : (this.showrewardDetails2 = true)
    },
    gift_tab_pic(gift_tab_flag, i) {
      if (i == 0) {
        return gift_tab_flag == 1 ? 'mk6_25.png' : 'mk6_25_1.png'
      }
      if (i == 1) {
        return gift_tab_flag == 2 ? 'mk6_26.png' : 'mk6_26_1.png'
      }
      if (i == 2) {
        return gift_tab_flag == 3 ? 'mk6_27.png' : 'mk6_27_1.png'
      }
    },
    async chooseday(key) {
      this.foldFlag = !this.foldFlag
      if (this.pageData.select_date == key) {
        return
      }
      const res = await getPageData({
        type: 'common_top_recharge_daily_rank',
        mark: key
      })
      if (res.errno == 0) {
        this.pageData.select_date = key
        this.pageData.daily_rank = res.data.daily_rank
        this.pageData.my_daily_recharge = res.data.my_daily_recharge
      } else {
        this.$toast(res.errmsg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.NameInList_box {
  margin-top: 153px;
  ::v-deep .ThemeBox_head {
    display: flex;
    align-items: flex-end;
    z-index: 10;
  }
  ::v-deep .ThemeBox_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    div {
      flex-shrink: 0;
    }
  }
  .left_tab,
  .right_tab {
    position: absolute;
    width: 270px;
    height: 118px;
    z-index: 399;
  }
  .left_tab {
    top: -139px;
    left: 50px;
  }
  .right_tab {
    width: 270px;
    height: 118px;
    top: -139px;
    right: 50px;
  }
  .left_dec {
    position: absolute;
    width: 80px;
    height: 348px;
    background-image: url('../../assets/mk2_3.png');
    background-size: 100% 100%;
    top: 61px;
    left: -15px;
  }
  .right_dec {
    position: absolute;
    top: 70px;
    right: -15px;
    width: 89px;
    height: 397px;
    background-image: url('../../assets/mk2_4.png');
    background-size: 100% 100%;
  }
  /**
   <div class="left_dec"></div>
      <div class="right_dec"></div>
  */
  .tabs {
    width: 472px;
    height: 62px;
    background-image: url('../../assets/mk6_3.png');
    background-size: 100% 100%;
    margin-top: 66px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      height: 100%;
      width: 50%;
    }
    .right {
      width: 50%;
      height: 100%;
    }
  }
  .giftTab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .gift_tab_item {
      width: 234px;
      height: 232px;
      margin-left: -18px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .gift_tab_item:first-child {
      margin-left: 0;
    }
  }
  /**
  <div class="giftTab" v-show="tabflag == 2">
        <div class="gift_tab_item" v-for="(item,index) in 3" :key="index">
        </div>
      </div>
  */
  .daytab {
    background-image: url('../../assets/mk6_3.png');
  }
  .alltab {
    background-image: url('../../assets/mk6_4.png');
  }
  .preview_tit {
    width: 570px;
    height: 41px;
    background-image: url('../../assets/mk6_5.png');
    background-size: 100% 100%;
    margin-top: 32px;
  }
  .look_detail {
    width: 643px;
    height: 231px;
    background-image: url('../../assets/mk6_7.png');
    background-size: 100% 100%;
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tit {
      width: 97px;
      height: 28px;
      background-image: url('../../assets/mk6_6.png');
      background-size: 100% 100%;
      margin-top: 23px;
    }
  }
  .day_choose {
    width: 177px;
    height: 51px;
    background: linear-gradient(-90deg, #6b49e7, #cf4d43);
    border-radius: 0px 26px 26px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 32px;
    position: absolute;
    z-index: 199;
    top: 459px;
    left: 0;
    img {
      position: absolute;
      top: 19px;
      right: 13px;
      width: 23px;
      height: 15px;
    }
    .day_list {
      position: absolute;
      top: 41px;
      width: 149px;
      background: #c04d5c;
      border-radius: 0px 0px 20px 20px;

      z-index: 99;
      padding: 10px 8px;
      .day_inner_list {
        width: 133px;
        background: linear-gradient(0deg, #fffef9, #ffffff);
        border-radius: 0px 0px 18px 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .day_item {
          width: 122px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #a76f76;
          line-height: 32px;
          border-bottom: 2px solid #ffd5da;
        }
        .day_item:last-child {
          border-radius: 0px 0px 18px 18px;
          border: none;
        }
      }
    }
  }
  .ThemeBox_BottomText {
    margin-top: 23px;
    margin-bottom: 56px;
  }
}
</style>
