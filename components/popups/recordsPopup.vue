<template>
  <PopupBox title="参与记录" @clickClose="clickClose">
    <template v-if="list.length">
      <div class="head flex line-height-1 margin-row-center">
        <div class="head1">奖励</div>
        <div class="head2">获得时间</div>
      </div>
      <div class="scrollList" ref="scrollDiv" @scroll="handleScroll">
        <div class="listItem" v-for="(item, index) in list" :key="index">
          <div class="detailDiv">{{ item.desc }}</div>
          <div class="timeDiv">{{ item.create_time }}</div>
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
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 },
        // { desc: '11111111111', create_time: '02-02 12:00:00', is_rare: 1 }
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
        getPageData({ type: 'heart_meet_logs', mark: { type: '1', page: this.page } }).then((res) => {
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
  width: 589px;
  margin-bottom: 15px;
  font-size: 26px;
  color: #ffffff;
  font-weight: 500;
  .head1 {
    margin-left: 105px;
  }
  .head2 {
    margin-left: 293px;
  }
}
.scrollList {
  width: 589px;
  height: 720px;
  margin: 0 auto;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 100%;
    height: 70px;
    position: relative;
    &:nth-child(odd) {
      background: rgba(214, 94, 62, 0.3);
    }
    .detailDiv {
      position: absolute;
      left: 37px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;
      color: #FFFFFF;
    }
    .timeDiv {
      position: absolute;
      right: 31px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;
      color: #fff;
    }
  }
  .noMoreData {
    width: 100%;
    font-size: 24px;
    color: #983E29;
    margin-top: 10px;
  }
}
.noData {
  font-size: 26px;
  color: #fff;
  height: 761px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
