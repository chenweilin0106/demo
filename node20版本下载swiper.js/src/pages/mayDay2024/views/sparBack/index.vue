<template>
  <div class="SparBack_out">
    <PublicContainer class="SparBack">
      <!-- 累计获得积分 -->
      <div class="get_point flex align-center justify-center line-height-100">
        <div class="left">累积获得积分：</div>
        <div class="right">{{ pageData.point_accumulated }}</div>
      </div>
      <!-- 已消耗积分 -->
      <PublicCard class="point_show flex-column align-center justify-center">
        <div class="item flex align-center justify-center" v-for="item in pageData.spend_list" :key="item.id">
          <span class="flex align-center justify-center line-height-100">
            每消耗{{ item.target }}个
            <img :src="IconPath(item.icon_s)" />
            ：<i>积分+1</i>
          </span>
          <span class="flex align-center justify-center line-height-100">已消耗：{{ character_omission(item.current, 6) }}</span>
        </div>
      </PublicCard>
      <!-- 可用积分 -->
      <div class="use_point flex align-center justify-center line-height-100">
        <div class="left">可用积分：</div>
        <div class="right">{{ pageData.spar_point }}</div>
      </div>
      <!-- 兑换 -->
      <div class="point_reward flex align-center justify-center">
        <PublicCard class="point_award_item flex-column align-center justify-between" v-for="item in pageData.exchange_list" :key="item.id">
          <p class="line-height-100 text-nowrap">
            消耗<span>{{ item.price }}个积分</span>兑换
          </p>
          <div class="img-box flex-column align-center">
            <div class="img-top flex align-center justify-center">
              <img :src="IconPath(item.icon)" />
            </div>
            <div class="img-bottom flex align-center justify-center line-height-100">{{ item.name }}+{{ item.nums }}</div>
          </div>
          <p class="line-height-100">每日限兑：{{ item.current }}/{{ item.max }}</p>
          <PublicButton class="exchange_btn" :has-right="item.current == 50 ? 2 : 0" @click="exchangeSpar(item)">
            {{ item.current == 50 ? '已兑完' : '兑换' }}
          </PublicButton>
        </PublicCard>
      </div>
      <!-- 说明文字 -->
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间消耗晶石获得的积分可用于<i>兑换绿晶石</i></li>
          <li><i>和紫晶石</i></li>
          <li><span></span>活动期间绿晶石和紫晶石<i>每日各限兑50次</i></li>
          <li><span></span>积分由系统<i>自动派发</i>，无需手动领取</li>
        </ul>
      </div>
    </PublicContainer>
    <!--兑换晶石-->
    <ExchangeSparPopup v-if="showExchangeSparPopup" :config="exchangeSparPopupData" @close="showExchangeSparPopup = false" @update="updateData" />
  </div>
</template>

<script>
import { character_omission } from '@/pages/mayDay2024/utils/tool' // 字符串省略
import { sparBack } from '../../utils/pageData' // 导入默认数据
import getPageDataMixin from '@/pages/mayDay2024/mixins/getPageDataMixin' // 获取页面数据混入
import buttonMixin from '@/pages/mayDay2024/mixins/buttonMixin'
import PublicCard from '@/pages/mayDay2024/components/publicCard.vue'
import PublicButton from '@/pages/mayDay2024/components/publicButton.vue' // 按钮样式混入
import ExchangeSparPopup from './components/exchangeSparPopup.vue' // 兑换晶石弹框

export default {
  name: 'SparBack',
  mixins: [buttonMixin, getPageDataMixin],
  components: {
    PublicButton,
    PublicCard,
    ExchangeSparPopup
  },
  data() {
    return {
      exchangeSparPopupData: {},
      showExchangeSparPopup: false
    }
  },
  async created() {
    // 导入默认数据
    this.pageData = sparBack
    // 获取页面数据
    await this.getPageData({ type: 'tab', mark: 'm6' })
  },
  computed: {
    surpriseData() {
      return {
        receive_ljs_num: this.pageData.receive_ljs_num,
        use_ljs_num: this.pageData.use_ljs_num,
        need_ljs_num: this.pageData.need_ljs_num
      }
    }
  },
  methods: {
    exchangeSpar(params) {
      if (params.current >= 50) return
      this.exchangeSparPopupData = params
      this.showExchangeSparPopup = true
    },
    updateData(params) {
      this.pageData = { ...this.pageData, ...params }
    },
    character_omission
  }
}
</script>

<style scoped lang="scss">
.SparBack {
  margin-top: -11px;
  padding-top: 94px;
  height: 1040px;
  .get_point,
  .use_point {
    margin: 0 auto;
    padding: 0 22px;
    justify-content: space-between;
    color: #ffffff;
    font-size: 24px;
    width: 660px;
    height: 60px;
    background: #0668e1;
    border-radius: 30px;
    > .left {
      font-size: 24px !important;
    }
    > .right {
      font-size: 24px !important;
      color: #fff883;
    }
  }
  .point_show {
    margin: 15px auto 26px;
    width: 684px;
    height: 184px;
    .item {
      font-size: 24px;
      justify-content: space-between;
      color: #fff;
      overflow: hidden;
      width: 600px;
      height: 60px;
      background: url('@/pages/mayDay2024/assets/mk6_2.png') no-repeat left top/100% 100%;
      > span {
        &:nth-child(1) {
          justify-content: flex-start;
          padding-left: 20px;

          i {
            color: #fff883;
          }
        }
        &:nth-child(2) {
          min-width: 200px;
          height: 100%;
          padding-left: 44px;
          padding-right: 8px;
          background: url('@/pages/mayDay2024/assets/mk6_3.png') no-repeat left top/100% 100%;
          color: #4a50d1;
        }
      }

      img {
        height: 50px;
        margin: 0 2px;
      }
    }
    .item:nth-of-type(1) {
      margin-bottom: 24px;
    }
  }
  .use_point {
    margin: 0 auto 18px;
  }
  .point_reward {
    margin: 0 auto 20px;
    width: 660px;
    justify-content: space-between;
    .point_award_item {
      width: 320px;
      height: 360px;
      font-size: 28px;
      color: #fff;
      padding: 28px 0;
      //background: url('@/pages/mayDay2024/assets/mk6_5.png') no-repeat left top/100% 100%;
      p {
        span {
          color: #fffaa6;
        }
        &:nth-child(3) {
          font-size: 24px;
        }
      }
      .img-box {
        display: flex;
        flex-direction: column;
        width: 180px;
        height: 140px;
        background: url('@/pages/mayDay2024/assets/mk6_5.png') no-repeat left top/100% 100%;

        .img-top {
          width: 100%;
          height: 84px;

          img {
            position: relative;
            top: 4px;
            height: 100%;
          }
        }

        .img-bottom {
          margin-top: 6px;
          width: 140px;
          height: 36px;
          background: #bdffff;
          border-radius: 18px;
          font-size: 24px;
          color: #4a50d1;
        }
      }
      .exchange_btn {
        font-size: 28px;
        width: 156px;
        height: 56px;
      }
      .button-receive {
        background-image: url('@/pages/mayDay2024/assets/btn_7.png');
      }
      .button-finish {
        background-image: url('@/pages/mayDay2024/assets/btn_7_1.png');
      }
    }
  }
  .rules-text {
    margin-left: 80px;
    i {
      color: #ff78d0;
    }
  }
}
</style>
