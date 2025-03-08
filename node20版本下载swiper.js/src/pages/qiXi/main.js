import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { Toast, Popup, Swipe, SwipeItem, NoticeBar, Popover, Lazyload, Field } from 'vant'
import 'normalize.css'
import thinking from '@/utils/thinkingData'
import VConsole from 'vconsole'
import '@/styles/reset.scss'
import '@/styles/common.scss'
import './styles/globe.scss'
import OutBox from './components/outBox.vue'
import PopupBox from './components/popupBox.vue'
import PublicImg from '@/components/publicImg.vue'
import PublicButton from './components/publicButton.vue'
import PublicCard from './components/publicCard.vue'
import iconPathMixin from '@/mixins/iconPathMixin'
if (process.env.VUE_APP_ENV === 'testPro') Vue.use(new VConsole({ defaultPlugins: ['system', 'network'] }))
Vue.prototype.$thinking = thinking
Vue.config.productionTip = false
Toast.setDefaultOptions({ closeOnClick: true })
Vue.use(Toast).use(Popup).use(Swipe).use(SwipeItem).use(NoticeBar).use(Lazyload, { lazyComponent: true }).use(Popover).use(Field)
Vue.mixin(iconPathMixin)
Vue.component('OutBox', OutBox)
Vue.component('PopupBox', PopupBox)
Vue.component('PublicImg', PublicImg)
Vue.component('PublicButton', PublicButton)
Vue.component('PublicCard', PublicCard)
new Vue({ store, router, render: (h) => h(App) }).$mount('#app')
