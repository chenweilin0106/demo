<template>
  <div class="compoPsBg overflow-y-hidden overflow-x-scroll">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div :class="['rewardIcon', item.award.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.award.icon" :userAvatar="item.award.type=='mic'?$store.state.user_icon:''"></PublicImg>
          </div>
          <div class="rewardText">{{item.award.text}}</div>
          <div class="mileShow">{{item.need_num}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <div class="topMark" v-if="item.award.show_price">
            {{item.award.show_price}}
            <img :src="IconPath('zs_27_20.png')" />
          </div>
          <!-- <div class="topMarkSp" v-if="item.award.type == 'world_msg_skins'">世界消息皮肤</div> -->
          <van-popover
            v-model="item.showPopover"
            class="aslc_leftItem_awardIcon"
            v-if="item.id==1"
            trigger="click"
            placement="top"
            theme="dark"
          >
            <span class="popover_span" v-html="'获得后<i>首次</i>【浮生星阵】\n开启10次<i>仅需开启次数*5</i>'"></span>
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
        getPageData({ type: 'with_pray_rev_tot_award', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceiveAwardsPopup', res.data)
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
.popover_span{
  font-weight: 500;
  font-size: 22px;
  color: #FFFFFF;
  padding: 10px 20px 10px 20px;
  display: inline-block;
  max-width: 350px;
  white-space: pre-wrap;
  i{
    color: #FFF06E;
  }
}
</style>
<style>
.van-popover--dark .van-popover__content{
  background: rgba(45, 50, 108, 0.7);
}
.van-popover--dark .van-popover__arrow {
  color: rgba(45, 50, 108, 0.7);
}
</style>
<style scoped lang="scss">
.compoPsBg{
  width: 660px;
  height: 300px;
  margin:  0px auto 0px auto;
  // overflow: scroll hidden;
  .psBg{
    width: 1200px;
    height: 20px;
    // background: #466BD5;
    background: linear-gradient(to left, transparent,transparent 7.14%,#9CBFFF 7.14%,#9CBFFF 92.86%, transparent 92.86%, transparent);
    border-radius: 25px;
    // border: 4px solid #5890F5;
    position: relative;
    top: 200px;
    display: flex;
    &::after{
      content: '';
      width: 1200px;
      height: 10px;
      // background: #466BD5;
      background: linear-gradient(to right, transparent,transparent 7.14%,#466BD5 7.14%,#466BD5 92.86%, transparent 92.86%, transparent);
      position: absolute;
      left: 0;
      top: 5px;
      z-index: 1;
    }
    .currentPs{
      width: 1200px;
      height: 20px;
      // background: #FFEF85;
      background-image: linear-gradient(to right, transparent 0px, transparent 86px, #FFEF85 86px, #FFEF85 1114px, transparent 1114px, transparent 1200px);
      border: none;
      border-radius: 10px;
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
        background: #466BD5;
        border-radius: 50%;
        border: 4px solid #9CBFFF;
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
            background: url('@/pages/qiXi/assets/mk5_25.png') no-repeat left top/100% 100%;
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
        background: url('@/pages/qiXi/assets/mk5_22.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/qiXi/assets/mk5_24.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/qiXi/assets/mk5_23.png') no-repeat left top/100% 100%;
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
          color: #575FCB;
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
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 5px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          z-index: 2;
          img{
            width: 27px;
            height: 20px;
            vertical-align: middle;
          }
        }
        .topMarkSp{
          background: linear-gradient(-90deg, #fff);
          border-radius: 17px;
          font-size: 20px;
          color: #4978fe;
          padding: 5px 10px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          z-index: 2;
        }
        .aslc_leftItem_awardIcon{
          width: 32px;
          height: 32px;
          background: url('@/pages/qiXi/assets/mk5_26.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 0;
          top: -10px;
          z-index: 2;
        }
      }
    }
  }
}
</style>
