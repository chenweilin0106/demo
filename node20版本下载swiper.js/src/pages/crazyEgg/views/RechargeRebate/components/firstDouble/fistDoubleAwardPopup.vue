<template>
  <PopupBox :title="popupTitleIcon" @clickClose="clickClose">
    <div class="awardsList flex justify-center align-center">
      <div v-for="(item, index) in firstDoubleAwardPopupData" :key="index" class="award">
        <div class="awardIcon">
          <div class="awardIconInner position-relative w-100 h-100">
            <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel position-absolute" :class="item.type == 'car' && 'firstLabel'" />
            <img :src="IconPath(item.icon)" class="icon h-100 width-auto" />
          </div>
        </div>
        <div class="awardText flex align-center justify-center line-height-100 text-nowrap position-relative">
          <span class="position-absolute position-center">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div class="popupButton position-relative margin-row-center flex align-center justify-center line-height-100" @click="clickClose">开心收下</div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'
export default {
  props: ['firstDoubleAwardPopupData'],
  components: { PopupBox },
  data() {
    return {}
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.firstDoubleAwardPopupData.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_7.png' : 'title_6.png'
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  height: 567px;
  padding-top: 155px;
}
.awardsList {
  padding: 0 30px;
  .award {
    margin-right: 30px;
    width: 134px;
    .awardIcon {
      width: 100%;
      height: 134px;
      border-radius: 16px;
      padding: 4px;
      background-color: #c86325;
      .awardIconInner {
        background: #fffbdd;
        border-radius: 12px;
        .multipleLabel {
          top: 0;
          right: 0;
          width: auto;
          height: 34px;
        }
        .firstLabel {
          top: -4px;
          right: -4px;
        }
      }
    }
    .awardText {
      width: 100%;
      margin-top: 16px;
      font-weight: 500;
      font-size: 28px;
      height: 28px;

      color: #ffffff;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.popupButton {
  margin-top: 80px;
  width: 324px;
  height: 76px;
  color: #fff;
  background: linear-gradient(0deg, #34a38f, #9adbb9);
  font-size: 32px;
  border-radius: 38px;
  z-index: 1;
  border: 2px solid #fff;
}
</style>
