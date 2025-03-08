<template>
  <div class="smashEggProgress position-absolute position-row-center">
    <div class="tip flex align-center justify-center">玩家砸破蛋壳达到进度可领取对应奖励</div>

    <div class="content position-relative">
      <div class="num position-absolute position-row-center flex align-center justify-center line-height-100 text-nowrap">
        已砸蛋：{{ progressData.smash_nums }}
      </div>

      <div class="list flex align-center justify-center flex-no-wrap">
        <div
          v-for="(reward, index) in progressData.process_awards"
          :key="index"
          class="reward-item flex-column align-center flex-shrink-0 position-relative"
          :class="{ rewardItemActive: isReceiveStatus(reward.has_right) }"
        >
          <div v-if="isFinishStatus(reward.has_right)" class="overly position-absolute w-100 h-100 flex justify-center">已获得</div>

          <div class="icon flex align-center justify-center" @click="receiveProgressReward(reward)">
            <!--TODO 奖励图标-->
            <PublicImg class="position-relative" :img-name="reward.icon" />
            <!--<img v-if="reward.icon" class="position-relative" :src="IconPath(reward.icon)" />-->
            <!--<public-json v-else-if="reward.type == 'title'" class="position-relative" jsonName="ch_zfz1" />-->
            <!--<public-json v-else-if="reward.type == 'chat_bubble'" class="position-relative" jsonName="qp_fhff_sc" />-->
          </div>
          <!--TODO 价值label-->
          <div v-if="reward.award_id == 30" class="price-label position-absolute flex align-center justify-center line-height-100 pointer-none">
            价值99<img :src="IconPath('mk4_15.png')" />
          </div>

          <div v-if="reward.award_id == 100" class="bubble position-absolute" @click="openBubble">
            <!--<div v-if="showBubble" class="bubble-content position-absolute flex justify-center pointer-none align-center line-height-100">-->
            <!--  佛山无影脚技能基础命中增加10%，基础闪避增加10%-->
            <!--</div>-->
            <div
              v-if="showBubble"
              class="bubble-content position-absolute flex-column justify-center pointer-none align-center line-height-100 text-nowrap"
            >
              <!--征服者-->
              佛山无影脚技能基础命中增<br>加10%，基础闪避增加10%
              <!--找个CP-->
              <!--每天免费获得<br>3个世界喇叭-->
            </div>
          </div>

          <div class="text flex align-center justify-center text-nowrap line-height-100">
            {{ reward.show_text }}
          </div>

          <div class="awardName text-nowrap position-absolute position-row-center pointer-none">{{ reward.name }}</div>

          <div class="status-point position-absolute position-row-center pointer-none">
            <img v-if="+progressData.smash_nums >= +reward.award_id" :src="IconPath('mk4_8.png')" class="position-absolute position-row-center" />
          </div>

          <div class="reward-num line-height-100 pointer-none position-absolute position-row-center flex align-center justify-center flex-no-wrap">
            {{ reward.award_id }}
          </div>
        </div>
      </div>

      <div class="progress-bar overflow-x-hidden overflow-y-hidden">
        <!--9 20 21 21 21-->
        <div
          class="progress-bar-content"
          :style="{
            width: progressWidth(progressOption, +progressData.smash_nums)
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { _throttle } from '../../../utils/tool'
import { getPageData } from '@/pages/crazyEgg/api'
export default {
  name: 'smashEggProgress',
  props: ['progressData'],
  data() {
    return {
      progressOption: Object.freeze([
        { max: 15, width: 9 },
        { max: 30, width: 20 },
        { max: 50, width: 21 },
        { max: 80, width: 21 },
        { max: 99, width: 20 }
      ]),
      bubbleTimer: null, // 气泡定时器
      showBubble: false // 气泡
    }
  },
  mounted() {
    this.openBubble()
  },
  methods: {
    // 领取状态
    isReceiveStatus(hasRight) {
      return hasRight == 1
    },
    // 完成状态
    isFinishStatus(hasRight) {
      return hasRight == 2
    },
    receiveProgressReward: _throttle(async function ({ award_id, has_right }) {
      if (has_right != 1) return
      const res = await getPageData({ type: 'craze_egg_rev_award', 'mark[egg_type]': 'all', 'mark[award_id]': award_id })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('receiveRewardSuccess', award_id)
    }, 1000),
    openBubble() {
      if (!this.showBubble) {
        this.showBubble = true
        this.bubbleTimer = setTimeout(() => {
          this.showBubble = false
          clearTimeout(this.bubbleTimer)
          this.bubbleTimer = null
        }, 5000)
      } else {
        this.showBubble = false
        clearTimeout(this.bubbleTimer)
        this.bubbleTimer = null
      }
    },
    // 进度条宽度计算
    progressWidth(segments, progress) {
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i]
        if (progress <= segment.max) {
          const base = i === 0 ? 0 : segments[i - 1].max
          const baseWidth =
            i === 0
              ? 0
              : segments
                  .slice(0, i)
                  .map((item) => item.width)
                  .reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                  })
          const overProgress = progress - base
          const widthPercentage = (overProgress / (segment.max - base)) * parseFloat(segment.width) + baseWidth + '%'
          return widthPercentage
        }
      }
      return '100%'
    }
  }
}
</script>

<style scoped lang="scss">
// 砸蛋进度
//width: 290px;
//height: 86px;
$bubbleWidth: 290px;
$bubbleHeight: 86px;
.smashEggProgress {
  top: 146px;
  width: 100%;
  .tip {
    font-weight: 500;
    font-size: 26px;
    color: #ffefcf;
  }

  .content {
    margin-top: 40px;
    padding-top: 50px;
    height: 332px;
    //background: rgba(221, 193, 160, 0.5);

    .num {
      top: -23px;
      min-width: 202px;
      width: fit-content;
      padding: 0 10px;
      height: 42px;
      background: #4e261a;
      border-radius: 20px;
      border: 1px solid #c18251;
      font-size: 26px;
      color: #ffdb8f;
    }

    .list {
      .reward-item {
        z-index: 2;
        margin-right: 20px;
        padding-top: 8px;
        width: 116px;
        height: 136px;
        background: #ffb993;
        border-radius: 14px;
        border: 2px solid transparent;
        .overly {
          top: 0;
          left: 0;
          z-index: 2;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          font-size: 22px;
          color: #fee8bc;
          padding-top: 40px;
        }
        .icon {
          margin-bottom: 6px;
          width: 96px;
          height: 88px;
          background: #4e261a;
          border-radius: 14px;
          border: 2px solid #fee8bc;
          img {
            height: 100%;
          }
        }

        .text {
          width: 80px;
          height: 27px;
          font-size: 20px;
          color: #fee8bc;
          background: url('@/pages/crazyEgg/assets/mk4_17.png') no-repeat left top/100% 100%;
        }

        .price-label {
          top: -10px;
          right: -15px;
          z-index: 2;
          width: 108px;
          height: 32px;
          background: linear-gradient(180deg, #eeb137, #ca6409);
          border-radius: 16px;
          border: 1px solid #fee8bc;
          font-size: 20px;
          color: #ffffff;

          img {
            margin-top: -1px;
            width: 25px;
            height: 19px;
          }
        }

        .red-point {
          right: 0px;
          top: 0px;
          z-index: 2;
          width: 26px;
          height: 26px;
        }

        .bubble {
          bottom: 34px;
          right: 4px;
          z-index: 3;
          width: 28px;
          height: 28px;
          background: url('@/pages/crazyEgg/assets/mk4_6.png') no-repeat left top/100% 100%;
          .bubble-content {
            top: -139px;
            right: 0;
            padding: 0 12px 13px;
            width: fit-content;
            height: $bubbleHeight;
            font-size: 22px;
            color: #ffffff;
            border-image-source: url('@/pages/crazyEgg/assets/mk4_7.png');
            border-image-slice: 10 60 24 20 fill;
            border-image-width: 10px 60px 24px 20px;
          }
        }
        .awardName {
          bottom: -34px;
          font-size: 22px;
          color: #fee8bc;
        }
        .status-point {
          bottom: -80px;
          width: 32px;
          height: 32px;
          background: #4e261a;
          border-radius: 50%;
          border: 1px solid #ffb859;

          img {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 34px;
            height: 34px;
          }
        }

        .complete-status {
          background: #d34883;
          border-color: #d34883;
        }

        .reward-num {
          bottom: -120px;
          font-size: 28px;
          color: #ffefcf;
        }
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
      .rewardItemActive {
        background: linear-gradient(0deg, #dc660b, #cc4c07);
        border-color: #fee8bc;
        .text {
          background-image: url('@/pages/crazyEgg/assets/mk4_16.png');
        }
      }
    }

    .progress-bar {
      z-index: 1;
      margin-top: 54px;
      margin-left: 40px;
      width: 669px;
      height: 18px;
      background: #692e19;
      border-radius: 9px;
      border: 1px solid #ffb859;
      padding: 2px;

      .progress-bar-content {
        height: 100%;
        background: linear-gradient(0deg, #f5b124, #ffefcf);
        border-radius: 6px;
      }
    }
  }
}
</style>
