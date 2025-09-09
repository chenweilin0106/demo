<template>
  <div class="marquee">
    <ul ref="scrollBox" class="scrollBox">
      <li v-for="(item, index) in list.concat(list)" :key="index">
        <div class="box">
          <div class="inner">
            <div class="icon"><PublicImg :imgName="item.icon" :imgType="item.type" /></div>
            <div class="text">{{ item.text }}</div>
            <div class="price" v-if="item.price">{{ item.price }}<img :src="IconPath('zs_27_20.png')" /></div>
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
 * @example:
 * <Marquee :list="list" />
 */

export default {
  name: 'marqueeVue',
  props: ['list'],
  data() {
    return {
      spa: '', // 每帧移动距离
      rafId: null, // requestAnimationFrame ID
      translateX: 0 // 当前位移值
    }
  },
  created() {
    this.spa = this.px2vw(-1) // 滚动速度 正数向右，负数向左，默认向左滚动
  },
  mounted() {
    this.startMove()
    document.addEventListener('visibilitychange', this.hiddenFn)
  },
  methods: {
    /**
     * 将设计稿px转换为vw
     * @param {number} px 设计稿px值
     * @returns {number} 通过vw计算后的px值
     */
    px2vw(px) {
      const vw = Number(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
      return Number((px / 750 * vw).toFixed(2))
    },
    startMove() {
      this.move()
      this.rafId = requestAnimationFrame(this.startMove)
    },
    // 监听页面呼出回调函数
    hiddenFn() {
      if (document.hidden) {
        cancelAnimationFrame(this.rafId)
      } else {
        // 页面呼出
        this.startMove()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    move() {
      this.translateX += this.spa
      if (this.translateX < -this.$refs.scrollBox.offsetWidth / 2) this.translateX = 0 // 向左走时，判断图片是否走完，走完时重新开始
      if (this.translateX > 0) this.translateX = -this.$refs.scrollBox.offsetWidth / 2 // 向右走时，判断图片是否走完
      this.$refs.scrollBox.style.transform = `translate3d(${this.translateX}px, 0, 0)`
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rafId)
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
    will-change: transform;
    user-select: none;
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
        background: #f3954f;
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
            background: #b55023;
            border-radius: 0 0 20px 20px;
            font-size: 24px;
            color: #ffffff;
            flex: 1;
            line-height: 100%;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .price {
            background: linear-gradient(-90deg, #75b9ff, #ff84f8);
            border-radius: 17px;
            font-weight: 500;
            font-size: 20px;
            color: #ffffff;
            padding: 5px 15px;
            position: absolute;
            right: 0;
            top: -14px;
            img {
              width: 27px;
              height: 20px;
              margin: 0 5px;
            }
          }
        }
      }
      .name {
        margin-top: 8px;
        font-weight: 500;
        font-size: 26px;
        color: #972a04;
        line-height: 100%;
        white-space: nowrap;
      }
    }
  }
}
</style>
