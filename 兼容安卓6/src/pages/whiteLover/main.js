import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant'
import giftItem from './components/giftItem.vue'
import 'amfe-flexible'
import 'normalize.css'
import '../whiteLover/styles/globe.scss'
import { reportFs } from '../whiteLover/utils/sensors'
Vue.prototype.sensorsData = reportFs
Vue.component('giftItem', giftItem)
Vue.config.productionTip = false
Vue.use(Toast)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
