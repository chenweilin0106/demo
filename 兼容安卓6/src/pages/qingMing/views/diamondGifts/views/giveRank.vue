<template>
  <div class="giveRank">
    <div class="top_my_goods">我赠送的钻石礼物：{{ my_send_present }}钻</div>
    <div class="rank_box">
      <!-- 排行榜头部 -->
      <div class="rank_header">
        <div>排名</div>
        <div>名字</div>
        <div>价值(钻)</div>
        <div>奖励</div>
      </div>
      <!-- 排行榜 -->
      <div class="rank_list">
        <div
          class="rank_list_item"
          v-for="(item, index) in send_present_top"
          :key="index"
        >
          <div
            class="rank_num"
            :style="{ color: index <= 2 ? '#FFF99E' : '#fff' }"
          >
            {{ index + 1 }}
          </div>
          <div class="rank_user">
            <img
              v-if="item.profile_image.includes('http')"
              :src="item.profile_image"
              alt=""
              @click="toUserMain(item.uid)"
            />
            <img
              v-else
              src="../../../assets/mk3_1.png"
              alt=""
              @click="toUserMain(item.uid)"
            />
            <span>{{ item.username }}</span>
          </div>
          <div class="rank_price">{{ item.time }}</div>
          <div class="rank_reward">
            <img src="../../../assets/mk2_6.png" alt="" /><span
              >+{{ item.tool_nums }}</span
            >
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="rank_text">
        <ul>
          <li>
            <i></i>活动期间，每日<span>赠送和获赠钻石礼物价值</span>最高的前
            10名玩家可获得排名奖励，榜单<span>每日重置</span>，奖励会在次日发放
          </li>
          <li>
            <i></i>活动期间收到钻石礼物，可获得
            <span>双倍经验值和双倍基础魅力值，魅力值上限提高50%</span>
          </li>
          <li><i></i>每个ID只能获得一个榜单的排名奖励，按最大名次派发</li>
          <li>
            <i></i>
            当送出钻石礼物为盲盒礼物时，赠送榜数据以<span>盲盒本身</span>的钻石价值计算，获赠榜数据以盲盒<span>拆出礼物</span>的钻石价值计算
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'
export default {
  name: 'giveRank',
  components: {},
  props: {
    diamondGiftsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    send_present_top() {
      return this.diamondGiftsData.send_present_top
    },
    uid() {
      return this.diamondGiftsData.uid
    },
    my_send_present() {
      return this.diamondGiftsData.my_send_present
    }
  },
  watch: {},
  created() {},
  methods: {
    toUserMain(uid) {
      toUserMain(uid)
    }
  }
}
</script>

<style scoped lang="scss">
.giveRank {
  padding: 0 10px 10px;
  overflow: hidden;
  box-sizing: border-box;
  .top_my_goods {
    width: 100%;
    text-align: center;
    color: #107094;
    margin-bottom: 10px;
  }
  .rank_box {
    width: 330px;
    .rank_header {
      width: 100%;
      height: 24px;
      background: #126a8b;
      border-radius: 6px;
      line-height: 24px;
      color: #fff99e;
      display: flex;
      margin-bottom: 3px;
      box-sizing: border-box;
      > div {
        height: 100%;
        text-align: center;
      }
      > div:nth-child(1) {
        width: 40px;
      }
      > div:nth-child(2) {
        width: 135px;
      }
      > div:nth-child(3),
      > div:nth-child(4) {
        width: 70px;
      }
    }
    .rank_list {
      width: 330px;
      height: 190px;
      background: linear-gradient(-90deg, #7ea1e9, #4dafb5);
      box-shadow: 0px 3px 0px 0px #ffffff;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 0 5px;
      overflow-y: scroll;
      .rank_list_item {
        width: 100%;
        display: flex;
        font-size: 12px;
        margin: 15px 0;
        color: #fff;
        > div {
          height: 100%;
          text-align: center;
        }
        > div:nth-child(1) {
          width: 20px;
          margin: 0 5px;
        }
        > div:nth-child(2) {
          width: 135px;
          span {
            width: 100%;
            text-align: left;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }
        }
        > div:nth-child(3) {
          text-align: center !important;
          // margin-right: 5px;
          width: 70px;
        }
        > div:nth-child(4) {
          text-align: left;
          width: 70px;
        }
        .rank_reward {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-right: 5px;
            width: 20px;
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
    .rank_text {
      margin-top: 15px;
      color: #107094;
      line-height: 20px;
      margin-left: 10px;
      li {
        position: relative;
        padding-left: 11px;
      }
      span {
        color: #f7a412;
      }
      i {
        position: absolute;
        top: 8px;
        left: -5px;
        display: block;
        width: 6px;
        height: 6px;
        background: #54b39e;
        border-radius: 50%;
        // margin-right: 10px;
      }
    }
  }
}
</style>
