import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import sensors from '../utils/sensors'
import pointReward from '../views/pointReward/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/pointReward',
    children: [
      {
        // 奖励兑换
        path: '/pointReward',
        component: pointReward
      },
      {
        // 充值返利
        path: '/rechargeRebate',
        component: () => import('../views/rechargeRebate'),
        redirect: '/rechargeRebate/returnCourteous',
        children: [
          // 累计充值返利
          {
            path: 'returnCourteous',
            component: () =>
              import('../views/rechargeRebate/views/returnCourteous')
          },
          // 连续充值返利
          {
            path: 'getCourteous',
            component: () =>
              import('../views/rechargeRebate/views/getCourteous')
          }
        ]
      },
      {
        // 钻石送礼
        path: '/presentGift',
        component: () => import('../views/presentGift'),
        redirect: '/presentGift/giveRank',
        children: [
          // 赠送榜
          {
            path: 'giveRank',
            component: () => import('../views/presentGift/views/giveRank')
          },
          // 获赠榜
          {
            path: 'awardRank',
            component: () => import('../views/presentGift/views/awardRank')
          }
        ]
      },
      {
        // 技能礼包
        path: '/wulin',
        component: () => import('../views/wulin')
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
  if (from.fullPath === '/' && to.fullPath === '/pointReward') {
    Vue.nextTick(() => {
      sensors.quick('autoTrackSinglePage', {
        activity_name: '技能礼包',
        activity_date: '20230421'
      })
    })
  }
})
export default router
