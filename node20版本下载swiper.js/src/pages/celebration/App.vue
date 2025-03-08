<template>
  <div id="app" :class="isIOS()?'iosSpApp':''">
    <router-view></router-view>
  </div>
</template>

<script>
import { isIOS } from '@/utils/toApp'

export default {
  mounted() {
    if (this.isIOS()) {
      document.documentElement.classList.add('iosSpHtml')
      document.body.classList.add('iosSpHtml')
    }
  },
  methods: {
    isIOS
  }
}
</script>

<style lang="scss">
#app{
  position: relative;
  z-index: 1;
  background-color: #9C95FD;
  &.iosSpApp{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    overscroll-behavior-y: none;
    -webkit-overscroll-behavior-y: none;
  }
}
</style>
