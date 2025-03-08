<template>
  <PopupBox title="mk2_title_3.png" @clickClose="clickClose">
    <template v-if="true">
      <div class="usersList flex flex-wrap overscroll-none overflow-y-scroll overflow-x-hidden">
        <div v-for="item in 20" :key="item" class="user flex align-center line-height-100">
          <span class="flex-1">sdfgd4768fs</span>
          <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar" @error="imgAtError" @click="toUserMain(item.uid)" />
        </div>
      </div>
    </template>
    <div v-else class="noData line-height-100 h-100 flex align-center justify-center">暂无幸运号码</div>
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
  height: 255px + 330 + 278 - 274;
}
.usersList {
  padding: 9px 49px 30px 40px;
  height: 483 + 102 + 40 + 11px;
  align-content: start;
  .user {
    padding-left: 32px;
    width: 262px;
    height: 60px;
    background: rgba(102, 51, 219, 0.3);
    border-radius: 51px;
    margin-bottom: 28px;
    font-weight: 500;
    font-size: 25px;
    color: #FFFFFF;
    &:nth-child(2n) {
      margin-left: 30px;
    }
    .avatar {
      width: 74px;
      height: 74px;
      border: 4px solid #B09EFF;
      border-radius: 50%;
      background: #FFFFFF;
      margin-right: -12px;
    }
  }
}
.noData {
  font-size: 30px;
  color: #FFFFFF;
}
</style>
