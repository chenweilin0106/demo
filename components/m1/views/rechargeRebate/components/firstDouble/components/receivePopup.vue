<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" :class="isBigContent?'bigContent':'smallContent'" @touchmove.prevent.stop>
        <!--天降好运 || 好运爆棚-->
        <div class="title margin-row-center"></div>

        <!--绿晶石奖励翻到10倍!-->
        <div class="text margin-row-center flex align-center justify-center text-nowrap line-height-1">
          绿晶石奖励翻到<i class="deep">{{config[0]?.double_nums}}倍</i>!
        </div>

        <div class="awardsList flex justify-center align-center">
          <div v-for="(item,index) in config" :key="index" class="award">
            <div class="awardIcon position-relative">
              <img v-if="item.mark&&item.type=='car'" :src="IconPath('tk_8.png')" class="firstLabel position-absolute" />
              <img v-if="item.mark&&item.type=='mic'" :src="IconPath('mk2_16.png')" class="micFirstLabel position-absolute" />
              <img v-else-if="item.mark&&item.type!='car'&&item.type!='mic'" :src="IconPath(item.mark)" class="multipleLabel position-absolute" />
              <!--用户头像 用于静态头像-->
              <img v-if="item.type=='mic'" :src="IconPath($store.state.user_icon)" class="avatar position-absolute position-center" @error="imgAtError" />
              <img :src="IconPath(item.icon)" class="icon position-relative h-100 width-auto" />
            </div>
            <div class="awardText flex align-center justify-center line-height-1 text-nowrap">{{item.text}}</div>
          </div>
        </div>
        <PublicButton has-right="1" class="button" @click="clickClose">开心收下</PublicButton>
      </div>
    </div>
  </transition>
</template>

<script>
import { imgAtError } from '@/utils/tool'

export default {
  props: ['config'],
  data() {
    return {
      // config: [
      //   { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 10, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'X10.png' },
      //   { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20' },
      //   { type: 'car', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'tk_13.png' }
      // ],
    }
  },
  computed: {
    isBigContent() {
      return +this.config[0]?.double_nums >= 10
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    },
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.popup-content {
  position: relative;
  width: 643px;
  background: no-repeat left top/100% 100%;
}
.title {
  width: 362px;
  height: 142px;
  background: no-repeat left top/100% 100%;
}
.text {
  font-size: 32px;
  color: #ffffff;
  height: 72px;
  background: no-repeat left top/100% 100%;
  .deep {
    font-size: 42px;
    color: #fff581;
  }
}
.awardsList {
  margin-top: 33px;
  .award {
    width: 128px;
    margin-left: 30px;
    .awardIcon {
      width: 100%;
      height: 128px;
      background: #ffffff;
      border-radius: 16px;
      border: 4px solid #cba849;
      .icon {
        z-index: 1;
      }
      .avatar {
        width: 113px * 0.7;
        height: 113px * 0.7;
        object-fit: cover;
        border-radius: 50%;
      }
      .firstLabel {
        z-index: 2;
        top: -31px;
        right: -42px;
        width: 91px;
        height: 75px;
      }
      .micFirstLabel {
        z-index: 2;
        width: auto;
        height: 40px;
        top: -4px;
        transform: translateY(-50%);
        right: -42px;
      }
      .multipleLabel {
        z-index: 2;
        bottom: 7px;
        right: -18px;
        height: 41px;
        width: auto;
      }
    }
    .awardText {
      width: 100%;
      margin-top: 16px;
      font-weight: 500;
      font-size: 28px;
    }
    &:first-child {
      margin-left: 0;
    }
  }
}
.smallContent {
  width: 522px;
  height: 523px;
  background-image: url('@/pages/springFestival/assets/tk_9.png');
  .title {
    margin-top: -43px;
    background-image: url('@/pages/springFestival/assets/tk_4.png');
  }
  .text {
    width: 556px;
    background-image: url('@/pages/springFestival/assets/tk_6.png');
  }
  .awardText {
    color: #ffffff;
  }
  .multipleLabel {
    color: #b74fff;
  }
}
.bigContent {
  position: relative;
  width: 646px;
  height: 644px;
  background-image: url('@/pages/springFestival/assets/tk_10.png');
  .title {
    margin-top: 26px;
    background-image: url('@/pages/springFestival/assets/tk_5.png');
  }
  .text {
    width: 569px;
    background-image: url('@/pages/springFestival/assets/tk_7.png');
  }
  .awardText {
    color: #e02424;
  }
  .multipleLabel {
    color: #f01d1d;
  }
  .leftBalloon {
    top: 44px;
    left: -56px;
    width: 182px;
    height: 577px;
  }
  .rightBalloon {
    top: 68px;
    right: -48px;
    width: 163px;
    height: 354px;
  }
}
.button {
  margin: 30px auto 0;
  width: 320px;
  height: 72px;
  font-size: 32px;
}
</style>
