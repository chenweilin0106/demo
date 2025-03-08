<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <div class="white_box">
        <div class="inner_box">
          <img class="title-image" :src="IconPath('title_12.png')" />
          <div class="tit">请选择本层的珍宝奖励</div>
          <div
            class="floor"
            :class="{ first: index == 0 }"
            v-for="(item, index) in pageData.list"
            :key="index"
          >
            <div class="floor_no">
              <span>{{ item.layer_name }}</span>
              <span v-if="item.is_curr">({{ selectid ? 1 : 0 }}/1)</span>
              <span v-else>预告</span>
            </div>
            <div class="awards">
              <div class="award" v-for="(it, i) in item.awards" :key="i">
                <div
                  v-if="it.type === 'pst_privilege'"
                  class="price-label flex-center"
                >
                  价值99<img :src="IconPath('zs_27_20.png')" />
                </div>
                <img
                  v-if="it.icon"
                  class="icon"
                  :src="IconPath(it.icon)"
                  alt=""
                />
                <PublicSvga
                  class="lottie"
                  :userAvatar="$store.state.user_icon"
                  v-else
                  svgaName="zayh"
                />
                <div
                  class="chek"
                  @click="chek(it, item.is_curr)"
                  v-if="index == 0"
                >
                  <img
                    v-if="selectid == it.awardId"
                    :src="IconPath('tk_6.png')"
                    alt=""
                  />
                  <img v-else :src="IconPath('tk_7.png')" alt="" />
                </div>
                <div class="award_bottom">{{ it.text }}</div>
              </div>
            </div>
          </div>
          <div class="tit2">
            已选择<span :class="{ isred: !selectid }">{{
              selectid ? 1 : 0
            }}</span
            >/1个奖励，一旦选择无法更改
          </div>
          <div class="option_btn" @click="receive">确认奖池选择</div>
        </div>
      </div>
      <!--列表-->
    </div>
  </van-popup>
</template>

<script>
// import { treasureDialogData } from '../../../utils/pageData'
import PublicSvga from '../../../components/PublicSvga.vue'
// 数据请求
import { moduleFive } from '../../../api/index'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    currentLevel: {}
  },
  components: { PublicSvga },
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
      ],
      pageData: {},
      selectid: null
    }
  },
  watch: {
    // showPopup: {
    //   immediate: true,
    //   handler(newValue) {
    //     if (newValue) {
    //       this.init(this.currentLevel)
    //     } else {
    //       this.selectid = null
    //     }
    //   }
    // }
  },
  async created() {
    // this.pageData = treasureDialogData
  },
  computed: {},
  methods: {
    async receive() {
      if (!this.selectid) return this.$toast('选择奖励不足，请核对后提交')
      const res = await moduleFive({
        type: 'set_optional',
        mark: this.currentLevel,
        awardId: this.selectid
      })
      if (res.errno == 0) {
        this.showPopup = false
        this.$emit('init')
      } else {
        this.$toast(res.errmsg)
      }
    },
    chek(it, is_curr) {
      if (!is_curr) return
      this.selectid = it.awardId
    },
    clickClose() {
      this.selectid = null
    },
    openPrompt(currentLevel) {
      this.init(currentLevel)
    },
    // 获取页面基础数据
    async init(mark) {
      const res = await moduleFive({
        type: 'optional_dialog',
        mark
      })
      if (res.errno == 0) {
        this.pageData = res.data
        this.showPopup = true
      } else {
        this.$toast(res.errmsg)
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
        background: linear-gradient(0deg, #ed96fd, #866ae0);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 62px;

        .title-image {
          width: 515px;
          height: 199px;
          position: absolute;
          top: -122px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .tit {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 38px;
        }
        .floor {
          width: 600px;
          height: 144px;
          display: flex;
          align-items: center;
          flex-shrink: 0;

          div {
            flex-shrink: 0;
          }
          .floor_no {
            width: 107px;
            height: 108px;
            background-image: url('../../../assets/tk_5.png');
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 9px;
            span {
              font-size: 26px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ede3ff;
            }
            span:nth-child(2) {
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffec6f;
            }
          }
          .awards {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 465px;
            margin-left: 7px;
            .award {
              position: relative;
              width: 100px;
              height: 100px;
              background: #ffffff;
              border: 4px solid #d5a8ff;
              border-radius: 20px;
              box-sizing: content-box;
              display: flex;
              flex-direction: column;
              align-items: center;

              .price-label {
                position: absolute;
                top: 54px;
                right: 0;
                width: 81px;
                height: 20px;
                background: linear-gradient(-90deg, #75b9ff, #ff84f8);
                border-radius: 10px 0px 0px 0px;
                font-size: 16px;
                color: #ffffff;
                > img {
                  width: 20px;
                  height: 14px;
                }
              }

              .icon {
                width: 74px;
                height: 74px;
              }
              .lottie {
                width: 74px;
                height: 74px;
                ::v-deep .micAvatar_img {
                  width: 78%;
                  height: 78%;
                }
              }
              .chek {
                position: absolute;
                top: -17px;
                right: -11px;
                width: 45px;
                height: 43px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .award_bottom {
                width: 100%;
                flex: 1;
                background: #865ee3;
                border-radius: 0px 0px 16px 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                color: #ffffff;
              }
            }
          }
        }
        .first {
          background: rgba($color: #633cbd, $alpha: 0.5);
        }
        .tit2 {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 38px;
          margin-top: 7px;
          .isred {
            color: #dc19ac;
          }
        }
        .option_btn {
          width: 320px;
          height: 72px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          color: #a9792c;
          margin-bottom: 39px;
          margin-top: 11px;
        }
        /**
         <div class="tit2">已选择1/1个奖励，一旦选择无法更改</div>
          <div class="option_btn"></div>
        */
      }
    }
  }
}
</style>
