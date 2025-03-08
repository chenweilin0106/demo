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
      <van-notice-bar class="noticeVan" :scrollable="isScrollable">
      <!-- <van-notice-bar class="noticeVan" v-if="activeIndex == index"> -->
        <!-- {{index}} -->
        <div class="showAreaDiv">
          <img class="broadcastIcon" :src="IconPath('mk4_1.png')" />
          <img class="avatarIcon" :src="IconPath(item.profile_image)" />
          <span :class="['usernameText']">{{item.username}}</span>
          <span class="desc" v-html="item.content"></span>
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
        // 跳转到第二条（为插入数据动画顺滑不跳转至第1条）
        this.$refs.vanSwipeRef.swipeTo(1)
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
  .avatarIcon{
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin: 0 5px 5px 5px;
  }
  .usernameText{
    display: inline-block;
    vertical-align: top;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #FFFA6D;
  }
}
</style>
