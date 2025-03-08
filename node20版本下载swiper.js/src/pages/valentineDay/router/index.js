import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import PointReward from '../views/ValentineGift/views/PointReward/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/valentineGift/pointReward',
    children: [
      // 浪漫回顾
      {
        path: '/valentineGift',
        redirect: '/valentineGift/pointReward',
        component: () => import('../views/ValentineGift'),
        children: [
          {
            // 积分兑奖
            path: '/valentineGift/pointReward',
            component: PointReward
          },
          {
            // 充值有礼
            path: '/valentineGift/rechargeRebate',
            component: () =>
              import('../views/ValentineGift/views/RechargeRebate')
          },
          {
            // 礼尚往来
            path: '/valentineGift/consumeGift',
            component: () => import('../views/ValentineGift/views/ConsumeGift')
          }
        ]
      },
      // 告白情歌
      {
        path: '/loveSong',
        component: () => import('../views/LoveSong')
      },
      // // 甜蜜宝藏
      {
        path: '/sweetTreasure',
        component: () => import('../views/sweetTreasure')
      },
      // 桃花签运
      {
        path: '/luckSign',
        component: () => import('../views/luckSign/index.vue')
      },
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

router.afterEach((to, from) => {
  if (from.path == '/') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})

export default router
