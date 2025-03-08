import sensors from 'sa-sdk-javascript'
// 开发测试环境
// const url = 'https://shence.dandanvoice.com:8106/sa'
// 生产环境（上线时使用）
const url = 'https://shence.dandanvoice.com:8106/sa?project=production'
sensors.init({
  server_url: url,
  show_log: true,
  heatmap: {
    clickmap: 'not_collect',
    scroll_notice_map: 'not_collect',
    custom_property: function () {
      return {
        activity_name: '愚你乐翻天活动',
        activity_date: '20230330',
        element: '模块选择'
      }
    }
  },
  use_client_time: true,
  app_js_bridge: true,
  send_type: 'beacon'
})

sensors.registerPage({
  current_url: location.href,
  referrer: document.referrer
})

export default sensors
