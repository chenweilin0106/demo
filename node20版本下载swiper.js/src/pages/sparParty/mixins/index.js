import { ButtonTexts, ButtonStyle } from '../utils/pageData.js'
// 公共混入
export const PublicMixin = {
  methods: {
    // 内容过长时，显示省略号
    character_omission(text, length) {
      if (!text && text != 0) return ''
      const Text = text.toString()
      return Text.length > length ? Text.substring(0, length) + '...' : Text
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
      // 只需要传入图片名称即可
      if (iconName.includes('http')) {
        return iconName
      } else {
        return require(`@/pages/${process.env.VUE_APP_ICON_PATH}/assets/${iconName}`)
      }
    }
  }
}
