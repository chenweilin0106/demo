import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    uid: '',
    access_token: '',
    app_version: '',
    user_icon: '',
    referal_source: '',
    jump_type: '',
    needNowEquipList: ['title', 'car', 'mic', 'chat_bubble', 'voice'],
    nowEquipText: {
      title: '佩戴',
      car: '装备',
      mic: '装扮',
      chat_bubble: '装扮',
      voice: '装扮'
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
