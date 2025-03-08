import Vue from 'vue'
import VueRouter from 'vue-router'
import sensors from '../utils/sensors'
import index from '../views/index/index.vue'
import inforShow from '../views/inforShow/index.vue'
import priorityExperience from '../views/priorityExperience/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    redirect: '/index/inforShow',
    children: [
      {
        // 情报公开
        path: '/index/inforShow',
        component: inforShow
      },
      {
        // 抢先体验
        path: '/index/priorityExperience',
        component: priorityExperience
      }
    ]
  },
  {
    path: '/index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  if (from.fullPath === '/') {
    Vue.nextTick(() => {
      sensors.quick('autoTrackSinglePage', {
        activity_name: '日进斗金',
        activity_date: '20230420'
      })
    })
  }
})
export default router
