import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Popup } from 'vant'
import thinking from './utils/thinkingData'
import VConsole from 'vconsole'
import 'normalize.css'
import './styles/reset.scss'
import './styles/globe.scss'
import './styles/common.scss'
import PopupBox from '@/pages/sparParty/components/popupBox.vue'
import PublicImg from '@/pages/sparParty/components/publicImg.vue'
import OutBox from './components/outBox.vue'
import { PublicMixin } from './mixins/index.js'
if (process.env.VUE_APP_ENV === 'testPro') Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false
Toast.setDefaultOptions({ closeOnClick: true })
Vue.use(Toast).use(Popup)
Vue.component('OutBox', OutBox)
Vue.component('PublicImg', PublicImg)
Vue.component('PopupBox', PopupBox)
Vue.mixin(PublicMixin)
new Vue({ store, router, render: (h) => h(App) }).$mount('#app')
