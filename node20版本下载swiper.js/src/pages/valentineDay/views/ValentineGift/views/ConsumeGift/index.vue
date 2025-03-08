<template>
  <div class="ConsumeGift">
    <wedding-gifts
      :user_mic_type="user_mic_type"
      :user_gender="pageData.user_gender"
      :marriage_gift="marriage_gift"
      @clickWeddingGiftsBtn="clickWeddingGifts"
    />

    <out-box class="limitDiscount" title="title_4.png">
      <div class="limitDiscount-text flex-center">
        <div class="rule-text">
          <ul>
            <li><span></span>活动期间，开启情人节CP称号改名限时5折优惠，</li>
            <li>
              改名仅需<i class="focus-color">2600钻石</i
              >，活动结束后价格将恢复原价
            </li>
            <li>5200钻石</li>
            <li><span></span>每个人只能享受一次改名优惠</li>
          </ul>
        </div>
      </div>
    </out-box>

    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />

    <congrats-get-prompt ref="congratsGet">
      <template #default="{ data: { type } }">
        <public-svga
          v-if="type == 'mic'"
          :svgaName="user_mic_type"
          :userAvatar="$store.state.user_icon"
        />
      </template>
    </congrats-get-prompt>
  </div>
</template>

<script>
import PublicSvga from '@/pages/valentineDay/components/PublicSvga.vue'
import CongratsGetPrompt from '@/pages/valentineDay/components/congrats-get-prompt.vue'
import WeddingGifts from './components/WeddingGifts.vue'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 导入默认数据
import { consumeGift } from '../../../../utils/pageData'
// 接口导入
import { moduleThree } from '../../../../api/index'

export default {
  name: 'ConsumeGift',
  components: {
    PublicSvga,
    CongratsGetPrompt,
    WeddingGifts,
    CumulativeSpendingList
  },
  data() {
    return {
      dialogData: [
        {
          icon: 'ljs_120_120.png',
          text: '+100'
        },
        {
          icon: '',
          text: '+3天',
          type: 'mic'
        }
      ]
    }
  },
  computed: {
    // 根据性别渲染头饰
    user_mic_type() {
      return this.pageData.user_gender == '0' ? 'ts_adgb_blue' : 'ts_adgb_pink'
    },
    // 累积消费返利列表数据
    consume_status() {
      return this.pageData.consume_status
    },
    // 七夕结婚贺礼数据
    marriage_gift() {
      return this.pageData.marriage_gift
    }
  },
  created() {
    // 载入默认数据
    this.pageData = consumeGift
    // 页面数据请求
    this.getPageData({
      type: 'tab',
      mark: 'm3'
    })
  },
  methods: {
    // 结婚贺礼领取
    async clickWeddingGifts() {
      const { errno, errmsg } = await moduleThree({
        type: 'marriage_gift_receive'
      })
      if (errno) return this.$toast(errmsg)
      this.dialogData = [
        {
          icon: '',
          id: 0,
          name: '头饰爱的告白',
          nums: 3,
          text: '头饰+3天',
          type: 'mic'
        },
        {
          icon: 'yb_120_120.png',
          id: 'gamegold',
          name: '元宝',
          nums: 200000,
          text: '+20万',
          type: 'property'
        }
      ]
      this.openPrompt('congratsGet', this.dialogData)
      this.pageData.marriage_gift.has_right = 2
    },

    // 领取任务奖励
    async getGiftTaskAward(mark) {
      const res = await this.getGiftTaskAwardApi(mark)
      this.$toast(res.errmsg)
      if (res.errno == 0) {
        this.pageData.award_list.find((item) => item.key == mark).has_right = 2
      }
    },
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.getAward(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
    /*
     * 以下为接口封装
     */
    // 累积消费返利列表领取接口
    async getAward(mark) {
      return await moduleThree({
        type: 'consume_reward',
        mark
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .PublicSvga {
  .micAvatar_img {
    width: 80%;
    height: 80%;
  }
}

.limitDiscount {
  padding-top: 124px;
  height: 411px;

  .limitDiscount-text {
    margin: 0 auto;
    width: 670px;
    height: 185px;
    background: #edddff;
    border-radius: 20px;

    .rule-text {
      width: 598px;
      margin-left: 38px;
    }
  }
}
</style>
