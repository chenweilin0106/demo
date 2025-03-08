<template>
  <div ref="scorllBox" class='scorllBox'>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
    <div class="testBox" data-aos="fade-up" data-aos-duration="1000"></div>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  name: 'scorllBox',
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    AOS.init({ once: true })
    // const scrollBox = this.$refs.scorllBox
    // scrollBox.addEventListener('scroll', () => {
    //   console.log(12312)
    //   AOS.refresh()
    // })
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
.scorllBox {
  width: 100vw;
  // height: 100vh;
  // overflow-x: hidden;
  // overflow-y: scroll;
  background-color: skyblue;
  .testBox {
    width: 500px;
    height: 300px;
    background-color: red;
    margin-bottom: 50px;
  }
}
</style>