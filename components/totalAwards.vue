<template>
  <div class="totalAwards">
    <img :src="IconPath('mk4_9.png')" class="title" />
    <div class="totalNum text-nowrap flex align-center justify-center line-height-100">我的累计建造层数：{{ tot_nums }}</div>
    <div ref="scrollList" class="awardsList flex flex-no-wrap position-relative">
      <!--每一项奖励-->
      <div v-for="(awardItem, index) in tot_awards" :key="awardItem.id" class="awardItem flex-column align-center flex-shrink-0">
        <div class="awardInfo position-relative flex-column align-center" @click="$emit('receiveReward', awardItem, index)">
          <div class="iconContainer flex align-center justify-center">
            <PublicImg :imgName="awardItem.award.icon" :class="awardItem.award.type" :imgType="awardItem.award.type" />
          </div>
          <div class="txtContainer flex align-center justify-center line-height-100">{{ awardItem.award.text }}</div>
          <div v-if="awardItem.has_right == 2" class="overly position-absolute"></div>
          <div v-else-if="awardItem.has_right == 1" class="light position-absolute position-row-center pointer-none">
            <div class="redPoint position-absolute"></div>
          </div>
        </div>
        <div class="awardPoint" :style="{ background: awardItem.has_right == 0 ? '#D29D48' : 'linear-gradient(-45deg, #F3653F, #FB9527)' }"></div>
        <div class="awardId line-height-100">{{ awardItem.id }}</div>
      </div>
      <!--进度条-->
      <div class="progressBar position-absolute">
        <div class="progressLine position-absolute" :style="{ width: progressWidth(tot_nums) }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tot_nums', 'tot_awards'],
  data() {
    return {
      // 进度条距离配置
      progressOption: Object.freeze([
        { max: 25, width: 9 },
        { max: 38, width: 18 },
        { max: 50, width: 18.5 },
        { max: 90, width: 18 },
        { max: 140, width: 18.5 },
        { max: 159, width: 17.5 }
      ])
    }
  },
  computed: {},
  methods: {
    // 进度条计算
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
    }
  }
}
</script>

<style lang="scss" scoped>
.totalAwards {
  .title {
    display: block;
    margin: 40px auto 20px;
    width: 600px;
    height: 33px;
  }
  .totalNum {
    margin: 18px auto 16px;
    width: fit-content;
    padding: 0 45px;
    height: 46px;
    background: #aa673a;
    border-radius: 23px;
    font-size: 26px;
  }
  .awardsList {
    margin-left: 21px;
    width: 695px;
    height: 268px;
    background: #f3d084;
    padding: 24px 48px 0;
    overflow-y: hidden;
    overflow-x: scroll;
    .awardItem {
      z-index: 2;
      margin-right: 25px;
      height: fit-content;
      &:nth-last-child(2) {
        margin-right: 0;
      }
      @mixin awardBg($width: 128px, $height: 154px, $bg) {
        width: $width;
        height: $height;
        background: url('@/pages/618/assets/#{$bg}') no-repeat left top/100% 100%;
      }
      .awardInfo {
        padding-top: 4px;
        @include awardBg($bg: 'mk4_6.png');
        .iconContainer {
          width: 100%;
          height: 98px;
        }
        .mic {
          width: 97px;
          height: 97px;
        }
        .chat_bubble {
          width: 103px;
          height: 64px;
        }
        .txtContainer {
          margin-top: 7px;
          width: 100%;
          font-size: 20px;
        }
      }
      .overly {
        top: 0;
        left: 0;
        @include awardBg($bg: 'mk4_7.png');
      }
      .light {
        top: -8px;
        @include awardBg($width: 144px, $height: 168px, $bg: 'mk4_8.png');
        .redPoint {
          top: 20px;
          right: 4px;
          width: 16px;
          height: 16px;
          background: #e22a2a;
          border-radius: 50%;
        }
      }
      .awardPoint {
        margin-top: 12px;
        width: 23px;
        height: 23px;
        background: linear-gradient(0deg, #f3653f, #fb9527);
        transform: rotate(45deg);
      }
      .awardId {
        margin-top: 14px;
        font-weight: 500;
        font-size: 24px;
        color: #7f3900;
      }
    }
    .progressBar {
      z-index: 1;
      left: 37px;
      bottom: 59px;
      width: 840px;
      height: 16px;
      background: #d29d48;
      border-radius: 8px;
      overflow: hidden;
      .progressLine {
        top: 0;
        left: 0;
        background: linear-gradient(0deg, #f3653f, #fb9527);
        height: 100%;
        border-radius: inherit;
      }
    }
  }
}
</style>
