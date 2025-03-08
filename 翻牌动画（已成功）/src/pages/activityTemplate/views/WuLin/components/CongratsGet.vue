<template>
  <div class="CongratsGet">
    <!-- main -->
    <div class="CongratsGet_main flex_across">
      <!-- 多个奖励 -->
      <template v-if="dialogType === 'isMultiple'">
        <div class="lottery_award_item img_box flex_vertical">
          <div class="top_img">
            <img :src="IconPath(award.icon)" alt="" />
          </div>
          <div class="bottom_text">{{ award.text }}</div>
        </div>
      </template>
      <!-- 单个奖励 -->
      <div class="lottery_award_item img_box flex_vertical">
        <div class="top_img">
          <template v-if="awardData.icon">
            <img
              v-if="awardData.name !== '靓号券包'"
              :src="require(`../../assets/${awardData.icon}`)"
              alt=""
            />
            <img v-else :src="require('../../assets/lhq_120_120.png')" alt="" />
          </template>
          <PublicJson
            v-else
            :lottieJson_name="'gbw'"
            :lottieJson="gbw"
            :userAvatar="pageData.user_icon"
            :eleClass="'dialog_gbw'"
          ></PublicJson>
        </div>
        <div class="bottom_text">
          {{ CongratulateBox_AwardName }}
        </div>
      </div>
    </div>
    <!-- button -->
    <div
      class="theme_botton_did CongratulateBox_button flex_across"
      @click="ClickCongrats"
    >
      {{ ButtonText(equipObj, awardData.type) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CongratsGet',
  components: {},
  props: ['isMultiple', 'awardData'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.CongratsGet {
  .CongratsGet_main {
    margin-top: 30px;
    width: 100%;
    justify-content: space-evenly;
    .lottery_award_item {
      .img_box {
        width: 64px;
        .top_img {
          width: 100%;
          height: 64px;
          background: #fefaef;
          border: 2px solid #fbd261;
          border-radius: 6px;
          > img {
            width: 100%;
          }
        }
        .bottom_text {
          margin-top: 5px;
          color: #fff;
          width: fit-content;
          text-align: center;
          white-space: nowrap;
        }
      }
    }
  }
  .CongratulateBox_button {
    margin: 30px auto 20px;
    width: 162px;
    height: 38px;
    border-radius: 18px;
    font-size: 16px;
  }
}
</style>
