import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '@/pages/nationalDay/views/pointReward'

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
        component: () => import('../views/rechargeRebate')
      },
      {
        // 钻石送礼
        path: '/presentGift',
        component: () => import('../views/presentGift')
      },
      {
        // 游历江湖
        path: '/draw',
        component: () => import('../views/draw')
      },
      {
        // 山海秘宝
        path: '/treasure',
        component: () => import('../views/treasure')
      },
      {
        // 榜上有名
        path: '/rank',
        component: () => import('../views/rank')
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
