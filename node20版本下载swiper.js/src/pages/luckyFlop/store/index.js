import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * 判断是否是电脑系统
 */
// function isPC() {
//   if (navigator.platform || navigator.userAgentData.platform) {
//     let platform = navigator.platform || navigator.userAgentData.platform
//     let Agents = ['MacIntel', 'Win32', 'Linux x86_64', 'Linux armv81']
//     let getArr = Agents.filter(i => platform.includes(i))
//     // return getArr.length
//     return getArr.length || 1
//   } else {
//     return false
//   }
// }
// uid:160958 token:123456

const store = new Vuex.Store({
  state: {
    // uid: '20011',
    // access_token: '123',
    // app_version: '5.77',
    uid: '',
    access_token: '',
    app_version: '',
    user_icon: '',
    referal_source: '',
    needNowEquipList: ['title', 'car', 'mic', 'chat_bubble', 'costume'],
    nowEquipText: {
      title: '佩戴',
      car: '装备',
      mic: '装扮',
      chat_bubble: '装扮',
      costume: '装扮'
    }
  },
  getters: {},
  mutations: {
    // 获取地址栏参数
    getAppData(state) {
      const appDataObj = window.location.search
        .slice(1)
        .split('&')
        .reduce((pre, cur) => {
          pre[cur.split('=')[0]] = cur.split('=')[1]
          return pre
        }, {})
      state = Object.assign(state, appDataObj)
    },
    // 获取用户头像
    getUserIcon(state, payload) {
      // console.log('进入保存用户头像函数')
      if (payload) {
        // console.log('有参数，保存头像成功')
        state.user_icon = payload
      }
    }
  },
  actions: {},
  modules: {}
})

export default store
