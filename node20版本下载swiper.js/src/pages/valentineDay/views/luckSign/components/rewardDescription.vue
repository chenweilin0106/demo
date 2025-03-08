<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <div class="white_box">
        <div class="inner_box">
          <img class="title-image" :src="IconPath('title_13.png')" />
          <div class="gift_name">绿晶石礼包</div>
          <div class="gift_list">
            <div
              class="award_item"
              v-for="(item, index) in gift_list1"
              :key="index"
            >
              <div class="award">
                <img :src="IconPath(item.icon)" alt="" />
                <div class="award_bottom">{{ item.text }}</div>
              </div>
              <div class="probability">{{ item.probability }}</div>
            </div>
          </div>
          <div class="gift_name">戒指礼包</div>
          <div class="gift_list">
            <div
              class="award_item"
              v-for="(item, index) in gift_list2"
              :key="index"
            >
              <div class="award">
                <img :src="IconPath(item.icon)" alt="" />
                <div class="award_bottom">{{ item.text }}</div>
              </div>
              <div class="probability">{{ item.probability }}</div>
            </div>
          </div>
        </div>
      </div>
      <!--列表-->
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showPopup: false,
      gift_list1: [
        {
          icon: 'ljs_120_120.png',
          text: '+25',
          probability: '必出'
        },
        {
          icon: 'zjs_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'yb_120_120.png',
          text: '+2万',
          probability: '25%'
        },
        {
          icon: 'sgw_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'ljs_120_120.png',
          text: '+5',
          probability: '25%'
        }
      ],
      gift_list2: [
        {
          icon: 'mtjz_120_120.png',
          text: '戒指+1',
          probability: '必出'
        },
        {
          icon: 'qmtg_120_120.png',
          text: '+10',
          probability: '25%'
        },
        {
          icon: 'wrmm_120_120.png',
          text: '资料卡+1天',
          probability: '25%'
        },
        {
          icon: 'msm_120_120.png',
          text: '+1',
          probability: '25%'
        },
        {
          icon: 'kxt_120_120.png',
          text: '+1',
          probability: '25%'
        }
      ]
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
        height: 480px;
        background: linear-gradient(0deg, #ed96fd, #866ae0);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 47px;

        .title-image {
          width: 515px;
          height: 199px;
          position: absolute;
          top: -122px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .gift_name {
          width: 200px;
          height: 33px;
          background: #a559ec;
          border-radius: 17px 17px 0px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          margin-top: 14px;
        }
        .gift_list {
          width: 576px;
          height: 154px;
          background: #613aa3;
          opacity: 0.8;
          border-radius: 14px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0 14px;
          padding-top: 16px;
          .award_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .award {
              width: 96px;
              height: 96px;
              background: #ffffff;
              border: 3px solid #f0adff;
              border-radius: 14px;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-sizing: content-box;
              img {
                width: 70px;
                height: 70px;
              }
              .award_bottom {
                width: 100%;
                height: 28px;
                background: #8d64da;
                border-radius: 0px 0px 11px 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ffffff;
                white-space: nowrap;
              }
            }
            .probability {
              margin-top: 8px;
              font-size: 19px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #e6adff;
            }
          }
        }
        /**
        <div class="gift_list">
            <div
              class="award_item"
              v-for="(item, index) in gift_list1"
              :key="index"
            >
              <div class="award">
                <img :src="IconPath(item.icon)" alt="" />
                <div class="award_bottom"></div>
              </div>
              <div class="probability">{{ item.probability }}</div>
            </div>
          </div>
        */
      }
    }
  }
}
</style>
