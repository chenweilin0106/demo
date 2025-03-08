<template>
  <BasePopup title="tk_6.png" @close="clickClose">
    <div class="awardsList flex align-center justify-center">
      <div v-for="(item, index) in list" :key="index" class="awardContain" :class="noBorder && 'noBorder'">
        <div class="w-100 awardIcon margin-row-center flex align-center justify-center">
          <slot :data="item">
            <img v-if="item.icon" :src="IconPath(item.icon)" class="h-100" />
          </slot>
        </div>
        <div class="awardText line-height-100 width-fit margin-row-center text-nowrap">{{ item.text }}</div>
      </div>
    </div>
    <div class="confirmButton margin-row-center">
      <div class="confirmButtonMain flex align-center justify-center line-height-100" @click="confirm">{{ buttonText }}</div>
    </div>
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/BasePopup.vue'
import { nowEquip } from '../api'
export default {
  props: ['noBorder', 'list'],
  components: { BasePopup },
  data() {
    return {
      buttonTextMap: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        voice: '立即装扮',
        car: '立即装备',
        costume: '立即装扮',
        chat_bubble: '立即装扮'
      })
    }
  },
  computed: {
    // 是否装扮
    isEquip() {
      return this.list.length == 1 && this.buttonTextMap[this.list[0].type]
    },
    // 按钮文案
    buttonText() {
      if (this.list.length >= 2) {
        return '我知道了'
      } else if (this.isEquip) {
        return this.buttonTextMap[this.list[0].type]
      } else {
        return '我知道了'
      }
    }
  },
  methods: {
    async confirm() {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.list[0]
        this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg)
      }
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 462px;
  height: 456px;
}
.awardsList {
  .awardContain {
    width: 128px;
  }
  .awardContain:nth-child(2) {
    margin-left: 50px;
  }
  .awardIcon {
    margin-top: 28px;
    height: 128px;
    background: linear-gradient(0deg, #f8ba4e, #fde181);
    border-radius: 24px;
    border: 4px solid #ffffff;
  }
  .noBorder {
    width: 150px;
    .awardIcon {
      margin-top: 8px;
      height: 150px;
      background: none;
      border-radius: 0;
      border: none;
    }
  }
}
.awardText {
  margin-top: 15px;
  font-weight: 500;
  font-size: 26px;
  color: #9c4d01;
}
.confirmButton {
  margin-top: 24px;
  width: 306px;
  height: 100px;
  background: url('@/assets/tk_7.png') no-repeat left top/100% 100%;
  .confirmButtonMain {
    margin-left: 16px;
    width: 280px;
    height: 85px;
    font-weight: 500;
    font-size: 30px;
    color: #ffffff;
  }
}
</style>
