<template>
  <div class="RouterA">
    <router-link to="/RouterB">RouterB</router-link>
    <!-- <transition name="fade">
      <button v-if="flag" key="1" @click="flag = !flag">按钮1</button>
      <button v-else key="2" @click="flag = !flag">按钮2</button>
    </transition> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: true
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped>
  .RouterA {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    width: 100vw;
    height: 100vh;
    background-color: red;
  }
  button {
    position: absolute;
    /* transform: translate3d(100%, 0, 0); */
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
  }
  .fade-enter {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  .fade-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .fade-leave {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .fade-leave-to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
</style>
