import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout
  }
]

export default new VueRouter({
  routes
})
