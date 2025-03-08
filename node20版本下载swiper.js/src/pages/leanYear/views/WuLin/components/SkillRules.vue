<template>
  <out-box class="SkillRules" :top-icon="true">
    <div class="SkillRule" v-for="rule in skillRules" :key="rule.name">
      <div class="img-box">
        <img :src="IconPath(rule.icon)" alt="" />
      </div>
      <div class="text-box">
        <p>{{ rule.name }}</p>
        <p>
          <span>{{ rule.spendPoint }}</span>
        </p>
      </div>
    </div>
    <div class="rule-text">
      <!-- 说明文字 -->
      <ul>
        <li><span></span>活动期间内使用指定技能可获得10~20积分</li>
      </ul>
    </div>
  </out-box>
</template>

<script>
export default {
  name: 'SkillRules',
  data() {
    return {
      skillRules: [
        {
          icon: 'mk4_1.png',
          name: '佛山无影脚',
          spendPoint: '每使用一次+20积分'
        },
        {
          icon: 'mk4_2.png',
          name: '唇齿相依',
          spendPoint: '每使用一次+15积分'
        },
        {
          icon: 'mk4_6.png',
          name: '画地为牢',
          spendPoint: '每使用一次+20积分'
        },
        {
          icon: 'mk4_4.png',
          name: '一阳指',
          spendPoint: '每使用一次+15积分'
        },
        {
          icon: 'mk4_5.png',
          name: '斗转星移',
          spendPoint: '每使用一次+10积分'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.SkillRules {
  margin-top: 38px;
  height: 920px;
  padding-top: 54px;

  ::v-deep .right-side-icon {
    top: 327px;
  }

  .SkillRule {
    position: relative;
    display: flex;
    align-items: center;
    width: 664px;
    height: 138px;
    margin: 0 auto 20px;
    overflow: hidden;
    background: url('@/pages/leanYear/assets/mk1_1.png') no-repeat left top/100%
      100%;
    // 图片样式
    .img-box {
      width: 96px;
      height: 96px;
      margin-left: 32px;

      img {
        width: 100%;
      }
    }

    // 中间字体样式
    .text-box {
      display: flex;
      height: 100%;
      flex-direction: column;
      margin-left: 18px;

      p {
        margin-top: 32px;
        font-size: 32px;

        color: #ffffff;

        span {
          font-size: 24px;
          color: #fffaa6;
        }

        &:nth-of-type(2) {
          margin-top: 8px;
        }
      }
    }
  }

  .rule-text {
    margin-left: 61px;
    width: 522px;
    height: 76px;
  }
}
</style>
