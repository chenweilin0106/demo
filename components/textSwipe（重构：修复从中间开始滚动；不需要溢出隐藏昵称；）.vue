<template>
  <van-swipe ref="vanSwipeRef" vertical class="swipeVan" :autoplay="3000" :show-indicators="false" :touchable="false" @change="onSwipeChange">
    <van-swipe-item v-for="(item,index) in swipeListShow" :key="index">
      <!-- todo 不要手动设置可滚动 让组件本身判断 -->
      <van-notice-bar class="noticeVan" v-bind="activeIndex == index ? {} : { scrollable: false }">
        <span class="lightText">恭喜用户</span>
        <span class="usernameText">{{item.username}}</span>
        <span class="lightText">成功邀请好友并领取现金</span>
        <span class="blueText">{{item.money}}元</span>
      </van-notice-bar>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

export default {
  props: ['swipeList'],
  data() {
    return {
      swipeListShow: [],
      activeIndex: 0
    }
  },
  watch: {
    swipeList: {
      handler(newV, oldV) {
        this.$nextTick(() => {
          this.swipeListUpdate()
        })
      },
      immediate: true
    }
  },
  methods: {
    onSwipeChange(index) {
      // console.log('当前显示的item索引:', index)
      this.activeIndex = index
    },
    /**
     * 轮播数据更新
     */
    swipeListUpdate() {
      if (this.swipeList.length > 0) {
        // 新数据在第三条插入
        this.swipeListShow.splice(2, 0, ...this.swipeList)
        // 清除过多数据,只保留13条数据
        if (this.swipeListShow.length > 20) {
          this.swipeListShow.splice(13, this.swipeListShow.length - 13)
        }
        // 切换为第一条后再跳转到第二条(为了有一个下切动画)
        this.$refs.vanSwipeRef.swipeTo(0, { immediate: true })
        this.$refs.vanSwipeRef.swipeTo(1, { immediate: false })
        this.activeIndex = 1
        // console.log('this.swipeListShow:', this.swipeListShow)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swipeVan {
  width: 100%;
  height: 76px;
  .noticeVan {
    width: 100%;
    height: 76px;
    background: none;
    color: #fff;
    padding: 0;
    font-size: 26px;
    font-weight: 500;
    .broadcastIcon {
      width: 30px;
      height: 29px;
      margin: 0 5px 5px 5px;
    }
    .lightText {
      color: #fff;
    }
    .blueText {
      color: #FFEF85;
    }
    .avatarIcon {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      margin: 0 5px 5px 5px;
    }
    .usernameText {
      color: #FFEF85;
    }
    // todo 文本居中
    ::v-deep .van-notice-bar__content {
      min-width: 100%;
      text-align: center;
    }
  }
}
</style>
