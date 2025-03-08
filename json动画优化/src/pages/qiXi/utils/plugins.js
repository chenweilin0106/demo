import Vue from 'vue'
import { Toast, Dialog, Overlay, RadioGroup, Radio, Lazyload } from 'vant'
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
// 遮盖层
Vue.use(Overlay)
// 单选框
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Lazyload, {
  lazyComponent: true
})
