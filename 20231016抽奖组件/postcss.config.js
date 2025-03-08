module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750, // 设计稿宽度
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      ignoreUnitCase: true // 默认会忽略大小写来转换unitToConvert的匹配值 如px、PX、Px、pX各个情况。如果设置为false 则只匹配 px
    }
    // 其他插件配置...
  }
}
