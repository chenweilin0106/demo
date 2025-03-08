<template>
  <van-swipe
    vertical
    class="swipeVan"
    :autoplay="3000"
    :show-indicators="false"
    @change="onSwipeChange"
    ref="vanSwipeRef"
  >
    <van-swipe-item v-for="(item,index) in swipeListShow" :key="index">
      <van-notice-bar class="noticeVan" :scrollable="activeIndex == index && isScrollable">
      <!-- <van-notice-bar class="noticeVan" v-if="activeIndex == index"> -->
        <!-- {{index}} -->
        <div class="showAreaDiv">
          <span class="lightText">恭喜</span>
          <img class="avatarIcon" :src="IconPath(item.head)" />
          <span :class="['usernameText']">{{item.username}}</span>
          <span class="lightText">获得</span>
          <span class="lightText" v-html="item.desc"></span>
        </div>
      </van-notice-bar>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

export default {
  props: ['swipeList'],
  components: {},
  data() {
    return {
      swipeListShow: [],
      activeIndex: 0,
      isScrollable: false
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    swipeList(newV, oldV) {
      this.swipeListUpdate()
    }
  },
  methods: {
    onSwipeChange(index) {
      // console.log('当前显示的item索引:', index)
      this.isScrollable = false
      this.activeIndex = index
      if (Number(document.getElementsByClassName('showAreaDiv')[index].clientWidth) >= Number(document.getElementsByClassName('noticeVan')[index].offsetWidth)) {
        this.isScrollable = true
      } else {
        this.isScrollable = false
      }
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

<style>
i{
  color: #FFFA6D;
}
</style>
<style scoped lang="scss">
.swipeVan{
  width: 100%;
  height: 50px;
  pointer-events: none;
  .noticeVan{
    height: 50px;
    background: none;
    color: #fff;
    padding: 0;
  }
  .broadcastIcon{
    width: 30px;
    height: 29px;
    margin: 0 5px 5px 5px;
  }
  .lightText{
    color: #FFFA6D;
  }
  .avatarIcon{
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin: 0 5px 5px 5px;
  }
  .usernameText{
    display: inline-block;
    vertical-align: top;
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.noticeVan::v-deep .van-notice-bar__wrap {
  justify-content: center;
}
</style>
