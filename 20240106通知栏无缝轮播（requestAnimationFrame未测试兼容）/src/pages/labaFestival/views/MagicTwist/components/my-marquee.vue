<template>
  <div ref="container" class="Marquee">
    <div
      v-for="item in showArr"
      :key="item.id"
      class="text-item"
      ref="items"
      @animationend="animationend"
    >
      恭喜<img class="avatar" :src="item.profile_image" /><span
        class="user-name"
        >{{ item.username }}</span
      ><span class="text">{{ item.remark }}</span>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'MyMarquee',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      idCounter: 0,
      timer: null,
      showArr: [],
      requestArr: []
    }
  },
  computed: {},
  watch: {
    list: {
      handler() {
        this.$nextTick(() => {
          this.start()
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getUniqueId() {
      return uuidv4()
    },
    checkPosition() {
      this.$nextTick(() => {
        const containerRight =
          this.$refs.container.getBoundingClientRect().right
        const items = this.$refs.items
        const lastItem = items[items.length - 1]
        const lastItemRight = lastItem.getBoundingClientRect().right
        // 间隔50px
        const pixelValue = (50 / 750) * window.innerWidth
        if (lastItemRight <= containerRight - pixelValue) {
          cancelAnimationFrame(this.timer)
          this.timer = null
          this.start()
        } else {
          this.timer = requestAnimationFrame(this.checkPosition)
        }
      })
    },
    start() {
      cancelAnimationFrame(this.timer)
      this.timer = null
      if (!this.requestArr.length) {
        this.requestArr = this.list.map((item) => {
          return {
            id: this.getUniqueId(),
            ...item
          }
        })
      }
      this.showArr.push(this.requestArr.shift())
      console.log(this.showArr)
      this.checkPosition()
    },
    animationend() {
      this.showArr.shift()
      console.log('动画结束')
      // this.start()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.timer)
    this.timer = null
  }
}
</script>

<style scoped lang="scss">
@keyframes move {
  100% {
    transform: translateX(-100%);
  }
}
.Marquee {
  position: relative;
  width: 496px;
  height: 108px;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  // background-color: pink;
  overflow: hidden;
}

.text-item {
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  width: fit-content;
  // height: 100%;
  flex-shrink: 0;
  transform: translateX(496px);
  white-space: nowrap;
  animation: move 8s linear;
  .avatar {
    width: 52px;
    height: 52px;
    background: #ffffff;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 5px;
  }
  .user-name {
    color: #fff0ab;
    margin-right: 5px;
  }
}
</style>
