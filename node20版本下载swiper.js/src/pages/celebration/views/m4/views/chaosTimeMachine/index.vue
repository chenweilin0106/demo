<template>
  <div class="chaosTimeMachine">

    <ReceivePopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceivePopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import ReceivePopup from '../centuryBall/components/receivePopup.vue'

export default {
  name: 'chaosTimeMachine',
  components: {
    ReceivePopup
  },
  data() {
    return {

      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: []
    }
  },
  watch: {},
  computed: {},
  created() {
    // this.getHomePage()
  },
  mounted() {
  },
  methods: {
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg) {
      console.log('获奖弹窗')
      this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        this.getHomePage()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chaosTimeMachine{
  position: relative;
}
</style>
