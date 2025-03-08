<template>
  <PopupBox :title="'title_11.png'" @clickClose="clickClose">
    <div class="main" ref="scrollDiv" @scroll="handleScroll">
      <div class="listItem" v-for="(item, index) in list" :key="index">
        <div class="text1">
          获得<span v-if="item.is_rare == 1">稀有</span>奖励&ensp;<i>{{item.desc}}</i>
        </div>
        <div class="text2">{{ item.create_time }}</div>
      </div>
      <div class="noData" v-if="list.length === 0">当前暂无记录</div>
      <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index.js'
// import { _throttle } from '@/pages/luckyFlop/utils/tool'

export default {
  props: [],
  data() {
    return {
      isShowPo: true,
      list: [], // 奖品记录数组
      page: 1, // 页数
      isNextPage: true // 是否有下一页
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  watch: {},
  methods: {
    getData() {
      getPageData({ type: 'love_card_log', mark: this.page }).then((res) => {
        if (res.errno == 0) {
          if (res.data.has_mord === false) {
            this.isNextPage = false
          } else {
            this.page++
          }
          this.list = this.list.concat(res.data.list)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    handleScroll() {
      const content = this.$refs.scrollDiv // 获取到包含内容的元素
      if (
        content.clientHeight + content.scrollTop >=
        content.scrollHeight - 100
      ) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getData()
        }
      }
    },
    clickClose() {
      this.$emit('closePopups')
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 500px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 600px;
    height: 100px;
    position: relative;
    &:nth-child(odd) {
      background: #B7A2FD;
    }
    &:nth-child(even) {
      background: #CAB9FF;
    }
    .text1 {
      position: absolute;
      left: 10px;
      top: 20px;
      i {
        color: #fcf586;
      }
    }
    .text2 {
      position: absolute;
      left: 10px;
      top: 60px;
      font-size: 24px;
    }
  }
  .noData {
    font-size: 28px;
    color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .noMoreData {
    width: 600px;
    height: 60px;
    font-size: 28px;
    color: #b35553;
    margin-top: 50px;
  }
}
</style>
