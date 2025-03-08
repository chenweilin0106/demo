<template>
  <div class="DialogCongrats">
    <!-- 多个奖励 -->
    <div
      class="Multiple_Awards flex_across"
      :class="awardData.length === 1 && 'Only'"
    >
      <div
        class="AwardItem_Box"
        v-for="(award, index) in awardData"
        :key="index"
      >
        <div class="theme_item Award_Icon">
          <div
            v-if="['costume', 'mic', 'ring'].includes(award.type)"
            class="label flex_across"
          >
            <span v-if="award.type == 'costume'">主页特效</span>
            <span v-if="award.type == 'mic'">头饰</span>
            <span v-if="award.type == 'ring'">戒指</span>
          </div>
          <!-- 图片 -->
          <img v-if="award.icon" :src="IconPath(award.icon)" alt="" />
          <slot v-else :type="award.type" :goods_id="award.goods_id"></slot>
        </div>
        <!-- 名字 -->
        <div class="Award_Name">{{ award.name }}</div>
        <!--数量-->
        <div v-if="award?.type !== 'title'" class="Award_text">
          {{ award.text }}
        </div>
      </div>
    </div>
    <!-- 单个奖励 -->
    <!--<template v-else>-->
    <!--  <div class="theme_item OnlyAward_Icon">-->
    <!--    &lt;!&ndash; 图片 &ndash;&gt;-->
    <!--    <img v-if="awardData?.icon" :src="IconPath(awardData.icon)" alt="" />-->
    <!--    <slot v-else></slot>-->
    <!--  </div>-->
    <!--  &lt;!&ndash; 名字 &ndash;&gt;-->
    <!--  <div class="OnlyAward_Name">{{ awardName }}</div>-->
    <!--</template>-->
    <!-- 按钮 -->
    <div
      class="theme_botton_did DialogCongrats_Btn"
      @click="$emit('onCongratsBtn')"
    >
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
  margin-top: 15px;
  width: 300px;
  // 多个奖励
  .Multiple_Awards {
    //margin-top: 30px;
    width: 100%;
    //justify-content: space-between;
    //justify-content: space-evenly;
    //justify-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    //padding: 0 5px;
    padding-left: 5px;

    .AwardItem_Box {
      width: 68px;
      margin-bottom: 10px;
      margin-right: 5px;

      .Award_Icon {
        position: relative;
        // 图片
        width: 100%;
        height: 68px;
        border-radius: 10px;

        > img {
          width: 100%;
          background: #fefaef;
        }

        .label {
          position: absolute;
          z-index: 5;
          top: 1px;
          right: 1px;
          min-width: 30px;
          width: fit-content;
          height: 14px;
          background: #76b9ec;
          border-radius: 0px 6px 0px 6px;

          > span {
            //position: absolute;
            font-size: 9px;
            color: #ffffff;
            transform: scale(0.75);
          }
        }
      }

      .PublicSvga {
        ::v-deep .micAvatar_img {
          width: 80%;
          height: 80%;
        }
      }

      // 名字
      .Award_Name,
      .Award_text {
        margin: 5px auto 0;
        color: #fff;
        width: fit-content;
        text-align: center;
        white-space: nowrap;
        font-size: 12px;
      }
    }
  }

  .Only {
    justify-content: space-evenly;

    .AwardItem_Box {
      display: flex;
      flex-direction: column;
      align-items: center;
      //width: 98px;
      width: fit-content !important;
      margin-right: 0 !important;

      .Award_Icon {
        width: 98px;
        height: 98px;
        border-radius: 10px;
        border: 3px solid #c5eaeb !important;
      }

      .Award_Name {
        margin-top: 10px;
      }
    }
  }

  // 按钮
  .DialogCongrats_Btn {
    margin: 5px auto 22px;
    width: 160px;
    height: 36px;
    border-radius: 36px;
    font-size: 16px;
  }
}
</style>
