<template>
  <div class="marquee">
    <ul class="scrollBox">
      <li v-for="(item, index) in list" :key="index">
        <div class="box">
          <div class="inner">
            <div class="icon"><PublicImg :imgName="item.icon" :imgType="item.type" /></div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </li>
      <li v-for="(item, index) in list" :key="`copy_${index}`">
        <div class="box">
          <div class="inner">
            <div class="icon"><PublicImg :imgName="item.icon" :imgType="item.type" /></div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * @name: marquee.vue
 * @description: 跑马灯组件
 * requestAnimationFrame实现
 * 执行频率 根据刷新率来执行 所以每个手机会出现滚动速度不一样的情况
 * 优点：动画平滑流畅，不会出现卡顿现象
 * 缺点：因为是根据帧率来执行，所以每个手机滚动速度不一样
 * 定时器实现
 * 执行频率 由于定时器的执行频率是固定的，所以每个手机滚动速度一样
 * 优点：执行频率一致
 * 缺点：动画不够流畅，会出现卡顿现象
 */
export default {
  name: 'marqueeVue',
  props: ['list'],
  data() {
    return {
      ul: null,
      spa: '',
      // rafId: null, // todo requestAnimationFrame实现
      timer: null // todo 定时器实现
    }
  },
  mounted() {
    this.ul = document.querySelector('.scrollBox')
    // 每次滚动的跨度（正数向右，负数向左，默认向左滚动）
    this.spa = this.px2vw(-2) // 滚动速度
    this.ul.style.left = '0'
    this.timer = setInterval(this.move, 30) // todo 定时器实现
    // this.startAnimation() // todo requestAnimationFrame实现
    document.addEventListener('visibilitychange', this.hiddenFn)
  },
  methods: {
    px2vw(px) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      return Number(px) / 750 * vw
    },
    // todo requestAnimationFrame实现
    // startAnimation() {
    //   this.move()
    //   this.rafId = requestAnimationFrame(this.startAnimation)
    // },
    // 监听页面呼出回调函数
    // todo 定时器实现
    hiddenFn() {
      if (document.hidden) {
        clearInterval(this.timer)
        this.timer = null
      } else {
        // 页面呼出
        this.timer = setInterval(this.move, 30)
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // todo requestAnimationFrame实现
    // hiddenFn() {
    //   if (document.hidden) {
    //     cancelAnimationFrame(this.rafId)
    //   } else {
    //     this.startAnimation()
    //     document.removeEventListener('visibilitychange', this.hiddenFn)
    //   }
    // },
    move() {
      let left = parseFloat(this.ul.style.left)
      // 向左走时，判断图片是否走完（这里本来时4张图片，加上后面追加的4张相同的，共有8张，所以需要用ul的总宽度来除以2进行判断），走完时重新开始
      if (left < -this.ul.offsetWidth / 2) this.ul.style.left = left = 0
      if (left > 0) {
        this.ul.style.left = -this.ul.offsetWidth / 2 + 'px' // 向右走时，判断图片是否走完
        left = parseFloat(this.ul.style.left)
      }
      this.ul.style.left = left + this.spa + 'px' // 设置偏移位置
    }
  },
  beforeDestroy() {
    // todo 定时器实现
    clearInterval(this.timer)
    this.timer = null
    // todo requestAnimationFrame实现
    // cancelAnimationFrame(this.rafId)
    this.ul = null
    document.removeEventListener('visibilitychange', this.hiddenFn)
  }
}
</script>

<style scoped lang="scss">
.marquee {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .scrollBox {
    width: fit-content;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    li {
      width: 128px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin-left: 7px;
      .box {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        position: relative;
        margin: 0 7px;
        width: 100%;
        height: 128px;
        background: #F3954F;
        padding: 4px;
        border-radius: 24px;
        .inner {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .icon {
            width: 100%;
            height: 90px;
            border-radius: 20px 20px 0 0;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .text {
            width: 100%;
            background: #B55023;
            border-radius: 0 0 20px 20px;
            font-size: 24px;
            color: #FFFFFF;
            flex: 1;
            line-height: 100%;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .name {
        margin-top: 8px;
        font-weight: 500;
        font-size: 26px;
        color: #972A04;
        line-height: 100%;
        white-space: nowrap;
      }
    }
  }
}
</style>
