import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '../views/PointReward'
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
        // 充值返利
        path: '/rechargeRebate',
        component: () => import('../views/RechargeRebate')
      },

      {
        // 消费有利
        path: '/spendingGift',
        component: () => import('../views/SpendingGift')
      },
      {
        // 以纸传情
        path: '/loveName',
        component: () => import('../views/LoveName')
      },
      {
        // 每日运势
        path: '/dailyFortune',
        component: () => import('../views/DailyFortune')
      },
      {
        // 七夕榜单
        path: '/qiXiRank',
        component: () => import('../views/QiXiRank')
      }
    ]
  }
]

export default new VueRouter({
  routes
})
