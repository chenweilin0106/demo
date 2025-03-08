<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <OutBox class="rank-list">
      <div class="rank-tabs">
        <div
          v-for="item in rankText"
          :key="item"
          @click="rankMark = item"
          :class="[
            'rank-tab',
            'flex-center',
            { 'tab-active-1': rankMark == '赠送榜' && rankMark == item },
            { 'tab-active-2': rankMark == '获赠榜' && rankMark == item }
          ]"
        >
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻</div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
    </OutBox>
  </div>
</template>

<script>
import { getPageData } from '@/pages/sparParty/api'
import CumulativeSpendingList from './components/CumulativeSpendingList'
import PresentGiftRank from './components/PresentGiftRank'
export default {
  name: 'PresentGift',
  components: { PresentGiftRank, CumulativeSpendingList },
  data() {
    return {
      transitionClass: 'noTransition',
      rankText: Object.freeze(['赠送榜', '获赠榜']),
      rankMark: '赠送榜',
      my_present: 0,
      my_profile_image: '',
      my_send_present: 0,
      my_username: '--',
      consume_status: {
        1000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 50000,
              text: '5万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 100,
              text: '100',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 1000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        2000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 100000,
              text: '10万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 100,
              text: '100',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 2000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        3000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 150000,
              text: '15万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 100,
              text: '100',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 3000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        5000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 200000,
              text: '20万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 200,
              text: '200',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 5000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        10000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 400000,
              text: '40万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 500,
              text: '500',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 10000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        20000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 600000,
              text: '60万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              type: 'tool',
              name: '黄金藏宝图',
              id: 158,
              nums: 1,
              text: '1',
              icon: 'hjcbt_60_60.png'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 1000,
              text: '1000',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 20000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        30000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 850000,
              text: '85万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 1000,
              text: '1000',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 30000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        },
        50000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 1300000,
              text: '130万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              type: 'tool',
              name: '黄金藏宝图',
              id: 158,
              nums: 1,
              text: '1',
              icon: 'hjcbt_60_60.png'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 2000,
              text: '2000',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 50000,
          consume_nums: 50000,
          has_right: 0,
          is_daily: false
        },
        100000: {
          awards: [
            {
              icon: 'yb_120_120.png',
              name: '元宝',
              nums: 2000000,
              text: '200万',
              tool_id: 'gamegold',
              type: 'property'
            },
            {
              type: 'tool',
              name: '黄金藏宝图',
              id: 158,
              nums: 2,
              text: '2',
              icon: 'hjcbt_60_60.png'
            },
            {
              icon: 'fsjc_60_60.png',
              name: '精粹',
              nums: 3000,
              text: '3000',
              tool_id: 142,
              type: 'tool'
            }
          ],
          condition: 100000,
          consume_nums: 0,
          has_right: 0,
          is_daily: false
        }
      },
      present_top: [
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 1000,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 800,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 600,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        }
      ],
      send_present_top: [
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 1000,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 800,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 600,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        },
        {
          profile_image:
            'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
          time: '--',
          tool_nums: 300,
          uid: '',
          username: '虚位以待'
        }
      ],
      uid: '0'
    }
  },
  computed: {
    RankData() {
      return {
        rankList: this.rankMark === '赠送榜' ? this.send_present_top : this.present_top,
        userPresent: this.rankMark === '赠送榜' ? this.my_send_present : this.my_present
      }
    }
  },
  async created() {
    await this.getPageData()
    this.transitionClass = 'hasTransition'
  },
  methods: {
    async ClickCumulativeBtn(mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      if (!res.errno) (this.consume_status[mark].has_right = 2)
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm3' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  // margin-bottom: 1000px;
  // 获赠榜单-赠送榜单
  .rank-list {
    //height: 882px;
    .rank-tabs {
      position: absolute;
      top: -75px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      .rank-tab {
        position: relative;
        width: 338px;
        height: 80px;
        font-size: 32px;
        color: transparent;

        &:nth-of-type(1) {
          background: url('@/pages/sparParty/assets/mk3_5.png') no-repeat left
            top/100% 100%;
        }
        &:nth-of-type(2) {
          background: url('@/pages/sparParty/assets/mk3_4.png') no-repeat left
            top/100% 100%;
        }
      }
      .tab-active-1 {
        background: url('@/pages/sparParty/assets/mk3_3.png') no-repeat left
          top/100% 100% !important;
      }
      .tab-active-2 {
        background: url('@/pages/sparParty/assets/mk3_6.png') no-repeat left
          top/100% 100% !important;
      }
    }

    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 10px;
      // 我的道具数量
      .top_my_goods {
        font-size: 28px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 18px;
      }
    }
  }
}
</style>
