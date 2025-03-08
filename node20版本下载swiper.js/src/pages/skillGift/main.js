import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole' // 移动端调试工具
import { Toast, Popup } from 'vant'
// import 'amfe-flexible' // 配合postcss插件使用
import 'normalize.css' // 浏览器样式统一
import thinking from './utils/thinkingData' // 数数埋点
import './styles/reset.scss' // 重置样式
import './styles/globe.scss' // 全局样式
import './styles/common.scss' // 公共类名
import PublicImg from './components/publicImg.vue'
import SkillGiftBox from './components/skill-gift-box.vue' // 边框组件
import { PublicMixin } from './mixins/index.js' // 全局混入
if (process.env.VUE_APP_ENV === 'testPro') Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false // 生产模式提示
Toast.setDefaultOptions({ closeOnClick: true }) // toast提示
Vue.use(Toast).use(Popup)
Vue.component('ThemeBox', SkillGiftBox)
Vue.component('PublicImg', PublicImg)
Vue.mixin(PublicMixin)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
