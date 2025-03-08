import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
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
        component: () => import('../views/rewardRedemption')
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
          // 连续充值有礼
          {
            path: 'getCourteous',
            component: () => import('../views/depositRebate/views/getCourteous')
          }
        ]
      },
      {
        // 双人成行
        path: '/travelsTwo',
        component: () => import('../views/travelsTwo')
      },
      {
        // 全民爬塔
        path: '/climbTower',
        component: () => import('../views/climbTower')
      },
      {
        // 神奇扭蛋
        path: '/fantasticGacha',
        component: () => import('../views/fantasticGacha')
      },
      {
        // 技能礼包
        path: '/skillPack',
        component: () => import('../views/skillPack')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
