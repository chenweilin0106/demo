<template>
  <!-- 合成道具 -->
  <themeBox class="ExchargeGift" :themeTitleImg="'title_6.png'">
    <!-- 我的龙珠 -->
    <div class="theme_present ExchargeGift_my_present flex_across">
      我的龙珠
      <img v-lazy="require('../../assets/js_40_39.png')" alt="" />
      ：
      <span class="ExchargeGift_my_present_num text_overHiddem">
        {{ pageData.bead_nums }}
      </span>
    </div>
    <!-- 奖励合成 -->
    <div class="ExchargeGift_list">
      <!-- 每一项 -->
      <ExchargeGiftItem
        :giftData="giftData"
        @readyExcharge="openExchargeGiftDialog"
      />
    </div>
  </themeBox>
</template>

<script>
import ExchargeGiftItem from './ExchargeGiftItem'
export default {
  name: 'ExchargeGift',
  components: {
    ExchargeGiftItem
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 兑换好礼弹框兑换按钮
    async exchargeGift() {
      const { goods_id, type, max_times } = this.dialogData
      // 兑换请求
      const res = await this.mergeRequest({
        'mark[id]': goods_id,
        'mark[nums]': this.inputNum
      })
      // 请求错误 toast提示
      if (res.errno) return this.$toast(res.errmsg)
      // 更新积分
      // this.pageData.bead_nums = res.data.bead_nums
      // 如果次数有限制，更新次数
      if (max_times) {
        const awardInfo = this.pageData.merge_list.find(
          (item) => item.type == type
        )
        awardInfo.exchange_times = +awardInfo.exchange_times + +this.inputNum
        awardInfo.has_right =
          awardInfo.exchange_times == awardInfo.max_times ? 2 : 1
      }
      // 只有召唤石和靓号券包有次数限制，所以只需要判断这两个
      // if (type == 'hero_tools' || type == 'pretty_card') {
      //   // 更新数据，更新按钮状态
      //   const findObj = this.pageData.merge_list.find(
      //     (item) => item.type == type
      //   )
      //   findObj.exchange_times = +findObj.exchange_times + +this.inputNum
      //   findObj.has_right = findObj.exchange_times == findObj.max_times ? 2 : 1
      // }
      this.dialogType = 'congratsGetDialog'
      // 更新弹框数据
      this.dialogData = res.data.awards
    },
    // 打开兑换好礼弹框
    openExchargeGiftDialog(giftData) {
      if (+this.pageData.bead_nums >= +giftData.price) {
        this.dialogData = giftData
        this.dialogType = 'exchargeGiftDailog'
        this.showDialog = true
      } else {
        this.$toast('积分不足')
      }
    },
    // 恭喜获得弹框按钮
    async onCongratsGetClick() {
      const { type, id } = this.dialogData
      const mergeEquipArr = ['voice', 'costume']
      if (mergeEquipArr.includes(this.dialogData.type)) {
        this.$toast(
          (
            await this.nowEquip({
              type,
              id
            })
          ).errmsg
        )
      }
      this.showDialog = false
    },
    // 退出弹框后执行的事件
    closeDialog() {
      this.inputNum = 1
      this.dialogData = {}
      this.dialogType = ''
    },
    // 恭喜获得弹框内兑换请求
    async exchargeGiftApi(data) {
      // return await getPageData({
      //   type: 'naughty_convert',
      //   ...data
      // })
    },
    //  领取并装扮请求
    async nowEquipApi(data) {
      // return await nowEquip(data)
    }
  }
}
</script>

<style scoped lang="scss">
> .ExchargeGift {
  width: 100%;
  ::v-deep .white_border {
    padding: 22px 0;
    .ExchargeGift_my_present {
      .ExchargeGift_my_present_num {
        max-width: 43px;
      }
    }
    .ExchargeGift_list {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      .ExchargeGift_item {
        margin-top: 13px;
        width: 95px;
        height: 157px;
        background: linear-gradient(0deg, #719dee, #8fd1e9);
        border-radius: 10px;
        padding-top: 7px;
        .top_img {
          width: 69px;
          height: 69px;
          background: #4f82d9;
          border: 2px solid #e3f2ff;
          border-radius: 10px;
          margin-bottom: 8px;
          > img {
            width: 100%;
          }
          .merge_lottie {
            .PublicJson {
              .micAvatar_img {
                width: 78% !important;
                height: 78% !important;
              }
            }
          }
        }
        .middle_text {
          p:nth-of-type(1) {
            width: 100%;
            color: #fff;
            font-size: 13px;
          }
          p:nth-of-type(2) {
            font-size: 12px;
            color: #fff68f;
            width: 100%;
            margin: 6px 0;
          }
        }
        .bottom_btn {
          width: 75px;
          height: 24px;
          border-radius: 12px;
          font-size: 13px;
          justify-content: flex-start;
          > img {
            margin-right: 3px;
            height: 20px;
          }
          > span {
            color: #e57700;
            font-size: 12px;
            text-align: left;
            width: 14px;
          }
        }
        .flex_across {
          justify-content: center !important;
        }
      }
    }
  }
}
</style>
