<template>
  <PopupBox title="title_10.png" size="2" @clickClose="clickClose">
    <div class="listMain flex align-center justify-center flex-wrap">
      <template v-if="list[0].type != 'skill_add'">
        <div v-for="(item, index) in list" :key="index" class="award flex-column align-center">
          <div class="icon w-100 position-relative">
            <div v-if="typeToNameMap[item.type]" class="typeLabel">{{ typeToNameMap[item.type] }}</div>
            <div class="iconMain">
              <PublicImg :class="item.type" :imgName="item.icon" :imgType="item.type" />
            </div>
          </div>
          <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
        </div>
      </template>
      <div v-else class="skillUpdate" style="color: #3A1CA5">
        <i style="color: #B07708">【春风得意】技能升级加成资格</i><br>详细加成请查看活动页面
      </div>
    </div>
    <div class="button margin-row-center line-height-100 flex align-center justify-center" @click="clickConfirm">{{ buttonText }}</div>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/api'
export default {
  props: ['list'],
  inject: ['needNowEquipList', 'nowEquipText', 'typeToNameMap'],
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ]
    }
  },
  computed: {
    // 是否装扮
    isEquip() {
      return this.list.length == 1 && this.needNowEquipList.includes(this.list[0].type)
    },
    // 按钮文案
    buttonText() {
      return this.isEquip ? `立即${this.nowEquipText[this.list[0].type]}` : '我知道了'
    }
  },
  methods: {
    async clickConfirm() {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.list[0]
        this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg)
      }
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.listMain {
  //margin: 115px 0 0;
  width: 100%;
  padding: 0 20px;
  .award {
    $awardSize: 128px;
    width: $awardSize;
    margin-bottom: 13px;
    .icon {
      height: $awardSize;
      $radius: 16px;
      $borderWidth: 4px;
      border-radius: $radius;
      background-color: #C4A4FF;
      padding: 4px;
      .iconMain {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #B891FE, #6547AF);
        border-radius: $radius - $borderWidth;
        overflow: hidden;
      }
    }
    .large-icon {
      width: 188px;
      height: 128px;
    }
    .text {
      margin-top: 14px;
      font-size: 24px;
      color: #3A1CA5;
    }
    $marginLeft: 16px;
    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      margin-left: $marginLeft;
    }
    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      margin-left: $marginLeft;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
  }
  .skillUpdate {
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    line-height: 44px;
  }
}
.button {
  margin-top: 30px;
  width: 328px;
  height: 80px;
  font-size: 32px;
  color: #FFFFFF;
  background: url('@/assets/tk_3.png') no-repeat top left/100% 100%;
}
</style>
