import Vue from 'vue'
import App from './App.vue'
import { Toast, Overlay, Dialog, Popover } from 'vant'
// 配合postcss插件使用
import 'amfe-flexible'
import VConsole from 'vconsole'
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Overlay)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(new VConsole())
new Vue({
  render: h => h(App)
}).$mount('#app')
