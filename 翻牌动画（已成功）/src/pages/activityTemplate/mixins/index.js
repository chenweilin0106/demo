import { ButtonTexts, ButtonStyle } from '../utils/pageData.js'
import { getPageData } from '../api/index.js'
// 公共混入
export const PublicMixin = {
  data() {
    return {
      // 页面数据
      pageData: {}
    }
  },
  methods: {
    // 页面数据请求
    async getPageData(data) {
      const res = await getPageData(data)
      res.errno != 0 ? this.$toast(res.errmsg) : (this.pageData = res.data)
    }
  },
  computed: {
    // 按钮文字
    ButtonText() {
      return (data, mark) => {
        if (typeof data === 'string') return ButtonTexts[data][mark]
        return data[mark]
      }
    },
    // 按钮样式
    ButtonStyle() {
      return (data, mark) => {
        if (typeof data === 'string') return ButtonStyle[data][mark]
        return data[mark]
      }
    },
    // 图片路径
    IconPath() {
      return (iconName) => {
        return require(`@/pages/activityTemplate/assets/${iconName}`)
      }
    }
  }
}
