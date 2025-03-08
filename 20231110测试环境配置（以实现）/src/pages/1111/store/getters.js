const getters = {
  uid: (state) => state.user.uid,
  access_token: (state) => state.user.access_token,
  appVersion: (state) => state.user.appVersion,
  user_icon: (state) => state.user.user_icon,
  referal_source: (state) => state.user.referal_source
}
export default getters

// state.user.userInfo.username.abc
// state.getters.username mapGetters -> username
