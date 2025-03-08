const getters = {
  uid: (state) => state.user.uid,
  access_token: (state) => state.user.access_token,
  app_version: (state) => state.user.app_version,
  user_icon: (state) => state.user.user_icon,
  referal_source: (state) => state.user.referal_source
  // week_value: (state) => state.user.week_value,
  // statusHeight: (state) => state.user.statusHeight,
  // allNavHeight: (state) => state.user.allNavHeight
}
export default getters

// state.user.userInfo.username.abc
// state.getters.username mapGetters -> username
