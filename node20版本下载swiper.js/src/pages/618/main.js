import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Popup, Swipe, SwipeItem, NoticeBar } from 'vant' // vant组件导入
import 'normalize.css' // 浏览器样式统一
import thinking from './utils/thinkingData.js' // 数数埋点
// 重置样式
import './styles/reset.scss'
import './styles/globe.scss'
import './styles/common.scss'
import OutBox from './components/outBox.vue' // 边框组件
import PopupBox from './components/popupBox.vue' // 弹窗边框组件
import PublicImg from './components/publicImg.vue'
import PublicButton from './components/publicButton.vue'
import PublicCard from './components/publicCard.vue'
import iconPathMixin from './mixins/iconPathMixin'
// 移动端调试工具
if (process.env.VUE_APP_ENV === 'testPro') {
  import('vconsole').then((res) => {
    const VConsole = res.default
    Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
  })
}
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false // 生产模式提示
Toast.setDefaultOptions({
  closeOnClick: true // toast提示
})
Vue.use(Toast).use(Popup).use(Swipe).use(SwipeItem).use(NoticeBar)
Vue.mixin(iconPathMixin)
Vue.component('OutBox', OutBox)
Vue.component('PopupBox', PopupBox)
Vue.component('PublicImg', PublicImg)
Vue.component('PublicButton', PublicButton)
Vue.component('PublicCard', PublicCard)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
