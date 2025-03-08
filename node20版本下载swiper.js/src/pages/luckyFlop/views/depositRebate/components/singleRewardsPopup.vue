<template>
  <PopupBox :title="popupTitleIcon" @clickClose="clickClose">
    <div class="awardsList">
      <div v-for="(item, index) in rewardsList" :key="index" class="award">
        <div class="awardIcon">
          <div class="awardIconInner">
            <img v-if="item.mark" :src="IconPath(item.mark)" class="multipleLabel" />
            <img class="awardIconImg" :src="IconPath(item.icon)" />
          </div>
        </div>
        <div class="awardText">
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div class="closebtn" @click="clickClose">开心收下</div>
  </PopupBox>
</template>

<script>
export default {
  props: ['rewardsList'],
  components: {},
  data() {
    return {}
  },
  computed: {
    popupTitleIcon() {
      const doubleNum = this.rewardsList.find((item) => item.double_nums).double_nums
      return doubleNum >= 10 ? 'title_18.png' : 'title_17.png'
    }
  },
  methods: {
    clickClose() {
      this.$emit('closePopups')
    }
  }
}
</script>

<style scoped lang="scss">
.awardsList {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .award {
    margin: 0 10px;
    width: 168px;
    .awardIcon {
      width: 100%;
      height: 168px;
      border-radius: 16px;
      padding: 4px;
      background-color: #ffbdfd;
      .awardIconInner {
        width: 100%;
        height: 160px;
        background: #fefaef;
        border-radius: 12px;
        position: relative;
        .firstLabel {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 32px;
        }
        .multipleLabel {
          position: absolute;
          top: 0;
          right: 0;
          width: auto;
          height: 34px;
        }
        .awardIconImg{
          height: 100%;
          width: 100%;
        }
      }
    }
    .awardText {
      width: 100%;
      margin-top: 16px;
      font-weight: 500;
      font-size: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
  }
}
.closebtn{
  margin: 40px 30px;
  width: 324px;
  height: 76px;
  color: #4a50d1;
  background: linear-gradient(0deg, #7cd5ff, #dbfcfd);
  font-size: 32px;
  border-radius: 38px;
  line-height: 76px;
}
</style>
