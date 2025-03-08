<template>
  <div class="m4Page">
    <div :class="['tagChosenBg',`status${tagChosen}`]">
      <div @click="tagChosenSelect(1)"></div>
      <div @click="tagChosenSelect(2)"></div>
      <div @click="tagChosenSelect(3)"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'm4Vue',
  props: [''],
  components: {},
  data() {
    return {
      tagChosen: 1 // 1:世纪舞会 2:浪漫舞池 3:混沌时光机
    }
  },
  watch: {},
  computed: {},
  created() {
    this.writeLocalStorage()
  },
  methods: {
    tagChosenSelect(type) {
      if (this.tagChosen != type) {
        this.writeLocalStorage()
        this.tagChosen = type
        this.$router.push(`/m4/${type == 1 ? 'centuryBall' : type == 2 ? 'romanticDanceFloor' : type == 3 ? 'chaosTimeMachine' : null}`)
      }
    },
    /**
     * 埋入进此页面日期
     */
    writeLocalStorage() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) != localStorage.getItem('enterDate')) {
        localStorage.setItem('isTodayTip', false)
        localStorage.setItem('enterDate', JSON.stringify(formattedTime))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m4Page {
  position: relative;
  .tagChosenBg{
    width: 635px;
    height: 84px;
    margin: -127px auto 0px auto;
    display: flex;
    &.status1{
      background: url('@/pages/celebration/assets/mk9_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/celebration/assets/mk9_2.png') no-repeat left top/100% 100%;
    }
    &.status3{
      background: url('@/pages/celebration/assets/mk9_3.png') no-repeat left top/100% 100%;
    }
    :nth-child(n){
      width: 33.33%;
      height: 100%;
    }
  }
}
</style>
