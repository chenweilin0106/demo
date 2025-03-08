import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '../views/pointReward/index.vue'

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
        path: '/depositRebate',
        component: () => import('../views/depositRebate')
      },
      {
        // 钻石送礼
        path: '/diamondGift',
        component: () => import('../views/diamondGift')
      },
      {
        // 幸运翻牌
        path: '/luckyFlop',
        component: () => import('../views/luckyFlop')
      }
    ]
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
