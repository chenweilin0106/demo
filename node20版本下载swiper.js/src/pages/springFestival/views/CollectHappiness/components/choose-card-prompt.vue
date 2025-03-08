<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_10.png')" />
      <div class="inner-content" @touchmove.prevent.stop>
        <div class="main-content">
          <div class="send-card-history" @click="openSendHistory">
            查看赠卡记录
          </div>
          <div class="cards-list">
            <div class="row-1 flex-center">
              <div
                v-for="item in list.slice(0, 3)"
                :key="item.card_id"
                class="card"
              >
                <div class="card-icon">
                  <img
                    :src="
                      IconPath(
                        +item.num > 0
                          ? cardIcon[item.card_id].icon_1
                          : cardIcon[item.card_id].icon_2
                      )
                    "
                    class="icon"
                  />
                  <!-- 字体颜色 大于0 green 等于0 grey -->
                  <div class="card-label-num flex-center">
                    <!-- 超过999 显示999+ -->
                    <span
                      :class="[
                        'flex-center',
                        isMoreThanZero(item.num) ? 'green' : 'grey'
                      ]"
                      >{{ +item.num > 999 ? '999+' : item.num }}</span
                    >
                  </div>
                </div>
                <div
                  class="card-button"
                  :class="ButtonStyle('1', isMoreThanZero(item.num) ? 1 : 2)"
                  @click="sendFriend(item)"
                >
                  赠送好友
                </div>
              </div>
            </div>
            <div class="row-2 flex-center">
              <div
                v-for="item in list.slice(3)"
                :key="item.card_id"
                class="card"
              >
                <div class="card-icon">
                  <img
                    :src="
                      IconPath(
                        +item.num > 0
                          ? cardIcon[item.card_id].icon_1
                          : cardIcon[item.card_id].icon_2
                      )
                    "
                    class="icon"
                  />
                  <!-- 字体颜色 大于0 green 等于0 grey -->
                  <div class="card-label-num flex-center">
                    <!-- 超过999 显示999+ -->
                    <span
                      :class="[
                        'flex-center',
                        isMoreThanZero(item.num) ? 'green' : 'grey'
                      ]"
                      >{{ +item.num > 999 ? '999+' : item.num }}</span
                    >
                  </div>
                </div>
                <div
                  class="card-button"
                  :class="ButtonStyle('1', isMoreThanZero(item.num) ? 1 : 2)"
                  @click="sendFriend(item)"
                >
                  赠送好友
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
        <div class="tip">单日赠送和领取次数上限分别为3次</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/springFestival/api'
export default {
  props: {},
  data() {
    return {
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
      }),
      showPopup: false,
      list: [],
      sendNum: 0
    }
  },
  computed: {},
  methods: {
    // 是否大于0
    isMoreThanZero(num) {
      return +num > 0
    },
    /**
     * 赠卡记录按钮
     */
    openSendHistory() {
      this.showPopup = false
      this.$emit('sendHistory')
    },
    /**
     * 赠送好友按钮
     * 数量少于0 不可能赠送 return
     * 转发次数大于等于3 return this.$toast('今日转发次数已达到上限，请明天再来')
     * 可赠送 关闭选择福卡弹框 打开选择赠送好友弹框 传输福卡信息（福卡图标，福卡ID）
     */
    sendFriend(params) {
      if (+params.num <= 0) return
      if (+this.sendNum >= 3) {
        return this.$toast('今日赠送次数已达到上限，请明天再来')
      }
      this.showPopup = false
      params.icon = this.cardIcon[params.card_id].icon_1
      this.$emit('sendFriend', params)
    },
    clickClose() {
      this.$emit('close')
    },
    /**
     * 打开送卡弹框
     * 发送请求 const res = await cardListApi()
     * 请求错误 return this.$toast(res.errmsg)
     * 请求正常 保存数据 打开弹框 this.showPopup = true
     */
    async openPrompt() {
      const res = await getPageData({ type: 'new_year_card_list' })
      if (res.errno) return this.$toast(res.errmsg)
      this.list = res.data.list
      this.sendNum = res.data.send_num
      this.showPopup = true
    },
    cardListApi() {}
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
  width: 624px;
  height: 665px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
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
      padding-top: 104px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
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
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.send-card-history {
  position: absolute;
  top: 42px;
  right: -2px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 188px;
  height: 49px;
  background: #d7541b;
  border: 2px solid #ffa45b;
  border-radius: 25px 12px 0px 25px;
  font-size: 24px;
  font-weight: bold;
  color: #ffea80;
  white-space: nowrap;
}

.cards-list {
  margin-top: -15px;
  width: 100%;
  flex-wrap: nowrap;
  .card {
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-icon {
      position: relative;
      z-index: 1;
      margin-bottom: -9px;
      width: 205px;
      height: 203px;

      .icon {
        width: 100%;
        height: 100%;
      }

      .card-label-num {
        position: absolute;
        z-index: 2;
        top: 28px;
        right: 27px;
        min-width: 60px;

        span {
          position: absolute;
          top: 0;
          width: fit-content;
          min-width: 60px;
          height: 36px;
          padding: 0 10px;
          border-radius: 36px;
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          white-space: nowrap;
        }

        .green {
          background-color: #4ea490;
        }
        .grey {
          background-color: #bab19b;
        }
      }
    }

    .card-button {
      position: relative;
      z-index: 2;
      width: 156px;
      height: 58px;
      border-radius: 29px;
    }
  }

  .row-1 {
    flex-wrap: nowrap;
    .card:nth-of-type(2) {
      margin: 0 -9px;
    }
  }

  .row-2 {
    margin-top: 4px;
    .card:nth-of-type(2) {
      margin-left: -9px;
    }
  }
}

.tip {
  position: absolute;
  left: 50%;
  bottom: -85px;
  transform: translateX(-50%);
  font-size: 24px;
  color: #feda5d;
  white-space: nowrap;
  pointer-events: none;
}
</style>
