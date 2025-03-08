import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/styles/index.scss'
import PublicImg from '@/components/publicImg.vue'
Vue.config.productionTip = false
Vue.component('PublicImg', PublicImg)
new Vue({ render: (h) => h(App) }).$mount('#app')
