<template>
  <div class="PresentGift">
    <OutBox class="cpRewardsBox" :title="'title_4.png'">
      <template>
        <div class="flowerLeft"></div>
        <div class="flowerRight"></div>
      </template>
      <div class="cpRewardsDiv">
        <div class="cpRewardItem" v-for="(item) in pageData.marriage_gift.awards" :key="item.id">
          <div class="award-icon">
            <PublicImg :imgName="item.icon" :userAvatar="item.type=='mic'?$store.state.user_icon:''"></PublicImg>
          </div>
          <div class="award-text">{{ item.text }}</div>
        </div>
      </div>
      <div :class="['cpBtn', `status${pageData.marriage_gift.has_right}`]" @click="cpBtnCk"></div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间求婚并登记成功的，夫妻双方可领取【C</li>
          <li>P贺礼】</li>
          <li><span></span>每人只能领取一次</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="tipsBox" :title="'title_5.png'">
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间，开启CP称号改名限时5折优惠，改名</li>
          <li>仅需<i>2600钻石</i>，活动结束后价格将恢复原价5200</li>
          <li>钻石</li>
          <li><span></span>每人只能享受一次改名优惠</li>
        </ul>
      </div>
    </OutBox>
    <!-- <GiftBack :gift-back-data="giftBackData" @updateGiftBackData="updateGiftBackData" /> -->
    <CumulativeSpendingList :consume_status="pageData.consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
  </div>
</template>

<script>
import { _throttle } from '../../utils/tool'
// import GiftBack from './components/giftBack'
import CumulativeSpendingList from './components/cumulativeSpendingList' // 累计消费返利组件
import { presentGift } from '@/pages/520/utils/pageData'
import { getPageData } from '../../api/index'
import getPageDataMixin from '@/pages/520/mixins/getPageDataMixin'

export default {
  name: 'PresentGift',
  mixins: [getPageDataMixin],
  components: { CumulativeSpendingList },
  data() {
    return {
      transitionClass: 'noTransition'
      // marriage_gift: [
      //   { id: 1, type: 'mic', icon: 'ts_hthx.svga', text: '头饰+3天' },
      //   { id: 2, type: 'tool', icon: 'yb_120_120.png', text: '元宝+20万' }
      // ] // cp贺礼
      // cpBtnStatus: 1 // cp贺礼状态: 0:未完成 1:可领取 2:已领取
    }
  },
  async created() {
    this.pageData = presentGift // 载入默认数据
    await this.getPageData({ type: 'tab', mark: 'm3' }) // 页面数据请求
    this.transitionClass = 'hasTransition'
    // console.log(this.pageData)
  },
  computed: {
    giftBackData() {
      return this.pageData.award_list
    }
  },
  methods: {
    cpBtnCk() {
      console.log(this.pageData.marriage_gift.has_right)
      if (this.pageData.marriage_gift.has_right == 1) {
        getPageData({ type: 'marriage_gift_receive' }).then((res) => {
          if (res.errno == 0) {
            this.$toast(res.errmsg)
            this.getPageData({ type: 'tab', mark: 'm3' })
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    updateGiftBackData(key) {
      this.pageData.award_list.find((item) => item.key === key).has_right = 2
    },
    // 累积消费返利列表领取
    ClickCumulativeBtn: _throttle(async function (mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  .rules-text{
    background: #FDE1EA;
    border-radius: 20px;
    padding: 20px 40px 20px 40px;
    width: 660px;
    margin-bottom: 20px;
  }
  .cpRewardsBox{
    margin: 100px auto 0 auto;
    padding: 90px 0 60px 0;
    position: relative;
    .flowerLeft{
      width: 147px;
      height: 284px;
      background: url('@/pages/520/assets/mk3_2.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 0;
      top: 60px;
    }
    .flowerRight{
      width: 147px;
      height: 284px;
      background: url('@/pages/520/assets/mk3_3.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 0;
      top: 60px;
    }
    .cpRewardsDiv{
      display: flex;
      justify-content: center;
      align-items: center;
      .cpRewardItem{
        display: flex;
        flex-direction: column;
        width: 160px;
        height: 160px;
        background: linear-gradient(180deg, #FFD7EC, #FFFFFF);
        border-radius: 12px;
        border: 4px solid #F598BB;
        margin: 0 20px 0 20px;
        align-items: center;
        .award-icon {
          width: 120px;
          height: 120px;
          // background: #fff;
          // border-radius: 20px 20px 0 0;
        }
        .award-text {
          flex: 1;
          font-size: 24px;
          color: #fff;
          width: 100%;
          background-color: #cb6d95;
          border-radius: 0 0 12px 12px;
          text-align: center;
          line-height: 40px;
        }
      }
    }
    .cpBtn{
      width: 280px;
      height: 72px;
      border-radius: 36px;
      border: 3px solid #FFFFFF;
      margin: 30px auto 20px auto;
      text-align: center;
      line-height: 72px;
      font-size: 32px;
      color: #fff;
      &.status0{
        background: linear-gradient(0deg, #87A9E7, #A3DFFE);
        &::after{
          content: '未完成';
        }
      }
      &.status1{
        background: linear-gradient(0deg, #EB6C99, #FFBCD8);
        &::after{
          content: '领取';
        }
      }
      &.status2{
        background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
        &::after{
          content: '已领取';
        }
      }
    }
  }
  .tipsBox{
    margin: 100px auto 0 auto;
    padding: 90px 0 60px 0;
    position: relative;
    min-height: 200px;
  }
  // 获赠榜单-赠送榜单
  .rank-list {
    z-index: 2;
    margin: 0 auto 170px;
    width: 726px;
    height: 940px;
    border: 6px solid #95516a;
    background-color: #d8b873;
    padding: 6px;
    border-radius: 20px 20px 30px 30px;

    .inner {
      background: linear-gradient(180deg, #f4edd7, #f8f3e3);
      border-radius: 0 0 20px 20px;
    }

    .rank-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 0 0 15px;
      //height: 50px;
      .tab {
        position: relative;
        width: 346px;
        height: 71px;
        background: #642b36;
        font-size: 32px;
        color: #c48b9a;
        align-items: flex-start;
        line-height: 71px;
      }

      // 底部tab栏活动
      // .tab-active {
      //   font-size: 38px !important;
      //   font-weight: 700 !important;
      //   color: #fff !important;
      //   width: 350px !important;
      //   height: 91px !important;
      //   background: url('@/pages/520/assets/mk3_13.png') no-repeat left top/100% 100%;
      //   line-height: 0;
      //   padding-top: 40px;
      // }
    }

    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 10px;
      overflow: hidden;
      // 我的道具数量
      .top_my_goods {
        width: 100%;
        font-size: 28px;
        color: #77480c;
        text-align: center;
        margin-bottom: 18px;
      }
    }
  }
}
</style>
