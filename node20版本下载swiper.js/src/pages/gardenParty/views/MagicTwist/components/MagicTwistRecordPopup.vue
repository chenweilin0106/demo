<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose">
      <div class="popup-content">
        <!--标题图片-->
        <img class="title-image position-absolute position-row-center" :src="IconPath('title_10.png')" />
        <template v-if="list.length">
          <div class="scroll-list" ref="scrollList" @scroll="handleScroll">
            <div v-for="(item, index) in list" :key="index" class="record-item" :class="index % 2 == 0 ? 'purple-bgc' : 'white-bgc'">
              <div class="reward-text">
                获得<span v-if="+item.is_rate">稀有奖励</span><span class="reward-detail">{{ item.remark }}</span>
              </div>
              <div class="reward-date">{{ item.create_time }}</div>
            </div>
            <div v-if="showHasMore && !hasMore" class="no-more">没有更多记录了</div>
          </div>
        </template>
        <div v-else class="noData flex align-center justify-center">当前没有记录哦，先去扭蛋吧~</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getPageData } from '@/pages/gardenParty/api'

export default {
  props: {},
  data() {
    return {
      page: 1,
      isLoading: false,
      list: [
        // { remark: 'ljs_120_120.png', create_time: '20240325' },
        // { remark: 'ljs_120_120.png', create_time: '20240325' },
        // { remark: 'ljs_120_120.png', create_time: '20240325' },
        // { remark: 'ljs_120_120.png', create_time: '20240325' },
        // { remark: 'ljs_120_120.png', create_time: '20240325' }
      ],
      hasMore: true,
      showHasMore: false
    }
  },
  computed: {},
  created() {
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('body').style.overflow = 'hidden'
    this.getMagicTwistRecordPopupData()
  },
  methods: {
    handleScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      if (clientHeight + scrollTop >= scrollHeight - 100) {
        this.getMagicTwistRecordPopupData()
        this.showHasMore = true
      } else {
        this.showHasMore = false
      }
    },
    clickClose() {
      this.$emit('close')
      document.querySelector('html').style.overflow = 'auto'
      document.querySelector('body').style.overflow = 'auto'
    },
    // 扭蛋记录 page 页码
    async getMagicTwistRecordPopupData() {
      if (this.isLoading || this.hasMore == false) return
      this.isLoading = true
      const { errno, errmsg, data } = await getPageData({ type: 'twisted_egg_record', mark: this.page })
      if (errno) {
        this.$toast(errmsg)
      } else {
        const { hasMore, list } = data
        this.list = this.page == 1 ? list : this.list.concat(list)
        this.hasMore = hasMore
        this.page++
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .popup-content {
    position: relative;
    width: 643px;
    min-height: 550px;
    max-height: 606px;
    padding-top: 92px;
    border-image-source: url('@/pages/gardenParty/assets/tk_16.png');
    border-image-slice: 84 0 82 0 fill;
    border-image-width: 84px 0 82px 0;
    .title-image {
      width: 410px;
      height: 130px;
      z-index: 3;
      top: -65px;
    }
  }
}

.scroll-list {
  margin: 0 auto;
  width: 555px;
  height: 372px;
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
}
.no-more {
  font-size: 28px;
  color: #ffffff;
  width: fit-content;
  margin: 20px auto;
}

.purple-bgc {
  background-color: #e0d0fd;
}

.white-bgc {
  background-color: #f5f0ff;
}

.noData {
  margin-top: -92px;
  height: 550px;
  font-size: 28px;
  color: #ffffff;
}
</style>
