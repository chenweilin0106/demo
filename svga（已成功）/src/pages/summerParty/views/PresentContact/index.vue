<template>
  <div class="PresentContact">
    <ThemeBox class="Robbery">
      <div class="RobberyList">
        <div
          class="listItem bgc_horizontal"
          v-for="award in pageData.award_list"
          :key="award.key"
        >
          <div class="award img-box theme_item">
            <div class="img-top">
              <img v-if="award.icon" :src="IconPath(award.icon)" alt="" />
            </div>
            <div class="bottom img-bottom">+{{ award.text }}</div>
          </div>
          <div class="center">
            <div class="whiteword">累计打劫礼物价值达到</div>
            <div class="yellowWord speical_color">
              {{ award.max_nums }}钻
              <span class="num_box"
                >（{{ award.finish_nums }}/{{ award.max_nums }}）</span
              >
            </div>
          </div>
          <div
            class="rightBtn theme_botton_undid flex_across"
            :class="ButtonStyle('GoodsTask', award.has_right)"
            @click="getRob(award.has_right, award.key)"
          >
            {{ ButtonText('GoodsTask', award.has_right) }}
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>活动期间“打劫”钻石礼物可获得对应奖励</li>
          <li><span></span>向自己赠送钻石礼物不计入在内</li>
        </ul>
      </div>
    </ThemeBox>
    <!-- 累计消费返利 -->
    <CumulativeSpend
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <!-- 恭喜获得小窗口 -->
    <ThemeDialog
      :isSmall="true"
      :isShow="showDialog"
      dialogMark="DialogCongrats"
      :titleIconObj="{ DialogCongrats: 'title_5.png' }"
      @closeDialog="closeDialog"
    >
      <DialogCongrats
        :awardData="dialogData.award"
        btnText="我知道了"
        @onCongratsBtn="showDialog = false"
        :awardName="`+${dialogData?.award?.text}`"
        :isMultiple="false"
      >
      </DialogCongrats>
    </ThemeDialog>
  </div>
</template>

<script>
// 累计消费返利列表组件
import CumulativeSpend from './components/CumulativeSpend'
// 恭喜获得组件
import DialogCongrats from '../../components/Dialog/DialogCongrats'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 导入请求
import { getPageData } from '../../api'
// 导入默认数据
import { presentContact } from '../../utils/pageData'
export default {
  // 奖励兑换
  name: 'PresentContact',
  props: {},
  components: {
    ThemeDialog,
    DialogCongrats,
    CumulativeSpend
  },
  data() {
    return {
      showDialog: false,
      // 页面渲染数据
      pageData: {},
      dialogData: {}
    }
  },
  computed: {
    // 累计消费返利
    consume_status() {
      return this.pageData.consume_status
    }
  },
  async created() {
    this.pageData = presentContact
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm3' })
  },
  methods: {
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.consumeAwardApi(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
    // 领取打劫奖励
    async getRob(has_right, mark) {
      // 按钮为领取状态
      if (has_right != 1) return
      const res = await this.getRobApi(mark)
      if (res.errno) return this.$toast(res.errmsg)
      this.dialogData = res.data
      this.showDialog = true
      // 更新打劫奖励数据
      this.pageData.award_list.find(
        (item) => item.max_nums == res.data.award.max_nums
      ).has_right = 2
    },
    // 关闭弹框后执行
    async closeDialog() {
      // 关闭弹框
      this.showDialog = false
      this.dialogData = {}
    },
    // 累积消费返利列表领取接口
    async consumeAwardApi(mark) {
      return await getPageData({
        type: 'consume_reward',
        mark
      })
    },
    // 领取打劫奖励接口
    async getRobApi(mark) {
      return await getPageData({
        mark,
        type: 'present_contact_rev'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.PresentContact {
  display: flex;
  flex-direction: column;
  align-items: center;
  .Robbery {
    margin-bottom: 0px;
    .RobberyList {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .listItem {
        width: 330px;
        height: 66px;
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        position: relative;

        .resetTitle {
          width: 61px;
          height: 34px;
          position: absolute;
          top: 0;
          right: 0;
        }

        .award {
          margin-left: 7px;
          margin-top: 7px;
          width: 54px;
          height: 54px;
          background: #ffffff;
          border-radius: 6px;

          // 奖励项图片样式
          .img-top {
            position: relative;
            width: 100%;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              height: 100%;
            }
          }

          .bottom {
            font-size: 12px;
            color: #ffffff;
            // border-radius: 0 0 4px 5px;
            // height: 12px;
          }
        }

        .award:nth-child(2) {
          margin-left: 5px;
        }

        .center {
          height: 41px;
          font-size: 15px;
          color: #ffffff;
          margin-left: 9px;
          margin-top: 13px;
          margin-right: 30px;

          .yellowWord {
            display: flex;
            margin-top: 8px;
            .num_box {
              margin-left: -5px;
            }
          }
        }

        .rightBtn {
          position: absolute;
          right: 12px;
          top: 20px;
          width: 62px;
          height: 32px;
          border-radius: 15px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
