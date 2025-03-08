<template>
  <div class="container">
    <ul class="ulJson">
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">随机符石</div>
          <img :src="IconPath('sjfs_120_120.png')" />
        </div>
        <!--<PublicJson jsonName="ch_cjcpq_01" />-->
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">靓号券</div>
          <img :src="IconPath('lhq_120_120.png')" />
        </div>
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi mic_animation">
        <div class="inner">
          <div class="label flex-center">座驾</div>
          <img :src="IconPath('xyc_120_120.png')" />
        </div>
        <!--<PublicJson jsonName="ch_cjcpqq_03" />-->
        <!--<PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />-->
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">戒指</div>
          <img :src="IconPath('prxd_120_120.png')" />
        </div>
        <!--<img :src="IconPath('ljs_120_120.png')" />-->
        <!--<PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />-->
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">气泡</div>
          <public-json jsonName="qp_mzdm_sc" />
        </lazy-component>
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">头饰</div>
          <public-svga
            svgaName="ts_yhcl"
            :userAvatar="$store.state.user_icon"
          />
        </lazy-component>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">主页特效</div>
          <img :src="IconPath('wsry_120_120.png')" />
        </div>
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">声波</div>
          <public-json
            jsonName="sb_klsg"
            :userAvatar="$store.state.user_icon"
          />
          <!--<img :src="IconPath('xyc_120_120.png')" />-->
        </lazy-component>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">符石精粹</div>
          <img :src="IconPath('dlfsjc_120_120.png')" />
        </div>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">绿晶石</div>
          <img :src="IconPath('ljs_120_120.png')" />
        </div>
      </li>
      <!--一波-->
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">随机符石</div>
          <img :src="IconPath('sjfs_120_120.png')" />
        </div>
        <!--<PublicJson jsonName="ch_cjcpq_01" />-->
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">靓号券</div>
          <img :src="IconPath('lhq_120_120.png')" />
        </div>
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi mic_animation">
        <div class="inner">
          <div class="label flex-center">座驾</div>
          <img :src="IconPath('xyc_120_120.png')" />
        </div>
        <!--<PublicJson jsonName="ch_cjcpqq_03" />-->
        <!--<PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />-->
        <!--<div class="label"><span>稀有</span></div>-->
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">戒指</div>
          <img :src="IconPath('prxd_120_120.png')" />
        </div>
        <!--<img :src="IconPath('ljs_120_120.png')" />-->
        <!--<PublicSvga svgaName="hmxh" :userAvatar="$store.getters.user_icon" />-->
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">气泡</div>
          <public-json jsonName="qp_mzdm_sc" />
        </lazy-component>
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">头饰</div>
          <public-svga
            svgaName="ts_yhcl"
            :userAvatar="$store.state.user_icon"
          />
        </lazy-component>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">主页特效</div>
          <img :src="IconPath('wsry_120_120.png')" />
        </div>
      </li>
      <li class="jsonLi">
        <lazy-component class="inner">
          <div class="label flex-center">声波</div>
          <public-json
            jsonName="sb_klsg"
            :userAvatar="$store.state.user_icon"
          />
          <!--<img :src="IconPath('xyc_120_120.png')" />-->
        </lazy-component>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">符石精粹</div>
          <img :src="IconPath('dlfsjc_120_120.png')" />
        </div>
      </li>
      <li class="jsonLi">
        <div class="inner">
          <div class="label flex-center">绿晶石</div>
          <img :src="IconPath('ljs_120_120.png')" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PublicJson from '@/pages/lanternFestival/components/PublicJson.vue'
import PublicSvga from '../components/PublicSvga.vue'

export default {
  name: 'MarQuee',
  components: {
    PublicSvga,
    PublicJson
  },
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
    width: fit-content;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    li {
      position: relative;
      margin: 0 5px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 140px;
      background: linear-gradient(0deg, #f94e3c, #ffc677);
      padding: 4px;
      border-radius: 12px;

      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        background: #40140e;
        //padding-top: 10px;
        border-radius: 8px;
        overflow: hidden;

        > img {
          width: 100%;
        }
      }

      .label {
        position: absolute;
        z-index: 2;
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 28px;
        background: url('@/pages/lanternFestival/assets/mk5_14.png') no-repeat
          left top/100% 100%;
        font-size: 18px;
        font-weight: 600;
        color: #ffe2b6;
        padding-top: 4px;
      }
    }
  }

  .PublicSvga {
    ::v-deep .micAvatar_img {
      width: 80%;
      height: 80%;
    }

    ::v-deep .svga_box {
      width: 100%;
    }
  }

  .PublicJson {
    ::v-deep .micAvatar_img {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
    }

    ::v-deep .json_box {
      width: 100%;
    }
  }
}
</style>
