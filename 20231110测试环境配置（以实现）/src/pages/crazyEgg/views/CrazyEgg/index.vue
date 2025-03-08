<template>
  <div class="CrazyEgg">
    <!--砸蛋-->
    <div class="smash-egg">
      <div class="rule-button" @click="openRule(false)"></div>
      <div class="smash-info">
        <div class="hammer-num">
          <img :src="IconPath('cz_26_34.png')" />
          100
        </div>
        <div class="diamond-num">
          <img :src="IconPath('mk4_15.png')" />
          1000000
        </div>
      </div>
      <div class="prize-pool">
        <div class="price-pool-num">1,000,000,000</div>
      </div>
      <!--蛋列表-->
      <div class="eggs-list">
        <div v-for="item in 5" :key="item" class="egg-box">
          <div
            class="egg-main"
            :class="{
              'normal-animation': false,
              'smash-animation': animationArray.includes(item)
            }"
            @click="smashEgg(1, item)"
            @animationend="animationEnd($event, item)"
          >
            <img :src="IconPath('dan_7.png')" />
          </div>
          <!--<div v-if="false" class="light">-->
          <!--  <img :src="IconPath('dan_light_2.png')" />-->
          <!--</div>-->
          <div class="json-light">
            <public-json jsonName="crazy_egg_light" />
          </div>
          <div class="base"></div>
          <div
            class="hammer"
            :class="{ 'hammer-animation': animationArray.includes(item) }"
          ></div>
        </div>
      </div>
      <div class="smash-button" @click.self="smashEgg(2)"></div>
    </div>
    <!--说明文本-->
    <div class="rule-txt">
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>玩家每消费198钻石自动获得1个<img
              :src="IconPath('cz_26_34.png')"
            />，可选择手
          </li>
          <li>动砸蛋或一键砸蛋。</li>
          <li><span></span>每次砸蛋会获得随机奖励，砸破后蛋壳会自动刷新，</li>
          <li>有机会刷新到超级蛋。</li>
        </ul>
      </div>
    </div>
    <!--砸蛋进度-->
    <div class="smash-egg-status">
      <!--大奖预告按钮-->
      <div class="award-preview-button" @click="openRule(true)"></div>
      <div class="progress-bar-list">
        <div v-for="item in 5" :key="item" class="progress-bar">
          <!--文本-->
          <div class="progress-bar-txt">砸破的红色蛋：5</div>
          <div class="progress-bar-main">
            <div v-for="item in 5" :key="item" class="award-box">
              <div class="award-icon">
                <!--图标-->
                <img class="icon" :src="IconPath('fsjc_60_60.png')" />
                <!--数量-->
                <div class="num">+50</div>
                <!--红点-->
                <div v-if="false" class="red-point"></div>
                <!--遮盖层-->
                <div v-if="false" class="overlay"></div>
              </div>
              <div class="progress-num">5</div>
            </div>
            <!--进度条 13% 31.5% 50% 68.5% 87.5% 100%-->
            <div class="progress-bar-out">
              <div
                :style="{ width: progressWidth(25) }"
                class="progress-bar-inner"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--说明文本-->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>玩家砸破不同颜色的蛋达到进度可领取对应奖励。</li>
        </ul>
      </div>
    </div>
    <!--玩法说明弹框-->
    <transition name="fade">
      <game-play-desc-prompt
        v-if="showGamePlayDesc"
        :is-scroll="isScroll"
        @close="showGamePlayDesc = false"
      ></game-play-desc-prompt>
    </transition>
    <!--恭喜获得弹框-->
    <transition name="fade">
      <congrats-get-prompt
        v-if="showCongratsGet"
        :list="dialogData"
        row-num="3"
        @close="showCongratsGet = false"
      />
    </transition>
    <!--请选择弹框-->
    <transition name="fade">
      <please-select-prompt
        v-if="showPleaseSelect"
        @close="showPleaseSelect = false"
      />
    </transition>
  </div>
</template>

<script>
import PublicJson from '@/pages/crazyEgg/components/PublicJson.vue'
import { getPageData } from '../../api/index'
import PleaseSelectPrompt from './please-select-prompt.vue'
import CongratsGetPrompt from '@/pages/crazyEgg/components/congrats-get-prompt.vue'
import GamePlayDescPrompt from './gamePlay-desc-prompt.vue'

export default {
  name: 'CrazyEgg',
  components: {
    PublicJson,
    PleaseSelectPrompt,
    GamePlayDescPrompt,
    CongratsGetPrompt
  },
  data() {
    return {
      dialogData: [
        // {
        //   icon: 'yb_120_120.png',
        //   text: '元宝+5万'
        // },
        // {
        //   icon: 'yb_120_120.png',
        //   text: '元宝+5万'
        // },
        // {
        //   icon: 'yb_120_120.png',
        //   text: '元宝+5万'
        // }
        // {
        //   icon: 'yb_120_120.png',
        //   text: '元宝+5万'
        // }
      ],
      showPleaseSelect: false,
      showCongratsGet: false,
      showGamePlayDesc: false,
      isScroll: false,
      isSmashing: false,
      animationArray: []
    }
  },
  computed: {},
  created() {},
  methods: {
    // 监听砸蛋动画结束
    animationEnd(event, id) {
      console.log(event.animationName)
      console.log(id)
      if (event.animationName.includes('quick-shake')) {
        console.log('清除动画，id：', id)
        this.animationArray = this.animationArray.filter((item) => item != id)
        console.log(this.animationArray)
        if (this.animationArray.length === 0) {
          this.isSmashing = false
          // this.showCongratsGet = true
        }
      }
    },
    async smashEgg(mark, id, type) {
      if (this.isSmashing) return
      // if ('锤子数量足够') {
      //   if (mark === 1) {
      //     // 打开砸蛋限制器
      this.isSmashing = true
      //     const res = await this.smashEggApi(id, type)
      //     if (res.errno) {
      //       this.isSmashing = false
      //       this.$toast(res.errmsg)
      //       return
      //     }
      //     // 判断蛋的种类
      //     if (type == '贪婪蛋') {
      //       console.log('请求成功 种类：贪婪超级蛋', res.data)
      //       this.dialogData = res.data
      //       // 打开请选择弹框
      //       this.showPleaseSelect = true
      //     } else {
      //       console.log('请求成功 种类：普通蛋，普通超级蛋', res.data)
      //       this.dialogData = [res.data]
      //       // 打开恭喜获得弹框
      //       this.showCongratsGet = true
      //     }
      // }
      // else if (mark === 2) {
      this.animationArray.push(...[1, 2, 3, 4, 5])
      // }
      // } else {
      //   this.$toast('锤子不足，请先去消费吧')
      // }
    },
    openRule(flag) {
      console.log(flag)
      this.showGamePlayDesc = true
      if (flag) {
        this.isScroll = true
      }
    },
    // 进度条宽度计算
    progressWidth(num) {
      if (num <= 5) {
        return Math.floor((num / 5) * 0.13 * 100) + '%'
      } else if (num <= 10) {
        return Math.floor((((num - 5) / 5) * 0.185 + 0.13) * 100) + '%'
      } else if (num <= 15) {
        return Math.floor((((num - 10) / 5) * 0.185 + 0.315) * 100) + '%'
      } else if (num <= 20) {
        return Math.floor((((num - 15) / 5) * 0.185 + 0.5) * 100) + '%'
      } else if (num < 25) {
        return Math.floor((((num - 20) / 5) * 0.185 + 0.685) * 100) + '%'
      } else {
        return '100%'
      }
    },
    // 砸蛋请求
    smashEggApi(id, type) {
      return getPageData({
        type: 'smashEgg',
        'mark[id]': id,
        'mark[type]': type
      })
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes slow-shake {
  0% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(-5deg);
  }
}

@keyframes quick-shake {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(8deg);
  }
  45% {
    transform: rotate(-8deg);
  }
  60% {
    transform: rotate(8deg);
  }
  75% {
    transform: rotate(-8deg);
  }
  90% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes hammer-smash {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }

  30% {
    opacity: 1;
    transform: rotate(30deg);
  }
  60% {
    opacity: 1;
    //top: 20px;
    //right: -10px;
    transform: rotate(60deg);
  }
  80% {
    opacity: 1;
    //top: 25px;
    //right: -10px;
    transform: rotate(0deg);
  }
  100% {
    opacity: 0;
    //top: 25px;
    //right: -10px;
    transform: rotate(20deg);
  }
}

.CrazyEgg {
  .smash-egg {
    position: relative;
    width: 100%;
    height: 975px;
    background: url('@/pages/crazyEgg/assets/bg_9.png') no-repeat center
      top/auto 100%;
    overflow: hidden;

    .prize-pool {
      position: absolute;
      top: 46px;
      left: 50%;
      transform: translateX(-50%);
      width: 329px;
      height: 116px;
      background: url('@/pages/crazyEgg/assets/bg_10.png') no-repeat left
        top/100% auto;

      .price-pool-num {
        margin-top: 52px;
        font-size: 36px;
        font-weight: 500;
        color: #fff875;
        text-align: center;
        white-space: nowrap;
      }
    }

    .rule-button {
      position: absolute;
      top: 85px;
      right: 28px;
      width: 58px;
      height: 58px;
      background: url('@/pages/crazyEgg/assets/rule.png') no-repeat left
        top/100% auto;
    }

    .smash-info {
      width: fit-content;
      margin: 167px auto 0;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 500;
      color: #ffdb8f;

      .hammer-num {
        margin-right: 182px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 158px;
        width: fit-content;
        height: 42px;
        padding: 0 29px 0 12px;
        background: rgba(219, 130, 74, 0.3);
        border: 1px solid #c18251;
        border-radius: 21px;

        > img {
          width: 26px;
          height: 34px;
        }
      }

      .diamond-num {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 208px;
        width: fit-content;
        padding: 0 17px;
        height: 42px;
        background: rgba(219, 130, 74, 0.3);
        border: 1px solid #c18251;
        border-radius: 21px;

        > img {
          width: 35px;
          height: 27px;
        }
      }
    }

    .eggs-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 15px;

      .egg-box {
        position: relative;
        width: fit-content;

        .egg-main {
          position: relative;
          top: 35px;
          margin: 0 auto;
          z-index: 2;
          width: 170px;
          height: 194px;
          transform-origin: bottom;

          > img {
            width: 100%;
            height: 100%;
          }
        }

        .normal-animation {
          animation: slow-shake 2s infinite linear !important;
        }

        .smash-animation {
          animation: quick-shake 0.5s 0.5s linear !important;
          //animation-delay: 5s;
        }

        .light,
        .json-light {
          position: absolute;
          z-index: 3;
          top: 41px;
          left: 50%;
          transform: translateX(-50%);
          width: 235px;
          height: 201px;
          pointer-events: none; /* 遮盖层的点击事件透过 */

          > img {
            width: 100%;
            height: 100%;
          }
        }
        .json-light {
          top: 13px;
          width: 315px;
          height: fit-content;
          transform: translateX(-49%);
        }
        .base {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          width: 186px;
          height: 64px;
          background: url('@/pages/crazyEgg/assets/dan_di.png') no-repeat left
            top/100% auto;
        }

        .hammer {
          position: absolute;
          opacity: 0;
          z-index: 5;
          top: 50px;
          right: 10px;
          width: 76px;
          height: 102px;
          background: url('@/pages/crazyEgg/assets/cz_76_102.png') no-repeat
            left top/100% auto;
          transform-origin: 85% 96%;
          //animation: hammer-smash 1.5s linear infinite;
        }

        .hammer-animation {
          animation: hammer-smash 0.6s linear;
        }

        &:nth-of-type(1) {
          margin-left: 128px;
          margin-right: 68px;
          margin-bottom: 45px;
        }

        &:nth-of-type(2) {
          margin-right: 128px;
          margin-bottom: 45px;
        }

        &:nth-of-type(3) {
          margin-right: 30px;
        }

        &:nth-of-type(4) {
          margin-right: 30px;
        }
      }
    }

    .smash-button {
      margin: 40px auto 0;
      width: 340px;
      height: 107px;
      background: url('@/pages/crazyEgg/assets/btn_za.png') no-repeat left
        top/100% auto;
    }
  }

  .rule-txt {
    margin: 19px auto 32px;
    display: flex;
    //align-items: center;
    width: 720px;
    height: 190px;
    background: url('@/pages/crazyEgg/assets/bg_3.png') no-repeat left top/100%
      auto;

    .ThemeBox_BottomText {
      margin-top: 17px;
      margin-left: 65px;
      width: 623px;
      height: 147px;
      font-size: 28px;
      font-weight: 500;
      color: #fffefe;
      line-height: 40px;
      white-space: nowrap;

      img {
        margin: 0 10px;
        width: 26px;
        height: 34px;
      }

      span {
        top: 12px;
      }
    }
  }

  .smash-egg-status {
    position: relative;
    margin-bottom: 180px;
    width: 750px;
    height: 2055px;
    background: url('@/pages/crazyEgg/assets/mk4_bg.png') no-repeat left
      top/100% auto;
    overflow: hidden;

    .award-preview-button {
      position: absolute;
      top: 50px;
      right: 38px;
      background: url('@/pages/crazyEgg/assets/btn_js.png') no-repeat left
        top/100% auto;
      width: 126px;
      height: 89px;
    }

    .progress-bar-list {
      margin-top: 870px;

      .progress-bar {
        margin: 0 auto;
        width: 696px;
        height: 212px;
        padding-left: 14px;
        overflow: hidden;

        .progress-bar-txt {
          margin-top: 25px;
          margin-bottom: 15px;
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
        }

        .progress-bar-main {
          position: relative;
          display: flex;
          align-items: center;

          .award-box {
            position: relative;
            z-index: 2;
            margin-left: 21px;

            .award-icon {
              text-align: center;
              position: relative;
              width: 102px;
              height: 91px;
              background: url('@/pages/crazyEgg/assets/bg_5.png') no-repeat left
                top/100% auto;
              padding-top: 3px;

              .icon {
                width: auto;
                height: 55px;
              }

              .num {
                margin-top: 1px;
                font-size: 24px;
                font-weight: 500;
                color: #fee8bc;
                transform: scale(0.91);
              }

              .red-point {
                position: absolute;
                top: -5px;
                right: 10px;
                width: 26px;
                height: 26px;
                background: url('@/pages/crazyEgg/assets/red.png') no-repeat
                  left top/100% auto;
              }

              .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('@/pages/crazyEgg/assets/bg_6.png') no-repeat
                  left top/100% auto;
              }
            }

            .progress-num {
              margin-top: 8px;
              text-align: center;
              font-size: 28px;
              font-weight: 500;
              color: #ffefcf;
            }

            &:nth-of-type(1) {
              margin-left: 37px !important;
            }
          }

          .progress-bar-out {
            position: absolute;
            bottom: 87px;
            width: 669px;
            height: 18px;
            background: #692e19;
            border: 1px solid #ffb859;
            border-radius: 9px;
            overflow: hidden;
            padding: 2px;

            .progress-bar-inner {
              height: 100%;
              background: linear-gradient(0deg, #f5b124, #ffefcf);
              border-radius: 6px;
            }
          }
        }
      }
    }

    .ThemeBox_BottomText {
      margin-top: 45px;
      margin-left: 85px;
    }
  }
}
</style>
