import sensors from 'sa-sdk-javascript'

// 开发测试环境
// const serverUrl = 'https://shence.dandanvoice.com:8106/sa'
// 生产环境（上线时使用）
// const serverUrl = 'https://shence.dandanvoice.com:8106/sa?project=production'

sensors.init({
  server_url: process.env.VUE_APP_SENSORS_URL,
  // server_url: '',
  show_log: true,
  heatmap: {
    clickmap: 'not_collect',
    scroll_notice_map: 'not_collect'
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
