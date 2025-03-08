<template>
  <div class="layoutPage">
    <MyBarrage />
  </div>
</template>

<script>
import MyBarrage from '@/components/MyBarrage.vue'
// import MyLottery from '@/components/MyLottery.vue'
// 默认数据
import { pageData, magic_box_awards } from '../utils/pageData.js'
// 请求导入
import {
  getTaskReward,
  sweetsExchange,
  openMagicBox,
  pumpkinExchange,
  nowEquip
} from '../api/index'
// import { compareVersions } from '../utils/toApp'
import { mapGetters } from 'vuex'

export default {
  name: 'layoutPage',
  data() {
    return {
      showDialog: false,
      dialogMark: '',
      dialogData: {},
      magic_box_awards: Object.freeze(magic_box_awards),
      titleIconObj: Object.freeze({
        rule: 'tk_1.png',
        congrats_get: 'tk_3.png',
        magic_box: 'tk_5.png',
        preview_large: 'tk_13.png',
        preview_small: 'tk_13.png'
      })
    }
  },
  components: {
    MyBarrage
    // MyLottery
  },
  computed: {
    ...mapGetters(['uid', 'referal_source', 'app_version']),
    // 南瓜兑换称号信息
    title_exchange() {
      return this.pageData.title_exchange
    }
  },
  async created() {
    this.pageData = pageData
    // // 获取地址栏参数
    this.$store.commit('user/getAppData', window.location.search.substring(1))
    await this.getPageData()
    // // 保存用户头像
    this.$store.commit('user/getUserIcon', this.pageData.user_icon)
  },
  mounted() {
    // // 低版本需手动携带account_id上报
    // if (this.appVersion && compareVersions(this.app_version, '5.6.4') == -1) {
    //   this.$thinking.login(this.uid)
    // }
    // // 数数页面浏览埋点
    // this.$thinking.quick('autoTrack', {
    //   referal_source: this.referal_source
    // })
  },
  methods: {
    // 神奇南瓜兑换称号
    async pumpkinExchange() {
      const res = await this.pumpkinExchangeApi()
      if (res.errno == 0) {
        this.dialogData.award = [{ ...this.title_exchange }]
        this.dialogMark = 'congrats_get'
        this.showDialog = true
        this.pageData.title_exchange.has_right = 2
        this.pageData.title_exchange.finish_nums = 0
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 领取任务奖励
    async getTaskAward(task_id) {
      if (task_id) {
        const res = await this.getTaskRewardApi(task_id)
        if (res.errno == 0) {
          // 更新糖果数量
          this.pageData.candy_nums = res.data.candy_nums
          // 更新任务状态
          if ([1, 2, 3, 4].includes(task_id)) {
            this.pageData.daily_task_list.find(
              (item) => item.task_id == task_id
            ).has_right = 2
          } else {
            this.pageData.limit_task_list.find(
              (item) => item.task_id == task_id
            ).has_right = 2
          }
        }
      }
    },
    // 糖果兑换奖励
    async sweetsExchange(goods_id, has_right) {
      if (goods_id && has_right == 1) {
        let res = {}
        if (goods_id == 11) {
          res = await this.openMagicBoxApi()
        } else {
          res = await this.sweetsExchangeApi(goods_id)
        }
        if (res.errno == 0) {
          this.dialogData.award = [{ ...res.data.award }]
          this.dialogMark = 'congrats_get'
          this.showDialog = true
          await this.getPageData()
        } else {
          this.$toast(res.errmsg)
        }
      }
    },
    // 打开预览弹框
    clickPreview(data) {
      if ([6, 10, 11].includes(data.goods_id)) {
        if (data.goods_id == 6) {
          this.dialogMark = 'preview_small'
        } else if (data.goods_id == 10) {
          this.dialogMark = 'preview_large'
        } else {
          this.dialogMark = 'magic_box'
        }
        this.dialogData = data
        this.showDialog = true
      }
    },
    // 打开规则说明弹框
    showRule() {
      this.dialogMark = 'rule'
      this.showDialog = true
    },
    // 恭喜获得弹框按钮
    async onCongratsBtn() {
      const { type, tool_id } = this.dialogData.award[0]
      if (type == 'mic' || type == 'title') {
        this.$toast((await this.nowEquipApi(type, tool_id)).errmsg)
      }
      this.showDialog = false
    },
    // 领取任务奖励接口
    async getTaskRewardApi(task_id) {
      return await getTaskReward({ task_id })
    },
    // 糖果兑换接口
    async sweetsExchangeApi(goods_id) {
      return await sweetsExchange({ goods_id })
    },
    // 开启神奇宝箱接口
    async openMagicBoxApi() {
      return await openMagicBox()
    },
    // 南瓜兑换接口
    async pumpkinExchangeApi() {
      return await pumpkinExchange()
    },
    // 立即装扮接口
    async nowEquipApi(type, id) {
      return await nowEquip({ type, id })
    }
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;
  overflow: hidden;

  .banner {
    img {
      width: 100%;
    }
  }

  //神奇南瓜兑奖
  .pumpkins_award {
    margin: 8px auto 0;
    width: 734px;
    height: 532px;
    background: url('../assets/mk1_15.png') no-repeat left top/100% 100%;
    overflow: hidden;

    .title_box {
      position: relative;
      margin: 195px auto 0;
      width: 328px;
      height: 184px;
      background-color: rgba(45, 30, 81, 0.75);
      border: 4px solid #916fdf;
      border-radius: 34px;

      .title_name {
        position: absolute;
        bottom: 7px;
        left: 50%;
        font-size: 22px;
        font-weight: 500;
        color: #ccb2ff;
        transform: translateX(-50%);
      }
    }

    .pumpkins_nums {
      margin: 5px 0 0 7px;
      width: 100%;
      font-size: 22px;
      color: #fff190;

      > img {
        width: 45px;
        height: 45px;
        margin-right: -15px;
      }
    }

    .pumpkins_btn {
      margin: 0 auto;
      width: 204px;
      height: 64px;
      background: linear-gradient(0deg, #ff803b, #ffc046);
      border: 2px solid #ffffff;
      border-radius: 32px;
      font-size: 28px;
      color: #ffffff;
    }

    .already_buy {
      color: #b4b4b5 !important;
      background: linear-gradient(0deg, #6b6b6b, #969696) !important;
      border: 2px solid #a3a3a3 !important;
    }
  }

  // 底部文本
  .BottomText {
    // margin-top: -30px;
    padding-top: 60px;
    font-size: 28px;

    p {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }

  // 弹框
  .dialog-congrats {
    width: 320px;
    height: 392px;
  }

  //  规则弹框
  .rule {
    width: 616px;
    height: 1011px;

    ::v-deep .bat_1 {
      top: 531px !important;
      left: -42px !important;
    }

    ::v-deep .bat_2 {
      top: 846px !important;
      right: -46px !important;
    }

    ::v-deep .bat_3 {
      right: -28px !important;
      top: 194px !important;
    }
  }

  //  恭喜获得弹框
  .congrats_get {
    width: 496px;
    height: 456px;

    ::v-deep .foot {
      width: 524px;
      height: 80px;
      background-image: url('../assets/tk_4.png');
    }
  }

  //  神奇宝箱预览弹框
  .magic_box {
    width: 654px;
    height: 456px;

    ::v-deep .van-dialog__header {
      > img {
        width: 686px;
        height: 186px;
      }
    }

    ::v-deep .foot {
      width: 686px;
      height: 80px;
      background-image: url('../assets/tk_6.png');
    }

    .magic_box_preview {
      width: 100%;
      height: 100%;
      padding-top: 96px;

      .magic_box_awards_list {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

        .magic_box_awards_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 108px;

          .magic_box_award_icon {
            width: 100%;
            height: 108px;
            background: linear-gradient(180deg, #2d214d, #43358d);
            border: 4px solid #8273cb;
            border-radius: 16px;

            > img {
              width: 100%;
            }
          }

          .magic_box_award_name {
            margin-top: 11px;
            font-size: 24px;
            color: #ffffff;
            transform: scale(0.91);
            white-space: nowrap;
          }
        }
      }

      .magic_box_tip {
        margin: 38px auto 12px;
        width: fit-content;
        font-size: 24px;
        color: #fff190;
        transform: scale(0.91);
      }

      .magic_box_btn {
      }
    }

    ::v-deep .bat_1 {
      top: 328px !important;
      left: -32px !important;
    }

    ::v-deep .bat_2 {
      top: 311px !important;
      right: -20px !important;
    }

    ::v-deep .bat_3 {
      right: 100px !important;
      top: 417px !important;
    }
  }

  .preview_large {
    width: 616px;
    height: 917px;

    ::v-deep .van-dialog__header {
      top: -39px;

      > img {
        width: 649px;
        height: 80px;
      }
    }

    .chat-rooom-bg {
      margin: 58px auto 0;
      width: 427px;
      height: 740px;
      background: url('../assets/chat_room_bg.png') no-repeat left top/100%;
    }

    .preview-text {
      margin-top: 20px;
      font-size: 28px;
      color: #ffffff;
      text-align: center;
    }

    ::v-deep .bat_1 {
      top: 426px !important;
      left: -42px !important;
    }

    ::v-deep .bat_2 {
      top: 700px !important;
      right: -45px !important;
    }

    ::v-deep .bat_3 {
      right: -28px !important;
      top: 176px !important;
    }
  }

  .preview_small {
    width: 616px;
    height: 328px;

    ::v-deep .van-dialog__header {
      top: -39px;

      > img {
        width: 649px;
        height: 80px;
      }
    }

    .mic_box {
      margin: 63px auto 0;
      width: 151px;
      height: 151px;
      border: 4px solid #8273cb;
      background: linear-gradient(180deg, #2d214d, #43358d);
      border-radius: 16px;

      #ts_jjzy {
        ::v-deep .micAvatar_img {
          width: 120px;
          height: 120px;
        }
      }

      #ts_ymml {
        ::v-deep .micAvatar_img {
          width: 120px;
          height: 120px;
        }
      }
    }

    .preview-text {
      margin-top: 20px;
      font-size: 28px;
      color: #ffffff;
      text-align: center;
    }

    ::v-deep .bat_1 {
      top: 89px !important;
      left: -40px !important;
    }

    ::v-deep .bat_2 {
      top: 171px !important;
      right: -45px !important;
    }

    ::v-deep .bat_3 {
      right: 139px !important;
      top: 290px !important;
    }
  }
}
</style>
