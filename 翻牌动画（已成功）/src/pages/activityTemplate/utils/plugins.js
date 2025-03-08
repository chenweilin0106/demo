import Vue from 'vue'
import { Toast, Dialog, Lazyload } from 'vant'
// 配合postcss插件使用
import 'amfe-flexible'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
import thinking from './thinkingData'
import { gsap } from 'gsap'
Vue.prototype.$thinking = thinking
Vue.prototype.$gsap = gsap
// 控制台插件
// import Vconsole from 'vconsole'
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
// 懒加载
Vue.use(Lazyload, {
  lazyComponent: true
})
