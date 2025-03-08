<template>
  <div class="PresentGiftRank">
    <!-- 排行榜头部 -->
    <div class="rank_header">
      <div class="flex-center">排名</div>
      <div class="flex-center">名字</div>
      <div class="flex-center">价值(钻)</div>
      <div class="flex-center">奖励</div>
    </div>
    <!-- 排行榜列表 -->
    <div class="bgc_horizontal rank_list">
      <div
        class="rank_list_item"
        v-for="(item, index) in rankData"
        :key="index"
      >
        <div
          class="rank_num"
          :style="{ color: index <= 2 ? '#FFF99E' : '#fff' }"
        >
          {{ index + 1 }}
        </div>
        <!-- 用户头像 -->
        <div class="rank_user">
          <img
            :src="item.profile_image"
            alt=""
            @click="handleToUser(item.uid)"
          />
          <!-- 跳转用户主页 -->
          <span @click="handleToUser(item.uid)">{{ item.username }}</span>
        </div>
        <!-- 用户道具数量 -->
        <div class="text_overHidden rank_price">{{ item.time }}</div>
        <!-- 排行奖励 -->
        <div class="rank_reward">
          <img :src="IconPath('ljs_60_60.png')" alt="" /><span
            >+{{ item.tool_nums }}</span
          >
        </div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li>
          <span></span>活动期间，每日<i>赠送和获赠钻石礼物价值</i>最高的前
        </li>
        <li>10名玩家可获得排名奖励，榜单<i>每日重置</i>，奖励会</li>
        <li>在次日发放</li>
        <li>
          <span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i>
        </li>
        <li><i>基础魅力值，魅力值上限提高50%</i></li>
        <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
        <li>派发</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 跳转用户主页APP函数
import { toUserMain } from '../../../utils/toApp'
export default {
  name: 'PresentGiftRank',
  components: {},
  props: {
    // 榜单数据
    rankData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 跳转用户主页
    handleToUser(uid) {
      toUserMain(uid)
    }
  }
}
</script>

<style scoped lang="scss">
.PresentGiftRank {
  width: 100%;
  // 排行榜头部
  .rank_header {
    width: 660px;
    height: 48px;
    line-height: 24px;
    display: flex;
    margin: 0 auto 6px;
    background: linear-gradient(0deg, #083c6e, #3e41a5);
    border-radius: 12px 12px 0px 0px;
    box-shadow: inset 0 0 5px 3px #fff;
    > div {
      height: 100%;
      font-size: 24px;
      color: #fffaa6;
    }
    // 排名
    > div:nth-child(1) {
      width: 80px;
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
    width: 672px;
    height: 380px;
    margin: 0 auto 26px;
    padding: 0 10px;
    overflow-y: scroll;
    background: url('@/pages/sparParty/assets/mk3_2.png') no-repeat left
      top/100% 100%;
    .rank_list_item {
      width: 100%;
      display: flex;
      margin-top: 16px;
      align-items: center;
      > div {
        height: 100%;
        text-align: center;
        font-size: 24px;
        line-height: 26px;
        color: #fff;
      }
      // 排名
      > div:nth-child(1) {
        width: 70px;
        height: 100%;
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
        margin-left: 76px;
      }
      // 奖励图标
      .rank_reward {
        justify-content: flex-start;
        > span {
          height: 100%;
        }
        img {
          // margin-right: 5px;
          width: 48px;
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
  }
  // 说明文字
  .rule-text {
    width: 615px;
    height: 267px;
    line-height: 40px;
    margin-left: 66px;
    i {
      color: #6fffff;
    }
  }
}
</style>
