<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <div class="tip">恭喜你！获得福卡</div>
          <div class="cards-list flex-center">
            <div v-for="(item, index) in list" :key="index" class="card">
              <img
                :src="IconPath(cardIcon[item.card_id].icon_1)"
                class="card-icon"
              />
              <div class="card-num">+{{ item.num }}</div>
            </div>
          </div>
          <!--按钮-->
          <div class="button flex-center" @click="showPopup = false">
            开心收下
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      cardIcon: Object.freeze({
        1: {
          icon_1: 'mk4_2.png',
          icon_2: 'mk4_2_1.png'
        },
        2: {
          icon_1: 'mk4_3.png',
          icon_2: 'mk4_3_1.png'
        },
        3: {
          icon_1: 'mk4_4.png',
          icon_2: 'mk4_4_1.png'
        },
        4: {
          icon_1: 'mk4_5.png',
          icon_2: 'mk4_5_1.png'
        },
        5: {
          icon_1: 'mk4_6.png',
          icon_2: 'mk4_6_1.png'
        }
      }),
      showPopup: false,
      list: []
    }
  },
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(params) {
      this.list = params
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
  width: 525px;
  height: 445px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    height: 100%;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;

    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      padding-top: 35px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      width: 598px;
      height: 261px;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.tip {
  margin: 0 auto;
  width: fit-content;
  font-size: 30px;
  color: #ffffff;
}

.cards-list {
  margin-top: -15px;
  width: 100%;
  flex-wrap: nowrap;
  .card {
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-icon {
      width: 256px;
      height: 254px;
    }

    .card-num {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
    }

    &:nth-of-type(2) {
      margin-left: -30px;
    }
  }
}

.button {
  margin: 25px auto 0;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
