<template>
  <!-- 日榜 -->
  <div class="top3" v-if="dayflag == 1 && tabflag == 1">
    <div
      class="top3_item"
      v-for="(item, index) in pageData1.daily_rank.slice(0, 3)"
      :key="index"
      :class="'item' + index"
    >
      <div class="avatar" @click="toUserMain(item.uid)">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" />
        <img v-else :src="IconPath('mk6_18.png')" alt="" />
      </div>
      <div class="user_name">{{ item.username }}</div>
      <div class="user_id">
        <img
          v-if="item.is_pretty"
          class="is_pretty"
          :src="IconPath('mk6_17.png')"
          alt=""
        />ID:{{ item.code }}
      </div>
    </div>
  </div>
  <!-- 总榜 -->
  <div class="top3_total flex align-start justify-center" v-else>
    <div
      class="top3_item flex flex-column align-center"
      v-for="(item, index) in pageData1.total_rank.slice(0, 3)"
      :key="index"
      :class="'item' + index"
    >
      <div class="item_top flex justify-center">
        <img
          class="wing"
          v-show="index == 0"
          :src="IconPath('mk6_19.png')"
          alt=""
        />
        <img
          class="wing"
          v-show="index == 1"
          :src="IconPath('mk6_21.png')"
          alt=""
        />
        <img
          class="wing"
          v-show="index == 2"
          :src="IconPath('mk6_23.png')"
          alt=""
        />
        <img
          v-if="item.profile_image"
          class="avatar"
          :src="item.profile_image"
          alt=""
          @click="toUserMain(item.uid)"
        />
        <img
          v-else
          class="avatar"
          :src="IconPath('mk6_18.png')"
          alt=""
          @click="toUserMain(item.uid)"
        />
        <div class="zhanwei" @click="toUserMain(item.uid)"></div>
      </div>
      <div
        class="item_bottom flex flex-column align-center"
        :class="{ nofirst: index != 0 }"
      >
        <div class="name" :class="'name' + tabflag">{{ item.username }}</div>
        <div class="id" :class="'id' + tabflag">
          <img
            v-if="item.is_pretty"
            class="is_pretty"
            :src="IconPath('mk6_17.png')"
            alt=""
          />ID:{{ item.code }}
        </div>
        <div class="time" :class="'time' + tabflag" v-if="tabflag == 2">
          {{ item.time }}个
        </div>
      </div>
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
  props: ['dayflag', 'pageData1', 'tabflag'],
  computed: {},
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
@import url('../../../styles/flex.scss');

.top3 {
  width: 100%;
  height: 494px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  margin-bottom: -23px;

  .top3_item {
    position: absolute;
    width: 230px;
    height: 440px;
    background-image: url('../../../assets/mk6_10.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 110px;
      height: 110px;
      background: #ffffff;
      border: 4px solid #a648e5;
      border-radius: 50%;
      margin-top: 97px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .user_name {
      height: 38px;
      line-height: 38px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 23px;
      max-width: 163px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .user_id {
      height: 17px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffe87c;
      margin-top: 12px;
      display: flex;
      align-items: center;

      .is_pretty {
        width: 52px;
        height: 43px;
        margin-right: 3px;
      }
    }

    .time {
      margin-top: 14px;
      height: 21px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #e07df7;
    }
  }

  .item1 {
    left: 10px;
    top: 96px;
    width: 221px;
    height: 398px;
    background-image: url('../../../assets/mk6_11.png');
  }

  .item2 {
    right: 11px;
    top: 96px;
    width: 221px;
    height: 398px;
    background-image: url('../../../assets/mk6_12.png');
  }
}

.top3_total {
  margin-top: 16px;
  position: relative;
  height: 562px;
  width: 100%;

  // 金牌
  .top3_item {
    position: absolute;

    .item_top {
      width: 410px;
      height: 212px;
      position: relative;
      z-index: 1;
      .avatar {
        position: absolute;
        width: 130px;
        height: 130px;
        top: 63px;
        border-radius: 50%;
      }

      .zhanwei {
        position: absolute;
        width: 130px;
        height: 130px;
        top: 63px;
        border-radius: 50%;
        z-index: 200;
      }

      .wing {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
      }
    }

    .item_bottom {
      margin-top: -116px;
      width: 264px;
      height: 395px;
      background-image: url('../../../assets/mk6_20.png');
      background-size: 100% 100%;
      position: relative;

      .name {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        top: 134px;
        height: 24px;
        line-height: 24px;
        max-width: 163px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .name2,
      .name3 {
        top: 126px !important;
      }

      .id {
        height: 17px;
        line-height: 17px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7452d3;
        position: absolute;
        top: 178px;
        display: flex;
        align-items: center;

        .is_pretty {
          width: 52px;
          height: 43px;
          margin-right: 3px;
        }
      }

      .id2,
      .id3 {
        top: 164px !important;
      }

      .time {
        position: absolute;
        top: 208px;
        height: 21px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7452d3;
      }

      .time2,
      .time3 {
        top: 193px !important;
      }

      .honor_value {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7452d3;
        position: absolute;
        top: 193px;
      }
    }

    .nofirst {
      .name {
        top: 126px;
      }

      .id {
        top: 164px;
      }

      .time {
        top: 193px;
        color: #7452d3;
      }
    }
  }

  // 银牌

  .item1 {
    left: 18px;
    top: 163px;

    .item_top {
      width: 204px;
      height: 160px;

      .avatar {
        width: 106px;
        height: 106px;
        top: 41px;
      }

      .zhanwei {
        position: absolute;
        width: 106px;
        height: 106px;
        top: 41px;
        z-index: 200;
      }
    }

    .item_bottom {
      margin-top: -98px;
      width: 211px;
      height: 332px;
      background-image: url('../../../assets/mk6_22.png');

      .name {
        top: 123px;
      }

      .name2,
      .name3 {
        top: 113px !important;
      }

      .id {
        color: #505fbf;
        top: 164px;
        display: flex;
        align-items: center;

        .is_pretty {
          width: 52px;
          height: 43px;
          margin-right: 3px;
        }
      }

      .id2,
      .id3 {
        top: 152px !important;
      }

      .time {
        position: absolute;
        top: 208px;
        height: 21px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #e07df7;
      }

      .time2,
      .time3 {
        top: 181px !important;
      }

      .honor_value {
        color: #505fbf;
        top: 183px;
      }
    }

    .nofirst {
      .name {
        top: 113px;
      }

      .id {
        top: 152px;
      }

      .time {
        top: 181px;
        color: #505fbf;
      }
    }
  }

  // 铜牌
  .item2 {
    right: 25px;
    top: 163px;

    .item_top {
      width: 204px;
      height: 160px;

      .avatar {
        width: 106px;
        height: 106px;
        top: 41px;
      }

      .zhanwei {
        position: absolute;
        width: 106px;
        height: 106px;
        top: 41px;
        z-index: 200;
      }
    }

    .item_bottom {
      margin-top: -98px;
      width: 211px;
      height: 332px;
      background-image: url('../../../assets/mk6_24.png');

      .name {
        top: 112px;
      }

      .name2,
      .name3 {
        top: 113px !important;
      }

      .id {
        color: #915b4a;
        top: 152px;
        display: flex;
        align-items: center;

        .is_pretty {
          width: 52px;
          height: 43px;
          margin-right: 3px;
        }
      }

      .id2,
      .id3 {
        top: 152px !important;
      }

      .time2,
      .time3 {
        top: 181px !important;
      }

      .honor_value {
        color: #915b4a;
        top: 183px;
      }
    }

    .nofirst {
      .name {
        top: 113px;
      }

      .id {
        top: 152px;
      }

      .time {
        top: 181px;
        color: #915b4a;
      }
    }
  }
}
</style>
