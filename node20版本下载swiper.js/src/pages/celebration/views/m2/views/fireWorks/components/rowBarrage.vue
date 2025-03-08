<template>
  <div class="layout-barrage">
    <div v-for="item in showArr" :key="item.track" class="barrage-item" :class="`move-${item.track}`" @animationend="animationend(item)">
      <div class="barrage-bgi-1" :class="{ 'barrage-bgi-2': item.type == 1 }">
        <div class="avatar-box"><img :src="item.profile_image" @error="imgAtError" @click="toUserMain(item.uid)" /></div>
        <van-notice-bar><span class="name-box line-height-100">{{ item.username }}</span><span class="text-box line-height-100">送出{{ item.nums }}个{{ item.presentName }}</span></van-notice-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'
export default {
  data() {
    return {
      trackArray: [1, 2, 3, 4, 5, 6, 7, 8], // 轨道数组
      showArr: [],
      requestArr: [],
      playTimer: null,
      hiddenTime: null,
      hiddenTimer: null
    }
  },
  props: ['list'],
  watch: {
    list: {
      handler(newVal) {
        if (newVal.length) {
          this.requestArr.push(...newVal)
          this.requestArr = this.requestArr.slice(0, 30)
          document.addEventListener('visibilitychange', this.hiddenFn)
          if (!this.playTimer) this.playAnimation()
        }
      },
      deep: true
    }
  },
  methods: {
    toUserMain,
    imgAtError,
    // 播放动画
    playAnimation() {
      this.addBarrage()
      this.playTimer = setInterval(async () => {
        this.addBarrage()
      }, 2400)
    },
    // 动画结束
    animationend(params) {
      this.showArr = this.showArr.filter((item) => item.track != params.track)
      this.requestArr.push(params)
      this.trackArray.push(params.track)
    },
    // 添加弹幕
    addBarrage() {
      const params = this.requestArr.shift()
      params.track = this.trackArray.shift()
      this.showArr.push(params)
    },
    // 监听页面呼出回调函数
    hiddenFn() {
      if (document.hidden) {
        // 页面挂起
        console.log('页面挂起，清除所有定时器')
        this.clearPlayTimer()
        // 记录页面隐藏的时间
        this.hiddenTime = Date.now()
      } else {
        // 页面呼出
        console.log('页面呼出')
        // 计算页面隐藏的时间长度
        const hiddenDuration = Date.now() - this.hiddenTime
        // 计算等待时间
        const waitTime = Math.max(2400 - hiddenDuration, 0)
        console.log('等待' + waitTime + '毫秒后开启播放动画定时器')
        this.hiddenTimer = setTimeout(async () => {
          this.clearHiddenTimer()
          this.playAnimation()
        }, waitTime)
      }
    },
    /* 清理 播放动画定时器 playTimer */
    clearPlayTimer() {
      clearInterval(this.playTimer)
      this.playTimer = null
    },
    /* 清理隐藏定时器 hiddenTimer */
    clearHiddenTimer() {
      clearTimeout(this.hiddenTimer)
      this.hiddenTimer = null
    }
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.hiddenFn)
  }
}
</script>

<style scoped lang="scss">
@keyframes move {
  0% {
    left: 103%;
  }
  100% {
    left: -80%;
  }
}

.layout-barrage {
  position: absolute;
  z-index: 4;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 650px;
  height: 259px;
  overflow: hidden;
  .barrage-item {
    position: absolute;
    width: 558px;
    height: 149px;
    .barrage-bgi-1 {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 558px;
      height: 149px;
      display: flex;
      align-items: center;
      background: url('@/pages/celebration/assets/mk5_24.png') no-repeat left
        top/100% 100%;
      padding-bottom: 5px;
    }
    .barrage-bgi-2 {
      .name-box,.text-box {
        color: #FFEF85 !important;
      }
    }
    .avatar-box {
      position: relative;
      left: -8px;
      margin-right: -8px;
      width: 78px;
      height: 78px;
      background: linear-gradient(0deg, #de8eff, #7c6bff);
      border-radius: 50%;
      overflow: hidden;
      padding: 4px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .van-notice-bar {
      width: 340px;
      margin-left: 12px;
      padding: 0;
      background: transparent;
      .name-box {
        margin-right: 9px;
        width: fit-content;
        font-size: 24px;
        color: #ffffff;
      }
      .text-box {
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
  .move-1,
  .move-3,
  .move-5,
  .move-7 {
    top: 0;
    animation: move 10s linear;
  }
  .move-2,
  .move-4,
  .move-6,
  .move-8 {
    top: 110px;
    animation: move 10s linear;
  }
}
</style>
