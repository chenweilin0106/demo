!
<template>
  <div class="container">
    <!-- 财神日榜 -->
    <div class="award_list award_list1" v-show="tabflag == 1 && dayflag == 1">
      <div class="award_item">
        <div class="price">
          3888<img src="../../../assets/zs_27_20.png" alt="" />
        </div>
        <div class="preview" @click="preview(1)"></div>
        <img src="../../../assets/csd_120_120.png" alt="" />
        <div class="name">礼物赠送权</div>
      </div>
    </div>
    <!-- 财神总榜 -->
    <div class="award_list award_list2" v-show="tabflag == 1 && dayflag == 2">
      <div class="award_item">
        <public-json jsonName="mp_lncs" />
        <div class="name">铭牌</div>
      </div>
      <div class="award_item">
        <PublicSvga
          class="lottie lottiets"
          svgaName="ts_csll"
          :userAvatar="$store.state.user_icon"
        />
        <div class="name">头饰</div>
      </div>
      <div class="award_item">
        <img src="../../../assets/yb_120_120.png" alt="" />
        <div class="name">元宝</div>
      </div>
    </div>
    <!-- 名人日榜 -->
    <div class="award_list award_list3" v-show="tabflag == 2 && dayflag == 1">
      <div class="award_item">
        <!-- <public-svga svgaName="car_yfly" /> -->
        <img src="../../../assets/frxl_120_120.png" alt="" />
        <div class="preview" @click="preview(2)"></div>
        <div class="name">座驾</div>
      </div>
      <div class="award_item">
        <img src="../../../assets/cbt_120_120.png" alt="" />
        <div class="name">藏宝图</div>
      </div>
    </div>
    <!-- 名人总榜 -->
    <div class="award_list award_list4" v-show="tabflag == 2 && dayflag == 2">
      <div class="award_item">
        <public-json jsonName="mp_lnmx" />
        <div class="name">铭牌</div>
      </div>
      <div class="award_item">
        <img src="../../../assets/hjcbt_120_120.png" alt="" />
        <div class="name">黄金藏宝图</div>
      </div>
      <div class="award_item">
        <img src="../../../assets/ljs_120_120.png" alt="" />
        <div class="name">绿晶石</div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicSvga from '../../../components/PublicSvga.vue'
import PublicJson from '../../../components/PublicJson.vue'
export default {
  components: { PublicSvga, PublicJson },
  props: ['gift_tab_flag', 'dayflag', 'tabflag'],
  methods: {
    preview(i) {
      this.$emit('preview', i)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
}
.award_list,
.award_list1,
.award_list2,
.award_list3,
.award_list4 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 48px;
  width: 338px;
  .award_item {
    width: 158px;
    height: 128px;
    background: linear-gradient(180deg, #ffebbf, #ffffff);
    border: 4px solid #d25e2a;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .price {
      height: 34px;
      background: #e14629;
      border-radius: 17px;
      position: absolute;
      top: -17px;
      right: -21px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      padding-left: 13px;
      padding-right: 8px;
      img {
        height: 20px;
        margin-left: 2px;
      }
    }
    .preview {
      position: absolute;
      top: 76px;
      width: 100%;
      height: 26px;
      background-image: url('../../../assets/mk8_5.png');
      background-size: 100% 100%;
      z-index: 99;
    }
    > img {
      height: 100%;
    }
    .lottie {
      overflow: hidden;
    }
    .lottiets {
      margin-top: -14px;
      width: 102px;
      height: 102px;
      ::v-deep .micAvatar_img {
        width: 82%;
        height: 82%;
      }
    }
    .name {
      position: absolute;
      bottom: -12px;
      width: 130px;
      height: 30px;
      background: #b55023;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.award_list1 {
  width: 150px;
}
.award_list2,
.award_list4 {
  width: 520px;
}
.award_list3 {
  width: 339px;
  .award_item {
    width: 150px;
    > img {
      width: 120px;
      height: 120px;
    }
    .preview {
      position: absolute;
      top: 76px;
      width: 100%;
      height: 26px;
      background-image: url('../../../assets/mk8_5.png');
      background-size: 100% 100%;
    }
    .name {
      width: 130px;
    }
  }
}
</style>
