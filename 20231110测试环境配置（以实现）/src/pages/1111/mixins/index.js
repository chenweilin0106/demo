import { ButtonTexts, ButtonStyle } from '../utils/pageData.js'
import store from '../store/index.js'
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
    /* 数值不溢出 */
    numLimit() {
      return (num, max) => {
        // if (!num || !max) return num || max
        return num >= max ? max : num
      }
    },
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
      // 只需要传入图片名称即可
      return (iconName) => {
        return require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${iconName}`)
        // return require(`@/pages/1111/assets/${iconName}`)
      }
    }
  },
  created() {
    // 获取地址栏参数
    store.commit('user/getAppData', window.location.search.substring(1))
  }
}
