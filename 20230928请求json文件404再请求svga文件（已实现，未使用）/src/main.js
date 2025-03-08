import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 第三方库引入
import './utils/plugins.js'
// 重置样式
// import './styles/reset.scss'
// import './styles/globe.scss'
// 全局混入
// import { PublicMixin } from './mixins/index.js'
// Vue.mixin(PublicMixin)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
