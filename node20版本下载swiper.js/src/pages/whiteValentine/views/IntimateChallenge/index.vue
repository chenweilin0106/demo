<template>
  <div class="IntimateChallenge">
    <!--绑定好友-->
    <bind-friend ref="bindFriend" :bindFriendData="bindFriendData" @update="getPageData({ type: 'tab', mark: 'm4' })" />

    <!--亲密奖励-->
    <intimate-reward :rewardData="rewardData" @update="updateIntimateReward" />

    <!--亲密排行-->
    <intimate-rank :rankData="rankData" />
  </div>
</template>

<script>
import { intimateChallenge } from '../../utils/pageData'
import BindFriend from './components/BindFriend' // 绑定好友
import IntimateReward from './components/IntimateReward' // 亲密度奖励
import IntimateRank from './components/IntimateRank.vue' // 亲密度排行

export default {
  name: 'IntimateChallenge',
  components: { BindFriend, IntimateReward, IntimateRank },
  data() {
    return {}
  },
  computed: {
    bindFriendData() {
      return {
        pair_status: this.pageData.pair_status,
        pair_info: this.pageData.pair_info,
        intimacy: this.pageData.intimacy
      }
    },
    rewardData() {
      return { pair_awards: this.pageData.pair_awards, intimacy: this.pageData.intimacy }
    },
    rankData() {
      return { self_rank: this.pageData.self_rank, pair_rank: this.pageData.pair_rank }
    }
  },
  created() {
    this.pageData = intimateChallenge
    this.getPageData({ type: 'tab', mark: 'm4' })
  },
  methods: {
    updateIntimateReward(award_id) {
      this.pageData.pair_awards.find((item) => item.award_id == award_id).has_right = 2
    }
  }
}
</script>

<style scoped lang="scss">
.IntimateChallenge {
}
</style>
