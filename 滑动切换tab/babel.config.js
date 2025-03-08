const production = {}
if (process.env.VUE_APP_ENV === 'officialPro') {
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
