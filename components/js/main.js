import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import smoothscroll from 'smoothscroll-polyfill'
import { Toast, Popup, Popover, Lazyload } from 'vant'
import { toShowText } from '@/utils/tool.js'
import thinking from '@/utils/thinkingData'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/globe.scss'
import OutBox from '@/components/outBox.vue'
import PopupBox from '@/components/popupBox.vue'
import PublicImg from '@/components/publicImg.vue'
import iconPathMixin from '@/mixins/iconPathMixin'
smoothscroll.polyfill()
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false
Vue.prototype.$toShowText = toShowText
Toast.setDefaultOptions({ closeOnClick: true })
Vue.use(Toast).use(Popup).use(Popover).use(Lazyload, { dispatchEvent: true, attempt: 1, preLoad: 1, lazyComponent: true, observer: true, observerOptions: { rootMargin: '0px', threshold: 0.1 } })
Vue.mixin(iconPathMixin)
Vue.component('OutBox', OutBox)
Vue.component('PopupBox', PopupBox)
Vue.component('PublicImg', PublicImg)
new Vue({ store, router, render: (h) => h(App) }).$mount('#app')
