<template>
  <out-box class="ReceivingGifts">
    <div class="ReceivingGifts-content">
      <div class="text text-1 text-nowrap flex align-center line-height-100">活动期间累计收到{{ propsData.masonry_max }}钻石礼物</div>

      <div class="text text-3 text-nowrap flex align-center line-height-100 text-indent-half">
        （{{ numberLimit(propsData.masonry_nums, propsData.masonry_max) }}/{{ propsData.masonry_max }}）
      </div>

      <div class="text text-2 text-nowrap flex align-center line-height-100">
        且累计充值满{{ propsData.recharge_max }}元<i class="block text-indent-half line-height-100"
          >（{{ numberLimit(propsData.recharge_nums, propsData.recharge_max) }}/{{ propsData.recharge_max }}）</i
        >
      </div>

      <div class="title-content flex justify-center flex-no-wrap margin-row-center">
        <div class="reward-title flex-shrink-0 flex justify-center">
          <public-json v-if="showTitle" :jsonName="showTitle" />
        </div>
        <img :src="IconPath(buttonIcon)" class="button flex-shrink-0" @click="receiveReward" />
      </div>
    </div>

    <div class="rule-text">
      <ul>
        <li><span></span>自己赠送自己的钻石礼物<i>不计算在内</i></li>
        <li><span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i></li>
        <li><i>基础魅力值，魅力值上限提高50%</i></li>
      </ul>
    </div>
    <congrats-get-prompt ref="congratsGet">
      <template>
        <public-json :jsonName="showTitle" />
      </template>
    </congrats-get-prompt>
  </out-box>
</template>

<script>
import { _throttle, numberLimit } from '@/pages/whiteValentine/utils/tool'
import PublicJson from '@/pages/whiteValentine/components/PublicJson.vue'
import CongratsGetPrompt from '@/pages/whiteValentine/components/congrats-get-prompt.vue'
import { getPageData } from '@/pages/whiteValentine/api'

export default {
  name: 'ReceivingGifts',
  components: { CongratsGetPrompt, PublicJson },
  props: ['propsData'],
  data() {
    return {}
  },
  computed: {
    hasRight() {
      return this.propsData.award_list[0].has_right
    },
    showTitle() {
      // 0 ch_yjzq_man 1 ch_yjzq_woman
      if (this.propsData.gender == '') return ''
      return this.propsData.gender == 0 ? 'ch_yjzq_man' : 'ch_yjzq_woman'
    },
    // 0 btn_lq_02.png 1 btn_lq_01.png 2 btn_lq_03.png
    buttonIcon() {
      return this.hasRight == 1 ? 'btn_lq_01.png' : this.hasRight == 2 ? 'btn_lq_03.png' : 'btn_lq_02.png'
    }
  },
  created() {},
  methods: {
    receiveReward: _throttle(async function () {
      if (this.hasRight != 1) return
      const res = await getPageData({ type: 'white_gift_receive', mark: this.propsData.award_list[0].award_id })
      if (res.errno) return this.$toast(res.errmsg)
      this.openPrompt('congratsGet', [res.data.awards])
      this.$emit('update')
    }, 1000),
    numberLimit
  }
}
</script>

<style scoped lang="scss">
.ReceivingGifts {
  margin: -25px 0 20px;
  height: 763px;
  padding-top: 175px;

  .ReceivingGifts-content {
    margin: 0 auto 40px;
    padding-top: 29px;
    width: 675px;
    height: 373px;
    background: url('@/pages/whiteValentine/assets/ch_bg_01.png') no-repeat left top/100% 100%;

    .text {
      margin-left: 44px;
      font-weight: bold;
      font-size: 30px;
      color: #ffffff;
    }

    .text-1 {
    }
    .text-3 {
      font-weight: 500;
      font-size: 24px;
      color: #fff79a;
      margin-top: 13px;
      margin-bottom: 13px;
    }

    .text-2 {
      margin-bottom: 13px;
      > i {
        font-weight: 500;
        font-size: 24px;
        color: #fff79a;
      }
    }

    .title-content {
      width: fit-content;
      height: 185px;

      .reward-title {
        padding-top: 32px;
        width: 339px;
        height: 185px;
        background: url('@/pages/whiteValentine/assets/chbg.png') no-repeat left top/100% 100%;

        .PublicJson {
          width: 207px;
          height: 95px;
        }
      }

      .button {
        margin-top: 30px;
        margin-left: 84px;
        width: 149px;
        height: 149px;
      }
    }
  }

  .rule-text {
    margin-left: 82px;
    width: 614px;
    line-height: 40px;

    li:nth-child(1) {
      margin-bottom: 18px;
    }

    span {
      top: 13px;
    }

    i {
      color: #8994d9;
    }
  }
}
</style>
