<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('tk_6_44.png')" />

      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--奖励列表-->
        <div class="list flex align-center justify-center">
          <div v-for="(award, index) in list" :key="index" class="award flex-column align-center justify-center">
            <div class="iconBox position-relative flex align-center justify-center">
              <img v-if="award.tip" :src="IconPath('tk_6_40.png')" class="tipLabel position-absolute" />
              <div v-if="award.price" class="priceLabel line-height-100 position-absolute flex align-center justify-center flex-no-wrap">
                {{ award.price }}<img :src="IconPath('zs_27_20.png')" />
              </div>
              <img v-if="award.icon" :src="IconPath(award.icon)" class="icon w-100 h-100" />
              <public-svga v-else svgaName="ts_yhzl" :userAvatar="$store.state.user_icon" />
            </div>
            <div class="name">{{ award.name }}</div>
          </div>
        </div>

        <!--form1-->
        <img :src="IconPath('tk_8.png')" class="table" />

        <div class="rule-text">
          <ul>
            <li><span></span>活动期间新增亲密度日榜前10名的绑定</li>
            <li>用户，双方可获得对应奖励</li>
          </ul>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import PublicSvga from '@/pages/whiteValentine/components/PublicSvga.vue'

export default {
  components: { PublicSvga },
  data() {
    return {
      list: Object.freeze([
        { icon: 'jz_hysy_120.png', name: '花雨誓约', price: 9999, tip: true },
        { icon: '', name: '樱花之恋', price: null, tip: true },
        { icon: 'cbt_120_120.png', name: '藏宝图', price: null, tip: false }
      ]),
      showPopup: false
    }
  },
  computed: {},
  created() {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(params) {
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: relative;
  width: 620px;
  height: 774px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;

  .inner {
    padding-top: 73px;
    border-radius: 24px;
    background: linear-gradient(180deg, #fff3f4, #f9c4c7);
  }
}

.title-image {
  width: 644px;
  height: 230px;
  position: absolute;
  z-index: 3;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.list {
  .award {
    &:nth-child(2) {
      margin: 0 46px;
    }
    .iconBox {
      width: 128px;
      height: 128px;
      border-radius: 16px;
      padding: 4px;
      background-color: #f6a1b0;
      .tipLabel {
        z-index: 1;
        width: 84px;
        height: 27px;
        top: -13px;
        left: -24px;
      }
      .priceLabel {
        z-index: 1;
        height: 33px;
        background: linear-gradient(90deg, #ee688c, #c5b5ee);
        border-radius: 0px 0px 12px 12px;
        bottom: 4px;
        left: 4px;
        width: 120px;
        font-weight: 500;
        font-size: 22px;
        color: #ffffff;
        > img {
          margin-left: 5px;
          width: 27px;
          height: 20px;
        }
      }

      .PublicSvga {
        border-radius: 12px;
        background-color: #fefaef;
        ::v-deep .micAvatar_img {
          top: 18px;
          left: 18px;
          width: 75%;
          height: 75%;
        }
      }
      .icon {
        border-radius: 12px;
        background-color: #fefaef;
      }
    }
    .name {
      margin-top: 18px;
      font-weight: 500;
      font-size: 28px;
      color: #b35553;
    }
  }
}
.table {
  margin: 20px auto 35px;
  display: block;
  width: 551px;
  height: 340px;
}
.rule-text {
  margin-left: 64px;
  width: 480px;
  line-height: 40px;
  span {
    top: 14px;
  }
}
</style>
