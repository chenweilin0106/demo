<template>
  <OutBox class="giftUpdate" title="title_6.png" has-costume>
    <div class="rules-text">
      <ul>
        <li><span></span>8月9日10点，以下礼物将更新图标及特效，快来</li>
        <li>送出感受吧~</li>
      </ul>
    </div>
    <div class="list flex align-center justify-center">
      <div v-for="(item, index) in list" :key="index" class="gift">
        <div class="icon position-relative flex align-center justify-center">
          <div class="priceLabel position-absolute flex align-center justify-center line-height-100 text-nowrap">
            {{ item.price }}<img :src="IconPath('zs_27_20.png')" class="diamond" />
          </div>
          <img class="giftIcon" :src="IconPath(item.icon)" />
        </div>
        <div class="text position-relative flex align-center justify-center line-height-100 text-nowrap">{{ item.text }}</div>
      </div>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      list: Object.freeze([
        { icon: 'qzh_160_160.png', text: '千纸鹤', price: '38' }, // 这里使用160*160 因为ui认为这个地方展示得比较大怕120*120尺寸会模糊
        { icon: 'gbqq_160_160.png', text: '告白气球', price: '520' },
        { icon: 'wxhn_160_160.png', text: '喜欢你', price: '5200' }
      ])
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.giftUpdate {
  .list {
    margin-top: 20px;
    .gift {
      .icon {
        width: 168px;
        height: 168px;
        padding: 4px;
        background: #99C1FD; /*todo 边框颜色*/
        border-radius: 50%;
        .giftIcon {
          width: 100%;
          height: 100%;
          Object-fit: cover;
          border-radius: 50%;
          background: linear-gradient(180deg, #FFF5C3, #FFFFFF); /*todo 背景色*/
        }
        .priceLabel {
          top: -2px;
          right: -2px;
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
      }
      .text {
        margin-top: -32px;
        min-width: 160px;
        padding: 0 25px;
        height: 48px;
        background: #4F72D5; /*todo 文本背景色*/
        border-radius: 24px;
        font-size: 28px;
        color: #F5F5F8;
      }
      &:nth-child(2) {
        margin: 0 32px;
      }
    }
  }
}
</style>
