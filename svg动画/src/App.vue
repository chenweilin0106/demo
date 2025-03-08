<template>
  <div id="animation"></div>
</template>

<script>
import SVG from './assets/12xz_baiyang.svga'
const SVGA = require('svgaplayerweb')
const { Player: SVGAPlayer } = SVGA
export default {
  data() {
    return {
      mySVG: SVG
    }
  },
  mounted() {
    // const player = new SVGAPlayer('#animation')
    // console.log(player)
    const player = new SVGAPlayer('#animation')
    const parser = new SVGA.Parser()
    parser.load(this.mySVG, (videoItem) => {
      player.setVideoItem(videoItem)
      player.startAnimation()
    })
  }
}
</script>

<style>
#animation {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
