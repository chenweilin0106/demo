<template>
  <PopupBox title="title_35.png" @clickClose="clickClose">
    <template v-if="list.length">
      <div class="head flex line-height-1 margin-row-center">
        <div class="head1">奖励</div>
        <div class="head2 line-height-100">时间</div>
      </div>
      <div class="scrollList" ref="records" @scroll="handleScroll">
        <div class="listItem" v-for="(item, index) in list" :key="index">
          <div class="text1">
            获得<span v-if="item.is_rare == 1">稀有</span>奖励&ensp;<i>{{
              item.desc
            }}</i>
          </div>
          <div class="text2">{{ item.create_time }}</div>
        </div>
        <div class="noMoreData" v-if="isNextPage === false && list.length != 0">
          没有更多记录了
        </div>
      </div>
    </template>
    <div v-else class="noData flex justify-center">暂无参与记录</div>
  </PopupBox>
</template>

<script>
import { getPageData } from "@/api/index"

export default {
  name: 'recordsVue',
  data() {
    return {
      record_list: [
        // { desc: '稀有', create_time: '2021-02-02 12:00:00', is_rare: 1 },
      ], // 奖品记录数组
      lastPage: 0, // 最后一次请求时的页数
      page: 1, // 页数
      isNextPage: true, // 是否有下一页
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  watch: {},
  methods: {
    getRecordData() {
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getExchangeRecordApi(this.page, 1).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            if (res.data.has_more === false) {
              this.isNextPage = false
            } else {
              this.page++
            }
            this.record_list = this.record_list.concat(res.data.list)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    handleScroll() {
      const content = this.$refs.records // 获取到包含内容的元素
      if (
        content.clientHeight + content.scrollTop >=
        content.scrollHeight - 100
      ) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getRecordData()
        }
      }
    },
    clickClose() {
      this.$emit("clickClose")
    }
  }
}
</script>

<style scoped lang="scss">
.head {
  width: 565px; // todo
  margin-bottom: 10px;
  font-size: 24px;
  color: #ffffff;
  .head1 {
    margin-left: 87px;
  }
  .head2 {
    margin-left: 332px;
  }
}
.scrollList {
  width: 100%;
  height: 720px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 565px; // todo
    height: 70px;
    position: relative;
    color: #fff;
    &:nth-child(odd) {
      background: rgba(214, 94, 62, 0.3);
      // border-radius: 40px;
    }
    // &:nth-child(even) {
    //   background: #CAB9FF;
    // }
    .text1 {
      position: absolute;
      font-size: 22px;
      left: 9px;
      top: 50%;
      transform: translateY(-50%);
      i {
        color: #fffa6e;
      }
    }
    .text2 {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
      font-size: 22px;
      color: #fff;
    }
  }
  .noMoreData {
    width: 600px;
    height: 60px;
    font-size: 22px;
    color: #fff;
    margin-top: 50px;
  }
}
.noData {
  font-size: 28px;
  color: #fff;
  height: 754px;
  padding-top: 340px;
}
</style>
