<template>
  <div class="compoPsBg">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/tot_list.length}%`" v-for="(item) in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right!=0?'active':null]"></div>
        <div :class="['rewardDiv',`status${item.has_right}`]" @click="nodeIconCk(item)">
          <div class="rewardIcon">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
            <div class="previewMark" v-if="item.key==20000"></div>
          </div>
          <div class="rewardText">{{$toShowText(item, { pst_privilege: null, ring: null })}}</div>
          <div class="mileShow"><strong>累计收礼达</strong><br>{{item.key}}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <!-- <div v-if="typeToNameMap[item.type]" class="typeLabel line-height-1 flex align-center justify-center position-absolute">{{typeToNameMap[item.type]}}</div> -->
          <div v-if="item.key==3000" class="typeLabel line-height-1 flex align-center justify-center position-absolute">礼物赠送权</div>
          <div v-if="item.key==3000||item.key==15000" class="priceLabel radius-999 flex align-center position-absolute line-height-1">
            {{ item.key == 3000 ? 520 : 3344 }}<img :src="IconPath('zs_42_32.png')" alt="" />
          </div>
          <!-- <div class="newMark" v-if="item.key==20000">新</div> -->
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
      console.log(item)
      // this.$emit('openReceivePopup', [{ icon: 'shlm_120_120.png', id: 34, max_nums: 10000, name: '山花烂漫', nums: 5, text: '5天', type: 'chat_bubble_pub' }])
      if (item.has_right == 1) {
        getPageData({ type: 'present_contact_rev', mark: item.key }).then((res) => {
          if (res.errno) return this.$toast(res.errmsg)
          // 打开获奖弹窗
          this.$emit('openReceivePopup', [res.data.award], item.key)
          this.scrollHas()
        })
      } else {
        if (item.key == 20000) {
          this.$emit('previewImgCk', item)
        }
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
      if (this.tot_num >= this.tot_list[this.tot_list.length - 1].key) {
        return 100
      }
      let node = 0 // 处于第几个节点
      for (let index in this.tot_list) {
        if (this.tot_list[index].key >= this.tot_num) {
          node = index
          break
        }
      }
      if (node > 0) {
        let a = this.tot_num - this.tot_list[node - 1].key
        let b = this.tot_list[node].key - this.tot_list[node - 1].key
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        if (this.tot_list[node].key == 0) {
          return 0
        } else {
          let e = (100 / this.tot_list.length) / 2 - this.nodePercent
          return this.tot_num / this.tot_list[node].key * e
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compoPsBg{
  width: 660px; // 进度条宽度
  height: 326px; // 进度条高度 + 奖励高度 + 底部文字高度 + 上下边距高度
  overflow-y: hidden;
  // overflow-x: scroll;
  overflow-X: hidden;
  overscroll-behavior: none;
  margin: 0 auto 0 auto;
  .psBg{
    width: 100%;
    height: 14px;
    //background: linear-gradient(to right,#FDBFD8 87.5%, transparent 87.5%, transparent);
    background: linear-gradient(to right,#FFC5DE);
    border-radius: 25px;
    position: relative;
    top: 204px;
    display: flex;
    &::after{
      content: '';
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      //background: linear-gradient(to right,#E26996 87.5%, transparent 87.5%, transparent);
      background: linear-gradient(to right,#FF7CB5);
      border-radius: 25px - 4;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .currentPs{
      width: 100%;
      height: 100%;
      //background-image: linear-gradient(to right, #8FBEFF 577.5px, transparent 577.5px, transparent 660px);
      background-image: linear-gradient(to right, #8FBEFF);
      border: none;
      border-radius: 25px - 4;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 2;
    }
    .nodeItem{
      // width: 25%;
      height: 100%;
      position: relative;
      z-index: 3;
      .itemNodeIcon{
        width: 40px;
        height: 40px;
        background: #FF7CB5;
        border-radius: 50%;
        border: 4px solid #FFC5DE;
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
            background: url('@/pages/gardenParty/assets/mk3_4.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .rewardDiv{
        width: 144px;
        height: 159px;
        background: url('@/pages/gardenParty/assets/mk3_1.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        top: -18px;
        transform: translateX(-50%) translateY(-100%);
        &.status1::after{
          content: '';
          width: 144px;
          height: 159px;
          background: url('@/pages/gardenParty/assets/mk3_3.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
        &.status2::after{
          content: '';
          width: 144px;
          height: 159px;
          background: url('@/pages/gardenParty/assets/mk3_2.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .rewardIcon{
          width: 90px;
          height: 90px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 15px;
          &.titleSp{
            width: 120px;
          }
          .previewMark{
            width: 122px;
            height: 24px;
            background: url('@/pages/gardenParty/assets/mk3_5.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
          }
        }
        .rewardText{
          white-space: nowrap;
          font-size: 22px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 110px;
          line-height: 1;
        }
        .mileShow{
          white-space: nowrap;
          font-size: 24px;
          color: #861F52;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 217px;
          line-height: 28px;
          strong{
            font-weight: bold;
          }
        }
        .redMark{
          width: 16px;
          height: 16px;
          background: #E22A2A;
          border-radius: 50%;
          position: absolute;
          right: 5px;
          top: 32px;
          z-index: 2;
        }
        .typeLabel{
          z-index: 1;
          left: 50%;
          transform: translateX(-50%);
          top: 76px;
          width: 102px;
          height: 28px;
          background: linear-gradient(90deg, transparent, #FFA5DD 16%, #9BC8FF 84%, transparent);
          font-weight: 500;
          font-size: 18px;
          color: #FFFFFF;
        }
        .priceLabel {
          font-size: 20px;
          font-weight: 500;
          right: -4px;
          top: -4px;
          color: #FFFFFF;
          //transform: translateY(-50%);
          padding: 4px 5px 4px 10px;
          height: 34px;
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          img {
            width: 27px;
            height: 20px;
            margin: 0 0 0 2px;
          }
        }
        .newMark{
          width: 44px;
          height: 36px;
          background: linear-gradient(-90deg, #FF7FA6, #FD5AB6);
          border-radius: 18px 19px 0px 18px;
          position: absolute;
          left: -2px;
          top: -18px;
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
        }
      }
    }
  }
}
</style>
