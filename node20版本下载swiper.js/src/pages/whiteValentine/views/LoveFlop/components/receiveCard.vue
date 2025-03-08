<template>
  <van-popup
    v-model="isShowPo"
    :close-on-click-overlay="false"
    @click-overlay="clickClose"
  >
    <div class="popup-content">
      <img class="title-image" :src="IconPath('tk_6_35.png')" />
      <div class="main" ref="scrollDiv" @scroll="handleScroll">
        <div class="listItem" v-for="(item,index) in list" :key="index">
          <img
            :src="IconPath(item.head)"
            class="avatar"
            @click="toUserMain(item.uid)"
          />
          <div class="name">{{item.username}}</div>
          <div class="text">赠送给你1张</div>
          <img class="card" :src="IconPath(`tk_6_${26+Number(item.card_id)}.png`)"/>
          <div :class="['btn',item.status==1?'no':null]" @click="receiveCk(item)"></div>
        </div>
        <div class="noData" v-if="list.length===0">暂无好友赠卡</div>
        <div class="noMoreData" v-if="isNextPage===false&&list.length!=0">没有更多记录了</div>
      </div>
      <div class="tip">单日赠送和领取次数上限分别为3次</div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/whiteValentine/api/index.js'
import { toUserMain } from '@/pages/springFestival/utils/toApp'
import { _throttle } from '@/pages/whiteValentine/utils/tool'

export default {
  props: ['isShow'],
  data() {
    return {
      isShowPo: this.isShow || true,
      list: [], // 赠卡记录数组
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
    toUserMain,
    getData() {
      getPageData({ type: 'love_card_receive_log', mark: this.page }).then((res) => {
        if (res.data.has_mord === false) {
          this.isNextPage = false
        } else {
          this.page++
        }
        this.list = this.list.concat(res.data.list)
      })
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
      this.$emit('getUserInformation')
      this.$emit('closePopups')
    },
    receiveCk: _throttle(function (item) {
      // console.log(item)
      if (item.status == 0) {
        getPageData({ type: 'love_card_receive', mark: { sid: item.id, card_id: item.card_id } }).then((res) => {
          if (res.errno == 0) {
            item.status = 1
            this.$toast(res.errmsg)
          } else if (res.errno == -1) {
            this.$toast(res.errmsg)
          }
        })
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  position: relative;
  width: 620px;
  min-height: 480px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;
  background: linear-gradient(180deg, #FFF3F4, #F9C4C7);
  .title-image {
    width: 644px;
    height: 230px;
    position: absolute;
    z-index: 3;
    top: -85px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main{
    width: 100%;
    height: 800px;
    padding-top: 60px;
    text-align: center;
    text-align: -webkit-center;
    overflow-y: scroll;
    .listItem{
      width: 600px;
      height: 100px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      &:nth-child(odd) {
        background: #E58D8C;
      }
      &:nth-child(even) {
        background: #F6A5B3;
      }
      .avatar{
        width: 74px;
        height: 74px;
        background: #ffffff;
        border-radius: 50%;
        object-fit: cover;
      }
      .name{
        color: #FEFF90;
        width: 130px;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 显示省略号 */
      }
      .text{
        color: #FFFFFF;
        font-size: 26px;
      }
      .card{
        width: 48px;
        height: 65px;
      }
      .btn{
        width: 104px;
        height: 54px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 27px;
        border: 2px solid #FFFFFF;
        position: absolute;
        right: 10px;
        font-size: 26px;
        color: #A9792C;
        line-height: 54px;
        &::after{
          content: '领取';
        }
        &.no{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          color: #FFFFFF;
            &::after{
            content: '已领取';
          }
        }
      }
    }
    .noData{
      font-size: 28px;
      color: #B35553;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .noMoreData{
      width: 600px;
      height: 60px;
      font-size: 28px;
      color: #B35553;
      margin-top: 50px;
    }
  }
  .tip{
    width: 600px;
    text-align: center;
    position: absolute;
    top: 850px;
  }
}
</style>
