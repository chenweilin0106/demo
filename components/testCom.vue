<template>
  <div class="testCom">
    <div class="testBtn" @click="$router.replace('/admin')">进入admin</div>
  </div>
</template>

<script>
export default {
  name: 'testCom',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.testCom{
  position: fixed;
  width: 100vw;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  .testBtn{
    background-color: #000;
    color: #fff;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999999999px;
    padding: 15px 20px;
    line-height: 1;
    border: 3px solid #fff;
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>
