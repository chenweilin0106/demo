<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div ref="picture" class="popupContain position-relative flex align-center justify-center">
      <img class="position-absolute w-100 h-100" :src="IconPath('tk_16.png')" @load.once="productImage" />
      <div class="pictureContain position-relative">
        <img v-if="picture" :src="picture" @load.once="productImage" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import html2canvas from 'html2canvas'
import { commonShare } from '@/pages/520/utils/toApp'
export default {
  props: ['picture'],
  created() {
    this.stopScroll()
  },
  mounted() {
    // this.productImage()
  },
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined,
      loadedImages: 0
    }
  },
  methods: {
    /**
     * @description 下载图片
     * @param link 图片链接
     * @param filename 图片名称
     */
    // download(link, filename) {
    //   let a = document.createElement('a')
    //   a.href = link
    //   a.download = filename || 'default.png'
    //   a.dispatchEvent(new MouseEvent('click'))
    // },
    // 生成图片
    async productImage() {
      this.loadedImages++
      if (this.loadedImages != 2) return
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      const canvas = await html2canvas(this.$refs.picture, {
        backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true // 支持图片跨域
      })
      const param = { shareImage: canvas.toDataURL('image/png'), type: 1 }
      commonShare(param) // type: 1 为分享图片 shareImage: 图片base64
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.autoScroll()
      this.$emit('clickClose')
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      let scrollTop = window.scrollY
      this.pageScroll = scrollTop
      document.body.style.width = '100%'
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + scrollTop + 'px'
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      document.body.style.position = 'static'
      window.scrollTo(0, this.pageScroll)
    }
  }
}
</script>

<style lang="scss" scoped>
.popupContain {
  top: 0;
  left: 0;
  width: 646px;
  height: 948px;
  pointer-events: auto;
  .pictureContain {
    > img {
      width: 567px;
      height: auto;
    }
  }
}
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
