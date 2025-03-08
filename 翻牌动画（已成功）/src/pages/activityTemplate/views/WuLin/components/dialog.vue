<template>
  <!-- 弹框 -->
  <van-dialog
    class="theme_tk"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
    @closed="closeDialog"
    :class="{
      theme_tk_small: CongratulateBox_Mark
    }"
  >
    <!-- 标题 -->
    <template #title>
      <img
        v-if="dialogType === 'merge'"
        src="../../assets/title_6.png"
        alt=""
      />
      <img v-if="CongratulateBox_Mark" src="../../assets/title_7.png" alt="" />
    </template>
    <div class="white_border">
      <div class="CongratulateBox" v-if="CongratulateBox_Mark">
        <div class="dialog_LotteryAward flex_across">
          <template v-if="dialogType === 'lottery'">
            <div
              class="lottery_award_item"
              v-for="item in dialogData.awards"
              :key="item.id"
            >
              <div class="img_box flex_vertical">
                <div class="top_img">
                  <img :src="require(`../../assets/${item.icon}`)" alt="" />
                </div>
                <div class="bottom_text">{{ item.text }}</div>
              </div>
            </div>
          </template>
          <div
            class="lottery_award_item"
            v-if="dialogType === 'award' || dialogType === 'gift'"
          >
            <div class="img_box flex_vertical">
              <div class="top_img">
                <template v-if="dialogData.icon">
                  <img
                    v-if="dialogData.name !== '靓号券包'"
                    :src="require(`../../assets/${dialogData.icon}`)"
                    alt=""
                  />
                  <img
                    v-else
                    :src="require('../../assets/lhq_120_120.png')"
                    alt=""
                  />
                </template>
                <PublicJson
                  v-else
                  :lottieJson_name="'gbw'"
                  :lottieJson="gbw"
                  :userAvatar="pageData.user_icon"
                  :eleClass="'dialog_gbw'"
                ></PublicJson>
              </div>
              <div class="bottom_text">
                {{ CongratulateBox_AwardName }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="theme_botton_did CongratulateBox_button flex_across"
          @click="ClickCongrats"
        >
          {{ ButtonText(equipObj, dialogData.type) }}
        </div>
      </div>
      <div class="MergeAward" v-if="dialogType === 'merge'">
        <p>
          剩余龙珠
          <img
            class="my_present_nums_box"
            src="../../assets/js_40_39.png"
            alt=""
          />
          ：{{ pageData.bead_nums }}
        </p>
        <div class="img-box">
          <img
            v-if="dialogData.icon"
            :src="require('../../assets/' + dialogData.icon)"
            alt=""
          />
          <div v-else class="collectDragonBalls_tk_lottie">
            <PublicJson
              :lottieJson_name="'gbw'"
              :lottieJson="gbw"
              :userAvatar="pageData.user_icon"
              :eleClass="'MergeGbw'"
            ></PublicJson>
          </div>
        </div>
        <p class="goods_name">
          {{ MergeAward_GoodsName }}
        </p>
        <!-- 计数器盒子 -->
        <dialogCounter
          :buttonText="'合成'"
          :goods_detail="dialogData"
          :my_goods="+pageData.bead_nums"
          :inputNum="inputNum"
          :showCounter="dialogData.type !== 'pretty_card'"
          :showSpecialBilling="dialogData.type === 'pretty_card'"
          :showSpecialBillingButton="dialogData.type === 'pretty_card'"
          :showBilling="dialogData.type !== 'pretty_card'"
          CounterIcon="js_40_39.png"
          @dialogExcharge="onExcharge"
          @setInputNum="handleSetInputNum"
        />
      </div>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
// 弹框样式
.van-dialog {
  .van-dialog__content {
    .white_border {
      > .CongratulateBox {
        .dialog_LotteryAward {
          margin-top: 30px;
          width: 100%;
          justify-content: space-evenly;
          .lottery_award_item {
            .img_box {
              width: 64px;
              .top_img {
                width: 100%;
                height: 64px;
                background: #fefaef;
                border: 2px solid #fbd261;
                border-radius: 6px;
                > img {
                  width: 100%;
                }
              }
              .bottom_text {
                margin-top: 5px;
                color: #fff;
                width: fit-content;
                text-align: center;
                white-space: nowrap;
              }
            }
          }
        }
        .CongratulateBox_button {
          margin: 30px auto 20px;
          width: 162px;
          height: 38px;
          border-radius: 18px;
          font-size: 16px;
        }
      }
      > .MergeAward {
        margin-top: 14px;
        > .img-box {
          width: 70px;
          height: 66px;
          margin: 10px auto 5px;
          border-radius: 6px;
          > img {
            height: 100%;
          }
        }
        .collectDragonBalls_tk_lottie {
          width: 100%;
          height: 100%;
          ::v-deep .PublicJson {
            .micAvatar_img {
              top: 6px;
              width: 81%;
              height: 81%;
            }
            .PublicJsonLottieMergeGbw {
              height: 100% !important;
              width: auto !important;
            }
          }
        }
        .goods_name {
          font-size: 14px !important;
        }
        > p {
          margin: 8px 0;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            position: relative;
            top: 1px;
          }
        }
        .dialogCounter {
          ::v-deep .billing {
            .button {
              color: #a9792c;
              background: linear-gradient(0deg, #fff9d1, #ffffff);
            }
          }
        }
        // 弹框下方按钮
        .buttons-box {
          display: flex;
          justify-content: space-evenly;
          margin: 15px 10px 20px;
          .left-button,
          .right-button {
            width: 122px;
            padding: 0 10px;
            height: 44px;
            border: 1px solid #ffffff;
            border-radius: 21px;
            box-sizing: border-box;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            p {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 15px;
                margin: 0 2px;
              }
            }
            p:nth-child(2) {
              font-size: 12px;
            }
          }
          .left-button {
            p {
              color: #a22709;
            }
            background: #fefaef;
          }
        }
      }
    }
  }
}
</style>
