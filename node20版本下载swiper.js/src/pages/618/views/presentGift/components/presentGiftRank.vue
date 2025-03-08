<template>
  <OutBox class="PresentGiftRank position-relative" :hasCostume="true">
    <div class="rank-tabs">
      <div
        v-for="item in rankText"
        :key="item"
        :class="['tab flex align-center justify-center', rankMark == item && 'tab-active']"
        @click="rankMark = item"
      >
        {{ item }}
      </div>
    </div>
    <div class="tabs_contain">
      <!-- 我的道具数量 -->
      <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ rankData.userPresent }}钻</div>
      <!-- 排行榜头部 -->
      <div class="rank_header">
        <div class="flex align-center justify-center">排名</div>
        <div class="flex align-center justify-center">名字</div>
        <div class="flex align-center justify-center">价值(钻)</div>
        <div class="flex align-center justify-center">奖励</div>
      </div>
      <!-- 排行榜列表 -->
      <div class="rank_list">
        <div class="inner w-100 h-100">
          <div class="rank_list_item" v-for="(item, index) in rankData.rankList" :key="index">
            <div class="rank_num" :style="{ color: index <= 2 ? '#FFF99E' : '#fff' }">
              {{ index + 1 }}
            </div>
            <!-- 用户头像 -->
            <div class="rank_user">
              <img :src="item.profile_image" alt="" @click="handleToUser(item.uid)" @error="imgAtError" />
              <!-- 跳转用户主页 -->
              <span @click="handleToUser(item.uid)">{{ item.username }}</span>
            </div>
            <!-- 用户道具数量 -->
            <div class="text_overHidden rank_price">{{ item.time }}</div>
            <!-- 排行奖励 -->
            <div class="rank_reward">
              <p class="text-nowrap">
                <img :src="IconPath('ljs_60_60.png')" alt="" /><span>+{{ item.tool_nums }}</span>
              </p>
              <!--前三名特殊奖励-->
              <!--<p v-if="index <= 2" class="text-nowrap">-->
              <!--  <img :src="IconPath('mk3_16.png')" alt="" /><span>气泡+{{ 5 - index * 2 }}天</span>-->
              <!--</p>-->
            </div>
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间，每日<i>赠送和获赠钻石礼物价值</i>最高的前</li>
          <li>10名玩家可获得排名奖励，榜单<i>每日重置</i>，奖励会</li>
          <li>在次日发放</li>
          <li><span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i></li>
          <li><i>基础魅力值，魅力值上限提高50%</i></li>
          <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
          <li>派发</li>
        </ul>
      </div>
    </div>
  </OutBox>
</template>

<script>
// 跳转用户主页APP函数
import { toUserMain } from '../../../utils/toApp'
export default {
  name: 'PresentGiftRank',
  props: ['my_present', 'my_send_present', 'present_top', 'send_present_top'],
  data() {
    return {
      rankText: ['赠送榜', '获赠榜'],
      rankMark: '赠送榜'
    }
  },
  computed: {
    // 排行榜数据
    rankData() {
      return {
        rankList: this.rankMark === '赠送榜' ? this.send_present_top : this.present_top,
        userPresent: this.rankMark === '赠送榜' ? this.my_send_present : this.my_present
      }
    }
  },
  methods: {
    /**
     * 头像图片裂开执行
     */
    imgAtError(event) {
      event.currentTarget.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
    },
    // 跳转用户主页
    handleToUser(uid) {
      toUserMain(uid)
    }
  }
}
</script>

<style scoped lang="scss">
.PresentGiftRank {
  margin: 0 auto;
  padding-top: 133px;
  .rank-tabs {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0 0 15px;
    .tab {
      position: relative;
      width: 347px;
      height: 71px;
      background: #aa673a;
      font-size: 32px;
      color: #ffcc89;
      align-items: flex-start;
      line-height: 71px;
    }
    // 底部tab栏活动
    .tab-active {
      font-size: 40px;
      color: #ffffff;
      font-weight: bold;
      width: 347px;
      height: 91px;
      background: url('@/pages/618/assets/mk3_13.png') no-repeat left top/100% 100%;
      line-height: 0;
      padding-top: 40px;
    }
  }
  .tabs_contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    // 我的道具数量
    .top_my_goods {
      width: 100%;
      font-size: 28px;
      color: #aa673a;
      text-align: center;
      margin-bottom: 18px;
    }
    // 排行榜头部
    .rank_header {
      line-height: 24px;
      display: flex;
      margin: 0 auto 6px;
      width: 660px;
      height: 48px;
      background: #aa673a;
      border-radius: 12px;
      > div {
        height: 100%;
        font-size: 24px;
        color: #fffaa6;
      }
      // 排名
      > div:nth-child(1) {
        width: 100px;
      }
      // 名称
      > div:nth-child(2) {
        width: 170px;
      }
      // 价值
      > div:nth-child(3) {
        margin-left: 44px;
      }
      // 奖励
      > div:nth-child(4) {
        margin-left: 140px;
      }
    }
    // 排行榜列表
    .rank_list {
      width: 660px;
      height: 380px;
      padding: 4px;
      border-radius: 12px;
      margin: 0 auto 30px;
      .inner {
        background: linear-gradient(-90deg, #dfb65d, #d79c48, #b67a4e);
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 12px;
      }
      .rank_list_item {
        margin: 5px 0; // 前三名特殊奖励时关闭
        width: 100%;
        display: flex;
        padding: 4px 0;
        align-items: center;
        white-space: nowrap;
        > div {
          height: 100%;
          text-align: center;
          font-size: 24px;
          line-height: 26px;
          color: #fff;
        }
        // 排名
        > div:nth-child(1) {
          width: 40px;
          height: 100%;
          margin: 0 6px 0 10px;
        }
        // 名称
        > div:nth-child(2) {
          width: 210px;
          display: flex;
          align-items: center;
          span {
            width: 100%;
            height: 100%;
            text-align: left;
            line-height: 48px;
            font-size: 24px;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }
        }
        // 价值
        > div:nth-child(3) {
          width: 120px;
          line-height: 48px;
          height: 100%;
        }
        // 奖励
        > div:nth-child(4) {
          margin-right: 10px;
          margin-left: 60px;
        }
        // 奖励图标
        .rank_reward {
          > p {
            display: flex;
            align-items: center;
            white-space: nowrap;
            > span {
              height: 100%;
            }
            &:nth-of-type(1) {
              img {
                //margin-left: -6px;
                width: 50px;
              }
            }
            &:nth-of-type(2) {
              img {
                width: 69px;
                height: 42px;
                margin-right: 5px;
              }
            }
          }
        }
        .rank_user {
          margin-left: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-right: 10px;
            width: 36px;
            border-radius: 50%;
          }
        }
      }

      // 前三名特殊奖励打开
      //.rank_list_item:nth-of-type(1),
      //.rank_list_item:nth-of-type(2),
      //.rank_list_item:nth-of-type(3) {
      //  background: #daab44;
      //}
    }
  }
}
</style>
