<template>
  <!-- 拍照盒子 -->
  <div
    class="picture_box"
    :class="dialogType === 'photo' && border_material && 'picture_box_photo'"
    ref="creditQrCodeShare"
  >
    <!-- 主页特效 -->
    <div class="home_effect" v-if="home_effect">
      <img :src="IconPath('mk4_4.png')" />
    </div>
    <!-- 自定义情话素材 -->
    <div class="love_story flex_across" v-if="love_story_material && my_words">
      <span>{{ my_words }}</span>
      <img :src="IconPath('mk4_10.png')" />
    </div>
    <!-- 时间素材 -->
    <div class="time_520" v-if="time_material">
      <img :src="IconPath('mk4_3.png')" />
    </div>
    <!-- 边框素材 -->
    <div class="border_520" :class="border_material && 'border_material_icon'">
      <img :src="IconPath(border_material ? 'mk4_9_1.png' : 'mk4_9.png')" />
    </div>
    <!-- 称号 -->
    <div class="title_box">
      <div class="love_title_lottie" v-if="title_material.user_title">
        <!-- 静态称号 -->
        <img
          v-if="dialogType === 'photo'"
          :src="
            IconPath(
              title_material.user_title === 'ch_yyrbs'
                ? 'mk4_7.png'
                : 'mk4_8.png'
            )
          "
        />
        <!-- 称号-json动画 -->
        <PublicJson v-else :jsonName="title_material.user_title" />
      </div>
      <div class="love_title_lottie" v-if="title_material.tuser_title">
        <!-- 静态称号 -->
        <img
          v-if="dialogType === 'photo'"
          :src="
            IconPath(
              title_material.tuser_title === 'ch_yyrbs'
                ? 'mk4_7.png'
                : 'mk4_8.png'
            )
          "
        />
        <!-- 称号-json动画 -->
        <PublicJson v-else :jsonName="title_material.tuser_title" />
      </div>
    </div>
    <!-- 用户盒子 -->
    <div class="user_box">
      <!-- 自己 -->
      <div class="my_info">
        <div
          class="my_avatar flex_across"
          :class="mic_material.user_mic && 'equip_mic_style'"
        >
          <!-- 头像框 -->
          <div class="avatar_border">
            <img :src="IconPath('mk4_22.png')" />
          </div>
          <PublicJson
            :jsonName="dialogType === 'photo' ? '' : mic_material.user_mic"
            :userAvatar="pair_info[0]?.profile_image"
          />
          <!-- 静态头饰 -->
          <img
            v-if="dialogType === 'photo' && mic_material.user_mic"
            :src="
              IconPath(
                mic_material.user_mic === 'female520'
                  ? 'mk4_5.png'
                  : 'mk4_6.png'
              )
            "
          />
        </div>
        <div class="my_name" v-if="pair_info[0]">
          <span>{{ character_omission(pair_info[0].username, 10) }}</span>
          <img :src="IconPath('mk4_2.png')" />
        </div>
      </div>
      <!-- 亲密度 -->
      <div class="love_num" :class="ring_material && 'love_num_noBig'">
        <!-- 比翼双飞戒指  -->
        <div class="ring_box" v-if="ring_material">
          <img v-if="dialogType === 'photo'" :src="IconPath('mk4_11_1.png')" />
          <PublicSvga v-else svgaName="jz_bysf" />
        </div>
        <!-- 爱心图标 -->
        <div class="love_icon" v-else>
          <img :src="IconPath('mk4_11.png')" />
        </div>
        <div class="num_box">
          <span
            :class="dialogType === 'photo' && isIos() && 'span_ios'"
            class="flex_across"
            >{{ character_omission(intimacy, 7) }}</span
          >
          <img :src="IconPath('mk4_12.png')" />
        </div>
        <div class="text flex_across">新增亲密度</div>
      </div>
      <!-- 别人 -->
      <div class="other_info">
        <div
          class="my_avatar flex_across"
          :class="mic_material.user_mic && 'equip_mic_style'"
          @click="$emit('bindUser')"
        >
          <!-- 头像框 -->
          <div class="avatar_border">
            <img :src="IconPath('mk4_21.png')" />
          </div>
          <PublicJson
            :jsonName="dialogType === 'photo' ? '' : mic_material.tuser_mic"
            :userAvatar="pair_info[1]?.profile_image"
          />
          <img
            v-if="dialogType === 'photo' && mic_material.tuser_mic"
            :src="
              IconPath(
                mic_material.tuser_mic === 'female520'
                  ? 'mk4_5.png'
                  : 'mk4_6.png'
              )
            "
          />
          <!-- 未绑定 -->
          <div class="empty_bgc" v-if="!pair_info[1]?.id">
            <img :src="IconPath('mk4_23.png')" class="empty_img" />
          </div>
        </div>
        <div class="my_name">
          <span>
            {{
              pair_info[1]
                ? character_omission(pair_info[1].username, 10)
                : '邀请好友绑定'
            }}
          </span>
          <img :src="IconPath('mk4_2.png')" />
        </div>
      </div>
    </div>
    <!-- 拍照按钮 -->
    <div
      class="photo_btn"
      :class="border_material && 'border_material_pho_btn'"
      @click="$emit('showPhoto')"
      data-html2canvas-ignore
    ></div>
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
      imgUrl: ''
    }
  },
  computed: {
    // 内容过长时，显示省略号
    character_omission() {
      return (text, length) => {
        const Text = text.toString()
        return Text.length > length ? Text.substring(0, length) + '...' : Text
      }
    },
    // 称号素材
    title_material() {
      return this.equip_info.hasOwnProperty(4)
        ? {
            user_title:
              this.select_info.uid_title_id == '4975' ? 'ch_yyrbs' : 'ch_zyrzl',
            tuser_title:
              this.select_info.tuid_title_id == '4975' ? 'ch_yyrbs' : 'ch_zyrzl'
          }
        : {}
    },
    // 头饰素材
    mic_material() {
      const mic_obj = {}
      if (this.equip_info.hasOwnProperty(3)) {
        mic_obj.user_mic = this.equip_info[3] == '18' ? 'female520' : 'male520'
        mic_obj.tuser_mic =
          this.select_info.tuid_mic_id == '18'
            ? 'female520'
            : this.select_info.tuid_mic_id == '17'
            ? 'male520'
            : ''
      }
      return mic_obj
    },
    // 自定义情话
    love_story_material() {
      return this.equip_info.hasOwnProperty(6)
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
      return this.equip_info.hasOwnProperty(5)
    },
    // 比翼双飞戒指素材
    ring_material() {
      return this.equip_info.hasOwnProperty(7)
    }
  },
  methods: {
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
// 生成图片样式调整
.picture_box_photo {
  padding-top: 145px !important;
  .border_material_icon {
    left: 0 !important;
    > img {
      width: 100% !important;
    }
  }
  .home_effect {
    transform: scale(0.9) !important;
    top: -49px !important;
    left: -3px !important;
    > img {
      width: 102% !important;
    }
  }
  .love_story {
    padding-top: 6px !important;
    top: 75px !important;
    left: 60px !important;
    > span {
      font-size: 12px !important;
    }
    > img {
      transform: scale(0.95) !important;
    }
  }
  .time_520 {
    transform: scale(0.9) !important;
    bottom: 85px !important;
  }
  .title_box {
    transform: scale(0.9) !important;
    right: -12px !important;
    bottom: 210px !important;
  }
  .user_box {
    transform: scale(0.9) !important;
    left: 15px !important;
    .my_name {
      transform: scale(1.1) !important;
      font-size: 13px !important;
    }
    .num_box {
      > span {
        position: relative;
        height: 16px !important;
        top: -2px;
      }
      .span_ios {
        top: -3px !important;
      }
    }
    .text {
      margin-top: -3px !important;
      margin-left: -5px !important;
      transform: scale(0.8) !important;
      letter-spacing: 4px;
    }
    .avatar_border {
      top: 53px !important;
      left: 55px !important;
    }
    .my_avatar {
      > img {
        z-index: 14 !important;
      }
    }
    .other_info {
      .avatar_border {
        left: 53px !important;
      }
    }
  }
}

// 边框素材的保存情书按钮位置
.border_material_pho_btn {
  bottom: 8px !important;
}
// 拍照盒子
.picture_box {
  position: relative;
  margin: -20px auto 5px;
  padding-top: 168px;
  width: 100%;
  height: 510px;
  overflow: hidden;
  color: #fff;
  // 边框素材
  .border_520 {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    > img {
      width: 100%;
    }
  }
  .border_material_icon {
    left: -35px;
    top: 0;
    > img {
      width: 110%;
      height: auto;
    }
  }
  // 主页特效
  .home_effect {
    position: absolute;
    z-index: 50;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    > img {
      width: 91%;
      margin-top: 26px;
      margin-left: 28px;
    }
  }
  // 浪漫惊喜模块的主页特效
  .home_effect_other {
    background-size: auto 90% !important;
    background-position: 31% 42% !important;
  }
  // 自定义情话素材
  .love_story {
    // transform: scale(0.9) !important;
    // top: 75px !important;
    // left: 60px !important;

    position: absolute;
    z-index: 11;
    top: 86px;
    left: 40px;
    min-width: 292px;
    height: 71px;
    padding-top: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
    text-shadow: -1px 0px 5px #dcabfd, 1px 0px 5px #dcabfd;
    > span {
      position: relative;
      z-index: 12;
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
    bottom: 45px;
    right: 30px;
    width: 73px;
    height: 118px;
    > img {
      width: 100%;
    }
  }
  // 称号
  .title_box {
    position: absolute;
    z-index: 12;
    bottom: 173px;
    width: 100%;
    display: flex;
    padding: 0 4px;
    justify-content: space-around;
    align-items: center;
    .love_title_lottie {
      width: 104px;
      height: 46px;
      &:nth-child(1) {
        margin-left: 8px;
      }
      &:nth-child(2) {
        margin-right: 12px;
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
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
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
        width: 97px;
        height: 96px;
        border-radius: 50%;
        ::v-deep .PublicJson {
          position: relative;
          z-index: 12;
          width: 85px;
          height: 85px;
          .micAvatar_img {
            width: 82px;
            height: 82px;
            background: #fff;
            padding: 2px;
            > img {
              border-radius: 50%;
            }
          }
        }
        > img {
          z-index: 13;
          position: absolute;
          width: 100%;
        }
        .empty_bgc {
          position: absolute;
          z-index: 12;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #8287d5;
          .empty_img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 39px !important;
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
        margin-top: 5px;
        padding: 0 6px;
        width: 156px;
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        > span {
          position: relative;
          z-index: 12;
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 24px;
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
        width: 87px;
        height: 86px;
        border: none;
        background: none;
      }
    }
    // 亲密度
    .love_num {
      position: relative;
      left: -1px;
      z-index: 50;
      margin: -30px -27px 0 -25px;
      width: fit-content;
      height: 55px;
      // 亲密度值
      .num_box {
        position: relative;
        margin-top: 40px;
        width: 70px;
        height: 14px;
        padding: 0 6px;
        font-size: 12px;
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
          height: 100%;
        }
      }
      // 新增请密度文本
      .text {
        font-size: 12px;
        font-weight: 500;
        color: #f3fcff;
        transform: scale(0.8);
      }
      // 比翼双飞戒指
      .ring_box {
        position: absolute;
        top: -19px;
        left: 4px;
        width: 64px;
        height: 64px;
        > img {
          position: relative;
          top: 1px;
          width: 64px;
        }
      }
      // 爱心图标
      .love_icon {
        position: absolute;
        z-index: 11;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 39px;
        height: 35px;
        > img {
          width: 100%;
        }
      }
    }
    .equip_mic_style {
      ::v-deep .PublicJson {
        position: absolute !important;
        width: 102px !important;
        height: 103px !important;
      }
    }
  }
  // 拍照按钮
  .photo_btn {
    position: absolute;
    z-index: 300;
    left: 115px;
    bottom: 0px;
    width: 142px;
    height: 139px;
    background: url('../../../assets/mk4_13.png') no-repeat center top/100% auto;
  }
}
</style>
