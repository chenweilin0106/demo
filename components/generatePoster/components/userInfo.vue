<template>
  <div class="userInfo flex-column align-center justify-center position-relative">
    <div class="avatarBox flex align-center justify-center position-relative radius-50">
      <!--声波-->
      <div v-if="config.voiceMaterial" class="voiceMaterial position-absolute position-center">
        <!--声波动画-->
        <PublicImg v-if="!isPhoto()" :imgName="equipIdToNameMap['voice']" class="voiceAn" imgType="voice" />
        <!--声波图片-->
        <img v-else :src="IconPath(equipIconMap[equipIdToNameMap['voice']])" class="voiceImg w-100" />
      </div>
      <!--未绑定-->
      <div v-if="!config.userData?.id" class="emptyContain position-absolute radius-50" @click.stop="$emit('bind')">
        <img :src="IconPath('mk4_5.png')" class="addIcon position-center position-absolute" />
      </div>
      <template v-else>
        <!--头像-->
        <img v-if="!config.micName||isPhoto()" :src="config.userData?.profile_image" class="avatar w-100 h-100 radius-50 fit-cover position-relative" @error="imgAtError" />
        <!--头饰-->
        <div v-if="config.micName" class="micMaterial position-absolute position-center">
          <!--头饰动画-->
          <PublicImg v-if="!isPhoto()" class="micAn" :imgName="config.micName" imgType="mic" :userAvatar="config.userData?.profile_image" />
          <!--静态图片-->
          <img v-else crossorigin="anonymous" class="micImg" :src="IconPath(equipIconMap[config.micName])" />
        </div>
      </template>
    </div>
    <!--昵称-->
    <div class="userName position-relative flex align-center justify-center">
      <p class="w-100 position-relative ellipsis text-center line-height-1">
        {{config.userData?.username?config.userData.username:'邀请好友绑定'}}
      </p>
      <img class="position-absolute position-row-center" :src="IconPath('mk4_9.png')" />
    </div>
    <!--称号-->
    <div v-if="config.titleName" class="titleMaterial">
      <!--称号动画-->
      <PublicImg v-if="!isPhoto()" class="titleAn" :imgName="config.titleName" imgType="title" />
      <!--称号图片-->
      <img v-else class="titleImg w-100" crossorigin="anonymous" :src="IconPath(equipIconMap[config.titleName])" />
    </div>
  </div>
</template>

<script>
import { imgAtError, textLengthLimit } from '@/utils/tool'

export default {
  name: 'userInfo',
  props: ['config'],
  inject: ['equipIdToNameMap', 'equipIconMap', 'isPhoto'],
  methods: { textLengthLimit, imgAtError }
}
</script>

<style lang="scss" scoped>
.userInfo{
  z-index: 1;
  .avatarBox {
    width: 128px;
    height: 128px;
    .voiceMaterial{
      z-index: 1;
      width: 177px;
      height: 177px;
      .voiceImg {
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
      }
    }
    .micMaterial{
      z-index: 3;
      width: 165px;
      height: 165px;
      .micImg {
        position: absolute;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
      }
    }
    .emptyContain,.avatar{
      z-index: 2;
      width: 128px;
      height: 128px;
    }
    .emptyContain {
      background-color: #7C79D7; /*todo 背景色*/
      border: 4px solid #fff; /*todo 边框色*/
      .addIcon {
        width: 60px;
        height: 60px;
      }
    }
    .avatar{
      background-color: #fff; /*todo 边框色*/
      border: 4px solid transparent;
    }
  }
  .userName {
    margin-top: 7px;
    padding: 0 12px;
    width: 247px;
    height: 76px;
    p {
      z-index: 2;
      font-weight: 500;
      font-size: 25px;
      color: #6D9DFF; /*todo 昵称字体颜色*/
    }
    > img {
      z-index: 1;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    }
  }
  .titleMaterial{
    margin-top: -9px;
    width: 210px;
    height: 96px;
    .titleImg{
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    }
  }
}
</style>
