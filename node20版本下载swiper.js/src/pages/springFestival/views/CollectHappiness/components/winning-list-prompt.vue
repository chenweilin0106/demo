<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_17.png')" />
      <div class="inner-content">
        <div class="main-content">
          <div v-if="Object.keys(list).length" class="list">
            <div v-for="(item, key) in list" :key="key" class="item">
              <div class="title flex-center">
                <img :src="IconPath('tk_11.png')" class="left-icon" />
                <div class="date">{{ key }}</div>
                <img :src="IconPath('tk_12.png')" class="right-icon" />
              </div>
              <div ref="detailsList" class="details-list flex-center">
                <div
                  v-for="(detail, index) in item"
                  :key="index"
                  class="detail"
                >
                  <!-- 点击头像跳转用户主页 -->
                  <img
                    :src="IconPath(detail.head)"
                    class="avatar"
                    @click="toUserMain(detail.uid)"
                  />
                  <div class="nick-name text-hidden">{{ detail.username }}</div>
                  <div class="reward-text flex-center">
                    <p>获得</p>
                    <p>{{ detail.money }}元红包</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data flex-center">
            <p>暂未开奖</p>
            <p>成功合成福卡，有机会获得大奖!</p>
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { toUserMain } from '@/pages/springFestival/utils/toApp'
import { getPageData } from '@/pages/springFestival/api'
export default {
  props: {},
  data() {
    return {
      showPopup: false,
      list: {}
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
      document.querySelector('html').style.overflow = 'auto'
    },
    /**
     * 打开大奖名单弹框
     * 发送请求 const res = await winningListApi()
     * 请求错误 return this.$toast(res.errmsg)
     * 请求正常 保存数据 打开弹框 this.showPopup = true
     */
    async openPrompt() {
      this.winningListApi()
    },
    async winningListApi() {
      const res = await getPageData({
        type: 'new_year_card_reward'
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list = res.data
        this.showPopup = true
        document.querySelector('html').style.overflow = 'hidden'
        this.$nextTick(() => {
          if (this.$refs.detailsList) {
            this.$refs.detailsList.scrollTop = 0
          }
        })
      }
    },
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 627px;
  height: 845px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    height: 100%;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;

    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      overflow: hidden;
      border-radius: 52px;
      //padding-top: 62px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 5;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      pointer-events: none;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .title-image {
    width: 598px;
    height: 188px;
    position: absolute;
    z-index: 5;
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.list {
  //height: 700px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 62px;

  .item {
    margin-bottom: 51px;
    .title {
      margin: 0 auto 14px;
      width: fit-content;
      .left-icon,
      .right-icon {
        width: 140px;
        height: 26px;
      }
      .date {
        margin: 0 31px;
        font-size: 26px;
        font-weight: 500;
        color: #ffffff;
      }
    }

    .details-list {
      flex-wrap: nowrap;
      .detail {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-left: 20px;
        .avatar {
          width: 98px;
          height: 98px;
          background: #ffffff;
          border: 4px solid #d14514;
          border-radius: 50%;
          object-fit: cover;
        }
        .nick-name {
          margin: 10px 0 8px;
          max-width: 128px;
          font-size: 20px;
          color: #ffffff;
        }
        .reward-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 130px;
          height: 60px;
          background: #c53c18;
          font-size: 20px;
          font-weight: 500;
          color: #ffed76;
          border-radius: 30px;
          white-space: nowrap;
          p {
            width: fit-content;
            &:nth-of-type(2) {
              margin-top: 2px;
            }
          }
        }

        &:nth-of-type(1) {
          margin: 0;
        }
      }
    }

    &:last-child {
      margin-bottom: 40px;
    }
  }
}

.no-data {
  margin-top: -62px;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #ffffff;
  line-height: 40px;
  white-space: nowrap;
}
</style>
