<template>
  <div class="container3">
    <div class="outComm">
      <div class="inComm">
        <div class="topList">
          <div class="listItem" v-for="(item, index) in award_list" :key="index">
            <div class="award">
              <img :src="require('../../assets/' + item.icon)" alt="">
              <div class="bottom">+{{ item.text }}</div>
            </div>
            <div class="center">
              <div class="whiteword">
                累计打劫礼物价值达到
              </div>
              <div class="yellowWord">{{ item.max_nums }}钻 <span>({{ item.finish_nums }}/{{ item.max_nums }})</span>
              </div>
            </div>
            <div class="rightBtn rightBtn0" v-if="item.has_right == 0">
              未完成
            </div>
            <div class="rightBtn rightBtn1" @click="getRob(item.key)" v-if="item.has_right == 1">
              领取
            </div>
            <div class="rightBtn rightBtn2" v-if="item.has_right == 2">
              已领取
            </div>
          </div>
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间“打劫”钻石礼物可获得<span class="special">对应奖励</span></p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>向自己赠送钻石礼物<span class="special">不计入在内</span></p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p> 盲盒礼物以拆出礼物的钻石价值计算</p>
          </div>
        </div>
      </div>
    </div>
    <div class="outComm accumulatedDiamond">
      <div class="inComm">
        <img src="../../assets/title_3.png" class="titleImg" alt="">
        <div class="topList">
          <div class="listItem" v-for="(item, index) in toconsume_status" :key="index">
            <img src="../../assets/mk2_4.png" class="resetTitle" alt="">
            <div class="award">
              <img src="../../assets/mk3_4.png" alt="">
              <div class="bottom">+{{ item.gamegold_text }}</div>
            </div>
            <div class="center">
              <div class="whiteword">
                累计消费<span class="special">{{ Object.keys(consume_status)[index] }}钻 </span>
              </div>
              <div class="yellowWord">({{ item.consume_nums }}/{{ Object.keys(consume_status)[index] }})</div>
            </div>
            <div class="rightBtn rightBtn0" v-if="item.has_right == 0">
              未完成
            </div>
            <div class="rightBtn rightBtn1" v-if="item.has_right == 1" @click="consume(index)">
              领取
            </div>
            <div class="rightBtn rightBtn2" v-if="item.has_right == 2">
              已领取
            </div>
          </div>
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>求婚时选择规模和信物的消费不计算在内</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 恭喜获得小窗口 -->
    <van-overlay z-index="2023" class="commToast" :show="showFlag" @click="close">
      <div class="inCommToast" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="img">
          <img :src="require('../../assets/' + award.icon)" alt="">
        </div>
        <p>+{{ award.text }}</p>
        <div class="btn" @click="close">我知道了</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 导入请求
import { getDepositRebateData } from "../../api/depositRebate"
export default {
  // 奖励兑换
  name: 'giftgoBack',
  props: {},
  data() {
    return {
      showFlag: false,
      "award_list": [
        {
          "key": 5000, //key值用于领取该项奖励请求时mark值
          "finish_nums": 0, //用户已完成的累积打劫礼物价值数
          "max_nums": 5000, //累积打劫礼物价值达成奖励的最大数目
          "type": "tool",
          "id": 2,
          "text": "100",
          "icon": "mk3_1.png",
          "nums": 0,
          "has_right": 0 //领取按钮状态：0-不可以领取，1-可以领取，2-已领取
        },
        {
          "max_nums": 10000,
          "type": "tool",
          "id": 9,
          "nums": 0,
          "text": "50",
          "icon": "mk3_2.png",
          "key": 10000,
          "finish_nums": 0,
          "has_right": 0
        },
        {
          "max_nums": 15000,
          "type": "tool",
          "id": 2,
          "nums": 0,
          "text": "280",
          "icon": "mk3_1.png",
          "key": 15000,
          "finish_nums": 0,
          "has_right": 0
        },
        {
          "max_nums": 20000,
          "type": "tool",
          "id": 1,
          "nums": 0,
          "text": "80",
          "icon": "mk3_3.png",
          "key": 20000,
          "finish_nums": 0,
          "has_right": 0
        }
      ],
      "consume_status": { //累积消费返利列表
        "1000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 50000,
          "gamegold_text": "5万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "2000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 100000,
          "gamegold_text": "10万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "3000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 150000,
          "gamegold_text": "15万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "5000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 200000,
          "gamegold_text": "20万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "10000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 400000,
          "gamegold_text": "40万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "20000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 600000,
          "gamegold_text": "60万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "30000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 850000,
          "gamegold_text": "85万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "50000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 1300000,
          "gamegold_text": "130万",
          "consume_nums": 0,
          "is_daily": false,
          "has_right": 0
        },
        "100000": {
          "type": "property",
          "tool_id": "gamegold",
          "nums": 2000000,
          "gamegold_text": "200万",
          "consume_nums": "0",
          "is_daily": false,
          "has_right": 0
        }
      },
      "award": { //奖励内容
        "max_nums": 20000,
        "type": "tool",
        "id": 1,
        "nums": 80,
        "text": "80",
        "icon": "mk3_3.png"
      }
    }
  },
  computed: {
    // 限定奖励数组
    toconsume_status() {
      return Object.values(this.consume_status);
    },
  },
  watch: {},
  async created() {

  },
  mounted() {
    // 初始化数据
    this.init().then((res) => {
      this.award_list = res.data.award_list
      this.consume_status = res.data.consume_status
    });
  },
  methods: {
    close() {
      this.showFlag = false
    },
    // 领取累计消费奖励
    consume(i) {
      getDepositRebateData({
        mark: Object.keys(this.consume_status)[i],
        type: "consume_reward",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          console.log(res)
          // 初始化数据
          this.init().then((res) => {
            this.award_list = res.data.award_list
            this.consume_status = res.data.consume_status
          });
        }
      });
    },
    // 初始化数据方法
    init() {
      return new Promise((resolve, reject) => {
        getDepositRebateData({
          mark: "m3",
          type: "tab",
        }).then((res) => {
          if (res.errno != 0) {
            return this.$toast(res.errmsg)
          }
          if (res.errno == 0) {
            // 请求成功
            console.log(res)
          }
          resolve(res);
        });
      });
    },
    // 领取打劫奖励
    getRob(mark) {
      getDepositRebateData({
        mark,
        type: "present_contact_rev",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          this.award = res.data.award
          this.showFlag = true
          // 请求成功
          console.log(res)
          // 初始化数据
          this.init().then((res) => {
            this.award_list = res.data.award_list
            this.consume_status = res.data.consume_status
          });
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container3 {
  .outComm {
    border: 5px solid #D4EBA4;
    box-sizing: border-box;
    width: 360px;

    .inComm {
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #FBFFF5, #FCFFF5);
      display: flex;
      flex-direction: column;
      align-items: center;

      .topList {
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .listItem {
          width: 330px;
          height: 66px;
          background: linear-gradient(-90deg, #A5DD83, #57B8AE);
          box-shadow: 0px 3px 0px 0px #DBF0AE;
          border-radius: 6px;
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .award {
            margin-left: 15px;
            width: 48px;
            height: 48px;
            background: #FFFFFF;
            border: 2px solid #D4EBA4;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
              width: 48px;
              height: 33px;
            }

            .bottom {
              width: 100%;
              margin-top: auto;
              margin-bottom: 0;
              height: 15px;
              background: #2C835D;
              border-radius: 0px 0px 6px 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }
          }

          .center {
            height: 41px;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            margin-left: 14px;

            .yellowWord {
              color: #FFFAA6;
              display: flex;
              align-items: center;

              span {
                height: 12px;
                line-height: 12px;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFAA6;
                margin-left: 4px;
                display: block;
              }
            }
          }

          .rightBtn {
            width: 60px;
            height: 30px;
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            border: 1px solid #FFFFFF;
            border-radius: 15px;
            margin-left: 28px;
            margin-left: auto;
            margin-right: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }

          .rightBtn0 {
            background: linear-gradient(0deg, #FBFFC1, #FFFFFF);
            color: #B28D2B;
          }

          .rightBtn1 {
            background: linear-gradient(0deg, #F69421, #FFE96D);

          }

          .rightBtn2 {
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
          }
        }

        .listItem:last-child {
          margin-bottom: 0;
        }
      }

      .textcontainer {
        width: 100%;

        .ruleKText {
          display: flex;
          align-items: flex-start;
          margin-top: 11px;

          P {
            margin-right: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #0E6946;
          }

          .circle {
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 3px;
            margin-left: 10px;
            margin-right: 9px;
            background-color: #FF9FD5;
          }

          .special {
            color: #F67BAF;
          }
        }

        .ruleKText:first-child {
          margin-top: 16px;
        }

        .ruleKText:last-child {
          margin-bottom: 15px;
        }
      }
    }

  }

  .accumulatedDiamond {
    margin-top: 45px;
    margin-bottom: 12px;
    height: auto;
    position: relative;

    .inComm {
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #FBFFF5, #FCFFF5);
      display: flex;
      flex-direction: column;
      align-items: center;

      .titleImg {
        position: absolute;
        transform: translateY(-50%);
        width: 258;
        height: 48px;
      }

      .topList {
        margin-top: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .listItem {
          width: 330px;
          height: 66px;
          background: linear-gradient(-90deg, #A5DD83, #57B8AE);
          box-shadow: 0px 3px 0px 0px #DBF0AE;
          border-radius: 6px;
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          position: relative;

          .resetTitle {
            width: 61px;
            height: 34px;
            position: absolute;
            top: 0;
            right: 0;
          }

          .award {
            margin-left: 15px;
            margin-top: 7px;
            width: 48px;
            height: 48px;
            background: #FFFFFF;
            border: 2px solid #D4EBA4;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
              width: 48px;
              height: 33px;
            }

            .bottom {
              width: 100%;
              margin-top: auto;
              margin-bottom: 0;
              height: 15px;
              background: #2C835D;
              border-radius: 0px 0px 6px 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }
          }

          .center {
            height: 41px;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            margin-left: 14px;
            margin-top: 14px;

            .yellowWord {
              color: #FFFAA6;
            }
          }

          .rightBtn {
            width: 60px;
            height: 30px;
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            border: 1px solid #FFFFFF;
            border-radius: 15px;
            margin-left: auto;
            margin-top: 23px;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }

          .rightBtn0 {
            background: linear-gradient(0deg, #FBFFC1, #FFFFFF);
            color: #B28D2B;
          }

          .rightBtn1 {
            background: linear-gradient(0deg, #F69421, #FFE96D);

          }

          .rightBtn2 {
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
          }
        }
      }

      .textcontainer {
        width: 100%;

        .ruleKText {
          display: flex;
          align-items: flex-start;
          margin-top: 11px;

          P {
            margin-right: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #0E6946;
          }

          .circle {
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 3px;
            margin-left: 10px;
            margin-right: 9px;
            background-color: #FF9FD5;
          }
        }

        .ruleKText:first-child {
          margin-top: 13px;
        }

        .ruleKText:last-child {
          margin-bottom: 20px;
        }
      }
    }
  }

  .commToast {

    .inCommToast {
      width: 240px;
      height: 230px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;


      .header {
        width: 252px;
        height: 49px;
        position: absolute;
        transform: translateY(-50%);
      }

      .img {
        margin-top: 55px;
        width: 60px;
        height: 60px;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 60px;
          height: 42px;
        }
      }

      p {
        margin-top: 10px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }

      .btn {
        margin-top: 32px;
        width: 160px;
        height: 36px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 1px solid #FFFFFF;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
