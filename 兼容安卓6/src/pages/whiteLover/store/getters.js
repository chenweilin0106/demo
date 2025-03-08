const getters = {
  uid: (state) => state.user.uid,
  access_token: (state) => state.user.access_token,
  tabPoint: (state) => state.user.tabPoint
}
export default getters

// state.user.userInfo.username.abc
// state.getters.username mapGetters -> username
