import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import rewardRedemption from '../views/rewardRedemption'
import sensors from '../utils/sensors'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/rewardRedemption',
    children: [
      {
        // 桃花兑奖
        path: '/rewardRedemption',
        component: rewardRedemption
      },
      {
        // 充值返利
        path: '/depositRebate',
        component: () => import('../views/depositRebate'),
        redirect: '/depositRebate/returnCourteous',
        children: [
          // 累计充值返利
          {
            path: 'returnCourteous',
            component: () =>
              import('../views/depositRebate/views/returnCourteous')
          },
          // 连续充值返利
          {
            path: 'getCourteous',
            component: () => import('../views/depositRebate/views/getCourteous')
          }
        ]
      },
      {
        // 礼尚往来
        path: '/giftgoBack',
        component: () => import('../views/giftgoBack'),
      },
      {
        // 春日游园
        path: '/springGargen',
        component: () => import('../views/springGargen')
      },
      {
        // 称号返场
        path: '/titleBack',
        component: () => import('../views/titleBack')
      },
      {
        // 榜上有名
        path: '/nameInList',
        component: () => import('../views/nameInList')
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

router.afterEach((to, from) => {
  if (from.fullPath === '/' && to.fullPath === '/rewardRedemption') {
    Vue.nextTick(() => {
      sensors.quick('autoTrackSinglePage', { 
        activity_name: '踏青游园会',
        activity_date: '20230412'
      })
    })
  }
})
export default router
