<template>
  <div class="pointReward">
    <!-- 任务列表 -->
    <OutBox class="tasksBox">
      <div v-for="(taskItem, taskKey) in task_list" :key="taskKey" class="taskItemDiv" :class="taskKey">
        <div class="taskItemAward">
          <div class="taskItemAwardIcon"><img :src="IconPath(pointIcon)" alt="" /></div>
          <div class="taskItemAwardText">{{ pointName }}+{{ taskItem.award_nums }}</div>
        </div>
        <div class="taskItemDesc">
          <div class="taskItemDescText1">
            {{ taskItem.task_name }}<van-popover v-if="taskKey == 'keju'" v-model="taskItem.showPopover" trigger="click" placement="top" :get-container="''" :close-on-click-outside="true" class="taskBubble">
            <div class="popoverMain">参与科举答题或竞猜<br>所得元宝都计算在内</div>
          </van-popover>
          </div>
          <div class="taskItemDescText2">
            <div v-if="taskItem.task_name == '每充值10元'" class="taskItemDescText2Div1">系统自动派发，无需手动领取</div>
            <div v-else class="taskItemDescText2Div2">（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</div>
          </div>
        </div>
        <div v-if="taskItem.need_rev" class="taskItemBtn" :class="`status${taskItem.has_right}`" @click="receive(taskItem, taskKey)">{{taskItem.has_right == 0 ? (taskItem.is_recharge ? '去完成' : '未完成') : taskItem.has_right == 1 ? '领取' : '已领取'}}</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" alt="" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <!-- 兑换好礼 -->
    <OutBox class="exchangeBox" title="title_1.png" left right>
      <div class="exchangeBoxPointNum">我的{{ pointName }}&nbsp;<img :src="IconPath(pointIcon)" alt="" />：{{ my_goods }}</div>
      <div v-for="(goods, index) in goods_list" :key="index" class="exchangeItemDiv">
        <div class="exchangeItemAward">
          <lazy-component class="exchangeItemAwardIcon">
            <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
            <!-- 附赠 -->
            <!-- <div v-if="['tools_cbt', 'tools_pyd'].includes(goods.type)" class="addAwardDiv"> -->
            <!--   <div class="addTextDiv">附赠</div> -->
            <!--   <div class="addIconDiv"> -->
            <!--     <PublicImg imgName="fsjc_120_120.png" imgType="tool" /> -->
            <!--   </div> -->
            <!--   <div class="addNumDiv" :data-text="'+200'"><div class="inner">+200</div></div> -->
            <!-- </div> -->
            <div v-if="goods.spend_cond && goods.spend_cond > spend_point" class="lockOverly"></div>
          </lazy-component>
          <div class="exchangeItemAwardText">{{ goods.goods_num_text }}</div>
        </div>
        <div class="exchangeItemDesc">
          <p v-if="goods.type == 'lucky_key'" class="exchangeItemDescP1">消耗<span>{{ goods.price }}个{{ pointName }}</span>兑换 第二个<span>半价</span></p>
          <p v-else class="exchangeItemDescP2">消耗<i v-if="goods.mark" class="oldPrice">{{ goods.mark }}</i><span>{{ goods.price }}个{{ pointName }}</span>兑换</p>
          <p v-if="goods.max_times == 0" class="exchangeItemDescP3">不限兑换次数</p>
          <p v-else class="exchangeItemDescP4">限兑：{{ goods.exchange_times }}/{{ goods.max_times }}</p>
          <p v-if="goods.spend_cond && goods.spend_cond > spend_point" class="exchangeItemDescP5">累计消耗{{ goods.spend_cond }}个{{ pointName }}解锁</p>
        </div>
        <div v-if="!goods.spend_cond || goods.spend_cond <= spend_point" class="exchangeBtn" :class="`status${goods.has_right}`" @click="openExchangePopup(goods)">{{ goods.has_right == 1 ? '兑换' : '已兑完' }}</div>
        <div v-if="['tools_cbt', 'tools_pyd'].includes(goods.type)" class="discountLabel"></div>
        <div v-else-if="['title'].includes(goods.goods_type)" class="yearCelebrationDiscountLabel"></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中获得限定奖励</li>
          <li><span></span>消耗<img class="pydIcon" :src="IconPath('pyd_43_44.png')" alt="" />可抵用一次天赋修炼</li>
        </ul>
      </div>
    </OutBox>
    <!-- 跳转晶石淬炼活动 -->
    <OutBox class="jumpBox" size="2">
      <div class="rules-text">
        <ul>
          <li>本活动<i>首日消耗的{{ pointName }}</i>额外转化为淬炼币<img :src="IconPath('clb_45_46.png')" alt="">，淬</li>
          <li>炼币<img :src="IconPath('clb_45_46.png')" alt="">可用于【晶石淬炼】活动</li>
        </ul>
      </div>
      <div class="jumpBtn" @click="jump">立即前往</div>
    </OutBox>
    <ExchangePopup v-if="isShowExchangePopup" :pointIcon="pointIcon" :pointName="pointName" :my_goods="my_goods" :config="configExchangePopup" @getHomePage="getHomePage" @clickClose="isShowExchangePopup = false" />
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { recharge, compareVersions, urlRouterWithApp } from '@/utils/toApp'
import { _throttle } from '@/utils/tool'
import visibilityMixin from '@/mixins/visibilityMixin'
import ExchangePopup from './popups/exchangePopup.vue'

export default {
  name: 'pointReward',
  mixins: [visibilityMixin],
  components: { ExchangePopup },
  data() {
    return {
      user_icon: '', // 用户头像
      show_full: 1, // 跳转晶石淬炼是否显示全屏 1:非全屏 2:全屏
      my_goods: 1000, // 拥有的道具数量
      spend_point: 0, // 花费道具数量
      task_list: {
        login: { task_name: '每日登录', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        keju: { task_name: '在科举游戏中至少获得5000元宝奖励', award_nums: 5, show_text: '5', finish_times: 0, max_times: 5000, need_rev: true, has_right: 0, is_recharge: false },
        recharge_once: { task_name: '完成一笔充值', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: true },
        masonry_consume: { task_name: '消费1000钻', award_nums: 10, show_text: '10', finish_times: 0, max_times: 1000, need_rev: true, has_right: 0, is_recharge: false },
        recharge: { task_name: '每充值10元', award_nums: 6, show_text: '6', finish_times: 0, max_times: 10, need_rev: false, has_right: 0, is_recharge: false }
      }, // 任务列表
      goods_list: [
        { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'keju', goods_name: '科举双倍卡', goods_type: 'keju', goods_id: 1, goods_num: 1, price: 8, price_text: '8', max_times: 0, goods_icon: 'sbk_120_120.png', goods_icon_t: 'sbk_120_120.png', goods_num_text: '科举双倍卡+1', desc: '可在科举中使获得的元宝变为双倍', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'pretty_card', goods_name: '靓号券', goods_type: 'pretty_card', goods_id: 58, goods_num: 5, price: 20, price_text: '20', max_times: 10, goods_icon: 'lhq_120_120.png', goods_icon_t: 'lhq_120_120.png', goods_num_text: '靓号券+5', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 50, price_text: '50', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { exchange_times: 0, goods_icon: 'qp_mzdm_sc', goods_icon_t: 'qp_mzdm_sc', goods_id: 80, goods_name: '萌爪电喵', goods_num: 7, goods_num_text: '私聊气泡+7天', goods_type: 'chat_bubble', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble' },
        { type: 'car_sdml', goods_name: '圣诞麋鹿', goods_type: 'car', goods_id: 58, goods_num: 7, price: 60, price_text: '60', max_times: 3, goods_icon: 'sdml_120_120.png', goods_icon_t: 'sdml_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'title', goods_name: '永久称号', goods_type: 'title', mark: 600, goods_id: 4987, goods_num: 0, price: 550, max_times: 1, goods_icon: 'ch_xyth', goods_icon_t: 'ch_xyth', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1, spend_cond: 0 },
        { exchange_times: '0', goods_icon: 'cbt_120_120.png', goods_icon_t: 'cbt_120_120.png', goods_id: 1, goods_name: '藏宝图', goods_num: 1, goods_num_text: '藏宝图+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 30, no_unlocked: 'cbt_120_120.png', price: 25, price_text: '25', spend_cond: 100, type: 'tools_cbt' },
        { exchange_times: '0', goods_icon: 'pyd_120_120.png', goods_icon_t: 'pyd_120_120.png', goods_id: 1, goods_name: '培元丹', goods_num: 15, goods_num_text: '培元丹+15', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 50, no_unlocked: 'pyd_120_120.png', price: 10, price_text: '10', spend_cond: 300, type: 'tools_pyd' }
      ], // 兑换好礼列表
      configExchangePopup: { pointIcon: '', pointName: '', type: '' }, // 兑换好礼弹框数据
      isShowExchangePopup: false, // 兑换好礼弹框显示状态
      pointIcon: Object.freeze('dm_61_65.png'), // 道具图标
      pointName: Object.freeze('福米') // 道具名称
    }
  },
  mounted() {
    this.getHomePage()
    this.getVipDayStatus()
  },
  methods: {
    /**
     * 跳转晶石淬炼活动
     */
    jump() {
      if (compareVersions('5.9.6') != -1) {
        urlRouterWithApp(`dandan-${window.location.origin}/vue/normal/game2048/index.html?show_full=${this.show_full == 1 ? 0 : this.show_full == 2 ? 1 : null}`)
      } else {
        this.$toast('因客户端版本较低，跳转后可能无法游戏，请更新版本或从聊天室功能盒中进入晶石淬炼')
      }
    },
    /**
     * 领取任务奖励
     */
    receive: _throttle(async function (task, key) {
      if (task.has_right == 2) return
      if (task.has_right == 0) {
        if (!task.is_recharge) return
        this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getHomePage }))
        return recharge()
      }
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno) return // 请求出错
      this.my_goods = res.data.goods
      task.has_right = 2
    }),
    /**
     * 打开兑换好礼弹框
     */
    openExchangePopup(goods) {
      if (goods.has_right == 2) return
      if (!this.isEnough(goods)) return
      this.configExchangePopup = { ...goods, price: goods.discount_price && Number(goods.discount_price) ? goods.discount_price : goods.price }
      this.isShowExchangePopup = true
    },
    /**
     * 判断道具是否足够
     */
    isEnough({ task_type, goods_type, exchange_times, price, discount_price }) {
      // console.log(goods_type, exchange_times, price)
      let res = true
      let actualPrice
      if (discount_price && Number(discount_price) > 0) {
        actualPrice = Number(discount_price)
      } else {
        actualPrice = Number(price)
      }
      if ((goods_type == 'keys' && exchange_times == 1) || (task_type == 2 && exchange_times == 1)) {
        actualPrice = Number(price) / 2
      }
      // console.log(task_type, exchange_times, actualPrice)
      if (this.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    },
    /**
     * 获取会员日状态
     */
    async getVipDayStatus() {
      const res = await getPageData({ type: 'year_top_vipday_info' })
      if (res.errno) return
      this.status = res.data.status
    },
    /**
     * 获取首页数据
     */
    async getHomePage() {
      const res = await getPageData({ type: 'tab', mark: 'm1' })
      if (res.errno) return this.$toast(res.errmsg)
      this.my_goods = res.data.my_goods
      this.task_list = res.data.task_list
      this.goods_list = res.data.goods_list
      this.show_full = res.data.show_full
      this.user_icon = res.data.user_icon
      this.spend_point = res.data.spend_point
    }
  }
}
</script>

<style scoped lang="scss">
.pointReward {
  .tasksBox {
    .rules-text {
      img {
        height: 47px;
      }
    }
    .taskBubble {
      width: 32px;
      height: 32px;
      margin-top: -5px;
      vertical-align: middle;
      //background: url('@/pages/yearCelebration/assets/mk1_9.png') no-repeat center center/32px 32px;
    }
    ::v-deep .van-popover {
      top: -35px !important;
      // left: 322px !important;
      .van-popover__content {
        width: fit-content;
        height: fit-content;
        background: none;
        box-shadow: none;
        overflow: visible;
        .popoverMain {
          margin-left: -56px; // 对准按钮图标
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          line-height: 30px;
          width: 203px;
          height: 92px;
          //background: url('@/pages/yearCelebration/assets/mk1_7.png') no-repeat left top/100% 100%; // 气泡文本背景
          padding: 0 0 7px;
          white-space: nowrap;
        }
      }
      .van-popover__arrow {
        display: none;
      }
    }
    .taskItemDiv {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 auto 13px;
      width: 687px;
      height: 145px;
      background: url('@/pages/labaFestival/assets/mk1_3.png') no-repeat left top/100% 100%;
      .taskItemAward {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 108px;
        height: 108px;
        padding: 4px;
        margin: 0 26px 0 41px;
        border-radius: 16px;
        background-color: #ECD37C;
        .taskItemAwardIcon {
          width: 100%;
          height: 68px;
          border-radius: 12px 12px 0 0;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            width: 61px;
            height: auto;
          }
        }
        .taskItemAwardText {
          border-radius: 0 0 12px 12px;
          font-weight: 500;
          font-size: 24px;
          background-color: #6D6DC3;
          color: #fff;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
      }
      .taskItemDesc {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 300px;
        min-width: 0;
        line-height: 1;
        .taskItemDescText1 {
          white-space: normal;
          &:nth-child(1) {
            font-size: 30px;
            color: #fff;
          }
        }
        .taskItemDescText2 {
          .taskItemDescText2Div1 {
            font-weight: 500;
            font-size: 24px;
            color: #FFEF85;
            margin-top: 24px;
          }
          .taskItemDescText2Div2 {
            font-weight: 500;
            font-size: 24px;
            color: #FFEF85;
            margin-top: 24px;
            text-indent: -0.5em;
          }
        }
      }
      .taskItemBtn {
        position: absolute;
        right: 42px;
        top: 50%;
        transform: translateY(-50%);
        width: 126px;
        height: 66px;
        font-size: 28px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        // 渐变
        border: 3px solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        &.status0{
          color: #4D7DDD;
          background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
        }
        &.status1{
          color: #A9792C;
          background-image: linear-gradient(0deg, #FFF5B0, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          color: #fff;
          background-image: linear-gradient(0deg, #9D9D9D, #E7E7E7), -webkit-linear-gradient(#fff, #fff);
        }
      }
      &.keju{
        .taskItemDesc{
          .taskItemDescText1{
            line-height: 36px;
          }
        }
        .taskItemDescText2{
          .taskItemDescText2Div2{
            margin-top: 5px;
          }
        }
      }
    }
  }
  .exchangeBox {
    .exchangeBoxPointNum {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      border-radius: 24px;
      margin: 0 auto 20px;
      padding: 0 10px;
      min-width: 320px;
      height: 48px;
      font-size: 28px;
      background-color: #D78F5F;
      color: #FFFFFF;
      > img {
        width: auto;
        height: 47px;
      }
    }
    .exchangeItemDiv {
      position: relative;
      margin: 0 auto 17px;
      width: 668px;
      height: 168px;
      display: flex;
      -webkit-background-clip: content-box, border-box;
      -webkit-background-origin: content-box, border-box;
      background-image: linear-gradient(-90deg, #FFAC7F, #C74545 80%), -webkit-linear-gradient(#F9DE8D, #F9DE8D); // 从左到右：中心背景色，内层边框色，外层边框色
      border-radius: 16px;
      border: 4px solid transparent; // 会有缝隙
      //box-shadow: inset 0 0 27px 15px rgba(232, 153, 255, 0.5);
      //&::before {
      //  content: '';
      //  position: absolute;
      //  z-index: 1;
      //  top: 0;
      //  left: 0;
      //  right: 0;
      //  bottom: 0;
      //  box-shadow: inset 0 0 30px 15px rgb(210, 172, 221, 0.63);
      //  mix-blend-mode: overlay; // 可选：调整混合模式 ios上显示效果有一些瑕疵 can i use检测兼容良好，但并没有实机测试过
      //  border-radius: 12px;
      //}
      .discountLabel {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        width: 77px;
        height: 77px;
        background: url('@/pages/labaFestival/assets/mk1_4.png') no-repeat left top/100% 100%;
      }
      .yearCelebrationDiscountLabel {
        position: absolute;
        top: 0;
        right: 0;
        width: 79px;
        height: 79px;
        background: url('@/pages/labaFestival/assets/mk1_6.png') no-repeat left top/100% 100%;
      }
      .exchangeItemAward {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 240px;
        .exchangeItemAwardIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 124px;
          background: linear-gradient(180deg, #FFE6B7, #FFFFFF);
          border-radius: 12px 0 0 0;
          .chat_bubble,
          .chat_bubble_pub {
            width: 180px;
            height: 180px;
          }
          .car {
            width: 164px;
            height: 164px;
          }
          .title {
            width: 210px;
            height: 96px;
          }
          .mic,
          .voice {
            width: 120px;
            height: 120px;
          }
          .lockOverly {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.3) url('@/pages/labaFestival/assets/mk1_5.png') no-repeat center center/30px 33px;
            border-radius: 12px 0 0 0;
            z-index: 3;
          }
          //.addAwardDiv {
          //  position: absolute;
          //  z-index: 2;
          //  top: 54px;
          //  right: 0;
          //  .addTextDiv {
          //    position: absolute;
          //    z-index: 2;
          //    top: -11px;
          //    left: 50%;
          //    transform: translateX(-50%);
          //    width: fit-content;
          //    height: 26px;
          //    background: #7948B5;
          //    border-radius: 13px;
          //    padding: 0 8px;
          //    display: flex;
          //    align-items: center;
          //    font-weight: 500;
          //    font-size: 18px;
          //    color: #FFFA73;
          //  }
          //  .addIconDiv {
          //    position: relative;
          //    z-index: 1;
          //    width: 69px;
          //    height: 69px;
          //    background: #8254BB;
          //    border-radius: 50%;
          //    border: 3px solid #EED2FF;
          //  }
          //  .addNumDiv{
          //    $stroke: 4px;
          //    position: absolute;
          //    bottom: -4px;
          //    left: 50%;
          //    transform: translateX(-50%);
          //    z-index: 2;
          //    font-size: 20px;
          //    font-weight: bold;
          //    line-height: 1;
          //    color: transparent;
          //    width: fit-content;
          //    overflow: hidden;
          //    text-align: center;
          //    flex-shrink: 0;
          //    // 字体
          //    .inner{
          //      position: relative;
          //      z-index: 2;
          //      padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
          //      background-image: -webkit-linear-gradient(0deg, #FFFFFF, #FFFFFF); /* 渐变背景 */
          //      -webkit-background-clip: text; /* 背景裁剪成字体 */
          //      background-repeat: no-repeat;
          //      border: 1px solid transparent;
          //      margin: -1px;
          //      overflow: hidden;
          //      white-space: nowrap;
          //      clip-path: inset($stroke)
          //    }
          //    // 描边
          //    &::before{
          //      content: attr(data-text); /* 继承文本 */
          //      position: absolute;
          //      z-index: 1;
          //      top: -$stroke;
          //      left: -$stroke;
          //      right: -$stroke;
          //      bottom: -$stroke;
          //      padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
          //      -webkit-text-stroke: $stroke transparent; /* 字体描边 为渐变背景占位 背景会覆盖在描边上 */
          //      background-image: -webkit-linear-gradient(0deg, #8B54CF, #8B54CF);
          //      -webkit-background-clip: text; /* 背景裁剪成字体 */
          //      background-repeat: no-repeat;
          //      box-sizing: border-box;
          //      border: 1px solid transparent;
          //      margin: -1px;
          //      overflow: hidden;
          //      white-space: nowrap;
          //      clip-path: inset($stroke);
          //      display: flex;
          //      align-items: center;
          //      justify-content: center;
          //    }
          //  }
          //}
        }
        .exchangeItemAwardText {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          border-radius: 0 0 0 12px;
          font-size: 24px;
          font-weight: 500;
          background-color: #6D6DC3;
          color: #FFFFFF;
          line-height: 1;
        }
      }
      .exchangeItemDesc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1;
        position: relative;
        height: 100%;
        width: fit-content;
        z-index: 1;
        padding: 31px 0 33px 24px;
        .exchangeItemDescP1{
          font-size: 28px;
          font-weight: bold;
          color: #FFFFFF;
          >span {
            color: #FFFAA6;
          }
        }
        .exchangeItemDescP2 {
          font-size: 28px;
          font-weight: bold;
          color: #FFFFFF;
          .oldPrice {
            position: relative;
            color: #B1392C; /*老价格颜色*/
            margin: 0 5px;
            font-weight: bold;
            &::before {
              content: '';
              position: absolute;
              width: 115%;
              height: 2px;
              background: #FFED63;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }
          >span {
            color: #FFFAA6;
          }
        }
        .exchangeItemDescP3 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
        .exchangeItemDescP4 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
        .exchangeItemDescP5 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
      // 兑换按钮
      .exchangeBtn {
        position: absolute;
        z-index: 2;
        bottom: 21px;
        right: 25px;
        width: 126px;
        height: 54px;
        font-size: 28px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        border: 3px solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        &.status1{
          color: #4D7DDD;
          background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          background-image: linear-gradient(0deg, #9D9D9D, #E7E7E7), -webkit-linear-gradient(#fff, #fff);
        }
      }
      //&.publicCard_5 {
      //  .exchangeItemAward {
      //    .exchangeItemAwardText {
      //      background-color: #E34D57;
      //    }
      //  }
      //  .exchangeItemDesc {
      //    .oldPrice {
      //      color: #DA5A44;
      //      &::before {
      //        background: #FFED63;
      //      }
      //    }
      //  }
      //  .yearCelebrationDiscountLabel {
      //    background-image: url('@/pages/yearCelebration/assets/mk1_10.png');
      //  }
      //}
    }
  }
  .jumpBox {
    padding-top: 100px;
    .jumpBtn {
      margin: 8px auto 0;
      width: 304px;
      height: 93px;
      background: url('@/pages/labaFestival/assets/mk1_8.png') no-repeat left top/100% 100%;
      font-size: 32px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
  }
  .rules-text{
    img {
      margin: 0 5px;
      width: 45px;
      height: auto;
    }
    .pydIcon {
      width: auto;
      height: 40px;
    }
  }
}
</style>
