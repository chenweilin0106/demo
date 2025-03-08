<template>
  <!-- 拖拽小案例2  -->
  <div id="app" class="parentElement">
    <div class="wrap1">
      <drag
        ref="drag"
        @dropped="handleDropped($event)"
        @dragging="dragging($event)"
        @activated="activated($event)"
        :parentTop="parentTop"
        :parentLeft="parentLeft"
      >
        <img class="cola" src="../assets/cola.png" alt="" />
      </drag>
      <!-- <drag ref="drag" @dropped="handleDropped($event)" @dragging="dragging($event)" @activated="activated($event)"
        :parentLeft="parentLeft" :parentTop="parentTop2">
        <img class="cola" src="../assets/cola.png" alt="">
      </drag> -->
    </div>
  </div>
</template>

<script>
  import Drag from './DragItDude.vue'
  export default {
    name: 'App',
    components: {
      Drag
    },
    data: () => ({
      text: 'Just move me!',
      obj: {},
      flag: 0,
      parentLeft: 156.62,
      parentTop: 20
      // parentTop2: 200
    }),
    mounted() {},
    methods: {
      handleDropped(obj) {
        this.obj = { x: Math.abs(obj.left - 156.62), y: obj.top - 354.83 }
        /**
         * 限制拖动范围，超出范围直接返回原位
         */
        if (this.obj.x < 100 && this.obj.y > -140 && this.obj.y < 50) {
          this.$refs.drag.reset()
          this.flag = 0
        } else {
          this.flag = 2
        }
      },
      dragging() {
        console.log('dragging')
        this.text = 'dragging'
      },
      activated() {
        console.log('activated')
        this.text = 'activated'
        if (this.flag != 2) {
          this.flag = 1
        }
      }
    }
  }
</script>

<style lang="scss">
  .parentElement {
    width: 100vw;
    height: 100vh;

    .drag-it-dude {
      .cola {
        width: 36px;
        height: 36px;
      }
    }

    .wrap1 {
      border: 1px solid red;
      position: relative;
      // width: 30vw;
      height: 60vh;
    }
  }
</style>
