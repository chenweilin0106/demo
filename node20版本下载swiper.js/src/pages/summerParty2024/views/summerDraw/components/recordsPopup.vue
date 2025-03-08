<template>
  <PopupBox :title="'title_15.png'" @clickClose="clickClose">
    <div class="title"  v-if="list.length !== 0">
      <div>奖励</div>
      <div></div>
      <div>时间</div>
    </div>
    <div class="main" ref="scrollDiv" @scroll="handleScroll">
      <div class="listItem" v-for="(item, index) in list" :key="index">
        <div class="text1">
          获得<span v-if="item.is_rare == 1">稀有</span>奖励&ensp;<i>{{item.desc}}</i>
        </div>
        <div class="text2">{{ item.create_time }}</div>
      </div>
      <div class="noData" v-if="list.length === 0">当前没有记录哦，先去敲冰块吧~</div>
      <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api/index.js'
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
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        getPageData({ type: 'summer_knock_ice_log', mark: this.page }).then((res) => {
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
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.title{
  width: 560px;
  height: 40px;
  display: flex;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  :nth-child(1){
    width: 40%;
  }
  :nth-child(2){
    width: 30%;
  }
  :nth-child(3){
    width: 30%;
  }
}
.main {
  width: 100%;
  height: 760px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem {
    width: 560px;
    height: 70px;
    position: relative;
    &:nth-child(odd) {
      background: rgba(0, 105, 224, 0.3);
      border-radius: 35px;
    }
    &:nth-child(even) {
      // background: #CAB9FF;
    }
    .text1 {
      position: absolute;
      font-size: 22px;
      left: 10px;
      top: 20px;
      i {
        color: #fcf586;
      }
    }
    .text2 {
      position: absolute;
      right: 10px;
      top: 20px;
      font-size: 22px;
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
    font-size: 22px;
    color: #fff;
    margin-top: 50px;
  }
}
</style>
