<template>
  <div class="DialogCongrats">
    <!-- 多个奖励 -->
    <div class="Multiple_Awards flex_across" v-if="isMultiple">
      <div class="AwardItem_Box" v-for="award in awardData" :key="award.name">
        <div class="theme_item Award_Icon">
          <!-- 图片 -->
          <img v-if="award.icon" :src="IconPath(award.icon)" alt="" />
          <slot v-else></slot>
        </div>
        <!-- 名字 -->
        <div class="Award_Name">{{ award.text }}</div>
      </div>
    </div>
    <!-- 单个奖励 -->
    <template v-else>
      <div class="theme_item OnlyAward_Icon">
        <!-- 图片 -->
        <img v-if="awardData?.icon" :src="IconPath(awardData.icon)" alt="" />
        <slot v-else></slot>
      </div>
      <!-- 名字 -->
      <div class="OnlyAward_Name">{{ awardName }}</div>
    </template>
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
 * @prop {String} awardName 奖励名字
 * @prop {Boolean} isMultiple 是否多个奖励
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
    },
    awardName: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.DialogCongrats {
  margin-top: 15px;
  // 多个奖励
  .Multiple_Awards {
    margin-top: 30px;
    width: 100%;
    justify-content: space-evenly;
    .AwardItem_Box {
      width: 64px;
      .Award_Icon {
        // 图片
        width: 100%;
        height: 64px;
        border-radius: 6px;
        > img {
          width: 100%;
          background: #fefaef;
        }
      }
      // 名字
      .Award_Name {
        margin: 5px auto 0;
        color: #fff;
        width: fit-content;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
  // 单个奖励图片
  .OnlyAward_Icon {
    width: 66px;
    height: 66px;
    margin: 5px auto;
    border-radius: 6px;
    img {
      width: 100%;
      // height: 100%;
      background: #fefaef;
    }
  }
  // 单个奖励名字
  .OnlyAward_Name {
    height: 14px;
    margin: 5px 0;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
  }
  // 按钮
  .DialogCongrats_Btn {
    margin: 25px auto 22px;
    width: 160px;
    height: 36px;
    border-radius: 36px;
    font-size: 16px;
  }
}
</style>
