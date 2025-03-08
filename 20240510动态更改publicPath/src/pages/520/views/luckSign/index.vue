<template>
  <div class="dailyFortune" @click="pover_flag = null">
    <div class="signBox">
      <div class="pLine">
        <p class="awardTicketP">
          桃花币
          <img src="../../assets/thb_120_120.png" />
          ：<span>{{ pageData.user_coins }}</span>
        </p>
        <p class="awardTicketP2">
          消费钻石
          <img src="../../assets/zs_42_32.png" />
          ：<span class="special">{{ pageData.masonry_consume }}</span>
        </p>
      </div>
      <div class="left_dec" @click="longLoveReview"></div>
      <!-- 抽签 -->
      <div class="draw">
        <div class="fortune" v-if="sign_type != 0">
          <!-- 大吉 -->
          <div class="big_good" v-if="sign_type == 3">
            <img :src="IconPath('mk6_10.png')" alt="" />
            <div class="fortune_detail">
              <div class="fortune_detail_top">
                每次兑换有50%几率刷新
                <span class="blue">下次折扣兑换</span>其中折扣兑换概率如下：
              </div>
              <div class="fortune_detail_bottom">7.5折（50%）、5折（30%）、2.5折（10%）免费（10%）</div>
            </div>
            <div class="overtime">
              本轮结束时间 <span class="special">{{ secTotime }}</span>
            </div>
          </div>
          <!-- 中吉 -->
          <div class="middle_good" v-if="sign_type == 2">
            <img :src="IconPath('mk6_9.png')" alt="" />
            <div class="fortune_detail">
              <div class="fortune_detail_top">
                每消耗10<img src="../../assets/thb_120_120.png" alt="" />可自动获得1<img src="../../assets/thb_120_120.png" alt="" /><span
                  class="special"
                  :key="textKey"
                  >({{ pageData.sign_info.progress_ratio }})</span
                >
              </div>
              <div class="fortune_detail_bottom">本轮已获得桃花币奖励：{{ pageData.sign_info.get_coins }}</div>
            </div>
            <div class="overtime">
              本轮结束时间 <span class="special">{{ secTotime }}</span>
            </div>
          </div>
          <!-- 小吉 -->
          <div class="small_good" v-if="sign_type == 1">
            <img :src="IconPath('mk6_8.png')" alt="" />
            <div class="fortune_detail">
              <div class="fortune_detail_top">
                <div class="small_good_tip">价值99钻石</div>
                累计消耗10<img src="../../assets/thb_120_120.png" alt="" /><span class="blue">自动获得</span>1个<span class="yellow">心锁戒指</span
                ><span class="yellow">({{ pageData.sign_info.progress_ratio }})</span>
              </div>
              <div class="fortune_detail_bottom">注：此任务一轮只能获得一次奖励</div>
            </div>
            <div class="overtime">
              本轮结束时间 <span class="special">{{ secTotime }}</span>
            </div>
          </div>
        </div>
        <div class="no_fortune" v-else>
          <PublicJson
            class="lottie_cq sign"
            ref="hd_lb_cq_json"
            jsonName="hd_qrj_fl"
            :loop="false"
            :need-pause="true"
            @jsonComplete="jsonComplete"
            @complete="complete"
            @DOMLoaded="DOMLoaded"
          />
        </div>
      </div>
      <div class="cq-btn">
        <!-- 重新抽签 -->
        <img v-if="sign_type != 0" :src="IconPath('mk6_16.png')" alt="" @click="drawLots(2)" />
        <!-- 立即抽签 -->
        <img v-else :src="IconPath('mk6_15.png')" alt="" @click="drawLots(1)" />
      </div>
    </div>

    <!-- 兑换 -->
    <out-box class="exchangeArea">
      <div class="question" @click="$refs.rewardDescription.showPopup = true"></div>
      <div class="exchange_item" v-for="(item, index) in pageData.exchange_list" :key="index">
        <div class="fixed giftItem">
          <div class="jz999" v-if="index == 1">价值999<img :src="IconPath('zs_42_32.png')" alt="" /></div>
          <div class="giftItem_top">
            <img :src="IconPath(item.award1[0].icon)" alt="" />
          </div>
          <div class="giftItem_bottom">{{ item.award1[0].text }}</div>
        </div>
        <div class="add"></div>
        <!-- 随机奖励 -->
        <div class="random giftItem" @click.stop="pover_flag = index + 1">
          <div class="giftItem_top">
            <img :src="IconPath('mk6_3.png')" alt="" />
          </div>
          <div class="giftItem_bottom">点击查看</div>
          <!-- 气泡弹出层 -->
          <div class="pover" v-if="pover_flag == index + 1">
            <div class="fixed giftItem" v-for="(item1, index1) in item.award2" :key="index1">
              <div class="cornerMark" v-if="item1.type == 'costume'">主页特效</div>
              <div class="giftItem_top">
                <img v-if="item1.icon" :src="IconPath(item1.icon)" alt="" />
              </div>
              <div class="giftItem_bottom">{{ item1.text }}</div>
            </div>
          </div>
        </div>
        <!-- 兑换按钮 -->
        <div v-throttle="[exchange, 'click', 1000, item.goods_id, item.real_price]" class="exchange_btn flex-center">
          {{ item.org_price }}<img src="../../assets/thb_120_120.png" alt="" />兑换
          <!-- 折扣浮标 -->
          <div class="discount_tip" v-if="item.real_price != item.org_price">
            <div class="discount" v-if="item.real_price == 0">免费</div>
            <div class="discount" v-else>{{ item.real_price }}<img :src="IconPath('thb_120_120.png')" alt="" /></div>
            兑换
          </div>
          <div v-if="item.real_price != item.org_price" class="obliqueLine"></div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>玩家<i>每消费300钻石</i>可自动获得1{{ pointName }}<img :src="IconPath(pointIcon)" alt="" /></li>
          <li><span></span>{{ pointName }}<img :src="IconPath(pointIcon)" alt="" />可兑换不同类型的礼包，每次兑换可随机获得一份附赠奖励。</li>
          <li><span></span>玩家可抽取桃花签获得运势加成，加成的生效时间为1小时，倒计时结束后运势失效，玩家可开启新的运势</li>
          <li>
            <span></span>倒计时结束前也可消耗{{ pointName
            }}<img :src="IconPath(pointIcon)" alt="" />进行重新抽签，若抽到不同的运势，则原有的加成效果和时间即刻失效
          </li>
        </ul>
      </div>
    </out-box>
    <!-- 恭喜获得弹窗 -->
    <congratsGetPrompt ref="congratsGetPrompt" :list="dialogData.awards">
      <template #default="{ data }">
        <div v-if="!data.icon" class="lottieContainer">
          <PublicSvga v-if="!data.icon && data.type == 'mic'" class="lottie" svgaName="ts_txxm" />
          <PublicJson v-if="!data.icon && data.type == 'voice'" jsonName="sb_yywg" class="lottie lottiesb" :userAvatar="$store.getters.user_icon" />
        </div>
      </template>
    </congratsGetPrompt>
    <!-- 奖励说明弹窗 -->
    <rewardDescription ref="rewardDescription"></rewardDescription>
    <!-- 长情回顾弹窗 -->
    <longLoveReview ref="longLoveReview" :pageData2="pageData2" @refresh="refresh"></longLoveReview>
  </div>
</template>

<script>
// 默认数据
import { dailyFortune, longLoveReviewData } from '../../utils/pageData'
// 数据请求
import { home, moduleSix } from '../../api/index'
// json动画组件
import PublicSvga from '@/pages/520/components/publicSvga.vue'
import PublicJson from '../../components/publicJson'
import rewardDescription from './components/rewardDescription.vue'
import longLoveReview from './components/longLoveReview.vue'
import congratsGetPrompt from '../sweetTreasure/components/congrats-get-prompt_normal.vue'
// 引入拖动组件
// import Drag from '../../components/DragItDude.vue'

export default {
  name: 'dailyFortune',
  components: {
    PublicSvga,
    PublicJson,
    rewardDescription,
    longLoveReview,
    congratsGetPrompt
  },
  props: [],
  data() {
    return {
      textKey: this.guid(),
      parentLeft: 305,
      parentTop: 411,
      dialogData: {
        awards: [
          {
            id: 80,
            type: 'mic',
            icon: 'zjs_120_120.png',
            nums: 1,
            name: '火树银花头饰',
            text: '头饰+1天',
            weight: '35'
          },
          {
            id: 80,
            type: 'mic',
            icon: 'zjs_120_120.png',
            nums: 1,
            name: '火树银花头饰',
            text: '头饰+1天',
            weight: '35'
          }
        ]
      },
      // 道具图标
      pointIcon: 'thb_120_120.png',
      // 道具名称
      pointName: '桃花币',
      pageData: {},
      pageData2: {},
      pover_flag: 0,
      timer: null,
      isPlaying: false, // 是否正在播放动画
      isActivated: false
    }
  },
  computed: {
    sign_type() {
      return this.pageData.sign_info.sign_type
    },
    // 进度
    // jindu() {
    //   return this.pageData.sign_info?.progress_ratio?.split('/')[0]
    // },
    // 倒计时
    secTotime() {
      let t = ''
      if (this.count_down > -1) {
        const min = Math.floor(this.count_down / 60) % 60
        const sec = this.count_down % 60
        if (min < 10) {
          t += '0'
        }
        t += min + ':'
        if (sec < 10) {
          t += '0'
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
    }
    // jindu(newValue) {
    //   console.log(newValue, 999)
    // }
  },

  created() {
    this.pageData = dailyFortune
    this.pageData2 = longLoveReviewData
    this.init()
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 自定义id
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const string = (Math.random() * 16) | 0
        const v = c == 'x' ? string : (string & 0x3) | 0x8
        return v.toString(16)
      })
    },
    // json动画加载完成跳转到第一帧
    DOMLoaded() {
      this.$refs.hd_lb_cq_json.goToAndStop()
    },
    // 拖动组件停止拖动回调
    handleDropped(e) {
      this.parentTop = e.top
    },
    // 拖动组件移动过程中回调
    dragging() {
      // console.log('dragging');
    },
    // 拖动组件开始移动回调
    activated() {
      // console.log('activated');
      this.isActivated = true
    },
    // 摇签动画结束
    async jsonComplete() {
      this.isPlaying = false
      this.init()
      this.textKey = this.guid()
    },
    // 摇签动画结束
    async complete() {
      this.isPlaying = false
      this.init()
      this.textKey = this.guid()
    },
    // 刷新页面
    refresh(data) {
      this.pageData.user_coins = data
      this.getlongLoveReview()
    },
    // 获取长情回顾数据
    async longLoveReview() {
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '长情回顾',
          module: '桃花签运'
        }
      )
      const res = await this.getlongLoveReview()
      if (res.errno == 0) this.$refs.longLoveReview.showPopup = true
    },
    async getlongLoveReview() {
      const res = await moduleSix({
        type: 'cp_info'
      })
      res.errno == 0 ? (this.pageData2 = res.data) : this.$toast(res.errmsg)
      return res
    },
    // 兑换
    exchange(mark, price) {
      console.log(price)
      if (price > this.pageData.user_coins) {
        console.log('桃花币不足，请先去消费')
        return this.$toast('桃花币不足，请先去消费')
      }
      moduleSix({
        type: 'exchange',
        mark
      }).then((res) => {
        if (res.errno == 0) {
          this.dialogData.awards = res.data.awards
          this.$refs.congratsGetPrompt.showPopup = true
          this.init()
        } else {
          this.$toast(res.errmsg)
        }
      })
      this.textKey = this.guid()
    },
    init() {
      home({
        type: 'tab',
        mark: 'm6'
      }).then((res) => {
        if (res.errno == 0) {
          this.pageData = res.data
          clearInterval(this.timer)
          if (res.data.sign_info.count_down && res.data.sign_info.count_down >= 0) {
            this.timer = setInterval(() => {
              if (this.pageData.sign_info.count_down > 0) {
                this.pageData.sign_info.count_down--
              }
            }, 1000)
          }
          this.textKey = this.guid()
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    // 抽签
    async drawLots(mark) {
      if (this.isPlaying) return
      const res = await moduleSix({
        type: 'open_sign',
        mark
      })
      if (res.errno != 0) {
        this.$toast(res.errmsg)
      } else {
        if (this.sign_type == 0) {
          this.isPlaying = true
          this.$refs.hd_lb_cq_json.playJson()
        } else {
          this.init()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.phoneBoxfixed {
  position: sticky !important;
  top: 411px !important;
  right: 16px !important;
  z-index: 99 !important;
}

.phoneBox {
  position: absolute;
  right: 40px;
  top: 100px;
  width: 400px;
  height: 750px;
}

.lottie_gxhd {
  height: 60px;
  width: 60px;

  ::v-deep .micAvatar_img {
    width: 80%;
    height: 80%;
  }
}

// .lottie_cq {
//   width: 125px;
//   height: 214px;
//   margin-top: 17px;
//   transform: scale(180%);
// }

.voice {
  height: 62px;
  width: 62px;

  ::v-deep .micAvatar_img {
    width: 67%;
    height: 67%;
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
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 35px;

  .signBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 734px;
    height: 735px;
    background-image: url('../../assets/mk6_2.png');
    background-size: 100% 100%;

    .pLine {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 93px;
      width: 100%;

      .awardTicketP {
        height: 48px;
        background: #3c189a;
        border-radius: 10px 24px 24px 0px;
        font-size: 24px;

        font-weight: 400;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 42px;
        padding-right: 22px;
        white-space: nowrap;
        margin-left: 16px;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .awardTicketP2 {
        height: 48px;
        background: #3c189a;
        border-radius: 24px 10px 0px 24px;
        font-size: 24px;

        font-weight: 400;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 29px;
        padding-right: 23px;
        white-space: nowrap;
        margin-right: 15px;

        img {
          width: 42px;
        }
      }
    }

    .left_dec {
      position: absolute;
      top: 6px;
      left: -8px;
      width: 141px;
      height: 444px;
      z-index: 99;
      background-image: url('../../assets/mk6_1.png');
      background-size: 100% 100%;
    }

    .draw {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -61px;
      width: 100%;
      height: 100%;

      ::v-deep .van-sticky {
        left: 10px;
        top: -3px;
      }

      div {
        flex-shrink: 0;
      }

      .isActivated {
        position: fixed;
        //  top: 586px;
        right: 15px;
      }

      .fortune {
        position: absolute;
        top: 53px;
        width: 575px;
        height: 444px;
        background-image: url('../../assets/mk6_7.png');
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
            width: 126px;
            height: 72px;
            margin-top: 109px;
          }

          .fortune_detail {
            width: 471px;
            height: 143px;
            background: linear-gradient(0deg, rgba(169, 150, 84, 0.2), rgba(80, 59, 12, 0.59));
            margin-top: 43px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url('../../assets/mk6_12.png');
            background-size: 100% 100%;

            .fortune_detail_top {
              width: 445px;
              font-size: 26px;

              font-weight: 500;
              color: #ffffff;

              .blue {
                color: #77edff;
              }
            }

            .fortune_detail_bottom {
              margin-top: 10px;
              width: 447px;
              height: 48px;
              font-size: 22px;

              font-weight: 500;
              color: #feee80;
            }
          }

          .overtime {
            font-size: 28px;

            font-weight: 400;
            color: #ffffff;
            margin-top: auto;
            margin-bottom: 13px;

            .special {
              color: #77edff;
            }
          }
        }

        .middle_good {
          .fortune_detail {
            display: flex;
            flex-direction: column;
            align-items: center;

            .fortune_detail_top {
              margin-top: 16px;
              font-size: 26px;

              font-weight: 500;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;

              img {
                flex-shrink: 0;
                width: 50px;
                height: 50px;
                display: block;
                margin-top: 0;
                margin-left: -2px;
                margin-right: -2px;
              }

              .special {
                color: #ffe375;
              }
            }

            .fortune_detail_bottom {
              font-size: 22px;

              font-weight: 500;
              color: #99fbff;
              margin-bottom: 26px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .small_good {
          .fortune_detail {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding-left: 14px;

            .fortune_detail_top {
              margin-top: 16px;
              font-size: 26px;

              font-weight: 500;
              color: #ffffff;
              display: flex;
              align-items: center;
              white-space: nowrap;
              flex-wrap: wrap;
              position: relative;

              .small_good_tip {
                position: absolute;
                width: 121px;
                height: 41px;
                top: -36px;
                right: -48px;
                opacity: 1;
                background-image: url('../../assets/mk6_11.png');
                background-size: 100% 100%;
                display: flex;
                align-items: flex-start;
                padding-top: 3px;
                justify-content: center;
                font-size: 20px;

                font-weight: 500;
                color: #7e6549;
                white-space: nowrap;
              }

              img {
                width: 44px;
                height: 37px;
                display: block;
                margin-top: 0;
                margin-left: -2px;
                margin-right: -2px;
              }

              .yellow {
                color: #ffe375;
              }

              .blue {
                color: #99fbff;
              }
            }

            .fortune_detail_bottom {
              font-size: 22px;

              font-weight: 500;
              color: #ffe375;
              display: flex;
              align-items: center;
              margin-top: 0px;
            }
          }
        }
      }

      .no_fortune {
        width: 600px;
        height: 600px;
        margin-top: -44px;

        .sign {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }

    .cq-btn {
      width: 324px;
      height: 136px;
      position: absolute;
      bottom: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      // margin-bottom: 12px;
      // margin-top: auto;

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
    margin-top: 17px;
    position: relative;
    width: 734px;
    padding-top: 95px;
    padding-bottom: 95px;

    .question {
      position: absolute;
      top: 29px;
      right: 19px;
      width: 56px;
      height: 56px;
      background-image: url('../../assets/mk6_4.png');
      background-size: 100% 100%;
    }

    .exchange_item {
      width: 660px;
      height: 160px;
      background: linear-gradient(90deg, #8b7cfc, #ffbdf8);
      border: 4px solid #feddff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 17px;

      .giftItem {
        margin-left: 22px;
        width: 120px;
        height: 120px;
        background: #ffffff;
        border: 4px solid #d0bbff;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        box-sizing: content-box;

        .jz999 {
          position: absolute;
          top: -19px;
          right: -26px;
          width: 116px;
          height: 34px;
          background: linear-gradient(-90deg, #75b9ff, #ff84f8);
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;

          font-weight: 500;
          color: #ffffff;
          white-space: nowrap;
          z-index: 99;

          img {
            width: 27px;
          }
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
            height: 77px;
          }
        }

        .giftItem_bottom {
          width: 100%;
          text-align: center;

          font-size: 22px;

          font-weight: 400;
          color: #ffffff;

          margin-bottom: 0;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          height: 34px;
          background: #865ee3;
          border-radius: 0px 0px 12px 12px;
        }
      }

      .add {
        width: 51px;
        height: 51px;
        background-image: url('../../assets/mk6_14.png');
        background-size: 100% 100%;
        margin-left: 22px;
      }

      .random {
        margin-left: 22px;
        width: 120px;
        height: 120px;
        background: linear-gradient(0deg, #8746a8, #4134b9);
        border: 4px solid #d6beff;
        border-radius: 12px;
        position: relative;
        overflow: visible;

        .giftItem_top {
          img {
            height: 62px;
            margin-top: 16px;
          }
        }

        .pover {
          position: absolute;
          top: 126px;
          width: 542px;
          height: 172px;
          background-image: url('../../assets/mk6_5.png');
          background-size: 100% 100%;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;

          .giftItem {
            margin-left: 12px;
            margin-top: 32px;
            width: 108px;
            height: 108px;
            background: #ffffff;
            border: 4px solid #d6beff;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-sizing: content-box;

            .cornerMark {
              position: absolute;
              top: -4px;
              right: -4px;
              width: 84px;
              height: 26px;
              background: #d781ff;
              border-radius: 0px 12px 0px 12px;
              z-index: 20;
              display: flex;
              align-items: center;
              justify-content: center;
              // height: 8px;
              line-height: 16px;
              font-size: 16px;

              font-weight: 500;
              color: #ffffff;
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
                height: 76px;
              }

              .lottie {
                height: 76px;
                width: 76px;

                ::v-deep .micAvatar_img {
                  width: 80%;
                  height: 80%;
                }
              }

              .voice {
                height: 76px;
                width: 76px;

                ::v-deep .micAvatar_img {
                  width: 67%;
                  height: 67%;
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
              height: 34px;
              background: #8d64da;
              color: #ffffff;
              font-size: 20px;
            }
          }
        }
      }

      .exchange_btn {
        width: 160px;
        height: 60px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 2px solid #ffffff;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 500;
        color: #a9792c;
        white-space: nowrap;
        margin-right: 32px;
        margin-left: auto;
        position: relative;

        img {
          width: 46px;
          height: 46px;
        }

        .obliqueLine {
          position: absolute;
          width: 140px;
          height: 18px;
          background-image: url('../../assets/mk6_13.png');
          background-size: 100% 100%;
        }

        .discount_tip {
          position: absolute;
          top: -66px;
          width: 162px;
          height: 72px;
          background-image: url('../../assets/mk6_6.png');
          background-size: 100% 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          font-size: 26px;

          font-weight: 500;
          color: #ffffff;
          padding-top: 16px;

          .discount {
            display: flex;
            align-items: center;

            img {
              width: 36px;
              height: 30px;
            }
          }
        }
      }
    }

    .ThemeBox_BottomText {
      margin-left: 0px;
      line-height: 50px;
      width: 624px;
      align-self: flex-start;
      margin-left: 66px;

      li {
        font-size: 28px;
        position: relative;
        list-style-type: none;
        color: #6f59c3;

        i {
          color: #ffadf8;
        }

        img {
          position: relative;
          margin: 0 2px;
          width: 44px;
        }

        span {
          position: absolute;
          top: 12px;
          left: -29px;
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fb97cd;
        }
      }
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

        font-weight: 400;
        color: #ffffff;
        margin-top: 9px;
      }

      .tip1 {
        width: 177px;
        height: 20px;
        background: #b966db;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }

      .award_item {
        width: 288px;
        height: 77px;
        background: #613aa3;
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
          background: #ffffff;
          border: 2px solid #f0adff;
          border-radius: 7px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-sizing: content-box;

          .cornerMark {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 36px;
            height: 12px;
            background: #fd78f4;
            border-radius: 0px 6px 0px 6px;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: center;
            // height: 8px;
            line-height: 8px;
            font-size: 8px;

            font-weight: 500;
            color: #ffffff;
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
                width: 80%;
                height: 80%;
              }
            }
          }

          .giftItem_bottom {
            width: 100%;
            text-align: center;
            font-size: 9px;

            font-weight: 400;
            color: #ffffff;
            margin-bottom: 0;
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            height: 14px;
            background: #8d64da;
            border-radius: 0px 0px 5px 5px;
          }

          .probability {
            position: absolute;
            bottom: -14px;
            width: 19px;
            height: 9px;
            font-size: 10px;

            font-weight: 400;
            color: #e6adff;
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
          background: linear-gradient(-90deg, #ff79f4, #bd67ff);
          border-radius: 10px 0px 10px 0px;
          position: absolute;
          top: -11px;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          font-size: 10px;

          font-weight: 500;
          color: #ffffff;
        }
      }

      .list1_item1 {
        .lottie {
          ::v-deep .micAvatar_img {
            width: 67% !important;
            height: 67% !important;
          }
        }
      }

      .tip2 {
        width: 177px;
        height: 20px;
        background: #6151c3;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }
    }
  }

  .dialog1 {
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
