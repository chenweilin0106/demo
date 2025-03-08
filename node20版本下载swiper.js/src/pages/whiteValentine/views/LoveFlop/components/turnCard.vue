<template>
  <div class="turnCard">
    <div class="main">
      <div class="card" v-for="(item) in cardsTurnList" :key="item.id">
        <!-- 未翻的卡 -->
        <div :class="['flipItem',item.isFilp?'flip':null]" v-if="item.is_flip === false" @click="turnCardCk(item, 1)" @animationend="FlipEnd(item)">
          <!-- 卡背 -->
          <div class="cardBack" v-if="!item.flipEnd">
            <div class="turnText" v-if="!item.isFliping"></div>
            <div :class="[(isFirstFree&&item.use_num==1)?'free':'needLoveNum']" v-if="!item.isFliping">
              <img v-if="!(isFirstFree&&item.use_num==1)" class="loveIcon" :src="IconPath('mk1_1_1.png')" />
              <span v-if="!(isFirstFree&&item.use_num==1)">{{item.use_num}}</span>
            </div>
            <div v-if="!item.is_lock&&!item.isFliping" class="isLock"></div>
          </div>
          <!-- 卡面 -->
          <div :class="['cardFace',item.flipEnd?'flipEnd':null,item.award.is_rare?'rare':'null']" v-if="item.isFilp">
            <div v-if="item.award.is_rare" class="rareIcon"></div>
            <div class="awardIcon">
              <img :src="IconPath(item.award.icon)" />
            </div>
            <div class="numText">{{item.award.text}}</div>
            <div class="givedIcon"></div>
          </div>
        </div>
        <!-- 已翻的卡 -->
        <div :class="['cardTurned',item.award.is_rare?'rare':'null']" v-else>
          <div v-if="item.award.is_rare" class="rareIcon"></div>
          <div class="awardIcon">
            <img :src="IconPath(item.award.icon)" />
          </div>
          <div class="numText">{{item.award.text}}</div>
          <div class="givedIcon"></div>
        </div>
      </div>
      <div class="tip1"></div>
      <div class="tip2"></div>
    </div>
    <div class="btnDiv">
      <div class="refreshBtn" @click="refreshBtnCkSon"></div>
      <div class="turnOneBtnFree" v-if="isFirstFree" @click="turnOneBtnCkSon"></div>
      <div class="turnOneBtn" v-else @click="turnOneBtnCkSon"><span class="num">{{turnOneNeed}}</span></div>
      <div class="turnAllBtn" @click="turnAllBtnCkSon"><span class="num">{{turnAllNeed}}</span></div>
      <div class="recordsBtn" @click="recordsBtnCkSon"></div>
    </div>
    <van-popup
      v-model="isShowreRresh"
      :close-on-click-overlay="false"
      @click-overlay="clickClosereRresh"
    >
      <div class="popup-content">
        <!-- 标题图片 -->
        <img class="title-image" :src="IconPath('tk_6_18.png')" />
        <div class="mainPo">
          <div class="type1">
            <div class="tips">当前卡牌已翻完，是否刷新</div>
            <div class="cancel" @click="clickClosereRresh">否</div>
            <div class="confirm" @click="refreshBtnCkSon">是</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { _throttle } from '@/pages/whiteValentine/utils/tool'
import { getPageData } from '@/pages/whiteValentine/api/index.js'

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
            this.$toast('刷新失败')
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
      for (let item of this.cardsTurnList) {
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
        getPageData({ type: 'love_card_flip_all', mark: this.turnAllNeed }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            let i = 0
            for (let it of this.cardsTurnList) {
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
.turnCard{
  .main{
    width: 100%;
    height: 1000px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: space-between;
    position: relative;
    .card{
      width: 217px;
      height: 277px;
      position: relative;
      .flipItem{
        width: 217px;
        height: 277px;
        transform-style: preserve-3d; // 开启3D透视
        backface-visibility: hidden; // 该行在电脑与手机的适配有问题
        .cardBack{
          width: 217px;
          height: 277px;
          background: url('@/pages/whiteValentine/assets/card_01.png') no-repeat;
          background-size: 100% 100%;
          .turnText{
            width: 133px;
            height: 44px;
            background: url('@/pages/whiteValentine/assets/card_03.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 25px;
            z-index: 2;
          }
          .free{
            width: 140px;
            height: 38px;
            background: url('@/pages/whiteValentine/assets/card_04.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 40%;
            transform: translate(-50%);
            bottom: 70px;
            z-index: 2;
          }
          .needLoveNum{
            width: 154px;
            height: 30px;
            background: url('@/pages/whiteValentine/assets/card_05.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 70px;
            z-index: 2;
            text-align: center;
            color: #EE669E;
            font-weight: 500;
            .loveIcon{
              width: 42px*0.8;
              height: 34px*0.8;
            }
          }
          .isLock{
            width: 217px;
            height: 277px;
            background: url('@/pages/whiteValentine/assets/card_02.png') no-repeat;
            background-size: 100% 100%;
            z-index: 3;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .cardFace{
          width: 217px;
          height: 277px;
          position: absolute;
          left: 0;
          top: 0;
          background: url('@/pages/whiteValentine/assets/card_fk.png') no-repeat;
          background-size: 100% 100%;
          backface-visibility: hidden;
          transform: rotateY(180deg); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
          &.flipEnd{
            // background: red;
            transform: rotateY(0deg);
            backface-visibility: visible;
          }
          .rareIcon{
            width: 80px;
            height: 38px;
            background: url('@/pages/whiteValentine/assets/icon_xy.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -10px;
            left: 140px;
          }
          .awardIcon{
            width: 128px;
            height: 128px;
            background: #FFFFFF;
            border-radius: 12px;
            border: 4px solid #F6A1B0;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translate(-50%);
            img{
              width: 120px;
              height: 120px;
            }
          }
          .numText{
            font-size: 24px;
            color: #B35553;
            position: absolute;
            top: 170px;
            left: 50%;
            transform: translate(-50%);
          }
          .givedIcon{
            width: 166px;
            height: 40px;
            background: url('@/pages/whiteValentine/assets/card_fk_01.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 210px;
            text-align: center;
            font-size: 24px;
            line-height: 40px;
            &::after{
              content: '已发放';
            }
          }
          &.rare{
            background: url('@/pages/whiteValentine/assets/card_fk_xy.png') no-repeat;
            background-size: 100% 100%;
            .awardIcon{
              border: 4px solid #F9DBA2;
            }
            .numText{
              color: #824F1B;
            }
            .givedIcon{
              background: url('@/pages/whiteValentine/assets/card_fk_xy_01.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .cardTurned{
        width: 217px;
        height: 277px;
        background: url('@/pages/whiteValentine/assets/card_fk.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .rareIcon{
          width: 80px;
          height: 38px;
          background: url('@/pages/whiteValentine/assets/icon_xy.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: -10px;
          left: 140px;
        }
        .awardIcon{
          width: 128px;
          height: 128px;
          background: #FFFFFF;
          border-radius: 12px;
          border: 4px solid #F6A1B0;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translate(-50%);
          img{
            width: 120px;
            height: 120px;
          }
        }
        .numText{
          font-size: 24px;
          color: #B35553;
          position: absolute;
          top: 170px;
          left: 50%;
          transform: translate(-50%);
        }
        .givedIcon{
          width: 166px;
          height: 40px;
          background: url('@/pages/whiteValentine/assets/card_fk_01.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 210px;
          text-align: center;
          font-size: 24px;
          line-height: 40px;
          &::after{
            content: '已发放';
          }
        }
        &.rare{
          background: url('@/pages/whiteValentine/assets/card_fk_xy.png') no-repeat;
          background-size: 100% 100%;
          .awardIcon{
            border: 4px solid #F9DBA2;
          }
          .numText{
            color: #824F1B;
          }
          .givedIcon{
            background: url('@/pages/whiteValentine/assets/card_fk_xy_01.png') no-repeat;
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
    .tip1{
      position: absolute;
      width: 407px;
      height: 63px;
      background: url('@/pages/whiteValentine/assets/tt_dyc.png') no-repeat;
      background-size: 100% 100%;
      top: 290px;
      left: 50%;
      transform: translate(-50%);
    }
    .tip2{
      position: absolute;
      width: 407px;
      height: 63px;
      background: url('@/pages/whiteValentine/assets/tt_dec.png') no-repeat;
      background-size: 100% 100%;
      top: 650px;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .btnDiv{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .refreshBtn{
      width: 79px;
      height: 79px;
      background: url('@/pages/whiteValentine/assets/btn_04.png') no-repeat;
      background-size: 100% 100%;
    }
    .turnOneBtnFree{
      width: 260px;
      height: 148px;
      background: url('@/pages/whiteValentine/assets/turnOneFree.png') no-repeat;
      background-size: 100% 100%;
      margin-top: -30px;
    }
    .turnOneBtn{
      width: 260px;
      height: 118px;
      background: url('@/pages/whiteValentine/assets/turnOne.png') no-repeat;
      background-size: 100% 100%;
      .num{
        color: #cf575c;
        position: relative;
        left: 140px;
        top: 25px;
      }
    }
    .turnAllBtn{
      width: 260px;
      height: 118px;
      background: url('@/pages/whiteValentine/assets/turnAll.png') no-repeat;
      background-size: 100% 100%;
      .num{
        color: #707ccb;
        position: relative;
        left: 130px;
        top: 25px;
      }
    }
    .recordsBtn{
      width: 79px;
      height: 79px;
      background: url('@/pages/whiteValentine/assets/btn_03.png') no-repeat;
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
    width: 620px;
    min-height: 300px;
    border: 5px solid #f6a1b0;
    background-color: #fff;
    padding: 5px;
    pointer-events: auto;
    border-radius: 34px;
    background: linear-gradient(180deg, #FFF3F4, #F9C4C7);
    .title-image {
      width: 644px;
      height: 230px;
      position: absolute;
      z-index: 3;
      top: -85px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .mainPo{
      width: 100%;
      text-align: center;
      text-align: -webkit-center;
      overflow-y: scroll;
      .type1{
        width: 100%;
        height: 400px; // 控制type1高度
        padding-top: 60px;
        position: relative;
        .tips{
          color: #cf575c;
          font-size: 32px;
          margin-top: 100px;
        }
        .cancel{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #707CCB;
          line-height: 72px;
          position: absolute;
          left: 27%;
          transform: translate(-50%);
          bottom: 30px;
        }
        .confirm{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #A9792C;
          line-height: 72px;
          position: absolute;
          left: 73%;
          transform: translate(-50%);
          bottom: 30px;
        }
      }
    }
  }
}
</style>
