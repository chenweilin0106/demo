<template>
  <div class="compoPsBg">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div class="rewardIcon"><PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg></div>
          <div class="rewardText">{{$toShowText(item.award)}}</div>
          <div class="mileShow">{{item.need_num}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <div v-if="typeToNameMap[item.award.type]" class="typeLabel line-height-1 flex align-center justify-center position-absolute">{{typeToNameMap[item.award.type]}}</div>
          <div v-if="item.id==5" class="diamondPriceLabel">3344<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['typeToNameMap'])
  },
  methods: {
    /**
     * 领奖
     */
    nodeIconCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'marriage_gift_cp_tot_rev', mark: item.id }).then((res) => {
          if (res.errno) return this.$toast(res.errmsg)
          // 打开获奖弹窗
          this.$emit('openReceivePopup', res.data, item.id)
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
      if (this.tot_num >= this.tot_list[this.tot_list.length - 1].need_num) {
        return 100
      }
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
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        if (this.tot_list[node].need_num == 0) {
          return 0
        } else {
          let e = (100 / this.tot_list.length) / 2 - this.nodePercent
          return this.tot_num / this.tot_list[node].need_num * e
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compoPsBg{
  //width: 660px;
  height: 290px;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior: none;
  margin: 0 27px;
  padding-left: 25px;
  .psBg{
    width: 850px;
    height: 20px;
    background: #73BFFF;
    border-radius: 25px;
    position: relative;
    top: 200px;
    display: flex;
    &::after{
      content: '';
      width: 850px - 8;
      height: 20px - 8;
      background: #4689D5;
      border-radius: 25px - 4;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .currentPs{
      //width: 1200px - 8px;
      width: 850px;
      //height: 20px - 8px;
      height: 20px;
      background: #FF83AC;
      border: none;
      border-radius: 25px - 4;
      position: absolute;
      //left: 4px;
      left: 0;
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
        background: #4689D5;
        border-radius: 50%;
        border: 4px solid #73BFFF;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &.active{
          background: #FF83AC;
          border: 0px;
          border-radius: 50%;
          &::after{
            content: '';
            width: 50px;
            height: 59px;
            background: url('@/pages/springFestival/assets/mk3_9.png') no-repeat left top/100% 100%;
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
        background: url('@/pages/springFestival/assets/mk3_6.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/springFestival/assets/mk3_8.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/springFestival/assets/mk3_7.png') no-repeat left top/100% 100%;
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
          top: 99px;
          line-height: 100%;
        }
        .mileShow{
          white-space: nowrap;
          font-size: 26px;
          color: #0767C1;
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
          right: 9px;
          top: 15px;
         z-index: 2;
        }
        .typeLabel{
          z-index: 10;
          width: 93px;
          height: 32px;
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
          right: -2px;
        }
      }
    }
  }
}
</style>
