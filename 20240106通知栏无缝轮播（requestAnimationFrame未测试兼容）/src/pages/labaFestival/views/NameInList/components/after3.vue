<template>
  <div class="after3" ref="after3" v-if="dayflag == 1">
    <div
      class="after3_item"
      v-for="(item, index) in pageData1.daily_rank.slice(3, 20)"
      :key="index"
    >
      <div class="after3_item_rank">{{ item.rank }}</div>
      <div class="avatar" @click="toUserMain(item.uid)">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" />
        <img v-else :src="IconPath('mk6_18.png')" alt="" />
      </div>
      <div class="after3_item_cener">
        <div class="user_name">{{ item.username }}</div>
        <div class="user_id">
          <img
            v-if="item.is_pretty"
            class="is_pretty"
            :src="IconPath('mk6_17.png')"
            alt=""
          />ID：{{ item.code }}
        </div>
      </div>
      <div class="after3_item_right" v-if="tabflag == 1">
        <div class="distance">距离上一名</div>
        <div class="value">{{ item.diff }} 豪气值</div>
      </div>
      <div class="after3_item_right" v-if="tabflag == 2">
        <div class="value">{{ item.time }}个</div>
      </div>
    </div>
    <!-- 占位元素 -->
    <div
      v-if="pageData1.tot_score >= 0 || pageData1.my_total_recharge >= 0"
      class="zhanwei"
    ></div>
  </div>
  <div class="after3" ref="after3" v-else>
    <div
      class="after3_item"
      v-for="(item, index) in pageData1.total_rank.slice(3, 20)"
      :key="index"
    >
      <div class="after3_item_rank">{{ item.rank }}</div>
      <div class="avatar" @click="toUserMain(item.uid)">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" />
        <img v-else :src="IconPath('mk6_18.png')" alt="" />
      </div>
      <div class="after3_item_cener">
        <div class="user_name">{{ item.username }}</div>
        <div class="user_id">
          <img
            v-if="item.is_pretty"
            class="is_pretty"
            :src="IconPath('mk6_17.png')"
            alt=""
          />ID：{{ item.code }}
        </div>
      </div>
      <div class="after3_item_right" v-if="tabflag == 1">
        <div class="distance" v-if="item.rank != 4 || filter_medal_list">
          距离上一名
        </div>
        <!-- 4名之后 -->
        <div class="value" v-if="item.rank != 4">{{ item.diff }} 豪气值</div>
        <!-- 4名且有前三 -->
        <div class="value" v-if="item.rank == 4 && filter_medal_list">
          {{ item.diff }} 豪气值
        </div>
        <!-- 4名无前三 -->
        <div class="value" v-if="item.rank == 4 && !filter_medal_list">
          {{ item.time }} 豪气值
        </div>
      </div>
      <div class="after3_item_right" v-if="tabflag == 2">
        <div class="value">{{ item.time }}个</div>
      </div>
    </div>
    <!-- 占位元素 -->
    <div
      v-if="pageData1.tot_score >= 0 || pageData1.my_total_recharge >= 0"
      class="zhanwei"
    ></div>
  </div>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'
export default {
  components: {},
  name: 'YearRank',
  data() {
    return {}
  },
  watch: {
    // tabflag(newValue) {
    //     console.log(newValue);
    //     this.$refs.after3.scrollTop = 0
    // },
    // date(newValue) {
    //     console.log(newValue);
    //     this.$refs.after3.scrollTop = 0
    // },
    // dayflag(newValue) {
    //     console.log(newValue);
    //     this.$refs.after3.scrollTop = 0
    // }
  },
  props: ['tabflag', 'date', 'dayflag', 'pageData1'],
  computed: {
    // 是否展示距离上一名
    filter_medal_list() {
      const list = this.pageData1.total_rank.slice(0, 3)
      // let a = true
      const b = list.some((value, index, ar) => {
        console.log(value.uid)
        // 前三名有不满的就不展示
        return Number(value.uid) <= 0
      })
      if (!b) {
        return true
      } else {
        return false
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    toUserMain(uid) {
      toUserMain(uid)
    }
  }
}
</script>

<style scoped lang="scss">
.after3 {
  height: 816px;
  overflow-y: scroll;

  .after3_item {
    margin-bottom: 15px;
    width: 666px;
    height: 135px;
    background-image: url('../../../assets/mk6_14.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;

    .after3_item_rank {
      width: 68px;
      height: 68px;
      background-image: url('../../../assets/mk6_13.png');
      background-size: 100% 100%;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff2a9;
    }

    .avatar {
      width: 80px;
      height: 80px;
      background: #ffffff;
      border: 3px solid #c3c7ff;
      border-radius: 50%;
      margin-left: 4px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .after3_item_cener {
      margin-left: 9px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .user_name {
        height: 38px;
        line-height: 38px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        max-width: 163px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .user_id {
        margin-top: 17px;
        height: 17px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffef85;
        display: flex;
        align-items: center;

        .is_pretty {
          width: 52px;
          height: 43px;
          margin-right: 3px;
        }
      }
    }

    .after3_item_right {
      margin-right: 46px;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .distance {
        height: 21px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f3a1b2;
        margin-bottom: 14px;
      }

      .value {
        height: 23px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .zhanwei {
    height: 135px;
  }
}
</style>
