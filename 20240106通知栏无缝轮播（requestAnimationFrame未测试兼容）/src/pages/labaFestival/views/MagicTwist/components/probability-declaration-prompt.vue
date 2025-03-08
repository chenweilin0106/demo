<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_11.png')" />

      <div class="inner-bgc">
        <div class="form-1"></div>
        <div class="rule-text">
          <ul>
            <li><span></span>随机符石按照以下概率：</li>
            <li>绿色符石：47%<i>蓝色符石：30%</i></li>
            <li>紫色符石：15%<i>橙色符石：8%</i></li>
          </ul>
        </div>
      </div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="bottom-icon"></div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt() {
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
  height: 752px;
  background-color: #eee1ff;
  border: 8px solid #c59ce8;
  padding: 4px;
  border-radius: 32px;
  pointer-events: auto;
}

.title-image {
  width: 692px;
  height: 227px;
  position: absolute;
  top: -170px;
  left: -40px;
  pointer-events: none;
}

.left-icon {
  position: absolute;
  top: 76px;
  left: -42px;
  width: 99px;
  height: 252px;
  background: url('@/pages/labaFestival/assets/tk_1.png') no-repeat left
    top/100% 100%;
}

.right-icon {
  position: absolute;
  top: 94px;
  right: -38px;
  width: 87px;
  height: 251px;
  background: url('@/pages/labaFestival/assets/tk_2.png') no-repeat left
    top/100% 100%;
}

.bottom-icon {
  position: absolute;
  right: -16px;
  bottom: -20px;
  width: 224px;
  height: 50px;
  background: url('@/pages/labaFestival/assets/tk_3.png') no-repeat left
    top/100% 100%;
}

.inner-bgc {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #8360c3, #b75059);
  //overflow: hidden;
  border-radius: 20px;
  padding-bottom: 42px;
  padding-top: 71px;
}

.form-1 {
  margin: 0 auto;
  width: 554px;
  height: 502px;
  background: url('@/pages/labaFestival/assets/tk_7.png') no-repeat left
    top/100% 100%;
}
.rule-text {
  margin-left: 49px;
  margin-top: 10px;
  color: #fff;
  white-space: nowrap;

  li {
    position: relative;
    list-style-type: none;
    font-size: 24px;
    line-height: 40px;
    //display: flex;

    span {
      position: absolute;
      top: 15px;
      left: -22px;
      width: 12px;
      height: 12px;
      background: #ffe467;
      border-radius: 50%;
    }
    i {
      margin-left: 100px;
    }
  }
}
</style>
