<template>
  <!-- 拍照盒子border_material -->
  <div
    class="picture_box"
    :class="dialogType === 'photo' && true && 'picture_box_photo'"
    ref="creditQrCodeShare"
  >
    <!-- 主页特效  -->
    <div class="home_effect" v-if="home_effect">
      <img :src="IconPath('mk4_22.png')" />
    </div>
    <!-- 自定义情话素材 -->
    <div class="love_story flex-center" v-if="love_story_material && my_words">
      <span>{{ my_words }}</span>
    </div>
    <!-- 时间素材 -->
    <div class="time_520" v-if="time_material">
      <img :src="IconPath('mk4_21.png')" />
    </div>
    <div class="bg">
      <img :src="IconPath('mk4_2.png')" />
    </div>
    <!-- 边框素材 -->
    <div v-if="border_material" class="border_520 flex-center">
      <img :src="IconPath('mk4_28.png')" />
    </div>
    <!-- 称号 -->
    <div class="title_box">
      <div class="love_title_lottie" v-if="title_material.user_title">
        <!-- 静态称号 -->
        <img
          v-if="dialogType === 'photo'"
          :src="
            IconPath(
              title_material.user_title === 'ch_zzzs'
                ? 'mk4_26.png'
                : 'mk4_27.png'
            )
          "
        />
        <!-- 称号-json动画 -->
        <public-json v-else :jsonName="title_material.user_title" />
        <!--<PublicJson-->
        <!--  v-else-->
        <!--  :lottieJson_name="title_material.user_title"-->
        <!--  :lottieJson="equipObj[title_material.user_title]"-->
        <!--/>-->
      </div>
      <div class="love_title_lottie" v-if="title_material.tuser_title">
        <!-- 静态称号 -->
        <img
          v-if="dialogType === 'photo'"
          :src="
            IconPath(
              title_material.tuser_title === 'ch_zzzs'
                ? 'mk4_26.png'
                : 'mk4_27.png'
            )
          "
        />
        <!-- 称号-json动画 -->
        <public-json v-else :jsonName="title_material.tuser_title" />
        <!--<PublicJson-->
        <!--  v-else-->
        <!--  :lottieJson_name="title_material.tuser_title"-->
        <!--  :lottieJson="equipObj[title_material.tuser_title]"-->
        <!--/>-->
      </div>
    </div>
    <!-- 用户盒子 -->
    <div class="user_box">
      <!-- 自己 -->
      <div class="my_info">
        <div
          class="my_avatar flex-center"
          :class="mic_material.user_mic && 'equip_mic_style'"
        >
          <!-- 头像框 -->
          <div class="avatar_border">
            <img :src="IconPath('mk4_3.png')" />
          </div>
          <public-svga
            :svgaName="dialogType === 'photo' ? '' : mic_material.user_mic"
            :userAvatar="pair_info[0]?.profile_image"
          />
          <!--<PublicJson-->
          <!--  :lottieJson_name="-->
          <!--    dialogType === 'photo' ? '' : mic_material.user_mic-->
          <!--  "-->
          <!--  :lottieJson="-->
          <!--    dialogType === 'photo' ? {} : equipObj[mic_material.user_mic]-->
          <!--  "-->
          <!--  :userAvatar="pair_info[0]?.profile_image"-->
          <!--/>-->
          <img
            v-if="dialogType === 'photo' && mic_material.user_mic"
            :src="
              IconPath(
                mic_material.user_mic === 'ts_aqwy_01'
                  ? 'mk4_23.png'
                  : 'mk4_24.png'
              )
            "
          />
        </div>
        <div class="my_name flex-center" v-if="pair_info[0]">
          <span>{{ character_omission(pair_info[0].username, 10) }}</span>
          <img :src="IconPath('mk4_7.png')" />
        </div>
      </div>
      <!-- 亲密度 -->
      <div class="love_num" :class="ring_material && 'love_num_noBig'">
        <!-- 比翼双飞戒指 -->
        <div class="ring_box" v-if="ring_material">
          <img v-if="dialogType === 'photo'" :src="IconPath('mk4_32.png')" />
          <PublicSvga v-else svgaName="jz_zays" />
        </div>
        <!-- 爱心图标 -->
        <div class="love_icon" v-else>
          <img :src="IconPath('mk4_5.png')" />
        </div>
        <div class="num_box">
          <span class="flex-center">{{ character_omission(intimacy, 7) }}</span>
          <img :src="IconPath('mk4_6.png')" />
        </div>
        <div class="text flex-center">心动值</div>
      </div>
      <!-- 别人 -->
      <div class="other_info">
        <div
          class="my_avatar flex-center"
          :class="mic_material.user_mic && 'equip_mic_style'"
          @click="$emit('bindUser')"
        >
          <!-- 头像框 -->
          <div class="avatar_border">
            <img :src="IconPath('mk4_3.png')" />
          </div>
          <public-svga
            :svgaName="dialogType === 'photo' ? '' : mic_material.tuser_mic"
            :userAvatar="pair_info[1]?.profile_image"
          />
          <!--<PublicJson-->
          <!--  :lottieJson_name="-->
          <!--    dialogType === 'photo' ? '' : mic_material.tuser_mic-->
          <!--  "-->
          <!--  :lottieJson="-->
          <!--    dialogType === 'photo' ? {} : equipObj[mic_material.tuser_mic]-->
          <!--  "-->
          <!--  :userAvatar="pair_info[1]?.profile_image"-->
          <!--/>-->
          <img
            v-if="dialogType === 'photo' && mic_material.tuser_mic"
            :src="
              IconPath(
                mic_material.tuser_mic === 'ts_aqwy_01'
                  ? 'mk4_23.png'
                  : 'mk4_24.png'
              )
            "
          />
          <!-- 未绑定 -->
          <div class="empty_bgc" v-if="!pair_info[1]?.id">
            <img :src="IconPath('mk4_4.png')" class="empty_img" />
          </div>
        </div>
        <div class="my_name flex-center">
          <span>
            {{
              pair_info[1] && pair_info[1].username
                ? character_omission(pair_info[1].username, 10)
                : '邀请好友绑定'
            }}
          </span>
          <img :src="IconPath('mk4_7.png')" />
        </div>
      </div>
    </div>
    <!-- 拍照按钮 -->
    <!--<div-->
    <!--  class="photo_btn"-->
    <!--  :class="border_material && 'border_material_pho_btn'"-->
    <!--  @click="$emit('showPhoto')"-->
    <!--  data-html2canvas-ignore-->
    <!--&gt;</div>-->
    <!--装饰素材-->
    <img
      v-if="adorn_material"
      class="adorn_material"
      :src="IconPath('mk4_29.png')"
    />
    <div class="music-box">
      <div class="music-progress">
        <div class="current-time">{{ formatTime }}</div>
        <div class="end-time">1:32</div>
        <img :src="IconPath('mk4_11.png')" class="line" />
        <img
          :src="IconPath('mk4_10.png')"
          class="point"
          :style="{ left: pointPosition }"
        />
        <!--0-93-->
      </div>
      <audio
        ref="myAudio"
        class="my-audio"
        controls
        @timeupdate="audioUpdate"
        @ended="audioEnded"
      >
        <source
          src="https://imagevo.dandanvoice.com/activity/weekly/voice/lovely-time-13003.mp3"
          type="audio/mpeg"
        />
      </audio>
      <div class="control-box flex-center">
        <img :src="IconPath('mk4_14.png')" class="last" @click="reset" />
        <img
          v-if="playing"
          :src="IconPath('mk4_17.png')"
          class="play"
          @click="pause"
        />
        <img v-else :src="IconPath('mk4_16.png')" class="pause" @click="play" />
        <img :src="IconPath('mk4_15.png')" class="next" @click="reset" />
      </div>
    </div>
  </div>
</template>

<script>
import { isIOS } from '../../../utils/toApp.js'
// svga动画组件
import PublicSvga from '../../../components/PublicSvga'
// json动画组件
import PublicJson from '../../../components/PublicJson'
// canvas库
import html2canvas from 'html2canvas'

export default {
  name: 'photoBox',
  components: {
    PublicJson,
    PublicSvga
  },
  props: {
    // 自定义情话
    my_words: {
      default: ''
    },
    // 我的佩戴信息
    equip_info: {
      type: Object,
      default: () => {}
    },
    // 绑定用户的佩戴信息
    tuser_quip_info: {
      type: Object,
      default: () => {}
    },
    // 双方头饰和称号领取状况
    select_info: {
      type: Object,
      default: () => {}
    },
    // 亲密度
    intimacy: {
      type: Number,
      default: 0
    },
    // 用户和绑定用户信息
    pair_info: {
      type: Array,
      required: true
    },
    // 弹框类型
    dialogType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      playing: false,
      timer: null,
      progressNum: 0,
      equipObj: {
        ch_yyrbs: 'ch_yyrbs',
        ch_zyrzl: 'ch_zyrzl',
        ts_aqwy_02: 'ts_aqwy_02',
        ts_aqwy_01: 'ts_aqwy_01'
      },
      imgUrl: ''
    }
  },
  computed: {
    pointPosition() {
      return ((this.progressNum / 92) * 0.93 * 100).toFixed(2) + '%'
    },
    formatTime() {
      const num = this.progressNum
      const m = parseInt((num / 60) % 60)
      // m = m < 10 ? '0' + m : m
      let s = parseInt(num % 60)
      s = s < 10 ? '0' + s : s
      return `${m}:${s}`
    },
    // 称号素材
    title_material() {
      return this.equip_info.hasOwnProperty(5)
        ? {
            user_title:
              this.select_info.uid_title_id == '5092' ? 'ch_zzzs' : 'ch_yzxl',
            tuser_title:
              this.select_info.tuid_title_id == '5092' ? 'ch_zzzs' : 'ch_yzxl'
          }
        : {}
    },
    // 头饰素材
    mic_material() {
      const mic_obj = {}
      if (this.equip_info.hasOwnProperty(3)) {
        mic_obj.user_mic =
          this.equip_info[3] == '103' ? 'ts_aqwy_01' : 'ts_aqwy_02'
        mic_obj.tuser_mic =
          this.select_info.tuid_mic_id == '103'
            ? 'ts_aqwy_01'
            : this.select_info.tuid_mic_id == '104'
            ? 'ts_aqwy_02'
            : ''
      }
      return mic_obj
    },
    // 自定义情话
    love_story_material() {
      return this.equip_info.hasOwnProperty(4)
    },
    // 主页特效素材
    home_effect() {
      return this.equip_info.hasOwnProperty(2)
    },
    // 时间素材
    time_material() {
      return this.equip_info.hasOwnProperty(1)
    },
    // 边框素材
    border_material() {
      return this.equip_info.hasOwnProperty(6)
    },
    // 比翼双飞戒指素材
    ring_material() {
      return this.equip_info.hasOwnProperty(8)
    },
    // 装饰素材
    adorn_material() {
      return this.equip_info.hasOwnProperty(7)
    }
  },
  methods: {
    audioEnded(event) {
      this.progressNum = 0
      event.target.currentTime = 0 // 将音频的播放位置重置为0
      this.playing = false
    },
    audioUpdate(event) {
      this.progressNum = event.target.currentTime
      // console.log('The audio current time is: ', event.target.currentTime)
    },
    pause() {
      this.$refs.myAudio.pause()
      this.playing = false
    },
    play() {
      this.$refs.myAudio.play()
      this.playing = true
    },
    reset() {
      this.$refs.myAudio.currentTime = 0 // 将音频的播放位置重置为0
      this.play()
    },
    character_omission(text, length) {
      const Text = text.toString()
      return Text.length > length ? Text.substring(0, length) + '...' : Text
    },
    isIos() {
      return isIOS() || window.navigator.userAgent.indexOf('Safari') === -1
    },
    // 生成图片
    async productImage() {
      this.$nextTick(async () => {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        const canvas = await html2canvas(this.$refs.creditQrCodeShare, {
          backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
          useCORS: true // 支持图片跨域
        })
        // 把生成的base64位图片上传到服务器,生成在线图片地址
        this.imgUrl = canvas.toDataURL('image/png') // toDataURL: 图片格式转成 base64
        this.$emit('showImage', this.imgUrl)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.my-audio {
  display: none;
}

//@keyframes move {
//  0% {
//    transform: translateY(-50%) translateX(0);
//  }
//  100% {
//    transform: translateY(-50%) translateX(305px);
//  }
//}

// 生成图片样式调整
.picture_box_photo {
  //width: 750px !important;
  //height: 1255px !important;
  //padding-top: 145px !important;
  //.border_material_icon {
  //  left: 0 !important;
  //  > img {
  //    width: 100% !important;
  //  }
  //}
  //.home_effect {
  //  transform: scale(0.9) !important;
  //  top: -49px !important;
  //  left: -3px !important;
  //  > img {
  //    width: 102% !important;
  //  }
  //}
  //.time_520 {
  //  transform: scale(0.9) !important;
  //  bottom: 85px !important;
  //}
  //.title_box {
  //  transform: scale(0.9) !important;
  //  right: -12px !important;
  //  bottom: 210px !important;
  //}
  //.user_box {
  //  transform: scale(0.9) !important;
  //  left: 15px !important;
  //  .my_name {
  //    transform: scale(1.1) !important;
  //    font-size: 13px !important;
  //  }
  //  .num_box {
  //    > span {
  //      position: relative;
  //      height: 16px !important;
  //      top: -2px;
  //    }
  //    .span_ios {
  //      top: -3px !important;
  //    }
  //  }
  //  .text {
  //    margin-top: -3px !important;
  //    margin-left: -5px !important;
  //    transform: scale(0.8) !important;
  //    letter-spacing: 4px;
  //  }
  //  .avatar_border {
  //    top: 53px !important;
  //    left: 55px !important;
  //  }
  //  .my_avatar {
  //    > img {
  //      z-index: 14 !important;
  //    }
  //  }
  //  .other_info {
  //    .avatar_border {
  //      left: 53px !important;
  //    }
  //  }
  //}
}

// 边框素材的保存情书按钮位置
.border_material_pho_btn {
  bottom: 16px !important;
}

// 拍照盒子
.picture_box {
  position: relative;
  margin: 0 auto;
  width: 750px;
  height: 1255px;
  //overflow: hidden;
  padding-top: 420px;
  color: #fff;

  .bg {
    position: absolute;
    //top: 54px;
    top: 54px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 716px;
    height: 1185px;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  // 边框素材
  .border_520 {
    position: absolute;
    z-index: 2;
    top: 0;
    //left: -17px;
    width: 750px;
    height: fit-content;
    overflow: hidden;

    > img {
      position: relative;
      right: 7px;
      width: 764px;
      height: auto;
    }
  }

  // 主页特效
  .home_effect {
    position: absolute;
    z-index: 2;
    left: 145px;
    top: 262px;
    width: 490px;
    height: 642px;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  // 自定义情话素材
  .love_story {
    position: absolute;
    z-index: 11;
    bottom: 304px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 54px;
    background: url('@/pages/valentineDay/assets/mk4_25.png') no-repeat left
      top/100% 100%;
    font-size: 30px;
    font-weight: 500;
    color: #ffffff;
    text-shadow: -1px 0px 5px #dcabfd, 1px 0px 5px #dcabfd;

    > span {
      position: relative;
      z-index: 12;
      min-width: 570px;
      max-width: 570px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      line-height: 54px;
    }

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }

  // 时间素材
  .time_520 {
    position: absolute;
    z-index: 11;
    top: 105px;
    right: 36px;
    width: 260px;
    height: 153px;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  // 称号
  .title_box {
    position: absolute;
    z-index: 12;
    bottom: 470px;
    width: 100%;
    display: flex;
    padding: 0 8px;
    justify-content: space-around;
    align-items: center;

    .love_title_lottie {
      width: 210px;
      height: 96px;

      &:nth-child(1) {
        //margin-left: 16px;
      }

      &:nth-child(2) {
        //margin-right: 24px;
      }

      > img {
        width: 100%;
      }
    }
  }

  // 用户盒子
  .user_box {
    position: relative;
    z-index: 60;
    width: 100%;
    //height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .my_info,
    .other_info {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .my_avatar {
        position: relative;
        width: 184px;
        height: 184px;
        border-radius: 50%;

        ::v-deep .PublicSvga {
          position: relative;
          z-index: 12;
          width: 192px;
          height: 191px;

          .micAvatar_img {
            width: 140px;
            height: 140px;
            //background: #fff;
            //padding: 4px;

            > img {
              border-radius: 50%;
            }
          }
        }

        > img {
          z-index: 13;
          position: absolute;
          width: 192px;
          height: 191px;
        }

        .empty_bgc {
          position: absolute;
          z-index: 12;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #5b3692;

          .empty_img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 77px;
            height: 77px;
          }
        }

        // 头像框
        .avatar_border {
          position: absolute;
          z-index: 11;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;

          > img {
            width: 100%;
          }
        }
      }

      .my_name {
        position: relative;
        //margin-top: 5px;
        padding: 0 12px;
        width: 312px;
        height: 80px;
        font-weight: 500;
        font-size: 28px;

        > span {
          position: relative;
          z-index: 12;
          display: block;
          width: fit-content;
          height: fit-content;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 48px;
        }

        > img {
          position: absolute;
          z-index: 11;
          top: 0;
          left: 50%;
          width: 88%;
          transform: translateX(-50%);
        }
      }
    }

    .other_info {
      > .love_mic_lottie {
        position: absolute;
        top: 0;
        left: 0;
        width: 154px;
        height: 172px;
        border: none;
        background: none;
      }
    }

    // 亲密度
    .love_num {
      position: relative;
      //left: -2px;
      z-index: 50;
      margin: -20px -35px 0;
      width: fit-content;
      height: 110px;
      // 亲密度值
      .num_box {
        position: relative;
        z-index: 2;
        margin-top: 60px;
        width: 140px;
        height: 28px;
        padding: 0 12px;
        font-size: 24px;
        font-weight: 500;
        color: #f56dc6;

        > span {
          position: relative;
          z-index: 12;
          width: 100%;
          height: 100%;
        }

        > img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 11;
          width: 139px;
          height: 27px;
        }
      }

      // 新增请密度文本
      .text {
        margin-top: 7px;
        font-size: 20px;
        font-weight: 500;
        color: #f3fcff;
        //transform: scale(0.8);
      }

      // 比翼双飞戒指
      .ring_box {
        position: absolute;
        z-index: 1;
        top: -50px;
        left: 8px;
        width: 128px;
        height: 128px;

        > img {
          position: relative;
          top: 2px;
          width: 128px;
        }
      }

      // 爱心图标
      .love_icon {
        position: absolute;
        z-index: 11;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 78px;
        height: 70px;

        > img {
          width: 100%;
        }
      }
    }

    .equip_mic_style {
      ::v-deep .PublicJson {
        position: absolute !important;
        width: 204px !important;
        height: 206px !important;
      }
    }
  }

  // 装饰素材
  .adorn_material {
    position: absolute;
    z-index: 2;
    width: 689px;
    height: 470px;
    bottom: 41px;
    left: 36px;
  }

  .music-box {
    margin-top: 284px;
    position: relative;
    z-index: 2;
    width: 100%;

    .music-progress {
      margin: 0 auto;
      position: relative;
      width: fit-content;

      .current-time {
        position: absolute;
        bottom: -20px;
        left: 26px;
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: -1px 0px 5px #dcabfd, 1px 0px 5px #dcabfd;
      }

      .end-time {
        bottom: -20px;
        right: 26px;
        position: absolute;
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: -1px 0px 5px #dcabfd, 1px 0px 5px #dcabfd;
      }

      .line {
        display: block;
        margin: 0 auto;
        width: 651px;
        height: 39px;
      }

      .point {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 51px;
        height: 51px;
        transition: all 0.3s;
        //transform: translateX(600px);
      }

      //.move-class {
      //  animation: move 320s linear;
      //}
    }

    .control-box {
      margin: 6px auto 0;
      width: fit-content;
      height: 171px;

      .last {
        width: 69px;
        height: 71px;
      }

      .play {
        margin: 0 70px;
        width: 171px;
        height: 171px;
      }

      .pause {
        margin: 0 70px;
        width: 171px;
        height: 171px;
      }

      .next {
        width: 69px;
        height: 71px;
      }
    }
  }

  // 拍照按钮
  //.photo_btn {
  //  position: absolute;
  //  z-index: 300;
  //  left: 230px;
  //  bottom: 0px;
  //  width: 284px;
  //  height: 278px;
  //  background: url('../../../assets/mk4_13.png') no-repeat center top/100% auto;
  //}
}
</style>
