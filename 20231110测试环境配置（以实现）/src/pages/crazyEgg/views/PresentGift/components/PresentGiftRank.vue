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
    <div class="rank_list">
      <div
        class="rank_list_item"
        v-for="(item, index) in rankData"
        :key="index"
        :style="{ backgroundColor: index % 2 == 0 ? '#B46042' : '#d99b7c' }"
      >
        <div
          class="rank_num"
          :style="{ color: index <= 2 ? '#FFF99E' : '#fff' }"
        >
          <span v-if="index > 2">{{ index + 1 }}</span>
          <div v-else-if="index <= 2" class="rank-icon">
            <img v-if="index == 0" :src="IconPath('namb_1.png')" />
            <img v-if="index == 1" :src="IconPath('namb_2.png')" />
            <img v-if="index == 2" :src="IconPath('namb_3.png')" />
            <span>{{ index + 1 }}</span>
          </div>
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
    display: flex;
    width: 100%;
    height: 48px;
    background: #d9a384;
    color: #fffaa6;
    line-height: 48px;
    > div {
      height: 100%;
      text-align: center;
      font-size: 24px;
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
      margin-left: 50px;
    }
    // 奖励
    > div:nth-child(4) {
      margin-left: 140px;
    }
  }
  // 排行榜列表
  .rank_list {
    width: 660px;
    height: 420px;
    //padding: 0 10px;
    overflow-y: scroll;
    .rank_list_item {
      width: 100%;
      height: 70px;
      display: flex;
      //margin-top: 16px;
      align-items: center;
      > div {
        height: 100%;
        text-align: center;
        font-size: 24px;
        line-height: 70px;
        color: #fff;
      }
      // 排名
      > div:nth-child(1) {
        position: relative;
        width: 77px;
        height: 100%;
        margin: 0 6px 0 0px;

        > span {
          position: relative;
          z-index: 2;
        }
        .rank-icon {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 33px;
          z-index: 1;
          > img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
          }

          > span {
            position: relative;
            top: 4px;
            z-index: 2;
          }
        }
      }
      // 名称
      > div:nth-child(2) {
        width: 220px;
        display: flex;
        align-items: center;
        span {
          width: 100%;
          height: 100%;
          text-align: left;
          line-height: 70px;
          font-size: 24px;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
      }
      // 价值
      > div:nth-child(3) {
        width: 120px;
        line-height: 70px;
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
        margin-left: 0px;
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
}
</style>
