<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popup-content">
      <img class="title-image" :src="IconPath('title_11.png')" />
      <div class="main" ref="scrollDiv" @scroll="handleScroll">
        <div class="listItem" v-for="(item, index) in list" :key="index">
          <div class="text1">
            获得<span v-if="item.is_rare == 1">稀有</span>奖励&ensp;<i>{{ item.desc }}</i>
          </div>
          <div class="text2">{{ item.create_time }}</div>
        </div>
        <div class="noData" v-if="list.length === 0">当前暂无记录</div>
        <div class="noMoreData" v-if="isNextPage === false && list.length != 0">没有更多记录了</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getPageData } from '@/pages/qingMing/api/index.js'
// import { _throttle } from '@/pages/qingMing/utils/tool'

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
      if (content.clientHeight + content.scrollTop >= content.scrollHeight - 100) {
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
  width: 628px;
  height: 559px;
  padding: 5px;
  pointer-events: auto;
  background: url('@/pages/qingMing/assets/tk_bg_1.png') no-repeat;
  background-size: 100% 100%;
  .title-image {
    width: 644px;
    height: 130px;
    position: absolute;
    z-index: 3;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main {
    width: 100%;
    height: calc(100% - 80px);
    // background-color: red;
    position: absolute;
    left: 0;
    top: 60px;
    text-align: center;
    text-align: -webkit-center;
    overflow-y: scroll;
    .listItem {
      width: 600px;
      height: 100px;
      position: relative;
      &:nth-child(odd) {
        background: #1a9e80;
      }
      &:nth-child(even) {
        background: #6eccbe;
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
}
</style>
