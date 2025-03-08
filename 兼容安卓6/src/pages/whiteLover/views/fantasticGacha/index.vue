<template>
  <div class="fantasticGacha-page">
    <div class="fantasticGacha-top-box">
      <!-- 白色边框 -->
      <div class="border-box">
        <!-- 已充值 -->
        <div class="recharge-box">
          <div class="left">已充值: {{ fantasticGachaData.recharge }}</div>
          <div class="right">
            剩余<img src="../../assets/mk5_1.png" alt="" /> ：{{
              fantasticGachaData.ticket
            }}<img
              src="../../assets/mk5_2.png"
              alt=""
              @click="getTicket('getTicket')"
            />
          </div>
        </div>
        <!-- 扭蛋机 -->
        <div class="gacha-machine">
          <!-- 轮播 -->
          <van-swipe
            vertical
            :autoplay="2000"
            :touchable="false"
            loop
            :show-indicator="false"
            :height="30"
          >
            <van-swipe-item
              v-for="(item, index) in fantasticGachaData.carousel"
              :key="index"
              >恭喜<img :src="item.profile_image" alt="" /><span>{{
                item.username
              }}</span
              >获得{{ item.remark }}</van-swipe-item
            >
            <template #indicator> '' </template>
          </van-swipe>
          <div class="gacha-machine-img-box">
            <div class="left" @click="clickGacha(0)"></div>
            <div class="gacha-machine-history" @click="showHistory"></div>
            <div class="right" @click="clickGacha(1)"></div>
          </div>
        </div>
        <!-- 奖励展示 -->
        <div class="reward-displays">
          <div class="reward-displays-title">
            <img src="../../assets/mk5_7.png" alt="" />
          </div>
          <p>参与扭蛋有机会获得以下奖品</p>
          <div class="reward-content">
            <div class="top">
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_8.png" alt="" />
                  <div class="data-num">1天</div>
                </div>
                <p>主页特效</p>
              </div>
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_9.png" alt="" />
                  <div class="data-num">1天</div>
                </div>
                <p>座驾</p>
              </div>
              <div class="content-item">
                <div class="img-box">
                  <div class="fantasticGachaLottie"></div>
                  <div class="data-num">3天</div>
                </div>
                <p>头饰</p>
              </div>
            </div>
            <div class="bottom">
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_10.png" alt="" />
                  <div class="data-num">25</div>
                </div>
                <p>绿晶石</p>
              </div>
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_11.png" alt="" />
                  <div class="data-num">5</div>
                </div>
                <p>紫晶石</p>
              </div>
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_12.png" alt="" />
                  <div class="data-num">5</div>
                </div>
                <p>防爆石</p>
              </div>
              <div class="content-item">
                <div class="img-box">
                  <img src="../../assets/mk5_13.png" alt="" />
                  <div class="data-num">1-5</div>
                </div>
                <p>神奇碎片</p>
              </div>
            </div>
          </div>
          <!-- 说明文本 -->
          <div class="reward-bottom-article">
            <ul>
              <li>
                活动期间，每充值30元可以获得<span>1张扭蛋券</span
                ><img src="../../assets/mk5_1.png" alt="" />
              </li>
              <li>
                扭蛋有几率获得神奇碎片，可用于兑换限定装扮、 稀有道具、绿晶石等
              </li>
              <li>购买礼包、会员（含超值兑换中兑换会员）、活 力卡不计算在内</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="fantasticGacha-bottom-box">
      <!-- 白色边框 -->
      <div class="border-box">
        <!-- 兑换好礼标题 -->
        <div class="img-box" style="text-align: center">
          <img src="../../assets/title_1.png" alt="" />
        </div>
        <!-- 我的积分 -->
        <div class="bottom-top">
          剩余碎片<img src="../../assets/mk5_14.png" alt="" /> ：{{
            fantasticGachaData.piece
          }}
        </div>
        <div class="fantasticGacha-bottom-content">
          <div
            class="bottom-content-item"
            v-for="item in fantasticGachaData.convert_list"
            :key="item.id"
          >
            <div class="img-box">
              <img :src="require('../../assets/' + item.award.icon)" alt="" />
              <div class="data-num">{{ item.award.tip_text }}</div>
            </div>
            <p>{{ item.award.text }}</p>
            <div
              class="click-box"
              @click="onButtomClick(item.has_right, item.id)"
            >
              <div
                class="button-box"
                :class="{ 'button-box-did': item.has_right === 2 }"
              >
                <img src="../../assets/mk5_14.png" alt="" />
                <p>{{ item.piece }}兑换</p>
              </div>
              <p v-if="item.max">限兑: {{ item.current }}/{{ item.max }}</p>
              <p v-else>不限兑换次数</p>
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
      <template
        #title
        v-if="
          dialogType === 'excharge' ||
          dialogType === 'history' ||
          dialogType === 'Gacha'
        "
      >
        <img
          v-if="dialogType === 'excharge'"
          src="../../assets/tk_1.png"
          alt=""
        />
        <img
          v-if="dialogType === 'history'"
          src="../../assets/tk_7.png"
          alt=""
        />
        <img v-if="dialogType === 'Gacha'" src="../../assets/tk_6.png" alt="" />
      </template>
      <template
        v-if="
          dialogType === 'excharge' ||
          dialogType === 'getTicket' ||
          dialogType === 'Gacha'
        "
      >
        <p v-if="dialogType === 'excharge'">
          剩余碎片<img src="../../assets/mk5_14.png" alt="" />：{{ my_goods }}
        </p>
        <!-- 获得抽奖券 -->
        <p v-if="dialogType === 'getTicket'">每充值30元可获得1扭蛋券</p>
        <!-- 抽奖机会不足 -->
        <p v-if="dialogType === 'Gacha' && GachaList.errmsg">
          {{ GachaList.errmsg }}
        </p>
        <!-- 抽奖列表 -->
        <div
          v-if="dialogType === 'Gacha' && !GachaList.errmsg"
          class="goods-List"
        >
          <div class="goods-item" v-if="GachaList.data.award">
            <div class="item-img">
              <img
                :src="require('../../assets/' + GachaList.data.award.icon)"
                alt=""
              />
            </div>
            <div class="item-text">+{{ GachaList.data.award.nums }}</div>
          </div>
          <div class="goods-item" v-if="GachaList.data.piece_award">
            <div class="item-img">
              <img
                :src="
                  require('../../assets/' + GachaList.data.piece_award.icon)
                "
                alt=""
              />
            </div>
            <div class="item-text">+{{ GachaList.data.piece_award.nums }}</div>
          </div>
          <div class="goods-item" v-if="GachaList.data.lucky_award">
            <div class="item-img">
              <img
                :src="
                  require('../../assets/' + GachaList.data.lucky_award.icon)
                "
                alt=""
              />
            </div>
            <div class="item-text">+{{ GachaList.data.lucky_award.nums }}</div>
          </div>
        </div>
        <!-- 图片 -->
        <div class="img-box" v-if="dialogType === 'excharge'">
          <img
            :src="require('../../assets/' + goods_detail.award.icon)"
            alt=""
          />
        </div>
        <!-- 计数器盒子 -->
        <div class="counter-box" v-if="dialogType === 'excharge'">
          <!-- 计数器 -->
          <div class="counter">
            <p class="min" @click="changeNum('min')">最小</p>
            <p class="reduce" @click="onCounter('reduce')">
              <img src="../../assets/pop_reduce.png" alt="" />
            </p>
            <p class="input">{{ inputNum }}</p>
            <p
              class="add"
              @click="onCounter('add', goods_detail.piece, goods_detail.max)"
            >
              <img src="../../assets/pop_add.png" alt="" />
            </p>
            <p
              class="max"
              @click="changeNum('max', goods_detail.piece, goods_detail.max)"
            >
              最大
            </p>
          </div>
          <!-- 结算 -->
          <div class="billing">
            <p>
              共消耗<img src="../../assets/mk5_14.png" alt="" />：{{
                goods_detail?.piece * inputNum
              }}
            </p>
            <!-- 兑换按钮 -->
            <div class="button" @click="onExcharge"></div>
          </div>
        </div>
        <!-- 底部两个按钮 -->
        <div
          class="buttons-box"
          v-if="
            dialogType == 'getTicket' ||
            (dialogType == 'Gacha' && GachaList.data)
          "
        >
          <div
            v-if="dialogType == 'getTicket' || GachaList.errno == 3"
            class="left-button"
            @click="showDialog = false"
          >
            取消
          </div>
          <div class="right-button" @click="onLeftClick">
            <p>
              {{
                GachaList.errno == 0
                  ? GachaList.award
                    ? GachaList.award.type == 'car'
                      ? '立即装备'
                      : GachaList.award.type == 'mic' ||
                        GachaList.award.type == 'costume'
                      ? '立即装扮'
                      : '知道了'
                    : '知道了'
                  : GachaList.errno == 3
                  ? '立即前往'
                  : '充值'
              }}
            </p>
          </div>
        </div>
      </template>
      <!-- 抽奖记录 -->
      <template
        v-if="dialogType === 'history' && historyList && historyList.list"
      >
        <p class="noHistory" v-if="historyList.list.length == 0">
          当前没有抽奖记录哦，先去抽奖吧~
        </p>
        <div
          v-else
          class="history-list"
          ref="historyList"
          @scroll="handlerScroll"
        >
          <div
            v-for="(item, index) in GachaListData"
            :key="item.id"
            :class="{ bgc: index % 2 === 0 }"
          >
            <p class="top">
              获得{{ item.is_rate === '1' ? '稀有奖励 ' : ''
              }}<span>{{ item.remark }}</span>
            </p>
            <p class="bottom">{{ item.create_time }}</p>
          </div>
          <p class="noHistory" v-if="!historyList.hasMore">没有更多记录了~</p>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script>
// 导入跳转充值
import { recharge } from '../../utils/recharge'
// 导入vant轮播组件
// 导入vant弹框组件
import { Dialog, SwipeItem, Swipe } from 'vant'
// json动画导入
import { svgFun } from '../../utils/json'
import dfw from '../../assets/lottie/dfw/data.json'
// 请求接口导入
import { getFantasticGachaData } from '../../api/fantasticGacha'
export default {
  name: 'fantasticGacha',
  components: {
    [Dialog.Component.name]: Dialog.Component,
    // [Swipe.Component.name]: Swipe.Component,
    // [SwipeItem.Component.name]: SwipeItem.Component
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  props: {},
  data() {
    return {
      // 页面渲染数据
      fantasticGachaData: {},
      // 弹框显示隐藏
      showDialog: false,
      // 弹框类型
      dialogType: '',
      // 计数器值
      inputNum: 1,
      // 拥有道具
      my_goods: '',
      // 已兑换的数量
      current_times: '',
      // 商品详情
      goods_detail: {},
      // 结算数据
      settlement: {},
      // 抽奖历史记录
      historyList: {},
      // 扭蛋抽奖记录信息
      GachaList: {},
      // 扭蛋抽奖列表
      GachaListData: [],
      // 抽奖记录页数
      GachaListPage: 1,
      listLoad: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  async created() {
    await this.getFantasticGachaData()
    svgFun(0, dfw, 'dfw', '.fantasticGachaLottie')
  },
  methods: {
    // 抽奖记录到底加载
    async handlerScroll(e) {
      if (this.listLoad) return
      const dom = e.target
      const scrollTop = dom.scrollTop // 滑入屏幕上方的高度
      const windowHeitht = dom.clientHeight // 能看到的页面的高度
      const scrollHeight = dom.scrollHeight // 监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
      const total = scrollTop + windowHeitht
      if (total >= scrollHeight) {
        if (this.historyList.hasMore) {
          this.listLoad = true
          await this.getHistory((this.GachaListPage += 1))
          this.listLoad = false
        }
      }
    },
    // 弹框右侧按钮
    onLeftClick() {
      if (this.dialogType === 'getTicket' || this.GachaList.errno === 3) {
        this.recharge()
      } else {
        this.showDialog = false
      }
    },
    // 充值
    recharge() {
      recharge()
    },
    // 抽奖
    async clickGacha(times) {
      const data = await this.getGacha(times)
      this.GachaList = data
      await this.getFantasticGachaData()
      this.dialogType = 'Gacha'
      this.showDialog = true
    },
    // 扭蛋机抽奖接口
    async getGacha(mark) {
      const res = await getFantasticGachaData({
        type: 'twisted_egg_lottery',
        mark
      })
      return res
    },
    // 显示抽奖记录弹框
    async showHistory() {
      await this.getHistory(this.GachaListPage)
      this.dialogType = 'history'
      this.showDialog = true
    },
    // 抽奖记录接口
    async getHistory(mark) {
      const { data } = await getFantasticGachaData({
        type: 'twisted_egg_record',
        mark
      })
      this.historyList = data
      this.GachaListData = [...this.GachaListData, ...data.list]
    },
    // 点击事件--点击图标获得抽奖券
    getTicket(type) {
      this.dialogType = type
      this.showDialog = true
    },
    // 弹框内 点击兑换按钮
    async onExcharge() {
      this.settlement['mark[nums]'] = this.inputNum
      const data = await this.handleExcharge(this.settlement)
      await this.getFantasticGachaData()
      this.$toast(data.errmsg)
      this.showDialog = false
    },
    // 弹框内 兑换请求
    async handleExcharge() {
      const data = await getFantasticGachaData({
        ...this.settlement,
        type: 'twisted_egg_convert'
      })
      return data
    },
    // 最大或者最小
    changeNum(type, price) {
      if (type === 'min') {
        this.inputNum = 1
      } else {
        if (!this.goods_detail.max) {
          return (this.inputNum = Math.floor(this.my_goods / price))
        }
        const re1 = Math.floor(this.my_goods / price)
        const re = this.goods_detail.max - this.current_times
        this.inputNum = re1 === 0 ? 1 : re1 > re ? re : re1
      }
    },
    // 计数器+或者-
    onCounter(type, price) {
      const re1 = Math.floor(this.my_goods / price)
      const re = this.goods_detail.max - this.this.current_times
      if (type === 'reduce' && this.inputNum > 1) {
        this.inputNum--
      } else if (type === 'add' && this.inputNum < re && this.inputNum < re1) {
        this.inputNum++
      }
    },
    // 兑换好礼 商品详情请求
    async clickBottomButton(mark) {
      const { data } = await getFantasticGachaData({
        type: 'twisted_egg_detail',
        mark
      })
      this.my_goods = data.piece
      this.goods_detail = data.goods_info
      this.current_times = data.current_times
    },
    // bottom盒子按钮
    async onButtomClick(flag, mark) {
      if (flag === 1) {
        await this.clickBottomButton(mark)
        this.dialogType = 'excharge'
        this.showDialog = true
        this.settlement['mark[key]'] = this.goods_detail.id
      }
    },
    // 弹窗关闭事件
    closeDialog() {
      this.inputNum = 1
      this.dialogType = ''
      this.GachaList = {}
      this.GachaListData = []
      this.GachaListPage = 1
      console.log('关闭弹窗')
    },
    // 获取页面数据
    async getFantasticGachaData() {
      const { data } = await getFantasticGachaData({
        type: 'tab',
        mark: 'm5'
      })
      this.fantasticGachaData = data
    }
  }
}
</script>

<style scoped lang="scss">
.fantasticGacha-page {
  // 弹框样式
  ::v-deep .van-dialog {
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: relative;
      top: 25px;
      width: 265px;
      height: 45px;
      margin: 0 auto;
      > img {
        width: 265px;
      }
    }
    .van-dialog__content {
      padding-top: 25px;
      margin: 0 auto;
      background: linear-gradient(180deg, #a7c4ff, #828be2);
      border: 8px solid #edf2ff;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // 奖励列表
      .goods-List {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding: 0 5px;
        box-sizing: border-box;
        .goods-item {
          .item-img {
            width: 44px;
            height: 44px;
            background: #fefaef;
            border: 3px solid #6e7bda;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
          }
          .item-text {
            font-size: 13px;

            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px 0;
          }
        }
      }
      // 没有历史记录
      > .noHistory {
        color: #ffffff;
        margin: 50px 0;
      }
      // 历史记录
      > .history-list {
        margin: 14px;
        height: 186px;
        overflow-y: scroll;
        > .bgc {
          background: #e4ebff !important;
        }
        > div {
          padding: 0 17px;
          height: 62px;

          font-weight: 500;
          color: #595ec3;
          overflow: hidden;
          background: #d3dfff;
          p {
            margin-top: 10px;
          }
          p:nth-child(1) {
            span {
              color: #f67baf;
            }
          }
          p:nth-child(2) {
            font-size: 12px;
          }
        }
        // 没有历史记录
        > .noHistory {
          width: 100%;

          color: #ffffff;
          text-align: center;
          margin: 20px 0 10px;
        }
      }
      > .img-box {
        margin: 5px auto;
        height: 66px;
        background: #fefaef;
        border: 3px solid #6e7bda;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          height: 100%;
        }
      }
      > p {
        margin: 5px 0;
        text-align: center;
        font-size: 16px;

        width: 100%;
        height: 17px;
        color: #ffffff;
        > img {
          width: 17px;
          position: relative;
          top: -1px;
          vertical-align: middle;
          margin: 0 4px;
        }
      }
      // 弹框计数器部分
      .counter-box {
        // 弹框计数器
        .counter {
          padding: 0 22px;
          display: flex;
          justify-content: space-evenly;
          > p {
            color: #ffffff;
            background: #5560c9;
            padding: 5px;
            height: 24px;
            line-height: 24px;
          }
          .reduce,
          .add {
            width: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            > img {
              width: 14px;
              height: 14px;
            }
          }
          > .input {
            width: 60px;
            font-size: 18px;
            text-align: center;
            color: #fffaa6;
          }
        }
        // 结算部分
        .billing {
          margin-top: 10px;
          border-top: 2px solid #fff;
          box-sizing: border-box;
          padding: 15px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;

          color: #ffffff;
          > p {
            font-size: 16px;

            color: #ffffff;
            > img {
              width: 17px;
              margin: 0 4px;
              position: relative;
              top: 4px;
            }
          }
          > .button {
            width: 64px;
            height: 34px;
            background: url('../../assets/button/tk1_1.png') no-repeat;
            background-size: 100%;
          }
        }
      }
      // 弹框下方按钮
      > .buttons-box {
        display: flex;
        justify-content: space-evenly;
        margin: 20px 0 10px;
        > .left-button,
        > .right-button {
          padding: 0 20px;
          height: 44px;
          border: 2px solid #ffffff;
          border-radius: 44px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;

          > p {
            margin: 0;
          }
          > p:nth-child(2) {
            font-size: 12px;
          }
        }
        .left-button {
          > p {
            color: #4d7ddd;
          }
          background: linear-gradient(0deg, #cae7ff, #ffffff);
        }
        .right-button {
          p {
            color: #a9792c !important;
          }
          background: linear-gradient(0deg, #fff9d1, #ffffff);
        }
      }
    }
  }
  .fantasticGacha-top-box,
  .fantasticGacha-bottom-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    box-sizing: border-box;
    margin-bottom: 38px;
    .border-box {
      border: 1px solid #fff;
      width: 100%;
      height: 100%;
      padding: 0 0 14px;
      box-sizing: border-box;
    }
  }
  .fantasticGacha-top-box {
    .recharge-box {
      box-sizing: border-box;
      padding: 0 14px 0 14px;
      margin: 15px auto 0;
      width: 330px;
      height: 24px;
      line-height: 24px;
      background: #99b2f9;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;

      font-weight: 500;
      color: #ffffff;
      img:nth-child(1) {
        position: relative;
        top: 3px;
        left: 3px;
        width: 24px;
      }
      img:nth-child(2) {
        width: 16px;
        position: relative;
        top: 3px;
        left: 5px;
      }
    }
    // 扭蛋机
    .gacha-machine {
      position: relative;
      width: 100%;
      height: 360px;
      // margin-top: 15px;
      background: url('../../assets/mk5_3.png') no-repeat;
      background-size: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      // 轮播图
      ::v-deep .van-swipe {
        margin: 10px auto 0;
        height: 30px !important;
        .van-swipe-item {
          margin: 0 auto;
          width: fit-content;
          height: 100%;
          text-align: center;
          font-size: 12px;

          font-weight: 500;
          color: #ffffff;
          padding-bottom: 0 !important;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          // margin: 5px 0;
          > img {
            width: 26px;
            height: 26px;
            margin: 0 5px;
            border-radius: 50%;
          }
          span {
            color: #fff0ab;
          }
        }
      }
      // 扭蛋机按钮
      .gacha-machine-img-box {
        position: absolute;
        bottom: 40px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        // 扭一次
        > .left {
          width: 90px;
          height: 100px;
          background: url('../../assets/mk5_4.png') no-repeat;
          background-size: 100%;
        }
        // 扭十次
        > .right {
          width: 90px;
          height: 100px;
          background: url('../../assets/mk5_5.png') no-repeat;
          background-size: 100%;
        }
        // 抽奖记录
        > .gacha-machine-history {
          width: 68px;
          height: 26px;
          background: url('../../assets/mk5_6.png') no-repeat;
          background-size: 100%;
          position: relative;
          top: 50px;
        }
      }
    }
    .reward-displays {
      padding: 0 9px;
      // 奖励展示标题
      .reward-displays-title {
        margin: 5px 0 0;
        width: 100%;
        // height: 100px;
        > img {
          width: 100%;
        }
        // 白条
      }
      > p {
        margin-top: 10px;
        text-align: center;

        color: #595ec3;
      }
      .reward-content {
        .top {
          margin-top: 10px;
          display: flex;
          justify-content: space-evenly;
          .content-item {
            display: flex;
            align-items: center;
            flex-direction: column;
            .img-box {
              position: relative;
              width: 84px;
              height: 84px;
              background: url('../../assets/mk4_11.png') no-repeat;
              background-size: 100% 100%;
              margin-bottom: 6px;
              padding: 2px;
              box-sizing: border-box;
              .data-num {
                position: absolute;
                bottom: 3px;
                right: 3px;
                width: 30px;
                height: 14px;
                text-align: center;
                line-height: 14px;
                background: linear-gradient(90deg, #e5a4f5, #9681f0);
                border-radius: 9px 0px 9px 0px;
                font-size: 12px;

                font-weight: 500;
                color: #ffffff;
              }
              img {
                width: 100%;
              }
              .lottie {
                width: 100%;
              }
            }
            p {
              text-align: center;
              font-size: 12px;

              font-weight: 500;
              color: #595ec3;
            }
          }
        }
        .bottom {
          margin: 8px 0 10px;
          display: flex;
          justify-content: space-evenly;
          .content-item {
            display: flex;
            align-items: center;
            flex-direction: column;
            .img-box {
              position: relative;
              width: 79px;
              height: 64px;
              background: url('../../assets/mk4_11.png') no-repeat;
              background-size: 100% 100%;
              margin-bottom: 6px;
              padding: 8px;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              .data-num {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 30px;
                height: 14px;
                text-align: center;
                line-height: 14px;
                background: linear-gradient(90deg, #e5a4f5, #9681f0);
                border-radius: 8px 0px 8px 0px;
                font-size: 12px;

                font-weight: 500;
                color: #ffffff;
              }
              img {
                width: 100%;
              }
            }
            p {
              text-align: center;
              font-size: 12px;

              font-weight: 500;
              color: #595ec3;
            }
          }
        }
      }
      .reward-bottom-article {
        width: 330px;
        background: linear-gradient(180deg, #a7c4ff, #828be2);
        border-radius: 6px;

        color: #ffffff;
        box-sizing: border-box;
        padding: 12px 0 10px 25px;
        margin: 0 auto 10px;
        line-height: 25px;
        img {
          width: 24px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
        span {
          color: #fffaa6;
        }
      }
    }
    // 兑换商品
  }
  .fantasticGacha-bottom-box {
    .border-box {
      position: relative;
      > .img-box {
        position: absolute;
        width: 100%;
        top: -25px;
        img {
          width: 262px;
        }
      }
      .bottom-top {
        margin: 26px auto 12px;
        width: 160px;
        height: 24px;
        line-height: 24px;
        background: #99b2f9;
        border-radius: 12px;

        font-weight: 500;
        color: #ffffff;
        text-align: center;
        img {
          vertical-align: middle;
          position: relative;
          top: -1px;
          left: 2px;
          width: 17px;
        }
      }
      .fantasticGacha-bottom-content {
        display: flex;
        justify-content: space-evenly;
        .bottom-content-item {
          width: 79px;
          display: flex;
          flex-direction: column;
          > p {
            text-align: center;
          }
          .img-box {
            width: 79px;
            height: 79px;
            background: url('../../assets/mk4_11.png') no-repeat;
            background-size: 100% 100%;
            padding: 8px;
            box-sizing: border-box;
            position: relative;
            img {
              width: 100%;
            }
            .data-num {
              position: absolute;
              bottom: 3px;
              right: 3px;
              width: 30px;
              height: 14px;
              text-align: center;
              line-height: 14px;
              background: linear-gradient(90deg, #e5a4f5, #9681f0);
              border-radius: 8px 0px 8px 0px;
              font-size: 12px;

              font-weight: 500;
              color: #ffffff;
            }
          }
          > p {
            font-size: 12px;

            font-weight: 500;
            color: #595ec3;
            margin: 2px 0;
          }
          .click-box {
            // 兑换按钮
            .button-box {
              width: 75px;
              height: 24px;
              line-height: 24px;
              background: linear-gradient(0deg, #9575ee, #ebd0fb);
              border: 1px solid #ffffff;
              border-radius: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 13px;

              font-weight: 500;
              color: #ffffff;
              margin: 3px 0;
              img {
                width: 13px;
                position: relative;
                top: 0px;
                margin-right: 1px;
              }
            }
            // 已兑完
            .button-box-did {
              background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
              color: #fff !important;
            }
            > p {
              font-size: 12px;
              text-align: center;

              color: #f67baf;
            }
          }
        }
      }
    }
  }
}
</style>
