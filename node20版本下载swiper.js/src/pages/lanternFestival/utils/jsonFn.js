import lottie from 'lottie-web'
// json动画
export default (jsonName, className, loop = true, autoplay = true) => {
  const params = {
    container: document.querySelector(className),
    renderer: 'svg',
    loop,
    path: `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/data.json`,
    autoplay,
    assetsPath: `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/images/`
  }
  return lottie.loadAnimation(params)
}
