<template>
  <!-- 拖拽小案例 -->
  <div
    class="drag-it-dude"
    @touchstart.stop="hang"
    @touchend.stop="drop"
    @mousedown.stop="hang"
    @mouseup.stop="drop"
    @touchmove.stop="iosMove"
    v-bind:style="{ top: parentTop + 'px', left: parentLeft + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'drag',
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      parentWidth: {
        type: Number,
        default: 0
      },
      parentHeight: {
        type: Number,
        default: 0
      },
      parentLeft: {
        type: Number
        // default: 156.62,
      },
      parentTop: {
        type: Number
        // default: 354.83,
      }
    },
    watch: {
      width(newWidth, oldWidth) {
        if (newWidth < oldWidth) return
        if (this.left === 0) return

        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
        this.parent.height =
          this.parentHeight || this.elem.parentNode.offsetHeight

        if (newWidth > this.parent.width - this.left) {
          const newLeft = this.parent.width - newWidth
          this.left = newLeft < 0 ? 0 : newLeft
          this.elem.style.left = `${this.left}px`
        }
      },
      height(newHeight, oldHeight) {
        if (newHeight < oldHeight) return
        if (this.top === 0) return

        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
        this.parent.height =
          this.parentHeight || this.elem.parentNode.offsetHeight

        if (newHeight > this.parent.height - this.top) {
          const newTop = this.parent.height - this.height
          this.top = newTop
          this.elem.style.top = `${this.top}px`
        }
      }
    },
    data: () => ({
      shiftY: null,
      shiftX: null,
      left: 0,
      top: 0,
      elem: null,
      isIos: false,
      parent: {
        width: 100,
        height: 100
      }
    }),
    methods: {
      iosMove(e) {
        if (this.isIos) this.elementMove(e)
      },
      reset() {
        this.elem.style.left = `${this.parentLeft}px`
        this.elem.style.top = `${this.parentTop}px`
      },
      // 元素移动
      elementMove(e) {
        // emit仅打印作用
        this.$emit('dragging', {
          left: this.left,
          top: this.top
        })
        e.preventDefault()
        if (!e.pageX) {
          document.body.style.overflow = 'hidden'
        }
        /**
         *
         */
        const x = e.pageX || e.changedTouches[0].pageX
        const y = e.pageY || e.changedTouches[0].pageY
        /**
         * 目前理解获取元素四边距离屏幕左边和上边的距离
         */
        let newLeft = x - this.shiftX
        let newTop = y - this.shiftY
        const newRight = x - this.shiftX + this.elem.offsetWidth
        const newBottom = y - this.shiftY + this.elem.offsetHeight
        if (newLeft < 0) {
          newLeft = 0
        } else if (newRight > this.parent.width) {
          newLeft = this.parent.width - this.elem.offsetWidth
        } else {
          newLeft = x - this.shiftX
        }
        if (newTop < 0) {
          newTop = 0
        } else if (newBottom > this.parent.height) {
          newTop = this.parent.height - this.elem.offsetHeight
        } else {
          newTop = y - this.shiftY
        }
        this.elem.style.left = `${newLeft}px`
        this.left = newLeft
        this.elem.style.top = `${newTop}px`
        this.top = newTop
      },
      // 开始移动
      hang(e) {
        // console.log('开始移动')
        // emit仅打印作用
        this.$emit('activated', {
          left: this.left,
          top: this.top
        })
        /**
         * 获取父元素宽高
         * 可以通过传入父元素宽高，也可以通过this.elem.parentNode获取父元素宽高（this.elem是mounted函数中通过this.$el获取的当前组件实例根元素）
         */
        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
        this.parent.height =
          this.parentHeight || this.elem.parentNode.offsetHeight
        // ------------------
        /**
         * 这里的e是img元素，因为事件冒泡的原理，所以这里的e是img元素，而不是drag组件的根元素，而drag组件的根元素是this.elem，因为this.elem和img是贴合的，所以this.elem.offsetLeft和e.offsetLeft是一样的，这一步最终目的是获取拖拽组件距离屏幕左边的距离，用offsetLeft减去是因为父容器已经我100%宽度，所以拖拽组件距离屏幕左边的距离就是拖拽组件距离父容器左边的距离；下面获取高度的逻辑是一致的
         */
        this.shiftX = e.pageX
          ? e.pageX - this.elem.offsetLeft
          : e.changedTouches[0].pageX - this.elem.offsetLeft
        this.shiftY = e.pageY
          ? e.pageY - this.elem.offsetTop
          : e.changedTouches[0].pageY - this.elem.offsetTop
        // ------------------
        if (e.pageX) {
          if (this.isIos) {
            this.elem.addEventListener('touchmove', this.elementMove)
          } else {
            this.elem.addEventListener('mousemove', this.elementMove)
            this.elem.addEventListener('mouseleave', this.drop)
          }
        } else {
          /**
           * 因为事件对象e中没有pageX和pageY属性，所以会走这里的逻辑，给根元素添加touchmove事件，touchmove事件中调用elementMove方法
           */
          this.elem.addEventListener('touchmove', this.elementMove)
        }
      },
      // 停止移动
      drop() {
        this.$emit('dropped', {
          left: this.left,
          top: this.top
        })
        /**
         * 清除样式和拖动的事件
         */
        document.body.style.overflow = null
        this.elem.removeEventListener('mousemove', this.elementMove, false)
        this.elem.removeEventListener('touchmove', this.elementMove, false)
        this.elem.onmouseup = null
        this.elem.ontouchend = null
      }
    },
    mounted() {
      this.isIos =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      this.elem = this.$el
    }
  }
</script>

<style>
  .drag-it-dude {
    position: fixed;
    border: 1px solid red;
  }
</style>
