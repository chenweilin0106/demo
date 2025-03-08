<template>
  <OutBox class="robRewards">
    <div class="taskStatus margin-row-center flex-column justify-between">
      <p class="giftStatus">
        <img :src="IconPath('mk3_1.png')" />
        <span>活动期间累计收到{{ masonry_max }}钻石礼物<i class="speical_color">（{{ numberLimit(masonry_nums, masonry_max) }}/{{ masonry_max }}）</i></span>
      </p>
      <p class="rechargeStatus">
        <img :src="IconPath('mk3_1.png')" />
        <span>且累计充值满{{ recharge_max }}元<i class="speical_color">（{{ numberLimit(recharge_nums,recharge_max) }}/{{ recharge_max }}）</i></span>
      </p>
    </div>
    <div class="getTitle">
      <div class="title"><PublicImg :imgName="award_list[0].icon" :imgType="award_list[0].type" /></div>
      <img :src="IconPath(btnIconMap[award_list[0].has_right])" class="btn" @click="$emit('receiveRobRewards')" />
    </div>
    <div class="rules-text">
      <ul>
        <li><span></span>自己赠送自己的钻石礼物不计算在内</li>
        <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
        <li>基础魅力值，魅力值上限提高50%</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
import { numberLimit } from '@/utils/tool'
export default {
  name: 'robRewards',
  props: ['masonry_nums', 'masonry_max', 'recharge_nums', 'recharge_max', 'award_list'],
  data() {
    return {
      btnIconMap: Object.freeze({ 0: 'mk3_5.png', 1: 'mk3_3.png', 2: 'mk3_4.png' })
    }
  },
  methods: {
    numberLimit
  }
}
</script>

<style scoped lang="scss">
.robRewards {
  .taskStatus {
    width: 660px;
    height: 120px;
    background: linear-gradient(90deg, #D65C32, #FFAF45); /*todo 任务背景色*/
    border-radius: 20px;
    padding: 25px 0 25px 22px;
    .giftStatus,
    .rechargeStatus {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
      line-height: 100%;
      > img {
        margin-right: 12px;
        width: 25px;
        height: 25px;
      }
      i {
        font-size: 24px;
        color: #FFFAA6;
        line-height: 100%;
      }
    }
  }
  .getTitle {
    display: flex;
    margin-top: -5px;
    margin-left: 23px;
    margin-bottom: 9px;
    overflow: hidden;
    .title {
      width: 485px;
      height: 215px;
      background: url('@/pages/goldenAutumn/assets/mk3_2.png') no-repeat center top/100% 100%;
      .imgCompo {
        margin-left: 166px;
        margin-top: 65px;
        width: 210px;
        height: 94px;
      }
    }
    .btn {
      margin-top: 41px;
      margin-left: 11px;
      width: 156px;
      height: 156px;
    }
  }
}
</style>
