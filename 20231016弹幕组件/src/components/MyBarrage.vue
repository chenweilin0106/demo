<template>
  <div class="MyBarrage">
    <div class="top_img_box"></div>
    <div class="main_box">
      <div
        v-for="item in showArr"
        :key="item.className"
        :class="`item${item.className}`"
        @animationend="animationend(item)"
      >
        {{ item.name }}
      </div>
      <!--      <div class="item1"></div>-->
      <!--      <div class="item2"></div>-->
      <!--      <div class="item3"></div>-->
      <!--      <div class="item4"></div>-->
      <!--      <div class="item5"></div>-->
    </div>
    <div class="bottom_img_box"></div>
    <button @click="fn2">start</button>
    <button @click="fn3">add</button>
  </div>
</template>

<script>
export default {
  name: 'MyBarrage',
  components: {},
  props: {},
  data() {
    return {
      showArr: [],
      requestArr: [],
      timer1: null,
      index: 0,
      randomIndex: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.timer1 = setInterval(() => {
    //   if (index > 5) {
    //     clearInterval(this.timer1)
    //     this.timer1 = null
    //     return
    //   }
    //   if (this.requestArr.length > 0) {
    //     this.index++
    //     this.showArr.push(this.requestArr.shift())
    //   }
    // }, 3000)
  },
  destroyed() {},
  methods: {
    fn3() {
      // if (this.requestArr.length >= 1) {
      // }
      this.requestArr.splice(0, 1, { name: 6666 })
    },
    async fn2() {
      await setTimeout(async () => {
        console.log('获取后端数据')
        this.requestArr.push(
          ...[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }]
        )
        // this.requestArr.push(...[{ name: 1 }])
        // this.index = 0
        // console.log('再次开启定时器')
        // await this.fn2()
      }, 100)
      this.timer1 = await setInterval(async () => {
        console.log('定时器启动')
        if (this.requestArr.length > 0) {
          this.index++
          const num1 = this.requestArr.shift()
          // console.log(this.randomIndex)
          // console.log(
          //   Math.floor(Math.random() * (this.randomIndex.length - 1))
          // )
          // const num2 = this.randomIndex.splice(
          //   Math.floor(Math.random() * (this.randomIndex.length - 1)),
          //   1
          // )
          // const num2 = this.randomIndex.shift()
          // console.log(num2[0])
          num1.className = this.index
          if (this.index >= 10) this.index = 0
          console.log(num1.className)
          // num1.className = num2[0]
          // console.log(this.randomIndex)
          // console.log(num1)
          this.showArr.push(num1)
          if (this.requestArr.length == 0) {
            console.log('5个播放完，停止播放')
            clearInterval(this.timer1)
            this.timer1 = null
            await this.fn2()
            // return
          }
        }
        // else {
        //   clearInterval(this.timer1)
        //   this.timer1 = null
        //   // return
        // }
        console.log('定时器结束')
      }, 3000)
    },
    async animationend(data) {
      // console.log(data)
      this.showArr = this.showArr.filter(
        (item) => item.className != data.className
      )
      // this.showArr.shift()
      // console.log(this.showArr)
      this.randomIndex.push(data.className)
      // if (this.requestArr.length == 1) {
      //   clearInterval(this.timer1)
      //   this.timer1 = null
      //   console.log('后端数据已播放完，动画结束')
      //   await this.fn2()
      // await setTimeout(async () => {
      //   console.log('1秒后获取数据')
      //   this.requestArr = [
      //     { name: 1 },
      //     { name: 2 },
      //     { name: 3 },
      //     { name: 4 },
      //     { name: 5 }
      //   ]
      //   this.index = 0
      //   console.log('再次开启定时器')
      //   await this.fn2()
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.MyBarrage {
  position: relative;
  transform: translate3d(0, 0, 0);
  margin: 200px auto 0;
  width: 685px;
  height: 913px;
  background: url('../assets/mk4_9.png') no-repeat left top/100% 100%;
  padding-top: 47px;

  button:nth-of-type(1) {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  button:nth-of-type(2) {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .top_img_box {
    position: absolute;
    z-index: 2;
    top: 17px;
    left: 23px;
    width: 638px;
    height: 88px;
    background: url('../assets/mk4_9_2.png') no-repeat left top/100% auto;
  }

  .bottom_img_box {
    position: absolute;
    z-index: 2;
    bottom: 58px;
    left: 24px;
    width: 637px;
    height: 221px;
    //background-color: red;
    background: url('../assets/mk4_9_1.png') no-repeat left top/100% auto;
  }

  .main_box {
    position: relative;
    z-index: 1;
    margin-left: 24px;
    width: 636px;
    //height: 670px;
    height: 680px;
    //background-color: skyblue;
    //clip-path: polygon(50% 0%, 100% 4%, 100% 100%, 0 100%, 0 4%);
    //border-radius: 90px 95px 0 0;
    border-radius: 40px 40px 0 0;
    overflow: hidden;
  }

  .item1,
  .item2,
  .item3,
  .item4,
  .item5,
  .item6,
  .item7,
  .item8,
  .item9,
  .item10 {
    position: absolute;
  }

  .item1,
  .item6 {
    z-index: 1;
    width: 197px;
    height: 213px;
    //width: 181px;
    //height: 231px;
    top: 660px;
    //left: -197px;
    left: 300px;
    background: url('../assets/mk4_2.png') no-repeat left top/100% 100%;
    //animation: move1 26s linear;
    animation: move1 27s linear;
  }

  .item2,
  .item7 {
    z-index: 2;
    width: 155px;
    height: 238px;
    left: 100%;
    top: 550px;
    background: url('../assets/mk4_3.png') no-repeat left top/100% 100%;
    //animation: move3 22s linear;
    animation: move2 23s linear;
  }

  .item3,
  .item8 {
    z-index: 3;
    width: 181px;
    height: 231px;
    top: 100%;
    left: 400px;
    background: url('../assets/mk4_1.png') no-repeat left top/100% 100%;
    //animation: move4 24s linear;
    animation: move3 25s linear;
  }

  .item4,
  .item9 {
    z-index: 4;
    width: 168px;
    height: 220px;
    top: 650px;
    left: 200px;
    background: url('../assets/mk4_4.png') no-repeat left top/100% 100%;
    animation: move4 22s linear;
  }

  .item5,
  .item10 {
    z-index: 5;
    width: 156px;
    height: 214px;
    top: 600px;
    left: 100%;
    background: url('../assets/mk4_5.png') no-repeat left top/100% 100%;
    //animation: move5 25s linear;
    animation: move5 24s linear;
  }

  @keyframes move1 {
    0% {
      //bottom: 0;
      //right: -50px;
    }
    100% {
      left: -107px;
      top: -150px;
    }
  }

  @keyframes move2 {
    0% {
      //bottom: 0;
      //right: -50px;
    }
    100% {
      //left: 230px;
      left: 260px;
      top: -238px;
    }
  }

  @keyframes move3 {
    0% {
      //bottom: 0;
      //right: -50px;
    }
    100% {
      left: 60px;
      top: -231px;
    }
  }

  @keyframes move4 {
    0% {
      //bottom: 0;
      //right: -50px;
    }
    100% {
      left: -168px;
      top: 30px;
    }
  }

  @keyframes move5 {
    0% {
      //bottom: 0;
      //right: -50px;
    }
    100% {
      left: 120px;
      top: -214px;
      //bottom: 140%;
    }
  }
}
</style>
