<template>
  <div class="climbTower-page">
    <!-- 盒子 -->
    <div
      class="climbTower-body"
      :class="{ 'climbTower-body-senior': climbTowerData.common_task_st }"
    >
      <!-- 白色边框 -->
      <div
        class="white-border"
        :class="{ 'white-border-senior': climbTowerData.common_task_st }"
      >
        <!-- 奖励列表 -->
        <div class="climbTower-body-content" :style="{ padding: 0 }">
          <!-- 任务种类 -->
          <div
            class="task-type"
            :class="{ 'task-type-senior': climbTowerData.common_task_st }"
          >
            <!-- 顶部任务背景 -->
            <div
              class="task-bc-junior"
              :class="{ 'task-bc-senior': climbTowerData.common_task_st }"
            >
              <!-- 任务图标 -->
              <div
                class="task-icon-junior"
                :class="{ 'task-icon-senior': climbTowerData.common_task_st }"
              ></div>
              <p :class="{ 'p-senior': climbTowerData.common_task_st }">
                程碑前序任务才能激活奖励领取
              </p>
            </div>
          </div>
          <!-- 奖励主体 -->
          <div
            class="gift-body"
            :class="{ 'gift-body-senior': climbTowerData.common_task_st }"
          >
            <!-- 奖励线 -->
            <div class="gift-line">
              <img src="../../assets/mk4_5.png" alt="" />
            </div>
            <!-- 奖励项 -->
            <div
              class="gift-item"
              :class="{
                'gift-item-get': item.has_right === 2,
                'gift-item-did': item.has_right === 1
              }"
              v-for="item in climbTowerData.task_list"
              :key="item.id"
            >
              <!-- 左边盒子 -->
              <div class="left-box">
                <div class="img-box">
                  <div class="img-top">
                    <div
                      class="climbTowerLottie"
                      v-if="item.award_info.icon === '.png'"
                    ></div>
                    <img
                      v-else
                      :src="require('../../assets/' + item.award_info.icon)"
                      alt=""
                    />
                  </div>
                  <div class="text-bottom">+{{ item.award_info.show_txt }}</div>
                </div>
              </div>
              <!-- 中间任务状态 -->
              <div class="task-state">
                <!-- 已领取 -->
                <img
                  src="../../assets/mk4_6.png"
                  alt=""
                  v-if="item.has_right === 2"
                />
                <!-- 领取 -->
                <img
                  src="../../assets/mk4_7.png"
                  alt=""
                  v-if="item.has_right === 1"
                />
                <!-- 去完成 -->
                <img
                  src="../../assets/mk4_8.png"
                  alt=""
                  v-if="item.has_right === 0"
                />
              </div>
              <!-- 右边盒子 -->
              <div class="right-box">
                <p>
                  {{ item.task_name
                  }}<span
                    >（{{ item.finish_times }}/{{ item.max_times }}）</span
                  >
                </p>
                <div
                  class="right-box-button"
                  :class="{
                    'right-box-button-did': item.has_right === 1,
                    'right-box-button-get': item.has_right === 2
                  }"
                  @click="onRightButton(item.has_right, item.id)"
                >
                  {{
                    item.has_right === 0
                      ? '未完成'
                      : item.has_right === 1
                      ? '领取'
                      : item.has_right === 2
                      ? '已领取'
                      : ''
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部背景图 -->
        <div
          class="climbTower-body-bottom-bc"
          v-if="!climbTowerData.common_task_st"
        >
          <p>完成并领取所有初始任务奖励可解锁高级任务及奖励</p>
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
      <template #title>
        <img src="../../assets/tk_6.png" alt="" />
      </template>
      <div class="img-box" v-if="goodsDetail.award">
        <img
          v-if="goodsDetail.award.icon !== '.png'"
          :src="require('../../assets/' + goodsDetail.award.icon)"
          alt=""
        />
        <!-- json动画 -->
        <div class="climbTower_tk_lottie" v-else></div>
      </div>
      <p v-if="goodsDetail.award">+{{ goodsDetail.award.nums }}</p>
      <!-- 底部按钮 -->
      <div class="buttons-box">
        <div class="button" @click="showDialog = false">我知道了</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 导入弹框组件
import { Dialog } from 'vant'
// 导入json动画
import { svgFun } from '../../utils/json'
import cjwj from '../../assets/lottie/cjwj/data.json'
// 导入接口
import { getClimbTowerData } from '../../api/climbTower'
export default {
  name: 'climbTower',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
      climbTowerData: {},
      showDialog: false,
      goodsDetail: {},
      tkLottie: {}
    }
  },
  computed: {},
  watch: {},
  async created() {
    // 获取页面数据
    await this.getClimbTowerData()
    this.$nextTick(() => {
      svgFun(0, cjwj, 'cjwj', '.climbTowerLottie')
      svgFun(1, cjwj, 'cjwj', '.climbTowerLottie')
    })
  },
  methods: {
    // 关闭弹框
    closeDialog() {
      this.tkLottie.destroy()
    },
    // 领取接口
    async getGoods(mark) {
      const res = await getClimbTowerData({
        type: 'climb_tower_task_rev',
        mark
      })
      return res
    },
    // 点击领取按钮
    async onRightButton(flag, mark) {
      console.log(1)
      if (flag === 1) {
        const { data } = await this.getGoods(mark)
        this.goodsDetail = data
        this.showDialog = true
        await this.getClimbTowerData()
        // 挂载json动画
        this.$nextTick(() => {
          this.tkLottie = svgFun(0, cjwj, 'cjwj', 'climbTower_tk_lottie')
        })
      }
    },
    // 页面数据接口
    async getClimbTowerData() {
      const res = await getClimbTowerData({
        type: 'tab',
        mark: 'm4'
      })
      this.climbTowerData = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.climbTower-page {
  // 弹框样式
  ::v-deep .van-dialog {
    width: 240px;
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: relative;
      top: 25px;
      height: 45px;
      > img {
        width: 240px;
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
      .img-box {
        margin: 5px auto;
        height: 66px;
        background: #fefaef;
        border: 3px solid #6e7bda;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 100%;
        }
        .lottie {
          height: 100%;
        }
      }
      p {
        margin: 5px 0;
        text-align: center;
        font-size: 16px;

        color: #ffffff;
        img {
          width: 21px;
          position: relative;
          top: 3px;
          margin: 0 2px;
        }
      }
      // 弹框下方按钮
      .buttons-box {
        margin: 20px 0 10px;
        .button {
          text-align: center;
          line-height: 36px;
          margin: 0 auto;
          width: 160px;
          height: 36px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border: 1px solid #ffffff;
          border-radius: 36px;
          font-size: 16px;

          color: #a9792c;
        }
      }
    }
  }
  // 高级任务-背景色
  .climbTower-body-senior {
    height: auto !important;
    background: linear-gradient(0deg, #e5edff, #514eb7) !important;
  }

  .climbTower-body {
    position: relative;
    width: 100%;
    height: 628px;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background: linear-gradient(0deg, #e5edff, #e3edff);
    box-sizing: border-box;
    margin-bottom: 38px;
    // 底部背景
    .climbTower-body-bottom-bc {
      z-index: 5;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 170px;
      background: url('../../assets/mk4_15.png') no-repeat;
      background-size: 100%;
      p {
        top: 130px;
        width: 100%;
        text-align: center;

        color: #595ec3;
        margin-top: 130px;
      }
    }
    // 高级任务-白边框
    .white-border-senior {
      padding: 0 !important;
    }
    // 白边框
    .white-border {
      border: 1px solid #fff;
      width: 100%;
      height: 100%;
      padding-bottom: 14px;
      box-sizing: border-box;
    }
    // 主体
    .climbTower-body-content {
      position: relative;
      // top: -3px;
      z-index: 5;
      overflow: scroll;
      height: 528px;
      // 高级任务种类
      .task-type-senior {
        background: linear-gradient(0deg, #6d6cc4, #514eb7) !important;
      }
      // 初级任务种类
      .task-type {
        z-index: 3;
        position: sticky;
        top: -1px;
        right: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(0deg, #e5edff, #dff1ff);
        // 高级任务背景
        .task-bc-senior {
          background: url('../../assets/mk4_2.png') no-repeat !important;
          background-size: 100% !important;
        }
        // 初级任务背景
        .task-bc-junior {
          width: 100%;
          height: 100%;
          background: url('../../assets/mk4_1.png') no-repeat;
          background-size: 100%;
          display: flex;
          align-items: center;
          // 任务图标
          // 初级
          .task-icon-junior {
            z-index: 2;
            width: 67px;
            height: 73px;
            position: relative;
            top: 30px;
            left: 52px;
            background: url('../../assets/mk4_3.png') no-repeat;
            background-size: 100%;
          }
          // 高级任务图标
          .task-icon-senior {
            background: url('../../assets/mk4_4.png') no-repeat !important;
            background-size: 100% !important;
          }
          // 初级任务p框
          > p {
            width: 250px;
            height: 30px;
            background: linear-gradient(90deg, #ffffff, #ffffff, #ffffff);
            font-size: 13px;

            font-weight: 500;
            color: #8eaef9;
            text-align: center;
            line-height: 30px;
            position: relative;
            z-index: 1;
            top: 30px;
            left: 32px;
          }
          // 高级任务p框
          .p-senior {
            color: #fff;
            background: linear-gradient(90deg, #9291fc, #81b9ff) !important;
          }
        }
      }
      // 奖励项全体
      .gift-body {
        z-index: 1;
        position: absolute;
        top: 120px;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding-left: 8px;
        padding-bottom: 70px;
        // overflow: hidden;
        // 奖励线
        .gift-line {
          z-index: 1;
          position: absolute;
          width: 20px;
          height: 100%;
          left: 75px;
          top: -40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        // 奖励每一项
        // 已领取样式
        .gift-item-get {
          .img-box {
            opacity: 0.5 !important;
          }
          .right-box {
            background: url('../../assets/mk4_12.png') no-repeat !important;
            background-size: 100% !important;
          }
          .right-box-button {
            background: linear-gradient(0deg, #aeaeae, #e7e7e7) !important;
            color: #fff !important;
          }
        }
        // 领取样式
        .gift-item-did {
          .left-box {
            border-radius: 8px !important;
            box-shadow: 0 0 10px #eeeb27 !important;
          }
          .right-box {
            background: url('../../assets/mk4_13.png') no-repeat !important;
            background-size: 100% !important;
          }
          .right-box-button {
            background: linear-gradient(0deg, #fff9d1, #ffffff) !important;
            color: #a9792c !important;
          }
        }
        // 未完成样式
        .gift-item {
          position: relative;
          z-index: 100;
          display: flex;
          align-items: center;
          // 左边盒子
          .left-box {
            width: 48px;
            height: 48px;
            border: 3px solid #b294ef;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            overflow: hidden;
            // 图片样式
            .img-box {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              background-color: #fff;
              .img-top {
                height: 34px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  height: 100%;
                }
                .lottie {
                  height: 100%;
                }
              }
              // 图片下方字体样式
              .text-bottom {
                font-size: 12px;

                font-weight: 500;
                color: #ffffff;
                width: 100%;
                height: 14px;
                background: #6771cb;
                text-align: center;
                line-height: 14px;
              }
            }
          }
          .task-state {
            // 中间 任务状态
            width: 36px;
            height: 39px;
            margin-left: 5px;
            > img {
              width: 100%;
            }
          }
          // 右边盒子
          .right-box {
            position: relative;
            z-index: 20;
            width: 245px;
            height: 72px;
            background: url('../../assets/mk4_14.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            > p {
              width: 145px;
              margin-left: 20px;
              margin-top: 25px;
              font-size: 13px;
              height: 56px;
              line-height: 18px;

              color: #ffffff;
              > span {
                color: #fffaa6;
              }
            }
            // 去完成
            .right-box-button {
              margin-top: 2px;
              width: 62px;
              height: 32px;
              background: linear-gradient(0deg, #cae7ff, #ffffff);
              border: 1px solid #ffffff;
              border-radius: 32px;
              text-align: center;
              line-height: 32px;

              color: #4d7ddd;
              position: absolute;
              right: 10px;
              top: 18px;
              z-index: 20;
            }
            // 领取
            .right-box-button-did {
              background: linear-gradient(0deg, #fff9d1, #ffffff) !important;
              color: #a9792c !important;
            }
            // 已领取
            .right-box-button-get {
              background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
              color: #fff !important;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}
</style>
