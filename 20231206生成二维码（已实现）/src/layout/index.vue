<template>
  <div class="dynamic-qrCode-container">
    <div class="dynamic-operate">
      <input class="common-input input-qrCode" v-model="text" />
      <button type="primary" class="common-button" @click="handleQrCode(1)">
        生成普通二维码
      </button>
      <button type="primary" class="common-button" @click="handleQrCode(2)">
        生成带logo二维码
      </button>
      <button type="primary" class="common-button" @click="handleQrCode(3)">
        生成随机颜色二维码
      </button>
      <button type="primary" class="common-button" @click="handleQrCode(4)">
        下载二维码
      </button>
    </div>
    <vue-qr
      ref="qrCode"
      :text="text"
      :logoSrc="logoSrc"
      :logoScale="0.5"
      :logoMargin="0"
      :color-dark="'#000'"
      :callback="qrCodeCallback"
      class="qr-class"
      :backgroundColor="'skyBlue'"
      :backgroundDimming="'#000'"
      :bindElement="false"
    ></vue-qr>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import logo from '@/assets/logo.png'
export default {
  name: 'layout-index',
  components: {
    VueQr
  },
  props: [],
  data() {
    return {
      text: 'https://develop.dandan818.com/vue/weekly/page/index.html?uid=20011&access_token=123#/',
      logoSrc: '',
      randomColor: 'black',
      qrCodeUrl: '' // 存放生成的二维码url
    }
  },
  methods: {
    getColor() {
      let str = '#'
      const arr = [
        '1',
        '2',
        '3',
        '4',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f'
      ]
      for (let i = 0; i < 6; i++) {
        const num = parseInt(Math.random() * 16)
        str += arr[num]
      }
      return str
    },
    qrCodeCallback(url) {
      console.log(url)
      this.qrCodeUrl = url
    },
    handleQrCode(type) {
      switch (type) {
        case 1:
          this.randomColor = 'black'
          this.logoSrc = ''
          break
        case 2:
          this.logoSrc = logo
          break
        case 3:
          this.randomColor = this.getColor()
          break
        case 4:
          console.log(this.qrCodeUrl)
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.qr-class {
  width: 200px;
  height: 200px;
}
.dynamic-qrCode-container {
  color: #fff;
}
input {
  width: 100%;
  display: block;
  font-size: 40px;
  border: 1px solid gray;
  background-color: transparent;
}
button {
  display: block;
  margin: 30px auto;
  font-size: 30px;
  background-color: transparent;
  border: 5px solid gray;
  border-radius: 30px;
  width: 300px;
  height: 100px;
}
</style>
