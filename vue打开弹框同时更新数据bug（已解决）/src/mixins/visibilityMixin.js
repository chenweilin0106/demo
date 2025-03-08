/**
 * visibilityMixin.js
 * 页面呼出隐藏监听混入
 * 注册：
 * import visibilityMixin from '@/mixins/visibilityMixin'
 * mixins: [visibilityMixin]
 * 使用：
 * this.addVisibilityListen(this.createVisibilityFn({ showFn: this.showFn }))
 */

export default {
  data() {
    return {
      visibilityFn: null // 用于存储页面可见性变化的回调函数
    }
  },
  methods: {
    /**
     * 添加页面可见性变化监听器
     * @param {Function} fn - 页面可见性变化的回调函数
     */
    addVisibilityListen(fn) {
      if (!fn) return
      this.visibilityFn = fn
      document.addEventListener('visibilitychange', this.visibilityFn)
    },
    /**
     * 移除页面可见性变化监听器
     */
    removeVisibilityListen() {
      if (!this.visibilityFn) return
      document.removeEventListener('visibilitychange', this.visibilityFn)
    },
    /**
     * 创建页面可见性变化的回调函数
     * @param {Object} options - 包含显示和隐藏回调函数的对象
     * @param {Function} options.showFn - 页面显示时的回调函数
     * @param {Function} options.hiddenFn - 页面隐藏时的回调函数
     * @return {Function} - 页面可见性变化的回调函数
     */
    createVisibilityFn({ showFn, hiddenFn }) {
      return () => {
        if (document.hidden) {
          if (hiddenFn) hiddenFn()
        } else {
          if (showFn) showFn()
          this.removeVisibilityListen()
        }
      }
    }
  },
  beforeDestroy() {
    // 组件销毁前移除页面可见性变化监听器
    this.removeVisibilityListen()
  }
}
