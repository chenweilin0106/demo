<template>
  <PopupBox title="mk1_title_13.png" size="2" @clickClose="clickClose">
    <div v-if="true" class="list flex-column align-center">
      <div v-for="item in 1" :key="item" class="item overflow-hidden">
        <div class="date line-height-100 margin-row-center">11月15日16:00轮次</div>
        <div class="users flex flex-wrap align-center justify-center">
          <div v-for="item in 7" :key="item" class="userInfo flex-shrink-0 flex-column align-center">
            <img :src="IconPath('https://cdn-image.dandan818.com/uploads/user/icon/201711/11351510221321.jpeg')" class="avatar" @error="imgAtError" @click="toUserMain(item)" />
            <div class="numBox flex align-center justify-center line-height-100"><i class="num ellipsis">123</i><img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noData flex align-center justify-center line-height-100">虚伪以待</div>
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
    imgAtError,
    toUserMain,
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  //height: 225px + 551 + 278;
  .main {
    max-height: 225px + 551 + 278 - 274;
  }
}
.list {
  .item {
    width: 563px;
    height: 389px;
    background: url('@/pages/celebration/assets/tk_13.png') no-repeat left top/100% 100%;
    margin-bottom: 17px;
    .date {
      margin-top: 15px;
      margin-bottom: 30px;
      font-weight: 800;
      font-size: 25px;
      color: transparent; /* 字体颜色透明 只保留描边 */
      width: fit-content;
      background: linear-gradient(-90deg, #C663FF 50%, #9B5EFF );
      -webkit-background-clip: text; /* 背景裁剪成字体 */
    }
    .users {
      height: 100%;
      //padding-top: 73px;
      align-content: start;
      .userInfo {
        margin: 0 12px 14px;
        .avatar {
          width: 98px;
          height: 98px;
          background: #FFFFFF;
          border-radius: 50%;
          border: 4px solid #B09EFF;
        }
        .numBox {
          width: 115px;
          height: 34px;
          font-weight: bold;
          font-size: 22px;
          color: #7B53FF;
          padding: 0 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 17px;
          margin-top: 6px;
          .num {
            max-width: 71px;
          }
          .diamond {
            width: 29px;
            height: auto;
          }
        }
      }
    }
  }
}
.noData {
  height: 717px - 274;
}
</style>
