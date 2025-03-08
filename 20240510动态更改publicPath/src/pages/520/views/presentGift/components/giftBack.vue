<template>
  <OutBox class="GiftBack" bowKnot="true">
    <div v-for="(award, index) in giftBackData" :key="index" class="awardCard position-relative flex">
      <div class="awardCard-iconBox flex-column">
        <div class="awardCard-iconContent w-100 flex align-center justify-center">
          <img v-if="award.icon" :src="IconPath(award.icon)" class="awardCard-icon h-100 width-auto" />
          <PublicSvga
            v-else-if="award.type == 'mic'"
            svga-name="ts_yycg"
            :user-avatar="$store.state.user_icon"
            @click.native="showPreviewPopup = true"
          />
        </div>
        <div class="awardCard-textContent w-100 flex-1 text-nowrap flex align-center justify-center line-height-100">
          {{ award.type == 'mic' ? '头饰' : '' }}+{{ award.text }}
        </div>
      </div>
      <div class="awardCard-textBox">
        <div class="awardCard-goodsName line-height-100">累计收到礼物价值达到</div>
        <div class="awardCard-goodsNumber line-height-100 flex align-end">
          {{ award.max_nums }}钻<span class="deep line-height-100">（{{ award.finish_nums }}/{{ award.max_nums }}）</span>
        </div>
      </div>
      <div
        class="awardCard-buttonBox position-absolute position-column-center flex align-center justify-center line-height-100"
        :class="buttonStyleMap[award.has_right]"
        @click="receiveAward(award)"
      >
        {{ buttonTextMap[award.has_right] }}
      </div>
    </div>
    <div class="RuleText">
      <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
        <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
        <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
      </div>
    </div>
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @close="showCongratsGetPopup = false">
      <template v-slot="{ data: { type } }">
        <PublicSvga v-if="type == 'mic'" svgaName="ts_yycg" :userAvatar="$store.state.user_icon" />
      </template>
    </CongratsGetPopup>
    <!--    <PreviewPopup v-if="showPreviewPopup" img-name="ts_yycg.svga" :has-avatar="true" img-text="月曜辰光·头饰" @close="showPreviewPopup = false" />-->
  </OutBox>
</template>

<script>
import { _throttle } from '@/pages/520/utils/tool'
// import PreviewPopup from '@/pages/520/components/previewPopup.vue'
import CongratsGetPopup from '@/pages/520/components/congratsGetPopup.vue'
import { getPageData } from '@/pages/520/api/index.js'
import PublicSvga from '@/pages/520/components/publicSvga.vue'

export default {
  props: {
    giftBackData: {
      type: Array,
      default: () => [
        {
          name: '绿晶石',
          max_nums: 5000,
          type: 'tool',
          id: 2,
          nums: 100,
          text: '100',
          icon: 'ljs_120_120.png',
          key: 5000,
          finish_nums: 0,
          has_right: 0
        },
        {
          name: '紫晶石',
          max_nums: 10000,
          type: 'tool',
          id: 1,
          nums: 60,
          text: '60',
          icon: 'zjs_120_120.png',
          key: 10000,
          finish_nums: 0,
          has_right: 0
        },
        {
          name: '绿晶石',
          max_nums: 15000,
          type: 'tool',
          id: 2,
          nums: 280,
          text: '280',
          icon: 'ljs_120_120.png',
          key: 15000,
          finish_nums: 0,
          has_right: 0
        },
        {
          name: '月曜辰光',
          max_nums: 20000,
          type: 'mic',
          id: 1,
          nums: 80,
          text: '15天',
          icon: '',
          key: 20000,
          finish_nums: 0,
          has_right: 0
        }
      ]
    }
  },
  data() {
    return {
      showPreviewPopup: false, // 预览弹框
      showCongratsGetPopup: false, // 恭喜获得弹框 3个一排
      congratsGetPopupData: [], // 恭喜获得弹框数据
      textList: Object.freeze([
        { text: "活动期间收到钻石礼物可获得<i style='color: #4f85ff'>对应奖励</i>", circle: true },
        { text: "向自己赠送钻石礼物<i style='color: #4f85ff'>不计入在内</i>", circle: true }
      ]),
      buttonTextMap: Object.freeze({ 0: '未完成', 1: '领取', 2: '已领取' }),
      buttonStyleMap: Object.freeze({ 0: 'buttonStyle-0', 1: 'buttonStyle-1', 2: 'buttonStyle-2' })
    }
  },
  components: { PublicSvga, CongratsGetPopup },
  methods: {
    receiveAward: _throttle(async function ({ has_right, key }) {
      if (has_right != 1) return
      const { errmsg, errno, data } = await getPageData({ mark: key, type: 'present_contact_rev' })
      if (errno) return this.$toast(errmsg)
      data.award.text = '+' + data.award.text
      this.congratsGetPopupData = [data.award] // 恭喜获得弹框数据 数据格式仅占位
      this.showCongratsGetPopup = true
      this.$emit('updateGiftBackData', key)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.GiftBack {
  padding-top: 75px;
  margin-top: 19px;
  margin-bottom: 102px;
  height: 886px;
}
.awardCard {
  margin: 0 auto 16px;
  background: linear-gradient(90deg, #8ab3ff, #cfbced, #ffbed6);
  border: 4px solid #ffcfea;
  width: 668px;
  height: 140px;
  border-radius: 16px;
  .awardCard-iconBox {
    margin: auto 26px auto 28px;
    width: 108px;
    height: 108px;
    background: #f6cacf;
    border-radius: 16px;
    padding: 4px;
    .awardCard-iconContent {
      height: 68px;
      border-radius: 12px 12px 0 0; // GoodsCard-iconBox的border-radius - border-width
      background-color: #ffeff3;
      .PublicSvga {
        width: 73px;
        height: 73px;
        ::v-deep .micAvatar_img {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
        }
      }
    }
    .awardCard-textContent {
      font-size: 20px;
      color: #ffffff;
      background: #c16d6f;
      border-radius: 0 0 12px 12px; // GoodsCard-iconBox的border-radius - border-width
    }
  }
  .awardCard-textBox {
    margin: auto 0;
    .awardCard-goodsName {
      font-weight: 500;
      font-size: 30px;
      color: #ffffff;
    }
    .awardCard-goodsNumber {
      margin-top: 24px;
      font-size: 30px;
      color: #fff;
      .deep {
        font-size: 24px;
        color: #fff79a;
      }
    }
  }
  .awardCard-buttonBox {
    right: 29px;
    width: 126px;
    height: 66px;
    border-radius: 33px;
    font-weight: 500;
    font-size: 28px;
    border-width: 3px;
    border-style: solid;
  }
}
.RuleText {
  margin-top: 20px;
  margin-left: 65px;
  width: 473px;
  .row {
    font-size: 28px;
    color: #96526f;
    line-height: 45px;
    .circle {
      left: -30px;
      width: 12px;
      height: 12px;
      background: #ffb5d4;
    }
    ::v-deep img {
      flex-shrink: 0;
      width: 43px;
      height: 42px;
    }
  }
}
.buttonStyle-0 {
  color: #4d7ddd;
  border-color: #fff;
  background-image: linear-gradient(0deg, #cae7ff, #ffffff);
}
.buttonStyle-1 {
  color: #a9792c;
  border-color: #fff;
  background-image: linear-gradient(0deg, #fff9d1, #ffffff);
}
.buttonStyle-2 {
  color: #ffffff;
  border-color: #fff;
  background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7);
}
.PublicSvga {
  ::v-deep .micAvatar_img {
    width: 80%;
    height: 80%;
  }
}
</style>
