import thinkingdata from 'thinkingdata-browser'
import Vue from 'vue'
import { getUrlData } from '@/utils/tool'

// 使用：入口文件（main.js）：import '@/utils/thinkingData'

function thinkingdataInit() {
  if (process.env.NODE_ENV === 'development') return (Vue.prototype.$thinking = { track: () => {} }) // 开发环境去除埋点

  // 配置 SDK
  const config = {
    appId: process.env.VUE_APP_THINKING_APP_ID, // 项目 APP ID
    serverUrl: 'https://dataentry.dandanvoice.com', // 数据接收地址
    send_method: 'image', // 数据上传方式
    showLog: false, // 日志调试
    useAppTrack: true, // 打通 APP 与 H5
    autoTrack: {
      pageShow: true, // 开启 页面显示埋点 ta_page_show
      pageHide: true // 开启 页面隐藏埋点 ta_page_hide
    }
  }

  thinkingdata.init(config) // 初始化

  // 设置公共事件属性
  const superProperties = {}
  superProperties['activity_name'] = process.env.VUE_APP_THINKING_ACTIVITY_NAME // 活动名称
  superProperties['activity_date'] = +process.env.VUE_APP_THINKING_ACTIVITY_DATA // 活动日期
  thinkingdata.setSuperProperties(superProperties)

  // 存入动态公共事件属性
  // thinking.setDynamicSuperProperties(function () {
  //   const activity_date = +store.getters.week_value
  //   return { activity_date }
  // })

  thinkingdata.quick('autoTrack', { referal_source: getUrlData().referal_source }) // 页面浏览埋点 referal_source 活动来源
  Vue.prototype.$thinking = thinkingdata
}

thinkingdataInit()
