<template>
  <div class="RouterB">
    <router-link to="/RouterA">RouterA</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped>
  .RouterB {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    width: 100vw;
    height: 100vh;
    background-color: skyblue;
  }
</style>
