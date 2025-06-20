<template>
  <PopupBox title="title_11.png" @clickClose="clickClose">
    <div class="scrollList" ref="scrollDiv" @scroll="handleScroll">
      <div class="listItem" v-for="(item,index) in list" :key="index">
        <img :src="item.head" @error="imgAtError" class="avatar" @click="toUserMain(item.uid)" />
        <div class="desc flex flex-wrap align-center">
          <span class="name line-height-1">{{item.username}}</span>
          <span class="text line-height-1">赠送给你一份{{config.cardInfoMap[item.card_id].name}}</span>
          <img class="card" :src="IconPath(config.cardInfoMap[item.card_id].icon_60)"/>
        </div>
        <PublicButton :has-right="item.status==1?2:1" class="btn flex-shrink-0" @click="receiveCk(item)"></PublicButton>
      </div>
      <div class="noData" v-if="list.length===0">暂无好友赠送</div>
      <div class="noMoreData" v-if="list.length!=0">没有更多记录了</div>
    </div>
    <div class="tip">注：每日赠送和领取次数上限分别为<i>{{config.maxSendNums}}次</i></div>
  </PopupBox>
</template>

<script>
import { receiveCardsList, receiveCard } from '@/pages/labaFestival/api'
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'

export default {
  props: ['config'],
  data() {
    return {
      lastPage: 0, // 最后一次请求时的页数
      page: 1, // 页数
      isNextPage: true, // 是否有下一页
      list: [
        // { head: 'head_1.png', username: '昵称1', card_id: 1, status: 0 }
      ] // 赠卡记录数组
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      if (this.page > this.lastPage) {
        this.lastPage = JSON.parse(JSON.stringify(this.page))
        const res = await receiveCardsList()
        if (res.errno) return this.$toast(res.errmsg)
        if (res.data.has_mord === false) {
          this.isNextPage = false
        } else {
          this.page++
        }
        this.list = this.list.concat(res.data.list)
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
    async receiveCk(item) {
      const res = await receiveCard(item.card_id, item.id)
      this.$toast(res.errmsg)
      if (res.errno) return
      item.status = 1
    },
    clickClose() {
      this.$emit('update')
      this.$emit('clickClose')
    },
    imgAtError,
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.scrollList{
  width: 100%;
  min-height: 400px;
  max-height: 618px;
  margin-bottom: 20px;
  text-align: center;
  text-align: -webkit-center;
  overflow-y: scroll;
  .listItem{
    width: 576px;
    height: 114px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    position: relative;
    background: url('@/pages/labaFestival/assets/tk_11.png') no-repeat left top/100% 100%;
    margin-bottom: 12px;
    &:last-child{
      margin-bottom: 0;
    }
    .avatar{
      width: 64px;
      height: 64px;
      background: #421D1A;
      border-radius: 50%;
      border: 2px solid #A64B3B;
      object-fit: cover;
      margin-right: 18px;
    }
    .desc{
      //height: 100%;
      white-space: wrap;
      text-align: left;
      font-size: 28px;
      //padding: 27px 0 0;
      .name{
        color: #FE7828;
        max-width: 335px;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 显示省略号 */
      }
      .text{
        color: #963B24;
        font-size: 26px;
      }
      .card{
        vertical-align: middle;
        width: 50px;
      }
    }
    .btn{
      margin-left: auto;
      width: 116px;
      height: 60px;
      &.button-2{
        pointer-events: none;
      }
    }
  }
  .noData{
    font-size: 28px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .noMoreData{
    width: 600px;
    height: 60px;
    font-size: 28px;
    color: #fff;
    margin-top: 50px;
  }
}
.tip{
  padding-left: 18px;
  font-size: 24px;
  color: #FFFFFF;
  >i{
    color: #FFFAA6;
  }
}
</style>
