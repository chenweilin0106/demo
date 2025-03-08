<template>
  <div class="dailyList">
    <!-- 赠送榜和获赠榜标题 -->
    <div class="giveGetTitle">
      <div
        class="tabs"
        v-for="tab in tabList"
        :key="tab"
        @click="changeList(tab)"
        :class="{ tab_active: tabActive == tab }"
      >
        {{ tab }}
      </div>
    </div>
    <!-- 前三名 -->
    <topThreeVue></topThreeVue>
    <!-- 排行列表 -->
    <rankListVue :tabActive="tabActive" :tabList="tabList"></rankListVue>
  </div>
</template>

<script>
// 默认数据
import { summerRank } from '../../../utils/pageData'
// 跳转用户主页
import { toUserMain } from '../../../utils/toApp'
import rankListVue from '../components/rankList.vue'
import topThreeVue from '../components/topThree.vue'
export default {
  // 组件名称
  name: 'dailyList',
  // props父组件参数
  props: {},
  components: { topThreeVue, rankListVue },
  data () {
    return {
      lucky_ranks_index: [],
      present_top: [],
      send_present_top: [],
      tabActive: '赠送榜',
      tabList: ['赠送榜', '获赠榜'], // 榜单
      my_present: 0,
      my_send_present: 0,
      my_username: '20013',
      my_profile_image: 'http://cdn-image.dandan818.com/app/head/head_block_1.png',
      uid: '20013',
      topThree: [
        {
          rankName: '第1名',
          awardleftNumber: '+1000',
          awardLeftImgSrc: '',
          awardrightNumber: '+3',
          awardRightImgSrc: ''
        }, {
          rankName: '第2名',
          awardleftNumber: '+200',
          awardLeftImgSrc: '',
          awardrightNumber: '+2',
          awardRightImgSrc: ''
        },
        {
          rankName: '第3名',
          awardleftNumber: '+600',
          awardLeftImgSrc: '',
          awardrightNumber: '+1',
          awardRightImgSrc: ''
        }
      ]

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  methods: {
    // 跳转用户主页
    toUserMain (uid) {
      toUserMain(uid)
    },
    // 查找uid位置
    findUid (arr, key) {
      const arr1 = []
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].uid == key) {
          arr1.push(index)
        }
      }
      if (arr1.length == 1) {
        return arr1[0]
      } else if (arr1.length == 0) {
        return -1
      } else {
        return arr1
      }
    },
    // 切换奖池
    changeList (tab) {
      this.tabActive = tab
    }
  },
  created () {
    this.lucky_ranks_index = summerRank.lucky_ranks_index
    this.present_top = summerRank.present_top
    this.send_present_top = summerRank.send_present_top
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped >
.dailyList {
  display: flex;
  flex-direction: column;
  align-items: center;
  .giveGetTitle {
    width: 200px;
    height: 30px;
    background: #b3e9f7;
    border-radius: 15px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: #fff;
    .tabs,
    .tab_active {
      width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
    }
    .tab_active {
      background: linear-gradient(90deg, #5ca0ec, #16b09e);
    }
  }
}
</style>
