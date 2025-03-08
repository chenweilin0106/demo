<template>
  <div class="compo">
    <div class="psBg">
      <div class="currentPs" :style="`width: calc(${psPercent}%);`"></div>
      <div class="nodeItem" :style="`width: ${100/place_checkin_info.length}%`" v-for="(item) in place_checkin_info" :key="item.id">
        <PublicImg class="nodeIcon" :imgName="item.icon"></PublicImg>
        <div class="clickDiv" @click="nodeIconCk(item)"></div>
        <div class="areaName">{{item.name}}</div>
        <div class="mileText">{{item.mile}}km</div>
        <div class="rewardShow" @click="nodeIconCk(item)">
          <div class="rewardItem" v-for="(it) in item.awards" :key="it.id">
            <PublicImg :imgName="it.icon" :userAvatar="it.type=='mic'?$store.state.user_icon:null"></PublicImg>
            <div class="markIcon" v-if="it.mark">
              <PublicImg :imgName="it.mark"></PublicImg>
            </div>
            <div class="numDescDiv">{{it.label}}</div>
            <div class="nameDescDiv">{{it.name}}</div>
          </div>
          <div class="received" v-if="item.has_right==2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/pages/mayDay2024/api/index'

export default {
  name: 'stepProgress',
  props: ['user_mileages', 'place_checkin_info'],
  components: {},
  data() {
    return {
      psPercent: 0, // 进度条百分比
      nodePercent: 6.5 // 节点长度百分比的一半
    }
  },
  created() {
    this.psPercent = this.calcPsPercent()
  },
  mounted() {},
  computed: {},
  watch: {
    user_mileages() {
      this.psPercent = this.calcPsPercent()
    }
  },
  methods: {
    /**
     * 领奖
     */
    nodeIconCk(item) {
      console.log(item)
      if (item.has_right == 1) {
        getPageData({ type: 'travel_checkin_award', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            // 打开获奖弹窗
            this.$emit('openReceiveAwardsPopup', res.data.awards)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 计算进度条百分比
     */
    calcPsPercent() {
      if (this.user_mileages > this.place_checkin_info[this.place_checkin_info.length - 1].mile) {
        return 100
      }
      let node = 0 // 处于第几个节点
      for (let index in this.place_checkin_info) {
        if (this.place_checkin_info[index].mile >= this.user_mileages) {
          node = index
          break
        }
      }
      if (node > 0) {
        let a = this.user_mileages - this.place_checkin_info[node - 1].mile
        let b = this.place_checkin_info[node].mile - this.place_checkin_info[node - 1].mile
        let modePs = a / b // 于当前节点进度
        let eachNodePs = 100 / this.place_checkin_info.length // 每个节点的占比
        let x = (eachNodePs * Number(node)) - (eachNodePs / 2) // 已完成的节点的百分比
        let y = this.nodePercent // 节点长度百分比的一半
        let z = modePs * (eachNodePs - (this.nodePercent * 2)) // 占当前节点进度条长的百分比
        return x + (node > 0 ? y : 0) + z
      } else {
        let e = (100 / this.place_checkin_info.length) / 2 - this.nodePercent
        return this.user_mileages / this.place_checkin_info[node].mile * e
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  margin:  100px auto 460px auto;
  .psBg{
    width: 668px;
    height: 28px;
    background: url('@/pages/mayDay2024/assets/mk4_11.png') no-repeat left top/100% 100%;
    position: relative;
    display: flex;
    margin: 0 auto;
    .currentPs{
      width: 668px;
      height: 28px;
      background: url('@/pages/mayDay2024/assets/mk4_11_1.png') no-repeat;
      background-size: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
    .nodeItem{
      // width: 25%;
      height: 106px;
      position: relative;
      .nodeIcon{
        width: 106px;
        height: 106px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -40px;
      }
      .clickDiv{
        width: 88px;
        height: 88px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -30px;
      }
      .areaName{
        white-space: nowrap;
        font-size: 28px;
        color: #4A50D1;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -70px;
      }
      .mileText{
        white-space: nowrap;
        font-size: 28px;
        color: #4A50D1;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 70px;
      }
      .rewardShow{
        width: 164px;
        height: 351px;
        background: url('@/pages/mayDay2024/assets/mk4_12.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
        .rewardItem{
          width: 140px;
          height: 120px;
          background: linear-gradient(0deg, #008AFF, #647AFF);
          border-radius: 12px;
          margin: 35px auto 0 auto;
          position: relative;
          .markIcon{
            // width: 82px;
            height: 28px;
            position: absolute;
            right: 0px;
            top: 0px;
          }
          .numDescDiv{
            // width: 56px;
            height: 24px;
            padding: 0 5px;
            background: #00FDFC;
            border-radius: 12px 0px 12px 0px;
            font-size: 20px;
            color: #4A50D1;
            text-align: center;
            line-height: 24px;
            position: absolute;
            right: 0px;
            bottom: 0px;
          }
          .nameDescDiv{
            font-size: 24px;
            color: #4A50D1;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -30px;
          }
        }
        .received{
          width: 164px;
          height: 351px;
          background: url('@/pages/mayDay2024/assets/mk4_12_1.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
}
</style>
