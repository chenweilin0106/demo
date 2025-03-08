import lottie from 'lottie-web'
import axios from 'axios'
// json动画
export default async (jsonName, className, loop = true) => {
  try {
    await axios.get(
      `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/data.json`
    )
    const params = {
      container: document.querySelector(className),
      renderer: 'svg',
      loop,
      path: `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/data.json`,
      autoplay: true,
      assetsPath: `https://imagevo.dandanvoice.com/activity/weekly/json/${jsonName}/images/`
    }
    return lottie.loadAnimation(params)
  } catch (error) {
    return error.response.status
  }
}
