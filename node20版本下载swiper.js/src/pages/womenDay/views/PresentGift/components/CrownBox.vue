<template>
  <div :class="['CrownBox', type]">
    <div class="content-1 flex justify-center align-center flex-no-wrap">
      <div class="icon-box h-100 flex-shrink-0">
        <div class="inner flex justify-center align-center w-100 h-100">
          <img :src="IconPath(rewardInfo.icon)" />
        </div>
      </div>
      <div class="text-box h-100 flex-shrink-0 flex-column justify-center">
        <p class="text-nowrap">
          活动期间累计收到{{ rewardInfo.giftMaxNum }}个钻石礼物【{{
            rewardInfo.name
          }}】
        </p>
        <p v-if="userRewardInfo" class="text-nowrap">
          <i
            >（{{ userRewardInfo.gift_rev_nums }}/{{
              userRewardInfo.gift_max_nums
            }}）</i
          >
        </p>
        <p class="text-nowrap row-3 flex align-center">
          且充值金额达到{{ rewardInfo.maxRechargeNum }}元
          <i v-if="userRewardInfo"
            >（{{
              numberLimit(
                rewardDetail.recharge_nums,
                rewardInfo.maxRechargeNum
              )
            }}/{{ rewardInfo.maxRechargeNum }}）</i
          >
        </p>
      </div>
    </div>
    <div class="content-2 flex align-center justify-center flex-no-wrap">
      <div class="reward-title flex-shrink-0 flex align-center">
        <div class="title position-relative">
          <public-json :jsonName="type == 'woman' ? 'ch_gzqfc' : 'ch_wzqbf'" />
        </div>
        <div class="reward-title-tip flex-column align-center">
          <p class="title-tip-row-1 text-nowrap">永久称号</p>
          <p class="title-tip-row-2 text-nowrap">
            限{{ type == 'woman' ? '女性' : '男性' }}玩家领取
          </p>
        </div>
      </div>
      <img
        :src="IconPath(buttonIcon)"
        class="reward-button flex-shrink-0"
        @click="handleReceive"
      />
    </div>
    <!--恭喜获得弹框-->
    <transition name="fade">
      <congrats-get-prompt
        v-if="showCongratsGet"
        :list="dialogData"
        row-num="3"
        @close="showCongratsGet = false"
      >
        <template v-slot="{ data: { id } }">
          <public-json :jsonName="id == '5100' ? 'ch_gzqfc' : 'ch_wzqbf'" />
        </template>
      </congrats-get-prompt>
    </transition>
  </div>
</template>

<script>
import { getPageData } from '@/pages/womenDay/api/index'
import PublicJson from '@/pages/womenDay/components/PublicJson.vue'
import CongratsGetPrompt from '@/pages/womenDay/components/congrats-get-prompt.vue'

export default {
  name: 'CrownBox',
  props: ['type', 'rewardDetail'],
  components: { PublicJson, CongratsGetPrompt },
  data() {
    return {
      dialogData: [
        // {
        //   icon: '',
        //   id: '5100',
        //   text: '永久称号',
        //   type: 'title'
        // }
      ],
      showCongratsGet: false,
      rewardInfoObj: Object.freeze({
        woman: {
          icon: 'wg_99_81.png',
          name: '王冠',
          maxRechargeNum: '100',
          giftMaxNum: '520'
        },
        man: {
          icon: 'djl_84_80.png',
          name: '大金链',
          maxRechargeNum: '300',
          giftMaxNum: '136'
        }
      }),
      buttonIconObj: Object.freeze({
        0: 'mk3_7.png',
        1: 'mk3_6.png',
        2: 'mk3_8.png',
        3: 'mk3_9.png'
      })
    }
  },
  computed: {
    // 奖励信息
    rewardInfo() {
      return this.rewardInfoObj[this.type]
    },
    // 任务信息
    userRewardInfo() {
      const res = this.rewardDetail[`${this.type}_gift`]
      return Object.keys(res).length ? res : ''
    },
    // 当前用户性别
    userGender() {
      return this.rewardDetail.gender == 0 ? 'man' : 'woman'
    },
    // 按钮图标
    buttonIcon() {
      if (this.type == this.userGender) {
        return this.buttonIconObj[this.userRewardInfo.gift_award_st]
      } else {
        return this.buttonIconObj[3]
      }
    }
  },
  created() {},
  methods: {
    // 领取
    async handleReceive() {
      if (this.userGender != this.type) return
      if (this.userRewardInfo && this.userRewardInfo.gift_award_st != 1) return
      const mark = this.rewardDetail.gender == 0 ? '2' : '1'
      const res = await getPageData({ type: 'woman_day_rev_title', mark })
      if (res.errno) return this.$toast(res.errmsg)
      this.dialogData = [res.data.award]
      this.showCongratsGet = true
      this.$emit('receive-success')
    },
    numberLimit(current, max) {
      return +current >= +max ? max : current
    }
  }
}
</script>

<style scoped lang="scss">
.CrownBox {
  margin: 0 auto 22px;
  padding-top: 23px;
  width: 671px;
  height: 383px;

  .content-1 {
    margin-bottom: 24px;
    width: 100%;
    height: 126px;

    .icon-box {
      margin-right: 11px;
      width: 126px;
      border: 6px solid #dec487;
      border-radius: 20px;
      padding: 2px;
      background-color: #fff;

      .inner {
        border-radius: 12px;

        img {
          width: 90%;
        }
      }
    }

    .text-box {
      p {
        font-size: 26px;
        color: #ffffff;
      }

      i {
        margin-left: -10px;
        font-size: 22px;
        color: #fffaa6;
      }

      .row-3 {
        margin-top: 10px;
        //line-height: 100%;
        i {
          height: fit-content;
          //line-height: 100%;
        }
      }
    }
  }

  .content-2 {
    width: 100%;
    height: 172px;

    .reward-title {
      margin-right: 16px;
      width: 494px;
      height: 100%;
      padding-left: 42px;

      .title {
        top: -10px;
        margin-right: 37px;
        width: 210px;
        height: 96px;
      }

      .reward-title-tip {
        .title-tip-row-1 {
          font-size: 31px;
          font-weight: 500;
          color: #ffffff;
        }

        .title-tip-row-2 {
          margin-top: 27px;
          font-size: 23px;
        }
      }
    }

    .reward-button {
      width: 137px;
      height: 141px;
    }
  }
}

.woman {
  background: url('@/pages/womenDay/assets/mk3_2.png') no-repeat left top/100%
    100%;

  .inner {
    background: linear-gradient(180deg, #5d202f, #922e54);
  }

  .reward-title {
    background: url('@/pages/womenDay/assets/mk3_1.png') no-repeat left top/100%
      100%;
  }

  .title-tip-row-2 {
    color: #ff7088;
  }
}

.man {
  background: url('@/pages/womenDay/assets/mk3_4.png') no-repeat left top/100%
    100%;

  .inner {
    background: linear-gradient(180deg, #37205d, #4f59a1);
  }

  .reward-title {
    background: url('@/pages/womenDay/assets/mk3_3.png') no-repeat left top/100%
      100%;
  }

  .title-tip-row-2 {
    color: #80c8ff;
  }
}
</style>
