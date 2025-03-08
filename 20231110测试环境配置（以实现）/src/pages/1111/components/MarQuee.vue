<template>
  <div class="container">
    <ul class="ulJson">
      <li class="jsonLi">
        <img :src="IconPath('mtjz_120_120.png')" />
        <!--<PublicJson jsonName="ch_cjcpq_01" />-->
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi">
        <!--<PublicJson jsonName="ch_cjcpq_02" />-->
        <img :src="IconPath('xhfm_120_120.png')" />
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi mic_animation">
        <!--<PublicJson jsonName="ch_cjcpqq_03" />-->
        <PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi">
        <img :src="IconPath('ljs_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('zjs_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('yb_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('dq_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('jb_120_120.png')" />
      </li>
      <!--一波-->
      <li class="jsonLi">
        <img :src="IconPath('mtjz_120_120.png')" />
        <!--<PublicJson jsonName="ch_cjcpq_01" />-->
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi">
        <!--<PublicJson jsonName="ch_cjcpq_02" />-->
        <img :src="IconPath('xhfm_120_120.png')" />
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi mic_animation">
        <!--<PublicJson jsonName="ch_cjcpqq_03" />-->
        <PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />
        <div class="label"><span>稀有</span></div>
      </li>
      <li class="jsonLi">
        <img :src="IconPath('ljs_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('zjs_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('yb_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('dq_120_120.png')" />
      </li>
      <li class="jsonLi">
        <img :src="IconPath('jb_120_120.png')" />
      </li>
    </ul>
  </div>
</template>

<script>
import PublicSvga from '../components/PublicSvga.vue'

export default {
  name: 'MarQuee',
  components: {
    PublicSvga
  },
  props: {},
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
  width: 100%;
  height: 100%;
  /* 相对定位 */
  position: relative;
  /* 溢出隐藏 */
  overflow: hidden;

  > ul {
    //width: 1590px;
    //width: 496px;
    //width: 576px;
    //width: 1152px;
    width: fit-content;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    //justify-content: space-evenly;
    position: relative;

    li {
      position: relative;
      margin: 0 5px;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 62px;
      height: 62px;
      border: 1px solid #97f2ff;
      background: linear-gradient(0deg, #3337aa, #212072);
      border-radius: 6px;

      .label {
        position: absolute;
        z-index: 2;
        top: -6px;
        left: 0;
        width: 30px;
        height: 12px;
        background: #506ad7;
        border-radius: 6px;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          font-size: 12px;
          color: #ffffff;
          white-space: nowrap;
        }
      }

      > img {
        width: 100%;
      }
    }

    //.title_animation {
    //  width: 110px;
    //}

    //.mic_animation {
    //  width: 74px;
    //  height: 100%;

    .PublicSvga {
      ::v-deep .micAvatar_img {
        width: 70%;
        height: 70%;
      }

      ::v-deep .svga_box {
        width: 90%;
      }
    }

    //}

    //.sweet_value {
    //  width: 93px;
    //
    //  > img {
    //    width: 100%;
    //  }
    //}

    //.magic_carpet {
    //  width: 70px;
    //
    //  > img {
    //    width: 100%;
    //  }
    //}
    //
    //.cp_card {
    //  position: relative;
    //  margin-left: 10px;
    //  width: 108px;
    //
    //  > img {
    //    position: absolute;
    //    z-index: 2;
    //    top: 50%;
    //    left: 50%;
    //    transform: translate(-50%, -56%);
    //    width: 85%;
    //  }
    //}
    //
    //.strawberry {
    //  width: 70px;
    //
    //  > img {
    //    width: 100%;
    //  }
    //}
  }
}
</style>
