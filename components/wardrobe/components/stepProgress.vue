<template>
  <div class="compoPsBg stepProgress">
    <div class="psBg">
      <div class="currentPs" :style="`backgroundSize: ${psPercent}% 100%;`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item,index) in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <lazy-component :class="['rewardIcon', item.award.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
          </lazy-component>
          <div class="rewardText">+{{item.award.nums}}{{item.award.unit?item.award.unit:null}}</div>
          <div class="mileShow">{{item.need_num}}</div>
          <div class="redMark" v-if="item.has_right==1"></div>
          <div v-if="index==5" class="topMark line-height-1 flex align-center">属性称号</div>
          <van-popover v-if="index==5" v-model="item.showPopover" trigger="click" placement="top" get-container=".stepProgress" @click.stop>
            <!-- <div class="popoverMain">使用【唇齿相依】技能时<br>有概率触发连击1-4次</div> -->
            <div class="popoverMain">
              <div class="rules-text">
                <ul>
                  <li><span></span>基础加成：家族战内战力提升10%</li>
                  <li><span></span>额外加成：当CP同时拥有此称号时，</li>
                  <li>家族战内战力额外提升5%</li>
                  <li><span></span>注：所有加成基于基础战力计算</li>
                </ul>
              </div>
            </div>
          </van-popover>
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
  components: {},
  data() {
    return {
      psPercent: 0, // 进度条百分比
      nodePercent: 1 // 节点长度百分比的一半
    }
  },
  created() {
    this.psPercent = this.calcPsPercent()
    // console.log(this.psPercent)
  },
  mounted() {},
  computed: {},
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
      console.log(item)
      if (item.has_right == 1) {
        getPageData({ type: 'magic_closet_rev_tot_award', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceivePopup', res.data)
            this.scrollHas()
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 滚动到当前可领取项
     */
    scrollHas() {
      let man = document.getElementsByClassName('compoPsBg')[0]
      // console.log(document.getElementsByClassName('nodeItem')[0].clientWidth)
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
      // console.log(scrollIndex)
      let len = document.getElementsByClassName('nodeItem')[0].clientWidth * (scrollIndex - 1)
      // console.log(len)
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
      // console.log('node', node)
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
.van-popover__wrapper{
  width: 32px;
  height: 32px;
  background: url('@/pages/summerParty/assets/mk5_28.png') no-repeat left top/100% 100%;
  position: absolute;
  right: -12px;
  top: -9px;
  z-index: 2;
}
::v-deep .van-popover {
  .van-popover__content {
    width: fit-content;
    height: fit-content;
    background: none;
    box-shadow: none;
    overflow: visible;
    .popoverMain {
      position: relative;
      top: 10px;
      margin-left: -260px; // 对准按钮图标
      display: flex;
      align-items: center;
      justify-content: center;
      width: 359px;
      height: 141px;
      background: url('@/pages/summerParty/assets/mk5_29.png') no-repeat left top/100% 100%; // 气泡文本背景
      padding: 0 0 13px;
      font-size: 20px;
      color: #FFFFFF;
      line-height: 29px;
      .rules-text{
        width: 313px;
        margin-left: 33px;
        li{
          font-size: 20px;
          color: #FFFFFF;
          line-height: 29px;
          span{
            top: 50%;
            transform: translateY(-50%);
            left: -17px;
            width: 10px;
            height: 10px;
            background: #FFF580;
          }
        }
      }
    }
  }
  .van-popover__arrow {
    display: none;
  }
}
.compoPsBg{
  width: 693px;
  height: 300px;
  margin:  0 auto;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior: none;
  padding-left: 30px;
  .psBg{
    width: 950px;
    height: 20px;
    background: #C5EFFF;
    // background: linear-gradient(to left, transparent,transparent 6.25%,#F6CE79 6.25%,#F6CE79 93.75%, transparent 93.75%, transparent);
    border-radius: 999999999px;
    // border: 4px solid #5890F5;
    position: relative;
    top: 200px;
    display: flex;
    &::after{
      content: '';
      height: 10px;
      background: #5DA7D7;
      border-radius: 999999999px;
      // background: linear-gradient(to right, transparent,transparent 6.25%,#C47E34 6.25%,#C47E34 93.75%, transparent 93.75%, transparent);
      position: absolute;
      left: 5px;
      top: 5px;
      right: 5px;
      z-index: 1;
    }
    &::before{
      content: '';
      width: 30px;
      height: 100%;
      position: absolute;
      right: -30px;
      top: 0;
    }
    .currentPs{
      width: 950px;
      height: 20px;
      background: linear-gradient(#FFAF14, #FFAF14) no-repeat;
      // background-image: linear-gradient(to right, transparent 0px, transparent 81.25px, #FFAF14 81.25px, #FFAF14 1218px, transparent 1218px, transparent 1300px);
      border: none;
      border-radius: 999999999px;
      position: absolute;
      left: 0px;
      top: 0;
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
        background: #5DA7D7;
        border-radius: 50%;
        border: 4px solid #C5EFFF;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &.active{
          background: #FFAF14;
          border: 0px;
          border-radius: 50%;
          &::after{
            content: '';
            width: 50px;
            height: 59px;
            background: url('@/pages/summerParty/assets/mk5_27.png') no-repeat left top/100% 100%;
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
        background: url('@/pages/summerParty/assets/mk5_24.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/summerParty/assets/mk5_25.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/summerParty/assets/mk5_26.png') no-repeat left top/100% 100%;
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
          color: #398FB5;
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
          z-index: 10;
        }
        .topMark{
          background: linear-gradient(-90deg, #D48E45, #D48E45);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          font-weight: bold;
          height: 28px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          padding: 0 6px;
          top: -7px;
          z-index: 2;
          img{
            width: 42px*0.7;
            height: 32px*0.7;
            vertical-align: middle;
          }
        }
        .topMarkSp{
          background: linear-gradient(-90deg, #fff);
          border-radius: 17px;
          font-size: 20px;
          color: #D48E45;
          padding: 5px 10px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          z-index: 2;
        }
      }
    }
  }
}
</style>
