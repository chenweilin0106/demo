<template>
  <div class="BestBuyer">
    <!--称号奖励-->
    <title-award :title_status="pageData.title_status" @onClick="getTitle" />
    <!--特惠放送-->
    <discount-gift
      :gifts_list="pageData.gifts_list"
      @showRule="showRule('discount_gift_rule')"
      @buy="onBuy"
    />
    <!--幸运摘星-->
    <luck-star
      :star_nums="pageData.star_nums"
      :gift_buy_nums="pageData.gift_buy_nums"
      :star_award="pageData.star_award"
      @showRule="showRule('luck_star_rule')"
      @lottery="onLottery"
      @getAward="starAward"
    />
    <!--许愿赢免单-->
    <free-bill
      ref="freeBill"
      :gift_buy_nums="pageData.gift_buy_nums"
      :free_users="pageData.free_users"
      :today="pageData.today"
      :freeStatus="pageData.free_status"
      :spend_masonry="pageData.spend_masonry"
      @showRule="showRule('free_billy_rule')"
      @finish="countDownFinish"
      @update="getPageData({ type: 'tab', mark: 'm5' })"
    />
    <theme-dialog
      :isShow="showDialog"
      :dialogMark="dialogMark"
      :titleIconObj="titleIconObj"
      :offBtn="dialogMark.includes('rule')"
      :class="{
        [dialogMark]: true,
        discount_gift_buy: dialogMark.includes('discount_gift_buy')
      }"
      :dialogData="dialogData"
      @closeDialog="showDialog = false"
    >
      <!--特惠放松规则-->
      <template v-if="dialogMark === 'discount_gift_rule'">
        <p>
          <span class="circle"></span>部分双十一礼包每日限购，第二天0点刷新。
        </p>
        <p>
          <span class="circle"></span
          >购买任意双十一礼包赠送1次摘星星机会，可在[幸运摘星]中摘得奖励。
        </p>
        <p>
          <span class="circle"></span
          >每日购买任意双十一礼包还可参与许愿嬴免单活动，有机会获得免单奖励。
        </p>
      </template>
      <!--幸运摘星规则-->
      <template v-if="dialogMark === 'luck_star_rule'">
        <p>
          <span class="circle"></span>
          玩家购买任意[特惠放送]中的礼包可获得1次摘星机会
        </p>
        <p>
          <span class="circle"></span
          >累计摘星30次可领取限定礼物-招财进宝礼物赠送权+7天
        </p>
        <p><span class="circle"></span>摘星奖励及概率如下：</p>
        <img class="luck_star_rule_form" :src="IconPath('pop_7.png')" />
      </template>
      <!--许愿赢免单规则-->
      <template v-if="dialogMark === 'free_billy_rule'">
        <p>
          <span class="circle"></span
          >玩家每日在0:00:00-22:59:59之间购买任意[特惠放送]中的双十一礼包即可参与当天的许愿嬴免单活动，超出时间范围所购礼包不计入。
        </p>
        <p>
          <span class="circle"></span
          >每日23点公布免单得主，得主可获得当天23点前已购买的所有双十一礼包的免单奖励，即当天23点前购买双十一礼包所花的钻石将在开奖后返回到账户。
        </p>
        <p>
          <span class="circle"></span
          >每日免单得主数量如下：11月10日抽取1位免单得主，11月11日抽取2位免单得主，11月12日抽取3位免单得主。
        </p>
      </template>
      <!--恭喜获得-->
      <dialog-congrats
        v-if="dialogMark == 'congrats_get'"
        :btnText="equipBtnTxt(dialogData[0]?.type)"
        :isMultiple="true"
        :awardData="dialogData"
        @onCongratsBtn="onCongratsBtn"
      >
        <template v-slot="{ type }">
          <!--男-->
          <public-json
            v-if="type == 'title' && pageData.gender == 0"
            jsonName="ch_shoppingns"
          />
          <!--女-->
          <public-json
            v-if="type == 'title' && pageData.gender == 1"
            jsonName="ch_shoppingnw"
          />
          <!--头饰-->
          <public-svga
            v-else-if="type == 'mic'"
            svgaName="hmxh"
            :userAvatar="$store.getters.user_icon"
          />
        </template>
      </dialog-congrats>
      <!--特惠放送购买礼包-->
      <template v-if="dialogMark.includes('discount_gift_buy')">
        <div class="stone_num flex_across">
          剩余钻石<img :src="IconPath('zs_60_60.png')" />：{{ masonry }}
        </div>
        <div class="award_list">
          <div
            class="AwardItem_Box"
            v-for="(item, index) in dialogData.awards"
            :key="index"
          >
            <div class="theme_item Award_Icon">
              <!-- 图片 -->
              <img :src="IconPath(item.icon)" alt="" />
            </div>
            <!-- 名字 -->
            <div class="Award_Name">{{ item.text }}</div>
          </div>
        </div>
        <dialog-counter
          v-if="dialogMark.includes('discount_gift_buy')"
          :goods_detail="dialogData"
          :my_goods="+masonry"
          :inputNum.sync="inputNum"
          :CounterIcon="pointIcon"
          buttonText="购买"
          @clickSettlement="onExcharge"
        />
        <div class="old_price">
          原价<img :src="IconPath('zs_60_60.png')" />：{{
            dialogData.org_price * inputNum
          }}
        </div>
      </template>
      <!--确认购买礼包-->
      <template v-if="dialogMark === 'confirmed'">
        <p>
          确认花费<span>{{ inputNum * dialogData.price }}钻石</span>购买<span>{{
            inputNum
          }}</span
          >个{{ dialogData.gift_name }}吗
        </p>
        <div class="btns">
          <div class="left_btn flex_across" @click="showDialog = false">
            取消
          </div>
          <div class="right_btn flex_across" @click="confirmBuy">确认</div>
        </div>
      </template>
    </theme-dialog>
  </div>
</template>

<script>
import DialogCounter from '@/pages/1111/components/Dialog/DialogCounter.vue'
import { getPageData, nowEquip } from '../../api/index'
import publicSvga from '@/pages/1111/components/PublicSvga.vue'
import publicJson from '@/pages/1111/components/PublicJson.vue'
import dialogCongrats from '@/pages/1111/components/Dialog/DialogCongrats.vue'
import FreeBill from '@/pages/1111/views/BestBuyer/components/FreeBill.vue'
import LuckStar from '@/pages/1111/views/BestBuyer/components/LuckStar.vue'
import DiscountGift from '@/pages/1111/views/BestBuyer/components/DiscountGift.vue'
import TitleAward from '@/pages/1111/views/BestBuyer/components/TitleAward.vue'
import themeDialog from '@/pages/1111/components/Dialog/ThemeDialog.vue'
import { bestBuyer } from '../../utils/pageData'

export default {
  name: 'BestBuyer',
  components: {
    FreeBill,
    LuckStar,
    TitleAward,
    DiscountGift,
    themeDialog,
    dialogCongrats,
    publicSvga,
    publicJson,
    DialogCounter
  },
  data() {
    return {
      masonry: 0,
      showDialog: false,
      dialogMark: '',
      dialogData: {},
      titleIconObj: Object.freeze({
        discount_gift_rule: 'title_14.png',
        luck_star_rule: 'title_21.png',
        free_billy_rule: 'title_14.png',
        congrats_get: 'title_6.png',
        discount_gift_buy_1: 'title_16.png',
        discount_gift_buy_2: 'title_15.png',
        discount_gift_buy_3: 'title_17.png',
        discount_gift_buy_4: 'title_18.png',
        discount_gift_buy_5: 'title_19.png',
        discount_gift_buy_6: 'title_20.png'
      }),
      equipObj: Object.freeze({
        title: '立即佩戴',
        mic: '立即装扮',
        costume: '立即装扮'
      }),
      inputNum: 1,
      pointIcon: 'zs_60_60.png',
      timer: null
    }
  },
  async created() {
    this.pageData = bestBuyer
    await this.getPageData({ type: 'tab', mark: 'm5' })
    this.$nextTick(() => {
      this.$refs.freeBill.showCurrent()
    })
  },
  computed: {
    freeStatus() {
      return this.pageData.free_status
    }
  },
  watch: {
    freeStatus(newVal, oldVal) {
      if (newVal == 1) {
        console.log('结算中，开始轮询')
        clearInterval(this.timer)
        this.timer = null
        this.timer = setInterval(() => {
          console.log('轮询请求')
          this.getPageData({ type: 'tab', mark: 'm5' })
        }, 1000)
        // this.$toast('恭喜您获得免单奖励')
      } else if (newVal == 2) {
        console.log('结算成功，请求结束')
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  methods: {
    countDownFinish() {
      // console.log('倒计时结束')
      this.getPageData({ type: 'tab', mark: 'm5' })
    },
    async starAward() {
      const res = await this.starAwardApi()
      if (res.errno == 0) {
        this.dialogData = [{ ...res.data }]
        this.dialogMark = 'congrats_get'
        this.showDialog = true
        this.pageData.star_award.has_right = 2
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 摘星抽奖
    async onLottery(type) {
      const res = await this.onLotteryApi(type)
      if (res.errno) return this.$toast(res.errmsg)
      this.pageData.star_award = res.data.star_award
      this.pageData.star_nums = res.data.star_nums
      this.dialogData = [...res.data.awards]
      this.dialogMark = 'congrats_get'
      this.showDialog = true
    },
    async confirmBuy() {
      const res = await this.buyGiftApi(this.dialogData.gift_id, this.inputNum)
      this.showDialog = false
      this.$toast(res.errmsg)
      this.getPageData({ type: 'tab', mark: 'm5' })
    },
    // 优惠放松 点击购买按钮 弹出购买弹框
    async onBuy(data) {
      this.inputNum = 1
      const res = await this.getStoneNumsApi()
      if (res.errno) return
      this.masonry = res.data.masonry
      if (data.price > this.masonry) return this.$toast('钻石不足')
      this.dialogData = data
      this.dialogMark = `discount_gift_buy_${data.gift_id}`
      this.showDialog = true
    },
    // 领取钻石消费奖励称号
    async getTitle() {
      const res = await this.getTitleApi()
      if (res.errno == 0) {
        this.dialogData = [{ ...res.data }]
        this.dialogMark = 'congrats_get'
        this.showDialog = true
        this.pageData.title_status.has_right = 2
      } else {
        this.$toast(res.errmsg)
      }
    },
    onExcharge() {
      this.dialogMark = 'confirmed'
    },
    async onCongratsBtn() {
      if (this.dialogData[0]?.type) {
        const { type = '', tool_id = '', id = '' } = this.dialogData[0]
        if (
          ['title', 'mic', 'costume'].includes(type) &&
          this.dialogData.length == 1
        ) {
          const res = await this.nowEquipApi(type, tool_id || id)
          this.$toast(res.errmsg)
        }
      }
      this.showDialog = false
    },
    equipBtnTxt(type) {
      if (!type) return '我知道了'
      if (this.dialogData.length > 1) {
        return '我知道了'
      } else {
        return this.equipObj[type]
      }
    },
    // 打开规则弹框
    showRule(type) {
      this.dialogMark = type
      this.showDialog = true
    },
    /* ----------------以下为接口封装---------------- */
    // 摘星30次奖励领取接口
    async starAwardApi() {
      return await getPageData({
        type: 'best_buyer_rev_star_award'
      })
    },
    // 摘星抽奖接口
    async onLotteryApi(mark) {
      return await getPageData({
        type: 'best_buyer_lottery',
        mark
      })
    },
    // 获取钻石数量
    async getStoneNumsApi() {
      return await getPageData({
        type: 'best_buyer_masonry_info'
      })
    },
    // 购买礼包接口
    async buyGiftApi(id, nums) {
      return await getPageData({
        type: 'best_buyer_buy_gift',
        'mark[id]': id,
        'mark[nums]': nums
      })
    },
    // 立即装扮
    async nowEquipApi(type, id) {
      return await nowEquip({
        type,
        id
      })
    },
    // 领取钻石消费奖励称号接口
    async getTitleApi(mark) {
      return await getPageData({
        type: 'best_buyer_rev_title'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.BestBuyer {
  .discount_gift_rule,
  .luck_star_rule,
  .free_billy_rule {
    //width: 306px;
    //height: 186px;

    p {
      position: relative;
      padding-left: 20px;
      padding-right: 10px;
      letter-spacing: 1.5px;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;

      .circle {
        position: absolute;
        top: 6px;
        left: 7px;
        width: 6px;
        height: 6px;
        background: #fff99e;
        border-radius: 50%;
      }

      &:nth-of-type(1) {
        margin-top: 8px;
      }
    }
  }

  .discount_gift_rule {
    width: 306px;
    height: 186px;
  }

  .luck_star_rule {
    width: 308px;
    height: 448px;

    p:nth-of-type(1) {
      margin-top: 0;
    }

    .luck_star_rule_form {
      margin-top: 5px;
      margin-left: 11px;
      width: 280px;
      height: 270px;
    }
  }

  .free_billy_rule {
    width: 306px;
    ::v-deep .ThemeDialog_bgc {
      padding-bottom: 15px;
    }
    //height: 326px !;

    p {
      line-height: 25px !important;

      &:nth-of-type(1) {
        margin-top: 4px;
      }

      .circle {
        top: 9px;
      }
    }
  }

  .discount_gift_buy {
    width: 308px;
    height: 283px;
  }

  .discount_gift_buy {
    width: 308px;
    height: 283px;

    .stone_num {
      margin-top: 5px;
      font-size: 16px;
      color: #ffffff;

      > img {
        margin: 0 -3px;
        height: 30px;
      }
    }

    .award_list {
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 260px;
      height: 100px;
      background: #272783;
      border-radius: 6px;
      padding-top: 6px;

      .AwardItem_Box {
        width: 68px;
        //margin-bottom: 10px;
        //margin-right: 5px;

        .Award_Icon {
          position: relative;
          // 图片
          width: 100%;
          height: 68px;
          border-radius: 10px;

          > img {
            width: 100%;
            background: #fefaef;
          }
        }

        // 名字
        .Award_Name,
        .Award_text {
          margin: 4px auto 0;
          color: #fff;
          width: fit-content;
          text-align: center;
          white-space: nowrap;
          font-size: 12px;
        }
      }
    }

    .DialogCounter {
      margin-top: 10px;
      margin-bottom: 0px;

      ::v-deep .billing {
        margin-top: 12px;
        //align-items: flex-start;
        //height: 70px;
        padding-top: 6px;

        ::v-deep p {
          > img {
            height: 33px;
            margin: 0 -5px;
          }
        }
      }

      ::v-deep .button {
        position: relative;
        top: 14px;
      }
    }

    .old_price {
      position: absolute;
      bottom: 10px;
      left: 18px;
      //transform: scale(0.91);
      white-space: nowrap;
      font-size: 12px;
      color: #fff;

      > img {
        height: 33px;
        margin: 0 -5px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        top: 50%;
        transform: translate(-50%, -1px);
        left: 50%;
        background: #fff;
      }
    }
  }

  .confirmed {
    width: 258px;
    min-height: 158px;
    height: fit-content;

    p {
      margin: 0px auto;
      width: 175px;
      min-height: 44px;
      height: fit-content;
      font-size: 16px;
      color: #ffffff;
      line-height: 25px;

      span {
        color: #f7f26a;
      }
    }

    .btns {
      margin: 10px auto 13px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .left_btn {
        width: 102px;
        height: 38px;
        background: #e9fffe;
        border: 1px solid #fffee9;
        border-radius: 19px;
        font-size: 16px;
        color: #103cf2;
      }

      .right_btn {
        width: 102px;
        height: 38px;
        background: linear-gradient(0deg, #4331b0, #977ff4);
        border: 1px solid #ffffff;
        border-radius: 19px;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
