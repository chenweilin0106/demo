import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'm1',
        component: () => import('../views/m1'),
        redirect: 'm1/pointReward',
        children: [
          {
            path: 'pointReward',
            component: () => import('../views/m1/views/pointReward')
          },
          {
            path: 'rechargeRebate',
            component: () => import('../views/m1/views/rechargeRebate')
          },
          {
            path: 'presentGift',
            component: () => import('../views/m1/views/presentGift')
          },
          {
            path: 'skillSpar',
            component: () => import('../views/m1/views/skillSpar')
          }
        ]
      },
      {
        path: '/m2',
        component: () => import('../views/m2'),
        redirect: 'm2/fireWorks',
        children: [
          {
            path: 'fireWorks',
            component: () => import('../views/m2/views/fireWorks')
          },
          {
            path: 'luckKoi',
            component: () => import('../views/m2/views/luckKoi')
          },
          {
            path: 'peopleBargained',
            component: () => import('../views/m2/views/peopleBargained')
          }
        ]
      },
      {
        path: '/m3',
        component: () => import('../views/m3')
      },
      {
        path: '/m4',
        component: () => import('../views/m4'),
        redirect: 'm4/centuryBall',
        children: [
          {
            path: 'centuryBall',
            component: () => import('../views/m4/views/centuryBall')
          },
          {
            path: 'romanticDanceFloor',
            component: () => import('../views/m4/views/romanticDanceFloor')
          },
          {
            path: 'chaosTimeMachine',
            component: () => import('../views/m4/views/chaosTimeMachine')
          }
        ]
      },
      {
        path: '/m5',
        component: () => import('../views/m5')
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
