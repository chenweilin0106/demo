<template>
  <PopupBox title="mk2_title_3.png" @clickClose="clickClose">
    <template v-if="false">
      <p class="flex justify-center line-height-100">快去召唤家族成员来砍价吧~</p>
      <div class="usersList flex flex-wrap overscroll-none">
        <div v-for="item in 20" :key="item" class="user flex align-center line-height-100">
          <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar" @error="imgAtError" @click="toUserMain(item.uid)" />
          <span class="flex-1 ellipsis">昵称昵称昵称123123</span>
        </div>
      </div>
    </template>
    <div v-else class="noData line-height-100 h-100 flex align-center justify-center">空空如也</div>
  </PopupBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
export default {
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 461 + 278 - 274;
}
.usersList {
  margin-top: 26px;
  padding: 0 38px;
  height: 483 + 102 + 40 + 11px;
  align-content: start;
  .user {
    padding: 9px;
    width: 271px;
    height: 102px;
    background: rgba(102, 51, 219, 0.3);
    border-radius: 51px;
    margin-bottom: 13px;
    font-weight: 500;
    font-size: 25px;
    color: #FFFFFF;
    &:nth-child(2n) {
      margin-left: 30px;
    }
    .avatar {
      width: 88px;
      height: 88px;
      border: 4px solid #B09EFF;
      border-radius: 50%;
      background: #FFFFFF;
      margin-right: 4px;
    }
  }
}
.noData {
  font-size: 30px;
  color: #FFFFFF;
}
</style>
