<template>
  <div class="returnCourteous-page">
    <!-- 奖励列表 -->
    <div class="depositRebate-bottom-body">
      <czItem
        v-for="(value, key) in recharge_status"
        :key="key"
        :itemValue="value"
        @getAward="clickGetAward"
        @toRecharge="$emit('toRecharge')"
      ></czItem>
      <!-- 最后一项奖励 -->
      <div class="last-item-box">
        <div class="bottom-item-left">
          <p>
            <span>累计</span>充值满<span
              >{{ recharge_status[5000]?.condition }}元 ({{
                recharge_status[5000]?.recharge_nums
              }}/{{ recharge_status[5000]?.condition }})</span
            >
          </p>
          <div class="gift-box">
            <template v-for="item in recharge_status[5000]?.awards">
              <div
                class="gift-item"
                :key="item.name"
                v-if="!(item.name === '威望值')"
              >
                <div class="img-box">
                  <div class="img-top">
                    <img
                      v-if="item.icon"
                      :src="require('../../../../assets/' + item.icon)"
                      alt=""
                    />
                  </div>
                  <div class="text-bottom">+{{ item?.text }}</div>
                </div>
              </div>
            </template>
          </div>
          <p>{{ recharge_status[5000]?.awards[3]?.text }}</p>
        </div>
        <div
          class="bottom-item-button"
          @click="
            clickGetAward(
              recharge_status[5000].condition,
              recharge_status[5000].has_right
            )
          "
          :class="{
            'bottom-item-button-did': recharge_status[5000]?.has_right == 2,
            'bottom-item-button-unDid': recharge_status[5000]?.has_right == 0
          }"
        >
          {{
            recharge_status[5000]?.has_right === 0
              ? '去完成'
              : recharge_status[5000]?.has_right === 1
              ? '领取'
              : recharge_status[5000]?.has_right === 2
              ? '已领取'
              : ''
          }}
        </div>
        <img
          v-if="recharge_status[5000]?.is_daily"
          src="../../../../assets/mk2_4.png"
          alt=""
          class="reset"
        />
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="bottom-text">
      <ul>
        <li>
          <span></span>购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import czItem from '../../components/czItem.vue'
import { getDepositRebateData } from '../../../../api/depositRebate'
export default {
  // 累计充值返利
  name: 'returnCourteous',
  components: {
    czItem
  },
  props: {
    recharge_status: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 领取接口封装
    async getAward(mark) {
      const res = await getDepositRebateData({
        type: 'recharge_reward',
        mark
      })
      return res
    },
    // 点击领取
    async clickGetAward(mark, flag) {
      if (mark === 5000) {
        if (flag === 0) {
          this.$emit('toRecharge')
        } else if (flag === 1) {
          const res = await this.getAward(mark)
          this.$toast(res.errmsg)
          this.$emit('getData')
          return
        }
      }
      const res = await this.getAward(mark)
      this.$toast(res.errmsg)
      this.$emit('getData')
    }
  }
}
</script>

<style scoped lang="scss">
.returnCourteous-page {
  .depositRebate-bottom-body {
    padding-left: 9px;
    // 最后一项
    .last-item-box {
      width: 332px;
      background: linear-gradient(-90deg, #caa7ff, #8d8ff9);
      box-shadow: 0px 3px 0px 0px #ffffff;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 10px;
      // 每日重置
      .reset {
        position: absolute;
        width: 61px;
        height: 34px;
        top: 0;
        right: 0;
      }
      // 左边盒子
      .bottom-item-left {
        margin-left: 11px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        p {
          padding: 6px 0;
          font-size: 15px;
          color: #fff;
          span {
            color: #fffaa6;
          }
        }
        p:nth-child(3) {
          font-size: 12px;
          color: #fffaa6;
          margin: 10px 0;
        }
        .gift-box {
          display: flex;
          .gift-item {
            width: 62px;
            border: 2px solid #d5c2ff;
            border-radius: 6px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin-right: 5px;
            overflow: hidden;
            background-color: #fff;
            // 图片样式
            .img-box {
              height: 60px;
              display: flex;
              flex-direction: column;
              .img-top {
                height: 45px;
                background: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  height: 100%;
                }
              }
              // 图片下方字体样式
              .text-bottom {
                text-align: center;
                font-size: 12px;
                font-weight: 500;
                color: #ffffff;
                width: 100%;
                height: 15px;
                line-height: 15px;
                background: #6771cb;
                border-radius: 0 0 4px 4px;
              }
            }
          }
          .gift-item:nth-child(3) {
            width: 82px;
            .img-box {
              .img-top {
                img {
                  height: 80%;
                }
              }
            }
          }
        }
      }
      // 按钮
      // 领取
      .bottom-item-button {
        position: absolute;
        top: 59px;
        right: 12px;
        width: 62px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border-radius: 32px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;

        color: #a9792c;
      }
      // 已领取
      .bottom-item-button-did {
        background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
        color: #fff !important;
      }
      // 去完成
      .bottom-item-button-unDid {
        background: linear-gradient(0deg, #cae7ff, #ffffff) !important;
        color: #4d7ddd !important;
      }
    }
  }
  // 底部文字
  .bottom-text {
    margin-left: 25px;
    margin-right: 10px;
    color: #595ec3;
    margin-top: 5px;
    margin-bottom: 8px;
    line-height: 25px;
    li {
      position: relative;
      line-height: 25px;
      span {
        position: absolute;
        top: 10px;
        left: -10px;
        display: block;
        width: 6px;
        height: 6px;
        background: #fb8fcc;
        border-radius: 50%;
        margin-right: 5px;
      }
      list-style-type: none;
    }
  }
}
</style>
