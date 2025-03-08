<template>
  <div class="sweetTreasure">
    <out-box class="sign">
      <img class="title_image" :src="IconPath('title_6.png')" alt="" />
      <div class="left_dec"></div>
      <div class="right_dec"></div>
      <div class="sign_list" ref="Xlist">
        <div
          class="sign_item"
          v-for="(item, index) in pageData.sign_list"
          :key="index"
        >
          <div class="award">
            <img :src="IconPath('xzb_120_120.png')" alt="" />
            <div class="nums">x1</div>
            <div class="award_bottom">{{ item.date_text }}</div>
          </div>
          <!-- 签到状态：0-已过期，1-即将开始，2-已签到 -->
          <div class="sign_btn wqd" v-if="item.status == 0">未签到</div>
          <div class="sign_btn jjks" v-if="item.status == 1">即将开始</div>
          <div class="sign_btn yqd" v-if="item.status == 2">已签到</div>
        </div>
      </div>
    </out-box>
    <div class="treasure">
      <div class="recharge-num flex-center">
        已充值：{{ pageData.recharges }}
      </div>
      <div class="lotus">
        <div class="my_coin">
          拥有的寻珍币
          <img class="coin" :src="IconPath('xzb_120_120.png')" alt="" /> ：{{
            pageData.ticket_nums
          }}
          <img
            @click="handleRecharge"
            class="add"
            :src="IconPath('mk5_9.png')"
            alt=""
          />
        </div>
        <div class="award_tips">
          <span>抽到获得双倍奖励</span>
          <span v-if="currentLevel != 5">并开启下层</span>
        </div>
        <div
          class="lock_floor"
          v-if="pageData.layer_list[currentLevel].is_locker"
        ></div>
        <!-- 奖池奖励 -->
        <div
          class="treasure_award"
          :class="['treasure_award' + index]"
          v-for="(item, index) in 7"
          :key="index"
        >
          <img
            class="light_award"
            v-if="selectFlag == index + 1"
            :src="IconPath('mk5_8.png')"
            alt=""
          />
          <div
            v-if="['voice', 'chat_bubble'].includes(currentList[index]?.type)"
            class="new-icon flex-center"
          >
            新
          </div>
          <div
            v-if="
              currentList[index]?.type === 'pst_privilege' &&
              priceData[currentList[index]?.name]
            "
            class="price-label flex-center"
          >
            价值{{ priceData[currentList[index].name]
            }}<img :src="IconPath('zs_27_20.png')" />
          </div>
          <!-- 普通奖励 -->
          <div class="inner_award" v-if="index != 6">
            <img
              v-if="currentList[index].icon"
              :src="IconPath(currentList[index].icon)"
              alt=""
            />
            <public-json
              v-if="
                !currentList[index].icon &&
                (currentList[index].awardId == 10 ||
                  currentList[index].awardId == 42)
              "
              jsonName="sb_thsk"
              class="lottie lottiesb"
              :userAvatar="$store.state.user_icon"
            />
            <public-json
              v-if="
                !currentList[index].icon && currentList[index].awardId == 43
              "
              jsonName="ch_zgcp"
              class="lottie"
            />
            <public-json
              v-if="
                !currentList[index].icon &&
                currentList[index].type == 'chat_bubble'
              "
              jsonName="qp_cajl_sc"
              class="lottie"
            />
            <!-- <public-json
            v-if="!data.icon && data.type == 'chat_bubble'"
            jsonName="qp_cajl_sc"
            class="lottie"
          /> -->
            <div class="inner_award_bottom">
              {{ currentList[index].show_txt }}
            </div>
            <img
              class="noaward"
              v-if="currentList[index].number == 0"
              :src="IconPath('mk5_12.png')"
              alt=""
            />
          </div>
          <!-- 珍宝奖励 -->
          <div class="inner_award last_award" v-else>
            <img
              @click="showOptional"
              class="add"
              v-if="!pageData.layer_list[currentLevel].has_optional"
              :src="IconPath('mk5_7.png')"
              alt=""
            />
            <template v-else>
              <img
                v-if="currentList[6].icon"
                :src="IconPath(currentList[6].icon)"
                alt=""
              />
              <PublicSvga
                class="lottie"
                :userAvatar="$store.state.user_icon"
                v-else
                svgaName="zayh"
              />
              <div class="inner_award_bottom">
                {{ currentList[6].show_txt }}
              </div>
              <img
                class="noaward"
                v-if="currentList[6].number == 0"
                :src="IconPath('mk5_12.png')"
                alt=""
              />
            </template>
          </div>
        </div>
      </div>
      <div class="rule_tip" @click="$refs.activityRules.showPopup = true">
        活动规则
      </div>
      <!-- 楼层 -->
      <div class="levels">
        <div
          class="level_item"
          v-for="(item, key, index) in pageData.layer_list"
          :key="index"
        >
          <div
            @click="changeLevel(key, item.is_locker)"
            class="level"
            :class="{ currentLevel: key == currentLevel }"
          >
            {{ item.name }}
          </div>
          <div class="star" v-if="index != 4"></div>
          <div class="lock" v-if="item.is_locker"></div>
        </div>
      </div>

      <div
        v-if="!isclear()"
        class="treasure_btn"
        :class="{ lock_btn: pageData.layer_list[currentLevel].is_locker }"
        @click="treasure"
      >
        <span
          >消耗 <img :src="IconPath('xzb_120_120.png')" alt="" />x
          {{ pageData.layer_list[currentLevel].need_ticket }}
        </span>
      </div>
      <div
        class="unlock_tit"
        :class="{ clear_unlock: isclear() }"
        v-if="
          currentLevel <= 4 &&
          !pageData.layer_list[Number(currentLevel) + 1].is_locker
        "
      ></div>
      <div class="total">
        <div class="spend-nums flex-center">
          我消耗的寻珍币<img :src="IconPath('xzb_120_120.png')" />：{{
            pageData.spend_nums
          }}
        </div>
        <div class="tit">累计消耗寻珍币达到门槛即可领取相应的奖励</div>
        <div class="accumulate_list" ref="icon_list">
          <div class="icon_list">
            <div
              @click="receiveSendAward(item.awardId, item.has_right)"
              class="icon_item"
              v-for="(item, index) in pageData.spend_awards"
              :key="index"
              ref="icon_item"
            >
              <div v-if="priceData[item.name]" class="price-label flex-center">
                价值{{ priceData[item.name]
                }}<img :src="IconPath('zs_27_20.png')" />
              </div>
              <img v-if="item.icon" :src="IconPath(item.icon)" alt="" />
              <public-json
                v-else
                jsonName="qp_cajl_sc"
                class="lottie"
              ></public-json>
              <!-- qp_cajl_sc -->
              <div class="nums">{{ item.show_txt }}</div>
              <div class="light" v-if="item.has_right == 1"></div>
              <div class="red_point" v-if="item.has_right == 1"></div>
              <div class="has_get" v-if="item.has_right == 2"></div>
            </div>
          </div>
          <div class="schedule_line">
            <div
              class="has_arrive"
              :style="{ width: getwidth(pageData.spend_nums) }"
            ></div>
            <div class="dot_list">
              <div
                class="dot"
                :class="{ white_dot: item.has_right != 0 }"
                v-for="(item, index) in pageData.spend_awards"
                :key="index"
              >
                <div class="small_star" v-if="item.has_right == 1"></div>
                <div class="tit">
                  {{ item.need
                  }}<img :src="IconPath('xzb_120_120.png')" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自选珍宝弹窗 -->
    <optionalTreasure
      :currentLevel="currentLevel"
      ref="optionalTreasure"
      @init="init"
    ></optionalTreasure>
    <!-- 提示弹窗 -->
    <tip
      :tipflag="tipflag"
      ref="tip"
      @drawNow="drawNow"
      @rechargeNow="rechargeNow"
    >
    </tip>
    <!-- 活动规则弹窗 -->
    <activityRules ref="activityRules"></activityRules>
    <!-- 恭喜获得弹窗 -->
    <congratsGetPrompt ref="congratsGetPrompt" :list="awards">
      <template #default="{ data }">
        <div v-if="!data.icon" class="lottieContainer">
          <PublicSvga
            v-if="!data.icon && data.type == 'mic'"
            class="lottie"
            svgaName="zayh"
            :userAvatar="$store.state.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'voice'"
            jsonName="sb_thsk"
            class="lottie lottiesb"
            :userAvatar="$store.state.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'title'"
            jsonName="ch_zgcp"
            class="lottie"
          />
          <public-json
            v-if="!data.icon && data.type == 'chat_bubble'"
            jsonName="qp_cajl_sc"
            class="lottie"
          />
          <!-- 桃花盛开，真爱永恒，找个cp，纯爱降临 -->
        </div>
      </template>
    </congratsGetPrompt>
    <!-- 普通恭喜获得恭喜获得弹窗 -->
    <normalcongrat ref="normalcongrat" :list="awards">
      <template #default="{ data }">
        <div v-if="!data.icon" class="lottieContainer">
          <PublicSvga
            v-if="!data.icon && data.type == 'mic'"
            class="lottie"
            :userAvatar="$store.state.user_icon"
            svgaName="zayh"
          />
          <public-json
            v-if="!data.icon && data.type == 'voice'"
            jsonName="sb_thsk"
            class="lottie lottiesb"
            :userAvatar="$store.state.user_icon"
          />
          <public-json
            v-if="!data.icon && data.type == 'title'"
            jsonName="ch_zgcp"
            class="lottie"
          />
          <public-json
            v-if="!data.icon && data.type == 'chat_bubble'"
            jsonName="qp_cajl_sc"
            class="lottie"
          />
        </div>
      </template>
    </normalcongrat>
  </div>
</template>

<script>
// 引入弹框
import optionalTreasure from './components/optionalTreasure.vue'
import activityRules from './components/activityRules.vue'
import tip from './components/tip.vue'
import congratsGetPrompt from './components/congrats-get-prompt.vue'
import normalcongrat from './components/congrats-get-prompt_normal.vue'
// 引入默认数据
import { sweetTreasure } from '../../utils/pageData'
// 引入动画组件
import PublicJson from '../../components/PublicJson.vue'
import PublicSvga from '../../components/PublicSvga.vue'
// 数据请求
import { home, moduleFive } from '../../api/index'
// 跳转充值界面APP方法
import { recharge } from '../../utils/toApp'

export default {
  name: 'sweetTreasure',
  components: {
    optionalTreasure,
    tip,
    activityRules,
    congratsGetPrompt,
    normalcongrat,
    PublicJson,
    PublicSvga
  },
  data() {
    return {
      priceData: Object.freeze({
        时光恋人: 1314,
        桃花运: 99,
        天鹅之吻: 520
      }),
      currentLevel: 1,
      pageData: {},
      awards: [
        {
          id: 80,
          type: 'voice',
          icon: '',
          nums: 1,
          name: '火树银花头饰',
          text: '头饰+1天',
          weight: '35'
        }
      ],
      tipflag: 1,
      drawState: false,
      horseTimer: null,
      selectFlag: null
    }
  },
  async created() {
    this.pageData = sweetTreasure
    await this.init()
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
    // 设置签到弹窗滑到最右边
    if (
      this.pageData.sign_list[this.pageData.sign_list.length - 1].status != 1
    ) {
      this.$refs.Xlist.scrollLeft = this.$refs.Xlist.scrollWidth
    }
    // 查询第一个可领取的下标
    let index = this.pageData.spend_awards.findIndex(
      (item) => item.has_right == 1
    )
    // 查询第一个未领取的下标
    const index1 = this.pageData.spend_awards.findIndex(
      (item) => item.has_right == 0
    )
    if (index == -1) {
      if (index1 != -1) {
        index = index1
      } else {
        index = 6
      }
    }
    this.handlerScroll(index)
    for (const key in this.pageData.layer_list) {
      if (this.pageData.layer_list[key].is_locker === false) {
        this.currentLevel = key
      }
    }
  },
  computed: {
    currentList() {
      console.log(this.pageData.layer_list[this.currentLevel].award_list)
      return this.pageData.layer_list[this.currentLevel].award_list
    }
  },
  methods: {
    // 跳转APP充值界面
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.init()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    handlerScroll(i) {
      const w = this.$refs.icon_list.getBoundingClientRect().width
      const w2 = this.$refs.icon_item[i].getBoundingClientRect().width
      const l = this.$refs.icon_item[i].offsetLeft
      console.log(w, w2, l)
      if (l + w2 / 2 > w / 2) {
        this.$refs.icon_list.scrollLeft = l + w2 / 2 - w / 2
      }
    },
    // 抽奖跑马灯
    horselight(speed, data, number, res) {
      // 跑马灯速度，请求数据 ，抽奖次数，跑马灯固定转圈数
      console.log(data, '抽奖数据')
      clearInterval(this.horseTimer)
      let nums = 0
      this.horseTimer = setInterval(() => {
        // 抽取一次
        if (nums / 10 >= number && this.selectFlag == data) {
          // 转完两圈
          clearInterval(this.horseTimer)
          this.drawState = false
          if (res.data.next_layer_unlock) {
            this.$refs.congratsGetPrompt.showPopup = true
          } else {
            this.$refs.normalcongrat.showPopup = true
          }
          this.init()
        } else {
          // 没转完两圈
          nums++
          if (this.selectFlag == this.currentList.length) {
            this.selectFlag = 1
          } else {
            this.selectFlag++
          }
        }
      }, speed)
    },
    rechargeNow() {
      this.handleRecharge()
    },
    drawNow() {
      this.showOptional()
    },
    isclear() {
      return this.currentList.every((item) => item.number == 0)
    },
    // 打开自选弹框
    showOptional() {
      // if (this.pageData.layer_list[this.currentLevel].is_locker) {
      //   return this.$toast('当前层未解锁')
      // }
      this.$refs.optionalTreasure.openPrompt(this.currentLevel)
    },
    getwidth(value) {
      const alllen = this.pageData.spend_awards.length
      const arr = this.pageData.spend_awards.map((item) => (item = item.need))
      const filterarr = arr.filter((item) => item <= Number(value))
      if (Number(value) <= arr[0]) return '0%'
      if (Number(value) >= arr[arr.length - 1]) return '100%'
      // 每段长度
      const everylen = 100 / (alllen - 1)
      // 残段长度
      const lesslen =
        (everylen * (Number(value) - arr[filterarr.length - 1])) /
        (arr[filterarr.length] - arr[filterarr.length - 1])
      // 总长度
      return everylen * (filterarr.length - 1) + lesslen + '%'
    },
    // 获取页面基础数据
    async init() {
      const res = await home({
        type: 'tab',
        mark: 'm5'
      })
      if (res.errno == 0) {
        this.pageData = res.data
        if (this.pageData.is_sign_in) {
          console.log('签到弹窗')
          this.awards = [
            {
              id: 5,
              name: '寻珍币',
              text: '寻珍币+1',
              type: 'hero_gold',
              tool_id: 0,
              nums: 1,
              icon: 'xzb_120_120.png'
            }
          ]
          this.$refs.normalcongrat.showPopup = true
        }
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 切换楼层
    changeLevel(key, is_locker) {
      this.currentLevel = key
      this.selectFlag = null
    },
    // 寻珍
    async treasure() {
      // 当前楼层锁定
      if (this.pageData.layer_list[this.currentLevel].is_locker) return
      // 寻珍币不足
      if (
        this.pageData.ticket_nums <
        this.pageData.layer_list[this.currentLevel].need_ticket
      ) {
        this.tipflag = 1
        this.$refs.tip.showPopup = true
        return
      }
      // 奖池未选择
      if (!this.pageData.layer_list[this.currentLevel].has_optional) {
        this.tipflag = 2
        this.$refs.tip.showPopup = true
        return
      }
      // 手速太快
      if (this.drawState) {
        return this.$toast('手速太快了')
      }
      this.drawState = true
      const res = await moduleFive({
        type: 'find',
        mark: this.currentLevel
      })
      if (res.errno == 0) {
        const index1 = this.currentList.findIndex(
          (item) => item.awardId == res.data.award.awardId
        )
        this.horselight(80, index1 + 1, 1, res)
        // 恭喜获得
        const arr = []
        arr.push(res.data.award)
        this.awards = arr
      } else {
        this.drawState = false
        this.$toast(res.errmsg)
      }
    },
    // 领取累计消耗寻珍币奖励
    async receiveSendAward(mark, has_right) {
      const res = await moduleFive({
        type: 'rev_spend_award',
        mark
      })
      if (res.errno == 0) {
        console.log(res)
        const arr = []
        arr.push(res.data.award)
        this.awards = arr
        this.$refs.normalcongrat.showPopup = true
        this.init()
      } else {
        this.$toast(res.errmsg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sweetTreasure {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sign {
    width: 734px;
    height: 533px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title_image {
      width: 515px;
      height: 199px;
      background-image: url('../../assets/title_6.png');
      background-size: 100% 100%;
      position: absolute;
      top: -65px;
    }

    .left_dec,
    .right_dec {
      width: 99px;
      height: 444px;
      background-image: url('../../assets/top_1.png');
      background-size: 100% 100%;
      position: absolute;
      top: 20px;
      left: -8px;
      z-index: 99;
    }

    .right_dec {
      background-image: url('../../assets/top_2.png');
      top: 20px;
      left: auto;
      right: -8px;
    }

    .sign_list {
      width: 690px;
      height: 290px;
      margin-top: 124px;
      background: #edddff;
      padding-top: 18px;
      padding-left: 10px;
      display: flex;
      align-items: flex-start;
      overflow-x: scroll;

      .sign_item {
        margin-right: 7px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .award {
          width: 138px;
          height: 174px;
          background: linear-gradient(180deg, #ffd9fd, #ffffff);
          border: 4px solid #b18aff;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-sizing: content-box;

          img {
            width: 132px;
            height: 132px;
          }

          .nums {
            position: absolute;
            right: 6px;
            top: 96px;
            font-size: 28px;
            font-weight: 500;
            color: #e896ff;
          }

          .award_bottom {
            width: 100%;
            height: 42px;
            background: #865ee3;
            border-radius: 0px 0px 16px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0;
            margin-top: auto;
            flex-shrink: 0;
            font-size: 26px;

            color: #ffffff;
          }
        }

        .wqd {
          width: 120px;
          height: 60px;
          border: 2px solid #ffffff;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;

          color: #ffffff;
          margin-top: 12px;
          background: linear-gradient(0deg, #a3a3a3, #dddddd);
          opacity: 0.6;
        }

        .jjks {
          width: 120px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 26px;

          color: #6f46cc;
          margin-top: 12px;
        }

        .yqd {
          width: 120px;
          height: 60px;
          background: linear-gradient(0deg, #a3a3a3, #dddddd);
          border: 2px solid #ffffff;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;

          color: #ffffff;
          margin-top: 12px;
        }

        /**
         <div class="sign_btn wqd" v-if="item.status == 0">未签到</div>
          <div class="sign_btn jjks" v-if="item.status == 1">即将开始</div>
          <div class="sign_btn yqd" v-if="item.status == 2">已签到</div>
        */
      }
    }
  }

  .treasure {
    width: 742px;
    height: 1453px;
    background-image: url('../../assets/mk5_11.png');
    background-size: 100% 100%;
    margin-top: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* 已充值金额 */
    .recharge-num {
      position: absolute;
      left: 13px;
      top: 92px;
      min-width: 150px;
      width: fit-content;
      white-space: nowrap;
      height: 38px;
      background: #8274a8;
      border-radius: 0px 19px 19px 0px;
      font-size: 24px;
      color: #ffffff;
      padding: 0 19px 0 21px;
      line-height: 100%;
    }

    .lotus {
      width: 651px;
      height: 663px;
      position: absolute;
      top: 109px;
      left: -4px;
      background-image: url('../../assets/mk5_17.png');
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .my_coin {
        width: 393px;
        height: 48px;
        background: rgba($color: #3c2675, $alpha: 0.6);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -4px;
        font-size: 26px;
        line-height: 100%;

        color: #ffffff;

        .coin {
          margin: 0 -7px;
          //width: 55px;
          height: 130%;
        }

        .add {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -10px;
          width: 50px;
          height: 50px;
        }
      }

      .award_tips {
        width: 234px;
        height: 96px;
        background-image: url('../../assets/mk5_5.png');
        background-size: 100% 100%;
        position: absolute;
        z-index: 9;
        top: 41px;
        left: 26px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding-top: 12px;
        padding-bottom: 24px;

        span {
          font-size: 21px;

          font-weight: 500;
          color: #ffffff;
        }
      }

      .lock_floor {
        width: 115px;
        height: 55px;
        background-image: url('../../assets/mk5_16.png');
        background-size: 100% 100%;
        position: absolute;
        top: 297px;
        left: 261px;
        z-index: 9;
      }

      .treasure_award {
        border: 8px solid rgba(163, 102, 255, 0.6);
        border-radius: 50%;
        position: absolute;

        .new-icon {
          position: absolute;
          z-index: 2;
          top: -14px;
          right: -9px;
          width: 42px;
          height: 34px;
          background: linear-gradient(-90deg, #ff6e47, #ffbd55);
          border-radius: 17px 17px 17px 0px;
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
        }

        .price-label {
          z-index: 2;
          top: -14px;
          left: 6px;
        }

        .inner_award {
          position: relative;
          width: 110px;
          height: 110px;
          background: #ffffff;
          border: 4px solid rgba(163, 102, 255, 0.6);
          border-radius: 50%;
          box-sizing: content-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;

          img {
            height: 83px;
          }

          .lottie {
            width: 83px;
            height: 83px;

            ::v-deep .micAvatar_img {
              width: 70%;
              height: 70%;
            }
          }

          .inner_award_bottom {
            width: 100%;
            height: 27px;
            line-height: 27px;
            text-align: center;
            background: #fcdbff;
            margin-top: auto;
            margin-bottom: 0;
            font-size: 20px;

            font-weight: 500;
            color: #bf4dd0;
          }

          .noaward {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }

        .last_award {
          background: linear-gradient(180deg, #5a2ca6, #7047af);
          border: 4px solid #ffe77a;

          .add {
            width: 100%;
            height: 100%;
            transform: scale(0.6);
          }
        }

        .light_award {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 9;
          background-image: url('../../assets/mk5_8.png');
          background-size: 100% 100%;
        }
      }

      .treasure_award0 {
        top: 51px;
        left: 251px;
      }

      .treasure_award1 {
        top: 128px;
        right: 107px;
      }

      .treasure_award2 {
        top: 296px;
        right: 70px;
      }

      .treasure_award3 {
        top: 431px;
        right: 177px;
      }

      .treasure_award4 {
        top: 432px;
        left: 167px;
      }

      .treasure_award5 {
        top: 296px;
        left: 57px;
      }

      .treasure_award6 {
        top: 128px;
        left: 96px;
      }
    }

    .rule_tip {
      width: 145px;
      height: 44px;
      background: linear-gradient(-90deg, #6b42df, #dc73ff);
      border: 4px solid #705ba1;
      border-radius: 22px 0px 0px 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 91px;
      right: 8px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
      line-height: 100%;
    }

    .levels {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 181px;
      right: 3px;

      .level_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .level {
          width: 135px;
          height: 134px;
          background-image: url('../../assets/mk5_2.png');
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          font-size: 26px;
          font-weight: 500;
          color: #fff39f;
        }

        .currentLevel {
          background-image: url('../../assets/mk5_1.png');
        }

        .star {
          width: 24px;
          height: 23px;
          background-image: url('../../assets/mk5_4.png');
          background-size: 100% 100%;
          position: absolute;
          bottom: -15px;
        }

        .lock {
          width: 44px;
          height: 46px;
          background-image: url('../../assets/mk5_3.png');
          background-size: 100% 100%;
          position: absolute;
          bottom: 12px;
          right: 18px;
        }
      }
    }

    .treasure_btn {
      width: 324px;
      height: 136px;
      background-image: url('../../assets/mk5_6.png');
      background-size: 100% 100%;
      position: absolute;
      top: 784px;
      left: 155px;
      font-size: 24px;
      color: #a9792c;
      padding-top: 64px;

      span {
        display: flex;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 50px;
        height: 50px;
        margin: 0 -4px;
      }
    }

    .unlock_tit {
      width: 539px;
      height: 84px;
      background-image: url('../../assets/mk5_10.png');
      background-size: 100% 100%;
      position: absolute;
      top: 907px;
      left: 55px;
    }

    .clear_unlock {
      top: 843px;
    }

    .lock_btn {
      opacity: 0.5;
    }

    .total {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin-top: 1005px;
      width: 716px;
      height: 352px;
      background: rgba(95, 56, 165, 0.5);

      .spend-nums {
        position: absolute;
        left: 50%;
        top: -23px;
        transform: translateX(-50%);
        min-width: 382px;
        width: fit-content;
        height: 46px;
        background: #613baa;
        border-radius: 23px;
        font-size: 26px;
        color: #ffffff;
        white-space: nowrap;
        padding: 0 20px;
        flex-wrap: nowrap;

        > img {
          margin: 0 -5px;
          width: 55px;
          height: 55px;
        }
      }

      .tit {
        margin-top: 34px;
        white-space: nowrap;
        font-size: 24px;
        color: #ffee9d;
      }

      .accumulate_list {
        padding-top: 23px;
        width: 100%;
        height: 280px;
        //margin-bottom: 21px;
        //overflow: visible;
        overflow-x: scroll;
        overflow-y: hidden;
        //background: rgba($color: #5f38a5, $alpha: 0.5);

        .icon_list {
          width: fit-content;
          display: flex;
          align-items: center;
          padding: 0 42px;
          justify-content: space-between;

          position: relative;

          .icon_item {
            width: 128px;
            height: 143px;
            background-image: url('../../assets/mk5_14.png');
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-shrink: 0;
            margin-left: 40px;

            .price-label {
              top: 0px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 3;
            }

            > img {
              height: 67%;
              margin-top: -36px;
            }

            .lottie {
              height: 80%;
              margin-top: -36px;
            }

            .nums {
              position: absolute;
              left: 50%;
              bottom: 24px;
              transform: translateX(-50%);
              font-size: 18px;
              font-weight: 500;
              color: #ffffff;
            }

            .light {
              z-index: 2;
              position: absolute;
              width: 144px;
              height: 157px;
              background-image: url('../../assets/mk5_13.png');
              background-size: 100% 100%;
              flex-shrink: 0;
            }

            .red_point {
              z-index: 4;
              width: 16px;
              height: 16px;
              background: #e22a2a;
              border-radius: 50%;
              position: absolute;
              top: 15px;
              right: 0px;
            }

            .has_get {
              width: 120px;
              height: 121px;
              background-image: url('../../assets/mk5_12.png');
              background-size: 100% 100%;
              position: absolute;
              z-index: 2;
              top: 3px;
            }
          }

          .icon_item:first-child {
            margin-left: 0;
          }
        }

        .schedule_line {
          width: fit-content;
          height: 6px;
          background: #3e266e;
          border: 4px solid #ac7bf5;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          margin-left: 100px;
          margin-right: 99px;
          margin-top: 23px;
          box-sizing: content-box;

          .has_arrive {
            position: absolute;
            width: 0%;
            height: 14px;
            background: #ffe38c;
          }

          .dot_list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;

            .dot {
              flex-shrink: 0;
              margin-left: 128px;
              width: 40px;
              height: 40px;
              background: #4c3082;
              border: 4px solid #8754d3;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;

              .tit {
                position: absolute;
                bottom: -54px;
                white-space: nowrap;
                color: #fff;

                img {
                  width: 50px;
                  height: 50px;
                }
              }

              .small_star {
                width: 50px;
                height: 59px;
                background-image: url('../../assets/mk5_15.png');
                background-size: 100% 100%;
                flex-shrink: 0;
                margin-top: -6px;
              }
            }

            .dot:first-child {
              margin-left: -17px;
            }

            .dot:last-child {
              margin-left: 104px;
              transform: translateX(24px);
            }

            .white_dot {
              width: 40px;
              height: 40px;
              background: #ffe38c;
              border-radius: 50%;
              border: none;
            }
          }
        }
      }
    }
  }

  .lottieContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .lottie {
      width: 100%;
      height: 100%;

      ::v-deep .micAvatar_img {
        width: 70%;
        height: 70%;
      }
    }
  }

  .price-label {
    position: absolute;
    //z-index: 2;
    width: 125px;
    height: 34px;
    background: linear-gradient(-90deg, #75b9ff, #ff84f8);
    border-radius: 17px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    flex-wrap: nowrap;

    > img {
      width: 27px;
      height: 20px;
    }
  }
}
</style>
