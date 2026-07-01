const fs = require('fs')
const path = require('path')
const { PAGE_NAME } = process.env
const isProd = process.env.NODE_ENV === 'production'
const envFiles = [
  '.env',
  process.env.VUE_CLI_MODE ? `.env.${process.env.VUE_CLI_MODE}` : '',
  process.env.VUE_APP_ENV ? `.env.${process.env.VUE_APP_ENV}` : ''
]
  .filter(Boolean)
  .map(file => path.resolve(__dirname, file))
  .filter(file => fs.existsSync(file))
const cacheEnv = process.env.VUE_APP_ENV || process.env.VUE_CLI_MODE || 'default'
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// 配置引用cdn的js、css地址
const cdn = {
  css: [
    // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vant.min.css`,
    // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/swiper.min.css`
  ],
  js: [
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vue.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vue-router.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vuex.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/axios.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/lottie.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/thinkingdata.umd.min.js`,
    `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/svga.min.js`
    // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/html2canvas.min.js`
    // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/swiper.min.js`
    // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vant.min.js`
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
  'thinkingdata-browser': 'thinkingdata',
  svgaplayerweb: 'SVGA'
  // html2canvas: 'html2canvas'
  // swiper: 'Swiper'
  // vant: 'vant'
}
module.exports = {
  productionSourceMap: false,
  publicPath: isProd ? process.env.VUE_APP_CDN_PATH : '/',
  outputDir: `dist/${PAGE_NAME}`,
  devServer: {
    compress: true,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    static: {
      watch: {
        ignored: [/node_modules/, /public/, /dist/, /.idea/],
        poll: false
      }
    }
  },
  configureWebpack: {
    entry: [path.resolve(__dirname, `src/pages/${PAGE_NAME}/main.js`)],
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, `node_modules/.cache/webpack/build-${cacheEnv}`),
      buildDependencies: {
        config: [__filename, ...envFiles]
      },
      allowCollectingMemory: true
    },
    // 关闭 webpack 的性能提示
    performance: { hints: false }
    // devServer: {
    //   allowedHosts: 'all'
    // }
  },
  chainWebpack(config) {
    if (isProd) {
      // 添加分析工具
      // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
      // 视为一个外部库，而不将它打包进来
      config.externals(externals)
    }
    config.plugin('html').tap((args) => {
      args[0].template = fs.existsSync(`src/pages/${PAGE_NAME}/index.html`)
        ? `src/pages/${PAGE_NAME}/index.html`
        : 'public/index.html'
      return args
    })
    config.plugins.delete('prefetch')
    // 新增：让 webpack 识别并打包 .svga 文件为静态资源（webpack5新增）
    config.module
      .rule('svga')
      .test(/\.svga$/i)
      .set('type', 'asset/resource')
      .set('generator', { filename: 'assets/svga/[name].[hash:8][ext]' })
    // 优化监视选项
    config.watchOptions({
      ignored: ['node_modules/**', 'public/**', 'dist/**', '.idea/**']
    })
    config.when(isProd, (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        maxSize: 200000, // 最大分包大小
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // split vantUI into a single package
            priority: 15, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          }
        }
      })
    })
  }
}
