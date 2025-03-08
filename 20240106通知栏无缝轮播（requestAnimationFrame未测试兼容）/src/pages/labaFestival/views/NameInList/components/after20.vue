<template>
  <div class="after20">
    <!-- 日榜20名之前 -->
    <div
      v-if="dayflag == 1 && filter_medal_list(pageData1.daily_rank) != -1"
      class="after20_rank"
    >
      {{ filter_medal_list(pageData1.daily_rank) + 1 }}
    </div>
    <!-- 日榜20名之后     -->
    <div
      v-if="dayflag == 1 && filter_medal_list(pageData1.daily_rank) == -1"
      class="after20_rank"
    >
      20+
    </div>
    <!-- 总榜20名之前 -->
    <div
      v-if="dayflag == 2 && filter_medal_list(pageData1.total_rank) != -1"
      class="after20_rank"
    >
      {{ filter_medal_list(pageData1.total_rank) + 1 }}
    </div>
    <!-- 总榜20名之后 -->
    <div
      v-if="dayflag == 2 && filter_medal_list(pageData1.total_rank) == -1"
      class="after20_rank"
    >
      20+
    </div>
    <div class="avatar" @click="toUserMain()">
      <img
        v-if="pageData1.my_profile_image"
        :src="pageData1.my_profile_image"
        alt=""
      />
      <img v-else :src="IconPath('mk6_18.png')" alt="" />
    </div>
    <div class="after20_item_cener">
      <div class="user_name">{{ pageData1.my_username }}</div>
      <div class="user_id">
        <img
          v-if="pageData1.is_pretty"
          class="is_pretty"
          :src="IconPath('mk6_17.png')"
          alt=""
        />
        ID：{{ pageData1.code }}
      </div>
    </div>
    <div class="after20_item_right" v-if="tabflag == 1">
      <!-- 日榜20名之前 -->
      <!-- <div v-if="dayflag == 1 && filter_medal_list(pageData1.daily_rank) != -1" class=" distance">距离上一名</div> -->
      <!-- 总榜20名之前 -->
      <!-- <div v-if="dayflag == 2 && filter_medal_list(pageData1.total_rank) != -1" class=" distance">距离上一名</div> -->
      <!-- 日榜20名之前 -->
      <!-- <div v-if="dayflag == 1 && filter_medal_list(pageData1.daily_rank) != -1" class="value"> {{
                pageData1.daily_rank[filter_medal_list(pageData1.daily_rank)].diff }} 豪气值</div> -->
      <!-- 日榜-->
      <div v-if="dayflag == 1" class="value">
        {{ pageData1.my_daily_recharge }} 豪气值
      </div>
      <!-- 总榜20名之前 -->
      <!-- <div v-if="dayflag == 2 && filter_medal_list(pageData1.total_rank) != -1" class="value"> {{
                pageData1.total_rank[filter_medal_list(pageData1.total_rank)].diff }} 豪气值</div> -->
      <!-- 总榜-->
      <div v-if="dayflag == 2" class="value">
        {{ pageData1.my_total_recharge }} 豪气值
      </div>
    </div>
    <div class="after20_item_right" v-if="tabflag == 2">
      <div class="value">{{ my_score }}个</div>
    </div>
  </div>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'
import qs from 'qs'
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
  props: ['tabflag', 'date', 'dayflag', 'pageData1', 'my_score'],
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toUserMain() {
      const params = qs.parse(window.location.search.substring(1))
      const { uid } = params
      toUserMain(uid)
    },
    filter_medal_list(list) {
      // console.log(list)
      // let params = qs.parse(window.location.search.substring(1))
      // let { uid, referal_source, appVersion } = params
      const index = list.findIndex((item) => item.uid == this.pageData1.uid)
      console.log(index)
      return index
    }
  }
}
</script>

<style scoped lang="scss">
.after20 {
  width: 739px;
  height: 137px;
  background-image: url('../../../assets/mk6_15.png');
  background-size: 100% 100%;
  margin-top: -136px;
  display: flex;
  align-items: center;
  z-index: 100;
  position: relative;

  .after20_rank {
    width: 68px;
    height: 68px;
    background-image: url('../../../assets/mk6_13.png');
    background-size: 100% 100%;
    margin-left: 34px;
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

  .after20_item_cener {
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
      margin-top: 18px;
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
      color: #843bdf;
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
}
</style>
