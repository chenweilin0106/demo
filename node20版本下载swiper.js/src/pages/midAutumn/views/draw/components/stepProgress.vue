<template>
  <div class="compoPsBg overflow-y-hidden overflow-x-scroll">
    <div class="psBg">
      <div :class="['currentPs', psPercent==100?'fullSp':null]" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="item.id">
        <div class="itemNodeIcon">
          <PublicImg :imgName="item.icon" :imgType="'tool'"></PublicImg>
          <div class="itemNodeName">{{item.name}}</div>
          <div class="itemNodeMile">{{item.mile}}km</div>
        </div>
        <div class="itemAwardsArea">
          <div :class="['awardIt', it.type=='title'?'titleSp':null]" v-for="(it) in item.awards1" :key="it.id" @click="awardItCk(item.id, it, 1)">
            <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
            <div class="isPreview" v-if="it.type=='title'"></div>
            <div class="awardText" v-html="analysisText(it.text)"></div>
            <div :class="['awardCover', `status${it.has_right}`]" v-if="it.has_right!=0"></div>
          </div>
          <div :class="['awardIt', it.type=='title'?'titleSp':null]" v-for="(it) in item.awards2" :key="it.id" @click="awardItCk(item.id, it, 2)">
            <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
            <div class="isPreview" v-if="it.type=='title'"></div>
            <div class="awardText" v-html="analysisText(it.text)"></div>
            <div :class="['awardCover', `status${it.has_right}`]" v-if="it.has_right!=0"></div>
          </div>
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
      nodePercent: 8.4 // 节点长度百分比的一半
    }
  },
  created() {
    this.psPercent = this.calcPsPercent()
    // console.log('psPercent:', this.psPercent)
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
     * 文字解析
     */
    analysisText(item) {
      return item.replace('永久', '<span style="color:#FF0600;">永久</span>')
    },
    /**
     * 领奖
     */
    awardItCk(place_id, it, giftId) {
      // console.log(it, giftId)
      if (it.has_right == 1) {
        getPageData({ type: 'travel_checkin_award', mark: { place_id, award_id: giftId } }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceiveAwardsPopup', res.data.awards)
          } else if (res.errno == -5 || res.errno == -6) {
            this.$emit('backpackFull', res.errno)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (it.type == 'title') {
        let msg = {
          type: 'title',
          previewImg: it.icon,
          previewTipe1: '月下无限连·属性称号',
          previewTipe2: '使用【唇齿相依】技能时有概率触发连击1~4次'
        }
        this.$emit('previewImgCk', msg)
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
      if (this.tot_num >= this.tot_list[this.tot_list.length - 1].mile) {
        return 100
      }
      let node = 0 // 处于第几个节点
      for (let index in this.tot_list) {
        if (this.tot_list[index].mile >= this.tot_num) {
          node = index
          break
        }
      }
      // console.log('node', node)
      if (node > 0) {
        let a = this.tot_num - this.tot_list[node - 1].mile
        let b = this.tot_list[node].mile - this.tot_list[node - 1].mile
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        if (this.tot_list[node].mile == 0) {
          return 0
        } else {
          let e = (100 / this.tot_list.length) / 2 - this.nodePercent
          return this.tot_num / this.tot_list[node].mile * e
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
  width: 650px;
  height: 700px;
  margin:  0px auto 0px auto;
  // overflow: scroll hidden;
  .psBg{
    width: 640px;
    height: 22px;
    // background: linear-gradient(to left, transparent,transparent 7.14%,#9CBFFF 7.14%,#9CBFFF 92.86%, transparent 92.86%, transparent);
    background: #FFFFFF;
    border-radius: 11px;
    position: relative;
    top: 100px;
    display: flex;
    &::after{
      content: '';
      width: 640px;
      height: 18px;
      background: #E3C386;
      border-radius: 11px;
      // background: #466BD5;
      // background: linear-gradient(to right, transparent,transparent 7.14%,#466BD5 7.14%,#466BD5 92.86%, transparent 92.86%, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    .currentPs{
      width: 640px;
      height: 22px;
      background: linear-gradient(0deg, #F25C13, #FFC039);
      // background-image: linear-gradient(to right, transparent 0px, transparent 86px, #FFEF85 86px, #FFEF85 1114px, transparent 1114px, transparent 1200px);
      border: none;
      border-radius: 10px 0 0 10px;
      position: absolute;
      left: 0px;
      top: 0;
      z-index: 2;
      &.fullSp{
        border-radius: 10px;
      }
    }
    .nodeItem{
      // width: 25%;
      height: 22px;
      position: relative;
      z-index: 3;
      .itemNodeIcon{
        width: 108px;
        height: 108px;
        background: transparent;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .itemNodeName{
          font-weight: bold;
          font-size: 26px;
          color: #A94214;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -36px;
        }
        .itemNodeMile{
          font-weight: bold;
          font-size: 24px;
          color: #E67108;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -36px;
        }
      }
      .itemAwardsArea{
        width: 156px;
        min-height: 150px;
        border-image-source: url('@/pages/midAutumn/assets/mk5_11.png');
        border-image-slice: 50 0 50 0 fill;
        border-image-width: 50px 0 50px 0;
        padding: 30px 0 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
        .awardIt{
          width: 128px;
          height: 108px;
          background: linear-gradient(180deg, #DF772A, #F9AF46);
          border-radius: 20px;
          border: 4px solid #FFCC5F;
          padding: 0 10px;
          margin: 0 auto 35px auto;
          position: relative;
          &.titleSp{
            padding-bottom: 24px;
          }
          .isPreview{
            width: 120px;
            height: 26px;
            background: url('@/pages/midAutumn/assets/mk5_13.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
          }
          .awardText{
            font-weight: bold;
            font-size: 20px;
            color: #A94214;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -35px;
          }
          .awardCover{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            &.status1{
              width: 154px;
              height: 134px;
              background: url('@/pages/midAutumn/assets/mk5_21.png') no-repeat left top/100% 100%;
            }
            &.status2{
              width: 128px;
              height: 108px;
              background: url('@/pages/midAutumn/assets/mk5_14.png') no-repeat left top/100% 100%;
            }
          }
        }
      }
    }
  }
}
</style>
