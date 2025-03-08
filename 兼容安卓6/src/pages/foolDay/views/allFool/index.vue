<template>
  <div class="allFool">
    <div class="allFool_top">
      <!-- 白色边框 -->
      <div class="white_boder">
        <div class="skill_title"></div>
        <div class="vindicate_title">
          <p>活动期间收到<span>表白可以获得</span>愚情点数</p>
          <p>获得的愚情点数<span>等同于</span>对方表白消耗的钻石数量</p>
          <div class="vindicate_title_button" @click="toVindicate">
            我要表白
          </div>
        </div>
        <div class="fool_reward">
          <p class="progress_title">
            <span
              >愚情点数：(<i>{{
                allFoolData.love_points >= 1314 ? 1314 : allFoolData.love_points
              }}</i
              >/1314)</span
            >
            <span
              >(<i>{{
                allFoolData.love_points >= 5200 ? 5200 : allFoolData.love_points
              }}</i
              >/5200)</span
            >
          </p>
          <!-- 进度条外部 -->
          <div class="progress_bar_out" ref="bar_out">
            <!-- 1314 -->
            <span
              class="num_1314"
              :class="{ num_active: allFoolData.love_points >= 1314 }"
            ></span>
            <!-- 5200 -->
            <span
              class="num_5200"
              :class="{ num_active: allFoolData.love_points >= 5200 }"
            ></span>
            <!-- 进度条内部 -->
            <div
              class="progress_bar_in"
              :style="{ width: progressBarWidth(allFoolData.love_points) }"
            ></div>
          </div>
          <div class="bottom_gifts_box">
            <div
              class="gifts_item"
              v-for="(item, key) in love_awards"
              :key="item.id"
            >
              <div class="img_box" v-if="item.icon">
                <img :src="require('../../assets/' + item.icon)" alt="" />
              </div>
              <div class="text_box">{{ item.text }}</div>
              <div
                class="button_box_unDid"
                :class="{
                  button_box_did: item.has_right == 1,
                  button_box_done: item.has_right == 2
                }"
                @click="handleTopAward(item.has_right, key)"
              >
                {{
                  item.has_right == 0
                    ? '未完成'
                    : item.has_right == 1
                    ? '领取'
                    : item.has_right == 2
                    ? '已领取'
                    : ''
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="allFool_bottom">
      <!-- 白色边框 -->
      <div class="white_boder">
        <!-- 愚乐万岁 -->
        <div class="img-box" style="text-align: center">
          <img src="../../assets/title_5.png" alt="" />
        </div>
        <ul>
          <li>
            <i></i>收到小盲盒中的星星糖
            <img src="../../assets/mk5_5.png" alt="" />
            礼物数量达到门槛即可获得奖励
          </li>
        </ul>
        <div class="my_goods">
          我收到的<img src="../../assets/mk5_5.png" alt="" />：{{
            allFoolData.present_nums
          }}
        </div>
        <!-- 奖励条 -->
        <div class="award_list">
          <div class="one_floor">
            <div
              class="award_item"
              v-for="(item, key) in present_awards_1_40"
              :key="key"
              :class="{
                award_item_active: item?.has_right == 1,
                award_item_done: item?.has_right == 2
              }"
            >
              <div class="award_box">
                <div
                  class="award_box_item"
                  v-for="item1 in item?.awards"
                  :key="item1.id"
                >
                  <div
                    class="img_box"
                    @click="getBottomAward(item.has_right, key)"
                  >
                    <img :src="require('../../assets/' + item1.icon)" alt="" />
                  </div>
                  <div class="text_box">+{{ item1.text }}</div>
                  <div class="award_did">
                    <img
                      v-if="item.has_right == 1"
                      src="../../assets/mk5_9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="award_item_flag">
                <img
                  src="../../assets/mk5_6.png"
                  alt=""
                  v-if="item?.has_right == 0"
                />
                <img
                  src="../../assets/mk5_7.png"
                  alt=""
                  v-if="item?.has_right == 1"
                />
                <img
                  src="../../assets/mk5_8.png"
                  alt=""
                  v-if="item?.has_right == 2"
                />
              </div>
              <div class="award_item_num">{{ key }}</div>
              <div
                v-if="key != 1"
                class="line_done"
                :class="{
                  line_straight_done: allFoolData.present_nums >= Number(key)
                }"
              ></div>
            </div>
          </div>
          <div class="two_floor">
            <div
              class="award_item"
              v-for="(item, key) in present_awards_60_100"
              :key="key"
              :class="{
                award_item_active: item?.has_right == 1,
                award_item_done: item?.has_right == 2
              }"
            >
              <div class="award_box">
                <div
                  class="award_box_item"
                  v-for="item1 in item?.awards"
                  :key="item1.id"
                >
                  <div
                    class="img_box"
                    :class="{ lottie_box: item1.type === 'mic' }"
                    @click="getBottomAward(item.has_right, key)"
                  >
                    <div
                      class="allFoolLottie"
                      v-if="item1.type === 'mic'"
                    ></div>
                    <img
                      v-else
                      :src="require('../../assets/' + item1.icon)"
                      alt=""
                    />
                  </div>
                  <div class="text_box">
                    +{{ item1.type == 'mic' ? item1.nums + '天' : item1.nums }}
                  </div>
                  <div class="award_did">
                    <img
                      v-if="item.has_right == 1"
                      src="../../assets/mk5_9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="award_item_flag">
                <img
                  src="../../assets/mk5_6.png"
                  alt=""
                  v-if="item?.has_right == 0"
                />
                <img
                  src="../../assets/mk5_7.png"
                  alt=""
                  v-if="item?.has_right == 1"
                />
                <img
                  src="../../assets/mk5_8.png"
                  alt=""
                  v-if="item?.has_right == 2"
                />
              </div>
              <div class="award_item_num">{{ key == 50 ? 100 : key }}</div>
              <div
                class="line_done"
                :class="{
                  line_done_straight: key != 60,
                  line_done_curve_two: key == 60,
                  line_straight_done:
                    allFoolData.present_nums >= 100 && key != 60,
                  line_curve_two_done:
                    allFoolData.present_nums >= 60 && key == 60
                }"
              ></div>
            </div>
          </div>
          <div class="three_floor">
            <div
              class="award_item"
              v-for="(item, key) in present_awards_150_200"
              :key="key"
              :class="{
                award_item_active: item?.has_right == 1,
                award_item_done: item?.has_right == 2
              }"
            >
              <div class="award_box">
                <div
                  class="award_box_item"
                  v-for="item1 in item?.awards"
                  :key="item1.id"
                >
                  <div
                    class="img_box"
                    :class="{ lottie_box: item1.type === 'mic' }"
                    @click="getBottomAward(item.has_right, key)"
                  >
                    <div
                      class="allFoolLottie"
                      v-if="item1.type === 'mic'"
                    ></div>
                    <img
                      v-else
                      :src="require('../../assets/' + item1.icon)"
                      alt=""
                    />
                  </div>
                  <div class="text_box">
                    +{{ item1.type == 'mic' ? item1.nums + '天' : item1.nums }}
                  </div>
                  <div class="award_did">
                    <img
                      v-if="item.has_right == 1"
                      src="../../assets/mk5_9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="award_item_flag">
                <img
                  src="../../assets/mk5_6.png"
                  alt=""
                  v-if="item?.has_right == 0"
                />
                <img
                  src="../../assets/mk5_7.png"
                  alt=""
                  v-if="item?.has_right == 1"
                />
                <img
                  src="../../assets/mk5_8.png"
                  alt=""
                  v-if="item?.has_right == 2"
                />
              </div>
              <div class="award_item_num">{{ key }}</div>
              <div
                class="line_done"
                :class="{
                  line_done_straight: key != 150,
                  line_done_curve_three: key == 150,
                  line_straight_done:
                    allFoolData.present_nums >= 200 && key != 150,
                  line_curve_three_done:
                    allFoolData.present_nums >= 150 && key == 150
                }"
              ></div>
            </div>
          </div>
          <div class="four_floor">
            <div
              class="award_item"
              v-for="(item, key) in present_awards_300_400"
              :key="key"
              :class="{
                award_item_active: item?.has_right == 1,
                award_item_done: item?.has_right == 2
              }"
            >
              <div class="award_box">
                <div
                  class="award_box_item"
                  v-for="item1 in item?.awards"
                  :key="item1.id"
                >
                  <div
                    class="img_box"
                    :class="{ lottie_box: item1.type === 'mic' }"
                    @click="getBottomAward(item.has_right, key)"
                  >
                    <img :src="require('../../assets/' + item1.icon)" alt="" />
                  </div>
                  <div class="text_box">+{{ item1.text }}</div>
                  <div class="award_did">
                    <img
                      v-if="item.has_right == 1"
                      src="../../assets/mk5_9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="award_item_flag">
                <img
                  src="../../assets/mk5_6.png"
                  alt=""
                  v-if="item?.has_right == 0"
                />
                <img
                  src="../../assets/mk5_7.png"
                  alt=""
                  v-if="item?.has_right == 1"
                />
                <img
                  src="../../assets/mk5_8.png"
                  alt=""
                  v-if="item?.has_right == 2"
                />
              </div>
              <div class="award_item_num">{{ key == 250 ? 400 : key }}</div>
              <div
                class="line_done"
                :class="{
                  line_done_straight: key != 300,
                  line_done_curve_four: key == 300,
                  line_straight_done:
                    allFoolData.present_nums >= 400 && key != 300,
                  line_curve_four_done:
                    allFoolData.present_nums >= 300 && key == 300
                }"
              ></div>
            </div>
          </div>
          <div class="five_floor">
            <div
              class="award_item"
              v-for="(item, key) in present_awards_500"
              :key="key"
              :class="{
                award_item_active: item?.has_right == 1,
                award_item_done: item?.has_right == 2
              }"
            >
              <div class="award_box">
                <div
                  class="award_box_item"
                  v-for="item1 in item?.awards"
                  :key="item1.id"
                >
                  <div
                    class="img_box"
                    :class="{ lottie_box: item1.type === 'mic' }"
                    @click="getBottomAward(item.has_right, key)"
                  >
                    <img :src="require('../../assets/' + item1.icon)" alt="" />
                  </div>
                  <div class="text_box">+{{ item1.text }}</div>
                  <div class="award_did">
                    <img
                      v-if="item.has_right == 1"
                      src="../../assets/mk5_9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="award_item_flag">
                <img
                  src="../../assets/mk5_6.png"
                  alt=""
                  v-if="item?.has_right == 0"
                />
                <img
                  src="../../assets/mk5_7.png"
                  alt=""
                  v-if="item?.has_right == 1"
                />
                <img
                  src="../../assets/mk5_8.png"
                  alt=""
                  v-if="item?.has_right == 2"
                />
              </div>
              <div class="award_item_num">{{ key }}</div>
              <div
                class="line_done line_done_curve_five"
                :class="{
                  line_curve_five_done: allFoolData.present_nums >= 500
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog
      v-model="showDialog"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      @closed="closeDialog"
    >
      <!-- 标题 -->
      <template #title v-if="true">
        <!-- 领取成功 -->
        <img
          v-if="dialogType == 'topAward'"
          src="../../assets/tk_6.png"
          alt=""
        />
        <!-- 恭喜获得 -->
        <img
          v-if="dialogType == 'bottomAward'"
          src="../../assets/tk_1.png"
          alt=""
        />
      </template>
      <div class="white_border">
        <!-- 顶部弹框 -->
        <div class="top_tk_box" v-if="dialogType == 'topAward'">
          <div class="img-box_top">
            <img
              :src="require('../../assets/' + awardDetail.award.icon)"
              alt=""
            />
          </div>
          <p>{{ awardDetail.award.text }}</p>
        </div>
        <!-- 底部弹框 -->
        <div class="bottom_tk_box" v-if="dialogType == 'bottomAward'">
          <div class="tk_item" v-for="item in awardDetail.award" :key="item.id">
            <div class="img_box_bottom">
              <img
                v-if="item.icon != '.png'"
                :src="require('../../assets/' + item.icon)"
                alt=""
              />
              <div v-else class="allFoolLottie"></div>
            </div>
            <p>+{{ item.type == 'mic' ? item.nums + '天' : item.nums }}</p>
          </div>
        </div>
        <!-- 如果是顶部弹框,如果是主页特效，就显示立即装扮，如果不是，就是知道了 -->
        <!-- 如果是底部弹框,如果是头饰，就显示立即装扮，如果不是，就是知道了 -->
        <div class="bottom_botton" @click="tk_botton">
          {{
            awardDetail.award?.type == 'costume' ||
            awardDetail.award?.[0]?.type == 'mic'
              ? '立即装扮'
              : '我知道了'
          }}
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 导入接口
import { getAllFoolData, nowEquip } from '../../api/allFool'
// json动画导入
import { svgFun } from '../../utils/json'
import dhmh from '../../assets/lottie/dhmh/data.json'
// 导入弹框
import { Dialog } from 'vant'
// 跳转婚姻页面导入
import { marriageF } from '../../utils/toApp'
export default {
  name: 'allFool',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
      showDialog: false,
      dialogType: '',
      awardDetail: {},
      // 默认数据
      allFoolData: {
        love_points: 0, // 我的愚情点数
        present_nums: 0, // 我收到的星星糖礼物数量
        love_awards: {
          // 表白奖励
          1314: {
            has_right: 0,
            icon: 'mk5_2.png',
            id: 10,
            name: '甜蜜暴击',
            nums: 7,
            text: '主页特效+7天',
            type: 'costume'
          },
          5200: {
            has_right: 0,
            icon: 'mk5_3.png',
            id: 75,
            name: '加特林泡泡枪',
            nums: 15,
            text: '礼物赠送权+15天',
            type: 'pst_privilege'
          }
        },
        present_awards: {
          // 收到的礼物达成目标奖励列表
          1: {
            has_right: 0, // 领取状态：0-不能领取，1-可以领取，2-已领取
            awards: [
              {
                icon: 'tk_dj_1.png',
                id: 2,
                nums: 3,
                text: '3',
                type: 'tool'
              }
            ]
          },
          10: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_7.png',
                id: 1,
                nums: 2,
                text: '2',
                type: 'tool'
              }
            ]
          },
          20: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_8.png',
                id: 9,
                nums: 3,
                text: '3',
                type: 'tool'
              }
            ]
          },
          40: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_4.png',
                id: 'gamegold',
                nums: 50000,
                text: '5w',
                type: 'property'
              }
            ]
          },
          60: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_2.png',
                id: 0,
                nums: 1,
                text: '1',
                type: 'luck_key'
              },
              {
                icon: 'tk_dj_1.png',
                id: 2,
                nums: 10,
                text: '10',
                type: 'tool'
              }
            ]
          },
          100: {
            has_right: 0,
            awards: [
              {
                icon: '.png',
                id: 86,
                nums: 3,
                text: '+3',
                type: 'mic'
              }
            ]
          },
          150: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_6.png',
                id: 0,
                nums: 1,
                text: '1',
                type: 'pretty_card'
              },
              {
                icon: 'tk_dj_7.png',
                id: 1,
                nums: 5,
                text: '5',
                type: 'tool'
              }
            ]
          },
          200: {
            has_right: 0,
            awards: [
              {
                icon: '.png',
                id: 86,
                nums: 7,
                text: '+7',
                type: 'mic'
              }
            ]
          },
          300: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_6.png',
                id: 0,
                nums: 3,
                text: '3',
                type: 'pretty_card'
              },
              {
                icon: 'tk_dj_1.png',
                id: 2,
                nums: 50,
                text: '50',
                type: 'tool'
              }
            ]
          },
          400: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_6.png',
                id: 0,
                nums: 5,
                text: '5',
                type: 'pretty_card'
              },
              {
                icon: 'tk_dj_7.png',
                id: 1,
                nums: 20,
                text: '20',
                type: 'tool'
              }
            ]
          },
          500: {
            has_right: 0,
            awards: [
              {
                icon: 'tk_dj_6.png',
                id: 0,
                nums: 7,
                text: '7',
                type: 'pretty_card'
              },
              {
                icon: 'tk_dj_4.png',
                id: 'gamegold',
                nums: 100000,
                text: '10w',
                type: 'property'
              }
            ]
          }
        }
      },
      dhmh_3: {},
      dhmh_7: {},
      tk_lottie: {},
      barWidth: null
    }
  },
  computed: {
    // 进度条长度计算
    progressBarWidth() {
      return (num) => {
        const htmlSize = document.documentElement.style.fontSize.replace(
          'px',
          ''
        )
        this.$nextTick(() => {
          this.barWidth = parseInt(this.$refs.bar_out.offsetWidth)
        })
        const bar1314Width = parseInt(this.barWidth * 0.35)
        const bar5200Width = parseInt(this.barWidth * 0.46)
        if (num <= 1314) {
          if (num == 1314) {
            return '35%'
          } else if (num == 0) {
            return '0%'
          } else {
            return (
              (
                parseInt((num / 1314).toFixed(2) * bar1314Width) / htmlSize
              ).toFixed(3) + 'rem'
            )
          }
        } else if (num > 1314) {
          if (num >= 5200) {
            return '100%'
          } else {
            return (
              (
                (parseInt(((num - 1314) / 3886).toFixed(2) * bar5200Width) +
                  bar1314Width) /
                htmlSize
              ).toFixed(3) + 'rem'
            )
          }
        }
      }
    },
    // 愚情点数奖励
    love_awards() {
      return this.allFoolData.love_awards
    },
    // 第一行奖励1-40
    present_awards_1_40() {
      return {
        1: this.allFoolData.present_awards?.[1],
        10: this.allFoolData.present_awards?.[10],
        20: this.allFoolData.present_awards?.[20],
        40: this.allFoolData.present_awards?.[40]
      }
    },
    // 第二行奖励60-100
    present_awards_60_100() {
      return {
        50: this.allFoolData.present_awards?.[100],
        60: this.allFoolData.present_awards?.[60]
      }
    },
    // 第三行奖励150-200
    present_awards_150_200() {
      return {
        150: this.allFoolData.present_awards?.[150],
        200: this.allFoolData.present_awards?.[200]
      }
    },
    // 第四行奖励300-400
    present_awards_300_400() {
      return {
        300: this.allFoolData.present_awards?.[300],
        250: this.allFoolData.present_awards?.[400]
      }
    },
    // 第五行奖励300-400
    present_awards_500() {
      return {
        500: this.allFoolData.present_awards?.[500]
      }
    }
  },
  watch: {},
  mounted() {},
  async created() {
    // console.log(document.documentElement.style.fontSize)
    await this.getAllFoolData()
    this.$nextTick(() => {
      this.dhmh_3 = svgFun(0, dhmh, 'dhmh', '.allFoolLottie')
      this.dhmh_7 = svgFun(1, dhmh, 'dhmh', '.allFoolLottie')
    })
  },
  methods: {
    // 封装领取愚乐万岁奖励接口
    async bottomAward(mark) {
      const res = await getAllFoolData({
        type: 'fool_present_award',
        mark
      })
      return res
    },
    // 领取愚乐万岁奖励
    async getBottomAward(flag, key) {
      // 请求
      if (flag === 1) {
        let mark = ''
        if (key === '50') {
          mark = 100
        } else if (key === '250') {
          mark = 400
        } else {
          mark = key
        }
        const { data } = await this.bottomAward(mark)
        this.awardDetail = data
        this.dialogType = 'bottomAward'
        await this.getAllFoolData()
        this.showDialog = true
        if (mark === 100 || mark === '200') {
          this.$nextTick(() => {
            this.tk_lottie = svgFun(2, dhmh, 'dhmh', '.allFoolLottie')
          })
        }
      }
    },
    // 去婚姻界面---跳转app
    toVindicate() {
      marriageF(this.$store.getters.uid)
    },
    // 关闭弹框
    closeDialog() {
      if (this.tk_lottie.animationID) {
        this.tk_lottie.destroy()
      }
      this.dialogType = ''
      this.awardDetail = {}
    },
    // 顶部点数奖励领取按钮
    async handleTopAward(flag, mark) {
      if (flag === 1) {
        const { data } = await this.getTopAward(mark)
        this.awardDetail = data
        await this.getAllFoolData()
        this.dialogType = 'topAward'
        this.showDialog = true
      }
    },
    // 愚情点数奖励领取接口
    async getTopAward(mark) {
      const res = await getAllFoolData({
        type: 'fool_confess_award',
        mark
      })
      return res
    },
    // 立即装扮接口
    async equip_goods(type, id) {
      const res = await nowEquip({
        type,
        id
      })
      return res
    },
    // 弹框按钮点击
    async tk_botton() {
      // 如果是知道了，就直接关闭dialog，并且清空dialogType和awardDetail
      // 如果是立即装扮，就发请求并且toast提示领取成功，已完成装扮，关闭dialog
      if (
        this.dialogType === 'topAward' &&
        this.awardDetail.award.type === 'costume'
      ) {
        // 发送立即装扮接口
        const res = await this.equip_goods(
          this.awardDetail.award.type,
          this.awardDetail.award.id
        )
        this.$toast(res.errmsg)
      } else if (
        this.dialogType === 'bottomAward' &&
        this.awardDetail.award[0].type === 'mic'
      ) {
        // 发送立即装扮接口
        const res = await this.equip_goods(
          this.awardDetail.award[0].type,
          this.awardDetail.award[0].id
        )
        this.$toast(res.errmsg)
      }
      this.showDialog = false
      await this.getAllFoolData()
    },
    // 页面数据接口
    async getAllFoolData() {
      const res = await getAllFoolData({
        type: 'tab',
        mark: 'm5'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.allFoolData = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.allFool {
  // 弹框样式
  ::v-deep .van-dialog {
    width: 300px;
    background-color: transparent !important;
    overflow: visible;
    // 标题
    .van-dialog__header {
      padding-top: 0;
      position: relative;
      height: 45px;
      top: -34px;
      left: 6px;
      position: absolute;
      > img {
        width: 290px;
      }
    }
    .van-dialog__content {
      margin: 0 auto;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border: 4px solid #ffbaf4;
      border-radius: 20px;
      box-sizing: border-box;
      .white_border {
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-top: 40px;
        box-sizing: border-box;
      }
      .top_tk_box {
        .img-box_top {
          width: 90px;
          height: 90px;
          margin: 5px auto;
          background: #fefaef;
          border: 3px solid #ffbffb;
          border-radius: 6px;
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
          }
        }
        p {
          margin: 15px 0 5px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
        }
      }
      .bottom_tk_box {
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 40px;
        .tk_item {
          .img_box_bottom {
            margin: 0 auto;
            width: 60px;
            height: 60px;
            background: #fefaef;
            border: 3px solid #ffbffb;
            border-radius: 12px;
            img {
              width: 100%;
            }
            .lottie {
              width: 100%;
            }
          }
          p {
            margin: 10px 0 5px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
      .bottom_botton {
        margin: 10px auto 30px;
        width: 180px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        border-radius: 18px;
        color: #a9792c;
        text-align: center;
        line-height: 36px;
      }
    }
  }
  .allFool_top,
  .allFool_bottom {
    width: 100%;
    // 边框颜色
    border: 5px solid #937bef;
    // 背景色
    background: linear-gradient(180deg, #fff5fa, #f8eeff);
    box-sizing: border-box;
    margin-bottom: 38px;
    .white_boder {
      border: 1px solid #fff;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 18px 15px 30px;
    }
  }
  .allFool_top {
    .skill_title {
      width: 100%;
      height: 60px;
      background: url('../../assets/mk5_4.png') no-repeat;
      background-size: 100%;
    }
    .vindicate_title {
      > p {
        text-align: center;
        line-height: 25px;
        color: #7959c3;
        > span {
          color: #f67baf;
        }
      }
      > .vindicate_title_button {
        margin: 10px auto 20px;
        width: 130px;
        height: 38px;
        background: linear-gradient(0deg, #7d8ff8, #b5eeff);
        border: 1px solid #ffffff;
        border-radius: 19px;
        font-size: 16px;
        text-align: center;
        line-height: 36px;
        box-sizing: border-box;
        color: #fff;
      }
    }
    .fool_reward {
      width: 100%;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border-radius: 10px;
      padding: 11px 10px;
      box-sizing: border-box;
      .progress_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        margin-bottom: 8px;
        i {
          font-style: normal;
          color: #fffaa6;
        }
        span:nth-child(2) {
          margin-right: 20px;
        }
      }
      // 进度条外部
      .progress_bar_out {
        width: 100%;
        height: 7px;
        background-color: #735ed8;
        border-radius: 3px;
        position: relative;
        // 进度条内部
        .progress_bar_in {
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
          width: 100%;
          height: 7px;
          background: linear-gradient(90deg, #9feaff, #ffe795);
          border-radius: 3px;
        }
        .num_1314,
        .num_5200 {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #735ed8;
          border-radius: 50%;
        }
        .num_1314 {
          left: 100px;
          top: -4px;
        }
        .num_5200 {
          right: 40px;
          top: -4px;
        }
        .num_active {
          z-index: 5;
          width: 18px !important;
          height: 30px !important;
          background: url('../../assets/mk5_1.png') no-repeat !important;
          background-size: 100% !important;
          border-radius: 0 !important;
        }
      }
      .bottom_gifts_box {
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .gifts_item {
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          .img_box {
            width: 87px;
            height: 87px;
            background: #ffffff;
            border: 2px solid #d5c2ff;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 5px;
            > img {
              width: 100%;
            }
          }
          .text_box {
            text-align: center;
            color: #fffaa6;
          }
          .button_box_unDid {
            width: 99px;
            height: 32px;
            background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 1px solid #ffffff;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-weight: 500;
            color: #4d7ddd;
          }
          .button_box_did {
            color: #a9792c !important;
            background: linear-gradient(0deg, #fff9d1, #ffffff) !important;
          }
          .button_box_done {
            color: #fff !important;
            background: linear-gradient(0deg, #949494, #dbdbdb) !important;
          }
        }
      }
    }
  }
  .allFool_bottom {
    .white_boder {
      position: relative;
      padding-top: 25px;
      background: linear-gradient(180deg, #cbd8ff, 15%, #fbf1fd) !important;
      // 兑换好礼图片标题
      > .img-box {
        position: absolute;
        width: 100%;
        top: -42px;
        left: -1px;
        img {
          width: 300px;
        }
      }
      > ul {
        > li {
          box-sizing: border-box;
          padding-left: 15px;
          position: relative;
          > i {
            position: absolute;
            top: 16px;
            left: 0;
            width: 6px;
            height: 6px;
            background: #fb8fcc;
            border-radius: 50%;
          }
          color: #7959c3;
          line-height: 25px;
          > img {
            position: relative;
            top: 10px;
            width: 25px;
          }
        }
      }
      > .my_goods {
        width: 179px;
        height: 24px;
        background: #ffffff;
        border-radius: 12px;
        margin: 10px auto 0;
        color: #7959c3;
        text-align: center;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 25px;
        }
      }
      .award_list {
        width: 100%;
        height: 600px;
        background-position-y: 100px;
        position: relative;
        left: -7px;
        // 默认，未完成状态
        .award_item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 106px;
          margin-right: 15px;
          position: relative;
          .award_box {
            display: flex;
            align-items: center;
            .award_box_item {
              position: relative;
              margin-right: 8px;
              > .img_box {
                position: relative;
                z-index: 100;
                width: 50px;
                height: 50px;
                background: #ffffff;
                border: 2px solid #947cef;
                border-radius: 10px;
                padding: 1px;
                > img {
                  width: 48px;
                  border: 1px solid #fff;
                  border-radius: 8px;
                }
                .lottie {
                  width: 58px;
                  height: 58px;
                  border: 1px solid #fff;
                  border-radius: 8px;
                }
              }
              > .lottie_box {
                width: 60px;
                height: 60px;
                border: 2px solid #f9cb5d;
                .lottie {
                  border: 1px solid #fff;
                }
              }
              > .text_box {
                font-size: 13px;
                color: #5d4bb5;
                margin-top: 5px;
                text-align: center;
              }
              .award_did {
                width: 28px;
                height: 27px;
                position: absolute;
                z-index: 101;
                top: -10px;
                right: -12px;
                > img {
                  width: 100%;
                }
              }
            }
          }
          .award_item_flag {
            width: 22px;
            height: 22px;
            position: relative;
            z-index: 10;
            > img {
              width: 100%;
            }
          }
          .award_item_num {
            width: 40px;
            height: 16px;
            background: #735ed8;
            border-radius: 8px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
            font-weight: 500;
            line-height: 15px;
          }
          .line_done {
            width: 78px;
            height: 9px;
            position: absolute;
            z-index: 5;
            top: 0px;
            left: 0px;
            background: url('../../assets/mk5_12.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        // 领取状态
        .award_item_active {
          .award_box_item {
            .img_box {
              border: 2px solid #ffb9ea !important;
              box-shadow: 0 0 10px #ff388b !important;
              img {
                box-shadow: 0 0 2px #ff388b !important;
                border: 1px solid #ffb9ea !important;
              }
            }
            .lottie_box {
              border: 2px solid #ffb9ea !important;
              box-shadow: 0 0 10px #ff388b !important;
              .lottie {
                box-shadow: 0 0 2px #ff388b !important;
                border: 1px solid #ffb9ea !important;
              }
            }
            .text_box {
              color: #e355ac !important;
            }
          }
          .award_item_num {
            background-color: #ff7bb3 !important;
          }
        }
        // 已领取
        .award_item_done {
          .award_box_item {
            opacity: 0.5;
          }
          .award_item_num {
            opacity: 0.5;
          }
        }
        // 进度条置灰
        .line_straight_done {
          background: url('../../assets/mk5_12_1.png') no-repeat !important;
          background-size: 100% 100% !important;
        }
        .line_curve_two_done {
          background: url('../../assets/mk5_13_1.png') no-repeat !important;
          background-size: 100% 100% !important;
        }
        .line_curve_three_done {
          background: url('../../assets/mk5_14_1.png') no-repeat !important;
          background-size: 100% 100% !important;
        }
        .line_curve_four_done {
          background: url('../../assets/mk5_15_1.png') no-repeat !important;
          background-size: 100% 100% !important;
        }
        .line_curve_five_done {
          background: url('../../assets/mk5_16_1.png') no-repeat !important;
          background-size: 100% 100% !important;
        }
        .one_floor,
        .two_floor,
        .three_floor,
        .four_floor,
        .five_floor {
          display: flex;
        }
        .one_floor {
          .award_box,
          .award_item_flag,
          .award_item_num {
            position: relative;
            top: -1px;
          }
          margin-top: 22px;
          margin-left: 12px;
          position: relative;
          .award_item {
            margin-right: 8px;
          }
          .award_item:nth-child(4),
          .award_item:nth-child(2),
          .award_item:nth-child(3) {
            .line_done {
              width: 73px;
              left: -41px;
              top: 77px;
            }
          }
        }
        .two_floor {
          margin-top: 25px;
          margin-left: 61px;
          .award_item:nth-child(2) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              left: 2px;
            }
            .line_done {
              width: 117px;
              height: 140px;
              left: 62px;
              top: -53px;
              background: url('../../assets/mk5_13.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .award_item:nth-child(1) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              top: -5px;
              left: 2px;
            }
            .line_done {
              width: 114px;
              top: 78px;
              left: 40px;
            }
          }
        }
        .three_floor {
          margin-top: 25px;
          margin-left: 44px;
          .award_item:nth-child(1) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              top: 1px;
              left: -5px;
            }
            .line_done {
              width: 99px;
              height: 141px;
              top: -53px;
              left: -38px;
              background: url('../../assets/mk5_14.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .award_item:nth-child(2) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              top: -4px;
              left: -1px;
            }
            .line_done {
              width: 118px;
              top: 79px;
              left: -83px;
            }
          }
        }
        .four_floor {
          margin-top: 25px;
          margin-left: 20px;
          .award_item {
            margin-right: 5px;
          }
          .award_item:nth-child(2) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              top: 1px;
              left: 1px;
            }
            .line_done {
              width: 110px;
              height: 140px;
              top: -52px;
              left: 63px;
              background: url('../../assets/mk5_15.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .award_item:nth-child(1) {
            .award_box,
            .award_item_flag,
            .award_item_num {
              position: relative;
              top: 1px;
              left: -3px;
            }
            .line_done {
              width: 137px;
              top: 79px;
              left: 60px;
            }
          }
        }
        .five_floor {
          .award_box,
          .award_item_flag,
          .award_item_num {
            position: relative;
            top: 3px;
            left: -20px;
          }
          .line_done {
            width: 130px;
            height: 130px;
            top: -39px;
            left: -86px;
            background: url('../../assets/mk5_16.png') no-repeat;
            background-size: 100% 100%;
          }
          margin-top: 13px;
          margin-left: 93px;
        }
      }
    }
  }
}
</style>
