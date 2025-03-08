<template>
  <div ref="imageWrapper">
    <img
      ref="image"
      src="./assets/Snipaste_2023-04-22_12-33-32.png"
      alt="Your Image"
    />
  </div>
</template>

<script>
import Vue2TouchEvents from 'vue2-touch-events'
export default {
  plugins: [Vue2TouchEvents],
  mounted() {
    const image = this.$refs.image
    const wrapper = this.$refs.imageWrapper

    let isDragging = false
    let startX = 0
    let startY = 0
    let translateX = 0
    let translateY = 0

    wrapper.addEventListener('touchstart', (event) => {
      isDragging = true
      startX = event.touches[0].clientX - translateX
      startY = event.touches[0].clientY - translateY
    })

    wrapper.addEventListener('touchmove', (event) => {
      if (isDragging) {
        event.preventDefault()
        translateX = event.touches[0].clientX - startX
        translateY = event.touches[0].clientY - startY
        image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
      }
    })

    wrapper.addEventListener('touchend', () => {
      isDragging = false
    })
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
