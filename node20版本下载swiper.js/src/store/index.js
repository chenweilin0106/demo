import Vue from 'vue'
import Vuex from 'vuex'
import { getUrlData } from '@/utils/tool'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    uid: '',
    access_token: '',
    app_version: '',
    user_icon: '',
    referal_source: '',
    statusHeight: '', // 状态栏高度
    jump_type: '',
    needNowEquipList: Object.freeze(['title', 'car', 'mic', 'chat_bubble', 'voice', 'chat_bubble_pub', 'costume']),
    nowEquipText: Object.freeze({ title: '佩戴', car: '装备', mic: '装扮', chat_bubble: '装扮', chat_bubble_pub: '装扮', costume: '装扮', voice: '装扮' }),
    typeToNameMap: Object.freeze({ pst_privilege: '赠送权', costume: '主页特效', chat_bubble_pub: '公屏气泡', chat_bubble: '私聊气泡', world_msg_skins: '世界消息皮肤' }),
    prettyTypeBg: Object.freeze({
      1: 'liang_yl_blue.png', // 经典/名流
      2: 'liang_yl_purple.svga', // 典藏
      3: 'liang_yl_black.svga', // 至尊
      4: 'liang_yl_orange.png', // 吉日
      5: 'liang_yl_pink.svga' // 情缘
    }) // 靓号的等级背景
  },
  mutations: {
    // 获取地址栏参数
    getAppData(state) {
      Object.assign(state, getUrlData())
    },
    // 获取用户头像
    getUserIcon(state, payload) {
      state.user_icon = payload
    }
  }
})

export default store
