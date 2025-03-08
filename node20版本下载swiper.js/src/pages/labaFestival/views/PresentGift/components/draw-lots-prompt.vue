<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <div :class="['sign-content', signBg]">
        <div v-if="date" class="date-content">{{ date }}</div>
        <div v-if="taskInfo.text" class="des">
          {{ `${taskInfo.text}（0/10次）` }}
        </div>
        <van-count-down
          v-if="+taskInfo.res_time"
          ref="dialogCountDown"
          :time="+taskInfo.res_time * 1000"
          format="本轮结束时间 mm:ss"
        />
        <div class="other-reward">
          <div class="reward-1">
            <div class="icon-box">
              <img :src="IconPath('ljs_60_60.png')" />
            </div>
            <div class="text-box">+{{ ljsNumber }}</div>
          </div>
          <div class="reward-2">
            <div class="icon-box">
              <div class="gold-update">
                <img class="gold" :src="IconPath('yb_60_60.png')" />
                <div v-if="consumeAddRate" class="update-text">
                  {{ consumeAddRate }}%
                </div>
                <img class="update-icon" :src="IconPath('mk3_9.png')" />
              </div>
              <div class="update-status">
                <div
                  class="line"
                  :class="{ 'red-line': +consumeAddRate >= 10 }"
                ></div>
                <div
                  class="line"
                  :class="{ 'red-line': +consumeAddRate >= 20 }"
                ></div>
                <div
                  class="line"
                  :class="{ 'red-line': +consumeAddRate >= 30 }"
                ></div>
              </div>
            </div>
            <div class="text-box">累计消费有礼</div>
          </div>
        </div>
      </div>
      <button @click="handleClick">收下好运</button>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      signType: 1,
      consumeAddRate: 0,
      taskInfo: {},
      date: ''
    }
  },
  props: ['dialogCountDown'],
  watch: {},
  computed: {
    // 绿晶石数量
    ljsNumber() {
      return this.signType == 1 ? '28' : this.signType == 2 ? '18' : '8'
    },
    signBg() {
      return this.signType == 1
        ? 'signBg-1'
        : this.signType == 2
        ? 'signBg-2'
        : 'signBg-3'
    }
  },
  created() {},
  methods: {
    resetDialogCountDown() {
      this.$nextTick(() => {
        this.$refs.dialogCountDown && this.$refs.dialogCountDown.reset()
      })
    },
    handleClick() {
      this.$toast(`恭喜获得绿晶石+${this.ljsNumber}`)
      this.showPopup = false
    },
    updatePromptData(params = {}) {
      const { sign_type = 1, consume_add_rate, task_info, date } = params
      this.signType = sign_type
      this.consumeAddRate = consume_add_rate
      this.taskInfo = task_info
      this.date = date
    },
    // TODO 使用函数参数默认值（之前没有使用过）
    openPrompt(params = {}) {
      this.updatePromptData(params)
      this.showPopup = true
    },
    offPrompt() {
      if (this.showPopup) this.showPopup = false
    },
    clickClose() {
      this.$emit('close')
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
  .popup-content {
    position: fixed;
    top: 50%;
    left: 104px;
    transform: translateY(-50%);
    width: fit-content;
    pointer-events: auto;
  }
}

.sign-content {
  position: relative;
  width: 509px;
  height: 625px;
  background: no-repeat left top/100% 100%;

  .date-content {
    position: absolute;
    top: 105px;
    right: 48px;
    font-size: 24px;
    font-weight: 700;
    color: #ffe68f;
    text-align: center;
    width: 380px;
    white-space: nowrap;
  }

  .des {
    position: absolute;
    top: 309px;
    left: 114px;
    width: 310px;
    font-size: 20px;
    font-weight: 500;
    color: #910b0b;
    line-height: 26px;
  }
  .van-count-down {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: #f01c1c;
    top: 356px;
    left: 178px;
    white-space: nowrap;
  }
}

.other-reward {
  position: absolute;
  bottom: 95px;
  left: 145px;
  display: flex;
  align-items: center;
  height: 102px;
  .reward-1 {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 102px;
    height: 102px;
    border: 3px solid;
    padding: 3px;
    background: linear-gradient(
      0deg,
      rgba(255, 245, 198, 0.9),
      rgba(255, 255, 255, 0.9)
    );
    margin-right: 9px;
    border-radius: 18px;
    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 66px;
      > img {
        height: 130%;
      }
    }
    .text-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
      border-radius: 0 0 12px 12px;
    }
  }
  .reward-2 {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 142px;
    height: 102px;
    border: 3px solid;
    padding: 3px;
    background: linear-gradient(
      0deg,
      rgba(255, 245, 198, 0.9),
      rgba(255, 255, 255, 0.9)
    );
    border-radius: 18px;
    .icon-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 66px;
      .gold-update {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        .gold {
          width: 60px;
          height: 60px;
        }
        .update-text {
          font-size: 20px;
          font-weight: 800;
          color: #d73939;
        }
        .update-icon {
          width: 23px;
          height: 28px;
        }
      }
      .update-status {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 119px;
        overflow: hidden;
        border-radius: 10px;
        .line {
          width: 37px;
          height: 9px;
          background: #b5b5b5;
        }
        .red-line {
          background-color: #d73939;
        }
      }
    }
    .text-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
      border-radius: 0 0 12px 12px;
    }
  }
}

.signBg-1 {
  background-image: url('@/pages/labaFestival/assets/tk_4.png');

  .reward-1,
  .reward-2 {
    border-color: #e13b3b;
  }
  .text-box {
    background-color: #e13b3b;
  }
}
.signBg-2 {
  background-image: url('@/pages/labaFestival/assets/tk_5.png');
  .reward-1,
  .reward-2 {
    border-color: #ef6426;
  }
  .text-box {
    background-color: #ef6426;
  }
}
.signBg-3 {
  background-image: url('@/pages/labaFestival/assets/tk_6.png');
  .reward-1,
  .reward-2 {
    border-color: #d17a14;
  }
  .text-box {
    background-color: #d17a14;
  }
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  margin-left: 109px;
  z-index: 10;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
