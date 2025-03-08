<template>
  <PopupBox :title="popupTitleIcon" @clickClose="clickClose">
    <div class="awardsList flex justify-center align-center">
      <div v-for="(item, index) in firstDoubleAwardPopupData" :key="index" class="award">
        <div class="awardIcon">
          <div class="awardIconInner position-relative w-100 h-100">
            <img v-if="item.mark" :src="IconPath(item.mark)" :class="item.type == 'car' && 'firstLabel'" class="multipleLabel position-absolute" />
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
import PopupBox from '@/pages/childrenDay/components/popupBox.vue'
export default {
  props: ['firstDoubleAwardPopupData'],
  components: { PopupBox },
  data() {
    return {}
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.firstDoubleAwardPopupData.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_10.png' : 'title_9.png'
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
  height: 550px;
  padding-top: 69px;
}
.awardsList {
  padding: 0 30px;
  .award {
    margin-right: 30px;
    width: 168px;
    .awardIcon {
      width: 100%;
      height: 168px;
      border-radius: 16px;
      padding: 4px;
      background-color: #c3f6ff;
      .awardIconInner {
        background: #fefaef;
        border-radius: 12px;
        .firstLabel {
          top: 0;
          right: 0;
          width: 60px;
          height: 32px;
        }
        .multipleLabel {
          top: 0;
          right: 0;
          width: auto;
          height: 34px;
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
  margin-top: 92px;
  width: 324px;
  height: 76px;
  color: #4a50d1;
  background: linear-gradient(0deg, #7cd5ff, #dbfcfd);
  font-size: 32px;
  border-radius: 38px;
  z-index: 1;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    inset: 2px;
    background-image: linear-gradient(180deg, #ebfeff, #baf1f9);
    border-radius: inherit;
  }
}
</style>
