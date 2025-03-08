import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '@/pages/520/views/pointReward'

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

      // 独家记忆
      {
        path: '/generatePoster',
        component: () => import('../views/generatePoster')
      },
      // 甜蜜宝藏
      {
        path: '/sweetTreasure',
        component: () => import('../views/sweetTreasure')
      },
      // 桃花签运
      // {
      //   path: '/luckSign',
      //   component: () => import('../views/luckSign/index.vue')
      // },
      // 心动较量
      {
        path: '/loveRank',
        component: () => import('../views/LoveRank')
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
