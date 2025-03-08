import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Overlay } from 'vant'
import 'amfe-flexible'
import 'normalize.css'
import './styles/reset.scss'
import '../gardenParty/styles/globe.scss'
import sensors from './utils/sensors'
Vue.prototype.$sensors = sensors
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Overlay)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
