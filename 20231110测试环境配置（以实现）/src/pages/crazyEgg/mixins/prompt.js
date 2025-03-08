// 解决 弹框 滑动穿透问题
const promptFixed = {
  data() {
    return {
      scrollTop: ''
    }
  },
  methods: {
    // 打开弹层 要做的事
    afterOpen() {
      console.log('滑动穿透---打开--')
      this.scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add('modalOpen')
      document.body.style.top = `-${this.scrollTop}px`
    },
    // 弹层关闭之前 要做的事
    beforeClose() {
      console.log('滑动穿透---关闭--')
      document.body.classList.remove('modalOpen')
      document.scrollingElement.scrollTop = this.scrollTop
    }
  }
}

export {
  promptFixed
}
