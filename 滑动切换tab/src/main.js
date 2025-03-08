import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import smoothscroll from 'smoothscroll-polyfill' // 滚动插件
import { Toast, Popup, Swipe, SwipeItem, Lazyload } from 'vant'
import 'normalize.css' // 浏览器样式统一
import thinking from '@/utils/thinkingData' // 数数埋点
import './styles/reset.scss' // 重置样式
import './styles/globe.scss' // 全局样式
import './styles/common.scss' // 公共类名
import iconPathMixin from '@/mixins/iconPathMixin.js' // 图标路径Mixin
import BaseContainer from '@/components/BaseContainer.vue' // 外部容器
smoothscroll.polyfill()
if (process.env.VUE_APP_ENV === 'testPro') {
  import('eruda').then((res) => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    res.default.init({
      container: el,
      tool: ['console', 'elements']
    })
  })
}
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false // 生产模式提示
Toast.setDefaultOptions({
  closeOnClick: true // toast提示
})
Vue.use(Toast)
Vue.use(Popup)
Vue.use(Swipe)
Vue.use(SwipeItem)
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.mixin(iconPathMixin)
Vue.component('BaseContainer', BaseContainer)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
