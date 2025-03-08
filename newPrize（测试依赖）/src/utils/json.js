import lottie from "lottie-web";
// json动画
export const svgFun = (
  location,
  animationData,
  type,
  className = ".lottie"
) => {
  const params = {
    container: document.querySelectorAll(className)[location],
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData,
    assets: animationData.assets.forEach((item) => {
      item.u = "";
      if (item.w && item.h && !item.p.includes("/")) {
        // item.p = require(`../assets/lottie/${type}/images/${item.p}`);
        item.p = `${process.env.VUE_APP_OSS_PATH}activity/weekly/json/${type}/images/${item.p}`;
      }
    }),
  };
  return lottie.loadAnimation(params);
};
