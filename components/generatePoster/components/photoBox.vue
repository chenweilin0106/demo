<template>
  <!--拍照盒子-->
  <div class="photoBox position-relative margin-row-center" ref="creditQrCodeShare">
    <!--背景-->
    <div class="backgroundMaterialClass w-100 h-100 position-absolute">
      <!--基础背景-->
      <img class="w-100 h-100" crossorigin="anonymous" :src="IconPath('mk4_3.png')" />
      <!--背景素材-->
      <!--<template v-else>-->
      <!--  <img class="w-100 h-100 bgMaterial-1" crossorigin="anonymous" :src="IconPath('mk4_5.png')" />-->
      <!--  <img v-if="!peoMaterial.length" crossorigin="anonymous" class="bgMaterial-2 position-absolute pointer-none position-row-center" :src="IconPath('mk4_6.png')" />-->
      <!--</template>-->
    </div>
    <!--人物素材-->
    <div v-if="equip_info[6]" class="peopleMaterialClass position-absolute pointer-none position-row-center">
      <img v-if="equip_info[6][0]=='s1'" class="position-absolute pointer-none w-100 h-100" crossorigin="anonymous" :src="IconPath('mk4_13.png')" />
      <img v-else class="position-absolute pointer-none w-100 h-100" crossorigin="anonymous" :src="IconPath('mk4_14.png')" />
    </div>
    <!--主页特效-->
    <!--<img v-if="costumeMaterial" crossorigin="anonymous" :src="IconPath('mk4_7.png')" class="costumeMaterialClass position-absolute pointer-none" />-->
    <!--时间素材-->
    <img v-if="equip_info[1]" class="timeMaterialClass position-absolute" crossorigin="anonymous" :src="IconPath('mk4_4.png')" />
    <!--边框素材-->
    <!--<template v-if="borderMaterial?.length">-->
    <!--  <img v-if="borderMaterial[0] == 's1'" class="borderMaterialClass position-absolute border-1 pointer-none" :src="IconPath('mk4_10.png')" />-->
    <!--  <img v-else class="borderMaterialClass position-absolute border-2 pointer-none" :src="IconPath('mk4_11.png')" />-->
    <!--</template>-->
    <!--用户信息-->
    <div class="userInfo position-relative flex justify-center">
      <!--自己-->
      <UserInfo :config="configUserInfo.owner" />
      <!--亲密度-->
      <div class="intimacyBox width-fit position-relative flex-column align-center">
        <!--戒指-->
        <div v-if="equip_info[7]" class="ringMaterialClass">
          <!--戒指动画-->
          <PublicImg v-if="!isPhoto()" :imgName="equipIdToNameMap['ring']" imgType="ring" class="ringAn" />
          <!--戒指图片-->
          <img v-else crossorigin="anonymous" class="ringImg position-relative" :src="IconPath(equipIconMap['ring'])" />
        </div>
        <!--爱心图标-->
        <img v-else class="love" crossorigin="anonymous" :src="IconPath('mk4_11.png')" />
        <div class="intimacyNum position-relative">
          <span class="flex align-center justify-center position-relative w-100 h-100 line-height-1">{{textLengthLimit(intimacy(),7)}}</span>
          <img class="position-absolute" crossorigin="anonymous" :src="IconPath('mk4_10.png')" />
        </div>
        <div class="intimacyText flex align-center justify-center line-height-1">新增{{pointName}}</div>
      </div>
      <!--别人-->
      <UserInfo :config="configUserInfo.friend" @bind="$emit('bind')" />
    </div>
    <!--自定义情话素材-->
    <div v-if="equip_info[4]" class="loveStoryMaterialClass position-row-center position-absolute" :class="config.currentDragEl.id==4&&'canDrag'">
      <img crossorigin="anonymous" :src="IconPath('mk4_12.png')" class="loveStoryBgi position-absolute" />
      <div class="textMain">{{config.my_words}}</div>
      <!--<img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    </div>
    <!--装饰素材-->
    <!--<template v-if="adornMaterial?.length">-->
    <!--  &lt;!&ndash;花&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s3')"-->
    <!--    class="adornMaterialClass adornMaterialClass-flower position-absolute"-->
    <!--    :class="config.currentDragEl.id == 's3' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_12.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--  &lt;!&ndash;鸽子&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s4')"-->
    <!--    class="adornMaterialClass adornMaterialClass-dove position-absolute"-->
    <!--    :class="config.currentDragEl.id == 's4' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_13.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--  &lt;!&ndash;纸鹤&ndash;&gt;-->
    <!--  <div-->
    <!--    v-if="adornMaterial.includes('s5')"-->
    <!--    class="adornMaterialClass adornMaterialClass-paperCrane position-absolute"-->
    <!--    :class="config.currentDragEl.id == 's5' && 'canDrag'"-->
    <!--  >-->
    <!--    <img class="w-100 h-100" :src="IconPath('mk4_14.png')" />-->
    <!--    <img :src="IconPath('mk4_22.png')" class="xMark position-absolute" @touchend.prevent.stop="closeDrag" />-->
    <!--  </div>-->
    <!--</template>-->
  </div>
</template>

<script>
import { imgAtError, textLengthLimit } from '@/utils/tool'
import html2canvas from 'html2canvas'
import UserInfo from './userInfo.vue'

export default {
  name: 'photoBox',
  props: ['config'],
  inject: ['equipIdToNameMap', 'equipIconMap', 'pointName', 'isPhoto', 'intimacy'],
  components: { UserInfo },
  data() {
    return {
      zIndex: 10,
      son: null,
      father: null,
      x: null,
      y: null
    }
  },
  computed: {
    equip_info() {
      return this.config.equip_info
    },
    configUserInfo() {
      const obj = { voiceMaterial: this.equip_info[2] }
      return {
        owner: { ...obj, userData: this.config.pair_info[0], titleName: this.equipIdToNameMap[this.equip_info[5]?.owner], micName: this.equipIdToNameMap[this.equip_info[3]?.owner] },
        friend: { ...obj, userData: this.config.pair_info[1], titleName: this.equipIdToNameMap[this.equip_info[5]?.friend], micName: this.equipIdToNameMap[this.equip_info[3]?.friend] }
      }
    }
    // 边框素材
    // borderMaterial() {
    //   return this.equip_info[6] || [] // n选1 多按钮 该数据时前端手动处理 index.vue中的processingData方法
    // }
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
      this.father = document.querySelector('.photoBox')
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
    // 结束拖拽 提供给父元素调用
    endDrag() {
      if (this.father) this.father.removeEventListener('touchmove', this.touchmove)
      if (this.son) {
        this.son.removeEventListener('touchstart', this.touchstart)
        this.son.removeEventListener('touchend', this.touchend)
        this.son = null
      }
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
    textLengthLimit,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.photoBox{
  width: 708px;
  height: 961px;
  padding-top: 475px;
  color: #fff;
  // 基础背景
  .backgroundMaterialClass{
    z-index: 1;
    top: 0;
    left: 0;
    //.bgMaterial-2{
    //  top: 81px;
    //  width: 507px;
    //  height: 477px;
    //}
  }
  /*人物素材*/
  .peopleMaterialClass{
    z-index: 1;
    top: 170px;
    width: 660px;
    height: 560px;
  }
  // 边框素材
  //.borderMaterialClass{
  //  z-index: 2;
  //}
  //.border-1{
  //  bottom: 10px;
  //  right: 0;
  //  width: 629px;
  //  height: 838px;
  //}
  //.border-2{
  //  bottom: 0;
  //  right: 0;
  //  width: 628px;
  //  height: 851px;
  //}
  // 自定义情话素材
  .loveStoryMaterialClass{
    z-index: 3;
    min-width: 570px;
    height: 145px;
    bottom: 58px;
    .loveStoryBgi{
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .textMain{
      position: relative;
      z-index: 2;
      font-weight: bold;
      font-size: 26px;
      padding: 56px 40px 0;
      color: #FA84D2;
      text-align: center;
      white-space: nowrap;
      line-height: 100%;
    }
    //.xMark{
    //  display: none;
    //  pointer-events: none;
    //}
    //&.canDrag{
    //  background-image: url('@/pages/520/assets/mk4_9_1.png');
    //}
  }
  // 时间素材
  .timeMaterialClass{
    z-index: 3;
    top: -13px;
    left: 3px;
    width: 400px;
    height: 311px;
  }
  /*主页特效素材*/
  //.costumeMaterialClass{
  //  z-index: 3;
  //  top: -6px;
  //  left: 2px;
  //  width: 740px;
  //  height: 579px;
  //}
  .userInfo{
    .intimacyBox{
      height: fit-content;
      z-index: 3;
      .ringMaterialClass{
        z-index: 1;
        width: 135px;
        height: 135px;
        margin-top: -16px;
        margin-bottom: -20px;
        .ringImg{
          min-width: 100%;
          max-width: 100%;
          min-height: 100%;
          max-height: 100%;
        }
      }
      .love{
        z-index: 1;
        min-width: 78px;
        max-width: 78px;
        min-height: 69px;
        max-height: 69px;
        margin-top: 21px;
        margin-bottom: 7px;
      }
      .intimacyNum{
        z-index: 2;
        width: 140px;
        height: 28px;
        padding: 0 12px;
        font-size: 24px;
        font-weight: 500;
        color: #FF6ACC;
        > span{
          z-index: 2;
        }
        > img{
          z-index: 1;
          top: 0;
          left: 0;
          width: 139px;
          height: 27px;
        }
      }
      .intimacyText{
        margin-top: 8px;
        font-weight: 500;
        font-size: 20px;
        color: #F75FA7; /*todo 亲密度/浪漫值字体颜色*/
        text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff; /*todo 字体阴影*/
      }
    }
  }
  // 装饰素材
  //.adornMaterialClass{
  //  z-index: 2;
  //  //border: 5px dashed transparent;
  //  .xMark{
  //    display: none;
  //    pointer-events: none;
  //  }
  //}
  //.adornMaterialClass-flower{
  //  top: 0;
  //  left: 0;
  //  width: 459px;
  //  height: 306px;
  //  &.canDrag{
  //    background-image: url('@/pages/520/assets/mk4_12_1.png');
  //  }
  //}
  //.adornMaterialClass-dove{
  //  top: 20px;
  //  left: 10px;
  //  width: 310px;
  //  height: 246px;
  //  &.canDrag{
  //    background-image: url('@/pages/520/assets/mk4_13_1.png');
  //  }
  //}
  //.adornMaterialClass-paperCrane{
  //  bottom: 95px;
  //  left: 50px;
  //  width: 292px;
  //  height: 186px;
  //  &.canDrag{
  //    background-image: url('@/pages/520/assets/mk4_14_1.png');
  //  }
  //}
  //.canDrag{
  //  //z-index: 10;
  //  background: no-repeat left top/100% 100%;
  //  .xMark{
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
