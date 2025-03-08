import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式
import './styles/reset.scss'
import './styles/globe.scss'
import './styles/common.scss'
// 边框组件
import OutBox from './components/out-box.vue'
// 全局混入
import { PublicMixin } from './mixins/index.js'
import { Toast, Popup } from 'vant'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
import thinking from './utils/thinkingData'
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
Vue.use(Popup)

Vue.mixin(PublicMixin)
Vue.component('OutBox', OutBox)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
