<template>
  <div class="exchangeItem margin-row-center" :class="`level_${level}`">
    <div v-if="level != 1" class="tipText text-center text-nowrap line-height-100" :class="level == 2 ? 'purple' : 'orange'">
      <template v-if="level == 2">消耗{{ spend_max }}个月饼后解锁（<i :style="{ color: +spend_nums < +spend_max ?  '#F54820' : 'inherit' }">{{ numberLimit(spend_nums, spend_max) }}</i>/{{ spend_max }}）</template>
      <template v-else>每兑换1次S赏可增加1次SSS赏奖励兑换次数</template>
    </div>
    <div v-for="(item, index) in exchange_list" :key="index" class="goodsCard position-relative margin-row-center overflow-hidden flex">
      <div class="awardBox flex-column align-center">
        <div class="iconBox flex-column position-relative">
          <div class="icon flex align-center justify-center">
            <PublicImg :imgName="item.award[0].icon" :class="item.award[0].type" :imgType="item.award[0].type" />
          </div>
          <template v-if="item.award[0].type == 'ring'">
            <div class="newLabel position-absolute line-height-100 flex align-center justify-center text-nowrap">新</div>
            <div class="priceLabel position-absolute line-height-100 flex align-center justify-center text-nowrap">1314<img :src="IconPath('zs_27_20.png')" class="diamond" /></div>
          </template>
          <div v-if="typeToNameMap[item.award[0].type]" class="typeLabel position-absolute line-height-100 flex align-center justify-center text-nowrap">{{ typeToNameMap[item.award[0].type] }}</div>
          <template v-if="isLevel3">
            <div class="limitLabel position-absolute line-height-100 flex align-center justify-center text-nowrap">中秋限定</div>
            <img :src="IconPath('mk5_13.png')" class="clickPreview position-absolute" @click="$emit('openPreviewPopup')" />
          </template>
          <div class="text flex-1 flex align-center justify-center line-height-100 text-nowrap">{{ item.award[0].text }}</div>
        </div>
        <div v-if="!isLevel3" class="limit line-height-100 text-nowrap">{{ item.max_times ?  `限兑:${item.finish_times}/${item.max_times}` : '不限次数' }}</div>
      </div>
      <img :src="IconPath('mk4_17.png')" class="arrow" />
      <div class="consumeList flex align-center">
        <div v-for="(cake, cakeIndex) in item.spend.length == 5 ? item.spend : item.spend.concat(defaultCakeList).splice(0, 5)" :key="cakeIndex" class="cakeIcon flex align-center justify-center position-relative">
          <img v-if="cake.icon" :src="IconPath(cake.icon)" class="moonCake" />
          <div v-if="cake.nums" class="num position-absolute"><span :class="+cakeNum[cake.id] < +cake.nums && 'less'">{{ cakeNum[cake.id] }}</span>/{{ cake.nums }}</div>
        </div>
      </div>
      <div v-if="isLevel3" class="exchangeNum position-absolute line-height-100 text-nowrap">剩余兑换次数：{{ item.left_times }}</div>
      <PublicButton :class="item.has_right == 0 && 'lock'" :hasRight="item.has_right == 0 ? 1 : item.has_right" class="exchange position-absolute" @click="exchange({ ...item, index })">
        {{ item.has_right == 2 ? '已兑完' : '兑换' }}
      </PublicButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { _throttle, numberLimit, getNowFormatDate } from '@/utils/tool'
export default {
  name: 'exchangeItem',
  props: ['level', 'exchange_list', 'cakeNum', 'spend_max', 'spend_nums'],
  data() {
    return {
      defaultCakeList: Object.freeze([
        { icon: '', nums: '', id: '' },
        { icon: '', nums: '', id: '' },
        { icon: '', nums: '', id: '' },
        { icon: '', nums: '', id: '' },
        { icon: '', nums: '', id: '' }
      ])
    }
  },
  computed: {
    ...mapState(['typeToNameMap']),
    isLevel3() {
      return this.level == 3
    }
  },
  created() {
  },
  methods: {
    numberLimit,
    exchange: _throttle(function(params) {
      if (params.has_right != 1) return
      if (!params.spend.filter(item => item.id).every(item => this.cakeNum[item.id] >= item.nums)) return this.$toast('月饼不足')
      const info = { level: this.level, index: params.index, goods_id: params.goods_id }
      const checked = JSON.parse(window.localStorage.getItem(`${this.$store.state.uid}_${getNowFormatDate()}_exchange`))
      if (!checked) return this.$emit('openConfirmPopup', { ...info, name: params.award[0].show_text, popupType: 'exchange' })
      this.$emit('exchange', info)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.exchangeItem {
  padding-top: 61px;
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
  &.level_1 {
    width: 682px;
    height: 972px;
    background: url('@/pages/midAutumn/assets/mk4_9.png') no-repeat left top/100% 100%;
  }
  &.level_2 {
    width: 682px;
    height: 572px;
    background: url('@/pages/midAutumn/assets/mk4_10.png') no-repeat left top/100% 100%;
  }
  &.level_3 {
    width: 682px;
    height: 350px;
    background: url('@/pages/midAutumn/assets/mk4_11.png') no-repeat left top/100% 100%;
  }
  .tipText {
    font-weight: 500;
    font-size: 26px;
    margin-bottom: 23px;
    &.purple {
      color: #7A2ADD;
    }
    &.orange {
      color: #E75918;
    }
  }
  .goodsCard {
    width: 659px;
    height: 210px;
    background: linear-gradient(90deg, #EF8133, #FFC45D);
    border-radius: 20px;
    margin-bottom: 13px;
    &:last-child {
      margin-bottom: 0;
    }
    .awardBox {
      margin-top: 12px;
      margin-left: 12px;
      width: 128px;
      .iconBox {
        width: 100%;
        height: 128px;
        border-radius: 24px;
        background-color: #FFC05C;
        padding: 4px;
        .icon {
          background: #fff;
          border-radius: 20px 20px 0 0;
          height: 87px;
          .chat_bubble_pub {
            width: 118px;
            height: auto;
          }
          .voice {
            width: 90px;
            height: 90px;
          }
        }
        .text {
          width: 100%;
          background: #B55023;
          border-radius: 0 0 20px 20px;
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
        }
        .newLabel {
          top: -10px;
          left: -11px;
          width: 46px;
          height: 38px;
          background: linear-gradient(-90deg, #22BBB2, #379BF0);
          border-radius: 19px 19px 0 19px;
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
        }
        .typeLabel {
          right: -17px;
          transform: none;
          top: -10px;
        }
        .limitLabel {
          top: -10px;
          right: -17px;
          height: 30px;
          background: #E15008;
          border-radius: 15px;
          padding: 7px;
          font-weight: 500;
          font-size: 18px;
          color: #FFFFFF;
        }
        .priceLabel {
          top: -10px;
          right: -17px;
          height: 34px;
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          padding: 10px;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          .diamond {
            width: 27px;
            height: 20px;
          }
        }
        .clickPreview {
          top: 65px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 26px;
        }
      }
      .limit {
        margin-top: 6px;
        font-weight: bold;
        font-size: 22px;
        color: #FFE361;
      }
    }
    .arrow {
      margin: 56px 8px 0 7px;
      width: 18px;
      height: 29px;
    }
    .consumeList {
      height: fit-content;
      padding-top: 25px;
      .cakeIcon {
        margin-right: 5px;
        width: 89px;
        height: 89px;
        background: linear-gradient(180deg, #FFF5BF, #FFFFFF);
        border-radius: 50%;
        border: 4px solid #F37F4B;
        &:last-child {
          margin-right: 0;
        }
        .moonCake {
          width: 62px;
          height: 65px;
        }
        .num {
          bottom: -4px;
          left: 50%;
          transform: translate(-50%, 100%);
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
          .less {
            color: #E6402A;
          }
        }
      }
    }
    .exchangeNum {
      font-weight: bold;
      font-size: 22px;
      color: #FFE361;
      bottom: 28px;
      left: 18px;
    }
    .exchange {
      position: absolute;
      bottom: 15px;
      right: 11px;
      width: 120px;
      height: 46px;
      border-radius: 23px;
      &.lock {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
}
</style>
