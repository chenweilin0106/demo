<template>
  <PopupBox :title="'title_14.png'" :size="3" @clickClose="clickClose">
    <div class="main" ref="scrollDiv" @scroll="handleScroll">
      <div class="titleArea" v-if="list.length !== 0">
        <div class="title1">商品</div>
        <div class="title2">折扣价格</div>
        <div class="title3">代金券</div>
        <div class="title4">券后价</div>
      </div>
      <div class="listItem" v-for="(item, index) in list" :key="index">
        <div class="item1">
          <div class="giftDesc">{{item.gift_desc}}</div>
          <div class="createTime">{{item.create_time}}</div>
        </div>
        <div class="item2">
          <template v-if="item.type == 'task'">悬赏任务</template>
          <template v-else>
            {{item.discount_desc}}<img :src="IconPath(propertyIcon[item.type])" />
          </template>
        </div>
        <div class="item3">{{item.voucher_desc}}</div>
        <div class="item4">
          <template v-if="item.type == 'task'">悬赏任务</template>
          <template v-else>
            {{item.price}}<img :src="IconPath(propertyIcon[item.type])" />
          </template>
        </div>
      </div>
      <div class="noData" v-if="list.length === 0">空空如也</div>
      <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index.js'
// import { _throttle } from '@/pages/luckyFlop/utils/tool'

export default {
  props: [],
  data() {
    return {
      isShowPo: true,
      list: [], // 奖品记录数组
      lastPage: 0, // 最后一次请求时的页数
      page: 1, // 页数
      isNextPage: true, // 是否有下一页
      propertyIcon: {
        points: 'mk4_6.png',
        gamegold: 'mk4_7.png',
        masonry: 'mk4_8.png'
      } // 货币图标
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
        getPageData({ type: 'carnival_trader_buy_log', mark: this.page }).then((res) => {
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
  .titleArea{
    font-weight: 400;
    font-size: 24px;
    display: flex;
    .title1{
      width: 40%;
    }
    .title2{
      width: 20%;
    }
    .title3{
      width: 20%;
    }
    .title4{
      width: 20%;
    }
  }
  .listItem {
    width: 580px;
    height: 100px;
    position: relative;
    background: rgba(121, 61, 18, 0.3);
    border-radius: 45px;
    margin: 10px auto 0 auto;
    display: flex;
    // &:nth-child(odd) {
    //   background: rgba(179, 40, 91, 0.3);
    // }
    // &:nth-child(even) {
    //   // background: #6eccbe;
    // }
    .item1{
      width: 40%;
      display: flex;
      justify-content: center;
      // align-items: center;
      flex-direction: column;
      text-align: left;
      padding-left: 20px;
      .giftDesc{
        font-weight: 400;
        font-size: 22px;
        color: #FFFFFF;
      }
      .createTime{
        font-weight: 400;
        font-size: 20px;
        color: #FFEE7B;
      }
    }
    .item2{
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 22px;
      img{
        width: 46px*0.6;
        height: 46px*0.6;
      }
    }
    .item3{
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #FFEE7B;
      white-space: pre-wrap;
    }
    .item4{
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 22px;
      img{
        width: 46px*0.6;
        height: 46px*0.6;
      }
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
    color: #fff;
    margin-top: 50px;
  }
}
</style>
