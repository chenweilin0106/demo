<template>
  <van-popup
    v-model="showPopup"
    @closed="clickClose"
    :lock-scroll="true"
    close-on-click-overlay
    @click="showPopup = false"
    @touchmove.prevent.stop
  >
    <div class="popup-content" @click.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_24.png')" />

      <div class="inner-content">
        <div class="main-content">
          <!-- 说明文字 -->
          <div class="ThemeBox_BottomText">
            <ul>
              <li>
                <span></span
                >名人榜为活动期间<i>本服获赠钻石礼物</i>排行榜，榜单分服统计。若收到新春限定礼物，1钻石=2名气值，其他钻石礼物1钻石=1名气值。
              </li>
              <li>
                <span></span>
                新春限定礼物：小神龙、辞旧迎新、财神到、福到了、暖心水饺、2024
              </li>
              <li>
                <span></span
                >首席应援是为每个上榜玩家贡献名气值最多的玩家，当上榜玩家获得奖励时，首席应援玩家也可获得应援奖励。若同一玩家为多位上榜玩家应援，则只能获得1次应援奖励，按最大名次派发。
              </li>
            </ul>
          </div>
          <div class="tit1">
            <div class="leftarrow"></div>
            <div class="tit">名人榜日榜奖励</div>
            <div class="rightarrow"></div>
          </div>
          <img class="day_award" :src="IconPath('tk_23.png')" alt="" />
          <div class="tit2">
            <div class="leftarrow"></div>
            <div class="tit">日榜应援奖励</div>
            <div class="rightarrow"></div>
          </div>
          <img class="day_award" :src="IconPath('tk_24.png')" alt="" />
          <!-- <div class="first">第一名</div>
          <div class="list">
            <div class="list_item">
              <div class="icon">
                <public-json jsonName="mp_ddlzn" />
              </div>
              <div class="num">铭牌+365天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <PublicSvga
                  class="lottie"
                  svgaName="ts_ldzz"
                  :userAvatar="$store.getters.user_icon"
                />
              </div>
              <div class="num">头饰+30天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <img :src="IconPath('yb_120_120.png')" alt="" />
              </div>
              <div class="num">元宝+300万</div>
            </div>
          </div>
          <div class="first">第二名</div>
          <div class="list">
            <div class="list_item">
              <div class="icon">
                <public-json jsonName="mp_ddlzn" />
              </div>
              <div class="num">铭牌+90天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <PublicSvga
                  class="lottie"
                  svgaName="ts_ldzz"
                  :userAvatar="$store.getters.user_icon"
                />
              </div>
              <div class="num">头饰+15天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <img :src="IconPath('yb_120_120.png')" alt="" />
              </div>
              <div class="num">元宝+150万</div>
            </div>
          </div>
          <div class="third">第三名</div>
          <div class="list">
            <div class="list_item">
              <div class="icon">
                <public-json jsonName="mp_ddlzn" />
              </div>
              <div class="num">铭牌+30天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <PublicSvga
                  class="lottie"
                  svgaName="ts_ldzz"
                  :userAvatar="$store.getters.user_icon"
                />
              </div>
              <div class="num">头饰+7天</div>
            </div>
            <div class="list_item">
              <div class="icon">
                <img :src="IconPath('yb_120_120.png')" alt="" />
              </div>
              <div class="num">元宝+100万</div>
            </div>
          </div>
          <div class="last_list">
            <div class="left">
              <div class="after3">第四~五名</div>
              <div class="list list3">
                <div class="list_item">
                  <div class="icon">
                    <PublicSvga
                      class="lottie"
                      svgaName="ts_ldzz"
                      :userAvatar="$store.getters.user_icon"
                    />
                  </div>
                  <div class="num">头饰+7天</div>
                </div>
                <div class="list_item">
                  <div class="icon">
                    <img :src="IconPath('yb_120_120.png')" alt="" />
                  </div>
                  <div class="num">元宝+100万</div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="after3">第六~十名</div>
              <div class="list list3">
                <div class="list_item">
                  <div class="icon">
                    <PublicSvga
                      class="lottie"
                      svgaName="ts_ldzz"
                      :userAvatar="$store.getters.user_icon"
                    />
                  </div>
                  <div class="num">头饰+7天</div>
                </div>
                <div class="list_item">
                  <div class="icon">
                    <img :src="IconPath('yb_120_120.png')" alt="" />
                  </div>
                  <div class="num">元宝+100万</div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- 说明文字 -->
          <div class="ThemeBox_BottomText">
            <ul>
              <li><span></span>藏宝图：可消耗1张藏宝图，进行1次符石寻宝。</li>
              <li>
                <span></span>黄金藏宝图：可消耗1张黄金藏宝图，进行30次符石寻宝。
              </li>
            </ul>
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
// import PublicSvga from '../../../../components/PublicSvga.vue'
// import PublicJson from '../../../../components/PublicJson.vue'

export default {
  props: ['chagBgFlag'],
  //   components: { PublicSvga, PublicJson },
  data() {
    return {
      showPopup: false
    }
  },
  watch: {
    showPopup: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          document.querySelector('html').style.overflow = 'hidden'
        } else {
          document.querySelector('html').style.overflow = 'auto'
        }
      }
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.showPopup = false
    },
    clickConfirm() {}
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;

  //   pointer-events: none;
}

.popup-content {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 609px;
  min-height: 418px;
  height: fit-content;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  border-radius: 60px;
  background-color: transparent;
  border-bottom: none;

  .inner-content {
    width: 100%;
    min-height: 418px;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;
    .main-content {
      height: 893px;
      position: relative;
      z-index: 4;
      width: 100%;
      min-height: 418px;
      padding-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
      margin-top: 49px;
      margin-bottom: 20px;
      div {
        flex-shrink: 0;
      }
      img {
        flex-shrink: 0;
      }
      .tit1,
      .tit2 {
        display: flex;
        align-items: center;
        justify-content: center;
        // margin-top: 20px;
        margin-top: 28px;

        .leftarrow,
        .rightarrow {
          width: 140px;
          height: 26px;
          background-size: 100% 100%;
        }

        .leftarrow {
          background-image: url('../../../../assets/tk_20.png');
        }

        .tit {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          margin: 0 33px;
        }

        .rightarrow {
          background-image: url('../../../../assets/tk_21.png');
        }
      }
      .tit1 {
        margin-top: 11px;
      }

      .day_award {
        width: 554px;
        height: 388px;
        margin-top: 22px;
      }

      .tit2 {
        margin-top: 32px;
      }

      .first,
      .third,
      .after3 {
        flex-shrink: 0;
        width: 199px;
        height: 42px;
        background: #c9432d;
        border-radius: 21px;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
      }

      .list {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 20px;

        .list_item {
          width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 18px;
          margin-left: 42px;

          .icon {
            width: 120px;
            height: 120px;
            background: #ffffff;
            border: 4px solid #d14514;
            border-radius: 12px;
            // overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .price {
              position: absolute;
              top: -7px;
              right: -13px;
              width: 95px;
              height: 34px;
              background: #ee7dff;
              border-radius: 17px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;

              img {
                width: 27px;
                height: 20px;
              }
            }

            img {
              width: 100%;
              height: 100%;
            }

            .lottie {
              overflow: hidden;
              width: 82%;
              height: 82%;

              ::v-deep .micAvatar_img {
                width: 82%;
                height: 82%;
              }
            }

            .sb {
              ::v-deep .micAvatar_img {
                width: 70%;
                height: 70%;
              }
            }
          }

          .sb_icon {
            width: 120px;
            height: 120px;

            .sb {
              width: 114%;
              height: 114%;
              flex-shrink: 0;

              ::v-deep .micAvatar_img {
                width: 70%;
                height: 70%;
              }
            }
          }

          .num {
            margin-top: 16px;
            // width: 113px;
            height: 23px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            white-space: nowrap;
            // letter-spacing: -1px;
          }
        }

        .list_item:nth-child(1) {
          margin-left: 0;
        }
      }
      .last_list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .left,
        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
          .list_item {
            margin-left: 19px;
          }
          .list_item:first-child {
            margin-left: 0;
          }
        }
        .right {
          margin-left: 19px;
        }
      }
      .ThemeBox_BottomText {
        margin-top: 23px;
        margin-bottom: 17px;
        margin-left: 38px !important;
        margin-right: 18px !important;
        li {
          font-size: 24px !important;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 36px !important;
          position: relative;
          i {
            color: #ffe683;
          }
          span {
            position: absolute;
            top: 13px !important;
            left: -24px !important;
            width: 12px;
            height: 12px;
            background: #ffe467;
            border-radius: 50%;
          }
        }
      }
    }
    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      //opacity: 0.5;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.title-image {
  width: 598px;
  height: 188px;
  position: absolute;
  top: -143px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 42px auto 0;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
