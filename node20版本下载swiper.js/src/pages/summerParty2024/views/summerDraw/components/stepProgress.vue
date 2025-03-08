<template>
  <div class="compoPsBg overflow-y-hidden overflow-x-scroll">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div class="rewardIcon">
            <PublicImg :imgName="item.award.icon" :userAvatar="item.award.type=='mic'?$store.state.user_icon:''"></PublicImg>
          </div>
          <div class="rewardText">{{item.award.text}}</div>
          <div class="mileShow">{{item.need_num}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <div class="topMark" v-if="item.award.mark">
            {{item.award.mark}}
            <img :src="IconPath('zs_27_20.png')" />
          </div>
          <div class="topMarkSp" v-if="item.award.type == 'world_msg_skins'">世界消息皮肤</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api/index'

export default {
  name: 'stepProgress',
  props: ['tot_hammer_num', 'tot_list'],
  components: {},
  data() {
    return {
      psPercent: 0, // 进度条百分比
      nodePercent: 2 // 节点长度百分比的一半
    }
  },
  created() {
    this.psPercent = this.calcPsPercent()
  },
  mounted() {},
  computed: {},
  watch: {
    tot_hammer_num() {
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
        getPageData({ type: 'summer_rev_tot_award', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceiveAwardsPopup', res.data)
          } else if (res.errno == -5 || res.errno == -6) {
            // this.backpackFull(res.errno)
            this.$emit('backpackFull', res.errno)
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
      if (this.tot_hammer_num >= this.tot_list[this.tot_list.length - 1].need_num) {
        return 100
      }
      let node = 0 // 处于第几个节点
      for (let index in this.tot_list) {
        if (this.tot_list[index].need_num >= this.tot_hammer_num) {
          node = index
          break
        }
      }
      if (node > 0) {
        let a = this.tot_hammer_num - this.tot_list[node - 1].need_num
        let b = this.tot_list[node].need_num - this.tot_list[node - 1].need_num
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        let e = (100 / this.tot_list.length) / 2 - this.nodePercent
        return this.tot_hammer_num / this.tot_list[node].need_num * e
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compoPsBg{
  width: 660px;
  height: 300px;
  margin:  0px auto 0px auto;
  // overflow: scroll hidden;
  .psBg{
    width: 1000px;
    height: 22px;
    background: #466BD5;
    border-radius: 25px;
    border: 4px solid #5890F5;
    position: relative;
    top: 200px;
    display: flex;
    .currentPs{
      width: 1000px;
      height: 16px;
      background: #FFEF85;
      border: none;
      border-radius: 25px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .nodeItem{
      // width: 25%;
      height: 14px;
      position: relative;
      .itemNodeIcon{
        width: 40px;
        height: 40px;
        background: #466BD5;
        border-radius: 50%;
        border: 4px solid #5890F5;
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
            background: url('@/pages/summerParty2024/assets/mk4_19.png') no-repeat left top/100% 100%;
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
        background: url('@/pages/summerParty2024/assets/mk4_16.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/summerParty2024/assets/mk4_18.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/summerParty2024/assets/mk4_17.png') no-repeat left top/100% 100%;
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
          color: #fff;
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
          right: 10px;
          top: 10px;
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
      }
    }
  }
}
</style>
