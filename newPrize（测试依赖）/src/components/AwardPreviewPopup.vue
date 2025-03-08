<template>
  <PopupBox title="tab6.png" @clickClose="clickClose">
    <div class="awardContainer">
      <img :src="IconPath('jl_jnlzzsb.png')" />
    </div>
    <div class="awardText">绿晶石+2080</div>
    <img :src="IconPath('word_tk.png')" class="awardDesc" />
    <img :src="IconPath('level@2x.png')" class="awardTip" />
  </PopupBox>
</template>

<script>
import PopupBox from "../components/PopupBox.vue";
export default {
  components: { PopupBox },
  methods: {
    clickClose() {
      this.$emit("clickClose");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .popupContent {
  width: 332px;
  height: 238px;
}
::v-deep .main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36px;
}
.awardContainer {
  width: 72px;
  height: 72px;
  background: linear-gradient(180deg, #ffe98c 0%, #ffa967 50%, #ff6161 100%);
  border-radius: 9px;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 100%;
    height: auto;
  }
}
.awardText {
  margin: 14px 0 16px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  line-height: 100%;
}
.awardDesc {
  margin-bottom: 18px;
  width: 288px;
  height: 22px;
}
.awardTip {
  width: 291px;
  height: 18px;
}
</style>
