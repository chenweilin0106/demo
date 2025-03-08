const fs = require('fs')
const path = require('path')
const { PAGE_NAME } = process.env
const isProd = process.env.NODE_ENV === 'production'
const time = new Date().getTime()
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false,
  publicPath: isProd ? process.env.VUE_APP_CDN_PATH : '/',
  outputDir: `dist/${PAGE_NAME}`,
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, `src/pages/${PAGE_NAME}/main.js`)
    },
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `js/[name]-${time}.js`,
      chunkFilename: `js/[name]-${time}.js`
    },
    // ,
    // externals
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  chainWebpack(config) {
    // if (isProd) {
    //   // 添加分析工具
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
    config.plugin('html').tap((args) => {
      args[0].template = fs.existsSync(`src/pages/${PAGE_NAME}/index.html`)
        ? `src/pages/${PAGE_NAME}/index.html`
        : 'public/index.html'
      return args
    })
    config.plugins.delete('prefetch')
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    })
  }
}
