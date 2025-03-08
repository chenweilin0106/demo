import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '@/pages/goldenAutumn/views/pointReward'

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
        // 狂欢商人
        path: '/carnivalTrader',
        component: () => import('../views/carnivalTrader')
      },
      {
        // 金秋许愿
        path: '/draw',
        component: () => import('../views/draw')
      },
      {
        // 技能礼包
        path: '/WuLin',
        component: () => import('../views/WuLin')
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
