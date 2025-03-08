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
        path: '/rechargeRebate',
        component: () => import('../views/rechargeRebate')
      },
      {
        // 钻石送礼
        path: '/presentGift',
        component: () => import('../views/presentGift')
      },
      {
        // 童趣六一
        path: '/childInterest',
        component: () => import('../views/childInterest')
      },
      // 技能狂欢
      {
        path: '/wuLin',
        component: () => import('../views/wuLin')
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
