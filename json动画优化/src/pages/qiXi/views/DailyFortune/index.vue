<template>
  <div class="dailyFortune" @click="pover_flag = null">
    <div class="pLine">
      <p class="awardTicketP">
        桃花币
        <img src="../../assets/thb_50_50.png" />
        ：<span>{{ pageData.user_coins }}</span>
      </p>
      <p class="awardTicketP2">
        消费钻石
        <img src="../../assets/zs_50_50.png" />
        ：<span class="special">{{ pageData.masonry_consume }}</span>
      </p>
    </div>
    <!-- 抽签 -->
    <div class="draw">
      <div class="cqhg" @click="longLoveReview()">
      </div>
      <PublicJson v-if="isdraw" class="lottie_cq" :lottieJson_name="'qixi_sign_animation'"
        :lottieJson="qixi_sign_animation" :loop="false" @complete="complete()" />
      <div class="sign" v-else></div>
      <div class="fortune" v-if="pageData.sign_info.sign_type != 0 && !isdraw">
        <!-- 大吉 -->
        <div class="big_good" v-if="pageData.sign_info.sign_type == 3">
          <img :src="IconPath('mk5_9.png')" alt="">
          <div class="fortune_detail">
            <div class="fortune_detail_top">每次兑换有50%几率刷新 <span class="blue">下次折扣兑换</span>其中折扣兑换概率如下：</div>
            <div class="fortune_detail_bottom">7.5折（50%）、5折（30%）、2.5折（10%）免费（10%）</div>
          </div>
          <div class="overtime">
            本轮结束时间 <span class="special">{{ secTotime }}</span>
          </div>
        </div>
        <!-- 中吉 -->
        <div class="middle_good" v-if="pageData.sign_info.sign_type == 2">
          <img :src="IconPath('mk5_8.png')" alt="">
          <div class="fortune_detail">
            <div class="fortune_detail_top">每消耗10<img src="../../assets/thb_50_50.png" alt="">可自动获得1<img
                src="../../assets/thb_50_50.png" alt=""><span class="special">({{
                  pageData.sign_info?.progress_ratio }})</span></div>
            <div class="fortune_detail_bottom">本轮已获得桃花币奖励：{{ pageData.sign_info.get_coins }}</div>
          </div>
          <div class="overtime">
            本轮结束时间 <span class="special">{{ secTotime }}</span>
          </div>
        </div>
        <!-- 小吉 -->
        <div class="small_good" v-if="pageData.sign_info.sign_type == 1">
          <img :src="IconPath('mk5_7.png')" alt="">
          <div class="fortune_detail">
            <div class="fortune_detail_top">
              <div class="small_good_tip">价值99钻石</div>累计消耗10<img src="../../assets/thb_50_50.png" alt=""><span
                class="blue">自动获得</span>1个<span class="yellow">心锁戒指</span><span class="yellow">({{
                  pageData.sign_info.progress_ratio }})</span>
            </div>
            <div class="fortune_detail_bottom">注：此任务一轮只能获得一次奖励</div>
          </div>
          <div class="overtime">
            本轮结束时间 <span class="special">{{ secTotime }}</span>
          </div>
        </div>
      </div>
      <div class="cq-btn">
        <!-- 重新抽签 -->
        <img v-if="pageData.sign_info.sign_type != 0" :src="IconPath('mk5_3.png')" alt="" @click="drawLots(2)">
        <!-- 立即抽签 -->
        <img v-else :src="IconPath('mk5_2.png')" alt="" @click="drawLots(1)">
      </div>
    </div>
    <!-- 兑换 -->
    <div class="exchangeArea">
      <div class="question" @click="question_flag = true"></div>
      <div class="top"></div>
      <div class="center">
        <div class="content">
          <div class="exchange_item" v-for="(item, index) in pageData.exchange_list" :key="index">
            <div class="fixed giftItem">
              <div class="giftItem_top">
                <img :src="IconPath(item.award1[0].icon)" alt="">
              </div>
              <div class="giftItem_bottom">{{ item.award1[0].text }}</div>
            </div>
            <div class="add"></div>
            <!-- 随机奖励 -->
            <div class="random giftItem" @click.stop="pover_flag = index + 1">
              <div class="giftItem_top">
                <img :src="IconPath('mk5_15.png')" alt="">
              </div>
              <div class="giftItem_bottom">点击查看</div>
              <!-- 气泡弹出层 -->
              <div class="pover" v-if="pover_flag == index + 1">
                <div class="fixed giftItem" v-for="(item1, index1) in item.award2" :key="index1">
                  <div class="cornerMark" v-if="item1.type == 'costume'">主页特效</div>
                  <div class="giftItem_top">
                    <img v-if="item1.icon" :src="IconPath(item1.icon)" alt="">
                    <PublicJson class="lottie" v-else :lottieJson_name="item1.type == 'mic' ? 'ts_hsyh' : 'sb_mlsx'"
                      :lottieJson="item1.type == 'mic' ? ts_hsyh : sb_mlsx" :userAvatar="$store.getters.user_icon" />
                  </div>
                  <div class="giftItem_bottom">{{ item1.text }}</div>
                </div>
              </div>
            </div>
            <!-- 兑换按钮 -->
            <div class="exchange_btn" @click="exchange(item.goods_id, item.real_price)">{{ item.org_price }}<img
                src="../../assets/thb_50_50.png" alt="">兑换<div class="discount_tip"
                v-if="item.real_price != item.org_price">
                <div class="discount" v-if="item.real_price == 0">免费</div>
                <div class="discount" v-else>{{ item.real_price }}<img :src="IconPath('thb_50_50.png')" alt=""></div>兑换
              </div>
              <div v-if="item.real_price != item.org_price" class="obliqueLine"></div>
            </div>
          </div>
          <!-- 说明文字 -->
          <div class="ThemeBox_BottomText">
            <ul>
              <li>
                <span></span>玩家每消费300钻石可自动获得1{{ pointName
                }}<img :src="IconPath(pointIcon)" alt="" />
              </li>
              <li>
                <span></span>{{ pointName
                }}<img :src="IconPath(pointIcon)" alt="" />可兑换不同类型的礼包，每次兑换可随机获得一份附赠奖励。
              </li>
              <li>
                <span></span>玩家可抽取桃花签获得运势加成，加成的生效时间为1小时，倒计时结束后运势失效，玩家可开启新的运势
              </li>
              <li>
                <span></span>倒计时结束前也可消耗{{ pointName
                }}<img :src="IconPath(pointIcon)" alt="" />进行重新抽签，若抽到不同的运势，则原有的加成效果和时间即刻失效
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
    <!-- 奖励说明弹窗 -->
    <ThemeDialog :isShow="question_flag" class="dialog" dialogMark="awardExplain"
      :titleIconObj="{ awardExplain: 'title_11.png' }" @closeDialog="
        question_flag = false
        ">
      <div class="dialog_cotent">
        <div class="tit">活动第四天(8月21日)刷新礼包随机奖励内容</div>
        <div class="tip1">8月18日-8月20日礼包内容</div>
        <div class="award_item list1_item1" v-for="(item, index) in gift_list1" :key="index">
          <div class="fixed giftItem" v-for="(item1, index1) in item" :key="index1">
            <div class="cornerMark" v-if="item1.type == 'costume'">主页特效</div>
            <div class="giftItem_top">
              <img v-if="item1.icon" :src="IconPath(item1.icon)" alt="">
              <PublicJson class="lottie" v-else :lottieJson_name="'sb_mlsx'" :lottieJson="sb_mlsx"
                :userAvatar="$store.getters.user_icon" />
            </div>
            <div class="giftItem_bottom">{{ item1.text }}</div>
            <div class="probability">{{ item1.probability }}</div>
          </div>
          <div class="gift_type" v-if="index == 0">绿晶石礼包</div>
          <div class="gift_type" v-if="index == 1">金币礼包</div>
          <div class="gift_type" v-if="index == 2">戒指礼包</div>
        </div>
        <div class="tip2">8月21日-8月22日礼包内容</div>
        <div class="list1_item2 award_item" v-for="(item, index) in gift_list2" :key="index + 10">
          <div class="fixed giftItem" v-for="(item1, index1) in item" :key="index1">
            <div class="giftItem_top">
              <img v-if="item1.icon" :src="IconPath(item1.icon)" alt="">
              <PublicJson class="lottie" v-else :lottieJson_name="'ts_hsyh'" :lottieJson="ts_hsyh"
                :userAvatar="$store.getters.user_icon" />
            </div>
            <div class="giftItem_bottom">{{ item1.text }}</div>
            <div class="probability">{{ item1.probability }}</div>
          </div>
          <div class="gift_type" v-if="index == 0">绿晶石礼包</div>
          <div class="gift_type" v-if="index == 1">金币礼包</div>
          <div class="gift_type" v-if="index == 2">戒指礼包</div>
        </div>
      </div>
    </ThemeDialog>
    <!-- 长情回顾弹窗 -->
    <ThemeDialog :isShow="longLoveReview_flag" class="dialog1" dialogMark="longLoveReview"
      :titleIconObj="{ longLoveReview: 'title_12.png' }" @closeDialog="
        longLoveReview_flag = false
        ">
      <div class="love_bg">
        <div class="nocp" v-if="!pageData2.cp_info.cp_day">
          <span>当前你是未婚状态</span>
          <span>赶紧找个心仪的人去求婚吧</span>
        </div>
        <div class="lefticon" v-if="pageData2.cp_info.cp_day">
          <img :src="pageData2.cp_info.icon_info.profile_image" alt="">
        </div>
        <div class="righticon" v-if="pageData2.cp_info.cp_day">
          <img :src="pageData2.cp_info.icon_info.tprofile_image" alt="">
        </div>
        <div class="tit_zyqyj" v-if="pageData2.cp_info.cp_day">在一起已经</div>
        <div class="day_num" v-if="pageData2.cp_info.cp_day">{{ pageData2.cp_info.days }}</div>
        <div class="tit_jnr" v-if="pageData2.cp_info.cp_day">纪念日</div>
        <div class="day_jnr" v-if="pageData2.cp_info.cp_day">{{ pageData2.cp_info.cp_day }}{{ pageData2.cp_info.week }}
        </div>
        <div class="tit_tmz" v-if="pageData2.cp_info.cp_day">甜蜜值</div>
        <div class="value_tmz" v-if="pageData2.cp_info.cp_day">{{ pageData2.cp_info.sweet }}</div>
      </div>
      <div class="task_list">
        <div class="task_item" v-for="(item, index) in pageData2.task_list" :key="index">
          <div class="fixed giftItem">
            <div class="giftItem_top">
              <img :src="IconPath('thb_120_120.png')" alt="">
            </div>
            <div class="giftItem_bottom">{{ item.text }}</div>
          </div>
          <div class="description">
            <div class="description_top">{{ item.name1 }}</div>
            <div class="description_bottom">{{ item.name2 }}</div>
          </div>
          <div class="receive_btn" @click="receive(item.task_id, item.has_right)"
            :class="ButtonStyle('GoodsTask', item.has_right)">{{
              item.has_right ==
              0 ? '未完成' :
              item.has_right == 1 ? '领取' : '已领取' }}</div>
        </div>
      </div>
      <div class="dialog_bottom">
        <div class="bottom_tit">
          <div class="point"></div>
          <div class="review_text">夫妻双方满足对应条件则可领取长情回馈奖励</div>
        </div>
        <div class="bottom_tit">
          <div class="point"></div>
          <div class="review_text">每个奖励只能领取一次</div>
        </div>
      </div>
    </ThemeDialog>
    <!-- 恭喜获得弹窗 -->
    <ThemeDialog :isSmall="true" :isShow="showDailog" dialogMark="congratsGet"
      :titleIconObj="{ congratsGet: 'title_6.png' }" @closeDialog="
        test()
        ">
      <DialogCongrats btnText="我知道了" :isMultiple="true" class="tk_gxhd" :awardData="dialogData.awards"
        @onCongratsBtn="test()">
        <PublicJson class="lottie_gxhd" :class="{ 'voice': dialogData.awards[1]?.type == 'voice' }"
          :lottieJson_name="dialogData.awards[1]?.type == 'mic' ? 'ts_hsyh' : 'sb_mlsx'"
          :lottieJson="dialogData.awards[1]?.type == 'mic' ? ts_hsyh : sb_mlsx" :userAvatar="$store.getters.user_icon" />
      </DialogCongrats>
    </ThemeDialog>
  </div>
</template>

<script>
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 默认数据
import { dailyFortune, longLoveReviewData } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// json动画组件
import PublicJson from '../../components/PublicJson'
import ts_hsyh from '../../assets/lottie/ts_hsyh/data.json'
import sb_mlsx from '../../assets/lottie/sb_mlsx/data.json'
// 抽签动画
import qixi_sign_animation from '../../assets/lottie/qixi_sign_animation/data.json'
// 恭喜获得组件
import DialogCongrats from '../../components/Dialog/DialogCongrats.vue'

export default {
  name: 'dailyFortune',
  components: {
    ThemeDialog,
    PublicJson,
    DialogCongrats
  },
  props: [],
  data() {
    return {
      dialogData: {
        "awards": [
        ]
      },
      // 道具图标
      pointIcon: 'thb_50_50.png',
      // 道具名称
      pointName: '桃花币',
      question_flag: false,
      longLoveReview_flag: false,
      gift_list1: [
        [
          {
            icon: 'ljs_120_120.png',
            text: '+25',
            probability: '必出'
          },
          {
            icon: 'zjs_120_120.png',
            text: '+1',
            probability: '25%'
          },
          {
            icon: 'yb_120_120.png',
            text: '+2万',
            probability: '25%'
          },
          {
            icon: 'sgw_120_120.png',
            text: '+1',
            probability: '25%'
          },
          {
            icon: 'ljs_120_120.png',
            text: '+10',
            probability: '25%'
          }
        ],
        [
          {
            icon: 'jb_120_120.png',
            text: '+15万',
            probability: '必出'
          },
          {
            icon: 'zahj_120_120.png',
            text: '气泡+1天',
            probability: '25%'
          },
          {
            icon: 'sydh_120_120.png',
            text: '+1天',
            probability: '25%',
            type: 'costume'
          },
          {
            icon: '',
            text: '声波+1天',
            probability: '25%',
            type: 'voice'
          },
          {
            icon: 'py_120_120.png',
            text: '+10',
            probability: '25%'
          }
        ],
        [
          {
            icon: 'mtjz_120_120.png',
            text: '戒指+1',
            probability: '必出'
          },
          {
            icon: 'axzsj_120_120.png',
            text: '赠送权+1天',
            probability: '25%'
          },
          {
            icon: 'sjmg_120_120.png',
            text: '+10',
            probability: '25%'
          },
          {
            icon: 'yb_120_120.png',
            text: '+1万',
            probability: '25%',
          },
          {
            icon: 'kxt_120_120.png',
            text: '+5',
            probability: '25%'
          }
        ]
      ],
      gift_list2: [
        [
          {
            icon: 'ljs_120_120.png',
            text: '+25',
            probability: '必出'
          },
          {
            icon: 'zjs_120_120.png',
            text: '+2',
            probability: '25%'
          },
          {
            icon: 'yb_120_120.png',
            text: '+1万',
            probability: '25%'
          },
          {
            icon: 'zjs_120_120.png',
            text: '+1',
            probability: '25%'
          },
          {
            icon: 'ljs_120_120.png',
            text: '+5',
            probability: '25%'
          }
        ],
        [
          {
            icon: 'jb_120_120.png',
            text: '+15万',
            probability: '必出'
          },
          {
            icon: 'py_120_120.png',
            text: '+10',
            probability: '35%'
          },
          {
            icon: '',
            text: '头饰+1天',
            probability: '35%',
            type: 'mic'
          },
          {
            icon: 'zhs_120_120.png',
            text: '+1',
            probability: '20%',
          },
          {
            icon: 'asqbt_120_120.png',
            text: '座驾+1天',
            probability: '10%'
          }
        ],
        [
          {
            icon: 'mtjz_120_120.png',
            text: '戒指+1',
            probability: '必出'
          },
          {
            icon: 'hshs_120_120.png',
            text: '赠送权+1天',
            probability: '25%'
          },
          {
            icon: 'sjmg_120_120.png',
            text: '+20',
            probability: '25%'
          },
          {
            icon: 'yb_120_120.png',
            text: '+2万',
            probability: '25%',
          },
          {
            icon: 'msm_120_120.png',
            text: '+5',
            probability: '25%'
          }
        ]
      ],
      pageData: {
      },
      pageData2: {},
      pover_flag: 0,
      ts_hsyh,
      sb_mlsx,
      qixi_sign_animation,
      timer: null,
      showDailog: false,
      isdraw: false
    }
  },
  computed: {
    // 进度
    jindu() {
      return this.pageData.sign_info?.progress_ratio?.split("/")[0]
    },
    // 倒计时
    secTotime() {
      var t = '';
      if (this.count_down > -1) {
        var min = Math.floor(this.count_down / 60) % 60
        var sec = this.count_down % 60
        if (min < 10) {
          t += "0"
        }
        t += min + ":"
        if (sec < 10) {
          t += "0"
        }
        t += sec.toFixed(0)
      }
      return t
    },
    count_down() {
      if (this.pageData.sign_info?.count_down) {
        return this.pageData.sign_info.count_down
      } else {
        return null
      }
    }
  },
  watch: {
    count_down(newValue) {
      if (newValue <= 0) {
        this.init()
      }
    },
    jindu(newValue) {
      console.log(newValue);
    }
  },

  created() {
    this.pageData = dailyFortune
    this.pageData2 = longLoveReviewData
    this.init()
  },
  mounted() { },
  methods: {
    //抽签完毕 
    complete() {
      this.isdraw = false
    },
    // 领取
    receive(mark, i) {
      if (i != 1) {
        return
      }
      getPageData(
        {
          type: 'lucky_day_cp_task_rev',
          mark
        }
      ).then(res => {
        this.$toast(res.errmsg)
        if (res.errno == 0) {
          this.pageData.user_coins = res.data.user_coins
          this.getlongLoveReview()
        }
      })
    },
    // 获取长情回顾数据
    async longLoveReview() {
      await this.getlongLoveReview()
      this.longLoveReview_flag = true
    },
    getlongLoveReview() {
      getPageData(
        {
          type: 'lucky_day_cp_info'
        }
      ).then(res => {
        if (res.errno == 0) {
          this.pageData2 = res.data
        }
      })
    },
    test() {
      console.log(1111);
      this.showDailog = false
    },
    // 兑换
    exchange(mark, price) {
      console.log(price)
      if (price > this.pageData.user_coins) {
        console.log('桃花币不足，请先去消费');
        return this.$toast('桃花币不足，请先去消费')
      }
      getPageData(
        {
          type: 'lucky_day_exchange',
          mark
        }
      ).then(res => {
        if (res.errno == 0) {
          this.showDailog = true
          this.dialogData.awards = res.data.awards
        } else {
          this.$toast(res.errmsg)
        }
        this.init()
      })
    },
    init() {
      getPageData(
        {
          type: 'tab',
          mark: 'm5'
        }
      ).then(res => {
        this.$nextTick(() => {
          this.pageData = res.data
        })
        clearInterval(this.timer)
        if (res.data.sign_info.count_down) {
          this.timer = setInterval(() => {
            this.pageData.sign_info.count_down--
          }, 1000);
        }
      })
    },
    // 抽签
    drawLots(mark) {
      getPageData(
        {
          type: 'lucky_day_open_sign',
          mark
        }
      ).then(res => {
        console.log(res.data);
        if (res.errno != 0) {
          this.$toast(res.errmsg)
        } else {
          this.isdraw = true
          this.init()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">  .lottie_gxhd {
    height: 60px;
    width: 60px;

    ::v-deep .micAvatar_img {
      width: 84%;
      height: 84%;
    }
  }

  .lottie_cq {
    width: 125px;
    height: 214px;
    margin-top: 17px;
    transform: scale(180%);
  }

  .voice {
    height: 62px;
    width: 62px;

    ::v-deep .micAvatar_img {
      width: 76%;
      height: 76%;
    }
  }

  .tk_gxhd {
    ::v-deep .Multiple_Awards {
      justify-content: center;

      .AwardItem_Box:nth-child(2) {
        margin-left: 12px;
      }
    }
  }

  .dailyFortune {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 35px;

    .pLine {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      width: 100%;

      .awardTicketP {
        // min-width: 130px;
        height: 24px;
        background: #33187E;
        border-radius: 12px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 15px;
        white-space: nowrap;
        margin-left: 13px;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .awardTicketP2 {
        // min-width: 148px;
        height: 24px;
        background: #33187E;
        border-radius: 12px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 15px;
        white-space: nowrap;
        margin-right: 13px;



        img {
          width: 25px;
          height: 25px;
        }
      }
    }

    .draw {
      width: 354px;
      height: 312px;
      background-image: url('../../assets/mk5_5.png');
      background-size: 100% 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      div {
        flex-shrink: 0;
      }

      .cqhg {
        width: 44px;
        height: 185px;
        background-image: url('../../assets/mk5_1.png');
        background-size: 100% 100%;
        position: absolute;
        z-index: 10;
        top: -3px;
        right: 5px;
      }

      .sign {
        width: 125px;
        height: 214px;
        background-image: url('../../assets/mk5_4.png');
        background-size: 100% 100%;
        margin-top: 19px;
      }

      .fortune {
        position: absolute;
        top: 25px;
        width: 288px;
        height: 222px;
        background-image: url('../../assets/mk5_6.png');
        background-size: 100% 100%;
        opacity: 1;

        .big_good,
        .middle_good,
        .small_good {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            width: 63px;
            height: 36px;
            margin-top: 54px;
          }

          .fortune_detail {
            width: 236px;
            height: 72px;
            margin-top: 22px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url('../../assets/mk5_10.png');
            background-size: 100% 100%;

            .fortune_detail_top {
              width: 223px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;

              .blue {
                color: #77EDFF;
              }
            }

            .fortune_detail_bottom {
              margin-top: 5px;
              width: 224px;
              height: 24px;
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FEEE80;
            }
          }

          .overtime {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: auto;
            margin-bottom: 0;

            .special {
              color: #77EDFF;
            }
          }
        }

        .middle_good {
          .fortune_detail {
            width: 236px;
            height: 72px;
            margin-top: 22px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .fortune_detail_top {
              margin-top: 8px;
              width: 223px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              display: flex;
              align-items: center;
              white-space: nowrap;

              img {
                width: 22px;
                height: 19px;
                display: block;
                margin-top: 0;
                margin-left: 2px;
                margin-right: 2px;
              }

              .special {
                color: #FFE375;
              }
            }

            .fortune_detail_bottom {
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #99FBFF;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 11px;
              margin-bottom: 14px;
            }
          }
        }

        .small_good {
          .fortune_detail {
            width: 236px;
            height: 72px;
            margin-top: 22px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding-left: 7px;

            .fortune_detail_top {
              margin-top: 8px;
              width: 223px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              display: flex;
              align-items: center;
              white-space: nowrap;
              flex-wrap: wrap;
              position: relative;

              .small_good_tip {
                position: absolute;
                width: 61px;
                height: 21px;
                top: -18px;
                right: -24px;
                opacity: 1;
                background-image: url('../../assets/mk5_11.png');
                background-size: 100% 100%;
                display: flex;
                align-items: flex-start;
                padding-top: 3px;
                justify-content: center;
                font-size: 10px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #7E6549;
              }

              img {
                width: 22px;
                height: 19px;
                display: block;
                margin-top: 0;
                margin-left: 2px;
                margin-right: 2px;
              }

              .yellow {
                color: #FFE375;
              }

              .blue {
                color: #99FBFF;
              }
            }

            .fortune_detail_bottom {
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFE375;
              display: flex;
              align-items: center;
              height: 11px;
              margin-top: 4px;
            }
          }
        }
      }

      .cq-btn {
        width: 159px;
        height: 50px;
        // margin-top: 17px;
        margin-bottom: 12px;
        margin-top: auto;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .exchangeArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 13px;
      position: relative;

      .question {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 28px;
        height: 28px;
        background-image: url('../../assets/mk5_12.png');
        background-size: 100% 100%;
      }

      .top {
        width: 355px;
        height: 44px;
        background-image: url('../../assets/mk1_2.png');
        background-size: 100% 100%;
      }

      .center {
        width: 355px;
        background-image: url('../../assets/mk1_3.png');
        background-size: 100% 100%;

        .content {
          margin-top: -12px;
          margin-bottom: -17px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 11;

          .exchange_item {
            width: 335px;
            height: 83px;
            background-image: url('../../assets/mk5_13.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            margin-bottom: 9px;


            .giftItem {
              margin-left: 22px;
              width: 60px;
              height: 60px;
              background: #FFFFFF;
              border: 2px solid #D6BEFF;
              border-radius: 6px;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              overflow: hidden;
              box-sizing: content-box;


              .giftItem_top {
                position: absolute;
                width: 100%;
                flex: 1 1 auto;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  height: 47px;
                }
              }

              .giftItem_bottom {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 0;
                margin-top: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                height: 17px;
                background: #8D64DA;
                color: #FFFFFF;
                font-size: 11px;
                border-radius: 0px 0px 4px 4px;
              }
            }

            .add {
              width: 26px;
              height: 26px;
              background-image: url('../../assets/mk5_16.png');
              background-size: 100% 100%;
              margin-left: 11px;
            }

            .random {
              margin-left: 11px;
              width: 60px;
              height: 60px;
              background: linear-gradient(0deg, #8746A8, #4134B9);
              border: 2px solid #D6BEFF;
              border-radius: 6px;
              position: relative;
              overflow: visible;

              .giftItem_top {
                img {
                  height: 31px;
                  margin-top: 8px;
                }
              }


              .pover {
                position: absolute;
                top: 63px;
                width: 271px;
                height: 86px;
                background-image: url('../../assets/mk5_14.png');
                background-size: 100% 100%;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;

                .giftItem {
                  margin-left: 6px;
                  margin-top: 16px;
                  width: 54px;
                  height: 54px;
                  background: #FFFFFF;
                  border: 2px solid #D6BEFF;
                  border-radius: 6px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  position: relative;
                  overflow: hidden;
                  box-sizing: content-box;
                  position: relative;

                  .cornerMark {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 42px;
                    height: 13px;
                    background: #D781FF;
                    border-radius: 0px 6px 0px 6px;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // height: 8px;
                    line-height: 8px;
                    font-size: 8px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                  }


                  .giftItem_top {
                    position: absolute;
                    width: 100%;
                    flex: 1 1 auto;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                      margin-top: 0;
                      height: 38px;
                    }

                    .lottie {
                      height: 38px;
                      width: 38px;

                      ::v-deep .micAvatar_img {
                        width: 84%;
                        height: 84%;
                      }
                    }
                  }

                  .giftItem_bottom {
                    width: 100%;
                    text-align: center;
                    font-weight: 500;
                    margin-bottom: 0;
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    height: 17px;
                    background: #8D64DA;
                    color: #FFFFFF;
                    font-size: 10px;
                  }
                }
              }
            }


            .exchange_btn {
              width: 80px;
              height: 30px;
              background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
              border: 1px solid #FFFFFF;
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #A9792C;
              white-space: nowrap;
              margin-right: 16px;
              margin-left: auto;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 23px;
                height: 23px;
              }

              .obliqueLine {
                position: absolute;
                width: 70px;
                height: 9px;
                background-image: url('../../assets/mk5_18.png');
                background-size: 100% 100%;
              }



              .discount_tip {
                position: absolute;
                top: -33px;
                width: 81px;
                height: 36px;
                background-image: url('../../assets/mk5_17.png');
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;

                .discount {
                  display: flex;
                  align-items: center;

                  img {
                    width: 18px;
                    height: 15px;
                  }
                }
              }
            }
          }
        }

        .ThemeBox_BottomText {
          margin-left: 13px;
          margin-right: 21px;
          line-height: 25px;

          li {
            font-size: 14px;
            position: relative;
            list-style-type: none;
            margin-left: 10px;
            padding-left: 3px;
            color: #6f59c3;

            img {
              position: relative;
              margin: 0 1px;
              width: 22px;
            }

            span {
              position: absolute;
              top: 9px;
              left: -10px;
              display: block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #fb97cd;
            }
          }
        }

      }

      .bottom {
        width: 355px;
        height: 45px;
        background-image: url('../../assets/mk1_4.png');
        background-size: 100% 100%;
      }
    }


    .dialog {
      top: 50%;

      .dialog_cotent {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 418px;
        margin-bottom: 24px;
        overflow-y: scroll;

        div {
          flex-shrink: 0;
        }

        .tit {
          height: 13px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 9px;
        }

        .tip1 {
          width: 177px;
          height: 20px;
          background: #B966DB;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 13px;
        }

        .award_item {
          width: 288px;
          height: 77px;
          background: #613AA3;
          opacity: 0.8;
          border-radius: 7px;
          margin-top: 17px;
          display: flex;
          justify-content: center;
          position: relative;

          .giftItem {
            margin-top: 8px;
            margin-left: 4px;
            width: 48px;
            height: 48px;
            background: #FFFFFF;
            border: 2px solid #F0ADFF;
            border-radius: 7px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            box-sizing: content-box;
            position: relative;

            .cornerMark {
              position: absolute;
              top: -2px;
              right: -2px;
              width: 36px;
              height: 12px;
              background: #FD78F4;
              border-radius: 0px 6px 0px 6px;
              z-index: 20;
              display: flex;
              align-items: center;
              justify-content: center;
              // height: 8px;
              line-height: 8px;
              font-size: 8px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
            }


            .giftItem_top {
              position: absolute;
              width: 100%;
              flex: 1 1 auto;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                height: 35px;
              }

              .lottie {
                height: 35px;
                width: 35px;

                ::v-deep .micAvatar_img {
                  width: 84%;
                  height: 84%;
                }
              }
            }

            .giftItem_bottom {
              width: 100%;
              text-align: center;
              font-size: 9px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              margin-bottom: 0;
              margin-top: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
              height: 14px;
              background: #8D64DA;
              border-radius: 0px 0px 5px 5px;
            }

            .probability {
              position: absolute;
              bottom: -14px;
              width: 19px;
              height: 9px;
              font-size: 10px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #E6ADFF;
              z-index: 99999;
              white-space: nowrap;
            }
          }

          .giftItem:nth-child(1) {
            margin-left: 0;
          }

          .gift_type {
            width: 67px;
            height: 17px;
            background: linear-gradient(-90deg, #FF79F4, #BD67FF);
            border-radius: 10px 0px 10px 0px;
            position: absolute;
            top: -11px;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
          }
        }

        .list1_item1 {
          .lottie {
            ::v-deep .micAvatar_img {
              width: 72% !important;
              height: 72% !important;
            }
          }
        }

        .tip2 {
          width: 177px;
          height: 20px;
          background: #6151C3;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 13px;
        }
      }
    }

    .dialog1 {
      top: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .love_bg {
        width: 317px;
        height: 302px;
        background-image: url('../../assets/tk_8.png');
        background-size: 100% 100%;
        position: relative;
        left: 50%;
        top: -60px;
        transform: translateX(-50%);
        position: relative;

        .nocp {
          position: absolute;
          top: 138px;
          left: 50%;
          transform: translateX(-50%);
          width: 156px;
          height: 32px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E752AD;
          line-height: 19px;
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
        }

        div {
          position: absolute;
        }

        .lefticon,
        .righticon {
          width: 48px;
          height: 48px;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .lefticon {
          top: 84px;
          left: 65px;

        }

        .righticon {
          top: 84px;
          right: 65px;
        }

        .tit_zyqyj {
          top: 109px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #E752AD;
        }

        .day_num {
          // width: 83px;
          height: 39px;
          line-height: 39px;
          vertical-align: middle;
          font-size: 48px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #BA225D;
          background: linear-gradient(0deg, #DD4996 0%, #FA6DC7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          top: 130px;
          left: 50%;
          transform: translateX(-50%);
        }

        .tit_jnr {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #B38CA4;
          top: 182px;
          left: 50%;
          transform: translateX(-50%);
        }

        .day_jnr {
          // width: 117px;
          height: 13px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E752AD;
          top: 196px;
          left: 50%;
          transform: translateX(-50%);
        }

        .tit_tmz {
          width: 35px;
          height: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #B38CA4;
          top: 219px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .value_tmz {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E752AD;
          top: 235px;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .task_list {
        margin-top: -76px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 177px;
        overflow-y: scroll;

        .task_item {
          width: 286px;
          height: 66px;
          background: linear-gradient(90deg, #619DF7, #5C6EF3, #E9AFFF);
          background-size: 103% 100%;
          background-position: -3px;
          border: 3px solid rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          margin-bottom: 5px;
          flex-shrink: 0;
          display: flex;
          align-items: center;

          .giftItem {
            margin-left: 8px;
            width: 50px;
            height: 50px;
            background: #FFFFFF;
            border: 2px solid #D6BEFF;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-sizing: content-box;


            .giftItem_top {
              position: absolute;
              width: 100%;
              flex: 1 1 auto;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                height: 34px;
              }
            }

            .giftItem_bottom {
              width: 100%;
              text-align: center;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 0;
              margin-top: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
              height: 16px;
              background: #8D64DA;
              color: #FFFFFF;
              font-size: 11px;
            }
          }
        }

        .description {
          margin-left: 7px;
          height: 35px;

          .description_top {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }

          .description_bottom {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFF0AB;
          }
        }

        .receive_btn {
          width: 60px;
          height: 30px;
          background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
          border: 1px solid #FFFFFF;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14px;
          margin-left: auto;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4D7DDD;
        }
      }

      .dialog_bottom {
        width: 296px;
        height: 63px;
        background: #7C61F2;
        border-radius: 0px 0px 12px 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 8px;
        padding-top: 16px;

        .bottom_tit {
          display: flex;
          align-items: center;

          .point {
            width: 6px;
            height: 6px;
            background: #FFE9B9;
            border-radius: 50%;
            margin-right: 9px;
          }

          .review_text {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 19px;
          }
        }
      }
    }
  }
</style>
