import { ButtonTexts, ButtonStyle } from '../utils/pageData.js'
export default {
  methods: {
    // 按钮文字
    ButtonText(data, mark) {
      if (typeof data === 'string') return ButtonTexts[data][mark]
      return data[mark]
    },
    // 按钮样式
    ButtonStyle(data, mark) {
      if (typeof data === 'string') return ButtonStyle[data][mark]
      return data[mark]
    }
  }
}
