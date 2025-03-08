<template>
  <!-- 拍照盒子 -->
  <div class="pictureBox position-relative margin-row-center" ref="creditQrCodeShare">
    <!--基础边框背景-->
    <div class="baseBackgroundImg w-100 h-100 position-absolute"><img class="w-100 h-100" :src="IconPath('mk4_2.png')" /></div>
    <!-- 时间素材 -->
    <div v-if="timeMaterial" class="timeMaterialClass position-absolute"><img class="w-100 h-100" :src="IconPath('mk4_8.png')" /></div>
    <!-- 边框素材 -->
    <template v-if="borderMaterial?.length">
      <img v-if="borderMaterial[0] == 's1'" class="borderMaterialClass position-absolute border-1 pointer-none" :src="IconPath('mk4_10.png')" />
      <img v-else class="borderMaterialClass position-absolute border-2 pointer-none" :src="IconPath('mk4_11.png')" />
    </template>
    <!-- 称号 -->
    <div class="titleMaterial flex align-center w-100 position-absolute">
      <div class="titleContain" v-if="titleMaterial.userTitleName">
        <!-- 称号 静态 -->
        <img v-if="readyPhoto" class="w-100" :src="IconPath(equipIconMap[titleMaterial.userTitleName])" />
        <!-- 称号 json -->
        <PublicImg v-else :img-name="titleMaterial.userTitleName" />
      </div>
      <div class="titleContain" v-if="titleMaterial.tuserTitleName">
        <!-- 称号 静态 -->
        <img v-if="readyPhoto" class="w-100" :src="IconPath(equipIconMap[titleMaterial.tuserTitleName])" />
        <!-- 称号 json -->
        <PublicImg v-else :img-name="titleMaterial.tuserTitleName" />
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo flex align-center position-relative">
      <!-- 自己 -->
      <div class="ownerInfo flex-column align-center justify-center">
        <div class="avatar flex align-center justify-center position-relative radius-50">
          <!-- 声波 -->
          <template v-if="voiceMaterial">
            <div v-if="!readyPhoto" class="voiceContainer position-absolute"><PublicImg :img-name="equipIdToNameMap['voice']" /></div>
            <!-- 静态声波 -->
            <img v-else :src="IconPath(equipIconMap[equipIdToNameMap['voice']])" class="voiceIcon position-absolute" />
          </template>
          <!-- 头饰 -->
          <PublicSvga :svgaName="readyPhoto ? '' : micMaterial.userMicName" :userAvatar="pair_info[0]?.profile_image" />
          <!-- 静态头饰 -->
          <img v-if="readyPhoto && micMaterial.userMicName" class="micIcon" :src="IconPath(equipIconMap[micMaterial.userMicName])" />
        </div>
        <div v-if="pair_info[0]" class="userName position-relative flex align-center justify-center">
          <span class="position-relative ellipsis text-center">{{ character_omission(pair_info[0].username, 10) }}</span>
          <img class="position-absolute position-row-center" :src="IconPath('mk4_7.png')" />
        </div>
      </div>
      <!-- 亲密度 -->
      <div class="intimacyContain width-fit position-relative">
        <!-- 戒指 -->
        <div v-if="ringMaterial" class="ringContain position-absolute">
          <img v-if="readyPhoto" class="position-relative" :src="IconPath(equipIconMap['ring'])" />
          <PublicImg v-else :img-name="equipIdToNameMap['ring']" />
        </div>
        <!-- 爱心图标 -->
        <div v-else class="intimacyIcon position-absolute position-row-center"><img class="w-100 h-100" :src="IconPath('mk4_5.png')" /></div>
        <div class="intimacyNum position-relative">
          <span class="flex align-center justify-center position-relative w-100 h-100 line-height-100">{{ character_omission(intimacy, 7) }}</span>
          <img class="position-absolute" :src="IconPath('mk4_6.png')" />
        </div>
        <div class="intimacyText flex align-center justify-center line-height-100">心动值</div>
      </div>
      <!-- 别人 -->
      <div class="friendInfo flex-column align-center justify-center">
        <div class="avatar flex align-center justify-center position-relative radius-50">
          <template v-if="voiceMaterial">
            <div v-if="!readyPhoto" class="voiceContainer position-absolute"><PublicImg :img-name="equipIdToNameMap['voice']" /></div>
            <!-- 静态声波 -->
            <img v-else :src="IconPath(equipIconMap[equipIdToNameMap['voice']])" class="voiceIcon position-absolute" />
          </template>
          <!-- 头饰 -->
          <PublicSvga :svgaName="readyPhoto ? '' : micMaterial.tuserMicName" :userAvatar="pair_info[1]?.profile_image" />
          <!-- 静态头饰 -->
          <img v-if="readyPhoto && micMaterial.tuserMicName" class="micIcon" :src="IconPath(equipIconMap[micMaterial.tuserMicName])" />
          <!-- 未绑定 -->
          <div v-if="!pair_info[1]?.id" class="emptyContain position-absolute radius-50" @click.stop="$emit('bindUser')">
            <img :src="IconPath('mk4_4.png')" class="addIcon position-absolute" />
          </div>
        </div>
        <div class="userName position-relative flex align-center justify-center">
          <span class="position-relative ellipsis text-center">{{
            pair_info[1] && pair_info[1].username ? character_omission(pair_info[1].username, 10) : '邀请好友绑定'
          }}</span>
          <img class="position-absolute position-row-center" :src="IconPath('mk4_7.png')" />
        </div>
      </div>
    </div>
    <!-- 自定义情话素材 -->
    <div v-if="loveStoryMaterial && my_words" class="loveStoryMaterialClass position-absolute" :class="currentDragEl.id == 4 && 'canDrag'">
      <div class="loveStoryBgi position-absolute w-100 h-100">
        <span class="ellipsis text-center line-height-100">{{ my_words }}</span>
      </div>
      <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />
    </div>
    <!--装饰素材-->
    <template v-if="adornMaterial?.length">
      <!--花-->
      <div
        v-if="adornMaterial.includes('s3')"
        class="adornMaterialClass adornMaterialClass-flower position-absolute"
        :class="currentDragEl.id == 's3' && 'canDrag'"
      >
        <img class="w-100 h-100" :src="IconPath('mk4_12.png')" />
        <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />
      </div>
      <!--鸽子-->
      <div
        v-if="adornMaterial.includes('s4')"
        class="adornMaterialClass adornMaterialClass-dove position-absolute"
        :class="currentDragEl.id == 's4' && 'canDrag'"
      >
        <img class="w-100 h-100" :src="IconPath('mk4_13.png')" />
        <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />
      </div>
      <!--纸鹤-->
      <div
        v-if="adornMaterial.includes('s5')"
        class="adornMaterialClass adornMaterialClass-paperCrane position-absolute"
        :class="currentDragEl.id == 's5' && 'canDrag'"
      >
        <img class="w-100 h-100" :src="IconPath('mk4_14.png')" />
        <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />
      </div>
    </template>
  </div>
</template>

<script>
import PublicImg from '@/pages/520/components/publicImg.vue'
import PublicSvga from '../../../components/publicSvga'
import html2canvas from 'html2canvas' // canvas库

export default {
  name: 'photoBox',
  components: { PublicSvga, PublicImg },
  props: ['equipIdToNameMap', 'my_words', 'equip_info', 'tuser_quip_info', 'select_info', 'intimacy', 'pair_info', 'isPhoto', 'currentDragEl'],
  data() {
    return {
      zIndex: 10,
      son: null,
      father: null,
      x: null,
      y: null,
      equipIconMap: Object.freeze({
        ts_aqwy_01: 'mk4_23.png',
        ts_aqwy_02: 'mk4_24.png',
        ch_rl520_01: 'mk4_26.png',
        ch_rl520_02: 'mk4_27.png',
        ring: 'mk4_28.png',
        sb_tmbb: 'mk4_25.png'
      }) // 装扮name对应的素材静态图
    }
  },
  computed: {
    // 是否正在生成图片
    readyPhoto() {
      return this.isPhoto
    },
    // 称号素材
    titleMaterial() {
      const titleStatus = {}
      if (this.equip_info.hasOwnProperty(5)) {
        titleStatus.userTitleName = this.equipIdToNameMap[this.select_info.uid_title_id]
        titleStatus.tuserTitleName = this.equipIdToNameMap[this.select_info.tuid_title_id]
      }
      return titleStatus
    },
    // 头饰素材
    micMaterial() {
      const micStatus = {}
      if (this.equip_info.hasOwnProperty(3)) {
        micStatus.userMicName = this.equipIdToNameMap[this.select_info.uid_mic_id]
        micStatus.tuserMicName = this.equipIdToNameMap[this.select_info.tuid_mic_id]
      }
      return micStatus
    },
    // 自定义情话
    loveStoryMaterial() {
      return this.equip_info.hasOwnProperty(4)
    },
    // 声波
    voiceMaterial() {
      return this.equip_info.hasOwnProperty(2)
    },
    // 时间素材
    timeMaterial() {
      return this.equip_info.hasOwnProperty(1)
    },
    // 边框素材
    borderMaterial() {
      return this.equip_info[6]
    },
    // 戒指素材
    ringMaterial() {
      return this.equip_info.hasOwnProperty(8)
    },
    // 装饰素材
    adornMaterial() {
      return this.equip_info[7]
    }
  },
  methods: {
    touchmove(e) {
      e.preventDefault()
      e.stopPropagation()
      this.x = e.targetTouches[0].clientX - this.father.getBoundingClientRect().left
      this.y = e.targetTouches[0].clientY - this.father.getBoundingClientRect().top
      if (this.x <= this.son.offsetWidth / 2) {
        // console.log('不能超出左边')
        this.x = this.son.offsetWidth / 2
      }
      if (this.x >= this.father.offsetWidth - this.son.offsetWidth / 2) {
        // console.log('不能超出右边')
        this.x = this.father.offsetWidth - this.son.offsetWidth / 2
      }
      if (this.y <= this.son.offsetHeight / 2) {
        // console.log('不能超出顶部')
        this.y = this.son.offsetHeight / 2
      }
      if (this.y >= this.father.offsetHeight - this.son.offsetHeight / 2) {
        // console.log('不能超出底部')
        this.y = this.father.offsetHeight - this.son.offsetHeight / 2
      }
      this.son.style.left = this.x - this.son.offsetWidth / 2 + 'px'
      this.son.style.top = this.y - this.son.offsetHeight / 2 + 'px'
    },
    // 触摸事件开始
    touchstart(e) {
      e.preventDefault()
      e.stopPropagation()
      this.father = document.querySelector('.pictureBox')
      this.father.addEventListener('touchmove', this.touchmove)
    },
    // 触摸事件结束
    touchend(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    // 开始拖拽
    startDrag() {
      this.$nextTick(() => {
        this.son = document.querySelector('.canDrag')
        this.son.addEventListener('touchstart', this.touchstart)
        this.son.addEventListener('touchend', this.touchend)
        this.son.style.zIndex = this.zIndex
        this.zIndex++
      })
    },
    closeDrag() {
      this.$emit('closeDrag')
    },
    // 结束拖拽
    endDrag() {
      if (this.father) this.father.removeEventListener('touchmove', this.touchmove)
      if (this.son) {
        this.son.removeEventListener('touchstart', this.touchstart)
        this.son.removeEventListener('touchend', this.touchend)
        this.son = null
      }
    },
    character_omission(text, length) {
      const Text = text.toString()
      return Text.length > length ? Text.substring(0, length) + '...' : Text
    },
    // 生成图片
    async productImage() {
      this.$toast.loading({ duration: 0, message: '图片生成中...', forbidClick: true, closeOnClick: true })
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      const canvas = await html2canvas(this.$refs.creditQrCodeShare, {
        backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true // 支持图片跨域
      })
      this.$emit('productSuccess', canvas.toDataURL('image/png')) // toDataURL: 图片格式转成 base64
    }
  }
}
</script>

<style scoped lang="scss">
// 拍照盒子
.pictureBox {
  width: 743px;
  height: 1021px;
  padding-top: 314px;
  color: #fff;
  // 基础背景
  .baseBackgroundImg {
    z-index: 1;
    top: 0;
    left: 0;
    //width: 743px;
    //height: 1021px;
  }
  // 边框素材
  .borderMaterialClass {
    z-index: 2;
  }
  .border-1 {
    bottom: 10px;
    right: 0;
    width: 629px;
    height: 838px;
  }
  .border-2 {
    bottom: 0;
    right: 0;
    width: 628px;
    height: 851px;
  }
  // 主页特效
  .costumeMaterialClass {
    z-index: 3;
    left: 145px;
    top: 262px;
    width: 490px;
    height: 642px;
  }
  // 自定义情话素材
  .loveStoryMaterialClass {
    z-index: 3;
    left: 20px;
    bottom: 255px;
    width: 678px;
    height: 141px;
    .loveStoryBgi {
      background: url('@/pages/520/assets/mk4_9.png') no-repeat left top/100% 100%;
      font-weight: 500;
      font-size: 26px;
      color: #f579ae;
      padding-left: 140px;
      padding-right: 40px;
      padding-top: 50px;
      > span {
        display: block;
        width: 100%;
      }
    }
    .xMark {
      display: none;
      pointer-events: none;
    }
    &.canDrag {
      background-image: url('@/pages/520/assets/mk4_9_1.png');
    }
  }
  // 时间素材
  .timeMaterialClass {
    z-index: 3;
    top: 55px;
    right: 40px;
    width: 235px;
    height: 166px;
  }
  // 称号素材
  .titleMaterial {
    z-index: 3;
    bottom: 400px;
    padding-left: 118px;
    .titleContain {
      width: 208px;
      height: 96px;
      &:first-child {
        margin-right: 128px;
      }
    }
  }
  // 用户盒子
  .userInfo {
    margin-left: 97px;
    z-index: 3;
    .ownerInfo,
    .friendInfo {
      .avatar {
        width: 128px;
        height: 128px;
        padding: 4px;
        background-color: #fff;
        margin-bottom: 16px;
        .voiceContainer {
          top: -39px;
          width: 205px;
          //height: 205px;
        }
        .voiceIcon {
          margin-top: 5px;
          width: 205px;
          height: auto;
        }
        ::v-deep .PublicSvga {
          position: absolute;
          z-index: 2;
          width: 165px;
          height: 164px;
          .micAvatar_img {
            width: 120px;
            height: 120px;
          }
        }
        // 头饰静态图片
        .micIcon {
          z-index: 13;
          position: absolute;
          width: 165px;
          height: auto;
        }
        .emptyContain {
          z-index: 2;
          width: 120px;
          height: 120px;
          background-color: #a7aabd;
          .addIcon {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
          }
        }
        // 头像框
        //.avatarBorder {
        //  z-index: 1;
        //  top: 50%;
        //  left: 50%;
        //  transform: translate(-50%, -50%);
        //}
      }
      .userName {
        padding: 0 12px;
        width: 247px;
        height: 76px;
        > span {
          z-index: 2;
          font-weight: 500;
          font-size: 25px;
          color: #ffffff;
        }
        > img {
          z-index: 1;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    // 亲密度
    .intimacyContain {
      z-index: 3;
      margin: -40px -25px 0;
      height: 110px;
      // 亲密度值
      .intimacyNum {
        z-index: 2;
        margin-top: 60px;
        width: 140px;
        height: 28px;
        padding: 0 12px;
        font-size: 24px;
        font-weight: 500;
        color: #f56dc6;
        > span {
          z-index: 2;
        }
        > img {
          z-index: 1;
          top: 0;
          left: 0;
          width: 139px;
          height: 27px;
        }
      }
      .intimacyText {
        margin-top: 7px;
        font-size: 20px;
        font-weight: 500;
        color: #f3fcff;
      }
      // 戒指
      .ringContain {
        z-index: 1;
        top: -50px;
        left: 8px;
        width: 128px;
        height: 128px;
        > img {
          top: 2px;
          width: 128px;
        }
      }
      // 爱心图标
      .intimacyIcon {
        z-index: 1;
        top: -20px;
        width: 78px;
        height: 70px;
      }
    }
  }
  // 装饰素材
  .adornMaterialClass {
    z-index: 2;
    //border: 5px dashed transparent;
    .xMark {
      display: none;
      pointer-events: none;
    }
  }
  .adornMaterialClass-flower {
    top: 0;
    left: 0;
    width: 459px;
    height: 306px;
    &.canDrag {
      background-image: url('@/pages/520/assets/mk4_12_1.png');
    }
  }
  .adornMaterialClass-dove {
    top: 20px;
    left: 10px;
    width: 310px;
    height: 246px;
    &.canDrag {
      background-image: url('@/pages/520/assets/mk4_13_1.png');
    }
  }
  .adornMaterialClass-paperCrane {
    bottom: 95px;
    left: 50px;
    width: 292px;
    height: 186px;
    &.canDrag {
      background-image: url('@/pages/520/assets/mk4_14_1.png');
    }
  }
  .canDrag {
    //z-index: 10;
    background: no-repeat left top/100% 100%;
    .xMark {
      display: block;
      z-index: 2;
      top: -23px;
      right: -23px;
      width: 47px;
      height: 47px;
      pointer-events: auto;
    }
  }
}
</style>
