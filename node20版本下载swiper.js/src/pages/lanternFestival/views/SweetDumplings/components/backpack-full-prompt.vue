<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
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
        <div class="cancel" @click="showPopup = false">取消</div>
        <div class="confirm" @click="onConfirm">
          {{ type == 1 ? '技能升级' : '分解符石' }}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import {
  toRuneStoneTreasureHuntPanel,
  toMySkillPanel
} from '../../../utils/toApp'

export default {
  props: {},
  data() {
    return {
      showPopup: false,
      type: 1
    }
  },
  computed: {},
  methods: {
    onConfirm() {
      if (this.type == 1) {
        toMySkillPanel()
      } else {
        toRuneStoneTreasureHuntPanel()
      }
      this.showPopup = false
    },
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(type) {
      this.type = type
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 626px;
  min-height: 576px;
  background: linear-gradient(0deg, #5e243a, #7e2725);
  border: 8px solid #f9c66c;
  border-radius: 26px;
  pointer-events: auto;
  padding-top: 60px;
}

.backpack-icon {
  margin: 0 auto 51px;
  width: 139px;
  height: 140px;
  background: url('@/pages/labaFestival/assets/tk_19.png') no-repeat left
    top/100% 100%;
}

.title {
  width: fit-content;
  margin: 0 auto 41px;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
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
