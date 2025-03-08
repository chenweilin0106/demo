<template>
  <out-box class="intimateReward" title="tt_06.png">
    <!--总亲密度-->
    <div class="intimate-num flex align-center justify-center text-nowrap margin-row-center">总新增亲密度：{{ rewardData.intimacy }}</div>

    <div class="tip text-center">与绑定的挚友新增亲密度达到特定阶段即可领取相应奖励</div>

    <!--奖励列表-->
    <div class="rewards-list">
      <div class="row-1 flex align-center">
        <div v-for="award in rewardData.pair_awards.slice(0, 3)" :key="award.award_id" class="reward position-relative">
          <!--遮盖-->
          <img :src="IconPath(overlyIcon(award.has_right))" class="overly position-absolute w-100 h-100 pointer-none" />

          <!--数量label-->
          <div class="num-label position-absolute flex align-center justify-center text-nowrap pointer-none">
            {{ award.show_text }}
          </div>

          <!--图标-->
          <img :src="IconPath(award.icon)" class="icon position-relative position-row-center" @click="receiveReward(award)" />

          <!--名称-->
          <div class="name-text position-absolute position-row-center flex align-center justify-center text-nowrap line-height-100 pointer-none">
            {{ award.name }}
          </div>

          <!--亲密度-->
          <div class="num-text flex-column align-center justify-center position-absolute position-row-center pointer-none">
            <img :src="IconPath('mk1_1_1.png')" class="love-icon" />
            <span class="text-nowrap">{{ award.max }}</span>
          </div>

          <!--进度条-->
          <div class="progress overflow-y-hidden overflow-x-hidden flex position-absolute pointer-none">
            <div class="inner" :style="{ width: progressWidth(award.max) }"></div>
          </div>
        </div>
      </div>
      <div class="row-2 flex align-center position-relative">
        <div v-for="award in rewardData.pair_awards.slice(3)" :key="award.award_id" class="reward position-relative">
          <!--遮盖-->
          <img :src="IconPath(overlyIcon(award.has_right))" class="overly position-absolute w-100 h-100 pointer-none" />

          <!--数量label-->
          <div class="num-label position-absolute flex align-center justify-center text-nowrap pointer-none">
            {{ award.show_text }}
          </div>

          <!--图标-->
          <img :src="IconPath(award.icon)" class="icon position-relative position-row-center" @click="receiveReward(award)" />

          <!--名称-->
          <div class="name-text position-absolute position-row-center flex align-center justify-center text-nowrap line-height-100 pointer-none">
            {{ award.name }}
          </div>

          <!--亲密度-->
          <div class="num-text flex-column align-center justify-center position-absolute position-row-center pointer-none">
            <img :src="IconPath('mk1_1_1.png')" class="love-icon" />
            <span class="text-nowrap">{{ award.max }}</span>
          </div>

          <!--进度条-->
          <div v-if="award.award_id != 6" class="progress overflow-y-hidden overflow-x-hidden flex position-absolute pointer-none justify-end">
            <div class="inner" :style="{ width: progressWidth(award.max) }"></div>
          </div>
        </div>
      </div>
    </div>
    <CongratsGetPrompt ref="congratsGet" />
  </out-box>
</template>

<script>
import { _throttle } from '../../../utils/tool'
import CongratsGetPrompt from '@/pages/whiteValentine/components/congrats-get-prompt.vue'
import { getPageData } from '@/pages/whiteValentine/api'

export default {
  props: ['rewardData'],
  components: { CongratsGetPrompt },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    progressWidth(max) {
      const { pair_awards, intimacy } = this.rewardData
      if (+intimacy < +max) return '0%'
      const index = pair_awards.findIndex((item) => item.max == max)
      const NextMax = index + 1 == pair_awards.length ? max : pair_awards[index + 1].max
      if (+intimacy >= +NextMax) return '100%'
      const overlyNum = +intimacy - +max
      return (overlyNum / (+NextMax - +max)) * 100 + '%'
    },
    overlyIcon(hasRight) {
      return hasRight == 0 ? 'jl_bg_04.png' : hasRight == 1 ? 'jl_bg_02.png' : 'jl_bg_03.png'
    },
    receiveReward: _throttle(async function ({ award_id, has_right }) {
      if (has_right != 1) return
      const res = await getPageData({ type: 'pairgame_pair_award', mark: award_id })
      if (res.errno) return this.$toast(res.errmsg)
      this.openPrompt('congratsGet', [res.data.award])
      this.$emit('update', award_id)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.intimateReward {
  padding-top: 190px;
  margin-bottom: 21px;
  height: 889px;

  .intimate-num {
    width: 500px;
    height: 48px;
    background: linear-gradient(90deg, #df7472, #f19c92);
    border-radius: 24px;
    font-weight: 500;
    font-size: 28px;
    color: #ffffff;
  }

  .tip {
    margin-top: 14px;
    font-weight: 500;
    font-size: 22px;
    color: #c16d6f;
  }

  .rewards-list {
    margin-top: 30px;
    .row-1 {
      padding-left: 42px;

      .progress {
        left: 100px;
      }

      .reward {
        margin-right: 17px;
      }

      .reward:nth-last-child(1) {
        margin-right: 0;

        .num-text {
          //bottom: -24px;
          //flex-direction: row;
          //justify-content: flex-start;
          //left: 90px;
          //transform: none;
        }

        .progress {
          bottom: -150px;
          left: 50%;
          width: 269px;
          transform-origin: left center;
          transform: rotate(90deg) translateX(-50%);
        }
      }
    }

    .row-2 {
      z-index: 1;
      margin-top: 88px;
      padding-right: 35px;
      flex-direction: row-reverse;

      .reward {
        margin-left: 17px;
        .progress {
          right: 109px;
        }
      }
      .reward:nth-last-child(1) {
        margin-left: 0;
      }
    }

    .reward {
      width: 213px;
      height: 186px;
      background: url('@/pages/whiteValentine/assets/jl_bg_01.png') no-repeat left top/100% 100%;

      .overly {
        z-index: 2;
      }

      .num-label {
        z-index: 2;
        top: 0;
        left: 4px;
        width: 81px;
        height: 41px;
        font-weight: 500;
        font-size: 22px;
        color: #754316;
        background: url('@/pages/whiteValentine/assets/sl_bg.png') no-repeat left top/100% 100%;
      }

      .icon {
        z-index: 1;
        top: 30px;
        margin: 0 auto;
        width: 120px;
        height: 120px;
      }

      .name-text {
        bottom: 13px;
        z-index: 2;
        width: 140px;
        height: 38px;
        background: #f7aec9;
        border-radius: 19px;
        font-weight: 500;
        font-size: 24px;
        color: #ffffff;
      }

      .num-text {
        z-index: 2;
        bottom: -52px;
        font-weight: 500;
        font-size: 24px;
        color: #c16d6f;

        .love-icon {
          width: 34px;
          height: 28px;
        }
      }

      .progress {
        z-index: 1;
        bottom: -18px;
        width: 235px;
        height: 18px;
        background: #f9dbdf;
        border-radius: 9px;

        .inner {
          width: 0;
          height: 100%;
          background: #f784af;
          border-radius: 9px;
        }
      }
    }
  }
}
</style>
