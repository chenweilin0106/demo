<template>
  <div class="please-select" @click.self="clickClose" @touchmove.prevent.stop>
    <div class="prompt-main please-select-main" @touchmove.prevent.stop>
      <img
        :src="IconPath('tk_4.png')"
        class="tk-petal position-absolute pointer-none"
      />

      <img
        :src="IconPath('tk_3.png')"
        class="necklace pointer-none position-absolute"
      />
      <div class="please-select-head">
        <!--标题图片-->
        <img class="please-select-title" :src="IconPath('title_7.png')" />
      </div>

      <div class="please-select-content">
        <div class="select-title">{{ textObj[selectData.egg_type] }}</div>
        <div class="select-list">
          <div
            v-for="(item, index) in selectData.list"
            :key="index"
            class="select-item"
            @click="checked = index"
          >
            <div v-if="checked == index" class="light-box"></div>
            <div v-if="item.name.includes('绮丽钻戒')" class="label">
              <span>价值1314</span><img :src="IconPath('mk4_15.png')" />
            </div>
            <img
              v-if="item.icon"
              class="select-icon"
              :src="IconPath(item.icon)"
            />
            <public-json
              v-else-if="selectData.egg_type == '11'"
              class="select-icon"
              jsonName="sb_tsqs1"
              :userAvatar="$store.state.user_icon"
            />
            <div class="reward-text-1">
              <p>{{ item.name }}</p>
              <p v-if="item.other">{{ item.other }}</p>
            </div>
            <div class="reward-type">
              <img
                v-if="item.egg_type == '普通奖励'"
                :src="IconPath('text_1.png')"
              />
              <img v-else :src="IconPath('text_2.png')" />
            </div>
            <div class="reward-text-2">
              {{ item.desc }}
            </div>
            <div
              v-if="checked == index"
              class="confirm-button button-receive"
              @click="confirm"
            >
              确定
            </div>
          </div>
        </div>
        <!--只有炫彩蛋会出现该文本-->
        <div v-if="selectData.egg_type == 7" class="please-select-foot-text">
          注：瓜分奖励的数量以系统实时数据为准
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicJson from '@/pages/womenDay/components/PublicJson.vue'
export default {
  data() {
    return {
      checked: 2,
      textObj: {
        7: '炫彩蛋大奖',
        9: '光明蛋大奖',
        11: '星遇蛋大奖'
      }
    }
  },
  props: ['selectData'],
  components: { PublicJson },
  computed: {},
  created() {},
  watch: {},
  methods: {
    confirm() {
      this.$emit('confirm', this.checked + 1)
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.please-select {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  touch-action: none;

  .please-select-main {
    padding: 19px 20px 10px;
    width: 642px;
    position: relative;
    border-image-source: url('@/pages/womenDay/assets/tk_5.png');
    border-image-slice: 92 0 109 0 fill;
    border-image-width: 92px 0 109px 0;

    .please-select-head {
      .please-select-title {
        position: absolute;
        z-index: 3;
        width: 593px;
        height: 176px;
        top: -126px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .tk-petal {
      top: 10%;
      right: -13px;
      width: 78px;
      height: 154px;
    }

    .necklace {
      z-index: 3;
      width: 404px;
      height: 282px;
      left: -1px;
      top: -7px;
    }

    .please-select-content {
      position: relative;
      z-index: 2;
      width: 100%;
      padding-top: 50px;
      //margin-bottom: 40px;
      //height: 515px;
      font-size: 30px;
      //overflow: hidden;

      .select-title {
        margin: 0 auto 30px;
        font-size: 32px;
        width: fit-content;
        font-weight: 500;
        color: #ffffff;
      }

      .select-list {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        //margin-left: 76px;
        font-size: 26px;
        font-weight: 500;
        color: #f2d58d;
        padding: 0 30px 50px;

        .select-item {
          position: relative;
          width: 250px;
          height: 430px;
          background: url('@/pages/womenDay/assets/bg_3.png') no-repeat left
            top/100% 100%;

          &:nth-child(1) {
            margin-right: 39px;
          }

          .label {
            position: absolute;
            top: 12px;
            right: 21px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 126px;
            height: 35px;
            background: #46ac96;
            border-radius: 18px;
            white-space: nowrap;

            span {
              margin-left: -7px;
              font-size: 24px;
              font-weight: 500;
              color: #ffffff;
              transform: scale(0.83);
              white-space: nowrap;
            }

            > img {
              margin-left: -7px;
              width: 27px;
              height: 20px;
            }
          }

          .light-box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 284px;
            height: 464px;
            background: url('@/pages/womenDay/assets/bg_4.png') no-repeat left
              top/100% 100%;
          }

          .select-icon {
            display: block;
            margin: 30px auto 25px;
            width: 134px;
            height: auto;
            ::v-deep .micAvatar_img {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 70%;
              height: 70%;
            }
          }

          .reward-text-1 {
            margin: 0 auto 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: fit-content;
            height: 65px;
            font-size: 26px;
            font-weight: 500;
            color: #ffffff;

            p:nth-of-type(2) {
              color: #66ffcc;
            }
          }

          .reward-type {
            margin: 0 auto;
            width: 116px;
            height: 29px;

            > img {
              width: 100%;
            }
          }

          .reward-text-2 {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px auto 0;
            text-align: center;
            line-height: 30px;
            width: 238px;
            height: 100px;
            //background-color: #fff;
            font-size: 26px;
            font-weight: 500;
            color: #ffffff;
          }

          .confirm-button {
            position: absolute;
            bottom: -27px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 58px;
            border-radius: 32px;
          }
        }
      }

      .please-select-foot-text {
        width: fit-content;
        //margin-top: 50px;
        margin-bottom: 30px;
        margin-left: 76px;
        font-size: 26px;
        font-weight: 500;
        color: #fff5cc;
      }
    }
  }
}
</style>
