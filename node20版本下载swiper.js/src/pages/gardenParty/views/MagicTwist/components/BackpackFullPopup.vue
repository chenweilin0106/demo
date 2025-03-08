<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" @touchmove.prevent.stop>
        <img :src="IconPath('tk_1.png')" class="leftBalloon position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightBalloon position-absolute" />

        <div class="title">符石背包已达上限</div>
        <div class="backpack-icon"></div>
        <div class="tip">
          <p v-if="type == 2">你的符石背包已满，请先分解符石</p>
          <template v-else-if="type == 1">
            <p>你的符石背包已满，请将任意技能升至</p>
            <p>50级，开启符石寻宝分解符石</p>
          </template>
        </div>
        <div class="buttons">
          <div class="cancel" @click="clickClose">取消</div>
          <div class="confirm" @click="onConfirm">
            {{ type == 1 ? '技能升级' : '分解符石' }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { toMySkillPanel, toRuneStoneTreasureHuntPanel } from '../../../utils/toApp'
export default {
  props: ['type'],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onConfirm() {
      if (this.type == 1) {
        toMySkillPanel()
      } else {
        toRuneStoneTreasureHuntPanel()
      }
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .popup-content {
    position: relative;
    width: 643px;
    height: 606px;
    padding-top: 80px;
    border-image-source: url('@/pages/gardenParty/assets/tk_16.png');
    border-image-slice: 84 0 82 0 fill;
    border-image-width: 84px 0 82px 0;
  }
  .leftBalloon {
    top: -48px;
    left: -54px;
    width: 182px;
    height: 577px;
  }
  .rightBalloon {
    top: -24px;
    right: -53px;
    width: 163px;
    height: 354px;
  }
}

.title {
  width: fit-content;
  margin: 0 auto 41px;
  font-size: 34px;
  font-weight: 700;
  color: #fff17f;
}

.backpack-icon {
  margin: 0 auto 37px;
  width: 139px;
  height: 140px;
  background: url('@/pages/gardenParty/assets/tk_19.png') no-repeat left top/100% 100%;
}

.tip {
  width: 508px;
  min-height: 80px;
  white-space: nowrap;
  margin: 0 auto 30px;
  font-size: 30px;
  color: #ffffff;

  p {
    text-align: center;
    line-height: 40px;

    &:nth-of-type(2) {
      text-align: start;
    }
  }

  //text-align: center;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #4d7ddd;
    margin-right: 18px;
  }

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #a9792c;
  }
}
</style>
