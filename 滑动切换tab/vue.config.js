const fs = require('fs')
// const path = require('path')
const { PAGE_NAME } = process.env
const isProd = process.env.NODE_ENV === 'production'
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// 配置引用cdn的js、css地址
const cdn = {
  css: [
    // 'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/vant.min.css'
  ],
  js: [
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/vue.min.js',
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/vue-router.min.js',
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/vuex.min.js',
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/axios.min.js',
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/lottie.min.js',
    // 'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/thinkingdata.umd.min.js',
    'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/svga.min.js'
    // 'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/html2canvas.min.js',
    // 'https://imagevo.dandanvoice.com/activity/public/vue/node_modules/vant.min.js'
  ]
}
// 配置打包时使用CDN节点（加入externals外部扩展）， 忽略打包的第三方库
// 左面放package.json中的扩展的名称,右面放项目依赖的名称(项目初始化要用的名称)
const externals = {
  // 属性名称 vue, 表示遇到 import xxx from 'vue' 这类引入 'vue'的，不去 node_modules 中找，而是去找全局变量 Vue（其他的为VueRouter、Vuex、axios、ELEMENT、echarts，注意全局变量是一个确定的值，不能修改为其他值，修改为其他大小写或者其他值会报错，若有异议可留言）
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'lottie-web': 'lottie',
  // 'thinkingdata-browser': 'thinking',
  svgaplayerweb: 'SVGA'
  // html2canvas: 'html2canvas',
  // vant: 'vant'
}
module.exports = {
  productionSourceMap: false,
  publicPath: isProd ? process.env.VUE_APP_CDN_PATH : '/',
  outputDir: 'dist/vipDay',
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  chainWebpack(config) {
    if (isProd) {
      // 添加分析工具
      // config
      //   .plugin('webpack-bundle-analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
      // 视为一个外部库，而不将它打包进来
      config.externals(externals)
    }
    config.plugin('html').tap((args) => {
      args[0].template = fs.existsSync(`src/pages/${PAGE_NAME}/index.html`) ? `src/pages/${PAGE_NAME}/index.html` : 'public/index.html'
      return args
    })
    config.plugins.delete('prefetch')
    config.when(isProd, (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          }
        }
      })
    })
  }
}
