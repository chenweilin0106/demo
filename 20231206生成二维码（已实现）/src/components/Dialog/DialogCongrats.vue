<template>
  <div class="DialogCongrats">
    <div class="Multiple_Awards flex_across">
      <div
        class="AwardItem_Box"
        v-for="(award, index) in awardData"
        :key="index"
      >
        <div class="Award_Icon" :class="{ title_box: award.type === 'title' }">
          <!-- 左上角label -->
          <!--          <div class="label flex_across">-->
          <!--            <img-->
          <!--              v-if="labelIcon[award.type]"-->
          <!--              :src="IconPath(labelIcon[award.type])"-->
          <!--            />-->
          <!--          </div>-->
          <div class="icon_main">
            <!-- 图片 -->
            <img v-if="award.icon" :src="IconPath(award.icon)" />
            <slot v-else :type="award.type" :goods_id="award.goods_id"></slot>
          </div>
        </div>
        <div class="Award_Name">
          <!-- 名字 -->
          <p>{{ award.text }}</p>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="DialogCongrats_Btn flex_across" @click="$emit('onCongratsBtn')">
      {{ btnText }}
    </div>
  </div>
</template>

<script>
/**
 * @name DialogCongrats
 * @description: 恭喜获得弹框（目前未在上线项目中使用）

 * @prop {Object} awardData 奖励数据
 * @prop {String} btnText 按钮文案
 * @slot 用于传入json动画
 */
export default {
  name: 'DialogCongrats',
  components: {},
  data() {
    return {
      // labelIcon: Object.freeze({
      //   costume: 'ic_costume.png',
      //   title: 'ic_title.png',
      //   mic: 'ic_mic.png',
      //   car: 'ic_car.png',
      //   voice: 'ic_voice.png',
      //   ring: 'ic_ring.png',
      //   chat_bubble: 'ic_chat_bubble.png'
      // })
    }
  },
  props: {
    awardData: {
      type: [Object, Array]
    },
    btnText: {
      type: String,
      default: '我知道了'
    }
  }
}
</script>

<style scoped lang="scss">
.DialogCongrats {
  position: relative;
  padding-top: 100px;

  .Multiple_Awards {
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0 28px;

    .AwardItem_Box {
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;

      .Award_Icon {
        // 图片
        position: relative;
        margin: 0px 10px 0;
        width: 128px;
        height: 128px;
        background: linear-gradient(180deg, #2d214d, #43358d);
        border: 4px solid #8273cb;
        border-radius: 16px;

        .icon_main {
          width: 100%;
          height: 100%;
          border-radius: 12px;

          > img {
            width: 100%;
            border-radius: 16px;
          }

          #ts_jjzy {
            ::v-deep .micAvatar_img {
              width: 88px;
              height: 88px;
            }

            ::v-deep .svga_box {
              width: 108px;
              height: 108px;
            }
          }

          #ts_ymml1 {
            ::v-deep .micAvatar_img {
              width: 88px;
              height: 88px;
            }

            ::v-deep .svga_box {
              width: 108px;
              height: 108px;
            }
          }
        }

        //.label {
        //  position: absolute;
        //  top: 0;
        //  right: 0;
        //  height: 12px;
        //  > img {
        //    height: 100%;
        //  }
        //}
      }

      .title_box {
        width: 188px !important;
        height: 128px !important;
      }

      // 名字
      .Award_Name {
        margin: 17px auto 0;
        color: #fff;
        width: fit-content;
        text-align: center;
        white-space: nowrap;
        font-size: 24px;

        p:nth-child(1) {
          margin-bottom: 6px;
        }
      }
    }
  }

  // 按钮
  .DialogCongrats_Btn {
    margin: 41px auto 0;
    width: 324px;
    height: 76px;
    background: linear-gradient(0deg, #ff803b, #ffc046);
    border: 2px solid #ffffff;
    border-radius: 38px;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
