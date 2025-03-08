<template>
  <div class="marquee_box">
    <ul class="marquee_list" :class="{marquee_top:swipeAnimate}">
        <li v-for="(item,index) in swipeListSon" :key="index">
          <span>恭喜</span>
          <img class="avatarIcon" :src="IconPath(item.head)" />
          <span class="lightText">{{item.username}}</span>
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
      swipeListSon: this.swipeList || [],
      timer: undefined
    }
  },
  created() {},
  mounted() {
    this.timer = setInterval(this.showMarquee, 2000) // 2000毫秒滚动一次
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    clearInterval(this.timer)
    // console.log('beforeDestroy')
  },
  computed: {},
  watch: {
    swipeList(newV, oldV) {
      this.swipeListSon = this.swipeList
      clearInterval(this.timer)
      this.timer = setInterval(this.showMarquee, 2000)
    }
  },
  methods: {
    /**
     * 文字轮播
     */
    showMarquee() {
      this.swipeAnimate = true
      setTimeout(() => {
        this.swipeListSon.push(this.swipeList[0])
        this.swipeListSon.shift()
        this.swipeAnimate = false
      }, 900)
    }
  }
}
</script>

<style scoped lang="scss">
.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 40px;
  overflow: hidden;
  font-size: 30px;
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .marquee_top {
    transition: all 0.5s; // 该行控制滚动速度
    margin-top: -40px
  }
  .marquee_list li {
    height: 40px; // 几处高度需统一
    width: 650px; // 该行控制轮播图宽度
    line-height: 40px;
    text-align: center;
    white-space: nowrap;
  }
  .avatarIcon{
    width: 35px;
    height: 35px;
    border-radius: 50px;
    margin: 0 5px;
  }
  .lightText{
    color: #FFFA6D;
  }
}
</style>
