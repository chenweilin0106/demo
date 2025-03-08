<template>
  <out-box class="GiftTasks" title="title_5.png">
    <div class="popular_gift">
      <div class="my_popular flex-center">
        我的人气值：{{ giftTasksData.pop_value }}
      </div>
      <div class="tip">人气值每增加20000，自动发放1张兑换券（上限10张）</div>
      <!--绿晶石-->
      <div class="popular_gift_list">
        <div
          v-for="item in giftTasksData.award_list"
          :key="item.key"
          class="popular_gift_item"
          :class="{ has_buy: item.has_right == 2 }"
          @click="getAward(item)"
        >
          <!--当前可领取光效-->
          <div v-if="item.has_right == 1" class="current_light_border">
            <div class="flower_icon"></div>
          </div>
          <!--图标-->
          <div class="icon flex-center">
            <img :src="IconPath(item.icon)" />
          </div>
          <!--文本-->
          <div class="text">
            <span>{{
              '+'.includes(item.text) ? item.text : '+' + item.text
            }}</span>
          </div>
          <div
            :style="{
              backgroundColor: item.has_right == 0 ? '#824414' : '#EF8928'
            }"
            class="progress_point"
            @click.stop
          ></div>
          <div class="progress_num" @click.stop>
            {{ item.key }}
          </div>
          <!--兑换券进度条-->
        </div>
        <!--兑换券-->
        <div class="popular_gift_item">
          <!--图标-->
          <div class="icon flex-center">
            <img :src="IconPath('dhq_120_120.png')" />
          </div>
          <!--文本-->
          <div class="text">
            <span>+1</span>
          </div>
          <!--兑换券进度条-->
          <div class="ticket_progress">
            <div class="grey_bgc">
              <div :style="{ width: ticket_progress_width }" class="main"></div>
            </div>
          </div>
        </div>
        <!--进度条-->
        <div class="popular_progress">
          <!--起点-->
          <div class="start_point flex_vertical">
            <div class="point_text">人气值</div>
            <div
              class="point_icon"
              :style="{ backgroundColor: '#EF8928' }"
            ></div>
            <div class="point_num">0</div>
          </div>
          <!--popular_progress_width-->
          <div
            :style="{ width: popular_progress_width }"
            class="popular_progress_main"
          ></div>
        </div>
      </div>
    </div>
    <!--我的兑换券-->
    <div class="my_tickets flex-center">
      我的兑换券<img :src="IconPath('dhq_120_120.png')" />：{{
        giftTasksData.ticket_nums
      }}
    </div>
    <!--返场称号-->
    <div class="title_back_box">
      <div class="ExchargeListItem_Left">
        <div class="ExchargeItem_Icon">
          <public-json jsonName="celebration_title_return" />
        </div>
        <div class="ExchargeItem_Name flex-center">限定称号兑换</div>
      </div>
      <div class="ExchargeListItem_Center">
        消耗<i class="speical_color">1兑换券</i>兑换
      </div>
      <div
        class="ExchargeListItem_Button flex-center"
        @click.stop="$emit('open')"
      >
        兑换
      </div>
    </div>
    <!-- 规则说明 -->
    <div class="rule-text">
      <ul>
        <li><span></span>活动期间根据玩家收到钻石礼物价值转化为人气值</li>
        <li><span></span>人气值=获赠他人赠送的钻石礼物价值*1.1+自己送</li>
        <li>自己的钻石礼物价值*0.9</li>
        <li>
          <span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i>
        </li>
        <li><i>基础魅力值，魅力值上限提高50%</i></li>
      </ul>
    </div>
  </out-box>
</template>

<script>
import PublicJson from '@/components/PublicJson.vue'
export default {
  name: 'GiftTasks',
  components: {
    PublicJson
  },
  props: ['giftTasksData'],
  data() {
    return {
      // 用户人气值
      user_popular: 75000
    }
  },
  computed: {
    // 兑换券进度条长度
    ticket_progress_width() {
      const num = this.giftTasksData.ticket_process.finish_nums
      return (num / 20000).toFixed(2) * 100 + '%'
    },
    // 人气值进度条长度
    popular_progress_width() {
      const num = this.giftTasksData.pop_value
      if (num <= 5000) {
        return (num / 5000).toFixed(1) * 31 + '%'
      } else if (num <= 10000) {
        return (num / 10000).toFixed(1) * 60 + '%'
      } else if (num < 15000) {
        return (num / 15000).toFixed(1) * 90 + '%'
      } else if (num >= 15000) {
        return '100%'
      } else {
        return '0%'
      }
    }
  },
  methods: {
    getAward(data) {
      if (data.has_right == 1) {
        this.$emit('getAward', data.key)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.GiftTasks {
  position: relative;
  height: 1021px;
  margin-top: 81px;
  padding-top: 112px;

  .popular_gift {
    position: relative;
    margin: 0 auto;
    width: 700px;
    height: 346px;
    background: #ffe683;
    padding-top: 39px;

    .my_popular {
      position: absolute;
      top: -23px;
      left: 50%;
      transform: translateX(-50%);
      min-width: 320px;
      width: fit-content;
      padding: 0 40px;
      height: 46px;
      background: #95511d;
      border-radius: 23px;
      white-space: nowrap;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
    }

    .tip {
      font-size: 24px;
      text-align: center;
      color: #aa4213;
    }

    .popular_gift_list {
      display: flex;
      padding-left: 123px;

      .popular_gift_item {
        position: relative;
        z-index: 2;
        margin-top: 27px;
        margin-right: 15px;
        width: 128px;
        height: 128px;
        padding: 4px;
        background-color: #e7ab4b;
        border-radius: 24px;

        // 当前可领取光效
        .current_light_border {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 153px;
          height: 153px;
          //background: url('@/pages/celebration/assets/mk_3_2.png') no-repeat
          //  left top/100% auto;

          .flower_icon {
            position: absolute;
            top: 3px;
            right: 9px;
            width: 45px;
            height: 46px;
            //background: url('@/pages/celebration/assets/mk_3_1.png') no-repeat
            //  left top/100% auto;
          }
        }

        .icon {
          width: 120px;
          height: 87px;
          background: linear-gradient(0deg, #bb6c2b, #6f3322);
          border-radius: 20px 20px 0 0;

          > img {
            height: 100%;
          }
        }

        .text {
          position: relative;
          width: 120px;
          height: 33px;
          background: #de822a;
          border-radius: 0px 0px 20px 20px;
          white-space: nowrap;

          > span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.91);
            font-size: 24px;
            color: #ffffff;
          }
        }

        .progress_point {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          bottom: -60px;
          width: 25px;
          height: 25px;
          //background: #7956ca;
        }

        .progress_num {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scale(0.91);
          bottom: -95px;
          font-size: 24px;
          font-weight: 500;
          color: #aa4213;
        }

        &:nth-of-type(4) {
          background-color: #ba5c00;

          .icon {
            background: linear-gradient(0deg, #ffd146, #de721b);
          }

          .ticket_progress {
            position: absolute;
            bottom: -63px;
            left: 50%;
            transform: translateX(-50%);
            width: 128px;
            height: 28px;
            background: #fff;
            padding: 4px;
            border-radius: 14px;
            overflow: hidden;

            .grey_bgc {
              width: 120px;
              height: 20px;
              background-color: #824414;
              border-radius: 10px;
              overflow: hidden;

              .main {
                //width: 50%;
                height: 100%;
                background: linear-gradient(0deg, #f07d0c, #ffcc32);
                border-radius: 10px;
              }
            }
          }
        }
      }

      // 已经领取
      .has_buy {
        background-color: #c5c2d2 !important;

        .icon {
          > img {
            opacity: 0.5 !important;
          }
        }

        .text {
          background-color: #c5c2d2 !important;
        }
      }
    }

    .popular_progress {
      position: absolute;
      z-index: 1;
      left: 38px;
      //left: 54px;
      bottom: 72px;
      width: 482px;
      //width: 466px;
      height: 10px;
      background: #824414;
      border-radius: 5px;

      .popular_progress_main {
        //width: 50%;
        height: 100%;
        background-color: #ef8928;
        border-radius: 5px;
      }

      .start_point {
        position: absolute;
        top: 50%;
        left: -10px;

        .point_text {
          position: absolute;
          top: -50px;
          font-size: 24px;
          font-weight: 500;
          color: #aa4213;
          transform: scale(0.83);
          white-space: nowrap;
        }

        .point_icon {
          transform: translateY(-50%) rotate(45deg);
          width: 25px;
          height: 25px;
        }

        .point_num {
          position: absolute;
          top: 20px;
          font-size: 24px;
          font-weight: 500;
          color: #aa4213;
          transform: scale(0.91);
          white-space: nowrap;
        }

        //background: #7956ca;
      }
    }
  }

  .my_tickets {
    margin: 31px auto 21px;
    min-width: 320px;
    width: fit-content;
    padding: 0 40px;
    height: 46px;
    background: #95511d;
    border-radius: 23px;
    white-space: nowrap;
    font-size: 26px;
    font-weight: 500;
    color: #ffffff;

    > img {
      height: 59px;
    }
  }

  .title_back_box {
    position: relative;
    margin: 0 auto 25px;
    display: flex;
    width: 666px;
    height: 166px;
    overflow: hidden;
    padding: 3px;
    border-radius: 15px;
    background-color: #ffc956;
    // 图片样式
    .ExchargeListItem_Left {
      width: 240px;
      height: 100%;
      justify-content: center;

      .ExchargeItem_Icon {
        position: relative;
        width: 100%;
        height: 124px;
        border-radius: 12px 0 0 0;
        background: linear-gradient(0deg, #a96228, #6f3322);
        // 图片icon
        img {
          height: 100%;
        }
      }

      // 图片下方字体样式
      .ExchargeItem_Name {
        font-size: 24px;
        font-weight: 500;
        width: 100%;
        height: 36px;
        border-radius: 0 0 0 12px;
        background-color: #824414;
        color: #ffffff;
      }
    }

    // 中间字体样式
    .ExchargeListItem_Center {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 26px;
      border-radius: 0 12px 12px 0;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(90deg, #a16014, #e98e35);

      .speical_color {
        color: #fff68f !important;
      }
    }

    // 按钮样式
    // 兑换
    .ExchargeListItem_Button {
      position: absolute;
      // 单个奖励
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
      width: 124px;
      height: 64px;
      border-radius: 32px;
      border: 2px solid #ffffff;
      background: linear-gradient(0deg, #fff9d1, #ffffff);
      font-size: 28px;
      color: #a9792c;
    }
  }

  .rule-text {
    margin-left: 56px;
    i {
      color: #f52300;
    }
  }
}
</style>
