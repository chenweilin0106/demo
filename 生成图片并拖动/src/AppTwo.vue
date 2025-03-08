<template>
  <div class="contain">
    <img
      ref="dragImg"
      src="./assets/Snipaste_2023-04-22_12-33-32.png"
      @touchstart="handleTouchStart"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleTouchStart(event) {
      const dragImg = this.$refs.dragImg
      const startX = event.touches[0].clientX - dragImg.offsetLeft
      const startY = event.touches[0].clientY - dragImg.offsetTop

      const handleTouchMove = (event) => {
        const left = event.touches[0].clientX - startX
        const top = event.touches[0].clientY - startY

        // 更新图片的位置
        dragImg.style.left = left + 'px'
        dragImg.style.top = top + 'px'
      }
      // handleTouchMove(event)
      const handleTouchEnd = () => {
        // 移除事件监听器
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }

      // 添加事件监听器
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
    }
  }
}
</script>

<style>
img {
  position: absolute;
}

.contain {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
</style>
