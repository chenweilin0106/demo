<template>
  <div class="compoPsBg">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="`${item.id}${item.awardId}`">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div class="rewardIcon"><PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg></div>
          <div class="rewardText">{{item.text}}</div>
          <div class="mileShow">{{item.need}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
export default {
  name: 'stepProgress',
  props: ['tot_num', 'tot_list'],
  data() {
    return {
      psPercent: 0, // 进度条百分比
      nodePercent: 1 // 节点长度百分比的一半
    }
  },
  created() {
    this.psPercent = this.calcPsPercent()
  },
  watch: {
    tot_num() {
      this.psPercent = this.calcPsPercent()
      this.scrollHas()
    }
  },
  methods: {
    /**
     * 领奖
     */
    nodeIconCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'naughty_tot_award', mark: item.awardId }).then((res) => {
          if (res.errno) return this.$toast(res.errmsg)
          // 打开获奖弹窗
          this.$emit('openCongratsGetPopup', res.data, item.awardId)
          this.scrollHas()
        })
      }
    },
    /**
     * 滚动到当前可领取项
     */
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
      man.scrollTo({
        left: len,
        behavior: 'smooth'
      })
    },
    /**
     * 计算进度条百分比
     */
    calcPsPercent() {
      if (this.tot_num >= this.tot_list[this.tot_list.length - 1].need) {
        return 100
      }
      let node = 0 // 处于第几个节点
      for (let index in this.tot_list) {
        if (this.tot_list[index].need >= this.tot_num) {
          node = index
          break
        }
      }
      if (node > 0) {
        let a = this.tot_num - this.tot_list[node - 1].need
        let b = this.tot_list[node].need - this.tot_list[node - 1].need
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        if (this.tot_list[node].need == 0) {
          return 0
        } else {
          let e = (100 / this.tot_list.length) / 2 - this.nodePercent
          return this.tot_num / this.tot_list[node].need * e
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.popover_span{
  font-weight: 500;
  font-size: 22px;
  color: #FFFFFF;
  padding: 10px 20px 10px 20px;
  display: inline-block;
  max-width: 360px;
  // white-space: pre-wrap;
  i{
    color: #FFF06E;
  }
}
</style>
<style>
.van-popover--dark .van-popover__content{
  background: rgba(36, 23, 6, 0.6);
}
.van-popover--dark .van-popover__arrow {
  color: rgba(36, 23, 6, 0.6);
}
</style>
<style scoped lang="scss">
.compoPsBg{
  //width: 660px;
  height: 300px;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior: none;
  margin: 0 30px;
  .psBg{
    width: 1200px;
    height: 20px;
    background: #F6CE79;
    border-radius: 25px;
    position: relative;
    top: 200px;
    display: flex;
    &::after{
      content: '';
      width: 1200px - 8;
      height: 20px - 8;
      background: #C47E34;
      border-radius: 25px - 4;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .currentPs{
      width: 1200px - 8;
      height: 20px - 8;
      background: #FFAF14;
      border: none;
      border-radius: 25px - 4;
      position: absolute;
      left: 4px;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 2;
    }
    .nodeItem{
      // width: 25%;
      height: 20px;
      position: relative;
      z-index: 3;
      .itemNodeIcon{
        width: 40px;
        height: 40px;
        background: #C47E34;
        border-radius: 50%;
        border: 4px solid #F6CE79;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &.active{
          background: #FFEF85;
          border: 0px;
          border-radius: 50%;
          &::after{
            content: '';
            width: 50px;
            height: 59px;
            background: url('@/pages/celebration/assets/mk4_29.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .rewardDiv{
        width: 128px;
        height: 143px;
        background: url('@/pages/celebration/assets/mk4_26.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/celebration/assets/mk4_28.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/celebration/assets/mk4_27.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 1;
        }
        .rewardIcon{
          width: 90px;
          height: 90px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 10px;
          &.titleSp{
            width: 120px;
          }
        }
        .rewardText{
          white-space: nowrap;
          font-size: 22px;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 100px;
        }
        .mileShow{
          white-space: nowrap;
          font-size: 26px;
          color: #A94214;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 200px;
        }
        .redMark{
          width: 16px;
          height: 16px;
          background: #E22A2A;
          border-radius: 50%;
          position: absolute;
          right: 0px;
          top: 20px;
         z-index: 2;
        }
      }
    }
  }
}
</style>
