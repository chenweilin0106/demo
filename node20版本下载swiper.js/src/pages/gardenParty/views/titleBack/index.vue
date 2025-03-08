<template>
  <div class="content" @click="tipPopup = false">
    <!-- 转盘抽奖 -->
    <OutBox class="WheelDiscArea" bowKnot="true">
      <WheelDisc :confiigWheelDisc="confiigWheelDisc" @getPageData="getPageData"></WheelDisc>
    </OutBox>
    <!-- 兑换大奖 -->
    <OutBox class="exchangeArea" title="title_5.png" leftBalloon="true" rightBalloon="true">
      <div class="myCoupons">
        我的礼券
        <img :src="IconPath('mk5_11.png')" />
        ：{{myCouponsNum}}
      </div>
      <div class="chJsonDiv">
        <div class="chJson">
          <PublicJson :jsonName="'hd_crqwh_lb'"></PublicJson>
          <div class="chJsonBorder"></div>
        </div>
        <div class="chTip">永久返场称号N选一</div>
      </div>
      <div class="exchangeBtn" @click="exchangeChCk">
        兑换
        <p>消耗100张礼券</p>
      </div>
      <div class="ljsDiv">
        <div class="ljsBorder" v-for="(item) in exchangeList" :key="item.id">
          <div class="ljsImg">
            <img :src="IconPath(item.icon)" />
          </div>
          <div class="ljsText">{{item.text}}</div>
        </div>
      </div>
      <div class="exchangeBtn" @click="exchangeLjsCk">
        兑换
        <p>消耗100张礼券</p>
      </div>
    </OutBox>
    <!-- 收集奖励 -->
    <OutBox class="collectRewardsArea" title="title_6.png">
      <div class="prizeItem" v-for="item in claimPrizeList" :key="item.goods_id">
        <div class="explainTip" v-if="item.goods_id == 1" @click.stop="tipPopup = true">
          <div class="tipPopup" v-if="tipPopup"></div>
        </div>
        <div class="prizeIcon">
          <div class="iconShow">
            <PublicSvga v-if="item.type=='mic'" :svgaName="item.icon.replace('.svga', '')" :userAvatar="$store.state.user_icon" />
            <img v-else :src="IconPath(item.icon)" />
          </div>
          <div class="prizeDes">{{item.text}}</div>
        </div>
        <div class="needDesDiv">{{item.task_name}}</div>
        <div class="exchangeLimitDiv">
          <span>({{ item.finish_nums }}/{{ item.max_nums }})</span>
        </div>
        <div :class="['receiveBtn', `type${item.has_right}`]" @click="receiveBtnCk(item)"></div>
      </div>
    </OutBox>
    <div class="bottomArea"></div>
    <ExchangeChPopup v-if="isShowExchangeChPopup" :myCouponsNum="myCouponsNum" :chList="chList" @getPageData="getPageData" @clickClose="clickClose"></ExchangeChPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :configReceiveAwardsPopup="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
  </div>
</template>

<script>
import WheelDisc from './components/wheelDisc.vue' // 轮盘
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import PublicSvga from '@/pages/gardenParty/components/PublicSvga.vue'
import ExchangeChPopup from './components/exchangeChPopup.vue' // 兑换称号弹窗
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue' // 恭喜获奖弹窗
import { getPageData } from '@/pages/gardenParty/api/index.js'

export default {
  name: 'TitleBack',
  props: [],
  components: {
    WheelDisc,
    PublicJson,
    PublicSvga,
    ExchangeChPopup,
    ReceiveAwardsPopup
  },
  data() {
    return {
      confiigWheelDisc: {
        leftDrawsNum: 0, // 剩余抽奖次数
        diamondConsumed: 0 // 已消费钻石
      },
      myCouponsNum: 0, // 我的礼券的数量
      isShowExchangeChPopup: false, // 兑换称号弹窗是否展示
      chList: [
        { id: 1, icon: 'ch_flrw', has_right: 1 }, { id: 2, icon: 'ch_fdpp', has_right: 1 },
        { id: 3, icon: 'ch_qfmy', has_right: 1 }, { id: 4, icon: 'ch_wwms', has_right: 1 },
        { id: 5, icon: 'ch_csfl', has_right: 1 }, { id: 6, icon: 'ch_bbsh', has_right: 1 },
        { id: 7, icon: 'ch_wzhk', has_right: 1 }, { id: 8, icon: 'ch_tzzy', has_right: 1 },
        { id: 9, icon: 'ch_zsqd', has_right: 1 }, { id: 10, icon: 'ch_sjglds', has_right: 1 }
      ], // 称号数据
      exchangeList: [{ goods_id: 1, type: 'tool', id: 2, nums: 500, icon: 'ljs_120_120.png', name: '绿晶石', text: '绿晶石+500', price: 100 }], // 可兑换数据列表
      claimPrizeList: [{ goods_id: 1, task_name: '集齐本期有关【风】的返场称号', name: '春之物语', type: 'costume', id: 36, icon: 'czwy_120_120.png', nums: 5, text: '主页特效+5天', max_nums: 3, finish_nums: 0, has_right: 0 }, { goods_id: 2, task_name: '收集本期返场称号任意8个', name: '芬芳春日', type: 'mic', id: 51, icon: 'ts_ffcr.svga', nums: 7, text: '头饰+7天', max_nums: 8, finish_nums: 0, has_right: 0 }], // 兑换列表
      tipPopup: false, // 收集奖励提示框
      isShowReceiveAwardsPopup: false, // 恭喜获奖弹窗是否展示
      configReceiveAwardsPopup: []
    }
  },
  created() {
    this.getPageData()
  },
  mounted() { },
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页数据
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          this.confiigWheelDisc.leftDrawsNum = res.data.lottery_ticket
          this.confiigWheelDisc.diamondConsumed = res.data.consume
          this.claimPrizeList = res.data.collect_awards
          this.exchangeList = res.data.exchanges
        } else {
          this.$toast(res.errmsg)
        }
      })
      // 获取称号数据
      getPageData({ type: 'title_return_list' }).then((res) => {
        if (res.errno == 0) {
          this.myCouponsNum = res.data.gift_ticket
          this.chList = res.data.list
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowExchangeChPopup = false
      this.isShowReceiveAwardsPopup = false
    },
    /**
     * 兑换称号
     */
    exchangeChCk() {
      if (this.myCouponsNum >= 100) {
        this.chList.forEach(e => {
          this.$set(e, 'isChosed', false)
        })
        this.isShowExchangeChPopup = true
      } else {
        this.$toast('礼券不足')
      }
    },
    /**
     * 兑换绿晶石
     */
    exchangeLjsCk() {
      getPageData({ type: 'title_convert', mark: this.exchangeList[0].goods_id }).then((res) => {
        if (res.errno == 0) {
          this.$toast(res.errmsg)
          this.getPageData()
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 领取收集奖励
     */
    receiveBtnCk(item) {
      console.log(item)
      if (item.has_right == 1) {
        getPageData({ type: 'title_collect_award', mark: item.goods_id }).then((res) => {
          if (res.errno == 0) {
            this.configReceiveAwardsPopup = []
            this.configReceiveAwardsPopup.push(res.data.award)
            this.getPageData()
            this.isShowReceiveAwardsPopup = true
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  .WheelDiscArea {
    // width: 720px;
    // height: 1350px;
    margin: 20px auto 0px auto;
    padding: 60px 0 80px 0;
  }
  .exchangeArea {
    // height: 1200px;
    margin: 100px auto 0px auto;
    padding: 60px 0 80px 0;
    .myCoupons {
      width: 320px;
      height: 48px;
      background: #a495ee;
      border-radius: 24px;
      margin: 20px auto 0 auto;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 48px;
      white-space: nowrap;
      img {
        width: 40px;
        height: 33px;
        margin: 0 5px;
      }
    }
    .chJsonDiv {
      width: 691px;
      height: 272px;
      background: #ebdcf3;
      border-radius: 20px;
      margin: 20px auto 0 auto;
      padding: 20px 0 0 0;
      .chJson {
        width: 656px;
        height: 200px;
        margin: 0 auto;
        padding: 0 5px;
        position: relative;
        .chJsonBorder {
          width: 656px;
          height: 200px;
          background-image: url('@/pages/gardenParty/assets/mk5_12.png');
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .chTip {
        font-size: 30px;
        color: #6f4dcf;
        text-align: center;
        line-height: 50px;
      }
    }
    .exchangeBtn {
      width: 301px;
      height: 87px;
      background: linear-gradient(0deg, #959bee, #a5c1ff);
      border-radius: 43px;
      border: 4px solid #d4eaf6;
      margin: 20px auto 0 auto;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      white-space: nowrap;
      padding-top: 10px;
      p {
        font-size: 22px;
        color: #fff08d;
      }
    }
    .ljsDiv {
      width: 583px;
      height: 220px;
      background: #fae6f3;
      border-radius: 20px;
      margin: 20px auto 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .ljsBorder {
        width: 190px;
        height: 160px;
        background: #ffffff;
        border-radius: 12px;
        border: 4px solid #f9b3d5;
        position: relative;
        .ljsImg {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          img{
            width: 120px;
            height: 120px;
          }
        }
        .ljsText {
          width: 186px;
          height: 48px;
          background: #cb6d95;
          border-radius: 0px 0px 12px 12px;
          position: absolute;
          bottom: -2px;
          left: -2px;
          font-size: 28px;
          color: #f5f5f8;
          line-height: 48px;
          text-align: center;
        }
      }
    }
  }
  .collectRewardsArea {
    // height: 600px;
    margin: 100px auto 0px auto;
    padding: 80px 0 80px 0;
    .prizeItem {
      width: 660px;
      height: 160px;
      background: linear-gradient(90deg, #8ab3ff, #cfbced, #ffbed6);
      border-radius: 12px;
      border: 4px solid #ffcfea;
      margin: 0 auto 20px auto;
      position: relative;
      .explainTip{
        width: 32px;
        height: 32px;
        background-image: url('@/pages/gardenParty/assets/mk5_13.png');
        background-size: 100% 100%;
        position: absolute;
        top: -10px;
        right: -10px;
        .tipPopup{
          width: 250px;
          height: 106px;
          background-image: url('@/pages/gardenParty/assets/mk5_14.png');
          background-size: 100% 100%;
          position: absolute;
          top: -110px;
          left: -190px;
          z-index: 2;
          font-size: 20px;
          line-height: 26px;
          color: #FFFFFF;
          padding: 10px 0 0 10px;
          &::after{
            content: '返场称号如下：\a【风流人物】、【风度翩\a翩】、【清风明月】';
            white-space: pre;
          }
        }
      }
      .prizeIcon {
        width: 240px;
        height: 154px;
        background: linear-gradient(180deg, #ffe3f1, #ffffff);
        border-radius: 8px 0px 0px 8px;
        position: absolute;
        top: 0;
        left: 0;
        .iconShow {
          width: 120px;
          height: 120px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          img {
            width: 120px;
            height: 120px;
          }
        }
        .prizeDes {
          width: 241px;
          height: 36px;
          background: #cb6d95;
          border-radius: 0px 0px 0px 8px;
          text-align: center;
          position: absolute;
          bottom: 0px;
          left: -1px;
          font-size: 24px;
          color: #fff1e5;
          line-height: 36px;
        }
      }
      .needDesDiv {
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        top: 30px;
        left: 270px;
      }
      .exchangeLimitDiv {
        color: #fff79a;
        font-size: 26px;
        position: absolute;
        top: 90px;
        left: 270px;
      }
      .receiveBtn {
        width: 120px;
        height: 48px;
        border-radius: 24px;
        border: 3px solid #ffffff;
        position: absolute;
        top: 70px;
        left: 500px;
        font-size: 28px;
        line-height: 48px;
        text-align: center;
        &.type0 {
          background: linear-gradient(0deg, #cae7ff, #ffffff);
          &::after {
            content: '未完成';
            color: #4d7ddd;
          }
        }
        &.type1 {
          background: linear-gradient(0deg, #fff5b0, #ffffff);
          &::after {
            content: '领取';
            color: #a9792c;
          }
        }
        &.type2 {
          background: linear-gradient(0deg, #a3a3a3, #dddddd);
          &::after {
            content: '已领取';
            color: #ffffff;
          }
        }
      }
    }
  }
  .bottomArea {
    height: 170px;
  }
}
</style>
