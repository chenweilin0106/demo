<template>
  <div class="AllFool">
    <out-box class="foolAward">
      <!--提示图片-->
      <img :src="IconPath('mk5_4.png')" class="foolAwardTipImg block margin-row-center" />

      <!--提示文本-->
      <p class="foolAwardTipText-1 text-center">活动期间收到<i class="focus-color">表白可以获得</i>愚情点数</p>
      <p class="foolAwardTipText-2 text-center">获得的愚情点数<i class="focus-color">等同于</i>对方表白消耗的钻石数量</p>

      <!--表白按钮-->
      <div class="vindicateBtn flex align-center justify-center line-height-100 margin-row-center" @click="toMarriage">我要表白</div>

      <!--愚情点数奖励-->
      <div class="foolNumber position-relative margin-row-center">
        <!--点数-->
        <div class="numberBox flex align-center justify-center line-height-100 position-absolute position-row-center">
          愚情点数：{{ pageData.love_points }}
        </div>

        <!--进度条-->
        <div class="progress margin-row-center overflow-x-hidden overflow-y-hidden">
          <div class="innerProgress" :style="{ width: progressWidth(pageData.love_points) }"></div>
        </div>

        <!--奖励列表-->
        <div class="list flex align-center justify-center">
          <div v-for="(award, key) in pageData.love_awards" :key="key" class="award flex-column align-center">
            <div class="awardText">{{ key }}</div>
            <img :src="IconPath('mk5_2.png')" class="pointIcon block" />
            <div class="awardBox flex align-center justify-center">
              <img :src="IconPath(award.icon)" class="w-100" />
            </div>
            <div class="awardName line-height-100">{{ award.text }}</div>
            <CardButton class="awardBtn" :button-status="award.has_right" @click.native="receiveFoolNumAward(key, award.has_right)" />
          </div>
        </div>
      </div>
    </out-box>

    <!--奖励进度条-->
    <AwardProgress :awardProgressData="awardProgressData" @update="updateAwardProgressData" />

    <!--领取成功-->
    <ReceiveSuccessPopup ref="ReceiveSuccessPopup" />
  </div>
</template>

<script>
import { allFool } from '../../utils/pageData'
import CardButton from '@/pages/foolDay/views/AllFool/CardButton.vue'
import ReceiveSuccessPopup from '@/pages/foolDay/views/AllFool/ReceiveSuccessPopup.vue'
import AwardProgress from './AwardProgress.vue'
import { marriageF } from '../../utils/toApp'
import { _throttle } from '@/pages/foolDay/utils/tool'
import { getPageData } from '@/pages/foolDay/api'

export default {
  name: 'AllFool',
  components: { CardButton, AwardProgress, ReceiveSuccessPopup },
  data() {
    return {
      progressOption: Object.freeze([
        { max: 1314, width: 26 },
        { max: 5199, width: 48 }
      ])
    }
  },
  created() {
    this.pageData = allFool
    this.getPageData({ type: 'tab', mark: 'm5' })
  },
  computed: {
    awardProgressData() {
      return {
        present_nums: this.pageData.present_nums,
        present_awards: {
          ...this.pageData?.present_awards,
          [this.pageData?.special_awards.desc]: { has_right: this.pageData?.special_awards.has_right, awards: [{ ...this.pageData?.special_awards }] }
        }
      }
    }
  },
  methods: {
    updateAwardProgressData(mark) {
      if (mark == '后续每100循环') {
        this.pageData.special_awards.has_right = 0
        this.pageData.special_awards.finish_nums = +this.pageData.special_awards.finish_nums % 100
      } else {
        this.pageData.present_awards[mark].has_right = 2
      }
    },
    // 领取表白奖励
    receiveFoolNumAward: _throttle(async function (mark, hasRight) {
      if (hasRight != 1) return
      const res = await getPageData({ type: 'fool_confess_award', mark })
      if (res.errno) return this.$toast(res.errmsg)
      this.openPrompt('ReceiveSuccessPopup', [res.data?.award])
      this.pageData.love_awards[mark].has_right = 2
    }, 1000),
    progressWidth(progress) {
      for (let i = 0; i < this.progressOption.length; i++) {
        const segment = this.progressOption[i]
        if (progress <= segment.max) {
          const base = i === 0 ? 0 : this.progressOption[i - 1].max
          const baseWidth =
            i === 0
              ? 0
              : this.progressOption
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
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'tab', mark: 'm5' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    toMarriage() {
      marriageF(this.hiddenFn)
    }
  }
}
</script>

<style lang="scss" scoped>
.AllFool {
  .foolAward {
    padding-top: 87px;
    margin-top: 40px;
    margin-bottom: 101px;
    height: 1031px;
    .foolAwardTipImg {
      width: 681px;
      height: 153px;
      margin-bottom: -10px;
    }
    .foolAwardTipText-1,
    .foolAwardTipText-2 {
      font-size: 28px;
      color: #77480c;
    }
    .foolAwardTipText-2 {
      margin-top: 15px;
    }
    .vindicateBtn {
      margin-top: 18px;
      margin-bottom: 57px;
      width: 266px;
      height: 82px;
      background: linear-gradient(0deg, #5396a1, #80ddde);
      border-radius: 41px;
      border: 3px solid #ffffff;
      font-size: 32px;
      color: #ffffff;
    }
    .foolNumber {
      padding-top: 90px;
      width: 660px;
      height: 462px;
      background: linear-gradient(0deg, #75a9b1, #a55e7c, #ab407c);
      border-radius: 20px;
      .numberBox {
        top: -35px;
        width: 478px;
        height: 68px;
        font-size: 28px;
        color: #ffffff;
        background: url('@/pages/foolDay/assets/mk5_3.png') no-repeat left top/100% 100%;
      }
      .progress {
        width: 613px;
        height: 13px;
        background: #7c2a54;
        border-radius: 7px;
        .innerProgress {
          height: 13px;
          background: linear-gradient(90deg, #6fd9d0, #ffe380);
          border-radius: 7px;
        }
      }
      .award {
        margin-top: -54px;
        &:last-child {
          margin-left: 92px;
        }
        .awardText {
          font-size: 26px;
          color: #fffaa6;
        }
        .pointIcon {
          margin-bottom: 7px;
          width: 36px;
          height: 35px;
        }
        .awardBox {
          margin-bottom: 14px;
          width: 182px;
          height: 182px;
          background: linear-gradient(180deg, #490f2d, #7a2e52);
          border-radius: 24px;
          border: 4px solid #e896b3;
        }
        .awardName {
          margin-bottom: 22px;
          font-size: 28px;
          color: #ffffff;
        }
        .awardBtn {
          width: 202px;
          height: 68px;
          border-radius: 34px;
          font-size: 29px;
        }
      }
    }
  }
}
</style>
