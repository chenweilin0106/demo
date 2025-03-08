<template>
  <div class="LoveGiftBag">
    <LoveGift
      v-for="gift in pageData.gift_list"
      :key="gift.gift_id"
      :gift_data="gift"
      :style_type="gift.gift_id === 1 || gift.gift_id === 4 ? 'black' : 'white'"
      :title_icon="gift_title_icon[gift.gift_id]"
      :has_foot="gift.gift_id !== 4"
      @buyGift="buyGift"
      @updateData="getPageData"
      @showAward="showAward"
    >
      <PublicSvga svgaName="jz_cczj" />
    </LoveGift>
    <!-- 兑换好礼弹框 -->
    <ThemeDialog
      :isShow="showDialog"
      :dialogMark="dialogMark"
      :titleIconObj="{ congrats_get: 'title_8.png' }"
      :isSmall="true"
      @closeDialog="
        showDialog = false
        closeDialog()
      "
    >
      <!-- 恭喜获得弹框 -->
      <div class="dialog_congrats" v-if="dialogMark === 'congrats_get'">
        <DialogCongrats
          :class="{ dialog_congrats_2: dialogData.awards.length === 2 }"
          :isMultiple="true"
          :awardData="dialogData.awards"
          btnText="我知道了"
          @onCongratsBtn="showDialog = false"
        >
          <div class="svga_box flex_across">
            <PublicSvga svgaName="jz_cczj" />
          </div>
        </DialogCongrats>
      </div>
    </ThemeDialog>
    <!-- 预览弹框 -->
    <ThemeDialog
      :isShow="show_award"
      :isSmall="false"
      @closeDialog="
        show_award = false
        closeDialog()
      "
    >
      <!-- 座驾背景 -->
      <div class="car_back flex_across" v-if="award_name === '座驾'">
        <PublicJson
          :lottieJson_name="'car_cupid_2'"
          :lottieJson="car_cupid_2"
        />
      </div>
      <!-- 气泡框 -->
      <div class="bubble" v-else></div>
      <!-- 关闭按钮 -->
      <div class="off_btn" @click="show_award = false"></div>
      <!-- 道具名称 -->
      <div class="award_name flex_across">
        {{ award_name === '座驾' ? '爱神丘比特·座驾' : '甜蜜泡泡·气泡框' }}
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
// 丘比特座驾动画json
import car_cupid_2 from '../../assets/lottie/car_cupid_2/data.json'
import PublicJson from '../../components/PublicJson'
// svga组件
import PublicSvga from '../../components/PublicSvga'
// 恭喜获得弹框组件
import DialogCongrats from '../../components/Dialog/DialogCongrats'
// 默认数据
import { loveGiftBag } from '../../utils/pageData'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// APP钻石充值弹框
import { rechargeDialog } from '../../utils/toApp'
// 礼包组件
import LoveGift from './components/LoveGift'
// 页面数据接口
import { getPageData, buyGift } from '../../api/index'
export default {
  name: 'LoveGiftBag',
  components: {
    LoveGift,
    ThemeDialog,
    DialogCongrats,
    PublicSvga,
    PublicJson
  },
  data() {
    return {
      car_cupid_2,
      showDialog: false,
      dialogData: {},
      dialogMark: '',
      // 礼包标题图标
      gift_title_icon: {
        1: 'title_3.png',
        2: 'title_4.png',
        3: 'title_5.png',
        4: 'title_6.png'
      },
      show_award: false,
      award_name: ''
    }
  },
  async created() {
    // 导入默认数据
    this.pageData = loveGiftBag
    // 页面数据请求
    await this.getPageData()
  },
  methods: {
    // 预览道具（丘比特座驾和气泡）
    showAward(name) {
      this.award_name = name
      this.show_award = true
    },
    // 购买礼包
    async buyGift(data) {
      const res = await this.buyGiftApi(String(data.gift_id))
      // 钻石不足
      if (res.errno === 3) {
        return rechargeDialog(data.new_price)
      }
      // 购买失败
      if (res.errno) return this.$toast(res.errmsg)
      // // 购买成功
      this.dialogData = data
      this.dialogMark = 'congrats_get'
      this.showDialog = true
      // 更新数据
      await this.getPageData()
    },
    // 弹框关闭后
    closeDialog() {
      this.dialogMark = ''
      this.dialogData = {}
      this.award_name = ''
    },
    // 购买礼包接口
    async buyGiftApi(gift_id) {
      return await buyGift({ gift_id })
    },
    // 页面数据接口
    async getPageData() {
      const res = await getPageData({ mark: '2' })
      // 页面数据请求失败
      if (res.errno) return this.$toast(res.errmsg)
      const {
        data: { gift_list }
      } = res
      // 只更新本地数据中的按钮状态，购买次数，下次购买时间
      gift_list.forEach((item, index) => {
        const { finish_times, has_right, next_time } = item
        const loc_gift_list = this.pageData.gift_list
        loc_gift_list[index].finish_times = finish_times
        loc_gift_list[index].has_right = has_right
        loc_gift_list[index].next_time = next_time
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.LoveGiftBag {
  margin-top: 47px;
  .van-dialog {
    ::v-deep .ThemeDialog_bgc {
      padding-top: 10px !important;
      .car_back {
        margin: 7px auto 0;
        width: 213.5px;
        height: 370px;
        background: url('../../assets/tk_bg_1.png') no-repeat top center/100%
          auto;
      }
      .off_btn {
        position: absolute;
        right: -15px;
        top: -16px;
        width: 50.5px;
        height: 46.2px;
        background: url('../../assets/tk_1.png') no-repeat top center/100% auto;
      }
      .bubble {
        margin: 0 auto -13px;
        width: 93px;
        height: 93px;
        background: url('../../assets/tmpp_120_120.png') no-repeat top
          center/100% auto;
      }
      .award_name {
        margin: 13px 0 27px;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
  ::v-deep .dialog_congrats {
    .AwardItem_Box {
      margin-bottom: 5px;
      .Award_Icon {
        width: 64px;
        height: 64px;
        border: none;
        background: #826dd7;
        padding: 2px;
        img {
          background: #fff;
          border-radius: 6px;
        }
        .PublicSvga {
          width: 46px;
          height: 46px;
        }
      }
    }
    .DialogCongrats_Btn {
      margin: 18px auto 18px;
    }
    .svga_box {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      background: #fff;
    }
  }
  ::v-deep .dialog_congrats_2 {
    .Multiple_Awards {
      margin-top: 40px;
      justify-content: center;
      .AwardItem_Box {
        margin: 0 5px;
      }
    }
  }
  // 钻石不足弹框
  .diamonds_fail {
    > p {
      margin-top: 18px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
    }
    .diamonds_fail_btn {
      margin: 16px 0 7px;
      justify-content: space-around;
      .cancel_btn,
      .recharge_btn {
        width: 90px;
        height: 40px;
        border-radius: 40px;
        font-size: 16px;
        border-width: 2px !important;
      }
      .cancel_btn {
        background: linear-gradient(0deg, #cae7ff, #ffffff);
      }
    }
  }
  .LoveGift:nth-of-type(1) {
    margin-bottom: 60px;
    ::v-deep .main_black {
      .award_list {
        padding-top: 2px;
      }
    }
  }
  .LoveGift:nth-of-type(2) {
    margin-bottom: 64px;
  }
  .LoveGift:nth-of-type(3) {
    margin-bottom: 61px;
  }
  .LoveGift:nth-of-type(4) {
    margin-bottom: 38px;
  }
}
</style>
