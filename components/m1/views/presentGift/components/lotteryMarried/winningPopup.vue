<template>
  <PopupBox title="mk1_title_13.png" @clickClose="clickClose">
    <div v-if="list.length" class="list flex-column align-center">
      <div v-for="item in list" :key="item.day" class="item">
        <div class="date margin-row-center line-height-1 flex justify-center">{{ item.day }}</div>
        <div class="scrollBox w-100 overflow-y-hidden overflow-x-scroll">
          <div class="users h-100 flex flex-wrap">
            <div v-for="(users, index) in item.list" :key="index" class="userInfo flex-shrink-0 flex-column align-center">
              <div class="avatars flex align-center">
                <img v-for="user in users" :key="user.uid" :src="user.profile_image" @error="imgAtError" @click="toUserMain(user.uid)" />
              </div>
              <div class="names flex align-center">
                <p v-for="user in users" :key="user.uid" class="ellipsis text-center">{{ user.username }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noData flex align-center justify-center line-height-1">虚位以待</div>
  </PopupBox>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  data() {
    return {
      list: [
        // {
        //   day: '11月03日',
        //   list: [
        //     [{ uid: '20011', profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg', username: '我是积13极' }, { uid: '20013', profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg', username: '20013' }],
        //     [{ uid: '20011', profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg', username: '我是积13极' }, { uid: '20013', profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg', username: '20013' }]
        //   ]
        // }
      ]
    }
  },
  async created() {
    const res = await getPageData({ type: 'seven_comm_cp_award_log' })
    if (res.errno) return this.$toast(res.errmsg)
    this.list = res.data
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    imgAtError,
    toUserMain
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  //height: 225px + 551 + 278;
  .main {
    max-height: 225px + 510 + 278 - 274;
  }
}
.list {
  .item {
    width: 563px;
    height: 362px;
    background: url('@/pages/springFestival/assets/tk_13.png') no-repeat left top/100% 100%;
    margin-bottom: 17px;
    overscroll-behavior-x: none;
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
    .scrollBox {
      .users {
        width: 895px;
        align-content: start;
        .userInfo {
          margin-left: 15px;
          margin-bottom: 15px;
          .avatars {
            >img {
              width: 82px;
              height: 82px;
              background: #FFFFFF;
              border-radius: 50%;
              border: 4px solid #B09EFF;
              &:last-child {
                margin-left: -6px;
              }
            }
          }
          .names {
            margin-top: 4px;
            >p {
              width: 73px;
              height: 31px;
              background: rgba(255,255,255,0.5);
              border-radius: 15px;
              font-weight: bold;
              font-size: 20px;
              color: #7B53FF;
              padding: 0 5px;
              line-height: 31px;
              text-align: center;
              &:last-child {
                margin-left: 1px;
              }
            }
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
