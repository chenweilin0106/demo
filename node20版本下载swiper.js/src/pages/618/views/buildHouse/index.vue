<template>
  <div class="buildHouse">
    <!--顶部标题-->
    <img class="title" :src="IconPath('title_5.png')" />
    <!--主体-->
    <div class="main">
      <!--刷新按钮-->
      <div class="refresh-button" @click="refresh"></div>
      <!--奖励详情按钮-->
      <div class="award_detail_button" @click="showAwardsDetailPopup = true"></div>
      <!--蛋糕列表-->
      <div class="line_list">
        <div class="current_line top_line">
          <div class="line_num_box">
            第
            <div class="num_box">{{ character_omission(pageData.server_layer, 6) }}</div>
            层
          </div>
        </div>
        <div v-for="(item, index) in pageData.special_layers" :key="index" class="current_line">
          <div class="line_num_box">
            第
            <div class="num_box">{{ character_omission(item.layer, 6) }}</div>
            层
          </div>
          <div class="user_info">
            <div class="user_avatar_box">
              <img :src="item.profile_image" @click="toUserMain(item.uid)" @error="imgAtError" />
            </div>
            <div class="user_name_box flex align-center justify-center line-height-100">
              <span class="block ellipsis">{{ item.username }}</span>
            </div>
          </div>
        </div>
        <PublicImg
          v-if="lotteryAnimateName"
          :class="'lotterySvga_' + lotteryAnimateName"
          :imgName="lotteryAnimateName"
          :loop="1"
          @animOnFinished="animOnFinished"
        />
      </div>
      <!--数据显示 抽奖按钮-->
      <div class="control_box">
        <div class="remain_times">剩余机会：{{ pageData.build_times }}</div>
        <div class="consume_masonry_num">消费钻石：{{ pageData.consume }}</div>
        <div class="add_line_buttons">
          <div class="left_button" @click="lottery(1)"></div>
          <div class="right_button" @click="lottery(2)"></div>
        </div>
        <div class="rules-text">
          <ul>
            <li><span></span>活动期间<i>每消费300钻石</i>可自动获得1次大楼建造机</li>
            <li>会，完成补给任务还能获得额外机会</li>
            <li><span></span>每次建造可获得随机奖励并冠名相应层数。若冠名</li>
            <li>层数尾数为{{ specialLayerNum }}，则普通奖励将升级为限定奖励</li>
          </ul>
        </div>
      </div>
      <!-- 建造进度 -->
      <TotalAwards v-bind="totalAwardsData" @receiveReward="receiveReward" />
      <img :src="IconPath('mk4_10.png')" class="title-3" />
      <PublicCard v-for="task in pageData.task_list" :key="task.task_id" class="taskItem">
        <!-- 任务奖励 -->
        <div class="icon-content">
          <div class="icon flex align-center justify-center">
            <img :src="IconPath('jzjh_55_63.png')" />
          </div>
          <div class="text">建造机会+{{ task.nums }}</div>
        </div>
        <div class="text-content">
          <p>{{ task.name }}</p>
          <p class="text-indent-left">（{{ task.finish }}/{{ task.max }}）</p>
        </div>
        <!-- 按钮 -->
        <PublicButton
          class="task-button"
          :hasRight="task.has_right"
          :textType="task.has_right == 0 && task.task_id == 2 ? 2 : 1"
          @click="clickTaskBtn(task)"
        />
      </PublicCard>
    </div>
    <AwardsDetailPopup v-if="showAwardsDetailPopup" @clickClose="showAwardsDetailPopup = false" />
    <BuildAwardsPopup v-if="showBuildAwardsPopup" :buildAwardsPopupData="buildAwardsPopupData" @clickClose="showBuildAwardsPopup = false" />
  </div>
</template>

<script>
import { _throttle } from '@/pages/618/utils/tool'
import { toUserMain, toChatRoom } from '@/pages/618/utils/toApp'
import getPageDataMixin from '@/pages/618/mixins/getPageDataMixin'
import { getPageData } from '@/pages/618/api/index'
import { buildHouse } from '@/pages/618/utils/pageData'
import TotalAwards from '@/pages/618/views/buildHouse/components/totalAwards.vue'
const BuildAwardsPopup = () => import('@/pages/618/views/buildHouse/components/buildAwardsPopup.vue') // 建造奖励弹框
const AwardsDetailPopup = () => import('@/pages/618/views/buildHouse/components/awardsDetailPopup.vue') // 奖励详情弹框

export default {
  name: 'buildHouse',
  components: { BuildAwardsPopup, AwardsDetailPopup, TotalAwards },
  mixins: [getPageDataMixin],
  data() {
    return {
      specialLayerNum: Object.freeze('88'),
      showBuildAwardsPopup: false,
      buildAwardsPopupData: { list: [], specialLayer: '' },
      showAwardsDetailPopup: false,
      lotteryAnimateName: '' // 动画名称 特殊楼层：20240614_m4_shichou.svga 普通楼层：20240614_m4_danchou.svga
    }
  },
  computed: {
    totalAwardsData() {
      return { tot_nums: this.pageData.tot_nums, tot_awards: this.pageData.tot_awards }
    }
  },
  async created() {
    this.pageData = buildHouse
    this.getPageData()
  },
  methods: {
    // 点击任务
    clickTaskBtn: _throttle(async function (task) {
      const isNoFinish = task.has_right == 0
      if (isNoFinish && task.task_id == 2) return toChatRoom(this.pageData.room_id)
      if (isNoFinish || task.has_right == 2) return
      const res = await getPageData({ mark: task.task_id, type: 'skyscraper_task_award' })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.pageData.build_times = res.data.build_times
      this.pageData.task_list[task.task_id - 1].has_right = 2
    }, 1000),
    // 领取建造进度奖励
    receiveReward: _throttle(async function ({ id, has_right }, index) {
      if (has_right != 1) return
      const res = await getPageData({ type: 'skyscraper_rev_tot_award', mark: id }) // mark:25/38/50.....
      if (res.errno) return this.$toast(res.errmsg)
      this.buildAwardsPopupData.list = res.data
      this.closeAllPopup()
      this.showBuildAwardsPopup = true
      this.pageData.tot_awards[index].has_right = 2
    }, 1000),
    // 立即刷新
    refresh: _throttle(async function () {
      const errno = await this.getPageData()
      if (errno == 0) this.$toast('刷新成功')
    }, 1000),
    // 抽奖动画结束
    async animOnFinished() {
      this.closeAllPopup()
      this.showBuildAwardsPopup = true
      this.islotterying = false
      this.lotteryAnimateName = ''
    },
    // 抽奖
    lottery: _throttle(async function (mark) {
      if (this.islotterying) return
      if ((mark == 1 ? 1 : 10) > Number(this.pageData.build_times)) return this.$toast('机会不足')
      this.islotterying = true
      const res = await getPageData({ type: 'skyscraper_lottery', mark }) // mark: 1 抽一次; 2 抽10次
      if (res.errno) {
        this.$toast(res.errmsg)
        this.islotterying = false
      } else {
        this.buildAwardsPopupData.list = res.data.awards
        const flag = res.data.special_layer?.toString().endsWith(this.specialLayerNum)
        this.lotteryAnimateName = flag ? '20240614_m4_shichou.svga' : '20240614_m4_danchou.svga'
        this.buildAwardsPopupData.specialLayer = flag ? res.data.special_layer : ''
        this.getPageData()
      }
    }, 1000),
    // 页面数据请求
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      this.pageData = res.data
      this.$nextTick(() => {
        const index = this.pageData.tot_awards.findIndex((item) => item.has_right == 1)
        const scrollDom = document.querySelector('.awardsList')
        if (index >= 4) scrollDom.scrollLeft = scrollDom.scrollWidth
      })
      return res.errno
    },
    closeAllPopup() {
      this.showBuildAwardsPopup = false
      this.showAwardsDetailPopup = false
    },
    // 内容过长时，显示省略号
    character_omission(text, length) {
      const Text = text.toString()
      return Text.length > length ? Text.substring(0, length) + '...' : Text
    },
    toUserMain,
    imgAtError(event) {
      event.currentTarget.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/pages/618/styles/mixins';
.buildHouse {
  position: relative;
  width: 738px;
  height: 3143px;
  margin: 0 auto;
  @include bgi('mk4_2.png');
  .title {
    position: absolute;
    z-index: 2;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 50px;
  }
  .main {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 385px;
    //刷新按钮
    .refresh-button {
      position: absolute;
      z-index: 1;
      top: 1151px;
      right: 11px;
      @include bgi('mk4_3.png');
      width: 82px;
      height: 132px;
    }
    // 奖励明细弹框按钮
    .award_detail_button {
      position: absolute;
      top: 202px;
      right: 10px;
      width: 139px;
      height: 164px;
      @include bgi('mk4_1.png');
    }
    // 层数列表
    .line_list {
      position: relative;
      margin: 0 auto;
      width: 700px;
      height: fit-content;
      //overflow: hidden;
      .lotterySvga {
        position: absolute;
        z-index: 5;
        left: 50%;
        transform: translateX(-50%);
      }
      .lotterySvga_20240614_m4_danchou\.svga {
        @extend .lotterySvga;
        width: 750px;
        height: 1030px;
        bottom: -140px;
      }
      .lotterySvga_20240614_m4_shichou\.svga {
        @extend .lotterySvga;
        width: 750px;
        height: 1280px;
        bottom: -100px;
      }
      .current_line,
      .top_line {
        position: relative;
        //z-index: 2;
        display: flex;
        //margin-bottom: -2px;
        margin-bottom: 26px;

        .line_num_box {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 179px;
          width: fit-content;
          height: 60px;
          padding: 0 13px;
          background: #be7a37;
          border: 3px solid #f1cc7d;
          border-radius: 0 27px 27px 0;
          font-size: 26px;
          color: #ffffff;

          margin-right: 77px;

          .num_box {
            min-width: 95px;
            width: fit-content;
            white-space: nowrap;
            text-align: center;
            color: #fff47d;
          }
        }

        .user_info {
          display: flex;
          align-items: center;
          flex-direction: column;

          .user_avatar_box {
            position: relative;
            z-index: 1;
            width: 118px;
            height: 118px;
            background: #f8d064;
            padding: 4px;
            border-radius: 50%;

            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }

          .user_name_box {
            position: relative;
            margin-top: -15px;
            z-index: 2;
            width: 188px;
            height: 46px;
            border: 4px solid #f8d064;
            border-radius: 23px;
            background-color: #844e27;
            font-weight: 500;
            font-size: 22px;
          }
        }
      }
      .top_line {
        margin: 0 0 43px;

        .line_num_box {
          margin: 0;
          border-color: #fff;
          background: linear-gradient(-90deg, #ff8b24, #e9452f);
        }
      }
      .current_line {
        &:nth-child(2) {
          .line_num_box {
            margin-top: 82px;
          }
        }
        &:nth-child(3) {
          .line_num_box {
            margin-top: 64px;
          }
        }
        &:nth-child(4) {
          .line_num_box {
            margin-top: 64px;
          }
        }
        &:nth-child(5) {
          .line_num_box {
            margin-top: 26px;
          }
        }
        &:nth-child(6) {
          .line_num_box {
            margin-top: 7px;
          }
        }
        &:nth-child(7) {
          .line_num_box {
            margin-top: -11px;
          }
        }
      }
    }
    .control_box {
      position: relative;
      margin-left: 17px;
      width: 700px;
      overflow: hidden;
      .info {
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 215px;
        width: fit-content;
        padding: 0 20px;
        height: 48px;
        background: #ed9139;
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
      }
      // 剩余次数
      .remain_times {
        @extend .info;
        border-radius: 0 24px 24px 0;
      }

      // 消费钻石
      .consume_masonry_num {
        @extend .info;
        right: 0;
        border-radius: 24px 0 0 24px;
      }

      // 叠1层按钮和叠10层按钮
      .add_line_buttons {
        margin-top: 66px;
        width: 100%;
        padding: 0 110px;
        display: flex;
        justify-content: space-between;
        .lotteryButton {
          width: 186px;
          height: 179px;
        }
        .left_button {
          @extend .lotteryButton;
          @include bgi('mk4_4.png');
        }

        .right_button {
          @extend .lotteryButton;
          @include bgi('mk4_5.png');
        }
      }
    }
    .titleIcon {
      display: block;
      margin: 0 auto 20px;
      width: 600px;
      height: 33px;
    }
    .title-3 {
      margin-top: 46px;
      @extend .titleIcon;
    }
    .taskItem {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 auto 19px;
      width: 660px;
      height: 137px;
      border-radius: 20px;
      $borderWidth: 4px;
      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 128px + $borderWidth * 2;
        height: 100px + $borderWidth * 2;
        padding: $borderWidth;
        margin: 0 21px - $borderWidth 0 26px - $borderWidth;
        border-radius: 16px;
        background-color: #fbe590;
        .icon {
          width: 100%;
          height: 68px;
          border-radius: 12px 12px 0 0;
          background-color: #fff;
          // 图片大小
          > img {
            width: 55px;
            height: 63px;
          }
        }
        .text {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 0 12px 12px;
          font-size: 24px;
          white-space: nowrap;
          line-height: 100%;
          background-color: #aa673a;
          color: #fff;
        }
      }
      .text-content {
        height: 100%;
        line-height: 100%;
        p {
          font-size: 28px;
          span {
            font-size: 24px;
          }
        }
        p:nth-child(1) {
          margin-top: 31px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 24px;
          color: #ffef85;
          margin-top: 20px;
        }
        .recharge_10 {
          margin-left: 12px;
        }
      }
      // 右侧按钮
      .task-button {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 120px;
        height: 60px;
      }
    }
  }
}
</style>
