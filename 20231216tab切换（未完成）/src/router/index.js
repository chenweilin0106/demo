import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import NewBegin from '../views/NewBegin'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/newBegin',
    children: [
      {
        // 模块1
        path: '/newBegin',
        component: NewBegin
      },
      {
        // 模块2
        path: '/rechargeRebate',
        component: () => import('../views/RechargeRebate')
      },
      {
        // 模块3
        path: '/giftBack',
        component: () => import('../views/GiftBack')
      },
      {
        // 模块4
        path: '/giveNumber',
        component: () => import('../views/GiveNumber')
      },
      {
        // 模块5
        path: '/openingRank',
        component: () => import('../views/OpeningRank')
      }
    ]
  }
]

export default new VueRouter({
  routes
})
