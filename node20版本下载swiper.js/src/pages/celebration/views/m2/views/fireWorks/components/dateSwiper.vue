<template>
  <div class="dateSwiper">
    <div class="giftsTabs flex align-center">
      <div
        v-for="(card, index) in limit_gift"
        :key="index"
        class="tab position-relative flex-1 flex justify-center"
        :class="currentTimeIndex == index && 'tabActive'"
        @click="slideTo(index)"
      >
        <span class="timeName line-height-100">{{ card.time }}</span>
      </div>
    </div>
    <div class="giftsMain position-relative">
      <div class="swiper-container w-100 h-100">
        <div class="swiper-wrapper">
          <div v-for="(gift, index) in limit_gift" :key="index" class="swiper-slide flex-column align-center">
            <div class="awardContain w-100 flex-column align-center">
              <div class="awardIcon w-100 flex align-center justify-center"><img :src="IconPath(gift.award?.icon)" /></div>
              <div class="awardText flex align-center justify-center w-100 line-height-100 flex-1">{{ gift.award?.text }}</div>
            </div>
            <div class="timingAwardsButton flex align-center justify-center line-height-100" :class="'has_right_1'">{{ gift.time }}开启</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper' // 注意引入的是Swiper
import 'swiper/css/swiper.min.css' // Swiper样式
export default {
  name: 'dateSwiper',
  props: [''],
  components: {},
  data() {
    return {
      currentTimeIndex: 0, // 当前选中的时间点索引
      startIndex: 0, // 轮播图初始索引
      thresholds: [0, 8, 14, 21], // 时间阈值
      swiper: null, // swiper实例
      limit_gift: [
        { id: 1, time: '00:00', has_right: 1, award: { type: 'vip_coin', tool_id: 0, nums: 3, text: '会员币+3', icon: 'ljs_120_120.png' } },
        { id: 2, time: '8:00', has_right: 1, award: { type: 'tool', tool_id: 2, nums: 5, text: '绿晶石+5', icon: 'ljs_120_120.png' } },
        { id: 3, time: '14:00', has_right: 1, award: { type: 'property', tool_id: 'gamegold', nums: 50000, text: '元宝+5万', icon: 'yb_120_120.png' } },
        { id: 4, time: '21:00', has_right: 1, award: { type: 'vip_coin', tool_id: 0, nums: 3, text: '会员币+3', icon: 'ljs_120_120.png' } }
      ] // 限量好礼列表 has_right:1 时间未到 2 已领完 3 开会员 4 领取 5 已领取
    }
  },
  created() {
    this.currentTimeIndex = this.startIndex = this.getClosestTime(this.thresholds).index
    this.getSwiper(this.startIndex)
  },
  watch: {},
  computed: {},
  methods: {
    slideTo(index) {
      this.currentTimeIndex = index
      this.swiper.slideTo(index)
    },
    /**
     * @description:
     * @param {Object} { id, has_right } id:礼包id has_right:按钮状态
     * @return {*}
     */
    async clickTimingAwardsButton ({ id, has_right, award }) {
      // if (has_right == 3) return toVip(this.vip_level)
      // if (has_right != 4) return
      // const res = await receiveLimitGift(id)
      // this.$toast(res.errmsg)
      // if (res.errno) return
      // this.updateListData('limit_gift', 'id', id, 5)
      // if (award.type === 'vip_coin') this.vip_coin_num = res.data?.vip_coins
    },
    getSwiper(initialSlide) {
      this.$nextTick(() => {
        this.destroySwiper()
        const that = this
        this.swiper = new Swiper('.swiper-container', {
          initialSlide, // 使用新的初始索引值
          // 窗口变化,重新init,针对F11全屏和放大缩小,必须加
          observer: true,
          observeParents: true,
          on: {
            slideChangeTransitionEnd: function() {
              that.currentTimeIndex = this.activeIndex
            }
          }
        })
      })
    },
    /**
     * @description: 获取最接近的时间
     * @param {number[]} thresholds 时间阈值
     * @param {Boolean} crossDay 是否跨天
     * @return {{time:number, index:number}} 返回最接近的时间和索引
     */
    getClosestTime(thresholds, crossDay = false) {
      const now = new Date()
      const currentMinutes = now.getHours() * 60 + now.getMinutes()
      const closestTime = thresholds.reduce((prev, curr) => {
        const prevMinutes = prev * 60
        const currMinutes = curr * 60
        const prevDiff = crossDay ? Math.min(Math.abs(prevMinutes - currentMinutes), 1440 - Math.abs(prevMinutes - currentMinutes)) : Math.abs(prevMinutes - currentMinutes)
        const currDiff = crossDay ? Math.min(Math.abs(currMinutes - currentMinutes), 1440 - Math.abs(currMinutes - currentMinutes)) : Math.abs(currMinutes - currentMinutes)
        return currDiff < prevDiff ? curr : prev
      })
      return { time: closestTime, index: thresholds.indexOf(closestTime) }
    },
    destroySwiper() {
      if (this.swiper && this.swiper.destroy) {
        this.swiper.destroy() // 如果 Swiper 已经初始化，先销毁
      }
    }
  },
  beforeDestroy() {
    this.destroySwiper()
  }
}
</script>

<style lang="scss" scoped>
.dateSwiper {
  margin-left: 53px;
  width: 644px;
  .giftsTabs {
    margin-bottom: -4px;
    .tab {
      z-index: 3;
      height: 53px;
      font-weight: 500;
      font-size: 30px;
      color: #B082F5;
      background: url('@/pages/celebration/assets/mk5_19.png') no-repeat left top/100% 100%;
      .timeName {
        padding-top: 15px;
        height: fit-content;
      }
    }
    .tabActive {
      color: #fff;
      background-image: url('@/pages/celebration/assets/mk5_20.png');
    }
  }
  .giftsMain {
    z-index: 2;
    height: 306px;
    background: url('@/pages/celebration/assets/mk5_21.png') no-repeat left top/100% 100%;
    .swiper-container {
      .swiper-slide {
        padding-top: 30px;
      }
      .awardContain {
        width: 208px;
        height: 135px;
        padding: 4px;
        background-color: #DBC1FF;
        border-radius: 31px;
        .awardIcon {
          background-color: #fff;
          height: 88px;
          border-radius: 27px 27px 0 0;
          >img {
            height: 100%;
            width: auto;
          }
        }
        .awardText {
          border-radius: 0 0 27px 27px;
          font-size: 24px;
          color: #FFFFFF;
          background: #7954E4;
        }
      }
      .timingAwardsButton {
        margin-top: 23px;
        width: 308px;
        height: 95px;
        font-size: 32px;
        color: #FFFFFF;
        &.has_right_1 {
          background: url('@/pages/celebration/assets/mk7_6.png') no-repeat left top/100% 100%;
          &.noOpen {
            opacity: 0.7;
          }
        }
        &.has_right_2 {
          background: url('@/pages/celebration/assets/mk7_6_1.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
}
</style>
