<template>
  <div class="container">
    <div
      v-for="(item, index) in DrawList"
      :key="index"
      class="prize-item"
      :class="currentIndex === index ? 'active' : ''"
      @click="draw(index)"
    >
      <!--      <img :src="item.url" alt=""/>-->
      <p class="desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      count: 0, // 抽奖次数
      drawOrder: [0, 1, 2, 5, 8, 7, 6, 3], // 抽奖顺序
      pirzeList: [
        { desc: '现金红包' },
        { desc: '一等奖' },
        { desc: '三等奖' },
        { desc: '谢谢参与' },
        { desc: '二等奖' },
        { desc: '现金红包' },
        { desc: '谢谢参与' },
        { desc: '四等奖' }
      ],
      btnStart: { url: '', desc: '开始抽奖' },
      isDrawing: false, // 是否正在抽奖
      currentIndex: null, // 当前选中的奖品
      circle: 32 // 一圈8个奖品，至少转4圈
    }
  },
  computed: {
    DrawList() {
      return [
        ...this.pirzeList.slice(0, 4),
        this.btnStart,
        ...this.pirzeList.slice(4)
      ]
    }
  },
  methods: {
    draw(index) {
      if (index === 4) {
        // 开始抽奖
        if (this.isDrawing) {
          return
        }
        this.isDrawing = true

        const position = 8 // 假设后台返回的中奖位置是5

        const timer = setInterval(() => {
          this.currentIndex = this.drawOrder[this.count % this.drawOrder.length]
          this.count++
          if (
            this.count > this.circle &&
            this.currentIndex === this.drawOrder[position - 1]
          ) {
            // 抽奖结束
            clearInterval(timer)
            // 停顿一会显示中奖
            setTimeout(() => {
              alert('恭喜你中奖了')
              this.isDrawing = false
              this.count = 0
              this.currentIndex = null
            }, 500)
          }
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 528px;
  height: 528px;
  background: skyblue;
  padding: 55px 55px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;

  .prize-item {
    width: 130px;
    height: 130px;
    text-align: center;
    background: red;
    color: lawngreen;
  }

  .active {
    background-color: yellow;
  }
}
</style>
