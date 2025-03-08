// 两根线
// 同步：组件 commit -> mutations -> state
// 异步： 组件 dispatch -> actions -> commit -> mutations -> state
export default {
  // 开启命名空间
  namespaced: true,
  // 放数据的地方
  state: {
    uid: '',
    access_token: '',
    app_version: '',
    user_icon: '',
    referal_source: ''
    // week_value: ''
  },
  // 相当于组件中计算属性
  getters: {},
  // 这个是唯一修改state中数据地方
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
      console.log('进入保存用户头像函数')
      if (payload) {
        console.log('有参数，保存头像成功')
        state.user_icon = payload
      }
    }
    // 保存活动期数
    // getWeekValue(state, payload) {
    //   state.week_value = payload
    // }
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
  }
}
