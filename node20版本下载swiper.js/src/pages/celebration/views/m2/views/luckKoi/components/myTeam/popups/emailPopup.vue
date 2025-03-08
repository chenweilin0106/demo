<template>
  <PopupBox title="mk1_title_12.png" size="2" @clickClose="clickClose">
    <p class="text-center">今日加入小队后不可退出，请谨慎选择<br>要加入的队伍</p>
    <div class="head flex line-height-100"><div class="head1">好友</div><div class="head2 line-height-100">状态</div></div>
    <div class="list overscroll-none margin-row-center overflow-x-hidden overflow-y-scroll">
      <div v-for="item in 20" :key="item" class="item flex align-center justify-between">
        <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar fit-cover radius-50" @click="toUserMain(item.uid)" @error="imgAtError" />
        <div class="username ellipsis line-height-100 flex-1">昵称昵称昵称八字</div>
        <PublicButton :hasRight="1" class="join">加入</PublicButton>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 609 + 278 - 274;
  >p {
    font-size: 28px;
    color: #FEFF90;
    line-height: 38px;
  }
  .head {
    margin-top: 33px - 5;
    margin-bottom: 10px;
    font-size: 24px;
    color: #FFFFFF;
    .head1 {
      margin-left: 186px;
    }
    .head2 {
      margin-left: 287px;
    }
  }
  .list {
    width: 597px;
    height: 596px + 110;
    .item {
      width: 597px;
      height: 110px;
      padding: 0 22px 0 40px;
      &:nth-child(odd) {
        background: rgba(102, 51, 219, 0.3);
      }
      .avatar {
        width: 80px;
        height: 80px;
        background: #FEFAEF;
        border: 4px solid #DBC1FF;
      }
      .username {
        margin-left: 11px;
        font-size: 26px;
        color: #FFFFFF;
      }
      .join {
        margin-left: 11px;
        width: 124px;
        height: 64px;
      }
    }
  }
}
</style>
