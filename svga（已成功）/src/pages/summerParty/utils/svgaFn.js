import SVGA from 'svgaplayerweb'
export default (svga_name, id) => {
  const svga_play = new SVGA.Player(`#${id}`)
  const svga_parser = new SVGA.Parser(`#${id}`)
  svga_play.loops = 0
  svga_parser.load(
    `https://develop.dandan818.com//vue/weekly/${svga_name}.svga`,
    (videoItem) => {
      svga_play.setVideoItem(videoItem)
      svga_play.startAnimation()
    }
  )
  return svga_play
}
