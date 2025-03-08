import { getPageData } from '../api/index.js'
// 公共混入
export const PublicMixin = {
  data() {
    return {
      // 页面数据
      pageData: {}
    }
  },
  computed: {
    // 图片路径
    IconPath() {
      // 只需要传入图片名称即可
      return (iconName) => {
        return require(`@/assets/${iconName}`)
      }
    },
    // 内容过长时，显示省略号
    character_omission() {
      return (text, length) => {
        const Text = text.toString()
        return Text.length > length ? Text.substring(0, length) + '...' : Text
      }
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
