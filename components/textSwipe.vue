<template>
  <van-swipe class="textSwipe" vertical :autoplay="5000" :show-indicators="false" :touchable="false" @change="onSwipeChange" ref="vanSwipeRef">
    <van-swipe-item v-for="(item,index) in swipeListShow" :key="index">
      <van-notice-bar class="textSwipeNoticeBar" v-bind="activeIndex === index ? {} : { scrollable: false }">
        <div class="textSwipeNoticeBarItem">
          <img class="radius-50 fit-cover block avatar" v-lazy="IconPath(item.from_profile_image || 'avatarDefault.png')" alt="" @error="imgAtError" />&nbsp;
          <span :class="['usernameDiv']">{{item.from_username}}</span>&nbsp;为&nbsp;
          <img class="radius-50 fit-cover block avatar" v-lazy="IconPath(item.to_profile_image || 'avatarDefault.png')" alt="" @error="imgAtError" />&nbsp;
          <span :class="['usernameDiv']">{{item.to_username}}</span>&nbsp;
          <span class="lightText">解锁了心动合约奖励，爱意成双，双向奔赴～</span>
        </div>
      </van-notice-bar>
    </van-swipe-item>
  </van-swipe>
</template>

<script>

import { imgAtError } from '@/utils/tool'

export default {
  props: ['swipeList'],
  components: {},
  data() {
    return {
      swipeListShow: [],
      activeIndex: 0
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
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
    imgAtError,
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
.textSwipe.van-swipe {
  $height: 59px;
  width: 100%;
  height: $height;
  //background-color: rgba(255, 255, 255, 0.5);
  ::v-deep .van-notice-bar__content {
    min-width: 100%;
    text-align: center;
  }
  //::v-deep .van-notice-bar__wrap {
  //  min-width: 100%;
  //  justify-content: center;
  //}
  .van-notice-bar {
    width: 100%;
    height: $height;
    background: none;
    padding: 0;
    .textSwipeNoticeBarItem {
      font-size: 24px;
      color: #FFEF85;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 36px;
        height: 36px;
        border: 2px solid transparent;
        background-color: #FFF4B8;
        vertical-align: center;
      }
      .usernameDiv {
        color: #FFEF85;
        font-size: 24px;
        vertical-align: top;
        max-width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
