<template>
  <div class="moonCake">
    <Lottery v-bind="lotteryData" @lottery="lottery" />
    <OutBox title="title_7.png">
      <ExchangeItem v-for="item in 3" :key="item" v-bind="{ ...exchangeData, exchange_list: $data[`exchange_list${item}`], level: item }" @openPreviewPopup="showPreviewPopup = true" @exchange="exchange" @openConfirmPopup="openConfirmPopup" />
    </OutBox>
    <ConfirmPopup v-if="showConfirmPopup" v-bind="confirmPopupData" @confirm="exchange" @clickClose="showConfirmPopup = false" />
    <PreviewPopup v-if="showPreviewPopup" :list="title_list" @clickClose="showPreviewPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
  </div>
</template>

<script>
import ExchangeItem from '@/pages/midAutumn/views/moonCake/components/exchangeItem.vue'
import Lottery from '@/pages/midAutumn/views/moonCake/components/lottery.vue'
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api'
const CongratsGetPopup = () => import('@/pages/midAutumn/components/congratsGetPopup.vue')
const PreviewPopup = () => import('@/pages/midAutumn/views/moonCake/popups/previewPopup.vue')
const ConfirmPopup = () => import('@/pages/midAutumn/views/moonCake/popups/confirmPopup.vue')
export default {
  name: 'moonCake',
  components: { CongratsGetPopup, PreviewPopup, ConfirmPopup, Lottery, ExchangeItem },
  data() {
    return {
      user_icon: '', // 用户头像
      user_tickets: 0, // 用户抽奖次数
      total_consume: 0, // 消费钻石数量
      spend_nums: 0, // 用户消耗的月饼数量
      spend_max: 20, // 解锁兑换需要消耗的月饼数量
      cake_list: [
        { id: 1, name: '蛋黄月饼', icon: 'mk4_1.png', nums: 0 },
        { id: 2, name: '鲜肉月饼', icon: 'mk4_2.png', nums: 0 },
        { id: 3, name: '五仁月饼', icon: 'mk4_3.png', nums: 0 },
        { id: 4, name: '抹茶月饼', icon: 'mk4_4.png', nums: 0 },
        { id: 5, name: '水晶月饼', icon: 'mk4_5.png', nums: 0 }
      ], // 月饼列表
      exchange_list1: [
        {
          goods_id: 1,
          max_times: 10,
          spend: [{ id: 2, icon: 'mk4_13.png', nums: 2 }],
          award: [{ type: 'costume', tool_id: 1, icon: 'yysh_120_120.png', nums: 3, name: '云游四海', text: '+3天' }],
          has_right: 1,
          show_text: '主页特效+3天',
          finish_times: 0
        },
        {
          goods_id: 2,
          max_times: 10,
          spend: [{ id: 3, icon: 'mk4_14.png', nums: 2 }, { id: 4, icon: 'mk4_15.png', nums: 1 }],
          award: [{ type: 'voice', tool_id: 99, icon: 'sb_xmxl', nums: 3, name: '星梦旋律', text: '声波+3天' }],
          has_right: 1,
          show_text: '声波+3天',
          finish_times: 0
        },
        {
          goods_id: 3,
          max_times: 10,
          spend: [{ id: 1, icon: 'mk4_12.png', nums: 5 }, { id: 2, icon: 'mk4_13.png', nums: 5 }, { id: 4, icon: 'mk4_15.png', nums: 3 }],
          award: [{ type: 'chat_bubble_pub', tool_id: 34, icon: 'xhhj_120_120.png', nums: 3, name: '星河幻境', text: '+3天' }],
          has_right: 1,
          show_text: '公屏气泡+3天',
          finish_times: 0
        },
        {
          goods_id: 4,
          max_times: 0,
          spend: [{ id: 1, icon: 'mk4_12.png', nums: 1 }, { id: 3, icon: 'mk4_14.png', nums: 1 }],
          award: [{ type: 'tool', tool_id: 34, icon: 'ljs_120_120.png', nums: 50, name: '绿晶石', text: '+50' }],
          has_right: 1,
          show_text: '绿晶石+50',
          finish_times: 0
        }
      ], // A赏
      exchange_list2: [
        {
          goods_id: 5,
          max_times: 0,
          spend: [{ id: 2, icon: 'mk4_13.png', nums: 12 }, { id: 4, icon: 'mk4_15.png', nums: 6 }, { id: 5, icon: 'mk4_16.png', nums: 2 }],
          award: [{ type: 'ring', tool_id: 0, icon: 'ysjz_120_120.png', nums: 1, name: '月守戒指', text: '戒指+1' }],
          has_right: 0,
          show_text: '戒指+1',
          finish_times: 0
        },
        {
          goods_id: 6,
          max_times: 10,
          spend: [{ id: 1, icon: 'mk4_12.png', nums: 10 }, { id: 3, icon: 'mk4_14.png', nums: 10 }, { id: 5, icon: 'mk4_16.png', nums: 2 }],
          award: [{ type: 'tool', tool_id: 0, icon: 'lhq_120_120.png', nums: 5, name: '靓号券', text: '+5' }],
          has_right: 0,
          show_text: '靓号券+5',
          finish_times: 0
        }
      ], // S赏 需要消耗20个月饼解锁
      exchange_list3: [
        {
          goods_id: 7,
          max_times: 0,
          spend: [{ id: 1, icon: 'mk4_12.png', nums: 20 }, { id: 2, icon: 'mk4_13.png', nums: 20 }, { id: 3, icon: 'mk4_14.png', nums: 15 }, { id: 4, icon: 'mk4_15.png', nums: 15 }, { id: 5, icon: 'mk4_16.png', nums: 5 }],
          award: [{ type: 'title', tool_id: 0, icon: 'fcchlb_120_120.png', nums: 1, name: '永久称号', text: '永久称号' }],
          left_times: 0,
          has_right: 0,
          show_text: '称号礼包+1',
          finish_times: 0
        }
      ], // SSS赏 每兑换1次S赏可增加1次兑换次数
      title_list: [
        { type: 'title', tool_id: 125, nums: false, icon: 'ch_hhyy.png', name: '花好月圆', text: '永久称号', owned: false },
        { type: 'title', tool_id: 4770, nums: false, icon: 'ch_jdfh', name: '绝代芳华', text: '永久称号', owned: false },
        { type: 'title', tool_id: 4878, nums: false, icon: 'ch_hyqh', name: '幻月秋华', text: '永久称号', owned: false },
        { type: 'title', tool_id: 4987, nums: false, icon: 'ch_mdjh', name: '名动江湖', text: '永久称号', owned: false },
        { type: 'title', tool_id: 4988, nums: false, icon: 'ch_myjxs', name: '明月寄相思', text: '永久称号', owned: false }
      ],
      showCongratsGetPopup: false,
      congratsGetPopupData: [],
      showConfirmPopup: false,
      confirmPopupData: {},
      showPreviewPopup: false
    }
  },
  computed: {
    cakeNum() {
      return this.cake_list.reduce((acc, cur) => { return { ...acc, [cur.id]: cur.nums } }, {})
    },
    lotteryData() {
      return { user_tickets: this.user_tickets, total_consume: this.total_consume, cake_list: this.cake_list }
    },
    exchangeData() {
      return { cakeNum: this.cakeNum, spend_max: this.spend_max, spend_nums: this.spend_nums }
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    openConfirmPopup(params) {
      this.confirmPopupData = params
      this.showConfirmPopup = true
    },
    async exchange(params) {
      const res = await getPageData({ type: 'cake_shop_exchange', mark: params.goods_id })
      if (res.errno) return this.$toast(res.errmsg)
      const { award } = res.data
      this.congratsGetPopupData = award
      this.showCongratsGetPopup = true
      this.getPageData()
    },
    lottery: _throttle(async function(mark) {
      if (+this.user_tickets < (mark == 1 ? 1 : 10)) return this.$toast('次数不足')
      const res = await getPageData({ type: 'cake_shop_lottery', mark })
      if (res.errno) return this.$toast(res.errmsg)
      const { user_tickets, cake_list, awards } = res.data
      this.user_tickets = user_tickets
      this.cake_list = cake_list
      this.congratsGetPopupData = awards
      this.showCongratsGetPopup = true
    }, 1000),
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
