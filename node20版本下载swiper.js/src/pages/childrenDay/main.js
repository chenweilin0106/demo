import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式
import './styles/reset.scss'
import './styles/globe.scss'
import './styles/common.scss'
import iconPathMixin from '@/pages/childrenDay/mixins/iconPathMixin' // 图片路径函数混入
import OutBox from '@/pages/childrenDay/components/outBox.vue'
import PopupBox from '@/pages/childrenDay/components/popupBox.vue'
import PublicImg from '@/pages/childrenDay/components/publicImg.vue'
import { Toast, Popup } from 'vant'
// 浏览器样式统一
import 'normalize.css'
// 数数埋点
import thinking from './utils/thinkingData'
if (process.env.VUE_APP_ENV === 'testPro') {
  import('vconsole').then((res) => {
    const VConsole = res.default
    Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
  })
}
Vue.prototype.$thinking = thinking
// 生产模式提示
Vue.config.productionTip = false
// toast提示
Toast.setDefaultOptions({
  closeOnClick: true
})
Vue.use(Toast).use(Popup)
Vue.component('OutBox', OutBox)
Vue.component('PopupBox', PopupBox)
Vue.component('PublicImg', PublicImg)
Vue.mixin(iconPathMixin)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
