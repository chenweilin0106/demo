import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '../views/PointReward/index.vue'

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
        // 亲密挑战
        path: '/intimateChallenge',
        component: () => import('../views/IntimateChallenge')
      },
      {
        // 爱的祈愿
        path: '/lovePray',
        component: () => import('../views/LovePray')
      },
      {
        // 恋爱翻牌
        path: '/loveFlop',
        component: () => import('../views/LoveFlop')
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
