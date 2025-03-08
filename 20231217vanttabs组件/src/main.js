import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Popup, Tab, Tabs } from 'vant'
// 浏览器样式统一
import 'normalize.css'
// 移动端调试工具
// import Vconsole from 'vconsole'
// 数数埋点
import thinking from './utils/thinkingData'
// 重置样式
import './styles/reset.scss'
// 全局样式
import './styles/globe.scss'
// 边框组件
import OutBox from './components/out-box.vue'
// 全局混入
import { PublicMixin } from './mixins/index.js'
Vue.component('OutBox', OutBox)
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
Vue.use(Popup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.mixin(PublicMixin)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
