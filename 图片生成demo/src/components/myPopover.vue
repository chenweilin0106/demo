<template>
  <div class="myPopover">
    <van-popover
      class="popover"
      v-model="showPopover"
      trigger="click"
      get-container=".myPopover"
    >
      <div class="main_box">
        <p class="item_box" v-for="item in 4" :key="item">{{ item }}</p>
      </div>
      <template #reference>
        <button>打开气泡</button>
      </template>
    </van-popover>
  </div>
</template>

<script>
  export default {
    name: 'myPopover',
    components: {},
    props: [],
    data() {
      return {
        showPopover: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="scss">
  .main_box {
    background: blue;
    display: flex;
    .item_box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      background: #000;
      color: #fff;
      // margin: 5px 0px;
    }
  }
  .myPopover {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .van-popup {
    .van-popover__arrow {
      display: none !important;
    }
  }
</style>
