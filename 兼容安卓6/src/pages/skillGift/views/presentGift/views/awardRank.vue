<template>
  <div class="awardRank">
    <div class="top_my_goods">我获赠的钻石礼物：{{ my_present }}钻</div>
    <myRank @onUserMain="toUserMain" :rankData="present_top"></myRank>
  </div>
</template>

<script>
import myRank from '../components/myRank.vue'
import { toUserMain } from '../../../utils/toApp'
export default {
  name: 'awardRank',
  components: {
    myRank
  },
  props: {
    diamondGiftsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    present_top() {
      return this.diamondGiftsData.present_top
    },
    my_present() {
      return this.diamondGiftsData.my_present
    }
  },
  watch: {},
  created() {},
  methods: {
    toUserMain(uid) {
      // 传入点击的用户的uid
      if (uid) {
        toUserMain(uid)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.awardRank {
  padding: 0 10px 10px;
  overflow: hidden;
  box-sizing: border-box;
  .top_my_goods {
    width: 100%;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }
}
</style>
