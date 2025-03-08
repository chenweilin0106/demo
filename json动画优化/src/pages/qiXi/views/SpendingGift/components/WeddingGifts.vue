<template>
  <div class="WeddingGifts">
    <div class="head flex_across">
      <img :src="IconPath('title_3.png')" />
    </div>
    <!-- 道具列表 -->
    <div class="WeddingGifts_list flex_across">
      <div
        class="theme_item gifts_item"
        v-for="item in marriage_gift.awards"
        :key="item.id"
      >
        <div class="img-top flex_across">
          <img v-if="item.icon" :src="IconPath(item.icon)" />
          <PublicJson
            v-else
            :lottieJson_name="mic_data[user_mic_type].name"
            :lottieJson="mic_data[user_mic_type].data"
            :userAvatar="$store.getters.user_icon"
          />
        </div>
        <div class="img-bottom">{{ item.text }}</div>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="WeddingGifts_btn flex_across"
      @click="getWeddingGifts"
      :class="{
        did_btn: marriage_gift.has_right == 1,
        theme_botton_done: marriage_gift.has_right == 2
      }"
    >
      {{ ButtonText('GoodsTask', marriage_gift.has_right) }}
    </div>
    <!-- 说明文本 -->
    <div class="ThemeBox_BottomText WeddingGifts_text">
      <ul>
        <li>
          <span></span>活动期间求婚并登记成功的，夫妻双方可领取【七夕结婚贺礼】
        </li>
        <li><span></span>每人只能领取一次</li>
      </ul>
    </div>
  </div>
</template>

<script>
// json组件
import PublicJson from '../../../components/PublicJson'
export default {
  name: 'WeddingGifts',
  components: {
    PublicJson
  },
  props: ['marriage_gift', 'user_gender', 'user_mic_type', 'mic_data'],
  methods: {
    getWeddingGifts() {
      this.marriage_gift.has_right == '1' && this.$emit('clickWeddingGiftsBtn')
    }
  }
}
</script>

<style scoped lang="scss">
.WeddingGifts {
  margin-top: 48px;
  margin-bottom: 58px;
  position: relative;
  width: 100%;
  height: 308px;
  background: url('../../../assets/mk3_1.png') no-repeat center top/100% auto;
  padding-top: 49px;
  .head {
    position: absolute;
    top: -48px;
    width: 100%;
    img {
      width: 229px;
    }
  }
  // 结婚贺礼奖励列表
  .WeddingGifts_list {
    .gifts_item {
      width: 84px;
      height: 84px;
      border: none !important;
      background: #ae88e7;
      padding: 2px;
      border-radius: 8px;
      &:nth-of-type(1) {
        margin-right: 24px;
      }
      .img-top {
        width: 100%;
        background: #fff;
        height: 57px;
        border-radius: 6px 6px 0 0;
        img {
          height: 100%;
        }
        .PublicJson {
          width: 54px;
          height: 55px;
          ::v-deep .micAvatar_img {
            width: 42px;
            height: 42px;
          }
        }
      }
      .img-bottom {
        font-size: 14px;
        border-radius: 0px 0px 6px 6px;
      }
    }
  }
  // 结婚贺礼领取按钮
  .WeddingGifts_btn {
    width: 138px;
    height: 34px;
    margin: 18px auto 20px;
    border-radius: 34px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(0deg, #7979ff, #92e4ff);
    border: 1px solid #ffffff;
  }
  .did_btn {
    background: linear-gradient(0deg, #895bfe, #faadff) !important;
  }
  // 结婚贺礼说明文本
  .WeddingGifts_text {
    margin-left: 10px;
    margin-right: 8px;
    line-height: 20px;

    li {
      font-size: 14px;
      position: relative;
      list-style-type: none;
      margin-left: 10px;
      padding-left: 3px;
      color: #6f59c3;

      img {
        position: relative;
        margin: 0 1px;
        width: 22px;
      }

      span {
        position: absolute;
        top: 7px;
        left: -10px;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #927ff3;
      }
    }
    padding-left: 25px;
    margin-left: 4px !important;
    margin-right: 21px !important;
  }
}
</style>
