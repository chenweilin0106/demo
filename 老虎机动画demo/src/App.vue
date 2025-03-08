<template>
  <div id="app">
    <button @click="start">开始</button>
    <ul class="flex" v-if="show">
      <ScrollNum
        v-for="(num, idx) of numArr"
        :key="idx"
        as="li"
        :i="num"
        :delay="idx == 0 ? 0.5 : 0.5 * (idx + 1)"
        @handleAnimate="handleAnimate"
      />
    </ul>
    <span v-else>{{ n ? n : '??????' }}</span>
  </div>
</template>

<script>
import ScrollNum from './components/ScrollNum/ScrollNum.vue'

export default {
  name: 'App',
  components: { ScrollNum },
  data() {
    return {
      n: '',
      num: 200110,
      show: false,
      count: 0
    }
  },
  methods: {
    start() {
      this.show = true
    },
    handleAnimate() {
      this.count += 1
      // console.log(this.count)
      if (this.count >= 6) {
        this.n = this.num
        this.count = 0
        this.show = false
      }
    }
  },
  computed: {
    numArr() {
      const str = String(this.num)
      const arr = []
      for (let i = 0; i < str.length; i++) {
        arr.push(parseInt(str[i]))
      }

      return arr
    }
  },
  mounted() {}
}
</script>

<style scoped>
.flex {
  display: flex;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
