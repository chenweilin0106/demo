!
<template>
  <div class="container">
    <!-- 神豪日榜 -->
    <div class="award_list award_list1" v-show="tabflag == 1 && dayflag == 1">
      <div class="award_item">
        <img src="../../../assets/ljs_120_120.png" alt="" />
        <div class="name">绿晶石</div>
      </div>
      <div class="award_item">
        <PublicSvga
          class="lottie lottiets"
          svgaName="ts_ldzz"
          :userAvatar="$store.getters.user_icon"
        />
        <div class="name">头饰</div>
      </div>
    </div>
    <!-- 神豪总榜 -->
    <div class="award_list award_list2" v-show="tabflag == 1 && dayflag == 2">
      <div class="award_item">
        <img src="../../../assets/ljs_120_120.png" alt="" />
        <div class="name">绿晶石</div>
      </div>
      <div class="award_item">
        <PublicSvga
          class="lottie lottiets"
          svgaName="ts_ldzz"
          :userAvatar="$store.getters.user_icon"
        />
        <div class="name">头饰</div>
      </div>
      <div class="award_item">
        <div class="price">
          888<img src="../../../assets/zs_38_28.png" alt="" />
        </div>
        <div class="preview" @click="preview(1)">点击预览</div>
        <img src="../../../assets/xymf_120_120.png" alt="" />
        <div class="name">礼物赠送权</div>
      </div>
      <div class="award_item">
        <public-json jsonName="ch_zfz1" />
        <div class="name">属性称号</div>
      </div>
    </div>
    <!-- 礼物代言人-亲密糖果 -->
    <div
      class="award_list award_list3"
      v-show="tabflag == 2 && gift_tab_flag == 94"
    >
      <div class="award_item">
        <img src="../../../assets/yb_120_120.png" alt="" />
        <div class="name">元宝</div>
      </div>
      <div class="award_item">
        <public-json jsonName="qp_bxsj_sc" />
        <div class="name">气泡</div>
      </div>
      <div class="award_item">
        <div class="preview" @click="preview(2)">点击预览</div>
        <img src="../../../assets/qmtg_120_120.png" alt="" />
        <div class="name">礼物冠名权</div>
      </div>
    </div>
    <!-- 礼物代言人-一帆风顺 -->
    <div
      class="award_list award_list4"
      v-show="tabflag == 2 && gift_tab_flag == 34"
    >
      <div class="award_item">
        <img src="../../../assets/yb_120_120.png" alt="" />
        <div class="name">元宝</div>
      </div>
      <div class="award_item">
        <public-json jsonName="qp_bxsj_sc" />
        <div class="name">气泡</div>
      </div>
      <div class="award_item">
        <div class="preview" @click="preview(3)">点击预览</div>
        <img src="../../../assets/yffs_120_120.png" alt="" />
        <div class="name">礼物冠名权</div>
      </div>
    </div>
    <!-- 礼物代言人-浪漫木马 -->
    <div
      class="award_list award_list5"
      v-show="tabflag == 2 && gift_tab_flag == 32"
    >
      <div class="award_item">
        <img src="../../../assets/yb_120_120.png" alt="" />
        <div class="name">元宝</div>
      </div>
      <div class="award_item">
        <public-json jsonName="qp_bxsj_sc" />
        <div class="name">气泡</div>
      </div>
      <div class="award_item">
        <div class="preview" @click="preview(4)">点击预览</div>
        <img src="../../../assets/lmmm_120_120.png" alt="" />
        <div class="name">礼物冠名权</div>
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
.award_list,
.award_list1,
.award_list2,
.award_list3,
.award_list4,
.award_list5 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 31px;
  width: 338px;
  .award_item {
    width: 128px;
    height: 128px;
    background: linear-gradient(0deg, #ffffff, #ffdbee);
    border: 4px solid #8a8afe;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .price {
      width: 81px;
      height: 34px;
      background: #dc5e70;
      border-radius: 17px;
      position: absolute;
      top: -16px;
      right: -11px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
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
      background: linear-gradient(
        90deg,
        rgba(255, 221, 131, 0.41),
        #ffdd83,
        rgba(255, 221, 131, 0.4)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #bf8934;
      z-index: 99;
    }
    > img {
      width: 100%;
      height: 100%;
    }
    .lottie {
      overflow: hidden;
    }
    .lottiets {
      margin-top: -14px;
      width: 78%;
      height: 78%;
      ::v-deep .micAvatar_img {
        width: 82%;
        height: 82%;
      }
    }
    .name {
      position: absolute;
      bottom: -12px;
      width: 121px;
      height: 30px;
      background: #7956ca;
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
.award_list2 {
  width: 542px;
}
.award_list3,
.award_list4,
.award_list5 {
  width: 522px;
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
      background: linear-gradient(
        90deg,
        rgba(255, 221, 131, 0.41),
        #ffdd83,
        rgba(255, 221, 131, 0.4)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #bf8934;
    }
    .name {
      width: 130px;
    }
  }
}
</style>
