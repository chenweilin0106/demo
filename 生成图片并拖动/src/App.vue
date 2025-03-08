<template>
  <div>
    <div class="demo">我我我我我我我我我我我我我</div>
    <div
      class="container"
      :style="{ width: `${containerWidth}px`, height: `${containerHeight}px` }"
      ref="container"
    >
      <img
        v-if="show1"
        v-draggable
        src="./assets/Snipaste_2023-04-22_12-33-32.png"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd($event, 1)"
        ref="image1"
      />
      <img
        v-if="show2"
        v-draggable
        src="./assets/Snipaste_2023-04-22_13-37-05.png"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd($event, 2)"
        ref="image2"
      />
    </div>
    <button @click="generateImage(1)">生成图片1</button>
    <button @click="generateImage(2)">生成图片2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      containerWidth: 300,
      containerHeight: 300,
      position: { x: 0, y: 0 },
      start: { x: 0, y: 0 },
      hammer: null
    }
  },
  directives: {
    draggable: {
      bind: function (el, binding, vnode) {
        el.style.position = 'absolute'
        let startX, startY, initialX, initialY
        let drag = false
        el.addEventListener('touchstart', function (e) {
          startX = e.touches[0].clientX
          startY = e.touches[0].clientY
          initialX = el.offsetLeft
          initialY = el.offsetTop
          drag = true
        })

        el.addEventListener('touchmove', function (e) {
          if (drag) {
            const dx = e.touches[0].clientX - startX
            const dy = e.touches[0].clientY - startY
            const newX = initialX + dx
            const newY = initialY + dy
            const containerRect =
              vnode.context.$refs.container.getBoundingClientRect()
            const elRect = el.getBoundingClientRect()
            const xBoundary = {
              min: containerRect.left,
              max: containerRect.right - elRect.width
            }
            const yBoundary = {
              min: containerRect.top,
              max: containerRect.bottom - elRect.height
            }

            let finalX = newX
            let finalY = newY

            if (newX < xBoundary.min) {
              finalX = xBoundary.min
            }
            if (newX > xBoundary.max) {
              finalX = xBoundary.max
            }
            if (newY < yBoundary.min) {
              finalY = yBoundary.min
            }
            if (newY > yBoundary.max) {
              finalY = yBoundary.max
            }

            el.style.left = `${finalX}px`
            el.style.top = `${finalY}px`

            e.preventDefault()
          }
        })

        el.addEventListener('touchend', function (e) {
          drag = false
        })
      }
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    hideImage(refNum) {
      // 双击事件处理
      this[`show${refNum}`] = false
    },
    generateImage(num) {
      this[`show${num}`] = true
    },
    handleTouchMove(event) {
      event.preventDefault()
    },
    handleTouchEnd(event, refNum) {
      event.stopPropagation()
      const now = new Date().getTime()
      const timeDiff = now - this.lastClickTime
      this.lastClickTime = now

      if (timeDiff < 300) {
        // 双击事件
        this.hideImage(refNum)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0;
  padding: 0;
  position: relative;
  border: 1px solid #ccc;
}
.demo {
  width: 50px;
  text-align: center;
}
</style>
