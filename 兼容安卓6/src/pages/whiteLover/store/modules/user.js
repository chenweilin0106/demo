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
    tabPoint: ''
  },
  // 相当于组件中计算属性
  getters: {},
  // 这个是唯一修改state中数据地方
  mutations: {
    setTabPoint(state, val) {
      // console.log('记录埋点', val)
      state.tabPoint = val
    },
    getUidAndAccess_token(state, str) {
      const arr = window.location.search.substring(1).split('&')
      const obj = {}
      arr.forEach((item) => {
        obj[item.split('=')[0]] = ''
        obj[item.split('=')[0]] = item.split('=')[1]
      })
      state.uid = obj.uid
      state.access_token = obj.access_token
    }
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
  }
}
