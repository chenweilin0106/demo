import Vue from 'vue'
import Vuex from 'vuex'
import { userInfo } from '@/api'
import { getUrlData } from '@/utils/tool'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      user_id: '', // 用户id
      username: '', // 用户名
      profile_image: '', // 用户头像
      gender: '0' // 0-男 1-女
    }, // 用户信息
    // layoutData: {
      // red_dot: false // 红点
    // }, // 主页数据
    uid: '',
    access_token: '',
    app_version: '', // app版本 6.0.2
    user_icon: '', // 用户头像
    referal_source: '', // 页面入口
    statusHeight: '', // 状态栏高度
    jump_type: '', // 跳转类型
    needNowEquipList: Object.freeze(['title', 'car', 'mic', 'chat_bubble', 'voice', 'chat_bubble_pub', 'costume', 'world_msg_skins']), // 可装扮的道具类型
    nowEquipText: Object.freeze({ title: '佩戴', car: '装备', mic: '装扮', chat_bubble: '装扮', chat_bubble_pub: '装扮', costume: '装扮', voice: '装扮', world_msg_skins: '装扮' }), // 可装扮的道具文本
    typeToNameMap: Object.freeze({ magic: '魔法飘屏道具', costume: '主页特效', chat_bubble_pub: '公屏气泡', chat_bubble: '私聊气泡', world_msg_skins: '世界消息皮肤', CP_card: 'CP资料卡', tool_present: '道具礼物' }) // 道具类型对应的类型角标文本
    // prettyTypeBg: Object.freeze({
    //   1: 'liang_yl_blue.svga', // 经典/名流
    //   2: 'liang_yl_purple.svga', // 典藏
    //   3: 'liang_yl_black.svga', // 至尊
    //   4: 'liang_yl_orange.svga', // 吉日
    //   5: 'liang_yl_pink.svga' // 情缘
    // }), // 靓号的等级背景
  },
  mutations: {
    // 获取地址栏参数
    getAppData(state) {
      Object.assign(state, getUrlData())
    },
    // 获取用户信息
    getUserInfo(state, payload) {
      Object.assign(state.userInfo, payload)
      state.user_icon = payload?.profile_image // 兼容头像获取
    }
  },
  actions: {
    // 获取用户信息
    async getUserInfoAsync({ commit }) {
      const res = await userInfo()
      if (res.errno) return Vue.prototype.$toast(res.errmsg)
      commit('getUserInfo', res.data)
    }
  }
})

export default store
