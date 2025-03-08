<template>
  <div class="top3">
    <div
      class="top3_item"
      v-for="(item, index) in pageData2.daily_rank.slice(0, 3)"
      :key="index"
      :class="'item' + index"
    >
      <div class="avatar" @click="toUserMain(item.uid)">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" />
        <img v-else :src="IconPath('mk8_15.png')" alt="" />
      </div>
      <div class="user_name">{{ item.username }}</div>
      <div class="user_id">
        <img
          v-if="item.is_pretty"
          class="is_pretty"
          :src="IconPath('mk8_14.png')"
          alt=""
        />ID:{{ item.code }}
      </div>
      <div class="mq_value">{{ item.time }}名气值</div>
      <div class="yy_avatar">
        <!-- <img :src="IconPath(item.fans.profile_image)" alt="" /> -->
        <img
          @click="toUserMain(item.fans.uid)"
          v-if="item.fans.profile_image"
          :src="IconPath(item.fans.profile_image)"
          alt=""
        />
        <img v-else :src="IconPath('mk8_15.png')" alt="" />
      </div>
      <div class="tit">首席应援</div>
    </div>
  </div>
</template>

<script>
import { toUserMain } from '../../../../utils/toApp'
export default {
  components: {},
  name: 'cs_day_top3',
  data() {
    return {}
  },
  props: ['pageData2'],
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

<style lang="scss" scoped>
.top3 {
  width: 100%;
  height: 525px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  //   margin-bottom: -23px;
  .top3_item {
    position: absolute;
    width: 220px;
    height: 525px;
    background-image: url('../../../../assets/mk8_23.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      flex-shrink: 0;
    }

    .avatar {
      width: 110px;
      height: 110px;
      background: #ffffff;
      border: 4px solid #fe9b48;
      border-radius: 50%;
      margin-top: 114px;
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
      //   height: 38px;
      //   line-height: 38px;
      //   30
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #a94214;
      margin-top: 13px;
      max-width: 163px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .user_id {
      // 25.3
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f76a24;
      margin-top: 4px;
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
      //   width: 78px;
      //   height: 21px;
      // 25.3
      margin-top: 4px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f76a24;
    }
    .yy_avatar {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      margin-top: 9px;
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
      // 23
      margin-top: 3px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #b17017;
    }
    /**
    <div class="yy_avatar"></div>
      <div class="tit">首席应援</div>
    */
  }

  .item1 {
    left: 17px;
    top: 69px;
    width: 221px;
    height: 414px;
    background-image: url('../../../../assets/mk8_24.png');
  }

  .item2 {
    right: 18px;
    top: 69px;
    width: 221px;
    height: 414px;
    background-image: url('../../../../assets/mk8_25.png');
  }
}
</style>
