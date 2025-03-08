<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'go'
      }
    },
    components: {}
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  /* 动画持续时间 */
  .go-enter-active,
  .go-leave-active {
    transition: all 0.3s;
  }
  .go-enter {
    transform: translate3d(100%, 0, 0);
  }
  .go-enter-to {
    transform: translate3d(0, 0, 0);
  }
  .go-leave {
    transform: translate3d(0, 0, 0);
  }
  .go-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>
