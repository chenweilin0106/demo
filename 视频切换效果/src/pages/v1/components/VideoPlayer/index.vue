<template>
  <div class="container" id="myVider">
    <video-player
      class="player"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
    >
    </video-player>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerOptions: {
        live: true,
        playbackRates: [0.5, 1.0, 1.25, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        controls: true, // 控制条
        preload: 'auto', // 视频预加载
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        // aspectRatio: '25:25', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          currentTimeDisplay: true, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: false // 全屏按钮
        },
        sources: [
          {
            type: 'video/mp4',
            src: this.itemData.video
          }
        ],
        poster: this.itemData.img, // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  created() {},
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  mounted() {},
  methods: {
    stop() {
      const player = this.$refs.videoPlayer.player
      // 重置视频进度条
      player.currentTime(0)
      // 暂停视频
      player.pause()
      // 隐藏视频控制器
      player.controlBar.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
#myVider {
  margin: 0 auto;
  position: relative;
  width: 287px;
  height: 487px;
  ::v-deep .video-player {
    width: 100%;
    height: 100%;
    .video-js {
      width: 100%;
      height: 100%;
    }
  }
  ::v-deep .video-js .vjs-big-play-button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  ::v-deep .vjs-poster {
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
  }
  ::v-deep .vjs-big-play-button {
    height: 90px;
    background: url('../../assets/img_play.png') no-repeat;
    background-size: 100%;
    border: none;
    .vjs-icon-placeholder {
      display: none;
    }
    .vjs-control-text {
      display: none;
    }
  }
}
</style>
