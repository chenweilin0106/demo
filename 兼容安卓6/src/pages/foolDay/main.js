import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Overlay, Popup } from 'vant'
import 'amfe-flexible'
import 'normalize.css'
import '../foolDay/styles/globe.scss'
import sensors from '@/pages/foolDay/utils/sensors'
Vue.prototype.$sensors = sensors
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Overlay)
Vue.use(Popup)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
