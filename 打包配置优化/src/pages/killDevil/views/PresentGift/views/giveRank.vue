<template>
  <div class="giveRank">
    <div class="top_my_goods">我赠送的钻石礼物：{{ my_send_present }}钻</div>
      <myRank :rankData="send_present_top"></myRank>
  </div>
</template>

<script>
import myRank from '../components/myRank.vue'
export default {
  name: 'giveRank',
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
    send_present_top() {
      return this.pageData.send_present_top
    },
    my_send_present() {
      return this.pageData.my_send_present
    }
  },
  watch: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.giveRank {
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
