<template>
  <div>
    <canvas ref="canvas"></canvas>
    <button @click="generateImage">生成图片</button>
    <button @click="toggleLock">{{ isLocked ? '解锁' : '锁定' }}</button>
  </div>
</template>

<script>
import { fabric } from 'fabric'

export default {
  data() {
    return {
      isLocked: false
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas)

    this.canvas.on('object:moving', (e) => {
      console.log(e)
      // if (this.isLocked) {
      //   e.target.set({
      //     left: e.target.left,
      //     top: e.target.top
      //   })
      // }
    })
  },
  methods: {
    generateImage() {
      const img = new Image()
      img.src = require('./assets/Snipaste_2023-04-22_12-33-32.png')

      img.onload = () => {
        const fabricImg = new fabric.Image(img, {
          left: 0,
          top: 0,
          selectable: true
        })

        this.canvas.add(fabricImg)
        this.canvas.renderAll()

        // // 导出图片
        // const dataURL = this.canvas.toDataURL()
        // const link = document.createElement('a')
        // link.href = dataURL
        // link.download = 'image.png'
        // link.click()
      }
    },
    toggleLock() {
      this.isLocked = !this.isLocked
    }
  }
}
</script>
