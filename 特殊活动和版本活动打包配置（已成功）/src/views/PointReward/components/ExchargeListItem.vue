<template>
  <div class="bgc_horizontal ExchargeListItem">
    <div class="ExchargeListItem_Left flex_vertical">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon flex_across">
        <!-- 道具图标 -->
        <img :src="IconPath(exchargeItemStatic.goods_icon)" v-if="exchargeItemStatic.goods_icon" alt="" />
        <!-- json容器 -->
        <div v-else class="pointRewardLottie flex_across" @click="preview()">
          <PublicJson v-if="exchargeItemStatic.goods_type == 'voice'" :lottieJson_name="'sb_tmbb'" :lottieJson="sb_tmbb"
            :userAvatar="$store.getters.user_icon">
          </PublicJson>
          <PublicSvga v-if="exchargeItemStatic.goods_type == 'ring'" :svgaName="'jz_llzh'">
          </PublicSvga>
        </div>
      </div>
      <!-- 道具名称 -->
      <div class="ExchargeItem_Name">
        {{ exchargeItemStatic.goods_num_text }}
      </div>
      <!-- 上线限定 -->
      <div class="limit" v-if="exchargeItemStatic.islast"></div>
      <!-- 标签 -->
      <div class="label" v-if="exchargeItemStatic.islast">价值21999<img src="../../../assets/zs_60_60.png" alt=""></div>
    </div>
    <!-- 道具描述 -->
    <div class="ExchargeListItem_Center">
      <p>
        消耗<span class="speical_color">{{ exchargeItemStatic.price }}个{{ pointName }}</span>兑换
      </p>
      <p v-if="exchargeItem.max_times == 0">
        不限兑换次数
      </p>
      <!-- 判断是否是锁定状态样式 -->
      <p v-else>
        限兑：{{ exchargeItem.finish_times }}/{{ exchargeItem.max_times }}
      </p>
    </div>
    <!-- 兑换按钮 -->
    <div v-if="!exchargeItem.spend_cond || exchargeItem.spend_cond <= spend_point" class="ExchargeListItem_Button"
      :class="ButtonStyle('ChargeGoods', exchargeItem.has_right)"
      @click="onExchargeClick(exchargeItem.has_right, exchargeItem.type)">
      {{ ButtonText('chargeGoods', exchargeItem.has_right) }}
    </div>
  </div>
</template>

<script>
// 甜蜜波波声波
import sb_tmbb from '../../../assets/lottie/sb_tmbb/data.json'
// json动画组件
import PublicJson from '../../../components/PublicJson'
// svga动画组件
import PublicSvga from '../../../components/PublicSvga'
export default {
  name: 'ExchargeListItem',
  components: {
    PublicJson,
    PublicSvga
  },
  props: ['exchargeItem', 'pointName', 'spend_point', 'exchargeItemStatic', 'index'],
  data() {
    return {
      // json数据
      sb_tmbb
    }
  },
  computed: {
  },
  methods: {
    onExchargeClick(has_right, type) {
      if (has_right == 1) {
        this.$emit('onExchargeClick', this.index)
      }
    },
    preview() {
      if (this.exchargeItemStatic.goods_type == 'voice') {
        this.$emit('preview', 1)
      }
      if (this.exchargeItemStatic.goods_type == 'ring') {
        this.$emit('preview', 2)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ExchargeListItem {
  position: relative;
  display: flex;
  width: 334px;
  height: 100%;
  margin-bottom: 10px;

  // 图片样式
  .ExchargeListItem_Left {
    width: 120px;
    height: 100%;
    justify-content: center;
    position: relative;

    .ExchargeItem_Icon {
      position: relative;
      width: 100%;
      height: 62px;
      overflow: visible;
      border-radius: 3px 0px 0px 0px;

      // json容器
      .pointRewardLottie {
        width: 60px;
        height: 60px;

        ::v-deep .PublicJson {
          .micAvatar_img {
            width: 73%;
            height: 73%;
            // > img {
            // }
          }
        }
      }

      // 图片icon
      img {
        height: 100%;
      }

      // 锁定样式
      .lockStatus {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 62px;
        border-radius: 5px 0px 0px 0px;
        background: rgba(0, 0, 0, 0.5);

        >img {
          width: 15px;
          height: auto;
        }
      }
    }

    // 图片下方字体样式
    .ExchargeItem_Name {
      position: relative;
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      width: 100%;
      height: 18px;
      line-height: 18px;
      border-radius: 0px 0px 0px 4px;
    }

    .limit {
      width: 58px;
      height: 19px;
      background-image: url('../../../assets/mk1_5.png');
      background-size: 100% 100%;
      position: absolute;
      top: -5px;
      right: -9px;
    }

    .label {
      width: 78px;
      height: 17px;
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 0px 10px 0px 10px;
      display: flex;
      align-items: center;
      padding-left: 6px;
      padding-right: 3px;
      position: absolute;
      right: 0;
      bottom: 18px;
      font-size: 11px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      white-space: nowrap;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  // 中间字体样式
  .ExchargeListItem_Center {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 13px;
    border-radius: 0 5px 5px 0;

    p {
      color: #ffffff;

      &:nth-child(1) {
        margin-top: 14px;
        font-size: 14px;
        font-weight: 500;
      }

      &:nth-child(2) {
        margin-top: 22px;
        font-size: 12px;
      }
    }

    .Middle_Text {
      margin: 5px 0 !important;
    }

    .lockStatus_Text {
      font-size: 13px !important;
    }
  }

  // 按钮样式
  // 兑换
  .ExchargeListItem_Button {
    position: absolute;
    bottom: 8px;
    right: 12px;
    width: 64px;
    height: 28px;
    border-radius: 28px;
    // border: 1px solid #9eb4e4 !important;
  }
}
</style>
