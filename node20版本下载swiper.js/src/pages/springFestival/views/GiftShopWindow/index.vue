<template>
  <div class="GiftShopWindow">
    <!-- 礼物橱窗 -->
    <out-box class="gift-shop">
      <div class="top-tip flex-center">
        <p>新春礼物上新啦!</p>
        <p>点亮礼物墙，记录美好回忆~</p>
      </div>

      <!-- 列表 -->
      <div class="list flex-center">
        <div v-for="(item, index) in giftList" :key="index" class="gift">
          <div class="gift-inner">
            <div class="top-label flex-center">{{ item.labelText }}</div>
            <div class="icon-content">
              <div class="gift-date">{{ item.date }}</div>
              <img
                v-if="item.icon"
                :src="IconPath(item.icon)"
                class="gift-icon"
              />
              <div v-if="item.giftLabel" class="gift-label flex-center">
                新春
              </div>
              <img v-else :src="IconPath('mk7_2.png')" class="voice-label" />
            </div>
            <div class="gift-name">{{ item.name }}</div>
            <div class="gift-price flex-center">
              {{ item.price
              }}<img :src="IconPath('zs_31_23.png')" class="diamond" />
            </div>
          </div>
        </div>
      </div>
    </out-box>

    <!-- 每日任务 -->
    <out-box class="daily-task" title="title_7.png">
      <daily-task
        v-for="(item, index) in pageData.task_list"
        :key="index"
        :task="item"
        @handleDailyTask="receiveTaskReward"
      />
      <div class="rule-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
        </ul>
      </div>
    </out-box>
  </div>
</template>

<script>
import { giftShopWindow } from '@/pages/springFestival/utils/pageData'
import { getPageData } from '@/pages/springFestival/api/index'

// const DailyTask = () => import('./components/daily-task')
import DailyTask from './components/daily-task'

export default {
  name: 'GiftShopWindow',
  components: {
    DailyTask
  },
  data() {
    return {
      giftList: Object.freeze([
        {
          labelText: '礼物橱窗',
          date: '02.07',
          icon: 'xsl_120_120.png',
          giftLabel: '新春',
          name: '小神龙',
          price: '299'
        },
        {
          labelText: '礼物橱窗',
          date: '02.07',
          icon: 'cjyx_120_120.png',
          giftLabel: '新春',
          name: '辞旧迎新',
          price: '888'
        },
        {
          labelText: '新春冲榜',
          date: '02.07',
          icon: 'csd_120_120.png',
          giftLabel: '',
          name: '财神到',
          price: '3888'
        },
        {
          labelText: '礼物面板',
          date: '02.08',
          icon: 'fdl_120_120.png',
          giftLabel: '新春',
          name: '福到了',
          price: '99'
        },
        {
          labelText: '礼物面板',
          date: '02.09',
          icon: 'nxsj_120_120.png',
          giftLabel: '新春',
          name: '暖心水饺',
          price: '128'
        },
        {
          labelText: '礼物面板',
          date: '02.10',
          icon: '2024_120_120.png',
          giftLabel: '新春',
          name: '2024年',
          price: '128'
        }
      ])
    }
  },
  computed: {},
  created() {
    this.pageData = giftShopWindow
    this.getPageData({ type: 'tab', mark: 'm7' })
  },
  methods: {
    /**
     * 领取每日任务奖励
     * 发送请求 const res = await this.receiveTaskRewardApi()
     * 请求异常 return this.$toast(res.errmsg)
     * 请求正常 this.$toast(res.errmsg)
     * 数据更新
     * 任务状态更新
     */
    async receiveTaskReward({ task_id, has_right }) {
      if (has_right == 1) {
        const res = await getPageData({
          type: 'present_wd_task_rev',
          mark: task_id
        })
        this.$toast(res.errmsg)
        if (res.errno == 0) {
          this.pageData.task_list.find(
            (item) => item.task_id == task_id
          ).has_right = 2
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.GiftShopWindow {
  position: relative;
  z-index: 5;

  .gift-shop {
    margin-top: -107px;
    margin-bottom: 145px;
    width: 710px;
    height: 790px;
    padding-top: 34px;

    .top-tip {
      flex-direction: column;
      margin: 0 auto 37px;
      width: fit-content;
      font-size: 28px;
      color: #ab5e1a;
      line-height: 40px;
    }

    .list {
      flex-wrap: wrap;

      .gift {
        flex-shrink: 0;
        margin-left: 25px;
        margin-bottom: 31px;
        width: 194px;
        height: 275px;
        padding: 4px;
        background: linear-gradient(0deg, #e5b134, #f9d761);
        border-radius: 24px;

        .gift-inner {
          position: relative;
          width: 100%;
          height: 100%;
          padding-top: 10px;
          background: linear-gradient(180deg, #fff1bb, #ffe690);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .top-label {
            position: absolute;
            z-index: 2;
            top: -19px;
            left: 50%;
            transform: translateX(-50%);
            width: 172px;
            height: 44px;
            white-space: nowrap;
            font-size: 22px;
            color: #ffffff;
            background: url('@/pages/springFestival/assets/mk7_1.png') no-repeat
              left top/100% 100%;
          }

          .icon-content {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            width: 161px;
            height: 161px;
            background: linear-gradient(180deg, #ea6243, #f9bb4f);
            border-radius: 20px;

            .gift-date {
              width: 100%;
              height: 40px;
              background: rgba(209, 70, 11, 0.8);
              border-radius: 20px 20px 0px 0px;
              font-size: 21px;
              color: #ffe777;
              text-align: center;
              padding-top: 16px;
            }

            .gift-icon {
              height: 121px;
            }

            .gift-label {
              position: absolute;
              bottom: 0;
              right: 2px;
              width: 64px;
              height: 30px;
              background: linear-gradient(90deg, #f86626, #ea3b24);
              border-radius: 13px;
              white-space: nowrap;
              font-size: 21px;
              color: #ffffff;
            }

            .voice-label {
              position: absolute;
              bottom: -21px;
              right: -18px;
              width: 99px;
              height: 71px;
            }
          }

          .gift-name {
            width: fit-content;
            margin: 11px 0 10px;
            font-size: 26px;
            font-weight: 700;
            color: #ab5e1a;
            white-space: nowrap;
            text-align: center;
          }

          .gift-price {
            margin: 0 auto;
            width: 133px;
            height: 39px;
            background: #ffffff;
            border-radius: 20px;
            white-space: nowrap;
            font-size: 25px;
            font-weight: 700;
            color: #ea5d24;

            .diamond {
              margin-left: 2px;
              width: 31px;
              height: 23px;
            }
          }
        }

        &:nth-of-type(1),
        &:nth-of-type(4) {
          margin-left: 0;
        }
      }
    }
  }

  .daily-task {
    width: 710px;
    height: 543px;
    padding-top: 65px;

    .rule-text {
      margin-left: 60px;

      li {
        line-height: 40px;
      }
    }
  }
}
</style>
