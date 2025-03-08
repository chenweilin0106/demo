<template>
  <out-box class="SurpriseBenefit" title="title_11.png">
    <div class="task-contain">
      <div class="icon-box flex-center">
        <img :src="IconPath('hsfs_120_120.png')" />
        <div class="name flex-center">红色符石置换次数+1</div>
      </div>
      <div class="text-box">
        <p>活动期间累计消耗绿晶石达到15万</p>
        <p>
          （{{
            +this.surpriseData.use_ljs_num >= +this.surpriseData.need_ljs_num
              ? this.surpriseData.need_ljs_num
              : this.surpriseData.use_ljs_num
          }}/{{ this.surpriseData.need_ljs_num }}）
        </p>
      </div>
      <div
        class="task-button"
        :class="ButtonStyle('1', hasRight)"
        @click="handleReceive"
      >
        {{ ButtonText('1', hasRight) }}
      </div>
    </div>
    <div class="play-rule">
      <div class="title-text flex-center">
        <img :src="IconPath('mk4_9.png')" class="label" />
        <span class="text">红色符石置换说明</span>
        <img :src="IconPath('mk4_9.png')" class="label" />
      </div>
      <img :src="IconPath('mk4_8.png')" class="desc-image" />
      <div class="rule-text">
        <ul>
          <li><span></span>玩家可将已有的红色符石更换为其他红色符石</li>
          <li><span></span>具体规则如下：</li>
          <li class="margin-left-35">
            <span class="white-point"></span>强攻 /御敌 /不败 /必中
            符石可互相更换
          </li>
          <li class="margin-left-35">
            <span class="white-point"></span>狂暴·踢 /狂暴·锁 符石可更换为强攻
            /御敌 /
          </li>
          <li class="margin-left-35">
            不败 /必中 / 狂暴·踢 /狂暴·锁 中的任意一款
          </li>
          <li><span></span>获取红色符石置换奖励的玩家可在活动结束后7个</li>
          <li>工作日内联系官方（ID：1888）更换已有的红色</li>
          <li>符石类型</li>
        </ul>
      </div>
    </div>
  </out-box>
</template>

<script>
import { getPageData } from '@/pages/lanternFestival/api'

export default {
  name: 'SurpriseBenefit',
  props: ['surpriseData'],
  data() {
    return {}
  },
  computed: {
    hasRight() {
      return this.surpriseData.receive_ljs_num
        ? 2
        : this.surpriseData.use_ljs_num >= this.surpriseData.need_ljs_num
        ? 1
        : 0
    }
  },
  created() {},
  methods: {
    async handleReceive() {
      if (this.hasRight == 1) {
        const res = await getPageData({ type: 'spar_receive' })
        this.$toast(res.errmsg)
        if (res.errno) return
        this.$emit('update')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.SurpriseBenefit {
  margin-top: 65px;
  height: 1540px;
  padding-top: 47px;

  .task-contain {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto 21px;
    width: 664px;
    height: 222px;
    padding-left: 24px;
    background: url('@/pages/lanternFestival/assets/mk4_5.png') no-repeat left
      top/100% 100%;

    .icon-box {
      position: relative;
      margin-right: 9px;
      width: 185px;
      height: 185px;
      background: url('@/pages/lanternFestival/assets/mk2_1.png') no-repeat left
        top/100% 100%;

      > img {
        width: 114px;
        height: 121px;
      }

      .name {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 40px;
        background: linear-gradient(90deg, #db6034, #ce442b);
        border-radius: 20px;
        font-size: 20px;
        color: #f5f5f8;
      }
    }

    .text-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: fit-content;
      height: 100%;
      white-space: nowrap;

      p:nth-child(1) {
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
      }

      p:nth-child(2) {
        margin-left: -13px;
        margin-top: 33px;
        font-size: 28px;
        color: #fffaa6;
      }
    }

    .task-button {
      position: absolute;
      bottom: 45px;
      right: 30px;
      width: 136px;
      height: 64px;
    }
  }

  .play-rule {
    margin: 0 auto;
    width: 674px;
    height: 1196px;
    background: url('@/pages/lanternFestival/assets/mk4_7.png') no-repeat left
      top/100% 100%;
    padding-top: 44px;

    .title-text {
      margin: 0 auto;
      width: fit-content;

      .text {
        margin: 0 14px;
        white-space: nowrap;
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
      }

      .label {
        width: 131px;
        height: 24px;
      }

      .label:nth-child(3) {
        transform: rotate(180deg);
      }
    }

    .desc-image {
      display: block;
      margin: 22px auto 15px;
      width: 628px;
      height: 659px;
    }

    .rule-text {
      margin-left: 49px;

      .white-point {
        background-color: #fff;
      }

      .margin-left-35 {
        margin-left: 35px;
      }

      li {
        line-height: 50px;
      }
    }
  }
}
</style>
