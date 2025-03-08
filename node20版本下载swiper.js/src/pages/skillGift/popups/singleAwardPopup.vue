<template>
  <PublicPopup :title="popupTitleIcon" @close="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
        <div class="icon w-100 position-relative">
          <div class="icon-main">
            <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel position-absolute" :class="item.type == 'car' && 'firstLabel'" />
            <img :src="IconPath(item.icon)" class="h-100 width-auto" />
          </div>
        </div>
        <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="button position-relative flex align-center justify-center" @click="clickClose">开心收下</div>
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/skillGift/components/publicPopup.vue'
export default {
  components: { PublicPopup },
  props: ['list'],
  computed: {
    popupTitleIcon() {
      const doubleNum = this.list.find((item) => item.double_nums)?.double_nums
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
  width: 642px;
  min-height: 562px;
}
.list {
  padding-top: 119px;
  .award {
    width: 141px;
    margin-bottom: 21px;

    .icon {
      height: 143px;
      background: url('@/pages/skillGift/assets/tk_4.png') no-repeat left top/100% 100%;
      padding: 4px;
      .icon-main {
        width: 100%;
        height: 100%;
        //background-color: #fff;
        //border-radius: 12px;
        overflow: hidden;
        .multipleLabel {
          top: -4px;
          right: 0;
          transform: translateX(50%);
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
      width: 141px;
      margin-top: 21px;
      font-size: 28px;
      color: #ffffff;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 60px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 60px;
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
  margin: 40px auto 50px;
  width: 263px;
  height: 98px;
  font-size: 32px;
  color: #1069ff;
  background: url('@/pages/skillGift/assets/tk_7.png') no-repeat left top/100% 100%;
}
</style>
