<template>
  <div class="mySwipe">
    <div class="out">
      <div class="inner">
        <div
          :id="item"
          class="img"
          v-for="(item, index) in this.idArr"
          :key="index"
        >
          <VideoPlayer
            :itemData="videoArray[index]"
            ref="VideoPlayer"
          ></VideoPlayer>
        </div>
      </div>
      <div class="arrow">
        <i @click="onLeft" class="left"></i>
        <i @click="onRight" class="right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '../VideoPlayer/index.vue'
export default {
  name: 'mySwipe',
  components: {
    VideoPlayer
  },
  props: {},
  data() {
    return {
      img: ['first', 'second', 'right', 'left'],
      left: {},
      right: {},
      idArr: ['first', 'second', 'right', 'last'],
      index: 0,
      videoArray: [
        {
          img: 'https://cdn.pixabay.com/photo/2023/03/29/08/19/tulips-7884877_960_720.jpg',
          video:
            'https://cdn-image.dandan818.com/activity/normal/gameWarmup/video/game_video_demo.mp4'
        },
        {
          img: 'https://cdn-image.dandan818.com/activity/normal/gameWarmup/icon/cover.png',
          video:
            'https://cdn-image.dandan818.com/activity/normal/gameWarmup/video/game_video_demo.mp4'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2023/03/29/08/19/tulips-7884877_960_720.jpg',
          video:
            'https://cdn-image.dandan818.com/activity/normal/gameWarmup/video/game_video_demo.mp4'
        },
        {
          img: 'https://cdn-image.dandan818.com/activity/normal/gameWarmup/icon/cover.png',
          video:
            'https://cdn-image.dandan818.com/activity/normal/gameWarmup/video/game_video_demo.mp4'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.img = document.querySelectorAll('.img')
    this.left = document.querySelector('.left')
    this.right = document.querySelector('.right')
  },
  created() {},
  methods: {
    onRight() {
      this.next()
    },
    onLeft() {
      this.prev()
    },
    // 创建切换图片的函数
    prev() {
      // 切换上一张也就是让数组的最后一个元素变成第一个元素
      this.idArr.push(this.idArr.shift())
      this.initialize()
    },
    next() {
      // 跟上面反过来
      this.idArr.unshift(this.idArr.pop())
      this.initialize()
    },
    initialize() {
      for (let i = 0; i < this.img.length; i++) {
        // this.img[i].id = this.idArr[i]
        this.$refs.VideoPlayer[i].stop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mySwipe {
  margin-bottom: 180px;
  // overflow: hidden;
}
.left,
.right {
  width: 50px;
  height: 90px;
  background: url('../../assets/img_next.png') no-repeat;
  background-size: 100%;
}
.left {
  transform: rotate(180deg);
}
.out {
  width: 350px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}
.out .inner {
  width: 100%;
  height: 100%;
}
.out .inner .img {
  width: 287px;
  height: 487px;
  position: absolute;
  transition: 0.3s;
}
.out .inner .img img {
  width: 100%;
  height: 100%;
}
.out .arrow {
  font-size: 32px;
}
.out .arrow i {
  position: absolute;
  color: #fff;
  z-index: 9999;
  cursor: pointer;
  top: 84px;
}
.out .arrow .left {
  top: 185px;
  left: -20px;
}
.out .arrow .right {
  top: 200px;
  right: -20px;
}
.out #last {
  transform: translateX(-30px) scale(0.9);
  z-index: 9;
  opacity: 0;
}
.out #first {
  transform: translateX(34px) scale(1) translateY(0px);
  z-index: 99;
  opacity: 1;
}
.out #second {
  transform: translateX(93px) scale(0.9);
  z-index: 9;
  opacity: 0;
}
.out #left {
  transform: translateX(30px) scale(0.9);
  z-index: 1;
  opacity: 0;
}
.out #right {
  transform: translateX(-30px) scale(0.9);
  z-index: 1;
  opacity: 0;
}
</style>
