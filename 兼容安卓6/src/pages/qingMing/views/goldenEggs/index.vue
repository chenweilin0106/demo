<template>
  <div class="goldenEggs_page">
    <div class="theme_box goldenEggs_box">
      <!-- 白色边框 -->
      <div class="white_border">
        <!-- 拥有的道具 -->
        <div class="my_tool">
          <p>
            拥有的<img src="../../assets/mk4_3.png" alt="" />：<span>{{
              GoldenEggsData.hammer_nums
            }}</span>
          </p>
          <p>
            拥有的<img src="../../assets/mk4_5.png" alt="" />：<span>{{
              GoldenEggsData.stone_nums
            }}</span>
          </p>
        </div>
        <!-- 金蛋 -->
        <div class="goldenEggs_body">
          <!-- 金蛋 -->
          <div
            class="goldenEggs"
            :class="goldenEggs_Animation ? 'goldenEggs_shake' : ''"
            @animationend="offAnimation"
          >
            <img src="../../assets/mk4_1.png" alt="" />
          </div>
          <!-- 底座 -->
          <div class="goldenEggs_bottom">
            <img src="../../assets/mk4_2.png" alt="" />
          </div>
          <!-- 锤子 -->
          <div
            class="goldenEggs_hammer"
            :class="goldenEggs_Animation ? 'hammer_smash' : ''"
          >
            <img src="../../assets/mk4_6.png" alt="" />
          </div>
          <!-- 按钮 -->
          <div class="goldenEggs_botton">
            <div class="left_botton" @click="smashEgg(1)">
              <p>钻石砸蛋（{{ GoldenEggsData.smash_times }}/10）</p>
              <p>
                消耗：<img src="../../assets/mk4_3.png" alt="" />×1<img
                  src="../../assets/mk4_4.png"
                  alt=""
                />×100
              </p>
            </div>
            <div class="right_botton" @click="smashEgg(2)">
              <p>点金石砸蛋</p>
              <p>
                消耗：<img src="../../assets/mk4_3.png" alt="" />×1<img
                  src="../../assets/mk4_5.png"
                  alt=""
                />×1
              </p>
            </div>
          </div>
          <div class="goldenEggs_text">
            <ul>
              <li>
                <span></span
                >每充值<i>10元</i>可获得1个锤子，每日获得锤子数量不限
              </li>
              <li>
                <span></span
                >消耗<i>1个锤子和100钻石</i>可砸金蛋拿元宝，每天最多砸10次
              </li>
              <li>
                <span></span>每消费<i>1000钻石</i>可获得1个点金石<img
                  src="../../assets/mk4_5.png"
                  alt=""
                />，消耗<i>1个锤子和1个点金石</i>可砸金蛋拿元宝，且每天砸蛋数量
                不限
              </li>
              <li>
                <span></span>每次砸金蛋获得的元宝数量为<i>5万~10万</i>随机数额
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog
      class="theme_tk"
      v-model="showDialog"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      @closed="closeDialog"
    >
      <!-- 标题 -->
      <template #title v-if="dialogType == 'award'">
        <img src="../../assets/tk_1.png" alt="" />
      </template>
      <div class="white_border">
        <!-- 奖励展示 -->
        <div class="award_tk_box" v-if="dialogType == 'award'">
          <div class="img_box">
            <img :src="require('../../assets/tk_dj_5.png')" alt="" />
          </div>
          <p>+{{ goldNums }}</p>
          <div class="award_tk_button" @click="showDialog = false">
            我知道了
          </div>
        </div>
        <div class="excharge_tk_box" v-if="dialogType.includes('excharge')">
          <p>
            {{
              dialogType == 'excharge_hammer' ? '锤子' : '钻石'
            }}不足，前往充值
          </p>
          <div class="excharge_tk_button">
            <div class="left_button" @click="showDialog = false">取消</div>
            <div class="right_button" @click="recharge">充值</div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 跳转APP充值页面
import { recharge } from '../../utils/toApp'
// 接口导入
import { getGoldenEggsData } from '../../api/goldenEggs'
// 弹框组件导入
import { Dialog } from 'vant'
export default {
  // 奖励兑换
  name: 'goldenEggs',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
      // 弹框控制器
      showDialog: false,
      // 弹框种类
      dialogType: '',
      // 动画控制器
      goldenEggs_Animation: false,
      // 页面数据
      GoldenEggsData: {
        hammer_nums: 0,
        smash_times: 0,
        stone_nums: 0
      },
      goldNums: '',
      timer: null
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  computed: {},
  watch: {},
  async created() {
    this.timer = setInterval(() => {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // 页面被挂起
          // console.log('hide')
        } else {
          // 页面呼出
          this.showDialog = false
        }
      })
    }, 200)
    this.showDialog = false
    await this.getGoldenEggsData()
  },
  async mounted() {},
  methods: {
    // 跳转APP充值
    recharge() {
      recharge()
    },
    // 点金石砸蛋接口
    async touchstoneSmash() {
      const { data } = await getGoldenEggsData({
        type: 'smash_egg_stone'
      })
      this.goldNums = data.gold_nums
    },
    // 钻石砸蛋接口
    async diamondSmash() {
      const res = await getGoldenEggsData({
        type: 'smash_egg'
      })
      return res
    },
    // 页面数据接口
    async getGoldenEggsData() {
      const res = await getGoldenEggsData({
        type: 'tab',
        mark: 'm4'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.GoldenEggsData = res.data
    },
    // 弹窗关闭
    async closeDialog() {
      await this.getGoldenEggsData()
    },
    // 砸金蛋
    async smashEgg(num) {
      await this.getGoldenEggsData()
      if (num == 1) {
        if (this.GoldenEggsData.smash_times >= 10) {
          return this.$toast('今日已达上限，请选择点金石砸蛋')
        } else if (this.GoldenEggsData.hammer_nums < 1) {
          this.dialogType = 'excharge_hammer'
          this.showDialog = true
          return
        }
        const res = await this.diamondSmash()
        if (res.errno == 3) {
          this.dialogType = 'excharge_diamond'
          this.showDialog = true
          return
        } else {
          this.goldNums = res.data.gold_nums
        }
      } else {
        if (this.GoldenEggsData.hammer_nums < 1) {
          this.dialogType = 'excharge_hammer'
          this.showDialog = true
          return
        } else if (this.GoldenEggsData.stone_nums < 1) {
          // 判断点金石数量
          return this.$toast('点金石不足，先去消费吧')
        }
        await this.touchstoneSmash()
      }
      this.dialogType = 'award'
      this.goldenEggs_Animation = true
    },
    // 动画结束后
    offAnimation() {
      this.goldenEggs_Animation = false
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.goldenEggs_page {
  // 弹框样式
  ::v-deep .van-dialog {
    .van-dialog__content {
      width: 256px;
      .white_border {
        padding-bottom: 24px;
        .award_tk_box {
          margin-top: 15px;
          .img_box {
            width: 60px;
            height: 60px;
            margin: 5px auto;
            background: #fefaef;
            border: 3px solid #85d9d6;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 100%;
            }
          }
          p {
            margin: 5px 0;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
          }
          // 知道了按钮
          .award_tk_button {
            margin: 25px auto 0;
            width: 160px;
            height: 36px;
            background: linear-gradient(0deg, #e99b13, #f9e16e);
            border: 1px solid #ffffff;
            border-radius: 36px;
            text-align: center;
            line-height: 36px;
            font-size: 16px;
            color: #fff;
          }
        }
        .excharge_tk_box {
          > p {
            margin: 7px 0 25px;
            font-size: 16px;
            color: #fff;
            text-align: center;
          }
          // 取消---去充值
          > .excharge_tk_button {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .left_button,
            .right_button {
              width: 88px;
              height: 38px;
              background: linear-gradient(0deg, #fff6c1, #ffffff);
              border: 1px solid #ffffff;
              border-radius: 38px;
              font-size: 16px;
              color: #b28d2b;
              text-align: center;
              line-height: 38px;
            }
            .right_button {
              background: linear-gradient(0deg, #e99b13, #f9e16e);
              border: 1px solid #ffffff;

              color: #ffffff;
            }
          }
        }
      }
    }
  }
  // 金蛋摇摆动画样式
  .goldenEggs_shake {
    animation: goldenEggs_shake 0.6s;
    transform-origin: bottom;
  }
  .hammer_smash {
    animation: hammer_shake 0.6s;
  }
  // 锤子动画
  @keyframes hammer_shake {
    0% {
      opacity: 1;
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-20deg);
    }
    75% {
      transform: rotate(20deg);
    }
    100% {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
  // 金蛋摇摆动画
  @keyframes goldenEggs_shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(3deg);
    }
    75% {
      transform: rotate(-3deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  // 奖励兑换 上方box
  .goldenEggs_box {
    // // 背景色
    background: linear-gradient(180deg, #4dafb5, #ffffff);
    .white_border {
      padding: 14px 10px;
      // 拥有的道具
      > .my_tool {
        width: 100%;
        height: 25px;
        background: #126a8b;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 18px;
        p {
          display: flex;
          align-items: center;
          color: #fff;
          span {
            color: #fffaa6;
          }
          img {
            width: 15px;
            margin: 0 5px;
          }
        }
      }
      // 金蛋
      .goldenEggs_body {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        // 金蛋
        .goldenEggs {
          position: relative;
          z-index: 10;
          // top: 8px;
          height: 140px;
          img {
            height: 100%;
          }
        }
        // 底座
        .goldenEggs_bottom {
          position: relative;
          top: -8px;
          width: 150px;
          img {
            width: 100%;
          }
        }
        // 锤子
        .goldenEggs_hammer {
          position: absolute;
          z-index: 20;
          top: 10px;
          right: 80px;
          width: 40px;
          opacity: 0;
          img {
            width: 100%;
          }
        }
        // 按钮
        .goldenEggs_botton {
          margin-bottom: 25px;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          .left_botton,
          .right_botton {
            width: 150px;
            height: 48px;
            background: linear-gradient(0deg, #fff6c1, #ffffff);
            border: 1px solid #ffffff;
            border-radius: 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            color: #b45108;
            font-weight: 500;
            p:nth-child(2) {
              font-size: 12px;
              display: flex;
              align-items: center;
              img {
                width: 15px;
                margin: 0 2px;
              }
            }
          }
          .right_botton {
            color: #fff;
            background: linear-gradient(0deg, #ee842e, #ffd967);
          }
        }
        // 说明
        .goldenEggs_text {
          width: 100%;
          background: linear-gradient(180deg, #3da69b, #5b9cd8);
          border-radius: 6px;
          box-sizing: border-box;
          padding-top: 7px;
          padding-left: 18px;
          padding-bottom: 15px;
          ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          li {
            width: 100%;
            color: #fff;
            position: relative;
            line-height: 25px;
            list-style-type: none;
            box-sizing: border-box;
            i {
              font-style: normal;
              color: #fffaa6;
            }
            img {
              width: 18px;
              vertical-align: middle;
            }
            span {
              position: absolute;
              top: 10px;
              left: -10px;
              display: block;
              width: 6px;
              height: 6px;
              background: #fffaa6;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
