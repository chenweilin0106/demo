<template>
  <PopupBox size="empty" :hasCostume="false" @clickClose="clickClose">
    <div ref="picture" class="popupContain position-absolute position-center flex align-center justify-center">
      <img class="position-absolute w-100 h-100" crossorigin="anonymous" :src="IconPath('tk_18.png')" @load.once="productImage" />
      <img v-if="config" class="pictureContain position-relative" :src="config" crossorigin="anonymous" @load.once="productImage" />
    </div>
  </PopupBox>
</template>

<script>
import html2canvas from 'html2canvas'
import { commonShare } from '@/utils/toApp'

export default {
  props: ['config'],
  data() {
    return {
      loadedImages: 0
    }
  },
  methods: {
    /**
     * @description 下载图片
     * @param link 图片链接
     * @param filename 图片名称
     */
    download(link, filename) {
      let a = document.createElement('a')
      a.href = link
      a.download = filename || 'default.png'
      a.dispatchEvent(new MouseEvent('click'))
    },
    // 生成图片
    async productImage() {
      this.loadedImages++
      if (this.loadedImages != 2) return
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      const canvas = await html2canvas(this.$refs.picture, {
        backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true // 支持图片跨域
      })
      // this.download(canvas.toDataURL('image/png')) // 调试保存图片 用于直接下载图片方便看效果
      const param = { shareImage: canvas.toDataURL('image/png'), type: 1 }
      commonShare(param) // type: 1 为分享图片 shareImage: 图片base64
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.popupContain {
  width: 646px;
  height: 950px;
  .pictureContain {
    z-index: 1;
    width: 566px;
  }
}
</style>
