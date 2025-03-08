import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole'
import router from './router'
import store from './store'
import './styles/reset.scss'
import './styles/globe.scss'
import './styles/common.scss'
import OutBox from '@/pages/crazyEgg/components/outBox.vue'
import PublicImg from '@/pages/crazyEgg/components/publicImg.vue'
import { PublicMixin } from './mixins/index.js'
import { Toast, Popup } from 'vant'
import 'normalize.css'
import thinking from './utils/thinkingData'
if (process.env.VUE_APP_ENV === 'testPro') Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false
Toast.setDefaultOptions({ closeOnClick: true })
Vue.use(Toast).use(Popup)
Vue.mixin(PublicMixin)
Vue.component('OutBox', OutBox)
Vue.component('PublicImg', PublicImg)
new Vue({ store, router, render: (h) => h(App) }).$mount('#app')
