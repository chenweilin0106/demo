import Vue from 'vue'
import App from './App.vue'
import './reset.scss'
import './common.scss'
import drag from './drag'

Vue.directive('drag', drag)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
