import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterA from '../views/RouterA.vue'
import RouterB from '../views/RouterB.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/RouterA',
    component: RouterA
  },
  {
    path: '/RouterB',
    component: RouterB
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {})

export default router
