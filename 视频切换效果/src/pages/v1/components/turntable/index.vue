<template>
  <div class="myTurntable">
    <div
      @click="onClick"
      class="center"
      :class="{ done: lotteryStatus != 1 }"
    ></div>
    <div
      class="img_box"
      v-for="(item, index) in lotteryPool"
      :key="index"
      :class="{ active: item.flag }"
    >
      <div class="item">
        <div class="top" v-if="lotteryPool.length">
          <img :src="require(`../../assets/${item.icon}`)" alt="" />
        </div>
        <div class="bottom">{{ item.name + item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myTurntable',
  components: {},
  props: {
    lotteryPool: {
      type: Array
    },
    lotteryStatus: {
      type: Number
    }
  },
  data() {
    return {
      arr: [
        {
          name: 1,
          flag: true
        },
        {
          name: 2,
          flag: false
        },
        {
          name: 3,
          flag: false
        },
        {
          name: 4,
          flag: false
        },
        {
          name: 5,
          flag: false
        },
        {
          name: 6,
          flag: false
        }
      ],
      time: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onClick(e) {
      this.$emit('onClickLottery', e)
    }
  }
}
</script>

<style scoped lang="scss">
.done {
  background: url('../../assets/btn_received.png') no-repeat !important;
  background-size: 100% !important;
}
.active {
  background: url('../../assets/img_itemglow.png') no-repeat !important;
  background-size: 100% !important;
  background-position: center center !important;
}
.myTurntable {
  padding-top: 18px;
  position: relative;
  width: 100%;
  height: 422px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-bottom: px;
  .center {
    width: 120px;
    height: 120px;
    background: url('../../assets/btn_draw.png') no-repeat;
    background-size: 100%;
  }
  .img_box {
    height: 115px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 114px;
      height: 98px;
      background: url('../../assets/img_itembot.png') no-repeat;
      background-size: 100%;
      background-position: center center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .top {
        width: 42px;
        img {
          width: 100%;
        }
      }
      .bottom {
        font-size: 14px;
        font-family: Source Han Sans CN;
        color: #a0733c;
      }
    }
    &:nth-child(2) {
      top: 40px;
      left: 50%;
      transform: translate(-50%);
    }
    &:nth-child(3) {
      top: 114px;
      right: 5px;
    }
    &:nth-child(4) {
      top: 230px;
      right: 5px;
    }
    &:nth-child(5) {
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
    }
    &:nth-child(6) {
      top: 230px;
      left: 5px;
    }
    &:nth-child(7) {
      top: 114px;
      left: 5px;
    }
  }
}
</style>
