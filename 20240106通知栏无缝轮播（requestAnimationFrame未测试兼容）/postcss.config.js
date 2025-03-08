// module.exports = () => ({
//   plugins: [
//     // autoprefixer 自动补齐 CSS3 前缀，适配不同浏览器
//     require('autoprefixer')({
//       overrideBrowserslist: [
//         'last 10 versions' // 所有主流浏览器最近10版本用
//       ]
//     }),
//     require('postcss-pxtorem')({
//       rootValue: 37.5, // 设计稿元素尺寸/10，这里设计稿宽度为1920
//       propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
//       unitPrecision: 100, // 保留rem小数点多少位
//       // selectorBlackList: ['el-input', 'el-step', 'no-'], // 则是一个对css选择器进行过滤的数组，比如你设置为['el-']，那所有el-类名里面有关px的样式将不被转换，这里也支持正则写法。
//       replace: true,
//       mediaQuery: false // 媒体查询( @media screen 之类的)中不生效
//       // minPixelValue: 1 // px小于3的不会被转换
//     })
//   ]
// })
const path = require('path')
module.exports = ({ file }) => {
  const designWidth = file.includes(path.join('node_modules', 'vant'))
    ? 375
    : 750
  return {
    plugins: {
      autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
      'postcss-px-to-viewport': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: designWidth, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: [], // 指定不转换为视窗单位的类名，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        // mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        landscape: false // 是否处理横屏情况
      }
    }
  }
}
