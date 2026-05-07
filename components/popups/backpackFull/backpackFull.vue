<template>
  <PopupBox :title="'mk1_title_16.png'" @clickClose="clickClose">
    <div class="title">符石背包已达上限</div>
    <div class="backpack-icon"></div>
    <div class="tip">
      <p v-if="typeBackpackFull == 2">你的符石背包已满，请先分解符石</p>
      <template v-else-if="typeBackpackFull == 1">
        <p>你的符石背包已满，请将任意技能升至</p>
        <p>50级，开启符石寻宝分解符石</p>
      </template>
    </div>
    <div class="buttons">
      <div class="cancel" @click="clickClose">取消</div>
      <div class="confirm" @click="onConfirm">
        {{ typeBackpackFull == 1 ? '我知道了' : '分解符石' }}
      </div>
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
  props: ['typeBackpackFull'],
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
    onConfirm() {
      console.log(this.typeBackpackFull)
      if (this.typeBackpackFull == 1) {
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
.title {
  width: fit-content;
  margin: 0 auto 41px;
  font-weight: 600;
  font-size: 32px;
  color: #FFEF83;
}

.backpack-icon {
  margin: 0 auto 37px;
  width: 119px;
  height: 119px;
  background: url('@/pages/yearCelebration/assets/tk_65.png') no-repeat left top/100% 100%;
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

  //text-align: center;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #4d7ddd;
    margin: 0 30px;
  }

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #a9792c;
    margin: 0 30px;
  }
}
</style>
