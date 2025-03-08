import thinking from 'thinkingdata-browser'
// import store from '../store'

// 配置 SDK
const config = {
  appId: process.env.VUE_APP_THINKING_APP_ID, // 项目 APP ID
  serverUrl: 'https://dataentry.dandanvoice.com', // 数据接收地址
  send_method: 'image', // 数据上传方式
  showLog: false, // 日志调试
  useAppTrack: true, // 打通 APP 与 H5
  autoTrack: {
    // 开启ta_page_show事件
    pageShow: true,
    // 开启ta_page_hide事件
    pageHide: true
  }
}

// 导入配置，初始化 SDK
thinking.init(config)

// 设置公共事件属性
const superProperties = {}
superProperties['activity_name'] = process.env.VUE_APP_THINKING_ACTIVITY_NAME
superProperties['activity_date'] = +process.env.VUE_APP_THINKING_ACTIVITY_DATA

// 存入公共事件属性
thinking.setSuperProperties(superProperties)

// 存入动态公共事件属性
// thinking.setDynamicSuperProperties(function () {
//   const activity_date = +store.getters.week_value
//   return { activity_date }
// })

// 导出 SDK
export default thinking
