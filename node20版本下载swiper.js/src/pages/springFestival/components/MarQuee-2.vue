<template>
  <div class="container">
    <ul class="ulJson">
      <li class="jsonLi mic">
        <public-json jsonName="ch_fyll" />
        <public-json jsonName="ch_yqmm" />
      </li>
      <li class="jsonLi">
        <public-json jsonName="ch_dynz" />
        <public-json jsonName="ch_ndts" />
      </li>
      <li class="jsonLi title">
        <public-json jsonName="ch_drjl" />
        <public-json jsonName="ch_xjl" />
      </li>
      <li class="jsonLi" :class="(mark == 2 || mark == 3) && 'voice'">
        <public-json jsonName="ch_lmcd" />
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_bxcm.gif"
          alt=""
        />
      </li>
      <li class="jsonLi">
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_mldr.gif"
          alt=""
        />
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_dtldybh.gif"
          alt=""
        />
      </li>
      <!--第二波-->
      <li class="jsonLi mic">
        <public-json jsonName="ch_fyll" />
        <public-json jsonName="ch_yqmm" />
      </li>
      <li class="jsonLi">
        <public-json jsonName="ch_dynz" />
        <public-json jsonName="ch_ndts" />
      </li>
      <li class="jsonLi title">
        <public-json jsonName="ch_drjl" />
        <public-json jsonName="ch_xjl" />
      </li>
      <li class="jsonLi" :class="(mark == 2 || mark == 3) && 'voice'">
        <public-json jsonName="ch_lmcd" />
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_bxcm.gif"
          alt=""
        />
      </li>
      <li class="jsonLi">
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_mldr.gif"
          alt=""
        />
        <img
          src="https://imagevo.dandanvoice.com/activity/weekly/gif/ch_dtldybh.gif"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<script>
import PublicJson from '../components/PublicJson.vue'
export default {
  name: 'MarQuee',
  components: {
    PublicJson
  },
  props: ['mark'],
  data() {
    return {
      timer: null,
      ul: {},
      spa: ''
    }
  },
  mounted() {
    this.ul = document.querySelector('.ulJson')
    // this.ul.innerHTML = this.ul.innerHTML + this.ul.innerHTML
    // 获取所有的li元素和.btn元素
    // const lis = document.querySelectorAll('.jsonLi')
    // 每次滚动的跨度（正数向右，负数向左，默认向左滚动）
    this.spa = -2
    // 计算并设置ul的总宽度
    // this.ul.style.width =
    //   (lis[0].offsetWidth * 3 +
    //     lis[3].offsetWidth +
    //     lis[4].offsetWidth +
    //     lis[5].offsetWidth +
    //     lis[6].offsetWidth +
    //     lis[7].offsetWidth) *
    //     2 +
    //   'px'
    // 定时器，每30毫秒执行一次move函数
    this.timer = setInterval(this.move, 30)
  },
  methods: {
    // 监听页面呼出回调函数
    hiddenFn() {
      if (document.hidden) {
        clearInterval(this.timer)
        this.timer = null
      } else {
        // 页面呼出
        this.timer = setInterval(this.move, 30)
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    move() {
      document.addEventListener('visibilitychange', this.hiddenFn)
      if (this.ul.offsetLeft < -this.ul.offsetWidth / 2) {
        // 向左走时，判断图片是否走完（这里本来时4张图片，加上后面追加的4张相同的，共有8张，所以需要用ul的总宽度来除以2进行判断），走完时重新开始
        this.ul.style.left = '0'
      }
      if (this.ul.offsetLeft > 0) {
        // 向右走时，判断图片是否走完
        this.ul.style.left = -this.ul.offsetWidth / 2 + 'px'
      }
      // 设置偏移位置
      this.ul.style.left = this.ul.offsetLeft + this.spa + 'px'
      // console.log('运行中')
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style scoped lang="scss">
.container {
  /* 相对定位 */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 96%;
  height: 100%;
  /* 溢出隐藏 */
  overflow: hidden;
  // padding-top: 35px;
  display: flex;
  align-items: center;
  // clip-path: polygon(15% 0%, 90% 0%, 100% 50%, 90% 100%, 15% 100%, 0% 50%);

  > ul {
    width: fit-content;
    //height: 100%;
    // overflow: hidden;
    display: flex;
    align-items: center;
    //justify-content: space-evenly;
    position: relative;

    li {
      width: 182px;
      height: 172px;
      position: relative;
      margin: 0 3px;
      //display: flex;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      //align-items: center;
      //width: 128px;
      //height: 128px;
      //border: 4px solid #ac6fff;
      //background: #fff;
      //border-radius: 24px;

      > img {
        width: 100%;
        height: 50%;
      }
    }

    // .mic {
    //   width: 132px;
    //   height: 130px;
    // }

    // .voice {
    //   width: 132px;
    //   height: 130px;
    // }

    // .title {
    //   width: 220px;
    // }

    // .hsfs {
    //   transform: scale(1.1);
    //   margin: 0 -20px;
    // }

    .PublicSvga {
      ::v-deep .micAvatar_img {
        width: 80%;
        height: 80%;
      }
    }

    .PublicJson {
      ::v-deep .micAvatar_img {
        width: 70%;
        height: 70%;
      }
    }
  }
}
</style>
