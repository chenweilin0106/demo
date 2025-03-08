<template>
  <div class="after20">
    <!--财神日榜20名之前 -->
    <div
      v-if="
        dayflag == 1 &&
        tabflag == 1 &&
        filter_medal_list(data1.daily_rank) != -1
      "
      class="after20_rank"
    >
      {{ filter_medal_list(data1.daily_rank) + 1 }}
    </div>
    <!-- 财神日榜20名之后     -->
    <div
      v-if="
        dayflag == 1 &&
        tabflag == 1 &&
        filter_medal_list(data1.daily_rank) == -1
      "
      class="after20_rank"
    >
      20+
    </div>

    <!--名人日榜20名之前 -->
    <div
      v-if="
        dayflag == 1 &&
        tabflag == 2 &&
        filter_medal_list(data2.daily_rank) != -1
      "
      class="after20_rank"
    >
      {{ filter_medal_list(data2.daily_rank) + 1 }}
    </div>
    <!-- 名人日榜20名之后     -->
    <div
      v-if="
        dayflag == 1 &&
        tabflag == 2 &&
        filter_medal_list(data2.daily_rank) == -1
      "
      class="after20_rank"
    >
      20+
    </div>

    <!-- 财神总榜20名之前 -->
    <div
      v-if="
        dayflag == 2 &&
        tabflag == 1 &&
        filter_medal_list(data1.total_rank) != -1
      "
      class="after20_rank"
    >
      {{ filter_medal_list(data1.total_rank) + 1 }}
    </div>
    <!--财神总榜20名之后 -->
    <div
      v-if="
        dayflag == 2 &&
        tabflag == 1 &&
        filter_medal_list(data1.total_rank) == -1
      "
      class="after20_rank"
    >
      20+
    </div>

    <!-- 名人总榜20名之前 -->
    <div
      v-if="
        dayflag == 2 &&
        tabflag == 2 &&
        filter_medal_list(data3.total_rank) != -1
      "
      class="after20_rank"
    >
      {{ filter_medal_list(data3.total_rank) + 1 }}
    </div>
    <!--名人总榜20名之后 -->
    <div
      v-if="
        dayflag == 2 &&
        tabflag == 2 &&
        filter_medal_list(data3.total_rank) == -1
      "
      class="after20_rank"
    >
      20+
    </div>

    <div class="avatar" @click="toUserMain(data1.uid)">
      <img v-if="data1.my_profile_image" :src="data1.my_profile_image" alt="" />
      <img v-else :src="IconPath('mk8_15.png')" alt="" />
    </div>
    <div class="after20_item_cener">
      <div class="user_name">{{ data1.my_username }}</div>
      <div class="user_id">
        <img
          v-if="data1.is_pretty"
          class="is_pretty"
          :src="IconPath('mk8_14.png')"
          alt=""
        />
        ID：{{ data1.code }}
      </div>
      <div class="mq_value" v-if="tabflag == 2">
        {{ dayflag == 1 ? data2.my_score : data3.my_score }}名气值
      </div>
    </div>
    <div class="after20_item_right" v-if="tabflag == 1">
      <!-- <div v-if="isdiff()" class="distance">距离上一名</div> -->
      <!-- 日榜4-20名 -->
      <div class="value">
        {{ myValue() }}
        财富值
      </div>
    </div>
    <div class="after20_item_right after20_item_right2" v-if="tabflag == 2">
      <div class="yy_avatar" v-if="dayflag == 1">
        <img
          @click="toUserMain(data2.my_fans.uid)"
          v-if="data2.my_fans.profile_image"
          :src="IconPath(data2.my_fans.profile_image)"
          alt=""
        />
        <img v-else :src="IconPath('mk8_15.png')" alt="" />
      </div>
      <div class="yy_avatar" v-if="dayflag == 2">
        <img
          @click="toUserMain(data3.my_fans.uid)"
          v-if="data3.my_fans.profile_image"
          :src="IconPath(data3.my_fans.profile_image)"
          alt=""
        />
        <img v-else :src="IconPath('mk8_15.png')" alt="" />
      </div>
      <div class="tit">首席应援</div>
    </div>
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
  watch: {},
  // props: [
  //   'tabflag',
  //   'date',
  //   'dayflag',
  //   'pageData1',
  //   'my_score',
  //   'data1',
  //   'data2',
  //   'data3'
  // ],
  props: {
    tabflag: {},
    date: {},
    dayflag: {},
    pageData1: {},
    my_score: {},
    data1: {
      default: {
        daily_rank: [],
        total_rank: []
      }
    },
    data2: {
      default: {
        daily_rank: []
      }
    },
    data3: {
      default: {
        total_rank: []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toUserMain(uid) {
      toUserMain(uid)
    },
    filter_medal_list(list) {
      const index = list.findIndex((item) => item.uid == this.data1.uid)
      return index
    },
    myValue() {
      if (this.dayflag == 1) {
        return this.data1.my_daily_recharge
      }
      if (this.dayflag == 2) {
        return this.data1.my_total_recharge
      }
    }
    // isdiff() {
    //   const dayflag = this.dayflag
    //   const { total_rank, daily_rank } = this.pageData1
    //   return (
    //     (dayflag == 1 && this.filter_medal_list(daily_rank) >= 3) ||
    //     (dayflag == 2 && this.filter_medal_list(total_rank) >= 3)
    //   )
    // }
  }
}
</script>

<style scoped lang="scss">
.after20 {
  width: 732px;
  height: 130px;
  background-image: url('../../../assets/mk8_13.png');
  background-size: 100% 100%;
  margin-top: -129px;
  display: flex;
  align-items: center;
  z-index: 100;
  position: relative;

  .after20_rank {
    width: 65px;
    height: 64px;
    background-image: url('../../../assets/mk8_31.png');
    background-size: 100% 100%;
    margin-left: 53px;
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
    border: 3px solid #f38751;
    border-radius: 50%;
    margin-left: 6px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .after20_item_cener {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .user_name {
      // 30
      // height: 38px;
      // line-height: 38px;
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
      margin-top: 2px;
      height: 17px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffef85;
      display: flex;
      align-items: center;
      height: 43px;

      .is_pretty {
        width: 52px;
        height: 43px;
        margin-right: 3px;
      }
    }
    .mq_value {
      margin-top: 2px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffe785;
    }
  }

  .after20_item_right {
    margin-right: 54px;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .distance {
      height: 21px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #c6a8f6;
      margin-bottom: 12px;
    }

    .value {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .after20_item_right2 {
    align-items: center;
    .yy_avatar {
      width: 60px;
      height: 60px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .tit {
      margin-top: 5px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffb77d;
    }
  }
}
</style>
