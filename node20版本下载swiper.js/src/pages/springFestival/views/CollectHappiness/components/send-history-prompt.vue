<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_14.png')" />
      <div class="inner-content">
        <div class="main-content">
          <template v-if="list.length">
            <div class="list-head">
              <span class="title-1">赠送福卡</span>
              <span class="title-2">赠送对象</span>
              <span class="title-3">赠送时间</span>
            </div>
            <div ref="sendHistory" class="history-list">
              <!-- 偶数 #CB5623 奇数 #DB722D -->
              <div
                v-for="(item, index) in list"
                :key="index"
                class="history"
                :style="{
                  backgroundColor: index % 2 == 0 ? '#CB5623' : '#DB722D'
                }"
              >
                <img
                  :src="IconPath(cardIcon[item.card_id].icon_1)"
                  class="card-icon"
                />
                <!-- 点击头像进入用户主页 -->
                <img
                  :src="IconPath(item.head)"
                  class="avatar"
                  @click="toUserMain(item.tuid)"
                />
                <div class="date">{{ item.create_time }}</div>
              </div>
              <!--<div v-if="true" class="no-more">已经到底了~</div>-->
            </div>
          </template>
          <div v-else class="no-data flex-center">暂无赠卡记录</div>
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
      list: [],
      cardIcon: Object.freeze({
        1: {
          icon_1: 'mk4_2.png',
          icon_2: 'mk4_2_1.png'
        },
        2: {
          icon_1: 'mk4_3.png',
          icon_2: 'mk4_3_1.png'
        },
        3: {
          icon_1: 'mk4_4.png',
          icon_2: 'mk4_4_1.png'
        },
        4: {
          icon_1: 'mk4_5.png',
          icon_2: 'mk4_5_1.png'
        },
        5: {
          icon_1: 'mk4_6.png',
          icon_2: 'mk4_6_1.png'
        }
      })
    }
  },
  computed: {},
  methods: {
    // 打开弹框
    async openPrompt() {
      this.sendHistoryListApi()
    },
    clickClose() {
      this.$emit('close')
      document.querySelector('html').style.overflow = 'auto'
    },
    async sendHistoryListApi() {
      const res = await getPageData({
        type: 'new_year_card_send_list'
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list = res.data
        this.showPopup = true
        document.querySelector('html').style.overflow = 'hidden'
        this.$nextTick(() => {
          if (this.$refs.sendHistory) {
            this.$refs.sendHistory.scrollTop = 0
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
  height: 815px;
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
      padding-top: 44px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 5;
      bottom: -55px;
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
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.list-head {
  display: flex;
  align-items: center;
  font-size: 26px;
  color: #ffea80;
  margin-bottom: 14px;

  .title-1 {
    margin-left: 20px;
  }

  .title-2 {
    margin-left: 29px;
  }

  .title-3 {
    margin-left: 119px;
  }
}

.history-list {
  margin-top: 1px;
  height: 725px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 30px;
  background-color: transparent;

  //.no-more {
  //  margin: 0 auto 50px;
  //  width: fit-content;
  //  color: #fff;
  //  font-size: 24px;
  //}

  .history {
    position: relative;
    display: flex;
    align-items: center;
    height: 110px;

    .card-icon {
      margin-left: 25px;
      width: 92px;
      height: 91px;
    }

    .avatar {
      margin: 0 59px 0 51px;
      width: 74px;
      height: 74px;
      background: #ffffff;
      border-radius: 50%;
      object-fit: cover;
    }

    .date {
      font-size: 26px;
      color: #ffffff;
    }

    .label {
      position: absolute;
      top: 50%;
      right: 35px;
      transform: translateY(-50%);
      width: 72px;
      height: 34px;
    }
  }
}

.no-data {
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #ffffff;
}
</style>
