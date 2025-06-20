<template>
  <OutBox class="consumeTasksList" title="title_6.png">
    <img :src="IconPath('mk2_1.png')" class="resetIcon position-absolute" />
    <transition-group class="list flex-column align-center" tag="ul" :name="transitionClass">
      <PublicCard v-for="task in totalList" :key="task.condition" size="2" class="taskCard flex align-center position-relative">
        <div class="award" v-for="(item, index) in task.awards" :key="index">
          <div class="icon flex align-center justify-center"><img :src="IconPath(item.icon)" alt="" /></div>
          <div class="text flex align-center justify-center">+{{item.text}}</div>
        </div>
        <div class="desc flex-column justify-between">
          <p class="line-height-1">累计消费<span class="focus-color">{{task.condition}}钻</span></p>
          <p class="focus-color line-height-1 text-indent-left">（{{task.consume_nums}}/{{task.condition}}）</p>
        </div>
        <PublicButton class="taskBtn position-absolute" :disabled="[0,2]" :hasRight="task.has_right" @click="$emit('receiveAward',task.condition)">
          {{task.has_right==0?'未完成':task.has_right==1?'领取':'已领取'}}
        </PublicButton>
      </PublicCard>
    </transition-group>
    <div class="rules-text">
      <ul>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
        <li><span></span>消耗<img :src="IconPath('hjcbt_60_60.png')" />可进行30次符石寻宝</li>
        <li><span></span>消耗<img :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  name: 'consumeTasksList',
  props: ['consume_status', 'transitionClass'],
  computed: {
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
  methods: {}
}
</script>

<style scoped lang="scss">
.consumeTasksList {
  .resetIcon {
    z-index: 1;
    top: 0; /*todo 每日重置图标top 根据容器定位*/
    right: 210px; /*todo 每日重置图标right 根据容器定位*/
    width: 124px; /*todo 宽度*/
    height: auto;
    transform: translateY(-100%);
  }
  // 累积消费返利列表
  .list {
    // 累积消费返利列表项
    .taskCard {
      margin-bottom: 15px;
      width: 664px; /*todo 卡片宽度*/
      height: 142px; /*todo 卡片高度*/
      .focus-color {
        color: #fffaa6 !important; /*todo xxx钻或者（0/xxx）完成情况*/
      }
      .award {
        $radius: 12px; /*todo 奖励边框圆角*/
        $borderWidth: 4px; /*todo 奖励边框宽度*/
        display: flex;
        flex-direction: column;
        width: 80px + $borderWidth * 2; /*todo 奖励图标容器宽度*/
        height: 80px + $borderWidth * 2; /*todo 奖励图标容器高度*/
        background-color: #EFA5D2; /*todo 奖励边框颜色*/
        padding: $borderWidth;
        border-radius: $radius + $borderWidth; /*todo 奖励边框圆角*/
        margin-left: 13 - $borderWidth * 2; /*todo 奖励左间隔*/
        &:nth-child(1) {
          margin-left: 9px;
        }
        .icon {
          width: 100%;
          height: 54px;
          background: #fff; /*todo 奖励图标背景色*/
          border-radius: $radius $radius 0 0;
          > img {
            width: 85%;
          }
        }
        .text {
          flex: 1;
          font-size: 20px;
          color: #fff;
          width: 100%;
          background-color: #C25E94; /*todo 奖励文本背景色*/
          border-radius: 0 0 $radius $radius;
        }
      }
    }
    .desc {
      margin-left: 5px; /*todo 累计消费...文本和左边奖励的距离*/
      p:nth-child(1) {
        font-size: 29px;
        color: #ffffff;
      }
      p:nth-child(2) {
        margin-top: 24px;
        font-size: 24px;
      }
    }
    // 右侧按钮
    .taskBtn {
      width: 124px;
      height: 64px;
      right: 20px;
      top: 8px;
    }
  }
}
</style>
