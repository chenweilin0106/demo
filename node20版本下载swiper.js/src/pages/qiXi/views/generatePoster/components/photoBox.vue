<template>
  <!-- 拍照盒子 -->
  <div class="pictureBox position-relative margin-row-center" ref="creditQrCodeShare">
    <!--背景-->
    <div class="baseBackgroundImg w-100 h-100 position-absolute">
      <!--基础背景-->
      <img v-if="!bgMaterial" crossorigin="anonymous" class="w-100 h-100" :src="IconPath('mk4_4.png')" />
      <!--背景素材-->
      <template v-else>
        <img class="w-100 h-100 bgMaterial-1" crossorigin="anonymous" :src="IconPath('mk4_5.png')" />
        <img v-if="!peoMaterial.length" crossorigin="anonymous" class="bgMaterial-2 position-absolute pointer-none position-row-center" :src="IconPath('mk4_6.png')" />
      </template>
    </div>
    <!--主页特效-->
    <img v-if="costumeMaterial" crossorigin="anonymous" :src="IconPath('mk4_7.png')" class="costumeMaterialClass position-absolute pointer-none" />
    <!-- 时间素材 -->
    <!--<div v-if="timeMaterial" class="timeMaterialClass position-absolute"><img class="w-100 h-100" :src="IconPath('mk4_8.png')" /></div>-->
    <!-- 边框素材 -->
    <!--<template v-if="borderMaterial?.length">-->
    <!--  <img v-if="borderMaterial[0] == 's1'" class="borderMaterialClass position-absolute border-1 pointer-none" :src="IconPath('mk4_10.png')" />-->
    <!--  <img v-else class="borderMaterialClass position-absolute border-2 pointer-none" :src="IconPath('mk4_11.png')" />-->
    <!--</template>-->
    <!-- 称号 -->
    <div class="titleMaterialClass flex align-center w-100 position-absolute">
      <div class="titleContain" v-if="titleMaterial.userTitleName">
        <!-- 称号 静态 -->
        <img v-if="isPhoto" class="w-100" crossorigin="anonymous" :src="IconPath(equipIconMap[titleMaterial.userTitleName])" />
        <!-- 称号 json -->
        <PublicImg v-else :img-name="titleMaterial.userTitleName" />
      </div>
      <div class="titleContain" v-if="titleMaterial.tuserTitleName">
        <!-- 称号 静态 -->
        <img v-if="isPhoto" crossorigin="anonymous" class="w-100" :src="IconPath(equipIconMap[titleMaterial.tuserTitleName])" />
        <!-- 称号 json -->
        <PublicImg v-else :img-name="titleMaterial.tuserTitleName" />
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo flex align-center position-relative">
      <!-- 自己 -->
      <div class="ownerInfo flex-column align-center justify-center">
        <div class="avatar flex align-center justify-center position-relative radius-50">
          <!--&lt;!&ndash; 声波 &ndash;&gt;-->
          <!--<template v-if="voiceMaterial">-->
          <!--  <div v-if="!isPhoto" class="voiceContainer position-absolute"><PublicImg :img-name="equipIdToNameMap['voice']" /></div>-->
          <!--  &lt;!&ndash; 静态声波 &ndash;&gt;-->
          <!--  <img v-else :src="IconPath(equipIconMap[equipIdToNameMap['voice']])" class="voiceIcon position-absolute" />-->
          <!--</template>-->
          <!--头像 没有添加头饰的情况下显示-->
          <img v-if="!micMaterial.userMicName || isPhoto" :src="pair_info[0]?.profile_image" class="avatarIcon w-100 h-100 radius-50 fit-cover" @error="imgAtError" />
          <!--头饰+头像 未拍照并且已添加头饰的情况下显示-->
          <PublicImg v-else-if="!isPhoto && micMaterial.userMicName" class="mic" :imgName="micMaterial.userMicName" imgType="mic" :userAvatar="pair_info[0]?.profile_image" />
          <!-- 静态头饰 静态头饰 拍照时替换动态头饰-->
          <img v-if="isPhoto && micMaterial.userMicName" crossorigin="anonymous" class="micIcon" :src="IconPath(equipIconMap[micMaterial.userMicName])" />
        </div>
        <div v-if="pair_info[0]" class="userName position-relative flex align-center justify-center">
          <span class="position-relative ellipsis text-center">{{ character_omission(pair_info[0].username, 10) }}</span>
          <img class="position-absolute position-row-center" :src="IconPath('mk4_11.png')" />
        </div>
      </div>
      <!-- 亲密度 -->
      <div class="intimacyContain width-fit position-relative">
        <!-- 戒指 -->
        <div v-if="ringMaterial" class="ringContain position-absolute">
          <img v-if="isPhoto" crossorigin="anonymous" class="position-relative" :src="IconPath(equipIconMap['ring'])" />
          <PublicImg v-else :img-name="equipIdToNameMap['ring']" />
        </div>
        <!-- 爱心图标 -->
        <div v-else class="intimacyIcon position-absolute position-row-center"><img class="w-100 h-100" :src="IconPath('mk4_13.png')" /></div>
        <div class="intimacyNum position-relative">
          <span class="flex align-center justify-center position-relative w-100 h-100 line-height-100">{{ character_omission(intimacy, 7) }}</span>
          <img class="position-absolute" :src="IconPath('mk4_12.png')" />
        </div>
        <!--todo 文本修改-->
        <div class="intimacyText flex align-center justify-center line-height-100">新增浪漫值</div>
      </div>
      <!-- 别人 -->
      <div class="friendInfo flex-column align-center justify-center">
        <div class="avatar flex align-center justify-center position-relative radius-50">
          <!--<template v-if="voiceMaterial">-->
          <!--  <div v-if="!isPhoto" class="voiceContainer position-absolute"><PublicImg :img-name="equipIdToNameMap['voice']" /></div>-->
          <!--  &lt;!&ndash; 静态声波 &ndash;&gt;-->
          <!--  <img v-else :src="IconPath(equipIconMap[equipIdToNameMap['voice']])" class="voiceIcon position-absolute" />-->
          <!--</template>-->
          <!-- 未绑定 -->
          <div v-if="!pair_info[1]?.id" class="emptyContain position-absolute radius-50" @click.stop="$emit('bindUser')">
            <img :src="IconPath('mk4_14.png')" class="addIcon position-absolute" />
          </div>
          <template v-else>
            <!--头像 没有添加头饰的情况下显示-->
            <img v-if="!micMaterial.tuserMicName || isPhoto" :src="pair_info[1]?.profile_image" class="avatarIcon w-100 h-100 radius-50 fit-cover" @error="imgAtError" />
            <!--头饰+头像 未拍照并且已添加头饰的情况下显示-->
            <PublicImg v-else-if="!isPhoto && micMaterial.tuserMicName" class="mic" :imgName="micMaterial.tuserMicName" imgType="mic" :userAvatar="pair_info[1]?.profile_image" />
            <!-- 静态头饰 静态头饰 拍照时替换动态头饰-->
            <img v-if="isPhoto && micMaterial.tuserMicName" crossorigin="anonymous" class="micIcon" :src="IconPath(equipIconMap[micMaterial.tuserMicName])" />
          </template>
        </div>
        <div class="userName position-relative flex align-center justify-center">
          <span class="position-relative ellipsis text-center">{{
            pair_info[1] && pair_info[1].username ? character_omission(pair_info[1].username, 10) : '邀请好友绑定'
          }}</span>
          <img class="position-absolute position-row-center" :src="IconPath('mk4_11.png')" />
        </div>
      </div>
    </div>
    <!-- 自定义情话素材 -->
    <div v-if="loveStoryMaterial && my_words" class="loveStoryMaterialClass position-row-center position-absolute" :class="currentDragEl.id == 4 && 'canDrag'">
      <img crossorigin="anonymous" :src="IconPath('mk4_10.png')" class="loveStoryBgi position-absolute" />
      <div class="textMain">{{ my_words }}</div>
      <!--<img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    </div>
    <!--人物素材-->
    <div v-if="peoMaterial.length" class="peopleMaterial position-absolute pointer-none position-row-center">
      <img v-if="peoMaterial[0] == 's1'" crossorigin="anonymous" class="position-absolute pointer-none w-100 h-100" :src="IconPath('mk4_8.png')" />
      <img v-else class="position-absolute pointer-none w-100 h-100" crossorigin="anonymous" :src="IconPath('mk4_9.png')" />
    </div>
    <!--装饰素材-->
    <!--<template v-if="adornMaterial?.length">-->
    <!--  &lt;!&ndash;花&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s3')"-->
    <!--    class="adornMaterialClass adornMaterialClass-flower position-absolute"-->
    <!--    :class="currentDragEl.id == 's3' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_12.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--  &lt;!&ndash;鸽子&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s4')"-->
    <!--    class="adornMaterialClass adornMaterialClass-dove position-absolute"-->
    <!--    :class="currentDragEl.id == 's4' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_13.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--  &lt;!&ndash;纸鹤&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s5')"-->
    <!--    class="adornMaterialClass adornMaterialClass-paperCrane position-absolute"-->
    <!--    :class="currentDragEl.id == 's5' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_14.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--</template>-->
  </div>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import html2canvas from 'html2canvas' // canvas库
export default {
  name: 'photoBox',
  props: ['my_words', 'equip_info', 'tuser_quip_info', 'select_info', 'intimacy', 'pair_info', 'isPhoto', 'currentDragEl'],
  inject: ['equipIdToNameMap'],
  data() {
    return {
      // zIndex: 10,
      // son: null,
      // father: null,
      // x: null,
      // y: null,
      equipIconMap: Object.freeze({
        'ts_gfsh_02.svga': 'mk4_21.png', // 头饰左 2024七夕活动头饰不需要2选1，所以只需要一个头饰即可
        // ts_aqwy_02: 'mk4_24.png', // 头饰右
        ch_yssa: 'mk4_22.png', // 称号左
        ch_says: 'mk4_23.png', // 称号右
        ring: 'mk4_24.png' // 戒指
        // sb_tmbb: 'mk4_25.png' // 声波
      }) // 装扮name对应的素材静态图
    }
  },
  computed: {
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
        // micStatus.userMicName = this.equipIdToNameMap[this.select_info.uid_mic_id]
        // micStatus.tuserMicName = this.equipIdToNameMap[this.select_info.tuid_mic_id]
        micStatus.userMicName = this.equipIdToNameMap[106] // 2024七夕活动头饰不需要2选1，所以这里写死头饰
        micStatus.tuserMicName = this.equipIdToNameMap[106] // 2024七夕活动头饰不需要2选1，所以这里写死头饰
      }
      return micStatus
    },
    // 人物素材
    peoMaterial() {
      return this.equip_info[6] || [] // n选1 多按钮 该数据时前端手动处理 index.vue中的processingData方法
    },
    // 自定义情话
    loveStoryMaterial() {
      return this.equip_info.hasOwnProperty(4)
    },
    // 声波
    // voiceMaterial() {
    //   return this.equip_info.hasOwnProperty(2)
    // },
    // 主页特效
    costumeMaterial() {
      return this.equip_info.hasOwnProperty(2)
    },
    // 时间素材
    // timeMaterial() {
    //   return this.equip_info.hasOwnProperty(1)
    // },
    // 背景素材
    bgMaterial() {
      return this.equip_info.hasOwnProperty(1)
    },
    // 边框素材
    // borderMaterial() {
    //   return this.equip_info[6] || [] // n选1 多按钮 该数据时前端手动处理 index.vue中的processingData方法
    // },
    // 人物素材
    peopleMaterial() {
      return this.equip_info[6]
    },
    // 戒指素材
    ringMaterial() {
      return this.equip_info.hasOwnProperty(7)
    }
    // 装饰素材
    // adornMaterial() {
    //   return this.equip_info[7]
    // }
  },
  methods: {
    // touchmove(e) {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   this.x = e.targetTouches[0].clientX - this.father.getBoundingClientRect().left
    //   this.y = e.targetTouches[0].clientY - this.father.getBoundingClientRect().top
    //   if (this.x <= this.son.offsetWidth / 2) {
    //     // console.log('不能超出左边')
    //     this.x = this.son.offsetWidth / 2
    //   }
    //   if (this.x >= this.father.offsetWidth - this.son.offsetWidth / 2) {
    //     // console.log('不能超出右边')
    //     this.x = this.father.offsetWidth - this.son.offsetWidth / 2
    //   }
    //   if (this.y <= this.son.offsetHeight / 2) {
    //     // console.log('不能超出顶部')
    //     this.y = this.son.offsetHeight / 2
    //   }
    //   if (this.y >= this.father.offsetHeight - this.son.offsetHeight / 2) {
    //     // console.log('不能超出底部')
    //     this.y = this.father.offsetHeight - this.son.offsetHeight / 2
    //   }
    //   this.son.style.left = this.x - this.son.offsetWidth / 2 + 'px'
    //   this.son.style.top = this.y - this.son.offsetHeight / 2 + 'px'
    // },
    // // 触摸事件开始
    // touchstart(e) {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   this.father = document.querySelector('.pictureBox')
    //   this.father.addEventListener('touchmove', this.touchmove)
    // },
    // // 触摸事件结束
    // touchend(e) {
    //   e.preventDefault()
    //   e.stopPropagation()
    // },
    // // 开始拖拽
    // startDrag() {
    //   this.$nextTick(() => {
    //     this.son = document.querySelector('.canDrag')
    //     this.son.addEventListener('touchstart', this.touchstart)
    //     this.son.addEventListener('touchend', this.touchend)
    //     this.son.style.zIndex = this.zIndex
    //     this.zIndex++
    //   })
    // },
    // closeDrag() {
    //   this.$emit('closeDrag')
    // },
    // // 结束拖拽
    // endDrag() {
    //   if (this.father) this.father.removeEventListener('touchmove', this.touchmove)
    //   if (this.son) {
    //     this.son.removeEventListener('touchstart', this.touchstart)
    //     this.son.removeEventListener('touchend', this.touchend)
    //     this.son = null
    //   }
    // },
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
    },
    imgAtError
  }
}
</script>

<style scoped lang="scss">
// 拍照盒子
.pictureBox {
  width: 750px;
  height: 959px;
  padding-top: 396px;
  color: #fff;
  // 基础背景
  .baseBackgroundImg {
    z-index: 1;
    top: 0;
    left: 0;
    .bgMaterial-2 {
      top: 81px;
      width: 507px;
      height: 477px;
    }
  }
  /*任务素材*/
  .peopleMaterial {
    z-index: 1;
    top: 81px;
    width: 507px;
    height: 477px;
  }
  // 边框素材
  //.borderMaterialClass {
  //  z-index: 2;
  //}
  //.border-1 {
  //  bottom: 10px;
  //  right: 0;
  //  width: 629px;
  //  height: 838px;
  //}
  //.border-2 {
  //  bottom: 0;
  //  right: 0;
  //  width: 628px;
  //  height: 851px;
  //}
  // 自定义情话素材
  .loveStoryMaterialClass {
    z-index: 3;
    min-width: 570px;
    height: 145px;
    bottom: 129px;
    .loveStoryBgi {
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .textMain {
      position: relative;
      z-index: 2;
      font-weight: bold;
      font-size: 26px;
      padding: 56px 40px 0;
      color: #c37dff;
      text-align: center;
      white-space: nowrap;
      line-height: 100%;
    }
    //.xMark {
    //  display: none;
    //  pointer-events: none;
    //}
    &.canDrag {
      background-image: url('@/pages/520/assets/mk4_9_1.png');
    }
  }
  // 时间素材
  //.timeMaterialClass {
  //  z-index: 3;
  //  top: 55px;
  //  right: 40px;
  //  width: 235px;
  //  height: 166px;
  //}
  /*主页特效素材*/
  .costumeMaterialClass {
    z-index: 3;
    top: -6px;
    left: 2px;
    width: 740px;
    height: 579px;
  }
  // 称号素材
  .titleMaterialClass {
    z-index: 3;
    bottom: 260px;
    padding-left: 89px;
    .titleContain {
      width: 208px;
      height: 96px;
      &:first-child {
        margin-right: 150px;
      }
    }
  }
  // 用户盒子
  .userInfo {
    margin-left: 80px;
    z-index: 3;
    .ownerInfo,
    .friendInfo {
      .avatar {
        width: 128px;
        height: 128px;
        padding: 4px;
        background-color: #fff;
        margin-bottom: 16px;
        //.voiceContainer {
        //  top: -39px;
        //  width: 205px;
        //  //height: 205px;
        //}
        //.voiceIcon {
        //  margin-top: 5px;
        //  width: 205px;
        //  height: auto;
        //}
        .mic {
          position: absolute;
          z-index: 2;
          width: 165px;
          height: 165px;
        }
        // 头饰静态图片
        .micIcon {
          position: absolute;
          display: block;
          z-index: 2;
          //width: 165px; /*2024七夕之前都是可以的，可能是库更改了，因为依赖重新下载过，也可能是什么东西影响了*/
          max-width: 165px; /*2024七夕的时候 生成的图片 pc上width设置无效，生成的图片看效果width被设置成了inherit;于是换成min-width*/
          min-width: 165px; /*2024七夕的时候 生成的图片 pc上width设置无效，生成的图片看效果width被设置成了inherit;于是换成min-width*/
          height: auto;
        }
        .emptyContain {
          z-index: 2;
          width: 120px;
          height: 120px;
          background-color: #6470C5; /*todo 未绑定加号背景色*/
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
          color: #6D9DFF; /*todo 昵称字体颜色*/
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
        font-weight: 500;
        font-size: 20px;
        color: #936DFF; /*todo 亲密度/浪漫值字体颜色*/
        text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff; /*todo 字体阴影*/
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
  //.adornMaterialClass {
  //  z-index: 2;
  //  //border: 5px dashed transparent;
  //  .xMark {
  //    display: none;
  //    pointer-events: none;
  //  }
  //}
  //.adornMaterialClass-flower {
  //  top: 0;
  //  left: 0;
  //  width: 459px;
  //  height: 306px;
  //  &.canDrag {
  //    background-image: url('@/pages/520/assets/mk4_12_1.png');
  //  }
  //}
  //.adornMaterialClass-dove {
  //  top: 20px;
  //  left: 10px;
  //  width: 310px;
  //  height: 246px;
  //  &.canDrag {
  //    background-image: url('@/pages/520/assets/mk4_13_1.png');
  //  }
  //}
  //.adornMaterialClass-paperCrane {
  //  bottom: 95px;
  //  left: 50px;
  //  width: 292px;
  //  height: 186px;
  //  &.canDrag {
  //    background-image: url('@/pages/520/assets/mk4_14_1.png');
  //  }
  //}
  //.canDrag {
  //  //z-index: 10;
  //  background: no-repeat left top/100% 100%;
  //  .xMark {
  //    display: block;
  //    z-index: 2;
  //    top: -23px;
  //    right: -23px;
  //    width: 47px;
  //    height: 47px;
  //    pointer-events: auto;
  //  }
  //}
}
</style>
