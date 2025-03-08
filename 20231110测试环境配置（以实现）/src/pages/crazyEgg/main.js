import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式
import './styles/reset.scss'
import './styles/globe.scss'
import CrazyEggBox from './components/CrazyEggBox.vue'
// 全局混入
import { PublicMixin } from './mixins/index.js'
import { Toast, Dialog } from 'vant'
// 配合postcss插件使用
// import 'amfe-flexible'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
import thinking from './utils/thinkingData'
// 移动端调试工具
if (process.env.VUE_APP_THINKING_APP_ID === 'debug-appid') {
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
// 弹框
Vue.use(Dialog)

Vue.mixin(PublicMixin)
Vue.component('CrazyEggBox', CrazyEggBox)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
