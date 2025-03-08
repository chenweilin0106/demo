import Vue from 'vue'
import { Toast, Dialog, Lazyload, Popup, Overlay, CountDown } from 'vant'
// 配合postcss插件使用
import 'amfe-flexible'
// 浏览器样式统一
import 'normalize.css'
// 移动端调试工具
// import Vconsole from 'vconsole'
// 数数埋点
import thinking from './thinkingData'
// Vue.use(new Vconsole())
Vue.prototype.$thinking = thinking
// 生产模式提示
Vue.config.productionTip = false
// toast提示
Toast.setDefaultOptions({
  closeOnClick: true
})
Vue.use(Toast)
// 弹框
Vue.use(Dialog)
Vue.use(Popup)
Vue.use(Overlay)
Vue.use(CountDown)
Vue.use(Lazyload, {
  lazyComponent: true
})
