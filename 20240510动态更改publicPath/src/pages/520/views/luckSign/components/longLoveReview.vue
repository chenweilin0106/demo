<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content">
      <!--标题图片-->
      <div class="white_box">
        <div class="inner_box">
          <img class="title-image" :src="IconPath('title_14.png')" />
          <div class="love_bg">
            <div class="nocp" v-if="!pageData2.cp_info.cp_day">
              <span>当前你是未婚状态</span>
              <span>赶紧找个心仪的人去求婚吧</span>
              <div class="loveHome_btn" @click="jumpLoveHouse"></div>
              <div class="tip_kqlmzl">开启浪漫之旅</div>
            </div>
            <div class="lefticon" v-if="pageData2.cp_info.cp_day">
              <img :src="pageData2.cp_info.icon_info.profile_image" alt="" />
            </div>
            <div class="righticon" v-if="pageData2.cp_info.cp_day">
              <img :src="pageData2.cp_info.icon_info.tprofile_image" alt="" />
            </div>
            <div class="tit_zyqyj" v-if="pageData2.cp_info.cp_day">
              在一起已经
            </div>
            <div class="day_num" v-if="pageData2.cp_info.cp_day">
              {{ pageData2.cp_info.days }}
            </div>
            <div class="tit_jnr" v-if="pageData2.cp_info.cp_day">纪念日</div>
            <div class="day_jnr" v-if="pageData2.cp_info.cp_day">
              {{ pageData2.cp_info.cp_day }}{{ pageData2.cp_info.week }}
            </div>
            <div class="tit_tmz" v-if="pageData2.cp_info.cp_day">甜蜜值</div>
            <div class="value_tmz" v-if="pageData2.cp_info.cp_day">
              {{ pageData2.cp_info.sweet }}
            </div>
          </div>
          <div class="task_list">
            <div
              class="task_item"
              v-for="(item, index) in pageData2.task_list"
              :key="index"
            >
              <div class="fixed giftItem">
                <div class="giftItem_top">
                  <img :src="IconPath('thb_120_120.png')" alt="" />
                </div>
                <div class="giftItem_bottom">{{ item.text }}</div>
              </div>
              <div class="description">
                <div class="description_top">{{ item.name1 }}</div>
                <div class="description_bottom">{{ item.name2 }}</div>
              </div>
              <div
                class="receive_btn"
                @click="receive(item.task_id, item.has_right)"
                :class="ButtonStyle('1', item.has_right)"
              >
                {{
                  item.has_right == 0
                    ? '未完成'
                    : item.has_right == 1
                    ? '领取'
                    : '已领取'
                }}
              </div>
            </div>
          </div>
          <div class="dialog_bottom">
            <div class="bottom_tit">
              <div class="point"></div>
              <div class="review_text">
                夫妻双方满足对应条件则可领取长情回馈奖励
              </div>
            </div>
            <div class="bottom_tit">
              <div class="point"></div>
              <div class="review_text">每个奖励只能领取一次</div>
            </div>
          </div>
        </div>
      </div>
      <!--列表-->
    </div>
  </van-popup>
</template>

<script>
// 数据请求
import { moduleSix } from '../../../api/index'
import { jumpLoveHouse } from '../../../utils/toApp'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pageData2: {}
  },
  data() {
    return {
      showPopup: false,
      gift_list1: [
        {
          icon: 'ljs_120_120.png',
          text: '+25',
          probability: '必出'
        },
        {
          icon: 'zjs_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'yb_120_120.png',
          text: '+2万',
          probability: '25%'
        },
        {
          icon: 'sgw_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'ljs_120_120.png',
          text: '+10',
          probability: '25%'
        }
      ],
      gift_list2: [
        {
          icon: 'mtjz_120_120.png',
          text: '戒指+1',
          probability: '必出'
        },
        {
          icon: 'qmtg_120_120.png',
          text: '+10',
          probability: '25%'
        },
        {
          icon: 'wrmm_120_120.png',
          text: '资料卡+1天',
          probability: '25%'
        },
        {
          icon: 'msm_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'kxt_120_120.png',
          text: '+1',
          probability: '25%'
        }
      ]
    }
  },
  computed: {},
  methods: {
    jumpLoveHouse() {
      jumpLoveHouse(this.$store.state.uid)
    },
    clickClose() {},
    async receive(mark, has_right) {
      if (has_right != 1) {
        return this.$toast('不可领取')
      }
      const res = await moduleSix({
        type: 'cp_task_rev',
        mark
      })
      this.$toast(res.errmsg)
      if (res.errno == 0) {
        // this.pageData.user_coins = res.data.user_coins
        this.$emit('refresh', res.data.user_coins)
        // 刷新主页数据
        // 刷新长情回顾数据
      }
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 10px solid rgba(236, 211, 255, 0.5);
    border-radius: 40px;
    pointer-events: auto;

    .white_box {
      border: 4px solid #ffffff;

      border-radius: 30px;
      overflow: hidden;

      .inner_box {
        width: 600px;
        height: 996px;
        background: linear-gradient(0deg, #ed96fd, #866ae0);
        display: flex;
        flex-direction: column;
        align-items: center;

        .title-image {
          width: 515px;
          height: 199px;
          position: absolute;
          top: -122px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .love_bg {
          width: 633px;
          height: 603px;
          background-image: url('../../../assets/tk_19.png');
          background-size: 100% 100%;
          position: relative;
          top: -60px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .nocp {
            position: absolute;
            top: 248px;
            left: 50%;
            transform: translateX(-50%);
            width: 312px;
            font-size: 26px;

            font-weight: 500;
            color: #e752ad;
            display: flex;
            flex-direction: column;
            align-items: center;
            white-space: nowrap;

            .loveHome_btn {
              margin-top: 25px;
              width: 237px;
              height: 63px;
              background-image: url('../../../assets/tk_20.png');
              background-size: 100% 100%;
              position: relative;
            }

            .tip_kqlmzl {
              font-size: 22px;

              color: #e752ad;
              position: relative;
              margin-top: 8px;
            }

            /**
            <div class="loveHome_btn"></div>
              <div class="tip_kqlmzl">开启浪漫之旅</div>
            */
          }

          div {
            position: absolute;
          }

          .lefticon,
          .righticon {
            width: 96px;
            height: 96px;
            background: #a86ddf;
            border: 4px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .lefticon {
            top: 167px;
            left: 129px;
          }

          .righticon {
            top: 167px;
            right: 122px;
          }

          .tit_zyqyj {
            top: 217px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 24px;

            color: #e752ad;
            white-space: nowrap;
          }

          .day_num {
            top: 265px;
            color: transparent;
            font-size: 96px;
            font-weight: 500;
            //-webkit-text-stroke: 5px rgba(0, 0, 0, 0); // 描边粗细 兼容性良好
            background: -webkit-linear-gradient(
              90deg,
              #dd4996 0%,
              #fa6dc7 100%
            ); // 渐变背景色
            -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
            background-clip: text; // 将背景色切割成字体描边 兼容性良好
          }

          .tit_jnr {
            font-size: 24px;

            color: #b38ca4;

            top: 363px;
          }

          .day_jnr {
            font-size: 26px;

            font-weight: 500;
            color: #e752ad;
            // width: 117px;
            top: 392px;
          }

          .tit_tmz {
            font-size: 24px;

            color: #b38ca4;
            top: 438px;
            white-space: nowrap;
          }

          .value_tmz {
            font-size: 26px;

            font-weight: 500;
            color: #e752ad;
            top: 469px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .task_list {
          margin-top: -76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 361px;
          overflow-y: scroll;

          .task_item {
            width: 572px;
            height: 132px;
            background: linear-gradient(90deg, #8b7cfc, #ffb1f7);
            border: 4px solid #f6ddff;
            border-radius: 20px;
            margin-bottom: 2px;
            flex-shrink: 0;
            display: flex;
            align-items: center;

            .giftItem {
              margin-left: 15px;
              width: 100px;
              height: 100px;
              background: #ffffff;
              border: 4px solid #d6beff;
              border-radius: 12px;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              overflow: hidden;
              box-sizing: content-box;

              .giftItem_top {
                position: absolute;
                width: 100%;
                flex: 1 1 auto;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  height: 68px;
                }
              }

              .giftItem_bottom {
                width: 100%;
                text-align: center;
                font-size: 22px;

                font-weight: 500;
                color: #ffffff;
                margin-bottom: 0;
                margin-top: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                height: 32px;
                background: #8d64da;
              }
            }
          }

          .description {
            margin-left: 14px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;

            .description_top {
              font-size: 26px;

              color: #ffffff;
            }

            .description_bottom {
              font-size: 24px;

              color: #fff0ab;
            }
          }

          .receive_btn {
            width: 120px;
            height: 60px;
            // background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 28px;
            margin-left: auto;
            font-size: 28px;

            // color: #4d7ddd;
          }
        }

        .dialog_bottom {
          width: 600px;
          height: 126px;
          background: #ed96fd;
          border-radius: 0px 0px 40px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 16px;
          padding-top: 32px;

          .bottom_tit {
            display: flex;
            align-items: center;

            .point {
              width: 12px;
              height: 12px;
              background: #ffe9b9;
              border-radius: 50%;
              margin-right: 18px;
            }

            .review_text {
              font-size: 26px;

              color: #ffffff;
              line-height: 38px;
            }
          }
        }
      }
    }
  }
}
</style>
