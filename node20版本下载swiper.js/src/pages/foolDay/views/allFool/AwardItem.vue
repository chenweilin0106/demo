<template>
  <div class="AwardItem flex-column align-center" :class="awardStatus == 2 && 'AwardItemFinish'">
    <!--一个 小-->
    <template v-if="type == 1">
      <div class="awardIcon position-relative flex align-center justify-center">
        <img class="icon" :src="IconPath(awardInfo[0].icon)" @click="receiveAward" />
        <img v-if="awardStatus == 1" :src="IconPath('mk5_18.png')" class="AwardItemLightNormal position-absolute pointer-none" />
      </div>
    </template>
    <!--一个 大-->
    <template v-if="type == 2">
      <div class="position-relative bigAwardIcon flex align-center justify-center">
        <img v-if="awardInfo[0].icon" class="icon" :src="IconPath(awardInfo[0].icon)" @click="receiveAward" />
        <public-svga v-else svgaName="ts_mfjx" :userAvatar="$store.state.user_icon" @click.native="receiveAward" />
        <img v-if="awardStatus == 1" :src="IconPath('mk5_18.png')" class="AwardItemLightBig position-absolute pointer-none" />
      </div>
    </template>
    <!--两个 小-->
    <template v-if="type == 3">
      <div class="awardsList flex align-center justify-center">
        <div class="awardsListItem flex-column align-center">
          <div class="position-relative awardsListItemIcon">
            <img class="icon" :src="IconPath(awardInfo[0]?.icon)" @click="receiveAward" />
            <img v-if="awardStatus == 1" :src="IconPath('mk5_18.png')" class="AwardItemLightNormal position-absolute pointer-none" />
          </div>
          <div class="awardsListItemText">{{ awardInfo[0]?.text }}</div>
        </div>
        <div class="position-relative awardsListItem flex-column align-center">
          <div class="awardsListItemIcon">
            <img class="icon" :src="IconPath(awardInfo[1]?.icon)" @click="receiveAward" />
            <img v-if="awardStatus == 1" :src="IconPath('mk5_18.png')" class="AwardItemLightNormal position-absolute pointer-none" />
          </div>
          <div class="awardsListItemText">{{ awardInfo[1]?.text }}</div>
        </div>
      </div>
    </template>

    <!--奖励数量-->
    <div v-if="type == 1 || type == 2" class="awardNumber text-nowrap flex align-center justify-center line-height-100">
      {{ awardInfo[0]?.text }}
    </div>
    <!--圆点-->
    <slot>
      <div class="circle"></div>
    </slot>
    <!--文本-->
    <div class="awardText width-fit flex align-center justify-center line-height-100">{{ awardData.key }}</div>
  </div>
</template>

<script>
import PublicSvga from '@/pages/foolDay/components/PublicSvga.vue'

export default {
  props: ['type', 'awardData'],
  components: { PublicSvga },
  computed: {
    awardInfo() {
      return this.awardData?.value?.awards
    },
    awardStatus() {
      return this.awardData?.value?.has_right
    }
  },
  methods: {
    receiveAward() {
      if (this.awardStatus != 1) return
      this.$emit('receiveAward')
    },
    created() {
      console.log(this.awardData)
    }
  }
}
</script>

<style lang="scss" scoped>
.AwardItem {
  .awardIcon {
    width: 107px;
    height: 107px;
    background: linear-gradient(180deg, #f4c5d2, #ffffff);
    border-radius: 24px;
    border: 4px solid #b8668f;
    .icon {
      width: 100%;
    }
  }
  .bigAwardIcon {
    width: 128px;
    height: 128px;
    background: linear-gradient(180deg, #711946, #aa4072);
    border-radius: 24px;
    border: 4px solid #f8a0bf;
    .icon {
      width: 100%;
    }
    .PublicSvga {
      ::v-deep .micAvatar_img {
        width: 80%;
        height: 80%;
      }
    }
  }
  .awardsList {
    .awardsListItem {
      &:last-child {
        margin-left: 19px;
        .AwardItemLightNormal {
          top: -23px;
          left: -16px;
        }
      }
      .awardsListItemIcon {
        width: 107px;
        height: 107px;
        background: linear-gradient(180deg, #f4c5d2, #ffffff);
        border-radius: 24px;
        border: 4px solid #b8668f;
        .icon {
          width: 100%;
        }
      }
      .awardsListItemText {
        margin: 10px 0 5px;
        font-weight: 500;
        font-size: 26px;
        color: #c04382;
      }
    }
  }
  .awardNumber {
    width: 107px;
    margin: 10px 0 5px;
    font-weight: 500;
    font-size: 26px;
    color: #c04382;
  }
  .circle {
    margin-bottom: 10px;
    width: 20px;
    height: 20px;
    background: #c04382;
    transform: rotate(45deg);
  }
  .awardText {
    min-width: 80px;
    padding: 0 17px;
    height: 31px;
    background: #c04382;
    border-radius: 15px;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;
  }
}

.AwardItemFinish {
  .awardIcon {
    opacity: 0.5;
  }
  .awardNumber {
    opacity: 0.5;
  }
  .awardText {
    opacity: 0.5;
  }
  .circle {
    background-color: #c796a2;
  }
  .bigAwardIcon {
    opacity: 0.5;
  }
  .awardsList {
    opacity: 0.5;
  }
}
.AwardItemLightNormal {
  top: -26px;
  left: -19px;
  width: 148px;
  height: 144px;
}
.AwardItemLightBig {
  top: -26px;
  left: -20px;
  width: 170px;
  height: auto;
}
</style>
