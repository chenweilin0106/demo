<template>
  <OutBox class="consumeTasksList" size="3_3" title="title_7.png">
    <!--<img :src="IconPath('mk2_1.png')" class="resetIcon position-absolute" />-->
    <transition-group class="list flex-column align-center" tag="ul" :name="transitionClass">
      <PublicCard v-for="task in totalList" :key="task.condition" size="6" class="taskCard position-relative">
        <div class="desc flex-column justify-between h-100">
          <p class="line-height-1">累计消费<span class="yellow">{{task.condition}}钻</span><span class="yellow line-height-1 text-indent-left">（{{task.consume_nums}}/{{task.condition}}）</span></p>
          <div class="awardsList radius-999 flex align-center width-fit flex-no-wrap">
            <span v-for="(item,index) in task.awards" :key="index" class="awardSpan flex-shrink-0 flex-no-wrap flex align-center">
              <img class="awardIcon flex-shrink-0" :src="IconPath(item.icon)" />+{{item.text}}{{index!=task.awards.length-1?',&nbsp;':''}}
            </span>
          </div>
        </div>
        <PublicButton class="taskBtn position-absolute" :disabled="[0,2]" :hasRight="task.has_right" @click="$emit('receiveAward',task.condition)" />
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
  data() {
    return {}
  },
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
.yellow {
  color: #FFFAA6;
}
.brown {
  color: #F14B35;
}
.consumeTasksList {
  //.resetIcon {
  //  z-index: 1;
  //  top: 0; /*todo 每日重置图标top 根据容器定位*/
  //  right: 210px; /*todo 每日重置图标right 根据容器定位*/
  //  width: 124px; /*todo 宽度*/
  //  height: auto;
  //  transform: translateY(-100%);
  //}
  // 累积消费返利列表
  .list {
    // 累积消费返利列表项
    .taskCard {
      margin-bottom: 19px; /* todo 卡片间距 */
      width: 664px; /*todo 卡片宽度*/
      height: 140px; /*todo 卡片高度*/
      .desc {
        padding: 28px 0 20px 20px;
        p:nth-child(1) {
          font-size: 29px;
          color: #986408;
        }
        .awardsList {
          height: 52px;
          background: linear-gradient(90deg, #F88F8E, #FFC05A); /*todo 奖励背景色*/
          padding: 0 20px 0 8px;
          font-size: 24px;
          .awardSpan {
            >img{
              width: 50px;
              height: 50px;
            }
          }
        }
      }
      // 右侧按钮
      .taskBtn {
        position: absolute;
        right: 20px;
        top: 8px;
        width: 124px;
        height: 64px;
      }
      &:last-child {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
