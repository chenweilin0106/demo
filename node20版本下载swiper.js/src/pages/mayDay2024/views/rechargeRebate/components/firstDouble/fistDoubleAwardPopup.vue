<template>
  <PublicPopup :title="popupTitleIcon" @close="clickClose">
    <div class="awardsList flex justify-center align-center">
      <div v-for="(item, index) in firstDoubleAwardPopupData" :key="index" class="award">
        <div class="awardIcon">
          <div class="awardIconInner position-relative w-100 h-100">
            <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel position-absolute" />
            <img :src="IconPath(item.icon)" class="icon h-100 width-auto" />
          </div>
        </div>
        <div class="awardText flex align-center justify-center line-height-100 text-nowrap position-relative">
          <span class="position-absolute position-center">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div class="popupButton position-relative margin-row-center flex align-center justify-center line-height-100" @click="clickClose">开心收下</div>
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/mayDay2024/components/publicPopup.vue'
export default {
  props: ['firstDoubleAwardPopupData'],
  components: { PublicPopup },
  data() {
    return {}
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.firstDoubleAwardPopupData.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_8.png' : 'title_7.png'
    }
  },
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 620px;
  height: 550px;
  padding-top: 119px;
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
      background-color: #ffbdfd;
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
