<template>
  <div class="top3_total flex align-start justify-center">
    <div
      class="top3_item flex flex-column align-center"
      v-for="(item, index) in pageData2.total_rank.slice(0, 3)"
      :key="index"
      :class="'item' + index"
    >
      <div class="item_top flex justify-center">
        <img
          class="wing"
          v-show="index == 0"
          :src="IconPath('mk8_16.png')"
          alt=""
        />
        <img
          class="wing"
          v-show="index == 1"
          :src="IconPath('mk8_18.png')"
          alt=""
        />
        <img
          class="wing"
          v-show="index == 2"
          :src="IconPath('mk8_20.png')"
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
          :src="IconPath('mk8_15.png')"
          alt=""
          @click="toUserMain(item.uid)"
        />
        <div class="zhanwei" @click="toUserMain(item.uid)"></div>
      </div>
      <div class="item_bottom flex flex-column align-center">
        <div class="name">{{ item.username }}</div>
        <div class="id">
          <img
            v-if="item.is_pretty"
            class="is_pretty"
            :src="IconPath('mk8_14.png')"
            alt=""
          />ID:{{ item.code }}
        </div>
      </div>
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
.top3_total {
  margin-top: 16px;
  position: relative;
  height: 562px;
  width: 100%;

  // 金牌
  .top3_item {
    position: absolute;

    .item_top {
      width: 401px;
      height: 237px;
      position: relative;
      z-index: 1;
      .avatar {
        position: absolute;
        width: 120px;
        height: 120px;
        top: 61px;
        border-radius: 50%;
      }

      .zhanwei {
        position: absolute;
        width: 120px;
        height: 120px;
        top: 61px;
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
      margin-top: -208px;
      width: 219px;
      height: 390px;
      background-image: url('../../../../assets/mk8_17.png');
      background-size: 100% 100%;
      position: relative;

      .name {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        top: 223px;
        // 实际30px
        // height: 24px;
        // line-height: 24px;
        max-width: 163px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .id {
        // height: 17px;
        // line-height: 17px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffef85;
        position: absolute;
        top: 259px;
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
  }

  // 银牌

  .item1 {
    left: 18px;
    top: 163px;

    .item_top {
      width: 214px;
      height: 211px;

      .avatar {
        width: 106px;
        height: 106px;
        top: 55px;
        border-radius: 50%;
      }

      .zhanwei {
        position: absolute;
        width: 106px;
        height: 106px;
        top: 55px;
        border-radius: 50%;
        z-index: 200;
      }
    }

    .item_bottom {
      margin-top: -191px;
      width: 199px;
      height: 355px;
      background-image: url('../../../../assets/mk8_19.png');

      .name {
        top: 202px;
      }

      .id {
        color: #ffef85;
        top: 245px;
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
  }

  // 铜牌
  .item2 {
    right: 25px;
    top: 163px;

    .item_top {
      width: 214px;
      height: 211px;

      .avatar {
        width: 106px;
        height: 106px;
        top: 55px;
        border-radius: 50%;
      }

      .zhanwei {
        position: absolute;
        width: 106px;
        height: 106px;
        top: 55px;
        border-radius: 50%;
        z-index: 200;
      }
    }

    .item_bottom {
      margin-top: -191px;
      width: 199px;
      height: 355px;
      background-image: url('../../../../assets/mk8_21.png');

      .name {
        top: 202px;
      }
      .id {
        color: #ffef85;
        top: 245px;
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
  }
}
</style>
