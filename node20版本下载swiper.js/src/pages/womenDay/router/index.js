import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '../views/PointReward/index.vue'
import store from '@/pages/womenDay/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/pointReward',
    children: [
      {
        // 积分兑奖
        path: '/pointReward',
        component: PointReward
      },
      {
        // 充值有礼
        path: '/rechargeRebate',
        component: () => import('../views/RechargeRebate')
      },

      {
        // 钻石送礼
        path: '/presentGift',
        component: () => import('../views/PresentGift')
      },
      {
        // 疯狂砸蛋
        path: '/crazyEgg',
        component: () => import('../views/CrazyEgg')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('getAppData', window.location.search.substring(1))
  next()
})

router.afterEach((to, from) => {})

export default router
