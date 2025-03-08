<template>
  <div class="turnCard">
    <div class="main">
      <div class="card" v-for="item in cardsTurnList" :key="item.id">
        <!-- 未翻的卡 -->
        <div
          :class="['flipItem', item.isFilp ? 'flip' : null]"
          v-if="item.is_flip === false"
          @click="turnCardCk(item, 1)"
          @animationend="FlipEnd(item)"
        >
          <!-- 卡背 -->
          <div class="cardBack" v-if="!item.flipEnd">
            <div class="turnText" v-if="!item.isFliping"></div>
            <div :class="[isFirstFree && item.use_num == 1 ? 'free' : 'needCoinNum']" v-if="!item.isFliping">
              <img v-if="!(isFirstFree && item.use_num == 1)" class="coinIcon" :src="IconPath('mk4_1.png')" />
              <span v-if="!(isFirstFree && item.use_num == 1)">{{ item.use_num }}</span>
            </div>
            <div v-if="!item.is_lock && !item.isFliping" class="isLock"></div>
          </div>
          <!-- 卡面 -->
          <div :class="['cardFace', item.flipEnd ? 'flipEnd' : null, item.award.is_rare ? 'rare' : 'null']" v-if="item.isFilp">
            <div v-if="item.award.is_rare" class="rareIcon"></div>
            <div class="awardIcon">
              <img :src="IconPath(item.award.icon)" />
            </div>
            <div class="numText">{{ item.award.text }}</div>
            <div class="givedIcon"></div>
          </div>
        </div>
        <!-- 已翻的卡 -->
        <div :class="['cardTurned', item.award.is_rare ? 'rare' : 'null']" v-else>
          <div v-if="item.award.is_rare" class="rareIcon"></div>
          <div class="awardIcon">
            <img :src="IconPath(item.award.icon)" />
          </div>
          <div class="numText">{{ item.award.text }}</div>
          <div class="givedIcon"></div>
        </div>
      </div>
      <div class="tip1"></div>
      <div class="tip2"></div>
    </div>
    <div class="btnDiv">
      <div class="refreshBtn" @click="refreshBtnCkSon"></div>
      <div class="turnOneBtnFree" v-if="isFirstFree" @click="turnOneBtnCkSon"></div>
      <div class="turnOneBtn" v-else @click="turnOneBtnCkSon">
        <span class="num">{{ turnOneNeed }}</span>
      </div>
      <div class="turnAllBtn" @click="turnAllBtnCkSon">
        <span class="num">{{ turnAllNeed }}</span>
      </div>
      <div class="recordsBtn" @click="recordsBtnCkSon"></div>
    </div>
    <van-popup v-model="isShowreRresh" :close-on-click-overlay="false" @click-overlay="clickClosereRresh">
      <div class="popup-content">
        <div class="mainPo">
          <div class="tips">当前卡牌已翻完，是否刷新</div>
          <div class="cancel" @click="clickClosereRresh">否</div>
          <div class="confirm" @click="refreshBtnCkSon">是</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { _throttle } from '@/pages/qingMing/utils/tool'
import { getPageData } from '@/pages/qingMing/api/index.js'

export default {
  name: 'turnCard',
  props: ['cardsTurnList', 'isFirstFree', 'turnOneNeed', 'turnAllNeed'],
  data() {
    return {
      isShowreRresh: false,
      isFlipingF: false // 是否在翻牌中
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // console.log('cardsTurnList:', this.cardsTurnList)
  },
  methods: {
    /**
     * 翻卡
     */
    turnCardCk: _throttle(function (item, ck) {
      if (ck) {
        this.$emit('thinkings', '点击翻牌')
      }
      if (item.is_flip === false && item.is_lock === true && this.isFlipingF == false) {
        console.log('翻卡id:', item.id)
        getPageData({ type: 'love_card_flip_one', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            this.$set(item, 'award', res.data.award)
            setTimeout(() => {
              this.$set(item, 'isFliping', true)
              this.$set(item, 'isFilp', true) // isFilp是否播放翻卡动画，true即开始播放
              this.isFlipingF = true
              // 有限时任务即触发
              if (res.data.task.id) {
                this.$emit('startTimeTask', res.data.task, true)
              }
            })
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          }
        })
      }
    }, 2500),
    FlipEnd(item) {
      console.log('卡牌翻完')
      this.$set(item, 'flipEnd', true) // flipEnd是否翻完，true即不再显示卡背
      this.getUserInformationSon()
      this.isFlipingF = false
    },
    getUserInformationSon: _throttle(function (item) {
      this.$emit('getUserInformation')
    }, 1000),
    /**
     * 刷新
     */
    clickClosereRresh() {
      this.isShowreRresh = false
    },
    refreshBtnCkSon: _throttle(function () {
      this.isShowreRresh = false
      if (this.isFlipingF == false) {
        getPageData({ type: 'love_card_refresh' }).then((res) => {
          this.$emit('thinkings', '刷新')
          if (res.errno == 0) {
            this.getUserInformationSon()
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    }, 1000),
    /**
     * 记录
     */
    recordsBtnCkSon() {
      this.$emit('recordsBtnCk')
    },
    /**
     * 翻一张
     */
    turnOneBtnCkSon() {
      this.$emit('thinkings', '翻开1张')
      let judegTurn = 0
      for (const item of this.cardsTurnList) {
        // console.log(item)
        if (item.is_flip === false && item.is_lock === true) {
          // console.log(item.id)
          this.turnCardCk(item)
          judegTurn = 1
          break
        }
      }
      if (judegTurn == 0) {
        this.isShowreRresh = true
      }
    },
    /**
     * 翻全部
     */
    turnAllBtnCkSon: _throttle(function () {
      this.$emit('thinkings', '翻开全部')
      if (this.isFlipingF == false) {
        getPageData({
          type: 'love_card_flip_all',
          mark: this.turnAllNeed
        }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            let i = 0
            for (const it of this.cardsTurnList) {
              if (it.is_flip === false) {
                this.$set(it, 'award', res.data.award[i])
                i++
                setTimeout(() => {
                  this.$set(it, 'isFliping', true) // isFliping是否正在播放，true即在播放中
                  this.$set(it, 'isFilp', true) // isFilp是否播放翻卡动画，true即开始播放
                  this.isFlipingF = true
                })
              }
            }
            // 有限时任务即触发
            setTimeout(() => {
              if (res.data.task.id) {
                // console.log('task', res.data.task)
                this.$emit('startTimeTask', res.data.task, true)
              }
            })
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          } else if (res.errno == -2) {
            this.isShowreRresh = true
          }
        })
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.turnCard {
  .main {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: space-between;
    position: relative;
    .card {
      width: 219px;
      height: 277px;
      position: relative;
      .flipItem {
        width: 219px;
        height: 277px;
        transform-style: preserve-3d; // 开启3D透视
        backface-visibility: hidden; // 该行在电脑与手机的适配有问题
        .cardBack {
          width: 219px;
          height: 277px;
          background: url('@/pages/qingMing/assets/mk4_5.png') no-repeat;
          background-size: 100% 100%;
          .turnText {
            width: 135px;
            height: 45px;
            background: url('@/pages/qingMing/assets/mk4_7.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 25px;
            z-index: 2;
          }
          .free {
            width: 140px;
            height: 38px;
            background: url('@/pages/qingMing/assets/mk4_6.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 40%;
            transform: translate(-50%);
            bottom: 70px;
            z-index: 2;
          }
          .needCoinNum {
            width: 154px;
            height: 30px;
            background: url('@/pages/qingMing/assets/mk4_10.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 70px;
            z-index: 2;
            text-align: center;
            color: #ffffff;
            font-size: 28px;
            font-weight: 500;
            .coinIcon {
              width: 27px * 0.9;
              height: 26px * 0.9;
            }
          }
          .isLock {
            width: 219px;
            height: 277px;
            background: url('@/pages/qingMing/assets/mk4_9.png') no-repeat;
            background-size: 100% 100%;
            z-index: 3;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .cardFace {
          width: 219px;
          height: 277px;
          position: absolute;
          left: 0;
          top: 0;
          background: url('@/pages/qingMing/assets/mk4_5_1.png') no-repeat;
          background-size: 100% 100%;
          backface-visibility: hidden;
          transform: rotateY(180deg); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
          &.flipEnd {
            // background: red;
            transform: rotateY(0deg);
            backface-visibility: visible;
          }
          .rareIcon {
            width: 80px;
            height: 38px;
            background: url('@/pages/qingMing/assets/icon_xy.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -10px;
            left: 140px;
          }
          .awardIcon {
            width: 188px;
            height: 188px;
            background: url('@/pages/qingMing/assets/mk2_1.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translate(-50%);
            img {
              width: 120px;
              height: 120px;
              position: absolute;
              left: 50%;
              transform: translate(-50%);
              top: 10px;
            }
          }
          .numText {
            font-size: 24px;
            color: #ffffff;
            position: absolute;
            top: 170px;
            left: 50%;
            transform: translate(-50%);
          }
          .givedIcon {
            width: 166px;
            height: 40px;
            background: url('@/pages/qingMing/assets/mk4_10.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 210px;
            text-align: center;
            font-size: 24px;
            line-height: 40px;
            &::after {
              content: '已发放';
            }
          }
          &.rare {
            background: url('@/pages/qingMing/assets/mk4_5_2.png') no-repeat;
            background-size: 100% 100%;
            .givedIcon {
              background: url('@/pages/qingMing/assets/mk4_10.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .cardTurned {
        width: 219px;
        height: 277px;
        background: url('@/pages/qingMing/assets/mk4_5_1.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .rareIcon {
          width: 80px;
          height: 38px;
          background: url('@/pages/qingMing/assets/icon_xy.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: -10px;
          left: 140px;
        }
        .awardIcon {
          width: 188px;
          height: 188px;
          background: url('@/pages/qingMing/assets/mk2_1.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translate(-50%);
          img {
            width: 120px;
            height: 120px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 10px;
          }
        }
        .numText {
          font-size: 24px;
          color: #ffffff;
          position: absolute;
          top: 170px;
          left: 50%;
          transform: translate(-50%);
        }
        .givedIcon {
          width: 166px;
          height: 40px;
          background: url('@/pages/qingMing/assets/mk4_10.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 210px;
          text-align: center;
          font-size: 24px;
          line-height: 40px;
          &::after {
            content: '已发放';
          }
        }
        &.rare {
          background: url('@/pages/qingMing/assets/mk4_5_2.png') no-repeat;
          background-size: 100% 100%;
          .numText {
            color: #ffffff;
          }
          .givedIcon {
            background: url('@/pages/qingMing/assets/mk4_10.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      @keyframes CardRotate {
        from {
          transform: rotateY(0deg);
        }
        to {
          transform: rotateY(180deg);
        }
      }
      .flip {
        animation: CardRotate 2s;
        // transform: rotateY(180deg); // 点击容器，翻转图片
      }
    }
    .tip1 {
      position: absolute;
      width: 407px;
      height: 63px;
      background: url('@/pages/qingMing/assets/mk4_8.png') no-repeat;
      background-size: 100% 100%;
      top: 290px;
      left: 50%;
      transform: translate(-50%);
    }
    .tip2 {
      position: absolute;
      width: 407px;
      height: 63px;
      background: url('@/pages/qingMing/assets/mk4_23.png') no-repeat;
      background-size: 100% 100%;
      top: 650px;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .btnDiv {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .refreshBtn {
      width: 79px;
      height: 79px;
      background: url('@/pages/qingMing/assets/mk4_11.png') no-repeat;
      background-size: 100% 100%;
    }
    .turnOneBtnFree {
      width: 260px;
      height: 153px;
      background: url('@/pages/qingMing/assets/btn_7.png') no-repeat;
      background-size: 100% 100%;
      margin-top: -30px;
    }
    .turnOneBtn {
      width: 260px;
      height: 153px;
      background: url('@/pages/qingMing/assets/btn_7_2.png') no-repeat;
      background-size: 100% 100%;
      margin-top: -30px;
      .num {
        color: #16474a;
        position: relative;
        left: 130px;
        top: 55px;
      }
    }
    .turnAllBtn {
      width: 260px;
      height: 153px;
      background: url('@/pages/qingMing/assets/btn_8_1.png') no-repeat;
      background-size: 100% 100%;
      margin-top: -30px;
      .num {
        color: #ffffff;
        position: relative;
        left: 130px;
        top: 55px;
      }
    }
    .recordsBtn {
      width: 79px;
      height: 79px;
      background: url('@/pages/qingMing/assets/mk4_12.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    position: relative;
    width: 568px;
    min-height: 329px;
    padding: 5px;
    pointer-events: auto;
    background: url('@/pages/qingMing/assets/tk_bg_6.png') no-repeat;
    background-size: 100% 100%;
    .mainPo {
      width: 100%;
      text-align: center;
      text-align: -webkit-center;
      overflow-y: scroll;
      .tips {
        font-size: 32px;
        color: #ffffff;
        margin-top: 90px;
      }
      .cancel {
        width: 160px;
        height: 72px;
        background: linear-gradient(180deg, #0daa92, #13494c);
        border-radius: 36px;
        border: 2px solid #deffb2;
        font-size: 32px;
        color: #ffffff;
        line-height: 72px;
        position: absolute;
        left: 27%;
        transform: translate(-50%);
        bottom: 60px;
      }
      .confirm {
        width: 160px;
        height: 72px;
        background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
        border-radius: 36px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #00aaa3, #8ecf73);
        font-size: 32px;
        color: #16474a;
        line-height: 72px;
        position: absolute;
        left: 73%;
        transform: translate(-50%);
        bottom: 60px;
      }
    }
  }
}
</style>
