<template>
  <div class="marquee_box">
    <ul class="marquee_list" :class="{marquee_top:swipeAnimate}">
      <li v-for="(item,index) in swipeListShow" :key="index">
        <span>恭喜</span>
        <img class="avatarIcon" :src="IconPath(item.head)" />
        <span :class="['usernameText','lightText']">{{item.username}}</span>
        <span>&nbsp;获得&nbsp;</span>
        <span class="lightText">{{item.desc}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['swipeList'],
  components: {},
  data() {
    return {
      swipeAnimate: false,
      swipeListShow: [],
      timer: undefined
    }
  },
  created() {},
  mounted() {
    this.swipeListUpdate()
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    clearInterval(this.timer)
    // console.log('beforeDestroy')
  },
  computed: {},
  watch: {
    swipeList(newV, oldV) {
      this.swipeListUpdate()
    }
  },
  methods: {
    /**
     * 文字轮播
     */
    showMarquee() {
      this.swipeAnimate = true
      setTimeout(() => {
        this.swipeListShow.push(this.swipeListShow[0])
        this.swipeListShow.shift()
        this.swipeAnimate = false
      }, 900)
    },
    /**
     * 轮播数据更新
     */
    swipeListUpdate() {
      if (this.swipeList.length > 0) {
        // 新数据在第二条插入
        this.swipeListShow.splice(1, 0, ...this.swipeList)
        // 清除过多数据,只保留13条数据
        if (this.swipeListShow.length > 20) {
          this.swipeListShow.splice(13, this.swipeListShow.length - 13)
        }
        // console.log('this.swipeListShow:', this.swipeListShow)
      }
      clearInterval(this.timer)
      this.timer = setInterval(this.showMarquee, 3000) // 3000毫秒滚动一次
    }
  }
}
</script>

<style scoped lang="scss">
.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  font-size: 30px;
  .marquee_list {
    width: 100%; // 该行控制轮播图宽度
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .marquee_top {
    transition: all 0.5s; // 该行控制滚动速度
    margin-top: -50px;
  }
  .marquee_list li {
    height: 50px; // 几处高度需统一
    vertical-align: top;
    line-height: 50px;
    text-align: center;
    white-space: nowrap;
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
  }
  .lightText{
    color: #FFFA6D;
  }
}
</style>
