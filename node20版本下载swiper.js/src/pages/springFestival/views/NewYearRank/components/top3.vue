<template>
  <div class="top3_container">
    <!-- 财神日榜 -->
    <cs_day_top3
      v-if="dayflag == 1 && tabflag == 1"
      :pageData2="data1"
    ></cs_day_top3>
    <!-- 名人日榜 -->
    <mr_day_top3
      v-if="dayflag == 1 && tabflag == 2"
      :pageData2="data2"
    ></mr_day_top3>
    <!-- 财神总榜 -->
    <cs_total_top3
      v-if="dayflag == 2 && tabflag == 1"
      :pageData2="data1"
    ></cs_total_top3>
    <!-- 名人总榜 -->
    <mr_total_top3
      v-if="dayflag == 2 && tabflag == 2"
      :pageData2="data3"
    ></mr_total_top3>
  </div>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'
import cs_day_top3 from './components_top3/cs_day_top3.vue'
import mr_day_top3 from './components_top3/mr_day_top3.vue'
import cs_total_top3 from './components_top3/cs_total_top3.vue'
import mr_total_top3 from './components_top3/mr_total_top3.vue'
export default {
  components: { cs_day_top3, mr_day_top3, cs_total_top3, mr_total_top3 },
  name: 'YearRank',
  data() {
    return {}
  },
  watch: {},
  props: ['dayflag', 'tabflag', 'data1', 'data2', 'data3'],
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toUserMain(uid) {
      toUserMain(uid)
    }
  }
}
</script>

<style scoped lang="scss">
@import url('../../../styles/flex.scss');
.top3_container {
  width: 100%;
}
</style>
