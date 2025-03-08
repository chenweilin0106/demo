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
        // 晶石回馈
        path: '/sparBack',
        component: () => import('../views/SparBack')
      },
      {
        // 缤彩元宵
        path: '/sweetDumplings',
        component: () => import('../views/SweetDumplings')
      }
    ]
  }
]

export default new VueRouter({
  routes
})
