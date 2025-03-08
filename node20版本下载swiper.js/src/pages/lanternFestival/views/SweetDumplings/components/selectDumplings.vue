<template>
  <!-- 选择元宵 -->
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_8.png')" />
      <div class="dumplings_list">
        <div
          class="dumpling_item"
          v-for="(item, index) in list"
          :key="index"
          :class="current.id == item.id && 'active-box'"
          @click="check(item)"
        >
          <div class="icon">
            <img :src="IconPath(item.icon)" />
          </div>
          <div class="nums">{{ item.nums }}/1</div>
        </div>
      </div>
      <div class="btns">
        <div class="left_btn" @click="showPopup = false">我再想想</div>
        <div class="right_btn" @click="confirm">确认放入</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      current: {},
      list: [],
      index: ''
    }
  },
  methods: {
    confirm() {
      if (!this.current.id) return this.$toast('暂未选择元宵')
      this.current.index = this.index
      this.$emit('confirm', this.current)
      this.showPopup = false
    },
    check(params) {
      if (params.nums == 0) return this.$toast('暂未拥有该元宵哦')
      this.current = params
    },
    clickClose() {
      this.current = {}
      this.$emit('close')
    },
    // 打开弹框
    openPrompt({ list, index, current }) {
      const isHas = list.every((item) => item.nums == 0)
      if (isHas) return this.$toast('元宵数量不足')
      this.list = list
      this.index = index
      this.current = current
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

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 616px;
    height: 496px;
    background: linear-gradient(0deg, #5e243a, #7e2725);
    border: 8px solid #f9c66c;
    border-radius: 26px;
    padding-top: 77px;
    pointer-events: auto;

    .title-image {
      width: 642px;
      height: 126px;
      position: absolute;
      z-index: 3;
      top: -82px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
  }

  .dumplings_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 14px;
    padding-right: 14px;

    .dumpling_item {
      width: 132px;
      height: 172px;
      background: #601917;
      border: 2px solid #601917;
      border-radius: 11px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 120px;
        height: 120px;
        background: #fefaef;
        border: 2px solid #ff9563;
        border-radius: 11px;
        margin-top: 4px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .nums {
        margin-top: 7px;
        font-size: 28px;

        color: #ffffff;
      }
    }

    .active-box {
      background: linear-gradient(90deg, #c63c29, #e9793b);
      border: 2px solid #ff9563;
    }
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 108px;

    .left_btn,
    .right_btn {
      width: 252px;
      height: 80px;
      background-image: url('../../../assets/btn_5.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #e73d27;
    }

    .right_btn {
      margin-left: 20px;
      background-image: url('../../../assets/btn_4.png');
      color: #ffffff;
    }
  }
}
</style>
