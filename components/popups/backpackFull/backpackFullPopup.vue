<template>
  <PopupBox title="背包已满" @clickClose="clickClose">
    <div class="title">符石背包已达上限</div>
    <div class="backpackIcon"></div>
    <div class="tip">
      <p v-if="config === 2">你的符石背包已满，请先分解符石</p>
      <template v-else-if="config === 1">
        <p>你的符石背包已满，请将任意技能升至</p>
        <p>50级，开启符石寻宝分解符石</p>
      </template>
    </div>
    <div class="buttons">
      <div class="status0" @click="clickClose">取消</div>
      <div class="status1" @click="confirm">{{ config === 1 ? '我知道了' : '分解符石' }}</div>
    </div>
  </PopupBox>
</template>

<script>
import { toRuneStoneTreasureHuntPanel } from '@/utils/toApp'

// /**
//  * 符石背包已满弹框处理
//  * @param {Number} errno -5: 符石背包已满 -6: 符石背包已满，请升级到最新版本分解符石
//  */
// backpackFull(errno) {
//   const flag = compareVersions('5.7.8')
//   if (flag == -1) {
//     return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
//   }
//   this.openBackpackFullPopup(errno == -5 ? 1 : 2)
// },
// /**
//  * 打开背包已满弹窗
//  */
// openBackpackFullPopup(type) {
//   console.log('背包已满弹窗')
//   // this.clickClose()
//   setTimeout(() => {
//     this.typeBackpackFull = type
//     this.isShowBackpackFull = true
//   })
// },
export default {
  name: 'poolPopup',
  props: ['config'],
  components: {},
  data() {
    return {
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    confirm() {
      console.log(this.config)
      if (this.config === 1) {
        // toMySkillPanel()
        this.clickClose()
      } else {
        toRuneStoneTreasureHuntPanel()
      }
      this.clickClose()
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent.popupContent {
  .main {
    .title {
      width: fit-content;
      margin: 0 auto 36px;
      font-weight: bold;
      font-size: 34px;
      color: #FFFAA6;
    }
    .backpackIcon {
      margin: 0 auto 37px;
      width: 119px;
      height: 119px;
      background: url('@/pages/520/assets/runeStoneBackpack.png') no-repeat left top/100% 100%;
    }
    .tip {
      width: 508px;
      min-height: 80px;
      white-space: nowrap;
      margin: 0 auto 30px;
      font-size: 30px;
      color: #ffffff;
      p {
        text-align: center;
        line-height: 40px;
        &:nth-of-type(2) {
          text-align: start;
        }
      }
    }
    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      > div {
        $border: 3px;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        font-size: 32px;
        font-weight: normal;
        border: $border solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        width: 246px;
        height: 78px;
        margin: 0 12px;
        &.status0 {
          color: #4d7ddd;
          background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
        }
        &.status1 {
          color: #a9792c;
          background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
        }
      }
    }
  }
}
</style>
