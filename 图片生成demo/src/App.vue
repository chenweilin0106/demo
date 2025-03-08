<template>
  <div id="app">
    <div class="imgColor" ref="creditQrCodeShare">
      <img class="bgc" src="./assets/tk_35.png" alt="" />
      <!-- <div class="address">成都</div> -->
      <PublicJson
        v-if="jsonShow"
        :lottieJson_name="'ic_ch_rsyj'"
        :lottieJson="rsyj"
      ></PublicJson>
      <img
        v-if="imageShow"
        crossorigin="anonymous"
        class="avatar"
        :src="'https://cdn-image.dandan818.com/activity/weekly/json/ic_ch_rsyj/images/img_41.png'"
        alt=""
      />
    </div>
    <div class="myRecode" @click="productImage">点击保存图片</div>
    <!-- <van-overlay :show="show" @click="offOverlay">
      <div class="wrapper">
        <img
          v-if="imgUrl"
          @touchstart="handlerTouchstart"
          @touchmove="handlerTouchmove"
          @touchend="handlerTouchend"
          @click.stop
          :src="imgUrl"
          alt=""
        />
      </div>
    </van-overlay> -->
    <van-dialog v-model="show" title="标题" @close="offOverlay">
      <img
        v-if="imgUrl"
        @touchstart="handlerTouchstart"
        @touchmove="handlerTouchmove"
        @click.stop
        :src="imgUrl"
      />
    </van-dialog>
    <myPopover></myPopover>
    <!-- <SanJiao></SanJiao> -->
    <!-- <div class="clip_path"></div> -->
  </div>
</template>

<script>
  import myPopover from './components/myPopover.vue'
  // import SanJiao from './components/SanJiao.vue'
  import { saveImage } from './utils/toApp'
  import rsyj from './assets/ic_ch_rsyj/data.json'
  import PublicJson from './components/PublicJson.vue'
  import html2canvas from 'html2canvas'
  export default {
    name: 'App',
    components: {
      // SanJiao,
      PublicJson,
      myPopover
    },
    data() {
      return {
        rsyj,
        imgUrl: '',
        show: false,
        // 定时器
        loop: 0,
        jsonShow: true,
        imageShow: false
      }
    },
    methods: {
      offOverlay() {
        // this.show = false
        this.imageShow = false
        this.jsonShow = true
      },
      // 长按事件
      handlerTouchstart() {
        this.loop = setTimeout(() => {
          console.log('长按')
          this.loop = 0 // 执行长按要执行的内容
          saveImage(this.imgUrl)
        }, 1000) // 定时的时间
        return false
      },
      // 长按离开事件（清除定时器）
      handlerTouchmove() {
        // 清除定时器
        console.log('清除定时器')
        clearTimeout(this.loop)
        this.loop = 0
      },
      // 生成图片
      productImage() {
        this.jsonShow = false
        this.imageShow = true
        console.log(this.$refs.creditQrCodeShare)
        this.$nextTick(() => {
          // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
          html2canvas(this.$refs.creditQrCodeShare, {
            backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
            useCORS: true //支持图片跨域
            // scale: 1 //设置放大的倍数
          }).then(canvas => {
            // 把生成的base64位图片上传到服务器,生成在线图片地址
            let url = canvas.toDataURL('image/png') // toDataURL: 图片格式转成 base64
            this.imgUrl = url
            this.show = true
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .van-popup {
    ::v-deep .van-popover__arrow {
      display: none !important;
    }
  }
  .clip_path {
    width: 100px;
    height: 100px;
    background-color: red;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  .van-dialog {
    .van-dialog__content {
      > img {
        width: 333px;
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    // height: 200px;
    img {
      width: 333px;
      // height: 158.5px;
    }
  }
  .imgColor {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 333px;
    height: 158.5px;
    // background: pink;
    background-size: 100%;
    box-sizing: border-box;
    padding-top: 45px;
    .bgc {
      position: absolute;
      // z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      // height: 100%;
      // height: auto;
    }
  }
  .avatar {
    position: relative;
    // z-index: 10;
    width: 100px !important;
    // height: 50px !important;
  }
  .PublicJson {
    position: relative;
    z-index: 10;
    // position: absolute;
    width: 100px !important;
  }
</style>
