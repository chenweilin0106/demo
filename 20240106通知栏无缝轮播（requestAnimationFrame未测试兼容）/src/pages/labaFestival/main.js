import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 第三方库引入
import './utils/plugins.js'
// 重置样式
import './styles/reset.scss'
// 全局样式
import './styles/globe.scss'
// 边框组件
import ThemeBox from './components/ThemeBox'
// 全局混入
import { PublicMixin } from './mixins/index.js'
Vue.component('ThemeBox', ThemeBox)
Vue.mixin(PublicMixin)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
