<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_15.png')" />
      <div class="inner-content">
        <div class="main-content">
          <div
            v-if="list.length"
            ref="receiveHistory"
            class="history-list"
            @scroll="handleScroll"
          >
            <!-- 偶数 #CB5623 奇数 #DB722D -->
            <div
              v-for="(item, index) in list"
              :key="index"
              class="history"
              :style="{
                backgroundColor: index % 2 == 0 ? '#CB5623' : '#DB722D'
              }"
            >
              <!-- 点击头像进入用户主页 -->
              <img
                :src="IconPath(item.head)"
                class="avatar"
                @click="toUserMain(item.uid)"
              />
              <div class="history-text flex-center">
                <span class="nick-name text-hidden">{{ item.username }}</span
                >赠送给你1张<img
                  :src="IconPath(cardIcon[item.card_id].icon_1)"
                  class="card-icon"
                />
              </div>
              <div
                class="button"
                :class="ButtonStyle('1', item.status == 0 ? 1 : 2)"
                @click="handleReceive(item, index)"
              >
                {{ ButtonText('1', item.status == 0 ? 1 : 2) }}
              </div>
            </div>
            <!--<div v-if="true" class="no-more">已经到底了~</div>-->
          </div>
          <div v-else class="no-data flex-center">暂无好友赠卡</div>
        </div>
        <div class="tip">单日赠送和领取次数上限分别为3次</div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/springFestival/api/index'
import { toUserMain } from '@/pages/springFestival/utils/toApp'

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
      page: 1,
      isLoading: false,
      list: [],
      hasMore: true
    }
  },
  methods: {
    /**
     * 领取按钮
     * 已领取 return
     * 次数大于等于3 return
     * 发送请求
     * 请求错误 return this.$toast(res.errmsg)
     * 请求正常 this.$toast(res.errmsg)
     * 更新数据
     * 按钮状态 福卡数量 领卡右上角label个数
     */
    async handleReceive({ id, status, card_id }, index) {
      if (status == 1) return
      const res = await getPageData({
        type: 'new_year_card_receive',
        'mark[sid]': id,
        'mark[card_id]': card_id
      })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.list[index].status = true
      this.$emit('update')
    },
    // 滚动回调
    handleScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      console.log(scrollHeight, scrollTop, clientHeight)
      if (scrollHeight - scrollTop <= clientHeight + 20) {
        this.receiveCardListApi()
      }
    },
    /**
     * 打开领卡弹框
     * 发送请求 const res = await receiveCardListApi()
     * 请求错误 return this.$toast(res.errmsg)
     * 请求正常 保存数据 打开弹框 this.showPopup = true
     * 数据更新
     * 领卡右上角label数字 >999 显示999+
     */
    openPrompt() {
      this.receiveCardListApi()
    },
    // 请求成功 弹框关闭情况下：打开弹框，锁定背景，弹框内滚动列表回滚到顶部
    requestSuccess() {
      this.showPopup = true
      document.querySelector('html').style.overflow = 'hidden'
      this.$nextTick(() => {
        if (this.$refs.receiveHistory) {
          this.$refs.receiveHistory.scrollTop = 0
        }
      })
    },
    clickClose() {
      this.$emit('close')
      this.resetData()
      document.querySelector('html').style.overflow = 'auto'
    },
    // 重置参数
    resetData() {
      this.page = 1
      this.isLoading = false
      this.list = []
      this.hasMore = true
    },
    // 领取福卡接口
    receiveCardApi() {},
    // 领取福卡列表接口
    async receiveCardListApi() {
      if (this.isLoading || this.hasMore == false) return
      this.isLoading = true
      const res = await getPageData({
        type: 'new_year_card_receive_list',
        mark: this.page
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list =
          this.page == 1 ? res.data.list : this.list.concat(res.data.list)
        this.hasMore = res.data.has_more
        this.page++
        if (!this.showPopup) this.requestSuccess()
      }
      this.isLoading = false
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
  height: 827px;
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
      border-radius: 52px;
      overflow: hidden;
      //padding-top: 58px;
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

.history-list {
  //height: 720px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 58px;
  padding-bottom: 30px;
  background-color: transparent;

  .history {
    position: relative;
    display: flex;
    align-items: center;
    height: 110px;

    .avatar {
      flex-shrink: 0;
      margin: 0 12px 0 13px;
      width: 70px;
      height: 70px;
      background: #ffffff;
      border-radius: 50%;
      object-fit: cover;
    }

    .history-text {
      font-size: 26px;
      white-space: nowrap;
      flex-wrap: nowrap;
      color: #fff;

      .nick-name {
        flex-shrink: 0;
        display: block;
        color: #ffea80;
        max-width: 160px;
        width: fit-content;
      }

      .card-icon {
        flex-shrink: 0;
        //margin: 0 -5px;
        width: 92px;
        height: 91px;
      }
    }

    .button {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%);
      width: 108px;
      height: 58px;
      border-radius: 29px;
      font-size: 26px;
    }
  }
}

.no-data {
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #ffffff;
}

.tip {
  position: absolute;
  left: 50%;
  bottom: -90px;
  transform: translateX(-50%);
  font-size: 24px;
  color: #feda5d;
  white-space: nowrap;
  pointer-events: none;
}
</style>
