<template>
  <div class="PresentGift">
    <CpRewards :cpRewardsData="marriage_gift" @cpRewardsClick="cpRewardsClick" />
    <LimitDiscount />
    <GiftUpdate />
    <CumulativeSpendingList :consume_status="consume_status" :transitionClass="transitionClass" @clickCumulativeBtn="clickCumulativeBtn" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <!--<PresentGiftRank v-bind="presentGiftRankData" />-->
  </div>
</template>

<script>
import CongratsGetPopup from '@/pages/qiXi/components/congratsGetPopup.vue' // 恭喜获得弹窗
import GiftUpdate from '@/pages/qiXi/views/presentGift/components/giftUpdate.vue' // 礼物焕新
import LimitDiscount from '@/pages/qiXi/views/presentGift/components/limitDiscount.vue' // 限时折扣
import CpRewards from '@/pages/qiXi/views/presentGift/components/cpRewards.vue' // cp贺礼
import CumulativeSpendingList from '@/pages/qiXi/views/presentGift/components/cumulativeSpendingList' // 累计消费
import { getPageData } from '@/api/index'
import { _throttle } from '@/utils/tool'
export default {
  name: 'presentGift',
  components: { CongratsGetPopup, CpRewards, GiftUpdate, LimitDiscount, CumulativeSpendingList },
  data() {
    return {
      // my_present: 0,
      // my_profile_image: '',
      // my_send_present: 0,
      // my_username: '--',
      congratsGetPopupData: [],
      showCongratsGetPopup: false,
      user_gender: '0', // 性别
      user_icon: '', // 头像
      marriage_gift: {
        awards: [
          { icon: 'ts_zayh.svga', id: 0, name: '真爱永恒', nums: 3, text: '头饰+3天', type: 'mic' },
          { icon: 'yb_120_120.png', id: 'gamegold', name: '元宝', nums: 200000, text: '元宝+20万', type: 'property' }
        ],
        has_right: 0 // 按钮状态：0-不可领取，1-可以领取，2-已经领取
      }, // cp贺礼
      consume_status: {
        1000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 50000, text: '5万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 1000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        2000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 100000, text: '10万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 2000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        3000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 150000, text: '15万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 3000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        5000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 200000, text: '20万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 200, text: '200', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 5000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        10000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 400000, text: '40万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 500, text: '500', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 10000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        20000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 600000, text: '60万', tool_id: 'gamegold', type: 'property' },
            { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 1, text: '1', tool_id: 4, type: 'hero_tools' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 20000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        30000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 850000, text: '85万', tool_id: 'gamegold', type: 'property' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 30000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        },
        50000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 1300000, text: '130万', tool_id: 'gamegold', type: 'property' },
            { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 1, text: '1', tool_id: 4, type: 'hero_tools' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 2000, text: '2000', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 50000,
          consume_nums: 50000,
          has_right: 0,
          is_daily: true
        },
        100000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 2000000, text: '200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 2, text: '2', tool_id: 4, type: 'hero_tools' },
            { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 3000, text: '3000', tool_id: 4, type: 'hero_tools' }
          ],
          condition: 100000,
          consume_nums: 0,
          has_right: 0,
          is_daily: true
        }
      },
      // present_top: [
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 1000,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 800,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 600,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   }
      // ],
      // send_present_top: [
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 1000,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 800,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 600,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   },
      //   {
      //     profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      //     time: '--',
      //     tool_nums: 300,
      //     uid: '',
      //     username: '虚位以待'
      //   }
      // ],
      // uid: '0',
      transitionClass: 'noTransition'
    }
  },
  computed: {
    // presentGiftRankData() {
    //   return { my_send_present: this.my_send_present, my_present: this.my_present, present_top: this.present_top, send_present_top: this.send_present_top }
    // }
  },
  async created() {
    await this.getPageData()
    this.transitionClass = 'hasTransition'
  },
  methods: {
    cpRewardsClick: _throttle(async function() {
      if (this.marriage_gift.has_right != 1) return
      const res = await getPageData({ type: 'marriage_gift_receive' })
      if (res.errno) return this.$toast(res.errmsg)
      this.congratsGetPopupData = this.marriage_gift.awards
      this.showCongratsGetPopup = true
      this.marriage_gift.has_right = 2
    }, 1000),
    async clickCumulativeBtn(mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      if (!res.errno) this.consume_status[mark].has_right = 2
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm3' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>
