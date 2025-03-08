import Vue from 'vue'
import VueRouter from 'vue-router'
import lueduoIndex from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: lueduoIndex
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})
export default router
