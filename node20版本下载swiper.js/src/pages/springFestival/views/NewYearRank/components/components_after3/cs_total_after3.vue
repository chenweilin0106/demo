<template>
  <div class="after3" ref="after3">
    <div
      class="after3_item"
      v-for="(item, index) in pageData2.total_rank.slice(3, 20)"
      :key="index"
    >
      <div class="after3_item_rank">
        <span>{{ item.rank }}</span>
      </div>
      <div class="avatar" @click="toUserMain(item.uid)">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" />
        <img v-else :src="IconPath('mk8_15.png')" alt="" />
      </div>
      <div class="after3_item_cener">
        <div class="user_name">{{ item.username }}</div>
        <div class="user_id">
          <img
            v-if="item.is_pretty"
            class="is_pretty"
            :src="IconPath('mk8_14.png')"
            alt=""
          />ID：{{ item.code }}
        </div>
      </div>
      <div class="after3_item_right" v-if="index != 0 || filter_medal_list">
        <div class="distance" v-if="index != 0 || filter_medal_list">
          距离上一名
        </div>
        <div class="value">{{ item.diff }} 财富值</div>
      </div>
    </div>
    <!-- 占位元素 -->
    <div class="zhanwei"></div>
  </div>
</template>

<script>
import { toUserMain } from '../../../../utils/toApp'
export default {
  components: {},
  name: 'cs_day_after3',
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
  props: ['tabflag', 'date', 'dayflag', 'pageData2'],
  computed: {
    // 是否展示距离上一名
    filter_medal_list() {
      const list = this.pageData2.total_rank.slice(0, 3)
      // let a = true
      const b = list.some((value, index, ar) => {
        console.log(value.uid)
        // 前三名有不满的就不展示
        return Number(value.uid) <= 0
      })
      console.log(b, 999)
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

<style lang="scss" scoped>
.after3 {
  height: 816px;
  overflow-y: scroll;
  position: relative;

  .after3_item {
    margin-bottom: 13px;
    width: 668px;
    height: 137px;
    background-image: url('../../../../assets/mk8_12.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;

    .after3_item_rank {
      width: 66px;
      height: 65px;
      background-image: url('../../../../assets/mk8_32.png');
      background-size: 100% 100%;
      margin-left: 23px;
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
      border: 3px solid #e15c1a;
      border-radius: 50%;
      margin-left: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .after3_item_cener {
      margin-left: 7px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .user_name {
        // height: 38px;
        // line-height: 38px;
        // 30
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
        // 25.3
        margin-top: 7px;
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
    }

    .after3_item_right {
      margin-right: 49px;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .distance {
        // 25.3
        // height: 21px;
        // width: 107px;
        // height: 21px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #df5400;
        margin-bottom: 11px;
      }

      .value {
        // 27.5
        // height: 23px;
        // width: 85px;
        // height: 23px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .zhanwei {
    height: 137px;
  }
}
</style>
