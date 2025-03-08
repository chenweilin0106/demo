import Vue from 'vue'
import { Toast, Dialog } from 'vant'
// 配合postcss插件使用
import 'amfe-flexible'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
// import Vconsole from 'vconsole'
import thinking from './thinkingData'
Vue.prototype.$thinking = thinking
// 控制台插件
// const vconsole = new Vconsole()
// Vue.use(vconsole)
// 生产模式提示
Vue.config.productionTip = false
// toast提示
Toast.setDefaultOptions({
  closeOnClick: true
})
Vue.use(Toast)
// 弹框
Vue.use(Dialog)
