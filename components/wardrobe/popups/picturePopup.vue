<template>
  <PopupBox size="empty" @clickClose="clickClose" :has-costume="false">
    <img :src="config" class="show position-absolute position-center" />
  </PopupBox>
</template>

<script>
import { commonShare, isIOS } from '@/utils/toApp'

export default {
  props: ['config'],
  data() {
    return {}
  },
  mounted() {
    try {
      const param = { shareImage: this.config, type: 1, platforms: isIOS() ? ['3', '4'] : ['1', '2', '3', '4'] }
      commonShare(param) // type: 1 为分享图片 shareImage: 图片base64
    } catch (e) {
      console.dir(e)
      // this.download(this.config)
    }
  },
  methods: {
    /**
     * @description 下载图片
     * @param link 图片链接
     * @param filename 图片名称
     */
    download(link) {
      const newWindow = window.open('', '_blank')
      const html = '<html>' +
        '<head>' +
        '<title>图片预览</title>' +
        '<style>' +
        'body {margin:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;}' +
        'img {height:80vh;width:auto;margin:20px;}' +
        '</style>' +
        '</head>' +
        '<body>' +
        '<img src="' + link + '">' +
        '</body>' +
        '</html>'
      newWindow.document.write(html)
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.show{
  width: 633px;
  height: 804px;
}
</style>
