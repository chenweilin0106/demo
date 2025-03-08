<template>
  <div class="PointReward">
    <!--任务列表-->
    <TaskList v-bind="taskListData" @onTaskClick="onTaskClick" @update="getPageData" />

    <!--兑换列表-->
    <OutBox class="exchange-list" title="title_1.png">
      <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{my_goods }}</div>
      <ExchangeListItem
        v-for="goods in goods_list"
        :key="goods.goods_name"
        :exchangeItem="goods"
        :pointName="pointName"
        :spend_point="spend_point"
        @onExchangeClick="onExchangeClick"
      />
      <div class="rule-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中获取限定奖励</li>
        </ul>
      </div>
    </OutBox>

    <!-- 兑换好礼弹框 -->
    <ExchangeGiftPopup v-if="showExchangeGiftsPopup" v-bind="exchangeGiftsPopupData" @update="updateGoodsList" @clickClose="showExchangeGiftsPopup = false" />
  </div>
</template>

<script>
import TaskList from '@/pages/sparParty/views/PointReward/components/TaskList.vue'
import { getPageData } from '../../api/index'
import ExchangeListItem from './components/ExchangeListItem'
import ExchangeGiftPopup from '@/pages/sparParty/popups/exchangeGiftsPopup.vue'
export default {
  name: 'PointReward',
  components: { TaskList, ExchangeListItem, ExchangeGiftPopup },
  data() {
    return {
      goods_list: [
        {
          desc: '用于提升技能等级，可增加成功率',
          exchange_times: 0,
          goods_icon: 'ljs_120_120.png',
          goods_icon_t: 'ljs_120_120.png',
          goods_id: 2,
          goods_name: '绿晶石',
          goods_num: 1,
          goods_num_text: '绿晶石+1',
          goods_type: 'tool',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          max_times: 0,
          price: 1,
          price_text: '1',
          type: 'tools_ljs2'
        },
        {
          exchange_times: 0,
          goods_icon: 'xyys_120_120.png',
          goods_icon_t: 'xyys_120_120.png',
          goods_id: 0,
          goods_name: '钥匙',
          goods_num: 1,
          goods_num_text: '钥匙+1',
          goods_type: 'keys',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          is_second_half: false,
          max_times: 2,
          price: 50,
          price_text: '50',
          type: 'lucky_key'
        },
        {
          desc: '可在科举中使获得的元宝变为双倍',
          exchange_times: 0,
          goods_icon: 'sbk_120_120.png',
          goods_icon_t: 'sbk_120_120.png',
          goods_id: 1,
          goods_name: '科举双倍卡',
          goods_num: 1,
          goods_num_text: '科举双倍卡+1',
          goods_type: 'keju',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          max_times: 5,
          price: 8,
          price_text: '8',
          type: 'keju'
        },
        {
          exchange_times: 0,
          goods_icon: 'ch_jbkc',
          goods_icon_t: 'ch_jbkc',
          goods_id: 4965,
          goods_name: '永久称号',
          goods_num: 0,
          goods_num_text: '永久称号+1',
          goods_type: 'title',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          max_times: 1,
          price: 600,
          price_text: '600',
          type: 'title'
        },
        {
          exchange_times: 0,
          goods_icon: 'okb_120_120.png',
          goods_icon_t: 'okb_120_120.png',
          goods_id: 5,
          goods_name: 'OK绷',
          goods_num: 1,
          goods_num_text: 'OK绷+1',
          goods_type: 'tool',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          max_times: 10,
          price: 50,
          price_text: '50',
          type: 'tools_OKb'
        },
        {
          exchange_times: 0,
          goods_icon: 'xhhj_120_120.png',
          goods_icon_t: 'xhhj_120_120.png',
          goods_id: 80,
          goods_name: '星河幻境',
          goods_num: 7,
          goods_num_text: '公屏气泡+7天',
          goods_type: 'chat_bubble_pub',
          has_right: 1,
          is_lock: false,
          is_owned: false,
          max_times: 1,
          price: 150,
          price_text: '150',
          type: 'chat_bubble_pub'
        }
      ], // 兑换好礼列表
      my_goods: '0', // 我的道具数量
      spend_point: '0', // 花费的道具数量
      task_list: {
        login: {
          award_nums: 5,
          finish_times: 0,
          has_right: '0',
          is_recharge: false,
          max_times: 1,
          need_rev: true,
          show_text: '5',
          task_name: '每日登录',
          piece: 2
        },
        keju: {
          award_nums: 5,
          finish_times: 0,
          has_right: 0,
          is_recharge: false,
          max_times: 1,
          need_rev: true,
          show_text: '5',
          task_name: '完成一次科举',
          piece: 2
        },
        recharge_once: {
          award_nums: 5,
          finish_times: 0,
          has_right: 0,
          is_recharge: true,
          max_times: 1,
          need_rev: true,
          show_text: '5',
          task_name: '完成一笔充值',
          piece: 2
        },
        masonry_consume: {
          award_nums: 10,
          finish_times: 0,
          has_right: 0,
          is_recharge: false,
          max_times: 1000,
          need_rev: true,
          piece: 4,
          show_text: '10',
          task_name: '消费1000钻'
        },
        recharge: {
          award_nums: 6,
          finish_times: 0,
          has_right: 0,
          is_recharge: false,
          max_times: 10,
          need_rev: false,
          show_text: '6',
          task_name: '每充值10元'
        }
      }, // 任务列表
      user_icon: '', // 用户头像
      exchangeGiftsPopupData: { pointIcon: '', pointName: '', my_goods: '', type: '' },
      showExchangeGiftsPopup: false,
      pointIcon: 'jf_34_36.png', // 道具图标
      pointName: '积分' // 道具名称
    }
  },
  async created() {
    await this.getPageData()
    this.$store.commit('getUserIcon', this.user_icon)
    this.exchangeGiftsPopupData = { pointIcon: this.pointIcon, pointName: this.pointName }
  },
  computed: {
    taskListData() {
      return { pointIcon: this.pointIcon, pointName: this.pointName, task_list: this.task_list }
    }
  },
  methods: {
    // 兑换好礼列表更新事件
    updateGoodsList(param) {
      this.my_goods = param.goods
      this.goods_list = param.goods_list
    },
    // 任务列表领取
    async onTaskClick(key) {
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.my_goods = res.data.goods
      this.task_list[key].has_right = res.data.has_right
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchangeClick(param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.exchangeGiftsPopupData = { ...this.exchangeGiftsPopupData, my_goods: this.my_goods, type: param.type }
      this.showExchangeGiftsPopup = true
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm1' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 任务列表
  .task-list {
    margin-top: 25px;
    //padding-top: 30px;
    //height: 1049px;
    ::v-deep .right-side-icon {
      top: 327px;
    }
    .rule-text {
      margin-top: 12px;
      width: 605px;
      //height: 171px;
      margin-left: 60px;

      li:nth-of-type(2) {
        margin-top: 5px;
        margin-bottom: 10px;
      }
    }
  }

  // 兑换列表
  .exchange-list {
    margin-top: 77px;
    padding-top: 60px;
    //height: 1551px;
    ::v-deep .right-side-icon {
      top: 342px;
    }
    // 顶部道具数量
    .my-goods {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 21px;
      padding: 0 10px;
      min-width: 320px;
      width: fit-content;
      height: 48px;
      background: #083160;
      border-radius: 24px;
      font-size: 28px;
      color: #ffffff;

      > img {
        width: 34px;
        height: 35px;
        margin: 2px 5px 0;
      }
    }

    .rule-text {
      line-height: 50px;
      margin-left: 61px;
      width: 614px;
      //height: 75px;
    }
  }
}
</style>
