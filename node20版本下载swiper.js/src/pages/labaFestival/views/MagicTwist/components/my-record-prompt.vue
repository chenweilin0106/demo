<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_12.png')" />

      <div class="inner-bgc">
        <div
          v-if="list.length"
          class="scroll-list"
          ref="scrollList"
          @scroll="handleScroll"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="record-item"
            :class="index % 2 == 0 ? 'purple-bgc' : 'white-bgc'"
          >
            <div class="reward-text">
              获得<span v-if="+item.is_rate">稀有奖励</span
              ><span class="reward-detail">{{ item.remark }}</span>
            </div>
            <div class="reward-date">{{ item.create_time }}</div>
          </div>
          <div v-if="!pageData.hasMore" class="no-more">没有更多记录了</div>
        </div>
        <div v-else class="no-data">当前没有记录哦，先去扭蛋吧~</div>
      </div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="bottom-icon"></div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/labaFestival/api'

export default {
  props: {},
  data() {
    return {
      page: 1,
      isLoading: false,
      showPopup: false,
      list: []
    }
  },
  computed: {},
  methods: {
    resetData() {
      this.page = 1
      this.isLoading = false
      this.list = []
      this.pageData.hasMore = true
    },
    handleScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      console.log(scrollHeight, scrollTop, clientHeight)
      const threshold = 20 // 设置阈值为10px
      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        this.MagicEggRecordApi()
      }
    },
    clickClose() {
      this.$emit('close')
      this.resetData()
      document.querySelector('html').style.overflow = 'auto'
    },
    // 打开弹框
    async openPrompt() {
      document.querySelector('html').style.overflow = 'hidden'
      await this.MagicEggRecordApi()
      this.$nextTick(() => {
        if (this.$refs.scrollList) {
          this.$refs.scrollList.scrollTop = 0
        }
      })
    },
    // 扭蛋记录 page 页码
    async MagicEggRecordApi() {
      if (this.isLoading || this.pageData.hasMore == false) return
      this.isLoading = true
      const res = await getPageData({
        type: 'twisted_egg_record',
        mark: this.page
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.pageData = res.data
        this.list =
          this.page == 1
            ? this.pageData.list
            : this.list.concat(this.pageData.list)
        this.page++
        if (!this.showPopup) this.showPopup = true
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
  width: 626px;
  height: 576px;
  background-color: #eee1ff;
  border: 8px solid #c59ce8;
  padding: 4px;
  border-radius: 32px;
  pointer-events: auto;

  .title-image {
    width: 692px;
    height: 227px;
    position: absolute;
    top: -170px;
    left: -40px;
    pointer-events: none;
  }

  .left-icon {
    position: absolute;
    top: 76px;
    left: -42px;
    width: 99px;
    height: 252px;
    background: url('@/pages/labaFestival/assets/tk_1.png') no-repeat left
      top/100% 100%;
  }

  .right-icon {
    position: absolute;
    top: 94px;
    right: -38px;
    width: 87px;
    height: 251px;
    background: url('@/pages/labaFestival/assets/tk_2.png') no-repeat left
      top/100% 100%;
  }

  .bottom-icon {
    position: absolute;
    right: -16px;
    bottom: -20px;
    width: 224px;
    height: 50px;
    background: url('@/pages/labaFestival/assets/tk_3.png') no-repeat left
      top/100% 100%;
  }

  .inner-bgc {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #8360c3, #b75059);
    //overflow: hidden;
    border-radius: 20px;
    padding-bottom: 42px;
    padding-top: 71px;
  }
}

.scroll-list {
  margin: 0 auto;
  width: 555px;
  height: 436px;
  overflow-y: scroll;
  overflow-x: hidden;

  .record-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 124px;
    padding-left: 20px;

    .reward-text {
      width: fit-content;
      font-size: 28px;
      font-weight: 700;
      color: #712ba9;
      white-space: nowrap;
      margin-bottom: 18px;

      .reward-detail {
        margin-left: 5px;
        color: #df4c66;
      }
    }

    .reward-date {
      font-size: 24px;
      font-weight: 700;
      color: #712ba9;
    }
  }

  .no-more {
    font-size: 28px;
    color: #ffffff;
    width: fit-content;
    margin: 36px auto 0;
  }
}

.purple-bgc {
  background-color: #e0d0fd;
}

.white-bgc {
  background-color: #f5f0ff;
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #ffffff;
}
</style>
