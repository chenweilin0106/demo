<template>
  <PopupBox @clickClose="clickClose">
    <div class="tk_tit">{{ text }}<br />即可领取额外奖励</div>
    <div class="btns">
      <div class="leftbtn" @click="clickClose"></div>
      <div class="rightbtn" @click="handleBuy"></div>
    </div>
  </PopupBox>
</template>

<script>
import PopupBox from "../components/PopupBox.vue";
export default {
  components: { PopupBox },
  props: ["text"],
  methods: {
    clickClose() {
      this.$emit("clickClose");
    },
    handleBuy() {
      this.$emit("buy");
      this.$emit("clickClose");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .popupContent {
  width: 300px;
  height: 185px;
}
::v-deep .main {
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding-top: 36px;
}
.tk_tit {
  width: 184px;
  height: 38px;
  font-size: 16px;

  font-weight: 500;
  color: #ffffff;
  line-height: 22px;
  margin-top: 44px;
  text-align: center;
  white-space: nowrap;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 27px;

  .leftbtn {
    width: 122px;
    height: 39px;
    background-image: url("../assets/btn3_1.png");
    background-size: 100% 100%;
    margin-right: 16px;
  }

  .rightbtn {
    width: 122px;
    height: 39px;
    background-image: url("../assets/btn3_2.png");
    background-size: 100% 100%;
  }
}
</style>
