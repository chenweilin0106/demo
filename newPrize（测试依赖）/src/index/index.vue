<template>
  <div class="container">
    <div class="banner">
      <div class="back" @click="quitView"></div>
      <div class="tit">您是第{{ pageData.user_index }}位发现限时福利的玩家</div>
      <div class="time2" v-if="calTime">
        <div class="text">{{ calTime }}</div>
      </div>
    </div>
    <div class="bg1">
      <div class="bg2 flex justify-center flex-no-wrap">
        <div class="awardContainer flex-column align-center">
          <div class="award_yb">
            <div class="inner">
              <img src="../assets/jl_yb.png" alt="" />
            </div>
          </div>
          <div class="yb_name" v-if="pageData.sign_in.has_right == 3">
            元宝+105w
          </div>
          <div class="yb_name" v-else>元宝+15w</div>
        </div>
        <div class="textContainer flex-column align-center">
          <div class="bg2_tit" v-if="pageData.sign_in.has_right == 3">
            恭喜完成7天签到
          </div>
          <div class="bg2_tit" v-else>
            福利加码，签到7天<br />可领百万元宝！
          </div>
          <div
            class="yb_btn yb_btn1"
            v-if="pageData.sign_in.has_right == 1"
            @click="signin"
          ></div>
          <div
            class="yb_btn yb_btn2"
            v-if="pageData.sign_in.has_right == 2"
          ></div>
          <div
            class="yb_btn yb_btn3"
            v-if="pageData.sign_in.has_right == 3"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="list1"
      v-for="(item, index) in pageData.gift_list"
      :key="index"
      :class="'list' + (index + 1)"
    >
      <img :src="IconPath(item.title_icon)" class="tit1" />
      <div class="buy" @click="buy"></div>
      <img :src="IconPath(item.icon)" class="giftbag1" />
      <img class="word1" :src="IconPath(`word_${item.id}.png`)" />
      <div class="giftbag1_award">
        <!--<div class="limit_time">-->
        <!--  <div class="text">-->
        <!--    {{ calTime }}-->
        <!--  </div>-->
        <!--</div>-->
        <div class="value_tit">价值{{ item.price }}钻</div>
        <div class="giftbag1_awards">
          <div
            class="giftbag1_award_item"
            v-for="(item1, index1) in item.awards"
            :key="index1"
            :class="`giftbag1_award_item${item1.bg_type}`"
          >
            <div class="item_icon">
              <img
                v-if="awardLabelMap[item1.type]"
                :src="IconPath(awardLabelMap[item1.type])"
                class="awardLabel"
              />
              <PublicSvga
                v-if="item1.type == 'mic'"
                class="lottie"
                svgaName="ts_hqbb"
                :userAvatar="pageData.user_icon"
              />
              <img
                v-else
                :src="IconPath(item1.nums == 2080 ? 'jl_jnlb.png' : item1.icon)"
                :class="item1.type"
                @click="handleAwardPreview(item1)"
              />
            </div>
            <div class="item_tit">
              {{ item1.nums == 2080 ? "技能蓝钻直升包" : item1.text }}
            </div>
          </div>
        </div>
        <div
          v-if="item.has_right == 0"
          class="giftbag1_awards_btn0"
          @click="tobuy(item.id, item.has_right)"
        ></div>
        <div
          class="giftbag1_awards_btn1"
          @click="tobuy(item.id, item.has_right)"
          v-if="item.has_right == 1"
        ></div>
        <div class="giftbag1_awards_btn2" v-if="item.has_right == 2"></div>
      </div>
    </div>
    <AwardPreviewPopup
      v-if="showAwardPreviewPopup"
      @clickClose="showAwardPreviewPopup = false"
    />
    <ConfirmBuyPopup
      v-if="showConfirmBuyPopup"
      :text="confirmBuyPopupData"
      @buy="buy"
      @clickClose="showConfirmBuyPopup = false"
    />
    <CongratsGetPopup
      v-if="showCongratsGetPopup"
      :list="congratsGetPopupData"
      :avatar="pageData.user_icon"
      @clickClose="showCongratsGetPopup = false"
    />
    <!-- 底部文本 -->
    <div class="BottomText">
      <span v-html="'活动由本公司组织并提供奖品\n与苹果公司无关'"></span>
    </div>
  </div>
</template>

<script>
const CongratsGetPopup = () => import("../components/CongratsGetPopup.vue");
const ConfirmBuyPopup = () => import("../components/ConfirmBuyPopup.vue"); // 确认购买弹框
const AwardPreviewPopup = () => import("../components/AwardPreviewPopup.vue"); // 奖励预览弹框
import { quitView, compareVersions } from "@/utils/toApp"; // 返回APP方法
import qs from "qs";
import { getcalTime } from "@/format/formatTime";
import PublicSvga from "@/components/PublicSvga";

export default {
  name: "layoutIndex",
  //import引入的组件需要注入到对象中才能使用
  components: {
    PublicSvga,
    AwardPreviewPopup,
    ConfirmBuyPopup,
    CongratsGetPopup,
  },
  data() {
    return {
      idToTitleMap: Object.freeze({ 1: "1", 2: "12", 3: "30", 4: "68" }),
      awardLabelMap: Object.freeze({
        mic: "pop_ts.png",
        costume: "pop_zytx.png",
        ring: "pop_jz.png",
      }),
      congratsGetPopupData: [
        // { icon: "ts_hqbb", text: "+2080", nums: '2080', type: "tool", bg_type: 1 },
        // { icon: "jl_ljs.png", text: "+10", type: "ring", bg_type: 2 },
        // { icon: "jl_ljs.png", text: "+10", type: "ring", bg_type: 3 },
        // { icon: "jl_ljs.png", text: "+10", type: "ring", bg_type: 4 },
      ],
      showCongratsGetPopup: false,
      showConfirmBuyPopup: false,
      confirmBuyPopupData: {},
      showAwardPreviewPopup: false,
      isopen: true,
      calTime: "",
      timer: null, //本期时间倒计时
      pageData: {
        user_icon: "",
        user_index: 1822,
        count_down: 1223344,
        sign_in: {
          type: "property",
          tool_id: "gamegold",
          icon: "jl_yb.png",
          nums: 150000,
          name: "元宝",
          text: "+15万",
          has_right: 1,
        },
        gift_list: [
          {
            id: 1,
            name: "闪耀新星",
            report_name: "1元礼包",
            price: 1600,
            title_icon: "tab1@2x.png",
            icon: "lb_1yuan.png",
            has_right: 0,
            awards: [
              {
                type: "property",
                tool_id: "masonry",
                bg_type: 1,
                icon: "jl_zs.png",
                nums: 10,
                name: "钻石",
                text: "+10",
              },
              {
                type: "mic",
                tool_id: 117,
                bg_type: 2,
                icon: "ts_hqbb",
                nums: 3,
                name: "好奇宝宝",
                text: "+3天",
              },
              {
                type: "property",
                tool_id: "gamegold",
                bg_type: 4,
                icon: "jl_yb.png",
                nums: 100000,
                name: "元宝",
                text: "+10万",
              },
            ],
          },
          {
            id: 2,
            name: "遇见CP",
            report_name: "12元礼包",
            price: 2400,
            title_icon: "tab2.png",
            icon: "lb_12yuan.png",
            has_right: 0,
            awards: [
              {
                type: "property",
                tool_id: "masonry",
                bg_type: 1,
                icon: "jl_zs.png",
                nums: 120,
                name: "钻石",
                text: "+120",
              },
              {
                type: "costume",
                tool_id: 4,
                bg_type: 2,
                icon: "jl_ryxc.png",
                nums: 7,
                name: "日月星辰",
                text: "+7天",
              },
              {
                type: "tool",
                tool_id: 2,
                bg_type: 4,
                icon: "jl_ljs.png",
                nums: 100,
                name: "绿晶石",
                text: "+100",
              },
            ],
          },
          {
            id: 3,
            name: "婚姻庆典",
            report_name: "30元礼包",
            price: 2600,
            title_icon: "tab3.png",
            icon: "lb_30yuan.png",
            has_right: 0,
            awards: [
              {
                type: "property",
                tool_id: "masonry",
                bg_type: 1,
                icon: "jl_zs.png",
                nums: 300,
                name: "钻石",
                text: "+300",
              },
              {
                type: "tool",
                tool_id: 123,
                bg_type: 4,
                icon: "jl_gift_qmtg.png",
                nums: 60,
                name: "亲密糖果",
                text: "+60",
              },
              {
                type: "ring",
                tool_id: 13,
                bg_type: 3,
                icon: "jl_jz.png",
                nums: 1,
                name: "怦然心动",
                text: "+1",
              },
            ],
          },
          {
            id: 4,
            name: "贵族降临",
            report_name: "68元礼包",
            price: 7800,
            title_icon: "tab4.png",
            icon: "lb_68yuan.png",
            has_right: 0,
            awards: [
              {
                type: "property",
                tool_id: "masonry",
                bg_type: 1,
                icon: "jl_zs.png",
                nums: 680,
                name: "钻石",
                text: "+680",
              },
              {
                type: "tool",
                tool_id: 2,
                bg_type: 3,
                icon: "jl_jnlzzsb.png",
                nums: 2080,
                name: "绿晶石",
                text: "+2080",
              },
              {
                type: "luck_key",
                tool_id: 0,
                bg_type: 3,
                icon: "jl_ys.png",
                nums: 6,
                name: "钥匙",
                text: "+6",
              },
            ],
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    timeDistance1: {
      get() {
        return this.pageData.count_down;
      },
      // set(value) {
      //
      // }
    },
  },
  created() {},
  //监控data中的数据变化
  watch: {
    timeDistance1: {
      handler(newValue) {
        this.calTime = getcalTime(newValue);
        if (newValue <= 0) {
          this.init();
        }
      },
    },
  },
  mounted() {
    let params = qs.parse(window.location.search.substring(1));
    let { uid, app_version, referal_source } = params;
    // 低版本需手动携带account_id上报
    if (this.appVersion && compareVersions(app_version, "5.6.4") === -1) {
      this.$thinking.login(uid);
    }
    // 数数页面浏览埋点
    this.$thinking.quick("autoTrack", {
      referal_source: referal_source,
    });
    this.init();
    // 倒计时
    this.timer = setInterval(() => {
      if (this.pageData.count_down > 0) {
        this.pageData.count_down--;
      }
    }, 1000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  //方法集合
  methods: {
    handleAwardPreview(param) {
      console.log(param);
      if (param.nums == 2080) this.showAwardPreviewPopup = true;
    },
    signin() {
      this.apis.signin().then((res) => {
        this.$toast(res.errmsg);
        if (res.errno == 0) {
          this.init();
        }
      });
    },
    init() {
      return new Promise((resolve) => {
        this.apis.home().then((res) => {
          if (res.errno == 0) {
            this.pageData = res.data;
          } else {
            this.$toast(res.errmsg);
            this.pageData.count_down = 0;
          }
          if (res.errno == 2) {
            this.isopen = false;
          }
          resolve(res);
        });
      });
    },
    // 返回APP
    quitView() {
      let parmas = qs.parse(window.location.search.substring(1));
      const { uid, access_token } = parmas;
      quitView({ uid, access_token });
    },
    // 关闭弹窗触发的事件
    closeDialog() {},
    tobuy(id, has_right) {
      if (!this.isopen) {
        this.$toast("您不在此活动参与范围");
        return;
      }
      if (has_right == 0) {
        this.confirmBuyPopupData = `现在购买《${this.idToTitleMap[id]}元新人礼包》`;
        this.showConfirmBuyPopup = true;
      } else {
        this.apis.receive({ id }).then((res) => {
          console.log(res);
          if (res.errno == 0) {
            this.congratsGetPopupData = res.data.awards;
            this.congratsGetPopupData.forEach((item) =>
              item.type == "mic" ? (item.icon = "ts_hqbb") : item.icon
            );
            this.showCongratsGetPopup = true;
            this.init();
          } else {
            this.$toast(res.errmsg);
          }
        });
      }
    },
    buy() {
      // 数数点击埋点
      this.$thinking.track(
        "WebClick", // 追踪事件的名称
        {
          element: "去购买",
          module: "限时福利活动",
        }
      );
      let params = qs.parse(window.location.search.substring(1));
      let { uid, access_token, appVersion } = params;
      document.addEventListener("visibilitychange", this.hiddenFn);
      window.location.href =
        process.env.VUE_APP_BASE_API +
        "vue/normal/newerGift/index.html?uid=" +
        uid +
        "&access_token=" +
        access_token +
        "" +
        "&appVersion=" +
        appVersion +
        "" +
        "&referal_source=" +
        "luckyKeyCollector";
    },
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        // 页面刷新
        this.init();
        console.log("页面呼出");
        // 移除监听
        document.removeEventListener("visibilitychange", this.hiddenFn);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "YouSheBiaoTiHei";
  // src: url("http://develop.dandan818.com/V4.0/newer/font/YouSheBiaoTiHei.ttf");
  src: url("../font/YouSheBiaoTiHei-2.ttf");
}

.container {
  overflow: hidden;
  width: 375px;
  background: #51428f;
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner {
    width: 100%;
    height: 368px;
    background-image: url("../assets/banner.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;

    .back {
      width: 44px;
      height: 44px;
      background-image: url("../assets/back@2x.png");
      background-size: 100% 100%;
      position: absolute;
      top: 44px;
      left: 8px;
    }

    .tit {
      height: 20px;
      font-size: 14px;
      font-weight: 800;
      color: #ccdbec;
      line-height: 20px;
      background: linear-gradient(180deg, #ffffff 0%, #dcceff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 182px;
    }

    .time2 {
      width: 143px;
      height: 103px;
      background-image: url("../assets/time2.png");
      background-size: 100% 100%;
      position: absolute;
      top: 125px;
      left: -29px;

      .text {
        position: absolute;
        top: 43px;
        left: 36px;
        width: 75px;
        height: 31px;
        font-size: 10px;

        font-weight: 500;
        color: #ffffff;
        line-height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-15deg);
      }
    }
  }
  .bg1 {
    width: 100%;
    height: 395px;
    background-image: url("../assets/bg@2x.png");
    background-size: 100% 100%;
    margin-top: -182px;
    position: relative;
    z-index: 1;
    .bg2 {
      position: absolute;
      width: 378px;
      height: 225px;
      background-image: url("../assets/bg_qd.png");
      background-size: 378px 100%;
      background-position: center center;
      top: 148px;
      padding-top: 90px;
      .awardContainer {
        .award_yb {
          width: 64px;
          height: 64px;
          background: linear-gradient(
            180deg,
            rgba(190, 169, 255, 1),
            rgba(122, 140, 227, 1)
          );
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;

          .inner {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #fff9ea 0%, #ffefcd 100%);
            width: 100%;
            height: 100%;
            border-radius: 8px;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
        .yb_name {
          height: 12px;
          font-size: 12px;

          font-weight: 500;
          color: #9165ca;
          line-height: 12px;
          margin-top: 6px;
          white-space: nowrap;
        }
      }
      .textContainer {
        margin-left: 5px;
        .bg2_tit {
          width: 153px;
          height: 37px;
          background-image: url("../assets/mk1_2@2x.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 13px;
          color: #9165ca;
          line-height: 14px;
        }
        .yb_btn {
          width: 122px;
          height: 39px;
          background-image: url("../assets/btn1_1@2x.png");
          background-size: 100% 100%;
          margin-top: 4px;
        }
        .yb_btn1 {
          background-image: url("../assets/btn1_1@2x.png");
        }
        .yb_btn2 {
          background-image: url("../assets/btn1_1.png");
        }
        .yb_btn3 {
          background-image: url("../assets/btn3_1@2x.png");
        }
      }
    }
  }

  .list1 {
    margin-top: 5px;
    //margin-bottom: 60px;
    width: 355px;
    // height: 804px;
    background: #7362b7;
    border-radius: 20px;
    border: 1px solid #ffd07b;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .tit1 {
      width: auto;
      height: 42px;
      position: absolute;
      top: 0;
      transform: translateY(-50%);
    }
    .buy {
      position: absolute;
      top: 224px;
      left: 36px;
      width: 104px;
      height: 35px;
      background-image: url("../assets/btn_bug.png");
      background-size: 100% 100%;
    }
    .giftbag1 {
      width: 338px;
      height: auto;
      margin-top: 25px;
      margin-left: -9px;
    }
    .word1 {
      width: auto;
      height: 19px;
      margin-top: 24px;
    }
    .giftbag1_award {
      width: 320px;
      height: 212px;
      background-image: url("../assets/bg_fl@2x.png");
      background-size: 100% 100%;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin-bottom: 14px;

      //.limit_time {
      //  position: absolute;
      //  top: 16px;
      //  left: -19px;
      //  width: 111px;
      //  height: 73px;
      //  background-image: url("../assets/time1@2x.png");
      //  background-size: 100% 100%;
      //
      //  .text {
      //    position: absolute;
      //    top: 29px;
      //    left: 20px;
      //    width: 75px;
      //    height: 31px;
      //    font-size: 10px;
      //
      //    font-weight: 500;
      //    color: #ffffff;
      //    line-height: 12px;
      //    display: flex;
      //    align-items: center;
      //    justify-content: center;
      //    transform: rotate(-15deg);
      //  }
      //}

      .value_tit {
        width: 136px;
        height: 18px;
        background: linear-gradient(
          270deg,
          rgba(81, 66, 143, 0) 0%,
          #8574cf 51%,
          rgba(81, 66, 143, 0) 100%
        );
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: YouSheBiaoTiHei, sans-serif;
        color: #ffe5c3;
        line-height: 14px;
        margin-top: 42px;
      }

      .giftbag1_awards {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 224px;

        .giftbag1_award_item {
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .item_icon {
            width: 60px;
            height: 60px;
            background-image: url("../assets/jl_bg_1.png");
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            .lottie {
              width: 74%;
              height: 74%;
            }

            .awardLabel {
              z-index: 1;
              position: absolute;
              width: auto;
              height: 12px;
              top: 0;
              right: 0;
            }
            .costume {
              width: 56px;
              height: 56px;
              border-radius: 8px;
            }
          }

          .item_tit {
            height: 12px;
            font-size: 12px;

            font-weight: 500;
            color: #ffffff;
            line-height: 12px;
            margin-top: 4px;
            white-space: nowrap;
          }
        }

        .giftbag1_award_item1 {
          .item_icon {
            background-image: url("../assets/jl_bg_1.png");
          }
        }

        .giftbag1_award_item2 {
          .item_icon {
            background-image: url("../assets/jl_bg_2.png");
          }
        }

        .giftbag1_award_item3 {
          .item_icon {
            background-image: url("../assets/jl_bg_4.png");
          }
        }

        .giftbag1_award_item4 {
          .item_icon {
            background-image: url("../assets/jl_bg_3.png");
          }
        }
      }

      .giftbag1_awards_btn0,
      .giftbag1_awards_btn1,
      .giftbag1_awards_btn2 {
        width: 122px;
        height: 39px;
        background-image: url("../assets/btn2_1@2x.png");
        background-size: 100% 100%;
        margin-top: 12px;
      }

      .giftbag1_awards_btn1 {
        background-image: url("../assets/btn1_1@2x.png");
      }

      .giftbag1_awards_btn2 {
        background-image: url("../assets/btn1_1.png");
      }
    }
  }
  .list2 {
    margin-top: 40px;
  }

  .list3 {
    margin-top: 40px;
  }

  .list4 {
    margin-top: 40px;
    margin-bottom: 20px;
    .buy {
      top: 275px;
    }
  }
  .BottomText {
    width: 100%;
    height: 85px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      text-align: center;
      color: #fff;
      white-space: pre-wrap;
      line-height: 21px;
    }
  }
}
</style>
