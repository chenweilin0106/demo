import Vue from 'vue'
import { Toast, Dialog, CountDown, Popup, NoticeBar } from 'vant'
// 配合postcss插件使用
// import 'amfe-flexible'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
import thinking from './thinkingData'
// 移动端调试工具
if (process.env.VUE_APP_ENV === 'testPro') {
  import('vconsole').then((res) => {
    const VConsole = res.default
    Vue.use(new VConsole())
  })
}
Vue.prototype.$thinking = thinking
// 生产模式提示
Vue.config.productionTip = false
// toast提示
Toast.setDefaultOptions({
  closeOnClick: true
})
Vue.use(Toast)
Vue.use(NoticeBar)
Vue.use(CountDown)
Vue.use(Popup)
// 弹框
Vue.use(Dialog)
