import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import rewardRedemption from '../views/rewardRedemption/index.vue'
import sensors from 'sa-sdk-javascript'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/rewardRedemption',
    children: [
      {
        // 奖励兑换
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
        // 钻石送礼
        path: '/diamondGifts',
        component: () => import('../views/diamondGifts'),
        redirect: '/diamondGifts/giveRank',
        children: [
          // 赠送榜
          {
            path: 'giveRank',
            component: () => import('../views/diamondGifts/views/giveRank')
          },
          // 获赠榜
          {
            path: 'awardRank',
            component: () => import('../views/diamondGifts/views/awardRank')
          }
        ]
      },
      {
        // 幸运闯关
        path: '/luckyEnter',
        component: () => import('../views/luckyEnter')
      },
      {
        // 全民愚乐
        path: '/allFool',
        component: () => import('../views/allFool')
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
      sensors.quick('autoTrackSinglePage', { module: '气球兑换' })
    })
  }
})
export default router
