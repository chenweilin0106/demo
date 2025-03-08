// 图片路径函数混入
export default {
  methods: {
    /**
     * @description 图片路径
     * @param {String} iconName 图片名称
     * @returns {String} 图片路径
     */
    IconPath(iconName) {
      if (!iconName) return // 无图片名称
      if (/^https?:\/\//i.test(iconName)) return iconName // 网络图片
      return require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${iconName}`) // 本地图片
    }
  }
}
