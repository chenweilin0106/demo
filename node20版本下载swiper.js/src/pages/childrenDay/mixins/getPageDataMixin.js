import { getPageData } from '../api/index.js'
// 公共混入
export default {
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
  }
}
