import { getPageData } from '../api/index.js'
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
    // this.$store.commit('getAppData', window.location.search.substring(1))
  },
  methods: {
    // 图片路径
    IconPath(iconName) {
      const onlinePatternEnum = /^https?:\/\//i
      let isOnline = onlinePatternEnum.test(iconName)
      if (isOnline) {
        return iconName
      } else {
        // env提供目录名
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
