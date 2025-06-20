<template>
  <div class="skillInfo position-relative">
    <p class="skillUpdateTip text-center">单笔充值金额≥60元，<br>可获得活动期内技能升级加成buff</p>
    <div class="addStatus flex justify-center">当前状态：<span>{{config.skill_status?'已达标':'未达标'}}</span></div>
    <div class="skillsContainer position-relative">
      <div class="skillsList flex align-center justify-center position-relative">
        <div v-for="skill in config.skill_list" :key="skill.skill_id" class="skillItem position-relative">
          <template v-if="skill.skill_id == currentSkillId">
            <img :src="IconPath('mk2_31.png')" class="lightBg position-absolute" />
            <img :src="IconPath('mk2_29.png')" class="arrow position-row-center position-absolute" />
          </template>
          <img :src="IconPath(skill.icon)" class="skillIcon position-relative" :class="{ unActive: skill.skill_id != currentSkillId }" @click="currentSkillId = skill.skill_id" />
        </div>
      </div>
    </div>
    <div class="skillDesBubble position-relative width-fit margin-row-center">
      <div class="skillDes flex align-center justify-between">
        <!--本服世界等级-->
        <div class="serverLevel flex-column align-center width-fit position-relative">
          <div class="descTitle line-height-100 text-nowrap flex align-center">
            本服世界等级<img :src="IconPath('mk2_27.png')" class="tip serverLevelTip" @click="bubbles[0].flag = !bubbles[0].flag" />
            <div v-if="bubbles[0].flag" class="serverLevelBubble position-absolute flex align-center justify-center">依据当前服务器活跃玩家的平均技能等级决定，每个技能独立计算</div>
          </div>
          <div class="serverLevelNum">{{currentSkillDesc.word_level}}</div>
        </div>
        <!--我的技能等级-->
        <div class="mySkillLevel flex-column width-fit align-center">
          <div class="descTitle line-height-100 text-nowrap">我的技能等级</div>
          <div class="mySkillLevelNum deep">{{currentSkillDesc.level}}</div>
        </div>
        <!--活动加成-->
        <div class="actUpPercentage flex-column align-center position-relative">
          <div class="descTitle line-height-100 text-nowrap flex align-center flex-no-wrap">
            活动加成<img :src="IconPath('mk2_27.png')" class="tip actUpPercentageTip" @click="bubbles[1].flag = !bubbles[1].flag" />
            <div v-if="bubbles[1].flag" class="actUpPercentageBubble flex-shrink-0 position-absolute flex align-center justify-center">
              活动加成根据“角色技能等级”与“世界技能 等级”的差距决定，差距越大则加成越高。 每个技能独立计算；多个活动加成同时生 效时取最高加成
            </div>
          </div>
          <div class="updateStatus position-absolute line-height-100 text-nowrap">{{config.skill_status?'已生效':'未生效'}}</div>
          <div class="actUpPercentageNum deep">{{currentSkillDesc.act_add_rate}}%<img :src="IconPath('mk2_7.png')" class="upIcon" /></div>
        </div>
      </div>
      <!--<ul class="rules-text">-->
      <!--  <li><span></span>技能升级的加成还可通过：钻石充值、排行榜上榜、符石道具的方式进一步提高，详情可在技能页面查看</li>-->
      <!--  <li><span></span>每期活动只可激活一次加成</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
// 使用示例：<SkillInfo :config="{skill_list,skill_status}" />
// data中的数据格式：
// skill_status: '未获得', // 加成状态
//   skill_list: [
//   { skill_id: '1', icon: 'mk2_21.png', level: '0', word_level: 0, act_add_rate: 0 },
//   { skill_id: '2', icon: 'mk2_22.png', level: '0', word_level: 0, act_add_rate: 0 },
//   { skill_id: '3', icon: 'mk2_23.png', level: '0', word_level: 0, act_add_rate: 0 },
//   { skill_id: '4', icon: 'mk2_24.png', level: '0', word_level: 0, act_add_rate: 0 },
//   { skill_id: '5', icon: 'mk2_25.png', level: '0', word_level: 0, act_add_rate: 0 },
//   { skill_id: '6', icon: 'mk2_26.png', level: '0', word_level: 0, act_add_rate: 0 }
// ], // 技能升级加成列表

export default {
  name: 'skillInfo',
  props: ['config'],
  data() {
    return {
      bubbles: [
        { dom: null, flag: false, className: 'serverLevelTip' }, // 本服世界等级说明气泡
        { dom: null, flag: false, className: 'actUpPercentageTip' } // 活动加成说明气泡
      ],
      currentSkillId: '1' // 当前技能id
    }
  },
  computed: {
    currentSkillDesc() {
      return this.config.skill_list.find((item) => item.skill_id == this.currentSkillId)
    }
  },
  mounted() {
    this.bubbles.forEach((bubble) => (bubble.dom = document.querySelector(`.${bubble.className}`))) // 获取气泡按钮dom
  },
  methods: {
    /**
     * 关闭气泡
     * @param {Event} event 点击事件
     */
    clickLayOut(event) {
      this.bubbles.forEach((bubble) => {
        if (!bubble.dom.contains(event.target)) bubble.flag = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.skillInfo{
  .skillUpdateTip{
    font-size: 28px;
    color: #0767C1;
    line-height: 36px;
    margin-bottom: 20px;
  }
  .addStatus{
    font-weight: bold;
    font-size: 28px;
    color: #0767C1;
    >span{
      color: #EB4382;
    }
  }
  .skillsContainer {
    //width: 750px;
    //height: 248px;
    //background: url('@/assets/mk1_18.png') no-repeat top left/100% 100%;
    //padding-top: 22px;
    .topTip {
      font-weight: 500;
      font-size: 26px;
      color: #ffffff;
    }
    .skillsList {
      padding-top: 21px;
      .skillItem {
        width: 96px;
        height: 96px;
        margin-right: 17px;
        &:last-child {
          margin-right: 0;
        }
        .skillIcon {
          width: 100%;
          height: 100%;
          &.unActive {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        .lightBg {
          top: -21px;
          left: -27px;
          width: 145px;
          height: 132px;
        }
        .arrow {
          bottom: -33px;
          width: 28px;
          height: 17px;
        }
      }
    }
  }
  .skillDesBubble {
    margin-top: 30px;
    .skillDes {
      width: 696px;
      height: 163px;
      background: linear-gradient(180deg, #4D9DEE, #69C0D9);
      border-radius: 30px;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
      padding: 30px 50px 23px 59px;
      .deep {
        font-weight: 800;
        font-size: 44px;
        color: #FFEB63;
      }
      .descTitle {
        font-weight: 500;
        font-size: 24px;
        color: #ffffff;
      }
      .tip {
        margin-left: 8px;
        width: 26px;
        height: 26px;
      }
      .num {
        margin-top: 12px;
        height: 76px;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: normal;
        flex-wrap: nowrap;
      }
      .bubbleText {
        font-weight: 500;
        font-size: 20px;
        color: #ffffff;
        line-height: 28px;
      }
      .serverLevel {
        .serverLevelNum {
          @extend .num;
          background: rgba(19, 111, 181, 0.5);
          border-radius: 38px;
          font-weight: 800;
          font-size: 44px;
          color: #81F8FF;
          width: 152px;
        }
        .serverLevelBubble {
          $height: 120px;
          top: -($height + 4);
          left: 31px;
          width: 270px;
          height: $height;
          @extend .bubbleText;
          padding: 0 15px 15px;
          background: url('@/pages/yearCelebration/assets/mk2_28.png') no-repeat top left/100% 100%;
          white-space: normal;
        }
      }
      .mySkillLevel {
        .mySkillLevelNum {
          @extend .num;
        }
      }
      .actUpPercentage {
        width: 130px;
        .actUpPercentageNum {
          width: 100%;
          @extend .num;
          .upIcon {
            flex-shrink: 0;
            width: 33px;
            height: auto;
          }
        }
        .updateStatus {
          top: 30px;
          left: 16px;
          font-weight: 500;
          font-size: 22px;
          color: #81F8FF;
        }
        .actUpPercentageBubble {
          $height: 145px;
          top: -($height + 4);
          right: -69px;
          width: 405px;
          height: $height;
          @extend .bubbleText;
          padding: 0 14px 15px 20px;
          background: url('@/pages/yearCelebration/assets/mk2_30.png') no-repeat top left/100% 100%;
          white-space: normal;
        }
      }
    }
    .rules-text {
      li {
        margin-left: 41px;
        color: #81d1ff;
        font-size: 22px;
        line-height: 30px;
        span {
          background-color: #81d1ff;
          top: 30px / 2 - 12px / 2;
        }
      }
    }
  }
}
</style>
