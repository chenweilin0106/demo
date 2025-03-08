<template>
  <div class="PresentGiftRank">
    <!-- 排行榜头部 -->
    <div class="rank_header">
      <div>排名</div>
      <div>名字</div>
      <div>价值(钻)</div>
      <div>奖励</div>
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
    <div class="rank_text">
      <ul>
        <li>
          <i></i>活动期间，每日<span class="speical_color"
            >赠送和获赠钻石礼物价值</span
          >最高的前 10名玩家可获得排名奖励，榜单<span class="speical_color"
            >每日重置</span
          >，奖励会在次日发放
        </li>
        <li>
          <i></i>活动期间收到钻石礼物，可获得<span class="speical_color"
            >双倍经验值和双倍基础魅力值，魅力值上限提高50%</span
          >
        </li>
        <li><i></i>每个ID只能获得一个榜单的排名奖励，按最大名次派发</li>
        <li>
          <i></i>当送出钻石礼物为盲盒礼物时，赠送榜数据以<span
            class="speical_color"
            >盲盒本身</span
          >的钻石价值计算，获赠榜数据以盲盒<span class="speical_color"
            >拆出礼物</span
          >的钻石价值计算
        </li>
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
  width: 330px;
  // 排行榜头部
  .rank_header {
    width: 100%;
    height: 24px;
    background: #1647af;
    border-radius: 6px;
    line-height: 24px;
    display: flex;
    margin-bottom: 3px;
    > div {
      color: #fff99e;
      height: 100%;
      text-align: center;
      font-size: 12px;
    }
    // 排名
    > div:nth-child(1) {
      width: 40px;
    }
    // 名称
    > div:nth-child(2) {
      width: 85px;
    }
    // 价值
    > div:nth-child(3) {
      margin-left: 22px;
    }
    // 奖励
    > div:nth-child(4) {
      margin-left: 55px;
    }
  }
  // 排行榜列表
  .rank_list {
    width: 330px;
    height: 190px;
    padding: 0 5px;
    overflow-y: scroll;
    // background: linear-gradient(90deg, #f2a653, #fe7043);
    // box-shadow: 0px 3px 0px 0px #ffebdc;
    .rank_list_item {
      width: 100%;
      display: flex;
      margin-top: 8px;
      align-items: center;
      > div {
        height: 100%;
        text-align: center;
        font-size: 12px;
        line-height: 13px;
        color: #fff;
      }
      // 排名
      > div:nth-child(1) {
        width: 20px;
        height: 100%;
        margin: 0 3px 0 0px;
      }
      // 名称
      > div:nth-child(2) {
        width: 105px;
        display: flex;
        align-items: center;
        span {
          width: 100%;
          height: 100%;
          text-align: left;
          line-height: 24px;
          font-size: 12px;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
      }
      // 价值
      > div:nth-child(3) {
        width: 60px;
        line-height: 24px;
        height: 100%;
      }
      // 奖励
      > div:nth-child(4) {
        margin-left: 25px;
      }
      // 奖励图标
      .rank_reward {
        justify-content: flex-start;
        > span {
          height: 100%;
        }
        img {
          // margin-right: 5px;
          width: 24px;
        }
      }
      .rank_user {
        margin-left: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-right: 5px;
          width: 18px;
          border-radius: 50%;
        }
      }
    }
  }
  // 说明文字
  .rank_text {
    margin-top: 15px;
    color: #fff;
    line-height: 20px;
    margin-left: 10px;
    li {
      position: relative;
      padding-left: 8px;
      padding-right: 4px;
      box-sizing: border-box;
      .speical_color {
        color: #fffaa6 !important;
      }
    }
    i {
      position: absolute;
      top: 8px;
      left: -5px;
      display: block;
      width: 6px;
      height: 6px;
      background: #fffaa6;
      border-radius: 50%;
    }
  }
}
</style>
