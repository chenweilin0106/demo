<template>
  <div class="smashEggProgress position-absolute position-row-center">
    <div class="tip flex align-center justify-center">
      玩家砸破蛋壳达到进度可领取对应奖励
    </div>

    <div class="content position-relative">
      <div
        class="num position-absolute position-row-center flex align-center justify-center line-height-100 text-nowrap"
      >
        已砸蛋：{{ progressData.smash_nums }}
      </div>

      <div class="list flex align-center justify-center flex-no-wrap">
        <div
          v-for="(reward, index) in progressData.process_awards"
          :key="index"
          class="reward-item flex-shrink-0 position-relative"
        >
          <img
            v-if="reward.has_right == 1"
            :src="IconPath('mk4_5.png')"
            class="receive-light position-absolute pointer-none position-row-center"
          />

          <img
            v-else-if="reward.has_right == 2"
            :src="IconPath('mk4_6.png')"
            class="overly position-absolute pointer-none position-row-center"
          />

          <div
            class="click-content position-absolute position-row-center"
            @click="receiveProgressReward(reward)"
          ></div>

          <div class="icon flex align-center justify-center">
            <img
              v-if="reward.icon"
              class="position-relative"
              :src="IconPath(reward.icon)"
            />
            <public-json class="position-relative" v-else jsonName="ch_zfz1" />
          </div>

          <div
            v-if="reward.award_id == 30"
            class="price-label position-absolute position-row-center flex align-center justify-center line-height-100 pointer-none"
          >
            价值99<img :src="IconPath('mk4_15.png')" />
          </div>

          <img
            v-if="reward.has_right == 1"
            :src="IconPath('red.png')"
            class="red-point position-absolute pointer-none"
          />

          <div
            v-if="reward.award_id == 100"
            class="bubble position-absolute"
            @click="openBubble"
          >
            <div
              v-if="showBubble"
              class="bubble-content position-absolute flex justify-center pointer-none"
            >
              <div
                class="bubble-content-text text-nowrap w-100 h-100 flex-column align-center justify-center"
              >
                <p>佛山无影脚技能基础命中增</p>
                <p>加10%，基础闪避增加10%</p>
              </div>
            </div>
          </div>

          <div
            class="text flex align-center justify-center text-nowrap line-height-100"
          >
            {{ reward.show_text }}
          </div>

          <div
            class="status-point position-absolute position-row-center pointer-none"
            :class="{
              'complete-status': +progressData.smash_nums >= +reward.award_id
            }"
          >
            <img
              v-if="reward.has_right == 1"
              :src="IconPath('mk4_4.png')"
              class="position-absolute position-row-center"
            />
          </div>

          <div
            class="reward-num line-height-100 pointer-none position-absolute position-row-center flex align-center justify-center flex-no-wrap"
          >
            {{ reward.award_id
            }}<img :src="IconPath('cz_26_34.png')" class="flex-shrink-0" />
          </div>
        </div>
      </div>

      <div class="progress-bar position-relative">
        <!--25 50 75 100-->
        <div
          class="progress-bar-content position-absolute overflow-x-hidden overflow-y-hidden"
          :style="{
            width: progressWidth(progressOption, +progressData.smash_nums)
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicJson from '@/pages/womenDay/components/PublicJson.vue'
import { getPageData } from '@/pages/womenDay/api'
export default {
  name: 'smashEggProgress',
  props: ['progressData'],
  components: { PublicJson },
  data() {
    return {
      progressOption: Object.freeze([
        { max: 15, width: 0 },
        { max: 30, width: 25 },
        { max: 50, width: 25 },
        { max: 80, width: 25 },
        { max: 100, width: 25 }
      ]),
      // 气泡定时器
      bubbleTimer: null,
      // 气泡
      showBubble: false
    }
  },
  computed: {},
  created() {},
  methods: {
    async receiveProgressReward({ award_id, has_right }) {
      if (has_right != 1) return
      const res = await getPageData({
        type: 'craze_egg_rev_award',
        'mark[egg_type]': 'all',
        'mark[award_id]': award_id
      })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('receiveRewardSuccess', award_id)
    },
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
          const widthPercentage =
            (overProgress / (segment.max - base)) * parseFloat(segment.width) +
            baseWidth +
            '%'
          return widthPercentage
        }
      }
      return '100%'
    }
  }
}
</script>

<style scoped lang="scss">
.smashEggProgress {
  top: 875px;
  .tip {
    font-weight: 500;
    font-size: 26px;
    color: #ae7c2b;
  }

  .content {
    margin-top: 40px;
    padding-top: 72px;
    width: 690px;
    height: 332px;
    background: rgba(221, 193, 160, 0.5);

    .num {
      top: -23px;
      min-width: 222px;
      width: fit-content;
      padding: 0 10px;
      height: 46px;
      font-size: 26px;
      color: #ffffff;
      background: #704217;
      border-radius: 23px;
    }

    .list {
      .reward-item {
        z-index: 2;
        margin-right: 9px;
        padding-top: 2px;
        width: 128px;
        height: 143px;
        background: url('@/pages/womenDay/assets/mk4_1.png') no-repeat left
          top/100% 100%;

        .receive-light {
          z-index: 2;
          top: -9px;
          width: 144px;
          height: 157px;
        }

        .overly {
          z-index: 2;
          top: 3px;
          width: 120px;
          height: 121px;
        }

        .click-content {
          z-index: 2;
          top: 0;
          width: 128px;
          height: 128px;
          border-radius: 50%;
          opacity: 0;
        }

        .icon {
          height: 94px;

          img {
            height: 90%;
          }
        }

        .text {
          height: 28px;
          font-size: 22px;
          color: #ffffff;
        }

        .price-label {
          top: -15px;
          z-index: 2;
          width: 106px;
          height: 34px;
          background: linear-gradient(-90deg, #75b9ff, #ff84f8);
          border-radius: 17px;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;

          img {
            width: 27px;
            height: 20px;
          }
        }

        .red-point {
          right: -5px;
          top: 16px;
          z-index: 2;
          width: 26px;
          height: 26px;
        }

        .bubble {
          bottom: 39px;
          right: 2px;
          z-index: 3;
          width: 28px;
          height: 28px;
          background: url('@/pages/womenDay/assets/mk4_2.png') no-repeat left
            top/100% 100%;
          .bubble-content {
            top: -135px;
            right: -25px;
            width: 310px;
            height: 86px;
            background: url('@/pages/womenDay/assets/mk4_3.png') no-repeat left
              top/100% 100%;
            .bubble-content-text {
              width: 269px;
              height: 73px;
              line-height: 28px;
              font-size: 22px;
              color: #ffffff;
              p {
              }
            }
          }
        }

        .status-point {
          bottom: -50px;
          width: 40px;
          height: 40px;
          background: #704217;
          border-radius: 50%;
          border: 4px solid #c79245;

          img {
            top: -12px;
            width: 50px;
            height: 59px;
          }
        }

        .complete-status {
          background: #d34883;
          border-color: #d34883;
        }

        .reward-num {
          bottom: -95px;
          font-size: 26px;
          color: #77480c;
          img {
            width: 25px;
            height: 33px;
          }
        }

        &:nth-last-child(1) {
          margin-right: 0;
          .icon {
            .PublicJson {
              top: 5px;
              height: 50%;
            }
          }
        }

        &:nth-last-child(2) {
          .icon {
            img {
              top: 7px;
              height: 80%;
            }
          }
        }
      }
    }

    .progress-bar {
      z-index: 1;
      margin-top: 23px;
      margin-left: 68px;
      width: 559px;
      height: 14px;
      background: #704217;
      border-radius: 7px;
      border: 4px solid #c79245;

      .progress-bar-content {
        top: -4px;
        left: -4px;
        height: 14px;
        background: #d34883;
        border-radius: 7px;
      }
    }
  }
}
</style>
