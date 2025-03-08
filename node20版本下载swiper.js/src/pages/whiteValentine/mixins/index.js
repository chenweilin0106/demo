import { getPageData } from '../api/index.js'
import { ButtonTexts, ButtonStyle } from '../utils/pageData.js'
// import store from '../store/index.js'
// 公共混入
export const PublicMixin = {
  data() {
    return {
      // 页面数据
      pageData: {}
    }
  },
  created() {
    // 获取地址栏参数
    // store.commit('getAppData', window.location.search.substring(1))
  },
  methods: {
    /**
     * 打开弹框
     * @param name 弹框ref属性
     * @param params 弹框参数
     */
    openPrompt(name, params) {
      this.$refs[name].openPrompt(params)
    },
    // 按钮文字
    ButtonText(data, mark) {
      if (typeof data === 'string') return ButtonTexts[data][mark]
      return data[mark]
    },
    // 按钮样式
    ButtonStyle(data, mark) {
      if (typeof data === 'string') return ButtonStyle[data][mark]
      return data[mark]
    },
    // 图片路径
    IconPath(iconName) {
      if (!iconName) return
      // 只需要传入图片名称即可
      if (iconName.includes('http')) {
        return iconName
      } else {
        return require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${iconName}`)
      }
    },
    // 页面数据请求
    async getPageData(data) {
      const res = await getPageData(data)
      res.errno != 0 ? this.$toast(res.errmsg) : (this.pageData = res.data)
    }
  }
}
