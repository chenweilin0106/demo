<template>
  <div class="hourlyList">
    <div v-if="rankingState" class="rankTitle">
      本榜单将在<span class="time">19:00-23:00</span> 开启
    </div>
    <div v-else class="hourlyRanking">
      <div class="countdown">
        <div class="countdown_text">本小时榜单</div>
        <div class="countdown_time">
          倒计时:
          <span class="time">
            {{ count_down != -1 && count_down }}
          </span>
        </div>
      </div>
      <topThree
        :topThreeList="hour_rank.slice(0, 3)"
        v-if="!rankingState && !nameList.lenth"
      ></topThree>
      <rankList></rankList>
    </div>
  </div>
</template>

<script>
import topThree from '../components/topThree.vue'
import rankList from '../components/rankList.vue'
export default {
  // 组件名称
  name: 'hourlyList',
  // props父组件参数
  props: {
    hour_rank: {
      type: Array,
      default: () => []
    },
    count_down: {
      type: String,
      default: -1
    }
  },
  components: { topThree, rankList },
  data () {
    return {
      nameList: [], // 小时榜单列表
      rankingState: false // 榜单开启状态

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: { },
  methods: {

  },
  created () {
  },
  mounted () {

  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.hourlyList {
  width: 100%;
  min-height: 180px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .rankTitle {
    width: 100%;
    line-height: 180px;
    font-size: 14px;
    .time {
      color: #c9813f;
    }
  }

  .hourlyRanking {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    .countdown {
      display: flex;
      justify-content: space-between;
      width: 334px;
      height: 30px;
      background-color: #b3e9f7;
      align-items: center;
      border-radius: 6px;
      font-size: 14px;
      color: #3270b9;
      .countdown_text {
        padding-left: 5px;
      }
      .countdown_time {
        padding-right: 5px;
      }
    }
  }
}
</style>
