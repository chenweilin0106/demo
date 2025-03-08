import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import OpenVip from '../views/OpenVip'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/openVip',
    children: [
      {
        // 开卡有礼
        path: '/openVip',
        components: {
          openVip: OpenVip
        }
      },
      {
        // 尊享权益
        path: '/enjoyBenefits',
        component: () => import('../views/EnjoyBenefits')
      },
      {
        // 限定兑换
        path: '/limitExchange',
        component: () => import('../views/LimitExchange')
      }
    ]
  }
]

export default new VueRouter({
  routes
})
