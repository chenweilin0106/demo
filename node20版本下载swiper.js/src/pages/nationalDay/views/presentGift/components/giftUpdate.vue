<template>
  <OutBox class="giftUpdate" title="title_4.png">
    <!--长条展示-->
    <div class="tip flex align-center justify-center line-height-100 text-nowrap">9月13日10点，礼物面板将更新以下内容</div>
    <div class="list flex-column">
      <div v-for="(item, index) in list" :key="index" class="gift flex">
        <div class="icon position-relative flex justify-center">
          <div class="priceLabel position-absolute flex align-center justify-center line-height-100 text-nowrap">
            {{ item.price }}<img :src="IconPath('zs_27_20.png')" class="diamond" />
          </div>
          <div class="firstLabel flex align-center justify-center text-nowrap line-height-100">限时半价</div>
          <img class="giftIcon" :src="IconPath(item.icon)" />
        </div>
        <div class="text">
          <div class="giftName flex align-center line-height-100 text-nowrap">梦幻城堡<img :src="IconPath('mk3_9.png')" class="new" /></div>
          <div class="desc">活动期间限时半价：<i style="color: #00FFEA">3499钻</i><br>全新图标和特效，送出体验吧~</div>
        </div>
      </div>
    </div>
    <!--横条展示-->
    <!--<div class="rules-text">-->
    <!--  <ul>-->
    <!--    <li><span></span>8月9日10点，以下礼物将更新图标及特效，快来</li>-->
    <!--    <li>送出感受吧~</li>-->
    <!--  </ul>-->
    <!--</div>-->
    <!--<div class="list flex align-center justify-center">-->
    <!--  <div v-for="(item, index) in list" :key="index" class="gift">-->
    <!--    <div class="icon position-relative flex align-center justify-center">-->
    <!--      <div class="priceLabel position-absolute flex align-center justify-center line-height-100 text-nowrap">-->
    <!--        {{ item.price }}<img :src="IconPath('zs_27_20.png')" class="diamond" />-->
    <!--      </div>-->
    <!--      <img class="giftIcon" :src="IconPath(item.icon)" />-->
    <!--    </div>-->
    <!--    <div class="text position-relative flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>-->
    <!--  </div>-->
    <!--</div>-->
  </OutBox>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      list: Object.freeze([
        { icon: 'mk3_8.png', text: '千纸鹤', price: '6999' } // 这里使用160*160 因为ui认为这个地方展示得比较大怕120*120尺寸会模糊
        // { icon: 'gbqq_160_160.png', text: '告白气球', price: '520' },
        // { icon: 'wxhn_160_160.png', text: '喜欢你', price: '5200' }
      ])
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.giftUpdate {
  width: 716px; /*todo 宽度 去看图片原始宽度，不要看蓝湖*/
  height: 397px; /*todo 高度*/
  border-image-slice: 0 0 0 0 fill;
  border-image-width: 0 0 0 0;
  border-image-source: url('@/pages/nationalDay/assets/mk3_7.png'); /*todo 连续充值有礼背景*/
  padding-top: 92px;
  padding-bottom: 0;
  // 长条展示 2024 nationalDay
  .tip {
    margin-bottom: 36px;
    font-weight: 500;
    font-size: 28px;
    color: #A94214;
  }
  .list {
    .gift {
      width: 551px;
      height: 150px;
      background: linear-gradient(90deg, #D65C32, #FFAF45);
      border-radius: 20px;
      margin-left: 126px;
      //overflow: hidden;
      .icon {
        margin-top: -6px;
        margin-left: -88px;
        position: relative;
        width: 154px + 8;
        height: 154px + 8;
        background: linear-gradient(180deg, #FFF3BD, #FFFFFF);
        border-radius: 50%;
        border: 4px solid #FFC05C;
        //overflow: hidden;
        .giftIcon {
          width: 135px;
          height: 135px;
        }
        .priceLabel {
          position: absolute;
          top: -19px;
          right: -10px;
          padding: 0 11px;
          height: 34px;
          background: linear-gradient(-90deg, #75B9FF, #FF84F8); /*todo 价格角标*/
          border-radius: 17px;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          .diamond {
            width: 27px;
            height: 20px;
          }
        }
        .firstLabel {
          position: absolute;
          top: 15px;
          right: -10px;
          width: 95px;
          height: 34px;
          background: linear-gradient(-90deg, #2DBEB5, #288ED5);
          border-radius: 17px;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
        }
      }
      .text {
        margin-left: 37px - 4;
        .giftName {
          margin-top: 22px;
          margin-bottom: 18px - 4;
          font-weight: bold;
          font-size: 30px;
          color: #FFFFFF;
          .new {
            margin-left: 6px;
            width: 56px;
            height: 32px;
          }
        }
        .desc {
          font-weight: 500;
          font-size: 24px;
          color: #FFFAA6;
          line-height: 32px;
        }
      }
    }
  }
  // 横向展示 2024 qixi
  //.list {
  //  margin-top: 20px;
  //  .gift {
  //    .icon {
  //      width: 168px;
  //      height: 168px;
  //      padding: 4px;
  //      background: #99C1FD; /*todo 边框颜色*/
  //      border-radius: 50%;
  //      .giftIcon {
  //        width: 100%;
  //        height: 100%;
  //        Object-fit: cover;
  //        border-radius: 50%;
  //        background: linear-gradient(180deg, #FFF5C3, #FFFFFF); /*todo 背景色*/
  //      }
  //      .priceLabel {
  //        top: -2px;
  //        right: -2px;
  //        padding: 0 11px;
  //        height: 34px;
  //        background: linear-gradient(-90deg, #75B9FF, #FF84F8); /*todo 价格角标*/
  //        border-radius: 17px;
  //        font-weight: 500;
  //        font-size: 20px;
  //        color: #FFFFFF;
  //        .diamond {
  //          width: 27px;
  //          height: 20px;
  //        }
  //      }
  //    }
  //    .text {
  //      margin-top: -32px;
  //      min-width: 160px;
  //      padding: 0 25px;
  //      height: 48px;
  //      background: #4F72D5; /*todo 文本背景色*/
  //      border-radius: 24px;
  //      font-size: 28px;
  //      color: #F5F5F8;
  //    }
  //    &:nth-child(2) {
  //      margin: 0 32px;
  //    }
  //  }
  //}
}
</style>
