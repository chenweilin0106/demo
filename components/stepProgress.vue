<template>
  <div class="compoPsBg overflow-y-hidden overflow-x-scroll overscroll-none flex">
    <div class="psBg flex position-relative flex-shrink-0">
      <div class="currentPs position-column-center position-absolute" :style="`width: ${psPercent}%;`"></div>
      <div class="nodeItem position-relative" :style="`width: ${100/tot_list.length}%`" v-for="(item,index) in tot_list" :key="index">
        <div class="itemNodeIcon position-absolute" :class="item.has_right!=0?'active':null"></div>
        <div class="rewardDiv position-absolute" :class="`status${item.has_right}`" @click="receive(item)">
          <lazy-component class="rewardIcon position-absolute position-row-center flex align-center justify-center"><PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg></lazy-component>
          <div class="rewardText line-height-1 position-row-center position-absolute text-center">{{$toShowText(item.award)}}</div>
          <div class="mileShow line-height-1 text-center position-absolute position-row-center">{{item.need_num}}</div>
          <div v-if="item.has_right == 1" class="redMark position-absolute radius-50"></div>
          <div v-if="label&&typeToNameMap[item.award.type]" class="typeLabel line-height-1 flex align-center justify-center position-absolute">{{typeToNameMap[item.award.type]}}</div>
          <div v-if="priceMap[item.id]" class="diamondPriceLabel">价值{{priceMap[item.id]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { receiveTot } from '@/pages/labaFestival/api'

export default {
  name: 'stepProgress',
  props: {
    tot_num: { type: Number, default: 0 },
    tot_list: { type: Array, default: () => [] }
  },
  data() {
    return {
      priceMap: Object.freeze({ 5: 6666 }), // 价值角标配置 根据id显示价值
      label: Object.freeze(false) // 是否显示类型标签
    }
  },
  watch: {
    tot_num() {
      this.scrollHas()
    }
  },
  computed: {
    ...mapState(['typeToNameMap']),
    psPercent() {
      if (this.tot_num >= this.tot_list[this.tot_list.length - 1].need_num) return 100
      let node = 0 // 处于第几个节点
      for (let index in this.tot_list) {
        if (this.tot_list[index].need_num >= this.tot_num) {
          node = index
          break
        }
      }
      if (node > 0) {
        let a = this.tot_num - this.tot_list[node - 1].need_num
        let b = this.tot_list[node].need_num - this.tot_list[node - 1].need_num
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let z = modePs * eachNodePs // 占当前节点进度条长的百分比
        return x + z
      } else {
        if (this.tot_list[node].need_num == 0) {
          return 0
        } else {
          let e = (100 / this.tot_list.length) / 2
          return this.tot_num / this.tot_list[node].need_num * e
        }
      }
    } // 进度条百分比
  },
  methods: {
    // 领取奖励
    async receive(item) {
      const res = await receiveTot(item.id)
      if (res.errno) return this.$toast(res.errmsg)
      this.$emit('openReceivePopup', res.data, item.id)
      this.scrollHas()
    },
    // 滚动到当前可领取项
    scrollHas() {
      let man = document.getElementsByClassName('compoPsBg')[0]
      let scrollIndex = 0
      for (let index in this.tot_list) {
        if (this.tot_list[index].has_right == 2) {
          scrollIndex = index
        }
        if (this.tot_list[index].has_right == 1) {
          scrollIndex = index
          break
        }
      }
      let len = document.getElementsByClassName('nodeItem')[0].clientWidth * (scrollIndex - 1)
      man.scrollTo({ left: len, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped lang="scss">
.compoPsBg{
  $width: 750px; // 进度条总长度（根据大小平均分配每个奖励之间的间距）
  $height: 16px; // 进度条高度（包括进度条外层边框 蓝湖上可能选中只有内层进度条 实际高度=内层高度+边框宽度*2）
  $borderRadius: 25px; // 进度条圆角（包括进度条外层边框 蓝湖上可能选中只有内层进度条 内层圆角+边框宽度）
  $psBorder: 0px; // 进度条边框
  $psBorderColor: #60311E; // 进度条边框颜色
  $psBgColor: #60311E; // 进度条背景颜色
  $currentPsColor: linear-gradient(0deg, #E9B347, #FCEFD2); // 进度条颜色
  height: 290px;
  padding: 0 17px; // 左右gap
  // 进度条外层边框
  .psBg{
    width: $width;
    height: $height;
    background: $psBorderColor;
    border-radius: $borderRadius;
    top: 200px;
    // 内层进度条
    &::before{
      content: '';
      width: $width;
      height: $height;
      background: $psBgColor;
      border-radius: $borderRadius - $psBorder;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    // 当前进度
    .currentPs{
      left: -$psBorder;
      z-index: 2;
      width: $width;
      height: $height;
      background: $currentPsColor;
      border-radius: $borderRadius;
    }
    .nodeItem{
      height: $height;
      z-index: 3;
      .itemNodeIcon{
        width: 23px;
        height: 23px;
        background: #60311E;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        &.active{
          background: linear-gradient(-45deg, #E9B347, #FCEFD2);
        }
      }
      .rewardDiv{
        $awardW: 128px; // 奖励框宽度
        $awardH: 154px; // 奖励框高度
        top: -21px; // 奖励框距离进度条的距离
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        width: $awardW;
        height: $awardH;
        background: url('@/pages/labaFestival/assets/lb_14.png') no-repeat left top/100% 100%; // 未达到
        pointer-events: none;
        &.status1{
          pointer-events: auto;
          &::after{
            content: '';
            width: 144px;
            height: 168px;
            background: url('@/pages/labaFestival/assets/lb_13.png') no-repeat left top/100% 100%; // 可领取
            position: absolute;
            left: -8px;
            top: -8px;
            z-index: 1;
          }
        }
        &.status2::after{
          content: '';
          width: $awardW;
          height: $awardH;
          background: url('@/pages/labaFestival/assets/lb_12.png') no-repeat left top/100% 100%; // 已领取
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .rewardIcon{
          z-index: 0;
          width: 120px;
          height: 98px;
          top: 4px;
        }
        .rewardText{
          font-size: 22px;
          top: 108px;
        }
        .mileShow{
          font-size: 26px;
          color: #FCEFD2;
          top: 220px;
        }
        .redMark{
          width: 16px;
          height: 16px;
          background: #E22A2A;
          right: -8px;
          top: 12px;
         z-index: 2;
        }
        .typeLabel{
          z-index: 10;
          padding: 0 4px;
          background: rgba(255,255,255,0.7);
          border-radius: 999999999px;
          font-weight: 800;
          font-size: 18px;
          left: 50%;
          transform: translateX(-50%);
          top: -14px;
          color: #3B89FF;
        }
        .diamondPriceLabel{
          z-index: 2;
          background: linear-gradient(180deg, #E3B350, #BB6929);
          border: 1px solid #FAE8C1;
          font-size: 20px;
          color: #FFFEFE;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
