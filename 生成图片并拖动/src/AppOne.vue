<template>
  <div>
    <img
      v-if="show1"
      id="draggable1"
      draggable="true"
      @dragstart="onDragStart"
      src="./assets/Snipaste_2023-04-22_12-33-32.png"
      @dblclick="show1 = false"
    />
    <img
      v-if="show2"
      id="draggable2"
      draggable="true"
      @dragstart="onDragStart"
      src="./assets/Snipaste_2023-04-22_13-37-05.png"
      @dblclick="show2 = false"
    />
    <div
      id="droppable"
      @drop="onDrop"
      @dragover.prevent
      @dragleave="onDragLeave"
    ></div>
    <button @click="showImg(1)">添加图片1</button>
    <button @click="showImg(2)">添加图片2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      imgTitle: '',
      draggable: {}
    }
  },
  methods: {
    // 显示图片
    showImg(num) {
      // if (this.imgTitle) return alert('已有图片')
      // this.imgTitle = `draggable${num}`
      this[`show${num}`] = true
    },
    onDragStart(event) {
      console.log('🌞 | event：', event)
      this.imgTitle = event.target.id
      event.dataTransfer.setData('text/plain', null)
      event.dataTransfer.setDragImage(
        event.target,
        event.target.width / 2,
        event.target.height / 2
      )
    },
    onDrop(event) {
      event.preventDefault()
      this.draggable = document.querySelector(`#${this.imgTitle}`)
      this.draggable.draggable = false
      this.draggable.style.left = `${
        event.clientX - Math.floor(0.5 * this.draggable.offsetWidth)
      }px`
      this.draggable.style.top = `${
        event.clientY - Math.floor(0.5 * this.draggable.offsetHeight)
      }px`
    },
    onDragLeave(event) {
      // event.target.style.border = 'none'
      console.log('🌞 | 离开区域：')
    }
  }
}
</script>

<style>
#droppable {
  margin-top: 100px;
  width: 300px;
  height: 500px;
  border: 1px solid red;
  overflow: hidden;
}
#draggable1,
#draggable2 {
  position: absolute;
}
</style>
