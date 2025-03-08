<template>
  <PopupBox :title="'title_13.png'" @clickClose="clickClose">
    <div class="topTip1">每日首次进入此玩法即可获得1次翻卡机会</div>
    <div class="topTip2">{{buffLeating?`buff倒计时 ${buffLeating}`:buffStayus==1?'请选择任意一张卡牌翻开':buffStayus==3?'buff已结束':null}}</div>
    <div class="cardsArea">
      <div :class="['card', (buffStayus==2||buffStayus==3)?'fliped':null, index==buffCard.sort?'flip':null, buffStayus==4?'flip':null]" v-for="(index) in 3" :key="index" @click="turnCardCk(index)" @animationend="FlipEnd">
        <div class="cardBack" v-if="buffStayus==1||4"></div>
        <div :class="['cardFace', index==buffCard.sort?`status${buffCard.type}`:'status0']">
          <div class="cardFaceMark" v-if="index==buffCard.sort&&(buffStayus==2||buffStayus==3)"></div>
        </div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index'

export default {
  name: 'buffPopup',
  props: ['buffStayus', 'buffLeating', 'buffCard'],
  components: {},
  data() {
    return {
      cardsTurnList: [], // 翻卡列表
      isCk: false // 是否点击过
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 翻卡
     */
    turnCardCk(index) {
      if (this.buffStayus == 1 && !this.isCk) {
        console.log('buff', index)
        // 赋值卡片
        getPageData({ type: 'sh_treasure_select', mark: index }).then((res) => {
          if (res.errno == 0) {
            this.isCk = true
            this.$emit('changeBuffCard', index, res.data.type, res.data.countdown)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 动画结束回调
     */
    FlipEnd() {
      if (this.buffStayus == 1) {
        this.$emit('changeBuffStayus', 4)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.topTip1{
  font-weight: 400;
  font-size: 26px;
  color: #FFFFFF;
  line-height: 36px;
  text-align: center;
  margin: 0 auto;
}
.topTip2{
  font-weight: 500;
  font-size: 26px;
  color: #FFEC6C;
  line-height: 36px;
  text-align: center;
  margin: 10px auto;
}
.cardsArea{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  .card{
    width: 186px;
    height: 240px;
    transform-style: preserve-3d; // 开启3D透视
    backface-visibility: hidden; // 该行在电脑与手机的适配有问题
    position: relative;
    &.flip {
      animation: CardRotate 2s;
      animation-fill-mode: forwards;
      // transform: rotateY(180deg); // 点击容器，翻转图片
    }
    &.fliped{
      animation: CardRotate 0s;
      animation-fill-mode: forwards;
    }
    @keyframes CardRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .cardBack{
      width: 100%;
      height: 100%;
      background: url('@/pages/nationalDay/assets/tk_14.png') no-repeat left top/100% 100%;
    }
    .cardFace{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      backface-visibility: hidden;
      transform: rotateY(180deg); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
      &.status0{
        background: url('@/pages/nationalDay/assets/tk_19.png') no-repeat left top/100% 100%;
        opacity: 0.7;
      }
      &.statusA{
        background: url('@/pages/nationalDay/assets/tk_15.png') no-repeat left top/100% 100%;
      }
      &.statusB{
        background: url('@/pages/nationalDay/assets/tk_16.png') no-repeat left top/100% 100%;
      }
      &.statusC{
        background: url('@/pages/nationalDay/assets/tk_17.png') no-repeat left top/100% 100%;
      }
      &.statusD{
        background: url('@/pages/nationalDay/assets/tk_18.png') no-repeat left top/100% 100%;
      }
      .cardFaceMark{
        width: 113px;
        height: 94px;
        background: url('@/pages/nationalDay/assets/tk_20.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0;
        bottom: -40px;
      }
    }
  }
}
</style>
