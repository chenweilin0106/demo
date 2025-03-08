<template>
  <!-- 兑换好礼弹框 -->
  <ThemeDialog
    class="dialog"
    :isShow="isshow"
    dialogMark="exchargeGift"
    :titleIconObj="{ exchargeGift: 'title_15.png' }"
    @closeDialog="
      isshow = false
      closeDialog()
    "
  >
    <div class="content">
      <div class="tit1">
        <div class="leftarrow"></div>
        <div class="tit">超级神豪日榜</div>
        <div class="rightarrow"></div>
      </div>
      <img class="day_award" :src="IconPath('tk_10.png')" alt="" />
      <div class="tit2">
        <div class="leftarrow"></div>
        <div class="tit">超级神豪总榜</div>
        <div class="rightarrow"></div>
      </div>
      <div class="first">总榜TOP1</div>
      <!-- 神豪第一名 -->
      <div class="list">
        <div class="list_item">
          <div class="icon">
            <img :src="IconPath('ljs_120_120.png')" alt="" />
          </div>
          <div class="num">+6888</div>
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
            <!-- <PublicSvga class="lottie" svgaName="gift_xymf" /> -->
            <img src="../../../assets/xymf_120_120.png" alt="" />
          </div>
          <div class="num">赠送权+30天</div>
        </div>
        <div class="list_item">
          <div class="icon">
            <public-json jsonName="ch_zfz1" />
          </div>
          <div class="num">称号+30天</div>
        </div>
      </div>
      <div class="first">总榜TOP2</div>
      <!-- 神豪第二名 -->
      <div class="list">
        <div class="list_item">
          <div class="icon">
            <img :src="IconPath('ljs_120_120.png')" alt="" />
          </div>
          <div class="num">+3888</div>
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
            <img src="../../../assets/xymf_120_120.png" alt="" />
          </div>
          <div class="num">赠送权+15天</div>
        </div>
        <div class="list_item">
          <div class="icon">
            <public-json jsonName="ch_zfz1" />
          </div>
          <div class="num">称号+15天</div>
        </div>
      </div>
      <div class="third">总榜TOP3</div>
      <!-- 神豪第三名 -->
      <div class="list">
        <div class="list_item">
          <div class="icon">
            <img :src="IconPath('ljs_120_120.png')" alt="" />
          </div>
          <div class="num">+1888</div>
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
            <img src="../../../assets/xymf_120_120.png" alt="" />
          </div>
          <div class="num">赠送权+7天</div>
        </div>
        <div class="list_item">
          <div class="icon">
            <public-json jsonName="ch_zfz1" />
          </div>
          <div class="num">称号+7天</div>
        </div>
      </div>
      <div class="after3">总榜TOP4-10</div>
      <!-- 神豪4-10 -->
      <div class="list list3">
        <div class="list_item">
          <div class="icon">
            <img :src="IconPath('ljs_120_120.png')" alt="" />
          </div>
          <div class="num">+888</div>
        </div>
        <div class="list_item">
          <div class="icon">
            <PublicSvga
              class="lottie"
              svgaName="ts_ldzz"
              :userAvatar="$store.getters.user_icon"
            />
          </div>
          <div class="num">头饰+3天</div>
        </div>
        <div class="list_item">
          <div class="icon">
            <img src="../../../assets/xymf_120_120.png" alt="" />
          </div>
          <div class="num">赠送权+3天</div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>总榜奖励条件：累计充值达到3,000元且结算时达到获奖名次
          </li>
          <li>
            <span></span
            >征服者属性称号：佛山无影脚技能基础命中增加10%，基础闪避增加10%
          </li>
        </ul>
      </div>
    </div>
  </ThemeDialog>
</template>

<script>
import PublicSvga from '../../../components/PublicSvga.vue'
import PublicJson from '../../../components/PublicJson.vue'
import ThemeDialog from '../../../components/Dialog/ThemeDialog'
export default {
  props: ['show', 'tabflag'],
  components: { PublicSvga, PublicJson, ThemeDialog },
  watch: {
    show: {
      handler(newValue) {
        this.isshow = newValue
      },
      immediate: true
    }
  },
  data() {
    return {
      isshow: false,
      list: []
    }
  },
  methods: {
    closeDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  width: 626px;
  margin-top: 100px;
}
.content {
  width: 100%;
  height: 981px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-bottom: 23px;

  .tit1,
  .tit2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    .leftarrow,
    .rightarrow {
      width: 140px;
      height: 26px;
      background-size: 100% 100%;
    }

    .leftarrow {
      background-image: url('../../../assets/tk_11.png');
    }

    .tit {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin: 0 33px;
    }

    .rightarrow {
      background-image: url('../../../assets/tk_12.png');
    }
  }

  .day_award {
    width: 554px;
    height: 304px;
    margin-top: 22px;
  }

  .tit2 {
    margin-top: 32px;
  }

  .first,
  .third,
  .after3 {
    flex-shrink: 0;
    width: 240px;
    height: 42px;
    background: #603794;
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
      margin-left: 23px;

      .icon {
        width: 120px;
        height: 120px;
        background: linear-gradient(0deg, #ffffff, #fcdaff);
        border: 4px solid #7446d1;
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
  .ThemeBox_BottomText {
    margin-top: 11px;
    margin-bottom: 17px;
    margin-left: 17px !important;
    margin-right: 30px !important;
    li {
      font-size: 24px !important;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 36px !important;
      span {
        top: 13px !important;
        left: -18px !important;
      }
    }
  }
}
</style>
