<template>
  <PopupBox :title="list[0].double_nums >= 10 ? 'title_6.png' : 'title_7.png'" @clickClose="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative">
          <div class="icon-main">
          <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel position-absolute" :class="item.type == 'car' && 'firstLabel'" />
            <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" :userAvatar="$store.state.user_icon" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="button position-relative flex align-center justify-center" @click="clickClose">我知道了</div>
  </PopupBox>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {}
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  margin-top: 40px;
  width: 100%;
  .award {
    width: 160px;
    margin-bottom: 25px;

    .icon {
      height: 160px;
      //.label {
      //  z-index: 1;
      //  top: -13px;
      //  right: -12px;
      //  padding: 0 7px;
      //  height: 26px;
      //  background: #9c65e1;
      //  border-radius: 13px;
      //  font-weight: 500;
      //  font-size: 18px;
      //  color: #ffffff;
      //}
      .icon-main {
        width: 100%;
        height: 100%;
        background: #103469;
        box-shadow: inset 0 0 5px 3px #fff;
        overflow: hidden;
        .multipleLabel {
          top: 0;
          right: 0;
          width: auto;
          height: 34px;
        }
        .firstLabel {
          top: 0;
          right: 0;
          transform: none;
        }
      }
    }
    .large-icon {
      width: 188px;
      height: 128px;
    }
    .text {
      margin-top: 14px;
      font-size: 24px;
      color: #ffffff;
    }
    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 30px;
    }
    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 30px;
    }
    &:nth-child(1) {
      /* 样式规则 */
      margin-left: 0;
    }
    /* 选择第1，5，9等元素 */
    //&:nth-child(4n + 1) {
    //  /* 样式规则 */
    //  margin-left: 0px;
    //}
  }
}
.button {
  margin: 30px auto;
  width: 240px;
  height: 76px;
  font-size: 32px;
  color: #FFFFFF;
  background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left top/100% 100%;
}
</style>
