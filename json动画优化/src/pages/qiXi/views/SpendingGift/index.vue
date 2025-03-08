<template>
  <div class="SpendingGift">
    <WeddingGifts
      :mic_data="mic_data"
      :user_mic_type="user_mic_type"
      :user_gender="pageData.user_gender"
      :marriage_gift="marriage_gift"
      @clickWeddingGiftsBtn="clickWeddingGifts"
    ></WeddingGifts>
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <ThemeDialog
      :isSmall="true"
      :isShow="showDialog"
      dialogMark="congratsGet"
      :titleIconObj="{ congratsGet: 'title_6.png' }"
      @closeDialog="
        showDialog = false
        closeDialog()
      "
    >
      <DialogCongrats
        btnText="我知道了"
        :isMultiple="true"
        :awardData="dialogData.awards"
        @onCongratsBtn="showDialog = false"
      >
        <PublicJson
          :lottieJson_name="mic_data[user_mic_type].name"
          :lottieJson="mic_data[user_mic_type].data"
          :userAvatar="$store.getters.user_icon"
        />
      </DialogCongrats>
    </ThemeDialog>
  </div>
</template>

<script>
// 以爱告白-粉色
import female520 from '../../assets/lottie/female520/data.json'
// 以爱告白-蓝色
import male520 from '../../assets/lottie//male520/data.json'
// json组件
import PublicJson from '../../components/PublicJson'
// 恭喜获得组件
import DialogCongrats from '../../components/Dialog/DialogCongrats'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 结婚贺礼
import WeddingGifts from './components/WeddingGifts'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 导入默认数据
import { spendingGift } from '../../utils/pageData'
// 接口导入
import { getPageData } from '../../api/index'
export default {
  name: 'SpendingGift',
  components: {
    CumulativeSpendingList,
    WeddingGifts,
    ThemeDialog,
    DialogCongrats,
    PublicJson
  },
  data() {
    return {
      mic_data: {
        female520: {
          name: 'female520',
          data: female520
        },
        male520: {
          name: 'male520',
          data: male520
        }
      },
      showDialog: false,
      dialogData: {}
    }
  },
  computed: {
    // 根据性别渲染头饰
    user_mic_type() {
      return this.pageData.user_gender == '0' ? 'male520' : 'female520'
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
    this.pageData = spendingGift
    // 页面数据请求
    this.getPageData({
      type: 'tab',
      mark: 'm3'
    })
  },
  methods: {
    // 弹框关闭后事件
    closeDialog() {
      this.dialogData = {}
    },
    // 结婚贺礼领取
    async clickWeddingGifts() {
      const { errno, errmsg } = await this.WeddingGiftsApi()
      if (errno) return this.$toast(errmsg)
      this.dialogData = {
        awards: [
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
      }
      this.showDialog = true
      this.pageData.marriage_gift.has_right = 2
    },
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.getAwardApi(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
    // 累积消费返利列表领取接口
    async getAwardApi(mark) {
      return await getPageData({
        type: 'consume_reward',
        mark
      })
    },
    // 七夕结婚贺礼奖励领取接口
    async WeddingGiftsApi() {
      return await getPageData({
        type: 'marriage_gift_receive'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.SpendingGift {
  .van-dialog {
    .PublicJson {
      ::v-deep .micAvatar_img {
        width: 48px !important;
        height: 48px !important;
      }
    }
  }
  // 获赠榜单-赠送榜单
  .PresentGift_BottonBox {
    .PresentGift_BottonBox-tab {
      margin-bottom: 10px;
      height: 50px;
      .theme_tabs_item {
        height: 36px;
        font-size: 16px;
        line-height: 36px;
      }
      // 底部tab栏活动
      .theme_tabs_item_active {
        font-size: 20px !important;
        font-weight: 500 !important;
        height: 50px !important;
      }
    }
    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 10px;
      overflow: hidden;
      // 我的道具数量
      .top_my_goods {
        width: 100%;
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
