import SVGA from "svgaplayerweb";
// json动画
export default (svga_name, id, loops = 0) => {
  const svga_play = new SVGA.Player(`#${id}`);
  const svga_parser = new SVGA.Parser(`#${id}`);
  svga_play.loops = loops == 0 ? loops : 1;
  svga_parser.load(
    `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/${svga_name}.svga`,
    (videoItem) => {
      svga_play.setVideoItem(videoItem);
      svga_play.startAnimation();
    }
  );
  return svga_play;
};
