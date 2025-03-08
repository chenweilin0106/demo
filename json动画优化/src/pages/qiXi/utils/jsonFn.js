import lottie from 'lottie-web'
// json动画
export default (jsonName, className, loop = true) => {
  const params = {
    container: document.querySelector(className),
    renderer: 'svg',
    loop,
    path: `http://develop.dandan818.com/vue/weekly/${jsonName}/data.json`,
    autoplay: true,
    assetsPath: `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/images/`
  }
  return lottie.loadAnimation(params)
}
