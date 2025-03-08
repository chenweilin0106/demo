<template>
  <div class="awardRank">
    <div class="top_my_goods">我获赠的钻石礼物：{{ my_present }}钻</div>
      <myRank :rankData="present_top"></myRank>
  </div>
</template>

<script>
import myRank from '../components/myRank.vue'
export default {
  name: 'awardRank',
  components: {
    myRank
  },
  props: {
    pageData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    present_top() {
      return this.pageData.present_top
    },
    my_present() {
      return this.pageData.my_present
    }
  },
  watch: {},
  created() {},
  methods: {}
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
