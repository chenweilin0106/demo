<template>
  <div class="compoPsBg">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="`${item.id}${item.awardId}`">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div :class="['rewardIcon', item.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div class="rewardText">{{item.text}}</div>
          <div class="mileShow">{{item.need}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <div class="textTopMark" v-if="item.awardId == 80">世界消息皮肤</div>
          <div class="textTopMark" v-if="item.awardId == 666">房间装扮</div>
          <div class="previewTip" v-if="item.previewImg"></div>
          <div class="pstMark" v-if="item.type=='pst_privilege'">赠送权</div>
          <div class="priceMark" v-if="item.price">
            {{item.price}}
            <img :src="IconPath('zs_27_20.png')" />
          </div>
          <van-popover
            v-model="item.showPopover"
            v-if="item.awardId==25"
            trigger="click"
            placement="top-end"
            theme="dark"
            :offset="[86,30]"
          >
            <div class="popover_span">
              <p>获得后<i>首次</i>【世纪舞会】</p>
              <p>演奏10次<i>仅需演奏次数*5</i></p>
            </div>
            <template #reference>
              <div class="aslc_leftItem_awardIcon"></div>
            </template>
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
        getPageData({ type: 'ps_rev_tot_award', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceiveAwardsPopup', res.data)
            this.scrollHas()
          } else if (res.errno == -5 || res.errno == -6) {
            // this.backpackFull(res.errno)
            this.$emit('backpackFull', res.errno)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (item.previewImg) {
        this.$emit('previewImgCk', item)
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
      // console.log('node', node)
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
  width: 660px;
  height: 300px;
  margin:  0px auto 0px auto;
  // overflow: scroll hidden;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior: none;
  .psBg{
    width: 1200px;
    height: 20px;
    background: #EAE4FF;
    // background: linear-gradient(to left, transparent,transparent 6.25%,#F6CE79 6.25%,#F6CE79 93.75%, transparent 93.75%, transparent);
    border-radius: 25px;
    // border: 4px solid #5890F5;
    position: relative;
    top: 200px;
    display: flex;
    &::after{
      content: '';
      width: 1200px;
      height: 10px;
      background: #8A77EB;
      border-radius: 10px;
      // background: linear-gradient(to right, transparent,transparent 6.25%,#C47E34 6.25%,#C47E34 93.75%, transparent 93.75%, transparent);
      position: absolute;
      left: 0;
      top: 5px;
      z-index: 1;
    }
    .currentPs{
      width: 1200px;
      height: 20px;
      background: #FF6BAD;
      // background-image: linear-gradient(to right, transparent 0px, transparent 81.25px, #FFAF14 81.25px, #FFAF14 1218px, transparent 1218px, transparent 1300px);
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
        background: #8A77EB;
        border-radius: 50%;
        border: 4px solid #EAE4FF;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &.active{
          background: #FF6BAD;
          border: 0px;
          border-radius: 50%;
          &::after{
            content: '';
            width: 50px;
            height: 59px;
            background: url('@/pages/celebration/assets/mk8_35.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 54%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .rewardDiv{
        width: 128px;
        height: 143px;
        background: url('@/pages/celebration/assets/mk8_32.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -160px;
        &.status1::after{
          content: '';
          width: 144px;
          height: 157px;
          background: url('@/pages/celebration/assets/mk8_34.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -8px;
          top: -8px;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 128px;
          height: 143px;
          background: url('@/pages/celebration/assets/mk8_33.png') no-repeat left top/100% 100%;
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
          color: #6E56E7;
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
        .textTopMark{
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 4px 10px;
          font-weight: 600;
          font-size: 18px;
          color: #B660FF;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
        }
        .priceMark{
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 2px 5px 2px 10px;
          position: absolute;
          right: 0;
          top: -15px;
          z-index: 2;
          img{
            width: 27px;
            height: 20px;
            vertical-align: middle;
          }
        }
        .previewTip{
          width: 118px;
          height: 26px;
          // background: url('@/pages/nationalDay/assets/mk5_20.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 70px;
          z-index: 1;
        }
        .pstMark{
          background: #2CB1A9;
          border-radius: 14px;
          padding: 4px 8px 4px 8px;
          font-weight: bold;
          font-size: 18px;
          color: #FFFFFF;
          position: absolute;
          right: 0;
          top: 12px;
          z-index: 2;
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
          background: url('@/pages/celebration/assets/mk9_10.png') no-repeat left top/100% 100%;
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
