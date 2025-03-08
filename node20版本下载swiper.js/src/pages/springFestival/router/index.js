import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import store from '@/pages/springFestival/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      // 模块一
      {
        path: '/newYearGift',
        component: () => import('../views/NewYearGift'),
        redirect: '/newYearGift/pointReward',
        children: [
          {
            // 积分兑奖
            path: '/newYearGift/pointReward',
            component: () => import('../views/NewYearGift/views/PointReward')
          },
          {
            // 充值有礼
            path: '/newYearGift/rechargeRebate',
            component: () => import('../views/NewYearGift/views/RechargeRebate')
          },
          {
            // 礼尚往来
            path: '/newYearGift/consumeGift',
            component: () => import('../views/NewYearGift/views/ConsumeGift')
          }
        ]
      },
      // 模块二
      {
        path: '/collectHappiness',
        component: () => import('../views/CollectHappiness')
      },
      // 模块三
      {
        path: '/newYearCall',
        component: () => import('../views/NewYearCall')
      },
      // 模块四
      {
        path: '/titleBack',
        component: () => import('../views/TitleBack')
      },
      // 模块五
      {
        path: '/giftShopWindow',
        component: () => import('../views/GiftShopWindow')
      },
      // 模块六
      {
        path: '/newYearRank',
        component: () => import('../views/NewYearRank')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)to path '/'
  // if (from.path == '/') {
  if (to.path != from.path && from.path == '/') {
    // console.log(from, to)
    // console.log(222)
    window.scrollTo({
      top: 0
    })
  }
  next()
})

router.afterEach((to, from) => {
  // console.log(to)
  Vue.nextTick(() => {
    let el = null
    if (to.path == '/') {
      el = document.querySelector('.line-2')
    } else if (to.path == '/newYearCall') {
      el = document.querySelector('.NewYearCall')
      // console.log(el)
    }
    // console.log(to)
    if (el == null) return store.commit('setFullScreen', false)
    // console.log(el)
    const rect = el.getBoundingClientRect()
    const res = (store.state.isFullScreen =
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
    // console.log(res)
    store.commit('setFullScreen', res)
  })
})

export default router
