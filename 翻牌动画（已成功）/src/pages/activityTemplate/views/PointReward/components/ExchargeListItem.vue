<template>
  <lazy-component class="bgc_horizontal ExchargeListItem">
    <div class="ExchargeListItem_Left">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon">
        <img
          v-lazy="IconPath(exchargeItem.goods_icon)"
          v-if="exchargeItem.goods_icon"
          alt=""
        />
        <div v-else class="pointRewardLottie flex_across">
          <PublicJson
            :lottieJson_name="
              exchargeItem.goods_type === 'mic' ? 'mfxz' : 'ch_mzzd'
            "
            :lottieJson="exchargeItem.goods_type === 'mic' ? mfxz : ch_mzzd"
            :userAvatar="
              exchargeItem.goods_type === 'mic' ? $store.getters.user_icon : ''
            "
          ></PublicJson>
        </div>
      </div>
      <!-- 道具名称 -->
      <div class="ExchargeItem_Name">
        {{ exchargeItem.goods_num_text }}
      </div>
    </div>
    <!-- 道具描述 -->
    <div class="ExchargeListItem_Center">
      <p v-if="exchargeItem.type === 'lucky_key'">
        消耗<span class="speical_color"
          >{{ exchargeItem.price }}个{{ pointName }}</span
        >兑换 第二个<span>半价</span>
      </p>
      <p v-else>
        消耗<span class="speical_color"
          >{{ exchargeItem.price }}个{{ pointName }}</span
        >兑换
      </p>
      <p v-if="exchargeItem.max_times == 0">不限兑换次数</p>
      <p v-else>
        限兑：{{ exchargeItem.exchange_times }}/{{ exchargeItem.max_times }}
      </p>
    </div>
    <!-- 兑换按钮 -->
    <div
      class="ExchargeListItem_Button"
      :class="ButtonStyle('ChargeGoods', exchargeItem.has_right)"
      @click="onExchargeClick(exchargeItem.has_right, exchargeItem.type)"
    >
      {{ ButtonText('chargeGoods', exchargeItem.has_right) }}
    </div>
  </lazy-component>
</template>

<script>
// 命中注定称号
import ch_mzzd from '../../../assets/lottie/ch_mzzd/data.json'
// 魔法星阵头饰
import mfxz from '../../../assets/lottie/mfxz/data.json'
// json动画组件
import PublicJson from '../../../components/PublicJson'
export default {
  name: 'ExchargeListItem',
  components: {
    PublicJson
  },
  props: ['exchargeItem', 'pointName'],
  data() {
    return {
      // json数据
      ch_mzzd,
      mfxz
    }
  },
  methods: {
    onExchargeClick(has_right, type) {
      if (has_right == 1) {
        this.$emit('onExchargeClick', type)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ExchargeListItem {
  position: relative;
  border: 2px solid #b6ccf8;
  display: flex;
  width: 334px;
  height: 100%;
  margin-bottom: 10px;
  // 图片样式
  .ExchargeListItem_Left {
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ExchargeItem_Icon {
      width: 100%;
      height: 62px;
      background: linear-gradient(180deg, #fffcec, #fdffdf);
      border-radius: 5px 0px 0px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .pointRewardLottie {
        ::v-deep .PublicJson {
          .micAvatar_img {
            top: 8px;
            width: 73%;
            height: 73%;
          }
          .PublicJsonLottiemfxz {
            width: 60px !important;
          }
          .PublicJsonLottiech_mzzd {
            width: 85% !important;
          }
        }
      }
      img {
        height: 100%;
      }
    }
    // 图片下方字体样式
    .ExchargeItem_Name {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      width: 100%;
      height: 18px;
      line-height: 18px;
      background: #1647af;
      border-radius: 0px 0px 0px 4px;
    }
  }
  // 中间字体样式
  .ExchargeListItem_Center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 13px;
    font-weight: 500;
    p {
      color: #ffffff;
      &:nth-child(2) {
        margin-bottom: 5px;
        font-size: 12px;
      }
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
