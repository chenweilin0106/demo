import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole'
import { Toast, Popup, CountDown } from 'vant'
import thinking from '@/utils/thinkingData'
import smoothscroll from 'smoothscroll-polyfill' // 滚动插件
import 'normalize.css'
import '@/styles/index.scss'
import iconPathMixin from '@/mixins/iconPathMixin'
import PublicImg from '@/components/publicImg.vue'
import PopupBox from '@/components/popupBox.vue'
import OutBox from '@/components/outBox.vue'
Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
smoothscroll.polyfill()
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false
Toast.setDefaultOptions({ closeOnClick: true })
Vue.use(Toast).use(Popup).use(CountDown)
Vue.component('PublicImg', PublicImg)
Vue.component('PopupBox', PopupBox)
Vue.component('OutBox', OutBox)
Vue.mixin(iconPathMixin)
new Vue({ render: (h) => h(App) }).$mount('#app')
