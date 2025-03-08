<template>
  <out-box class="first-cumulative-reward" title="title_3.png">
    <p class="text-1">累计领取指定次数首充礼包可获得以下奖励</p>
    <p class="text-2 flex-center">当前进度：<span>5</span>次</p>
    <div class="progress">
      <div class="reward-list">
        <div v-for="item in 3" :key="item" class="reward-item">
          <template v-if="item < 3">
            <div class="reward-item-left">
              <div class="reward-item-left-main">
                <img class="icon" :src="IconPath('ljs_120_120.png')" />
                <div class="text">+100</div>
                <div v-if="false" class="red-circle"></div>
                <div v-if="false" class="lock-icon"></div>
                <div v-if="false" class="overly flex-center">
                  <img :src="IconPath('mk2_1.png')" />
                </div>
              </div>
            </div>
            <div class="reward-item-right">
              <div class="reward-item-right-main">
                <img class="icon" :src="IconPath('ljs_120_120.png')" />
                <div class="text">+100</div>
                <div v-if="false" class="red-circle"></div>
                <div v-if="false" class="lock-icon"></div>
                <div v-if="false" class="overly flex-center">
                  <img :src="IconPath('mk2_1.png')" />
                </div>
              </div>
            </div>
          </template>
          <div v-else-if="item == 3" class="circle-box flex-center">
            <public-svga
              svgaName="ts_cbzy"
              :userAvatar="$store.state.user_icon"
            />
            <div class="name flex-center">永久</div>
            <!--红点-->
            <div v-if="false" class="red-circle"></div>
            <!--锁定图标-->
            <div v-if="false" class="lock-icon"></div>
            <!--遮盖层-->
            <div v-if="false" class="overly flex-center">
              <img :src="IconPath('mk2_1.png')" />
            </div>
          </div>
          <div class="arrow-icon"></div>
          <div class="point-icon flex-center">
            <img v-if="true" :src="IconPath('mk2_3.png')" />
            <img v-else-if="false" :src="IconPath('mk2_4.png')" />
            <span :style="{ color: false ? '#DF952D' : '#ffffff' }">5</span>
          </div>
        </div>
      </div>
      <div class="progress-main">
        <div class="start-text">累计</div>
        <div class="out-line">
          <div class="inner"></div>
          <div class="line-main"></div>
        </div>
        <div class="end-text">次</div>
      </div>
    </div>
  </out-box>
</template>

<script>
import PublicSvga from '@/components/PublicSvga.vue'

export default {
  data() {
    return {}
  },
  components: {
    PublicSvga
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.first-cumulative-reward {
  height: 465px;
  margin-bottom: 128px;
  padding-top: 102px;

  .text-1 {
    margin: 0 auto 24px;
    width: fit-content;
    height: 27px;
    font-size: 28px;
    color: #aa4213;
    line-height: 40px;
    white-space: nowrap;
  }

  .text-2 {
    margin: 0 auto 48px;
    width: fit-content;
    height: 27px;
    font-size: 28px;
    color: #aa4213;
    white-space: nowrap;

    span {
      margin: 0 11px 0 0;
      font-size: 34px;
      font-weight: 500;
      color: #f52300;
    }
  }

  .progress {
    .reward-list {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      padding-left: 121px;

      .reward-item {
        position: relative;
        display: flex;
        align-items: center;

        .reward-item-left,
        .reward-item-right {
          position: relative;
          z-index: 2;
          width: 94px;
          height: 108px;
          border-radius: 22px;
          background-color: #e7ab4b;
          padding: 4px;

          .reward-item-left-main,
          .reward-item-right-main {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 18px;
            background: linear-gradient(0deg, #bb6c2b, #6f3322);
          }

          .red-circle {
            top: -5px;
            right: -3px;
          }

          .lock-icon {
            top: -20px;
            right: -10px;
          }

          .icon {
            width: 100%;
          }

          .text {
            position: absolute;
            left: 50%;
            bottom: -2px;
            font-size: 24px;
            color: #ffffff;
            transform: translateX(-50%) scale(0.83);
          }
        }

        .reward-item-left {
          z-index: 3;
          margin-right: -1px;
        }

        .reward-item-right {
          margin-left: -1px;
        }

        .overly {
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(52, 29, 10, 0.6);
          border-radius: 50%;

          > img {
            width: 71px;
            height: 59px;
          }
        }

        .red-circle {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          background: #e22a2a;
          border-radius: 50%;
        }

        .lock-icon {
          position: absolute;
          top: -16px;
          right: -4px;
          width: 42px;
          height: 45px;
          background: url('@/assets/mk2_2.png') no-repeat left top/100% 100%;
        }

        .circle-box {
          margin-top: -53px;
          position: relative;
          z-index: 2;
          width: 160px;
          height: 160px;
          background: linear-gradient(0deg, #bb6c2b, #6f3322);
          border: 5px solid #e7ab4b;
          border-radius: 50%;

          .overly {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(52, 29, 10, 0.6);

            > img {
              width: 89px;
              height: 73px;
            }
          }

          .name {
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 30px;
            color: #fff;
            font-size: 22px;
            -webkit-text-stroke: 4px rgba(0, 0, 0, 0); // 描边粗细 兼容性良好
            background: #b66004; // 渐变背景色
            -webkit-background-clip: text; // 将背景色切割成字体描边 兼容性良好
            background-clip: text; // 将背景色切割成字体描边 兼容性良好
          }

          .red-circle {
            top: 14px;
            right: 14px;
          }

          .lock-icon {
            top: 3px;
            right: 0px;
          }

          .PublicSvga {
            width: 122px;
            height: 121px;
          }
        }

        .arrow-icon {
          position: absolute;
          z-index: 1;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 65px;
          height: 65px;
          background: #e7ab4b;
        }

        .point-icon {
          position: absolute;
          bottom: -73px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 53px;
          background: url('@/assets/mk2_3.png') no-repeat left top/100% 100%;
          font-size: 26px;
          font-weight: 500;
          > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          span {
            position: relative;
            z-index: 2;
          }
        }
      }

      .reward-item:nth-of-type(2) {
        margin-left: 3px;
      }

      .reward-item:nth-of-type(3) {
        margin-left: 17px;
      }
    }

    .progress-main {
      position: relative;
      top: 32px;
      display: flex;
      align-items: center;
      margin-left: 23px;

      .start-text {
        font-size: 26px;
        font-weight: 500;
        color: #df952d;
      }

      .end-text {
        font-size: 26px;
        font-weight: 500;
        color: #df952d;
      }

      .out-line {
        position: relative;
        width: 526px;
        height: 14px;
        background: #a55b28;
        padding: 4px;
        border-radius: 7px;
        margin-left: 10px;
        margin-right: 22px;

        .inner {
          width: 100%;
          height: 100%;
          background-color: #633015;
          border-radius: 3px;
        }

        .line-main {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          background-color: #ffa11d;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>
