import thinkingdata from 'thinkingdata-browser'

const config = {
  appId: 'debug-appid', // 项目 APP ID
  serverUrl: 'https://dataentry.dandanvoice.com', // 数据接收地址
  send_method: 'image', // 数据上传方式
  showLog: true, // 日志调试
  useAppTrack: true // 打通 APP 与 H5
}
const ta = thinkingdata
ta.init(config)
const superProperties = {}
superProperties['activity_name'] = '童趣六一'
superProperties['activity_date'] = 20230531
superProperties['current_url'] = location.href
superProperties['referrer'] = document.referrer
ta.setSuperProperties(superProperties) //设置公共事件属性

export default ta

// 点击事件埋点
const ClickTrack = module => {
  ta.track(
    'click', //追踪事件的名称
    {
      element: '模块选择',
      // activity_name: '童趣六一',
      // activity_date: 20230531,
      module
    }
  )
}
// 页面浏览事件埋点
const PageTrack = () => {
  ta.quick(
    'autoTrack'
    // , {
    //   activity_name: '童趣六一',
    //   activity_date: 20230531
    // }
  )
}
