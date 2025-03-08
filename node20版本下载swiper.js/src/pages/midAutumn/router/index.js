import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '@/pages/midAutumn/views/pointReward'

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
        // 月饼
        path: '/moonCake',
        component: () => import('../views/moonCake')
      },
      {
        // 星河漫步
        path: '/draw',
        component: () => import('../views/draw')
      },
      {
        // 登月冲榜
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
