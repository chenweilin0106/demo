<template>
  <out-box class="AwardProgress" title="title_4.png" :star="true" :colouredRibbon="true">
    <RuleText :text-list="textList" />

    <!--我收到的礼物数量-->
    <div class="receiveGiftNumber flex align-center justify-center line-height-100 margin-row-center">
      我收到的<img :src="IconPath('yffs_69_71.png')" /> ：{{ awardProgressData.present_nums }}
    </div>

    <!--进度条-->
    <div :class="['list margin-row-center', progressBg]">
      <!--第一层-->
      <div class="row-1 position-relative flex align-end">
        <AwardItem v-for="row1Awards in row1Data" :key="row1Awards.key" type="1" :awardData="row1Awards" @receiveAward="receiveAward(row1Awards)" />
      </div>

      <!--第二层-->
      <div class="row-2 position-relative flex align-end">
        <AwardItem
          v-for="row2Awards in row2Data.toReversed()"
          :key="row2Awards.key"
          :type="row2Awards.key == 30 ? 3 : 2"
          :awardData="row2Awards"
          @receiveAward="receiveAward(row2Awards)"
        />
      </div>

      <!--第三层-->
      <div class="row-3 position-relative flex align-end">
        <AwardItem
          v-for="row3Awards in row3Data"
          :key="row3Awards.key"
          :type="row3Awards.key == 70 ? 3 : 1"
          :awardData="row3Awards"
          @receiveAward="receiveAward(row3Awards)"
        />
      </div>

      <!--第四层-->
      <div class="row-4 position-relative flex align-end">
        <AwardItem
          v-for="row4Awards in row4Data.toReversed()"
          :key="row4Awards.key"
          type="3"
          :awardData="row4Awards"
          @receiveAward="receiveAward(row4Awards)"
        />
      </div>

      <!--第五层-->
      <div class="row-5 position-relative flex align-end">
        <AwardItem
          v-for="row5Awards in row5Data"
          :key="row5Awards.key"
          :type="row5Awards.key == 300 ? 1 : 2"
          :awardData="row5Awards"
          @receiveAward="receiveAward(row5Awards)"
        >
          <div v-if="row5Awards.key != 300" class="awardItemProgress overflow-y-hidden overflow-x-hidden">
            <div class="awardItemProgressInner w-100 h-100">
              <div class="awardItemProgressContent h-100" :style="{ width: row5Awards?.value?.awards[0]?.finish_nums + '%' }">
                {{ row5Awards.value.finish_nums }}
              </div>
            </div>
          </div>
        </AwardItem>
      </div>
    </div>
    <CongratsGetPopup ref="CongratsGetPopup">
      <template v-slot="{ data: { type } }">
        <public-svga v-if="type == 'mic'" svgaName="ts_mfjx" :userAvatar="$store.state.user_icon" />
      </template>
    </CongratsGetPopup>
  </out-box>
</template>

<script>
import PublicSvga from '@/pages/foolDay/components/PublicSvga.vue'
import CongratsGetPopup from '@/pages/foolDay/components/CongratsGetPopup.vue'
import AwardItem from './AwardItem.vue'
import RuleText from './RuleText.vue'
import { _throttle } from '@/pages/foolDay/utils/tool'
import { getPageData } from '@/pages/foolDay/api'

export default {
  name: 'AwardProgress',
  components: { PublicSvga, RuleText, AwardItem, CongratsGetPopup },
  props: ['awardProgressData'],
  data() {
    return {
      textList: Object.freeze([
        { text: `收到礼物面板中的【一帆风顺】<img src='${this.IconPath('yffs_69_71.png')}' />礼物数量达到`, circle: true },
        { text: '门槛即可获得奖励' },
        { text: '自己赠送自己的礼物计算在内', circle: true }
      ])
    }
  },
  computed: {
    presentAwardsArray() {
      const arr = []
      for (const key in this.awardProgressData.present_awards) {
        arr.push({ value: this.awardProgressData.present_awards[key], key })
      }
      return arr
    },
    // // 第一层
    row1Data() {
      return this.presentAwardsArray.slice(0, 4)
    },
    row2Data() {
      return this.presentAwardsArray.slice(4, 6)
    },
    row3Data() {
      return this.presentAwardsArray.slice(6, 8)
    },
    row4Data() {
      return this.presentAwardsArray.slice(8, 10)
    },
    row5Data() {
      return this.presentAwardsArray.slice(10)
    },
    // 愚乐万岁进度条背景
    // <= 1 progressBg-1
    // == 5 progressBg-5
    // == 10 progressBg-10
    // == 20 progressBg-20
    // == 30 progressBg-30
    // == 50 progressBg-50
    // == 70 progressBg-70
    // == 100 progressBg-100
    // == 150 progressBg-150
    // == 200 progressBg-200
    // == 300 progressBg-300
    // > 300 progressBg-max
    progressBg() {
      const presentNums = this.awardProgressData.present_nums
      if (presentNums < 5) {
        return 'progressBg-1'
      } else if (presentNums > 300) {
        return 'progressBg-max'
      } else {
        const arr = [5, 10, 20, 30, 50, 70, 100, 150, 200, 300]
        return `progressBg-${arr.find((item, index) => {
          return item == presentNums || (presentNums > arr[index] && presentNums < arr[index + 1])
        })}`
      }
    }
    // 循环奖励进度条长度计算
    // loopAwardProgressWidth() {
    //   const num = 30
    //   return (num / 100).toFixed(2) * 100 + '%'
    // }
  },
  methods: {
    receiveAward: _throttle(async function ({ value, key: mark }) {
      if (value.has_right != 1) return
      let res = {}
      if (mark == '后续每100循环') {
        res = await getPageData({ type: 'fool_round_award' })
      } else {
        res = await getPageData({ type: 'fool_present_award', mark })
      }
      if (res.errno) return this.$toast(res.errmsg)
      res.data.award = Array.isArray(res.data?.award) ? res.data?.award : [res.data?.award]
      this.openPrompt('CongratsGetPopup', res.data?.award)
      this.$emit('update', mark)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.AwardProgress {
  margin-bottom: 170px;
  padding-top: 132px;
  height: 1684px;
  .RuleText {
    margin-left: 71px;
    width: 613px;
    ::v-deep .row {
      line-height: 50px;
    }
    ::v-deep img {
      margin-top: -20px;
      margin-left: -10px;
      width: 69px;
      height: 71px;
    }
  }
  .receiveGiftNumber {
    margin-top: 10px;
    width: 358px;
    height: 48px;
    background: #883760;
    border-radius: 24px;
    font-weight: 500;
    font-size: 28px;
    color: #ffffff;
    > img {
      width: 44px;
      height: 45px;
    }
  }
  .list {
    //margin-top: 195px;
    padding-top: 195px;
    width: 677px;
    height: 1250px;
    background: no-repeat left 195px/100% 1004px;
    overflow: hidden;
    .row-1 {
      margin-top: -155px;
      //top: -161px;
      .AwardItem {
        margin-right: 47px;
        &:first-child {
          margin-left: 28px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .row-2 {
      margin-top: 20px;
      margin-left: 146px;
      .AwardItem:first-child {
        margin-right: 106px;
      }
    }
    .row-3 {
      margin-top: 37px;
      //margin-top: 4.8%;
      margin-left: 91px;
      //margin-left: 146px;
      .AwardItem:first-child {
        margin-right: 115px;
      }
    }
    .row-4 {
      //margin-top: 4.5%;
      margin-top: 36px;
      margin-left: 91px;
      .AwardItem:first-child {
        margin-right: 53px;
      }
    }
    .row-5 {
      margin-top: 20px;
      margin-left: 157px;
      .AwardItem:first-child {
        margin-right: 169px;
      }
    }
  }

  .awardItemProgress {
    margin-bottom: 10px;
    width: 159px;
    height: 20px;
    background-color: #dbadb8;
    border-radius: 10px;
    padding: 3px;
    .awardItemProgressInner {
      border-radius: 7px;
      background: #883760;
    }
    .awardItemProgressContent {
      background: linear-gradient(0deg, #f0a80c, #ffe985);
      border-radius: 7px;
    }
  }

  .progressBg-1 {
    background-image: url('@/pages/foolDay/assets/mk5_5.png');
  }
  .progressBg-5 {
    background-image: url('@/pages/foolDay/assets/mk5_6.png');
  }
  .progressBg-10 {
    background-image: url('@/pages/foolDay/assets/mk5_7.png');
  }
  .progressBg-20 {
    background-image: url('@/pages/foolDay/assets/mk5_8.png');
  }
  .progressBg-30 {
    background-image: url('@/pages/foolDay/assets/mk5_9.png');
  }
  .progressBg-50 {
    background-image: url('@/pages/foolDay/assets/mk5_10.png');
  }
  .progressBg-70 {
    background-image: url('@/pages/foolDay/assets/mk5_11.png');
  }
  .progressBg-100 {
    background-image: url('@/pages/foolDay/assets/mk5_12.png');
  }
  .progressBg-150 {
    background-image: url('@/pages/foolDay/assets/mk5_13.png');
  }
  .progressBg-200 {
    background-image: url('@/pages/foolDay/assets/mk5_14.png');
  }
  .progressBg-300 {
    background-image: url('@/pages/foolDay/assets/mk5_15.png');
  }
  .progressBg-max {
    background-image: url('@/pages/foolDay/assets/mk5_16.png');
  }
}
</style>
