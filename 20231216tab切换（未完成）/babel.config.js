const production = {}
if (process.env.VUE_APP_THINKING_APP_ID !== 'debug-appid') {
  production.plugins = ['transform-remove-console']
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ],
  env: {
    production
  }
}
