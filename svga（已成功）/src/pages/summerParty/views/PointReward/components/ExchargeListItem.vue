<template>
  <div class="bgc_horizontal ExchargeListItem">
    <div class="ExchargeListItem_Left flex_vertical">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon flex_across">
        <!-- 道具图标 -->
        <img
          :src="IconPath(exchargeItem.goods_icon)"
          v-if="exchargeItem.goods_icon"
          alt=""
        />
        <!-- json容器 -->
        <div v-else class="pointRewardLottie flex_across">
          <PublicJson
            :lottieJson_name="
              exchargeItem.goods_type === 'mic' ? 'ts_qctd' : 'ch_xyhh'
            "
            :lottieJson="exchargeItem.goods_type === 'mic' ? ts_qctd : ch_xyhh"
            :userAvatar="
              exchargeItem.goods_type === 'mic' ? $store.getters.user_icon : ''
            "
          ></PublicJson>
        </div>
        <!-- 锁定状态 -->
        <div class="lockStatus flex_across" v-if="isLock">
          <img :src="IconPath('mk1_1.png')" alt="" />
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
      <p v-if="exchargeItem.max_times == 0" :class="{ Middle_Text: isLock }">
        不限兑换次数
      </p>
      <!-- 判断是否是锁定状态样式 -->
      <p v-else :class="{ Middle_Text: isLock }">
        限兑：{{ exchargeItem.exchange_times }}/{{ exchargeItem.max_times }}
      </p>
      <!-- 锁定状态 -->
      <p class="lockStatus_Text" v-if="isLock">
        累计消耗{{ exchargeItem.spend_cond }}个冰块解锁
      </p>
    </div>
    <!-- 兑换按钮 -->
    <div
      v-if="!exchargeItem.spend_cond || exchargeItem.spend_cond <= spend_point"
      class="ExchargeListItem_Button"
      :class="ButtonStyle('ChargeGoods', exchargeItem.has_right)"
      @click="onExchargeClick(exchargeItem.has_right, exchargeItem.type)"
    >
      {{ ButtonText('chargeGoods', exchargeItem.has_right) }}
    </div>
  </div>
</template>

<script>
// 夏夜花火
import ch_xyhh from '../../../assets/lottie/ch_xyhh/data.json'
// 七彩天地头饰
import ts_qctd from '../../../assets/lottie/ts_qctd/data.json'
// json动画组件
import PublicJson from '../../../components/PublicJson'
export default {
  name: 'ExchargeListItem',
  components: {
    PublicJson
  },
  props: ['exchargeItem', 'pointName', 'spend_point'],
  data() {
    return {
      // json数据
      ts_qctd,
      ch_xyhh
    }
  },
  computed: {
    // 是否锁定
    isLock() {
      return this.exchargeItem.spend_cond > this.spend_point
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
  // border: 2px solid #b6ccf8;
  display: flex;
  width: 334px;
  height: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  // 图片样式
  .ExchargeListItem_Left {
    width: 120px;
    height: 100%;
    justify-content: center;
    // font-size: 14px;
    .ExchargeItem_Icon {
      position: relative;
      width: 100%;
      height: 62px;
      // background: linear-gradient(180deg, #fffcec, #fdffdf);
      // border-radius: 5px 0px 0px 0px;

      // json容器
      .pointRewardLottie {
        ::v-deep .PublicJson {
          .micAvatar_img {
            width: 73%;
            height: 73%;
            // > img {
            // }
          }
          .PublicJsonLottiets_qctd {
            width: 60px !important;
          }
          .PublicJsonLottiech_xyhh {
            width: 85% !important;
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
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        > img {
          width: 15px;
          height: auto;
        }
      }
    }
    // 图片下方字体样式
    .ExchargeItem_Name {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      // color: #ffffff;
      width: 100%;
      height: 18px;
      line-height: 18px;
      // background: #1647af;
      // border-radius: 0px 0px 0px 4px;
    }
  }
  // 中间字体样式
  .ExchargeListItem_Center {
    display: flex;
    flex-direction: column;
    // justify-content: space-evenly;
    margin-left: 13px;
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
