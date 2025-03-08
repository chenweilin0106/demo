<template>
  <div class="PointReward">
    <!-- 任务列表 -->
    <OutBox class="task-list" :bottom="true">
      <PublicCard v-for="(taskItem, key) in pageData.task_list" :key="key" class="task-item">
        <!-- 任务奖励 -->
        <div class="icon-content">
          <div class="icon flex align-center justify-center">
            <img :src="IconPath(pointIcon)" />
          </div>
          <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
        </div>
        <div class="text-content">
          <p>{{ taskItem.task_name }}</p>
          <p>
            <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'">系统自动派发，无需手动领取</span>
            <span v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
          </p>
        </div>
        <!-- 按钮 -->
        <PublicButton v-if="taskItem.need_rev" class="task-button" :hasRight="taskItem.has_right" @click="onTaskItemClick(taskItem, key)">
          {{ GoodsTaskButtonText(taskItem.has_right, taskItem.is_recharge) }}
        </PublicButton>
      </PublicCard>
      <!-- 说明文字 -->
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员(含超值兑换中兑换会员)、活力卡</li>
          <li>不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <!-- 需要自测 -->
    <OutBox class="exchange-list" title="title_1.png" leftBalloon="true" rightBalloon="true">
      <!-- 我的道具 -->
      <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ pageData.my_goods }}</div>
      <PublicCard v-for="goods in pageData.goods_list" :key="goods.goods_name" class="exchange-item">
        <div class="left-content flex flex-column">
          <!-- 道具图标 -->
          <div class="icon-content">
            <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
            <!-- 锁定状态 -->
            <div v-if="isLock(goods.spend_cond)" class="lockStatus flex align-center justify-center"><img :src="IconPath('mk1_2.png')" /></div>
            <!--<div v-if="goods.mark" class="priceLabel flex align-center justify-center line-height-100 position-absolute">-->
            <!--  {{ goods.mark }}-->
            <!--</div>-->
          </div>
          <!-- 道具名称 -->
          <div class="text-content flex-1 flex justify-center align-center text-nowrap line-height-100">{{ goods.goods_num_text }}</div>
        </div>
        <!-- 道具描述 -->
        <div class="text-content">
          <p v-if="goods.type === 'lucky_key' || goods.type === 'pretty_card'">
            消耗<span>{{ goods.price }}个{{ pointName }}</span
            >兑换 第二个<span>半价</span>
          </p>
          <p v-else>
            消耗<span>{{ goods.price }}个{{ pointName }}</span
            >兑换
          </p>
          <p v-if="goods.max_times == 0" :class="{ Middle_Text: isLock(goods.spend_cond) }">不限兑换次数</p>
          <!-- 判断是否是锁定状态样式 -->
          <p v-else :class="{ Middle_Text: isLock(goods.spend_cond) }">限兑：{{ goods.exchange_times }}/{{ goods.max_times }}</p>
          <!-- 锁定状态 -->
          <p class="lockStatus_Text" v-if="isLock(goods.spend_cond)">累计消耗{{ goods.spend_cond }}个{{ pointName }}解锁</p>
        </div>
        <!-- 兑换按钮 -->
        <PublicButton
          v-if="!goods.spend_cond || goods.spend_cond <= pageData.spend_point"
          class="exchange-item-button"
          :hasRight="goods.has_right"
          :buttonStyle="{ 1: 'button-noFinish', 2: 'button-finish' }"
          @click="onExchangeClick(goods)"
        >
          {{ ButtonText('2', goods.has_right) }}
        </PublicButton>
      </PublicCard>
      <!-- 规则说明 -->
      <div class="rules-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </OutBox>
    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup
      v-if="showExchangeGiftsPopup"
      v-bind="exchangeGiftsPopupData"
      @update="updateGoodsList"
      @clickClose="showExchangeGiftsPopup = false"
    />
  </div>
</template>

<script>
import { _throttle } from '@/pages/dragonBoat/utils/tool'
import { pointReward } from '@/pages/dragonBoat/utils/pageData'
import { getPageData } from '@/pages/dragonBoat/api/index'
import getPageDataMixin from '@/pages/dragonBoat/mixins/getPageDataMixin'
import buttonMixin from '@/pages/dragonBoat/mixins/buttonMixin'
import { recharge } from '@/pages/dragonBoat/utils/toApp'
const ExchangeGiftsPopup = () => import('./components/exchangeGiftsPopup.vue')

export default {
  name: 'PointReward',
  mixins: [getPageDataMixin, buttonMixin],
  components: { ExchangeGiftsPopup },
  data() {
    return {
      exchangeGiftsPopupData: { pointIcon: '', pointName: '', my_goods: '', type: '' }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 兑换好礼弹框显示状态
      pointIcon: 'zz_62_57.png', // 道具图标
      pointName: '粽子' // 道具名称
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
    this.exchangeGiftsPopupData = { pointIcon: this.pointIcon, pointName: this.pointName }
  },
  methods: {
    // 需要自测 是否锁定
    isLock(spend_cond) {
      return spend_cond && spend_cond > this.pageData.spend_point
    },
    // 兑换好礼列表更新事件
    updateGoodsList(res) {
      this.$toast(res.errmsg)
      // 兑换成功 更新数据
      if (res.errno != 0) return
      this.pageData.my_goods = res.data.goods
      this.pageData.goods_list = res.data.goods_list
    },
    // 任务列表按钮文本
    GoodsTaskButtonText(has_right, is_recharge) {
      return (has_right == 0 && is_recharge && '去完成') || this.ButtonText('1', has_right)
    },
    // 任务列表领取按钮点击事件（key标识点击的是哪个任务，isRecharge标识是否跳转充值）
    onTaskItemClick: _throttle(async function ({ has_right, is_recharge }, key) {
      if (has_right == 0 && is_recharge) return recharge(this.hiddenFn)
      if (has_right != 1) return
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno != 0) return // 请求出错
      this.pageData.my_goods = res.data.goods
      this.pageData.task_list[key].has_right = res.data.has_right
    }, 1000),
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    onExchangeClick(param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.exchangeGiftsPopupData = { ...this.exchangeGiftsPopupData, my_goods: this.pageData.my_goods, type: param.type }
      this.showExchangeGiftsPopup = true
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.pageData.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'tab', mark: 'm1' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.outBox {
  padding-bottom: 40px; // 本来应该写在组件内部的 但是已经开始开发了 补救一下
}
// publicCard大小 $width: 宽度 $height: 高度 $marginBottom: 底部间距 $borderRadius: 圆角
@mixin publicCardSize($width, $height, $marginBottom, $borderRadius: 20px) {
  margin: 0 auto $marginBottom;
  width: $width;
  height: $height;
  border-radius: $borderRadius;
}
// 道具图标大小 $width: 宽度 $height: 高度
@mixin pointIconSize($width: 62px, $height: 57px) {
  width: $width;
  height: $height;
}
// 文本背景色和字体颜色 $bgc: 背景色 $fontColor: 字体颜色
@mixin textMixin($bgc: #358e94, $fontColor: #fff) {
  background-color: $bgc;
  color: $fontColor;
}
// -------------------------------------------------------------
// 任务卡片大小
@mixin taskCard() {
  @include publicCardSize($width: 660px, $height: 137px, $marginBottom: 19px);
}
// 道具图标大小
@mixin taskIcon() {
  @include pointIconSize;
}
// 道具图标下方文本
@mixin taskIconTxt() {
  @include textMixin;
}
$taskIconBorder: #fbe590; // 任务列表中道具边框颜色
$taskIconBg: #fff; // 任务列表中道具图标背景颜色
$taskContentColor: #fff; // 任务列表中任务内容字体颜色
$taskFinishColor: #ffef85; // 任务列表中任务完成情况字体颜色
// 任务列表下方说明文本中的道具图标大小
@mixin rulesTxtIconSize() {
  @include pointIconSize(42px, 37px);
}
// -------------------------------------------------------------
// 我的道具数量（道具名由活动决定）
@mixin myPointNum() {
  @include textMixin;
  > img {
    @include pointIconSize(42px, 37px);
  }
}
// 兑换卡片大小
@mixin exchangeCard() {
  @include publicCardSize(660px, 160px, 25px, 12px);
}
// 兑换好礼左侧
@mixin exchangeLeft() {
  width: 240px;
  //background: url('@/pages/dragonBoat/assets/') no-repeat left top/100% 100%; // 背景
  .icon-content {
    height: 124px;
    background: linear-gradient(180deg, #fcf1bd, #ffffff); // 兑换列表中道具图标背景色
    border-radius: 12px 0 0 0;
    .priceLabel {
      background: linear-gradient(90deg, #ff699e, #9a69ff);
      border: 2px solid #ffffff;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
    }
  }
  // 图片下方字体样式
  .text-content {
    font-size: 24px;
    font-weight: 600;
    border-radius: 0 0 0 12px;
    @include textMixin;
  }
}
$exchangeMiddleTxtFontColor: #fff; // 兑换列表中中间文本字体颜色
$exchangeMiddlePriceFontColor: #fffaa6; // 兑换列表中中间文本背景颜色
// -------------------------------------------------------------
.PointReward {
  // 任务列表
  .task-list {
    margin-top: -78px;
    padding-top: 56px;
    .task-item {
      position: relative;
      display: flex;
      align-items: center;
      @include taskCard;
      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 108px;
        height: 108px;
        padding: 4px;
        margin: 0 26px 0 42px;
        border-radius: 16px;
        background-color: $taskIconBorder;
        .icon {
          width: 100%;
          height: 68px;
          border-radius: 12px 12px 0 0;
          background-color: $taskIconBg;
          // 图片大小
          > img {
            @include taskIcon;
          }
        }
        .text {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 0 12px 12px;
          font-size: 24px;
          white-space: nowrap;
          line-height: 100%;
          @include taskIconTxt;
        }
      }
      .text-content {
        height: 100%;
        p {
          font-size: 30px;
          span {
            font-size: 24px;
          }
        }
        p:nth-child(1) {
          margin-top: 26px;
          color: $taskContentColor;
        }
        p:nth-child(2) {
          color: $taskFinishColor;
          margin-top: 20px;
          margin-left: -12px;
        }
        .recharge_10 {
          margin-left: 12px;
        }
      }
      // 右侧按钮
      .task-button {
        position: absolute;
        right: 29px;
        top: 50%;
        transform: translateY(-50%);
        width: 120px;
        height: 60px;
      }
    }
    .rules-text {
      img {
        @include rulesTxtIconSize;
      }
    }
  }
  // 兑换列表
  .exchange-list {
    margin: 114px auto 0;
    padding-top: 73px;
    // 顶部道具数量
    .my-goods {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      padding: 0 10px;
      min-width: 320px;
      width: fit-content;
      height: 48px;
      border-radius: 24px;
      font-size: 28px;
      @include myPointNum;
    }
    .exchange-item {
      position: relative;
      display: flex;
      @include exchangeCard;
      // 图片样式
      .left-content {
        height: 100%;
        @include exchangeLeft;
        .icon-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          .priceLabel {
            top: -13px;
            right: -29px;
            height: 44px;
            padding: 0 17px;
          }
          .title {
            ::v-deep .jsonBox {
              width: 90%;
            }
          }
          .mic {
            width: 117px;
            height: 116px;
          }
          // 图片icon
          img {
            height: 100%;
          }
          // 锁定样式
          .lockStatus {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 12px 0 0 0;
            > img {
              width: 30px;
              height: auto;
            }
          }
        }
        // 图片下方字体样式
        .text-content {
          font-size: 24px;
          font-weight: 600;
          border-radius: 0 0 0 12px;
        }
      }

      // 中间字体样式
      > .text-content {
        position: relative;
        z-index: 1;
        width: fit-content;
        height: 100%;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        padding-left: 14px;
        span {
          color: $exchangeMiddlePriceFontColor;
        }
        p {
          color: $exchangeMiddleTxtFontColor;
          &:nth-child(1) {
            margin-top: 33px;
            font-size: 28px;
            font-weight: 500;
          }
          &:nth-child(2) {
            margin-top: 36px;
            font-size: 24px;
          }
        }
        .Middle_Text {
          margin: 10px 0 !important;
        }
        .lockStatus_Text {
          font-size: 26px !important;
        }
      }
      // 按钮样式
      .exchange-item-button {
        position: absolute;
        z-index: 2;
        bottom: 18px;
        right: 21px;
        width: 120px;
        height: 48px;
        border-radius: 24px;
      }
    }
  }
}
</style>
