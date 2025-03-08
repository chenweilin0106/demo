<template>
  <div class="PresentGiftRank">
    <!-- 排行榜头部 -->
    <div class="rank_header speical_color">
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
          <p>
            <img :src="IconPath('ljs_60_60.png')" alt="" /><span
              >+{{ item.tool_nums }}</span
            >
          </p>
          <p v-if="index <= 2">
            <img :src="IconPath('mk3_16.png')" alt="" /><span
              >主页特效+3天</span
            >
          </p>
        </div>
      </div>
    </div>
    <!-- 说明文字 -->
    <div class="ThemeBox_BottomText">
      <ul>
        <li>
          <span></span>活动期间，每日<i class="speical_color"
            >赠送和获赠钻石礼物价值</i
          >最高的前
        </li>
        <li>
          10名玩家可获得排名奖励，榜单<i class="speical_color">每日重置</i
          >，奖励
        </li>
        <li>会在次日发放</li>
        <li>
          <span></span>活动期间收到钻石礼物，可获得<i class="speical_color"
            >双倍经验值和双倍</i
          >
        </li>
        <li class="speical_color"><i>基础魅力值，魅力值上限提高50%</i></li>
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
  width: 660px;
  // 排行榜头部
  .rank_header {
    width: 100%;
    height: 48px;
    // background: #1647af;
    background: #58338f;
    border-radius: 12px;
    line-height: 48px;
    display: flex;
    margin-bottom: 6px;
    > div {
      height: 100%;
      text-align: center;
      font-size: 24px;
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
    width: 660px;
    height: 380px;
    //padding: 0 10px;
    overflow-y: scroll;
    border-radius: 12px;
    .rank_list_item {
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
              margin-left: -6px;
              width: 50px;
            }
          }
          &:nth-of-type(2) {
            img {
              width: 37px;
              height: 37px;
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

    .rank_list_item:nth-of-type(1),
    .rank_list_item:nth-of-type(2),
    .rank_list_item:nth-of-type(3) {
      background: rgba(#58338f, 0.4);
      //margin-top: 0;
    }
  }
  // 说明文字
  ::v-deep .ThemeBox_BottomText {
    width: 614px;
    height: 267px;
    white-space: nowrap;
    margin-top: 30px !important;
    margin-left: -8px !important;
    li {
      line-height: 40px;
    }
    span {
      left: -16px !important;
    }
  }
}
</style>
