<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_20.png')" />
      <div class="inner-content">
        <div class="main-content">
          <template v-if="list.length">
            <div class="tip flex-center">点击可查看详情</div>
            <div
              ref="redPackedList"
              class="redPacket-list"
              @scroll="handleScroll"
            >
              <div v-for="item in list" :key="item.id" class="redPacket">
                <div class="avatar">
                  <img
                    :src="IconPath(item.head)"
                    @click="chooseRedPacket(item)"
                  />
                  <!-- 已领取 red 已过期 grey -->
                  <div
                    v-if="item.status != 1"
                    :class="['label', 'flex-center', labelIcon(item.status)]"
                  ></div>
                </div>
                <p class="text-hidden">{{ item.username }}</p>
              </div>
            </div>
          </template>
          <div v-else class="no-data flex-center">暂无拜年礼包</div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
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
      showPopup: false,
      page: 1,
      isLoading: false,
      list: [],
      hasMore: true
    }
  },
  methods: {
    async chooseRedPacket({ status, id }) {
      // if (status == 1) {
      const res = await getPageData({
        type: 'new_year_red_pack_change',
        mark: id
      })
      if (res.errno) return this.$toast(res.errmsg)
      this.$emit('chooseRedPacket', res.data)
      this.showPopup = false
      // }
    },
    filterList() {
      return this.list.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      )
    },
    labelIcon(status) {
      return status == 0 ? 'grey' : 'red'
    },
    handleScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      if (scrollHeight - scrollTop <= clientHeight + 20) {
        this.receiveRedPacketList()
      }
    },
    // 打开弹框
    openPrompt() {
      this.receiveRedPacketList()
    },
    // 请求成功 弹框关闭情况下：打开弹框，锁定背景，弹框内滚动列表回滚到顶部
    requestSuccess() {
      this.showPopup = true
      document.querySelector('html').style.overflow = 'hidden'
      this.$nextTick(() => {
        if (this.$refs.redPackedList) {
          this.$refs.redPackedList.scrollTop = 0
        }
      })
    },
    // 重置参数
    resetData() {
      this.page = 1
      this.isLoading = false
      this.list = []
      this.hasMore = true
    },
    clickClose() {
      this.$emit('close')
      this.resetData()
      document.querySelector('html').style.overflow = 'auto'
    },
    async receiveRedPacketList() {
      if (this.isLoading || this.hasMore == false) return
      this.isLoading = true
      const res = await getPageData({
        type: 'new_year_red_pack_all',
        mark: this.page
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list =
          this.page == 1 ? res.data.list : this.list.concat(res.data.list)
        // 手动去重 可能用户下拉的过程中 有新的数据产生 导致排序错乱 这里手动去重 第一页不可能重复
        if (this.page != 1) this.list = this.filterList()
        this.page++
        this.hasMore = res.data.has_more
        if (!this.showPopup) this.requestSuccess()
      }
      this.isLoading = false
    }
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
  height: 778px;
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
      padding-top: 45px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 5;
      bottom: -36px;
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
    top: -139px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.tip {
  margin: 0 auto 11px;
  width: 300px;
  height: 41px;
  background: #c33d19;
  border-radius: 21px;
  font-size: 24px;
  color: #ffffff;
}

.redPacket-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 650px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 30px;

  .redPacket {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 28px;
    margin-left: 47px;
    width: fit-content;
    min-width: 124px;
    max-width: 124px;
    height: fit-content;

    .avatar {
      position: relative;
      width: fit-content;

      > img {
        width: 124px;
        height: 124px;
        background: #ffffff;
        border: 4px solid #d14514;
        border-radius: 50%;
        object-fit: cover;
      }

      .label {
        position: absolute;
        right: -18px;
        bottom: -5px;
        width: 87px;
        height: 37px;
        pointer-events: none;
      }

      .red {
        background: url('@/pages/springFestival/assets/tk_28.png') no-repeat
          left top/100% 100%;
      }

      .grey {
        background: url('@/pages/springFestival/assets/tk_29.png') no-repeat
          left top/100% 100%;
      }
    }

    p {
      max-width: 148px;
      width: fit-content;
      margin-top: 8px;
      font-size: 24px;
      color: #ffffff;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(3n + 2) {
      /* 样式规则 */
      margin-left: 69px;
    }

    /* 选择第3，6，9等元素 */
    &:nth-child(3n) {
      /* 样式规则 */
      margin-left: 69px;
    }

    //&:nth-child(1) {
    //  /* 样式规则 */
    //  margin-left: 0;
    //}
  }
}

.no-data {
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #ffffff;
}
</style>
