<template>
  <div class="component">
    <OutBox>
      <div class="taskListArea">
        <div class="taskItem" v-for="(item, index) in task_list" :key="index">
          <div class="pointDiv">
            <PublicImg class="pointIcon" :imgName="pointIcon" />
            <div class="pointNums">{{ pointName }}+{{ item.show_text }}</div>
          </div>
          <div class="taskName">{{ item.task_name }}</div>
          <div class="limitedDiv">
            <span v-if="item.need_rev">({{ item.finish_times }}/{{ item.max_times }})</span>
            <span v-else class="noRev">系统自动派发，无需手动领取</span>
          </div>
          <div
            :class="[
              'taskBtn',
              item.has_right == 0 ? 'button-noFinish' : item.has_right == 1 ? 'button-receive' : item.has_right == 2 ? 'button-finish' : null
            ]"
            v-if="item.need_rev"
            @click="taskBtnCk(item, index)"
          >
            {{
              item.has_right == 0 ? (item.is_recharge ? '去完成' : '未完成') : item.has_right == 1 ? '领取' : item.has_right == 2 ? '已领取' : null
            }}
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取积分<img :src="IconPath(pointIcon)" />，积分</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span> 购买礼包、会员（含超值兑换中兑换会员）、活</li>
          <li>力卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <OutBox :title="'title_1.png'">
      <div class="myGoodsDiv">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ my_goods }}</div>
      <div class="goodsListArea">
        <div class="goodsItem" v-for="item in goods_list" :key="item.type">
          <PublicImg
            :class="['goodsIcon', item.goods_type == 'title' ? 'titleIcon' : null]"
            :imgName="item.goods_icon"
            :userAvatar="item.goods_type == 'mic' ? $store.state.user_icon : null"
          ></PublicImg>
          <div class="goodsText">{{ item.goods_num_text }}</div>
          <div class="exchangeDesc">
            消耗<i>{{ item.price }}{{ pointName }}</i
            >兑换<span v-if="item.type == 'lucky_key' && item.exchange_times == 0">&ensp;第二个<i>半价</i></span>
          </div>
          <div class="limitedDiv">
            <span v-if="item.max_times == 0">不限兑换次数</span>
            <span v-else>限兑：{{ item.exchange_times }}/{{ item.max_times }}</span>
          </div>
          <div :class="['goodsBtn', item.has_right == 1 ? 'button-receive' : 'button-finish']" @click="goodsBtnCk(item)">
            {{ item.has_right == 0 ? '不可兑换' : item.has_right == 1 ? '兑换' : item.has_right == 2 ? '已兑换' : null }}
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </OutBox>
    <ExchangePopup
      v-if="isShowExchangePopup"
      :pointIcon="pointIcon"
      :pointName="pointName"
      :my_goods="my_goods"
      :config="configExchangePopup"
      @getPageData="getPageData"
      @clickClose="clickClose"
    ></ExchangePopup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index'
import { recharge } from '@/pages/luckyFlop/utils/toApp' // 跳转充值界面APP方法
import ExchangePopup from './components/exchangePopup.vue'

export default {
  name: 'PointReward',
  props: [],
  components: {
    ExchangePopup
  },
  data() {
    return {
      pointIcon: 'jf_34_36.png', // 道具图标
      pointName: '积分', // 道具名称
      task_list: {
        login: {
          task_name: '每日登录',
          award_nums: 5,
          show_text: '5',
          finish_times: 0,
          max_times: 1,
          need_rev: true,
          has_right: 0,
          is_recharge: false
        },
        keju: {
          task_name: '完成一次科举',
          award_nums: 5,
          show_text: '5',
          finish_times: 0,
          max_times: 1,
          need_rev: true,
          has_right: 0,
          is_recharge: false
        },
        recharge_once: {
          task_name: '完成一笔充值',
          award_nums: 5,
          show_text: '5',
          finish_times: 0,
          max_times: 1,
          need_rev: true,
          has_right: 0,
          is_recharge: true
        },
        masonry_consume: {
          task_name: '消费1000钻',
          award_nums: 10,
          show_text: '10',
          finish_times: 0,
          max_times: 1000,
          need_rev: true,
          has_right: 0,
          is_recharge: false
        },
        recharge: {
          task_name: '每充值10元',
          award_nums: 6,
          show_text: '6',
          finish_times: 0,
          max_times: 10,
          need_rev: false,
          has_right: 0,
          is_recharge: false
        }
      }, // 任务列表
      my_goods: 0, // 我的道具数量(积分)
      goods_list: [
        {
          type: 'tools_ljs2',
          goods_name: '绿晶石',
          goods_type: 'tool',
          goods_id: 2,
          goods_num: 1,
          price: 1,
          price_text: '1',
          max_times: 0,
          goods_icon: 'ljs_120_120.png',
          goods_icon_t: 'ljs_120_120.png',
          goods_num_text: '绿晶石+1',
          desc: '用于提升技能等级，可增加成功率',
          is_owned: false,
          is_lock: false,
          exchange_times: '2',
          has_right: 1
        },
        {
          type: 'lucky_key',
          goods_name: '钥匙',
          goods_type: 'keys',
          goods_id: 0,
          goods_num: 1,
          price: 50,
          price_text: '50',
          max_times: 2,
          goods_icon: 'xyys_120_120.png',
          goods_icon_t: 'xyys_120_120.png',
          goods_num_text: '钥匙+1',
          is_second_half: false,
          is_owned: false,
          is_lock: false,
          exchange_times: 0,
          has_right: 1
        },
        {
          type: 'keju',
          goods_name: '科举双倍卡',
          goods_type: 'keju',
          goods_id: 1,
          goods_num: 1,
          price: 8,
          price_text: '8',
          max_times: 5,
          goods_icon: 'sbk_120_120.png',
          goods_icon_t: 'sbk_120_120.png',
          goods_num_text: '科举双倍卡+1',
          desc: '可在科举中使获得的元宝变为双倍',
          is_owned: false,
          is_lock: false,
          exchange_times: 0,
          has_right: 1
        },
        // {
        //   type: 'hero_tools_zhs',
        //   goods_name: '召唤石',
        //   goods_type: 'hero_tools',
        //   goods_id: 4,
        //   goods_num: 1,
        //   price: 30,
        //   price_text: '30',
        //   max_times: 10,
        //   goods_icon: 'zhs_120_120.png',
        //   goods_icon_t: 'zhs_120_120.png',
        //   goods_num_text: '召唤石+1',
        //   desc: '用于蛋蛋部落玩法中，召唤英雄',
        //   is_owned: false,
        //   is_lock: false,
        //   exchange_times: 0,
        //   has_right: 1
        // },
        {
          type: 'title',
          goods_name: '永久称号',
          goods_type: 'title',
          goods_id: 5123,
          goods_num: 0,
          price: 600,
          price_text: '600',
          max_times: 1,
          goods_icon: 'ch_jdqw',
          goods_icon_t: 'ch_jdqw',
          goods_num_text: '永久称号+1',
          is_owned: false,
          is_lock: false,
          exchange_times: 0,
          has_right: 1
        },
        {
          type: 'tools_kxt',
          goods_name: '聚宝盆',
          goods_type: 'tool',
          goods_id: 8,
          goods_num: 1,
          price: 50,
          price_text: '50',
          max_times: 10,
          goods_icon: 'jbp_120_120.png',
          goods_icon_t: 'jbp_120_120.png',
          goods_num_text: '聚宝盆+1',
          desc: '技能道具，可将其他用户禁言',
          is_owned: false,
          is_lock: false,
          exchange_times: 0,
          has_right: 1
        },
        {
          type: 'mic_hmxh',
          goods_name: '天生浪漫',
          goods_type: 'mic',
          goods_id: 68,
          goods_num: 7,
          price: 100,
          price_text: '100',
          max_times: 1,
          goods_icon: 'ts_tslm.svga',
          goods_icon_t: 'ts_tslm.svga',
          goods_num_text: '头饰+7天',
          is_owned: false,
          is_lock: false,
          exchange_times: 0,
          has_right: 1
        }
      ], // 兑换好礼列表
      isShowExchangePopup: false, // 兑换弹窗
      configExchangePopup: {}
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm1' }).then((res) => {
        if (res.errno == 0) {
          this.task_list = res.data.task_list
          this.my_goods = res.data.my_goods
          this.goods_list = res.data.goods_list
          this.$store.commit('getUserIcon', res.data.user_icon)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * task奖励领取点击
     */
    taskBtnCk(item, index) {
      console.log(item, index)
      if (item.has_right == 0 && item.is_recharge) {
        this.handleRecharge()
      } else if (item.has_right == 1) {
        getPageData({ type: 'task_award_new', mark: index }).then((res) => {
          if (res.errno == 0) {
            this.my_goods = res.data.goods
            this.task_list[index].has_right = res.data.has_right
            this.$toast(res.errmsg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 跳转APP充值界面
     */
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    /**
     * 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
     */
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    /**
     * 兑换
     */
    goodsBtnCk(item) {
      console.log(item)
      if (item.has_right == 1) {
        if (this.isEnough(item)) {
          this.configExchangePopup = item
          this.isShowExchangePopup = true
        }
      }
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      // console.log(goods_type, exchange_times, price)
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      console.log(res)
      return res
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowExchangePopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  .taskListArea {
    .taskItem {
      width: 660px;
      height: 142px;
      margin: 0 auto 10px auto;
      background: url('@/pages/luckyFlop/assets/mk1_1.png') no-repeat left top/100% 100%;
      position: relative;
      .pointDiv {
        width: 100px;
        height: 100px;
        background: #f3f4ff;
        border-radius: 12px;
        border: 2px solid #f0c8ff;
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        .pointIcon {
          width: 34px * 1.5;
          height: 36px * 1.5;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 8px;
        }
        .pointNums {
          width: 100px;
          height: 32px;
          background: #b070ed;
          border-radius: 0 0 12px 12px;
          font-size: 24px;
          color: #ffffff;
          line-height: 36px;
          text-align: center;
          position: absolute;
          left: -1px;
          bottom: -1px;
        }
      }
      .taskName {
        font-size: 30px;
        color: #ffffff;
        position: absolute;
        left: 150px;
        top: 30px;
      }
      .limitedDiv {
        font-size: 24px;
        color: #fffaa6;
        position: absolute;
        left: 150px;
        top: 80px;
        .noRev {
          font-size: 30px;
        }
      }
      .taskBtn {
        position: absolute;
        right: 20px;
        top: 60px;
      }
    }
  }
  .myGoodsDiv {
    width: 320px;
    height: 48px;
    background: #6b7ffd;
    border-radius: 24px;
    font-size: 28px;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
    margin: 0 auto 20px auto;
    img {
      width: 34px;
      height: 36px;
    }
  }
  .goodsListArea {
    .goodsItem {
      width: 660px;
      height: 170px;
      margin: 0 auto 10px auto;
      background: url('@/pages/luckyFlop/assets/mk1_2.png') no-repeat left top/100% 100%;
      position: relative;
      .goodsIcon {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 110px;
        top: 66px;
        transform: translate(-50%, -50%);
        &.titleIcon {
          width: 210px * 0.9;
          height: 96px * 0.9;
        }
      }
      .goodsText {
        font-size: 24px;
        color: #fff1e5;
        position: absolute;
        left: 110px;
        bottom: 16px;
        transform: translate(-50%);
      }
      .exchangeDesc {
        font-size: 30px;
        color: #ffffff;
        position: absolute;
        left: 230px;
        top: 30px;
        i {
          color: #fffaa6;
        }
      }
      .limitedDiv {
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        left: 230px;
        top: 100px;
      }
      .goodsBtn {
        position: absolute;
        right: 20px;
        top: 90px;
      }
    }
  }
}
</style>
