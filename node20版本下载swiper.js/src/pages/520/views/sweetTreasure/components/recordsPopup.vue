<template>
  <PopupBox :title="'title_18.png'" @clickClose="clickClose">
    <div class="main" ref="scrollDiv" @scroll="handleScroll">
      <div class="listItem" v-for="(item, index) in list" :key="index">
        <div class="text1">
          获得<span v-if="item.is_rare == 1">稀有</span>奖励&ensp;<i>{{item.desc}}</i>
        </div>
        <div class="text2">{{ item.create_time }}</div>
      </div>
      <div class="noData" v-if="list.length === 0">当前没有记录哦，先去摘星吧~</div>
      <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/520/api/index.js'
// import { _throttle } from '@/pages/luckyFlop/utils/tool'

export default {
  props: [],
  data() {
    return {
      isShowPo: true,
      list: [], // 奖品记录数组
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
      console.log('lastPage:', this.lastPage)
      console.log('page:', this.page)
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getPageData({ type: 'pick_star_log', mark: this.page }).then((res) => {
          if (res.errno == 0) {
            // console.log(res.data.has_mord)
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
      if (content.clientHeight + content.scrollTop >= content.scrollHeight) {
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
.main {
  width: 100%;
  height: 600px;
  text-align: center;
  text-align: -webkit-center;
  overflow: hidden scroll;
  .listItem {
    width: 600px;
    height: 100px;
    position: relative;
    &:nth-child(odd) {
      background: rgba(179, 40, 91, 0.3);
    }
    &:nth-child(even) {
      // background: #6eccbe;
    }
    .text1 {
      font-size: 28px;
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
