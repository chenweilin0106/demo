<template>
  <PopupBox title="title_3.png" @clickClose="clickClose">
    <div class="select-title">
      {{ textObj[selectData.egg_type] }}
    </div>
    <div class="select-list">
      <div v-for="(item, index) in selectData.list" :key="index" class="select-item" @click="checked = index">
        <div v-if="checked == index" class="light-box"></div>
        <!--TODO label判断条件-->
        <div v-if="item.name.includes('戒指')" class="label"><span>价值1314</span><img :src="IconPath('mk4_15.png')" /></div>
        <PublicImg class="select-icon" :img-name="item.icon" />
        <div class="reward-text-1">
          <p>{{ item.name }}</p>
          <p v-if="item.other">{{ item.other }}</p>
        </div>
        <div class="reward-type">
          <img v-if="item.egg_type == '普通奖励'" :src="IconPath('text_1.png')" />
          <img v-else :src="IconPath('text_2.png')" />
        </div>
        <div class="reward-text-2">
          {{ item.desc }}
        </div>
        <div v-if="checked == index" class="confirm-button" @click="confirm"></div>
      </div>
    </div>
    <!--只有炫彩蛋会出现该文本-->
    <div v-if="selectData.egg_type == 7" class="please-select-foot-text line-height-100">注：瓜分奖励的数量以系统实时数据为准</div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'

export default {
  data() {
    return {
      checked: 2,
      textObj: Object.freeze({ 7: '炫彩蛋大奖', 9: '光明蛋大奖', 11: '星遇蛋大奖' })
    }
  },
  components: { PopupBox },
  props: ['selectData'],
  methods: {
    confirm() {
      this.$emit('confirm', this.checked + 1)
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  padding-top: 105px;
  padding-bottom: 45px;
  height: 718px;
  display: flex;
  flex-direction: column;
}
.select-title {
  margin: 0 auto;
  font-size: 32px;
  width: fit-content;
  font-weight: 500;
  color: #ffe397;
}
.select-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto 0;
  font-size: 26px;
  font-weight: 500;
  color: #f2d58d;
  padding: 0 30px;
  .select-item {
    position: relative;
    width: 250px;
    height: 430px;
    background: url('@/pages/crazyEgg/assets/bg_11.png') no-repeat left top/100% 100%;

    .label {
      position: absolute;
      top: 12px;
      right: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 126px;
      height: 35px;
      background: #46ac96;
      border-radius: 18px;
      white-space: nowrap;

      span {
        margin-left: -7px;
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
        transform: scale(0.83);
        white-space: nowrap;
      }

      > img {
        margin-left: -7px;
        width: 27px;
        height: 20px;
      }
    }

    .light-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 284px;
      height: 464px;
      background: url('@/pages/crazyEgg/assets/bg_4.png') no-repeat left top/100% 100%;
    }

    .select-icon {
      display: block;
      margin: 30px auto 25px;
      width: 134px;
      height: auto;
    }

    .reward-text-1 {
      margin: 0 auto 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: fit-content;
      height: 65px;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;

      //p:nth-of-type(2) {
      //  color: #66ffcc;
      //}
    }

    .reward-type {
      margin: 0 auto;
      width: 116px;
      height: 29px;

      > img {
        width: 100%;
      }
    }

    .reward-text-2 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto 0;
      text-align: center;
      line-height: 30px;
      width: 238px;
      height: 100px;
      //background-color: #fff;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
    }

    .confirm-button {
      position: absolute;
      bottom: -27px;
      left: 50%;
      transform: translateX(-50%);
      width: 220px;
      height: 54px;
      background: url('@/pages/crazyEgg/assets/btn_sure.png') no-repeat left top/100% auto;
    }
    &:nth-child(2) {
      margin-left: 39px;
    }
  }
}
.please-select-foot-text {
  width: fit-content;
  margin-left: 76px;
  font-size: 26px;
  font-weight: 500;
  color: #f2d58d;
}
</style>
