<template>
  <PopupBox title="title_28.png" @clickClose="clickClose">
    <template v-if="list.length">
      <div class="head flex line-height-1 margin-row-center">
        <div class="head1">消耗积分</div>
        <div class="head2">奖励</div>
        <div class="head3">时间</div>
      </div>
      <div class="scrollList" ref="scrollDiv" @scroll="handleScroll">
        <div class="listItem" v-for="(item, index) in list" :key="index">
          <div class="text1">{{ item.nums }}</div>
          <div class="text2" :class="`status${item.desc == '兑换失败' ? 2 : ''}`">{{ item.desc }}</div>
          <div class="text3">{{ item.create_time }}</div>
        </div>
        <div class="noMoreData" v-if="isNextPage === false && list.length !== 0">没有更多记录了</div>
      </div>
    </template>
    <div v-else class="noData flex justify-center">暂无兑换记录</div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'

export default {
  name: 'recordsPopup',
  data() {
    return {
      list: [
        // { desc: '稀有', create_time: '02-02 12:00:00', is_rare: 1 }
      ], // 奖品记录数组
      lastPage: 0, // 最后一次请求时的页数
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
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getPageData({ type: 'craze_egg_exchange_log', mark: this.page }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
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
      }
    },
    handleScroll() {
      const content = this.$refs.scrollDiv // 获取到包含内容的元素
      if (content.clientHeight + content.scrollTop >= content.scrollHeight - 100) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getData()
        }
      }
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.head {
  width: 586px; // todo
  margin-bottom: 15px;
  font-size: 26px;
  color: #ffffff;
  .head1 {
    margin-left: 46px;
  }
  .head2 {
    margin-left: 95px;
  }
  .head3 {
    margin-left: 176px;
  }
}
.scrollList {
  width: 100%;
  height: 720px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 586px; // todo
    height: 70px;
    position: relative;
    color: #fff;
    &:nth-child(odd) {
      background: rgba(95, 59, 189, 0.3);
      // border-radius: 40px;
    }
    // &:nth-child(even) {
    //   background: #CAB9FF;
    // }
    .text1 {
      position: absolute;
      font-size: 22px;
      width: 25px;
      left: 63px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text2 {
      position: absolute;
      top: 50%;
      left: 163px;
      transform: translateY(-50%);
      font-size: 22px;
      color: #FFFA6E;
      width: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.status2 {
        color: #7F2948;
      }
    }
    .text3 {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;
      color: #fff;
    }
  }
  .noMoreData {
    width: 586px;
    font-size: 24px;
    color: #6845B3;
    margin-top: 20px;
  }
}
.noData {
  font-size: 28px;
  color: #fff;
  height: 761px;
  padding-top: 340px;
}
</style>
