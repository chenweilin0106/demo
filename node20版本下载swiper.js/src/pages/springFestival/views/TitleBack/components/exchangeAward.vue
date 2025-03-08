!
<template>
  <out-box class="exchangeAward" title="title_5.png">
    <div class="gift_certificate">
      我的礼券<img :src="IconPath('mk6_5.png')" alt="" />：{{
        pageData1.gift_ticket
      }}
    </div>
    <div class="title_wrapper">
      <div class="title_bg">
        <!-- <MarQuee></MarQuee> -->
        <PublicJson :jsonName="'hd_cj_lb'"></PublicJson>
      </div>
      <div class="tit">永久返场称号N选一</div>
    </div>
    <div class="exchange_btn" @click="exchangeTile">
      <div class="btn_top">兑换</div>
      <div class="btn_bottom">消耗100张礼券</div>
    </div>
    <div class="award_wrapper">
      <div
        class="award"
        v-for="(item, index) in pageData1.exchanges"
        :key="index"
      >
        <div class="icon">
          <img :src="IconPath(item.icon)" alt="" />
        </div>
        <div class="award_bottom">{{ item.text }}</div>
      </div>
    </div>
    <div
      class="exchange_btn"
      @click="exchangeLjs(pageData1.exchanges[0].goods_id)"
    >
      <div class="btn_top">兑换</div>
      <div class="btn_bottom">消耗100张礼券</div>
    </div>
  </out-box>
</template>

<script>
// 引入接口
import { getPageData } from '../../../api/index'
// import MarQuee from '../../../components/MarQuee-2.vue'
import PublicJson from '../../../components/PublicJson.vue'

export default {
  components: { PublicJson },
  props: ['pageData1'],
  data() {
    return {
      awardData: []
    }
  },
  methods: {
    exchangeTile() {
      if (this.pageData1.gift_ticket < 100) {
        this.$toast('礼券不足')
      } else {
        this.$emit('showExchange')
      }
    },
    async exchangeLjs(mark) {
      if (this.pageData1.gift_ticket < 100) {
        this.$toast('礼券不足')
      } else {
        const res = await getPageData({
          type: 'title_convert',
          mark
        })
        if (res.errno == 0) {
          const arr = []
          arr.push(res.data.award)
          this.awardData = arr
          this.$emit('init')
          this.$emit('showCongrat', this.awardData)
        } else {
          this.$toast(res.errmsg)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exchangeAward {
  width: 710px;
  height: 912px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 147px;
  position: relative;
  .gift_certificate {
    margin-top: 57px;
    height: 48px;
    background: #df944a;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    padding: 0 59px;
    img {
      width: 40px;
      height: 33px;
      margin: 0 4px;
    }
  }
  .title_wrapper {
    width: 694px;
    height: 272px;
    background-image: url('../../../assets/mk6_7.png');
    background-size: 100% 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title_bg {
      width: 656px;
      height: 200px;
      margin-top: 20px;
      background-image: url('../../../assets/mk6_6.png');
      background-size: 100% 100%;
      position: relative;
    }
    .tit {
      margin-top: 7px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #b67031;
    }
  }
  .exchange_btn {
    width: 334px;
    height: 94px;
    background-image: url('../../../assets/mk6_9.png');
    background-size: 100% 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn_top {
      margin-top: 15px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .btn_bottom {
      margin-top: 5px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffea86;
    }
    /**
     <div class="btn_top">兑换</div>
      <div class="btn_bottom">消耗100张礼券</div>
    */
  }
  .award_wrapper {
    width: 584px;
    height: 222px;
    background-image: url('../../../assets/mk6_8.png');
    background-size: 100% 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .award {
      margin-top: 27px;
      width: 190px;
      height: 160px;
      background: #ffffff;
      border: 4px solid #fe8d50;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 112px;
        height: 112px;
        margin-top: 3px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .award_bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 48px;
        background: #c7341b;
        border-radius: 0px 0px 8px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f5f5f8;
      }
    }
  }
}
</style>
