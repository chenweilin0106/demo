<template>
  <div id="app">
    <!-- 顶部banner图 -->
    <div class="ThemeBanner"></div>
    <!-- tabs盒子 -->
    <div class="ThemeTab">
      <div
        v-for="tab in tabsArray"
        :key="tab"
        @click="track(tab)"
        class="theme_tab_item flex_across"
        :class="{ theme_tab_active: tabActive == tab }"
      >
        <span>{{ tab }}</span>
        <!-- <img
          :src="
            require(`./assets/tab_${
              1 + index + (!tabActive.includes(tab) ? '_1' : '')
            }.png`)
          "
          alt=""
        /> -->
      </div>
    </div>
    <!-- 模块内容盒子 -->
    <div class="TabsContain"></div>
    <!-- 底部文本 -->
    <div class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
    <ThemeDialog :isShow="showDialog" @closeDialog="showDialog = false">
      <video
        ref="videoRef"
        class="myVideo"
        loop
        muted
        playsinline
        webkit-playsinline
      ></video>
    </ThemeDialog>
    <button @click="openDialog">打开弹框</button>
  </div>
</template>

<script>
import ThemeDialog from './components/Dialog/ThemeDialog.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    ThemeDialog
  },
  data() {
    return {
      showDialog: false,
      // 模块数组
      tabsArray: [
        '冰块兑奖',
        '充值返利',
        '礼尚往来',
        '海底宝藏',
        '积分翻倍',
        '榜上有名'
      ],
      // 当前模块
      tabActive: '冰块兑奖'
    }
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'appVersion'])
  },
  mounted() {
    // // 低版本需手动携带account_id上报
    // if (this.appVersion && this.appVersion < 564) {
    //   this.$thinking.login(this.uid)
    // }
    // // 数数页面浏览埋点
    // this.$thinking.quick('autoTrack', {
    //   referal_source: this.referal_source
    // })
  },
  methods: {
    openDialog() {
      this.showDialog = true
      this.$nextTick(() => {
        const videoDom = this.$refs.videoRef
        videoDom.src = require('./assets/video.mp4')
        videoDom.load()
        videoDom.addEventListener('canplay', this.canPlayVideo)
      })
    },
    canPlayVideo() {
      const videoDom = this.$refs?.videoRef
      if (!videoDom) return
      if (videoDom.currentTime > 0) {
        videoDom.currentTime = 0
      }
      videoDom.play()
      videoDom.removeEventListener('canplay', this.canPlayVideo)
    },
    // 切换模块
    track(module) {
      this.tabActive = module
      // // 数数点击埋点
      // this.$thinking.track(
      //   'WebClick', // 追踪事件的名称
      //   {
      //     element: '模块选择',
      //     module
      //   }
      // )
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  .myVideo {
    width: 200px;
  }
  // 顶部banner图
  .ThemeBanner {
    width: 100%;
    // height: 225px;
    // background: url('./assets/banner.png') no-repeat top center/100%;
  }
  // tabs盒子
  .ThemeTab {
    position: relative;
    // margin: 0px 0 8px;
    overflow: visible;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .theme_tab_item {
      // width: 115px;
      // height: 41px;
      // color: #b28d2b;
      // background: url('./assets/tab_1_1.png') no-repeat top center/100% auto;
      padding-top: 1px;
      font-size: 16px;
      // margin-bottom: 6px;
      // tab为图片时
      // > img {
      //   position: absolute;
      //   width: 115%;
      // }
      // > span {
      //   position: relative;
      //   z-index: 100;
      //   width: 100%;
      //   height: 100%;
      //   opacity: 0;
      // }
    }
    // 当前页面tab背景
    // .theme_tab_active {
    //   color: #fff !important;
    //   background: url('./assets/tab_1.png') no-repeat top center/100% !important;
    // }
    // 布局不在同一行时（一般tab是图片时）
    // .theme_tab_item:nth-child(2) {
    //   margin-top: 47px;
    // }
    // .theme_tab_item:nth-child(4) {
    //   margin-top: 47px;
    // }
  }
  // 模块内容盒子
  .TabsContain {
    // margin-top: -36px;
    padding: 0 8px;
  }
  // 底部文本
  .BottomText {
    font-size: 14px;
    p {
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
    }
  }
}
</style>
