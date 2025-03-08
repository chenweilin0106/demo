<template>
  <div class="turnCard">
    <div class="card" v-for="item in gift_list" :key="item.id">
      <!-- 未翻的卡 -->
      <div :class="['flipItem', item.isFilp ? 'flip' : null]" v-if="item.is_flip === false" @click="turnCardCk(item)" @animationend="FlipEnd(item)">
        <!-- 卡背 -->
        <div class="cardBack" v-if="!item.flipEnd"></div>
        <!-- 卡面 -->
        <div :class="['cardFace',item.flipEnd ? 'flipEnd' : null,item.is_rare_discount ? 'rare' : 'null']" v-if="item.isFilp">
          <div class="awardIcon">
            <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
          </div>
          <div class="numText">{{ item.award.text }}</div>
          <div v-if="item.task_id == 0" :class="['buyBtn', item.buy_status==1?'canBuy':item.buy_status==2?'buyed':item.buy_status==3?'noStore':null]">
            <template v-if="item.buy_status==1">
              <div>{{item.price}}</div>
              <div :class="['coinIcon', `icon${item.price_type}`]"></div>
              <div class="oldPrice" v-if="item.is_show_price">原价：{{item.show_price}}</div>
            </template>
            <template v-else-if="item.buy_status==2">已购买</template>
            <template v-else-if="item.buy_status==3">
              <span>已售罄</span>
              <div class="storeTip">{{stockUpdateLefting}}后刷新库存</div>
            </template>
          </div>
          <div v-else :class="['taskBtn', `status${item.task_status}`]">
            <p v-if="item.task_status==0">完成任务</p>
            <p v-if="item.task_status==0">免费领</p>
            <p v-else-if="item.task_status==1">领取</p>
            <p v-else-if="item.task_status==2">已领取</p>
          </div>
          <!-- <div v-if="item.is_rare_discount" class="rareIcon"></div> -->
        </div>
      </div>
      <!-- 已翻的卡 -->
      <div :class="['cardTurned', item.is_rare_discount ? 'rare' : 'null']" v-else>
        <div class="awardIcon">
          <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
        </div>
        <div class="numText">{{ item.award.text }}</div>
        <div v-if="item.task_id == 0" :class="['buyBtn', item.buy_status==1?'canBuy':item.buy_status==2?'buyed':item.buy_status==3?'noStore':null]" @click="buyBtnCk(item)">
          <template v-if="item.buy_status==1">
            <div>{{item.price}}</div>
            <div :class="['coinIcon', `icon${item.price_type}`]"></div>
            <div class="oldPrice" v-if="item.is_show_price">原价：{{item.show_price}}</div>
          </template>
          <template v-else-if="item.buy_status==2">已购买</template>
          <template v-else-if="item.buy_status==3">
            <span>已售罄</span>
            <div class="storeTip">{{stockUpdateLefting}}后刷新库存</div>
          </template>
        </div>
        <div v-else :class="['taskBtn', `status${item.task_status}`]" @click="taskBtnCk(item)">
          <p v-if="item.task_status==0">完成任务</p>
          <p v-if="item.task_status==0">免费领</p>
          <p v-else-if="item.task_status==1">领取</p>
          <p v-else-if="item.task_status==2">已领取</p>
        </div>
        <div v-if="item.is_rare_discount" class="rareIcon"></div>
      </div>
    </div>
    <div class="filpAllBtn" @click="filpAllBtnCk"></div>
  </div>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/index.js'

export default {
  name: 'turnCardVue',
  props: ['gift_list', 'stockUpdateLefting'],
  data() {
    return {
      isShowreRresh: false,
      isFlipingF: false // 是否在翻牌中
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // console.log('gift_list:', this.gift_list)
  },
  methods: {
    /**
     * 翻卡
     */
    turnCardCk(item) {
      // if (item.is_flip === false && this.isFlipingF == false) {
      if (item.is_flip === false) {
        console.log('翻卡id:', item.id)
        getPageData({ type: 'carnival_trader_flip_card', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            setTimeout(() => {
              console.log(res)
              this.$set(item, 'award', res.data.gift_list[0].award)

              this.$set(item, 'buy_status', res.data.gift_list[0].buy_status)
              this.$set(item, 'is_show_price', res.data.gift_list[0].is_show_price)
              this.$set(item, 'show_price', res.data.gift_list[0].show_price)
              this.$set(item, 'price', res.data.gift_list[0].price)
              this.$set(item, 'price_type', res.data.gift_list[0].price_type)
              this.$set(item, 'is_rare_discount', res.data.gift_list[0].is_rare_discount)

              this.$set(item, 'task_id', res.data.gift_list[0].task_id)
              this.$set(item, 'task_status', res.data.gift_list[0].task_status)

              // this.$set(item, 'isFliping', true)
              this.$set(item, 'isFilp', true) // isFilp是否播放翻卡动画，true即开始播放
              // this.isFlipingF = true
              // this.$emit('mascotStatusUpdate', res.data.mascot_status)
            }, 200)
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          }
        })
      }
      // } else {
      //   this.$toast('手速太快了')
      // }
    },
    /**
     * 一键翻牌
     */
    filpAllBtnCk() {
      console.log('一键翻牌')
      let isFilp = false
      for (let item of this.gift_list) {
        if (item.is_flip == false) {
          isFilp = true
          break
        }
      }
      if (isFilp) {
        getPageData({ type: 'carnival_trader_flip_card_all' }).then((res) => {
          if (res.errno == 0) {
            setTimeout(() => {
              console.log(res)
              for (let item of res.data.gift_list) {
                // console.log(item.id, this.gift_list[Number(item.id) - 1])
                this.$set(this.gift_list[Number(item.id) - 1], 'award', item.award)

                this.$set(this.gift_list[Number(item.id) - 1], 'buy_status', item.buy_status)
                this.$set(this.gift_list[Number(item.id) - 1], 'is_show_price', item.is_show_price)
                this.$set(this.gift_list[Number(item.id) - 1], 'show_price', item.show_price)
                this.$set(this.gift_list[Number(item.id) - 1], 'price', item.price)
                this.$set(this.gift_list[Number(item.id) - 1], 'price_type', item.price_type)
                this.$set(this.gift_list[Number(item.id) - 1], 'is_rare_discount', item.is_rare_discount)

                this.$set(this.gift_list[Number(item.id) - 1], 'task_id', item.task_id)
                this.$set(this.gift_list[Number(item.id) - 1], 'task_status', item.task_status)

                // this.$set(item, 'isFliping', true)
                this.$set(this.gift_list[Number(item.id) - 1], 'isFilp', true) // isFilp是否播放翻卡动画，true即开始播放
                // this.isFlipingF = true
                // this.$emit('mascotStatusUpdate', res.data.mascot_status)
              }
            }, 200)
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('已全部翻开')
      }
    },
    FlipEnd(item) {
      console.log('卡牌翻完')
      this.$set(item, 'flipEnd', true) // flipEnd是否翻完，true即不再显示卡背
      // this.getUserInformationSon()
      // this.isFlipingF = false
      this.$set(item, 'is_flip', true)
    },
    getUserInformationSon: _throttle(function (item) {
      this.$emit('getHomePage')
    }, 1000),
    /**
     * 购买
     */
    buyBtnCk(item) {
      console.log(item)
      if (item.buy_status == 1) {
        this.$emit('buyFn', item)
      }
    },
    /**
     * 任务
     */
    taskBtnCk(item) {
      console.log('任务id:', item.task_id, item)
      if (item.task_status == 0) {
        this.$emit('openTaskPopup', item.id)
      } else if (item.task_status == 1) {
        getPageData({ type: 'carnival_trader_rev_task', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log('打开恭喜获得弹窗')
            this.$emit('openReceiveAwardsPopup', res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.turnCard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  position: relative;
  .card {
    width: 204px;
    height: 267px;
    position: relative;
    @keyframes CardRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .flip {
      animation: CardRotate 2s;
      // transform: rotateY(180deg); // 点击容器，翻转图片
    }
    .flipItem {
      width: 204px;
      height: 267px;
      transform-style: preserve-3d; // 开启3D透视
      backface-visibility: hidden; // 该行在电脑与手机的适配有问题
      .cardBack {
        width: 204px;
        height: 267px;
        background: url('@/pages/celebration/assets/mk4_10.png') no-repeat left top/100% 100%;
      }
      .cardFace {
        width: 204px;
        height: 267px;
        position: absolute;
        left: 0;
        top: 0;
        background: url('@/pages/celebration/assets/mk4_11.png') no-repeat left top/100% 100%;
        backface-visibility: hidden;
        transform: rotateY(180deg); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
        &.flipEnd {
          // background: red;
          transform: rotateY(0deg);
          backface-visibility: visible;
        }
        &.rare {
          background: url('@/pages/celebration/assets/mk4_12.png') no-repeat left top/100% 100%;
        }
        .awardIcon {
          width: 120px;
          height: 120px;
          background: #FFFFFF;
          border-radius: 20px;
          border: 4px solid #EBC95B;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translate(-50%);
        }
        .numText {
          font-size: 24px;
          color: #895731;
          position: absolute;
          top: 160px;
          left: 50%;
          transform: translate(-50%);
        }
        .buyBtn {
          width: 164px;
          height: 57px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          bottom: 10px;
          &.canBuy{
            background: url('@/pages/celebration/assets/mk4_34.png') no-repeat left top/100% 100%;
          }
          &.buyed{
            background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
          }
          &.noStore{
            background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
          }
          .coinIcon{
            width: 46px*0.8;
            height: 46px*0.8;
            margin: 0 -10px 0 2px;
            vertical-align: middle;
            &.icongamegold{
              background: url('@/pages/celebration/assets/mk4_7.png') no-repeat left top/100% 100%;
            }
            &.iconmasonry{
              background: url('@/pages/celebration/assets/mk4_8.png') no-repeat left top/100% 100%;
            }
          }
          .oldPrice{
            font-size: 18px;
            color: #DD7200;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
            text-decoration: line-through;
            text-decoration-color: #EF5619;
          }
          .storeTip{
            font-size: 18px;
            color: #FF4200;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
          }
        }
        .taskBtn{
          width: 164px;
          height: 57px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          bottom: 10px;
          &.status0{
            height: 73px;
            background: url('@/pages/celebration/assets/mk4_36.png') no-repeat left top/100% 100%;
          }
          &.status1{
            background: url('@/pages/celebration/assets/mk4_37.png') no-repeat left top/100% 100%;
          }
          &.status2{
            background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
          }
        }
      }
    }
    .cardTurned {
      width: 204px;
      height: 267px;
      background: url('@/pages/celebration/assets/mk4_11.png') no-repeat left top/100% 100%;
      position: relative;
      &.rare {
        background: url('@/pages/celebration/assets/mk4_12.png') no-repeat left top/100% 100%;
      }
      .awardIcon {
        width: 120px;
        height: 120px;
        background: #FFFFFF;
        border-radius: 20px;
        border: 4px solid #EBC95B;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translate(-50%);
      }
      .numText {
        font-size: 24px;
        color: #895731;
        position: absolute;
        top: 160px;
        left: 50%;
        transform: translate(-50%);
      }
      .buyBtn {
        width: 164px;
        height: 57px;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 10px;
        &.canBuy{
          background: url('@/pages/celebration/assets/mk4_34.png') no-repeat left top/100% 100%;
        }
        &.buyed{
          background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
        }
        &.noStore{
          background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
        }
        .coinIcon{
          width: 46px*0.8;
          height: 46px*0.8;
          margin: 0 -10px 0 2px;
          vertical-align: middle;
          &.icongamegold{
            background: url('@/pages/celebration/assets/mk4_7.png') no-repeat left top/100% 100%;
          }
          &.iconmasonry{
            background: url('@/pages/celebration/assets/mk4_8.png') no-repeat left top/100% 100%;
          }
        }
        .oldPrice{
          font-size: 18px;
          color: #DD7200;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
          text-decoration: line-through;
          text-decoration-color: #EF5619;
        }
        .storeTip{
          font-size: 18px;
          color: #FF4200;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
        }
      }
      .taskBtn{
        width: 164px;
        height: 57px;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 10px;
        &.status0{
          height: 73px;
          background: url('@/pages/celebration/assets/mk4_36.png') no-repeat left top/100% 100%;
        }
        &.status1{
          background: url('@/pages/celebration/assets/mk4_37.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk4_35.png') no-repeat left top/100% 100%;
        }
      }
      .rareIcon {
        width: 112px;
        height: 131px;
        background: url('@/pages/celebration/assets/mk4_17.png') no-repeat left top/100% 100%;
        position: absolute;
        left: -30px;
        top: -50px;
      }
    }
    @keyframes CardRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(180deg);
      }
    }
    .flip {
      animation: CardRotate 2s;
      // transform: rotateY(180deg); // 点击容器，翻转图片
    }
  }
  .filpAllBtn{
    width: 317px;
    height: 116px;
    background: url('@/pages/celebration/assets/mk4_15.png') no-repeat left top/100% 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 610px;
  }
}
</style>
