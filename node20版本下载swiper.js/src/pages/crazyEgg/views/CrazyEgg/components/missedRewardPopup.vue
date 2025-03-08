<template>
  <PopupBox title="title_5.png" @clickClose="clickClose">
    <div class="missed-reward-text">
      <p>这次没砸中奖励</p>
      <p>不要灰心，再来一次~</p>
    </div>
    <div class="broken-egg">
      <img v-if="eggIcon" :src="IconPath(eggIcon)" />
    </div>
    <div class="theme_botton_did button" @click="clickClose">我知道了</div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'
export default {
  components: { PopupBox },
  data() {
    return {}
  },
  props: ['egg-type'],
  computed: {
    /**
     * 图片判断
     * @param {String} egg-type 贪婪类型 根据类型判断图片
     */
    eggIcon() {
      const obj = {
        7: 'dk_3.png',
        9: 'dk_2.png',
        11: 'dk_1.png'
      }
      return obj[this.eggType]
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
  height: 598px;
  padding-top: 109px;
}
.missed-reward-text {
  margin: 0 auto;
  width: 265px;
  height: 78px;
  font-size: 28px;
  font-weight: 500;
  color: #ffe397;
  white-space: nowrap;
  text-align: center;
}
.broken-egg {
  margin: 48px auto 51px;
  width: 172px;
  height: 170px;

  > img {
    width: 100%;
    height: 100%;
  }
}
.button {
  margin: 0 auto;
  width: 324px;
  height: 76px;
  border-radius: 38px;
}
</style>
