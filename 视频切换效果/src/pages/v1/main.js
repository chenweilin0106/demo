import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Overlay, Toast } from 'vant'
import 'amfe-flexible'
import 'normalize.css'
import './styles/reset.scss'
import sensors from './utils/sensors.js'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import clipboard from 'clipboard'
Vue.prototype.$clipboard = clipboard
Vue.prototype.$sensors = sensors
Vue.config.productionTip = false
Vue.use(VideoPlayer)
Vue.use(Overlay)
Vue.use(Toast)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
