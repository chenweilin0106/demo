let plugins = [{}]
if (process.env.VUE_APP_ENV === 'officialPro') plugins = ['transform-remove-console']
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
    ],
    plugins
  ]
}
