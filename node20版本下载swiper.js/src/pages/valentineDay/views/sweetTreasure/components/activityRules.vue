<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <div class="white_box">
        <div class="inner_box">
          <img class="title-image" :src="IconPath('title_17.png')" />
          <!-- 说明文字 -->
          <div class="ThemeBox_BottomText">
            <ul>
              <li>
                <span></span>玩家每充值30元可获得1枚寻珍币<img
                  :src="IconPath('xzb_120_120.png')"
                  alt=""
                />，用于寻珍抽奖。除了充值的寻珍币<img
                  :src="IconPath('xzb_120_120.png')"
                  alt=""
                />外，每日签到也可获得1个寻珍币<img
                  :src="IconPath('xzb_120_120.png')"
                  alt=""
                />。
              </li>
              <li>
                <span></span
                >每层奖池分别有7种奖励，玩家需自选珍宝奖励，当珍宝奖励选定后才能进行寻宝。
              </li>
              <li>
                <span></span>奖池共有5层，每层进行一次寻珍消耗的寻珍币<img
                  :src="IconPath('xzb_120_120.png')"
                  alt=""
                />数量不等，分别为1、2、3、4、5个，当玩家获得珍宝奖励后即可解锁下一层。其中1-4层为不放回式抽奖，奖励不可重复获得。第5层为放回式抽奖，奖励可重复获得。
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--列表-->
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'tIp',
  props: {},
  data() {
    return {
      showPopup: false,
      // 道具图标
      pointIcon: 'xzb_120_120.png'
    }
  },
  computed: {},
  methods: {
    clickClose() {}
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 10px solid rgba(236, 211, 255, 0.5);
    border-radius: 40px;
    pointer-events: auto;
    .white_box {
      border: 4px solid #ffffff;

      border-radius: 30px;
      overflow: hidden;
      .inner_box {
        width: 600px;
        height: 559px;
        background: linear-gradient(0deg, #ed96fd, #866ae0);
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-image {
          width: 515px;
          height: 199px;
          position: absolute;
          top: -122px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .ThemeBox_BottomText {
          width: 540px;
          align-self: flex-start;
          margin-left: 49px;
          margin-right: 11px;
          margin-top: 64px;

          li {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            position: relative;
            list-style-type: none;
            margin-bottom: 42px;
            line-height: 38px;
            i {
              color: #ffadf8;
            }

            img {
              position: relative;
              margin: 0 4px;
              height: 30px;
              //   border: 1px solid red;
              transform: scale(1.8);
            }

            span {
              position: absolute;
              top: 8px;
              left: -30px;
              display: block;
              width: 12px;
              height: 12px;
              background: #ffe9b9;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>
