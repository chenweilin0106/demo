<template>
  <OutBox class="CumulativeSpendingList" title="title_3.png">
    <img :src="IconPath('mk2_1.png')" class="resetIcon position-absolute" />
    <transition-group class="listMain" tag="ul" :name="transitionClass">
      <PublicCard class="taskItem flex align-center" v-for="item in totalList" :key="item.condition">
        <div class="awardItem" v-for="(item1, index) in item.awards" :key="index">
          <div class="awardIcon flex align-center justify-center"><img :src="IconPath(item1.icon)" alt="" /></div>
          <div class="awardText flex align-center justify-center">+{{ item1.text }}</div>
        </div>
        <div class="taskText flex-column justify-between line-height-100">
          <p>累计消费<span class="focus-color">{{ item.condition }}钻</span></p>
          <p class="focus-color">（{{ item.consume_nums }}/{{ item.condition }}）</p>
        </div>
        <PublicButton class="button" :hasRight="item.has_right" @click="clickCumulativeBtn(item.has_right, item.condition)" />
      </PublicCard>
    </transition-group>
    <div class="rules-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('hjcbt_60_60.png')" />可进行30次符石寻宝</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
import { _throttle } from '@/utils/tool'
export default {
  name: 'CumulativeSpendingList',
  props: ['consume_status', 'transitionClass'],
  computed: {
    // 奖励数量文本
    awardNumText() {
      return (arr, text, index) => {
        return `+${text}${index !== arr.length - 1 ? '，' : ''}`
      }
    },
    consumeStatusArray() {
      return Object.values(this.consume_status) // 累积消费返利列表数据类型转换
    },
    unFinishList() {
      return this.consumeStatusArray.filter((consumeAward) => consumeAward.has_right == 0 || consumeAward.has_right == 1)
    },
    finishList() {
      return this.consumeStatusArray.filter((consumeAward) => consumeAward.has_right == 2)
    },
    totalList() {
      return this.unFinishList.concat(this.finishList)
    }
  },
  methods: {
    clickCumulativeBtn: _throttle(function (flag, mark) {
      if (flag === 1) this.$emit('clickCumulativeBtn', mark)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.CumulativeSpendingList {
  .resetIcon {
    z-index: 1;
    top: -82px; /*todo 每日重置图标top 根据容器定位*/
    right: 146px; /*todo 每日重置图标right 根据容器定位*/
    width: 124px; /*todo 宽度*/
    height: 42px; /*todo 高度*/
  }
  // 累积消费返利列表
  .listMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    // 累积消费返利列表项
    .taskItem {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 17px;
      width: 650px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
      height: 128px; /*todo 卡片高度 不需要加上外圈描边宽度*/
      border-radius: 12px; /*todo 卡片圆角*/
      .focus-color {
        color: #fffaa6 !important; /*todo xxx钻或者（0/xxx）完成情况*/
      }
      .awardItem {
        $radius: 12px; /*todo 奖励边框圆角*/
        $borderWidth: 4px; /*todo 奖励边框宽度*/
        display: flex;
        flex-direction: column;
        width: 80px + $borderWidth * 2; /*todo 奖励图标容器宽度*/
        height: 80px + $borderWidth * 2; /*todo 奖励图标容器高度*/
        background-color: #FFC05C; /*todo 奖励边框颜色*/
        padding: $borderWidth;
        border-radius: $radius + $borderWidth; /*todo 奖励边框圆角*/
        margin-left: 13 - $borderWidth * 2; /*todo 奖励左间隔*/
        .awardIcon {
          width: 100%;
          height: 54px;
          background: #fff; /*todo 奖励图标背景色*/
          border-radius: $radius $radius 0 0;
          > img {
            width: 85%;
          }
        }
        .awardText {
          flex: 1;
          font-size: 20px;
          color: #fff;
          width: 100%;
          background-color: #C94A32; /*todo 奖励文本背景色*/
          border-radius: 0 0 $radius $radius;
        }
      }
    }
    .taskText {
      margin-left: 12px; /*todo 累计消费...文本和左边奖励的距离*/
      font-size: 24px;
      line-height: 100%;
      p:nth-child(1) {
        font-size: 29px;
        color: #ffffff;
      }
      p:nth-child(2) {
        margin-top: 24px;
        font-size: 24px;
        margin-left: -0.5em; /*消除中文括号占位*/
      }
    }
    // 右侧按钮
    .button {
      position: absolute;
      right: 11px;
      bottom: 15px;
      width: 120px;
      height: 60px;
      font-size: 28px;
    }
  }
  .rules-text {
    img {
      width: 50px;
      height: auto;
    }
  }
}
</style>
