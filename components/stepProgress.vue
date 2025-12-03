<template>
  <div class="compoPsBg stepProgress">
    <div class="psBg">
      <div class="currentPs" :style="`backgroundSize: ${psPercent}% 100%;`"></div>
      <div class="nodeItem" :style="`width: ${100 / tot_list.length}%`" v-for="item in tot_list" :key="item.id">
        <div :class="['itemNodeIcon', item.has_right != 0 ? 'active' : null]"></div>
        <div class="flex align-center justify-center" :class="['rewardDiv', `status${item.has_right}`]" @click="nodeIconCk(item)">
          <div class="iconDiv flex-column position-relative">
            <lazy-component class="icon flex align-center justify-center position-relative">
              <PublicImg :imgName="item.award.icon" :imgType="item.award.type" />
            </lazy-component>
            <div class="text flex-1 flex align-center justify-center line-height-1">{{ $toShowText(item.award) }}</div>
            <div v-if="item.show_price" class="priceLabel radius-999 flex align-center position-absolute line-height-1">{{ item.show_price }}<img :src="IconPath('zs_42_32.png')" /></div>
          </div>
          <div class="mileShow">{{ item.need_num }}</div>
          <div class="redMark" v-if="item.has_right == 1"></div>
          <!-- <div v-if="index==5" class="topMark line-height-1 flex align-center">属性称号</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { receiveValueApi } from '@/api'

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
        receiveValueApi(item.id).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceivePopup', res, true)
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
      const man = document.getElementsByClassName('compoPsBg')[0]
      // console.log(document.getElementsByClassName('nodeItem')[0].clientWidth)
      let scrollIndex = 0
      for (const index in this.tot_list) {
        if (this.tot_list[index].has_right == 2) {
          scrollIndex = index
        }
        if (this.tot_list[index].has_right == 1) {
          scrollIndex = index
          break
        }
      }
      // console.log(scrollIndex)
      const len = document.getElementsByClassName('nodeItem')[0].clientWidth * (scrollIndex - 1)
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
      for (const index in this.tot_list) {
        if (this.tot_list[index].need_num >= this.tot_num) {
          node = index
          break
        }
      }
      // console.log('node', node)
      if (node > 0) {
        const a = this.tot_num - this.tot_list[node - 1].need_num
        const b = this.tot_list[node].need_num - this.tot_list[node - 1].need_num
        const modePs = a / b // 于当前节点进度
        const eachNodePs = 100 / this.tot_list.length // 每个节点的占比
        const x = eachNodePs * Number(node) - eachNodePs / 2 // 已完成的节点的百分比
        const y = this.nodePercent // 节点长度百分比的一半
        const z = modePs * (eachNodePs - this.nodePercent * 2) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        if (this.tot_list[node].need_num == 0) {
          return 0
        } else {
          const e = 100 / this.tot_list.length / 2 - this.nodePercent
          return (this.tot_num / this.tot_list[node].need_num) * e
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compoPsBg {
  width: 632px;
  height: 360px;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior: none;
  // padding-left: 30px;
  .psBg {
    width: 632px;
    height: 14px;
    background: #dfccff;
    // background: linear-gradient(to left, transparent,transparent 6.25%,#F6CE79 6.25%,#F6CE79 93.75%, transparent 93.75%, transparent);
    border-radius: 999999999px;
    // border: 4px solid #5890F5;
    position: relative;
    top: 279px;
    display: flex;
    &::after {
      content: '';
      height: 6px;
      background: #5f53be;
      border-radius: 999999999px;
      // background: linear-gradient(to right, transparent,transparent 6.25%,#C47E34 6.25%,#C47E34 93.75%, transparent 93.75%, transparent);
      position: absolute;
      left: 4px;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    // &::before{
    //   content: '';
    //   width: 30px;
    //   height: 100%;
    //   position: absolute;
    //   right: -30px;
    //   top: 0;
    // }
    .currentPs {
      width: 632px;
      height: 14px;
      background: linear-gradient(#ffdf4c, #ffdf4c) no-repeat;
      // background-image: linear-gradient(to right, transparent 0px, transparent 81.25px, #FFAF14 81.25px, #FFAF14 1218px, transparent 1218px, transparent 1300px);
      border: none;
      border-radius: 999999999px;
      position: absolute;
      left: 0px;
      top: 0;
      z-index: 2;
    }
    .nodeItem {
      // width: 25%;
      height: 14px;
      position: relative;
      z-index: 3;
      .itemNodeIcon {
        width: 42px;
        height: 42px;
        background: #5f53be;
        border-radius: 50%;
        border: 4px solid #dfccff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &.active {
          background: #ffdf4c;
          border: 0px;
          border-radius: 50%;
          &::after {
            content: '';
            width: 50px;
            height: 59px;
            background: url('@/assets/mk1_27.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .rewardDiv {
        width: 181px;
        height: 233px;
        background: url('@/assets/mk1_24.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -255px;
        &.status1::after {
          content: '';
          width: 209px;
          height: 264px;
          background: url('@/assets/mk1_25.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -16px;
          top: -14px;
          z-index: 1;
        }
        &.status2::after {
          content: '';
          width: 181px;
          height: 233px;
          background: url('@/assets/mk1_26.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 3;
        }
        .iconDiv {
          $borderWidth: 4px; /*边框粗细*/
          $size: 120px; /*尺寸*/
          $radius: 12px; /*圆角*/
          $borderColor: #fff4ab; /*边框颜色*/
          $iconBgc: #5e489f; /*图标背景色*/
          $textBgc: #ae79ef; /*文本背景色*/
          $iconHeight: 106px; /*图标高度*/
          $fontSize: 22px; /*文本字体大小*/
          $color: #ffffff; /*文本字体颜色*/
          width: $size + $borderWidth * 2; /*宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
          height: 140px + $borderWidth * 2; /*高度 蓝湖上选区不包括边框 所以加上边框宽度*/
          background-color: $borderColor; /*边框颜色*/
          border-radius: $radius + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
          padding: $borderWidth;
          .icon {
            height: $iconHeight;
            background: $iconBgc;
            border-radius: $radius $radius 0 0;
          }
          .text {
            color: $color;
            font-size: $fontSize;
            background-color: $textBgc;
            border-radius: 0 0 $radius $radius;
          }
          .priceLabel {
            z-index: 2;
            font-size: 20px;
            right: -6px;
            top: 0;
            color: #ffffff;
            transform: translateY(-50%);
            padding: 7px 5px 7px 10px;
            background: linear-gradient(-90deg, #75b9ff, #ff84f8);
            img {
              width: 27px;
              height: 20px;
              margin: 0 0 0 2px;
            }
          }
        }
        .rewardText {
          white-space: nowrap;
          font-size: 22px;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 100px;
        }
        .mileShow {
          white-space: nowrap;
          font-weight: 500;
          font-size: 26px;
          color: #ffffff;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          bottom: -64px;
          line-height: 1;
        }
        .redMark {
          width: 16px;
          height: 16px;
          background: #e22a2a;
          border-radius: 50%;
          position: absolute;
          right: 15px;
          top: 16px;
          z-index: 10;
        }
        .topMark {
          background: linear-gradient(-90deg, #ea8baf, #ea8baf);
          border-radius: 17px;
          font-size: 20px;
          color: #ffffff;
          font-weight: bold;
          height: 28px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          padding: 0 6px;
          top: -7px;
          z-index: 2;
          img {
            width: 42px * 0.7;
            height: 32px * 0.7;
            vertical-align: middle;
          }
        }
        .topMarkSp {
          background: linear-gradient(-90deg, #fff);
          border-radius: 17px;
          font-size: 20px;
          color: #d48e45;
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
